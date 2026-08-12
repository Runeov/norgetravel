'use client';

import React, { useMemo, useState } from 'react';
import { MapPin, RotateCcw } from 'lucide-react';
import { TravelCard } from './TravelCard';
import { TravelFilters } from './TravelFilters';
import { TransportCard } from './TransportCard';
import { extractRatings } from '@/lib/ratings';
import type { TravelItemBase, Destination } from '@/lib/schemas/travel.shared';
import {
  type Transport,
  type TransportType,
} from '@/lib/schemas/travel.transport.schema';
import type { TripItemCategory } from '@/types/trip';
import { CommercialOfferPanel } from '@/components/commerce/CommercialOfferPanel';
import type { CommercialOffer } from '@/lib/schemas/commercial-offer.schema';

interface TravelGridProps {
  items: TravelItemBase[];
  showFilters?: boolean;
  category?: TripItemCategory;
  commercialOffers?: CommercialOffer[];
}

const transportOrder: TransportType[] = [
  'train',
  'ferry',
  'bus',
  'fly',
  'car-rental',
  'bicycle',
];

const transportGroupCopy: Record<
  TransportType,
  { title: string; description: string }
> = {
  train: {
    title: 'Rail journeys',
    description: 'Long-distance lines and scenic connections where the view is part of the ticket.',
  },
  ferry: {
    title: 'Ferries and coastal routes',
    description: 'Cross-fjord links, express boats, and longer voyages along the Norwegian coast.',
  },
  bus: {
    title: 'Buses and coaches',
    description: 'Regional services for places the rail network does not reach.',
  },
  fly: {
    title: 'Flights',
    description: 'Domestic and regional air links for Norway’s longest distances.',
  },
  'car-rental': {
    title: 'Road transfers',
    description: 'Private transfers, taxis, and flexible road connections for the final stretch.',
  },
  bicycle: {
    title: 'Cycling routes',
    description: 'Self-powered routes for slower travel through the landscape.',
  },
};

function deduplicateItems(items: TravelItemBase[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
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
}

export function TravelGrid({
  items,
  showFilters = true,
  category,
  commercialOffers = [],
}: TravelGridProps) {
  const [activeDestination, setActiveDestination] = useState<Destination | 'all-items'>('all-items');
  const [activeTransportType, setActiveTransportType] = useState<TransportType | 'all'>('all');

  const uniqueItems = useMemo(() => deduplicateItems(items), [items]);

  const destinationCounts = useMemo(() => {
    const counts: Partial<Record<Destination | 'all-items', number>> = {
      'all-items': uniqueItems.length,
    };

    (['northern-norway', 'lofoten', 'fjords', 'svalbard'] as Destination[]).forEach((destination) => {
      counts[destination] = uniqueItems.filter(
        (item) => item.destination === destination || item.destination === 'all'
      ).length;
    });

    return counts;
  }, [uniqueItems]);

  const availableDestinations = useMemo(
    () =>
      (['northern-norway', 'lofoten', 'fjords', 'svalbard'] as Destination[]).filter(
        (destination) => uniqueItems.some((item) => item.destination === destination)
      ),
    [uniqueItems]
  );

  const transportTypeCounts = useMemo(() => {
    if (category !== 'transport') return {};

    const relevantItems = uniqueItems.filter(
      (item) =>
        activeDestination === 'all-items' ||
        item.destination === activeDestination ||
        item.destination === 'all'
    );
    const counts: Partial<Record<TransportType | 'all', number>> = {
      all: relevantItems.length,
    };

    transportOrder.forEach((type) => {
      counts[type] = relevantItems.filter(
        (item) => (item as Transport).transportType === type
      ).length;
    });

    return counts;
  }, [activeDestination, category, uniqueItems]);

  const filteredItems = useMemo(() => {
    let result = uniqueItems;

    if (activeDestination !== 'all-items') {
      result = result.filter(
        (item) => item.destination === activeDestination || item.destination === 'all'
      );
    }

    if (category === 'transport' && activeTransportType !== 'all') {
      result = result.filter(
        (item) => (item as Transport).transportType === activeTransportType
      );
    }

    return result;
  }, [uniqueItems, activeDestination, activeTransportType, category]);

  const transportGroups = useMemo(() => {
    if (category !== 'transport') return [];

    return transportOrder
      .map((type) => ({
        type,
        ...transportGroupCopy[type],
        items: filteredItems.filter(
          (item) => (item as Transport).transportType === type
        ) as Transport[],
      }))
      .filter((group) => group.items.length > 0);
  }, [category, filteredItems]);

  function resetFilters() {
    setActiveDestination('all-items');
    setActiveTransportType('all');
  }

  return (
    <div>
      {showFilters && (
        <div className="mb-10">
          <TravelFilters
            activeDestination={activeDestination}
            onDestinationChange={setActiveDestination}
            category={category}
            activeTransportType={activeTransportType}
            onTransportTypeChange={setActiveTransportType}
            destinationCounts={destinationCounts}
            availableDestinations={availableDestinations}
            transportTypeCounts={transportTypeCounts}
            onReset={resetFilters}
          />
        </div>
      )}

      <p className="mb-8 text-sm font-medium text-slate-500" role="status" aria-live="polite">
        Showing <span className="font-semibold tabular-nums text-slate-900">{filteredItems.length}</span>{' '}
        {filteredItems.length === 1 ? 'transport option' : 'transport options'}
      </p>

      {filteredItems.length > 0 ? (
        category === 'transport' ? (
          <div className="space-y-16">
            {transportGroups.map((group) => (
              <section key={group.type} aria-labelledby={`transport-${group.type}`}>
                <div className="mb-6 max-w-2xl">
                  <div className="flex items-baseline gap-3">
                    <h2
                      id={`transport-${group.type}`}
                      className="text-3xl font-semibold tracking-[-0.035em] text-slate-900 sm:text-4xl"
                    >
                      {group.title}
                    </h2>
                    <span className="text-sm tabular-nums text-slate-400">{group.items.length}</span>
                  </div>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">
                    {group.description}
                  </p>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(27,58,92,0.06)] divide-y divide-slate-200">
                  {group.items.map((item) => (
                    <TransportCard key={item.id} item={item} />
                  ))}
                </div>

                {group.type === 'fly' &&
                  commercialOffers.map((offer) => (
                    <div key={offer.id} className="mt-6">
                      <CommercialOfferPanel
                        offer={offer}
                        placement="transport_after_flights"
                      />
                    </div>
                  ))}
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
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
          <MapPin className="mx-auto h-10 w-10 text-slate-300" aria-hidden="true" />
          <h3 className="mt-4 text-xl font-semibold text-slate-900">No matching routes</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
            Try another travel mode or include more of Norway in your search.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#1B3A5C] px-4 py-2 text-sm font-semibold text-white transition-[transform,background-color] hover:bg-[#112a45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C] focus-visible:ring-offset-2 active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Show all options
          </button>
        </div>
      )}
    </div>
  );
}
