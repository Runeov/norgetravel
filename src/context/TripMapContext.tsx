'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { trackEvent } from '@/lib/analytics';

export interface TripMapState {
  selectedZone: string | null;
  drillDownZone: string | null;
  activeTab: number;
  selectedCard: number | null;
}

interface TripMapContextValue {
  isOpen: boolean;
  isMinimized: boolean;
  savedState: TripMapState | null;
  openMap: () => void;
  closeMap: () => void;
  minimizeMap: (state: TripMapState) => void;
  restoreMap: () => void;
}

const TripMapContext = createContext<TripMapContextValue | null>(null);

export function TripMapProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [savedState, setSavedState] = useState<TripMapState | null>(null);

  const openMap = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    trackEvent('trip_planner_opened', { source: 'open' });
  }, []);

  const closeMap = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
    setSavedState(null);
    trackEvent('trip_planner_closed');
  }, []);

  const minimizeMap = useCallback((state: TripMapState) => {
    setSavedState(state);
    setIsOpen(false);
    setIsMinimized(true);
    trackEvent('trip_planner_minimized', {
      selected_zone: state.selectedZone,
      drill_down_zone: state.drillDownZone,
    });
  }, []);

  const restoreMap = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    trackEvent('trip_planner_opened', { source: 'restore' });
  }, []);

  return (
    <TripMapContext.Provider value={{ isOpen, isMinimized, savedState, openMap, closeMap, minimizeMap, restoreMap }}>
      {children}
    </TripMapContext.Provider>
  );
}

export function useTripMap() {
  const context = useContext(TripMapContext);
  if (!context) {
    throw new Error('useTripMap must be used within a TripMapProvider');
  }
  return context;
}
