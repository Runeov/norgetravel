# Current styles (Averdi Next.js)

This project is styled **primarily with Tailwind CSS utility classes**, with a small amount of global CSS variables.

## 1) Where styles live

1. Tailwind configuration: [`tailwind.config.js`](../tailwind.config.js:1)
2. Global CSS entry (Tailwind layers + root variables): [`src/index.css`](../src/index.css:1)
3. Global layout sets baseline body styling via Tailwind classes: [`src/app/layout.tsx`](../src/app/layout.tsx:1)
4. Component-level styling is mostly `className="..."` Tailwind utilities (e.g. [`src/components/layout/Navbar.tsx`](../src/components/layout/Navbar.tsx:1), [`src/components/modules/home/Hero.tsx`](../src/components/modules/home/Hero.tsx:1))

No CSS Modules (no `*.module.css`) were found.

---

## 2) Design tokens in use

### Brand colors

**Tailwind theme extension** defines these named colors:

- `averdi-orange`: `#E86C1F`
- `averdi-yellow`: `#F4B223`

Source: [`tailwind.config.js`](../tailwind.config.js:23)

**In practice**, many components currently use **hard-coded hex** instead of `text-averdi-orange` / `bg-averdi-orange`:

- `#E86C1F` (primary orange)
- `#F4B223` (secondary yellow)
- `#d65f18` / `#d65a10` (darker orange hover)

Examples:

- Navbar active/CTA gradients: [`src/components/layout/Navbar.tsx`](../src/components/layout/Navbar.tsx:43)
- Hero gradients & CTAs: [`src/components/modules/home/Hero.tsx`](../src/components/modules/home/Hero.tsx:29)
- Articles header gradient: [`src/app/kunnskapsbank/artikler/page.tsx`](../src/app/kunnskapsbank/artikler/page.tsx:35)

### Neutral palette

The dominant neutral palette is Tailwind’s **Slate**:

- Page background: `bg-slate-50` (common)
- Headings/body: `text-slate-900`, `text-slate-600`, `text-slate-500`, `text-slate-400`
- Borders: `border-slate-200`, `border-slate-100`

Examples:

- Global body baseline: [`src/app/layout.tsx`](../src/app/layout.tsx:24)
- Footer base: [`src/components/layout/Footer.tsx`](../src/components/layout/Footer.tsx:31)

### CSS variables (root)

Global CSS defines:

- `--background: #ffffff`
- `--foreground: #0f172a` (slate-900)

Source: [`src/index.css`](../src/index.css:5)

Tailwind is extended with:

- `colors.background: var(--background)`
- `colors.foreground: var(--foreground)`

Source: [`tailwind.config.js`](../tailwind.config.js:23)

Note: several UI primitives reference token-like classes such as `bg-primary`, `border-input`, `bg-input-background`, etc. (see [`src/components/ui/button.tsx`](../src/components/ui/button.tsx:7), [`src/components/ui/input.tsx`](../src/components/ui/input.tsx:5)). Those tokens are **not defined** in [`src/index.css`](../src/index.css:1) beyond background/foreground, so they likely depend on additional Tailwind/theme setup that is not currently present.

### Typography

- Primary font: **Inter** via `next/font/google`, wired into Tailwind `font-sans`.
  - Source: [`src/app/layout.tsx`](../src/app/layout.tsx:2) and [`tailwind.config.js`](../tailwind.config.js:32)
- Common heading styles:
  - `text-4xl md:text-6xl font-bold` / `font-extrabold`
  - `tracking-tight` on key hero headings

Examples:

- Homepage hero `h1`: [`src/components/modules/home/Hero.tsx`](../src/components/modules/home/Hero.tsx:38)
- Kunnskapsbank hero: [`src/app/kunnskapsbank/page.tsx`](../src/app/kunnskapsbank/page.tsx:59)

### Radius (rounded corners)

Rounded corners are a key part of the visual language:

- Buttons/CTAs: `rounded-full`
- Cards: `rounded-2xl`, `rounded-3xl`
- UI inputs: `rounded-md`

Examples:

- CTA buttons: [`src/components/layout/Navbar.tsx`](../src/components/layout/Navbar.tsx:99), [`src/components/modules/home/Hero.tsx`](../src/components/modules/home/Hero.tsx:46)
- Kunnskapsbank cards: [`src/app/kunnskapsbank/page.tsx`](../src/app/kunnskapsbank/page.tsx:71)

### Shadows & elevation

