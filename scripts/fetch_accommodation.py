"""
NorgeTravel Accommodation Fetcher
===================================
Fetches accommodation data from Google Places API (New) for Norwegian regions.
Verifies each property is OPERATIONAL before including it.
Outputs into src/data/travel-accommodation.json matching the Zod schema.

Usage:
    set GOOGLE_PLACES_API_KEY=your-key-here

    # Fetch all regions
    python scripts/fetch_accommodation.py

    # Fetch one region
    python scripts/fetch_accommodation.py --region svalbard

    # Preview without writing
    python scripts/fetch_accommodation.py --dry-run

    # Custom limit per location
    python scripts/fetch_accommodation.py --limit 30

Prerequisites:
    pip install requests
"""

import argparse
import json
import os
import re
import sys
import time
import unicodedata
from datetime import datetime, timezone
from pathlib import Path

import requests

# ─────────────────────────────────────────────────────────────────────────────
# Config
# ─────────────────────────────────────────────────────────────────────────────

ROOT = Path(__file__).parent.parent
OUTPUT_FILE = ROOT / "src" / "data" / "travel-accommodation.json"

API_KEY = os.environ.get("GOOGLE_PLACES_API_KEY", "")
PLACES_BASE = "https://places.googleapis.com/v1"

# ─── Region definitions ──────────────────────────────────────────────────────
# Each region maps to a destination value from the Zod schema:
#   'northern-norway' | 'lofoten' | 'fjords' | 'svalbard' | 'all'

REGIONS = {
    "oslo": {
        "destination": "all",
        "locations": [
            {"label": "Oslo", "lat": 59.9139, "lng": 10.7522, "radius": 12000, "target": 150},
        ],
    },
    "bergen": {
        "destination": "fjords",
        "locations": [
            {"label": "Bergen", "lat": 60.3913, "lng": 5.3221, "radius": 10000, "target": 120},
        ],
    },
    "trondheim": {
        "destination": "all",
        "locations": [
            {"label": "Trondheim", "lat": 63.4305, "lng": 10.3951, "radius": 8000, "target": 80},
        ],
    },
    "stavanger": {
        "destination": "fjords",
        "locations": [
            {"label": "Stavanger", "lat": 58.9700, "lng": 5.7331, "radius": 8000, "target": 80},
        ],
    },
    "tromso": {
        "destination": "northern-norway",
        "locations": [
            {"label": "Tromsø", "lat": 69.6496, "lng": 19.0156, "radius": 8000, "target": 80},
        ],
    },
    "alta": {
        "destination": "northern-norway",
        "locations": [
            {"label": "Alta", "lat": 69.9689, "lng": 23.2716, "radius": 12000, "target": 50},
        ],
    },
    "bodo": {
        "destination": "northern-norway",
        "locations": [
            {"label": "Bodø", "lat": 67.2804, "lng": 14.4049, "radius": 8000, "target": 50},
        ],
    },
    "hammerfest": {
        "destination": "northern-norway",
        "locations": [
            {"label": "Hammerfest", "lat": 70.6634, "lng": 23.6821, "radius": 8000, "target": 30},
        ],
    },
    "narvik": {
        "destination": "northern-norway",
        "locations": [
            {"label": "Narvik", "lat": 68.4385, "lng": 17.4272, "radius": 10000, "target": 40},
        ],
    },
    "senja": {
        "destination": "northern-norway",
        "locations": [
            {"label": "Senja", "lat": 69.2850, "lng": 17.0200, "radius": 30000, "target": 40},
        ],
    },
    "nordkapp": {
        "destination": "northern-norway",
        "locations": [
            {"label": "Honningsvåg", "lat": 70.9787, "lng": 25.9744, "radius": 15000, "target": 30},
        ],
    },
    "lofoten": {
        "destination": "lofoten",
        "locations": [
            {"label": "Svolvær", "lat": 68.2342, "lng": 14.5658, "radius": 15000, "target": 40},
            {"label": "Leknes", "lat": 68.1487, "lng": 13.6119, "radius": 15000, "target": 30},
            {"label": "Reine", "lat": 67.9324, "lng": 13.0908, "radius": 20000, "target": 30},
            {"label": "Kabelvåg", "lat": 68.2122, "lng": 14.4810, "radius": 10000, "target": 20},
            {"label": "Stamsund", "lat": 68.1200, "lng": 13.8450, "radius": 10000, "target": 15},
        ],
    },
    "lyngen": {
        "destination": "northern-norway",
        "locations": [
            {"label": "Lyngen", "lat": 69.5740, "lng": 20.2090, "radius": 20000, "target": 30},
        ],
    },
}

