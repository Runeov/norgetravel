# Daily Report: 2026-04-09

## Fjord sub-pages, event data expansion, and destination page fixes

### Summary

Created four dedicated fjord guide pages with expert byline and structured data. Added 13 new events across all destinations. Fixed misclassified events appearing on wrong pages. Added events sections to three destination landing pages that were missing them.

---

### 1. Dedicated fjord sub-pages (NEW)

Created a full data-driven sub-page system for individual fjords at `/destinations/fjords/[fjord]`.

| Fjord | Route | UNESCO |
|-------|-------|--------|
| Geirangerfjord | `/destinations/fjords/geirangerfjord` | Yes |
| Naeroyfjord | `/destinations/fjords/naeroyfjord` | Yes |
| Hardangerfjord | `/destinations/fjords/hardangerfjord` | No |
| Sognefjord | `/destinations/fjords/sognefjord` | No |

**Files created:**
- `src/data/fjords.ts` — TypeScript data file with structured content for all 4 fjords (stats, activities, basecamps, seasonal notes, getting there info)
- `src/app/destinations/fjords/[fjord]/page.tsx` — Dynamic route page with `generateStaticParams` and `generateMetadata`

**Page sections:** Hero with full-bleed image, overview with stats sidebar, activities grid, getting there logistics, basecamps, seasonal notes, related tours, expert byline (Ingrid Solheim), and CTA.

Each page is signed by **Ingrid Solheim** (Reise-pragmatiker, Fjord Logistics Editor) with a link to her profile.

---

### 2. Cross-linking updates

**File modified:** `src/data/zone-subcategories.ts`

Updated 20+ `ctaLink` values across cities, activities, events, and tours to point to the correct fjord sub-page:

| Category | Item | Now links to |
|----------|------|-------------|
| Cities | Bergen | `/destinations/fjords/sognefjord` |
| Cities | Flam | `/destinations/fjords/naeroyfjord` |
| Cities | Alesund | `/destinations/fjords/geirangerfjord` |
| Cities | Geiranger | `/destinations/fjords/geirangerfjord` |
| Cities | Voss | `/destinations/fjords/hardangerfjord` |
| Cities | Odda | `/destinations/fjords/hardangerfjord` |
| Cities | Balestrand | `/destinations/fjords/sognefjord` |
| Activities | Cruises | `/destinations/fjords/geirangerfjord` |
| Activities | Kayaking | `/destinations/fjords/naeroyfjord` |
| Activities | Railways | `/destinations/fjords/naeroyfjord` |
| Events | Festspillene | `/destinations/fjords/sognefjord` |
| Events | Ekstremsportveko | `/destinations/fjords/hardangerfjord` |
| Events | Norseman | `/destinations/fjords/hardangerfjord` |
| Events | Apple Harvest | `/destinations/fjords/hardangerfjord` |
| Tours | 3-Day | `/destinations/fjords/naeroyfjord` |
| Tours | 5-Day | `/destinations/fjords/hardangerfjord` |
| Tours | 7-Day | `/destinations/fjords/geirangerfjord` |
| Tours | 10-Day | `/destinations/fjords/geirangerfjord` |

---

### 3. Broken Svalbard image fix

**File modified:** `src/components/modules/home/DestinationsTeaser.tsx`

The homepage destinations teaser showed a broken image for Svalbard on Vercel. Root cause: case-sensitive path mismatch (`/pics/Svalbard/` vs `/pics/svalbard/` on Vercel's Linux filesystem).

**Fix:** Replaced with a verified image path: `/images/svalbard/landscapes/svalbard-landscape_emilien-gigandet-2.jpg`

---

### 4. Misclassified events fix

**File modified:** `src/data/travel-events.json`

Three events had `destination: "all"`, which caused them to appear on every destination page (including Svalbard where they didn't belong). The `filterByDestination` method includes `destination === 'all'` items on every page.

| Event | Was | Fixed to |
|-------|-----|---------|
| Olavsdagene | `all` | `northern-norway` |
| Inferno Metal Festival | `all` | Removed (Oslo event, no matching destination) |
| Oyafestivalen | `all` | Removed (Oslo event, no matching destination) |

---

### 5. New events added

Added 13 new events to `src/data/travel-events.json`:

#### Svalbard (+5)

| Event | Date | Venue |
|-------|------|-------|
| Svalbard Ski Marathon | Mar 2026 | Longyearbyen |
| Solfestuka (Sun Festival) | Mar 2026 | Longyearbyen |
| Spitsbergen Marathon | Jun 2026 | Longyearbyen |
| Taste Svalbard | Sep 2026 | Longyearbyen |
| KunstPause Art Festival | Oct 2026 | Longyearbyen |

#### Lofoten (+5)

| Event | Date | Venue |
|-------|------|-------|
| Lofotfiske (Cod Fishing Season) | Jan-Apr 2026 | Across Lofoten |
| Lofotr Viking Festival | Aug 2026 | Borg, Vestvagoy |
| Insomnia Festival | Jun 2026 | Henningsvaer |
| Lofoten Stockfish Festival | Feb 2026 | Svolvaer |
| Lofoten Skimo | Mar 2026 | Svolvaer |

#### Fjords (+2)

| Event | Date | Venue |
|-------|------|-------|
| Norseman Xtreme Triathlon | Aug 2026 | Eidfjord, Hardangerfjord |
| Hardanger Apple Harvest | Sep-Oct 2026 | Hardangerfjord |

#### Northern Norway (+1)

| Event | Date | Venue |
|-------|------|-------|
| Parkenfestivalen | Aug 2026 | Bodo |

**Final event counts by destination:**

| Destination | Events |
|-------------|--------|
| Northern Norway | 8 |
| Svalbard | 7 |
| Fjords | 6 |
| Lofoten | 6 |

---

### 6. Events sections added to destination pages

Three destination landing pages had no events section. Added `eventsStore.filterByDestination()` integration and event grid UI to each:

| Page | File | Change |
|------|------|--------|
| Fjords | `src/app/destinations/fjords/page.tsx` | Made async, added events fetch + grid |
| Lofoten | `src/app/destinations/lofoten/page.tsx` | Made async, added events fetch + grid |
| Northern Norway | `src/app/destinations/northern-norway/page.tsx` | Made async, added events fetch + grid |

All four destination pages (fjords, lofoten, northern-norway, svalbard) now display their matching events.

---

### Fjords landing page enhancement

**File modified:** `src/app/destinations/fjords/page.tsx`

Converted the static fjord cards into clickable `<Link>` components pointing to each fjord's dedicated sub-page (`/destinations/fjords/geirangerfjord`, etc.) with hover effects and "Read full guide" CTA.

---

### Commits

| Hash | Message |
|------|---------|
| `5670dd1` | Add dedicated fjord sub-pages with expert byline and cross-linked content |
| `d0ae251` | Fix misclassified events showing on wrong destination pages |
| `1ff65d1` | Add events for Lofoten, fjords, and northern Norway |
| `9465277` | Remove Oslo events and add events sections to all destination pages |

**Total: +1,997 lines added, -813 lines removed across 19 files.**
