'use client';

import Link from '@/components/LocalizedLink';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import type { MapZone } from '@/data/norway-map-zones';
import { zoneSubcategories } from '@/data/zone-subcategories';
import { ZoneSwitcher } from './ZoneSwitcher';

interface ZoneInfoPanelProps {
  hoveredZone: MapZone | null;
  selectedZone: MapZone | null;
  onClose: () => void;
  onExplore?: (zoneId: string) => void;
  onNavigateAway?: () => void;
  /** Called when the visitor picks a destination from the circular switcher. */
  onSwitchZone?: (zoneId: string) => void;
}

const ctaClass =
  'flex w-full min-h-[56px] flex-col items-center justify-center rounded-full bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] px-6 py-2.5 text-white hover:shadow-lg hover:shadow-[#00CC6A]/30 hover:-translate-y-0.5 transition-all duration-300';

/**
 * Description, stats and the call to action for one zone.
 * Shared by the map panel and the list view.
 */
export function ZoneBody({
  zone,
  onExplore,
  onNavigateAway,
}: {
  zone: MapZone;
  onExplore?: (zoneId: string) => void;
  onNavigateAway?: () => void;
}) {
  const hasNextLevel = Boolean(zoneSubcategories[zone.id]);
  const ctaContent = (
    <>
      <span className="inline-flex items-center text-base font-bold">
        Open {zone.name}
        <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
      </span>
      <span className="text-xs font-medium text-white/85">
        {hasNextLevel ? zone.highlights.join(' · ') : 'Read the destination guide'}
      </span>
    </>
  );

  return (
    <div className="flex flex-1 flex-col">
      <p className="text-white/75 text-base lg:text-sm leading-relaxed mt-4 mb-5">
        {zone.description}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {zone.stats.map((stat) => (
          <div key={stat.label} className="bg-white/5 rounded-xl px-3 py-2.5 border border-white/10">
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
            <p className="text-white font-bold text-base mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        {hasNextLevel ? (
          <button type="button" onClick={() => onExplore?.(zone.id)} className={ctaClass}>
            {ctaContent}
          </button>
        ) : (
          <Link href={zone.href} onClick={() => onNavigateAway?.()} className={ctaClass}>
            {ctaContent}
          </Link>
        )}
      </div>
    </div>
  );
}

export function ZoneInfoPanel({ hoveredZone, selectedZone, onExplore, onNavigateAway, onSwitchZone }: ZoneInfoPanelProps) {
  const zone = selectedZone || hoveredZone;

  return (
    <div className="relative min-h-[280px] lg:min-h-[400px] flex flex-col">
      <AnimatePresence mode="wait">
        {!zone ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 flex flex-col items-center justify-center text-center px-2"
          >
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4">
              <MapPin className="w-7 h-7 text-white/60" aria-hidden="true" />
            </div>
            <p className="text-white text-xl font-bold mb-2">Pick a destination</p>
            <p className="text-white/65 text-base lg:text-sm max-w-xs leading-relaxed mb-5">
              Tap a region on the map or choose one here. Each opens to cities, activities, events, tours and places to stay.
            </p>
            {onSwitchZone && <ZoneSwitcher activeId={null} onSelect={onSwitchZone} layout="grid" />}
          </motion.div>
        ) : selectedZone ? (
          <motion.div
            key={`selected-${selectedZone.id}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex-1 flex flex-col"
          >
            <ol
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/50 mb-3"
              aria-label="Where you are"
            >
              <li>Map</li>
              <li aria-hidden="true">›</li>
              <li className="text-white">Destination</li>
              <li aria-hidden="true">›</li>
              <li>Plan it</li>
            </ol>

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span
                  className="inline-block w-8 h-1 rounded-full mb-3"
                  style={{ backgroundColor: selectedZone.color }}
                />
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-1 leading-tight">
                  {selectedZone.name}
                </h3>
                <p className="text-white/70 text-base lg:text-sm font-medium">
                  {selectedZone.tagline}
                </p>
              </div>

              {onSwitchZone && (
                <ZoneSwitcher
                  activeId={selectedZone.id}
                  onSelect={onSwitchZone}
                  layout="grid"
                  className="shrink-0"
                />
              )}
            </div>

            <ZoneBody zone={selectedZone} onExplore={onExplore} onNavigateAway={onNavigateAway} />
          </motion.div>
        ) : (
          <motion.div
            key={`hover-${hoveredZone!.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 flex flex-col items-center justify-center text-center px-6"
          >
            <span
              className="inline-block w-8 h-1 rounded-full mb-4"
              style={{ backgroundColor: hoveredZone!.color }}
            />
            <h3 className="text-2xl font-bold text-white mb-2">
              {hoveredZone!.name}
            </h3>
            <p className="text-white/70 text-base">
              {hoveredZone!.tagline}
            </p>
            <p className="text-white/50 text-sm mt-4">
              Tap to select
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
