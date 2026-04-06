"""
NorgeTravel Accommodation Scraper
==================================
Scrapes accommodation listings from Booking.com for all Norwegian cities
covered by NorgeTravel and writes results into src/data/travel-accommodation.json.

Usage:
    pip install requests beautifulsoup4 playwright
    playwright install chromium
    python scripts/scrape_accommodation.py

Options:
    --dry-run    Print results without writing to JSON
    --region     svalbard | finnmark | oslo | bergen | trondheim | stavanger |
                 tromso | lofoten | nordnorge | all (default: all)
    --limit      Max properties per search (default: 50)
"""

import argparse
import json
import re
import sys
import time
import unicodedata
import uuid
from datetime import datetime, timezone
from pathlib import Path

# Force UTF-8 output on Windows so Norwegian chars (ø, å, æ) don't crash
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf-8-sig"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if sys.stderr.encoding and sys.stderr.encoding.lower() not in ("utf-8", "utf-8-sig"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

# ── Try Playwright (preferred, handles JS-rendered pages) ─────────────────────
try:
    from playwright.sync_api import sync_playwright
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False
    print("[warn] Playwright not installed. Falling back to requests+BeautifulSoup.")
    print("       Install with: pip install playwright && playwright install chromium")

# ── Fallback: requests + BeautifulSoup ────────────────────────────────────────
import requests
from bs4 import BeautifulSoup

# ─────────────────────────────────────────────────────────────────────────────
# Config
# ─────────────────────────────────────────────────────────────────────────────

ROOT = Path(__file__).parent.parent
OUTPUT_FILE = ROOT / "src" / "data" / "travel-accommodation.json"

def _url(city: str, country: str = "Norway") -> str:
    """Build a Booking.com search URL for a city."""
    import urllib.parse
    query = f"{city}, {country}"
    return (
        "https://www.booking.com/searchresults.html"
        f"?ss={urllib.parse.quote(query)}"
        "&lang=en-us&sb=1&src_elem=sb&src=index&dest_type=city"
        "&checkin=2026-07-01&checkout=2026-07-07"
        "&group_adults=2&no_rooms=1&group_children=0"
    )


