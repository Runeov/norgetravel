'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTripMap } from '@/context/TripMapContext';
import { mapZones } from '@/data/norway-map-zones';
import { zoneSubcategories } from '@/data/zone-subcategories';
import { NorwayMap } from './NorwayMap';
import { ZoneInfoPanel } from './ZoneInfoPanel';
import { ZoneDetailView } from './ZoneDetailView';

export function NorwayMapOverlay() {
  const { isOpen, closeMap } = useTripMap();
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [drillDownZone, setDrillDownZone] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and focus close button when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setHoveredZone(null);
      setSelectedZone(null);
      setDrillDownZone(null);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape: back out of drill-down first, then close overlay
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (drillDownZone) {
          setDrillDownZone(null);
        } else {
          closeMap();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMap, drillDownZone]);

  const handleSelect = useCallback((id: string) => {
    setSelectedZone((prev) => (prev === id ? null : id));
  }, []);

  const handleExplore = useCallback((zoneId: string) => {
    setDrillDownZone(zoneId);
  }, []);

  const handleBack = useCallback(() => {
    setDrillDownZone(null);
  }, []);

  const hoveredData = hoveredZone
    ? mapZones.find((z) => z.id === hoveredZone) || null
    : null;
  const selectedData = selectedZone
    ? mapZones.find((z) => z.id === selectedZone) || null
    : null;
  const drillDownData = drillDownZone
    ? zoneSubcategories[drillDownZone] || null
    : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Plan your trip — interactive Norway map"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMap();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#1B3A5C]/95 backdrop-blur-lg" />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col px-4 sm:px-6 py-6"
          >
            {/* Header — stays stable across view transitions */}
            <div className="flex items-center justify-between mb-4 lg:mb-6 shrink-0">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white">
                  Plan your trip
                </h2>
                <p className="text-white/50 text-sm mt-1 hidden sm:block">
                  {drillDownZone
                    ? 'Choose your experience'
                    : 'Five regions. Five entirely different Norways.'}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                onClick={closeMap}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close trip planner"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* View switcher: Map view ↔ Detail view */}
            <AnimatePresence mode="wait">
              {drillDownData ? (
                <motion.div
                  key="detail-view"
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex-1 min-h-0 overflow-y-auto"
                >
                  <ZoneDetailView data={drillDownData} onBack={handleBack} />
                </motion.div>
              ) : (
                <motion.div
                  key="map-view"
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-10 min-h-0 overflow-y-auto lg:overflow-visible"
                >
                  {/* Map */}
                  <div className="flex-1 flex items-center justify-center min-h-[300px]">
                    <NorwayMap
                      hoveredZone={hoveredZone}
                      selectedZone={selectedZone}
                      onHover={setHoveredZone}
                      onSelect={handleSelect}
                    />
                  </div>

                  {/* Info Panel */}
                  <div className="w-full lg:w-[380px] shrink-0 bg-white/5 rounded-2xl border border-white/10 p-6 lg:p-8 backdrop-blur-sm">
                    <ZoneInfoPanel
                      hoveredZone={hoveredData}
                      selectedZone={selectedData}
                      onClose={() => setSelectedZone(null)}
                      onExplore={handleExplore}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
