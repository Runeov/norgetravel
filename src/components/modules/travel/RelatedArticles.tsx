'use client';

import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

interface ArticleSummary {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime?: number;
}

interface RelatedArticlesProps {
  articles: ArticleSummary[];
  lang: string;
}

export function RelatedArticles({ articles, lang }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-12 border-t border-slate-200">
      <h3 className="text-2xl font-bold text-slate-900 mb-8">Up Next: Keep Exploring</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/${lang}/travel-guides/${article.category}/${article.slug}`}
            data-analytics-event="related_content_click"
            data-analytics-placement="related_articles"
            data-analytics-target={article.slug}
            className="group flex flex-col bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all h-full"
          >
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-3">
              <span className="uppercase tracking-wider text-[#E86C1F]">{article.category}</span>
              {article.readTime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {article.readTime} min read
                  </span>
                </>
              )}
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#E86C1F] transition-colors line-clamp-2">
              {article.title}
            </h4>
            <p className="text-slate-600 line-clamp-3 mb-6 flex-grow">
              {article.excerpt}
            </p>
            <div className="flex items-center text-[#E86C1F] font-medium mt-auto group-hover:gap-2 transition-all">
              Read article <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
