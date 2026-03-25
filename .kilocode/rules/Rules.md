# Averdi Styling Rules for AI Coding Assistants
## Verified Against Actual Codebase - December 2025

---

# CRITICAL: READ BEFORE CODING

This document defines all styling rules for the Averdi Next.js project. These rules are verified against the actual codebase.

---

## 1. TECH STACK

```
Framework: Next.js (App Router)
Language: TypeScript
Styling: Tailwind CSS (utility classes only)
Icons: Lucide React
Animation: Framer Motion
Font: Inter (via next/font/google)
Utils: cn() from @/lib/utils for className merging
```

---

## 2. COLOR SYSTEM

### Brand Colors (EXACT values from codebase)

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| Primary Orange | `#E86C1F` | `text-[#E86C1F]` / `bg-[#E86C1F]` | CTAs, accents, active states |
| Secondary Yellow | `#F4B223` | `text-[#F4B223]` / `bg-[#F4B223]` | Gradients endpoint |
| Orange 10% opacity | `#E86C1F` | `bg-[#E86C1F]/10` | Active nav links, badges |
| Orange 30% opacity | `#E86C1F` | `shadow-[#E86C1F]/30` | CTA hover glow |

### Tailwind Theme Colors (from tailwind.config.js)
```js
colors: {
  background: "var(--background)",
  foreground: "var(--foreground)",
  'averdi-orange': '#E86C1F',
  'averdi-yellow': '#F4B223',
}
```

### CSS Variables (from index.css)
```css
:root {
  --background: #ffffff;
  --foreground: #0f172a; /* slate-900 */
}
```

### Neutral Palette (Tailwind Slate)

| Purpose | Class |
|---------|-------|
| Page background | `bg-slate-50` |
| Card background | `bg-white` |
| Primary text | `text-slate-900` |
| Secondary text | `text-slate-600` |
| Tertiary text | `text-slate-500` |
| Muted text | `text-slate-400` |
| Primary border | `border-slate-200` |
| Light border | `border-slate-100` |
| Subtle border | `border-slate-200/50` |

### Theme Variants

| Theme | Text | Background |
|-------|------|------------|
| Orange (Sametinget) | `text-[#E86C1F]` | `bg-orange-50` or `bg-[#E86C1F]/10` |
| Blue (Bedrift) | `text-blue-600` | `bg-blue-50` |

---

## 3. TYPOGRAPHY

### Font Setup (from layout.tsx)
```tsx
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// In body:
className={cn(inter.variable, "font-sans antialiased ...")}
```

### Tailwind Font Config
```js
fontFamily: {
  sans: ['var(--font-inter)', 'sans-serif'],
}
```

### Heading Sizes (from actual components)

| Element | Classes |
|---------|---------|
| Hero H1 | `text-4xl md:text-6xl font-bold tracking-tight` |
| Section H2 | `text-2xl md:text-3xl font-bold` |
| Card H3 | `text-lg font-bold` or `text-xl font-semibold` |
| Feature Title | `text-3xl font-bold text-slate-900` |
| Body Large | `text-lg text-slate-600 leading-relaxed` |
| Body | `text-base text-slate-600` |
| Small | `text-sm text-slate-500` |

### Text Gradient (for highlights)
```tsx
<span className="bg-gradient-to-r from-[#E86C1F] to-[#F4B223] bg-clip-text text-transparent">
  Highlighted text
</span>
```

---

## 4. BORDER RADIUS

| Component | Class | Notes |
|-----------|-------|-------|
| Buttons/CTAs | `rounded-full` | Always for pills |
| Cards | `rounded-2xl` | Standard cards |
| Feature tabs buttons | `rounded-xl` | Tab navigation |
| Mobile menu items | `rounded-xl` | Mobile nav links |
| Form inputs | `rounded-md` | Text inputs |
| Badges/Pills | `rounded-full` | Status indicators |
| Icon containers | `rounded-lg` or `rounded-full` | Depends on context |

---

## 5. SHADOWS

| Level | Class | Use Case |
|-------|-------|----------|
| Subtle | `shadow-sm` | Navbar scrolled, active tabs |
| Default | `shadow-md` | Hover states, CTA buttons |
| Elevated | `shadow-lg` | Button hover |
| High | `shadow-xl` | Mobile menu |
| Brand glow | `hover:shadow-[#E86C1F]/30` | CTA hover (combined with shadow-lg) |

---

## 6. LAYOUT RULES

### Root Layout (from layout.tsx)
```tsx
<html lang="nb" className="scroll-smooth">
  <body className={cn(inter.variable, "font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col")}>
    <Navbar />
    {children}
    <Footer />
  </body>
</html>
```

### Main Content Wrapper (from page.tsx)
```tsx
<main className="flex-1">
  {/* Page content */}
</main>
```

### Container Patterns (VERIFIED)

| Context | Classes |
|---------|---------|
| Navbar/Footer | `max-w-screen-xl mx-auto px-4 sm:px-6` |
| Content sections | `container mx-auto px-4 sm:px-6` |
| Narrow content | `max-w-3xl mx-auto` |

