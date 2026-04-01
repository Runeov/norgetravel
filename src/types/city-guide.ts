// ─── Rating Sources ───────────────────────────────────────────────────────────

export interface GoogleRating {
  score: number;       // 1.0–5.0
  reviewCount: number;
}

export interface TripAdvisorRating {
  score: number;                          // 1.0–5.0
  bubbleRating: 1 | 2 | 3 | 4 | 5;       // TripAdvisor dot scale
  reviewCount: number;
}

export type MichelinDistinction =
  | { type: 'stars'; count: 1 | 2 | 3 }
  | { type: 'bib-gourmand' }
  | { type: 'recommended' }
  | { type: 'none' };

export interface RestaurantRatings {
  google?: GoogleRating;
  tripAdvisor?: TripAdvisorRating;
  michelin?: MichelinDistinction;
}

// ─── Restaurant ───────────────────────────────────────────────────────────────

export type CuisineCategory =
  | 'norwegian'
  | 'seafood'
  | 'sami'
  | 'international'
  | 'fine-dining'
  | 'cafe'
  | 'bakery'
  | 'pub'
  | 'local';

export type PricePoint = '$' | '$$' | '$$$' | '$$$$';

export interface CityRestaurant {
  id: string;
  name: string;
  /** Google Place ID — enables live rating refresh via Google Places API */
  placeId?: string;
  cuisine: CuisineCategory;
  pricePoint: PricePoint;
  averageMealPrice?: string;
  address: string;
  neighbourhood?: string;
  website?: string;
  reservationUrl?: string;
  reservationRequired: boolean;
  openingHours: string;
  description: string;
  mustOrder?: string[];
  ratings: RestaurantRatings;
}

// ─── Affiliate ────────────────────────────────────────────────────────────────

export interface TourOperator {
  name: string;
  type: string;
  priceFrom: string;
  commission: string;
  highlight: string;
  affiliateUrl: string;
  rel: 'noopener noreferrer sponsored';
}

export interface AccommodationAffiliate {
  name: string;
  type: string;
  network: string;
  commission: string;
  affiliateUrl: string;
  rel: 'noopener noreferrer sponsored';
}

// ─── City building blocks ─────────────────────────────────────────────────────

export interface CityFact {
  label: string;
  value: string;
}

export interface SeasonalWindow {
  label: string;
  months: string;
  detail: string;
}

export interface CityExperience {
  title: string;
  price: string;
  duration: string;
  body: string;
}

// ─── Top-level city guide ─────────────────────────────────────────────────────

export interface CityGuide {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  heroImageSrc: string;
  heroImageAlt: string;
  taglineBadge: string;
  heroHeadline: string;
  heroBody: string;
  heroStats: Array<{ icon: 'map-pin' | 'moon' | 'sun' | 'thermometer' | 'clock'; text: string }>;
  facts: CityFact[];
  seasonalWindows: SeasonalWindow[];
  experiences: CityExperience[];
  tourOperators: TourOperator[];
  accommodationAffiliates: AccommodationAffiliate[];
  restaurants: CityRestaurant[];
}
