import 'server-only';
import { eventsStore } from '@/lib/admin/travel-events';
import { experiencesStore } from '@/lib/admin/travel-experiences';
import { accommodationStore } from '@/lib/admin/travel-accommodation';
import { restaurantsStore } from '@/lib/admin/travel-restaurants';
import {
  CALENDAR_WINDOWS,
  addDays,
  buildCalendar,
  groupCalendar,
  matchesRegion,
  osloToday,
  type CalendarEvent,
  type CalendarWindow,
} from '@/lib/event-calendar';
import { EVENT_UI, type EventUiCopy } from '@/i18n/events-copy';
import { APP_COPY, type AppCopy } from '@/i18n/app-copy';
import { fmt } from '@/i18n/format';
import type { Locale } from '@/lib/i18n-seo';
import type { PriceRange } from '@/lib/schemas/travel.shared';
import { EventTypeSchema, type Event } from '@/lib/schemas/travel.events.schema';
import { ExperienceTypeSchema, type Experience } from '@/lib/schemas/travel.experiences.schema';
import { AccommodationTypeSchema, type Accommodation } from '@/lib/schemas/travel.accommodation.schema';
import { CuisineTypeSchema, type Restaurant } from '@/lib/schemas/travel.restaurants.schema';
import { outboundRel } from '@/lib/outbound-rel';
import { itemInZone, type Zoneable } from '@/lib/planner-data';
import { foldPlaceName, townById, townOf, townPercent, townPoint, type Town } from './towns';
import {
  APP_TABS,
  DEFAULT_FEED,
  PAGE_SIZE,
  PRICE_FILTERS,
  REGION_FILTERS,
  TAB_OF_KIND,
  calendarHref,
  detailHref,
  feedHref,
  isFiltered,
  type AppTab,
  type CalendarState,
  type CategoryGroup,
  type ExploreState,
  type FeedState,
  type FilterOption,
  type Listing,
  type ListingKind,
  type ListingStatus,
  type PriceFilter,
  type RegionFilter,
  type WhenFilter,
} from './model';

/**
 * Builds the /app screens from the travel stores. This module owns how a
 * stored record becomes a card (Listing), how the feed filters and orders
 * listings, which listings the Explore map can place, how the calendar groups
 * events, and what a detail page says. Pages and components render its
 * results and do not read the stores.
 *
 * Interface text comes from the app copy in the page's language. Listing data
 * (names, descriptions, venues) is English, as on the /travel pages.
 */

// ─── Language ───

interface Ctx {
  locale: Locale;
  c: AppCopy;
  event: EventUiCopy;
  categories: Record<ListingKind, Record<string, string>>;
  longDate: Intl.DateTimeFormat;
}

const contexts = new Map<Locale, Ctx>();

