"""
NorgeTravel Rating Enricher
============================
Fetches multi-source ratings (TripAdvisor, Yelp, Facebook) for restaurants,
accommodations, experiences, guides, and transport, then computes a
composite dice score (1-6).

SCORING FORMULA
---------------
Sources: Google (25%), TripAdvisor (25%), Yelp (25%), Facebook (25%)
All sources use a 1-5 scale. Missing sources are skipped and weights redistributed.
Michelin bonus: +10% if distinction is 'stars' or 'bib-gourmand' (cap: 6)

  weighted_avg = sum(score * weight for available sources)
  dice_raw     = 1 + (weighted_avg - 1) * 1.25   # maps 1-5 -> 1-6
  if michelin stars/bib: dice_raw *= 1.10
  dice_score   = min(6, max(1, round(dice_raw)))

REQUIRED ENVIRONMENT VARIABLES (all optional - missing keys skip that source)
---------------------------------------------------------------------------
  GOOGLE_PLACES_API_KEY    - Google Places API key (already in data, used for re-fetch)
  TRIPADVISOR_API_KEY      - TripAdvisor Content API key
  (Yelp)                   - No key needed. Uses Playwright to scrape public page ratings.
  (Facebook)               - No key needed. Uses Playwright to scrape public page ratings.
                             Install: pip install playwright && playwright install chromium

USAGE
-----
  # Set keys (Windows)
  set TRIPADVISOR_API_KEY=your-ta-key
  # Yelp + Facebook: no keys needed — uses Playwright web scraping

  # Restaurants
  python scripts/enrich_ratings.py --type restaurants --city tromso
  python scripts/enrich_ratings.py --type restaurants --all
  python scripts/enrich_ratings.py --type restaurants --city tromso --dry-run

  # Accommodations / Experiences / Guides / Transport
  python scripts/enrich_ratings.py --type accommodations
  python scripts/enrich_ratings.py --type experiences
  python scripts/enrich_ratings.py --type guides
  python scripts/enrich_ratings.py --type transport

  # Recompute dice scores from existing ratings only (no API calls)
  python scripts/enrich_ratings.py --type restaurants --city tromso --recalc-only
  python scripts/enrich_ratings.py --type experiences --recalc-only

  # Force re-fetch even if ratings already present
  python scripts/enrich_ratings.py --type restaurants --city tromso --refresh
"""

import argparse
import difflib
import json
import os
import re
import sys
import time
from pathlib import Path
from urllib.parse import unquote, urlencode

import requests

# Playwright is optional — Facebook scraping uses it, everything else works without
try:
    from playwright.sync_api import sync_playwright
    HAS_PLAYWRIGHT = True
except ImportError:
    HAS_PLAYWRIGHT = False

# ─────────────────────────────────────────────────────────────────────────────
# Config
# ─────────────────────────────────────────────────────────────────────────────

ROOT = Path(__file__).parent.parent

GOOGLE_API_KEY = os.environ.get("GOOGLE_PLACES_API_KEY", "")
TA_API_KEY = os.environ.get("TRIPADVISOR_API_KEY", "")

TA_BASE = "https://api.content.tripadvisor.com/api/v1"

# Name similarity threshold — 0.85 means ~85% character overlap
NAME_SIMILARITY_THRESHOLD = 0.82

# Michelin types that earn the +10% bonus
MICHELIN_BONUS_TYPES = {"stars", "bib-gourmand"}
MICHELIN_BONUS = 1.10

RESTAURANT_CITIES = {
    "tromso":     {"name": "Tromsø, Norway",    "country": "NO"},
    "trondheim":  {"name": "Trondheim, Norway",  "country": "NO"},
    "stavanger":  {"name": "Stavanger, Norway",  "country": "NO"},
    "bergen":     {"name": "Bergen, Norway",     "country": "NO"},
    "oslo":       {"name": "Oslo, Norway",       "country": "NO"},
}

# Travel data JSON files (dict-keyed format: {id: {item}, ...})
TRAVEL_DATA_FILES = {
    "accommodations": ROOT / "src" / "data" / "travel-accommodation.json",
    "experiences":    ROOT / "src" / "data" / "travel-experiences.json",
    "guides":         ROOT / "src" / "data" / "travel-guides.json",
    "transport":      ROOT / "src" / "data" / "travel-transport.json",
}

# TripAdvisor search categories per data type
TA_CATEGORIES = {
    "restaurants":    "restaurants",
    "accommodations": "hotels",
    "experiences":    "attractions",
    "guides":         "attractions",
    "transport":      "attractions",
}

