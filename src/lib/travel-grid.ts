import type { TravelItemBase } from '@/lib/schemas/travel.shared';

// Fields TravelCard and extractRatings read. Everything else (scraper metadata,
// opening hours, booking URLs, timestamps) stays on the server.
const CARD_FIELDS = [
  'id',
  'name',
  'description',
  'destination',
  'location',
  'priceRange',
  'website',
  'imageUrl',
  'imageAlt',
  'isFeatured',
  '_googleRating',
  '_googleReviewCount',
  '_bookingRating',
  '_bookingReviewCount',
  '_tripAdvisorRating',
  '_tripAdvisorReviewCount',
] as const;

// Cards clamp descriptions to three lines, so longer text is never visible.
const DESCRIPTION_LIMIT = 320;

function clip(text: string): string {
  if (text.length <= DESCRIPTION_LIMIT) return text;
  const cut = text.slice(0, DESCRIPTION_LIMIT);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

/**
 * Strips listing records down to what the card grid renders, so the page does
 * not ship the full dataset to the browser. The returned objects omit fields
 * the grid never reads (timestamps, sortOrder), hence the cast.
 */
export function toGridItems<T extends TravelItemBase>(items: T[]): T[] {
  return items.map((item) => {
    const source = item as unknown as Record<string, unknown>;
    const slim: Record<string, unknown> = {};
    for (const field of CARD_FIELDS) {
      if (source[field] != null) slim[field] = source[field];
    }
    if (typeof slim.description === 'string') slim.description = clip(slim.description);
    return slim as unknown as T;
  });
}
