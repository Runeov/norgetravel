import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';

export const metadata: Metadata = {
  title: 'Norway Travel Map 2026 | NorgeTravel',
  description:
    'Your complete guide to traveling Norway — transport, accommodation, local guides, experiences, and restaurants across Northern Norway, Lofoten, the Fjords, and Svalbard.',
};

const categories = [
  {
    slug: 'transport',
    name: 'Transport',
    emoji: '🚂',
    tagline: 'Getting around Norway',
    description:
      "Trains, buses, ferries, flights, and car rentals. Navigate Norway's stunning landscapes with the right transport for every route.",
    highlights: ['Hurtigruten', 'Vy Rail', 'Widerøe Flights', 'Arctic Route Bus'],
    color: 'from-[#1B3A5C] to-[#5CBFEE]',
  },
  {
    slug: 'accommodation',
    name: 'Accommodation',
    emoji: '🏨',
    tagline: 'Where to stay',
    description:
      'From traditional rorbuer in Lofoten to Arctic glamping in Svalbard. Handpicked stays for every budget and style.',
    highlights: ['Rorbuer', 'Arctic Hotels', 'Mountain Lodges', 'Glamping'],
    color: 'from-[#00CC6A] to-[#1B3A5C]',
  },
  {
    slug: 'guides',
    name: 'Guides',
    emoji: '🧭',
    tagline: 'Expert local guides',
    description:
      'Certified local guides who know every trail, fjord, and hidden gem. Book with confidence through vetted operators.',
    highlights: ['Aurora Guides', 'Fjord Experts', 'Sami Culture', 'Wildlife Tours'],
    color: 'from-[#5CBFEE] to-[#00CC6A]',
  },
  {
    slug: 'experiences',
    name: 'Experiences',
    emoji: '⛷️',
    tagline: 'Activities and tours',
    description:
      'Northern Lights chases, whale watching, glacier hikes, and midnight sun kayaking. Adventures that define Norway.',
    highlights: ['Northern Lights', 'Whale Watching', 'Glacier Hikes', 'Kayaking'],
    color: 'from-[#1B3A5C] to-[#00CC6A]',
  },
  {
    slug: 'restaurants',
    name: 'Restaurants',
    emoji: '🍽️',
    tagline: 'Where to eat',
    description:
      'Arctic seafood, reindeer stew, and Michelin-starred Nordic cuisine. Taste Norway from fjord to plate.',
    highlights: ['Arctic Seafood', 'Nordic Fine Dining', 'Local Cafés', 'Food Markets'],
    color: 'from-[#00CC6A] to-[#5CBFEE]',
  },
];

export default function TravelPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-[#1B3A5C] text-white">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="text-6xl mb-6 block">🗺️</span>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Norway{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5CBFEE] to-[#00CC6A]">
              Travel Map
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Everything you need to explore Norway — transport, stays, guides, experiences, and food.
            All in one place.
          </p>
        </div>
      </section>

      {/* Category cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Explore by Category</h2>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Five essential pillars for planning your Norwegian adventure.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/travel/${cat.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Color banner */}
                <div className={`h-3 bg-gradient-to-r ${cat.color}`} />
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{cat.emoji}</span>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#1B3A5C] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{cat.name}</h3>
                  <p className="text-[#1B3A5C] font-medium text-sm mb-3">{cat.tagline}</p>
                  <p className="text-slate-600 mb-6 leading-relaxed">{cat.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to plan your Norway trip?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Browse our curated listings across all categories, or jump straight to a destination you
            love.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/destinations/northern-norway"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-[#1B3A5C] font-medium rounded-full hover:shadow-lg transition-all text-sm"
            >
              Northern Norway
            </Link>
            <Link
              href="/destinations/lofoten"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all text-sm"
            >
              Lofoten
            </Link>
            <Link
              href="/destinations/fjords"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all text-sm"
            >
              Fjords
            </Link>
            <Link
              href="/destinations/svalbard"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all text-sm"
            >
              Svalbard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
