"""
NorgeTravel Experience Fetcher
================================
Fetches tour/activity data from Google Places API (New) for Norwegian cities.
Maps results to the ExperienceSchema format and merges with existing data.

Usage:
    set GOOGLE_PLACES_API_KEY=your-key-here

    # Fetch all cities
    python scripts/fetch_experiences.py

    # Fetch one city
    python scripts/fetch_experiences.py --city oslo

    # Preview without writing
    python scripts/fetch_experiences.py --dry-run

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
OUTPUT_FILE = ROOT / "src" / "data" / "travel-experiences.json"

API_KEY = os.environ.get("GOOGLE_PLACES_API_KEY", "")
PLACES_BASE = "https://places.googleapis.com/v1"

# ─── City definitions (matching restaurant cities) ────────────────────────────

CITIES = {
    "oslo": {
        "name": "Oslo",
        "destination": "all",
        "center": {"latitude": 59.9139, "longitude": 10.7522},
        "radius": 15000,
        "target": 80,
    },
    "bergen": {
        "name": "Bergen",
        "destination": "fjords",
        "center": {"latitude": 60.3913, "longitude": 5.3221},
        "radius": 12000,
        "target": 80,
    },
    "trondheim": {
        "name": "Trondheim",
        "destination": "all",
        "center": {"latitude": 63.4305, "longitude": 10.3951},
        "radius": 10000,
        "target": 60,
    },
    "stavanger": {
        "name": "Stavanger",
        "destination": "fjords",
        "center": {"latitude": 58.9700, "longitude": 5.7331},
        "radius": 10000,
        "target": 60,
    },
    "tromso": {
        "name": "Tromsø",
        "destination": "northern-norway",
        "center": {"latitude": 69.6496, "longitude": 19.0156},
        "radius": 12000,
        "target": 80,
    },
    "alta": {
        "name": "Alta",
        "destination": "northern-norway",
        "center": {"latitude": 69.9689, "longitude": 23.2716},
        "radius": 15000,
        "target": 40,
    },
    "bodo": {
        "name": "Bodø",
        "destination": "northern-norway",
        "center": {"latitude": 67.2804, "longitude": 14.4049},
        "radius": 10000,
        "target": 40,
    },
    "hammerfest": {
        "name": "Hammerfest",
        "destination": "northern-norway",
        "center": {"latitude": 70.6634, "longitude": 23.6821},
        "radius": 10000,
        "target": 30,
    },
    "narvik": {
        "name": "Narvik",
        "destination": "northern-norway",
        "center": {"latitude": 68.4385, "longitude": 17.4272},
        "radius": 15000,
        "target": 30,
    },
    "senja": {
        "name": "Senja",
        "destination": "northern-norway",
        "center": {"latitude": 69.2850, "longitude": 17.0200},
        "radius": 40000,
        "target": 30,
    },
    "nordkapp": {
        "name": "Nordkapp",
        "destination": "northern-norway",
        "center": {"latitude": 70.9787, "longitude": 25.9744},
        "radius": 20000,
        "target": 30,
    },
    "lofoten": {
        "name": "Lofoten",
        "destination": "lofoten",
        "center": {"latitude": 68.2342, "longitude": 14.5658},
        "radius": 60000,
        "target": 80,
    },
    "lyngen": {
        "name": "Lyngen",
        "destination": "northern-norway",
        "center": {"latitude": 69.5740, "longitude": 20.2090},
        "radius": 25000,
        "target": 30,
    },
}

# ─── Experience type classification ───────────────────────────────────────────
# Valid types: northern-lights, whale-watching, dog-sledding, glacier-hike,
#              fjord-cruise, fishing, surfing, kayaking, snowmobile,
#              cultural-tour, photography-tour

# Keywords in name/types → experience type
EXPERIENCE_TYPE_KEYWORDS = {
    "northern lights": "northern-lights",
    "aurora": "northern-lights",
    "nordlys": "northern-lights",
    "whale": "whale-watching",
    "hval": "whale-watching",
    "safari": "whale-watching",
    "dog sled": "dog-sledding",
    "husky": "dog-sledding",
    "hundekjøring": "dog-sledding",
    "glacier": "glacier-hike",
    "isbre": "glacier-hike",
    "fjord cruise": "fjord-cruise",
    "fjord tour": "fjord-cruise",
    "boat tour": "fjord-cruise",
    "boat trip": "fjord-cruise",
    "cruise": "fjord-cruise",
    "rib": "fjord-cruise",
    "rib boat": "fjord-cruise",
    "speedboat": "fjord-cruise",
    "fishing": "fishing",
    "fiske": "fishing",
    "angling": "fishing",
    "cod fishing": "fishing",
    "surf": "surfing",
    "kayak": "kayaking",
    "paddling": "kayaking",
    "canoe": "kayaking",
    "snowmobile": "snowmobile",
    "snøscooter": "snowmobile",
    "snow mobile": "snowmobile",
    "museum": "cultural-tour",
    "culture": "cultural-tour",
    "cultural": "cultural-tour",
    "heritage": "cultural-tour",
    "history": "cultural-tour",
    "historic": "cultural-tour",
    "cathedral": "cultural-tour",
    "church": "cultural-tour",
    "gallery": "cultural-tour",
    "art": "cultural-tour",
    "food tour": "cultural-tour",
    "walking tour": "cultural-tour",
    "city tour": "cultural-tour",
    "guided tour": "cultural-tour",
    "sightseeing": "cultural-tour",
    "photo": "photography-tour",
    "photography": "photography-tour",
}

# Search queries per city — these target tour operators and activity providers
SEARCH_QUERIES = [
    "tours and activities in {city}, Norway",
    "things to do in {city}, Norway",
    "outdoor activities {city}, Norway",
    "boat tours {city}, Norway",
    "RIB boat safari {city}, Norway",
    "fjord cruise {city}, Norway",
    "guided tours {city}, Norway",
    "adventure tours {city}, Norway",
    "kayaking {city}, Norway",
    "sea kayaking {city}, Norway",
    "fishing tours {city}, Norway",
    "deep sea fishing {city}, Norway",
    "cultural tours {city}, Norway",
    "food tour {city}, Norway",
    "walking tour {city}, Norway",
    "northern lights tour {city}, Norway",
    "aurora tour {city}, Norway",
    "whale watching {city}, Norway",
    "whale safari {city}, Norway",
    "hiking tours {city}, Norway",
    "glacier hike {city}, Norway",
    "dog sledding {city}, Norway",
    "husky tour {city}, Norway",
    "snowmobile {city}, Norway",
    "skiing {city}, Norway",
    "surfing {city}, Norway",
    "photography tour {city}, Norway",
    "midnight sun tour {city}, Norway",
    "snorkeling diving {city}, Norway",
    "climbing {city}, Norway",
    "zipline {city}, Norway",
    "museums in {city}, Norway",
    "attractions in {city}, Norway",
    "national park near {city}, Norway",
    "wildlife safari {city}, Norway",
    "bird watching {city}, Norway",
    "camping {city}, Norway",
    "cycling tour {city}, Norway",
    "horseback riding {city}, Norway",
    "Sami experience {city}, Norway",
]

# Google Places types that indicate tour/activity businesses
ACTIVITY_TYPES = {
    "tourist_attraction", "travel_agency", "tour_agency",
    "hiking_area", "national_park", "ski_resort",
    "amusement_park", "aquarium", "zoo", "museum",
    "art_gallery", "performing_arts_theater",
    "marina", "boat_rental", "canoe_rental",
    "adventure_sports_center", "water_sports_center",
    "scuba_diving", "surfing_area",
}

# Types to exclude (restaurants, shops, etc.)
EXCLUDE_TYPES = {
    "restaurant", "cafe", "bar", "pub", "bakery", "coffee_shop",
    "hotel", "lodging", "hostel", "campground", "guest_house",
    "shopping_mall", "clothing_store", "grocery_store", "supermarket",
    "pharmacy", "hospital", "school", "university", "bank",
    "gas_station", "car_rental", "parking", "bus_station",
    "airport", "train_station",
}

# Difficulty mapping based on experience type
DEFAULT_DIFFICULTY = {
    "northern-lights": "easy",
    "whale-watching": "easy",
    "dog-sledding": "easy",
    "glacier-hike": "challenging",
    "fjord-cruise": "easy",
    "fishing": "easy",
    "surfing": "moderate",
    "kayaking": "moderate",
    "snowmobile": "moderate",
    "cultural-tour": "easy",
    "photography-tour": "easy",
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


def classify_experience_type(place: dict) -> str | None:
    """Determine experience type from place data. Returns None if not classifiable."""
    name = place.get("displayName", {}).get("text", "").lower()
    editorial = place.get("editorialSummary", {}).get("text", "").lower()
    combined = f"{name} {editorial}"

    for keyword, exp_type in EXPERIENCE_TYPE_KEYWORDS.items():
        if keyword in combined:
            return exp_type

    # Check Google types
    types = set(place.get("types", []))
    if types & {"museum", "art_gallery"}:
        return "cultural-tour"
    if types & {"hiking_area", "national_park"}:
        return "glacier-hike"
    if types & {"marina", "boat_rental"}:
        return "fjord-cruise"
    if types & {"ski_resort"}:
        return "snowmobile"

    return "cultural-tour"  # Default for tour operators


def is_activity(place: dict) -> bool:
    """Check if a place is an activity/tour (not a restaurant, hotel, shop, etc.)."""
    types = set(place.get("types", []))

    # Exclude if primary type is clearly not an activity
    if types & EXCLUDE_TYPES:
        # Unless it also has activity types
        if not (types & ACTIVITY_TYPES):
            return False

    return True


def is_operational(place: dict) -> bool:
    """Check if the business is currently operational."""
    status = place.get("businessStatus", "")
    return status == "OPERATIONAL"


def classify_price(place: dict) -> str:
    """Map Google price_level to our priceRange."""
    price_map = {
        "PRICE_LEVEL_FREE": "budget",
        "PRICE_LEVEL_INEXPENSIVE": "budget",
        "PRICE_LEVEL_MODERATE": "mid-range",
        "PRICE_LEVEL_EXPENSIVE": "luxury",
        "PRICE_LEVEL_VERY_EXPENSIVE": "luxury",
        "PRICE_LEVEL_UNSPECIFIED": "mid-range",
    }
    level = str(place.get("priceLevel", "PRICE_LEVEL_UNSPECIFIED"))
    return price_map.get(level, "mid-range")


def place_to_experience(place: dict, city_config: dict) -> dict | None:
    """Convert a Google Places result to our Experience schema format."""
    name = place.get("displayName", {}).get("text", "Unknown")
    address = place.get("formattedAddress", "")
    short_address = place.get("shortFormattedAddress", address)
    website = place.get("websiteUri", "")
    editorial = place.get("editorialSummary", {}).get("text", "")
    place_id = place.get("id", "")
    maps_url = place.get("googleMapsUri", "")

    exp_type = classify_experience_type(place)
    if exp_type is None:
        return None

    city_name = city_config["name"]
    city_slug = slugify(city_name)
    now = datetime.now(timezone.utc).isoformat()
    entry_id = f"{city_slug}-{slugify(name)}"

    return {
        "id": entry_id,
        "name": name,
        "description": editorial if editorial else f"Experience in {city_name}, Norway. Description pending editorial review.",
        "destination": city_config["destination"],
        "location": f"{short_address or city_name}, Norway",
        "priceRange": classify_price(place),
        "website": website if website else None,
        "imageUrl": None,
        "imageAlt": None,
        "status": "draft",
        "isFeatured": False,
        "sortOrder": 0,
        "createdAt": now,
        "updatedAt": now,
        "experienceType": exp_type,
        "operator": name,
        "duration": None,
        "difficulty": DEFAULT_DIFFICULTY.get(exp_type, "easy"),
        "minAge": None,
        "groupSize": None,
        "includes": [],
        "bookingUrl": None,
        "seasonalAvailability": None,
        "meetingPoint": short_address or city_name,
        # Extra fields for reference
        "_googlePlaceId": place_id,
        "_googleMapsUrl": maps_url,
        "_googleRating": place.get("rating"),
        "_googleReviewCount": place.get("userRatingCount", 0),
    }


# ─────────────────────────────────────────────────────────────────────────────
# Search
# ─────────────────────────────────────────────────────────────────────────────

def search_experiences(city_config: dict, query: str, page_token: str = None) -> dict:
    """Search for experiences/activities using Places API v1 Text Search."""
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
                "center": city_config["center"],
                "radius": float(city_config["radius"]),
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


def fetch_city_experiences(city_key: str, city_config: dict) -> list:
    """Fetch experiences for a single city."""
    city_name = city_config["name"]
    target = city_config["target"]
    seen_ids = set()
    results = []

    print(f"\n  [{city_name}] Searching (target: {target})...")

    for query_template in SEARCH_QUERIES:
        if len(results) >= target:
            break

        query = query_template.format(city=city_name)

        page_token = None
        while len(results) < target:
            try:
                data = search_experiences(city_config, query, page_token)
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
                    continue

                if not is_activity(place):
                    continue

                experience = place_to_experience(place, city_config)
                if experience is None:
                    continue

                results.append(experience)

                if len(results) >= target:
                    break

            page_token = data.get("nextPageToken")
            if not page_token:
                break
            time.sleep(1.5)

        time.sleep(0.8)

    # Sort by Google rating
    results.sort(
        key=lambda r: (r.get("_googleRating") or 0, r.get("_googleReviewCount", 0)),
        reverse=True,
    )

    return results[:target]


# ─────────────────────────────────────────────────────────────────────────────
# Output
# ─────────────────────────────────────────────────────────────────────────────

def load_existing() -> dict:
    """Load existing experience data (dict-keyed format)."""
    if not OUTPUT_FILE.exists():
        return {}
    try:
        with open(OUTPUT_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, dict):
            return data
        return {}
    except (json.JSONDecodeError, ValueError):
        return {}


def write_output(new_entries: list, dry_run: bool = False):
    """Merge new entries with existing data and write to JSON."""
    existing = load_existing()
    existing_names = {v["name"].lower() for v in existing.values()}

    # Only add entries that don't already exist (by name, case-insensitive)
    added = 0
    max_sort = max((v.get("sortOrder", 0) for v in existing.values()), default=0)

    for entry in new_entries:
        if entry["name"].lower() in existing_names:
            continue
        entry["sortOrder"] = max_sort + added + 1
        existing[entry["id"]] = entry
        existing_names.add(entry["name"].lower())
        added += 1

    if dry_run:
        print(f"\n  [dry-run] Would add {added} new entries ({len(existing) - added} existing, {len(existing)} total)")
        return

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(existing, f, indent=2, ensure_ascii=False)

    print(f"\n  [write] {added} new + {len(existing) - added} existing = {len(existing)} total → {OUTPUT_FILE}")


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Fetch experience/activity data for NorgeTravel cities")
    parser.add_argument("--city", choices=list(CITIES.keys()), help="Fetch one city only")
    parser.add_argument("--dry-run", action="store_true", help="Print results without writing")
    parser.add_argument("--min-rating", type=float, default=3.5, help="Minimum Google rating (default: 3.5)")
    args = parser.parse_args()

    if not API_KEY:
        print("[error] GOOGLE_PLACES_API_KEY not set.")
        print("  Set it:  set GOOGLE_PLACES_API_KEY=your-key-here")
        sys.exit(1)

    cities_to_fetch = {args.city: CITIES[args.city]} if args.city else CITIES

    all_new = []

    for city_key, city_config in cities_to_fetch.items():
        print(f"\n{'='*60}")
        print(f"  {city_config['name']}  →  destination: {city_config['destination']}")
        print(f"{'='*60}")

        results = fetch_city_experiences(city_key, city_config)

        # Filter by minimum rating
        before = len(results)
        results = [
            r for r in results
            if (r.get("_googleRating") or 0) >= args.min_rating
        ]
        filtered = before - len(results)
        if filtered:
            print(f"    [filter] Removed {filtered} below {args.min_rating}★")

        print(f"    → {city_config['name']}: {len(results)} experiences found")

        if args.dry_run:
            for i, r in enumerate(results[:5]):
                rating = r.get("_googleRating", "?")
                reviews = r.get("_googleReviewCount", 0)
                print(f"      {i+1}. {r['name']} ({r['experienceType']}) — ★{rating} ({reviews})")
            if len(results) > 5:
                print(f"      ... and {len(results) - 5} more")

        all_new.extend(results)

    print(f"\n{'='*60}")
    print(f"  Total new experiences fetched: {len(all_new)}")
    print(f"{'='*60}")

    write_output(all_new, dry_run=args.dry_run)

    if not args.dry_run:
        print(f"\n  All entries saved as status: 'draft'")
        print(f"  Next steps:")
        print(f"    1. Review in admin: /admin/travel/experiences")
        print(f"    2. Edit descriptions, add durations, includes lists")
        print(f"    3. Set status to 'published' when ready")


if __name__ == "__main__":
    main()
