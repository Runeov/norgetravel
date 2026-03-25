# Averdi Workflow v4.1
## "The Active Translator" Process Guide
### Verified Against Codebase - December 2025

---

## 1. Strategic Overview

### The Pivot
**From:** Adversarial stance ("Anti-Bureaucrat")  
**To:** Partnership stance ("Active Translator")

**Goal:** Maintain commercial edge without alienating institutional stakeholders (Sametinget/Skatteetaten).

---

## 2. Role & Mission

| Element | Definition |
|---------|------------|
| **Role** | The Interpreter of Northern Norway (Averdi) |
| **Mission** | Transform static government data, laws, and rules into commercial advantage |
| **Prime Objective** | Maximize "handlingsrom" (room to act) and value creation |
| **Core Principle** | Accounting advice in the North is an investment instrument, not a cost |

---

## 3. Voice Architecture

Blend three voices:

1. **Tangen** → Energy
2. **Regnskap Norge** → Authority  
3. **Utility** → Actionable takeaways

### Staffing Dynamic
| Profile | Role |
|---------|------|
| Seniors (30+ years) | "Safe Hands" - Heavy authority |
| Juniors | "Modern Efficiency" - Energy & tech-savviness |

---

## 4. Content Pillars (What We Create)

### Pillar 1: Translator
- Translate bureaucratic rules into commercial meaning
- Explain eligibility filters clearly

### Pillar 2: Fiscal Navigator
- Convert tax benefits to recruitment strategy
- Position "virtuell bruttolønn"
- Frame 0% tax as Innovation Booster

### Pillar 3: Cultural Broker
- Respectful, authentic Sami values
- Connect business goals to community goals

---

## 5. Technical Workflow

### Component Stack (VERIFIED)
```
Next.js (App Router) → TypeScript → Tailwind CSS → Lucide React → Framer Motion
```

### Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout (Navbar + Footer wrapper)
│   ├── page.tsx                # Homepage
│   └── kunnskapsbank/          # Knowledge hub routes
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── modules/
│   │   └── home/
│   │       ├── Hero.tsx
│   │       ├── Services.tsx
│   │       ├── SalesPitch.tsx
│   │       ├── TrustStrip.tsx
│   │       ├── KunnskapsbankTeaser.tsx
│   │       └── ContactPanel.tsx
│   └── ui/
│       ├── AverdiBackground.tsx
│       ├── FeatureTabs.tsx
│       ├── FaqAccordion.tsx
│       └── textarea.tsx
├── lib/
│   └── utils.ts                # cn() utility
├── assets/
│   └── logo_averdi.avif
└── index.css                   # Global styles + Tailwind
```

### Layout Process

#### Step 1: Page Wrapper
```tsx
// All pages use this structure from layout.tsx
<html lang="nb" className="scroll-smooth">
  <body className={cn(inter.variable, "font-sans antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col")}>
    <Navbar />
    {children}
    <Footer />
  </body>
</html>
```

#### Step 2: Main Content Area
```tsx
// page.tsx pattern
<main className="flex-1">
  {/* JSON-LD Schema */}
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  
  {/* Page sections */}
  <Hero />
  <Services />
  {/* etc. */}
</main>
```

#### Step 3: Section with AverdiBackground
```tsx
// For sections needing decorative blobs
<section className="relative py-24">
  <AverdiBackground />
  <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6">
    {/* Content */}
  </div>
</section>
```

### Container Patterns (VERIFIED)

| Context | Pattern | Source |
|---------|---------|--------|
| Navbar/Footer | `max-w-screen-xl mx-auto px-4 sm:px-6` | Navbar.tsx, Footer.tsx |
| Page sections | `container mx-auto px-4 sm:px-6` | Home modules |
| Content hubs | `container mx-auto px-4 py-12 max-w-6xl` | Kunnskapsbank pages |
| Article content | `max-w-3xl mx-auto` | Article pages |

### MCP Data Tagging (⚠️ NOT YET IMPLEMENTED)

For mutable values (rates, dates, limits), wrap in McpDataSpan:

```tsx
// Component to create:
interface McpDataSpanProps {
  id: string;
  source: string;
  value: string | number;
  children?: React.ReactNode;
}

// Usage pattern:
<McpDataSpan id="stn-max-2026" source="sametinget.no" value="500000">
  500 000 kr
</McpDataSpan>
```

**2026 Data Values to Tag:**
| Parameter | Value | Source |
|-----------|-------|--------|
| Varied industry max | 500 000 kr | Sametinget |
| Support rate | 50% | Sametinget |
| Marine vessel limits | <11m strict | Sametinget |

---

## 6. JSON-LD Workflow

### Current Implementation (from page.tsx)
```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AccountingService',
  'name': 'Averdi AS',
  'image': 'https://averdi.no/logo_averdi.png',
  'description': 'Statsautorisert regnskapsførerselskap...',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Postboks 44',
    'addressLocality': 'Karasjok',
    'postalCode': '9730',
    'addressCountry': 'NO'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': '69.4719',
    'longitude': '25.5114'
  },
  'url': 'https://averdi.no',
  'telephone': '+47 907 67 993',
  'areaServed': ['Finnmark', 'Troms', 'Nord-Norge']
};
```

### Sanitization Process (⚠️ TO IMPLEMENT)

**Problem:** Citations (e.g., [1], [source]) leaking into Google Knowledge Graph schema.

**Solution:** Create utility function for AverdiArticleSchema component:

```typescript
// Add to lib/utils.ts
export const cleanSchemaText = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/<[^>]+>/g, '')          // Step 1: Strip HTML
    .replace(/\[.*?\]/g, '')          // Step 2: Strip [citations]
    .replace(/\s+/g, ' ')             // Step 3: Collapse whitespace
    .trim();                          // Step 4: Clean edges
};

