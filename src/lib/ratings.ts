import type { RatingData } from '@/components/modules/travel/TravelCard';

/**
 * Extract rating data from a travel item that may have underscore-prefixed
 * rating fields from enrichment scripts (Google Places, Booking.com, TripAdvisor).
 *
 * These fields are present in the JSON but not in the Zod schema types.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractRatings(item: any): RatingData | undefined {
  const ratings: RatingData = {};
  let hasAny = false;

  if (item._googleRating != null && item._googleRating > 0) {
    ratings.googleRating = item._googleRating;
    ratings.googleReviewCount = item._googleReviewCount ?? null;
    hasAny = true;
  }

  if (item._bookingRating != null && item._bookingRating > 0) {
    ratings.bookingRating = item._bookingRating;
    ratings.bookingReviewCount = item._bookingReviewCount ?? null;
    hasAny = true;
  }

  if (item._tripAdvisorRating != null && item._tripAdvisorRating > 0) {
    ratings.tripAdvisorRating = item._tripAdvisorRating;
    ratings.tripAdvisorReviewCount = item._tripAdvisorReviewCount ?? null;
    hasAny = true;
  }

  return hasAny ? ratings : undefined;
}
