import { experiencesStore } from '@/lib/admin/travel-experiences';
import { accommodationStore } from '@/lib/admin/travel-accommodation';
import { eventsStore } from '@/lib/admin/travel-events';
import { itemInZone, rankItems, ratingOf, reviewCountOf, type PlanZoneId } from '@/lib/planner-data';
import type { Locale } from '@/lib/i18n-seo';
import type { Experience } from '@/lib/schemas/travel.experiences.schema';
import type { Accommodation } from '@/lib/schemas/travel.accommodation.schema';
import type { Event } from '@/lib/schemas/travel.events.schema';
import { PLAN_TEXT, type LightId, type PlanGuideKey, type PlanText, type SeasonLabelId } from '@/i18n/plan-text';
import { PLAN_UI, type PlanUiCopy } from '@/i18n/plan-ui';
import { LISTING_LABELS } from '@/i18n/listing-labels';
import { fmt, plural } from '@/i18n/format';
import type { TripBudget, TripInterest, TripItemCategory, TripMobility, TripPace } from '@/types/trip';

/**
 * Phase 2 of the trip planner: a rule engine over our own data.
 * Everything it says comes from a data file or a guide on this site, and
 * every line carries the link it came from. Deterministic, so the same
 * inputs always give the same plan. The Phase 3 agent gets these functions
 * as its tools.
 *
 * This module decides which lines apply; what they say, in English, Chinese
 * or Japanese, lives in @/i18n/plan-text. Listing names and places are data
 * and stay as stored.
 */

// ── Types ───────────────────────────────────────────────────────────────────

export type PlanSeason = 'winter' | 'spring' | 'summer' | 'autumn';

export interface PlanRequest {
  startDate?: string;
  endDate?: string;
  travellers?: number;
  interests: TripInterest[];
  pace?: TripPace;
  mobility?: TripMobility;
  budget?: TripBudget;
  zones: PlanZoneId[];
  /** Ids already in the visitor's trip; they are not suggested again. */
  savedIds: string[];
  /** Language the plan is written in. English when absent. */
  locale?: Locale;
}

export interface PlanLink {
  label: string;
  href: string;
}

export interface PlanLine {
  id: string;
  text: string;
  detail?: string;
  links: PlanLink[];
}

export type LegMethod = 'fly' | 'drive' | 'ferry' | 'coastal-ship' | 'train' | 'bus';

export interface RouteLeg {
  id: string;
  from: string;
  to: string;
  method: LegMethod;
  text: string;
  links: PlanLink[];
}

export interface Suggestion {
  id: string;
  name: string;
  category: TripItemCategory;
  zone: PlanZoneId;
  location?: string;
  priceRange?: string;
  imageUrl?: string | null;
  href?: string;
  why: string;
  startDate?: string;
  endDate?: string;
  rating?: number;
  reviews?: number;
}

export interface PlanResult {
  generatedAt: string;
  window: { startDate?: string; endDate?: string; nights?: number; season?: PlanSeason; months: number[] };
  zones: { id: PlanZoneId; name: string }[];
  light: PlanLine[];
  fit: PlanLine[];
  route: { legs: RouteLeg[]; method: PlanLine[] };
  activities: Suggestion[];
  skippedActivities: { count: number; examples: string[] };
  events: Suggestion[];
  stays: Suggestion[];
  stayNote?: string;
  kit: PlanLine[];
  sources: PlanLink[];
}

// ── Links to the guides the engine cites ────────────────────────────────────

const GUIDE_HREF: Record<PlanGuideKey, string> = {
  northernLights: '/tjenester/northern-lights',
  tromso: '/destinations/tromso',
  lofoten: '/destinations/lofoten',
  svalbard: '/destinations/svalbard',
  fjords: '/destinations/fjords',
  northernNorway: '/destinations/northern-norway',
  cities: '/destinations/cities',
  lyngen: '/destinations/lyngen',
  transport: '/travel/transport',
  packing: '/travel-guides/safety/arctic-norway-packing-guide',
  winterDriving: '/travel-guides/safety/winter-driving-norway-tires-chains-road-closures',
  mountainCode: '/travel-guides/safety/fjellvettreglene-mountain-code',
  ferries: '/travel-guides/planning/norway-ferry-guide',
  bergenToLofoten: '/travel-guides/planning/bergen-to-lofoten-routes',
  tromsoToLofoten: '/travel-guides/planning/tromso-to-lofoten-routes',
  bergenRailway: '/travel-guides/trip-reports/bergen-railway-oslo-bergen',
  hurtigruten: '/travel-guides/trip-reports/hurtigruten-bergen-tromso',
  whales: '/travel-guides/trip-reports/whale-safari-skjervoy-tromso',
  sledding: '/travel-guides/trip-reports/dog-sledding-vs-reindeer-sledding-tromso',
  dnt: '/travel-guides/planning/dnt-cabin-guide',
  bestTime: '/travel-guides/planning/best-time-visit-norway',
  cost: '/travel-guides/planning/norway-cost-budget-guide',
  norrona: 'https://www.norrona.com/',
  hours57: 'https://57hours.com/adventure/lofoten-islands-self-guided-hiking-tour/',
};

