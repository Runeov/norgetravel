# Trip planner: from map overlay to the main event

Written 11 October 2026. Owner: site owner. Companion to [the bounce-rate plan](../seo/bounce-rate-strategy.md), which this plan carries out: the planner is the second step every article is missing.

## Where it stands

| Piece | File | State |
|---|---|---|
| Overlay (modal, map + info panel, drill-down) | `src/components/modules/trip-map/NorwayMapOverlay.tsx` | Works on desktop. On a phone the map shrinks into a 300 px box and the SVG labels (14 to 18 px in a 460 by 950 viewBox) become unreadable |
| Map | `src/components/modules/trip-map/NorwayMap.tsx`, data in `src/data/norway-map-zones.ts` | Zones as SVG paths; Lofoten is a 169-character polygon with a 14 px label; the boat-routes icon sits inland at (160, 450), radius 28 |
| Zone panel | `src/components/modules/trip-map/ZoneInfoPanel.tsx` | The block you quoted (colour bar, name, tagline). One "Explore" button, nothing that says there is a level below |
| Drill-down | `src/components/modules/trip-map/ZoneDetailView.tsx`, data in `src/data/zone-subcategories.ts` (1,567 lines, 6 zones) | Tabs for cities, activities, events, stays with cards; tab labels are 10 px on mobile |
| Trip state | `src/context/TripContext.tsx`, `src/types/trip.ts` | Items in localStorage; categories cities, events, experiences, accommodation, restaurants, tours, transport, guides. No dates, people, interests or order |
| Saved trip page | `/my-trip`, `src/components/modules/trip-planner/TripPlannerView.tsx` | A list grouped by category. No route, no suggestions |
| Data to draw on | `src/data/travel-*.json`, articles, city attractions | Already structured with destination, price range and website: 401 published experiences, 1,073 stays, 851 restaurants, 36 events, 35 transport operators, plus the guides. "Add to trip" exists on the travel, event, transport and restaurant cards |
| Use | Vercel events, 28 days | 11 planner opens, 9 affiliate clicks, 2 related-content clicks |

## The target

A visitor arrives on a trip report, scrolls through the planner as a stream (destinations, activities, events, tours, stays, transport), marks what interests them, and gets a route, a travel method, dates that fit, events in that window, places to stay, a kit list with where to buy it, and the booking links. Everything they mark is saved and shareable. An agent assembles a day-by-day plan from our own data. Every suggestion links to a page of ours or a partner we are paid by.

## Phase 0: the fixes you asked for (2 to 3 days)

1. **Readable on a phone.** In `NorwayMapOverlay`, below `lg` show the list view by default (see 4) with a "Show map" toggle; when the map is shown, give it the full width at a 1:1.6 aspect instead of a 300 px box, and pass a `compact` prop so `NorwayMap` renders labels at 22 px (26 px for the active zone) and hides the 9 px port names. In `ZoneInfoPanel` and `ZoneDetailView`, raise body text from `text-sm`/`text-xs` to `text-base`/`text-sm` below `lg`, lift the 10 px tab labels to 12 px minimum, and add a "Tap to enlarge" hint pill over the map that opens the map full-screen with pinch-zoom (`touch-action: pan-x pan-y pinch-zoom`).
2. **Make the hierarchy visible.** In the zone header block, add a level indicator (`Map › Svalbard`) above the name, and to its right the circular destination switcher: six 44 px round buttons, one per zone (Northern Norway, Lofoten, Fjords, Svalbard, Cities, Boat routes) with the zone colour as a ring and the active one filled, so the reader sees the set and can jump without going back. Rename the CTA from "Explore Svalbard" to "Open Svalbard: cities, activities, events, stays" so it reads as the next level. Reuse the same switcher at the top of `ZoneDetailView`.
3. **Boat and Lofoten as pull-out callouts.** Both become circles offshore, connected to their place by a thin leader line, 44 px hit area, label inside: the boat moved out to sea west of the Trondheim coast (about x = -10, y = 420 in viewBox units, radius 36), Lofoten pulled north-west of the islands (about x = 40, y = 200, radius 34) with its name and "Open" inside. Tapping the callout selects the zone exactly as tapping the shape does. Implemented in `NorwayMap.tsx` with positions in `norway-map-zones.ts` so they can be tuned without touching the component.
4. **List view.** A `Map | List` segmented control in the overlay header. List view renders the six zones as full-width rows (colour bar, name, tagline, two stats, "Open") and, inside a zone, the subcategories as a vertical list instead of tabs. Same data, same handlers, so it ships with no new content.
5. **Measure.** New events: `planner_view_toggled` (map/list), `planner_zone_switched` (switcher), `planner_level_opened`. Targets for the first month: opens from 11 to 60, zone opens per open above 1.5.

