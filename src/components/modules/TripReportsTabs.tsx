'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Route } from 'lucide-react';
import { cn } from '@/lib/utils';

export type TripReportRegion =
  | 'fjords'
  | 'northern-norway'
  | 'cities'
  | 'lofoten'
  | 'svalbard';

export interface TripReportArticle {
  title: string;
  slug: string;
  readTime: string;
  status: 'published' | 'coming-soon';
  region: TripReportRegion;
}

const TABS: { id: TripReportRegion | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'fjords', label: 'Fjords of Norway' },
  { id: 'northern-norway', label: 'Northern Norway' },
  { id: 'lofoten', label: 'Lofoten Islands' },
  { id: 'svalbard', label: 'Svalbard' },
  { id: 'cities', label: 'Cities of Norway' },
];

interface Props {
  articles: TripReportArticle[];
  categoryId: string;
}

export function TripReportsTabs({ articles, categoryId }: Props) {
  const [active, setActive] = useState<TripReportRegion | 'all'>('all');
  const filtered = active === 'all' ? articles : articles.filter((a) => a.region === active);

  const counts = TABS.reduce<Record<string, number>>((acc, tab) => {
    acc[tab.id] = tab.id === 'all' ? articles.length : articles.filter((a) => a.region === tab.id).length;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Filter trip reports by region">
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          const count = counts[tab.id] ?? 0;
          if (count === 0 && tab.id !== 'all') return null;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(tab.id)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors min-h-[44px]',
                isActive
                  ? 'bg-[#1A365D] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#1A365D]/40 hover:text-[#1A365D]'
              )}
            >
              {tab.label}
              <span
                className={cn(
                  'inline-flex items-center justify-center text-xs font-bold rounded-full px-2 py-0.5',
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((article) => (
          <div
            key={article.slug}
            className="bg-white border border-slate-200 rounded-lg p-5 transition-all duration-200 hover:border-[#1A365D]/40 hover:shadow-lg hover:shadow-[#1A365D]/10 flex flex-col"
          >
            <div className="flex items-start gap-3 mb-3">
              <Route className="w-4 h-4 mt-1 text-[#1A365D] shrink-0" aria-hidden="true" />
              <h3 className="text-base font-bold text-slate-800 leading-snug">{article.title}</h3>
            </div>
            <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                <Clock className="w-3 h-3" aria-hidden="true" />
                {article.readTime}
              </span>
              {article.status === 'coming-soon' ? (
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Coming soon</span>
              ) : (
                <Link
                  href={`/kunnskapsbank/${categoryId}/${article.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1A365D] hover:gap-2 transition-all"
                >
                  Read guide
                  <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-slate-500 py-8 text-center">No trip reports in this region yet.</p>
      )}
    </div>
  );
}