REGIONS = {
    # ── Svalbard ───────────────────────────────────────────────────────────────
    "svalbard": {
        "destination": "svalbard",
        "searches": [
            {"label": "Longyearbyen", "url": _url("Longyearbyen", "Svalbard")},
        ],
    },
    # ── Urban Hubs ─────────────────────────────────────────────────────────────
    "oslo": {
        "destination": "all",
        "searches": [
            {"label": "Oslo", "url": _url("Oslo")},
        ],
    },
    "bergen": {
        "destination": "fjords",
        "searches": [
            {"label": "Bergen", "url": _url("Bergen")},
        ],
    },
    "trondheim": {
        "destination": "all",
        "searches": [
            {"label": "Trondheim", "url": _url("Trondheim")},
        ],
    },
    "stavanger": {
        "destination": "fjords",
        "searches": [
            {"label": "Stavanger", "url": _url("Stavanger")},
        ],
    },
    # ── Northern Norway: Tromsø ────────────────────────────────────────────────
    "tromso": {
        "destination": "northern-norway",
        "searches": [
            {"label": "Tromsø", "url": _url("Tromsø")},
        ],
    },
    # ── Northern Norway: Lofoten + Vesterålen ─────────────────────────────────
    "lofoten": {
        "destination": "lofoten",
        "searches": [
            {"label": "Svolvær",      "url": _url("Svolvær")},
            {"label": "Leknes",       "url": _url("Leknes")},
            {"label": "Reine",        "url": _url("Reine, Lofoten")},
            {"label": "Henningsvær",  "url": _url("Henningsvær")},
            {"label": "Å i Lofoten",  "url": _url("Å i Lofoten")},
            {"label": "Stamsund",     "url": _url("Stamsund")},
        ],
    },
    # ── Northern Norway: rest ──────────────────────────────────────────────────
    "nordnorge": {
        "destination": "northern-norway",
        "searches": [
            {"label": "Bodø",         "url": _url("Bodø")},
            {"label": "Narvik",       "url": _url("Narvik")},
            {"label": "Alta",         "url": _url("Alta")},
            {"label": "Hammerfest",   "url": _url("Hammerfest")},
            {"label": "Honningsvåg",  "url": _url("Honningsvåg")},
            {"label": "Senja",        "url": _url("Senja")},
            {"label": "Lyngen",       "url": _url("Lyngen")},
            {"label": "Kirkenes",     "url": _url("Kirkenes")},
        ],
    },
    # ── Legacy alias ──────────────────────────────────────────────────────────
    "finnmark": {
        "destination": "northern-norway",
        "searches": [
            {"label": "Alta",         "url": _url("Alta")},
            {"label": "Hammerfest",   "url": _url("Hammerfest")},
            {"label": "Honningsvåg",  "url": _url("Honningsvåg")},
            {"label": "Kirkenes",     "url": _url("Kirkenes")},
        ],
    },
}

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xhtml+xml;q=0.9,*/*;q=0.8",
}

# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────

def slugify(text: str) -> str:
    """Convert a name to a URL-safe slug."""
    text = unicodedata.normalize("NFD", text)
    text = "".join(c for c in text if unicodedata.category(c) != "Mn")
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s-]", "", text)
    text = re.sub(r"[\s]+", "-", text.strip())
    text = re.sub(r"-+", "-", text)
    return text


def guess_accommodation_type(name: str, prop_type: str) -> str:
    name_lower = (name + " " + prop_type).lower()
    if any(k in name_lower for k in ["hostel", "vandre"]):
        return "hostel"
    if any(k in name_lower for k in ["camping", "campsite", "camp "]):
        return "camping"
    if any(k in name_lower for k in ["rorbu", "fisherman"]):
        return "rorbu"
    if any(k in name_lower for k in ["glamping", "safari tent", "pod"]):
        return "glamping"
    if any(k in name_lower for k in ["cabin", "hytte", "chalet", "cottage", "lodge"]):
        return "cabin"
    if any(k in name_lower for k in ["apartment", "flat", "studio", "suite"]):
        return "apartment"
    return "hotel"


def guess_price_range(price_text: str) -> str:
    """Estimate price range from a nightly price string like 'NOK 1,200'."""
    digits = re.sub(r"[^0-9]", "", price_text)
    if not digits:
        return "varies"
    nok = int(digits)
    # Rough NOK/night thresholds
    if nok < 900:
        return "budget"
    if nok < 2500:
        return "mid-range"
    return "luxury"


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat().replace("+00:00", "Z")


def unique_id(base: str, existing: set) -> str:
    slug = slugify(base)
    candidate = slug
    i = 2
    while candidate in existing:
        candidate = f"{slug}-{i}"
        i += 1
    return candidate


# ─────────────────────────────────────────────────────────────────────────────
# Playwright scraper (preferred)
# ─────────────────────────────────────────────────────────────────────────────

def scrape_with_playwright(url: str, label: str, limit: int) -> list[dict]:
    """Scrape Booking.com search results using a real browser."""
    results = []
    print(f"  [playwright] Fetching {label} ...")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(
            user_agent=HEADERS["User-Agent"],
            locale="en-US",
            viewport={"width": 1280, "height": 900},
        )
        page = context.new_page()

        # Block images/fonts to speed up load
        page.route(
            "**/*.{png,jpg,jpeg,gif,webp,svg,woff,woff2,ttf}",
            lambda r: r.abort(),
        )

        try:
            page.goto(url, wait_until="domcontentloaded", timeout=30000)
            # Dismiss cookie banner if present
            try:
                page.click('[id="onetrust-accept-btn-handler"]', timeout=3000)
            except Exception:
                pass

            # Wait for property cards
            page.wait_for_selector('[data-testid="property-card"]', timeout=15000)

            # Scroll to load more results
            for _ in range(3):
                page.evaluate("window.scrollBy(0, 1500)")
                time.sleep(1)

            cards = page.query_selector_all('[data-testid="property-card"]')
            print(f"  [playwright] Found {len(cards)} cards for {label}")

            for card in cards[:limit]:
                try:
                    name_el = card.query_selector('[data-testid="title"]')
                    name = name_el.inner_text().strip() if name_el else ""

                    type_el = card.query_selector('[data-testid="recommended-units"]')
                    prop_type = type_el.inner_text().strip() if type_el else ""

                    score_el = card.query_selector('[data-testid="review-score"]')
                    score_text = score_el.inner_text().strip() if score_el else ""

                    price_el = card.query_selector('[data-testid="price-and-discounted-price"]')
                    price_text = price_el.inner_text().strip() if price_el else ""

                    link_el = card.query_selector('a[data-testid="title-link"]')
                    booking_url = link_el.get_attribute("href") if link_el else None
                    if booking_url and not booking_url.startswith("http"):
                        booking_url = "https://www.booking.com" + booking_url

                    address_el = card.query_selector('[data-testid="address"]')
                    address = address_el.inner_text().strip() if address_el else label

                    if not name:
                        continue

                    # Parse star rating from score text (e.g. "8.5 Excellent 1,234 reviews")
                    star_match = re.search(r"\b([1-5])\s*star", score_text, re.IGNORECASE)
                    star_rating = int(star_match.group(1)) if star_match else None
                    # Booking score -> approx stars if no explicit star rating
                    if star_rating is None:
                        score_match = re.search(r"(\d+\.?\d*)", score_text)
                        if score_match:
                            score = float(score_match.group(1))
                            if score >= 9.0:
                                star_rating = 5
                            elif score >= 8.0:
                                star_rating = 4
                            elif score >= 7.0:
                                star_rating = 3

                    results.append({
                        "_name": name,
                        "_type": prop_type,
                        "_price_text": price_text,
                        "_booking_url": booking_url,
                        "_address": address,
                        "_star_rating": star_rating,
                        "_town": label,
                    })

                except Exception as e:
                    print(f"  [warn] Card parse error: {e}")
                    continue

        except Exception as e:
            print(f"  [error] Failed to scrape {label}: {e}")
        finally:
            browser.close()

    return results


