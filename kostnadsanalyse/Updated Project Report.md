# Updated Project Report — Averdi Next.js

Date: 2025-12-19  
Repository: `c:/dev/November_2025/averdiNextJS`

## 1. Purpose and scope

This report consolidates the existing documentation in the `kostnadsanalyse/` folder with a current snapshot of the codebase.

**Important:** This version does **not** recalculate costs or hours. Any numeric estimates are quoted *as-is* from the source documents.

### In scope

- Summary of the strategic intent, positioning, and deliverables described in the existing analyses.
- Current repository status: tech stack, implemented features, routing/SEO health, and notable risks.
- Practical recommendations for next steps (without cost/effort estimates).

### Out of scope

- Recomputing or validating prior cost/ROI assumptions.
- Legal/tax/policy validation of the factual claims (e.g., Sametinget or Tiltakssonen rules).
- Security audit beyond identifying obvious risk patterns.

## 2. Source documents used (from `kostnadsanalyse/`)

1. **Project Analysis and Report Generation** (PDF)
2. **WorkAnalyse** (PDF)
3. **SEO-analyse for regnskapsbransjen Nord-Norge 1** (PDF)
4. **Project Cost estimate** (Markdown)

## 3. Executive summary

The project is a content-led Next.js platform designed to position Averdi as a highly credible “translator” of Northern Norway’s special regulatory and incentive landscape (Sametinget + Tiltakssonen/STN) and convert that expertise into leads through authoritative guides and interactive tools.

The repository already contains:

- A functional marketing homepage and a large “Kunnskapsbank” route tree (App Router).
- Two notable interactive features:
  - A Vipps/PowerOffice setup wizard that produces standardized JSON/text handoff artifacts.
  - An “Innsatssone/Tiltakssone” calculator embedded in content.
- Early SEO foundations (metadata, JSON-LD patterns, robots + sitemap files).

However, the current repo has several production-critical gaps:

- Multiple navigation links and sitemap entries do not match implemented routes (likely 404s + SEO issues).
- Build-time correctness gates are disabled (TypeScript errors and ESLint warnings can ship).
- Some flows risk handling credentials client-side (e.g., storing wizard output in browser storage).

The main next steps are to fix routing/sitemap integrity, re-enable quality gates, and establish a governance process for policy-sensitive data and content.

## 4. Current codebase snapshot (repo reality)

### 4.1 Tech stack

- Next.js App Router (Next.js 15.x)
- React 19
- TypeScript
- Tailwind CSS
- Radix UI primitives, lucide icons, framer-motion
- Chart.js + react-chartjs-2

### 4.2 Information architecture and key areas

- **Homepage** composed from modular sections (hero, trust strip, services, sales pitch, teaser, contact panel).
- **Kunnskapsbank** hub with sub-hubs:
  - Sametinget
  - Bedrifter
  - Organisasjoner
- **Articles (“Artikler”)** listing, with a route strategy that includes both short and long versions for at least one topic.

### 4.3 Notable implemented features

- **Vipps integration guide + setup wizard**
  - Multi-step UI that collects integration parameters and generates downloadable artifacts.
  - A demo API route for previewing JSON output.
- **Innsatssone/Tiltakssone calculator**
  - Client-side calculator embedded into relevant content.
  - “Machine-readable” data spans (data attributes) intended to support provenance/verification.

### 4.4 SEO foundations present

- Per-page metadata (including OpenGraph/Twitter metadata on some pages)
- JSON-LD injection patterns on key pages
- Static `robots.txt` and a static `sitemap.xml`

### 4.5 Repo risks / issues observed

**Routing integrity (high impact)**

- Navbar/Footer link to routes that do not exist in the `src/app/` tree.
- Several hub pages link to subpages that are not present.

**SEO correctness risk**

- `sitemap.xml` includes URLs that do not match the current route tree, which can harm crawl quality.

**Build correctness gates disabled (high risk)**

- Build config ignores linting and TypeScript build errors.
- There are visible escape hatches in the code (e.g., `@ts-ignore`) that should be addressed once gates are restored.

**Security/privacy risk (credentials handled client-side)**

- The Vipps wizard can store configuration outputs in the browser (localStorage). If real secrets are ever entered, this creates risk.
- Recommendation: treat the wizard as a “parameter collection + handoff” tool only, or move secret handling server-side.

