/**
 * Google Places API (v1) client for live restaurant ratings.
 *
 * Setup:
 *   1. Enable "Places API (New)" in Google Cloud Console
 *   2. Add GOOGLE_PLACES_API_KEY to .env.local
 *   3. Add `placeId` to each restaurant in tromso.ts (and future city files)
 *
 * Getting a Place ID:
 *   maps.google.com → search the restaurant → share button → the ID starts with "ChIJ"
 *   Or use: https://developers.google.com/maps/documentation/places/web-service/place-id
 *
 * Caching: Next.js ISR — ratings refresh every 24 hours automatically.
 * Fallback: when no API key or placeId, stored ratings in the data file are used.
 */

const PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;

export interface LiveGoogleRating {
  score: number;
  reviewCount: number;
  businessStatus?: 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'CLOSED_PERMANENTLY';
}

/**
 * Fetches live Google ratings for an array of Place IDs.
 * Returns null per placeId on any failure — callers should fall back to stored data.
 */
export async function fetchGoogleRatings(
  placeIds: string[]
): Promise<Record<string, LiveGoogleRating | null>> {
  if (!PLACES_API_KEY || placeIds.length === 0) return {};

  const results: Record<string, LiveGoogleRating | null> = {};

  await Promise.allSettled(
    placeIds.map(async (placeId) => {
      try {
        const res = await fetch(
          `https://places.googleapis.com/v1/places/${placeId}`,
          {
            headers: {
              'X-Goog-Api-Key': PLACES_API_KEY,
              'X-Goog-FieldMask': 'rating,userRatingCount,businessStatus',
            },
            next: { revalidate: 86400 }, // 24-hour ISR cache
          }
        );

        if (!res.ok) {
          results[placeId] = null;
          return;
        }

        const data: { rating?: number; userRatingCount?: number; businessStatus?: string } =
          await res.json();

        // Skip closed restaurants — callers fall back to stored data (which can be flagged)
        if (data.businessStatus === 'CLOSED_PERMANENTLY' || data.businessStatus === 'CLOSED_TEMPORARILY') {
          results[placeId] = null;
          return;
        }

        results[placeId] =
          typeof data.rating === 'number'
            ? {
                score: Math.round(data.rating * 10) / 10,
                reviewCount: data.userRatingCount ?? 0,
                businessStatus: data.businessStatus as LiveGoogleRating['businessStatus'],
              }
            : null;
      } catch {
        results[placeId] = null;
      }
    })
  );

  return results;
}
