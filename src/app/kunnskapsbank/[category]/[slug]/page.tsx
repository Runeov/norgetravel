import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, BookOpen, User, Calendar, Tag, ArrowRight } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { getArticles } from '@/lib/admin/articles';
import { CATEGORY_LABELS } from '@/types/admin';
import type { ArticleCategory } from '@/types/admin';
import articlesJson from '@/data/articles.json';

export function generateStaticParams() {
  return Object.values(articlesJson as Record<string, { category: string; slug: string; status: string }>)
    .filter((a) => a.status === 'published')
    .map((a) => ({ category: a.category, slug: a.slug }));
}

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

// Valid categories from the schema
const VALID_CATEGORIES: ArticleCategory[] = ['artikler', 'bedrift', 'sametinget', 'organisasjoner', 'analyse', 'regelverk', 'safety', 'trip-reports', 'planning'];

// Category theme colors
const CATEGORY_THEME: Record<string, { text: string; bg: string; border: string; badge: string }> = {
  artikler: { text: 'text-[#E86C1F]', bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' },
  bedrift: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' },
  sametinget: { text: 'text-[#E86C1F]', bg: 'bg-orange-50', border: 'border-[#E86C1F]/20', badge: 'bg-orange-100 text-orange-700' },
  organisasjoner: { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700' },
  analyse: { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700' },
  regelverk: { text: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200', badge: 'bg-slate-100 text-slate-700' },
  safety: { text: 'text-[#D32F2F]', bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700' },
  'trip-reports': { text: 'text-[#1A365D]', bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' },
  planning: { text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700' },
};

/**
 * Find an article by category and slug from the JSON data store
 */
async function findArticle(category: string, slug: string) {
  const articles = await getArticles();
  return Object.values(articles).find(
    (a) => a.category === category && a.slug === slug && a.status === 'published'
  ) || null;
}

/**
 * Generate dynamic metadata for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const article = await findArticle(category, slug);

  if (!article) {
    return { title: 'Artikkel ikke funnet' };
  }

  return {
    title: article.metaTitle || `${article.title} | NorgeTravel`,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      url: `https://norgetravel.com/kunnskapsbank/${article.category}/${article.slug}`,
      siteName: 'NorgeTravel.com',
      locale: 'en_US',
      type: 'article',
      ...(article.featuredImage && {
        images: [{ url: article.featuredImage, alt: article.featuredImageAlt || article.title }],
      }),
    },
  };
}

export default async function DynamicArticlePage({ params }: PageProps) {
  const { category, slug } = await params;

  // Validate category
  if (!VALID_CATEGORIES.includes(category as ArticleCategory)) {
    notFound();
  }

  // Find the article
  const article = await findArticle(category, slug);

  if (!article) {
    notFound();
  }

  const theme = CATEGORY_THEME[article.category] || CATEGORY_THEME.analyse;
  const categoryLabel = CATEGORY_LABELS[article.category as ArticleCategory] || article.category;

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    author: {
      '@type': 'Person',
      name: article.authorName || 'NorgeTravel',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NorgeTravel.com',
      url: 'https://norgetravel.com',
    },
    datePublished: article.publishedAt || article.createdAt,
    dateModified: article.updatedAt,
    url: `https://norgetravel.com/kunnskapsbank/${article.category}/${article.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://norgetravel.com/kunnskapsbank/${article.category}/${article.slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <NorgeBackground />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-12" aria-label="Brødsmulesti">
          <Link
            href="/kunnskapsbank"
            className="hover:text-[#1A365D] transition-colors"
          >
            Travel Guides
          </Link>
          <span>/</span>
          <Link
            href={`/kunnskapsbank/${article.category}`}
            className={`hover:${theme.text} transition-colors`}
          >
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate max-w-[200px]">{article.title}</span>
        </nav>

        {/* Back link */}
        <Link
          href="/kunnskapsbank"
          className="inline-flex items-center text-slate-500 hover:text-[#E86C1F] mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
          Back to Travel Guides
        </Link>

        {/* HEADER */}
        <header className="mb-16">
          {/* Category badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${theme.badge}`}>
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              {categoryLabel}
            </span>
            {article.isFeatured && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#E86C1F]/10 text-[#E86C1F]">
                Fremhevet
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Subtitle */}
          {article.subtitle && (
            <p className="text-xl md:text-2xl text-slate-500 mb-6 font-medium">
              {article.subtitle}
            </p>
          )}

          {/* Excerpt */}
          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
            {article.excerpt}
          </p>

          {/* Meta info bar */}
          <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-slate-200 text-sm text-slate-500">
            {/* Author */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                <User className="w-4 h-4 text-slate-500" aria-hidden="true" />
              </div>
              <span className="font-medium text-slate-700">{article.authorName || 'Averdi'}</span>
            </div>

            {/* Date */}
            {article.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('nb-NO', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </div>
            )}

            {/* Read time */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" aria-hidden="true" />
              <span>{article.readTime} min lesetid</span>
            </div>
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Tag className="w-4 h-4 text-slate-400" aria-hidden="true" />
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Featured Video or Image */}
        {(article.featuredVideo || article.featuredImage) && (
          <figure className="mb-16">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              {article.featuredVideo ? (
                <video
                  src={article.featuredVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto"
                />
              ) : (
                <img
                  src={article.featuredImage ?? undefined}
                  alt={article.featuredImageAlt || article.title}
                  className="w-full h-auto object-cover"
                />
              )}
            </div>
            {article.featuredImageAlt && !article.featuredVideo && (
              <figcaption className="text-xs text-slate-400 mt-2">
                {article.featuredImageAlt}
              </figcaption>
            )}
          </figure>
        )}

        {/* ARTICLE BODY */}
        <div
          className="prose prose-lg prose-slate max-w-none
            prose-headings:font-bold prose-headings:text-slate-900
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4
            prose-p:text-slate-600 prose-p:leading-relaxed
            prose-a:text-[#E86C1F] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900
            prose-ul:text-slate-600 prose-ol:text-slate-600
            prose-li:marker:text-[#E86C1F]
            prose-blockquote:border-l-[#E86C1F] prose-blockquote:text-slate-700 prose-blockquote:italic
            prose-img:rounded-xl prose-img:shadow-md
            prose-table:border-collapse
            prose-th:bg-slate-100 prose-th:text-slate-900 prose-th:font-bold prose-th:p-3
            prose-td:p-3 prose-td:border-slate-200"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* FOOTER */}
        <footer className="mt-20 pt-8 border-t border-slate-200">
          {/* Author card */}
          <div className={`${theme.bg} border ${theme.border} p-6 rounded-2xl mb-8`}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <User className={`w-6 h-6 ${theme.text}`} aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-slate-900">{article.authorName || 'Averdi'}</p>
                <p className="text-sm text-slate-500">
                  Published{' '}
                  {article.publishedAt
                    ? new Date(article.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'recently'}
                </p>
              </div>
            </div>
          </div>

          {/* More guides CTA */}
          <div className="text-center mt-8">
            <Link
              href="/kunnskapsbank"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#1A365D] text-white font-bold rounded-md hover:bg-[#152d52] transition-colors"
            >
              More travel guides
              <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
