# About Module Components

## EmployeeProfileCard

Modern, interactive employee profile card component inspired by contemporary design patterns while adhering to Averdi's brand guidelines.

### Features

- **Responsive Design**: Adapts seamlessly from mobile to desktop
- **Interactive Elements**:
  - Expandable "About" section with smooth transitions
  - Auto-rotating testimonial slider with manual controls
  - Hover effects on skills badges
  - Animated status indicator
- **Averdi Brand Compliance**:
  - Uses official color palette (`#E86C1F`, `#F4B223`)
  - Follows Tailwind utility-first approach
  - Implements proper border radius (`rounded-2xl`, `rounded-full`)
  - Maintains consistent spacing and typography

### Usage

```tsx
import EmployeeProfileCard from '@/components/modules/about/EmployeeProfileCard';
import { employees } from '@/../../Temporary/employees';

export default function MyPage() {
  const employee = employees['ingvald-laiti'];
  
  return <EmployeeProfileCard employee={employee} />;
}
```

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `employee` | `Employee` | Yes | Employee data object from `Temporary/employees.ts` |

### Employee Interface

```typescript
interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  office: string;
  description: string;
  longDescription: string;
  experience: string;
  specialties: string[];
  education: string[];
  languages: string[];
  workingHours: string;
  achievements: string[];
  clientTypes: string[];
  image?: string;
  relatedHubs?: { title: string; link: string }[];
}
```

### Component Structure

1. **Header Section**
   - Profile image (or initials fallback)
   - Name, role, and location
   - Status badge ("Tilgjengelig")

2. **About Section**
   - Collapsible description
   - "Les mer/Les mindre" toggle

3. **Skills Section**
   - Color-coded specialty badges
   - Hover effects with elevation

4. **Languages Section**
   - Language badges with alternating colors

5. **Testimonials Slider**
   - Auto-rotating carousel (5s interval)
   - Manual navigation dots
   - Star badge decoration

6. **Footer**
   - Statistics (experience, specialties, endorsements)
   - Action buttons (Email, Phone)

### Styling Notes

- **Colors**: Alternating badge colors using modulo pattern
  - `bg-[#E5F7FF]` (light blue)
  - `bg-[#F0EBFF]` (light purple)
  - `bg-[#FFEDE0]` (light orange)
- **Transitions**: All interactive elements use `duration-300` or `duration-500`
- **Shadows**: Hover state elevates card with `shadow-xl`
- **Animations**: Pulse effect on status dot, smooth slider transitions

### Demo Page

Visit `/team-demo` to see the component in action with all employees.

### Integration

The component is integrated into the "Om oss" page via [`TeamSectionModern`](./TeamSectionModern.tsx):

```tsx
<TeamSectionModern employees={Object.values(employees)} />
```

### Accessibility

- Semantic HTML structure
- ARIA labels on slider controls
- Keyboard-accessible buttons
- Focus states on interactive elements
- Proper heading hierarchy

### Performance

- Client-side only (`'use client'`)
- Optimized re-renders with proper state management
- Cleanup of intervals on unmount
- Lazy image loading (when images are provided)

---

## TeamSectionModern

Wrapper component that displays multiple employee profile cards in a responsive grid.

### Usage

```tsx
import TeamSectionModern from '@/components/modules/about/TeamSectionModern';
import { employees } from '@/../../Temporary/employees';

<TeamSectionModern employees={Object.values(employees)} />
```

### Layout

- **Mobile**: Single column
- **Desktop (lg+)**: Two columns with gap
- **Max width**: 7xl container
- **Background**: `bg-slate-50`

---

## Migration from Old TeamSection

The original [`TeamSection`](./TeamSection.tsx) component is still available for backward compatibility. To switch to the modern design:

**Before:**
```tsx
import TeamSection from '@/components/modules/about/TeamSection';
<TeamSection employees={Object.values(employees)} />
```

**After:**
```tsx
import TeamSectionModern from '@/components/modules/about/TeamSectionModern';
<TeamSectionModern employees={Object.values(employees)} />
```

### Key Differences

| Feature | Old TeamSection | New TeamSectionModern |
|---------|----------------|----------------------|
| Layout | 3-column grid | 2-column grid (larger cards) |
| Card style | Compact, expandable | Rich, interactive |
| Testimonials | ❌ | ✅ Auto-rotating slider |
| Status indicator | ❌ | ✅ Animated badge |
| Stats display | ❌ | ✅ Experience/Skills/Endorsements |
| Image support | Initials only | Image or initials |
| Hover effects | Basic shadow | Elevation + scale |

---

## Future Enhancements

- [ ] Add real testimonials to employee data
- [ ] Implement image upload/management
- [ ] Add social media links (LinkedIn, etc.)
- [ ] Create individual employee detail pages
- [ ] Add filtering/search functionality
- [ ] Implement "Book a meeting" integration
- [ ] Add availability calendar
