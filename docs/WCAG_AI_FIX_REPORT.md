# WCAG Accessibility Fix Report — Averdi (localhost:3001)
## For Claude AI — Complete Fix Instructions

**Scan date:** 2026-02-24  
**Report file:** `wcag_report_20260224_142318.html`  
**Stack:** Next.js / React / Tailwind CSS / Lucide React icons

---

## PROGRESS SUMMARY (3 scans)

| Scan | Critical | Serious | Moderate | Minor | Total |
|------|----------|---------|----------|-------|-------|
| Original | 8 | 348 | 49 | 38 | **443** |
| After fix 1 | 0 | 43 | 23 | 28 | **94** |
| Current | 5 | 19 | 35 | 35 | **94** |
| **Target** | **0** | **0** | **0** | **0** | **0** |

**Passed checks:** 1278 (up from 1042 originally — +23%)

---

## REMAINING ISSUES — COMPLETE LIST

### 🔴 CRITICAL (5 issues) — Page: `/kunnskapsbank/bedrifter/rekruttering`

All 5 are **form inputs with no label** (WCAG 3.3.2, Level A) in the "InnsatssoneKalkulator" widget.

#### Issue C1 — Unlabelled `<select>` (location dropdown)
```html
<select class="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 ...">
  <option value="...">...</option>
</select>
```
**Fix:** Add `id="calc-location"` to the select and a label before it:
```jsx
<label htmlFor="calc-location" className="block text-sm font-medium text-slate-700 mb-1">
  Velg lokasjon
</label>
<select id="calc-location" className="w-full px-3 py-2.5 ...">
```

#### Issue C2 — Unlabelled `<input>` (salary/amount, max="300000")
```html
<input class="w-full px-3 py-2.5 ..." max="300000" type="number" />
```
**Fix:**
```jsx
<label htmlFor="calc-salary" className="block text-sm font-medium text-slate-700 mb-1">
  Gjennomsnittlig årslønn (kr)
</label>
<input id="calc-salary" max="300000" type="number" className="w-full px-3 py-2.5 ..." />
```

#### Issue C3 — Unlabelled `<input>` (employees, max="500")
```html
<input class="w-full px-3 py-2.5 ..." max="500" type="number" />
```
**Fix:**
```jsx
<label htmlFor="calc-employees" className="block text-sm font-medium text-slate-700 mb-1">
  Antall ansatte
</label>
<input id="calc-employees" max="500" type="number" className="w-full px-3 py-2.5 ..." />
```

#### Issue C4 — Unlabelled `<select>` (municipality/zone, orange styling)
```html
<select class="w-full px-3 py-2.5 border border-[#E86C1F]/40 rounded-xl bg-orange-50 ...">
```
**Fix:**
```jsx
<label htmlFor="calc-municipality" className="block text-sm font-medium text-slate-700 mb-1">
  Velg kommune
</label>
<select id="calc-municipality" className="w-full px-3 py-2.5 border border-[#E86C1F]/40 ...">
```

#### Issue C5 — Unlabelled `<input>` (new hires, max="10")
```html
<input class="w-full px-3 py-2.5 ..." max="10" type="number" />
```
**Fix:**
```jsx
<label htmlFor="calc-new-hires" className="block text-sm font-medium text-slate-700 mb-1">
  Antall nyansettelser
</label>
<input id="calc-new-hires" max="10" type="number" className="w-full px-3 py-2.5 ..." />
```

---

### 🟠 SERIOUS (19 issues)

#### Issues S1–S9 — SVG icons missing `aria-hidden` on `/kunnskapsbank/artikler/sosiookonomiske-forskjeller_Long`

All 9 are decorative Lucide icons. Add `aria-hidden="true"` to each:

