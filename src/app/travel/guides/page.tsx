import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TravelHero } from '@/components/modules/travel/TravelHero';
import { TravelGrid } from '@/components/modules/travel/TravelGrid';
import { guidesStore } from '@/lib/admin/travel-guides';

export const metadata: Metadata = {
  title: 'Tour Guides in Norway | NorgeTravel',
  description:
    'Find expert local guides for hiking, fishing, northern lights, wildlife, photography, and more across Norway. Book your perfect Norwegian adventure guide.',
};

export default async function GuidesPage() {
  const items = await guidesStore.getPublished();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <TravelHero
        title="Expert Local Guides"
        subtitle="Find the right guide for your adventure — from northern lights chasing to deep fjord fishing, our local experts know Norway inside out."
        emoji="🧭"
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
              <span className="text-6xl mb-6 block">🧭</span>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Guide listings coming soon
              </h2>
              <p className="text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
                We&apos;re curating the best local guides across Norway. Check back soon for hiking, fishing, northern lights, and more.
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
          <h2 className="text-3xl font-bold mb-4">Planning your adventure?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Combine guides with transport, accommodation, and experiences for the complete Norwegian adventure.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/travel/transport"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-[#1B3A5C] font-medium rounded-full hover:shadow-lg transition-all text-sm"
            >
              🚂 Transport
            </Link>
            <Link
              href="/travel/accommodation"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all text-sm"
            >
              🏨 Accommodation
            </Link>
            <Link
              href="/travel/experiences"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all text-sm"
            >
              ⛷️ Experiences
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