function context(locale: Locale): Ctx {
  const known = contexts.get(locale);
  if (known) return known;
  const c = APP_COPY[locale];
  const event = EVENT_UI[locale];
  const ctx: Ctx = {
    locale,
    c,
    event,
    categories: { events: event.types, tours: c.labels.tours, stays: c.labels.stays, eat: c.labels.eat },
    longDate: new Intl.DateTimeFormat(c.dates.intl, {
      timeZone: 'UTC',
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  };
  contexts.set(locale, ctx);
  return ctx;
}

// ─── Categories ───

/** Category keys per kind, in the schemas' order. Labels come from the copy. */
const CATEGORY_KEYS: Record<ListingKind, readonly string[]> = {
  events: EventTypeSchema.options,
  tours: ExperienceTypeSchema.options,
  stays: AccommodationTypeSchema.options,
  eat: CuisineTypeSchema.options,
};

/** Kinds per tab. Places lists where to stay, then where to eat, each under its own heading. */
const TAB_KINDS: Record<AppTab, ListingKind[]> = {
  events: ['events'],
  tours: ['tours'],
  places: ['stays', 'eat'],
};

const tabCategoryKeys = (tab: AppTab): Set<string> => new Set(TAB_KINDS[tab].flatMap((kind) => CATEGORY_KEYS[kind]));

const WINDOW_FILTERS = CALENDAR_WINDOWS.filter((w): w is WhenFilter => w !== 'upcoming');

const priceLabel = (range: PriceRange, ctx: Ctx): string | undefined =>
  range === 'varies' ? undefined : ctx.c.labels.price[range];

// ─── Records to listings ───

const BLURB_LIMIT = 200;

function clip(text: string, limit = BLURB_LIMIT): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= limit) return flat;
  const cut = flat.slice(0, limit);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

const image = (item: { imageUrl?: string | null; imageAlt?: string | null; name: string }) =>
  item.imageUrl ? { imageUrl: item.imageUrl, imageAlt: item.imageAlt || item.name } : {};

const town = (item: { location: string; nearestTown?: string | null }) => {
  const t = townOf(item);
  return t ? { townId: t.id, townName: t.name } : {};
};

/**
 * The planner zone a saved listing counts towards. The four regions are the
 * listing's destination; anything else counts for the cities zone when the
 * planner's own rule places it in a city.
 */
function planZone(item: Zoneable): { zone: string } | Record<string, never> {
  if ((REGION_FILTERS as readonly string[]).includes(item.destination)) return { zone: item.destination };
  return itemInZone('cities', item, 'place') ? { zone: 'cities' } : {};
}

const dayNumber = (iso: string): number => Date.parse(`${iso}T00:00:00Z`) / 86_400_000;

/** "Today", "Tomorrow" or "In 12 days" for events that start within a month. */
function startStatus(start: string, today: string, ctx: Ctx): ListingStatus | undefined {
  if (start === today) return { label: ctx.c.status.today, live: false };
  if (start === addDays(today, 1)) return { label: ctx.c.status.tomorrow, live: false };
  const days = dayNumber(start) - dayNumber(today);
  return days > 1 && days <= 30 ? { label: fmt(ctx.c.status.inDays, { n: days }), live: false } : undefined;
}

function eventListing(entry: CalendarEvent, record: Event | undefined, today: string, ctx: Ctx): Listing {
  return {
    kind: 'events',
    id: entry.id,
    href: detailHref('events', entry.id),
    name: entry.name,
    blurb: clip(entry.description),
    ...(entry.imageUrl && { imageUrl: entry.imageUrl, imageAlt: entry.imageAlt || entry.name }),
    destination: entry.destination,
    regionLabel: ctx.c.regions[entry.destination],
    place: entry.venue ? `${entry.venue}, ${entry.location}` : entry.location,
    ...town(entry),
    category: entry.eventType,
    categoryLabel: entry.typeLabel,
    priceRange: entry.priceRange,
    priceLabel: entry.isFree ? ctx.event.free : priceLabel(entry.priceRange, ctx),
    ...(record?.organizer && { provider: record.organizer }),
    ...(record && planZone(record)),
    isFeatured: record?.isFeatured ?? false,
    startDate: entry.startDate,
    ...(entry.endDate && { endDate: entry.endDate }),
    dateLabel: entry.dateLabel,
    ...(entry.untilLabel && { nowLabel: fmt(ctx.c.status.onNowUntil, { until: entry.untilLabel }) }),
    status: entry.onNow ? { label: ctx.event.onNow, live: true } : startStatus(entry.startDate, today, ctx),
    tile: entry.tile,
  };
}

function tourListing(x: Experience, ctx: Ctx): Listing {
  return {
    kind: 'tours',
    id: x.id,
    href: detailHref('tours', x.id),
    name: x.name,
    blurb: clip(x.description),
    ...image(x),
    destination: x.destination,
    regionLabel: ctx.c.regions[x.destination],
    place: x.meetingPoint || x.location,
    ...town(x),
    category: x.experienceType,
    categoryLabel: ctx.categories.tours[x.experienceType],
    priceRange: x.priceRange,
    priceLabel: priceLabel(x.priceRange, ctx),
    provider: x.operator,
    ...planZone(x),
    isFeatured: x.isFeatured,
    ...(x.duration && { duration: x.duration }),
  };
}

function stayListing(x: Accommodation, ctx: Ctx): Listing {
  return {
    kind: 'stays',
    id: x.id,
    href: detailHref('stays', x.id),
    name: x.name,
    blurb: clip(x.description),
    ...image(x),
    destination: x.destination,
    regionLabel: ctx.c.regions[x.destination],
    place: x.location,
    ...town(x),
    category: x.accommodationType,
    categoryLabel: ctx.categories.stays[x.accommodationType],
    priceRange: x.priceRange,
    priceLabel: priceLabel(x.priceRange, ctx),
    ...planZone(x),
    isFeatured: x.isFeatured,
  };
}

function eatListing(x: Restaurant, ctx: Ctx): Listing {
  return {
    kind: 'eat',
    id: x.id,
    href: detailHref('eat', x.id),
    name: x.name,
    blurb: clip(x.description),
    ...image(x),
    destination: x.destination,
    regionLabel: ctx.c.regions[x.destination],
    place: x.location,
    ...town(x),
    category: x.cuisineType,
    categoryLabel: ctx.categories.eat[x.cuisineType],
    priceRange: x.priceRange,
    priceLabel: priceLabel(x.priceRange, ctx),
    ...planZone(x),
    isFeatured: x.isFeatured,
  };
}

// Feed order for tours and places. The app is built around photos, so
// featured listings with a photo lead, then other photos, then featured
// listings without one, then the rest. Within a rank the store order holds.
const rank = (l: Listing): number => (l.imageUrl ? 2 : 0) + (l.isFeatured ? 1 : 0);

/**
 * Orders listings by rank. With several source lists (stays and restaurants)
 * each rank alternates between them, so Places does not show 1,000 stays
 * before the first restaurant.
 */
function presentationOrder(...lists: Listing[][]): Listing[] {
  const out: Listing[] = [];
  for (const r of [3, 2, 1, 0]) {
    const queues = lists.map((list) => list.filter((l) => rank(l) === r));
    for (let i = 0; queues.some((q) => i < q.length); i++) {
      for (const q of queues) if (i < q.length) out.push(q[i]);
    }
  }
  return out;
}

async function eventListings(window: CalendarWindow, today: string, ctx: Ctx): Promise<Listing[]> {
  const published = await eventsStore.getPublished();
  const records = new Map(published.map((e) => [e.id, e]));
  return buildCalendar(published, { window, locale: ctx.locale, ui: ctx.event, today }).map((entry) =>
    eventListing(entry, records.get(entry.id), today, ctx)
  );
}

async function tabListings(tab: AppTab, today: string, ctx: Ctx, when: WhenFilter | null = null): Promise<Listing[]> {
  switch (tab) {
    case 'events':
      return eventListings(when ?? 'upcoming', today, ctx);
    case 'tours':
      return presentationOrder((await experiencesStore.getPublished()).map((x) => tourListing(x, ctx)));
    case 'places': {
      const [stays, eat] = await Promise.all([accommodationStore.getPublished(), restaurantsStore.getPublished()]);
      return presentationOrder(
        stays.map((x) => stayListing(x, ctx)),
        eat.map((x) => eatListing(x, ctx))
      );
    }
  }
}

// ─── Search parameters ───

type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

function oneOf<T extends string>(value: string | undefined, allowed: readonly T[]): T | null {
  return value !== undefined && (allowed as readonly string[]).includes(value) ? (value as T) : null;
}

const QUERY_LIMIT = 80;

/** Reads the feed state from the URL. Unknown or out-of-tab values mean "no filter". */
export function parseFeedState(params: SearchParams): FeedState {
  const tab = oneOf(first(params.tab), APP_TABS) ?? DEFAULT_FEED.tab;
  const cat = first(params.cat);
  const limit = Number.parseInt(first(params.limit) ?? '', 10);
  const townId = first(params.town);
  return {
    tab,
    cat: cat && tabCategoryKeys(tab).has(cat) ? cat : null,
    region: oneOf(first(params.region), REGION_FILTERS),
    price: tab === 'events' ? null : oneOf(first(params.price), PRICE_FILTERS),
    when: tab === 'events' ? oneOf(first(params.when), WINDOW_FILTERS) : null,
    town: townId && townById(townId) ? townId : null,
    q: (first(params.q) ?? '').slice(0, QUERY_LIMIT),
    // Multiples of the page size only, so a hand-edited URL cannot ask for everything at once.
    limit: Number.isFinite(limit) && limit > PAGE_SIZE ? Math.min(Math.ceil(limit / PAGE_SIZE), 20) * PAGE_SIZE : PAGE_SIZE,
  };
}

export function parseExploreState(params: SearchParams): ExploreState {
  const tab = oneOf(first(params.tab), APP_TABS) ?? 'events';
  const cat = first(params.cat);
  const known = (id: string | undefined) => (id && townById(id) ? id : null);
  return {
    tab,
    cat: cat && tabCategoryKeys(tab).has(cat) ? cat : null,
    price: tab === 'events' ? null : oneOf(first(params.price), PRICE_FILTERS),
    pin: known(first(params.pin)),
    town: known(first(params.town)),
  };
}

export function parseCalendarState(params: SearchParams): CalendarState {
  return {
    window: oneOf(first(params.window), CALENDAR_WINDOWS) ?? 'upcoming',
    region: oneOf(first(params.region), REGION_FILTERS),
  };
}

// ─── Filtering ───

type FilterKey = 'cat' | 'region' | 'price' | 'town' | 'q';

/**
 * Region filter. An event marked "all" is a nationwide date and shows under
 * every region (the calendar's rule). Tours and places marked "all" are
 * mostly in the big cities (a Trondheim cathedral tour, Oslo restaurants), so
 * they show only when no region is picked.
 */
const inRegion = (l: Listing, region: RegionFilter | null): boolean =>
  l.kind === 'events' ? matchesRegion(l, region) : !region || l.destination === region;

function matcher(state: Pick<FeedState, FilterKey>) {
  const q = foldPlaceName(state.q);
  const tests: Record<FilterKey, (l: Listing) => boolean> = {
    cat: (l) => !state.cat || l.category === state.cat,
    region: (l) => inRegion(l, state.region),
    price: (l) => !state.price || l.priceRange === state.price,
    town: (l) => !state.town || l.townId === state.town,
    q: (l) =>
      !q || foldPlaceName(`${l.name} ${l.place} ${l.categoryLabel} ${l.provider ?? ''} ${l.townName ?? ''}`).includes(q),
  };
  /** Listings that pass every filter except the one being counted. */
  return (items: Listing[], except?: FilterKey) =>
    items.filter((l) => (Object.keys(tests) as FilterKey[]).every((k) => k === except || tests[k](l)));
}

function categoryGroups(tab: AppTab, all: Listing[], counted: Listing[], ctx: Ctx): CategoryGroup[] {
  const kinds = TAB_KINDS[tab];
  return kinds.map((kind) => ({
    ...(kinds.length > 1 && { label: ctx.c.labels.kinds[kind] }),
    // An option is listed when the tab has listings of that kind at all; its
    // count is what selecting it would show with the other filters applied.
    options: CATEGORY_KEYS[kind]
      .filter((value) => all.some((l) => l.kind === kind && l.category === value))
      .map((value) => ({
        value,
        label: ctx.categories[kind][value],
        count: counted.filter((l) => l.kind === kind && l.category === value).length,
      })),
  }));
}

function priceOptions(all: Listing[], counted: Listing[], ctx: Ctx): FilterOption<PriceFilter>[] {
  return PRICE_FILTERS.filter((p) => all.some((l) => l.priceRange === p)).map((p) => ({
    value: p,
    label: ctx.c.labels.price[p],
    count: counted.filter((l) => l.priceRange === p).length,
  }));
}

// ─── Feed ───

export interface FeedResult {
  state: FeedState;
  total: number;
  items: Listing[];
  hasMore: boolean;
  /** Events tab without filters: the lead card and the "Happening soon" rail. */
  featured?: Listing;
  soon: Listing[];
  categories: CategoryGroup[];
  regions: FilterOption<RegionFilter>[];
  prices: FilterOption<PriceFilter>[];
  windows: FilterOption<WhenFilter>[];
  town?: Town;
}

const SOON_COUNT = 8;

/** The lead card: an event on now with a photo, a featured one, then the next with a photo. */
function pickFeatured(events: Listing[]): Listing | undefined {
  return (
    events.find((e) => e.status?.live && e.imageUrl) ??
    events.find((e) => e.isFeatured && e.imageUrl) ??
    events.find((e) => e.imageUrl) ??
    events[0]
  );
}

export async function getFeed(state: FeedState, locale: Locale): Promise<FeedResult> {
  const ctx = context(locale);
  const today = osloToday();
  const all = await tabListings(state.tab, today, ctx, state.when);
  const apply = matcher(state);
  const results = apply(all);

  const curated = state.tab === 'events' && !isFiltered(state);
  const featured = curated ? pickFeatured(results) : undefined;
  const soon = curated ? results.filter((e) => e !== featured && !e.status?.live).slice(0, SOON_COUNT) : [];
  const list = featured ? results.filter((e) => e !== featured) : results;

  let windows: FilterOption<WhenFilter>[] = [];
  if (state.tab === 'events') {
    const counted = await Promise.all(
      WINDOW_FILTERS.map(async (w) => apply(await tabListings('events', today, ctx, w)).length)
    );
    windows = WINDOW_FILTERS.map((w, i) => ({ value: w, label: ctx.c.calendar.windows[w].tab, count: counted[i] }));
  }

  const regionCounted = apply(all, 'region');
  return {
    state,
    total: results.length,
    items: list.slice(0, state.limit),
    hasMore: list.length > state.limit,
    ...(featured && { featured }),
    soon,
    categories: categoryGroups(state.tab, all, apply(all, 'cat'), ctx),
    regions: REGION_FILTERS.map((r) => ({
      value: r,
      label: ctx.c.regions[r],
      count: regionCounted.filter((l) => inRegion(l, r)).length,
    })),
    prices: state.tab === 'events' ? [] : priceOptions(all, apply(all, 'price'), ctx),
    windows,
    ...(state.town && { town: townById(state.town) }),
  };
}

// ─── Calendar ───

export interface CalendarResult {
  state: CalendarState;
  total: number;
  onNow: Listing[];
  months: { key: string; label: string; items: Listing[] }[];
  windows: FilterOption<CalendarWindow>[];
  regions: FilterOption<RegionFilter>[];
  /** The next listed event, when nothing in the window matches. */
  next?: Listing;
}

/** Events by date: on now first, then by start month, with window and region filters. */
export async function getCalendar(state: CalendarState, locale: Locale): Promise<CalendarResult> {
  const ctx = context(locale);
  const today = osloToday();
  const published = await eventsStore.getPublished();
  const records = new Map(published.map((e) => [e.id, e]));
  const entries = (window: CalendarWindow) => buildCalendar(published, { window, locale, ui: ctx.event, today });
  const toListing = (entry: CalendarEvent) => eventListing(entry, records.get(entry.id), today, ctx);
  const inRegionOf = (region: RegionFilter | null) => (e: CalendarEvent) => matchesRegion(e, region);

  const inWindow = entries(state.window);
  const shown = inWindow.filter(inRegionOf(state.region));
  const { onNow, months } = groupCalendar(shown);
  const upcoming = shown.length === 0 ? entries('upcoming') : [];
  const next = upcoming.find(inRegionOf(state.region)) ?? upcoming[0];

  return {
    state,
    total: shown.length,
    onNow: onNow.map(toListing),
    months: months.map((m) => ({ key: m.key, label: m.label, items: m.events.map(toListing) })),
    windows: CALENDAR_WINDOWS.map((w) => ({
      value: w,
      label: ctx.c.calendar.windows[w].tab,
      count: (w === state.window ? inWindow : entries(w)).filter(inRegionOf(state.region)).length,
    })),
    regions: REGION_FILTERS.map((r) => ({
      value: r,
      label: ctx.c.regions[r],
      count: inWindow.filter(inRegionOf(r)).length,
    })),
    ...(next && { next: toListing(next) }),
  };
}

// ─── Explore map ───

export interface MapPin {
  /** Lead town id: the town with the most listings in the pin. */
  id: string;
  name: string;
  left: number;
  top: number;
  count: number;
  towns: FilterOption[];
}

export interface ExploreResult {
  state: ExploreState;
  pins: MapPin[];
  total: number;
  /** Listings whose location names no town in the table. They are not on the map. */
  unplaced: number;
  selected?: { pin: MapPin; town?: Town; items: Listing[]; total: number; feedHref?: string };
  categories: CategoryGroup[];
  prices: FilterOption<PriceFilter>[];
}

const TOWN_LIST_LIMIT = 24;

// Towns closer than this share one pin. The map draws about 0.7 px per unit
// at desktop height, so 40 units is roughly one pin width: Lofoten's villages,
// Bergen and Voss, or Oslo and Fredrikstad each become one pin.
const PIN_RADIUS = 40;

function clusterTowns(byTown: Map<string, Listing[]>): MapPin[] {
  const towns = [...byTown.entries()]
    .map(([id, items]) => ({ town: townById(id) as Town, count: items.length }))
    .sort((a, b) => b.count - a.count);
  const pins: MapPin[] = [];
  const centres: { x: number; y: number }[] = [];
  for (const { town: t, count } of towns) {
    const p = townPoint(t);
    const index = centres.findIndex((c) => Math.hypot(c.x - p.x, c.y - p.y) < PIN_RADIUS);
    const option = { value: t.id, label: t.name, count };
    if (index >= 0) {
      pins[index].count += count;
      pins[index].towns.push(option);
    } else {
      centres.push(p);
      pins.push({ id: t.id, name: t.name, ...townPercent(t), count, towns: [option] });
    }
  }
  return pins;
}

export async function getExplore(state: ExploreState, locale: Locale): Promise<ExploreResult> {
  const ctx = context(locale);
  const all = await tabListings(state.tab, osloToday(), ctx);
  const apply = matcher({ cat: state.cat, price: state.price, region: null, town: null, q: '' });
  const shown = apply(all);

  const byTown = new Map<string, Listing[]>();
  for (const l of shown) {
    if (!l.townId) continue;
    const list = byTown.get(l.townId);
    if (list) list.push(l);
    else byTown.set(l.townId, [l]);
  }

  const pins = clusterTowns(byTown);
  const pin = state.pin ? pins.find((p) => p.id === state.pin) : undefined;
  const town = pin && state.town && pin.towns.some((t) => t.value === state.town) ? townById(state.town) : undefined;
  const items = pin ? (town ? [town.id] : pin.towns.map((t) => t.value)).flatMap((id) => byTown.get(id) ?? []) : [];
  const singleTown = town ?? (pin && pin.towns.length === 1 ? townById(pin.id) : undefined);

  return {
    state,
    pins,
    total: shown.length,
    unplaced: shown.filter((l) => !l.townId).length,
    ...(pin && {
      selected: {
        pin,
        ...(town && { town }),
        items: items.slice(0, TOWN_LIST_LIMIT),
        total: items.length,
        ...(singleTown && {
          feedHref: feedHref({ ...DEFAULT_FEED, tab: state.tab, cat: state.cat, price: state.price, town: singleTown.id }),
        }),
      },
    }),
    categories: categoryGroups(state.tab, all, apply(all, 'cat'), ctx),
    prices: state.tab === 'events' ? [] : priceOptions(all, apply(all, 'price'), ctx),
  };
}

// ─── Detail pages ───

export interface DetailFact {
  label: string;
  value: string;
  sub?: string;
  /** Set when the value is listing data, which is written in English. */
  lang?: 'en';
}

export interface DetailLink {
  label: string;
  url: string;
  rel: string;
}

export interface ListingDetail {
  listing: Listing;
  description: string;
  /** The three-up summary under the title. */
  facts: DetailFact[];
  /** Further facts listed under "Good to know". */
  details: DetailFact[];
  /** Listing data such as amenities, in English. */
  list?: { title: string; items: string[] };
  tags: string[];
  provider?: { name: string; heading: string; role: string };
  links: DetailLink[];
  inShort: string;
  faq: { q: string; a: string }[];
  related: Listing[];
  more: { label: string; href: string }[];
}

const longDate = (iso: string, ctx: Ctx): string => ctx.longDate.format(new Date(`${iso}T00:00:00Z`));

/** "Monday 18 January 2027 to Sunday 24 January 2027", or one date for one-day events. */
const longRange = (start: string, end: string | undefined, ctx: Ctx): string =>
  end && end !== start ? `${longDate(start, ctx)}${ctx.c.dates.longJoin}${longDate(end, ctx)}` : longDate(start, ctx);

/** Data placed before a template's own full stop. */
const bare = (text: string): string => text.trim().replace(/[.。]+$/, '');

const dataFact = (label: string, value: string): DetailFact => ({ label, value, lang: 'en' });

function link(label: string, url: string | null | undefined): DetailLink[] {
  return url ? [{ label, url, rel: outboundRel(url) }] : [];
}

const RELATED_COUNT = 4;

function related(listing: Listing, pool: Listing[]): Listing[] {
  const others = pool.filter((l) => l.id !== listing.id || l.kind !== listing.kind);
  const sameCategory = others.filter((l) => l.kind === listing.kind && l.category === listing.category);
  const near = sameCategory.filter((l) => l.townId && l.townId === listing.townId);
  const sameRegion = sameCategory.filter((l) => l.destination === listing.destination);
  const picked: Listing[] = [];
  for (const l of [...near, ...sameRegion, ...sameCategory]) {
    if (!picked.includes(l)) picked.push(l);
    if (picked.length === RELATED_COUNT) break;
  }
  return picked;
}

/** The price question, when there is something to say. */
function costFaq(listing: Listing, free: boolean, ctx: Ctx): { q: string; a: string }[] {
  const { faq } = ctx.c.detail;
  const name = listing.name;
  const a = free
    ? fmt(faq.costFree, { name })
    : listing.priceLabel
      ? fmt(faq.costBand, { name, band: listing.priceLabel.toLowerCase() })
      : undefined;
  return a ? [{ q: fmt(faq.cost, { name }), a }] : [];
}

// Records are matched on their id field. The stores' getById looks up the JSON
// key, and travel-events.json is an array, so its keys are positions.
const byId = <T extends { id: string }>(records: T[], id: string): T | undefined => records.find((r) => r.id === id);

export async function getListingDetail(kind: ListingKind, id: string, locale: Locale): Promise<ListingDetail | null> {
  const ctx = context(locale);
  const { c } = ctx;
  const d = c.detail;
  const f = d.facts;
  const today = osloToday();
  const tab = TAB_OF_KIND[kind];
  const pool = await tabListings(tab, today, ctx);
  const listing = pool.find((l) => l.kind === kind && l.id === id);

  const base = (l: Listing) => ({
    listing: l,
    tags: [l.regionLabel, ...(l.priceLabel ? [l.priceLabel] : []), ...(l.townName ? [l.townName] : [])],
    related: related(l, pool),
  });
  const varies = c.labels.price.varies;
  // Listings marked "all of Norway" name no region in their sentences.
  const national = listing?.destination === 'all';
  const allPlaces = { label: d.more.allPlaces, href: feedHref({ ...DEFAULT_FEED, tab: 'places' }) };
  const plan = { label: d.more.plan, href: '/app/plan/' };

  switch (kind) {
    case 'events': {
      // Ended events drop out of the calendar, so their pages are gone too.
      const record = byId(await eventsStore.getPublished(), id);
      if (!listing || !record) return null;
      const name = listing.name;
      const when = longRange(record.startDate, record.endDate, ctx);
      const where = record.venue ? `${record.venue}, ${record.location}` : record.location;
      return {
        ...base(listing),
        description: record.description,
        facts: [
          { label: f.when, value: listing.dateLabel ?? when, ...(listing.nowLabel && { sub: listing.nowLabel }) },
          { label: f.where, value: record.venue || record.location, ...(record.venue && { sub: record.location }) },
          { label: f.entry, value: listing.priceLabel ?? f.entryUnknown },
        ],
        details: [
          { label: f.dates, value: when },
          ...(record.isRecurring && record.frequency ? [dataFact(f.repeats, record.frequency)] : []),
          ...(record.capacity ? [dataFact(f.capacity, record.capacity)] : []),
        ],
        tags: [listing.categoryLabel, ...base(listing).tags, ...(record.isRecurring ? [d.tags.recurring] : [])],
        ...(record.organizer && { provider: { name: record.organizer, ...d.provider.organiser } }),
        links: [...link(d.links.tickets, record.ticketUrl), ...link(d.links.organiserSite, record.website)],
        inShort:
          fmt(national ? d.inShort.eventNoRegion : d.inShort.event, {
            name,
            category: listing.categoryLabel,
            where,
            region: listing.regionLabel,
            when,
          }) + (record.isFree ? d.inShort.eventFree : ''),
        faq: [
          { q: fmt(d.faq.when, { name }), a: fmt(d.faq.whenA, { when }) },
          { q: fmt(d.faq.whereEvent, { name }), a: fmt(d.faq.whereEventA, { where }) },
          ...costFaq(listing, record.isFree, ctx),
        ],
        more: [
          { label: d.more.calendar, href: calendarHref() },
          {
            label: fmt(d.more.categoryEvents, { category: listing.categoryLabel }),
            href: feedHref({ ...DEFAULT_FEED, cat: listing.category }),
          },
          {
            label: fmt(d.more.regionEvents, { region: listing.regionLabel }),
            href: calendarHref({ window: 'upcoming', region: regionFilterOf(listing) }),
          },
          { label: d.more.freeEvents, href: calendarHref({ window: 'free', region: null }) },
        ],
      };
    }
    case 'tours': {
      const record = byId(await experiencesStore.getPublished(), id);
      if (!listing || !record) return null;
      const name = listing.name;
      const start = record.meetingPoint || record.location;
      const season = record.seasonalAvailability ? bare(record.seasonalAvailability) : undefined;
      return {
        ...base(listing),
        description: record.description,
        facts: [
          record.duration ? dataFact(f.duration, record.duration) : { label: f.duration, value: f.durationUnknown },
          { label: f.where, value: start, ...(record.meetingPoint && { sub: record.location }) },
          { label: f.price, value: listing.priceLabel ?? varies },
        ],
        details: [
          { label: f.difficulty, value: c.labels.difficulty[record.difficulty] },
          ...(season ? [dataFact(f.season, season)] : []),
          ...(record.minAge != null ? [{ label: f.minAge, value: String(record.minAge) }] : []),
          ...(record.groupSize ? [dataFact(f.groupSize, record.groupSize)] : []),
        ],
        ...(record.includes.length > 0 && { list: { title: d.lists.included, items: record.includes } }),
        tags: [listing.categoryLabel, ...base(listing).tags, c.labels.difficulty[record.difficulty]],
        provider: { name: record.operator, ...d.provider.operator },
        links: link(d.links.operatorSite, record.website),
        inShort:
          fmt(national ? d.inShort.tourNoRegion : d.inShort.tour, {
            name,
            operator: record.operator,
            category: listing.categoryLabel,
            start,
            region: listing.regionLabel,
          }) +
          (record.duration ? fmt(d.inShort.tourDuration, { duration: bare(record.duration) }) : '') +
          (season ? fmt(d.inShort.tourSeason, { season }) : ''),
        faq: [
          ...(season ? [{ q: fmt(d.faq.tourWhen, { name }), a: fmt(d.faq.tourWhenA, { season }) }] : []),
          { q: fmt(d.faq.tourStart, { name }), a: fmt(d.faq.tourStartA, { start }) },
          ...costFaq(listing, false, ctx),
        ],
        more: [
          {
            label: fmt(d.more.categoryTours, { category: listing.categoryLabel.toLowerCase() }),
            href: feedHref({ ...DEFAULT_FEED, tab: 'tours', cat: listing.category }),
          },
          {
            label: fmt(d.more.regionTours, { region: listing.regionLabel }),
            href: feedHref({ ...DEFAULT_FEED, tab: 'tours', region: regionFilterOf(listing) }),
          },
          { label: d.more.allTours, href: feedHref({ ...DEFAULT_FEED, tab: 'tours' }) },
        ],
      };
    }
    case 'stays': {
      const record = byId(await accommodationStore.getPublished(), id);
      if (!listing || !record) return null;
      const name = listing.name;
      const where = record.nearestTown || listing.townName || record.location;
      return {
        ...base(listing),
        description: record.description,
        facts: [
          {
            label: f.type,
            value: listing.categoryLabel,
            ...(record.starRating && { sub: fmt(f.stars, { n: record.starRating }) }),
          },
          { label: f.where, value: where, sub: record.location },
          { label: f.price, value: listing.priceLabel ?? varies },
        ],
        details: [
          ...(record.checkIn ? [dataFact(f.checkIn, record.checkIn)] : []),
          ...(record.checkOut ? [dataFact(f.checkOut, record.checkOut)] : []),
          ...(record.capacity ? [dataFact(f.capacity, record.capacity)] : []),
        ],
        ...(record.amenities.length > 0 && { list: { title: d.lists.amenities, items: record.amenities } }),
        tags: [listing.categoryLabel, ...base(listing).tags, ...(record.isEcoFriendly ? [d.tags.eco] : [])],
        links: link(d.links.website, record.website),
        inShort: fmt(national ? d.inShort.stayNoRegion : d.inShort.stay, {
          name,
          where,
          region: listing.regionLabel,
          category: listing.categoryLabel,
        }),
        faq: [
          { q: fmt(d.faq.where, { name }), a: fmt(d.faq.whereA, { address: bare(record.location) }) },
          ...costFaq(listing, false, ctx),
        ],
        more: [
          { label: fmt(d.more.townStays, { place: listing.townName ?? listing.regionLabel }), href: placesMoreHref(listing) },
          allPlaces,
          plan,
        ],
      };
    }
    case 'eat': {
      const record = byId(await restaurantsStore.getPublished(), id);
      if (!listing || !record) return null;
      const name = listing.name;
      const where = listing.townName ?? listing.regionLabel;
      return {
        ...base(listing),
        description: record.description,
        facts: [
          { label: f.cuisine, value: listing.categoryLabel },
          { label: f.where, value: where, sub: record.location },
          record.averageMealPrice
            ? dataFact(f.price, record.averageMealPrice)
            : { label: f.price, value: listing.priceLabel ?? varies },
        ],
        details: [
          ...(record.openingHours ? [dataFact(f.openingHours, record.openingHours)] : []),
          ...(record.reservationRequired ? [{ label: f.booking, value: f.reservationRequired }] : []),
          ...(record.michelinStars ? [{ label: f.michelin, value: fmt(f.michelinStars, { n: record.michelinStars }) }] : []),
          ...(record.dietaryOptions.length > 0 ? [dataFact(f.dietary, record.dietaryOptions.join(', '))] : []),
        ],
        ...(record.specialties.length > 0 && { list: { title: d.lists.knownFor, items: record.specialties } }),
        tags: [listing.categoryLabel, ...base(listing).tags],
        links: link(d.links.website, record.website),
        inShort: fmt(d.inShort.eat, { name, where, category: listing.categoryLabel, address: bare(record.location) }),
        faq: [
          { q: fmt(d.faq.where, { name }), a: fmt(d.faq.whereA, { address: bare(record.location) }) },
          ...costFaq(listing, false, ctx),
        ],
        more: [
          { label: fmt(d.more.townEat, { place: listing.townName ?? listing.regionLabel }), href: placesMoreHref(listing) },
          allPlaces,
          plan,
        ],
      };
    }
  }
}

function regionFilterOf(listing: Listing): RegionFilter | null {
  return (REGION_FILTERS as readonly string[]).includes(listing.destination) ? (listing.destination as RegionFilter) : null;
}

function placesMoreHref(listing: Listing): string {
  return feedHref({
    ...DEFAULT_FEED,
    tab: 'places',
    cat: listing.category,
    ...(listing.townId ? { town: listing.townId } : { region: regionFilterOf(listing) }),
  });
}