| Icon class | Fix |
|-----------|-----|
| `lucide lucide-arrow-left w-4 h-4 mr-2` | `aria-hidden="true"` |
| `lucide lucide-book-open w-4 h-4` | `aria-hidden="true"` |
| `lucide lucide-scale w-8 h-8 text-[#E86C1F]` | `aria-hidden="true"` |
| `lucide lucide-clock w-8 h-8 text-[#E86C1F]` | `aria-hidden="true"` |
| `lucide lucide-heart-pulse w-8 h-8 text-red-600` | `aria-hidden="true"` |
| `lucide lucide-coins w-8 h-8 text-yellow-600` | `aria-hidden="true"` |
| `lucide lucide-file-warning w-8 h-8 text-blue-600` | `aria-hidden="true"` |
| `lucide lucide-shield-check w-4 h-4` | `aria-hidden="true"` |
| `lucide lucide-arrow-right ml-2 w-5 h-5` | `aria-hidden="true"` |

**JSX fix pattern for this page:**
```jsx
// Find all Lucide icon components in this page's component file and add aria-hidden:
<ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
<BookOpen className="w-4 h-4" aria-hidden="true" />
<Scale className="w-8 h-8 text-[#E86C1F]" aria-hidden="true" />
<Clock className="w-8 h-8 text-[#E86C1F]" aria-hidden="true" />
<HeartPulse className="w-8 h-8 text-red-600" aria-hidden="true" />
<Coins className="w-8 h-8 text-yellow-600" aria-hidden="true" />
<FileWarning className="w-8 h-8 text-blue-600" aria-hidden="true" />
<ShieldCheck className="w-4 h-4" aria-hidden="true" />
<ArrowRight className="ml-2 w-5 h-5" aria-hidden="true" />
```

#### Issues S10–S12 — SVG icons on `/kunnskapsbank/bedrifter/transport`

3× `lucide lucide-circle-check w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5` — decorative checkmarks in a list.

**Fix:**
```jsx
<CircleCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
```

#### Issues S13–S15 — SVG icons on `/kunnskapsbank/organisasjoner`

| Icon | Fix |
|------|-----|
| `lucide lucide-arrow-left w-4 h-4 mr-2` | `aria-hidden="true"` |
| `lucide lucide-receipt w-6 h-6` | `aria-hidden="true"` |
| `lucide lucide-heart-handshake w-6 h-6` | `aria-hidden="true"` |

```jsx
<ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
<Receipt className="w-6 h-6" aria-hidden="true" />
<HeartHandshake className="w-6 h-6" aria-hidden="true" />
```

#### Issues S16–S17 — SVG icons on `/kunnskapsbank/bedrifter/rekruttering`

| Icon | Fix |
|------|-----|
| `lucide lucide-info w-4 h-4 text-[#E86C1F]` | `aria-hidden="true"` |
| `lucide lucide-chevron-down w-4 h-4 text-slate-400` | `aria-hidden="true"` |

```jsx
<Info className="w-4 h-4 text-[#E86C1F]" aria-hidden="true" />
<ChevronDown className="w-4 h-4 text-slate-400" aria-hidden="true" />
```

#### Issues S18–S19 — Canvas elements with no text alternative on `/kunnskapsbank/bedrifter/rekruttering`

```html
<canvas height="150" role="img" width="300"></canvas>
```

**Fix:** Add `aria-label` describing what the chart shows:
```jsx
<canvas
  height="150"
  width="300"
  role="img"
  aria-label="Stolpediagram som viser lønnskostnadsbesparelse per ansatt"
/>
```
Or add fallback text inside:
```jsx
<canvas height="150" width="300" role="img" aria-label="Lønnskostnadsbesparelse diagram">
  Diagram viser lønnskostnadsbesparelse
</canvas>
```

---

### 🟡 MODERATE (35 issues)

#### M1–M3 — Contact form missing `autocomplete` attributes (appears on `/`, `/om-oss`, and duplicated pages)

**Affected inputs:**
- Name field (detected as `'name'`)
- Email field (detected as `'email'`)  
- Phone field (detected as `'phone'`)

