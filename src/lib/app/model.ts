import type { Destination, PriceRange } from '@/lib/schemas/travel.shared';
import { isCalendarWindow, type CalendarWindow } from '@/lib/event-calendar';

/**
 * Shared vocabulary of the /app section: feed tabs, listing kinds, filter
 * state and the links between screens. Plain data and pure functions only, so
 * server pages and client components read the same rules. Records are turned
 * into listings in ./feed.ts (server only).
 */

// ─── Tabs and listing kinds ───

export const APP_TABS = ['events', 'tours', 'places'] as const;
export type AppTab = (typeof APP_TABS)[number];

/** Detail-page kinds. Places come from two stores whose ids can collide, so each keeps its own kind. */
export const LISTING_KINDS = ['events', 'tours', 'stays', 'eat'] as const;
export type ListingKind = (typeof LISTING_KINDS)[number];

export const isListingKind = (value: string): value is ListingKind =>
  (LISTING_KINDS as readonly string[]).includes(value);

export const TAB_OF_KIND: Record<ListingKind, AppTab> = {
  events: 'events',
  tours: 'tours',
  stays: 'places',
  eat: 'places',
};

// ─── Filters ───

export const PRICE_FILTERS = ['budget', 'mid-range', 'luxury'] as const;
export type PriceFilter = (typeof PRICE_FILTERS)[number];

/** Event windows offered as quick chips. "upcoming" is the unfiltered list. */
export type WhenFilter = Exclude<CalendarWindow, 'upcoming'>;

export const REGION_FILTERS = ['northern-norway', 'lofoten', 'fjords', 'svalbard'] as const satisfies readonly Destination[];
export type RegionFilter = (typeof REGION_FILTERS)[number];

export const PAGE_SIZE = 12;

export interface FeedState {
  tab: AppTab;
  /** Category key within the tab: an event type, tour type, stay type or cuisine. */
  cat: string | null;
  region: RegionFilter | null;
  price: PriceFilter | null;
  when: WhenFilter | null;
  town: string | null;
  q: string;
  /** How many listings are shown; "Show more" raises it by PAGE_SIZE. */
  limit: number;
}

export const DEFAULT_FEED: FeedState = {
  tab: 'events',
  cat: null,
  region: null,
  price: null,
  when: null,
  town: null,
  q: '',
  limit: PAGE_SIZE,
};

/** True when anything narrows the list, so the feed shows results instead of its curated sections. */
export const isFiltered = (s: FeedState): boolean =>
  Boolean(s.cat || s.region || s.price || s.when || s.town || s.q);

// ─── Links ───

const query = (entries: [string, string | null | undefined][]): string => {
  const params = new URLSearchParams();
  for (const [key, value] of entries) if (value) params.set(key, value);
  const text = params.toString();
  return text ? `?${text}` : '';
};

/**
 * Feed URL for a state with a patch applied. Changing the tab clears the
 * filters that belong to the old tab; changing any filter resets "Show more".
 */
export function feedHref(state: FeedState, patch: Partial<FeedState> = {}): string {
  const tabChanged = patch.tab !== undefined && patch.tab !== state.tab;
  const base: FeedState = tabChanged
    ? { ...DEFAULT_FEED, tab: patch.tab as AppTab, region: state.region, q: state.q }
    : state;
  const next: FeedState = { ...base, ...patch };
  if (patch.limit === undefined) next.limit = PAGE_SIZE;
  return `/app/${query([
    ['tab', next.tab === 'events' ? null : next.tab],
    ['cat', next.cat],
    ['region', next.region],
    ['price', next.price],
    ['when', next.when],
    ['town', next.town],
    ['q', next.q.trim()],
    ['limit', next.limit > PAGE_SIZE ? String(next.limit) : null],
  ])}`;
}

export const detailHref = (kind: ListingKind, id: string): string => `/app/${kind}/${encodeURIComponent(id)}/`;

export const guideHref = (category: string, slug: string): string => `/app/guides/${category}/${slug}/`;

export interface CalendarState {
  window: CalendarWindow;
  region: RegionFilter | null;
}

export const DEFAULT_CALENDAR: CalendarState = { window: 'upcoming', region: null };

export function calendarHref(state: CalendarState = DEFAULT_CALENDAR, patch: Partial<CalendarState> = {}): string {
  const next = { ...state, ...patch };
  return `/app/calendar/${query([
    ['window', next.window === 'upcoming' ? null : next.window],
    ['region', next.region],
  ])}`;
}

// Site pages that list one kind of record, where "#id" points at a card.
const LISTING_PAGES: Record<string, ListingKind> = {
  '/travel/experiences/': 'tours',
  '/travel/events/': 'events',
  '/travel/accommodation/': 'stays',
  '/travel/restaurants/': 'eat',
};

// The same pages without an anchor, and the /travel hub, open the app's lists.
const LIST_SCREENS: Record<string, string> = {
  '/travel/': '/app/',
  '/travel/experiences/': '/app/?tab=tours',
  '/travel/accommodation/': '/app/?tab=places',
  '/travel/restaurants/': '/app/?tab=places',
};

