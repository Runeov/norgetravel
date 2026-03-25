# WCAG Fix Instructions for localhost:3001 (Averdi)

> **Generated from WCAG scan:** 2026-02-24  
> **Target:** http://localhost:3001 (Next.js / React site)  
> **Issues to fix:** 8 Critical + 348 Serious = **356 issues**

---

## OVERVIEW OF ISSUE CATEGORIES

| Priority | WCAG Rule | Issue Type | Count | Affected Pages |
|----------|-----------|------------|-------|----------------|
| 🔴 CRITICAL | 3.3.2 | Form inputs with no label | 8 | `/kunnskapsbank/bedrifter/rekruttering` |
| 🟠 SERIOUS | 1.1.1a | SVG icons missing accessible name | ~340 | All pages |
| 🟠 SERIOUS | 2.4.4 | Empty link (no accessible name) | 1 | `/kunnskapsbank/artikler` |

---

## FIX 1 — CRITICAL: Unlabelled Form Inputs (WCAG 3.3.2, Level A)

**Page:** `/kunnskapsbank/bedrifter/rekruttering`  
**Component:** "InnsatssoneKalkulator (Næring)" calculator widget  
**Impact:** Screen reader users cannot understand what each input field is for.

### What to fix

There are 7 form inputs (`<select>` and `<input type="number">`) with no associated `<label>`.

### How to fix

For every `<select>` and `<input>` in the calculator, add a visible or visually-hidden `<label>` linked via `htmlFor` / `for`.

**Pattern — React/JSX:**
```jsx
// BEFORE (broken):
<select className="w-full mt-1 p-3 ...">
  <option value="Oslo (Sentrum)">Oslo (Sentrum)</option>
  ...
</select>

// AFTER (fixed):
<label htmlFor="location-select" className="sr-only">Velg lokasjon</label>
<select id="location-select" className="w-full mt-1 p-3 ...">
  <option value="Oslo (Sentrum)">Oslo (Sentrum)</option>
  ...
</select>
```

**All 7 inputs to label:**

| Input element | Suggested label text | `id` to assign |
|---------------|---------------------|----------------|
| `<select>` — city/location dropdown | `Velg lokasjon` | `calc-location` |
| `<select>` — municipality/zone dropdown (Alta, Sone…) | `Velg kommune` | `calc-municipality` |
| `<input type="number" step="1000000" value="10000000">` | `Årsomsetning (kr)` | `calc-revenue` |
| `<input type="number" value="10">` | `Antall ansatte` | `calc-employees` |
| `<input type="number" value="650000">` | `Gjennomsnittlig årslønn (kr)` | `calc-salary` |
| `<input type="number" value="1">` | `Antall nyansettelser` | `calc-new-hires` |
| `<input type="number" value="1200000">` | `Investeringsbeløp (kr)` | `calc-investment` |

**Visually-hidden helper class (Tailwind):**
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```
Tailwind already includes `sr-only` — use it directly.

---

## FIX 2 — CRITICAL: Empty Link (WCAG 2.4.4, Level A)

**Page:** `/kunnskapsbank/artikler`  
**Element:**
```html
<a class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 ..."
   href="/kunnskapsbank/artikler/sosiookonomiske-forskjeller">
  <!-- contains only an SVG with no title/aria-label -->
</a>
```
**Impact:** Screen reader announces "link" with no destination description — completely unusable.

### How to fix

Add `aria-label` to the `<a>` element describing the destination:

```jsx
// BEFORE:
<a className="inline-flex items-center justify-center w-10 h-10 rounded-full ..."
   href="/kunnskapsbank/artikler/sosiookonomiske-forskjeller">
  <svg ...>...</svg>
</a>

// AFTER:
<a className="inline-flex items-center justify-center w-10 h-10 rounded-full ..."
   href="/kunnskapsbank/artikler/sosiookonomiske-forskjeller"
   aria-label="Les artikkel: Den usynlige skatten i Nord">
  <svg aria-hidden="true" ...>...</svg>
