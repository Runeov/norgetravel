'use client';

import { useState, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { TravelCard } from './TravelCard';
import { TravelFilters } from './TravelFilters';
import { extractRatings } from '@/lib/ratings';
import type { TravelItemBase, Destination } from '@/lib/schemas/travel.shared';

interface TravelGridProps {
  items: TravelItemBase[];
  showFilters?: boolean;
}

export function TravelGrid({ items, showFilters = true }: TravelGridProps) {
  const [activeDestination, setActiveDestination] = useState<Destination | 'all-items'>('all-items');

  const filteredItems = useMemo(() => {
    if (activeDestination === 'all-items') {
      return items;
    }
    return items.filter(
      (item) => item.destination === activeDestination || item.destination === 'all'
    );
  }, [items, activeDestination]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      {showFilters && (
        <TravelFilters
          activeDestination={activeDestination}
          onDestinationChange={setActiveDestination}
        />
      )}

      {/* Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <TravelCard key={item.id} item={item} ratings={extractRatings(item)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No items found
          </h3>
          <p className="text-slate-500">
            {activeDestination !== 'all-items'
              ? 'Try selecting a different destination.'
              : 'Check back soon for new listings.'}
          </p>
        </div>
      )}
    </div>
  );
}
