export type TripItemCategory =
  | 'cities'
  | 'events'
  | 'experiences'
  | 'accommodation'
  | 'restaurants'
  | 'tours'
  | 'transport'
  | 'guides';

export interface TripItem {
  id: string;
  name: string;
  category: TripItemCategory;
  imageUrl?: string | null;
  location?: string;
  priceRange?: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
  addedAt: string;
}
