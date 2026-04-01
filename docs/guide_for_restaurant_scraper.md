# Restaurant Data Pipeline — Setup & Usage Guide

## Overview

NorgeTravel uses a three-script pipeline to fetch, verify, and import restaurant data from Google Places API into the city guide system. Every restaurant is verified as OPERATIONAL before inclusion.

### Target restaurant counts

| City | Target | Status |
|---|---|---|
| Tromsø | 50 | Pending API setup |
| Trondheim | 100 | Pending API setup |
| Stavanger | 100 | Pending API setup |
| Bergen | 200 | Pending API setup |
| Oslo | 200 | Pending API setup |

---

## Prerequisites

### 1. Install Python dependency

```powershell
pip install requests
```

### 2. Google Cloud setup (required before first run)

**Step 1 — Enable billing:**
Go to: https://console.cloud.google.com/project/_/billing/enable
Link a billing account. Google provides $200/month free credit for Maps APIs.

**Step 2 — Enable Places API (New):**
Go to: https://console.developers.google.com/apis/api/places.googleapis.com/overview
Click "Enable".

> Note: The legacy Places API will NOT work. You must enable "Places API (New)" specifically.

**Step 3 — Create or verify your API key:**
Go to: https://console.cloud.google.com/apis/credentials
Create an API key (or use an existing one). Restrict it to "Places API (New)" for security.

**Step 4 — Add the key to .env.local:**

```
GOOGLE_PLACES_API_KEY=your-key-here
```

### 3. Current API key status

- **Project ID:** 430435712908
- **Key:** `AIzaSyAasxe5tF2yNcAKA7laWCgxCJLka5jlPjg`
- **Issue:** Places API (New) not enabled + billing not enabled
- **Action needed:** Enable both (see Step 1 and Step 2 above), then re-run

---

## Scripts

All scripts are in `scripts/` at the project root.

### fetch_restaurants.py — Fetch restaurant data

Searches Google Places API for restaurants in a city, verifies each is OPERATIONAL, and writes verified data to a JSON file.

```powershell
# Set the API key (Windows)
set GOOGLE_PLACES_API_KEY=your-key-here

# Fetch all cities
python scripts/fetch_restaurants.py

# Fetch one city
python scripts/fetch_restaurants.py --city tromso

# Preview without writing files
python scripts/fetch_restaurants.py --dry-run

# Custom limit
python scripts/fetch_restaurants.py --city tromso --limit 50

# Custom quality threshold (default: 3.5 stars, 10 reviews)
python scripts/fetch_restaurants.py --min-rating 4.0 --min-reviews 20
```

**What it does:**
1. Searches "restaurants in {City}, Norway" via Google Places Text Search
2. Paginates to collect results up to the target count
3. Runs additional cuisine-specific searches (seafood, sushi, italian, etc.) if the general search doesn't hit target
4. Checks `businessStatus` on every result — skips CLOSED_PERMANENTLY and CLOSED_TEMPORARILY
5. Filters by minimum rating (3.5★) and review count (10+)
6. Sorts by rating (highest first)
7. Writes to `src/data/city-guides/restaurants-{city}.json`

**Output files:**

| City | Output path |
|---|---|
| Tromsø | `src/data/city-guides/restaurants-tromso.json` |
| Trondheim | `src/data/city-guides/restaurants-trondheim.json` |
| Stavanger | `src/data/city-guides/restaurants-stavanger.json` |
| Bergen | `src/data/city-guides/restaurants-bergen.json` |
| Oslo | `src/data/city-guides/restaurants-oslo.json` |

**Estimated API cost:**
- Text Search: ~$0.032 per request
- 50 restaurants (Tromsø): ~5-10 requests = ~$0.15-0.30
- 200 restaurants (Oslo): ~20-30 requests = ~$0.65-1.00
- All cities combined: ~$2-4 total

---

### verify_restaurants.py — Verify existing data

Checks restaurant data against Google Places API to find closed or invalid entries.

```powershell
set GOOGLE_PLACES_API_KEY=your-key-here

# Verify a city (checks both JSON and TypeScript data files)
python scripts/verify_restaurants.py --city tromso

# Verify only the JSON file
python scripts/verify_restaurants.py --city tromso --source json

# Verify only the TypeScript file (manually curated data)
python scripts/verify_restaurants.py --city tromso --source ts

# Auto-remove closed restaurants from JSON
python scripts/verify_restaurants.py --city tromso --fix
```

**What it does:**
1. Reads restaurant entries from JSON or TypeScript files
2. For entries with a `placeId`: fetches details directly from Google
3. For entries without `placeId`: searches by restaurant name + city
4. Reports status: OPERATIONAL, CLOSED_PERMANENTLY, CLOSED_TEMPORARILY, NOT_FOUND
5. With `--fix`: removes closed entries from JSON files automatically
6. Suggests `placeId` values for entries that don't have one

