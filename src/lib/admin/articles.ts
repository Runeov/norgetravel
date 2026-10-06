import { promises as fs } from 'fs';
import path from 'path';
import { ArticleSchema, ArticleCreateSchema, type Article, type ArticleCreate } from '@/lib/schemas/article.schema';
import { withFileLock } from '@/lib/storage/file-lock';
import { isCjkBody, isCurrentTranslation } from '@/lib/article-locales';

const DATA_FILE = path.join(process.cwd(), 'src/data/articles.json');
const DATA_FILE_ZH = path.join(process.cwd(), 'src/data/articles_zh.json');
const DATA_FILE_JA = path.join(process.cwd(), 'src/data/articles_ja.json');
export interface ArticlesData {
  [key: string]: Article;
}

// Translated fields taken from articles_ja.json. Most ja bodies are English
// copies, so the body comes from articles.json unless the ja body is Japanese.
const JA_FIELDS = ['title', 'subtitle', 'excerpt', 'metaTitle', 'metaDescription'] as const;

/**
 * Japanese view: every English article, with the Japanese translation overlaid
 * only when it is at least as new as the English article.
 */
async function readJapaneseArticles(): Promise<Record<string, Article>> {
  const [en, ja] = await Promise.all([
    fs.readFile(DATA_FILE, 'utf-8').then((d) => JSON.parse(d) as Record<string, Article>),
    fs.readFile(DATA_FILE_JA, 'utf-8').then((d) => JSON.parse(d) as Record<string, Partial<Article>>),
  ]);
  const merged: Record<string, Article> = {};
  for (const [key, article] of Object.entries(en)) {
    const translation = ja[key];
    merged[key] = { ...article };
    if (isCurrentTranslation(article, translation)) {
      for (const field of JA_FIELDS) {
        if (translation[field]) Object.assign(merged[key], { [field]: translation[field] });
      }
      if (isCjkBody(translation.content)) merged[key].content = translation.content as string;
    }
  }
  return merged;
}

/**
 * Read all articles from the JSON file
 */
export async function getArticles(lang?: string): Promise<ArticlesData> {
  try {
    const parsed =
      lang === 'ja'
        ? await readJapaneseArticles()
        : JSON.parse(await fs.readFile(lang === 'zh' ? DATA_FILE_ZH : DATA_FILE, 'utf-8'));

    // Validate each article
    const validated: ArticlesData = {};
    for (const [key, value] of Object.entries(parsed)) {
      try {
        validated[key] = ArticleSchema.parse(value);
      } catch (error) {
        console.warn(`Validation warning for article ${key}:`, error);
        validated[key] = value as Article;
      }
    }

    return validated;
  } catch (error) {
    console.error('Error reading articles:', error);
    return {};
  }
}

/**
 * Get a single article by ID
 */
export async function getArticle(id: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles[id] || null;
}

/**
 * Generate a URL-safe slug from a title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Create a new article (with validation and locking)
 */
export async function createArticle(articleData: ArticleCreate): Promise<Article> {
  // Validate input
  const validated = ArticleCreateSchema.parse(articleData);

  return withFileLock('articles', async () => {
    const articles = await getArticles();

    // Generate ID from title
    const baseId = generateSlug(validated.title);

    // Ensure unique ID
    let uniqueId = baseId;
    let counter = 1;
    while (articles[uniqueId]) {
      uniqueId = `${baseId}-${counter}`;
      counter++;
    }

    // Calculate sort order (add to end)
    const maxSortOrder = Math.max(0, ...Object.values(articles).map(a => a.sortOrder || 0));

    const now = new Date().toISOString();
    const newArticle: Article = {
      ...validated,
      id: uniqueId,
      sortOrder: maxSortOrder + 1,
      createdAt: now,
      updatedAt: now,
      publishedAt: validated.status === 'published' ? now : null,
    };

    // Validate complete article
    const finalArticle = ArticleSchema.parse(newArticle);

    articles[uniqueId] = finalArticle;
    await fs.writeFile(DATA_FILE, JSON.stringify(articles, null, 2), 'utf-8');

    return finalArticle;
  });
}

/**
 * Update an existing article (with validation and locking)
 */
export async function updateArticle(id: string, updates: Partial<Article>): Promise<Article | null> {
  return withFileLock('articles', async () => {
    const articles = await getArticles();

    if (!articles[id]) {
      return null;
    }

    const existingArticle = articles[id];
    const now = new Date().toISOString();

    // Handle publish status change
    let publishedAt = existingArticle.publishedAt;
    if (updates.status === 'published' && existingArticle.status !== 'published') {
      publishedAt = now;
    } else if (updates.status === 'draft') {
      publishedAt = null;
    }

    const updatedArticle: Article = {
      ...existingArticle,
      ...updates,
      id, // Ensure ID doesn't change
      publishedAt,
      updatedAt: now,
    };

    // Validate the updated article
    const validated = ArticleSchema.parse(updatedArticle);

    articles[id] = validated;
    await fs.writeFile(DATA_FILE, JSON.stringify(articles, null, 2), 'utf-8');

    return validated;
  });
}

/**
 * Delete an article (with locking)
 */
export async function deleteArticle(id: string): Promise<boolean> {
  return withFileLock('articles', async () => {
    const articles = await getArticles();

    if (!articles[id]) {
      return false;
    }

    delete articles[id];
    await fs.writeFile(DATA_FILE, JSON.stringify(articles, null, 2), 'utf-8');

    return true;
  });
}

/**
 * Publish or unpublish an article
 */
export async function togglePublishArticle(id: string): Promise<Article | null> {
  const articles = await getArticles();

  if (!articles[id]) {
    return null;
  }

  const article = articles[id];
  const newStatus = article.status === 'published' ? 'draft' : 'published';

  return updateArticle(id, { status: newStatus });
}

/**
 * Get published articles sorted by publishedAt (newest first)
 */
export async function getPublishedArticles(): Promise<Article[]> {
  const articles = await getArticles();
  return Object.values(articles)
    .filter(a => a.status === 'published')
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });
}

/**
 * Get featured articles
 */
export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getArticles();
  return Object.values(articles)
    .filter(a => a.status === 'published' && a.isFeatured)
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
}

/**
 * Get all articles sorted by updatedAt (newest first)
 */
export async function getAllArticlesSorted(): Promise<Article[]> {
  const articles = await getArticles();
  return Object.values(articles)
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return dateB - dateA;
    });
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const articles = await getArticles();
  return Object.values(articles)
    .filter(a => a.status === 'published' && a.category === category)
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });
}

// Re-export types for convenience
export type { Article, ArticleCreate };
