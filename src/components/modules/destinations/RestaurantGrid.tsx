'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { RestaurantCard } from './RestaurantCard';
import type { CityRestaurant, CuisineCategory, PricePoint } from '@/types/city-guide';

const INITIAL_COUNT = 4; // desktop shows 4; 4th card hidden on mobile → 3 visible

const CUISINE_LABELS: Record<CuisineCategory, string> = {
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

const PRICE_LABELS: Record<PricePoint, string> = {
  '$': '$ Budget',
  '$$': '$$ Mid-range',
  '$$$': '$$$ Premium',
  '$$$$': '$$$$ Luxury',
};

interface RestaurantGridProps {
  restaurants: CityRestaurant[];
  cityName: string;
}

export function RestaurantGrid({ restaurants, cityName }: RestaurantGridProps) {
  const [activeCuisine, setActiveCuisine] = useState<CuisineCategory | 'all'>('all');
  const [activePrice, setActivePrice] = useState<PricePoint | 'all'>('all');
  const [showAll, setShowAll] = useState(false);

  // Collapse back to preview whenever filters change
  useEffect(() => {
    setShowAll(false);
  }, [activeCuisine, activePrice]);

  const cuisines = Array.from(new Set(restaurants.map((r) => r.cuisine)));

  const filtered = restaurants.filter((r) => {
    const matchesCuisine = activeCuisine === 'all' || r.cuisine === activeCuisine;
    const matchesPrice = activePrice === 'all' || r.pricePoint === activePrice;
    return matchesCuisine && matchesPrice;
  });

  const visibleItems = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hiddenCount = filtered.length - INITIAL_COUNT;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCuisine('all')}
            className={cn(
              'px-4 py-1.5 rounded-sm text-sm font-medium transition-colors min-h-[44px]',
              activeCuisine === 'all'
                ? 'bg-[#1B3A5C] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-[#1B3A5C]/30 hover:text-[#1B3A5C]'
            )}
          >
            All cuisines
          </button>
          {cuisines.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCuisine(c)}
              className={cn(
                'px-4 py-1.5 rounded-sm text-sm font-medium transition-colors min-h-[44px]',
                activeCuisine === c
                  ? 'bg-[#1B3A5C] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-[#1B3A5C]/30 hover:text-[#1B3A5C]'
              )}
            >
              {CUISINE_LABELS[c]}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActivePrice('all')}
            className={cn(
              'px-4 py-1.5 rounded-sm text-sm font-medium transition-colors min-h-[44px]',
              activePrice === 'all'
                ? 'bg-[#1B3A5C] text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-[#1B3A5C]/30 hover:text-[#1B3A5C]'
            )}
          >
            All prices
          </button>
          {(['$', '$$', '$$$', '$$$$'] as PricePoint[]).map((p) => (
            <button
              key={p}
              onClick={() => setActivePrice(p)}
              className={cn(
                'px-4 py-1.5 rounded-sm text-sm font-medium transition-colors min-h-[44px]',
                activePrice === p
                  ? 'bg-[#1B3A5C] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-[#1B3A5C]/30 hover:text-[#1B3A5C]'
              )}
            >
              {PRICE_LABELS[p]}
            </button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-slate-400 mb-6">
        Google ratings updated automatically every 24 hours. NorgeTravel earns no commission on
        restaurant reservations.
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 gap-6">
            {visibleItems.map((r, index) => (
              <div
                key={r.id}
                // 4th card (index 3) is hidden on mobile — gives 3 on mobile, 4 on desktop
                className={!showAll && index === INITIAL_COUNT - 1 ? 'hidden sm:block' : undefined}
              >
                <RestaurantCard restaurant={r} />
              </div>
            ))}
          </div>

          {/* View more / Show fewer */}
          <div className="mt-8 flex justify-center">
            {!showAll && hiddenCount > 0 && (
              <button
                onClick={() => setShowAll(true)}
                className="px-6 py-2.5 rounded-sm text-sm font-medium min-h-[44px] bg-white border border-slate-200 text-slate-600 hover:border-[#1B3A5C]/30 hover:text-[#1B3A5C] transition-colors"
              >
                View {hiddenCount} more {cityName} restaurants
              </button>
            )}
            {showAll && filtered.length > INITIAL_COUNT && (
              <button
                onClick={() => setShowAll(false)}
                className="px-6 py-2.5 rounded-sm text-sm font-medium min-h-[44px] bg-white border border-slate-200 text-slate-600 hover:border-[#1B3A5C]/30 hover:text-[#1B3A5C] transition-colors"
              >
                Show fewer
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-slate-500">
          No {cityName} restaurants match that filter. Try a different combination.
        </div>
      )}
    </div>
  );
}