**When to run:**
- After initial fetch, before going live
- Monthly, to catch restaurants that close after initial fetch
- When a user or editor reports a closed restaurant

---

### import_restaurants.py — Convert JSON to TypeScript

Converts fetched JSON data into TypeScript files that the city page components can import.

```powershell
# Import one city
python scripts/import_restaurants.py --city tromso

# Import all cities
python scripts/import_restaurants.py --all
```

**What it does:**
1. Reads `src/data/city-guides/restaurants-{city}.json`
2. Converts each entry to a TypeScript `CityRestaurant` object
3. Writes `src/data/city-guides/restaurants-{city}.ts`
4. Handles Unicode escaping for Norwegian characters (ø, å, æ, etc.)

**After import:**
- Update the city page to import from the new file
- Descriptions marked "pending editorial review" need manual editing
- Run `npx tsc --noEmit` to verify no type errors

---

## Full workflow (run in order)

```powershell
# 1. Set API key
set GOOGLE_PLACES_API_KEY=your-key-here

# 2. Fetch restaurants (start with Tromsø as a test)
python scripts/fetch_restaurants.py --city tromso

# 3. Verify the data
python scripts/verify_restaurants.py --city tromso --source json

# 4. Import to TypeScript
python scripts/import_restaurants.py --city tromso

# 5. Check TypeScript compiles
npx tsc --noEmit

# 6. Review in browser
npm run dev
# Open http://localhost:3000/destinations/tromso

# 7. If everything looks good, fetch remaining cities
python scripts/fetch_restaurants.py
python scripts/import_restaurants.py --all
```

---

## Live rating refresh (ISR)

Once restaurants have `placeId` values (added by the fetch script), the city pages automatically refresh Google ratings every 24 hours via ISR.

**How it works:**
- `src/lib/google-places.ts` fetches live ratings for all restaurants with a `placeId`
- The city page server component merges live ratings over stored fallback data
- `export const revalidate = 86400` triggers a refresh every 24 hours
- If a restaurant is found to be CLOSED via the API, its live rating returns `null` and stored ratings are used instead

**No action needed** — this happens automatically once `placeId` values are populated and the API key is in `.env.local`.

---

## Data quality rules

- Minimum 3.5★ Google rating and 10+ reviews to be included
- Every restaurant must be `businessStatus: OPERATIONAL` at fetch time
- Descriptions from Google are marked "pending editorial review" — edit before publishing
- Run the verifier monthly to catch closures
- The Compagniet incident (April 2026): restaurant was closed but included in manual data. The pipeline now prevents this by checking `businessStatus` on every fetch and during ISR refresh.

---

## Existing manual data (Tromsø)

The current `src/data/city-guides/tromso.ts` has 11 manually curated restaurants (Compagniet removed — confirmed closed). These will be preserved when the pipeline runs — new restaurants from the API will be added alongside the existing entries.

| ID | Name | Cuisine | Status |
|---|---|---|---|
| emmas-drommekjokken | Emma's Drømmekjøkken | norwegian | Manual entry |
| fiskekompaniet | Fiskekompaniet | seafood | Manual entry |
| arctandria | Arctandria | seafood | Manual entry |
| bardus-bistro | Bardus Bistro | seafood | Manual entry |
| risoya | Risøya Sjømat | seafood | Manual entry |
| aunegarden | Aunegården | local | Manual entry |
| smak-av-tromso | Smak av Tromsø | local | Manual entry |
| mathallen-tromso | Mathallen Tromsø | norwegian | Manual entry |
| skarven | Skarven | pub | Manual entry |
| mack-olhallen | Mack Ølhallen | pub | Manual entry |
| driv | Driv | cafe | Manual entry |

---

## Files reference

| File | Purpose |
|---|---|
| `scripts/fetch_restaurants.py` | Fetch + verify restaurants from Google Places API |
| `scripts/verify_restaurants.py` | Check existing data for closed restaurants |
| `scripts/import_restaurants.py` | Convert JSON → TypeScript data files |
| `src/lib/google-places.ts` | Live rating refresh via ISR (checks businessStatus) |
| `src/types/city-guide.ts` | TypeScript interfaces (CityRestaurant, CuisineCategory, etc.) |
| `src/data/city-guides/restaurants-{city}.json` | Fetched restaurant data (JSON) |
| `src/data/city-guides/restaurants-{city}.ts` | Imported restaurant data (TypeScript) |
| `src/data/city-guides/{city}.ts` | City guide data (includes manually curated restaurants) |
| `.env.local` | API key storage (not committed to git) |
| `.env.example` | API key documentation (committed to git) |
