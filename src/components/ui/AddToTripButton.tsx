'use client';

import { useTrip } from '@/context/TripContext';
import type { TripItem } from '@/types/trip';
import { cn } from '@/lib/utils';
import { Plus, Check } from 'lucide-react';

interface AddToTripButtonProps {
  item: TripItem;
  className?: string;
}

export function AddToTripButton({ item, className }: AddToTripButtonProps) {
  const { addItem, removeItem, isInTrip } = useTrip();
  const added = isInTrip(item.id);

  function handleClick() {
    if (added) {
      removeItem(item.id);
    } else {
      addItem({ ...item, addedAt: new Date().toISOString() });
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md min-h-[44px] transition-colors',
        added
          ? 'bg-[#00CC6A] text-white hover:bg-[#00b35e]'
          : 'border border-[#1B3A5C] text-[#1B3A5C] hover:bg-[#1B3A5C]/5',
        className
      )}
      aria-label={added ? `Remove ${item.name} from trip` : `Add ${item.name} to trip`}
    >
      {added ? (
        <>
          <Check className="w-4 h-4" aria-hidden="true" />
          Added
        </>
      ) : (
        <>
          <Plus className="w-4 h-4" aria-hidden="true" />
          Add to trip
        </>
      )}
    </button>
  );
}
