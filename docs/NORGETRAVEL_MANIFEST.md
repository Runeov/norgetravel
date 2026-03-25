# NORGETRAVEL.COM — BRAND & TECHNICAL MANIFEST

---

## 0. PRIME DIRECTIVE

NorgeTravel.com is an English-language travel affiliate and editorial platform for Norway.
Target audience: international travellers (US, UK, Germany, Nordic, Australia) planning Arctic adventures.
Core function: curate the best Norwegian experiences → earn affiliate commissions from vetted operators.
Mantra: "The right guide for the right adventure."

---

## 1. IDENTITY

**Full name:** NorgeTravel.com
**Tagline:** Sustainable Arctic Adventures | Fjord Cruises & Northern Lights Tours
**Domain:** norgetravel.com
**Email:** hello@norgetravel.com
**Language:** English (international)

### What NorgeTravel IS
- An independent editorial travel guide for Norway
- An affiliate hub connecting travellers with verified sustainable operators
- The authority on Solar Cycle 25 aurora tourism and zero-emission fjord cruising
- A resource for mid-range and luxury Arctic travellers

### What NorgeTravel is NOT
- A tour operator (we do not run tours ourselves)
- A Norwegian-language site
- A generic travel aggregator
- A budget backpacker site (focus on mid-range and luxury segments)

---

## 2. BRAND COLORS

| Token        | Hex       | Usage                                            |
|--------------|-----------|--------------------------------------------------|
| `nt-navy`    | `#1B3A5C` | Primary CTAs, active nav, headings, borders      |
| `nt-green`   | `#00CC6A` | Aurora accent, gradient endpoint, success states |
| `nt-blue`    | `#5CBFEE` | Water / fjord secondary accent                   |
| White        | `#FFFFFF` | Card backgrounds                                 |
| `slate-50`   | —         | Page background                                  |
| `slate-900`  | —         | Primary text                                     |
| `slate-600`  | —         | Secondary text                                   |
| `slate-200`  | —         | Borders                                          |

### Gradient (primary CTA)
```
bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A]
```

### Background blobs (NorgeBackground)
```tsx
<div className="absolute top-0 right-0 … bg-[#1B3A5C]/10 rounded-full blur-[100px]" />
<div className="absolute bottom-0 left-0 … bg-[#00CC6A]/10 rounded-full blur-[100px]" />
```

---

## 3. LOGO FILES

| File                              | Usage                          |
|-----------------------------------|--------------------------------|
| `src/assets/logo_norgetravel.png` | Navbar & Footer (full logo)    |
| `public/logo_thumbail.avif`       | Favicon / apple-icon (replace) |

Place the icon-only version (mountains + aurora, no text) at `src/assets/logo_norgetravel_icon.png` for small UI contexts.

---

## 4. TECH STACK

```
Framework:  Next.js 16 (App Router) + TypeScript
Styling:    Tailwind CSS (utility classes only)
Icons:      Lucide React
Animation:  Framer Motion
Font:       Inter (via next/font/google)
Utils:      cn() from @/lib/utils
Forms:      Netlify Forms (/__forms.html)
Sitemap:    next-sitemap (postbuild)
SEO:        JSON-LD — @type TravelAgency / TouristTrip
```

---

## 5. COMPONENT PATTERNS

### Primary CTA button
```tsx
<button className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-full hover:shadow-lg hover:shadow-[#1B3A5C]/30 hover:-translate-y-0.5 transition-all duration-300">
  Explore Tours
  <ArrowRight className="ml-2 h-4 w-4" />
</button>
```

### Nav link (active / inactive)
```tsx
const navLinkClass = (isActive: boolean) =>
  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
    isActive
      ? 'text-[#1B3A5C] bg-[#1B3A5C]/10'
      : 'text-slate-600 hover:text-[#1B3A5C] hover:bg-slate-50'
  }`;
```

### Text gradient
```tsx
<span className="bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] bg-clip-text text-transparent">
  Arctic Norway
