'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { MapPin, Trash2, Compass } from 'lucide-react';
import { useTrip } from '@/context/TripContext';
import { useTripMap } from '@/context/TripMapContext';
import type { TripItemCategory } from '@/types/trip';
import { TripCategorySection } from './TripCategorySection';

const CATEGORY_ORDER: TripItemCategory[] = [
  'cities',
  'events',
  'experiences',
  'tours',
  'accommodation',
  'restaurants',
  'transport',
  'guides',
];

export function TripPlannerView() {
  const { items, clearTrip, itemCount } = useTrip();
  const { openMap } = useTripMap();

  const grouped = useMemo(() => {
    const groups: Partial<Record<TripItemCategory, typeof items>> = {};
    for (const item of items) {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category]!.push(item);
    }
    return groups;
  }, [items]);

  const destinations = useMemo(() => {
    const locs = new Set<string>();
    for (const item of items) {
      if (item.location) locs.add(item.location);
      if (item.destination) locs.add(item.destination);
    }
    return Array.from(locs);
  }, [items]);

  const categoriesPresent = CATEGORY_ORDER.filter(
    (cat) => grouped[cat] && grouped[cat]!.length > 0
  );

  // Empty state
  if (itemCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Compass className="w-16 h-16 text-slate-300 mb-6" aria-hidden="true" />
        <h1 className="text-3xl font-bold text-slate-800 mb-3">Your trip is empty</h1>
        <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
          Browse destinations, events, and experiences across Norway. Tap "Add to trip" on anything that catches your eye, and it will appear here.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/destinations/northern-norway"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#1B3A5C] rounded-md hover:bg-[#15304d] transition-colors min-h-[44px]"
          >
            <MapPin className="w-4 h-4" aria-hidden="true" />
            Browse destinations
          </Link>
          <button
            onClick={openMap}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-[#1B3A5C] border border-[#1B3A5C] rounded-md hover:bg-[#1B3A5C]/5 transition-colors min-h-[44px]"
          >
            <Compass className="w-4 h-4" aria-hidden="true" />
            Open trip map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1B3A5C] mb-2">My Trip</h1>
          <p className="text-slate-500 text-sm">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} saved
            {categoriesPresent.length > 0 && (
              <> across {categoriesPresent.length} {categoriesPresent.length === 1 ? 'category' : 'categories'}</>
            )}
          </p>
        </div>
        <button
          onClick={clearTrip}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors min-h-[44px]"
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
          Clear all
        </button>
      </div>

      {/* Trip overview panel */}
      {destinations.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-lg p-5 mb-8">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">
            Trip overview
          </h2>
          <div className="flex flex-wrap gap-2">
            {destinations.slice(0, 10).map((loc) => (
              <span
                key={loc}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm text-xs font-medium bg-slate-100 text-slate-600"
              >
                <MapPin className="w-3 h-3" aria-hidden="true" />
                {loc}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Category sections */}
      {CATEGORY_ORDER.map((cat) => {
        const catItems = grouped[cat];
        if (!catItems || catItems.length === 0) return null;
        return (
          <TripCategorySection key={cat} category={cat} items={catItems} />
        );
      })}
    </div>
  );
}
