# SEO & LLM Discoverability Audit
## Averdi Next.js — February 2026
### Focus: Smaller Companies, Sametinget, Lag & Foreninger

---

## EXECUTIVE SUMMARY

The Averdi Next.js site has **strong content foundations** across all three target segments, but suffers from **inconsistent SEO implementation** — the Sametinget section is well-optimized while the Bedrifter and Organisasjoner sections have significant gaps. For LLM discoverability specifically, the site has good structured data on some pages but lacks the semantic clarity and entity definitions that AI systems use to recommend businesses.

### Overall Score by Segment

| Segment | Traditional SEO | LLM Discoverability | Priority |
|---------|----------------|--------------------:|----------|
| **Sametinget** | ⭐⭐⭐⭐ (Good) | ⭐⭐⭐ (Decent) | Medium |
| **Smaller Companies (Bedrifter)** | ⭐⭐⭐ (Decent) | ⭐⭐ (Weak) | High |
| **Lag & Foreninger** | ⭐⭐ (Weak) | ⭐ (Very Weak) | Critical |

---

## 1. CRITICAL ISSUES (Fix Immediately)

### 1.1 🔴 Sitemap Missing 6 Organisasjoner Pages

**File:** [`public/sitemap.xml`](public/sitemap.xml)

The sitemap only includes 2 of 8 organisasjoner pages:
- ✅ `/kunnskapsbank/organisasjoner` (hub)
- ✅ `/kunnskapsbank/organisasjoner/idrettslag`
- ❌ `/kunnskapsbank/organisasjoner/moms` — **MISSING**
- ❌ `/kunnskapsbank/organisasjoner/arsregnskap` — **MISSING**
- ❌ `/kunnskapsbank/organisasjoner/vipps` — **MISSING**
- ❌ `/kunnskapsbank/organisasjoner/stotteordninger` — **MISSING**
- ❌ `/kunnskapsbank/organisasjoner/styreansvar` — **MISSING**
- ❌ `/kunnskapsbank/organisasjoner/arrangementer` — **MISSING**

**Impact:** Google and LLMs cannot discover these pages via sitemap crawling. This is the single biggest SEO issue for the "lag og foreninger" segment.

**Fix:** Run `npx next-sitemap` to regenerate, or manually add the missing URLs.

### 1.2 🔴 Homepage Missing OpenGraph & Twitter Cards

**File:** [`src/app/layout.tsx`](src/app/layout.tsx:9)

The root layout metadata has only `title` and `description`. Missing:
- `openGraph` (title, description, image, url, siteName, locale)
- `twitter` (card, title, description, image)
- `metadataBase`
- `alternates.canonical`

**Impact:** When shared on social media or referenced by LLMs, the homepage has no rich preview. LLMs that crawl OG tags for context get nothing.

### 1.3 🔴 Homepage JSON-LD Missing Key Fields

**File:** [`src/app/page.tsx`](src/app/page.tsx:10)

Current JSON-LD `AccountingService` schema is missing:
- `priceRange` — Helps LLMs understand market positioning
- `openingHours` — Signals active business
- `sameAs` — Links to social profiles (LinkedIn, Facebook)
- `hasOfferCatalog` — Lists services for LLM understanding
- `knowsAbout` — **Critical for LLM ranking** — tells AI what topics you're expert in
- `serviceArea` with specific municipalities
- `slogan` — "Tolken av Nord-Norge"

**Current `areaServed`:** `['Finnmark', 'Troms', 'Nord-Norge']` — too vague for LLMs targeting specific municipalities.

### 1.4 🔴 Organisasjoner Hub Missing JSON-LD Schema

**File:** [`src/app/kunnskapsbank/organisasjoner/page.tsx`](src/app/kunnskapsbank/organisasjoner/page.tsx:9)

The organisasjoner hub page has:
- ✅ Basic `title` and `description`
- ❌ No JSON-LD structured data
- ❌ No OpenGraph tags
- ❌ No canonical URL
- ❌ No BreadcrumbList schema
- ❌ Metadata uses plain `export const metadata = {}` instead of typed `Metadata`

This is the **landing page for all lag & foreninger content** and it's the least optimized page in the entire kunnskapsbank.

---

## 2. HIGH PRIORITY ISSUES

### 2.1 🟠 No OpenGraph/Canonical on 90% of Pages

