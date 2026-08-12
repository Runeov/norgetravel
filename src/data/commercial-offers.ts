import {
  CommercialOfferSchema,
  isCommercialOfferActive,
  type CommercialOffer,
} from '@/lib/schemas/commercial-offer.schema';

const commercialOffers = [
  {
    id: 'kiwi-flights-to-norway',
    status: 'published',
    offerType: 'affiliate',
    partner: 'Kiwi.com',
    title: 'Compare flights to Norway',
    description:
      'Search direct flights and connecting routes across multiple airlines before choosing how to reach Norway.',
    ctaLabel: 'Compare flights',
    url: 'https://www.kiwi.com/deep?to=OSL',
    disclosure:
      'External booking partner. We may earn a commission if you book, at no additional cost to you.',
    placements: ['transport_after_flights'],
    destinations: ['all'],
    topics: ['flights', 'transport'],
    priority: 100,
  },
] satisfies CommercialOffer[];

const validatedOffers = commercialOffers.map((offer) =>
  CommercialOfferSchema.parse(offer)
);

export function getActiveCommercialOffers(
  placement: string,
  now = new Date()
): CommercialOffer[] {
  return validatedOffers
    .filter(
      (offer) =>
        offer.placements.includes(placement) && isCommercialOfferActive(offer, now)
    )
    .sort((a, b) => b.priority - a.priority);
}