---

## 7. NAVBAR (from Navbar.tsx)

### Structure
```tsx
<nav className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
  scrolled
    ? 'bg-white/80 backdrop-blur-md border-slate-200/50 shadow-sm'
    : 'bg-white/60 backdrop-blur-sm border-transparent'
}`}>
  <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
    <div className="flex items-center justify-between h-20">
```

### Nav Link Function (EXACT)
```tsx
const navLinkClass = (isActive: boolean) =>
  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
    isActive
      ? 'text-[#E86C1F] bg-[#E86C1F]/10'
      : 'text-slate-600 hover:text-[#E86C1F] hover:bg-slate-50'
  }`;
```

### Primary CTA Button (EXACT)
```tsx
<button
  className="group relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-full hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5 focus:outline-none"
>
  Kontakt oss
  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
</button>
```

### Mobile Menu Button
```tsx
<button
  className="inline-flex items-center justify-center p-2 rounded-full text-slate-600 hover:text-[#E86C1F] hover:bg-[#E86C1F]/10 transition-colors"
>
  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
</button>
```

### Mobile Menu Panel
```tsx
<div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl animate-in slide-in-from-top-5 duration-200">
```

### Mobile Nav Link
```tsx
<Link 
  className={`block px-4 py-3 rounded-xl w-full text-left text-base font-medium ${
    pathname === '/' 
      ? 'text-[#E86C1F] bg-[#E86C1F]/10' 
      : 'text-slate-600 hover:bg-slate-50'
  }`}
>
```

### Mobile CTA
```tsx
<button className="w-full flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-xl shadow-md active:scale-95 transition-all">
```

---

## 8. FOOTER (from Footer.tsx)

### Structure
```tsx
<footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
  <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
```

### Section Headings
```tsx
<h4 className="font-bold text-slate-900 mb-6 text-lg">Heading</h4>
```

### Link with Indicator Dot
```tsx
<button className="hover:text-[#E86C1F] transition-colors flex items-center gap-2 group">
  <span className="w-1 h-1 rounded-full bg-[#E86C1F] opacity-0 group-hover:opacity-100 transition-opacity"></span>
  Link Text
</button>
```

### Phone Link
```tsx
<a href="tel:+4790767993" className="text-[#E86C1F] font-medium hover:text-[#E86C1F]/80 transition-colors inline-flex items-center gap-2">
  <span>📞</span> +47 907 67 993
</a>
```

### Divider
```tsx
<div className="h-px w-full bg-slate-200 mb-8"></div>
```

### Bottom Bar
```tsx
<div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
  <div className="text-sm text-slate-400 text-center md:text-left">
    <span>© 2025 Averdi AS. Alle rettigheter forbeholdt.</span>
  </div>
  <div className="flex items-center gap-8 text-sm font-medium text-slate-500">
    <Link className="hover:text-[#E86C1F] transition-colors">Personvern</Link>
  </div>
</div>
```

---

## 9. AVERDI BACKGROUND (from AverdiBackground.tsx)

```tsx
export function AverdiBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[500px] h-[500px] bg-[#E86C1F]/10 rounded-full blur-[100px] opacity-70"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-[#F4B223]/10 rounded-full blur-[100px] opacity-70"></div>
    </div>
  );
}
```

---

## 10. FEATURE TABS (from FeatureTabs.tsx)

### Tab Button (Active/Inactive)
```tsx
<button
  className={cn(
    "group relative flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 border-2 w-full",
    isActive 
      ? "bg-white shadow-sm z-10" 
      : "bg-white border-transparent hover:border-gray-200 hover:bg-gray-50"
  )}
  style={{
    borderColor: isActive ? themeColor : 'transparent',
    backgroundColor: isActive ? `${themeColor}0D` : undefined  // 0D = ~5% opacity
  }}
>
```

### Icon Container
```tsx
<div className={cn(
  "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
  isActive ? "bg-white" : "bg-gray-100 group-hover:bg-white"
)}>
  <img src={item.icon} alt="" className="w-8 h-8 object-contain" />
</div>
```

### Content Panel (Desktop)
```tsx
<div className="hidden lg:flex lg:col-span-7 bg-slate-50 rounded-2xl p-8 sm:p-10 border border-slate-100 min-h-[500px] flex-col relative overflow-hidden">
```

### Bullet List Item
```tsx
<div className="flex items-start gap-3">
  <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: themeColor }} />
  <span className="text-slate-700 font-medium text-sm">{bullet}</span>
</div>
```

### Read More Link
```tsx
<button 
  className="inline-flex items-center gap-2 font-bold hover:gap-3 transition-all group"
  style={{ color: themeColor }}
>
  Les mer om...
  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
</button>
```

---

## 11. FAQ ACCORDION (from FaqAccordion.tsx)

### Question Button
```tsx
<button
  className={cn(
    "group relative flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-300 border-2 w-full",
    openIndex === index 
      ? "bg-white shadow-md z-10 border-transparent" 
      : "bg-white border-transparent hover:border-slate-200 hover:bg-slate-50"
  )}
  style={{
    borderColor: openIndex === index ? themeColor : undefined
  }}
>
```

