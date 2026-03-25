import { z } from 'zod';

export const KunnskapsbankSectionIdSchema = z.enum([
  'sametinget',
  'bedrifter',
  'organisasjoner',
]);

export const KunnskapsbankSectionSchema = z.object({
  id: KunnskapsbankSectionIdSchema,
  title: z.string().min(1, 'Tittel er påkrevd'),
  path: z.string().min(1, 'Path er påkrevd'),
  isPublished: z.boolean(),
  publishedAt: z.string().nullable(),
  updatedAt: z.string(),
});

export type KunnskapsbankSectionId = z.infer<typeof KunnskapsbankSectionIdSchema>;
export type KunnskapsbankSection = z.infer<typeof KunnskapsbankSectionSchema>;

export const KUNNSKAPSBANK_SECTION_ORDER: KunnskapsbankSectionId[] = [
  'sametinget',
  'bedrifter',
  'organisasjoner',
];
