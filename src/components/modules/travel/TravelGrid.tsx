'use client';

import React, { useState, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { TravelCard } from './TravelCard';
import { TravelFilters } from './TravelFilters';
import { extractRatings } from '@/lib/ratings';
import type { TravelItemBase, Destination } from '@/lib/schemas/travel.shared';
import {
  TRANSPORT_TYPE_LABELS,
  type Transport,
  type TransportType,
} from '@/lib/schemas/travel.transport.schema';
import type { TripItemCategory } from '@/types/trip';
import { KiwiFlightBanner } from '@/components/ui/KiwiFlightBanner';

interface TravelGridProps {
  items: TravelItemBase[];
  showFilters?: boolean;
  category?: TripItemCategory;
}

export function TravelGrid({ items, showFilters = true, category }: TravelGridProps) {
  const [activeDestination, setActiveDestination] = useState<Destination | 'all-items'>('all-items');
  const [activeTransportType, setActiveTransportType] = useState<TransportType | 'all'>('all');

  const filteredItems = useMemo(() => {
    // Protect the public listing from repeated records without merging distinct
    // routes that happen to share an operator.
    const seen = new Set<string>();
    let result = items.filter((item) => {
      const transport = item as Partial<Transport>;
      const identity = [
        item.name,
        transport.operator,
        transport.routeFrom,
        transport.routeTo,
      ]
        .filter(Boolean)
        .join('|')
        .toLocaleLowerCase();

      if (seen.has(item.id) || seen.has(identity)) return false;
      seen.add(item.id);
      seen.add(identity);
      return true;
    });
    
    if (activeDestination !== 'all-items') {
      result = result.filter((item) => item.destination === activeDestination);
    }
    
    if (category === 'transport' && activeTransportType !== 'all') {
      result = result.filter((item) => (item as any).transportType === activeTransportType);
    }
    
    return result;
  }, [items, activeDestination, activeTransportType, category]);

  const transportGroups = useMemo(() => {
    if (category !== 'transport') return [];

    return (Object.keys(TRANSPORT_TYPE_LABELS) as TransportType[])
      .map((type) => ({
        type,
        label: TRANSPORT_TYPE_LABELS[type],
        items: filteredItems.filter(
          (item) => (item as Transport).transportType === type
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [category, filteredItems]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      {showFilters && (
        <TravelFilters
          activeDestination={activeDestination}
          onDestinationChange={setActiveDestination}
          category={category}
          activeTransportType={activeTransportType}
          onTransportTypeChange={setActiveTransportType}
        />
      )}

      {/* Grid */}
      {filteredItems.length > 0 ? (
        category === 'transport' ? (
          <div className="space-y-14">
            {transportGroups.map((group) => (
              <section key={group.type} aria-labelledby={`transport-${group.type}`}>
                <div className="mb-5 flex items-end justify-between gap-4 border-b border-slate-200 pb-3">
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Transport options
                    </p>
                    <h2 id={`transport-${group.type}`} className="text-2xl font-semibold tracking-tight text-slate-900">
                      {group.label}
                    </h2>
                  </div>
                  <span className="text-sm tabular-nums text-slate-500">
                    {group.items.length} {group.items.length === 1 ? 'listing' : 'listings'}
                  </span>
                </div>
                <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((item) => (
                    <TravelCard key={item.id} item={item} ratings={extractRatings(item)} category={category} />
                  ))}
                </div>
                {group.type === 'fly' && (
                  <div className="mt-8">
                    <KiwiFlightBanner />
                  </div>
                )}
              </section>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <TravelCard key={item.id} item={item} ratings={extractRatings(item)} category={category} />
            ))}
          </div>
        )
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
