import { z } from 'zod';
import { TravelItemBaseSchema } from './travel.shared';

// ─── Event type enum ───
export const EventTypeSchema = z.enum([
  'festival',
  'concert',
  'market',
  'sports',
  'cultural',
  'midnight-sun',
  'northern-lights',
  'food-drink',
  'outdoor',
  'seasonal',
]);

// ─── Full Event schema (extends base) ───
export const EventSchema = TravelItemBaseSchema.extend({
  eventType: EventTypeSchema,
  organizer: z.string().min(1, 'Organizer is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  venue: z.string().optional(),
  capacity: z.string().optional(),
  ticketUrl: z.string().url().nullable().optional(),
  isFree: z.boolean().default(false),
  isRecurring: z.boolean().default(false),
  frequency: z.string().optional(),
});

// ─── Create variant (omit auto-generated fields) ───
export const EventCreateSchema = EventSchema.omit({
  id: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
});

// ─── Update variant (all create fields optional) ───
export const EventUpdateSchema = EventCreateSchema.partial();

// ─── Type exports ───
export type Event = z.infer<typeof EventSchema>;
export type EventCreate = z.infer<typeof EventCreateSchema>;
export type EventUpdate = z.infer<typeof EventUpdateSchema>;
export type EventType = z.infer<typeof EventTypeSchema>;

// ─── Labels for event types ───
export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  'festival': '🎉 Festival',
  'concert': '🎵 Concert',
  'market': '🛒 Market',
  'sports': '🏅 Sports',
  'cultural': '🏛️ Cultural',
  'midnight-sun': '☀️ Midnight Sun',
  'northern-lights': '🌌 Northern Lights',
  'food-drink': '🍷 Food & Drink',
  'outdoor': '🏕️ Outdoor',
  'seasonal': '❄️ Seasonal',
};
