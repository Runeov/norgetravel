'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import type { TripInterest, TripItem, TripProfile } from '@/types/trip';
import { EMPTY_PROFILE, TRIP_INTERESTS } from '@/types/trip';
import { mapZones } from '@/data/norway-map-zones';

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

const ZONE_IDS = new Set(mapZones.map((zone) => zone.id));
const INTEREST_IDS = new Set<string>(TRIP_INTERESTS.map((interest) => interest.id));

/**
 * Reads the regions and interests an article's planner link carries (?zones=…&interests=…),
 * then drops them from the address bar so a reload does not add them again.
 */
function takeLinkedProfile(): Pick<TripProfile, 'zones' | 'interests'> | null {
  const url = new URL(window.location.href);
  if (!url.searchParams.has('zones') && !url.searchParams.has('interests')) return null;
  const listParam = (name: string) => (url.searchParams.get(name) ?? '').split(',').filter(Boolean);
  const zones = listParam('zones').filter((id) => ZONE_IDS.has(id));
  const interests = listParam('interests').filter((id): id is TripInterest => INTEREST_IDS.has(id));
  url.searchParams.delete('zones');
  url.searchParams.delete('interests');
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  return { zones, interests };
}

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<TripItem[]>([]);
  const [profile, setProfile] = useState<TripProfile>(EMPTY_PROFILE);
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

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

  // Merge a planner link's regions and interests after the stored profile is in,
  // on a full load and on client-side navigation alike
  useEffect(() => {
    if (!loaded) return;
    const linked = takeLinkedProfile();
    if (!linked) return;
    setProfile((prev) => ({
      ...prev,
      zones: [...new Set([...prev.zones, ...linked.zones])],
      interests: [...new Set([...prev.interests, ...linked.interests])],
    }));
  }, [pathname, loaded]);

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
