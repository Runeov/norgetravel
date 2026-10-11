'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { mapZones } from '@/data/norway-map-zones';
import { cn } from '@/lib/utils';
import { ZONE_ICONS } from './ZoneSwitcher';
import { ZoneBody } from './ZoneInfoPanel';

interface ZoneListViewProps {
  selectedZone: string | null;
  onSelect: (zoneId: string) => void;
  onExplore: (zoneId: string) => void;
  onNavigateAway?: () => void;
}

/** The six destinations as a stack of rows. Tap a row to open its summary and the way into the next level. */
export function ZoneListView({ selectedZone, onSelect, onExplore, onNavigateAway }: ZoneListViewProps) {
  return (
    <ol className="mx-auto flex w-full max-w-3xl flex-col gap-3">
      {mapZones.map((zone, index) => {
        const open = selectedZone === zone.id;
        const Icon = ZONE_ICONS[zone.id];
        const panelId = `zone-list-${zone.id}`;

        return (
          <li
            key={zone.id}
            className={cn(
              'overflow-hidden rounded-2xl border bg-white/5 backdrop-blur-sm transition-colors',
              open ? 'border-white/25' : 'border-white/10'
            )}
          >
            <button
              type="button"
              onClick={() => onSelect(zone.id)}
              aria-expanded={open}
              aria-controls={panelId}
              className="flex min-h-[72px] w-full items-center gap-4 p-4 text-left hover:bg-white/5 transition-colors"
            >
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2"
                style={{ borderColor: zone.color, backgroundColor: `${zone.color}22` }}
              >
                {Icon && <Icon className="h-6 w-6 text-white" aria-hidden="true" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-semibold uppercase tracking-wider text-white/45">
                  Destination {index + 1} of {mapZones.length}
                </span>
                <span className="block text-lg font-bold leading-tight text-white">{zone.name}</span>
                <span className="block text-base text-white/65">{zone.tagline}</span>
              </span>
              <ChevronDown
                className={cn('h-5 w-5 shrink-0 text-white/50 transition-transform duration-200', open && 'rotate-180')}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/10 px-4 pb-5 pt-1">
                    <ZoneBody zone={zone} onExplore={onExplore} onNavigateAway={onNavigateAway} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
