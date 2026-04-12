# Norgetravel.com — Styling & Coding Rules v2
## For AI Coding Assistants & Human Developers
### Verified Against Brand Guidelines, Logo & Five-Zone Architecture

---

## CRITICAL: READ BEFORE WRITING A SINGLE LINE OF CODE

This document governs all UI implementation for the Norgetravel Next.js project. The design system reflects the brand identity: **"The Real Norway, Unfiltered."** Every component must be clean, pragmatic, trustworthy, and rugged. Never bubbly. Never cute. Never generic SaaS.

**Cross-reference mandatory before building:**
- Content voice rules → `NorgeTravel_voice_rules_v2.md`
- Zone architecture → `NorgeTravel_company_profile_v2.md` Section 11
- Expert personas → `NorgeTravel_expert_personas_v2.md`

---

## 1. TECH STACK

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | Next.js 15+ (App Router) | Server components by default |
| Language | TypeScript (strict mode) | No `any` types — ever |
| Styling | Tailwind CSS (utility classes only) | No custom CSS files unless documented here |
| Icons | Lucide React | See full icon map in Section 12 |
| Animation | Framer Motion | Constrained — see Section 13 |
| Font | Roboto via `next/font/google` | See Section 3 |
| Images | `next/image` exclusively | No raw `<img>` tags |
| Utils | `cn()` from `@/lib/utils` | All conditional classNames |
| State | React `useState` / `useReducer` | No external state library unless justified |
| Data fetching | Server components + `fetch()` | Prefer RSC over client fetching |

---

## 2. COLOR SYSTEM

### Brand Colors

| Token | Hex | Tailwind Class | Usage |
|-------|-----|---------------|-------|
| Fjord Blue | `#1A365D` | `text-[#1A365D]` / `bg-[#1A365D]` | Primary text, headings, footer, primary buttons |
| Aurora Green | `#00D084` | `text-[#00D084]` / `bg-[#00D084]` | CTAs, active states, success, highlights |
| Aurora Green Hover | `#00B875` | `bg-[#00B875]` | Hover state for Aurora Green elements only |
| Glacier Blue | `#A5D8FF` | `text-[#A5D8FF]` / `bg-[#A5D8FF]` | Secondary accents, footer headings, water elements |
| Signal Red | `#D32F2F` | `text-[#D32F2F]` / `bg-[#D32F2F]` | Safety warnings, trail alerts, urgent callouts |

### `tailwind.config.js` Theme Extension

```javascript
colors: {
  background: "var(--background)",
  foreground: "var(--foreground)",
  'norge-fjord':   '#1A365D',
  'norge-aurora':  '#00D084',
  'norge-glacier': '#A5D8FF',
  'norge-warning': '#D32F2F',
}
```

### Neutral Palette (Tailwind Slate)
Slate's cool undertones reflect the Nordic climate. Use exclusively — no warm grays.

| Purpose | Class |
|---------|-------|
| Page background | `bg-slate-50` |
| Card background | `bg-white` |
| Primary body text | `text-slate-800` |
| Secondary / metadata | `text-slate-600` |
| Placeholder / muted | `text-slate-400` |
| Borders | `border-slate-200` |
| Dividers | `border-slate-100` |
| Dark section text | `text-slate-200` |

### Zone Accent Colors
Each geographic zone has a subtle accent used for zone badges, section borders, and map markers. Never used as primary UI colors.

| Zone | Expert | Zone Accent | Hex | Usage |
|------|--------|------------|-----|-------|
| Fjord Norway | Ingrid | Fjord Teal | `#0E7490` | Zone badge border, section accent |
| The Arctic | Bjørn | Aurora Violet | `#6D28D9` | Zone badge border, section accent |
| The High Peaks | Marte | Summit Stone | `#78716C` | Zone badge border, section accent |
| Urban Hubs | Silje | Urban Slate | `#334155` | Zone badge border, section accent |
| Working Coast | Lars Erik | Salt Rust | `#B45309` | Zone badge border, section accent |

```typescript
// Zone accent map — use with ZoneBadge component
export const ZONE_ACCENTS = {
  fjord:   { border: '#0E7490', label: 'Fjord Norway',    bg: '#0E749015' },
  arctic:  { border: '#6D28D9', label: 'The Arctic',      bg: '#6D28D915' },
  peaks:   { border: '#78716C', label: 'The High Peaks',  bg: '#78716C15' },
  urban:   { border: '#334155', label: 'Urban Hubs',      bg: '#33415515' },
  coast:   { border: '#B45309', label: 'Working Coast',   bg: '#B4530915' },
} as const;

export type ZoneKey = keyof typeof ZONE_ACCENTS;
```

### Accessibility: Contrast Ratios
These are non-negotiable — travelers read on phones in outdoor glare.

| Combination | Ratio | Standard |
|-------------|-------|----------|
| `#1A365D` on `bg-slate-50` | 10.4:1 | AAA ✅ |
| `#00D084` on `#1A365D` | 4.8:1 | AA ✅ |
| `text-slate-800` on `bg-white` | 14.7:1 | AAA ✅ |
| `text-slate-600` on `bg-white` | 5.9:1 | AA ✅ |
| `#D32F2F` on `bg-white` | 5.1:1 | AA ✅ |
| ❌ `#A5D8FF` on `bg-white` | 1.9:1 | FAIL — never use Glacier Blue as body text |

---

## 3. TYPOGRAPHY

### Font Setup (`layout.tsx`)

