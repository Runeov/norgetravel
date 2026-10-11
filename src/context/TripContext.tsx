'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { TripItem, TripProfile } from '@/types/trip';
import { EMPTY_PROFILE } from '@/types/trip';

const STORAGE_KEY = 'norgetravel-trip';
const PROFILE_KEY = 'norgetravel-trip-profile';

interface TripContextValue {
  items: TripItem[];
  addItem: (item: TripItem) => void;
  removeItem: (id: string) => void;
  isInTrip: (id: string) => boolean;
  clearTrip: () => void;
  itemCount: number;
  /** Dates, party size and interests the visitor has given. Saved on this device only. */
  profile: TripProfile;
  updateProfile: (changes: Partial<TripProfile>) => void;
}

const TripContext = createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<TripItem[]>([]);
  const [profile, setProfile] = useState<TripProfile>(EMPTY_PROFILE);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount (SSR-safe)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
      const storedProfile = localStorage.getItem(PROFILE_KEY);
      if (storedProfile) setProfile({ ...EMPTY_PROFILE, ...JSON.parse(storedProfile) });
    } catch {
      // localStorage unavailable or corrupted: start empty
    }
    setLoaded(true);
  }, []);

  // Sync to localStorage on every change, once the stored values have been read
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage full or unavailable
    }
  }, [items, loaded]);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch {
      // localStorage full or unavailable
    }
  }, [profile, loaded]);

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

  const updateProfile = useCallback((changes: Partial<TripProfile>) => {
    setProfile((prev) => ({ ...prev, ...changes }));
  }, []);

  return (
    <TripContext.Provider
      value={{ items, addItem, removeItem, isInTrip, clearTrip, itemCount: items.length, profile, updateProfile }}
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