// Usage in schema:
const jsonLd = {
  'description': cleanSchemaText(articleDescription),
  // ...
};
```

### Article Schema Pattern (TO IMPLEMENT)
```tsx
const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': cleanSchemaText(title),
  'description': cleanSchemaText(description),
  'author': {
    '@type': 'Person',
    'name': 'Author Name',
    'jobTitle': 'Statsautorisert Regnskapsfører'  // Required for authority
  },
  'publisher': {
    '@type': 'Organization',
    'name': 'Averdi AS',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://averdi.no/logo_averdi.png'
    }
  },
  // 60/40 Upsell - Link to services
  'mainEntity': {
    '@type': 'Service',
    'name': 'Søknadshjelp',
    'provider': { '@type': 'Organization', 'name': 'Averdi AS' }
  }
};
```

---

## 7. SEO Workflow

### Pre-Publish Checklist

1. **Sanitize** all schema text fields
   - [ ] Run `cleanSchemaText()` on headline
   - [ ] Run `cleanSchemaText()` on description
   - [ ] Run `cleanSchemaText()` on any article content in schema

2. **Add Authority**
   - [ ] Include `Person` schema for author
   - [ ] Job title: "Statsautorisert Regnskapsfører"
   - [ ] Link to author profile if available

3. **Include 60/40 Upsell**
   - [ ] Add `Service` object to mainEntity
   - [ ] Link article topic to relevant Averdi service
   - [ ] Example: Tax article → "Skatterådgivning" service

4. **Optimize Snippets**
   - [ ] Start definitive answers with "Ja" or "Nei"
   - [ ] Place key answer in first paragraph
   - [ ] Use structured data for FAQ sections

---

## 8. Component Creation Workflow

### Step 1: Interface Definition
```tsx
// Define props with React.ReactNode for flexible content
export interface ComponentItem {
  id: string;
  title: string;
  content: string | React.ReactNode;  // Allows JSX
  bullets: (string | React.ReactNode)[];
}
```

### Step 2: Theme Color Support
```tsx
// Always support themeColor prop for reusability
interface ComponentProps {
  items: ComponentItem[];
  themeColor?: string;  // Default: "#E86C1F"
  className?: string;
}
```

### Step 3: Use cn() for Conditional Classes
```tsx
import { cn } from '@/lib/utils';

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  !isActive && "inactive-classes",
  className  // Allow override
)}>
```

### Step 4: Dynamic Styles via style prop
```tsx
// For dynamic colors, use style prop not template literals in className
<div 
  style={{ 
    borderColor: isActive ? themeColor : 'transparent',
    backgroundColor: isActive ? `${themeColor}0D` : undefined  // 0D = 5% opacity
  }}
>
```

### Step 5: Accessibility
```tsx
// Always include:
<button
  aria-expanded={isOpen}
  aria-controls={`content-${id}`}
  aria-label="Descriptive label"
>
  <Icon aria-hidden="true" />
</button>
```

---

## 9. Animation Workflow (Framer Motion)

### Import Pattern
```tsx
import { motion, AnimatePresence } from 'framer-motion';
```

### Accordion Pattern
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
      {content}
    </motion.div>
  )}
</AnimatePresence>
```

### Tab Switch Pattern
```tsx
<AnimatePresence mode='wait'>
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.3 }}
  >
    {content}
  </motion.div>
</AnimatePresence>
```

---

## 10. Pre-Output Verification Checklist

Before publishing content, confirm:

### Content Quality
- [ ] **Translated rule to benefit?** (Not just explained, but commercial value shown)
- [ ] **Geography explicit?** (STN vs Tiltakssonen clearly stated)
- [ ] **Tone authoritative yet energetic?** (Balance achieved)

### Technical Quality
- [ ] **All numeric values MCP-tagged?** (Wrapped in McpDataSpan)
- [ ] **JSON-LD HTML/Citations stripped?** (cleanSchemaText applied)
- [ ] **Author schema included?** (Person with jobTitle)
- [ ] **Service upsell linked?** (60/40 pattern)

### Code Quality
- [ ] **Using cn() for classNames?**
- [ ] **ThemeColor prop supported?**
- [ ] **Accessibility attributes added?**
- [ ] **Framer Motion for animations?**

---

## 11. File Creation Triggers

| User Request | Action |
|--------------|--------|
| "Create article about X" | New page in `/kunnskapsbank/artikler/` |
| "Add FAQ section" | Use `FaqAccordion` component |
| "Show feature comparison" | Use `FeatureTabs` component |
| "Landing page for X" | New page with Hero, AverdiBackground |
| "Update rates/values" | Wrap in McpDataSpan, update source |

---

## 12. Version History

| Version | Date | Changes |
|---------|------|---------|
| 4.0 | - | "Anti-Bureaucrat" protocol |
| **4.1** | **Dec 13, 2025** | "Active Translator" pivot |
| **4.1.1** | **Dec 19, 2025** | Verified against codebase, added component patterns |

---

## 13. Implementation Status

| Feature | Status | Notes |
|---------|--------|-------|
| AverdiBackground | ✅ Implemented | In use |
| FeatureTabs | ✅ Implemented | Supports themeColor |
| FaqAccordion | ✅ Implemented | Supports themeColor |
| McpDataSpan | ⚠️ Not implemented | Create component |
| cleanSchemaText | ⚠️ Not implemented | Add to lib/utils.ts |
| Article JSON-LD | ⚠️ Not implemented | Create schema template |
| Person schema | ⚠️ Not implemented | Add to articles |

---

**END OF WORKFLOW**