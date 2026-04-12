import { createTravelStore } from './travel-base';
import { EventSchema, type Event } from '@/lib/schemas/travel.events.schema';
import type { Destination } from '@/lib/schemas/travel.shared';

const base = createTravelStore<Event>('travel-events.json', EventSchema);

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function effectiveEnd(event: Event): string {
  return event.endDate || event.startDate;
}

function isUpcoming(event: Event, today: string): boolean {
  return effectiveEnd(event) >= today;
}

function byStartDateAsc(a: Event, b: Event): number {
  return a.startDate.localeCompare(b.startDate);
}

export const eventsStore = {
  ...base,

  async getUpcoming(): Promise<Event[]> {
    const today = todayISO();
    const items = await base.getPublished();
    return items.filter((e) => isUpcoming(e, today)).sort(byStartDateAsc);
  },

  async getUpcomingFeatured(): Promise<Event[]> {
    const today = todayISO();
    const items = await base.getFeatured();
    return items.filter((e) => isUpcoming(e, today)).sort(byStartDateAsc);
  },

  async filterUpcomingByDestination(destination: Destination): Promise<Event[]> {
    const today = todayISO();
    const items = await base.filterByDestination(destination);
    return items.filter((e) => isUpcoming(e, today)).sort(byStartDateAsc);
  },

  isPast(event: Event, today: string = todayISO()): boolean {
    return !isUpcoming(event, today);
  },
};
