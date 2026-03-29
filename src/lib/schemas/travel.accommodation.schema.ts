import { z } from 'zod';
import { TravelItemBaseSchema } from './travel.shared';

// ─── Accommodation type enum ───
export const AccommodationTypeSchema = z.enum([
  'hotel', 'cabin', 'hostel', 'camping', 'rorbu', 'glamping', 'apartment',
]);

// ─── Full Accommodation schema (extends base) ───
export const AccommodationSchema = TravelItemBaseSchema.extend({
  accommodationType: AccommodationTypeSchema,
  starRating: z.number().min(1).max(5).nullable().optional(),
  amenities: z.array(z.string()).default([]),
  capacity: z.string().optional(),
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  bookingUrl: z.string().url().nullable().optional(),
  isEcoFriendly: z.boolean().default(false),
  nearestTown: z.string().optional(),
});

// ─── Create variant (omit auto-generated fields) ───
export const AccommodationCreateSchema = AccommodationSchema.omit({
  id: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
});

// ─── Update variant (all create fields optional) ───
export const AccommodationUpdateSchema = AccommodationCreateSchema.partial();

// ─── Type exports ───
export type Accommodation = z.infer<typeof AccommodationSchema>;
export type AccommodationCreate = z.infer<typeof AccommodationCreateSchema>;
export type AccommodationUpdate = z.infer<typeof AccommodationUpdateSchema>;
export type AccommodationType = z.infer<typeof AccommodationTypeSchema>;

// ─── Labels for accommodation types ───
export const ACCOMMODATION_TYPE_LABELS: Record<AccommodationType, string> = {
  'hotel': '🏨 Hotel',
  'cabin': '🏠 Cabin',
  'hostel': '🛏️ Hostel',
  'camping': '⛺ Camping',
  'rorbu': '🎣 Rorbu',
  'glamping': '✨ Glamping',
  'apartment': '🏢 Apartment',
};