# ─────────────────────────────────────────────────────────────────────────────
# Requests fallback scraper
# ─────────────────────────────────────────────────────────────────────────────

def scrape_with_requests(url: str, label: str, limit: int) -> list[dict]:
    """Fallback scraper using requests + BeautifulSoup. Less reliable on Booking.com."""
    results = []
    print(f"  [requests] Fetching {label} ...")
    try:
        time.sleep(2)  # polite delay
        resp = requests.get(url, headers=HEADERS, timeout=20)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")

        cards = soup.select('[data-testid="property-card"]')
        print(f"  [requests] Found {len(cards)} cards for {label}")

        for card in cards[:limit]:
            name_el = card.select_one('[data-testid="title"]')
            name = name_el.get_text(strip=True) if name_el else ""

            type_el = card.select_one('[data-testid="recommended-units"]')
            prop_type = type_el.get_text(strip=True) if type_el else ""

            price_el = card.select_one('[data-testid="price-and-discounted-price"]')
            price_text = price_el.get_text(strip=True) if price_el else ""

            link_el = card.select_one('a[data-testid="title-link"]')
            booking_url = link_el.get("href") if link_el else None
            if booking_url and not booking_url.startswith("http"):
                booking_url = "https://www.booking.com" + booking_url

            address_el = card.select_one('[data-testid="address"]')
            address = address_el.get_text(strip=True) if address_el else label

            if not name:
                continue

            results.append({
                "_name": name,
                "_type": prop_type,
                "_price_text": price_text,
                "_booking_url": booking_url,
                "_address": address,
                "_star_rating": None,
                "_town": label,
            })

    except Exception as e:
        print(f"  [error] requests scrape failed for {label}: {e}")

    return results


# ─────────────────────────────────────────────────────────────────────────────
# Convert raw scraped row -> NorgeTravel accommodation entry
# ─────────────────────────────────────────────────────────────────────────────