### Phase 0 status, 11 October 2026: built on Google_dev, not yet merged

What shipped, against the five points above:

1. The map keeps its full width on a phone (height capped at 75 percent of the screen) and every label grew: region names 24 viewBox units (about 16 px on a 390 px phone, up from 10 px), callout and city names 18 to 20 units (12 to 13 px, up from 7 to 9 px). Panel and detail text moved from 12 to 14 px up to 14 to 16 px below the `lg` breakpoint. An "Enlarge map" button opens a full-screen map with zoom buttons and drag or swipe to pan, with an "Open" bar for the selected region.
2. The zone panel header shows a `Map › Destination › Plan it` crumb, and to the right of the name a 3 by 2 grid of six round destination buttons (`ZoneSwitcher.tsx`), also shown in the empty state and across the top of the detail view. The call to action reads "Open Svalbard" with the next level's sections under it ("Cities · Activities · Events · Tours · Accommodation").
3. Lofoten, the boat routes and the cities became offshore callout circles with leader lines (`mapCallouts` in `norway-map-zones.ts`): Lofoten 34 units radius west of the islands, the boat 40 units radius out in the Norwegian Sea, the cities 36 units radius east of Oslo. Each is a 44 px plus tap target with its name under it. Port names that duplicate a city name are no longer drawn twice.
4. A Map | List control sits in the planner header. The list view (`ZoneListView.tsx`) stacks the six destinations as rows numbered "Destination 1 of 6", each expanding to the same summary and "Open" button; in the detail view, list mode stacks the sections as one accordion on every screen size. Phones default to the list; the choice is remembered in localStorage.
5. Four new events: `trip_planner_view_toggled`, `trip_planner_zone_switched`, `trip_planner_level_opened`, `trip_planner_map_enlarged`.

Verified with Playwright at 390 px and 1366 px: no horizontal overflow, no console errors from the planner (the only errors on the page come from the Travelpayouts verification script). Left for later: the section copy in `zone-subcategories.ts` still carries em dashes, and the planner strings are English only.

## Phase 1: the planner becomes a page, and the stream (1 to 2 weeks)

- Promote the planner from a modal to a page at `/[lang]/plan/` (keep `/my-trip/` as "Saved"). URL carries the state (`?zone=svalbard&tab=activities&view=list`) so it is shareable, the back button works, and search engines can index the zone views. The overlay stays as a quick-open shortcut that deep-links to the page.
- The page is a vertical stream per zone: **Where** (destination hubs and city guides), **Do** (experiences, filtered by season), **Attend** (events in a date window), **Book** (tours with partner links), **Stay** (accommodation with reviews), **Move** (transport and ferries), **Read** (the trip reports and guides for that zone). Each card has "Add to trip" (`AddToTripButton`, already built) and a 44 px tap target.
- Trip model grows: `dates`, `travellers`, `interests[]`, `pace`, `mobility` (own car, no car), `budget` tier, and an `order` on items. Persist in localStorage as now; sync to a server store in Phase 4.
- Every article gets the "Plan this trip" block from the bounce plan, which opens the stream at the article's zone with the article's place preselected.

### Phase 1 status, 12 October 2026: built on Google_dev

