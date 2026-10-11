import type { TripReportRegion } from '@/components/modules/TripReportsTabs';

export type { TripReportRegion };

interface RegionSource {
  slug: string;
  tags?: string[];
}

// Tested in order. Magerøya and Kvaløya slugs contain "fjord", so the northern regions come first.
export const REGION_RULES: [TripReportRegion, RegExp][] = [
  ['svalbard', /svalbard|longyearbyen/],
  ['lofoten', /lofoten|reinebringen|henningsv|svolv|kvalvika|munkebu|festvag|ryten/],
  [
    'northern-norway',
    /tromso|lyngen|senja|\balta\b|nordkapp|mager|honningsv|kvaloya|skibotn|kjostind|seiland|blaisvatnet|haldde|komsa|rafsbotn|sorlenangs|rornes|fastdal|goalsevarri|segla|husfjell|hesten|barden|knivskjel|storfjellet/,
  ],
  ['cities', /\boslo\b|trondheim|stavanger/],
  ['fjords', /fjord|geiranger|naeroy|sogne|hardanger|flam|trolltunga|voring|folgefonna|urnes|stegastein|nutshell|rimstigen|prest|losta|skagefla|storseter|fossevandring|nali/],
];

/** The region an article belongs to, read from its slug and tags. Region ids match the planner's map zones. */
export function tripReportRegion(article: RegionSource): TripReportRegion {
  const haystack = `${article.slug} ${(article.tags ?? []).join(' ')}`.toLowerCase();
  return REGION_RULES.find(([, pattern]) => pattern.test(haystack))?.[0] ?? 'northern-norway';
}