**Fix — find the contact form component (likely `ContactForm.tsx` or similar):**
```jsx
// BEFORE:
<input aria-required="true" className="flex h-9 w-full ..." name="name" type="text" />
<input aria-required="true" className="flex h-9 w-full ..." name="email" type="email" />
<input className="flex h-9 w-full ..." name="phone" type="tel" />

// AFTER:
<input aria-required="true" autoComplete="name" className="flex h-9 w-full ..." name="name" type="text" />
<input aria-required="true" autoComplete="email" className="flex h-9 w-full ..." name="email" type="email" />
<input autoComplete="tel" className="flex h-9 w-full ..." name="phone" type="tel" />
```

#### M4–M8 — Heading level skipped h2→h4 in footer "Hurtiglenker" (appears on `/baerekraft`, `/apenhetsloven`, `/tilgjengelighet`, `/personvern`)

**Element:** `<h4 class="font-bold text-slate-900 mb-6 text-lg">Hurtiglenker</h4>`

**Fix — in the Footer component:**
```jsx
// BEFORE:
<h4 className="font-bold text-slate-900 mb-6 text-lg">Hurtiglenker</h4>

// AFTER:
<h3 className="font-bold text-slate-900 mb-6 text-lg">Hurtiglenker</h3>
```

#### M9–M14 — Heading level skipped h1→h3 on all `/om-oss/[person]` profile pages

**Element:** `<h3 class="text-[15px] font-semibold ...">Spesialområder</h3>`

**Fix — in the person profile component:**
```jsx
// BEFORE:
<h3 className="text-[15px] font-semibold text-slate-900 mb-3 ...">Spesialområder</h3>

// AFTER:
<h2 className="text-[15px] font-semibold text-slate-900 mb-3 ...">Spesialområder</h2>
```

#### M15 — Heading level skipped h1→h3 on `/kunnskapsbank/organisasjoner`

**Element:** `<h3 class="text-2xl font-bold mb-4 text-white">Ikke gå glipp av momskompensasjonen</h3>`

**Fix:**
```jsx
<h2 className="text-2xl font-bold mb-4 text-white">Ikke gå glipp av momskompensasjonen</h2>
```

#### M16–M20 — Heading level skipped h1→h3 and h2→h4 on `/kunnskapsbank/artikler/sosiookonomiske-forskjeller_Long`

**Elements:**
```html
<h3 class="text-lg font-bold text-slate-900">Averdi Analyse</h3>
<h4 class="font-bold text-slate-800 mb-2">Konsultasjonsutmattelse</h4>
<h4 class="font-bold text-slate-900 mb-2">Hvorfor blir diagnosen sen?</h4>
<h4 class="text-xs uppercase font-bold text-slate-500 mb-2">Byggekostnad</h4>
<h4 class="font-bold text-slate-900 mb-2">Konsekvenser</h4>
```

**Fix:** Change `h3` → `h2` and `h4` → `h3` throughout this article page.

#### M21 — Heading level skipped h1→h3 on `/kunnskapsbank/bedrifter/transport`

**Element:** `<h3 class="font-bold text-red-800 text-lg mb-2">Viktig for transportbedrifter</h3>`

**Fix:**
```jsx
<h2 className="font-bold text-red-800 text-lg mb-2">Viktig for transportbedrifter</h2>
```

#### M22–M27 — Heading and table issues on `/kunnskapsbank/bedrifter/rekruttering`

**M22 — Heading h1→h3:**
```jsx
// BEFORE:
<h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
  📍 Fra kommune
</h3>
// AFTER:
<h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
  📍 Fra kommune
</h2>
```

**M23 — Table missing caption:**
```jsx
// BEFORE:
<table className="w-full text-sm border-collapse">
  <thead>...</thead>
  ...
</table>

// AFTER:
<table className="w-full text-sm border-collapse" aria-label="Lønnskostnadsbesparelse per reisedestinasjon">
  <thead>...</thead>
  ...
</table>
```