- **The planner is a page.** `/[lang]/plan/` lists the six destinations with what each holds (activities, stays, events, guides). `/[lang]/plan/[zone]/` is the stream: Where (the curated places from the map's drill-down), Do (experiences, featured and best rated first), Attend (upcoming events, past ones if none are coming), Stay, Eat, Move (transport) and Read (guides and trip reports matched by the shared region rules in `src/lib/trip-report-region.ts`). A sticky jump bar shows the section counts; each section shows up to nine cards with a "See all" link to the full listing. Data comes from `src/lib/planner-data.ts` on the server, so the pages ship only the cards they show.
- **Cards reuse what exists.** Experiences, stays and restaurants use `TravelCard`, events `EventCard`, transport `TransportCard`, so every card already carries "Add to trip", ratings and the partner link. Two new cards cover places and guides.
- **The trip model grew.** `TripItem` has `zone` and `href`; a `TripProfile` (dates, travellers, interests, pace, getting around, budget) lives in `TripContext` under its own localStorage key, edited through the "Your trip basics" panel on the plan pages. Storage writes now wait for the first read, which closes a race where an empty list could overwrite a saved one.
- **Entry points.** The navbar's "Plan Trip" goes to `/plan/`; the home hero and footer still open the quick map; the map's detail view has a "Full planner" link to the zone page; every article's planner card opens its own region's page. The sitemap lists the seven pages.
- **Kept both.** `/my-trip/` stays as the saved list; the overview page links to it from the saved count.
- Verified with Playwright at 390 px and 1366 px: pages load, no horizontal overflow, add-to-trip updates the saved count, trip basics survive a reload, the overlay link lands on the zone page and leaves the planner minimised, the article card links to a zone, an unknown zone is a 404.

## Phase 2: interests in, suggestions out, no model needed yet (1 to 2 weeks)

A rule engine over our own data, deterministic and explainable:

- **Interests**: aurora, midnight sun, hiking, fjords and ferries, whales and wildlife, Sami culture, food, cities, family, photography.
- **Travel method**: from dates, zones and mobility. Two zones 1,500 km apart in winter without a car gives fly plus Hurtigruten segment; fjords in summer with a car gives the E39 with the ferry guide's crossings.
- **Route order**: zones sorted along the coast, with the Bergen to Lofoten and ferry guides supplying times, so the plan never promises a 4-hour day that takes 6.
- **Activities and events**: filtered by season and date window from `travel-experiences.json` and `travel-events.json`; a January trip never gets a midnight-sun kayak.
- **Stays**: `travel-accommodation.json` filtered by zone and budget tier, Booking links first where they exist.
- **Kit**: from the packing guide by season and activity, with Norrøna and 57hours links where relevant.
- Output is a checklist the reader can edit, each line linked to the guide it came from. This is also what the agent in Phase 3 is given as its toolset, so nothing is wasted.

## Phase 3: the agent (1 to 2 weeks)

- API route `/api/plan` that calls Claude with tools that only read our data: `searchExperiences(zone, season, interests)`, `searchEvents(zone, dateRange)`, `searchStays(zone, budget)`, `transportOptions(from, to, season)`, `guideFor(topic)`. The model may only recommend items the tools return, must cite the page each fact came from, and writes in the house voice (no banned words, no em dashes, exact numbers). Output: a day-by-day plan with the reasoning in one line per day and the partner links in place.
- Guardrails: price and time budgets checked against the tool data; a "what we could not verify" footer; no personal data sent beyond dates, party size and interests; nothing stored server-side without consent (GDPR rules in the company profile apply). Cost cap per plan and a daily cap.
- The plan renders in the stream as a timeline the reader can edit; editing re-runs only the affected day.

## Phase 4: keep and share (1 week)

- Shareable plan URL backed by a small server store (Vercel KV or Blob), with an expiry; PDF and calendar export; optional email delivery with explicit consent, which also seeds a newsletter list.
- "Tell me when tickets open" for events with release dates (Trænafestivalen in March, Ekstremsportveko accommodation in February).

## What success looks like

| Measure (28 days) | Now | After Phase 0 | After Phase 2 | After Phase 3 |
|---|---:|---:|---:|---:|
| Planner opens | 11 | 60 | 200 | 400 |
| Items added to a trip | about 0 | 30 | 200 | 600 |
| Pages per visit (Singapore crawler excluded) | 1.28 | 1.4 | 1.7 | 2.0 |
| Affiliate clicks | 9 | 20 | 60 | 150 |
| Plans generated | 0 | 0 | 40 (rule-based) | 150 |

## Rules that bind every phase

- Mobile first: nothing under 14 px, 44 px tap targets, no horizontal scroll, `prefers-reduced-motion` respected (Rules.md sections 7, 13, 14).
- Server components for data, client components only for the interactive leaves; the planner page loads its data on the server so the stream does not fetch on the client.
- Partner links carry `rel="noopener noreferrer sponsored"` only when they carry our tracking (`outboundRel()`); plain links stay plain.
- Every number a suggestion shows comes from our data files or guides, never from the model's memory.
- The planner is for travellers; the admin stays out of it.

## Order of work and first decision

Phase 0 first, deployed on its own so the phone fix is live within days. Phase 1 next, because the stream and the URL state are what Phases 2 and 3 build on. The one decision needed before Phase 1 starts: whether `/plan` replaces `/my-trip` or sits beside it; the plan above keeps both.