</span>
```

### Navbar
```
Position:     sticky top-0 z-50
Height:       h-20
Scrolled:     bg-white/80 backdrop-blur-md border-slate-200/50 shadow-sm
Not scrolled: bg-white/60 backdrop-blur-sm border-transparent
```

### Border radius rules
| Element           | Class          |
|-------------------|----------------|
| Buttons / CTAs    | `rounded-full` |
| Cards             | `rounded-2xl`  |
| Tab buttons       | `rounded-xl`   |
| Mobile nav items  | `rounded-xl`   |
| Form inputs       | `rounded-md`   |
| Badges            | `rounded-full` |

### Forbidden
- ❌ Inline styles (except dynamic themeColor)
- ❌ CSS Modules
- ❌ `rounded-lg` for buttons
- ❌ `fixed` for navbar
- ❌ Colors outside brand palette
- ❌ Missing `transition-*` on interactive elements
- ❌ Missing `cn()` for conditional classNames

---

## 6. SHARED COMPONENTS (design system)

### `<ComparisonTable rows={...} caption="..." />`
- Displays affiliate programs in a sortable table
- Navy header row, featured rows highlighted in green
- File: `src/components/ui/ComparisonTable.tsx`

### `<AffiliateCard name="..." commission="..." ... />`
- Single affiliate program card with commission, cookie, approval badge
- Navy/green gradient CTA button
- `rel="noopener noreferrer sponsored"` on all outbound links
- File: `src/components/ui/AffiliateCard.tsx`

### `<CTABanner headline="..." primaryLabel="..." variant="gradient" />`
- Full-width section CTA — three variants: `navy` | `green` | `gradient`
- Primary button always white (high contrast)
- File: `src/components/ui/CTABanner.tsx`

---

## 7. NAVIGATION STRUCTURE

| Display label  | Route                          |
|----------------|--------------------------------|
| Home           | `/`                            |
| Destinations   | dropdown (see below)           |
| Tours          | dropdown (see below)           |
| About          | `/om-oss`                      |
| Travel Guide   | `/kunnskapsbank`               |
| Plan Your Trip | scroll → `#contact`            |

**Destinations dropdown:**
- Northern Norway → `/destinations/northern-norway`
- Lofoten Islands → `/destinations/lofoten`
- Norwegian Fjords → `/destinations/fjords`
- Svalbard → `/destinations/svalbard`

**Tours dropdown:**
- Northern Lights Tours → `/tjenester/northern-lights`
- Fjord Cruises → `/tjenester/fjord-cruises`
- Arctic Trekking → `/tjenester/trekking`
- Remote Cabin Stays → `/tjenester/remote-cabins`

---

## 8. AFFILIATE STRATEGY (2026)

### Five core verticals
1. **Northern Lights tours** — GetYourGuide (7%), Viator (8–10%), Local Guides (€40+ private)
2. **Fjord cruises** — Hurtigruten (Trade Portal), Havila Voyages (Agency Form)
3. **Luxury trekking** — Norrøna Sport via CJ (10%), 57hours (lead-based)
4. **Remote cabins** — Booking.com via Awin/CJ (tiered 25%), Novasol via Awin (2.5%)
5. **Digital nomad** — SafetyWing (10% recurring, 364-day cookie), Airalo (10%), NordVPN (40–100%)

### Priority segments
- Mid-range ($372–$546/day) and Luxury ($750–$1,091+/day) travellers
- A single private Northern Lights chase for 4 → $100+ per transaction

### Link compliance
- All affiliate links: `rel="noopener noreferrer sponsored"`
- GDPR analytics: only load after user consent

---

## 9. SEO FOUNDATION

### JSON-LD schema (homepage)
```json
{
  "@type": "TravelAgency",
  "name": "NorgeTravel.com",
  "slogan": "Sustainable Arctic Adventures",
  "url": "https://norgetravel.com"
}
```

### Individual tour/article pages — use `generateMetadata()`
- Unique title per page: `"Northern Lights Tours Tromsø 2026 | NorgeTravel"`
- Product + Review schema for tour pages (price in NOK, average rating)
- FAQ schema for guide pages ("When is the best time for Northern Lights in Norway?")

### next/image — mandatory
- `priority` prop on above-the-fold images
- `placeholder="blur"` for all local assets
- `sizes` attribute on every image

---

## 10. VOICE & CONTENT RULES

### Tone
- Direct, confident, specific — like a knowledgeable friend, not a travel brochure
- Back every claim with a number, date, or named operator
- No hedging: "generally", "may vary", "arguably" — cut these
- No filler openers: "In today's world", "It's worth noting" — delete
- Contractions where natural: you'll, it's, we're

### Structure
```
OPENING  → Specific hook (stat, contrarian claim, urgent fact)
BODY     → Precise data — commission rates, G-scale storms, mandates
CLOSING  → Clear action (book a tour, read the guide, sign up for affiliate)
```

### What to avoid
- Norwegian bureaucratic language (this is an English site)
- Em dashes as sentence separators
- Numbered lists when bullets work
- Title Case For Every Word In A Heading (use sentence case)
- Passive voice over 10% of sentences

---

**END OF MANIFEST**
