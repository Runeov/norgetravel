# Daily Report: 2026-04-11

## Geirangerfjord deep content build: trail articles, tabbed activity/route/basecamp components, and the template for scaling to other destinations

### Summary

Built Geirangerfjord into the most content-rich destination on the site. Wrote 4 full trip report articles (Storseterfossen, Fossevandring, Losta, Skagefla) with CC-licensed images. Created 3 custom tabbed components replacing the generic data-driven sections: GeirangerActivities (4 tabs, built in prior session), GeirangerGettingThere (4 route tabs), and GeirangerBasecamps (4 basecamp tabs). Each component follows the same architecture and can be replicated for other destinations.

---

## Part 1: Trail guide articles

### What was built

7 trip report articles now published for Geirangerfjord (4 new today, 3 from prior session). Each follows an identical editorial structure.

| Article | Slug | Read time | Sort |
|---------|------|-----------|------|
| RIB Fjordsafari review | `rib-fjordsafari-geirangerfjord-review` | 8 min | 1 |
| Kayaking Seven Sisters | `kayaking-seven-sisters-geirangerfjord` | 9 min | 2 |
| Geiranger by car | `geiranger-by-car-eagle-road-dalsnibba` | 10 min | 3 |
| Storseterfossen waterfall | `storseterfossen-walk-behind-waterfall-geiranger` | 9 min | 4 |
| Fossevandring waterfall walk | `fossevandring-waterfall-walk-geiranger` | 7 min | 8 |
| Losta viewpoint | `losta-viewpoint-hike-geiranger` | 8 min | 9 |
| Skagefla mountain farm | `skagefla-mountain-farm-geirangerfjord` | 10 min | 10 |

### Article structure (the template)

Every article follows this exact section order. This is the proven template for all future trip reports:

```
1. Personal opening paragraph (first-person, sensory, specific)
2. Context section (what this place is, why it matters, one key number)
3. Figure with CC-licensed image + caption + attribution
4. "What it is" section (factual description, logistics)
5. "What works" section (honest positives)
6. "What doesn't" / honest assessment (what the brochure won't tell you)
7. Logistics table (navy header, alternating rows):
   - Start point, distance, elevation, time, grade, season, cost, parking, water, toilets
8. Trail safety section citing Fjellvettreglene by rule number
9. "Who should / shouldn't" section
10. Second figure with image
11. Author byline (Ingrid Solheim, with credentials and zone badge)
12. Image credits with license links
```

### HTML patterns inside articles.json

The article `content` field is raw HTML stored as a string. Key CSS classes used:

| Element | Classes |
|---------|---------|
| Opening paragraph | `text-lg text-slate-700 leading-relaxed` |
| Section H2 | `text-2xl font-bold text-[#1A365D] mt-10 mb-4` |
| Body paragraph | `text-slate-700 leading-relaxed` |
| Figure wrapper | `my-8` |
| Image | `rounded-lg w-full` with `loading="lazy"` |
| Caption | `text-sm text-slate-500 mt-3 italic` |
| Logistics table header | `bg-[#1A365D] text-white` |
| Table rows | alternating `bg-white` / `bg-slate-50` |
| Safety callout | `bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-md` |
| Author byline box | `bg-slate-50 border border-slate-200 rounded-lg p-6 my-10` |
| Author zone badge | `bg-[#0E7490]/10 text-[#0E7490]` (Fjord Teal) |

### Image sourcing workflow

**What worked:**
- Wikimedia Commons is the best source for CC-licensed Norwegian landscape photos
- Search pattern: go to the Wikimedia Commons category page for the specific location (e.g., `Category:Storseterfossen`, `Category:Skagefla`)
- Download using Node.js `https` module with a descriptive `User-Agent` header

**What did NOT work:**
- `curl` and PowerShell `Invoke-WebRequest` both return 403 Forbidden from Wikimedia Commons (they block generic/missing user agents)
- Downloading directly with bash tools always returned a small HTML redirect page (1,965 bytes) instead of the actual image
- Must verify file sizes after download: anything under 10 KB is almost certainly an HTML error page, not an image

**The working download approach:**
```javascript
// Node.js script with proper User-Agent
const https = require('https');
const options = {
  headers: {
    'User-Agent': 'NorgeTravel-ImageDownloader/1.0 (https://norgetravel.com; editorial use)'
  }
};
// Follow redirects manually (Wikimedia redirects from /wiki/ URLs to actual file URLs)
```

