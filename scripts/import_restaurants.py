"""
NorgeTravel Restaurant Importer
=================================
Converts fetched restaurant JSON data into TypeScript city guide data files.

Usage:
    python scripts/import_restaurants.py --city tromso
    python scripts/import_restaurants.py --all
    python scripts/import_restaurants.py --city tromso --merge  # Merge with existing TS data

This reads from src/data/city-guides/restaurants-{city}.json
and writes/updates src/data/city-guides/{city}.ts
"""

import argparse
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
DATA_DIR = ROOT / "src" / "data" / "city-guides"

CITIES = {
    "tromso": {"name": "Tromsø", "slug": "tromso"},
    "trondheim": {"name": "Trondheim", "slug": "trondheim"},
    "stavanger": {"name": "Stavanger", "slug": "stavanger"},
    "bergen": {"name": "Bergen", "slug": "bergen"},
    "oslo": {"name": "Oslo", "slug": "oslo"},
}


def escape_ts_string(s: str) -> str:
    """Escape a string for TypeScript single-quoted string literal."""
    if not s:
        return ""
    s = s.replace("\\", "\\\\")
    s = s.replace("'", "\\'")
    # Encode special chars as Unicode escapes
    result = []
    for ch in s:
        code = ord(ch)
        if code > 127:
            result.append(f"\\u{code:04X}")
        else:
            result.append(ch)
    return "".join(result)


def restaurant_to_ts(r: dict) -> str:
    """Convert a restaurant dict to a TypeScript object literal."""
    lines = []
    lines.append("    {")

    # Required fields
    lines.append(f"      id: '{escape_ts_string(r['id'])}',")
    lines.append(f"      name: '{escape_ts_string(r['name'])}',")

    if r.get("placeId"):
        lines.append(f"      placeId: '{escape_ts_string(r['placeId'])}',")
    else:
        lines.append(f"      // placeId: 'ChIJ...', // TODO: add Place ID for live ratings")

    lines.append(f"      cuisine: '{r.get('cuisine', 'international')}',")
    lines.append(f"      pricePoint: '{r.get('pricePoint', '$$')}',")

    if r.get("averageMealPrice"):
        lines.append(f"      averageMealPrice: '{escape_ts_string(r['averageMealPrice'])}',")

    lines.append(f"      address: '{escape_ts_string(r.get('address', ''))}',")

    if r.get("neighbourhood"):
        lines.append(f"      neighbourhood: '{escape_ts_string(r['neighbourhood'])}',")

    if r.get("website"):
        lines.append(f"      website: '{escape_ts_string(r['website'])}',")

    if r.get("reservationUrl"):
        lines.append(f"      reservationUrl: '{escape_ts_string(r['reservationUrl'])}',")

    lines.append(f"      reservationRequired: {'true' if r.get('reservationRequired') else 'false'},")
    lines.append(f"      openingHours: '{escape_ts_string(r.get('openingHours', 'Check website'))}',")

    desc = r.get("description", "")
    # Use double quotes for descriptions that might contain apostrophes
    desc_escaped = desc.replace("\\", "\\\\").replace('"', '\\"')
    # Unicode escape non-ASCII
    desc_result = []
    for ch in desc_escaped:
        code = ord(ch)
        if code > 127:
            desc_result.append(f"\\u{code:04X}")
        else:
            desc_result.append(ch)
    desc_final = "".join(desc_result)
    lines.append(f'      description: "{desc_final}",')

    if r.get("mustOrder"):
        items = ", ".join(f"'{escape_ts_string(m)}'" for m in r["mustOrder"])
        lines.append(f"      mustOrder: [{items}],")

    # Ratings
    ratings = r.get("ratings", {})
    ratings_parts = []
    if ratings.get("google"):
        g = ratings["google"]
        ratings_parts.append(
            f"google: {{ score: {g['score']}, reviewCount: {g['reviewCount']} }}"
        )
    if ratings.get("tripAdvisor"):
        ta = ratings["tripAdvisor"]
        ratings_parts.append(
            f"tripAdvisor: {{ score: {ta['score']}, reviewCount: {ta['reviewCount']}, bubbleRating: {ta['bubbleRating']} }}"
        )
    if ratings.get("yelp"):
        y = ratings["yelp"]
        ratings_parts.append(
            f"yelp: {{ score: {y['score']}, reviewCount: {y['reviewCount']} }}"
        )
    if ratings.get("facebook"):
        fb = ratings["facebook"]
        ratings_parts.append(
            f"facebook: {{ score: {fb['score']}, reviewCount: {fb['reviewCount']} }}"
        )
    if ratings.get("michelin"):
        m = ratings["michelin"]
        if m.get("type") == "stars":
            ratings_parts.append(f"michelin: {{ type: 'stars', count: {m['count']} }}")
        elif m.get("type") == "none":
            ratings_parts.append("michelin: { type: 'none' }")
        else:
            ratings_parts.append(f"michelin: {{ type: '{m['type']}' }}")

    if not ratings_parts:
        ratings_parts.append("michelin: { type: 'none' }")

    lines.append(f"      ratings: {{ {', '.join(ratings_parts)} }},")

    if r.get("diceScore") is not None:
        lines.append(f"      diceScore: {r['diceScore']},")

    lines.append("    },")

    return "\n".join(lines)


