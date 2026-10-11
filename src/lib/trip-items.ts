import type { TripItem, TripItemCategory } from '@/types/trip';

/** Destination page slugs mapped to the planner zone they belong to. */
const DESTINATION_ZONE: Record<string, string> = {
  'northern-norway': 'northern-norway',
  tromso: 'northern-norway',
  alta: 'northern-norway',
  nordkapp: 'northern-norway',
  senja: 'northern-norway',
  lyngen: 'northern-norway',
  lofoten: 'lofoten',
  fjords: 'fjords',
  geirangerfjord: 'fjords',
  hardangerfjord: 'fjords',
  naeroyfjord: 'fjords',
  sognefjord: 'fjords',
  svalbard: 'svalbard',
  cities: 'cities',
  oslo: 'cities',
  bergen: 'cities',
  trondheim: 'cities',
  stavanger: 'cities',
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

interface DestinationTripItemInput {
  category: TripItemCategory;
  name: string;
  /** The destination page's slug, e.g. `lofoten` or `geirangerfjord`. */
  destination: string;
  location?: string | null;
  href?: string | null;
  imageUrl?: string | null;
  priceRange?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

/**
 * Builds the trip item for a card on a destination page. The id is derived
 * from the destination, category and name, so the same card always maps to
 * the same saved item and "Added" state survives a reload.
 */
export function destinationTripItem(input: DestinationTripItemInput): TripItem {
  return {
    id: `${input.destination}-${input.category}-${slugify(input.name)}`,
    name: input.name,
    category: input.category,
    destination: input.destination,
    zone: DESTINATION_ZONE[input.destination] ?? input.destination,
    location: input.location ?? undefined,
    href: input.href ?? undefined,
    imageUrl: input.imageUrl ?? undefined,
    priceRange: input.priceRange ?? undefined,
    startDate: input.startDate ?? undefined,
    endDate: input.endDate ?? undefined,
    addedAt: '',
  };
}
