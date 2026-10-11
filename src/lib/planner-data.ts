import { mapZones, type MapZone } from '@/data/norway-map-zones';
import { zoneSubcategories } from '@/data/zone-subcategories';
import { experiencesStore } from '@/lib/admin/travel-experiences';
import { accommodationStore } from '@/lib/admin/travel-accommodation';
import { restaurantsStore } from '@/lib/admin/travel-restaurants';
import { transportStore } from '@/lib/admin/travel-transport';
import { eventsStore } from '@/lib/admin/travel-events';
import { getPublishedArticles } from '@/lib/admin/articles';
import { toGridItems } from '@/lib/travel-grid';
import { tripReportRegion } from '@/lib/trip-report-region';
import type { TravelItemBase } from '@/lib/schemas/travel.shared';
import type { Event } from '@/lib/schemas/travel.events.schema';
import type { Transport } from '@/lib/schemas/travel.transport.schema';

/**
 * Server-side data for the planner pages (/plan and /plan/[zone]).
 * Reads the JSON stores and returns only what the cards render.
 */

export const PLAN_ZONE_IDS = ['northern-norway', 'lofoten', 'fjords', 'svalbard', 'cities', 'boat-routes'] as const;
export type PlanZoneId = (typeof PLAN_ZONE_IDS)[number];

export function isPlanZoneId(value: string): value is PlanZoneId {
  return (PLAN_ZONE_IDS as readonly string[]).includes(value);
}

export function getPlanZone(zoneId: PlanZoneId): MapZone {
  const zone = mapZones.find((z) => z.id === zoneId);
  if (!zone) throw new Error(`Unknown plan zone: ${zoneId}`);
  return zone;
}

export const SECTION_LIMITS = {
  places: 8,
  experiences: 9,
  events: 6,
  stays: 9,
  restaurants: 6,
  transport: 6,
  articles: 6,
} as const;

export interface PlaceCardData {
  id: string;
  name: string;
  summary: string;
  imageUrl?: string;
  href: string;
  highlights: string[];
}

export interface ArticleCardData {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: number;
  featuredImage?: string;
  authorName?: string;
}

export interface ZoneCounts {
  experiences: number;
  stays: number;
  events: number;
  articles: number;
}

export interface ZoneStream {
  zone: MapZone;
  places: PlaceCardData[];
  experiences: TravelItemBase[];
  experiencesTotal: number;
  events: Event[];
  eventsTotal: number;
  stays: TravelItemBase[];
  staysTotal: number;
  restaurants: TravelItemBase[];
  restaurantsTotal: number;
  transport: Transport[];
  transportTotal: number;
  articles: ArticleCardData[];
  articlesTotal: number;
}

// ── Zone membership ─────────────────────────────────────────────────────────
// Four zones map straight onto the data's `destination` field. The cities and
// the boat routes cut across destinations, so they match on place names.

const CITY_RE = /\b(oslo|bergen|trondheim|stavanger)\b/i;
const PORT_RE = /\b(bergen|[åa]lesund|trondheim|br[øo]nn[øo]ysund|bod[øo]|svolv[æa]e?r|stokmarknes|harstad|troms[øo]|honningsv[åa]g|vard[øo]|kirkenes)\b/i;
const BOAT_RE = /hurtigruten|havila|kystruten|cruise|ferry|ferge|boat|sailing|\brib\b/i;
const BOAT_ARTICLE_RE = /hurtigruten|havila|kystruten|ferry|cruise|coastal/;

export interface Zoneable {
  destination: string;
  location: string;
  name: string;
  description: string;
  nearestTown?: string;
  transportType?: string;
  _city?: string;
}

/** `activity` items (experiences, transport) match the boat zone on what they are; `place` items match on where they are. */
export function itemInZone(zone: PlanZoneId, item: Zoneable, kind: 'activity' | 'place'): boolean {
  return inZone(zone, item, kind);
}

function inZone(zone: PlanZoneId, item: Zoneable, kind: 'activity' | 'place'): boolean {
  if (zone === 'cities') {
    return CITY_RE.test(`${item.location} ${item.nearestTown ?? ''} ${item._city ?? ''}`);
  }
  if (zone === 'boat-routes') {
    if (kind === 'activity') {
      return item.transportType === 'ferry' || BOAT_RE.test(`${item.name} ${item.description}`);
    }
    return PORT_RE.test(`${item.location} ${item.nearestTown ?? ''}`);
  }
  return item.destination === zone;
}

function articleZones(article: { slug: string; tags?: string[] }): PlanZoneId[] {
  const zones: PlanZoneId[] = [tripReportRegion(article)];
  if (BOAT_ARTICLE_RE.test(`${article.slug} ${(article.tags ?? []).join(' ')}`.toLowerCase())) {
    zones.push('boat-routes');
  }
  return zones;
}

// ── Ranking ─────────────────────────────────────────────────────────────────

export function ratingOf(item: TravelItemBase): number {
  const value = (item as { _googleRating?: number | null })._googleRating;
  return typeof value === 'number' ? value : 0;
}

export function reviewCountOf(item: TravelItemBase): number {
  const value = (item as { _googleReviewCount?: number | null })._googleReviewCount;
  return typeof value === 'number' ? value : 0;
}

