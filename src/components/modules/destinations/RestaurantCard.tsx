'use client';

import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CityRestaurant, MichelinDistinction } from '@/types/city-guide';
import { AddToTripButton } from '@/components/ui/AddToTripButton';

function MichelinBadge({ distinction }: { distinction: MichelinDistinction }) {
  if (distinction.type === 'none') return null;
  if (distinction.type === 'stars') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-bold bg-red-600 text-white">
        {'★'.repeat(distinction.count)} Michelin
      </span>
    );
  }
  if (distinction.type === 'bib-gourmand') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-bold bg-red-100 text-red-700 border border-red-200">
        BIB Michelin
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-bold bg-red-50 text-red-600 border border-red-100">
      Michelin Selected
    </span>
  );
}

function TripAdvisorBubbles({ count }: { count: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'w-2.5 h-2.5 rounded-full',
            i < count ? 'bg-[#00AA6C]' : 'bg-slate-200'
          )}
        />
      ))}
    </span>
  );
}

const DICE_COLORS: Record<number, string> = {
  1: 'bg-red-500 text-white',
  2: 'bg-orange-400 text-white',
  3: 'bg-amber-400 text-slate-900',
  4: 'bg-lime-500 text-white',
  5: 'bg-emerald-500 text-white',
  6: 'bg-[#1B3A5C] text-white',
};

const DICE_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Below average',
  3: 'Average',
  4: 'Good',
  5: 'Very good',
  6: 'Exceptional',
};

function DiceScore({ score }: { score: number }) {
  const color = DICE_COLORS[score] ?? 'bg-slate-400 text-white';
  const label = DICE_LABELS[score] ?? '';
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          'inline-flex items-center justify-center w-8 h-8 rounded-md text-sm font-black',
          color
        )}
        aria-label={`Dice score ${score} of 6`}
      >
        {score}
      </span>
      <span className="text-xs font-medium text-slate-500">{label}</span>
    </div>
  );
}

const CUISINE_LABELS: Record<string, string> = {
  norwegian: 'Norwegian',
  seafood: 'Seafood',
  sami: 'Sami',
  international: 'International',
  'fine-dining': 'Fine Dining',
  cafe: 'Café',
  bakery: 'Bakery',
  pub: 'Pub',
  local: 'Local Arctic',
};

interface RestaurantCardProps {
  restaurant: CityRestaurant;
}

export function RestaurantCard({ restaurant: r }: RestaurantCardProps) {
  return (
    <article className="bg-white border border-slate-200 rounded-lg p-6 flex flex-col">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-semibold uppercase tracking-wide bg-[#1B3A5C]/10 text-[#1B3A5C]">
            {CUISINE_LABELS[r.cuisine] ?? r.cuisine}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-semibold bg-slate-100 text-slate-700">
            {r.pricePoint}
            {r.averageMealPrice && (
              <span className="ml-1 font-normal text-slate-500">· {r.averageMealPrice}</span>
            )}
          </span>
          {r.ratings.michelin && <MichelinBadge distinction={r.ratings.michelin} />}
        </div>
      </div>

      {/* Name */}
      <h3 className="text-xl font-bold text-slate-800 mb-1">{r.name}</h3>

      {/* Meta */}
      <p className="text-sm text-slate-500 mb-3">
        {r.neighbourhood && <span>{r.neighbourhood} · </span>}
        <span>{r.openingHours}</span>
      </p>

      {/* Description */}
      <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">{r.description}</p>

      {/* Must order */}
      {r.mustOrder && r.mustOrder.length > 0 && (
        <p className="text-xs text-slate-500 mb-4">
          <span className="font-semibold text-slate-700">Must order: </span>
          {r.mustOrder.join(' · ')}
        </p>
      )}

      {/* Dice score + ratings */}
      <div className="border border-slate-100 rounded-md p-3 mb-4 space-y-2">
        {r.diceScore != null && (
          <div className="flex items-center justify-between mb-1 pb-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">NorgeTravel Score</span>
            <DiceScore score={r.diceScore} />
          </div>
        )}
        {r.ratings.google && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Google</span>
            <span className="font-semibold text-slate-800">
              ★ {r.ratings.google.score.toFixed(1)}
              <span className="font-normal text-slate-400 ml-1">
                ({r.ratings.google.reviewCount.toLocaleString()})
              </span>
            </span>
          </div>
        )}
        {r.ratings.tripAdvisor && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">TripAdvisor</span>
            <div className="flex items-center gap-2">
              <TripAdvisorBubbles count={r.ratings.tripAdvisor.bubbleRating} />
              <span className="text-slate-400 text-xs">
                ({r.ratings.tripAdvisor.reviewCount.toLocaleString()})
              </span>
            </div>
          </div>
        )}
        {r.ratings.yelp && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Yelp</span>
            <span className="font-semibold text-slate-800">
              ★ {r.ratings.yelp.score.toFixed(1)}
              <span className="font-normal text-slate-400 ml-1">
                ({r.ratings.yelp.reviewCount.toLocaleString()})
              </span>
            </span>
          </div>
        )}
        {r.ratings.facebook && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Facebook</span>
            <span className="font-semibold text-slate-800">
              ★ {r.ratings.facebook.score.toFixed(1)}
              <span className="font-normal text-slate-400 ml-1">
                ({r.ratings.facebook.reviewCount.toLocaleString()})
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
        <AddToTripButton
          item={{
            id: r.id,
            name: r.name,
            category: 'restaurants',
            location: r.address,
            addedAt: '',
          }}
        />
        {r.reservationUrl ? (
          <a
            href={r.reservationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B3A5C] hover:text-[#00CC6A] transition-colors min-h-[44px]"
          >
            Reserve a table
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        ) : r.website ? (
          <a
            href={r.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#1B3A5C] hover:text-[#00CC6A] transition-colors min-h-[44px]"
          >
            View website
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
