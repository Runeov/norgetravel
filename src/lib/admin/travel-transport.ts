import { createTravelStore } from './travel-base';
import { TransportSchema, type Transport } from '@/lib/schemas/travel.transport.schema';

export const transportStore = createTravelStore<Transport>(
  'travel-transport.json',
  TransportSchema
);