# ─────────────────────────────────────────────────────────────────────────────
# Dice Score
# ─────────────────────────────────────────────────────────────────────────────

def compute_dice(ratings: dict) -> int | None:
    """
    Compute the 1-6 dice score from the ratings dict.
    Handles Google, TripAdvisor, Yelp, Facebook with equal 25% weights.
    Applies Michelin +10% bonus if applicable.
    Returns None if no scores are available.
    """
    raw_scores = {}

    g = ratings.get("google") or {}
    if g.get("score"):
        raw_scores["google"] = float(g["score"])

    ta = ratings.get("tripAdvisor") or {}
    if ta.get("score"):
        raw_scores["tripadvisor"] = float(ta["score"])

    y = ratings.get("yelp") or {}
    if y.get("score"):
        raw_scores["yelp"] = float(y["score"])

    fb = ratings.get("facebook") or {}
    if fb.get("score"):
        raw_scores["facebook"] = float(fb["score"])

    if not raw_scores:
        return None

    # Equal-weight average of available sources
    avg = sum(raw_scores.values()) / len(raw_scores)

    # Map 1-5 scale to 1-6 scale
    dice_raw = 1.0 + (avg - 1.0) * 1.25

    # Michelin bonus
    michelin = ratings.get("michelin") or {}
    if michelin.get("type") in MICHELIN_BONUS_TYPES:
        dice_raw *= MICHELIN_BONUS

    return min(6, max(1, round(dice_raw)))


# ─────────────────────────────────────────────────────────────────────────────
# Name matching
# ─────────────────────────────────────────────────────────────────────────────

def name_similarity(a: str, b: str) -> float:
    """Return similarity ratio between two strings (0.0-1.0), case-insensitive."""
    a = a.lower().strip()
    b = b.lower().strip()
    return difflib.SequenceMatcher(None, a, b).ratio()


def best_match(query_name: str, candidates: list[dict], name_key: str) -> dict | None:
    """
    Return the best matching candidate dict by name similarity.
    Uses SequenceMatcher ratio, but also checks substring containment
    (e.g. "Hildr" matching "Hildr Gastro Bar").
    Returns None if no candidate meets the threshold.
    """
    best = None
    best_score = 0.0
    query_lower = query_name.lower().strip()
    for c in candidates:
        cand_name = c.get(name_key, "")
        cand_lower = cand_name.lower().strip()

        sim = name_similarity(query_name, cand_name)

        # Boost score if one name contains the other (substring match)
        if cand_lower in query_lower or query_lower in cand_lower:
            # Give a high similarity for substring containment,
            # but proportional to how much of the longer string is covered
            longer = max(len(query_lower), len(cand_lower))
            shorter = min(len(query_lower), len(cand_lower))
            coverage = shorter / longer if longer > 0 else 0
            sim = max(sim, 0.75 + 0.25 * coverage)  # at least 0.75 for any substring match

        if sim > best_score:
            best_score = sim
            best = c
    if best and best_score >= NAME_SIMILARITY_THRESHOLD:
        return best
    return None


# ─────────────────────────────────────────────────────────────────────────────
# Yelp (web scraping via Playwright — no API key needed)
# ─────────────────────────────────────────────────────────────────────────────

def _search_duckduckgo(query: str) -> str:
    """Run a DuckDuckGo HTML search and return the raw HTML. No captcha/rate-limit."""
    resp = requests.get(
        "https://html.duckduckgo.com/html/",
        params={"q": query},
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept-Language": "en-US,en;q=0.9",
        },
        timeout=15,
    )
    resp.raise_for_status()
    return resp.text


