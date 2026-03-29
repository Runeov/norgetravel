'use client';

import { cn } from '@/lib/utils';
import {
  DESTINATION_LABELS,
  type Destination,
} from '@/lib/schemas/travel.shared';

interface DestinationFilterProps {
  value: Destination | 'all-items';
  onChange: (value: Destination | 'all-items') => void;
}

const filterOptions: { value: Destination | 'all-items'; label: string }[] = [
  { value: 'all-items', label: 'All Destinations' },
  ...Object.entries(DESTINATION_LABELS)
    .filter(([key]) => key !== 'all')
    .map(([key, label]) => ({
      value: key as Destination,
      label,
    })),
];

export function DestinationFilter({ value, onChange }: DestinationFilterProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Destination | 'all-items')}
      className={cn(
        'px-4 py-2 rounded-full text-sm font-medium border border-slate-200',
        'bg-white text-slate-700',
        'focus:outline-none focus:ring-2 focus:ring-[#1B3A5C] focus:border-transparent',
        'transition-all duration-300 cursor-pointer'
      )}
    >
      {filterOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
