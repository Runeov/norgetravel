@docs/NORGETRAVEL_MANIFEST.md
@.kilocode/rules/Rules.md
@.kilocode/rules/Voice_rules.md
@.kilocode/rules/NorgeTravel_company_profile.md
@.kilocode/rules/NorgeTravel_expert_personas.md
@.kilocode/rules/Norgetravel_banned_words.md

---

## TRAVEL DATA SYSTEM

### Architecture

```
Admin UI (/admin/travel/*)
  → API routes (/api/admin/travel/*)
    → Zod schemas (src/lib/schemas/travel.*.ts)
      → JSON store (src/data/travel-*.json)
        → Public pages (/travel/*)
```

### Six travel categories

| Category | Schema file | JSON file | Admin route |
|---|---|---|---|
| Accommodation | `travel.accommodation.schema.ts` | `travel-accommodation.json` | `/admin/travel/accommodation` |
| Transport | `travel.transport.schema.ts` | `travel-transport.json` | `/admin/travel/transport` |
| Guides | `travel.guides.schema.ts` | `travel-guides.json` | `/admin/travel/guides` |
| Experiences | `travel.experiences.schema.ts` | `travel-experiences.json` | `/admin/travel/experiences` |
| Restaurants | `travel.restaurants.schema.ts` | `travel-restaurants.json` | `/admin/travel/restaurants` |
| Events | `travel.events.schema.ts` | `travel-events.json` | `/admin/travel/events` |

All six extend `TravelItemBaseSchema` from `src/lib/schemas/travel.shared.ts`.

### Shared base fields (all categories)

```typescript
id, name, description,
destination: 'northern-norway' | 'lofoten' | 'fjords' | 'svalbard' | 'all',
location,
priceRange: 'budget' | 'mid-range' | 'luxury' | 'varies',
website, imageUrl, imageAlt,
status: 'draft' | 'published',
isFeatured: boolean,
sortOrder: number,
createdAt, updatedAt
```

### Accommodation-specific fields

```typescript
accommodationType: 'hotel' | 'cabin' | 'hostel' | 'camping' | 'rorbu' | 'glamping' | 'apartment',
starRating, amenities, capacity, checkIn, checkOut,
bookingUrl,   // rel="noopener noreferrer sponsored" on all outbound links
isEcoFriendly: boolean,
nearestTown
```

---

## ACCOMMODATION SCRAPER

### What it does

Scrapes Booking.com search results for Svalbard and Finnmark, writes entries to
`src/data/travel-accommodation.json` in the schema format above. All scraped entries
land as `status: "draft"` — nothing goes live automatically.

### Run it

```powershell
# Prerequisites (one-time)
pip install -r scripts/requirements.txt
playwright install chromium

# Both regions
python scripts/scrape_accommodation.py

# One region
python scripts/scrape_accommodation.py --region svalbard
python scripts/scrape_accommodation.py --region finnmark

# Preview without writing
python scripts/scrape_accommodation.py --dry-run

# Limit per city (default 50)
python scripts/scrape_accommodation.py --limit 20
```

### Price thresholds (NOK/night)
- `< 900` → `budget`
- `900–2500` → `mid-range`
- `> 2500` → `luxury`

### Limitations
- Scrapes search-result cards only — no individual property pages
- `description`, `amenities`, `capacity`, `isEcoFriendly`, `imageUrl` are empty — fill in admin
- Playwright required; `requests`+`BeautifulSoup` fallback returns 0 results (Booking.com is JS-rendered)
- Re-running is safe: existing entries skipped by name match (case-insensitive)
- If 0 results: check `[data-testid="property-card"]` still matches in DevTools

---

## ADMIN WORKFLOW (draft → live)

1. Run dev server: `npm run dev`
2. Open `/admin/travel/accommodation`
3. For each `draft` entry: edit description, add amenities, set eco-friendly flag, add image URL
4. Set `status: published` when ready
5. Build: `NODE_OPTIONS=--max-old-space-size=8192 npm run build`
6. Deploy

### Adding entries manually
Use `/admin/travel/accommodation/new` — the form validates against `AccommodationSchema` on submit.

### Affiliate links
All `bookingUrl` values must render with `rel="noopener noreferrer sponsored"`.
Add Booking.com affiliate tracking params to `bookingUrl` after joining the affiliate program (Awin/CJ).

---

## RESTAURANT DATA PIPELINE

### Architecture

```
Google Places API (v1)
  → fetch_restaurants.py (search + verify OPERATIONAL)
    → JSON store (src/data/city-guides/restaurants-{city}.json)
      → import_restaurants.py (JSON → TypeScript)
        → TypeScript data (src/data/city-guides/restaurants-{city}.ts)
          → City page components (ISR — live ratings every 24h)
```

### Target restaurant counts per city

| City | Target | Data file |
|---|---|---|
| Tromsø | 50 | `restaurants-tromso.json` |
| Trondheim | 100 | `restaurants-trondheim.json` |
| Stavanger | 100 | `restaurants-stavanger.json` |
| Bergen | 200 | `restaurants-bergen.json` |
| Oslo | 200 | `restaurants-oslo.json` |

### Scripts

```powershell
# Prerequisites
pip install requests

# Fetch restaurants for all cities (requires GOOGLE_PLACES_API_KEY)
set GOOGLE_PLACES_API_KEY=your-key
python scripts/fetch_restaurants.py

# Fetch one city
python scripts/fetch_restaurants.py --city tromso

# Preview without writing
python scripts/fetch_restaurants.py --dry-run

# Verify existing data (checks business status via Google)
python scripts/verify_restaurants.py --city tromso

# Auto-remove closed restaurants
python scripts/verify_restaurants.py --city tromso --fix

# Import JSON → TypeScript
python scripts/import_restaurants.py --city tromso
```

### Verification rules
- Every restaurant must have `businessStatus: OPERATIONAL` from Google Places API
- The fetch script automatically skips `CLOSED_PERMANENTLY` and `CLOSED_TEMPORARILY` entries
- The ISR refresh (google-places.ts) also checks `businessStatus` and returns null for closed restaurants
- Run `verify_restaurants.py` periodically to catch restaurants that close after initial fetch
- Minimum quality threshold: 3.5★ Google rating, 10+ reviews

### Data flow
- `fetch_restaurants.py` writes JSON → `src/data/city-guides/restaurants-{city}.json`
- `import_restaurants.py` converts JSON → TypeScript → `src/data/city-guides/restaurants-{city}.ts`
- City page components import from the TypeScript files
- Live ratings refresh via ISR every 24 hours (when `placeId` is set + API key configured)
- Descriptions marked "pending editorial review" need manual editing before going live

---

## DATA FILE RULES

- JSON files in `src/data/` are the source of truth — no database
- Never write directly to JSON files when the admin API is available; use the API
- When writing to JSON files directly (e.g. via scraper), validate against the Zod schema before committing
- `src/data/travel-accommodation.json` starts as `{}` — the API and scraper handle initialisation to array format
