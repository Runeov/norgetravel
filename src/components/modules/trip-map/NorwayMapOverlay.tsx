'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutList, Map as MapIcon, Maximize2, X } from 'lucide-react';
import { useTripMap } from '@/context/TripMapContext';
import type { TripMapState } from '@/context/TripMapContext';
import { mapZones } from '@/data/norway-map-zones';
import { zoneSubcategories } from '@/data/zone-subcategories';
import type { ZoneDetailData } from '@/data/zone-subcategories';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { NorwayMap } from './NorwayMap';
import { ZoneInfoPanel } from './ZoneInfoPanel';
import { ZoneDetailView } from './ZoneDetailView';
import { ZoneListView } from './ZoneListView';
import { EnlargedMap } from './EnlargedMap';

type PlannerView = 'map' | 'list';

const VIEW_STORAGE_KEY = 'norgetravel-planner-view';
const allDrillDownZones: ZoneDetailData[] = Object.values(zoneSubcategories);

function readStoredView(): PlannerView | null {
  try {
    const value = window.localStorage.getItem(VIEW_STORAGE_KEY);
    return value === 'map' || value === 'list' ? value : null;
  } catch {
    return null;
  }
}

function isPhone(): boolean {
  return typeof window !== 'undefined' && window.innerWidth < 1024;
}

