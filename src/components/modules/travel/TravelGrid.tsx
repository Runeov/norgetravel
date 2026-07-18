'use client';

import React, { useState, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { TravelCard } from './TravelCard';
import { TravelFilters } from './TravelFilters';
import { extractRatings } from '@/lib/ratings';
import type { TravelItemBase, Destination } from '@/lib/schemas/travel.shared';
import type { TransportType } from '@/lib/schemas/travel.transport.schema';
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
    let result = items;
    
    if (activeDestination !== 'all-items') {
      result = result.filter((item) => item.destination === activeDestination);
    }
    
    if (category === 'transport' && activeTransportType !== 'all') {
      result = result.filter((item) => (item as any).transportType === activeTransportType);
    }
    
    return result;
  }, [items, activeDestination, activeTransportType, category]);

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
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <TravelCard item={item} ratings={extractRatings(item)} category={category} />
              
              {/* Inject the widget in the middle of the transport list (after 3rd item or at end if less than 3) */}
              {category === 'transport' && 
               ((filteredItems.length >= 3 && index === 2) || (filteredItems.length < 3 && index === filteredItems.length - 1)) && (
                <div className="lg:col-span-2 xl:col-span-3 my-4">
                  <KiwiFlightBanner />
                </div>
              )}
            </React.Fragment>
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
