'use client';

import { cn } from '@/lib/utils';
import {
  DESTINATION_LABELS,
  DESTINATION_EMOJIS,
  type Destination,
} from '@/lib/schemas/travel.shared';
import { TRANSPORT_TYPE_LABELS, type TransportType } from '@/lib/schemas/travel.transport.schema';
import type { TripItemCategory } from '@/types/trip';

interface TravelFiltersProps {
  activeDestination: Destination | 'all-items';
  onDestinationChange: (destination: Destination | 'all-items') => void;
  category?: TripItemCategory;
  activeTransportType?: TransportType | 'all';
  onTransportTypeChange?: (type: TransportType | 'all') => void;
}

const filterPills: { value: Destination | 'all-items'; label: string; emoji: string }[] = [
  { value: 'all-items', label: 'All Regions', emoji: '🇳🇴' },
  ...Object.entries(DESTINATION_LABELS)
    .filter(([key]) => key !== 'all')
    .map(([key, label]) => ({
      value: key as Destination,
      label,
      emoji: DESTINATION_EMOJIS[key as Destination],
    })),
];

const transportPills: { value: TransportType | 'all'; label: string }[] = [
  { value: 'all', label: '🌍 All Types' },
  ...Object.entries(TRANSPORT_TYPE_LABELS).map(([key, label]) => ({
    value: key as TransportType,
    label,
  })),
];

export function TravelFilters({ 
  activeDestination, 
  onDestinationChange,
  category,
  activeTransportType = 'all',
  onTransportTypeChange,
}: TravelFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Primary Row: Destinations */}
      <div className="flex flex-wrap gap-2 justify-center">
        {filterPills.map((pill) => (
          <button
            key={pill.value}
            onClick={() => onDestinationChange(pill.value)}
            className={cn(
              'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
              activeDestination === pill.value
                ? 'bg-[#1B3A5C] text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-[#1B3A5C]/30 hover:text-[#1B3A5C]'
            )}
          >
            <span>{pill.emoji}</span>
            {pill.label}
          </button>
        ))}
      </div>

      {/* Secondary Row: Transport Types */}
      {category === 'transport' && onTransportTypeChange && (
        <div className="flex flex-wrap gap-2 justify-center pt-2">
          {transportPills.map((pill) => (
            <button
              key={pill.value}
              onClick={() => onTransportTypeChange(pill.value)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                activeTransportType === pill.value
                  ? 'bg-sky-100 text-sky-800 border-sky-200 shadow-sm'
                  : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-800'
              )}
            >
              {pill.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