</a>
```

---

## FIX 3 — SERIOUS: All SVG Icons Missing Accessible Name (WCAG 1.1.1a, Level A)

**Affected pages:** ALL pages (every page has this issue)  
**Impact:** Screen readers announce raw SVG markup or skip icons entirely, causing confusion.

This is the **root cause of ~340 serious issues** and should be fixed globally at the component level.

### Strategy

The site uses **Lucide React** icons throughout. The fix depends on whether each icon is:
- **Decorative** (purely visual, meaning conveyed by surrounding text) → hide from AT
- **Meaningful** (conveys information not present in surrounding text) → add accessible name

### Rule of thumb

> If you removed the icon and the user would still understand the content from the text alone → it is **decorative**.  
> If the icon is the only way to understand the content → it is **meaningful**.

---

### Fix 3a — Decorative Icons (most common case)

Add `aria-hidden="true"` to hide from screen readers. This applies to the vast majority of Lucide icons on this site (arrow-right in buttons, circle-check in lists, etc.).

**Pattern:**
```jsx
// BEFORE:
<ArrowRight className="ml-2 h-4 w-4" />

// AFTER:
<ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
```

**Global fix — create a wrapper component:**
```tsx
// components/Icon.tsx
import { LucideProps } from 'lucide-react';
import { forwardRef } from 'react';

interface IconProps extends LucideProps {
  label?: string; // if provided, icon is meaningful
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ label, ...props }, ref) => {
    if (label) {
      return <svg ref={ref} role="img" aria-label={label} {...props} />;
    }
    return <svg ref={ref} aria-hidden="true" focusable="false" {...props} />;
  }
);
```

Or more simply, add `aria-hidden="true"` directly to every Lucide icon that is decorative.

---

### Fix 3b — Meaningful Icons (standalone icon buttons/links)

When an icon is the **only content** of a button or link, add `aria-label` to the **parent element** and `aria-hidden="true"` to the SVG:

```jsx
// Icon-only button:
// BEFORE:
<button onClick={copyToClipboard}>
  <Copy className="h-3 w-3" />
</button>

// AFTER:
<button onClick={copyToClipboard} aria-label="Kopier til utklippstavle">
  <Copy className="h-3 w-3" aria-hidden="true" />
</button>
```

```jsx
// Icon-only link:
// BEFORE:
<a href="/om-oss">
  <ExternalLink className="w-3.5 h-3.5" />
</a>

// AFTER:
<a href="/om-oss" aria-label="Se profil (åpnes i ny fane)">
  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
</a>
```

---

### Fix 3c — Specific Icon Instances by Page

#### All pages — Navigation / Header
```jsx
// Logo link (already has aria-label but it's redundant — keep it, just fix SVG):
<a aria-label="Gå til forsiden" href="/">
  <img alt="Averdi Logo" ... />
  {/* No SVG here, this is fine */}
</a>
```

#### All pages — "Back to top" button
```jsx
// BEFORE:
<button>
  <ArrowUp className="h-5 w-5" />
</button>

// AFTER:
<button aria-label="Gå til toppen av siden">
  <ArrowUp className="h-5 w-5" aria-hidden="true" />
</button>
```

#### Homepage (`/`) — Contact section
```jsx
// Phone icon:
<Phone className="h-6 w-6 text-blue-600" aria-hidden="true" />

// Mail icon:
<Mail className="h-6 w-6 text-blue-600" aria-hidden="true" />

// Map pin icon:
<MapPin className="h-6 w-6 text-blue-600" aria-hidden="true" />

// Copy buttons (standalone):
<button aria-label="Kopier telefonnummer">
  <Copy className="h-3 w-3" aria-hidden="true" />
</button>
```

#### `/om-oss` — Team member cards
```jsx
// External link icons in team cards:
<a href="..." target="_blank" aria-label="Se LinkedIn-profil (åpnes i ny fane)">
  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
</a>

// Wave SVG (decorative background):
<svg className="w-full h-full" viewBox="0 0 1440 320" aria-hidden="true">
  ...
</svg>

// Star rating SVGs (meaningful — convey rating):
<svg className="w-4 h-4" fill="#F6B93B" viewBox="0 0 24 24" aria-hidden="true">
  {/* Part of a group — add aria-label to the container instead */}
