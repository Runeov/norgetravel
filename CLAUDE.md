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

## DATA FILE RULES

- JSON files in `src/data/` are the source of truth — no database
- Never write directly to JSON files when the admin API is available; use the API
- When writing to JSON files directly (e.g. via scraper), validate against the Zod schema before committing
- `src/data/travel-accommodation.json` starts as `{}` — the API and scraper handle initialisation to array format
