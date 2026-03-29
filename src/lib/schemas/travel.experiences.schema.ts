import { z } from 'zod';
import { TravelItemBaseSchema } from './travel.shared';

// ─── Experience type enum ───
export const ExperienceTypeSchema = z.enum([
  'northern-lights', 'whale-watching', 'dog-sledding', 'glacier-hike',
  'fjord-cruise', 'fishing', 'surfing', 'kayaking', 'snowmobile',
  'cultural-tour', 'photography-tour',
]);

// ─── Difficulty enum ───
export const DifficultySchema = z.enum(['easy', 'moderate', 'challenging', 'expert']);

// ─── Full Experience schema (extends base) ───
export const ExperienceSchema = TravelItemBaseSchema.extend({
  experienceType: ExperienceTypeSchema,
  operator: z.string().min(1, 'Operator is required'),
  duration: z.string().optional(),
  difficulty: DifficultySchema,
  minAge: z.number().min(0).optional(),
  groupSize: z.string().optional(),
  includes: z.array(z.string()).default([]),
  bookingUrl: z.string().url().nullable().optional(),
  seasonalAvailability: z.string().optional(),
  meetingPoint: z.string().optional(),
});

// ─── Create variant (omit auto-generated fields) ───
export const ExperienceCreateSchema = ExperienceSchema.omit({
  id: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
});

// ─── Update variant (all create fields optional) ───
export const ExperienceUpdateSchema = ExperienceCreateSchema.partial();

// ─── Type exports ───
export type Experience = z.infer<typeof ExperienceSchema>;
export type ExperienceCreate = z.infer<typeof ExperienceCreateSchema>;
export type ExperienceUpdate = z.infer<typeof ExperienceUpdateSchema>;
export type ExperienceType = z.infer<typeof ExperienceTypeSchema>;
export type Difficulty = z.infer<typeof DifficultySchema>;

// ─── Labels for experience types ───
export const EXPERIENCE_TYPE_LABELS: Record<ExperienceType, string> = {
  'northern-lights': '\uD83C\uDF0C Northern Lights',
  'whale-watching': '\uD83D\uDC0B Whale Watching',
  'dog-sledding': '\uD83D\uDC15 Dog Sledding',
  'glacier-hike': '\uD83E\uDDCA Glacier Hike',
  'fjord-cruise': '\uD83D\uDEA2 Fjord Cruise',
  'fishing': '\uD83C\uDFA3 Fishing',
  'surfing': '\uD83C\uDFC4 Surfing',
  'kayaking': '\uD83D\uDEF6 Kayaking',
  'snowmobile': '\uD83C\uDFD4\uFE0F Snowmobile',
  'cultural-tour': '\uD83C\uDFDB\uFE0F Cultural Tour',
  'photography-tour': '\uD83D\uDCF8 Photography Tour',
};

// ─── Labels for difficulty levels ───
export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  'easy': '\uD83D\uDFE2 Easy',
  'moderate': '\uD83D\uDFE1 Moderate',
  'challenging': '\uD83D\uDFE0 Challenging',
  'expert': '\uD83D\uDD34 Expert',
};
