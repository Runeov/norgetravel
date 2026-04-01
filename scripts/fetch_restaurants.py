"""
NorgeTravel Restaurant Fetcher
================================
Fetches restaurant data from Google Places API (New) for Norwegian cities.
Verifies each restaurant is OPERATIONAL before including it.
Outputs TypeScript-ready data files for the city guide system.

Usage:
    # Set your API key
    set GOOGLE_PLACES_API_KEY=your-key-here

    # Fetch all cities
    python scripts/fetch_restaurants.py

    # Fetch one city
    python scripts/fetch_restaurants.py --city tromso

    # Preview without writing
    python scripts/fetch_restaurants.py --dry-run

    # Custom limit per city
    python scripts/fetch_restaurants.py --city tromso --limit 50

Prerequisites:
    pip install requests

Google Cloud setup:
    1. Enable "Places API (New)" at https://console.cloud.google.com
    2. Create an API key restricted to "Places API (New)"
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

API_KEY = os.environ.get("GOOGLE_PLACES_API_KEY", "")
PLACES_BASE = "https://places.googleapis.com/v1"

# City configurations: search center (lat,lng), radius, and target count
CITIES = {
    "tromso": {
        "name": "Tromsø",
        "center": {"latitude": 69.6496, "longitude": 19.0156},
        "radius": 5000,  # 5km — covers central Tromsø + Tromsdalen
        "target": 50,
        "output": ROOT / "src" / "data" / "city-guides" / "restaurants-tromso.json",
    },
    "trondheim": {
        "name": "Trondheim",
        "center": {"latitude": 63.4305, "longitude": 10.3951},
        "radius": 5000,
        "target": 100,
        "output": ROOT / "src" / "data" / "city-guides" / "restaurants-trondheim.json",
    },
    "stavanger": {
        "name": "Stavanger",
        "center": {"latitude": 58.9700, "longitude": 5.7331},
        "radius": 5000,
        "target": 100,
        "output": ROOT / "src" / "data" / "city-guides" / "restaurants-stavanger.json",
    },
    "bergen": {
        "name": "Bergen",
        "center": {"latitude": 60.3913, "longitude": 5.3221},
        "radius": 6000,  # Larger — Bergen is more spread out
        "target": 200,
        "output": ROOT / "src" / "data" / "city-guides" / "restaurants-bergen.json",
    },
    "oslo": {
        "name": "Oslo",
        "center": {"latitude": 59.9139, "longitude": 10.7522},
        "radius": 8000,  # Larger — Oslo covers more area
        "target": 200,
        "output": ROOT / "src" / "data" / "city-guides" / "restaurants-oslo.json",
    },
}

# Map Google price_level to our PricePoint
PRICE_MAP = {
    0: "$",      # Free (unlikely for restaurants, but mapped)
    1: "$",      # Inexpensive
    2: "$$",     # Moderate
    3: "$$$",    # Expensive
    4: "$$$$",   # Very expensive
}

# Map Google primary type to our CuisineCategory
# Unmapped types default to 'international'
CUISINE_MAP = {
    "seafood_restaurant": "seafood",
    "japanese_restaurant": "international",
    "chinese_restaurant": "international",
    "indian_restaurant": "international",
    "italian_restaurant": "international",
    "mexican_restaurant": "international",
    "thai_restaurant": "international",
    "american_restaurant": "international",
    "french_restaurant": "fine-dining",
    "mediterranean_restaurant": "international",
    "sushi_restaurant": "international",
    "pizza_restaurant": "international",
    "korean_restaurant": "international",
    "vietnamese_restaurant": "international",
    "turkish_restaurant": "international",
    "greek_restaurant": "international",
    "steak_house": "norwegian",
    "hamburger_restaurant": "pub",
    "cafe": "cafe",
    "coffee_shop": "cafe",
    "bakery": "bakery",
    "bar": "pub",
    "pub": "pub",
    "brewery": "pub",
    "fine_dining_restaurant": "fine-dining",
    "restaurant": "norwegian",  # Generic — default to norwegian for Norway
}

# Fields we request from Google Places API
SEARCH_FIELDS = ",".join([
    "places.id",
    "places.displayName",
    "places.formattedAddress",
    "places.rating",
    "places.userRatingCount",
    "places.priceLevel",
    "places.businessStatus",
    "places.primaryType",
    "places.types",
    "places.websiteUri",
    "places.regularOpeningHours",
    "places.googleMapsUri",
])

DETAIL_FIELDS = ",".join([
    "id",
    "displayName",
    "formattedAddress",
    "rating",
    "userRatingCount",
    "priceLevel",
    "businessStatus",
    "primaryType",
    "types",
    "websiteUri",
    "regularOpeningHours",
    "googleMapsUri",
    "editorialSummary",
    "shortFormattedAddress",
])


def slugify(text: str) -> str:
    """Convert text to a URL-safe slug."""
    text = unicodedata.normalize("NFKD", text)
    text = text.encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text.lower())
    text = re.sub(r"[-\s]+", "-", text).strip("-")
    return text


def search_restaurants(city_config: dict, page_token: str = None) -> dict:
    """Search for restaurants near a city center using Places API v1 Text Search."""
    url = f"{PLACES_BASE}/places:searchText"
    headers = {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": SEARCH_FIELDS,
        "Content-Type": "application/json",
    }

    body = {
        "textQuery": f"restaurants in {city_config['name']}, Norway",
        "locationBias": {
            "circle": {
                "center": city_config["center"],
                "radius": float(city_config["radius"]),
            }
        },
        "languageCode": "en",
        "maxResultCount": 20,  # Max per request
    }

    if page_token:
        body["pageToken"] = page_token

    resp = requests.post(url, headers=headers, json=body, timeout=30)
    resp.raise_for_status()
    return resp.json()


def search_by_cuisine(city_config: dict, cuisine: str) -> dict:
    """Search for a specific cuisine type to get better coverage."""
    url = f"{PLACES_BASE}/places:searchText"
    headers = {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": SEARCH_FIELDS,
        "Content-Type": "application/json",
    }

    body = {
        "textQuery": f"{cuisine} restaurant in {city_config['name']}, Norway",
        "locationBias": {
            "circle": {
                "center": city_config["center"],
                "radius": float(city_config["radius"]),
            }
        },
        "languageCode": "en",
        "maxResultCount": 20,
    }

    resp = requests.post(url, headers=headers, json=body, timeout=30)
    resp.raise_for_status()
    return resp.json()


def format_opening_hours(place: dict) -> str:
    """Extract a compact opening hours string from Google Places data."""
    hours = place.get("regularOpeningHours", {})
    descriptions = hours.get("weekdayDescriptions", [])
    if not descriptions:
        return "Check website for hours"

    # Try to condense: if all weekdays same, group them
    # For now, return the full descriptions joined
    return "; ".join(descriptions[:3]) + ("..." if len(descriptions) > 3 else "")


def classify_cuisine(place: dict) -> str:
    """Map Google place types to our CuisineCategory."""
    primary = place.get("primaryType", "")
    if primary in CUISINE_MAP:
        return CUISINE_MAP[primary]

    # Check secondary types
    for t in place.get("types", []):
        if t in CUISINE_MAP:
            return CUISINE_MAP[t]

    return "international"  # Default fallback


def is_operational(place: dict) -> bool:
    """Check if the restaurant is currently operational."""
    status = place.get("businessStatus", "")
    return status == "OPERATIONAL"


def extract_neighbourhood(address: str, city_name: str) -> str:
    """Try to extract a neighbourhood from the address."""
    # Remove the city name and postal code, take what's left
    parts = address.split(",")
    if len(parts) >= 2:
        # Usually: "Street, Postal City" — return street area
        return parts[0].strip().split(" ")[-1] if len(parts[0].split(" ")) > 2 else ""
    return ""


def place_to_restaurant(place: dict, city_name: str) -> dict:
    """Convert a Google Places result to our CityRestaurant format."""
    name = place.get("displayName", {}).get("text", "Unknown")
    place_id = place.get("id", "")
    address = place.get("formattedAddress", "")
    short_address = place.get("shortFormattedAddress", address)
    rating = place.get("rating")
    review_count = place.get("userRatingCount", 0)
    price_level = place.get("priceLevel", "PRICE_LEVEL_UNSPECIFIED")
    website = place.get("websiteUri", "")
    maps_url = place.get("googleMapsUri", "")
    editorial = place.get("editorialSummary", {}).get("text", "")
    cuisine = classify_cuisine(place)

    # Map price level string to our format
    price_map_str = {
        "PRICE_LEVEL_FREE": "$",
        "PRICE_LEVEL_INEXPENSIVE": "$",
        "PRICE_LEVEL_MODERATE": "$$",
        "PRICE_LEVEL_EXPENSIVE": "$$$",
        "PRICE_LEVEL_VERY_EXPENSIVE": "$$$$",
        "PRICE_LEVEL_UNSPECIFIED": "$$",  # Default to mid-range
    }
    price_point = price_map_str.get(str(price_level), "$$")

    # Build the restaurant object
    restaurant = {
        "id": slugify(name),
        "name": name,
        "placeId": place_id,
        "cuisine": cuisine,
        "pricePoint": price_point,
        "address": short_address or address,
        "website": website if website else None,
        "reservationRequired": price_point in ("$$$", "$$$$"),
        "openingHours": format_opening_hours(place),
        "description": editorial if editorial else f"Restaurant in {city_name}. Description pending editorial review.",
        "ratings": {},
    }

    if rating is not None:
        restaurant["ratings"]["google"] = {
            "score": round(rating, 1),
            "reviewCount": review_count,
        }

    return restaurant


def fetch_city_restaurants(city_key: str, city_config: dict, limit: int = None) -> list:
    """Fetch all restaurants for a city, with verification."""
    target = limit or city_config["target"]
    city_name = city_config["name"]
    seen_ids = set()
    restaurants = []

    print(f"\n{'='*60}")
    print(f"  Fetching restaurants for {city_name} (target: {target})")
    print(f"{'='*60}")

    # Phase 1: General restaurant search with pagination
    page_token = None
    page = 0
    while len(restaurants) < target:
        page += 1
        print(f"  [page {page}] Searching restaurants... ({len(restaurants)} found so far)")

        try:
            data = search_restaurants(city_config, page_token)
        except requests.exceptions.HTTPError as e:
            print(f"  [error] Search failed: {e}")
            break

        places = data.get("places", [])
        if not places:
            print(f"  [info] No more results from general search")
            break

        for place in places:
            pid = place.get("id", "")
            if pid in seen_ids:
                continue
            seen_ids.add(pid)

            if not is_operational(place):
                name = place.get("displayName", {}).get("text", "?")
                status = place.get("businessStatus", "UNKNOWN")
                print(f"    [SKIP] {name} — status: {status}")
                continue

            restaurant = place_to_restaurant(place, city_name)
            restaurants.append(restaurant)

            if len(restaurants) >= target:
                break

        page_token = data.get("nextPageToken")
        if not page_token:
            break

        # Rate limiting — Google requires a short delay between paginated requests
        time.sleep(1.5)

    # Phase 2: If we haven't hit target, search by specific cuisine types
    if len(restaurants) < target:
        cuisines_to_search = [
            "seafood", "sushi", "pizza", "italian", "indian", "thai",
            "chinese", "mexican", "cafe", "bakery", "pub", "fine dining",
            "burger", "kebab", "vietnamese", "korean", "greek",
            "vegetarian", "brunch", "tapas", "steakhouse",
        ]

        for cuisine in cuisines_to_search:
            if len(restaurants) >= target:
                break

            print(f"  [cuisine] Searching '{cuisine}' restaurants... ({len(restaurants)}/{target})")

            try:
                data = search_by_cuisine(city_config, cuisine)
            except requests.exceptions.HTTPError as e:
                print(f"  [error] Cuisine search '{cuisine}' failed: {e}")
                continue

            for place in data.get("places", []):
                pid = place.get("id", "")
                if pid in seen_ids:
                    continue
                seen_ids.add(pid)

                if not is_operational(place):
                    name = place.get("displayName", {}).get("text", "?")
                    print(f"    [SKIP] {name} — closed/inactive")
                    continue

                restaurant = place_to_restaurant(place, city_name)
                restaurants.append(restaurant)

                if len(restaurants) >= target:
                    break

            time.sleep(1.0)

    # Sort by Google rating (highest first), then by review count
    restaurants.sort(
        key=lambda r: (
            r.get("ratings", {}).get("google", {}).get("score", 0),
            r.get("ratings", {}).get("google", {}).get("reviewCount", 0),
        ),
        reverse=True,
    )

    closed_count = len(seen_ids) - len(restaurants)
    print(f"\n  Results for {city_name}:")
    print(f"    Total found:  {len(seen_ids)}")
    print(f"    Operational:  {len(restaurants)}")
    print(f"    Closed/Skip:  {closed_count}")
    print(f"    Target:       {target}")

    return restaurants[:target]


def write_output(restaurants: list, output_path: Path, city_name: str):
    """Write restaurant data to JSON file."""
    output_path.parent.mkdir(parents=True, exist_ok=True)

    output = {
        "_meta": {
            "city": city_name,
            "fetchedAt": datetime.now(timezone.utc).isoformat(),
            "count": len(restaurants),
            "note": "Fetched via Google Places API. All restaurants verified OPERATIONAL at fetch time. Descriptions marked 'pending editorial review' need manual editing.",
        },
        "restaurants": restaurants,
    }

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"  [write] {len(restaurants)} restaurants → {output_path}")


def main():
    parser = argparse.ArgumentParser(description="Fetch verified restaurant data for NorgeTravel cities")
    parser.add_argument("--city", choices=list(CITIES.keys()), help="Fetch one city only")
    parser.add_argument("--limit", type=int, help="Override target restaurant count")
    parser.add_argument("--dry-run", action="store_true", help="Print results without writing")
    parser.add_argument("--min-rating", type=float, default=3.5, help="Minimum Google rating (default: 3.5)")
    parser.add_argument("--min-reviews", type=int, default=10, help="Minimum review count (default: 10)")
    args = parser.parse_args()

    if not API_KEY:
        print("[error] GOOGLE_PLACES_API_KEY not set.")
        print("  Set it:  set GOOGLE_PLACES_API_KEY=your-key-here")
        print("  Or add to .env.local and run: ")
        print("    for /f \"tokens=1,2 delims==\" %a in (.env.local) do set %a=%b")
        sys.exit(1)

    cities_to_fetch = {args.city: CITIES[args.city]} if args.city else CITIES

    for city_key, city_config in cities_to_fetch.items():
        restaurants = fetch_city_restaurants(city_key, city_config, args.limit)

        # Filter by minimum rating and review count
        before = len(restaurants)
        restaurants = [
            r for r in restaurants
            if r.get("ratings", {}).get("google", {}).get("score", 0) >= args.min_rating
            and r.get("ratings", {}).get("google", {}).get("reviewCount", 0) >= args.min_reviews
        ]
        filtered = before - len(restaurants)
        if filtered:
            print(f"  [filter] Removed {filtered} restaurants below {args.min_rating}★ or <{args.min_reviews} reviews")

        if args.dry_run:
            print(f"\n  [dry-run] Would write {len(restaurants)} restaurants for {city_config['name']}")
            for i, r in enumerate(restaurants[:5]):
                score = r.get("ratings", {}).get("google", {}).get("score", "?")
                reviews = r.get("ratings", {}).get("google", {}).get("reviewCount", 0)
                print(f"    {i+1}. {r['name']} — ★{score} ({reviews} reviews) — {r['cuisine']} — {r['pricePoint']}")
            if len(restaurants) > 5:
                print(f"    ... and {len(restaurants) - 5} more")
        else:
            write_output(restaurants, city_config["output"], city_config["name"])

    print(f"\n{'='*60}")
    print(f"  Done. Restaurant JSON files are in src/data/city-guides/")
    print(f"  Next steps:")
    print(f"    1. Review descriptions — replace 'pending editorial review' entries")
    print(f"    2. Run: python scripts/import_restaurants.py --city tromso")
    print(f"       to merge JSON data into TypeScript city guide files")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
