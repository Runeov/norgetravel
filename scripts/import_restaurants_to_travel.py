#!/usr/bin/env python3
"""
Import restaurants from city-guides JSON files into travel-restaurants.json.

Converts the Google Places API format (src/data/city-guides/restaurants-*.json)
into the travel system format (src/data/travel-restaurants.json) matching the
RestaurantSchema defined in travel.restaurants.schema.ts.

All imported entries land as status: "draft" — nothing goes live automatically.
Re-running is safe: existing entries are skipped by ID match.

Usage:
    python scripts/import_restaurants_to_travel.py
    python scripts/import_restaurants_to_travel.py --dry-run
    python scripts/import_restaurants_to_travel.py --city tromso
    python scripts/import_restaurants_to_travel.py --publish   # set status to published
"""

import json
import glob
import os
import argparse
from datetime import datetime, timezone

# ─── City → Destination mapping ───
CITY_DESTINATION_MAP = {
    "tromso": "northern-norway",
    "alta": "northern-norway",
    "hammerfest": "northern-norway",
    "nordkapp": "northern-norway",
    "narvik": "northern-norway",
    "bodo": "northern-norway",
    "lyngen": "northern-norway",
    "senja": "northern-norway",
    "lofoten": "lofoten",
    "bergen": "fjords",
    "stavanger": "fjords",
    "oslo": "all",
    "trondheim": "all",
}

# ─── Price point → Price range mapping ───
PRICE_MAP = {
    "$": "budget",
    "$$": "mid-range",
    "$$$": "luxury",
    "$$$$": "luxury",
}

# ─── Valid cuisine types (must match CuisineTypeSchema) ───
VALID_CUISINES = {"norwegian", "seafood", "sami", "international", "fine-dining", "cafe", "bakery", "pub"}

# ─── City display names ───
CITY_DISPLAY_NAMES = {
    "tromso": "Tromsø",
    "alta": "Alta",
    "hammerfest": "Hammerfest",
    "nordkapp": "Nordkapp",
    "narvik": "Narvik",
    "bodo": "Bodø",
    "lyngen": "Lyngen",
    "senja": "Senja",
    "lofoten": "Lofoten",
    "bergen": "Bergen",
    "stavanger": "Stavanger",
    "oslo": "Oslo",
    "trondheim": "Trondheim",
}


def make_unique_id(base_id: str, city_slug: str, existing_ids: set) -> str:
    """Generate a unique ID by appending city slug if needed."""
    candidate = f"{base_id}-{city_slug}"
    if candidate not in existing_ids:
        return candidate
    counter = 2
    while f"{candidate}-{counter}" in existing_ids:
        counter += 1
    return f"{candidate}-{counter}"


def convert_restaurant(restaurant: dict, city_slug: str, city_name: str, sort_order: int, existing_ids: set, status: str) -> dict:
    """Convert a city-guides restaurant entry to travel-restaurants.json format."""
    now = datetime.now(timezone.utc).isoformat()

    base_id = restaurant.get("id", "unknown")
    unique_id = make_unique_id(base_id, city_slug, existing_ids)
    existing_ids.add(unique_id)

    # Map cuisine, fallback to 'norwegian' if invalid
    cuisine = restaurant.get("cuisine", "norwegian")
    if cuisine not in VALID_CUISINES:
        cuisine = "norwegian"

    # Map price
    price_point = restaurant.get("pricePoint", "$$")
    price_range = PRICE_MAP.get(price_point, "mid-range")

    # Build description from available data
    description = restaurant.get("description", "")
    if not description or "pending editorial review" in description.lower():
        google_rating = ""
        ratings = restaurant.get("ratings", {})
        if ratings.get("google"):
            g = ratings["google"]
            google_rating = f" Rated {g['score']}/5 on Google ({g['reviewCount']} reviews)."
        description = f"{restaurant['name']} in {city_name}.{google_rating}"

    # Extract Google rating metadata
    ratings = restaurant.get("ratings", {})
    google_data = ratings.get("google", {})

    entry = {
        "id": unique_id,
        "name": restaurant["name"],
        "description": description,
        "destination": CITY_DESTINATION_MAP.get(city_slug, "all"),
        "location": restaurant.get("address", f"{city_name}, Norway"),
        "priceRange": price_range,
        "website": restaurant.get("website"),
        "imageUrl": None,
        "imageAlt": None,
        "status": status,
        "isFeatured": False,
        "sortOrder": sort_order,
        "createdAt": now,
        "updatedAt": now,
        "cuisineType": cuisine,
        "openingHours": restaurant.get("openingHours"),
        "reservationRequired": restaurant.get("reservationRequired", False),
        "reservationUrl": None,
        "dietaryOptions": [],
        "averageMealPrice": None,
        "michelinStars": None,
        "specialties": [],
        "seatingCapacity": None,
        # Private metadata (prefixed with underscore)
        "_googlePlaceId": restaurant.get("placeId"),
        "_googleRating": google_data.get("score"),
        "_googleReviewCount": google_data.get("reviewCount"),
        "_city": city_slug,
    }

    return entry


