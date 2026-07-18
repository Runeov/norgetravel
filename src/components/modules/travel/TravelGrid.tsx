'use client';

import React, { useState, useMemo } from 'react';
import { MapPin } from 'lucide-react';
import { TravelCard } from './TravelCard';
import { TravelFilters } from './TravelFilters';
import { extractRatings } from '@/lib/ratings';
import type { TravelItemBase, Destination } from '@/lib/schemas/travel.shared';
import type { TransportType } from '@/lib/schemas/travel.transport.schema';
import type { TripItemCategory } from '@/types/trip';
import { AviasalesWidget } from '@/components/ui/AviasalesWidget';

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
                <div className="lg:col-span-2 xl:col-span-3 bg-white border border-slate-200 rounded-xl p-6 shadow-sm my-4">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Check flight prices</h3>
                    <p className="text-sm text-slate-500">Search direct and connecting flights to Norway to start planning your route.</p>
                  </div>
                  <AviasalesWidget
                    scriptSrc="https://tpwgt.com/content?currency=usd&trs=514175&shmarker=715596&color_button=%23FF0000&target_host=www.aviasales.com%2Fsearch&locale=en&powered_by=true&origin=LON&destination=OSL&with_fallback=false&non_direct_flights=true&min_lines=5&border_radius=0&color_background=%23ffffff&color_text=%23000000&color_border=%23FFFFFF&promo_id=2811&campaign_id=100"
                    className="w-full"
                  />
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