</svg>
// Container fix:
<div aria-label="Vurdering: 5 av 5 stjerner" role="img">
  {[1,2,3,4,5].map(i => <StarSvg key={i} aria-hidden="true" />)}
</div>
```

#### `/om-oss/[person]` — Individual profile pages
```jsx
// Back arrow:
<ArrowLeft className="w-4 h-4" aria-hidden="true" />

// Users icon (decorative in context):
<Users className="w-4 h-4" aria-hidden="true" />

// Specialization section heading icon:
<MapPin className="w-3.5 h-3.5" aria-hidden="true" />

// Chevron-down (dropdown indicator):
<ChevronDown className="w-3 h-3" aria-hidden="true" />

// Document icons in CTA buttons:
<button aria-label="Last ned CV">
  <svg className="w-5 h-5 ..." aria-hidden="true">...</svg>
</button>
```

#### `/kunnskapsbank` — Knowledge bank index
```jsx
// Category icons (landmark, building2, users — decorative in context):
<Landmark className="w-7 h-7" aria-hidden="true" />
<Building2 className="w-7 h-7" aria-hidden="true" />
<Users className="w-7 h-7" aria-hidden="true" />

// Arrow-right in category links (decorative):
<ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />

// FAQ chevron-right (indicates expandable):
<ChevronRight className="w-5 h-5 ..." aria-hidden="true" />
// Note: The parent button/accordion trigger should have aria-expanded

// Circle-help icons (decorative in FAQ context):
<CircleHelp className="w-5 h-5" aria-hidden="true" />
```

#### `/kunnskapsbank/sametinget` — Sametinget page
```jsx
// Back arrow:
<ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />

// Large file-text icon (decorative hero):
<FileText className="w-32 h-32 text-white" aria-hidden="true" />

// Warning/alert icons (meaningful — convey status):
<TriangleAlert className="w-5 h-5 text-yellow-500" aria-hidden="true" />
// Add context to parent: <div role="note" aria-label="Advarsel: ...">

// All other icons in this page are decorative — add aria-hidden="true"
```

#### `/kunnskapsbank/artikler` — Articles listing
```jsx
// Clock icons (reading time — meaningful):
<Clock className="w-3 h-3 mr-1" aria-hidden="true" />
// Fix: wrap in <span>: <span><Clock aria-hidden="true" /> 5 min</span>

// Zap icon (featured badge):
<Zap className="w-4 h-4 text-[#E86C1F]" aria-hidden="true" />
```

#### `/kunnskapsbank/artikler/sosiookonomiske-forskjeller` — Article page
```jsx
// Social share icons (meaningful — standalone buttons):
<button aria-label="Del på Instagram">
  <Instagram className="w-4 h-4" aria-hidden="true" />
</button>
<button aria-label="Lik denne artikkelen">
  <Heart className="w-4 h-4" aria-hidden="true" />
</button>
<button aria-label="Kommenter">
  <MessageSquare className="w-4 h-4" aria-hidden="true" />
</button>
<button aria-label="Del artikkel">
  <Share2 className="w-4 h-4" aria-hidden="true" />
</button>
<button aria-label="Tommel opp">
  <ThumbsUp className="w-4 h-4" aria-hidden="true" />
</button>

// Chart icon (meaningful — indicates data visualization):
<ChartColumn className="w-5 h-5 text-slate-700" aria-hidden="true" />
// Add aria-label to the chart container instead
```

#### `/kunnskapsbank/bedrifter/transport` — Transport page
```jsx
// All icons are decorative in context — add aria-hidden="true" to all
// External link icons in source links:
<ExternalLink className="w-4 h-4" aria-hidden="true" />
// Parent link already has text, so this is fine
```

---

## FIX 4 — SERIOUS: Links Opening in New Tab Without Warning (WCAG 2.4.4, Level A)

**Affected pages:** `/om-oss`, `/tilgjengelighet`, `/kunnskapsbank/sametinget`, `/kunnskapsbank/bedrifter`, `/kunnskapsbank/bedrifter/transport`, `/kunnskapsbank/bedrifter/rekruttering`

**Impact:** Screen reader users are not warned that a link will open a new tab, which can be disorienting.

### How to fix

**Option A — Visually hidden text (recommended):**
```jsx
// BEFORE:
<a href="https://sametinget.no/..." rel="noopener noreferrer" target="_blank">
  Sametingets næringsordninger
  <ExternalLink className="w-3 h-3" aria-hidden="true" />