/** Featured first, then the best rated, then the editor's order. */
export function rankItems<T extends TravelItemBase>(items: T[]): T[] {
  return rank(items);
}

function rank<T extends TravelItemBase>(items: T[]): T[] {
  return [...items].sort(
    (a, b) =>
      Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)) ||
      ratingOf(b) - ratingOf(a) ||
      a.sortOrder - b.sortOrder
  );
}

// ── Places: the curated "where" cards from the map's drill-down content ─────

const plain = (text: string) => text.replace(/\s*—\s*/g, ', ');
const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function placesFor(zone: PlanZoneId): PlaceCardData[] {
  const detail = zoneSubcategories[zone];
  if (!detail) return [];
  const placeSections = zone === 'boat-routes'
    ? detail.subcategories
    : detail.subcategories.filter((sub) => /-(cities|fjords)$/.test(sub.id));
  const source = placeSections.length ? placeSections : detail.subcategories.slice(0, 1);

  return source
    .flatMap((sub) =>
      sub.bullets.map((bullet, i) => {
        const info = sub.bulletDetails?.[i];
        const [bulletName, ...rest] = bullet.split(/\s[—–]\s/);
        const name = info?.title ?? bulletName;
        const summary = info?.content ?? rest.join(', ');
        return {
          id: `place-${zone}-${slugify(name)}`,
          name,
          summary: capitalise(plain(summary)),
          imageUrl: sub.bulletImages?.[i],
          href: info?.ctaLink ?? sub.link,
          highlights: (info?.highlights ?? []).slice(0, 2).map(plain),
        };
      })
    )
    .slice(0, SECTION_LIMITS.places);
}

function toArticleCard(article: {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readTime?: number | null;
  featuredImage?: string | null;
  authorName?: string | null;
}): ArticleCardData {
  return {
    slug: article.slug,
    category: article.category,
    title: article.title,
    excerpt: article.excerpt,
    readTime: article.readTime ?? 5,
    featuredImage: article.featuredImage ?? undefined,
    authorName: article.authorName ?? undefined,
  };
}

// ── Public loaders ──────────────────────────────────────────────────────────

/** Everything the /plan/[zone] page renders, trimmed to the section limits. */
export async function getZoneStream(zoneId: PlanZoneId): Promise<ZoneStream> {
  const zone = getPlanZone(zoneId);
  const [experiences, stays, restaurants, transport, events, articles] = await Promise.all([
    experiencesStore.getPublished(),
    accommodationStore.getPublished(),
    restaurantsStore.getPublished(),
    transportStore.getPublished(),
    eventsStore.getPublished(),
    getPublishedArticles(),
  ]);

  const zoneExperiences = rank(experiences.filter((item) => inZone(zoneId, item, 'activity')));
  const zoneStays = rank(stays.filter((item) => inZone(zoneId, item, 'place')));
  const zoneRestaurants = rank(restaurants.filter((item) => inZone(zoneId, item, 'place')));
  const zoneTransport = rank(transport.filter((item) => inZone(zoneId, item, 'activity')));

  // Upcoming events first; if the zone has none coming up, show its past ones so the section is not empty
  const zoneEvents = events.filter((item) => inZone(zoneId, item, 'place'));
  const upcoming = zoneEvents.filter((event) => !eventsStore.isPast(event));
  const eventList = (upcoming.length ? upcoming : zoneEvents).sort((a, b) => a.startDate.localeCompare(b.startDate));

  const zoneArticles = articles.filter((article) => articleZones(article).includes(zoneId));

  return {
    zone,
    places: placesFor(zoneId),
    experiences: toGridItems(zoneExperiences.slice(0, SECTION_LIMITS.experiences)),
    experiencesTotal: zoneExperiences.length,
    events: eventList.slice(0, SECTION_LIMITS.events),
    eventsTotal: eventList.length,
    stays: toGridItems(zoneStays.slice(0, SECTION_LIMITS.stays)),
    staysTotal: zoneStays.length,
    restaurants: toGridItems(zoneRestaurants.slice(0, SECTION_LIMITS.restaurants)),
    restaurantsTotal: zoneRestaurants.length,
    transport: zoneTransport.slice(0, SECTION_LIMITS.transport),
    transportTotal: zoneTransport.length,
    articles: zoneArticles.slice(0, SECTION_LIMITS.articles).map(toArticleCard),
    articlesTotal: zoneArticles.length,
  };
}

/** The six zones with how much each has to offer, for the /plan overview. */
export async function getPlanOverview(): Promise<{ zone: MapZone; counts: ZoneCounts }[]> {
  const [experiences, stays, events, articles] = await Promise.all([
    experiencesStore.getPublished(),
    accommodationStore.getPublished(),
    eventsStore.getPublished(),
    getPublishedArticles(),
  ]);

  return PLAN_ZONE_IDS.map((zoneId) => ({
    zone: getPlanZone(zoneId),
    counts: {
      experiences: experiences.filter((item) => inZone(zoneId, item, 'activity')).length,
      stays: stays.filter((item) => inZone(zoneId, item, 'place')).length,
      events: events.filter((item) => inZone(zoneId, item, 'place')).length,
      articles: articles.filter((article) => articleZones(article).includes(zoneId)).length,
    },
  }));
}