```typescript
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap', // Prevent invisible text during load
});

// Apply to body:
className={cn(roboto.variable, "font-sans antialiased bg-slate-50 text-slate-800 min-h-screen flex flex-col")}
```

### Type Scale

| Element | Classes | Notes |
|---------|---------|-------|
| Hero H1 | `text-5xl md:text-7xl font-black text-[#1A365D] tracking-tight uppercase` | Homepage hero only |
| Section H2 | `text-3xl md:text-4xl font-bold text-[#1A365D]` | Major section headers |
| Card H3 | `text-xl font-bold text-slate-800` | Content card titles |
| Article H2 | `text-2xl font-bold text-[#1A365D] mt-10 mb-4` | In-article subheadings |
| Article H3 | `text-xl font-semibold text-slate-800 mt-8 mb-3` | In-article section breaks |
| Body Large | `text-lg text-slate-700 leading-relaxed` | Lead paragraphs |
| Body | `text-base text-slate-600 leading-relaxed` | Standard body copy |
| Metadata / Label | `text-sm font-medium text-slate-500 uppercase tracking-wide` | Tags, categories, timestamps |
| Caption | `text-xs text-slate-400` | Image captions, fine print |
| Expert Byline | `text-sm font-semibold text-[#1A365D] uppercase tracking-wide` | Author attribution |

### Typography Rules
- **Never** use `font-light` (`300`) for body text — insufficient contrast on outdoor screens
- **Always** use `leading-relaxed` on paragraphs — critical for readability on mobile
- **Norwegian terms** in body text: wrap in `<em>` or use `font-medium text-slate-800` to distinguish inline
- **Numbers / data** in body text: `font-semibold text-slate-800` — makes logistics data scannable

---

## 4. TYPESCRIPT CONTENT INTERFACES

All content types must be typed. No `any`. No `object`. No untyped props.

```typescript
// /types/content.ts

export type DNTGrade = 'green' | 'blue' | 'red' | 'black';
export type ZoneKey = 'fjord' | 'arctic' | 'peaks' | 'urban' | 'coast';
export type Season = 'winter' | 'spring' | 'summer' | 'autumn';
export type SafetyLevel = 1 | 2 | 3; // 1 = Awareness, 2 = Active Risk, 3 = Life-Safety

export interface Expert {
  id: string;
  name: string;
  title: string;            // e.g. "Reise-pragmatiker"
  titleEn: string;          // e.g. "Fjord Logistics Editor"
  zone: ZoneKey;
  basecamp: string;
  bio: string;
  bioShort: string;         // Max 120 chars — for card display
  signaturePhrases: string[];
  avatarUrl: string;
  credentials: string[];
}

export interface Trail {
  id: string;
  slug: string;
  title: string;
  zone: ZoneKey;
  dntGrade: DNTGrade;
  distanceKm: number;
  elevationGainM: number;
  estimatedHours: { min: number; max: number };
  season: Season[];
  safetyLevel: SafetyLevel;
  requiresGuide: boolean;
  expert: Expert['id'];
  description: string;
  heroImageUrl: string;
  heroImageAlt: string;
  fjellvettRegler: number[]; // Which of the 9 rules apply — e.g. [3, 4, 8]
  warnings: SafetyWarning[];
}

export interface SafetyWarning {
  level: SafetyLevel;
  title: string;
  body: string;
  source?: string;          // e.g. "Fjellvettreglene Rule 8"
}

export interface FerryRoute {
  id: string;
  name: string;
  operator: string;
  fromPort: string;
  toPort: string;
  durationMinutes: number;
  summerFrequency: string;
  winterFrequency: string;
  autoPASS: boolean;
  preBookRequired: boolean;
  vehiclesAllowed: boolean;
  bookingUrl?: string;
}

export interface Itinerary {
  id: string;
  slug: string;
  title: string;
  durationDays: number;
  zones: ZoneKey[];
  season: Season[];
  lead: Expert['id'];
  support?: Expert['id'];
  days: ItineraryDay[];
  difficulty: 'easy' | 'moderate' | 'demanding';
  totalDriveKm: number;
  estimatedFerries: number;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  description: string;
  stops: string[];
  ferries: FerryRoute['id'][];
  overnightAt: string;
  drivingTimeHours: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  zone: ZoneKey;
  expert: Expert['id'];
  publishedAt: string;      // ISO 8601
  updatedAt: string;
  season?: Season;
  tags: string[];
  heroImageUrl: string;
  heroImageAlt: string;
  excerpt: string;          // Max 160 chars — also used as meta description
  readingTimeMinutes: number;
}
```

---

## 5. BORDER RADIUS

Sharper than standard SaaS — reflects the rugged, pragmatic brand.

| Component | Class | Notes |
|-----------|-------|-------|
| Buttons / CTAs | `rounded-md` | Solid, reliable |
| Cards | `rounded-lg` | Clean containers |
| Feature tabs | `rounded-md` | Tab navigation |
| Form inputs | `rounded-sm` | Utilitarian |
| Status badges | `rounded-sm` | DNT grade, open/closed |
| Zone badges | `rounded-sm` | Zone identifier chips |
| Images in cards | `rounded-none` | Images bleed to card edge |
| Safety callout | `rounded-r-md` | Left border anchors the block |

**Hard rule:** `rounded-full` is forbidden for all functional UI elements. It may only appear in avatar images.

---

## 6. SHADOWS