// ── Dates and seasons ───────────────────────────────────────────────────────

interface MonthDay {
  m: number;
  d: number;
}

const MS_PER_DAY = 86_400_000;

function parseDate(value?: string): Date | null {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function nightsBetween(start: Date, end: Date): number {
  return Math.max(0, Math.round((end.getTime() - start.getTime()) / MS_PER_DAY));
}

/** Months the trip touches, in calendar order. With no dates, an empty list. */
function monthsCovered(start: Date | null, end: Date | null): number[] {
  if (!start) return [];
  const last = end && end > start ? end : start;
  const months: number[] = [];
  const cursor = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), 1));
  while (cursor <= last && months.length < 12) {
    months.push(cursor.getUTCMonth() + 1);
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return months;
}

export function seasonOfMonth(month: number): PlanSeason {
  if (month === 11 || month === 12 || month <= 2) return 'winter';
  if (month <= 5) return 'spring';
  if (month <= 8) return 'summer';
  return 'autumn';
}

/** Day of year for a month and day, used to compare windows that may wrap the new year. */
const dayIndex = (m: number, d: number) => m * 31 + d;

/** True when the trip touches the window. Windows may wrap over New Year (polar night, aurora season). */
function tripTouches(start: Date | null, end: Date | null, months: number[], from: MonthDay, to: MonthDay): boolean {
  if (!start) {
    return months.some((month) => monthInWindow(month, from, to));
  }
  const last = end && end > start ? end : start;
  const cursor = new Date(start.getTime());
  let guard = 0;
  while (cursor <= last && guard < 400) {
    if (dayInWindow(cursor.getUTCMonth() + 1, cursor.getUTCDate(), from, to)) return true;
    cursor.setUTCDate(cursor.getUTCDate() + 1);
    guard += 1;
  }
  return false;
}

function dayInWindow(m: number, d: number, from: MonthDay, to: MonthDay): boolean {
  const x = dayIndex(m, d);
  const a = dayIndex(from.m, from.d);
  const b = dayIndex(to.m, to.d);
  return a <= b ? x >= a && x <= b : x >= a || x <= b;
}

function monthInWindow(month: number, from: MonthDay, to: MonthDay): boolean {
  return dayInWindow(month, 15, from, to) || dayInWindow(month, 1, from, to) || dayInWindow(month, 28, from, to);
}

function monthsInWindow(from: MonthDay, to: MonthDay): number[] {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((m) => monthInWindow(m, from, to));
}

const MONTH_NAMES = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const SEASON_MONTHS: Record<string, [number, number]> = { winter: [12, 2], spring: [3, 5], summer: [6, 8], autumn: [9, 11] };

/** Reads "October – February", "Spring – autumn" or "June – August (ice-free sailing)" into months. Null when it says nothing useful. */
export function parseSeasonText(text?: string | null): number[] | null {
  if (!text) return null;
  const lower = text.toLowerCase();
  if (/year[- ]round|all year/.test(lower)) return null;
  const tokens = lower.match(/\b(january|february|march|april|may|june|july|august|september|october|november|december|winter|spring|summer|autumn|fall)\b/g);
  if (!tokens || tokens.length === 0) return null;
  const toRange = (token: string): [number, number] => {
    const index = MONTH_NAMES.indexOf(token);
    if (index >= 0) return [index + 1, index + 1];
    return SEASON_MONTHS[token === 'fall' ? 'autumn' : token];
  };
  const first = toRange(tokens[0]);
  const last = toRange(tokens[tokens.length - 1]);
  return monthsInWindow({ m: first[0], d: 1 }, { m: last[1], d: 28 });
}

