'use client';

import { createContext, useContext, useState, useCallback } from 'react';

interface TripMapContextValue {
  isOpen: boolean;
  openMap: () => void;
  closeMap: () => void;
}

const TripMapContext = createContext<TripMapContextValue | null>(null);

export function TripMapProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openMap = useCallback(() => setIsOpen(true), []);
  const closeMap = useCallback(() => setIsOpen(false), []);

  return (
    <TripMapContext.Provider value={{ isOpen, openMap, closeMap }}>
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
