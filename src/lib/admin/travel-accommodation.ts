import { createTravelStore } from './travel-base';
import { AccommodationSchema, type Accommodation } from '@/lib/schemas/travel.accommodation.schema';

const base = createTravelStore<Accommodation>(
  'travel-accommodation.json',
  AccommodationSchema
);

/**
 * Filter published accommodation entries whose nearestTown matches
 * one of the provided town names (case-insensitive).
 */
async function filterByNearestTowns(towns: string[]): Promise<Accommodation[]> {
  if (!towns.length) return [];
  const lower = towns.map((t) => t.toLowerCase());
  const all = await base.getAll();
  return Object.values(all)
    .filter(
      (item) =>
        item.status === 'published' &&
        item.nearestTown != null &&
        lower.includes(item.nearestTown.toLowerCase())
    )
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export const accommodationStore = {
  ...base,
  filterByNearestTowns,
};
