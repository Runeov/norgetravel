import { createTravelStore } from './travel-base';
import { RestaurantSchema, type Restaurant } from '@/lib/schemas/travel.restaurants.schema';

export const restaurantsStore = createTravelStore<Restaurant>(
  'travel-restaurants.json',
  RestaurantSchema
);