Elevation is handled with Tailwind shadows:

- `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`
- Brand-tinted shadows on hover (e.g. `hover:shadow-[#E86C1F]/30`)

Examples:

- Navbar scrolled state `shadow-sm`: [`src/components/layout/Navbar.tsx`](../src/components/layout/Navbar.tsx:50)
- Hero image `shadow-2xl`: [`src/components/modules/home/Hero.tsx`](../src/components/modules/home/Hero.tsx:81)

---

## 3) Layout conventions

### Global layout baseline

The root layout applies:

- `font-sans antialiased`
- `bg-slate-50 text-slate-900`
- `min-h-screen flex flex-col`

Source: [`src/app/layout.tsx`](../src/app/layout.tsx:24)

### Container widths

Common container patterns:

- `container mx-auto px-4 sm:px-6` (home sections)
- `max-w-screen-xl mx-auto px-4 sm:px-6` (navbar/footer)
- `container mx-auto px-4 py-12 max-w-6xl` (kunnskapsbank hubs)

Examples:

- Navbar container: [`src/components/layout/Navbar.tsx`](../src/components/layout/Navbar.tsx:58)
- Articles overview container: [`src/app/kunnskapsbank/artikler/page.tsx`](../src/app/kunnskapsbank/artikler/page.tsx:27)

### Section spacing

Common vertical spacing:

- `py-24` for major sections (Services / SalesPitch / FAQ)
- `py-16` for contact
- Hero uses responsive padding (`pt-8 pb-12 lg:pt-20 lg:pb-32`)

Examples:

- Services: [`src/components/modules/home/Services.tsx`](../src/components/modules/home/Services.tsx:47)
- Contact: [`src/components/modules/home/ContactPanel.tsx`](../src/components/modules/home/ContactPanel.tsx:33)

---

## 4) Component style snapshots

### Navbar

- Sticky top navigation with scroll-based background change:
  - Not scrolled: translucent white + blur
  - Scrolled: stronger white, border, subtle shadow
- Link pills: `px-4 py-2 rounded-full text-sm font-medium`.
- Primary CTA: orange→yellow gradient pill.

Source: [`src/components/layout/Navbar.tsx`](../src/components/layout/Navbar.tsx:50)

### Homepage Hero

- Light neutral background + decorative brand blobs (AverdiBackground)
- “Badge” pill in orange tint (`bg-[#E86C1F]/10` + `text-[#E86C1F]`)
- Primary CTA: gradient pill; Secondary CTA: soft glassy white with border
- Large, bold heading with gradient highlight

Source: [`src/components/modules/home/Hero.tsx`](../src/components/modules/home/Hero.tsx:21)

### Footer

- Light neutral background (`bg-slate-50`), top border, generous padding
- Headings: `font-bold text-slate-900`
- Links: slate by default, orange hover

Source: [`src/components/layout/Footer.tsx`](../src/components/layout/Footer.tsx:31)

### Kunnskapsbank pages

- Page shell: `bg-slate-50` + decorative Averdi background
- Card grids: `bg-white border border-slate-200 rounded-2xl/3xl shadow-sm`
- Theme variants:
  - Orange theme (Sametinget): `text-[#E86C1F]`, `bg-orange-50`
  - Blue theme (Bedrift): `text-blue-600`, `bg-blue-50`

Examples:

- Kunnskapsbank hub cards: [`src/app/kunnskapsbank/page.tsx`](../src/app/kunnskapsbank/page.tsx:68)
- Bedrift hub theme usage: [`src/app/kunnskapsbank/bedrifter/page.tsx`](../src/app/kunnskapsbank/bedrifter/page.tsx:27)
- Sametinget hub theme usage: [`src/app/kunnskapsbank/sametinget/page.tsx`](../src/app/kunnskapsbank/sametinget/page.tsx:55)

---

## 5) Motion & effects

- Framer Motion is used for reveal/transition animations (SalesPitch, FeatureTabs, FaqAccordion).
- Tailwind utility `animate-ping` is used for the hero “live” dot.

Examples:

- SalesPitch motion: [`src/components/modules/home/SalesPitch.tsx`](../src/components/modules/home/SalesPitch.tsx:22)
- FeatureTabs motion: [`src/components/ui/FeatureTabs.tsx`](../src/components/ui/FeatureTabs.tsx:95)
- FAQ accordion motion: [`src/components/ui/FaqAccordion.tsx`](../src/components/ui/FaqAccordion.tsx:87)