// ── What the light does, per region ─────────────────────────────────────────

interface LightWindow {
  from: MonthDay;
  to: MonthDay;
  text: LightId;
  link: PlanGuideKey;
}

const LIGHT: Partial<Record<PlanZoneId, LightWindow[]>> = {
  'northern-norway': [
    { from: { m: 9, d: 20 }, to: { m: 3, d: 31 }, text: 'nnAurora', link: 'northernLights' },
    { from: { m: 11, d: 27 }, to: { m: 1, d: 15 }, text: 'nnPolarNight', link: 'tromso' },
    { from: { m: 5, d: 20 }, to: { m: 7, d: 22 }, text: 'nnMidnightSun', link: 'tromso' },
  ],
  lofoten: [
    { from: { m: 9, d: 1 }, to: { m: 3, d: 31 }, text: 'lofotenAurora', link: 'lofoten' },
    { from: { m: 5, d: 28 }, to: { m: 7, d: 14 }, text: 'lofotenMidnightSun', link: 'lofoten' },
    { from: { m: 1, d: 1 }, to: { m: 4, d: 30 }, text: 'lofotenSkrei', link: 'lofoten' },
  ],
  svalbard: [
    { from: { m: 10, d: 26 }, to: { m: 2, d: 15 }, text: 'svalbardPolarNight', link: 'svalbard' },
    { from: { m: 4, d: 20 }, to: { m: 8, d: 20 }, text: 'svalbardMidnightSun', link: 'svalbard' },
  ],
  fjords: [
    { from: { m: 10, d: 15 }, to: { m: 5, d: 20 }, text: 'fjordsClosures', link: 'winterDriving' },
    { from: { m: 6, d: 15 }, to: { m: 8, d: 31 }, text: 'fjordsPeak', link: 'ferries' },
  ],
};

// ── Activity seasons and interest matching ─────────────────────────────────

interface ActivityRule {
  id: string;
  test: (item: Experience) => boolean;
  months: number[];
  label: SeasonLabelId;
  link: PlanGuideKey;
}

const nameAndText = (item: Experience) => `${item.name} ${item.description}`;

const ACTIVITY_RULES: ActivityRule[] = [
  { id: 'aurora', test: (e) => e.experienceType === 'northern-lights' || /aurora|northern lights/i.test(nameAndText(e)), months: [9, 10, 11, 12, 1, 2, 3], label: 'aurora', link: 'northernLights' },
  { id: 'midnight-sun', test: (e) => /midnight sun/i.test(e.name), months: [5, 6, 7], label: 'midnightSun', link: 'tromso' },
  { id: 'whales', test: (e) => e.experienceType === 'whale-watching' || /whale/i.test(e.name), months: [10, 11, 12, 1], label: 'whales', link: 'whales' },
  { id: 'dog-sledding', test: (e) => e.experienceType === 'dog-sledding' || /dog sled|husky/i.test(e.name), months: [11, 12, 1, 2, 3, 4, 5], label: 'snow', link: 'sledding' },
  { id: 'reindeer', test: (e) => /reindeer sled/i.test(e.name), months: [11, 12, 1, 2, 3, 4], label: 'reindeer', link: 'sledding' },
  { id: 'snowmobile', test: (e) => e.experienceType === 'snowmobile' || /snowmobile/i.test(e.name), months: [2, 3, 4, 5], label: 'frozenGround', link: 'svalbard' },
  // The data has no plain "hiking" type, so most hikes are typed glacier-hike; only a glacier in the name gets the glacier window
  { id: 'glacier', test: (e) => /glacier/i.test(e.name), months: [5, 6, 7, 8, 9], label: 'glacier', link: 'fjords' },
  { id: 'hiking-typed', test: (e) => e.experienceType === 'glacier-hike', months: [6, 7, 8, 9], label: 'snowFreeTrails', link: 'mountainCode' },
  { id: 'kayak', test: (e) => e.experienceType === 'kayaking' || /kayak|paddle/i.test(e.name), months: [6, 7, 8], label: 'iceFreeFjords', link: 'lofoten' },
  { id: 'skrei', test: (e) => /skrei|cod fishing/i.test(e.name), months: [1, 2, 3, 4], label: 'skrei', link: 'lofoten' },
  { id: 'ski', test: (e) => /ski tour|ski touring|skiing|\bski\b/i.test(e.name), months: [2, 3, 4, 5], label: 'ski', link: 'lyngen' },
  { id: 'hiking', test: (e) => /\bhik|trek|trail|summit|ridge|stairs|steps\b/i.test(e.name), months: [6, 7, 8, 9], label: 'snowFreeTrails', link: 'mountainCode' },
];

