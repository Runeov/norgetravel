import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, BookOpen, User, Calendar, Tag, ArrowRight } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { getArticles } from '@/lib/admin/articles';
import { CATEGORY_LABELS } from '@/types/admin';
import type { ArticleCategory } from '@/types/admin';
import articlesJson from '@/data/articles.json';
import { AviasalesWidget } from '@/components/ui/AviasalesWidget';
import { injectAffiliateLinks } from '@/lib/affiliate-linker';
import { RelatedArticles } from '@/components/modules/travel/RelatedArticles';

export function generateStaticParams() {
  return Object.values(articlesJson as Record<string, { category: string; slug: string; status: string }>)
    .filter((a) => a.status === 'published')
    .map((a) => ({ category: a.category, slug: a.slug }));
}

interface PageProps {
  params: Promise<{ category: string; slug: string; lang: string }>;
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
async function findArticle(category: string, slug: string, lang: string) {
  const articles = await getArticles(lang);
  return Object.values(articles).find(
    (a) => a.category === category && a.slug === slug && a.status === 'published'
  ) || null;
}

/**
 * Generate dynamic metadata for SEO
 */
export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string; lang: string }> }): Promise<Metadata> {
  const { category, slug, lang } = await params;
  const article = await findArticle(category, slug, lang);

  if (!article) {
    return { title: 'Artikkel ikke funnet' };
  }

  return {
    title: article.metaTitle || `${article.title} | NorgeTravel`,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      url: `https://norgetravel.com/travel-guides/${article.category}/${article.slug}`,
      siteName: 'NorgeTravel.com',
      locale: 'en_US',
      type: 'article',
      ...(article.featuredImage && {
        images: [{ url: article.featuredImage, alt: article.featuredImageAlt || article.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      ...(article.featuredImage && {
        images: [article.featuredImage],
      }),
    },
  };
}

export default async function DynamicArticlePage({ params }: PageProps) {
  const { category, slug, lang } = await params;

  // Validate category
  if (!VALID_CATEGORIES.includes(category as ArticleCategory)) {
    notFound();
  }

  // Find the article
  const article = await findArticle(category, slug, lang);

  if (!article) {
    notFound();
  }

  // Find related articles for recommendations
  const allArticles = await getArticles(lang);
  const relatedArticles = Object.values(allArticles)
    .filter((a) => a.category === category && a.slug !== slug && a.status === 'published')
    .slice(0, 3)
    .map(a => ({
      id: a.id,
      slug: a.slug,
      category: a.category,
      title: a.title,
      excerpt: a.excerpt,
      readTime: a.readTime
    }));

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
    url: `https://norgetravel.com/travel-guides/${article.category}/${article.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://norgetravel.com/travel-guides/${article.category}/${article.slug}`,
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
            href="/travel-guides"
            className="hover:text-[#1A365D] transition-colors"
          >
            Travel Guides
          </Link>
          <span>/</span>
          <Link
            href={`/travel-guides/${article.category}`}
            className={`hover:${theme.text} transition-colors`}
          >
            {categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate max-w-[200px]">{article.title}</span>
        </nav>

        {/* Back link */}
        <Link
          href="/travel-guides"
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
              <span className="font-medium text-slate-700">{article.authorName || 'NorgeTravel'}</span>
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

        {/* Featured Video or Image. Skip the standalone hero when the body
            already renders the same image, so it is not displayed twice. */}
        {(article.featuredVideo ||
          (article.featuredImage && !article.content.includes(article.featuredImage))) && (
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
          dangerouslySetInnerHTML={{ __html: injectAffiliateLinks(article.content, lang) }}
        />

        {/* Global Interactive Trip Planner Card */}
        <div className="bg-[#1A365D]/5 border border-[#1A365D]/10 rounded-2xl p-8 my-12 shadow-sm hover:shadow-md transition-all">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest bg-emerald-100 text-emerald-700 mb-4">
                {lang === 'zh' ? '🛠️ 互动规划工具' : '🛠️ Interactive Tool'}
              </span>
              <h3 className="text-2xl font-bold text-[#1A365D] mb-3">
                {lang === 'zh' ? '规划您的完美挪威行程' : 'Plan Your Perfect Norway Itinerary'}
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {lang === 'zh' 
                  ? '使用我们免费的互动行程规划工具，设计您的挪威路线，预订经过验证的环保木屋和交通，并同步当地渡轮时刻表。' 
                  : 'Use our free, interactive trip planner to map out your route through Norway, book verified eco-friendly cabins and transport, and sync with local ferry timetables.'}
              </p>
            </div>
            <div className="w-full md:w-auto shrink-0">
              <Link
                href={`/${lang}/my-trip`}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#E86C1F] text-white font-bold rounded-lg hover:bg-[#cf5c15] transition-colors w-full text-center group"
              >
                {lang === 'zh' ? '启动规划器' : 'Launch Planner'}
                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <RelatedArticles articles={relatedArticles} lang={lang} />

        {/* FOOTER */}
        <footer className="mt-12 pt-8 border-t border-slate-200">
          <ShareButtons
            url={`/travel-guides/${article.category}/${article.slug}`}
            title={article.title}
            className="mb-8"
          />

          {/* Author card */}
          <Link
            href={`/om-oss/${article.authorId}`}
            className="block group mb-8"
          >
            <div className={`${theme.bg} border ${theme.border} p-6 rounded-2xl hover:shadow-md transition-shadow`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <User className={`w-6 h-6 ${theme.text}`} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 group-hover:text-[#E86C1F] transition-colors">
                    {article.authorName || 'NorgeTravel'}
                  </p>
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
          </Link>

          {/* More guides CTA */}
          <div className="text-center mt-8">
            <Link
              href="/travel-guides"
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
