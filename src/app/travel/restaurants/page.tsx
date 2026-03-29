import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TravelHero } from '@/components/modules/travel/TravelHero';
import { TravelGrid } from '@/components/modules/travel/TravelGrid';
import { restaurantsStore } from '@/lib/admin/travel-restaurants';

export const metadata: Metadata = {
  title: 'Restaurants & Dining in Norway | NorgeTravel',
  description:
    'Discover the best restaurants in Norway — from fresh seafood and traditional Norwegian cuisine to Sami food traditions, fine dining, cozy cafés, and local bakeries.',
};

export default async function RestaurantsPage() {
  const items = await restaurantsStore.getPublished();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <TravelHero
        title="Where to Eat in Norway"
        subtitle="From fresh Arctic seafood and traditional Norwegian dishes to Sami food traditions and Michelin-starred fine dining — discover Norway one bite at a time."
        emoji="🍽️"
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
              <span className="text-6xl mb-6 block">🍽️</span>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Restaurant listings coming soon
              </h2>
              <p className="text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
                We&apos;re curating the best dining experiences across Norway. Check back soon for restaurants, cafés, bakeries, and more.
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
          <h2 className="text-3xl font-bold mb-4">Hungry for more?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Pair your dining with accommodation, transport, and experiences for the complete Norwegian adventure.
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
              href="/travel/transport"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all text-sm"
            >
              🚂 Transport
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