# ─── Type mapping ─────────────────────────────────────────────────────────────
# Google Places types → our AccommodationType enum

TYPE_MAP = {
    "hotel": "hotel",
    "resort_hotel": "hotel",
    "extended_stay_hotel": "hotel",
    "lodging": "hotel",           # generic — default to hotel
    "motel": "hotel",
    "bed_and_breakfast": "cabin",
    "guest_house": "cabin",
    "cottage": "cabin",
    "farm_stay": "cabin",
    "private_guest_room": "cabin",
    "hostel": "hostel",
    "campground": "camping",
    "camping_cabin": "camping",
    "rv_park": "camping",
}

# Keywords in property name used to refine type detection
NAME_TYPE_KEYWORDS = {
    "hostel": "hostel",
    "camping": "camping",
    "campsite": "camping",
    "camp": "camping",
    "glamping": "glamping",
    "rorbu": "rorbu",
    "rorbuer": "rorbu",
    "sjøhus": "rorbu",
    "cabin": "cabin",
    "hytte": "cabin",
    "cottage": "cabin",
    "lodge": "cabin",
    "apartment": "apartment",
    "leilighet": "apartment",
    "suite": "apartment",
}

# Google price_level → our priceRange
PRICE_MAP = {
    "PRICE_LEVEL_FREE": "budget",
    "PRICE_LEVEL_INEXPENSIVE": "budget",
    "PRICE_LEVEL_MODERATE": "mid-range",
    "PRICE_LEVEL_EXPENSIVE": "luxury",
    "PRICE_LEVEL_VERY_EXPENSIVE": "luxury",
    "PRICE_LEVEL_UNSPECIFIED": "mid-range",
}

# Fields requested from Google Places API
SEARCH_FIELDS = ",".join([
    "places.id",
    "places.displayName",
    "places.formattedAddress",
    "places.shortFormattedAddress",
    "places.rating",
    "places.userRatingCount",
    "places.priceLevel",
    "places.businessStatus",
    "places.primaryType",
    "places.types",
    "places.websiteUri",
    "places.googleMapsUri",
    "places.editorialSummary",
])


# ─────────────────────────────────────────────────────────────────────────────
# Helpers
# ─────────────────────────────────────────────────────────────────────────────

def slugify(text: str) -> str:
    """Convert text to a URL-safe slug."""
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text.lower())
    text = re.sub(r"[-\s]+", "-", text).strip("-")
    return text


def classify_type(place: dict) -> str:
    """Determine accommodation type from Google Places data."""
    name = place.get("displayName", {}).get("text", "").lower()

    # Check name keywords first (most specific)
    for keyword, accom_type in NAME_TYPE_KEYWORDS.items():
        if keyword in name:
            return accom_type

    # Check Google primary type
    primary = place.get("primaryType", "")
    if primary in TYPE_MAP:
        return TYPE_MAP[primary]

    # Check all types
    for t in place.get("types", []):
        if t in TYPE_MAP:
            return TYPE_MAP[t]

    return "hotel"  # Default


def classify_price(place: dict) -> str:
    """Map Google price_level to our priceRange."""
    level = str(place.get("priceLevel", "PRICE_LEVEL_UNSPECIFIED"))
    return PRICE_MAP.get(level, "mid-range")


def extract_star_rating(place: dict) -> int | None:
    """Extract star rating from Google rating, rounded to nearest int."""
    rating = place.get("rating")
    if rating is not None and rating >= 1.0:
        return min(5, max(1, round(rating)))
    return None


def is_accommodation(place: dict) -> bool:
    """Check if a place is actually an accommodation (not a restaurant, bar, etc.)."""
    types = set(place.get("types", []))
    accommodation_types = {
        "hotel", "resort_hotel", "extended_stay_hotel", "lodging",
        "motel", "bed_and_breakfast", "guest_house", "cottage",
        "hostel", "campground", "camping_cabin", "rv_park",
        "farm_stay", "private_guest_room",
    }
    # Must have at least one accommodation type
    return bool(types & accommodation_types)


