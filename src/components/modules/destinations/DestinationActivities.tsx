'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  ExternalLink,
  Footprints,
  Mountain,
  Ruler,
  Ship,
  Star,
  TrendingUp,
  UtensilsCrossed,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FeaturedActivity {
  title: string;
  image: string;
  alt: string;
  body: string;
  href?: string;
  linkLabel?: string;
  isExternal?: boolean;
}

export interface ActivityTour {
  name: string;
  type: string;
  price: string;
  duration: string;
  highlight: string;
  affiliateUrl: string;
}

export interface ActivityTrail {
  name: string;
  distance: string;
  elevation: string;
  time: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  description: string;
  slug?: string;
}

export interface ActivityRestaurant {
  name: string;
  cuisine: string;
  priceRange: string;
  highlight: string;
  rating?: number;
}

interface Props {
  heading: string;
  intro?: string;
  featured: FeaturedActivity[];
  tours?: ActivityTour[];
  trails?: ActivityTrail[];
  restaurants?: ActivityRestaurant[];
  toursFooterHref?: string;
  toursFooterLabel?: string;
}

const difficultyColor: Record<ActivityTrail['difficulty'], string> = {
  Easy: 'bg-emerald-100 text-emerald-800',
  Moderate: 'bg-amber-100 text-amber-800',
  Hard: 'bg-red-100 text-red-800',
};

export function DestinationActivities({
  heading,
  intro,
  featured,
  tours,
  trails,
  restaurants,
  toursFooterHref,
  toursFooterLabel,
}: Props) {
  const tabs = [
    { id: 'featured' as const, label: 'Featured', icon: Star, enabled: true },
    { id: 'tours' as const, label: 'Tours', icon: Ship, enabled: !!tours?.length },
    { id: 'hiking' as const, label: 'Hiking', icon: Footprints, enabled: !!trails?.length },
    { id: 'eat' as const, label: 'Where to eat', icon: UtensilsCrossed, enabled: !!restaurants?.length },
  ].filter((t) => t.enabled);

  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('featured');

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Mountain className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">{heading}</h2>
      </div>
      {intro && (
        <div className="max-w-3xl mb-8">
          <p className="text-slate-600 leading-relaxed">{intro}</p>
        </div>
      )}

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
              {tab.label}
            </button>
          );
        })}
      </div>

      <div>
        {activeTab === 'featured' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((a) => (
              <article
                key={a.title}
                className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative h-48">
                  <Image
                    src={a.image}
                    alt={a.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-900 mb-2">{a.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">{a.body}</p>
                  {a.href && a.linkLabel && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      {a.isExternal ? (
                        <a
                          href={a.href}
                          rel="noopener noreferrer sponsored"
                          target="_blank"
                          className="inline-flex items-center gap-1 text-sm font-bold text-[#1A365D] hover:text-[#00D084] transition-colors"
                        >
                          {a.linkLabel}
                          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          href={a.href}
                          className="inline-flex items-center gap-1 text-sm font-bold text-[#1A365D] hover:text-[#00D084] transition-colors"
                        >
                          {a.linkLabel}
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'tours' && tours && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {tours.map((tour) => (
                <div
                  key={tour.name}
                  className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1">{tour.name}</h3>
                    <p className="text-xs text-slate-500 mb-3">{tour.type}</p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{tour.highlight}</p>
                    <div className="flex flex-wrap gap-3 text-xs mb-4">
                      <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {tour.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                        {tour.price}
                      </span>
                    </div>
                  </div>
                  <div className="mt-auto pt-3 border-t border-slate-100">
                    <a
                      href={tour.affiliateUrl}
                      rel="noopener noreferrer sponsored"
                      target="_blank"
                      className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:shadow-[#1B3A5C]/20 hover:-translate-y-0.5 transition-all min-h-[44px]"
                    >
                      Check availability
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {toursFooterHref && toursFooterLabel && (
              <div className="text-center">
                <a
                  href={toursFooterHref}
                  rel="noopener noreferrer sponsored"
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#1A365D] hover:text-[#00D084] transition-colors min-h-[44px]"
                >
                  {toursFooterLabel}
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        )}

        {activeTab === 'hiking' && trails && (
          <div className="grid sm:grid-cols-2 gap-6">
            {trails.map((trail) => (
              <div
                key={trail.name}
                className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-slate-800">{trail.name}</h3>
                  <span
                    className={cn(
                      'inline-flex items-center px-2 py-1 rounded-sm text-xs font-bold uppercase tracking-wide shrink-0',
                      difficultyColor[trail.difficulty]
                    )}
                  >
                    {trail.difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{trail.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-3 text-xs pt-3 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                    <Ruler className="w-3 h-3" aria-hidden="true" />
                    {trail.distance}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                    <TrendingUp className="w-3 h-3" aria-hidden="true" />
                    {trail.elevation}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {trail.time}
                  </span>
                  {trail.slug && (
                    <Link
                      href={`/kunnskapsbank/trip-reports/${trail.slug}`}
                      className="inline-flex items-center gap-1 ml-auto text-xs font-bold text-[#1A365D] hover:text-[#00D084] transition-colors"
                    >
                      Read guide
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'eat' && restaurants && (
          <div className="grid sm:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
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
                      {restaurant.rating !== undefined && (
                        <span
                          className="inline-flex items-center gap-1 bg-[#1A365D] text-white px-2 py-0.5 rounded-sm text-xs font-bold shrink-0"
                          title="Google rating (out of 5)"
                        >
                          <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                          {restaurant.rating.toFixed(1)}
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