def _find_yelp_page(name: str, location: str) -> str | None:
    """
    Search Yelp directly using Playwright to find a business page URL.
    Returns the Yelp biz URL or None.
    """
    browser = _get_fb_browser()
    if not browser:
        return None

    city = location.split(",")[0].strip()
    search_url = f"https://www.yelp.com/search?{urlencode({'find_desc': name, 'find_loc': city})}"

    context = None
    try:
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            locale="en-US",
            viewport={"width": 1280, "height": 800},
        )
        page = context.new_page()
        page.route("**/*.{png,jpg,jpeg,gif,svg,mp4,webp,avif}", lambda route: route.abort())

        page.goto(search_url, wait_until="domcontentloaded", timeout=20000)
        page.wait_for_timeout(2000)

        html = page.content()

        # Extract /biz/ links from Yelp search results
        biz_urls = re.findall(r'href="(/biz/[^"?]+)', html)

        # Deduplicate and filter
        seen = set()
        for biz_path in biz_urls:
            clean = biz_path.rstrip("/")
            if clean not in seen:
                seen.add(clean)
                # Check name similarity with the slug
                slug = clean.split("/biz/")[-1].replace("-", " ")
                sim = name_similarity(name, slug)
                if sim >= 0.5:  # loose match for slug comparison
                    return f"https://www.yelp.com{clean}"

        # If no slug match, return first biz result
        if seen:
            first = next(iter(seen))
            return f"https://www.yelp.com{first}"

        return None

    except Exception as e:
        print(f"      [yelp-search-error] {name}: {e}")
        return None
    finally:
        if context:
            context.close()


def _scrape_yelp_rating(page_url: str, name: str) -> dict | None:
    """
    Visit a Yelp business page with Playwright and extract the rating.
    Yelp shows ratings like "4.5 star rating" and "123 reviews" on business pages.
    Returns: {"score": float, "reviewCount": int} or None
    """
    browser = _get_fb_browser()  # reuse the shared browser instance
    if not browser:
        return None

    context = None
    try:
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            locale="en-US",
            viewport={"width": 1280, "height": 800},
        )
        page = context.new_page()

        # Block images and media to speed up loading
        page.route("**/*.{png,jpg,jpeg,gif,svg,mp4,webp,avif}", lambda route: route.abort())

        page.goto(page_url, wait_until="domcontentloaded", timeout=20000)
        page.wait_for_timeout(2000)

        html = page.content()

        # Strategy 1: JSON-LD structured data (most reliable)
        # Yelp embeds LocalBusiness schema with aggregateRating
        ld_matches = re.findall(r'<script[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', html, re.DOTALL)
        for ld_text in ld_matches:
            try:
                ld = json.loads(ld_text)
                # Could be a single object or a list
                items = ld if isinstance(ld, list) else [ld]
                for item in items:
                    agg = item.get("aggregateRating")
                    if agg:
                        score = float(agg.get("ratingValue", 0))
                        count = int(agg.get("reviewCount", 0))
                        if 1.0 <= score <= 5.0:
                            return {"score": round(score, 1), "reviewCount": count}
            except (json.JSONDecodeError, ValueError, TypeError):
                continue

        # Strategy 2: Meta tags
        # <meta property="og:description" content="... 4.5 star rating ...">
        meta_match = re.search(r'(\d+\.?\d*)\s*star\s*rating', html, re.IGNORECASE)

        # Strategy 3: aria-label on rating element
        # <div aria-label="4.5 star rating">
        aria_match = re.search(r'aria-label=["\'](\d+\.?\d*)\s*star\s*rating["\']', html, re.IGNORECASE)

        score = None
        if aria_match:
            score = float(aria_match.group(1))
        elif meta_match:
            score = float(meta_match.group(1))

        if score and 1.0 <= score <= 5.0:
            # Extract review count
            text = page.inner_text("body")
            count = 0
            # Pattern: "123 reviews" or "(123 reviews)"
            count_match = re.search(r'(\d[\d,]*)\s*reviews?', text, re.IGNORECASE)
            if count_match:
                count = int(count_match.group(1).replace(",", ""))
            return {"score": round(score, 1), "reviewCount": count}

        return None

    except Exception as e:
        print(f"      [yelp-scrape-error] {name}: {e}")
        return None
    finally:
        if context:
            context.close()


def fetch_yelp_rating(name: str, location: str, categories: str = "") -> dict | None:
    """
    Find a business's Yelp page via Google search, then scrape its rating.
    Uses Playwright (headless Chromium). No API key required.
    Returns: {"score": float, "reviewCount": int} or None
    """
    if not HAS_PLAYWRIGHT:
        return None

    # Step 1: find the Yelp page URL
    page_url = _find_yelp_page(name, location)
    if not page_url:
        return None

    print(f"      [yelp] found: {page_url}")

    # Step 2: scrape the rating from the page
    return _scrape_yelp_rating(page_url, name)


# ─────────────────────────────────────────────────────────────────────────────
# TripAdvisor
# ─────────────────────────────────────────────────────────────────────────────

