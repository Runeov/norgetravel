import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TravelHero } from '@/components/modules/travel/TravelHero';
import { TravelGrid } from '@/components/modules/travel/TravelGrid';
import { eventsStore } from '@/lib/admin/travel-events';

export const metadata: Metadata = {
  title: 'Events & Festivals in Norway | NorgeTravel',
  description:
    'Discover the best events and festivals in Norway — from the Tromsø International Film Festival to summer midnight sun celebrations, winter markets, and Sami cultural events.',
};

export default async function EventsPage() {
  const items = await eventsStore.getPublished();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <TravelHero
        title="Events & Festivals in Norway"
        subtitle="From the Tromsø International Film Festival to midnight sun celebrations and Sami cultural gatherings — Norway's event calendar is as dramatic as its landscape."
        emoji="🎉"
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
              <span className="text-6xl mb-6 block">🎉</span>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                Event listings coming soon
              </h2>
              <p className="text-slate-600 max-w-md mx-auto mb-8 leading-relaxed">
                We&apos;re curating the best festivals, markets, and cultural events across Norway. Check back soon.
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
          <h2 className="text-3xl font-bold mb-4">Plan your Norway trip</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Time your visit around a festival and combine it with the right experiences and accommodation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/travel/experiences"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-[#1B3A5C] font-medium rounded-full hover:shadow-lg transition-all text-sm"
            >
              ⛷️ Experiences
            </Link>
            <Link
              href="/travel/accommodation"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all text-sm"
            >
              🏨 Accommodation
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