// The events calendar and its window pages, /travel/events/winter/ and so on.
const CALENDAR_PAGE = /^\/travel\/events\/(?:([a-z0-9-]+)\/)?$/;

const GUIDE_SECTION_IDS = ['safety', 'trip-reports', 'planning'];

const regionParam = (search: string): RegionFilter | null => {
  const region = new URLSearchParams(search).get('region');
  return (REGION_FILTERS as readonly string[]).includes(region ?? '') ? (region as RegionFilter) : null;
};

/**
 * The app screen for a site link, or the link unchanged when the app has no
 * screen for it. Shared components (the planner, saved items, article bodies)
 * link to site pages; inside the app those links open the app's own screens.
 * Planner links keep their query, which pre-fills regions and interests.
 */
export function appHref(href: string): string {
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const match = /^(\/(?:en|zh|ja)(?=\/|$))?([^?#]*)(\?[^#]*)?(#.*)?$/.exec(href);
  if (!match) return href;
  const [, prefix = '', rawPath, search = '', hash = ''] = match;
  const path = rawPath.endsWith('/') ? rawPath : `${rawPath}/`;
  const anchor = decodeURIComponent(hash.slice(1));
  const guide = /^\/travel-guides\/([a-z-]+)\/([^/]+)\/$/.exec(path);
  const calendar = CALENDAR_PAGE.exec(path);
  const calendarWindow = calendar ? calendar[1] ?? 'upcoming' : null;

  let target: string | null = null;
  if (path === '/plan/' || /^\/plan\/[a-z-]+\/$/.test(path)) target = `/app/plan/${search}`;
  else if (path === '/my-trip/') target = '/app/saved/';
  else if (path === '/travel-guides/') target = GUIDE_SECTION_IDS.includes(anchor) ? `/app/guides/?section=${anchor}` : '/app/guides/';
  else if (guide) target = `${guideHref(guide[1], guide[2])}${hash}`;
  // Calendar anchors are "event-<id>" (eventAnchor); the planner links plain ids.
  else if (calendar && anchor) target = detailHref('events', anchor.replace(/^event-/, ''));
  else if (calendarWindow && isCalendarWindow(calendarWindow))
    target = calendarHref({ window: calendarWindow, region: regionParam(search) });
  else if (anchor && LISTING_PAGES[path]) target = detailHref(LISTING_PAGES[path], anchor);
  else if (LIST_SCREENS[path]) target = LIST_SCREENS[path];
  return target ? `${prefix}${target}` : href;
}

export interface ExploreState {
  tab: AppTab;
  cat: string | null;
  price: PriceFilter | null;
  /** Selected map pin, named by its lead town. A pin can hold several nearby towns. */
  pin: string | null;
  /** One town inside the selected pin. */
  town: string | null;
}

export function exploreHref(state: ExploreState, patch: Partial<ExploreState> = {}): string {
  const tabChanged = patch.tab !== undefined && patch.tab !== state.tab;
  // A new tab or category redraws the pins, so the selection is dropped.
  const redraws = tabChanged || patch.cat !== undefined || patch.price !== undefined;
  const next: ExploreState = {
    ...state,
    ...(tabChanged && { cat: null, price: null }),
    ...(redraws && { pin: null, town: null }),
    ...patch,
  };
  if (patch.pin !== undefined && patch.town === undefined) next.town = null;
  return `/app/explore/${query([
    ['tab', next.tab === 'events' ? null : next.tab],
    ['cat', next.cat],
    ['price', next.price],
    ['pin', next.pin],
    ['town', next.town],
  ])}`;
}

// ─── Serializable listing ───

export interface ListingStatus {
  label: string;
  /** Running today. */
  live: boolean;
}

export interface Listing {
  kind: ListingKind;
  id: string;
  href: string;
  name: string;
  /** Description clipped for cards. */
  blurb: string;
  imageUrl?: string;
  imageAlt?: string;
  destination: Destination;
  regionLabel: string;
  /** Venue, meeting point or address shown on cards. */
  place: string;
  townId?: string;
  townName?: string;
  category: string;
  categoryLabel: string;
  priceRange: PriceRange;
  /** "Free entry", "Mid-range" and so on. Absent when the price is unknown. */
  priceLabel?: string;
  provider?: string;
  /** Planner zone, so saved listings feed the trip planner's route. */
  zone?: string;
  isFeatured: boolean;
  // Events only
  startDate?: string;
  endDate?: string;
  dateLabel?: string;
  /** "On now, until Wed 15 Apr" for multi-day events running today. */
  nowLabel?: string;
  status?: ListingStatus;
  tile?: { month: string; day: string; weekday: string };
  // Tours only
  duration?: string;
}

export interface FilterOption<V extends string = string> {
  value: V;
  label: string;
  count: number;
}

export interface CategoryGroup {
  /** Shown above the group when a tab has more than one, as Places does. */
  label?: string;
  options: FilterOption[];
}
