import { z } from 'zod';

export const ArticleCategorySchema = z.enum([
  'artikler',
  'bedrift',
  'sametinget',
  'organisasjoner',
  'analyse',
  'regelverk',
]);

export const ArticleStatusSchema = z.enum(['draft', 'published']);

export const ArticleSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1, 'URL-slug er påkrevd'),
  title: z.string().min(1, 'Tittel er påkrevd'),
  subtitle: z.string().optional(),
  excerpt: z.string().min(1, 'Utdrag er påkrevd'),
  content: z.string().min(1, 'Innhold er påkrevd'),
  category: ArticleCategorySchema,
  tags: z.array(z.string()),
  readTime: z.number().min(1).max(120),
  authorId: z.string(),
  authorName: z.string().optional(),
  featuredImage: z.string().nullable().optional(),
  featuredImageAlt: z.string().nullable().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  status: ArticleStatusSchema,
  publishedAt: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isFeatured: z.boolean(),
  sortOrder: z.number(),
});

export const ArticleCreateSchema = ArticleSchema.omit({
  id: true,
  sortOrder: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
});

export const ArticleUpdateSchema = ArticleCreateSchema.partial();

export type Article = z.infer<typeof ArticleSchema>;
export type ArticleCreate = z.infer<typeof ArticleCreateSchema>;
export type ArticleUpdate = z.infer<typeof ArticleUpdateSchema>;
export type ArticleCategory = z.infer<typeof ArticleCategorySchema>;
export type ArticleStatus = z.infer<typeof ArticleStatusSchema>;

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  artikler: 'Innsikt',
  bedrift: 'Bedrift',
  sametinget: 'Sametinget',
  organisasjoner: 'Organisasjoner',
  analyse: 'Analyse',
  regelverk: 'Regelverk',
};

export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  artikler: 'bg-amber-100 text-amber-700',
  bedrift: 'bg-blue-100 text-blue-700',
  sametinget: 'bg-orange-100 text-orange-700',
  organisasjoner: 'bg-green-100 text-green-700',
  analyse: 'bg-purple-100 text-purple-700',
  regelverk: 'bg-slate-100 text-slate-700',
};