| Level | Class | Use Case |
|-------|-------|----------|
| Subtle | `shadow-sm` | Navbar (scrolled), inputs, zone badges |
| Default | `shadow` | Standard cards |
| Hover | `hover:shadow-md` | Interactive cards, primary buttons |
| Elevated | `shadow-lg` | Modals, dropdowns, toasts |

**Hard rule:** No colored shadows (e.g., no `shadow-[#00D084]/50`). Shadows are neutral — they are functional depth cues, not decorative.

---

## 7. LAYOUT & SPACING

### Root Layout (`layout.tsx`)

```typescript
<html lang="en" className="scroll-smooth">
  <body className={cn(
    roboto.variable,
    "font-sans antialiased bg-slate-50 text-slate-800 min-h-screen flex flex-col"
  )}>
    <Navbar />
    <main className="flex-1">
      {children}
    </main>
    <Footer />
  </body>
</html>
```

### Container Patterns

| Context | Classes |
|---------|---------|
| Navbar / Footer | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| Content sections | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20` |
| Article / Blog width | `max-w-3xl mx-auto px-4 sm:px-6` |
| Hero (full-bleed) | `relative w-full` — no max-w constraint |

### Responsive Breakpoint Strategy

| Breakpoint | Width | Strategy |
|-----------|-------|----------|
| Default (mobile) | < 640px | Single column. Touch targets min 44px. Font sizes base. |
| `sm` | 640px+ | Two-column grid unlocks. Navigation expands. |
| `md` | 768px+ | Three-column grid. Sidebar layouts emerge. |
| `lg` | 1024px+ | Full four-column grid. Hero text scales up. |
| `xl` | 1280px+ | Max-width containers hit ceiling. No layout change. |

**Mobile-first mandate:** Write base styles for mobile. Layer complexity upward with `sm:`, `md:`, `lg:`. Never write desktop-first styles.

### Touch Target Rule
All interactive elements must meet a minimum 44×44px tap area — travelers use this site in gloves, in rain, on moving ferries.

```typescript
// Minimum touch target wrapper pattern
<button className="min-h-[44px] min-w-[44px] flex items-center justify-center ...">
```

---

## 8. COMPONENT LIBRARY

### 8.1 Navbar (`components/Navbar.tsx`)

```typescript
<nav className={cn(
  "fixed top-0 z-50 w-full transition-all duration-300",
  scrolled
    ? "bg-[#1A365D] text-white shadow-md"
    : "bg-transparent text-white border-b border-white/20"
)}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    {/* Logo */}
    {/* Nav links */}
    {/* Primary CTA */}
  </div>
</nav>
```

**Primary CTA Button (exact — do not modify):**
```typescript
<button className="group inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-[#1A365D] transition-all duration-200 bg-[#00D084] hover:bg-[#00B875] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00D084]">
  Plan Your Route
  <Map className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
</button>
```

---

### 8.2 Footer (`components/Footer.tsx`)

```typescript
<footer className="bg-[#1A365D] text-white pt-16 pb-8 border-t-4 border-[#00D084]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
      {/* 4 columns: Logo+tagline | Navigate | Zones | Legal */}
    </div>
  </div>
</footer>

// Footer section headings:
<h4 className="font-bold text-[#A5D8FF] uppercase tracking-wider text-sm mb-6">
  Navigate
</h4>

// Footer links:
<a className="text-slate-300 hover:text-white text-sm transition-colors">
```

---

### 8.3 Trail / Content Card (`components/TrailCard.tsx`)

```typescript
<div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
  {/* Image */}
  <div className="relative h-48 w-full overflow-hidden bg-slate-200">
    <Image
      src={trail.heroImageUrl}
      alt={trail.heroImageAlt}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
    {/* DNT Grade Badge */}
    <DNTGradeBadge grade={trail.dntGrade} className="absolute top-4 left-4" />
    {/* Zone Badge */}
    <ZoneBadge zone={trail.zone} className="absolute top-4 right-4" />
  </div>
  {/* Content */}
  <div className="p-6">
    <h3 className="text-xl font-bold text-[#1A365D] mb-2">{trail.title}</h3>
    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4 font-medium">
      <span className="flex items-center gap-1">
        <Clock className="w-4 h-4" />
        {trail.estimatedHours.min}–{trail.estimatedHours.max} hrs
      </span>
      <span className="flex items-center gap-1">
        <TrendingUp className="w-4 h-4" />
        {trail.elevationGainM}m ascent
      </span>
      <span className="flex items-center gap-1">
        <Ruler className="w-4 h-4" />
        {trail.distanceKm}km
      </span>
    </div>
    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{trail.description}</p>
    {trail.safetyLevel >= 2 && (
      <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#D32F2F]">
        <AlertTriangle className="w-3.5 h-3.5" />
        Safety gear required
      </div>
    )}
  </div>
</div>
```

---

### 8.4 DNT Grade Badge (`components/DNTGradeBadge.tsx`)

```typescript
const DNT_GRADE_CONFIG = {
  green:  { label: 'Green Trail',   bg: 'bg-emerald-600', text: 'text-white' },
  blue:   { label: 'Blue Trail',    bg: 'bg-blue-600',    text: 'text-white' },
  red:    { label: 'Red Trail',     bg: 'bg-[#D32F2F]',   text: 'text-white' },
  black:  { label: 'Black Trail',   bg: 'bg-slate-900',   text: 'text-white' },
} as const;

