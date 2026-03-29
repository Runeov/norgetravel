import { z } from 'zod';

// ─── Destination enum matching existing destinations ───
export const DestinationSchema = z.enum([
  'northern-norway',
  'lofoten',
  'fjords',
  'svalbard',
  'all',
]);

// ─── Price range enum ───
export const PriceRangeSchema = z.enum(['budget', 'mid-range', 'luxury', 'varies']);

// ─── Status enum ───
export const TravelItemStatusSchema = z.enum(['draft', 'published']);

// ─── Base schema that all 5 categories extend ───
export const TravelItemBaseSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  destination: DestinationSchema,
  location: z.string().min(1, 'Location is required'),
  priceRange: PriceRangeSchema,
  website: z.string().url().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  imageAlt: z.string().nullable().optional(),
  status: TravelItemStatusSchema,
  isFeatured: z.boolean(),
  sortOrder: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// ─── Create variant (omits auto-generated fields) ───
export const TravelItemBaseCreateSchema = TravelItemBaseSchema.omit({
  id: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
});

// ─── Update variant (all create fields optional) ───
export const TravelItemBaseUpdateSchema = TravelItemBaseCreateSchema.partial();

// ─── Type exports ───
export type Destination = z.infer<typeof DestinationSchema>;
export type PriceRange = z.infer<typeof PriceRangeSchema>;
export type TravelItemStatus = z.infer<typeof TravelItemStatusSchema>;
export type TravelItemBase = z.infer<typeof TravelItemBaseSchema>;
export type TravelItemBaseCreate = z.infer<typeof TravelItemBaseCreateSchema>;
export type TravelItemBaseUpdate = z.infer<typeof TravelItemBaseUpdateSchema>;

// ─── Labels for destinations ───
export const DESTINATION_LABELS: Record<Destination, string> = {
  'northern-norway': 'Northern Norway',
  'lofoten': 'Lofoten Islands',
  'fjords': 'Norwegian Fjords',
  'svalbard': 'Svalbard',
  'all': 'All Norway',
};

// ─── Emojis for destinations ───
export const DESTINATION_EMOJIS: Record<Destination, string> = {
  'northern-norway': '🌌',
  'lofoten': '🏔️',
  'fjords': '🚢',
  'svalbard': '🐻‍❄️',
  'all': '🇳🇴',
};

// ─── Colors for destination badges ───
export const DESTINATION_COLORS: Record<Destination, string> = {
  'northern-norway': 'bg-indigo-100 text-indigo-700',
  'lofoten': 'bg-emerald-100 text-emerald-700',
  'fjords': 'bg-sky-100 text-sky-700',
  'svalbard': 'bg-violet-100 text-violet-700',
  'all': 'bg-slate-100 text-slate-700',
};

// ─── Labels for price ranges ───
export const PRICE_RANGE_LABELS: Record<PriceRange, string> = {
  'budget': 'Budget',
  'mid-range': 'Mid-Range',
  'luxury': 'Luxury',
  'varies': 'Varies',
};

// ─── Colors for price range badges ───
export const PRICE_RANGE_COLORS: Record<PriceRange, string> = {
  'budget': 'bg-green-100 text-green-700',
  'mid-range': 'bg-amber-100 text-amber-700',
  'luxury': 'bg-purple-100 text-purple-700',
  'varies': 'bg-slate-100 text-slate-600',
};

// ─── Travel category definitions ───
export const TRAVEL_CATEGORIES = [
  { slug: 'transport', label: 'Transport', emoji: '🚂', description: 'Getting around Norway' },
  { slug: 'accommodation', label: 'Accommodation', emoji: '🏨', description: 'Where to stay' },
  { slug: 'guides', label: 'Guides', emoji: '🧭', description: 'Expert local guides' },
  { slug: 'experiences', label: 'Experiences', emoji: '⛷️', description: 'Activities and tours' },
  { slug: 'restaurants', label: 'Restaurants', emoji: '🍽️', description: 'Where to eat' },
  { slug: 'events', label: 'Events', emoji: '🎉', description: 'Festivals and events' },
] as const;

export type TravelCategorySlug = (typeof TRAVEL_CATEGORIES)[number]['slug'];