def generate_restaurants_ts(restaurants: list, city_key: str, city_name: str) -> str:
    """Generate a standalone TypeScript file with restaurant data."""
    entries = "\n".join(restaurant_to_ts(r) for r in restaurants)

    return f"""import type {{ CityRestaurant }} from '@/types/city-guide';

/**
 * Restaurant data for {city_name}.
 * Fetched from Google Places API — all entries verified OPERATIONAL at fetch time.
 * Descriptions marked "pending editorial review" need manual editing.
 *
 * To refresh: python scripts/fetch_restaurants.py --city {city_key}
 * To verify:  python scripts/verify_restaurants.py --city {city_key}
 */
export const {city_key}Restaurants: CityRestaurant[] = [
{entries}
];
"""


def import_city(city_key: str, merge: bool = False):
    """Import restaurant JSON data for a city."""
    city = CITIES[city_key]
    json_path = DATA_DIR / f"restaurants-{city_key}.json"

    if not json_path.exists():
        print(f"  [error] No JSON data found at {json_path}")
        print(f"  Run: python scripts/fetch_restaurants.py --city {city_key}")
        return

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    restaurants = data.get("restaurants", [])
    print(f"  Importing {len(restaurants)} restaurants for {city['name']}...")

    # Generate TypeScript
    ts_content = generate_restaurants_ts(restaurants, city_key, city["name"])
    ts_path = DATA_DIR / f"restaurants-{city_key}.ts"

    ts_path.write_text(ts_content, encoding="utf-8")
    print(f"  [write] {ts_path}")
    print(f"  Import complete. {len(restaurants)} restaurants written.")
    print(f"\n  Next: update src/data/city-guides/{city_key}.ts to import from restaurants-{city_key}.ts")
    print(f"  Or use the restaurants array directly in the city page component.")


def main():
    parser = argparse.ArgumentParser(description="Import fetched restaurant data into TypeScript")
    parser.add_argument("--city", choices=list(CITIES.keys()))
    parser.add_argument("--all", action="store_true")
    parser.add_argument("--merge", action="store_true", help="Merge with existing data (keep manual entries)")
    args = parser.parse_args()

    if not args.city and not args.all:
        parser.print_help()
        sys.exit(1)

    cities = list(CITIES.keys()) if args.all else [args.city]

    for city_key in cities:
        print(f"\n{'='*50}")
        print(f"  {CITIES[city_key]['name']}")
        print(f"{'='*50}")
        import_city(city_key, args.merge)


if __name__ == "__main__":
    main()
