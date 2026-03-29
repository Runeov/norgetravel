import { createTravelStore } from './travel-base';
import { AccommodationSchema, type Accommodation } from '@/lib/schemas/travel.accommodation.schema';

export const accommodationStore = createTravelStore<Accommodation>(
  'travel-accommodation.json',
  AccommodationSchema
);
