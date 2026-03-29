import { createTravelStore } from './travel-base';
import { GuideSchema, type Guide } from '@/lib/schemas/travel.guides.schema';

export const guidesStore = createTravelStore<Guide>(
  'travel-guides.json',
  GuideSchema
);