Only [`src/app/kunnskapsbank/sametinget/page.tsx`](src/app/kunnskapsbank/sametinget/page.tsx:26) has full OpenGraph metadata. Every other page is missing:
- `openGraph` tags
- `twitter` card tags
- `alternates.canonical`
- `metadataBase`

**Pages missing OG (partial list):**
- `/kunnskapsbank/bedrifter` — No OG, no canonical
- `/kunnskapsbank/organisasjoner` — No OG, no canonical
- `/kunnskapsbank` — No OG, no canonical
- All sub-pages under bedrifter and organisasjoner

### 2.2 🟠 No BreadcrumbList Schema on Most Pages

Only the Sametinget hub has `BreadcrumbList` JSON-LD. Missing on:
- All bedrifter pages (0 of 5 pages)
- All organisasjoner pages (0 of 8 pages)
- Kunnskapsbank hub page

**Impact:** Google shows breadcrumbs in search results when this schema exists. LLMs use breadcrumbs to understand site hierarchy and content relationships.

### 2.3 🟠 Bedrifter Section Doesn't Target "Smaller Companies" Explicitly

**File:** [`src/app/kunnskapsbank/bedrifter/page.tsx`](src/app/kunnskapsbank/bedrifter/page.tsx:22)

Current title: `'Bedrift i Tiltakssonen | Skattefordeler & Regnskap 2026'`
Current description: `'Guide til 0% arbeidsgiveravgift...'`

**Problem:** The word "småbedrift" (small business), "enkeltmannsforetak" (sole proprietorship), "gründer" (entrepreneur), or "oppstartsbedrift" (startup) never appears in the metadata or H1. LLMs searching for "regnskapsfører for små bedrifter i Finnmark" won't match this page.

**Recommended title:** `'Regnskap for småbedrifter i Tiltakssonen | 0% AGA & Skattefordeler 2026'`

### 2.4 🟠 Missing `Service` Schema on Bedrifter Pages

The bedrifter hub uses `FAQPage` schema only. It should also include a `Service` schema (like the Sametinget page does) to tell LLMs: "Averdi provides accounting services for businesses in Northern Norway."

### 2.5 🟠 Organisasjoner Title Doesn't Include Geographic Terms

**File:** [`src/app/kunnskapsbank/organisasjoner/page.tsx`](src/app/kunnskapsbank/organisasjoner/page.tsx:10)

Current: `'Lag & Forening | Regnskapshjelp for Frivilligheten'`

Missing geographic qualifiers that LLMs use for local matching:
- "Finnmark"
- "Nord-Norge"  
- "Karasjok"
- "Nord-Troms"

**Recommended:** `'Regnskap for lag og foreninger i Finnmark | Momskompensasjon & Årsregnskap | Averdi'`

---

## 3. LLM-SPECIFIC DISCOVERABILITY ANALYSIS

### 3.1 How LLMs Find and Recommend Businesses

LLMs (ChatGPT, Claude, Gemini, Perplexity) use these signals to recommend a business:

| Signal | Averdi Status | Score |
|--------|--------------|-------|
| **JSON-LD structured data** | Partial (good on Sametinget, weak elsewhere) | ⭐⭐⭐ |
| **Clear entity definition** ("who we are, what we do, where") | Weak — homepage schema too sparse | ⭐⭐ |
| **Topic authority signals** (`knowsAbout`, FAQ schemas) | Good FAQ schemas on most pages | ⭐⭐⭐⭐ |
| **Geographic specificity** | Weak — "Nord-Norge" is too broad | ⭐⭐ |
| **Service catalog clarity** | Missing `hasOfferCatalog` | ⭐ |
| **Content depth & uniqueness** | Excellent — deep, original content | ⭐⭐⭐⭐⭐ |
| **Internal linking structure** | Good hub-and-spoke model | ⭐⭐⭐⭐ |
| **Semantic HTML (headings, sections)** | Good use of H1/H2/H3 hierarchy | ⭐⭐⭐⭐ |

### 3.2 LLM Query Simulation

Here's how Averdi would rank for typical LLM queries:

#### Query: "Regnskapsfører for små bedrifter i Finnmark"
- **Current ranking:** ⭐⭐ (Weak)
- **Why:** No page explicitly targets "små bedrifter" or "småbedrift". The bedrifter section focuses on "Tiltakssonen" tax benefits, not on being a service provider for small businesses.
- **Fix:** Add "småbedrift" and "enkeltmannsforetak" to bedrifter metadata and content. Add a `ProfessionalService` schema.

#### Query: "Hjelp med Sametinget søknad regnskap"
- **Current ranking:** ⭐⭐⭐⭐ (Good)
- **Why:** Excellent content depth, FAQ schema, Service schema, specific grant amounts. The Sametinget section is the best-optimized.
- **Fix:** Add `knowsAbout: ['Sametinget tilskudd', 'STN-området', 'Duodji']` to homepage schema.

#### Query: "Momskompensasjon idrettslag Finnmark"
- **Current ranking:** ⭐⭐ (Weak)
- **Why:** Great content exists at `/kunnskapsbank/organisasjoner/moms` but it's **not in the sitemap**, the hub page has no JSON-LD, and the geographic qualifier "Finnmark" is missing from the hub metadata.
- **Fix:** Regenerate sitemap, add JSON-LD to hub, add geographic terms.

#### Query: "Regnskap for forening i Nord-Norge"
- **Current ranking:** ⭐ (Very Weak)
- **Why:** The organisasjoner hub title is "Lag & Forening | Regnskapshjelp for Frivilligheten" — no geographic terms, no JSON-LD, no OG tags. LLMs have almost no structured signal to connect Averdi to this query.
- **Fix:** Complete metadata overhaul of organisasjoner hub.

### 3.3 The "Entity Gap" Problem

LLMs build an internal "entity model" of businesses. For Averdi, the entity model is currently:

```
WHAT LLMs KNOW:
├── Name: Averdi AS
├── Type: AccountingService
├── Location: Karasjok (from JSON-LD)
├── Area: Finnmark, Troms, Nord-Norge (vague)
├── Phone: +47 78 46 61 16
└── Topics: Sametinget grants (strong signal from FAQ schemas)

WHAT LLMs DON'T KNOW:
├── Services offered (no hasOfferCatalog)
├── Target customers (no audience definition)
├── Expertise areas (no knowsAbout)
├── Social profiles (no sameAs)
├── Price range (no priceRange)
├── That they serve lag & foreninger (no schema signal)
├── That they serve small businesses (no schema signal)
└── Specific municipalities served
```

---

## 4. PAGE-BY-PAGE AUDIT

### 4.1 Homepage (`/`)

| Element | Status | Issue |
|---------|--------|-------|
| Title | ✅ `'Averdi - Statsautorisert regnskapsførerselskap i Nord-Norge'` | Good but could include "Karasjok" |
| Description | ⚠️ Truncated: `'Averdi er et statsautorisert regnskapsførerselskap med base i Karasjok...'` | Ends with `...` — likely incomplete |
| JSON-LD | ⚠️ `AccountingService` — minimal fields | Missing 8+ recommended fields |
| OpenGraph | ❌ Missing entirely | Critical for social sharing |
| H1 | ✅ `'Velkommen til Averdi'` | Could be more descriptive for SEO |
| Canonical | ❌ Missing | |
| `lang` attribute | ✅ `nb` | Correct |

### 4.2 Kunnskapsbank Hub (`/kunnskapsbank`)

| Element | Status | Issue |
|---------|--------|-------|
| Title | ⚠️ `'Kunnskapsbank \| Averdi'` | Too generic, no keywords |
| Description | ✅ Good: mentions Sametinget, Tiltakssonen, Idrettslag | |
| JSON-LD | ✅ `FAQPage` with 3 questions | Good but could add `CollectionPage` type |
| OpenGraph | ❌ Missing | |
| BreadcrumbList | ❌ Missing | |

### 4.3 Sametinget Hub (`/kunnskapsbank/sametinget`)

| Element | Status | Issue |
|---------|--------|-------|
| Title | ✅ `'Sametinget støtteordninger 2026 \| Hent 800 000 kr i kapital'` | Excellent — specific, compelling |
| Description | ✅ Specific amounts, geographic terms | |
| JSON-LD | ✅ `@graph` with FAQPage + BreadcrumbList + Service | **Best in class** |
| OpenGraph | ✅ Full OG + Twitter cards | |
| Canonical | ✅ Set | |
| Robots | ✅ `index: true, follow: true` | |
| Authors | ✅ Named author | |