def fetch_tripadvisor_rating(name: str, location: str, category: str = "restaurants") -> dict | None:
    """
    Search TripAdvisor Content API for a location and return rating data.
    Returns: {"score": float, "reviewCount": int, "bubbleRating": int} or None
    """
    if not TA_API_KEY:
        return None

    # Step 1: search for location ID
    # Note: 'address' param breaks results for Norwegian locations.
    # Include city in searchQuery instead.
    city = location.split(",")[0].strip()
    try:
        resp = requests.get(
            f"{TA_BASE}/location/search",
            params={
                "key": TA_API_KEY,
                "searchQuery": f"{name} {city}",
                "language": "en",
                "category": category,
            },
            timeout=15,
        )
        resp.raise_for_status()
        search_data = resp.json()
    except Exception as e:
        print(f"      [tripadvisor-error] search {name}: {e}")
        return None

    candidates = search_data.get("data", [])
    # Build candidate list for name matching
    candidate_dicts = [
        {"location_id": c.get("location_id"), "name": c.get("name", "")}
        for c in candidates
    ]
    match = best_match(name, candidate_dicts, "name")
    if not match:
        return None

    location_id = match["location_id"]

    # Step 2: fetch details
    time.sleep(0.3)
    try:
        resp = requests.get(
            f"{TA_BASE}/location/{location_id}/details",
            params={
                "key": TA_API_KEY,
                "language": "en",
                "fields": "rating,num_reviews",
            },
            timeout=15,
        )
        resp.raise_for_status()
        detail = resp.json()
    except Exception as e:
        print(f"      [tripadvisor-error] detail {location_id}: {e}")
        return None

    rating_str = detail.get("rating")
    num_reviews = detail.get("num_reviews", 0)

    if not rating_str:
        return None

    try:
        score = float(rating_str)
    except ValueError:
        return None

    if score == 0:
        return None

    # Compute bubble rating (TripAdvisor 1-5 rounded)
    bubble = min(5, max(1, round(score)))

    return {
        "score": round(score, 1),
        "reviewCount": int(num_reviews),
        "bubbleRating": bubble,
    }


# ─────────────────────────────────────────────────────────────────────────────
# Facebook (web scraping via Playwright — no API key needed)
# ─────────────────────────────────────────────────────────────────────────────

# Shared Playwright browser instance (lazy-initialized)
_fb_browser = None
_fb_playwright = None


def _get_fb_browser():
    """Get or create a shared headless Chromium browser for Facebook scraping."""
    global _fb_browser, _fb_playwright
    if _fb_browser is None:
        if not HAS_PLAYWRIGHT:
            return None
        _fb_playwright = sync_playwright().start()
        _fb_browser = _fb_playwright.chromium.launch(
            headless=True,
            args=["--disable-blink-features=AutomationControlled"],
        )
    return _fb_browser


def close_fb_browser():
    """Clean up the shared browser instance."""
    global _fb_browser, _fb_playwright
    if _fb_browser:
        _fb_browser.close()
        _fb_browser = None
    if _fb_playwright:
        _fb_playwright.stop()
        _fb_playwright = None


def _extract_ddg_urls(html: str, domain_filter: str) -> list[str]:
    """
    Extract actual URLs from DuckDuckGo HTML search results.
    DDG wraps links in redirects: //duckduckgo.com/l/?uddg=https%3A%2F%2Fwww.facebook.com%2F...
    This function extracts and decodes the real destination URLs.
    """
    urls = []

    # Pattern 1: DDG redirect links with uddg parameter
    uddg_matches = re.findall(r'uddg=([^&"\']+)', html)
    for encoded_url in uddg_matches:
        decoded = unquote(encoded_url)
        # Skip DDG internal ad/tracking URLs
        if "duckduckgo.com" in decoded:
            continue
        if domain_filter in decoded.lower():
            urls.append(decoded)

    # Pattern 2: Direct URLs (fallback)
    direct_matches = re.findall(
        rf'https?://(?:www\.)?{re.escape(domain_filter)}[^\s"&<>\']+', html
    )
    for url in direct_matches:
        if url not in urls:
            urls.append(url)

    return urls