function activityMonths(item: Experience): { months: number[] | null; rule?: ActivityRule } {
  const parsed = parseSeasonText(item.seasonalAvailability);
  const rule = ACTIVITY_RULES.find((candidate) => candidate.test(item));
  if (parsed) return { months: parsed, rule };
  return { months: rule?.months ?? null, rule };
}

const INTEREST_TESTS: Record<TripInterest, (item: Experience) => boolean> = {
  aurora: (e) => e.experienceType === 'northern-lights' || /aurora|northern lights/i.test(nameAndText(e)),
  'midnight-sun': (e) => /midnight sun/i.test(nameAndText(e)),
  hiking: (e) => e.experienceType === 'glacier-hike' || /\bhik|trek|trail|summit|ridge|glacier/i.test(e.name),
  fjords: (e) => e.experienceType === 'fjord-cruise' || /fjord|ferry|cruise|rib\b/i.test(e.name),
  wildlife: (e) => e.experienceType === 'whale-watching' || /whale|eagle|puffin|wildlife|reindeer|walrus|polar bear|seal|safari/i.test(e.name),
  'sami-culture': (e) => /sami|sámi|reindeer|lavvu|joik|karasjok|kautokeino|duodji/i.test(nameAndText(e)),
  food: (e) => /food|tasting|brewery|culinary|skrei|seafood|dinner|cider|kitchen|cook/i.test(e.name),
  cities: (e) => /walking tour|city|museum|bryggen|fløibanen|old town|street art|architecture/i.test(e.name),
  family: (e) => e.difficulty === 'easy' && /family|kids|children|reindeer|husky|dog sled|aquarium|museum/i.test(nameAndText(e)),
  photography: (e) => e.experienceType === 'photography-tour' || /photo/i.test(e.name),
};

/** Which zones to suggest when the visitor has named none and saved nothing. */
export const INTEREST_ZONES: Record<TripInterest, PlanZoneId[]> = {
  aurora: ['northern-norway'],
  'midnight-sun': ['northern-norway'],
  hiking: ['lofoten', 'fjords'],
  fjords: ['fjords'],
  wildlife: ['northern-norway'],
  'sami-culture': ['northern-norway'],
  food: ['cities'],
  cities: ['cities'],
  family: ['fjords'],
  photography: ['lofoten'],
};

// ── Route ───────────────────────────────────────────────────────────────────

/** South to north along the coast, the order the legs assume. */
const CANONICAL_ORDER: PlanZoneId[] = ['cities', 'fjords', 'boat-routes', 'lofoten', 'northern-norway', 'svalbard'];

interface LegContext {
  car: boolean;
  winter: boolean;
  summer: boolean;
}

/** A leg as the rules give it: the method, the text and the guides it cites. */
interface LegRule {
  method: LegMethod;
  text: string;
  links: PlanGuideKey[];
}

type LegText = PlanText['legs'];
type ArrivalText = PlanText['arrival'];

const ARRIVAL: Record<PlanZoneId, (ctx: LegContext, a: ArrivalText) => LegRule> = {
  cities: (_, a) => ({ method: 'fly', text: a.cities, links: ['bergenRailway', 'cities'] }),
  fjords: (ctx, a) => ({ method: 'fly', text: ctx.car ? a.fjordsCar : a.fjordsNoCar, links: ['ferries', 'fjords'] }),
  'boat-routes': (_, a) => ({ method: 'coastal-ship', text: a.boat, links: ['hurtigruten', 'transport'] }),
  lofoten: (ctx, a) => ({ method: 'fly', text: ctx.car ? a.lofotenCar : a.lofotenNoCar, links: ['bergenToLofoten', 'lofoten'] }),
  'northern-norway': (ctx, a) => ({ method: 'fly', text: ctx.winter && !ctx.car ? a.nnWinterNoCar : a.nn, links: ['tromso', 'transport'] }),
  svalbard: (_, a) => ({ method: 'fly', text: a.svalbard, links: ['svalbard'] }),
};

const ARRIVAL_ID: Record<PlanZoneId, string> = {
  cities: 'arrive-cities',
  fjords: 'arrive-fjords',
  'boat-routes': 'arrive-boat',
  lofoten: 'arrive-lofoten',
  'northern-norway': 'arrive-nn',
  svalbard: 'arrive-svalbard',
};

