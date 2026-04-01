'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { TripItem } from '@/types/trip';

const STORAGE_KEY = 'norgetravel-trip';

interface TripContextValue {
  items: TripItem[];
  addItem: (item: TripItem) => void;
  removeItem: (id: string) => void;
  isInTrip: (id: string) => boolean;
  clearTrip: () => void;
  itemCount: number;
}

const TripContext = createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<TripItem[]>([]);

  // Load from localStorage on mount (SSR-safe)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch {
      // localStorage unavailable or corrupted — start empty
    }
  }, []);

  // Sync to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage full or unavailable
    }
  }, [items]);

  const addItem = useCallback((item: TripItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const isInTrip = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items]
  );

  const clearTrip = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <TripContext.Provider
      value={{ items, addItem, removeItem, isInTrip, clearTrip, itemCount: items.length }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