**This is the gold standard — all other pages should match this level.**

### 4.4 Bedrifter Hub (`/kunnskapsbank/bedrifter`)

| Element | Status | Issue |
|---------|--------|-------|
| Title | ⚠️ `'Bedrift i Tiltakssonen \| Skattefordeler & Regnskap 2026'` | Missing "småbedrift", "Finnmark" |
| Description | ✅ Good keywords | |
| JSON-LD | ⚠️ `FAQPage` only | Missing `Service`, `BreadcrumbList` |
| OpenGraph | ❌ Missing | |
| Canonical | ❌ Missing | |
| H1 | ⚠️ `'Ditt konkurransefortrinn i Nord'` | Creative but not SEO-optimized |

### 4.5 Organisasjoner Hub (`/kunnskapsbank/organisasjoner`)

| Element | Status | Issue |
|---------|--------|-------|
| Title | ⚠️ `'Lag & Forening \| Regnskapshjelp for Frivilligheten'` | No geographic terms, no year |
| Description | ⚠️ Generic | Missing "Finnmark", "Nord-Norge" |
| JSON-LD | ❌ **Completely missing** | Critical gap |
| OpenGraph | ❌ Missing | |
| Canonical | ❌ Missing | |
| BreadcrumbList | ❌ Missing | |
| Metadata typing | ⚠️ Uses `export const metadata = {}` not `Metadata` type | Minor |

### 4.6 Sametinget Sub-pages

| Page | Title Quality | Description | JSON-LD | OG |
|------|--------------|-------------|---------|-----|
| `/sametinget/naering` | ⚠️ Missing "Averdi" or "2026" | ✅ | ❌ | ❌ |
| `/sametinget/primaernaering` | ⚠️ Missing "Averdi" | ✅ | ❌ | ❌ |
| `/sametinget/duodji` | ✅ Compelling with amount | ✅ | ❌ | ❌ |
| `/sametinget/kultur-sprak` | ✅ Good | ✅ | ❌ | ❌ |
| `/sametinget/institusjon` | ✅ Good | ✅ | ❌ | ❌ |
| `/sametinget/offentlig` | ✅ Good | ✅ | ❌ | ❌ |
| `/sametinget/reindrift` | ✅ Good | ✅ | ❌ | ❌ |

### 4.7 Organisasjoner Sub-pages

| Page | Title Quality | Description | JSON-LD | In Sitemap |
|------|--------------|-------------|---------|------------|
| `/organisasjoner/moms` | ✅ Excellent | ✅ | ✅ FAQPage | ❌ **NO** |
| `/organisasjoner/arsregnskap` | ✅ Good | ✅ | ✅ FAQPage | ❌ **NO** |
| `/organisasjoner/vipps` | ✅ Good | ✅ | ✅ FAQPage | ❌ **NO** |
| `/organisasjoner/stotteordninger` | ✅ Excellent | ✅ | ✅ FAQPage | ❌ **NO** |
| `/organisasjoner/styreansvar` | ✅ Good | ✅ | ✅ FAQPage | ❌ **NO** |
| `/organisasjoner/arrangementer` | ✅ Good | ✅ | ✅ FAQPage | ❌ **NO** |
| `/organisasjoner/idrettslag` | ⚠️ Missing year/geo | ✅ | ✅ FAQPage | ✅ |

**Irony:** The sub-pages are well-optimized with JSON-LD, but the hub page has none, and 6 of 7 sub-pages aren't in the sitemap.

---

## 5. ROBOTS.TXT ANALYSIS

**File:** [`public/robots.txt`](public/robots.txt)

```
User-agent: *
Allow: /
Disallow: /team-demo
Disallow: /api/
Disallow: /admin/
Host: https://www.averdi.no
Sitemap: https://www.averdi.no/sitemap.xml
```

| Check | Status |
|-------|--------|
| Allows all crawlers | ✅ |
| Blocks admin/API | ✅ |
| Sitemap reference | ✅ |
| AI-specific directives | ⚠️ No `User-agent: GPTBot` or `User-agent: ClaudeBot` directives |

**Note:** If you want to explicitly allow AI crawlers (for LLM discoverability), consider adding:
```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot  
Allow: /

User-agent: PerplexityBot
Allow: /
```