const LEGS: Record<string, (ctx: LegContext, l: LegText) => LegRule> = {
  'cities>fjords': (ctx, l) =>
    ctx.car
      ? { method: 'drive', text: l.citiesFjordsCar, links: ['ferries', 'fjords'] }
      : { method: 'train', text: l.citiesFjordsNoCar, links: ['bergenRailway', 'fjords'] },
  'cities>boat-routes': (_, l) => ({ method: 'coastal-ship', text: l.citiesBoat, links: ['hurtigruten'] }),
  'fjords>boat-routes': (_, l) => ({ method: 'coastal-ship', text: l.fjordsBoat, links: ['hurtigruten'] }),
  'cities>lofoten': (ctx, l) => ({ method: 'fly', text: ctx.car ? l.citiesLofotenCar : l.citiesLofotenNoCar, links: ['bergenToLofoten'] }),
  'fjords>lofoten': (ctx, l) => ({ method: 'fly', text: ctx.car ? l.fjordsLofotenCar : l.fjordsLofotenNoCar, links: ['bergenToLofoten'] }),
  'boat-routes>lofoten': (_, l) => ({ method: 'coastal-ship', text: l.boatLofoten, links: ['lofoten'] }),
  'lofoten>northern-norway': (ctx, l) =>
    ctx.car
      ? {
          method: 'drive',
          text: l.lofotenNnCar + (ctx.winter ? l.lofotenNnCarWinter : l.lofotenNnCarOther),
          links: ['tromsoToLofoten', 'winterDriving'],
        }
      : { method: 'fly', text: l.lofotenNnNoCar, links: ['tromsoToLofoten', 'hurtigruten'] },
  'boat-routes>northern-norway': (_, l) => ({ method: 'coastal-ship', text: l.boatNn, links: ['hurtigruten'] }),
  'fjords>northern-norway': (_, l) => ({ method: 'fly', text: l.fjordsNn, links: ['hurtigruten', 'transport'] }),
  'cities>northern-norway': (ctx, l) => ({ method: 'fly', text: ctx.car ? l.citiesNnCar : l.citiesNnNoCar, links: ['tromso', 'transport'] }),
  'northern-norway>svalbard': (_, l) => ({ method: 'fly', text: l.nnSvalbard, links: ['svalbard'] }),
  'lofoten>svalbard': (_, l) => ({ method: 'fly', text: l.lofotenSvalbard, links: ['svalbard'] }),
  'cities>svalbard': (_, l) => ({ method: 'fly', text: l.citiesSvalbard, links: ['svalbard'] }),
  'fjords>svalbard': (_, l) => ({ method: 'fly', text: l.fjordsSvalbard, links: ['svalbard'] }),
  'boat-routes>svalbard': (_, l) => ({ method: 'fly', text: l.boatSvalbard, links: ['svalbard'] }),
};

// ── Public entry point ──────────────────────────────────────────────────────

const NIGHTS_PER_ZONE: Record<TripPace, number> = { relaxed: 4, steady: 3, packed: 2 };

