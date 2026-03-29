import { z } from 'zod';
import { TravelItemBaseSchema } from './travel.shared';

// ─── Guide type enum ───
export const GuideTypeSchema = z.enum([
  'hiking', 'fishing', 'northern-lights', 'wildlife', 'cultural', 'photography', 'kayak', 'ski',
]);

// ─── Full Guide schema (extends base) ───
export const GuideSchema = TravelItemBaseSchema.extend({
  guideType: GuideTypeSchema,
  languages: z.array(z.string()).default([]),
  groupSize: z.string().optional(),
  certifications: z.array(z.string()).default([]),
  yearsExperience: z.number().min(0).optional(),
  contactEmail: z.string().email().nullable().optional(),
  contactPhone: z.string().nullable().optional(),
  bookingUrl: z.string().url().nullable().optional(),
  operatingMonths: z.array(z.string()).default([]),
});

// ─── Create variant (omit auto-generated fields) ───
export const GuideCreateSchema = GuideSchema.omit({
  id: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
});

// ─── Update variant (all create fields optional) ───
export const GuideUpdateSchema = GuideCreateSchema.partial();

// ─── Type exports ───
export type Guide = z.infer<typeof GuideSchema>;
export type GuideCreate = z.infer<typeof GuideCreateSchema>;
export type GuideUpdate = z.infer<typeof GuideUpdateSchema>;
export type GuideType = z.infer<typeof GuideTypeSchema>;

// ─── Labels for guide types ───
export const GUIDE_TYPE_LABELS: Record<GuideType, string> = {
  'hiking': '🥾 Hiking',
  'fishing': '🎣 Fishing',
  'northern-lights': '🌌 Northern Lights',
  'wildlife': '🦌 Wildlife',
  'cultural': '🏛️ Cultural',
  'photography': '📸 Photography',
  'kayak': '🛶 Kayak',
  'ski': '⛷️ Ski',
};
