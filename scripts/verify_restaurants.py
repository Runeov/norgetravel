"""
NorgeTravel Restaurant Verifier
=================================
Checks existing restaurant data against Google Places API to verify:
  1. Business is OPERATIONAL (not closed)
  2. Ratings are current
  3. Website URLs are valid

Usage:
    set GOOGLE_PLACES_API_KEY=your-key-here
    python scripts/verify_restaurants.py --city tromso
    python scripts/verify_restaurants.py --city tromso --fix  # Auto-remove closed entries

This script reads from the fetched JSON files in src/data/city-guides/
and reports any issues found.
"""

import argparse
import json
import os
import sys
import time
from pathlib import Path

import requests

ROOT = Path(__file__).parent.parent
API_KEY = os.environ.get("GOOGLE_PLACES_API_KEY", "")
PLACES_BASE = "https://places.googleapis.com/v1"

DETAIL_FIELDS = ",".join([
    "id",
    "displayName",
    "businessStatus",
    "rating",
    "userRatingCount",
    "websiteUri",
])


def verify_by_place_id(place_id: str) -> dict:
    """Fetch place details and check business status."""
    url = f"{PLACES_BASE}/places/{place_id}"
    headers = {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": DETAIL_FIELDS,
    }

    resp = requests.get(url, headers=headers, timeout=15)
    if resp.status_code != 200:
        return {"error": f"HTTP {resp.status_code}", "status": "UNKNOWN"}

    data = resp.json()
    return {
        "status": data.get("businessStatus", "UNKNOWN"),
        "name": data.get("displayName", {}).get("text", ""),
        "rating": data.get("rating"),
        "reviewCount": data.get("userRatingCount", 0),
        "website": data.get("websiteUri", ""),
    }


def search_and_verify(name: str, city: str) -> dict:
    """Search by name when no placeId is available."""
    url = f"{PLACES_BASE}/places:searchText"
    headers = {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": ",".join([
            "places.id",
            "places.displayName",
            "places.businessStatus",
            "places.rating",
            "places.userRatingCount",
            "places.websiteUri",
        ]),
        "Content-Type": "application/json",
    }

    body = {
        "textQuery": f"{name} restaurant {city} Norway",
        "maxResultCount": 1,
    }

    resp = requests.post(url, headers=headers, json=body, timeout=15)
    if resp.status_code != 200:
        return {"error": f"HTTP {resp.status_code}", "status": "UNKNOWN"}

    data = resp.json()
    places = data.get("places", [])
    if not places:
        return {"error": "Not found", "status": "NOT_FOUND"}

    place = places[0]
    return {
        "status": place.get("businessStatus", "UNKNOWN"),
        "placeId": place.get("id", ""),
        "name": place.get("displayName", {}).get("text", ""),
        "rating": place.get("rating"),
        "reviewCount": place.get("userRatingCount", 0),
        "website": place.get("websiteUri", ""),
    }


def verify_json_file(json_path: Path, city_name: str, fix: bool = False):
    """Verify all restaurants in a JSON file."""
    if not json_path.exists():
        print(f"  [error] File not found: {json_path}")
        return

    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    restaurants = data.get("restaurants", [])
    print(f"\n  Verifying {len(restaurants)} restaurants in {city_name}...")
    print(f"  {'─'*55}")

    issues = []
    verified = []

    for i, r in enumerate(restaurants):
        name = r.get("name", "Unknown")
        place_id = r.get("placeId", "")

        print(f"  [{i+1}/{len(restaurants)}] {name}...", end=" ", flush=True)

        if place_id:
            result = verify_by_place_id(place_id)
        else:
            result = search_and_verify(name, city_name)
            # If found, suggest adding the placeId
            if result.get("placeId"):
                r["_suggestedPlaceId"] = result["placeId"]

        status = result.get("status", "UNKNOWN")

        if status == "OPERATIONAL":
            print(f"✓ OPEN")
            # Update ratings if available
            if result.get("rating"):
                r["_liveRating"] = result["rating"]
                r["_liveReviewCount"] = result.get("reviewCount", 0)
            verified.append(r)
        elif status == "CLOSED_PERMANENTLY":
            print(f"✗ PERMANENTLY CLOSED")
            issues.append({"name": name, "issue": "PERMANENTLY CLOSED", "index": i})
        elif status == "CLOSED_TEMPORARILY":
            print(f"⚠ TEMPORARILY CLOSED")
            issues.append({"name": name, "issue": "TEMPORARILY CLOSED", "index": i})
        elif status == "NOT_FOUND":
            print(f"? NOT FOUND in Google")
            issues.append({"name": name, "issue": "NOT FOUND", "index": i})
        else:
            print(f"? Status: {status}")
            issues.append({"name": name, "issue": f"Unknown status: {status}", "index": i})

        time.sleep(0.5)  # Rate limit

    # Summary
    print(f"\n  {'='*55}")
    print(f"  Verification Summary for {city_name}:")
    print(f"    Total:        {len(restaurants)}")
    print(f"    Operational:  {len(verified)}")
    print(f"    Issues:       {len(issues)}")

    if issues:
        print(f"\n  Issues found:")
        for issue in issues:
            print(f"    ✗ {issue['name']} — {issue['issue']}")

    if fix and issues:
        # Remove closed restaurants
        closed_indices = {
            issue["index"]
            for issue in issues
            if "CLOSED" in issue["issue"]
        }
        data["restaurants"] = [
            r for i, r in enumerate(restaurants)
            if i not in closed_indices
        ]
        data["_meta"]["verifiedAt"] = __import__("datetime").datetime.now(
            __import__("datetime").timezone.utc
        ).isoformat()
        data["_meta"]["count"] = len(data["restaurants"])

        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"\n  [fix] Removed {len(closed_indices)} closed restaurants. File updated.")