export function DNTGradeBadge({
  grade,
  className,
}: {
  grade: DNTGrade;
  className?: string;
}) {
  const config = DNT_GRADE_CONFIG[grade];
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-sm text-xs font-bold uppercase tracking-wide",
      config.bg,
      config.text,
      className
    )}>
      {config.label}
    </span>
  );
}
```

---

### 8.5 Zone Badge (`components/ZoneBadge.tsx`)

```typescript
export function ZoneBadge({ zone, className }: { zone: ZoneKey; className?: string }) {
  const accent = ZONE_ACCENTS[zone];
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-sm text-xs font-bold uppercase tracking-wide bg-black/60 text-white border-l-2",
        className
      )}
      style={{ borderColor: accent.border }}
    >
      {accent.label}
    </span>
  );
}
```

---

### 8.6 Safety Warning Callout (`components/SafetyCallout.tsx`)

Three severity levels. Use the correct one — do not default to Level 1 for everything.

```typescript
// Level 1 — General Awareness (yellow-amber)
<div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6 rounded-r-md">
  <div className="flex items-start gap-3">
    <Info className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
    <div>
      <h4 className="font-bold text-amber-800">Trail Advisory</h4>
      <p className="text-amber-900 text-sm mt-1">{warning.body}</p>
    </div>
  </div>
</div>

// Level 2 — Active Risk Warning (signal red)
<div className="bg-[#D32F2F]/10 border-l-4 border-[#D32F2F] p-4 my-6 rounded-r-md">
  <div className="flex items-start gap-3">
    <AlertTriangle className="w-5 h-5 text-[#D32F2F] mt-0.5 shrink-0" />
    <div>
      <h4 className="font-bold text-[#D32F2F]">Safety Warning</h4>
      <p className="text-slate-700 text-sm mt-1">{warning.body}</p>
      {warning.source && (
        <p className="text-xs text-slate-500 mt-2 font-medium">{warning.source}</p>
      )}
    </div>
  </div>
</div>

// Level 3 — Life-Safety Alert (full red background, always at top of page)
<div className="bg-[#D32F2F] text-white p-5 my-0 w-full">
  <div className="max-w-3xl mx-auto flex items-start gap-3">
    <ShieldAlert className="w-6 h-6 mt-0.5 shrink-0" />
    <div>
      <h4 className="font-bold text-lg">Critical Safety Alert</h4>
      <p className="text-sm mt-1 text-red-100">{warning.body}</p>
      <p className="text-sm mt-2 font-bold">Emergency: 112</p>
    </div>
  </div>
</div>
```

---

### 8.7 Expert Card (`components/ExpertCard.tsx`)

```typescript
<div className="bg-white border border-slate-200 rounded-lg p-6 flex gap-5 hover:shadow-md transition-shadow">
  {/* Avatar */}
  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-slate-200">
    <Image
      src={expert.avatarUrl}
      alt={`${expert.name} — ${expert.titleEn}`}
      fill
      className="object-cover"
      sizes="64px"
    />
  </div>
  {/* Content */}
  <div className="min-w-0">
    <div className="flex items-center gap-2 flex-wrap mb-1">
      <h3 className="font-bold text-slate-800 text-base">{expert.name}</h3>
      <ZoneBadge zone={expert.zone} />
    </div>
    <p className="text-xs font-semibold text-[#1A365D] uppercase tracking-wide mb-2">
      {expert.titleEn}
    </p>
    <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">{expert.bioShort}</p>
    <p className="text-xs text-slate-400 italic mt-3">
      "{expert.signaturePhrases[0]}"
    </p>
  </div>
