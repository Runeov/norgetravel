import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, Mail } from 'lucide-react';
import { TransportHero } from '@/components/modules/travel/TransportHero';
import { TravelGrid } from '@/components/modules/travel/TravelGrid';
import { transportStore } from '@/lib/admin/travel-transport';
import { getActiveCommercialOffers } from '@/data/commercial-offers';

export const metadata: Metadata = {
  title: 'Transport in Norway | NorgeTravel',
  description:
    'Compare flights, trains, buses, ferries, and road transfers for travel across Norway.',
};

export default async function TransportPage() {
  const items = await transportStore.getPublished();
  const commercialOffers = getActiveCommercialOffers('transport_after_flights');

  return (
    <div className="min-h-screen bg-[#f5f8f9]">
      <TransportHero />

      <section id="transport-options" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <div className="flex items-center gap-3 text-[#1B3A5C]">
              <Compass className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm font-semibold">Find the right connection</span>
            </div>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900 text-balance sm:text-5xl">
              Compare the journey, not just the destination.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
              Filter by travel mode and region, then compare route, timing, season, and operator details.
            </p>
          </div>

          {items.length > 0 ? (
            <TravelGrid
              items={items}
              showFilters
              category="transport"
              commercialOffers={commercialOffers}
            />
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
              <h2 className="text-2xl font-semibold text-slate-900">Transport listings are being updated</h2>
              <p className="mx-auto mt-3 max-w-md text-slate-600">
                Return to the travel map while we prepare the latest route information.
              </p>
              <Link
                href="/travel"
                className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#1B3A5C] px-5 py-2.5 text-sm font-semibold text-white transition-[transform,background-color] hover:bg-[#112a45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C] focus-visible:ring-offset-2 active:translate-y-px"
              >
                Explore travel map
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-xl bg-[#17364f] text-white">
          <div className="grid gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:px-14 lg:py-12">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#7bdcb0]">For transport operators</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Add a useful route to the guide.
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-sky-50/70">
                Tell us where you run, when you operate, and what travelers should know before they book.
              </p>
            </div>
            <a
              href="mailto:hello@norgetravel.com?subject=Transport%20listing%20for%20NorgeTravel"
              className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-lg bg-[#65d6a6] px-5 py-3 text-sm font-bold text-[#102d46] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[#82e3ba] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#17364f] active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Submit a route
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
