import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TravelHero } from '@/components/modules/travel/TravelHero';
import { TravelGrid } from '@/components/modules/travel/TravelGrid';
import { transportStore } from '@/lib/admin/travel-transport';

export const metadata: Metadata = {
  title: 'Transport in Norway | NorgeTravel',
  description:
    'Getting around Norway — flights, trains, buses, ferries, car rentals, and cycling routes. Find the best transport options for your Norwegian adventure.',
};

export default async function TransportPage() {
  const items = await transportStore.getPublished();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <TravelHero
        title="Getting Around Norway"
        subtitle="Flights, trains, buses, ferries, and more — navigate Norway's stunning landscapes with the right transport for every route."
        emoji="🚂"
      />

      {/* Back link */}
      <section className="pt-8 pb-0">
        <div className="container mx-auto px-4">
          <Link
            href="/travel"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#1B3A5C] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Travel Map
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          {items.length > 0 ? (
            <TravelGrid items={items} showFilters />
          ) : (
            <div className="text-center py-16">
              <span className="text-6xl mb-6 block">🚂</span>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Transport listings coming soon
              </h2>
              <p className="text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
                We&apos;re curating the best transport options across Norway. Check back soon for flights, trains, ferries, and more.
              </p>
              <Link
                href="/travel"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white font-medium rounded-full hover:shadow-lg hover:shadow-[#1B3A5C]/30 transition-all duration-300 text-sm"
              >
                Explore Travel Map
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#1B3A5C] to-[#5CBFEE] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Planning your route?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Combine transport with accommodation, guides, and experiences for the complete Norwegian adventure.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/travel/accommodation"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-[#1B3A5C] font-medium rounded-full hover:shadow-lg transition-all text-sm"
            >
              🏨 Accommodation
            </Link>
            <Link
              href="/travel/experiences"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all text-sm"
            >
              ⛷️ Experiences
            </Link>
            <Link
              href="/travel/guides"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all text-sm"
            >
              🧭 Guides
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