def build_entry(raw: dict, destination: str, sort_order: int, existing_ids: set) -> dict:
    name = raw["_name"]
    entry_id = unique_id(name, existing_ids)
    existing_ids.add(entry_id)
    now = now_iso()

    accom_type = guess_accommodation_type(name, raw.get("_type", ""))
    price_range = guess_price_range(raw.get("_price_text", ""))
    town = raw.get("_town", "")
    address = raw.get("_address", town)
    location = address if address and address != town else f"{town}, Norway"
    booking_url = raw.get("_booking_url")

    return {
        "id": entry_id,
        "name": name,
        "description": f"{name} is a {accom_type} located in {location}.",
        "destination": destination,
        "location": location,
        "priceRange": price_range,
        "website": None,
        "imageUrl": None,
        "imageAlt": None,
        "status": "draft",         # draft until manually reviewed
        "isFeatured": False,
        "sortOrder": sort_order,
        "createdAt": now,
        "updatedAt": now,
        "accommodationType": accom_type,
        "starRating": raw.get("_star_rating"),
        "amenities": [],
        "capacity": None,
        "checkIn": "15:00",
        "checkOut": "11:00",
        "bookingUrl": booking_url,
        "isEcoFriendly": False,
        "nearestTown": town,
    }


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def main():
    all_region_keys = list(REGIONS.keys()) + ["all"]
    parser = argparse.ArgumentParser(description="Scrape accommodation for NorgeTravel")
    parser.add_argument("--dry-run", action="store_true", help="Print without saving")
    parser.add_argument(
        "--region",
        choices=all_region_keys,
        default="all",
        help="Region to scrape (default: all)",
    )
    parser.add_argument("--limit", type=int, default=50, help="Max results per search")
    args = parser.parse_args()

    # Load existing data to avoid duplicates
    # The file may be a list (legacy) or a dict keyed by id
    existing: dict = {}
    if OUTPUT_FILE.exists():
        try:
            raw_data = json.loads(OUTPUT_FILE.read_text(encoding="utf-8"))
            if isinstance(raw_data, list):
                # Convert list -> dict keyed by id
                existing = {item["id"]: item for item in raw_data if "id" in item}
            elif isinstance(raw_data, dict):
                existing = raw_data
        except (json.JSONDecodeError, KeyError):
            existing = {}

    existing_ids: set = set(existing.keys())
    existing_names: set = {v["name"].lower() for v in existing.values()}
    sort_counter = max((v.get("sortOrder", 0) for v in existing.values()), default=0)

    target_regions = (
        [k for k in REGIONS.keys() if k != "finnmark"]  # skip legacy alias when running all
        if args.region == "all"
        else [args.region]
    )

    new_entries: dict = {}

    for region_key in target_regions:
        region = REGIONS[region_key]
        destination = region["destination"]
        print(f"\n{'='*60}")
        print(f"Region: {region_key.upper()}  ->  destination: {destination}")
        print(f"{'='*60}")

        for search in region["searches"]:
            label = search["label"]
            url = search["url"]

            # Scrape
            if PLAYWRIGHT_AVAILABLE:
                raw_results = scrape_with_playwright(url, label, args.limit)
            else:
                raw_results = scrape_with_requests(url, label, args.limit)

            added = 0
            skipped_dup = 0

            for raw in raw_results:
                name = raw["_name"]
                if not name:
                    continue
                # Skip if name already in data (case-insensitive)
                if name.lower() in existing_names:
                    skipped_dup += 1
                    continue

                sort_counter += 1
                entry = build_entry(raw, destination, sort_counter, existing_ids)
                new_entries[entry["id"]] = entry
                existing_names.add(name.lower())
                added += 1

            print(f"  -> {label}: {added} new, {skipped_dup} skipped (duplicates)")

            # Polite delay between searches
            time.sleep(3)

    total_new = len(new_entries)
    print(f"\n{'='*60}")
    print(f"Total new entries: {total_new}")
    print(f"{'='*60}\n")

    if total_new == 0:
        print("Nothing new to write.")
        return

    if args.dry_run:
        print(json.dumps(new_entries, indent=2, ensure_ascii=False))
        return

    # Merge and write
    merged = {**existing, **new_entries}
    OUTPUT_FILE.write_text(
        json.dumps(merged, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    print(f"Wrote {len(merged)} total entries to {OUTPUT_FILE}")
    print(f"  {len(existing)} existing + {total_new} new")
    print("\nAll new entries are set to status='draft'.")
    print("Review them in the admin at /admin/travel/accommodation and publish when ready.")


if __name__ == "__main__":
    main()