def _find_facebook_page(name: str, location: str) -> str | None:
    """
    Find a Facebook page for a business by trying common URL patterns.
    Facebook pages often follow: facebook.com/{BusinessName}
    Uses Playwright to verify the page exists and is a business page.
    Returns the Facebook page URL or None.
    """
    browser = _get_fb_browser()
    if not browser:
        return None

    # Generate candidate slugs from the business name
    # e.g. "Maaemo" -> ["MAAEMO", "maaemo", "MaaemoOslo"]
    city = location.split(",")[0].strip()
    clean_name = re.sub(r'[^\w\s]', '', name)  # remove punctuation
    candidates = [
        clean_name.replace(" ", ""),                          # "MaaemoRestaurant"
        clean_name.replace(" ", "").upper(),                   # "MAAEMORESTAURANT"
        clean_name.replace(" ", "").lower(),                   # "maaemorestaurant"
        clean_name.split()[0] if clean_name.split() else "",  # "Maaemo"
        clean_name.split()[0].upper() if clean_name.split() else "",  # "MAAEMO"
        clean_name.split()[0].lower() if clean_name.split() else "",  # "maaemo"
        f"{clean_name.replace(' ', '')}{city}".replace(" ", ""),  # "MaaemoOslo"
        f"{clean_name.replace(' ', '.')}.{city}".lower(),      # "maaemo.oslo"
    ]
    # Remove empty and duplicate candidates
    seen = set()
    unique_candidates = []
    for c in candidates:
        if c and c not in seen:
            seen.add(c)
            unique_candidates.append(c)

    context = None
    try:
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            locale="en-US",
            viewport={"width": 1280, "height": 800},
        )
        page = context.new_page()
        page.route("**/*.{png,jpg,jpeg,gif,svg,mp4,webp,avif}", lambda route: route.abort())

        for slug in unique_candidates:
            fb_url = f"https://www.facebook.com/{slug}/"
            try:
                resp = page.goto(fb_url, wait_until="domcontentloaded", timeout=10000)
                if not resp or resp.status >= 400:
                    continue

                page.wait_for_timeout(1500)
                html = page.content()

                # Check if this is a real business page (not a 404, login wall, or personal profile)
                # Business pages usually have rating meta tags, or "Restaurant", "Business", etc. in content
                is_business = bool(
                    re.search(r'og:type.*(?:business|restaurant|place)', html, re.IGNORECASE)
                    or re.search(r'(?:rating|reviews?|recommend)', html, re.IGNORECASE)
                    or re.search(r'Restaurant|Hotel|Cafe|Bar|Business', page.title() or "", re.IGNORECASE)
                )

                # Also verify the page name roughly matches our search
                page_name_match = re.search(r'<title>([^<]+)</title>', html)
                if page_name_match:
                    page_title = page_name_match.group(1)
                    # Facebook titles are like "Maaemo - Oslo, Norway - Restaurant | Facebook"
                    title_name = page_title.split(" - ")[0].split(" | ")[0].strip()
                    sim = name_similarity(name, title_name)
                    # Verify city matches (avoid wrong-city pages for common names)
                    city_in_title = city.lower() in page_title.lower()
                    if sim >= 0.5 and is_business and city_in_title:
                        return fb_url
                    elif sim >= 0.7 and city_in_title:
                        return fb_url
                    elif sim >= 0.85 and is_business:
                        # Very high name match - accept even without city in title
                        return fb_url

            except Exception:
                continue

        return None

    except Exception as e:
        print(f"      [facebook-search-error] {name}: {e}")
        return None
    finally:
        if context:
            context.close()