</div>
```

---

### 8.8 Ferry Data Table (`components/FerryTable.tsx`)

```typescript
<div className="my-8 overflow-x-auto rounded-lg border border-slate-200">
  <table className="w-full text-sm">
    <thead className="bg-[#1A365D] text-white">
      <tr>
        {['Route', 'Summer', 'Winter', 'AutoPASS', 'Pre-Book'].map(h => (
          <th key={h} className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide">
            {h}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-100">
      {routes.map((route, i) => (
        <tr key={route.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
          <td className="px-4 py-3 font-medium text-slate-800">
            <span className="flex items-center gap-2">
              <Ship className="w-4 h-4 text-slate-400 shrink-0" />
              {route.fromPort} → {route.toPort}
            </span>
          </td>
          <td className="px-4 py-3 text-slate-600">{route.summerFrequency}</td>
          <td className="px-4 py-3 text-slate-600">{route.winterFrequency}</td>
          <td className="px-4 py-3">
            {route.autoPASS
              ? <CheckCircle className="w-4 h-4 text-[#00D084]" />
              : <X className="w-4 h-4 text-slate-400" />
            }
          </td>
          <td className="px-4 py-3">
            {route.preBookRequired
              ? <span className="text-[#D32F2F] font-semibold text-xs">Required</span>
              : <span className="text-slate-400 text-xs">Optional</span>
            }
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

---

### 8.9 Skeleton / Loading States

```typescript
// Card skeleton
<div className="bg-white border border-slate-200 rounded-lg overflow-hidden animate-pulse">
  <div className="h-48 bg-slate-200" />
  <div className="p-6 space-y-3">
    <div className="h-4 bg-slate-200 rounded w-3/4" />
    <div className="h-3 bg-slate-200 rounded w-1/2" />
    <div className="h-3 bg-slate-200 rounded w-full" />
    <div className="h-3 bg-slate-200 rounded w-5/6" />
  </div>
</div>

// Text line skeleton
<div className="h-4 bg-slate-200 rounded animate-pulse w-full" />
```

---

### 8.10 Error State

```typescript
<div className="flex flex-col items-center justify-center py-16 px-4 text-center">
  <AlertTriangle className="w-10 h-10 text-slate-400 mb-4" />
  <h3 className="text-lg font-bold text-slate-800 mb-2">Content unavailable</h3>
  <p className="text-slate-500 text-sm max-w-sm">
    We couldn't load this content. Check your connection and try again.
  </p>
  <button className="mt-6 px-5 py-2.5 bg-[#1A365D] text-white text-sm font-semibold rounded-md hover:bg-[#152d52] transition-colors">
    Try Again
  </button>
</div>
```

---

### 8.11 Form Inputs (Pragmatic & Accessible)

```typescript
<div className="space-y-1.5">
  <label
    htmlFor={id}
    className="block text-sm font-medium text-slate-700 uppercase tracking-wide"
  >
    {label}
    {required && <span className="text-[#D32F2F] ml-1">*</span>}
  </label>
  <input
    id={id}
    type={type}
    required={required}
    aria-describedby={error ? `${id}-error` : undefined}
    className={cn(
      "w-full px-4 py-3 rounded-sm border bg-white text-slate-900 placeholder:text-slate-400",
      "focus:outline-none focus:ring-1 transition-colors",
      "min-h-[44px]", // Touch target
      error
        ? "border-[#D32F2F] focus:border-[#D32F2F] focus:ring-[#D32F2F]"
        : "border-slate-300 focus:border-[#1A365D] focus:ring-[#1A365D]"
    )}
  />
  {error && (
    <p id={`${id}-error`} className="text-xs text-[#D32F2F] font-medium" role="alert">
      {error}
    </p>
  )}
</div>
```

---

## 9. BACKGROUND PATTERNS & DARK SECTIONS

### Dark Section System
The site alternates between light (slate-50) and dark (#1A365D) sections. Rules:

| Section Type | Background | Text | Border Accent |
|-------------|-----------|------|--------------|
| Standard | `bg-slate-50` | `text-slate-800` | `border-slate-200` |
| Highlight | `bg-white` | `text-slate-800` | — |
| Dark (Feature) | `bg-[#1A365D]` | `text-white` | `border-t-4 border-[#00D084]` |
| Dark (Hero) | `bg-[#1A365D]` + image overlay | `text-white` | — |
| Zone Accent | `bg-slate-900` | `text-white` | zone accent color |

**Rule:** Never place a dark section immediately after another dark section without a light section between them.

### Aurora Background (Decorative Only)

```typescript
export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none opacity-20" aria-hidden="true">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[400px] bg-[#00D084] rounded-full blur-[120px] mix-blend-screen" />
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[300px] bg-[#A5D8FF] rounded-full blur-[100px] mix-blend-screen" />
    </div>
  );
}
```

**Rules for AuroraBackground:**
- Only use on dark (`#1A365D`) hero sections
- Always `aria-hidden="true"` — decorative, not informational
- Never on light backgrounds — it will wash out content
- `opacity-20` is the maximum — do not increase

### Topographic Line Pattern (CSS)

```css
/* Use as className on a positioned container */
.topo-pattern {
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 39px,
    rgba(255,255,255,0.04) 39px,
    rgba(255,255,255,0.04) 40px
  );
}
```

---

## 10. NEXT.JS IMAGE COMPONENT RULES

**Never** use a raw `<img>` tag. Always use `next/image`.

```typescript
// Hero image (full-bleed, above fold — use priority)
<Image
  src={article.heroImageUrl}
  alt={article.heroImageAlt}
  fill
  priority
  className="object-cover"
  sizes="100vw"
/>

// Card image (lazy-loaded, below fold)
<Image
  src={trail.heroImageUrl}
  alt={trail.heroImageAlt}
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Expert avatar
<Image
  src={expert.avatarUrl}
  alt={`${expert.name} — ${expert.titleEn}, Norgetravel`}
  fill
  className="object-cover"
  sizes="64px"
/>
```

### Alt Text Standards
Alt text is indexed, read by screen readers, and appears when images fail to load on poor connections.

| Image Type | Alt Text Pattern |
|-----------|-----------------|
| Hero (trail/article) | `"[Specific location/action] — [Zone], Norway"` |
| Expert avatar | `"[Name] — [Title], Norgetravel"` |
| Ferry / transport | `"[Ferry name/route] on [body of water]"` |
| Decorative | `alt=""` with `role="presentation"` |
| Safety-related | Describe the hazard, not the aesthetic |

**Never:** `alt="image"`, `alt="photo"`, `alt="Norway"` alone, or `alt={filename}`.

### Aspect Ratios by Use Case

| Use | Ratio | Implementation |
|-----|-------|---------------|
| Hero / banner | 16:9 | `relative h-[56.25vw] max-h-[600px]` |
| Card image | 3:2 | `relative h-48` (fixed, not ratio) |
| Expert avatar | 1:1 | `relative w-16 h-16 rounded-full` |
| Inline article image | 3:2 or 16:9 | `relative aspect-video` or `aspect-[3/2]` |

---

## 11. SEO & METADATA

### `generateMetadata` Pattern (App Router)

```typescript
// /app/trails/[slug]/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const trail = await getTrail(params.slug);
  return {
    title: `${trail.title} | Norgetravel`,
    description: trail.excerpt, // Max 160 chars
    openGraph: {
      title: trail.title,
      description: trail.excerpt,
      images: [{ url: trail.heroImageUrl, width: 1200, height: 630, alt: trail.heroImageAlt }],
      type: 'article',
      locale: 'en_NO',
      siteName: 'Norgetravel.com',
    },
    alternates: {
      canonical: `https://norgetravel.com/trails/${trail.slug}`,
    },
  };
}
```

### JSON-LD Structured Data

Inject on every article and trail page via a `<JsonLd>` component:

```typescript
// components/JsonLd.tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Trail page usage:
<JsonLd data={{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": trail.title,
  "author": {
    "@type": "Person",
    "name": expert.name,
    "jobTitle": expert.titleEn,
  },
  "publisher": {
    "@type": "Organization",
    "name": "Norgetravel.com",
    "url": "https://norgetravel.com",
  },
  "datePublished": article.publishedAt,
  "dateModified": article.updatedAt,
  "image": trail.heroImageUrl,
}} />
```

---

## 12. ICON MAP (Lucide React)

Full approved icon set organized by context. No generic icons. No emoji substitutes.

```typescript
import {
  // Navigation & Maps
  Map, Compass, Navigation, Route, MapPin, Flag,

  // Terrain & Outdoors
  Mountain, TreePine, Wind, Snowflake, Sun, Cloud, CloudRain, Waves,

  // Trail Metrics
  TrendingUp, Ruler, Clock, Timer, Footprints, ArrowUpDown,

  // Transport & Logistics
  Ship, Car, Train, Bus, Plane, Anchor, ParkingCircle, Fuel,

  // Safety & Alerts
  AlertTriangle, ShieldAlert, ShieldCheck, Info, Thermometer, ThermometerSnowflake,

  // Culture & Food
  UtensilsCrossed, Coffee, Fish, Wine, Store, Building,

  // Expert / People
  User, Users, Star, Award, BookOpen, MessageSquare,

  // UI Utility
  ChevronRight, ChevronDown, ArrowRight, ExternalLink,
  CheckCircle, X, Search, Filter, Menu, Close,
} from 'lucide-react';
```

### Icon-to-Zone Mapping

| Zone | Primary Icons |
|------|--------------|
| Fjord Norway | `Ship`, `Route`, `Car`, `ParkingCircle`, `Waves` |
| The Arctic | `ThermometerSnowflake`, `Snowflake`, `Wind`, `Star` (aurora), `CloudRain` |
| The High Peaks | `Mountain`, `TrendingUp`, `AlertTriangle`, `Flag`, `Ruler` |
| Urban Hubs | `Building`, `Coffee`, `UtensilsCrossed`, `Train`, `MapPin` |
| Working Coast | `Fish`, `Anchor`, `Ship`, `Waves`, `Store` |

### Icon Usage Rules
- Icon size in body: `w-4 h-4` — never larger in inline content
- Icon size in callouts / CTAs: `w-5 h-5`
- Icon size in hero / feature: `w-6 h-6` maximum
- Always pair icons with visible text unless inside a clearly labeled icon-button with `aria-label`
- `aria-hidden="true"` on all decorative icons

---

## 13. ANIMATION (FRAMER MOTION — CONSTRAINED)

### Approved Animation Patterns

```typescript
// Fade in on scroll — the standard pattern
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: 'easeOut' },
};

// Staggered children — for card grids
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

// Hover lift — for interactive cards
const cardHover = {
  whileHover: { y: -2, transition: { duration: 0.2 } },
};

// Page transition — subtle, not theatrical
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};
```

### Animation Constraints (Hard Rules)

| Rule | Constraint |
|------|-----------|
| Max duration | `0.5s` — nothing slower |
| Easing | `easeOut` or `easeInOut` — never `bounce` or `spring` with high stiffness |
| Translate Y | Max `20px` — no dramatic vertical sweeps |
| Scale | Max `1.05` — no zoom effects |
| Opacity | Always from `0` to `1` — never partial opacity on static elements |
| Color animation | Not permitted — no animated color transitions |
| `layout` prop | Permitted for reflow animations only |
| Scroll-triggered | Use `whileInView` with `once: true` — do not re-animate on scroll back |

```typescript
// Correct scroll-triggered animation:
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
```

### What Is Forbidden
- Parallax effects (performance cost, motion sickness risk)
- Looping decorative animations
- Text character-by-character animations
- Full-page animated transitions / page-flip effects
- `AnimatePresence` for anything except modals and toast notifications

### Reduced Motion Support (mandatory)

```typescript
// Always respect prefers-reduced-motion
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

const variants = shouldReduceMotion
  ? { initial: {}, animate: {} }  // No animation
  : fadeInUp;
```

---

## 14. ACCESSIBILITY (A11Y)

Non-negotiable. Travelers with disabilities also visit Norway.

### Skip Navigation

```typescript
// First element inside <body> — always
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#00D084] focus:text-[#1A365D] focus:font-bold focus:rounded-md"
>
  Skip to main content
</a>
```

### ARIA Rules

```typescript
// Landmark regions
<nav aria-label="Main navigation">
<main id="main-content">
<footer aria-label="Site footer">

// Dynamic content
<div aria-live="polite" aria-atomic="true">  {/* For filter updates, search results */}

// Icon buttons
<button aria-label="Open navigation menu">
  <Menu className="w-5 h-5" aria-hidden="true" />
</button>

// Image carousels / galleries
<div role="region" aria-label="Trail photos" aria-roledescription="carousel">
```

### Focus Management
- Focus ring must always be visible — never `outline-none` without a custom `ring` replacement
- Standard focus style: `focus:outline-none focus:ring-2 focus:ring-[#1A365D] focus:ring-offset-2`
- On dark backgrounds: `focus:ring-[#00D084]`
- Modal open: move focus to modal container. Modal close: return focus to trigger element.

### Semantic HTML Rules
- Use `<article>` for trail guides and blog posts
- Use `<section>` with `aria-labelledby` for page sections
- Use `<aside>` for expert attribution sidebars
- Use `<time datetime="ISO-8601">` for all dates
- Use `<table>` for ferry schedules — not divs styled as tables

---

## 15. FILE & FOLDER STRUCTURE

```
/app
  /layout.tsx              — Root layout (Roboto, Navbar, Footer)
  /page.tsx                — Homepage
  /trails
    /page.tsx              — Trail listing
    /[slug]/page.tsx       — Individual trail guide
  /itineraries
    /page.tsx
    /[slug]/page.tsx
  /zones
    /[zone]/page.tsx       — Zone landing pages
  /experts
    /[id]/page.tsx         — Expert profile pages
  /articles
    /[slug]/page.tsx

/components
  /ui                      — Primitive components (Button, Badge, Input)
    Button.tsx
    Badge.tsx
    Input.tsx
  /layout                  — Structural components
    Navbar.tsx
    Footer.tsx
    JsonLd.tsx
  /content                 — Content-specific components
    TrailCard.tsx
    ExpertCard.tsx
    FerryTable.tsx
    SafetyCallout.tsx
    DNTGradeBadge.tsx
    ZoneBadge.tsx
    AuroraBackground.tsx
  /article                 — Article rendering components
    ArticleHero.tsx
    ArticleBody.tsx
    ExpertByline.tsx

/types
  content.ts               — All TypeScript interfaces (Section 4)

/lib
  utils.ts                 — cn() and other utilities
  zones.ts                 — ZONE_ACCENTS constant and helpers
  dnt.ts                   — DNT grade config

/public
  /images                  — Static images only
  logo_norgetravel.avif    — Master logo file
```

---

## 16. PERFORMANCE RULES

| Rule | Implementation |
|------|---------------|
| Images | `next/image` always. `priority` only for above-fold. `loading="lazy"` is the default. |
| Fonts | `display: 'swap'` on all Google Fonts to prevent FOIT |
| Server components | Default for all data-fetching components — no `'use client'` unless interactivity required |
| Bundle | Never import entire libraries — use named imports only: `import { motion } from 'framer-motion'` |
| Third-party scripts | Load with `next/script` strategy `"lazyOnload"` unless critical |
| Suspense | Wrap all async server components with `<Suspense fallback={<Skeleton />}>` |
| Static generation | Use `generateStaticParams` for all trail and article slugs |

---

## 17. QUICK REFERENCE

```
COLORS:
├── Fjord Blue:      #1A365D  — Base, text, footer, primary buttons
├── Aurora Green:    #00D084  — CTAs, success, active states
├── Aurora Hover:    #00B875  — Green hover state only
├── Glacier Blue:    #A5D8FF  — Footer headings, accents (never body text)
├── Signal Red:      #D32F2F  — Safety warnings, alerts, errors
└── Background:      bg-slate-50  (never pure #FFFFFF)

ZONE ACCENTS:
├── Fjord Norway:    #0E7490 (Fjord Teal)
├── The Arctic:      #6D28D9 (Aurora Violet)
├── High Peaks:      #78716C (Summit Stone)
├── Urban Hubs:      #334155 (Urban Slate)
└── Working Coast:   #B45309 (Salt Rust)

RADIUS (Sharp — rugged pragmatic):
├── Buttons:         rounded-md
├── Cards:           rounded-lg
├── Inputs/Badges:   rounded-sm
└── FORBIDDEN:       rounded-full (functional elements)

TYPOGRAPHY:
├── Font:            Roboto
├── H1 (Hero):       uppercase, tracking-tight, font-black
├── Labels:          uppercase, tracking-wide, text-sm
└── Body:            leading-relaxed always

TOUCH TARGETS:
└── All interactive: min-h-[44px] min-w-[44px]

ANIMATION:
├── Max duration:    0.5s
├── Max translate Y: 20px
├── Easing:          easeOut / easeInOut
├── Scroll trigger:  whileInView once:true
└── FORBIDDEN:       parallax, loops, bounce, color animation
```

---

## 18. FORBIDDEN — DO NOT DO

### Visual / Design
- ❌ `rounded-full` on buttons, cards, or any functional element
- ❌ Colored shadows (`shadow-[#00D084]/50` etc.)
- ❌ Pure white `#FFFFFF` as page background — use `bg-slate-50`
- ❌ Glacier Blue (`#A5D8FF`) as body text — contrast fails
- ❌ Soft, warm, or pastel colors — not in this palette
- ❌ "Cute" micro-interactions — animations are purposeful, not decorative
- ❌ Two consecutive dark sections without a light section between

### Code
- ❌ Raw `<img>` tags — always `next/image`
- ❌ `any` TypeScript type
- ❌ `outline-none` without a focus ring replacement
- ❌ Inline styles — use Tailwind or documented CSS variables
- ❌ `'use client'` on data-fetching components
- ❌ Generic icon when a zone-specific one exists

### Content / UX
- ❌ Alt text that is generic, empty, or a filename
- ❌ Safety warnings buried below the fold or below other content
- ❌ Touch targets below 44px
- ❌ Animation without `useReducedMotion` check
- ❌ Tables built with `div` elements

---

## 19. OUTBOUND URL VERIFICATION (MANDATORY)

Every outbound URL — affiliate, operator, ticket, schedule, museum, official body — must be verified against the live source before it lands in code. This rule exists because fabricated URL components that look plausible (location codes, category slugs, tour IDs) will 404 in production while passing every lint and typecheck locally.

### The root-cause pattern (do not repeat)

Broken URLs are produced by **pattern-matching across destinations** rather than verifying against the live source. Examples of what caused production 404s:

- Invented a GetYourGuide location code by altering the digits from a different destination (used `lofoten-islands-l132885` when the real code is `l95198`)
- Copied a category code from one destination to another without checking it applied (used Tromsø's whale-watching `tc225` for Lofoten fishing, kayaking, and "trollfjord" — none of which are real GYG categories under that code)
- Guessed a museum slug from the English name (`/our-museums/norwegian-fishing-village-museum/` instead of the real `/our-venues/norsk-fiskevaersmuseum/`)

These failed because **the URL structure on a third-party site is opaque data, not a pattern**. Affiliate site slugs, location codes, and category codes are assigned by the partner and cannot be derived from keywords.

### The verification protocol

For every new outbound URL, one of the following must be true:

1. **Retrieved from the live source** — fetched via the destination's own search or sitemap, then HEAD-checked (`curl -sI -o /dev/null -w "%{http_code}" -L -A "<real UA>" "$URL"`) and confirmed 200.
2. **Falls back to a verified base URL** — if a specific tour/category page cannot be verified, link to the location landing page or search endpoint that has been verified, not to a constructed subpath.
3. **Copied verbatim from an existing verified file** — e.g. a tour URL already in `src/data/fjord-tours.ts` that has been known-good in production.

Never invent, alter, or interpolate URL components. If you cannot verify a URL, you do not publish it.

### GetYourGuide specifics (the most common offender)

- Location code format: `/LOCATION-SLUG-l#####/` — digits are opaque, never pattern-match from another destination
- Category code format: `/LOCATION-SLUG-l#####/CATEGORY-SLUG-tc####/` — both the category slug AND the `tc####` are specific to that location; **a tc-code valid for Tromsø is not valid for Lofoten**
- Tour code format: `/LOCATION-SLUG-l#####/TOUR-SLUG-t######/` — `t######` IDs are per-tour, never reusable
- Safe fallback when an activity category is not verified: the base location URL `/LOCATION-SLUG-l#####/` with affiliate params — let GYG's on-site filters handle the narrowing
- Bot-blocked responses are real: GYG returns 403/404 to curl without browser headers. Use `-A "Mozilla/5.0 ... Chrome/..." ` and accept that a 200 with a real `<title>` is the only reliable signal

### Affiliate URL parameter hygiene

- Every affiliate URL carries the full tracking tail: `partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle` (or `content-end` for bottom-of-page CTAs)
- Every outbound affiliate link renders with `rel="noopener noreferrer sponsored"` and `target="_blank"` — no exceptions

### Pre-publication HEAD-check (run this on every PR that adds URLs)

```bash
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
for url in $(grep -rhoE 'https?://[^"'\'' )]+' src/components/modules/destinations/ src/app/destinations/ src/data/ | sort -u); do
  code=$(curl -s -L --max-time 12 -A "$UA" -o /dev/null -w "%{http_code}" "$url")
  [ "$code" != "200" ] && echo "$code  $url"
done
```

Treat any non-200 as broken until proven otherwise (HEAD-check with a second, browser-like UA to rule out bot-blocking). 3xx that resolves to 200 is acceptable. 4xx is never acceptable.

### The 200-with-wrong-content trap (GYG masquerade)

A GetYourGuide URL can return HTTP 200 and still be wrong. When the location slug does not match its `l#####` code, GYG silently renders the page for whichever city owns that code — the traveller clicks "Tromsø tours" and lands on Manila. HEAD status alone will not catch this.

**Mandatory second check:** after the HEAD-check, fetch the page body and confirm the `<title>` contains the expected city name. Any mismatch is a broken link, same severity as a 404.

Known examples discovered in production (all returned 200 with foreign content):

| ❌ Fabricated code | Actually rendered | ✅ Real code |
|---|---|---|
| `bergen-l173` | Dubai | `bergen-l1132` |
| `flam-l2424` | Hoa Binh | `flam-l108502` |
| `odda-l2558` | Győr | `odda-l97971` |
| `tromso-l235` | Manila | `tromso-l32375` |
| `longyearbyen-l93817` | 404 | `longyearbyen-l97776` |
| `lofoten-islands-l132885` | 404 | `lofoten-islands-l95198` |
| `sogndal-l3113` | wrong city | `sogndalsfjora-l220787` |
| `hardangerfjord-l97248` | 404 | fallback to `vestland-county-l1985` |

Never copy an `l#####` code from memory or from another file without re-verifying it against a live search on getyourguide.com. If the destination does not have its own GYG landing page, fall back to the county or region URL that has been verified — never invent one.

### What is forbidden

- ❌ Constructing a third-party URL by altering digits, swapping slugs, or combining tokens from another destination's URL
- ❌ Publishing an outbound URL without a successful HEAD-check from a browser-like UA
- ❌ Guessing a museum, operator, or official body URL from the English name or brand — always find it via the official homepage's internal links
- ❌ Using one destination's category/tour code (`tc####`, `t######`, `l#####`) on another destination's page

---

*Document version: 2.0 | Updated: March 2026 | Next review: June 2026*
*Cross-reference: NorgeTravel_company_profile_v2.md | NorgeTravel_voice_rules_v2.md | NorgeTravel_expert_personas_v2.md | Norgetravel_banned_words.md*