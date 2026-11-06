/**
 * The three sections the travel guides are grouped into, shared by the
 * /travel-guides hub and the /app guides screen. Each section lists every
 * published article in its categories.
 */
export const GUIDE_SECTIONS = [
  {
    id: 'safety',
    title: 'Safety & Preparation',
    description:
      'The Fjellvettreglene, packing for Arctic conditions, winter driving rules, and Allemannsretten explained. Read before you go.',
    categories: ['safety'],
  },
  {
    id: 'trip-reports',
    title: 'Trip Reports',
    description:
      'First-person accounts from our editorial team. What actually happened, what went wrong, and what was worth every kilometer.',
    categories: ['trip-reports'],
  },
  {
    id: 'planning',
    title: 'Planning Guides',
    description:
      'The logistics that make or break your trip, from the DNT cabin system to timing the Northern Lights season.',
    categories: ['planning', 'artikler'],
  },
] as const;

export type GuideSectionId = (typeof GUIDE_SECTIONS)[number]['id'];

/** The section an article category belongs to, or undefined for categories the guides do not list. */
export const guideSectionOf = (category: string) =>
  GUIDE_SECTIONS.find((section) => (section.categories as readonly string[]).includes(category));