**Attribution tracking:**
- Created `public/images/geiranger/ATTRIBUTION_hiking.txt` with photographer, license, and source URL for every image
- License types used: CC BY-SA 4.0, CC BY 3.0, CC0 (public domain)
- All image `alt` text follows the pattern: `"[Specific location/action] — [Zone], Norway"`

### Data research sources for trail articles

| Source | What it provided | Reliability |
|--------|-----------------|-------------|
| nasjonaleturiststier.no | Official National Hiking Trail certification data, visitor counts, trail specs | High (government) |
| ut.no (DNT) | Trail distances, elevation, GPS tracks, DNT grading | High (official) |
| morotur.no | Regional Moere og Romsdal trail data, Skagefla Red grade confirmation | High (regional authority) |
| visitstranda.com | Local tourist office data for Geiranger area trails | Medium |
| Miljodirektoratet | Fossevandring 180,000 annual visitors figure (Dec 2024 reauthorization report) | High (government) |
| fjordsenter.com | Norwegian Fjord Centre info, cultural context | Medium |

### Integration points (3 files updated per article batch)

1. **`src/data/articles.json`** — Add the article object keyed by slug (NOT an array, it's an object)
2. **`src/app/kunnskapsbank/page.tsx`** — Add to the hardcoded `trip-reports` category articles array (with `status: 'published'`)
3. **`src/components/modules/destinations/GeirangerActivities.tsx`** — Add `slug` field to the trail data so "Read guide" links appear on trail cards

The dynamic route at `src/app/kunnskapsbank/[category]/[slug]/page.tsx` picks up new articles automatically via `generateStaticParams`. No changes needed there.

**Critical gotcha:** `articles.json` is an **object keyed by slug**, not an array. Access pattern is `data[slug]`, not `data.find()`. This caused an error in the first session.

---

## Part 2: GeirangerActivities component (built in prior session, refined today)

### File: `src/components/modules/destinations/GeirangerActivities.tsx` (538 lines)

**4 tabs:** Featured | Tours | Hiking | Where to eat

This was the first custom tabbed component. It replaced the generic `fjord.activities` data-driven cards for the Geiranger slug specifically.

### Architecture pattern (reusable)

```tsx
// 1. 'use client' (required for useState tab switching)
// 2. Data arrays defined inline (not in a separate data file)
// 3. Tab state: useState<TabId>
// 4. Tab buttons with role="tab" and aria-selected
// 5. Conditional rendering: {activeTab === 'featured' && (...)}
// 6. Consistent card styling: bg-white rounded-lg border border-slate-200 p-6
```

**Key design decisions:**
- Data lives inside the component file, not in `fjords.ts`. This keeps the rich content co-located and avoids bloating the shared data model.
- The generic `fjord.activities` data in `fjords.ts` is still used for other fjords. Only Geiranger gets the custom component.
- Conditional rendering in the page: `{fjord.slug === 'geirangerfjord' ? <GeirangerActivities /> : <GenericActivities />}`

### What worked:
- Inline data arrays keep everything in one file. Easy to edit, easy to review.
- Tab UI pattern is fast to build and consistent with the brand's `rounded-md` button spec.
- `min-h-[44px]` on all buttons meets the touch target requirement.
- GetYourGuide affiliate links with `partner_id=5DXMTLJ` and `rel="noopener noreferrer sponsored"` on all outbound links.

### What to replicate for other destinations:
- Copy the component structure, rename to `[Destination]Activities.tsx`
- Update the data arrays
- Add the conditional import and slug check in the page template

---

## Part 3: GeirangerGettingThere component

### File: `src/components/modules/destinations/GeirangerGettingThere.tsx` (703 lines)

**4 tabs:** Alesund | Trollstigen | Hellesylt ferry | Oslo

Replaced the generic `fjord.gettingThere` string array (4 one-line descriptions) with a comprehensive route guide.

### Data structure per route

```typescript
interface RouteData {
  id: string;
  label: string;           // Tab label
  icon: typeof Car;         // Lucide icon for tab
  from: string;             // Origin city
  distance: string;
  realTime: string;         // Actual driving time
  mapsTime: string;         // What Google Maps says (shown with strikethrough)
  roads: string;            // Road number sequence
  season: string;           // When the route is open
  seasonOpen: boolean;      // Green or amber badge
  tollCost?: string;        // Toll info if applicable
  overview: string;         // 2-3 sentence route description
  ferries: RouteFerry[];    // Ferry details (operator, cost, AutoPASS, pre-book)
  publicTransport: PublicTransport[];  // Bus, train, airport options
  stops: RouteStop[];       // Memorable stops with descriptions
  warnings: RouteWarning[]; // Safety/logistics warnings
  carNote: string;          // Rental car advice
}
```

### Layout

```
[Overview card with quick facts strip]
  - Distance badge, Real time (Maps time strikethrough), Season badge, Toll badge

[Two-column grid]
  LEFT:                          RIGHT:
  - Ferries on this route        - Stops along the way
    (operator, crossing time,    - Warnings (red-tinted card)
     frequency, cost, AutoPASS,
     pre-book yes/no)
  - Public transport
  - Rental car note

[Hurtigruten note at bottom]   (static, not per-route)
```

### Research approach

**What worked:**
- Spawning a research agent with a detailed prompt listing exactly what data points were needed per route. The agent used web searches and returned verified numbers with source URLs.
- Asking for specific data: "exact distance in km", "realistic driving time not Google Maps time", "ferry operator name and cost", "seasonal closure months".

**What did NOT work / required verification:**
- Some 2026 prices were not yet published (FjordX ferry). Used 2025 prices with a "~" prefix.
- Trollstigen road status is genuinely uncertain for 2026 (closed 2024, partially open 2025, 305M NOK rockfall project ongoing). This required a prominent warning in the component.
- FRAM bus route 220 (Andalsnes-Trollstigen-Geiranger) was cancelled 2024-2025. Status for 2026 unconfirmed. Flagged with an amber "verify at frammr.no" note.

### Data sources for routes

| Source | Data provided |
|--------|--------------|
| fjord1.no | Eidsdal-Linge ferry timetable, pricing, AutoPASS details |
| fergeruter.info | Ferry schedules and 2026 price tables |
| vegvesen.no | Road closure dates, Trollstigen construction status |
| nasjonaleturistveger.no | Trollstigen visitor centre info, Geiranger-Trollstigen route |
| frammr.no | FRAM bus routes 211 and 220, schedules |
| geirangerfjord.no | Hurtigruten arrival/departure times |
| booking.fjordx.lighthousecloud.app | FjordX Geiranger-Hellesylt ferry booking system |

### Design detail: the strikethrough Maps time

```tsx
<span className="text-slate-400 line-through ml-1">({route.mapsTime})</span>
```

This small detail reinforces the brand voice ("Not what the map app says") and gives travellers the reality check. Reuse this pattern everywhere we show driving times.

---

## Part 4: GeirangerBasecamps component

### File: `src/components/modules/destinations/GeirangerBasecamps.tsx` (635 lines)

**4 tabs:** Geiranger | Hellesylt | Alesund | Valldal

Replaced the generic `fjord.basecamps` cards (3 one-paragraph entries) with a comprehensive accommodation and services guide. Added a fourth basecamp (Valldal) that was not in the original data.

### Data structure per basecamp

```typescript
interface BasecampData {
  id: string;
  label: string;
  name: string;
  tagline: string;              // One-line hook
  population: string;
  distanceToGeiranger: string;
  overview: string;             // 2-3 sentences
  bestFor: string[];            // Green card, bullet list
  notIdealFor: string[];        // Amber card, bullet list
  accommodation: Accommodation[];  // Name, type, price, highlight
  dining: DiningOption[];       // Name + detail
  services: Service[];          // Label, available (boolean), detail
  insiderTip: string;           // Navy-tinted card at bottom
}
```

### Layout

```
[Overview card with population + distance badges]

[Best for / Not ideal for] — two-column green/amber cards

[Two-column grid]
  LEFT:                          RIGHT:
  - Accommodation                - Practical services
    (name, type, price,            (checklist with green check
     highlight paragraph)           or grey X for each service)
  - Dining                       - Local tip (navy card)

[Booking lead times note]      (static, not per-basecamp)
```

### Research approach

Same pattern as routes: spawned a research agent with a detailed prompt listing every data point needed. The prompt was structured by basecamp with specific questions.

**What worked well:**
- Asking for specific hotel names, star ratings, price ranges, and distinguishing features
- Asking for "services grid" data: grocery store brand, fuel station, EV charging count, pharmacy availability
- Asking for "best for / not ideal for" framing. The agent returned useful traveller-type classifications.

**What required manual judgment:**
- Price ranges vary by source and season. Standardized to NOK/night with summer peak ranges.
- Valldal was not in the original data. Added it because Juvet Landscape Hotel is a major draw and the strawberry angle adds unique content.
- Hellesylt dining is genuinely limited. Two entries (village cafes + Hotel Union Oye 23 km away) is honest. Do not pad this with fictional options.

### Data sources for basecamps

| Source | Data provided |
|--------|--------------|
| hotelunion.no | Hotel Union rooms, restaurants, EV charging (40 points), spa details |
| grandefjordhotel.com | Grande Fjord Hotel features, 2024 expansion, price ranges |
| booking.com | Havila Hotel Geiranger details, price ranges, ratings |
| geirangerfjorden.net | Feriesenter camping facilities, cabin types, pitch counts |
| juvet.com | Juvet Landscape Hotel room types, prices (incl. dinner), architecture details |
| valldalfjordhotell.no | Valldal Fjordhotell rooms, expansion plans, restaurant |
| chargemap.com | EV charging station counts (Geiranger: 14, Hellesylt: 2) |
| brosundet.no | Hotel Brosundet features, Molja Lighthouse room |
| jordbarstova.no | Strawberry cafe details, location |

---

## Part 5: The page template pattern

### How the fjord page now works for Geiranger

The `[fjord]/page.tsx` template has three conditional sections:

```tsx
// Activities section
{fjord.slug === 'geirangerfjord' ? (
  <GeirangerActivities />
) : (
  <GenericActivities activities={fjord.activities} />
)}

// Getting There section
{fjord.slug === 'geirangerfjord' ? (
  <GeirangerGettingThere />
) : (
  <GenericGettingThere routes={fjord.gettingThere} />
)}

// Basecamps section
{fjord.slug === 'geirangerfjord' ? (
  <GeirangerBasecamps />
) : (
  <GenericBasecamps basecamps={fjord.basecamps} />
)}
```

**To build the same depth for another fjord (e.g., Sognefjord):**

1. Create `SognefjordActivities.tsx`, `SognefjordGettingThere.tsx`, `SognefjordBasecamps.tsx`
2. Copy the data structures from the Geiranger components
3. Research and fill in the data (spawn research agents with the same prompt patterns)
4. Add imports and slug conditionals to `[fjord]/page.tsx`
5. Write trip report articles following the article template
6. Source CC images from Wikimedia Commons using the Node.js download script

### Estimated effort per destination (based on today's experience)

| Task | Time with AI | Notes |
|------|-------------|-------|
| Research (routes, basecamps, activities) | 20-30 min | Two research agents in parallel |
| Activities component | 15 min | Copy structure, update data |
| Getting There component | 20 min | Most complex due to ferry/road data |
| Basecamps component | 20 min | Accommodation research takes longest |
| Trail articles (4 articles) | 45-60 min | Writing + image sourcing |
| Image downloads + attribution | 15 min | Use the Node.js script pattern |
| Integration (page, kunnskapsbank, links) | 10 min | Mechanical |
| Type check + review | 5 min | |
| **Total per destination** | **~2.5-3 hours** | |

---

## Part 6: What went wrong and how to avoid it

### 1. Wikimedia image downloads (SOLVED)

**Problem:** curl and PowerShell both return 403 or HTML redirect pages from Wikimedia Commons.
**Solution:** Use Node.js `https` with a descriptive User-Agent header. Always check file sizes after download (anything < 10 KB is an error page).
**For next time:** Reuse `scripts/download-images.js` pattern. Or write a purpose-built download function.

### 2. articles.json is an object, not an array (SOLVED)

**Problem:** First attempt used `data.find()` which failed because articles.json is `{ "slug": {...}, "slug2": {...} }`.
**Solution:** Access with `data[slug]`. Confirmed by reading the dynamic route page at `[category]/[slug]/page.tsx`.
**For next time:** Always read the consuming code before writing to a data file.

### 3. Bash heredoc escaping (SOLVED)

**Problem:** Trying to write article HTML content directly in a `node -e` bash command failed due to backticks, quotes, and special characters in the HTML.
**Solution:** Write a separate `.js` script file and run it with `node scripts/add-three-trails.js`.
**For next time:** For any content longer than ~50 lines, always write a script file rather than inline.

### 4. Kunnskapsbank page uses hardcoded arrays (IMPORTANT)

**Problem:** The `/kunnskapsbank` page does NOT read from articles.json. It has hardcoded article arrays per category. Adding an article to articles.json is not enough. You must also manually add it to the kunnskapsbank page.
**For next time:** Always update both files. Consider refactoring to read from articles.json dynamically (but this is a separate task).

### 5. Trollstigen road status uncertainty (ONGOING)

**Problem:** Trollstigen was closed entirely in 2024, partially in 2025, and the 2026 season is uncertain due to ongoing rockfall protection work (305M NOK project).
**Solution:** Added a prominent warning in the Getting There component. Used amber badge for seasonal routes.
**For next time:** Any content mentioning Trollstigen must include a "verify at vegvesen.no" caveat. Do not state opening dates as fact until confirmed by Statens vegvesen.

### 6. Price data has a shelf life

**Problem:** Hotel prices, ferry costs, and toll amounts change annually. 2025 prices used where 2026 not available.
**Solution:** Used "~" prefix and "(2025 prices)" notes where applicable.
**For next time:** Date-stamp price data. Consider adding a `priceYear` field or a "last verified" note to components that show prices. Plan a price refresh before each summer season.

---

## Files created and modified today

### New files

| File | Lines | Purpose |
|------|-------|---------|
| `src/components/modules/destinations/GeirangerGettingThere.tsx` | 703 | 4-tab route guide component |
| `src/components/modules/destinations/GeirangerBasecamps.tsx` | 635 | 4-tab basecamp guide component |

### Modified files

| File | Change |
|------|--------|
| `src/app/destinations/fjords/[fjord]/page.tsx` | Added imports + slug conditionals for GettingThere and Basecamps |

### Previously committed today (from prior session continuation)

| File | Change |
|------|--------|
| `src/data/articles.json` | +3 trail articles (Fossevandring, Losta, Skagefla) |
| `src/app/kunnskapsbank/page.tsx` | +7 published trip report entries |
| `src/components/modules/destinations/GeirangerActivities.tsx` | Trail slugs + corrected trail data |
| `public/images/geiranger/*` | 10 CC-licensed images + attribution file |
| `scripts/add-three-trails.js` | Article insertion script |
| `scripts/download-images.js` | Wikimedia Commons download script |

### Commits

| Hash | Message |
|------|---------|
| `9f8aeeb` | Add Geiranger hiking trail guides and activity component |
| (uncommitted) | GeirangerGettingThere + GeirangerBasecamps components |

### Line counts (Geiranger-specific components)

| Component | Lines |
|-----------|-------|
| GeirangerActivities.tsx | 538 |
| GeirangerGettingThere.tsx | 703 |
| GeirangerBasecamps.tsx | 635 |
| **Total** | **1,876** |

---

## Replication checklist for the next destination

When building the same depth for Sognefjord, Hardangerfjord, or Naeroyfjord:

```
[ ] Spawn research agent for routes (use the Geiranger prompt as template, adjust destinations)
[ ] Spawn research agent for basecamps (use the Geiranger prompt as template)
[ ] Create [Destination]Activities.tsx (copy GeirangerActivities structure)
[ ] Create [Destination]GettingThere.tsx (copy GeirangerGettingThere structure)
[ ] Create [Destination]Basecamps.tsx (copy GeirangerBasecamps structure)
[ ] Add slug conditionals to [fjord]/page.tsx
[ ] Write trip report articles (follow the 12-section template)
[ ] Source CC images from Wikimedia Commons (use Node.js download with User-Agent)
[ ] Add articles to articles.json (object keyed by slug, not array)
[ ] Add articles to kunnskapsbank/page.tsx (hardcoded array, manual step)
[ ] Add slugs to activity/trail cards for "Read guide" links
[ ] Run npx tsc --noEmit
[ ] Verify image file sizes (> 10 KB = real image)
[ ] Commit and push
```