export function NorwayMapOverlay() {
  const { isOpen, savedState, closeMap, minimizeMap } = useTripMap();
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [drillDownZone, setDrillDownZone] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [view, setView] = useState<PlannerView>('map');
  const [enlarged, setEnlarged] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Restore saved state when reopening from minimized
  useEffect(() => {
    if (isOpen && savedState) {
      setSelectedZone(savedState.selectedZone);
      setDrillDownZone(savedState.drillDownZone);
      setActiveTab(savedState.activeTab);
      setSelectedCard(savedState.selectedCard);
    }
  }, [isOpen, savedState]);

  // Pick the view when the planner opens: the visitor's last choice, else the list on phones
  useEffect(() => {
    if (!isOpen) return;
    setView(readStoredView() ?? (isPhone() ? 'list' : 'map'));
  }, [isOpen]);

  // Lock body scroll and focus close button when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      setEnlarged(false);
      if (!savedState) {
        setHoveredZone(null);
        setSelectedZone(null);
        setDrillDownZone(null);
        setActiveTab(0);
        setSelectedCard(null);
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, savedState]);

  const getCurrentState = useCallback((): TripMapState => ({
    selectedZone,
    drillDownZone,
    activeTab,
    selectedCard,
  }), [selectedZone, drillDownZone, activeTab, selectedCard]);

  const handleNavigateAway = useCallback(() => {
    minimizeMap(getCurrentState());
  }, [minimizeMap, getCurrentState]);

  // Escape: close the enlarged map, then back out of the drill-down, then close the overlay
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (enlarged) {
        setEnlarged(false);
      } else if (drillDownZone) {
        setDrillDownZone(null);
      } else {
        closeMap();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMap, drillDownZone, enlarged]);

  const changeView = useCallback((next: PlannerView) => {
    setView(next);
    try {
      window.localStorage.setItem(VIEW_STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the choice lasts for this open only
    }
    trackEvent('trip_planner_view_toggled', { view: next });
  }, []);

  // On a phone the panel sits under the map, so bring it into view after a tap on the map
  const revealPanel = useCallback(() => {
    if (!isPhone()) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  }, []);

  const handleSelect = useCallback((id: string) => {
    const deselect = selectedZone === id;
    setSelectedZone(deselect ? null : id);
    if (!deselect) revealPanel();
  }, [selectedZone, revealPanel]);

  const handleSwitchZone = useCallback((id: string) => {
    setSelectedZone(id);
    trackEvent('trip_planner_zone_switched', { zone: id });
  }, []);

  const handleExplore = useCallback((zoneId: string) => {
    setEnlarged(false);
    setDrillDownZone(zoneId);
    trackEvent('trip_planner_level_opened', { zone: zoneId });
  }, []);

  const handleBack = useCallback(() => {
    setDrillDownZone(null);
  }, []);

  const openEnlarged = useCallback(() => {
    setEnlarged(true);
    trackEvent('trip_planner_map_enlarged');
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

  const viewToggle = (
    <div role="group" aria-label="Planner view" className="flex rounded-full bg-white/10 p-1">
      {(['map', 'list'] as const).map((option) => {
        const Icon = option === 'map' ? MapIcon : LayoutList;
        const active = view === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => changeView(option)}
            aria-pressed={active}
            className={cn(
              'flex min-h-[40px] items-center gap-1.5 rounded-full px-3 sm:px-4 text-sm font-semibold transition-colors',
              active ? 'bg-white text-[#1B3A5C]' : 'text-white/70 hover:text-white'
            )}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {option === 'map' ? 'Map' : 'List'}
          </button>
        );
      })}
    </div>
  );

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
          aria-label="Trip planner: interactive Norway map"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeMap();
          }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#1B3A5C]/95 backdrop-blur-lg pointer-events-none" />

          {/* Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative z-10 w-full h-full max-w-7xl mx-auto flex flex-col px-4 sm:px-6 py-4 sm:py-6"
          >
            {/* Header: stays stable across view transitions */}
            <div className="shrink-0 mb-4 lg:mb-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                  Trip Planner
                </h2>
                <div className="flex items-center gap-2">
                  {viewToggle}
                  <button
                    ref={closeButtonRef}
                    onClick={closeMap}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    aria-label="Close trip planner"
                  >
                    <X className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <p className="text-white/60 text-sm mt-1.5">
                {drillDownZone
                  ? 'Pick what to do, where to stay and what to book. Each card opens the full guide.'
                  : 'Six destinations. Tap one, then open it for cities, activities, events, tours and places to stay.'}
              </p>
            </div>

            {/* View switcher: map or list, then the detail view */}
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
                  <ZoneDetailView
                    data={drillDownData}
                    onBack={handleBack}
                    backLabel={view === 'list' ? 'Back to destinations' : 'Back to map'}
                    listMode={view === 'list'}
                    allZones={allDrillDownZones}
                    onSwitchZone={handleExplore}
                    onNavigateAway={handleNavigateAway}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    selectedCard={selectedCard}
                    onCardChange={setSelectedCard}
                  />
                </motion.div>
              ) : view === 'list' ? (
                <motion.div
                  key="list-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex-1 min-h-0 overflow-y-auto pb-4"
                >
                  <ZoneListView
                    selectedZone={selectedZone}
                    onSelect={handleSelect}
                    onExplore={handleExplore}
                    onNavigateAway={handleNavigateAway}
                  />
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
                  <div className="relative flex-1 flex items-start lg:items-center justify-center">
                    <NorwayMap
                      hoveredZone={hoveredZone}
                      selectedZone={selectedZone}
                      onHover={setHoveredZone}
                      onSelect={handleSelect}
                    />
                    <button
                      type="button"
                      onClick={openEnlarged}
                      className="absolute bottom-3 right-3 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/15 px-4 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/25 transition-colors"
                    >
                      <Maximize2 className="h-4 w-4" aria-hidden="true" />
                      Enlarge map
                    </button>
                  </div>

                  {/* Info panel */}
                  <div
                    ref={panelRef}
                    className="w-full lg:w-[380px] shrink-0 scroll-mt-4 bg-white/5 rounded-2xl border border-white/10 p-5 lg:p-7 backdrop-blur-sm"
                  >
                    <ZoneInfoPanel
                      hoveredZone={hoveredData}
                      selectedZone={selectedData}
                      onClose={() => setSelectedZone(null)}
                      onExplore={handleExplore}
                      onNavigateAway={handleNavigateAway}
                      onSwitchZone={handleSwitchZone}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {enlarged && (
            <EnlargedMap
              hoveredZone={hoveredZone}
              selectedZone={selectedZone}
              onHover={setHoveredZone}
              onSelect={(id) => setSelectedZone((prev) => (prev === id ? null : id))}
              onClose={() => setEnlarged(false)}
              onExplore={handleExplore}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
