import { createTravelStore } from './travel-base';
import { ExperienceSchema, type Experience } from '@/lib/schemas/travel.experiences.schema';

export const experiencesStore = createTravelStore<Experience>(
  'travel-experiences.json',
  ExperienceSchema
);
