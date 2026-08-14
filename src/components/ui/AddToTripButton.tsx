'use client';

import { useTrip } from '@/context/TripContext';
import type { TripItem } from '@/types/trip';
import { cn } from '@/lib/utils';
import { Plus, Check } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

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
      trackEvent('trip_item_removed', {
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        destination: item.destination,
      });
    } else {
      addItem({ ...item, addedAt: new Date().toISOString() });
      trackEvent('trip_item_added', {
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        destination: item.destination,
      });
    }
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md min-h-[44px] transition-[transform,background-color,border-color,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C] focus-visible:ring-offset-2 active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none',
        added
          ? 'bg-[#dff7ea] text-[#11643f] hover:bg-[#c9f0dc]'
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
