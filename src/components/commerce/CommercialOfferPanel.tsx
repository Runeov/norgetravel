'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight, PlaneTakeoff } from 'lucide-react';
import { CommercialDisclosure } from './CommercialDisclosure';
import { trackEvent } from '@/lib/analytics';
import type { CommercialOffer } from '@/lib/schemas/commercial-offer.schema';

interface CommercialOfferPanelProps {
  offer: CommercialOffer;
  placement: string;
}

export function CommercialOfferPanel({
  offer,
  placement,
}: CommercialOfferPanelProps) {
  const panelRef = useRef<HTMLElement>(null);
  const viewedRef = useRef(false);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || viewedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.5 || viewedRef.current) {
          return;
        }

        viewedRef.current = true;
        trackEvent('commercial_offer_viewed', {
          offer_id: offer.id,
          offer_type: offer.offerType,
          partner: offer.partner,
          placement,
        });
        observer.disconnect();
      },
      { threshold: 0.5 }
    );

    observer.observe(panel);
    return () => observer.disconnect();
  }, [offer.id, offer.offerType, offer.partner, placement]);

  const sponsored = offer.offerType === 'affiliate' || offer.offerType === 'sponsored';

  function handleClick() {
    const properties = {
      offer_id: offer.id,
      offer_type: offer.offerType,
      partner: offer.partner,
      placement,
      destination: offer.url.split('?')[0],
      link_text: offer.ctaLabel,
    };

    trackEvent('commercial_offer_clicked', properties);
    if (offer.offerType === 'affiliate') {
      trackEvent('affiliate_click', properties);
    }
  }

  return (
    <aside
      ref={panelRef}
      aria-labelledby={`offer-${offer.id}`}
      data-analytics-placement={placement}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white"
    >
      <div className="grid gap-6 p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1B3A5C] text-white">
          <PlaneTakeoff className="h-5 w-5" aria-hidden="true" />
        </div>

        <div>
          <p className="mb-1 text-sm font-medium text-[#1B3A5C]">
            Recommended booking tool
          </p>
          <h3
            id={`offer-${offer.id}`}
            className="text-xl font-semibold tracking-tight text-slate-900"
          >
            {offer.title}
          </h3>
          <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-slate-600">
            {offer.description}
          </p>
          {offer.priceLabel && (
            <p className="mt-2 text-sm font-semibold text-slate-800">
              {offer.priceLabel}
            </p>
          )}
        </div>

        <a
          href={offer.url}
          target="_blank"
          rel={sponsored ? 'noopener noreferrer sponsored' : 'noopener noreferrer'}
          data-analytics-handled="true"
          onClick={handleClick}
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 self-center whitespace-nowrap rounded-lg bg-[#1B3A5C] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#112a45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00CC6A] focus-visible:ring-offset-2 active:translate-y-px md:w-auto"
        >
          {offer.ctaLabel}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <div className="border-t border-slate-100 bg-slate-50 px-6 py-3 md:px-8">
        <CommercialDisclosure>{offer.disclosure}</CommercialDisclosure>
      </div>
    </aside>
  );
}