def is_operational(place: dict) -> bool:
    """Check if the property is currently operational."""
    status = place.get("businessStatus", "")
    return status == "OPERATIONAL"


def place_to_accommodation(place: dict, destination: str, nearest_town: str) -> dict:
    """Convert a Google Places result to our Accommodation schema format."""
    name = place.get("displayName", {}).get("text", "Unknown")
    address = place.get("formattedAddress", "")
    short_address = place.get("shortFormattedAddress", address)
    website = place.get("websiteUri", "")
    editorial = place.get("editorialSummary", {}).get("text", "")
    maps_url = place.get("googleMapsUri", "")
    place_id = place.get("id", "")

    accom_type = classify_type(place)
    price_range = classify_price(place)
    star_rating = extract_star_rating(place)

    now = datetime.now(timezone.utc).isoformat()

    return {
        "id": slugify(name) + "-" + slugify(nearest_town),
        "name": name,
        "description": editorial if editorial else f"Accommodation in {nearest_town}, Norway. Description pending editorial review.",
        "destination": destination,
        "location": short_address or address,
        "priceRange": price_range,
        "website": website if website else None,
        "imageUrl": None,
        "imageAlt": None,
        "status": "draft",
        "isFeatured": False,
        "sortOrder": 0,
        "createdAt": now,
        "updatedAt": now,
        "accommodationType": accom_type,
        "starRating": star_rating,
        "amenities": [],
        "capacity": None,
        "checkIn": "15:00",
        "checkOut": "11:00",
        "bookingUrl": None,
        "isEcoFriendly": False,
        "nearestTown": nearest_town,
        # Extra fields for reference (not in Zod schema, but useful for admin)
        "_googlePlaceId": place_id,
        "_googleMapsUrl": maps_url,
        "_googleRating": place.get("rating"),
        "_googleReviewCount": place.get("userRatingCount", 0),
    }


# ─────────────────────────────────────────────────────────────────────────────
# Search functions
# ─────────────────────────────────────────────────────────────────────────────

def search_accommodation(location: dict, query: str, page_token: str = None) -> dict:
    """Search for accommodation near a location using Places API v1 Text Search."""
    url = f"{PLACES_BASE}/places:searchText"
    headers = {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": SEARCH_FIELDS,
        "Content-Type": "application/json",
    }

    body = {
        "textQuery": query,
        "locationBias": {
            "circle": {
                "center": {
                    "latitude": location["lat"],
                    "longitude": location["lng"],
                },
                "radius": float(location["radius"]),
            }
        },
        "languageCode": "en",
        "maxResultCount": 20,
    }

    if page_token:
        body["pageToken"] = page_token

    resp = requests.post(url, headers=headers, json=body, timeout=30)
    resp.raise_for_status()
    return resp.json()


def fetch_location_accommodation(location: dict, destination: str) -> list:
    """Fetch accommodation for a single location."""
    label = location["label"]
    target = location["target"]
    seen_ids = set()
    results = []

    # Search queries to try — broadest first, then specific types
    queries = [
        f"hotels in {label}, Norway",
        f"accommodation in {label}, Norway",
        f"cabin rental {label}, Norway",
        f"hostel {label}, Norway",
        f"camping {label}, Norway",
        f"rorbu {label}, Norway",
        f"glamping {label}, Norway",
        f"apartment rental {label}, Norway",
    ]

    for query in queries:
        if len(results) >= target:
            break

        page_token = None
        while len(results) < target:
            try:
                data = search_accommodation(location, query, page_token)
            except requests.exceptions.HTTPError as e:
                print(f"    [error] Search failed for '{query}': {e}")
                break

            places = data.get("places", [])
            if not places:
                break

            for place in places:
                pid = place.get("id", "")
                if pid in seen_ids:
                    continue
                seen_ids.add(pid)

                if not is_operational(place):
                    name = place.get("displayName", {}).get("text", "?")
                    print(f"    [SKIP] {name} — not operational")
                    continue

                if not is_accommodation(place):
                    continue

                accom = place_to_accommodation(place, destination, label)
                results.append(accom)

                if len(results) >= target:
                    break

            page_token = data.get("nextPageToken")
            if not page_token:
                break
            time.sleep(1.5)

        time.sleep(0.8)

    # Sort by Google rating (highest first)
    results.sort(
        key=lambda r: (r.get("_googleRating") or 0, r.get("_googleReviewCount", 0)),
        reverse=True,
    )

    return results[:target]