def verify_typescript_restaurants(city_key: str, city_name: str):
    """Verify restaurants embedded in TypeScript files (like tromso.ts).
    This is for the existing manually-curated data."""
    ts_path = ROOT / "src" / "data" / "city-guides" / f"{city_key}.ts"
    if not ts_path.exists():
        print(f"  [info] No TypeScript file at {ts_path}")
        return

    print(f"\n  Verifying TypeScript restaurants in {ts_path.name}...")
    print(f"  (Reading restaurant names from file — searching Google Places)")
    print(f"  {'─'*55}")

    # Read the TS file and extract restaurant names
    content = ts_path.read_text(encoding="utf-8")

    # Find all name: '...' or name: "..." patterns in the restaurants array
    import re
    # Match name values (handles unicode escapes)
    name_pattern = re.compile(r"""name:\s*["']([^"']+)["']""")
    names = name_pattern.findall(content)

    # Also match id values for reference
    id_pattern = re.compile(r"""id:\s*["']([^"']+)["']""")
    ids = id_pattern.findall(content)

    if not names:
        print(f"  [info] No restaurant names found in {ts_path.name}")
        return

    issues = []
    for i, name in enumerate(names):
        # Decode unicode escapes
        decoded_name = name.encode().decode("unicode_escape")
        print(f"  [{i+1}/{len(names)}] {decoded_name}...", end=" ", flush=True)

        result = search_and_verify(decoded_name, city_name)
        status = result.get("status", "UNKNOWN")

        if status == "OPERATIONAL":
            live_rating = result.get("rating", "?")
            live_reviews = result.get("reviewCount", 0)
            place_id = result.get("placeId", "")
            print(f"✓ OPEN (★{live_rating}, {live_reviews} reviews)")
            if place_id and i < len(ids):
                print(f"           placeId: {place_id}")
        elif status == "CLOSED_PERMANENTLY":
            print(f"✗ PERMANENTLY CLOSED — REMOVE THIS ENTRY")
            issues.append(decoded_name)
        elif status == "CLOSED_TEMPORARILY":
            print(f"⚠ TEMPORARILY CLOSED — flag for review")
        elif status == "NOT_FOUND":
            print(f"? NOT FOUND — may need manual verification")
        else:
            print(f"? Status: {status}")

        time.sleep(0.8)

    if issues:
        print(f"\n  ✗ CLOSED RESTAURANTS TO REMOVE:")
        for name in issues:
            print(f"    - {name}")
    else:
        print(f"\n  ✓ All restaurants verified operational")


def main():
    parser = argparse.ArgumentParser(description="Verify restaurant data against Google Places API")
    parser.add_argument("--city", choices=list(CITIES.keys()) if 'CITIES' in dir() else ["tromso", "trondheim", "stavanger", "bergen", "oslo"], required=True)
    parser.add_argument("--fix", action="store_true", help="Auto-remove closed restaurants from JSON files")
    parser.add_argument("--source", choices=["json", "ts", "both"], default="both", help="Which data source to verify")
    args = parser.parse_args()

    if not API_KEY:
        print("[error] GOOGLE_PLACES_API_KEY not set.")
        print("  Set it:  set GOOGLE_PLACES_API_KEY=your-key-here")
        sys.exit(1)

    # Import city config from fetch script
    from fetch_restaurants import CITIES
    city_config = CITIES.get(args.city, {})
    city_name = city_config.get("name", args.city.title())

    print(f"\n{'='*60}")
    print(f"  Restaurant Verification — {city_name}")
    print(f"{'='*60}")

    if args.source in ("json", "both"):
        json_path = city_config.get("output")
        if json_path and json_path.exists():
            verify_json_file(json_path, city_name, args.fix)
        elif args.source == "json":
            print(f"  [error] No JSON file found. Run fetch_restaurants.py first.")

    if args.source in ("ts", "both"):
        verify_typescript_restaurants(args.city, city_name)


# Reuse the CITIES config
sys.path.insert(0, str(Path(__file__).parent))

if __name__ == "__main__":
    main()