---

## 6. RECOMMENDED FIXES (Priority Order)

### Priority 1: Critical (Do This Week)

#### Fix 1.1: Regenerate Sitemap
```bash
npx next-sitemap
```
This should pick up all the missing organisasjoner pages automatically.

#### Fix 1.2: Add JSON-LD to Organisasjoner Hub
Add FAQPage + BreadcrumbList + Service schema to `/kunnskapsbank/organisasjoner/page.tsx`.

#### Fix 1.3: Enhance Homepage JSON-LD
Add these fields to the `AccountingService` schema in `page.tsx`:

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  'name': 'Averdi AS',
  'image': 'https://averdi.no/logo_averdi.png',
  'description': 'Statsautorisert regnskapsførerselskap spesialisert på nordnorsk næringsliv, tiltakssonen og samiske organisasjoner.',
  'url': 'https://www.averdi.no',
  'telephone': '+47 78 46 61 16',
  'slogan': 'Tolken av Nord-Norge',
  'foundingDate': '1989',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Juhána Rásttoš geaidnu 2',
    'addressLocality': 'Karasjok',
    'postalCode': '9730',
    'addressCountry': 'NO'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': '69.4719',
    'longitude': '25.5114'
  },
  'areaServed': [
    { '@type': 'AdministrativeArea', 'name': 'Finnmark' },
    { '@type': 'AdministrativeArea', 'name': 'Nord-Troms' },
    { '@type': 'City', 'name': 'Karasjok' },
    { '@type': 'City', 'name': 'Tana' },
    { '@type': 'City', 'name': 'Alta' },
    { '@type': 'City', 'name': 'Hammerfest' }
  ],
  'knowsAbout': [
    'Sametinget tilskudd og støtteordninger',
    'Tiltakssonen skattefordeler',
    'Arbeidsgiveravgift sone 5',
    'Momskompensasjon for idrettslag',
    'Regnskap for lag og foreninger',
    'Regnskap for småbedrifter i Nord-Norge',
    'Finnmarksfradraget',
    'Duodji regnskap',
    'STN-området næringsstøtte'
  ],
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Regnskapstjenester',
    'itemListElement': [
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Regnskap og bokføring' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Lønn og HR' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Årsoppgjør og skatt' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Rådgivning og søknadshjelp' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Regnskap for lag og foreninger' } },
      { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Søknadshjelp Sametinget' } }
    ]
  },
  'priceRange': '$$',
  'sameAs': [
    // Add LinkedIn, Facebook URLs when available
  ]
};
```

#### Fix 1.4: Add OpenGraph to Root Layout
In `layout.tsx`, add:
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://www.averdi.no'),
  title: { ... },
  description: '...',
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    url: 'https://www.averdi.no',
    siteName: 'Averdi - Tolken av Nord-Norge',
    images: [{ url: '/og-images/averdi-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};
```

### Priority 2: High (Do This Month)

#### Fix 2.1: Add OG + Canonical to All Hub Pages
Copy the Sametinget hub's metadata pattern to bedrifter and organisasjoner hubs.

#### Fix 2.2: Add BreadcrumbList Schema to All Pages
Create a reusable breadcrumb JSON-LD generator and add to every kunnskapsbank page.

#### Fix 2.3: Update Bedrifter Metadata for "Small Business" Targeting
```typescript
export const metadata: Metadata = {
  title: 'Regnskap for småbedrifter i Tiltakssonen | 0% AGA & Skattefordeler 2026',
  description: 'Regnskapsfører for små og mellomstore bedrifter i Finnmark og Nord-Troms. Guide til 0% arbeidsgiveravgift, Finnmarksfradraget og skatteoptimalisering.',
};
```

#### Fix 2.4: Update Organisasjoner Hub Metadata
```typescript
export const metadata: Metadata = {
  title: 'Regnskap for lag og foreninger i Finnmark 2026 | Momskompensasjon & Årsregnskap',
  description: 'Regnskapshjelp for idrettslag, velforeninger og samiske organisasjoner i Nord-Norge. Momskompensasjon, Vipps-regnskap, styreansvar og støtteordninger.',
};
```

### Priority 3: Medium (Ongoing)