def _scrape_facebook_rating(page_url: str, name: str) -> dict | None:
    """
    Visit a Facebook page with Playwright and extract the rating.
    Facebook shows ratings like "4.5 out of 5" or "4.5 (123 reviews)" on business pages.
    Returns: {"score": float, "reviewCount": int} or None
    """
    browser = _get_fb_browser()
    if not browser:
        return None

    context = None
    try:
        context = browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            locale="en-US",
            viewport={"width": 1280, "height": 800},
        )
        page = context.new_page()

        # Block images and media to speed up loading
        page.route("**/*.{png,jpg,jpeg,gif,svg,mp4,webp,avif}", lambda route: route.abort())

        page.goto(page_url, wait_until="domcontentloaded", timeout=20000)

        # Wait a moment for dynamic content
        page.wait_for_timeout(2000)

        # Close any login popups that appear
        try:
            close_btn = page.locator('[aria-label="Close"]').first
            if close_btn.is_visible(timeout=1000):
                close_btn.click()
                page.wait_for_timeout(500)
        except Exception:
            pass

        html = page.content()

        # Strategy 1: Look for rating in meta tags
        # <meta property="og:rating:value" content="4.5">
        meta_score = re.search(r'property=["\']og:rating:value["\'][^>]*content=["\']([0-9.]+)["\']', html)
        meta_count = re.search(r'property=["\']og:rating:count["\'][^>]*content=["\']([0-9]+)["\']', html)

        if meta_score:
            score = float(meta_score.group(1))
            count = int(meta_count.group(1)) if meta_count else 0
            if 1.0 <= score <= 5.0:
                return {"score": round(score, 1), "reviewCount": count}

        # Strategy 2: Look for rating text patterns in page content
        # Patterns: "4.5 out of 5", "4.5/5", "Rating: 4.5"
        text = page.inner_text("body")

        # Pattern: "X.X out of 5 based on Y reviews"
        m = re.search(r'(\d+\.?\d*)\s*(?:out of|\/)\s*5(?:\s*(?:based on|from)\s*(\d[\d,]*)\s*(?:reviews?|ratings?|recommendations?))?', text, re.IGNORECASE)
        if m:
            score = float(m.group(1))
            count_str = m.group(2)
            count = int(count_str.replace(",", "")) if count_str else 0
            if 1.0 <= score <= 5.0:
                return {"score": round(score, 1), "reviewCount": count}

        # Pattern: "X.X (Y reviews)" or "X.X · Y reviews"
        m = re.search(r'(\d+\.?\d*)\s*[\(\u00B7]\s*(\d[\d,]*)\s*(?:reviews?|ratings?)', text, re.IGNORECASE)
        if m:
            score = float(m.group(1))
            count = int(m.group(2).replace(",", ""))
            if 1.0 <= score <= 5.0:
                return {"score": round(score, 1), "reviewCount": count}

        # Strategy 3: Facebook recommendation system (% recommend + review count)
        # Facebook shows "96% recommend (1,164 reviews)" on business pages
        # First try: "X% recommend (Y reviews)"
        m = re.search(r'(\d+)%\s*recommend\s*\((\d[\d,]*)\s*reviews?\)', text, re.IGNORECASE)
        if m:
            pct = int(m.group(1))
            count = int(m.group(2).replace(",", ""))
            # Convert recommendation % to a 1-5 score: 100% = 5.0, 50% = 2.5
            score = round(pct / 100.0 * 5.0, 1)
            score = max(1.0, min(5.0, score))
            return {"score": score, "reviewCount": count}

        # Fallback: "X people recommend" or just "X recommend"
        m = re.search(r'(\d[\d,]*)\s*(?:people\s+)?recommend', text, re.IGNORECASE)
        if m:
            rec_count = int(m.group(1).replace(",", ""))
            if rec_count > 0:
                # High recommendation count implies positive sentiment; estimate 4.5/5
                return {"score": 4.5, "reviewCount": rec_count}

        return None

    except Exception as e:
        print(f"      [facebook-scrape-error] {name}: {e}")
        return None
    finally:
        if context:
            context.close()


def fetch_facebook_rating(name: str, location: str) -> dict | None:
    """
    Find a business's Facebook page via Google search, then scrape its rating.
    Uses Playwright (headless Chromium). No API key required.
    Returns: {"score": float, "reviewCount": int} or None
    """
    if not HAS_PLAYWRIGHT:
        return None

    # Step 1: find the Facebook page URL
    page_url = _find_facebook_page(name, location)
    if not page_url:
        return None

    print(f"      [facebook] found: {page_url}")

    # Step 2: scrape the rating from the page
    return _scrape_facebook_rating(page_url, name)


# ─────────────────────────────────────────────────────────────────────────────
# Core enrichment
# ─────────────────────────────────────────────────────────────────────────────

