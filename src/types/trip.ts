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
  /** Planner zone the item belongs to, when known. */
  zone?: string;
  /** Page or booking link for the item. */
  href?: string;
  addedAt: string;
}

export type TripInterest =
  | 'aurora'
  | 'midnight-sun'
  | 'hiking'
  | 'fjords'
  | 'wildlife'
  | 'sami-culture'
  | 'food'
  | 'cities'
  | 'family'
  | 'photography';
export type TripPace = 'relaxed' | 'steady' | 'packed';
export type TripMobility = 'car' | 'no-car';
export type TripBudget = 'budget' | 'mid-range' | 'luxury';

/** What the visitor has told us about the trip. Stored on their device only. */
export interface TripProfile {
  /** Planner zone ids the visitor wants to go to. Empty means "work it out from what I saved and what I like". */
  zones: string[];
  startDate?: string;
  endDate?: string;
  travellers?: number;
  interests: TripInterest[];
  pace?: TripPace;
  mobility?: TripMobility;
  budget?: TripBudget;
}

export const EMPTY_PROFILE: TripProfile = { zones: [], interests: [] };

export const TRIP_INTERESTS: { id: TripInterest; label: string }[] = [
  { id: 'aurora', label: 'Northern Lights' },
  { id: 'midnight-sun', label: 'Midnight sun' },
  { id: 'hiking', label: 'Hiking' },
  { id: 'fjords', label: 'Fjords and ferries' },
  { id: 'wildlife', label: 'Whales and wildlife' },
  { id: 'sami-culture', label: 'Sami culture' },
  { id: 'food', label: 'Food' },
  { id: 'cities', label: 'Cities' },
  { id: 'family', label: 'Family' },
  { id: 'photography', label: 'Photography' },
];

export const TRIP_PACES: { id: TripPace; label: string; hint: string }[] = [
  { id: 'relaxed', label: 'Relaxed', hint: 'One thing a day' },
  { id: 'steady', label: 'Steady', hint: 'Two things a day' },
  { id: 'packed', label: 'Packed', hint: 'Early starts, late nights' },
];

export const TRIP_MOBILITY: { id: TripMobility; label: string }[] = [
  { id: 'car', label: 'Own or rental car' },
  { id: 'no-car', label: 'No car' },
];

export const TRIP_BUDGETS: { id: TripBudget; label: string }[] = [
  { id: 'budget', label: 'Budget' },
  { id: 'mid-range', label: 'Mid-range' },
  { id: 'luxury', label: 'Luxury' },
];
