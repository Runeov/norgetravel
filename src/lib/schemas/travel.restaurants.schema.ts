import { z } from 'zod';
import { TravelItemBaseSchema } from './travel.shared';

// ─── Cuisine type enum ───
export const CuisineTypeSchema = z.enum([
  'norwegian', 'seafood', 'sami', 'international', 'fine-dining', 'cafe', 'bakery', 'pub',
]);

// ─── Full Restaurant schema (extends base) ───
export const RestaurantSchema = TravelItemBaseSchema.extend({
  cuisineType: CuisineTypeSchema,
  openingHours: z.string().optional(),
  reservationRequired: z.boolean().default(false),
  reservationUrl: z.string().url().nullable().optional(),
  dietaryOptions: z.array(z.string()).default([]),
  averageMealPrice: z.string().optional(),
  michelinStars: z.number().min(0).max(3).nullable().optional(),
  specialties: z.array(z.string()).default([]),
  seatingCapacity: z.number().min(0).nullable().optional(),
});

// ─── Create variant (omit auto-generated fields) ───
export const RestaurantCreateSchema = RestaurantSchema.omit({
  id: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
});

// ─── Update variant (all create fields optional) ───
export const RestaurantUpdateSchema = RestaurantCreateSchema.partial();

// ─── Type exports ───
export type Restaurant = z.infer<typeof RestaurantSchema>;
export type RestaurantCreate = z.infer<typeof RestaurantCreateSchema>;
export type RestaurantUpdate = z.infer<typeof RestaurantUpdateSchema>;
export type CuisineType = z.infer<typeof CuisineTypeSchema>;

// ─── Labels for cuisine types ───
export const CUISINE_TYPE_LABELS: Record<CuisineType, string> = {
  'norwegian': '🇳🇴 Norwegian',
  'seafood': '🦐 Seafood',
  'sami': '🏔️ Sami',
  'international': '🌍 International',
  'fine-dining': '🍷 Fine Dining',
  'cafe': '☕ Café',
  'bakery': '🥐 Bakery',
  'pub': '🍺 Pub',
};
