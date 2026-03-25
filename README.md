# NorgeTravel.com

**Sustainable Arctic Adventures | Fjord Cruises & Northern Lights Tours**

An English-language travel affiliate and editorial platform for Norway, built with Next.js 16. Targets international travellers (US, UK, Germany, Nordics, Australia) planning Arctic adventures during the Solar Cycle 25 peak aurora season of 2026.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Font | Inter (via `next/font/google`) |
| Forms | Netlify Forms |
| Sitemap | next-sitemap (postbuild) |
| Rich snippets | JSON-LD — `TravelAgency` / `TouristTrip` schema |

---

## Getting started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

---

## Project structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout — metadata, lang="en"
│   ├── page.tsx                # Homepage (TravelAgency JSON-LD)
│   ├── om-oss/                 # About page
│   ├── kunnskapsbank/          # Travel Guide hub + articles
│   └── tjenester/              # Tour category pages
│       ├── northern-lights/
│       ├── fjord-cruises/
│       ├── trekking/
│       └── remote-cabins/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Sticky nav — Destinations + Tours dropdowns
│   │   └── Footer.tsx          # Footer — links, affiliate disclosure
│   ├── modules/
│   │   ├── NorgeBackground.tsx # Brand background blobs (navy + aurora green)
│   │   └── home/
│   │       ├── Hero.tsx        # Main hero — "Discover Arctic Norway"
│   │       ├── TrustStrip.tsx  # Affiliate partner logos
│   │       ├── Services.tsx    # 4 tour categories (FeatureTabs)
│   │       ├── SalesPitch.tsx  # 2026 opportunity section
│   │       ├── KunnskapsbankTeaser.tsx  # Travel Guide teaser
│   │       └── ContactPanel.tsx         # Contact form
│   └── ui/
│       ├── ComparisonTable.tsx # Affiliate program comparison tables
│       ├── AffiliateCard.tsx   # Individual affiliate program cards
│       ├── CTABanner.tsx       # Full-width CTA banners (3 variants)
│       ├── FeatureTabs.tsx     # Tabbed content component
│       └── ...                 # shadcn/ui base components
├── assets/                     # Static images (imported via next/image)
│   └── logo_norgetravel.png    # ← YOU MUST ADD THIS FILE
└── lib/
    ├── utils.ts                # cn() helper
    └── site-url.ts             # getSiteUrl() for metadata
```

---

## Brand

### Colors

| Token | Hex | Usage |
|---|---|---|
| Navy (`nt-navy`) | `#1B3A5C` | Primary CTAs, active nav, headings |
| Aurora green (`nt-green`) | `#00CC6A` | Gradient endpoint, highlights, success |
| Water blue (`nt-blue`) | `#5CBFEE` | Secondary accents |

**Primary gradient:** `from-[#1B3A5C] to-[#00CC6A]`

### Logo

Place the full logo (with text) at:

```
src/assets/logo_norgetravel.png
```

The icon-only version (mountains + aurora, no text) can go at:

```
src/assets/logo_norgetravel_icon.png
```

Replace the favicon at `public/logo_thumbail.avif` with the NorgeTravel icon.

---

## Shared components

### `<ComparisonTable>`

Renders an affiliate program comparison table with a navy header row and optional "Top pick" highlights.

```tsx
import { ComparisonTable } from '@/components/ui/ComparisonTable';

<ComparisonTable
  caption="Northern Lights affiliate programs"
  rows={[
    {
      name: 'GetYourGuide',
      network: 'Awin',
      commission: '7%',
      cookie: '30 days',
      niche: 'Global activity aggregator',
      featured: true,
    },
    {
      name: 'Viator',
      network: 'CJ / Impact',
      commission: '8%–10%',
      cookie: '30 days',
      niche: 'TripAdvisor-owned tours',
    },
  ]}
/>
```

### `<AffiliateCard>`

Individual affiliate card with commission badge, cookie window, approval difficulty, and CTA. All outbound links use `rel="noopener noreferrer sponsored"`.

```tsx
import { AffiliateCard } from '@/components/ui/AffiliateCard';

<AffiliateCard
  name="SafetyWing"
  icon="🛡️"
  description="Nomad Insurance — subscription model, 364-day cookie."
  commission="10% recurring"
  cookie="364 days"
  approval="Easy"
  targetMarket="Digital nomads"
  signUpUrl="https://safetywing.com/ambassador/signup"
  contentLink="/kunnskapsbank/digital-nomad-insurance"
  featured
/>
```

### `<CTABanner>`

Full-width call-to-action section. Three variants: `navy`, `green`, `gradient`.

```tsx
import { CTABanner } from '@/components/ui/CTABanner';

<CTABanner
  headline="Ready to chase the Northern Lights?"
  subline="Solar Cycle 25 peaks in 2026 — the best aurora decade in a generation."
  primaryLabel="Explore tours"
  primaryHref="/tjenester/northern-lights"
  secondaryLabel="Read our guide"
  secondaryHref="/kunnskapsbank"
  variant="gradient"
/>
```

---

## Affiliate verticals

| Vertical | Top partners | Commission |
|---|---|---|
| Northern Lights tours | GetYourGuide, Viator, Local Guides | 7%–10% |
| Fjord cruises | Hurtigruten, Havila Voyages | Trade rate |
| Arctic trekking | Norrøna Sport (CJ), 57hours | 10% / lead-based |
| Remote cabins | Booking.com (Awin/CJ), Novasol (Awin) | 2.5%–25% |
| Digital nomad | SafetyWing, Airalo, NordVPN | 10%–100% |

All affiliate links must carry `rel="noopener noreferrer sponsored"`.

---

## SEO

- **Root layout:** `metadataBase`, title template `%s | NorgeTravel`, OG tags, `lang="en"`
- **Homepage JSON-LD:** `@type: TravelAgency`
- **Tour pages:** use `generateMetadata()` for unique titles; add `Product` + `Review` schema with NOK pricing
- **Guide pages:** add `FAQPage` schema to capture "People Also Ask"
- **Images:** always `next/image` with `priority` (above fold) and `placeholder="blur"`
- **Sitemap:** auto-generated postbuild via `next-sitemap`

### Environment variables

| Variable | Description |
|---|---|
| `SITE_URL` | Production URL — `https://norgetravel.com` |
| `NEXT_PUBLIC_SITE_URL` | Same, available client-side |

Create `.env.local` for local development:

```bash
SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Deployment

Configured for **Netlify** (`netlify.toml`, Netlify Forms). Also works on **Vercel** — set `SITE_URL` in environment variables.

```bash
npm run build    # builds Next.js + generates sitemap + robots.txt
```

---

## Brand manifest

Full brand rules, color system, component patterns, voice guidelines, and affiliate strategy:

```
docs/NORGETRAVEL_MANIFEST.md
```