export async function buildPlan(request: PlanRequest): Promise<PlanResult> {
  const locale = request.locale ?? 'en';
  const t = PLAN_TEXT[locale];
  const ui: PlanUiCopy = PLAN_UI[locale];
  const labels = LISTING_LABELS[locale];
  const zoneName = (id: PlanZoneId): string => ui.zones[id] ?? id;
  const dayFormat = new Intl.DateTimeFormat(t.dateLocale, { day: 'numeric', month: 'short', timeZone: 'UTC' });
  const formatDate = (value: string) => {
    const date = parseDate(value);
    return date ? dayFormat.format(date) : value;
  };

  const start = parseDate(request.startDate);
  const end = parseDate(request.endDate);
  const months = monthsCovered(start, end);
  const nights = start && end && end > start ? nightsBetween(start, end) : undefined;
  const season = months.length ? seasonOfMonth(months[0]) : undefined;
  const winterish = months.some((m) => m >= 10 || m <= 4);
  const summerish = months.some((m) => m >= 6 && m <= 8);
  const zones = CANONICAL_ORDER.filter((zone) => request.zones.includes(zone));
  const saved = new Set(request.savedIds);
  const ctx: LegContext = { car: request.mobility === 'car', winter: winterish, summer: summerish };
  const sources = new Map<string, PlanLink>();
  const link = (key: PlanGuideKey): PlanLink => ({ label: t.guides[key], href: GUIDE_HREF[key] });
  const cite = (...keys: PlanGuideKey[]) => {
    const links = keys.map(link);
    for (const l of links) sources.set(l.href, l);
    return links;
  };

  // Light and season
  const light: PlanLine[] = [];
  for (const zone of zones) {
    for (const [i, window] of (LIGHT[zone] ?? []).entries()) {
      if (months.length === 0 || tripTouches(start, end, months, window.from, window.to)) {
        light.push({ id: `light-${zone}-${i}`, text: t.light[window.text], links: cite(window.link) });
      }
    }
  }
  if (months.length === 0 && zones.length > 0) {
    light.unshift({ id: 'light-no-dates', text: t.lightNoDates, links: cite('bestTime') });
  }

  // Does it fit
  const fit: PlanLine[] = [];
  if (zones.length > 2) {
    fit.push({ id: 'fit-regions', text: fmt(t.fit.regions, { n: zones.length }), links: cite('bestTime') });
  }
  if (nights !== undefined && zones.length > 0) {
    const pace: TripPace = request.pace ?? 'steady';
    const needed = zones.reduce((sum, zone) => sum + NIGHTS_PER_ZONE[pace] + (zone === 'svalbard' ? 1 : 0), 0);
    const vars = { nights, regions: plural(t.fit.regionCount, zones.length), pace: ui.paces[pace].label.toLowerCase() };
    if (nights < needed) {
      fit.push({ id: 'fit-nights', text: fmt(t.fit.short, { ...vars, short: needed - nights }), links: cite('bestTime') });
    } else {
      fit.push({ id: 'fit-ok', text: fmt(t.fit.ok, { ...vars, per: NIGHTS_PER_ZONE[pace] }), links: [] });
    }
  } else if (zones.length > 0) {
    fit.push({ id: 'fit-no-dates', text: t.fit.noDates, links: [] });
  }

  // Route and getting around
  const legs: RouteLeg[] = [];
  if (zones.length) {
    const first = ARRIVAL[zones[0]](ctx, t.arrival);
    legs.push({ id: ARRIVAL_ID[zones[0]], from: t.home, to: zoneName(zones[0]), method: first.method, text: first.text, links: cite(...first.links) });
    for (let i = 1; i < zones.length; i += 1) {
      const from = zones[i - 1];
      const to = zones[i];
      const rule = LEGS[`${from}>${to}`]?.(ctx, t.legs) ?? {
        method: 'fly' as const,
        text: fmt(t.legs.fallback, { from: zoneName(from), to: zoneName(to) }),
        links: ['transport' as const],
      };
      legs.push({ id: `${from}-${to}`, from: zoneName(from), to: zoneName(to), method: rule.method, text: rule.text, links: cite(...rule.links) });
    }
  }
  const method: PlanLine[] = [];
  if (!request.mobility && zones.length) {
    method.push({ id: 'method-mobility', text: t.method.mobility, links: [] });
  }
  if (ctx.car && (zones.includes('northern-norway') || zones.includes('lofoten')) && winterish) {
    method.push({ id: 'method-studs', text: t.method.studs, links: cite('winterDriving') });
  }
  if (!ctx.car && zones.includes('northern-norway') && winterish) {
    method.push({ id: 'method-tromso-base', text: t.method.tromsoBase, links: cite('tromso', 'transport') });
  }
  if (ctx.car && zones.includes('lofoten')) {
    method.push({ id: 'method-bodo-ferry', text: t.method.bodoFerry, links: cite('ferries') });
  }
  if (ctx.car && zones.includes('fjords') && summerish) {
    method.push({ id: 'method-fjord-queues', text: t.method.fjordQueues, links: cite('ferries') });
  }
  if (zones.includes('boat-routes')) {
    method.push({ id: 'method-coastal', text: t.method.coastal, links: cite('hurtigruten', 'transport') });
  }
  if (zones.includes('svalbard')) {
    method.push({ id: 'method-svalbard-guide', text: t.method.svalbardGuide, links: cite('svalbard') });
  }

  // Data
  const [experiences, stays, events] = await Promise.all([
    experiencesStore.getPublished(),
    accommodationStore.getPublished(),
    eventsStore.getPublished(),
  ]);

  // Activities
  const activities: Suggestion[] = [];
  const skipped: string[] = [];
  for (const zone of zones) {
    const candidates = experiences.filter((item) => itemInZone(zone, item, 'activity') && !saved.has(item.id));
    const scored = candidates
      .map((item) => {
        const { months: allowed, rule } = activityMonths(item);
        const inSeason = months.length === 0 || allowed === null || allowed.some((m) => months.includes(m));
        const matched = request.interests.filter((interest) => INTEREST_TESTS[interest](item));
        const score = matched.length * 3 + (item.isFeatured ? 2 : 0) + ratingOf(item) + (item.website || item.bookingUrl ? 1 : 0);
        return { item, allowed, rule, inSeason, matched, score };
      })
      .filter((entry) => {
        if (entry.inSeason) return true;
        // Out of season: count it so the visitor knows what the dates rule out
        if (entry.rule) skipped.push(entry.item.name);
        return false;
      })
      .filter((entry) => request.interests.length === 0 || entry.matched.length > 0 || entry.item.isFeatured)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);

    for (const entry of scored) {
      const reasons: string[] = [];
      if (entry.matched.length) reasons.push(fmt(t.reasons.matches, { interests: entry.matched.map((m) => ui.interests[m]).join(ui.listJoin) }));
      if (entry.rule && entry.allowed) reasons.push(fmt(t.reasons.inSeason, { label: t.seasonLabels[entry.rule.label] }));
      if (entry.item.isFeatured) reasons.push(t.reasons.pick);
      const rating = ratingOf(entry.item);
      if (rating) reasons.push(fmt(t.reasons.rating, { rating: rating.toFixed(1) }));
      if (entry.rule) cite(entry.rule.link);
      activities.push({
        id: entry.item.id,
        name: entry.item.name,
        category: 'experiences',
        zone,
        location: entry.item.location,
        priceRange: entry.item.priceRange,
        imageUrl: entry.item.imageUrl,
        href: entry.item.bookingUrl ?? entry.item.website ?? `/travel/experiences/#${entry.item.id}`,
        why: reasons.join(t.reasons.join) || t.reasons.inRegion,
        rating: rating || undefined,
        reviews: reviewCountOf(entry.item) || undefined,
      });
    }
  }

  // Events
  const eventList: Suggestion[] = [];
  const years = start ? [...new Set([start.getUTCFullYear(), (end ?? start).getUTCFullYear()])] : [new Date().getUTCFullYear(), new Date().getUTCFullYear() + 1];
  for (const zone of zones) {
    const zoneEvents = events.filter((event) => itemInZone(zone, event, 'place') && !saved.has(event.id));
    for (const event of zoneEvents) {
      const occurrence = eventOccurrence(event, years, start, end, months);
      if (!occurrence) continue;
      const dates =
        occurrence.end !== occurrence.start
          ? fmt(t.event.range, { start: formatDate(occurrence.start), end: formatDate(occurrence.end) })
          : formatDate(occurrence.start);
      eventList.push({
        id: event.id,
        name: event.name,
        category: 'events',
        zone,
        location: event.location,
        priceRange: event.priceRange,
        imageUrl: event.imageUrl,
        href: event.ticketUrl ?? event.website ?? `/travel/events/#${event.id}`,
        startDate: occurrence.start,
        endDate: occurrence.end,
        why: fmt(t.event.why, { dates, projected: occurrence.projected ? t.event.projected : '', location: event.location }),
      });
    }
  }
  eventList.sort((a, b) => (a.startDate ?? '').localeCompare(b.startDate ?? ''));

  // Stays
  const stayList: Suggestion[] = [];
  let stayNote: string | undefined;
  const tier = request.budget;
  for (const zone of zones) {
    const zoneStays = stays.filter((item) => itemInZone(zone, item, 'place') && !saved.has(item.id));
    let pool = tier ? zoneStays.filter((item) => item.priceRange === tier) : zoneStays;
    if (tier && pool.length < 2) {
      pool = zoneStays;
      stayNote = fmt(t.stayNote, { budget: ui.budgets[tier].toLowerCase(), zone: zoneName(zone) });
    }
    const picked = rankItems(pool)
      .sort((a, b) => Number(Boolean(b.bookingUrl)) - Number(Boolean(a.bookingUrl)) || ratingOf(b) - ratingOf(a))
      .slice(0, 3);
    for (const item of picked) {
      const rating = ratingOf(item);
      const reasons = [
        labels.stays[item.accommodationType],
        labels.price[item.priceRange],
        rating ? fmt(t.reasons.ratingReviews, { rating: rating.toFixed(1), reviews: reviewCountOf(item) }) : null,
        item.bookingUrl ? t.reasons.bookable : null,
      ].filter(Boolean);
      stayList.push({
        id: item.id,
        name: item.name,
        category: 'accommodation',
        zone,
        location: item.location,
        priceRange: item.priceRange,
        imageUrl: item.imageUrl,
        href: item.bookingUrl ?? item.website ?? `/travel/accommodation/#${item.id}`,
        why: reasons.join(t.reasons.join),
        rating: rating || undefined,
        reviews: reviewCountOf(item) || undefined,
      });
    }
  }

  // Kit
  const kit: PlanLine[] = [];
  const arctic = zones.some((zone) => zone === 'northern-norway' || zone === 'lofoten' || zone === 'svalbard');
  const cold = winterish || zones.includes('svalbard');
  const hikes = request.interests.includes('hiking') || activities.some((a) => /hik|trek|trail|glacier|summit/i.test(a.name));
  if (cold && arctic) {
    kit.push({ id: 'kit-wool', text: t.kit.wool, links: cite('packing') });
    kit.push({ id: 'kit-shell', text: t.kit.shell, links: cite('packing') });
  } else if (arctic || zones.includes('fjords')) {
    kit.push({ id: 'kit-layers', text: t.kit.layers, links: cite('packing') });
  }
  if (request.interests.includes('aurora') || (winterish && arctic)) {
    kit.push({ id: 'kit-aurora', text: t.kit.aurora, links: cite('northernLights') });
  }
  if (hikes) {
    kit.push({ id: 'kit-hike', text: t.kit.hike, links: cite('mountainCode') });
    kit.push({ id: 'kit-dnt', text: t.kit.dnt, links: cite('dnt') });
  }
  if (ctx.car) {
    kit.push({ id: 'kit-autopass', text: t.kit.autopass, links: cite('ferries') });
  }
  if (zones.includes('svalbard')) {
    kit.push({ id: 'kit-svalbard', text: t.kit.svalbard, links: cite('svalbard') });
  }
  if (kit.length) {
    kit.push({ id: 'kit-where', text: t.kit.where, links: cite('norrona', 'hours57') });
  }

  return {
    generatedAt: new Date().toISOString(),
    window: { startDate: request.startDate, endDate: request.endDate, nights, season, months },
    zones: zones.map((id) => ({ id, name: zoneName(id) })),
    light,
    fit,
    route: { legs, method },
    activities: activities.slice(0, 12),
    skippedActivities: { count: skipped.length, examples: skipped.slice(0, 3) },
    events: eventList.slice(0, 6),
    stays: stayList,
    stayNote,
    kit,
    sources: [...sources.values()],
  };
}

