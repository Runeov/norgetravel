'use client';

import { createContext, useContext, useState, useCallback } from 'react';

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
  }, []);

  const closeMap = useCallback(() => {
    setIsOpen(false);
    setIsMinimized(false);
    setSavedState(null);
  }, []);

  const minimizeMap = useCallback((state: TripMapState) => {
    setSavedState(state);
    setIsOpen(false);
    setIsMinimized(true);
  }, []);

  const restoreMap = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
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
