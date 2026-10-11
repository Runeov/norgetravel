'use client';

import Link from '@/components/LocalizedLink';
import { ArrowRight, Bookmark, Map as MapIcon } from 'lucide-react';
import { useTrip } from '@/context/TripContext';
import { useTripMap } from '@/context/TripMapContext';

/** Saved-item count with the way to the saved trip and to the quick map. Sits on the dark hero of the plan pages. */
export function TripSummaryBar() {
  const { itemCount } = useTrip();
  const { openMap } = useTripMap();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href="/my-trip"
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#1B3A5C] shadow-sm transition-shadow hover:shadow-md"
      >
        <Bookmark className="h-4 w-4" aria-hidden="true" />
        {itemCount === 0 ? 'Nothing saved yet' : `${itemCount} saved in your trip`}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <button
        type="button"
        onClick={openMap}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/40 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
      >
        <MapIcon className="h-4 w-4" aria-hidden="true" />
        Open the map
      </button>
    </div>
  );
}
