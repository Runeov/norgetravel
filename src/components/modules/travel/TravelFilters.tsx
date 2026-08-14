'use client';

import {
  Bike,
  BusFront,
  CarFront,
  Check,
  Map,
  Plane,
  Ship,
  TrainFront,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DESTINATION_LABELS,
  type Destination,
} from '@/lib/schemas/travel.shared';
import type { TransportType } from '@/lib/schemas/travel.transport.schema';
import type { TripItemCategory } from '@/types/trip';
import { trackEvent } from '@/lib/analytics';

interface TravelFiltersProps {
  activeDestination: Destination | 'all-items';
  onDestinationChange: (destination: Destination | 'all-items') => void;
  category?: TripItemCategory;
  activeTransportType?: TransportType | 'all';
  onTransportTypeChange?: (type: TransportType | 'all') => void;
  destinationCounts?: Partial<Record<Destination | 'all-items', number>>;
  availableDestinations?: Destination[];
  transportTypeCounts?: Partial<Record<TransportType | 'all', number>>;
  onReset?: () => void;
}

const transportOptions: {
  value: TransportType | 'all';
  label: string;
  icon: typeof Plane;
}[] = [
  { value: 'all', label: 'All modes', icon: Map },
  { value: 'fly', label: 'Fly', icon: Plane },
  { value: 'train', label: 'Train', icon: TrainFront },
  { value: 'bus', label: 'Bus', icon: BusFront },
  { value: 'ferry', label: 'Ferry', icon: Ship },
  { value: 'car-rental', label: 'Road transfer', icon: CarFront },
  { value: 'bicycle', label: 'Bicycle', icon: Bike },
];

const destinationOrder: (Destination | 'all-items')[] = [
  'all-items',
  'northern-norway',
  'lofoten',
  'fjords',
  'svalbard',
];

export function TravelFilters({
  activeDestination,
  onDestinationChange,
  category,
  activeTransportType = 'all',
  onTransportTypeChange,
  destinationCounts = {},
  availableDestinations = [],
  transportTypeCounts = {},
  onReset,
}: TravelFiltersProps) {
  const isFiltered = activeDestination !== 'all-items' || activeTransportType !== 'all';
  const destinationOptions = destinationOrder.filter(
    (value) =>
      value === 'all-items' ||
      value === activeDestination ||
      availableDestinations.includes(value)
  );
  const visibleTransportOptions = transportOptions.filter(
    (option) => option.value === 'all' || (transportTypeCounts[option.value] ?? 0) > 0
  );

  return (
    <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-[0_18px_60px_rgba(27,58,92,0.08)] sm:p-6">
      {category === 'transport' && onTransportTypeChange && (
        <fieldset>
          <div className="mb-4 flex items-end justify-between gap-4">
            <legend className="text-base font-semibold text-slate-900">How do you want to travel?</legend>
            {isFiltered && onReset && (
              <button
                type="button"
                onClick={onReset}
                className="min-h-11 text-sm font-semibold text-[#1B3A5C] underline decoration-slate-300 underline-offset-4 transition-colors hover:decoration-[#1B3A5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C] focus-visible:ring-offset-2"
              >
                Clear filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {visibleTransportOptions.map((option) => {
              const Icon = option.icon;
              const count = transportTypeCounts[option.value] ?? 0;
              const selected = activeTransportType === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    onTransportTypeChange(option.value);
                    trackEvent('transport_filter_used', {
                      filter: 'transport_type',
                      value: option.value,
                      category,
                    });
                  }}
                  className={cn(
                    'group relative flex min-h-[5.75rem] flex-col items-start justify-between rounded-lg border p-3 text-left transition-[transform,border-color,background-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C] focus-visible:ring-offset-2 active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none',
                    selected
                      ? 'border-[#1B3A5C] bg-[#1B3A5C] text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:-translate-y-0.5 hover:border-[#1B3A5C]/35 hover:bg-white',
                  )}
                >
                  <div className="flex w-full items-start justify-between gap-2">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    {selected && <Check className="h-4 w-4 text-[#7bdcb0]" aria-hidden="true" />}
                  </div>
                  <div className="mt-3 flex w-full items-end justify-between gap-2">
                    <span className="text-sm font-semibold leading-tight">{option.label}</span>
                    <span className={cn('text-xs tabular-nums', selected ? 'text-white/60' : 'text-slate-400')}>
                      {count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      <fieldset className={cn(category === 'transport' && 'mt-5 border-t border-slate-100 pt-5')}>
        <legend className="mb-3 text-sm font-semibold text-slate-700">Region</legend>
        <div className="flex flex-wrap gap-2">
          {destinationOptions.map((value) => {
            const label = value === 'all-items' ? 'All Norway' : DESTINATION_LABELS[value];
            const count = destinationCounts[value] ?? 0;
            const selected = activeDestination === value;

            return (
              <button
                key={value}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  onDestinationChange(value);
                  trackEvent('transport_filter_used', {
                    filter: 'region',
                    value,
                    category,
                  });
                }}
                className={cn(
                  'inline-flex min-h-11 items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-[transform,border-color,background-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C] focus-visible:ring-offset-2 active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none',
                  selected
                    ? 'border-[#1B3A5C] bg-[#e9f2f7] text-[#1B3A5C]'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-[#1B3A5C]/30 hover:text-[#1B3A5C]'
                )}
              >
                {label}
                <span className="text-xs tabular-nums text-slate-400">{count}</span>
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
