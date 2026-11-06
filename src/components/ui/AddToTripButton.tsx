'use client';

import { useTrip } from '@/context/TripContext';
import type { TripItem } from '@/types/trip';
import { cn } from '@/lib/utils';
import { Plus, Check } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { fmt } from '@/i18n/format';
import { usePlanCopy } from '@/components/modules/plan/PlanCopy';

interface AddToTripButtonProps {
  item: TripItem;
  className?: string;
  /** Tighter padding and smaller text for dense cards. Keeps the 44 px tap height. */
  compact?: boolean;
}

export function AddToTripButton({ item, className, compact = false }: AddToTripButtonProps) {
  const { addItem, removeItem, isInTrip } = useTrip();
  const text = usePlanCopy().add;
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
        'inline-flex items-center justify-center gap-1.5 font-medium rounded-md min-h-[44px] transition-[transform,background-color,border-color,color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plan-accent focus-visible:ring-offset-2 active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none',
        compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
        added
          ? 'bg-plan-added text-plan-on-added hover:bg-plan-added-hover'
          : 'border border-plan-accent text-plan-accent hover:bg-plan-accent/5',
        className
      )}
      aria-label={fmt(added ? text.removeLabel : text.addLabel, { name: item.name })}
    >
      {added ? (
        <>
          <Check className="w-4 h-4" aria-hidden="true" />
          {text.added}
        </>
      ) : (
        <>
          <Plus className="w-4 h-4" aria-hidden="true" />
          {text.add}
        </>
      )}
    </button>
  );
}
