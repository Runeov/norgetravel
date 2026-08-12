import { z } from 'zod';

export const CommercialOfferTypeSchema = z.enum([
  'affiliate',
  'sponsored',
  'lead-generation',
  'direct-sale',
]);

export const CommercialOfferStatusSchema = z.enum([
  'draft',
  'published',
  'paused',
]);

export const CommercialOfferSchema = z.object({
  id: z.string().min(1),
  status: CommercialOfferStatusSchema,
  offerType: CommercialOfferTypeSchema,
  partner: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  ctaLabel: z.string().min(1),
  url: z.string().min(1),
  disclosure: z.string().min(1),
  placements: z.array(z.string().min(1)).min(1),
  destinations: z.array(z.string().min(1)).default([]),
  topics: z.array(z.string().min(1)).default([]),
  priceLabel: z.string().min(1).optional(),
  currency: z.string().length(3).optional(),
  validFrom: z.string().datetime().optional(),
  validUntil: z.string().datetime().optional(),
  priority: z.number().int().default(0),
});

export type CommercialOffer = z.infer<typeof CommercialOfferSchema>;
export type CommercialOfferType = z.infer<typeof CommercialOfferTypeSchema>;
export type CommercialOfferStatus = z.infer<typeof CommercialOfferStatusSchema>;

export function isCommercialOfferActive(
  offer: CommercialOffer,
  now = new Date()
): boolean {
  if (offer.status !== 'published') return false;

  if (offer.validFrom && now < new Date(offer.validFrom)) return false;
  if (offer.validUntil && now > new Date(offer.validUntil)) return false;

  return true;
}
