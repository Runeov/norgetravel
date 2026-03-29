import { createTravelStore } from './travel-base';
import { EventSchema, type Event } from '@/lib/schemas/travel.events.schema';

export const eventsStore = createTravelStore<Event>(
  'travel-events.json',
  EventSchema
);
