'use client';

import { Building2, Mountain, Ship, Snowflake, Sparkles, Waves } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { mapZones } from '@/data/norway-map-zones';
import { cn } from '@/lib/utils';

export const ZONE_ICONS: Record<string, LucideIcon> = {
  'northern-norway': Sparkles,
  lofoten: Mountain,
  fjords: Waves,
  svalbard: Snowflake,
  cities: Building2,
  'boat-routes': Ship,
};

/** Names short enough to sit under a 44 px circle. */
const SHORT_NAMES: Record<string, string> = {
  'northern-norway': 'North',
  lofoten: 'Lofoten',
  fjords: 'Fjords',
  svalbard: 'Svalbard',
  cities: 'Cities',
  'boat-routes': 'By boat',
};

interface ZoneSwitcherProps {
  activeId: string | null;
  onSelect: (zoneId: string) => void;
  /** `row` for a header strip, `grid` for a 3 by 2 block beside a heading. */
  layout?: 'row' | 'grid';
  /** Zone ids to show, in map order. Defaults to every zone. */
  zoneIds?: string[];
  className?: string;
}

/**
 * Six round destination buttons. Shows the whole set at once so a visitor
 * sees there is more than the region they tapped, and can jump without
 * going back to the map.
 */
export function ZoneSwitcher({ activeId, onSelect, layout = 'row', zoneIds, className }: ZoneSwitcherProps) {
  const zones = zoneIds ? mapZones.filter((zone) => zoneIds.includes(zone.id)) : mapZones;

  return (
    <nav
      aria-label="Destinations"
      className={cn(layout === 'grid' ? 'grid grid-cols-3 gap-1' : 'flex flex-wrap items-start gap-1', className)}
    >
      {zones.map((zone) => {
        const Icon = ZONE_ICONS[zone.id] ?? Sparkles;
        const isActive = zone.id === activeId;
        return (
          <button
            key={zone.id}
            type="button"
            onClick={() => onSelect(zone.id)}
            aria-label={zone.name}
            aria-current={isActive ? 'true' : undefined}
            title={zone.name}
            className="group flex w-[52px] flex-col items-center gap-1 rounded-xl py-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <span
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-200',
                isActive ? 'scale-105 shadow-lg' : 'bg-white/5 group-hover:bg-white/15'
              )}
              style={{ borderColor: zone.color, backgroundColor: isActive ? zone.color : undefined }}
            >
              <Icon
                className={cn('h-5 w-5 transition-colors', isActive ? 'text-[#1B3A5C]' : 'text-white/90')}
                aria-hidden="true"
              />
            </span>
            <span
              className={cn(
                'text-xs font-semibold leading-none',
                isActive ? 'text-white' : 'text-white/60 group-hover:text-white/90'
              )}
            >
              {SHORT_NAMES[zone.id] ?? zone.name}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