**M24–M27 — Table headers missing `scope`:**
```jsx
// BEFORE:
<th className="text-left px-3 py-2 font-semibold text-slate-500 rounded-l-lg">Post</th>
<th className="text-left px-3 py-2 font-semibold text-slate-500">Fra-kommune</th>
<th className="text-left px-3 py-2 font-semibold text-slate-500">Til-kommune</th>
<th className="text-right px-3 py-2 font-semibold text-slate-500 rounded-r-lg">Besparelse</th>

// AFTER:
<th scope="col" className="text-left px-3 py-2 font-semibold text-slate-500 rounded-l-lg">Post</th>
<th scope="col" className="text-left px-3 py-2 font-semibold text-slate-500">Fra-kommune</th>
<th scope="col" className="text-left px-3 py-2 font-semibold text-slate-500">Til-kommune</th>
<th scope="col" className="text-right px-3 py-2 font-semibold text-slate-500 rounded-r-lg">Besparelse</th>
```

**M28–M29 — Canvas `role="img"` missing `aria-label` (same as S18–S19 above):**
```jsx
<canvas height="150" width="300" role="img" aria-label="Lønnskostnadsbesparelse diagram" />
```

---

### 🟢 MINOR (35 issues)

#### Logo link redundant `aria-label` — appears on ALL pages

**Element:** `<a aria-label="Gå til forsiden" href="/">`

The checker flags "Gå til forsiden" as redundant because screen readers already announce it as a link. Two options:

**Option A — Remove aria-label (simplest):**
```jsx
// BEFORE:
<a aria-label="Gå til forsiden" className="flex items-center gap-2 ..." href="/">

// AFTER:
<a className="flex items-center gap-2 ..." href="/">
```

**Option B — Change to a non-redundant label:**
```jsx
<a aria-label="Averdi - Gå til forsiden" className="flex items-center gap-2 ..." href="/">
```

#### Long link text on card components — multiple pages

These are card links where the entire card content becomes the link text. Fix by adding `aria-label` to the `<a>` with a concise description:

**Pattern (applies to `/kunnskapsbank`, `/kunnskapsbank/artikler`, `/kunnskapsbank/bedrifter`, `/kunnskapsbank/sametinget`):**
```jsx
// BEFORE:
<a className="group bg-white rounded-3xl p-8 ..." href="/kunnskapsbank/sametinget">
  <div>... lots of content ...</div>
</a>

// AFTER:
<a
  className="group bg-white rounded-3xl p-8 ..."
  href="/kunnskapsbank/sametinget"
  aria-label="Sametinget støtteordninger — Les mer"
>
  <div aria-hidden="true">... lots of content ...</div>
</a>
```

**Specific cards to fix:**

| Page | href | Suggested aria-label |
|------|------|---------------------|
| `/kunnskapsbank` | `/kunnskapsbank/sametinget` | `"Sametinget støtteordninger — Les mer"` |
| `/kunnskapsbank` | `/kunnskapsbank/bedrifter` | `"Bedrift i Tiltakssonen — Les mer"` |
| `/kunnskapsbank` | `/kunnskapsbank/organisasjoner` | `"Lag og foreninger — Les mer"` |
| `/kunnskapsbank/artikler` | `/kunnskapsbank/bedrifter/rekruttering` | `"Rekruttering i Nord 2026 — Les mer"` |
| `/kunnskapsbank/artikler` | `/kunnskapsbank/sametinget/naering` | `"Næringsstøtte fra Sametinget — Les mer"` |
| `/kunnskapsbank/artikler` | `/kunnskapsbank/bedrifter/transport` | `"Transport og bagatellstøtte — Les mer"` |
| `/kunnskapsbank/bedrifter` | `/kunnskapsbank/bedrifter/rekruttering` | `"Rekruttering — Les mer"` |
| `/kunnskapsbank/bedrifter` | `/kunnskapsbank/bedrifter/vipps-integrasjon` | `"Vipps-integrasjon — Les mer"` |
| `/kunnskapsbank/bedrifter` | `/kunnskapsbank/bedrifter/transport` | `"Transport — Les mer"` |
| `/kunnskapsbank/sametinget` | `/kunnskapsbank/sametinget/primaernaering` | `"Primærnæring — Les mer"` |
| `/kunnskapsbank/sametinget` | `/kunnskapsbank/sametinget/kultur-sprak` | `"Kultur og språk — Les mer"` |
| `/kunnskapsbank/organisasjoner` | `/kunnskapsbank/organisasjoner/idrettslag` | `"Idrettslag — Les mer"` |
| `/kunnskapsbank/artikler/sosiookonomiske-forskjeller_Long` | `/kunnskapsbank/artikler/averdi-radet` | `"Averdi Rådet — Les neste artikkel"` |

