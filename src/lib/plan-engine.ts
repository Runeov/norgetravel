import { mapZones } from '@/data/norway-map-zones';
import { experiencesStore } from '@/lib/admin/travel-experiences';
import { accommodationStore } from '@/lib/admin/travel-accommodation';
import { eventsStore } from '@/lib/admin/travel-events';
import { itemInZone, rankItems, ratingOf, reviewCountOf, type PlanZoneId } from '@/lib/planner-data';
import type { Experience } from '@/lib/schemas/travel.experiences.schema';
import type { Accommodation } from '@/lib/schemas/travel.accommodation.schema';
import type { Event } from '@/lib/schemas/travel.events.schema';
import {
  TRIP_INTERESTS,
  type TripBudget,
  type TripInterest,
  type TripItemCategory,
  type TripMobility,
  type TripPace,
} from '@/types/trip';

/**
 * Phase 2 of the trip planner: a rule engine over our own data.
 * Everything it says comes from a data file or a guide on this site, and
 * every line carries the link it came from. Deterministic, so the same
 * inputs always give the same plan. The Phase 3 agent gets these functions
 * as its tools.
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

const GUIDE = {
  northernLights: { label: 'Northern Lights guide', href: '/tjenester/northern-lights' },
  tromso: { label: 'Tromsø guide', href: '/destinations/tromso' },
  lofoten: { label: 'Lofoten guide', href: '/destinations/lofoten' },
  svalbard: { label: 'Svalbard guide', href: '/destinations/svalbard' },
  fjords: { label: 'Fjords guide', href: '/destinations/fjords' },
  northernNorway: { label: 'Northern Norway guide', href: '/destinations/northern-norway' },
  cities: { label: 'Cities guide', href: '/destinations/cities' },
  lyngen: { label: 'Lyngen guide', href: '/destinations/lyngen' },
  transport: { label: 'Transport listings', href: '/travel/transport' },
  packing: { label: 'Arctic packing guide', href: '/travel-guides/safety/arctic-norway-packing-guide' },
  winterDriving: { label: 'Winter driving guide', href: '/travel-guides/safety/winter-driving-norway-tires-chains-road-closures' },
  mountainCode: { label: 'The Mountain Code', href: '/travel-guides/safety/fjellvettreglene-mountain-code' },
  ferries: { label: 'Norway ferry guide', href: '/travel-guides/planning/norway-ferry-guide' },
  bergenToLofoten: { label: 'Bergen to Lofoten routes', href: '/travel-guides/planning/bergen-to-lofoten-routes' },
  bergenRailway: { label: 'Bergen Railway trip report', href: '/travel-guides/trip-reports/bergen-railway-oslo-bergen' },
  hurtigruten: { label: 'Hurtigruten Bergen to Tromsø trip report', href: '/travel-guides/trip-reports/hurtigruten-bergen-tromso' },
  whales: { label: 'Skjervøy whale safari trip report', href: '/travel-guides/trip-reports/whale-safari-skjervoy-tromso' },
  dnt: { label: 'DNT cabin guide', href: '/travel-guides/planning/dnt-cabin-guide' },
  bestTime: { label: 'Best time to visit', href: '/travel-guides/planning/best-time-visit-norway' },
  cost: { label: 'Norway cost guide', href: '/travel-guides/planning/norway-cost-budget-guide' },
  norrona: { label: 'Norrøna', href: 'https://www.norrona.com/' },
  hours57: { label: '57hours Lofoten self-guided hike', href: 'https://57hours.com/adventure/lofoten-islands-self-guided-hiking-tour/' },
} as const;

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
  text: string;
  link: PlanLink;
}

const LIGHT: Partial<Record<PlanZoneId, LightWindow[]>> = {
  'northern-norway': [
    { from: { m: 9, d: 20 }, to: { m: 3, d: 31 }, text: 'Northern Lights season runs from late September to late March. Tromsø sits under the auroral oval; plan four nights minimum, because two of them may be cloudy.', link: GUIDE.northernLights },
    { from: { m: 11, d: 27 }, to: { m: 1, d: 15 }, text: 'Polar night in Tromsø, 27 November to 15 January: the sun stays below the horizon, with twilight at midday. Tours run on headlamps and the sky is dark by 15:00.', link: GUIDE.tromso },
    { from: { m: 5, d: 20 }, to: { m: 7, d: 22 }, text: 'Midnight sun in Tromsø from 20 May to 22 July: 24-hour daylight for hiking, sea kayaking and the Midnight Sun Marathon.', link: GUIDE.tromso },
  ],
  lofoten: [
    { from: { m: 9, d: 1 }, to: { m: 3, d: 31 }, text: 'Lofoten sits under the auroral oval at 68°N; aurora season is September to March, with the islands darkest from December.', link: GUIDE.lofoten },
    { from: { m: 5, d: 28 }, to: { m: 7, d: 14 }, text: '24-hour daylight from 28 May to 14 July. Peak photography season and peak crowds: book accommodation 6 to 9 months ahead.', link: GUIDE.lofoten },
    { from: { m: 1, d: 1 }, to: { m: 4, d: 30 }, text: 'Skrei season, January to April: the Arctic cod migration, the fishing fleet out daily and the stockfish racks going up from February.', link: GUIDE.lofoten },
  ],
  svalbard: [
    { from: { m: 10, d: 26 }, to: { m: 2, d: 15 }, text: 'Polar night on Svalbard runs from late October to mid-February: four months of darkness at 78°N. Dog sledding and aurora run through it.', link: GUIDE.svalbard },
    { from: { m: 4, d: 20 }, to: { m: 8, d: 20 }, text: 'The sun stays up 24 hours a day from late April to mid-August. The summer expedition season, June to September, opens the fjords for guided glacier and wildlife trips.', link: GUIDE.svalbard },
  ],
  fjords: [
    { from: { m: 10, d: 15 }, to: { m: 5, d: 20 }, text: 'Rv55 over Sognefjellet closes in October and does not reopen until late May, and Trollstigen is shut for the winter. Reroute via the Lærdal tunnel and check Statens vegvesen the morning you drive.', link: GUIDE.winterDriving },
    { from: { m: 6, d: 15 }, to: { m: 8, d: 31 }, text: 'Peak season on the fjords. Book ahead on the long and tourist crossings, expect ferry queues in July and August, and pay tolls with AutoPASS.', link: GUIDE.ferries },
  ],
};

// ── Activity seasons and interest matching ─────────────────────────────────

interface ActivityRule {
  id: string;
  test: (item: Experience) => boolean;
  months: number[];
  label: string;
  link: PlanLink;
}

const nameAndText = (item: Experience) => `${item.name} ${item.description}`;

const ACTIVITY_RULES: ActivityRule[] = [
  { id: 'aurora', test: (e) => e.experienceType === 'northern-lights' || /aurora|northern lights/i.test(nameAndText(e)), months: [9, 10, 11, 12, 1, 2, 3], label: 'aurora season, late September to late March', link: GUIDE.northernLights },
  { id: 'midnight-sun', test: (e) => /midnight sun/i.test(e.name), months: [5, 6, 7], label: 'midnight sun, 20 May to 22 July', link: GUIDE.tromso },
  { id: 'whales', test: (e) => e.experienceType === 'whale-watching' || /whale/i.test(e.name), months: [10, 11, 12, 1], label: 'whale season off Skjervøy, October to 31 January', link: GUIDE.whales },
  { id: 'dog-sledding', test: (e) => e.experienceType === 'dog-sledding' || /dog sled|husky/i.test(e.name), months: [11, 12, 1, 2, 3, 4, 5], label: 'snow season, November to May', link: GUIDE.northernNorway },
  { id: 'snowmobile', test: (e) => e.experienceType === 'snowmobile' || /snowmobile/i.test(e.name), months: [2, 3, 4, 5], label: 'frozen ground, February to May', link: GUIDE.svalbard },
  // The data has no plain "hiking" type, so most hikes are typed glacier-hike; only a glacier in the name gets the glacier window
  { id: 'glacier', test: (e) => /glacier/i.test(e.name), months: [5, 6, 7, 8, 9], label: 'accessible glacier surface, May to September', link: GUIDE.fjords },
  { id: 'hiking-typed', test: (e) => e.experienceType === 'glacier-hike', months: [6, 7, 8, 9], label: 'snow-free trails, June to September', link: GUIDE.mountainCode },
  { id: 'kayak', test: (e) => e.experienceType === 'kayaking' || /kayak|paddle/i.test(e.name), months: [6, 7, 8], label: 'ice-free fjords, June to August', link: GUIDE.lofoten },
  { id: 'skrei', test: (e) => /skrei|cod fishing/i.test(e.name), months: [1, 2, 3, 4], label: 'skrei season, January to April', link: GUIDE.lofoten },
  { id: 'ski', test: (e) => /ski tour|ski touring|skiing|\bski\b/i.test(e.name), months: [2, 3, 4, 5], label: 'ski season, February to May', link: GUIDE.lyngen },
  { id: 'hiking', test: (e) => /\bhik|trek|trail|summit|ridge|stairs|steps\b/i.test(e.name), months: [6, 7, 8, 9], label: 'snow-free trails, June to September', link: GUIDE.mountainCode },
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

const INTEREST_LABEL: Record<TripInterest, string> = Object.fromEntries(TRIP_INTERESTS.map((i) => [i.id, i.label])) as Record<TripInterest, string>;

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

const ARRIVAL: Record<PlanZoneId, (ctx: LegContext) => RouteLeg> = {
  cities: () => ({ id: 'arrive-cities', from: 'Home', to: 'City Norway', method: 'fly', text: 'Fly into Oslo (OSL) or Bergen (BGO). The Bergen Railway links the two in about 7 hours; Vy runs 6 to 7 departures a day including a night train.', links: [GUIDE.bergenRailway, GUIDE.cities] }),
  fjords: (ctx) => ({ id: 'arrive-fjords', from: 'Home', to: 'Norwegian Fjords', method: 'fly', text: ctx.car ? 'Fly into Bergen (BGO) and pick up the car there. Bergen to Flåm is 166 km; budget 3.5 hours for the E16 tunnels and the Gudvangen ferry.' : 'Fly into Bergen (BGO). Without a car, the Bergen Railway, the Flåm Railway and the fjord ferries do the work: the Norway in a Nutshell route.', links: [GUIDE.ferries, GUIDE.fjords] }),
  'boat-routes': () => ({ id: 'arrive-boat', from: 'Home', to: 'Boat Routes', method: 'coastal-ship', text: 'Fly into Bergen (BGO) and board Hurtigruten or Havila there; the two alternate departures north to Kirkenes, 34 ports and 11 nights for the full run. Segment it rather than sailing it all.', links: [GUIDE.hurtigruten, GUIDE.transport] }),
  lofoten: (ctx) => ({ id: 'arrive-lofoten', from: 'Home', to: 'Lofoten Islands', method: 'fly', text: ctx.car ? 'Fly to Evenes (EVE) and drive 164 km on the E10 to Svolvær, no ferry needed. Or fly via Bodø to Svolvær or Leknes with Widerøe and rent there.' : 'Widerøe flies nonstop to Bodø, then 25 minutes on to Svolvær or Leknes. Pick one base and let the local buses and tours do the rest.', links: [GUIDE.bergenToLofoten, GUIDE.lofoten] }),
  'northern-norway': (ctx) => ({ id: 'arrive-nn', from: 'Home', to: 'Northern Norway', method: 'fly', text: ctx.winter && !ctx.car ? 'Fly to Tromsø (TOS); the airport express bus is 15 to 20 minutes into town. In winter a car adds little: aurora chases, whale boats and dog sledding all pick up at hotels.' : 'Fly to Tromsø (TOS), the Arctic basecamp with the most departures, or to Alta for Finnmark and the Sami heartland.', links: [GUIDE.tromso, GUIDE.transport] }),
  svalbard: () => ({ id: 'arrive-svalbard', from: 'Home', to: 'Svalbard', method: 'fly', text: 'Fly to Longyearbyen: 3 hours direct from Oslo, or via Tromsø. All travel to Svalbard is by air, and outside town you need a licensed guide.', links: [GUIDE.svalbard] }),
};

type LegBuilder = (ctx: LegContext) => Omit<RouteLeg, 'id' | 'from' | 'to'>;

const LEGS: Record<string, LegBuilder> = {
  'cities>fjords': (ctx) => ctx.car
    ? { method: 'drive', text: 'From Bergen, the E16 east: Bergen to Flåm is 166 km, 3.5 hours with the tunnels and the Gudvangen ferry. Pay tolls and ferries with AutoPASS.', links: [GUIDE.ferries, GUIDE.fjords] }
    : { method: 'train', text: 'Bergen Railway to Myrdal, Flåm Railway down to Aurlandsfjord, ferry to Gudvangen: the Norway in a Nutshell route, about 8 hours if the connections work.', links: [GUIDE.bergenRailway, GUIDE.fjords] },
  'cities>boat-routes': () => ({ method: 'coastal-ship', text: 'Board the coastal ship in Bergen. Hurtigruten and Havila alternate departures; book the Bergen to Tromsø leg as a segment.', links: [GUIDE.hurtigruten] }),
  'fjords>boat-routes': () => ({ method: 'coastal-ship', text: 'Back to Bergen to board the coastal ship, or join it at Ålesund, the first port after Bergen.', links: [GUIDE.hurtigruten] }),
  'cities>lofoten': (ctx) => ({ method: 'fly', text: ctx.car ? 'Fly to Evenes and drive 164 km on the E10 to Svolvær, or fly via Bodø to Svolvær or Leknes. Driving the whole way is 1,570 km and 24 hours at the wheel; plan three days at least.' : 'Widerøe nonstop to Bodø, then 25 minutes on to Svolvær or Leknes. Without flying: rail via Trondheim to Bodø (about 10 hours on the Nordland Line), then the ferry or express boat.', links: [GUIDE.bergenToLofoten] }),
  'fjords>lofoten': (ctx) => ({ method: 'fly', text: ctx.car ? 'Drop the car in Bergen, fly via Bodø to Svolvær or Leknes, and rent again there; or fly to Evenes and drive the E10 in.' : 'Fly from Bergen via Bodø to Svolvær or Leknes, 3 to 4 hours with the connection.', links: [GUIDE.bergenToLofoten] }),
  'boat-routes>lofoten': () => ({ method: 'coastal-ship', text: 'The coastal ship calls at Stamsund at 19:00 and Svolvær at 21:00 northbound. Step off in Svolvær and stay.', links: [GUIDE.lofoten] }),
  'lofoten>northern-norway': (ctx) => ctx.car
    ? { method: 'drive', text: `E10 east to Narvik, 3 hours from Svolvær, then the E6 north; Narvik to Tromsø is 245 km. ${ctx.winter ? 'Winter: studded tyres are allowed in Nordland, Troms and Finnmark from 16 October to 30 April, and the E6 ices.' : 'Allow a full day with stops.'}`, links: [GUIDE.winterDriving, GUIDE.northernNorway] }
    : { method: 'fly', text: 'Fly Svolvær to Tromsø via Bodø with Widerøe, or take the coastal ship northbound overnight from Svolvær to Tromsø.', links: [GUIDE.transport, GUIDE.hurtigruten] },
  'boat-routes>northern-norway': () => ({ method: 'coastal-ship', text: 'Stay aboard to Tromsø, or on to Honningsvåg for North Cape and Kirkenes at the end of the line.', links: [GUIDE.hurtigruten] }),
  'fjords>northern-norway': () => ({ method: 'fly', text: 'Fly Bergen to Tromsø; Widerøe and SAS connect via Oslo or direct depending on the day. The coastal ship is the slow alternative, Bergen to Tromsø as one segment.', links: [GUIDE.hurtigruten, GUIDE.transport] }),
  'cities>northern-norway': (ctx) => ({ method: 'fly', text: ctx.car ? 'Fly Oslo to Tromsø (TOS) and rent there; driving north is 1,700 km of E6.' : 'Fly Oslo to Tromsø (TOS). The Arctic Route winter buses and the Svipper city buses cover the ground without a car.', links: [GUIDE.tromso, GUIDE.transport] }),
  'northern-norway>svalbard': () => ({ method: 'fly', text: 'Fly Tromsø to Longyearbyen; most Oslo departures stop in Tromsø, and the direct Oslo flight is 3 hours. Outside Longyearbyen a licensed guide is required.', links: [GUIDE.svalbard] }),
  'lofoten>svalbard': () => ({ method: 'fly', text: 'Fly via Tromsø or Oslo to Longyearbyen. All travel to Svalbard is by air.', links: [GUIDE.svalbard] }),
  'cities>svalbard': () => ({ method: 'fly', text: 'Fly Oslo to Longyearbyen direct, 3 hours.', links: [GUIDE.svalbard] }),
  'fjords>svalbard': () => ({ method: 'fly', text: 'Back to Bergen, then Oslo to Longyearbyen, 3 hours direct.', links: [GUIDE.svalbard] }),
  'boat-routes>svalbard': () => ({ method: 'fly', text: 'Leave the ship in Tromsø and fly to Longyearbyen.', links: [GUIDE.svalbard] }),
};

function zoneName(id: PlanZoneId): string {
  return mapZones.find((zone) => zone.id === id)?.name ?? id;
}

function buildRoute(zones: PlanZoneId[], ctx: LegContext): RouteLeg[] {
  const ordered = CANONICAL_ORDER.filter((zone) => zones.includes(zone));
  if (ordered.length === 0) return [];
  const legs: RouteLeg[] = [ARRIVAL[ordered[0]](ctx)];
  for (let i = 1; i < ordered.length; i += 1) {
    const from = ordered[i - 1];
    const to = ordered[i];
    const builder = LEGS[`${from}>${to}`];
    const leg = builder
      ? builder(ctx)
      : { method: 'fly' as const, text: `Fly between ${zoneName(from)} and ${zoneName(to)}; Widerøe's regional network covers the gaps the trains and ferries do not.`, links: [GUIDE.transport] };
    legs.push({ id: `${from}-${to}`, from: zoneName(from), to: zoneName(to), ...leg });
  }
  return legs;
}

// ── Public entry point ──────────────────────────────────────────────────────

const NIGHTS_PER_ZONE: Record<TripPace, number> = { relaxed: 4, steady: 3, packed: 2 };
const BUDGET_TIER: Record<TripBudget, string> = { budget: 'budget', 'mid-range': 'mid-range', luxury: 'luxury' };

const formatDate = (value: string) => {
  const date = parseDate(value);
  return date ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }) : value;
};

export async function buildPlan(request: PlanRequest): Promise<PlanResult> {
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
  const cite = (...links: PlanLink[]) => {
    for (const link of links) sources.set(link.href, link);
    return links;
  };

  // Light and season
  const light: PlanLine[] = [];
  for (const zone of zones) {
    for (const [i, window] of (LIGHT[zone] ?? []).entries()) {
      if (months.length === 0 || tripTouches(start, end, months, window.from, window.to)) {
        light.push({ id: `light-${zone}-${i}`, text: window.text, links: cite(window.link) });
      }
    }
  }
  if (months.length === 0 && zones.length > 0) {
    light.unshift({ id: 'light-no-dates', text: 'Add your dates and these notes narrow to the light you will actually get: aurora season, polar night or midnight sun.', links: cite(GUIDE.bestTime) });
  }

  // Does it fit
  const fit: PlanLine[] = [];
  if (zones.length > 2) {
    fit.push({ id: 'fit-regions', text: `${zones.length} regions in one trip means more travel days than place days. Our rule is two regions per trip unless you have 14 nights or more.`, links: cite(GUIDE.bestTime) });
  }
  if (nights !== undefined && zones.length > 0) {
    const pace: TripPace = request.pace ?? 'steady';
    const needed = zones.reduce((sum, zone) => sum + NIGHTS_PER_ZONE[pace] + (zone === 'svalbard' ? 1 : 0), 0);
    if (nights < needed) {
      fit.push({ id: 'fit-nights', text: `${nights} nights across ${zones.length} ${zones.length === 1 ? 'region' : 'regions'} at a ${pace} pace is ${needed - nights} short. Drop a region or add nights; the ferry schedules do not care about optimism.`, links: cite(GUIDE.bestTime) });
    } else {
      fit.push({ id: 'fit-ok', text: `${nights} nights across ${zones.length} ${zones.length === 1 ? 'region' : 'regions'} works at a ${pace} pace (${NIGHTS_PER_ZONE[pace]} nights per region).`, links: [] });
    }
  } else if (zones.length > 0) {
    fit.push({ id: 'fit-no-dates', text: 'Add arrival and departure dates to check whether the pace fits.', links: [] });
  }

  // Route and getting around
  const legs = zones.length ? buildRoute(zones, ctx) : [];
  for (const leg of legs) cite(...leg.links);
  const method: PlanLine[] = [];
  if (!request.mobility && zones.length) {
    method.push({ id: 'method-mobility', text: 'Say whether you will have a car; the route and the costs change a lot either way.', links: [] });
  }
  if (ctx.car && (zones.includes('northern-norway') || zones.includes('lofoten')) && winterish) {
    method.push({ id: 'method-studs', text: 'Studded tyres are allowed from 16 October to 30 April in Nordland, Troms and Finnmark (1 November to the first Sunday after Easter further south). Rental cars come with winter tyres; check Statens vegvesen the morning you drive.', links: cite(GUIDE.winterDriving) });
  }
  if (!ctx.car && zones.includes('northern-norway') && winterish) {
    method.push({ id: 'method-tromso-base', text: 'Base in Tromsø and book tours with hotel pickup. The airport express is 15 to 20 minutes into town and the Arctic Route buses reach Lyngen and Finland in winter.', links: cite(GUIDE.tromso, GUIDE.transport) });
  }
  if (ctx.car && zones.includes('lofoten')) {
    method.push({ id: 'method-bodo-ferry', text: 'Bodø to Moskenes ferry: 3 to 4 hours, only half the capacity can be reserved, and the booking fee is 130 NOK for a car up to 6 m. Book ahead from May to September.', links: cite(GUIDE.ferries) });
  }
  if (ctx.car && zones.includes('fjords') && summerish) {
    method.push({ id: 'method-fjord-queues', text: 'Fjord ferries in July and August mean queues. Get an AutoPASS ferry agreement for the discount and book the long crossings.', links: cite(GUIDE.ferries) });
  }
  if (zones.includes('boat-routes')) {
    method.push({ id: 'method-coastal', text: 'Treat the coastal ship as transport with a view, not a cruise: 34 ports, 11 nights for the full Bergen to Kirkenes run. Book a segment and get off where the trip wants you.', links: cite(GUIDE.hurtigruten, GUIDE.transport) });
  }
  if (zones.includes('svalbard')) {
    method.push({ id: 'method-svalbard-guide', text: 'On Svalbard, everything outside Longyearbyen needs a licensed guide, and the 800 hotel beds book out months ahead.', links: cite(GUIDE.svalbard) });
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
      if (entry.matched.length) reasons.push(`Matches ${entry.matched.map((m) => INTEREST_LABEL[m]).join(', ')}`);
      if (entry.rule && entry.allowed) reasons.push(`in season (${entry.rule.label})`);
      if (entry.item.isFeatured) reasons.push('editor’s pick');
      const rating = ratingOf(entry.item);
      if (rating) reasons.push(`Google ${rating.toFixed(1)}`);
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
        why: reasons.join(' · ') || 'In this region',
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
        why: `${formatDate(occurrence.start)}${occurrence.end !== occurrence.start ? ` to ${formatDate(occurrence.end)}` : ''}${occurrence.projected ? ' (annual, dates from the previous edition)' : ''} · ${event.location}`,
      });
    }
  }
  eventList.sort((a, b) => (a.startDate ?? '').localeCompare(b.startDate ?? ''));

  // Stays
  const stayList: Suggestion[] = [];
  let stayNote: string | undefined;
  const tier = request.budget ? BUDGET_TIER[request.budget] : undefined;
  for (const zone of zones) {
    const zoneStays = stays.filter((item) => itemInZone(zone, item, 'place') && !saved.has(item.id));
    let pool = tier ? zoneStays.filter((item) => item.priceRange === tier) : zoneStays;
    if (tier && pool.length < 2) {
      pool = zoneStays;
      stayNote = `Few ${request.budget} listings in ${zoneName(zone)}; showing the best rated at any price.`;
    }
    const picked = rankItems(pool)
      .sort((a, b) => Number(Boolean(b.bookingUrl)) - Number(Boolean(a.bookingUrl)) || ratingOf(b) - ratingOf(a))
      .slice(0, 3);
    for (const item of picked) {
      const rating = ratingOf(item);
      const reasons = [item.accommodationType, item.priceRange, rating ? `Google ${rating.toFixed(1)} (${reviewCountOf(item)})` : null, item.bookingUrl ? 'bookable' : null].filter(Boolean);
      stayList.push({
        id: item.id,
        name: item.name,
        category: 'accommodation',
        zone,
        location: item.location,
        priceRange: item.priceRange,
        imageUrl: item.imageUrl,
        href: item.bookingUrl ?? item.website ?? `/travel/accommodation/#${item.id}`,
        why: reasons.join(' · '),
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
    kit.push({ id: 'kit-wool', text: 'Wool base layers, top and bottom; merino at 200 g/m² is the Norwegian default. Never cotton: it holds sweat against the skin and speeds heat loss.', links: cite(GUIDE.packing) });
    kit.push({ id: 'kit-shell', text: 'Windproof shell, insulated mid-layer, mittens over gloves, and boots rated for the cold with ice grips for Tromsø pavements.', links: cite(GUIDE.packing) });
  } else if (arctic || zones.includes('fjords')) {
    kit.push({ id: 'kit-layers', text: 'A windbreaker and a warm layer even in July. The wind off the Vestfjord cuts through a standard sweater, and fjord weather turns in an hour.', links: cite(GUIDE.packing) });
  }
  if (request.interests.includes('aurora') || (winterish && arctic)) {
    kit.push({ id: 'kit-aurora', text: 'Tripod and spare batteries for aurora nights; the cold drains phones and cameras fast. Four nights minimum, two may be cloudy.', links: cite(GUIDE.northernLights) });
  }
  if (hikes) {
    kit.push({ id: 'kit-hike', text: 'Shoes with grip (the Reinebringen steps ice over from September), a map and compass as the Mountain Code requires, and a plan to turn back if the weather turns.', links: cite(GUIDE.mountainCode) });
    kit.push({ id: 'kit-dnt', text: 'For hut-to-hut days: DNT membership and the DNT key, since the self-service cabins are locked with it.', links: cite(GUIDE.dnt) });
  }
  if (ctx.car) {
    kit.push({ id: 'kit-autopass', text: 'An AutoPASS tag or a registered number plate: most ferries read it as you drive on, and the prepayment agreement takes 50 percent off private crossings.', links: cite(GUIDE.ferries) });
  }
  if (zones.includes('svalbard')) {
    kit.push({ id: 'kit-svalbard', text: 'On Svalbard the guide carries the rifle and the kit; you bring warm layers, sunglasses for the ice, and a booking made months ahead.', links: cite(GUIDE.svalbard) });
  }
  if (kit.length) {
    kit.push({ id: 'kit-where', text: 'Where to get it: Norrøna makes the shells and insulation for this weather, and 57hours packs a full gear list into its Lofoten self-guided hike.', links: cite(GUIDE.norrona, GUIDE.hours57) });
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
