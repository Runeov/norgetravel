'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import type { MapZone } from '@/data/norway-map-zones';
import { zoneSubcategories } from '@/data/zone-subcategories';

interface ZoneInfoPanelProps {
  hoveredZone: MapZone | null;
  selectedZone: MapZone | null;
  onClose: () => void;
  onExplore?: (zoneId: string) => void;
  onNavigateAway?: () => void;
}

export function ZoneInfoPanel({ hoveredZone, selectedZone, onExplore, onNavigateAway }: ZoneInfoPanelProps) {
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
            className="flex-1 flex flex-col items-center justify-center text-center px-6"
          >
            <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mb-4">
              <MapPin className="w-7 h-7 text-white/50" />
            </div>
            <p className="text-white/60 text-lg font-medium mb-2">
              Select a destination
            </p>
            <p className="text-white/40 text-sm max-w-xs">
              Click a highlighted region on the map to explore what it offers.
            </p>
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
            <div className="mb-1">
              <span
                className="inline-block w-8 h-1 rounded-full mb-3"
                style={{ backgroundColor: selectedZone.color }}
              />
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                {selectedZone.name}
              </h3>
              <p className="text-white/60 text-sm font-medium">
                {selectedZone.tagline}
              </p>
            </div>

            <p className="text-white/70 text-sm leading-relaxed mt-4 mb-6">
              {selectedZone.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {selectedZone.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 rounded-xl px-3 py-2.5 border border-white/10"
                >
                  <p className="text-white/40 text-xs font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-white font-bold text-sm mt-0.5">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedZone.highlights.map((h) => (
                <span
                  key={h}
                  className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium border border-white/10"
                >
                  {h}
                </span>
              ))}
            </div>

            <div className="mt-auto">
              {zoneSubcategories[selectedZone.id] ? (
                <button
                  onClick={() => onExplore?.(selectedZone.id)}
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-full hover:shadow-lg hover:shadow-[#00CC6A]/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Explore {selectedZone.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              ) : (
                <Link
                  href={selectedZone.href}
                  onClick={() => onNavigateAway?.()}
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-full hover:shadow-lg hover:shadow-[#00CC6A]/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Explore {selectedZone.name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              )}
            </div>
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
            <p className="text-white/60 text-sm">
              {hoveredZone!.tagline}
            </p>
            <p className="text-white/40 text-xs mt-4">
              Click to explore
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
