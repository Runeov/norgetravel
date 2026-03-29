# Accommodation Scraper — Build Report

**Date:** 2026-03-30
**Status:** Ready to run — Python and Playwright required

---

## What Was Built

A Python scraper at `scripts/scrape_accommodation.py` that collects accommodation
listings for Svalbard and Finnmark from Booking.com and writes them directly into
`src/data/travel-accommodation.json` in the NorgeTravel schema format.

---

## Files Created

| File | Purpose |
|------|---------|
| `scripts/scrape_accommodation.py` | Main scraper script |
| `scripts/requirements.txt` | Python dependencies |

---

## Target Regions & Search Locations

### Svalbard → `destination: "svalbard"`
| Location | Booking.com search |
|----------|-------------------|
| Longyearbyen | Hotels + cabins in main settlement |
| Barentsburg | Russian mining town, limited options |

### Finnmark → `destination: "northern-norway"`
| Location | Booking.com search |
|----------|-------------------|
| Alta | Largest city in Finnmark, aurora hub |
| Hammerfest | Northernmost town in the world |
| Kirkenes | Gateway to Russia, snowhotel |
| Vadsø | East Finnmark county capital |
| Honningsvåg | Gateway to North Cape |

---

## How It Works

```
Booking.com search URL
        ↓
Playwright (headless Chromium) loads the page
        ↓
Scrapes property cards:
  - Name, type, nightly price, address, review score
        ↓
Infers accommodation type from name keywords:
  hotel / cabin / hostel / camping / rorbu / glamping / apartment
        ↓
Infers price range from NOK nightly rate:
  < 900 NOK → budget
  900–2500 NOK → mid-range
  > 2500 NOK → luxury
        ↓
Deduplicates against existing entries (by name, case-insensitive)
        ↓
Writes to src/data/travel-accommodation.json
  All new entries: status = "draft"
```

---

## Setup & Usage

### Prerequisites
- Python 3.11+
- Chromium (via Playwright)

### Install
```powershell
pip install -r scripts/requirements.txt
playwright install chromium
```

### Run
```powershell
# Both regions
python scripts/scrape_accommodation.py

# One region
python scripts/scrape_accommodation.py --region svalbard
python scripts/scrape_accommodation.py --region finnmark

# Dry run (preview without writing)
python scripts/scrape_accommodation.py --dry-run

# Limit results per city (default 50)
python scripts/scrape_accommodation.py --limit 20
```

---

## Output Format

Each scraped property maps to the `AccommodationSchema`:

```json
{
  "id": "arctic-hotel-longyearbyen",
  "name": "Arctic Hotel Longyearbyen",
  "description": "Arctic Hotel Longyearbyen is a hotel located in Longyearbyen, Norway.",
  "destination": "svalbard",
  "location": "Longyearbyen, Svalbard",
  "priceRange": "luxury",
  "status": "draft",
  "isFeatured": false,
  "sortOrder": 1,
  "accommodationType": "hotel",
  "starRating": 4,
  "amenities": [],
  "checkIn": "15:00",
  "checkOut": "11:00",
  "bookingUrl": "https://www.booking.com/hotel/...",
  "isEcoFriendly": false,
  "nearestTown": "Longyearbyen"
}
```

---

## After Running

1. Open `/admin/travel/accommodation` in the dev server
2. Review each `draft` entry — edit description, add amenities, set eco-friendly flag
3. Set `status: published` for entries ready to go live
4. Rebuild: `NODE_OPTIONS=--max-old-space-size=8192 npm run build`
5. Push to deploy

---

## Fallback Behaviour

If Playwright is not installed, the scraper falls back to `requests` +
`BeautifulSoup`. Booking.com's heavy JavaScript rendering means the fallback
will likely return 0 cards — install Playwright for reliable results.

---

## Limitations & Notes

- All data is scraped from Booking.com search result cards only (no individual property pages)
- Descriptions are auto-generated placeholders — edit them before publishing
- Amenities, capacity, and eco-friendly flag are left empty — fill in the admin
- Images are not scraped — add them manually or via a future image-scraping pass
- Re-running is safe: existing entries are skipped by name match
- Booking.com may update their HTML structure; if 0 results are returned, check
  `[data-testid="property-card"]` still matches in DevTools

---

## Future Improvements

- Scrape individual property pages for full amenity lists and images
- Add sources: VisitNorway, Airbnb, local tourism boards
- Add `--update` flag to refresh descriptions/prices of existing entries
- Add image URL scraping (requires visiting each property page)
- Add affiliate tracking parameters to `bookingUrl` after joining Booking.com affiliate program (Awin/CJ)
