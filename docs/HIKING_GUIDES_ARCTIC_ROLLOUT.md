# Arctic Hiking Guides Rollout — Report

Date: 2026-04-13
Scope: Lyngen, Senja, Alta, Nordkapp destination pages.

## What was done

Added 16 signature hiking guides (4 per destination) into `src/data/articles.json` and wired each trail's `slug` into the `trails={[...]}` prop on its destination page so the shared `DestinationActivities` component renders a "Read guide" link to `/kunnskapsbank/trip-reports/{slug}`.

| Destination | Author | sortOrders | Slugs |
|---|---|---|---|
| Lyngen | Marte Åsheim | 38–41 | (prior session) |
| Senja | Marte Åsheim | 42–45 | segla-senja-ridge-hike, husfjellet-senja-hike, hesten-senja-viewpoint-hike, barden-senja-ridge-hike |
| Alta | Marte Åsheim | 46–49 | haldde-alta-observatory-hike, komsafjellet-alta-short-hike, rafsbotnfjellet-alta-family-hike, storvikaksla-seiland-ridge-hike |
| Nordkapp | Bjørn Haugen | 50–53 | knivskjelodden-nordkapp-hike, storfjellet-honningsvag-hike, tufjordfjellet-magerya-coastal-hike, duksfjordfjellet-magerya-inland-hike |

Each guide follows the established template: lead, figure, honest DNT grade, route breakdown, turn-back rule, gear list, Fjellvettreglene cited by rule number, HTML logistics table (`bg-[#1A365D]` thead), who should/should skip.

Also fixed a broken image on the Nordkapp page: `king-crab-safari.jpg` → `king-crab-catch_tommy-andreassen.jpg` (the former did not exist in `public/images/nordkapp/activities/`).

Articles.json total grew from 37 → 53 entries across the rollout.

## What went right

- **Template reuse.** The Geiranger/Lyngen template transferred cleanly to Senja, Alta, Nordkapp with no structural rewrites.
- **Persona routing held.** Marte for mountain-technical Lyngen/Senja/Alta; Bjørn for Arctic-zone Nordkapp — matches `NorgeTravel_expert_personas.md` routing table without overriding.
- **Script-based injection.** Writing a one-shot Node script per batch (`add_{destination}_articles.js`) avoided brittle escaped Edit strings for large HTML-heavy entries. Delete-after-run kept the repo clean.
- **Image verification caught a prod bug.** Listing `public/images/nordkapp/` before wiring surfaced the broken king-crab reference before users would hit it.
- **Typecheck clean.** `npx tsc --noEmit` passes with all 16 new slug fields in place.

## What went wrong

- **Edit tool re-read friction.** After a Node script modified `articles.json`, the Edit tool blocked further edits on the destination page with "File has not been read yet." Resolved by Reading the page first, but it cost a round-trip in each batch.
- **One broken image shipped.** The `king-crab-safari.jpg` path had been in the nordkapp page before this rollout — only caught because we audited images while adding article references. Worth a one-pass audit across other destination pages.
- **Slug field required a manual Edit per trail** rather than a single find-and-replace, because each trail name is distinct. Four Edits per destination × 4 destinations = 16 manual edits. Acceptable but unautomated.

## Follow-ups worth queuing

- Sweep `/public/images/**` against `src/app/destinations/**/page.tsx` to catch any remaining missing assets (the nordkapp fix suggests others may exist).
- Consider a helper that accepts `trails={[...]}` and an article index, auto-wiring slugs when the trail name matches an article title — would remove the 16 manual Edits next time.
