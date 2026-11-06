'use client';

import { ArrowRight, Check, Plus } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { useTrip } from '@/context/TripContext';
import { cn } from '@/lib/utils';
import { fmt } from '@/i18n/format';
import { useAppCopy } from './AppCopy';

export interface PlanZoneCard {
  id: string;
  name: string;
  tagline: string;
  color: string;
  counts: { experiences: number; stays: number; events: number; articles: number };
  /** The app feed for this destination, where the app has one. */
  browseHref?: string;
}

/**
 * The planner's destinations as app cards. "Add to plan" sets the region in
 * the trip basics, the same switch as the "Where" chips above; "Browse" opens
 * the feed for that region to save things from.
 */
export function PlanZones({ zones }: { zones: PlanZoneCard[] }) {
  const { profile, updateProfile } = useTrip();
  const { planZones: text } = useAppCopy();

  const toggle = (id: string) => {
    const has = profile.zones.includes(id);
    updateProfile({ zones: has ? profile.zones.filter((z) => z !== id) : [...profile.zones, id] });
  };

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {zones.map((zone) => {
        const active = profile.zones.includes(zone.id);
        return (
          <li
            key={zone.id}
            className={cn(
              'flex flex-col rounded-[20px] border bg-app-panel/85 p-4 backdrop-blur transition-colors',
              active ? 'border-app-gold/70' : 'border-app-line/15'
            )}
          >
            <div className="flex items-center gap-2.5">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: zone.color }} aria-hidden="true" />
              <h3 className="font-display text-lg font-bold text-app-ink">{zone.name}</h3>
            </div>
            <p className="mt-1 text-sm text-app-ink/75">{zone.tagline}</p>
            <p className="mt-2 text-xs text-app-ink/60">
              {fmt(text.counts, zone.counts)}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
              <button
                type="button"
                onClick={() => toggle(zone.id)}
                aria-pressed={active}
                className={cn(
                  'inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition-[filter,background-color] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent',
                  active ? 'border border-app-gold/60 bg-app-gold/10 text-app-accent' : 'app-gold-fill hover:brightness-105'
                )}
              >
                {active ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                {active ? text.inPlan : text.add}
              </button>
              {zone.browseHref && (
                <Link
                  href={zone.browseHref}
                  className="inline-flex min-h-[40px] items-center gap-1 rounded-full px-3 text-sm font-semibold text-app-ink/85 hover:text-app-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
                >
                  {text.browse}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