def enrich_item(item: dict, location: str, data_type: str = "restaurants", refresh: bool = False, dry_run: bool = False) -> dict:
    """
    Fetch missing ratings for a single entry (restaurant, accommodation,
    experience, guide, or transport).
    Returns the updated item dict (or the original if dry_run).
    """
    name = item.get("name", "")
    ratings = item.get("ratings", {})
    changed = False

    ta_cat = TA_CATEGORIES.get(data_type, "restaurants")

    # TripAdvisor
    if refresh or not ratings.get("tripAdvisor"):
        if TA_API_KEY:
            print(f"    [tripadvisor] {name}...")
            ta = fetch_tripadvisor_rating(name, location, category=ta_cat)
            if ta:
                ratings["tripAdvisor"] = ta
                changed = True
                print(f"      -> {ta['score']} ({ta['reviewCount']} reviews)")
            else:
                print(f"      -> no match")
            time.sleep(0.5)
        # else: key absent, skip silently

    # Yelp (web scraping via Playwright — no API key needed)
    if refresh or not ratings.get("yelp"):
        if HAS_PLAYWRIGHT:
            print(f"    [yelp] {name}...")
            y = fetch_yelp_rating(name, location)
            if y:
                ratings["yelp"] = y
                changed = True
                print(f"      -> {y['score']} ({y['reviewCount']} reviews)")
            else:
                print(f"      -> no match")
            time.sleep(3)  # rate-limit Google searches to avoid 429s
        # else: Playwright not installed, skip silently

    # Facebook (web scraping via Playwright — no API key needed)
    if refresh or not ratings.get("facebook"):
        if HAS_PLAYWRIGHT:
            print(f"    [facebook] {name}...")
            fb = fetch_facebook_rating(name, location)
            if fb:
                ratings["facebook"] = fb
                changed = True
                print(f"      -> {fb['score']} ({fb['reviewCount']} reviews)")
            else:
                print(f"      -> no match")
            time.sleep(3)  # rate-limit Google searches to avoid 429s
        # else: Playwright not installed, skip silently

    # Compute dice score (always recompute if any ratings present)
    dice = compute_dice(ratings)
    if dice is not None:
        old_dice = item.get("diceScore")
        if old_dice != dice:
            changed = True
        item_dice = dice
    else:
        item_dice = None

    if dry_run:
        sources_present = [s for s in ["google", "tripAdvisor", "yelp", "facebook"] if ratings.get(s)]
        print(f"    [dry-run] {name}: sources={sources_present}, dice={item_dice}")
        return item

    if changed or item.get("diceScore") != item_dice:
        item["ratings"] = ratings
        if item_dice is not None:
            item["diceScore"] = item_dice
        elif "diceScore" in item:
            del item["diceScore"]

    return item


# ─────────────────────────────────────────────────────────────────────────────
# Restaurant pipeline
# ─────────────────────────────────────────────────────────────────────────────

def enrich_restaurants(city_key: str, refresh: bool = False, dry_run: bool = False, recalc_only: bool = False):
    city_cfg = RESTAURANT_CITIES[city_key]
    json_path = ROOT / "src" / "data" / "city-guides" / f"restaurants-{city_key}.json"

    if not json_path.exists():
        print(f"  [skip] {json_path} not found — run fetch_restaurants.py first")
        return

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    restaurants = data.get("restaurants", [])
    print(f"\n  {city_cfg['name']} — {len(restaurants)} restaurants")

    for i, r in enumerate(restaurants):
        print(f"\n  [{i+1}/{len(restaurants)}] {r['name']}")
        if recalc_only:
            dice = compute_dice(r.get("ratings", {}))
            if dice is not None:
                r["diceScore"] = dice
                print(f"    -> dice={dice}")
        else:
            enrich_item(r, city_cfg["name"], data_type="restaurants", refresh=refresh, dry_run=dry_run)

    if not dry_run:
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"\n  [write] {json_path}")
        print(f"  Next: python scripts/import_restaurants.py --city {city_key}")


# ─────────────────────────────────────────────────────────────────────────────
# Generic travel data pipeline (accommodations, experiences, guides, transport)
# ─────────────────────────────────────────────────────────────────────────────