/** The event's dates inside the trip window, projecting annual events into the trip's year. */
function eventOccurrence(
  event: Event,
  years: number[],
  start: Date | null,
  end: Date | null,
  months: number[]
): { start: string; end: string; projected: boolean } | null {
  const eventStart = parseDate(event.startDate);
  if (!eventStart) return null;
  const eventEnd = parseDate(event.endDate) ?? eventStart;
  const annual = event.isRecurring && /annual|every year|yearly/i.test(event.frequency ?? 'annual');

  if (!start) {
    const month = eventStart.getUTCMonth() + 1;
    if (months.length && !months.includes(month)) return null;
    return { start: event.startDate, end: event.endDate ?? event.startDate, projected: false };
  }
  const last = end && end > start ? end : start;
  const candidates = annual ? years : [eventStart.getUTCFullYear()];
  for (const year of candidates) {
    const shift = year - eventStart.getUTCFullYear();
    const s = new Date(Date.UTC(eventStart.getUTCFullYear() + shift, eventStart.getUTCMonth(), eventStart.getUTCDate()));
    const e = new Date(Date.UTC(eventEnd.getUTCFullYear() + shift, eventEnd.getUTCMonth(), eventEnd.getUTCDate()));
    if (s <= last && e >= start) {
      return { start: s.toISOString().slice(0, 10), end: e.toISOString().slice(0, 10), projected: shift !== 0 };
    }
  }
  return null;
}

/** Stays typed as the accommodation store returns them, kept here so the engine's types line up without a cast. */
export type PlanStay = Accommodation;