---

## COMPONENT FILE LOOKUP GUIDE

Based on the Next.js structure, here are the likely file locations for each fix:

| Fix | Likely file path |
|-----|-----------------|
| Calculator labels (C1–C5) | `app/kunnskapsbank/bedrifter/rekruttering/page.tsx` or a component it imports |
| Contact form autocomplete (M1–M3) | `components/ContactForm.tsx` or `components/contact/ContactForm.tsx` |
| Footer "Hurtiglenker" h4→h3 (M4–M8) | `components/Footer.tsx` |
| Profile page "Spesialområder" h3→h2 (M9–M14) | `app/om-oss/[slug]/page.tsx` or `components/PersonProfile.tsx` |
| Logo link aria-label (all pages) | `components/Header.tsx` or `components/Navbar.tsx` |
| Card link text (minor) | Individual page files or shared card components |
| Article page headings | `app/kunnskapsbank/artikler/sosiookonomiske-forskjeller_Long/page.tsx` |
| Transport page heading | `app/kunnskapsbank/bedrifter/transport/page.tsx` |
| Organisasjoner heading | `app/kunnskapsbank/organisasjoner/page.tsx` |
| Table scope attributes | `app/kunnskapsbank/bedrifter/rekruttering/page.tsx` |
| Canvas aria-label | `app/kunnskapsbank/bedrifter/rekruttering/page.tsx` |
| SVG icons (all remaining) | Same files as above — add `aria-hidden="true"` to each Lucide icon |

---

## PRIORITY ORDER FOR CLAUDE AI

Fix in this order for maximum impact:

```
1. [CRITICAL] Add labels to 5 calculator inputs in rekruttering page
2. [SERIOUS]  Add aria-hidden="true" to remaining SVG icons (3 pages)
3. [SERIOUS]  Add aria-label to 2 canvas chart elements
4. [MODERATE] Add autocomplete to contact form (name/email/tel) — affects all pages
5. [MODERATE] Fix footer h4→h3 "Hurtiglenker" — affects 4+ pages
6. [MODERATE] Fix profile page h3→h2 "Spesialområder" — affects 6 person pages
7. [MODERATE] Fix article/content page heading levels (h3→h2, h4→h3)
8. [MODERATE] Add scope="col" to table headers in rekruttering
9. [MINOR]    Fix logo link aria-label — affects all pages
10. [MINOR]   Add aria-label to long card links
```

---

## EXPECTED RESULT AFTER ALL FIXES

| Metric | Current | After fixes |
|--------|---------|-------------|
| Critical | 5 | **0** |
| Serious | 19 | **0** |
| Moderate | 35 | **0** |
| Minor | 35 | **~5** (some false positives) |
| **Total** | **94** | **~5** |
| WCAG Score | ~75/100 | **~99/100** |

---

## VERIFICATION COMMAND

After applying fixes, run:
```bash
set PYTHONIOENCODING=utf-8 && python checker.py http://localhost:3001 --max-pages 25 --format html
```
