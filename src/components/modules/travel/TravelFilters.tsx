'use client';

import { cn } from '@/lib/utils';
import {
  DESTINATION_LABELS,
  DESTINATION_EMOJIS,
  type Destination,
} from '@/lib/schemas/travel.shared';

interface TravelFiltersProps {
  activeDestination: Destination | 'all-items';
  onDestinationChange: (destination: Destination | 'all-items') => void;
}

const filterPills: { value: Destination | 'all-items'; label: string; emoji: string }[] = [
  { value: 'all-items', label: 'All', emoji: '🇳🇴' },
  ...Object.entries(DESTINATION_LABELS)
    .filter(([key]) => key !== 'all')
    .map(([key, label]) => ({
      value: key as Destination,
      label,
      emoji: DESTINATION_EMOJIS[key as Destination],
    })),
];

export function TravelFilters({ activeDestination, onDestinationChange }: TravelFiltersProps) {
  return (
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
  );
}