#### Fix 3.1: Add AI Crawler Directives to robots.txt
#### Fix 3.2: Create OG images for each section (currently referencing non-existent `/og-images/`)
#### Fix 3.3: Add `author` metadata to all article pages
#### Fix 3.4: Consider adding `llms.txt` file (emerging standard for AI discoverability)

---

## 7. THE `llms.txt` OPPORTUNITY

A growing number of sites are adding an `llms.txt` file (similar to `robots.txt`) that helps LLMs understand the site. Consider creating `/public/llms.txt`:

```
# Averdi AS — Statsautorisert Regnskapsførerselskap

## About
Averdi AS is a state-authorized accounting firm based in Karasjok, Finnmark, Norway. 
Founded in 1989, we specialize in accounting, payroll, tax advisory, and grant application 
assistance for businesses, organizations, and Sami institutions in Northern Norway.

## Key Services
- Accounting and bookkeeping for small businesses in the Tiltakssonen (Tax Incentive Zone)
- Payroll and HR services with 0% employer tax optimization
- Annual accounts and tax returns with Finnmark deduction expertise
- Sametinget grant application assistance (up to 800,000 NOK)
- Accounting for sports clubs, associations, and voluntary organizations
- VAT compensation (momskompensasjon) for non-profits

## Geographic Focus
- Finnmark county (all municipalities)
- Nord-Troms (Karlsøy, Kvænangen, Kåfjord, Lyngen, Nordreisa, Skjervøy, Storfjord)
- STN-området (Sametinget's business support area)

## Target Customers
- Small and medium businesses (SMB) in Northern Norway
- Sami organizations and institutions
- Sports clubs and voluntary associations (lag og foreninger)
- Entrepreneurs and startups in the Tiltakssonen
- Reindeer herding businesses (siida)
- Duodji artisans and cultural businesses

## Contact
- Address: Juhána Rásttoš geaidnu 2, 9730 Karasjok, Norway
- Phone: +47 78 46 61 16
- Org.nr: 980 383 571

## Credentials
- Statsautorisert regnskapsfører (State Authorized Accountant)
- Godkjent av Finanstilsynet (Approved by Financial Supervisory Authority)
```

---

## 8. CONTENT STRENGTH ANALYSIS

Despite the technical SEO gaps, the **content quality is exceptional**:

### What's Working Well
- ✅ Deep, original content on Sametinget grants (no competitor has this depth)
- ✅ Specific numbers and amounts (800,000 kr, 0% AGA, 45,000 kr Finnmarksfradrag)
- ✅ FAQ schemas with real questions people ask
- ✅ Expert attribution (named experts like Jan Atle, Alida)
- ✅ Source citations (Statsbudsjettet, Sametinget budsjett, Meld. St. 37)
- ✅ Hub-and-spoke content architecture
- ✅ 7 deep organisasjoner guides (moms, årsregnskap, vipps, etc.)
- ✅ Norwegian language content (low competition in LLMs)

### Content Gaps for LLM Targeting
- ❌ No explicit "Vi hjelper småbedrifter" page or section
- ❌ No pricing/package information (LLMs love to compare)
- ❌ No client testimonials or case studies (social proof for LLMs)
- ❌ No "Hvorfor velge Averdi" comparison page
- ❌ Missing "Samiske foreninger" page (placeholder exists but not built)

---

## 9. QUICK WINS CHECKLIST

- [ ] Run `npx next-sitemap` to regenerate sitemap with all pages
- [ ] Add `metadataBase` to root `layout.tsx`
- [ ] Add OpenGraph defaults to root `layout.tsx`
- [ ] Add JSON-LD to organisasjoner hub page
- [ ] Add "småbedrift" and "Finnmark" to bedrifter hub title
- [ ] Add "Finnmark" and "Nord-Norge" to organisasjoner hub title
- [ ] Add `knowsAbout` to homepage JSON-LD
- [ ] Add `hasOfferCatalog` to homepage JSON-LD
- [ ] Add `areaServed` with specific municipalities to homepage JSON-LD
- [ ] Create `/public/llms.txt` file
- [ ] Add AI crawler allow directives to robots.txt
- [ ] Add BreadcrumbList schema to bedrifter and organisasjoner hubs

---

**END OF SEO AUDIT REPORT**
*Generated: February 2026*
*Auditor: Kilo Code SEO Analysis*