**Data maintainability risk (policy-sensitive numbers embedded in code)**

- Several rates, lists, and values are hard-coded in TS/TSX/data files.
- No automated verification or source-of-truth governance is implemented.

## 5. Summary of existing analyses (from `kostnadsanalyse/`)

### 5.1 Project Analysis and Report Generation (PDF)

**Core intent:** Build a platform that makes highly local expertise discoverable and verifiable, leveraging E‑E‑A‑T and machine-readable semantics (JSON‑LD).  
**Key deliverables described:** authority-building expert pages, structured knowledge architecture, a universal Vipps wizard, and an integration guide to reduce support burden.

**Key risk emphasized:** YMYL trust—accuracy, sources, and transparent authorship are foundational.

### 5.2 WorkAnalyse (PDF)

**Core intent:** Document implemented work: Next.js-based knowledge bank, SEO/structured data patterns, expert identity approach, and interactive self-service flows.

**Key operational insight:** “Data spans” and structured claims require update discipline (who updates, when, based on which sources).

### 5.3 SEO-analyse for regnskapsbransjen Nord-Norge 1 (PDF)

**Positioning:** “Tolken av Nord‑Norge” — the accounting firm as a proactive translator of regional rules into business value.

**Strategy:** build content around high-intent user questions (eligibility, process, templates, geography clarity) and publish precise updates tied to official sources.

**Important:** Several numeric examples in this PDF appear in a “proposal / example” framing (e.g., 2026-related changes). They must be labeled as such in public content.

### 5.4 Project Cost estimate (Markdown)

This document contains the prior effort estimate **~200–300 hours**, with category ranges for:

- Technical infrastructure (60–80)
- Custom logos/branding (25–35)
- Knowledge bank implementation (80–120)
- SEO & content optimization (35–50)
- Interactive features (15–25)

It also includes ROI ranges and a phase/timeline narrative; these values are presented as assumptions and should be clearly sourced/qualified when shared.

## 6. Consolidated findings

### 6.1 What the project is (as a product)

- A **knowledge platform** (authority engine) targeting Northern Norway’s unique incentive and compliance context.
- A set of **conversion tools** (wizards/calculators) that turn complex requirements into actionable, standardized outputs.

### 6.2 What makes it defensible

- Regional specialization + operational guidance (not just generic “accounting services”).
- E‑E‑A‑T mechanics: authorship, sources, credentials, and transparent update labeling.
- Machine-readable structures (JSON‑LD + provenance patterns) that increase compatibility with AI-driven discovery.

### 6.3 What currently blocks “production readiness”

- Inconsistent routes, broken links, and mismatched sitemap.
- Disabled build correctness checks.
- Lack of an explicit content/data governance workflow.

## 7. Recommendations (prioritized, no cost estimates)

1. **Fix routing and navigation integrity**
   - Remove or implement missing routes referenced from Navbar/Footer and hub pages.
   - Add a link-check step before release.

2. **Make sitemap and robots match the real site**
   - Update or regenerate `public/sitemap.xml` from the actual route tree.
   - Ensure metadata/canonical strategy is consistent.

3. **Re-enable correctness gates**
   - Restore TypeScript + ESLint enforcement in build once the current error surface is addressed.
   - Remove `@ts-ignore` escapes where possible.

4. **Harden the Vipps wizard security model**
   - Treat secrets as server-side only.
   - Avoid persisting sensitive values in `localStorage`.

5. **Introduce content + policy-data governance**
   - Maintain a canonical “source-of-truth list” with update cadence and page-level “last verified” dates.
   - Clearly label “proposal vs enacted” for budget/policy changes.

6. **Add a minimal QA/testing baseline**
   - Routing smoke tests, link integrity checks, and basic tests for critical interactive flows.

## 8. Appendix A — Known integrity problems to resolve (examples)

This appendix lists examples of inconsistencies observed during repo review. It is not exhaustive.

- Navbar links to `/om-oss` but no such route folder is present.
- Footer links to `/personvern` and `/cookies` but no such route folders are present.
- Several hub pages link to subpages that are not implemented.
- `sitemap.xml` includes URLs that do not match current route folders.