</a>

// AFTER:
<a href="https://sametinget.no/..." rel="noopener noreferrer" target="_blank">
  Sametingets næringsordninger
  <span className="sr-only"> (åpnes i ny fane)</span>
  <ExternalLink className="w-3 h-3" aria-hidden="true" />
</a>
```

**Option B — aria-label (when link text is short):**
```jsx
<a href="https://www.diskrimineringsnemnda.no"
   rel="noopener noreferrer"
   target="_blank"
   aria-label="Diskrimineringsnemnda (åpnes i ny fane)">
  Diskrimineringsnemnda
</a>
```

**Create a reusable component:**
```tsx
// components/ExternalLink.tsx
interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <span className="sr-only"> (åpnes i ny fane)</span>
    </a>
  );
}
```

**Pages and links to fix:**

| Page | Link text | Fix |
|------|-----------|-----|
| `/om-oss` | 6× employee LinkedIn/external links | Add `(åpnes i ny fane)` sr-only text |
| `/tilgjengelighet` | Diskrimineringsnemnda | Add `(åpnes i ny fane)` sr-only text |
| `/kunnskapsbank/sametinget` | sametinget.no, regjeringen.no | Add `(åpnes i ny fane)` sr-only text |
| `/kunnskapsbank/bedrifter` | skatteetaten.no, regjeringen.no | Add `(åpnes i ny fane)` sr-only text |
| `/kunnskapsbank/bedrifter/transport` | 3× skatteetaten.no links | Add `(åpnes i ny fane)` sr-only text |
| `/kunnskapsbank/bedrifter/rekruttering` | lanekassen.no, skatteetaten.no | Add `(åpnes i ny fane)` sr-only text |

---

## IMPLEMENTATION CHECKLIST

```
[ ] FIX 1: Add labels to all 7 calculator inputs on /kunnskapsbank/bedrifter/rekruttering
[ ] FIX 2: Add aria-label to empty link on /kunnskapsbank/artikler
[ ] FIX 3a: Add aria-hidden="true" to all decorative Lucide icons site-wide
[ ] FIX 3b: Add aria-label to parent elements of icon-only buttons/links
[ ] FIX 3c: Fix star rating containers with role="img" and aria-label
[ ] FIX 3c: Fix social share buttons with aria-label
[ ] FIX 3c: Fix "back to top" button with aria-label
[ ] FIX 3c: Fix copy-to-clipboard buttons with aria-label
[ ] FIX 3c: Fix decorative wave SVG with aria-hidden="true"
[ ] FIX 4: Add sr-only "(åpnes i ny fane)" text to all target="_blank" links
```

---

## QUICK GLOBAL SEARCH PATTERNS

Use these regex patterns to find all instances needing fixes:

```bash
# Find all Lucide SVGs without aria-hidden or aria-label
grep -r "lucide lucide-" --include="*.tsx" --include="*.jsx" -l

# Find all target="_blank" links without sr-only text
grep -rn 'target="_blank"' --include="*.tsx" --include="*.jsx"

# Find all <select> and <input> without associated labels
grep -rn '<select\|<input' --include="*.tsx" --include="*.jsx" | grep -v 'aria-label\|aria-labelledby\|id='
```

---

## EXPECTED RESULT AFTER FIXES

| Metric | Before | After |
|--------|--------|-------|
| Critical issues | 8 | 0 |
| Serious issues | 348 | ~0 |
| Total issues | 443 | ~49 (moderate/minor only) |
| WCAG Score | ~0/100 | ~90+/100 |

The remaining ~49 moderate issues (heading level skips, autocomplete attributes) can be addressed in a follow-up pass.