def main():
    parser = argparse.ArgumentParser(description="Import city-guide restaurants into travel-restaurants.json")
    parser.add_argument("--dry-run", action="store_true", help="Preview without writing")
    parser.add_argument("--city", type=str, help="Import only one city (e.g., tromso, bergen)")
    parser.add_argument("--publish", action="store_true", help="Set status to 'published' instead of 'draft'")
    parser.add_argument("--min-rating", type=float, default=0, help="Minimum Google rating to import (default: 0)")
    parser.add_argument("--min-reviews", type=int, default=0, help="Minimum Google review count to import (default: 0)")
    args = parser.parse_args()

    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    city_guides_dir = os.path.join(project_root, "src", "data", "city-guides")
    output_file = os.path.join(project_root, "src", "data", "travel-restaurants.json")

    # Load existing data
    existing_data = {}
    if os.path.exists(output_file):
        with open(output_file, "r", encoding="utf-8") as f:
            existing_data = json.load(f)
            if not isinstance(existing_data, dict):
                existing_data = {}

    existing_ids = set(existing_data.keys())
    initial_count = len(existing_ids)

    # Find city-guide files
    if args.city:
        pattern = os.path.join(city_guides_dir, f"restaurants-{args.city}.json")
    else:
        pattern = os.path.join(city_guides_dir, "restaurants-*.json")

    files = glob.glob(pattern)
    if not files:
        print(f"No restaurant files found matching: {pattern}")
        return

    status = "published" if args.publish else "draft"
    sort_order = max((v.get("sortOrder", 0) for v in existing_data.values()), default=0) + 1

    added = 0
    skipped = 0
    filtered = 0

    for filepath in sorted(files):
        filename = os.path.basename(filepath)
        city_slug = filename.replace("restaurants-", "").replace(".json", "")
        city_name = CITY_DISPLAY_NAMES.get(city_slug, city_slug.title())

        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)

        restaurants = data.get("restaurants", [])
        city_added = 0

        for restaurant in restaurants:
            # Apply rating/review filters
            ratings = restaurant.get("ratings", {})
            google = ratings.get("google", {})
            rating = google.get("score", 0)
            reviews = google.get("reviewCount", 0)

            if rating < args.min_rating or reviews < args.min_reviews:
                filtered += 1
                continue

            entry = convert_restaurant(restaurant, city_slug, city_name, sort_order, existing_ids, status)

            # Check if already exists (by checking the generated ID)
            if entry["id"] in existing_data:
                skipped += 1
                continue

            existing_data[entry["id"]] = entry
            sort_order += 1
            added += 1
            city_added += 1

        print(f"  {city_name}: {city_added} added from {len(restaurants)} total")

    print(f"\n{'[DRY RUN] ' if args.dry_run else ''}Summary:")
    print(f"  Previously existing: {initial_count}")
    print(f"  Added: {added}")
    print(f"  Skipped (already exist): {skipped}")
    print(f"  Filtered (below thresholds): {filtered}")
    print(f"  Total: {len(existing_data)}")
    print(f"  Status: {status}")

    if not args.dry_run:
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(existing_data, f, indent=2, ensure_ascii=False)
        print(f"\n  Written to: {output_file}")
    else:
        print(f"\n  [DRY RUN] No files written.")


if __name__ == "__main__":
    main()