def enrich_travel_data(data_type: str, refresh: bool = False, dry_run: bool = False, recalc_only: bool = False):
    """
    Enrich a travel data JSON file. Handles two formats:
      - Dict-keyed: {id: {item}, id2: {item2}, ...}  (experiences, guides, transport)
      - Array or dict-with-array: [{item}, ...] or {"items": [{item}, ...]}  (accommodations)
    """
    json_path = TRAVEL_DATA_FILES.get(data_type)
    if not json_path:
        print(f"  [error] Unknown data type: {data_type}")
        return

    if not json_path.exists():
        print(f"  [skip] {json_path} not found")
        return

    with open(json_path, "r", encoding="utf-8") as f:
        raw = json.load(f)

    # Determine format and extract items
    items = []          # list of (key_or_index, item_dict) tuples
    is_dict_keyed = False
    wrap_key = None

    if isinstance(raw, dict):
        # Check if it's an array-wrapping dict (accommodation format)
        array_key = next((k for k, v in raw.items() if isinstance(v, list)), None)
        if array_key:
            items = [(i, item) for i, item in enumerate(raw[array_key])]
            wrap_key = array_key
        else:
            # Dict-keyed format: {id: {item}, ...}
            # Skip empty dicts
            real_items = {k: v for k, v in raw.items() if isinstance(v, dict)}
            if not real_items:
                print(f"  [skip] {json_path.name} is empty")
                return
            items = list(real_items.items())
            is_dict_keyed = True
    elif isinstance(raw, list):
        items = [(i, item) for i, item in enumerate(raw)]
    else:
        print(f"  [skip] Unexpected format in {json_path.name}")
        return

    label = data_type.replace("-", " ").title()
    print(f"\n  {label} — {len(items)} entries")

    for idx, (key, item) in enumerate(items):
        name = item.get("name", "?")
        # Use operator name as search term for experiences (more findable)
        search_name = item.get("operator", name) if data_type == "experiences" else name
        location = item.get("location", "Norway")
        # Ensure location includes Norway for better search results
        if "Norway" not in location and "Svalbard" not in location:
            location = f"{location}, Norway"

        print(f"\n  [{idx+1}/{len(items)}] {name}")

        ratings = item.get("ratings", {})

        if recalc_only:
            dice = compute_dice(ratings)
            if dice is not None:
                item["diceScore"] = dice
                print(f"    -> dice={dice}")
            continue

        # Initialize ratings dict if missing
        item["ratings"] = ratings
        # For experiences, also try searching by operator name for better matches
        enrich_item(item, location, data_type=data_type, refresh=refresh, dry_run=dry_run)
        # If experience had no matches, retry with operator name
        if data_type == "experiences" and search_name != name:
            r = item.get("ratings", {})
            has_any = any(r.get(s) for s in ["tripAdvisor", "yelp", "facebook"])
            if not has_any and not recalc_only:
                print(f"    [retry] searching by operator: {search_name}")
                # Temporarily swap name for the search
                original_name = item["name"]
                item["name"] = search_name
                enrich_item(item, location, data_type=data_type, refresh=True, dry_run=dry_run)
                item["name"] = original_name

        # Update back into the raw structure
        if is_dict_keyed:
            raw[key] = item
        elif wrap_key:
            raw[wrap_key][key] = item
        else:
            raw[key] = item

    if not dry_run:
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(raw, f, indent=2, ensure_ascii=False)
        print(f"\n  [write] {json_path}")


# ─────────────────────────────────────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────────────────────────────────────

def print_api_status():
    print("\n  Sources available:")
    print(f"    Google Places:  {'OK' if GOOGLE_API_KEY else 'MISSING (Google ratings already in data)'}")
    print(f"    TripAdvisor:    {'OK' if TA_API_KEY else 'MISSING (tripadvisor source will be skipped)'}")
    pw_status = "OK (Playwright scraper)" if HAS_PLAYWRIGHT else "MISSING (install: pip install playwright && playwright install chromium)"
    print(f"    Yelp:           {pw_status}")
    print(f"    Facebook:       {pw_status}")


ALL_TYPES = ["restaurants", "accommodations", "experiences", "guides", "transport"]


def main():
    parser = argparse.ArgumentParser(
        description="Enrich NorgeTravel ratings with Yelp, TripAdvisor, Facebook and compute dice scores"
    )
    parser.add_argument(
        "--type",
        choices=ALL_TYPES,
        required=True,
        help="Data type to enrich",
    )
    parser.add_argument(
        "--city",
        choices=list(RESTAURANT_CITIES.keys()),
        help="City to enrich (restaurants only)",
    )
    parser.add_argument(
        "--all",
        action="store_true",
        help="Enrich all cities (restaurants) or process the full file (other types)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be fetched without writing",
    )
    parser.add_argument(
        "--recalc-only",
        action="store_true",
        help="Recompute dice scores from existing ratings, no API calls",
    )
    parser.add_argument(
        "--refresh",
        action="store_true",
        help="Re-fetch ratings even if already present",
    )
    args = parser.parse_args()

    print_api_status()

    if args.type == "restaurants":
        if not args.city and not args.all:
            print("\n  [error] Specify --city or --all for restaurants")
            sys.exit(1)

        cities = list(RESTAURANT_CITIES.keys()) if args.all else [args.city]
        for city_key in cities:
            enrich_restaurants(
                city_key,
                refresh=args.refresh,
                dry_run=args.dry_run,
                recalc_only=args.recalc_only,
            )

    else:
        # accommodations, experiences, guides, transport
        enrich_travel_data(
            args.type,
            refresh=args.refresh,
            dry_run=args.dry_run,
            recalc_only=args.recalc_only,
        )

    # Clean up Playwright browser if it was used
    close_fb_browser()

    print("\n  Done.")


if __name__ == "__main__":
    main()
