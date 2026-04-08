import type { Event, EventType } from '@/lib/schemas/travel.events.schema';

/**
 * Sort events: upcoming first (nearest date at top), then past events (most recent first).
 */
export function sortEventsByDate(events: Event[]): Event[] {
  const now = new Date();
  const upcoming: Event[] = [];
  const past: Event[] = [];

  for (const event of events) {
    const end = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
    if (end >= now) {
      upcoming.push(event);
    } else {
      past.push(event);
    }
  }

  upcoming.sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  past.sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  return [...upcoming, ...past];
}

/**
 * Check whether an event is upcoming (end date >= today).
 */
export function isUpcoming(event: Event): boolean {
  const end = event.endDate ? new Date(event.endDate) : new Date(event.startDate);
  return end >= new Date();
}

/**
 * Format a date range for display.
 * Single day: "12 Jan 2026"
 * Same month: "12-15 Jan 2026"
 * Cross month: "28 Jan - 2 Feb 2026"
 */
export function formatEventDateRange(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const startDay = start.getDate();
  const startMonth = months[start.getMonth()];
  const startYear = start.getFullYear();

  if (!endDate) {
    return `${startDay} ${startMonth} ${startYear}`;
  }

  const end = new Date(endDate);
  const endDay = end.getDate();
  const endMonth = months[end.getMonth()];
  const endYear = end.getFullYear();

  if (start.getTime() === end.getTime()) {
    return `${startDay} ${startMonth} ${startYear}`;
  }

  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${startDay}-${endDay} ${startMonth} ${startYear}`;
  }

  if (startYear === endYear) {
    return `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`;
  }

  return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
}

/**
 * Badge color classes per event type (Tailwind).
 */
export const EVENT_TYPE_COLORS: Record<EventType, string> = {
  'festival': 'bg-purple-100 text-purple-700',
  'concert': 'bg-pink-100 text-pink-700',
  'market': 'bg-amber-100 text-amber-700',
  'sports': 'bg-emerald-100 text-emerald-700',
  'cultural': 'bg-blue-100 text-blue-700',
  'midnight-sun': 'bg-orange-100 text-orange-700',
  'northern-lights': 'bg-indigo-100 text-indigo-700',
  'food-drink': 'bg-red-100 text-red-700',
  'outdoor': 'bg-teal-100 text-teal-700',
  'seasonal': 'bg-cyan-100 text-cyan-700',
};
