import { z } from 'zod';
import { TravelItemBaseSchema } from './travel.shared';

// ─── Transport type enum ───
export const TransportTypeSchema = z.enum([
  'fly', 'train', 'bus', 'ferry', 'car-rental', 'bicycle',
]);

// ─── Full Transport schema (extends base) ───
export const TransportSchema = TravelItemBaseSchema.extend({
  transportType: TransportTypeSchema,
  operator: z.string().min(1, 'Operator is required'),
  routeFrom: z.string().min(1, 'Departure point is required'),
  routeTo: z.string().min(1, 'Arrival point is required'),
  duration: z.string().optional(),
  frequency: z.string().optional(),
  bookingUrl: z.string().url().nullable().optional(),
  isEcoFriendly: z.boolean().default(false),
  seasonalAvailability: z.string().optional(),
});

// ─── Create variant (omit auto-generated fields) ───
export const TransportCreateSchema = TransportSchema.omit({
  id: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
});

// ─── Update variant (all create fields optional) ───
export const TransportUpdateSchema = TransportCreateSchema.partial();

// ─── Type exports ───
export type Transport = z.infer<typeof TransportSchema>;
export type TransportCreate = z.infer<typeof TransportCreateSchema>;
export type TransportUpdate = z.infer<typeof TransportUpdateSchema>;
export type TransportType = z.infer<typeof TransportTypeSchema>;

// ─── Labels for transport types ───
export const TRANSPORT_TYPE_LABELS: Record<TransportType, string> = {
  'fly': '✈️ Fly',
  'train': '🚂 Train',
  'bus': '🚌 Bus',
  'ferry': '⛴️ Ferry',
  'car-rental': '🚗 Car Rental',
  'bicycle': '🚲 Bicycle',
};