# ─────────────────────────────────────────────────────────────────────────────
# Output
# ─────────────────────────────────────────────────────────────────────────────

def load_existing() -> list:
    """Load existing accommodation data, preserving manually edited entries."""
    if not OUTPUT_FILE.exists():
        return []
    try:
        with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, list):
            return data
        if isinstance(data, dict):
            # Could be empty {} or a different structure
            return list(data.values()) if data else []
    except (json.JSONDecodeError, ValueError):
        return []
    return []


def write_output(new_entries: list, dry_run: bool = False):
    """Merge new entries with existing data and write to JSON."""
    existing = load_existing()
    existing_names = {e["name"].lower() for e in existing}

    # Only add entries that don't already exist (by name, case-insensitive)
    unique_new = [e for e in new_entries if e["name"].lower() not in existing_names]

    # Assign sort orders to new entries
    max_sort = max((e.get("sortOrder", 0) for e in existing), default=0)
    for i, entry in enumerate(unique_new):
        entry["sortOrder"] = max_sort + i + 1

    merged = existing + unique_new

    if dry_run:
        print(f"\n  [dry-run] Would write {len(unique_new)} new entries ({len(existing)} existing, {len(merged)} total)")
        return

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(merged, f, indent=2, ensure_ascii=False)

    print(f"\n  [write] {len(unique_new)} new + {len(existing)} existing = {len(merged)} total → {OUTPUT_FILE}")


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Fetch accommodation data for NorgeTravel via Google Places API")
    parser.add_argument("--region", choices=list(REGIONS.keys()), help="Fetch one region only")
    parser.add_argument("--limit", type=int, help="Override target count per location")
    parser.add_argument("--dry-run", action="store_true", help="Print results without writing")
    parser.add_argument("--min-rating", type=float, default=3.0, help="Minimum Google rating (default: 3.0)")
    args = parser.parse_args()

    if not API_KEY:
        print("[error] GOOGLE_PLACES_API_KEY not set.")
        print("  Set it:  set GOOGLE_PLACES_API_KEY=your-key-here")
        sys.exit(1)

    regions_to_fetch = {args.region: REGIONS[args.region]} if args.region else REGIONS

    all_new = []

    for region_key, region_config in regions_to_fetch.items():
        destination = region_config["destination"]
        print(f"\n{'='*60}")
        print(f"  Region: {region_key.upper()}  →  destination: {destination}")
        print(f"{'='*60}")

        for location in region_config["locations"]:
            label = location["label"]
            target = args.limit or location["target"]
            location_copy = {**location, "target": target}

            print(f"\n  [{label}] Searching (target: {target})...")
            results = fetch_location_accommodation(location_copy, destination)

            # Filter by minimum rating
            before = len(results)
            results = [
                r for r in results
                if (r.get("_googleRating") or 0) >= args.min_rating
            ]
            filtered = before - len(results)
            if filtered:
                print(f"    [filter] Removed {filtered} below {args.min_rating}★")

            print(f"    → {label}: {len(results)} properties found")

            if args.dry_run:
                for i, r in enumerate(results[:5]):
                    rating = r.get("_googleRating", "?")
                    reviews = r.get("_googleReviewCount", 0)
                    print(f"      {i+1}. {r['name']} ({r['accommodationType']}) — ★{rating} ({reviews}) — {r['priceRange']}")
                if len(results) > 5:
                    print(f"      ... and {len(results) - 5} more")

            all_new.extend(results)

    print(f"\n{'='*60}")
    print(f"  Total new properties fetched: {len(all_new)}")
    print(f"{'='*60}")

    write_output(all_new, dry_run=args.dry_run)

    if not args.dry_run:
        print(f"\n  All entries saved as status: 'draft'")
        print(f"  Next steps:")
        print(f"    1. Review in admin: /admin/travel/accommodation")
        print(f"    2. Add images, amenities, descriptions")
        print(f"    3. Set status to 'published' when ready")
        print(f"    4. Build: npm run build")


if __name__ == "__main__":
    main()