### Question Icon Container
```tsx
<div 
  className={cn(
    "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors",
    openIndex === index ? "bg-white text-white" : "bg-slate-100 text-slate-400 group-hover:bg-white"
  )}
  style={{
    backgroundColor: openIndex === index ? themeColor : undefined,
    color: openIndex === index ? '#fff' : undefined
  }}
>
  <HelpCircle className="w-5 h-5" />
</div>
```

### Answer Container
```tsx
<div className="px-6 pb-6 pt-2 ml-4 border-l-2 border-dashed border-slate-200">
  <div className="bg-slate-50 rounded-xl p-6 text-slate-600 leading-relaxed text-lg">
    {item.answer}
  </div>
</div>
```

---

## 12. FORM INPUTS

### ⚠️ WARNING: Missing CSS Variables

Your `textarea.tsx` uses these classes that are NOT defined:
- `border-input`
- `text-muted-foreground`
- `bg-input-background`
- `focus-visible:border-ring`
- `ring-ring/50`
- `ring-destructive`

### Recommended Input Pattern (Use this instead)
```tsx
<input 
  className="w-full px-4 py-3 rounded-md border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent transition-all"
/>
```

### Recommended Textarea Pattern
```tsx
<textarea
  className="w-full px-4 py-3 rounded-md border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent transition-all resize-none min-h-[120px]"
/>
```

---

## 13. FRAMER MOTION PATTERNS (from actual components)

### Slide Up on View
```tsx
<motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -20 }}
  transition={{ duration: 0.3 }}
>
```

### Accordion Expand/Collapse
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
```

### Tab Content Switch
```tsx
<AnimatePresence mode='wait'>
  {activeTab !== null && (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
```

---

## 14. ICON PATTERNS (Lucide React)

### Imports Used in Codebase
```tsx
import { 
  ArrowRight, 
  ArrowUp, 
  Menu, 
  X, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle 
} from 'lucide-react';
```

### Sizing Patterns
```tsx
<ArrowRight className="h-4 w-4" />      // Inline, buttons
<Menu className="h-6 w-6" />            // Navigation icons
<HelpCircle className="w-5 h-5" />      // FAQ icons
<CheckCircle2 className="w-5 h-5" />    // List checkmarks
```

### Icon with Hover Animation
```tsx
<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
```

---

## 15. TAILWIND CONFIG ISSUE ⚠️

Your `tailwind.config.js` has keyframes in the wrong place. They should be inside `theme.extend`:

```js
// CURRENT (INCORRECT):
module.exports = {
  content: [...],
  keyframes: { ... },  // ❌ Wrong location
  theme: { extend: { ... } }
}

// CORRECT:
module.exports = {
  content: [...],
  theme: {
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: { ... },
      fontFamily: { ... },
    },
  },
}
```

---

## 16. JSON-LD SCHEMA (from page.tsx)

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  'name': 'Averdi AS',
  // ... rest of schema
};

// In component:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

---

## 17. UTILITY FUNCTION

Always use `cn()` for conditional classNames:
```tsx
import { cn } from '@/lib/utils';

className={cn(
  "base-classes",
  isActive && "active-classes",
  !isActive && "inactive-classes"
)}
```

---

## 18. QUICK REFERENCE

```
COLORS:
├── Brand Orange:     #E86C1F
├── Brand Yellow:     #F4B223
├── Orange 10%:       bg-[#E86C1F]/10
├── Orange 30%:       shadow-[#E86C1F]/30
├── Page Background:  bg-slate-50
├── Card Background:  bg-white
├── Text Primary:     text-slate-900
├── Text Secondary:   text-slate-600
└── Borders:          border-slate-200

RADIUS:
├── Buttons:          rounded-full
├── Cards:            rounded-2xl
├── Tab buttons:      rounded-xl
├── Mobile nav:       rounded-xl
└── Inputs:           rounded-md

NAVBAR:
├── Position:         sticky top-0 z-50
├── Height:           h-20
├── Scrolled:         bg-white/80 backdrop-blur-md shadow-sm
└── Not scrolled:     bg-white/60 backdrop-blur-sm

TRANSITIONS:
├── Standard:         transition-all duration-300
├── Colors only:      transition-colors
└── Transform:        transition-transform

FONT:
├── Variable:         --font-inter
├── Class:            font-sans
└── Weights:          font-medium, font-semibold, font-bold
```

---

## 19. DO NOT DO (FORBIDDEN)

❌ **Never use:**
- Inline styles except for dynamic `themeColor` props
- CSS Modules
- `rounded-lg` for buttons (use `rounded-full`)
- `fixed` for navbar (use `sticky`)
- Colors outside the defined palette

❌ **Never forget:**
- `transition-*` classes on interactive elements
- `cn()` for conditional classNames
- `aria-*` attributes for accessibility
- `group` class for parent hover effects

---

**END OF VERIFIED STYLING RULES**