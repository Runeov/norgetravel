import type { Event } from '@/lib/schemas/travel.events.schema';
import type { Destination, PriceRange } from '@/lib/schemas/travel.shared';
import type { EventType } from '@/lib/schemas/travel.events.schema';
import type { Locale } from '@/lib/i18n-seo';
import { getSiteSeason, type SiteSeason } from '@/lib/season';
import type { EventUiCopy } from '@/i18n/events-copy';

/**
 * Calendar view of the events store, shared by the events calendar pages and
 * the homepage "What's on" section.
 *
 * Event dates are calendar dates (YYYY-MM-DD) with no time of day. Comparisons
 * work on those strings, and labels are formatted in UTC from midnight UTC, so
 * a date keeps the day the organiser announced wherever the page renders.
 * Labels are built on the server and passed to client components as strings,
 * so the browser never re-formats a date and hydration cannot disagree.
 */

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const OSLO_DATE = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Oslo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** Today's date in Norway as YYYY-MM-DD. Events start and end on Norwegian days. */
export function osloToday(now: Date = new Date()): string {
  return OSLO_DATE.format(now);
}

const utc = (iso: string): Date => new Date(`${iso}T00:00:00Z`);

export function addDays(iso: string, days: number): string {
  const date = utc(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** Last day of the event. A one-day event has no end date. */
export const eventEnd = (event: Pick<Event, 'startDate' | 'endDate'>): string =>
  event.endDate || event.startDate;

/** Events with a malformed date cannot be placed on a calendar, so they are left out. */
const hasCalendarDates = (event: Event): boolean =>
  ISO_DATE.test(event.startDate) && (!event.endDate || ISO_DATE.test(event.endDate));

const seasonOf = (iso: string): SiteSeason => getSiteSeason(new Date(`${iso}T12:00:00Z`));

// ─── Calendar windows ───
// Each window is its own page, like a "this weekend" listing. The site's
// event list is seasonal and sparse, so the windows are seasons and a 90-day
// lookahead rather than days.

export const CALENDAR_WINDOWS = ['upcoming', 'next-90-days', 'winter', 'summer', 'free'] as const;
export type CalendarWindow = (typeof CALENDAR_WINDOWS)[number];

export const isCalendarWindow = (value: string): value is CalendarWindow =>
  (CALENDAR_WINDOWS as readonly string[]).includes(value);

/** Path of a window page, with the trailing slash the site serves. */
export const windowPath = (window: CalendarWindow): string =>
  window === 'upcoming' ? '/travel/events/' : `/travel/events/${window}/`;

/** Site-relative path segment used for metadata and hreflang. */
export const windowRoute = (window: CalendarWindow): string =>
  window === 'upcoming' ? 'travel/events' : `travel/events/${window}`;

/** Whether an event that has not ended belongs in a window. */
function inWindow(event: Event, window: CalendarWindow, today: string): boolean {
  switch (window) {
    case 'upcoming':
      return true;
    case 'next-90-days':
      return event.startDate <= addDays(today, 90);
    case 'winter':
    case 'summer': {
      // Placed by the first day a visitor can still attend: the start date, or
      // today if it is on now. Each event lands in one season, so the cod
      // season (Jan–15 Apr) is not listed as summer for its last day.
      const from = event.startDate > today ? event.startDate : today;
      return seasonOf(from) === window;
    }
    case 'free':
      return event.isFree;
  }
}

// ─── Serializable calendar entries ───

export interface CalendarEvent {
  id: string;
  name: string;
  description: string;
  destination: Destination;
  location: string;
  venue?: string;
  eventType: EventType;
  typeLabel: string;
  isFree: boolean;
  priceRange: PriceRange;
  startDate: string;
  endDate?: string;
  imageUrl?: string;
  imageAlt?: string;
  ticketUrl?: string;
  /** Running today: started on or before today and not yet ended. */
  onNow: boolean;
  /** "until Wed 15 Apr", set for events that are on now. */
  untilLabel?: string;
  /** "Mon 18 – Sun 24 Jan" or "Sat 9 Jan". */
  dateLabel: string;
  /** Start date split for the date tile. */
  tile: { month: string; day: string; weekday: string };
  /** YYYY-MM of the start date, for month grouping. */
  monthKey: string;
  /** "January 2027" in the page language. */
  monthLabel: string;
}

const INTL_LOCALE: Record<Locale, string> = { en: 'en-GB', zh: 'zh-CN', ja: 'ja-JP' };

// Ranges join two day labels. Intl's formatRange switches Chinese and Japanese
// to numeric dates ("1/15周五至4/15周四"), which no longer match single days.
const RANGE_JOIN: Record<Locale, string> = { en: ' – ', zh: '至', ja: '～' };

// Cards clamp the description to two lines, so longer text is never shown.
const DESCRIPTION_LIMIT = 220;

function clip(text: string): string {
  if (text.length <= DESCRIPTION_LIMIT) return text;
  const cut = text.slice(0, DESCRIPTION_LIMIT);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

function formatters(locale: Locale) {
  const make = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(INTL_LOCALE[locale], { timeZone: 'UTC', ...options });
  const day = make({ weekday: 'short', day: 'numeric', month: 'short' });
  return {
    day,
    range: (start: Date, end: Date) => `${day.format(start)}${RANGE_JOIN[locale]}${day.format(end)}`,
    month: make({ month: 'long', year: 'numeric' }),
    tileMonth: make({ month: 'short' }),
    tileWeekday: make({ weekday: 'short' }),
  };
}

type CalendarText = Pick<EventUiCopy, 'types' | 'until'>;

function toCalendarEvent(event: Event, today: string, ui: CalendarText, fmt: ReturnType<typeof formatters>): CalendarEvent {
  const start = utc(event.startDate);
  const end = eventEnd(event);
  const onNow = event.startDate <= today && end >= today;
  const monthKey = event.startDate.slice(0, 7);

  return {
    id: event.id,
    name: event.name,
    description: clip(event.description),
    destination: event.destination,
    location: event.location,
    ...(event.venue && { venue: event.venue }),
    eventType: event.eventType,
    typeLabel: ui.types[event.eventType],
    isFree: event.isFree,
    priceRange: event.priceRange,
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    ...(event.imageUrl && { imageUrl: event.imageUrl, imageAlt: event.imageAlt || event.name }),
    ...(event.ticketUrl && { ticketUrl: event.ticketUrl }),
    onNow,
    ...(onNow && end !== event.startDate && { untilLabel: ui.until.replace('{date}', fmt.day.format(utc(end))) }),
    dateLabel: end === event.startDate ? fmt.day.format(start) : fmt.range(start, utc(end)),
    tile: {
      month: fmt.tileMonth.format(start),
      day: String(start.getUTCDate()),
      weekday: fmt.tileWeekday.format(start),
    },
    monthKey,
    monthLabel: fmt.month.format(utc(`${monthKey}-01`)),
  };
}

/**
 * Events that have not ended and fall in the window, in start-date order, with
 * labels in the page language. The input is the published list; ended and
 * undatable events are dropped here.
 */
export function buildCalendar(
  events: Event[],
  {
    window,
    locale,
    ui,
    today = osloToday(),
  }: { window: CalendarWindow; locale: Locale; ui: CalendarText; today?: string }
): CalendarEvent[] {
  const fmt = formatters(locale);
  return events
    .filter((e) => hasCalendarDates(e) && eventEnd(e) >= today && inWindow(e, window, today))
    .sort((a, b) => a.startDate.localeCompare(b.startDate) || a.name.localeCompare(b.name))
    .map((e) => toCalendarEvent(e, today, ui, fmt));
}

export interface CalendarMonth {
  key: string;
  label: string;
  events: CalendarEvent[];
}

/** Splits a start-ordered list into events on now and the rest by start month. */
export function groupCalendar(events: CalendarEvent[]): { onNow: CalendarEvent[]; months: CalendarMonth[] } {
  const onNow: CalendarEvent[] = [];
  const months: CalendarMonth[] = [];
  for (const event of events) {
    if (event.onNow) {
      onNow.push(event);
      continue;
    }
    const last = months[months.length - 1];
    if (last?.key === event.monthKey) last.events.push(event);
    else months.push({ key: event.monthKey, label: event.monthLabel, events: [event] });
  }
  return { onNow, months };
}

/** Regions an event shows under. An event marked "all" shows under every region. */
export const matchesRegion = (event: Pick<CalendarEvent, 'destination'>, region: Destination | null): boolean =>
  !region || event.destination === region || event.destination === 'all';

/** Calendar anchor for an event, used by homepage cards to jump to it. */
export const eventAnchor = (id: string): string => `event-${id}`;
