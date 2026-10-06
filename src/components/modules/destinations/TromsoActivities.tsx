'use client';

import { useState } from 'react';
import Link from '@/components/LocalizedLink';
import {
  Clock,
  Calendar,
  Mountain,
  Waves,
  Car,
  Ship,
  ArrowRight,
  ExternalLink,
  Star,
  UtensilsCrossed,
  Footprints,
  TrendingUp,
  Ruler,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type {
  TromsoActivitiesCopy,
  TromsoFeaturedId,
  TromsoTourId,
  TromsoTrailDifficulty,
  TromsoTrailId,
} from '@/i18n/tromso-copy';
import { outboundRel } from '@/lib/outbound-rel';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

// Text per locale comes from TROMSO_COPY (src/i18n/tromso-copy.ts)

interface ActivityGuide {
  id: TromsoFeaturedId;
  icon: React.ReactNode;
  href: string;
  isExternal?: boolean;
  bookingUrl?: string;
}

interface Trail {
  id: TromsoTrailId;
  difficulty: TromsoTrailDifficulty;
  slug?: string;
}

interface Tour {
  id: TromsoTourId;
  affiliateUrl: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const featuredGuides: ActivityGuide[] = [
  {
    id: 'aurora',
    icon: <Sparkles className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    isExternal: true,
  },
  {
    id: 'whales',
    icon: <Waves className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    isExternal: true,
  },
  {
    id: 'fjellheisen',
    icon: <Mountain className="w-5 h-5" aria-hidden="true" />,
    href: '/travel-guides/trip-reports/sherpatrappa-floya-tromso',
  },
  {
    id: 'senja',
    icon: <Car className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    isExternal: true,
  },
];

const tours: Tour[] = [
  {
    id: 'aurora',
    affiliateUrl:
      'https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    id: 'whales',
    affiliateUrl:
      'https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    id: 'husky',
    affiliateUrl:
      'https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    id: 'sami',
    affiliateUrl:
      'https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
];

const trails: Trail[] = [
  { id: 'sherpatrappa', difficulty: 'Moderate', slug: 'sherpatrappa-floya-tromso' },
  { id: 'tromsdalstinden', difficulty: 'Hard', slug: 'tromsdalstinden-summit-tromso' },
  { id: 'rodtinden', difficulty: 'Moderate', slug: 'rodtinden-kvaloya-tromso' },
  { id: 'bonntuva', difficulty: 'Easy', slug: 'bonntuva-kvaloya-tromso' },
];

/* ------------------------------------------------------------------ */
/*  Tab config                                                         */
/* ------------------------------------------------------------------ */

const tabs = [
  { id: 'featured', icon: Star },
  { id: 'tours', icon: Ship },
  { id: 'hiking', icon: Footprints },
  { id: 'eat', icon: UtensilsCrossed },
] as const;

type TabId = (typeof tabs)[number]['id'];

const difficultyColor: Record<TromsoTrailDifficulty, string> = {
  Easy: 'bg-emerald-100 text-emerald-800',
  Moderate: 'bg-amber-100 text-amber-800',
  Hard: 'bg-red-100 text-red-800',
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function TromsoActivities({ copy }: { copy: TromsoActivitiesCopy }) {
  const [activeTab, setActiveTab] = useState<TabId>('featured');

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Mountain className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">{copy.heading}</h2>
      </div>
      <div className="max-w-3xl space-y-4 mb-8">
        <p className="text-slate-600 leading-relaxed">
          {copy.intro}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8" role="tablist">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors min-h-[44px]',
                isActive
                  ? 'bg-[#1A365D] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#1A365D]/40 hover:text-[#1A365D]'
              )}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {copy.tabs[tab.id]}
            </button>
          );
        })}
      </div>

      <div>
        {activeTab === 'featured' && (
          <div className="grid sm:grid-cols-2 gap-6">
            {featuredGuides.map((guide) => {
              const text = copy.featured[guide.id];
              return (
                <div
                  key={guide.id}
                  className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1A365D]/10 flex items-center justify-center shrink-0 text-[#1A365D]">
                      {guide.icon}
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 pt-1">{text.title}</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{text.description}</p>
                  <div className="flex flex-wrap gap-3 text-xs mb-4">
                    <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {text.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                      {text.price}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      {text.season}
                    </span>
                  </div>
                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    {guide.isExternal ? (
                      <a
                        href={guide.href}
                        rel={outboundRel(guide.href)}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-sm font-bold text-[#1A365D] hover:text-[#00D084] transition-colors"
                      >
                        {text.linkLabel}
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    ) : (
                      <Link
                        href={guide.href}
                        className="inline-flex items-center gap-1 text-sm font-bold text-[#1A365D] hover:text-[#00D084] transition-colors"
                      >
                        {text.linkLabel}
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    )}
                    {guide.bookingUrl && (
                      <a
                        href={guide.bookingUrl}
                        rel={outboundRel(guide.bookingUrl)}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] px-3 py-1.5 rounded-md hover:shadow-md transition-all min-h-[32px]"
                      >
                        {copy.bookTour}
                        <ExternalLink className="w-3 h-3" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'tours' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {tours.map((tour) => {
                const text = copy.tours[tour.id];
                return (
                  <div
                    key={tour.id}
                    className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-900 mb-1">{text.name}</h3>
                      <p className="text-xs text-slate-500 mb-3">{text.type}</p>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">{text.highlight}</p>
                      <div className="flex flex-wrap gap-3 text-xs mb-4">
                        <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {text.duration}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                          {text.price}
                        </span>
                      </div>
                    </div>
                    <div className="mt-auto pt-3 border-t border-slate-100">
                      <a
                        href={tour.affiliateUrl}
                        rel={outboundRel(tour.affiliateUrl)}
                        target="_blank"
                        className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:shadow-[#1B3A5C]/20 hover:-translate-y-0.5 transition-all min-h-[44px]"
                      >
                        {copy.checkAvailability}
                        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center">
              <a
                href="https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-end"
                rel="noopener noreferrer sponsored"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1A365D] hover:text-[#00D084] transition-colors min-h-[44px]"
              >
                {copy.viewAllTours}
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {activeTab === 'hiking' && (
          <div className="grid sm:grid-cols-2 gap-6">
            {trails.map((trail) => {
              const text = copy.trails[trail.id];
              return (
                <div
                  key={trail.id}
                  className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold text-slate-800">{text.name}</h3>
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-1 rounded-sm text-xs font-bold uppercase tracking-wide shrink-0',
                        difficultyColor[trail.difficulty]
                      )}
                    >
                      {copy.difficulty[trail.difficulty]}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{text.description}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-3 text-xs pt-3 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                      <Ruler className="w-3 h-3" aria-hidden="true" />
                      {text.distance}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                      <TrendingUp className="w-3 h-3" aria-hidden="true" />
                      {text.elevation}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {text.time}
                    </span>
                    {trail.slug && (
                      <Link
                        href={`/travel-guides/trip-reports/${trail.slug}`}
                        className="inline-flex items-center gap-1 ml-auto text-xs font-bold text-[#1A365D] hover:text-[#00D084] transition-colors"
                      >
                        {copy.readGuide}
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'eat' && (
          <div className="grid sm:grid-cols-2 gap-6">
            {copy.restaurants.map((restaurant) => (
              <div
                key={restaurant.name}
                className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1A365D]/10 flex items-center justify-center shrink-0 text-[#1A365D]">
                    <UtensilsCrossed className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-800">{restaurant.name}</h3>
                      {restaurant.norgetravelRating !== undefined && (
                        <span
                          className="inline-flex items-center gap-1 bg-[#1A365D] text-white px-2 py-0.5 rounded-sm text-xs font-bold shrink-0"
                          title={copy.ratingTitle}
                        >
                          <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                          {restaurant.norgetravelRating.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 capitalize">{restaurant.cuisine}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{restaurant.highlight}</p>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-xs text-slate-600 font-medium">
                    {restaurant.priceRange}
                  </span>
                  {restaurant.norgetravelRating !== undefined && (
                    <span className="text-[10px] uppercase tracking-wide text-slate-400 font-medium">
                      {copy.rated}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
