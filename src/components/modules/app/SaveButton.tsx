'use client';

import { Bookmark, BookmarkCheck, Check, Plus } from 'lucide-react';
import { useTrip } from '@/context/TripContext';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { fmt } from '@/i18n/format';
import type { TripItemCategory } from '@/types/trip';
import type { Listing, ListingKind } from '@/lib/app/model';
import { useAppCopy } from './AppCopy';

// Trip categories the rest of the site already uses for these records.
const TRIP_CATEGORY: Record<ListingKind, TripItemCategory> = {
  events: 'events',
  tours: 'experiences',
  stays: 'accommodation',
  eat: 'restaurants',
};

export type SaveTarget = Pick<
  Listing,
  'kind' | 'id' | 'name' | 'href' | 'imageUrl' | 'place' | 'priceRange' | 'destination' | 'zone' | 'startDate' | 'endDate'
>;

/**
 * Saves a listing to the visitor's trip, the same list the planner and
 * My trip page read. "icon" is the bookmark on cards; "pill" is the gold
 * button on detail pages.
 */
export function SaveButton({
  target,
  variant = 'icon',
  className,
}: {
  target: SaveTarget;
  variant?: 'icon' | 'pill';
  className?: string;
}) {
  const { addItem, removeItem, isInTrip } = useTrip();
  const { save } = useAppCopy();
  const saved = isInTrip(target.id);
  const category = TRIP_CATEGORY[target.kind];

  function toggle() {
    if (saved) {
      removeItem(target.id);
      trackEvent('trip_item_removed', { item_id: target.id, item_name: target.name, category, destination: target.destination });
      return;
    }
    addItem({
      id: target.id,
      name: target.name,
      category,
      imageUrl: target.imageUrl ?? null,
      location: target.place,
      priceRange: target.priceRange,
      destination: target.destination,
      ...(target.zone && { zone: target.zone }),
      ...(target.startDate && { startDate: target.startDate }),
      ...(target.endDate && { endDate: target.endDate }),
      href: target.href,
      addedAt: new Date().toISOString(),
    });
    trackEvent('trip_item_added', { item_id: target.id, item_name: target.name, category, destination: target.destination });
  }

  const label = fmt(saved ? save.remove : save.add, { name: target.name });

  if (variant === 'pill') {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-pressed={saved}
        aria-label={label}
        className={cn(
          'inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-full px-5 text-sm font-semibold transition-[filter,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg',
          saved ? 'border border-app-gold/60 bg-app-gold/10 text-app-accent' : 'app-gold-fill hover:brightness-105',
          className
        )}
      >
        {saved ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
        {saved ? save.pillIn : save.pillAdd}
      </button>
    );
  }

  const Icon = saved ? BookmarkCheck : Bookmark;
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={saved}
      aria-label={label}
      className={cn(
        'inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent',
        saved ? 'text-app-accent' : 'text-app-ink/80 hover:bg-app-ink/10 hover:text-app-ink',
        className
      )}
    >
      <Icon className="h-5 w-5" fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
    </button>
  );
}
