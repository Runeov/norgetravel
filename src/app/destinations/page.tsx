import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';

export const metadata: Metadata = {
  title: 'Norway Destinations 2026 | NorgeTravel',
  description: 'Northern Norway, Lofoten Islands, Norwegian Fjords, and Svalbard — complete destination guides with best time to visit, what to do, and vetted operator links.',
};

const destinations = [
  {
    slug: 'northern-norway',
    name: 'Northern Norway',
    tagline: 'Aurora capital of the world',
    description: '3,500 km of Arctic coastline. Tromsø at 69°N. Polar night October to February, midnight sun May to July.',
    highlights: ['Northern Lights', 'Tromsø', 'Midnight Sun', 'Dog Sledding'],
    emoji: '🌌',
    color: 'from-[#1B3A5C] to-[#00CC6A]',
  },
  {
    slug: 'lofoten',
    name: 'Lofoten Islands',
    tagline: 'Mountains straight out of the sea',
    description: '170 km of jagged peaks, red rorbuer, and world-class trekking. Europe\'s most photographed archipelago.',
    highlights: ['Reinebringen', 'Rorbu Cabins', 'Sea Kayaking', 'Midnight Sun Surf'],
    emoji: '🏔️',
    color: 'from-[#1B3A5C] to-[#5CBFEE]',
  },
  {
    slug: 'fjords',
    name: 'Norwegian Fjords',
    tagline: 'Two UNESCO sites, zero cruise crowds',
    description: 'Geirangerfjord and Nærøyfjord are UNESCO World Heritage. Electric ferries run year-round from 2026.',
    highlights: ['Geirangerfjord', 'Nærøyfjord', 'Electric Cruises', 'Seven Sisters'],
    emoji: '🚢',
    color: 'from-[#5CBFEE] to-[#1B3A5C]',
  },
  {
    slug: 'svalbard',
    name: 'Svalbard',
    tagline: '78°N — the far Arctic',
    description: 'Polar bears outnumber people 3:1. Direct flight from Oslo. Four months of polar night, four of midnight sun.',
    highlights: ['Polar Bears', 'Glacier Hiking', 'Dog Sled Aurora', 'Snowmobile'],
    emoji: '🐻‍❄️',
    color: 'from-[#00CC6A] to-[#1B3A5C]',
  },
  {
    slug: 'tromso',
    name: 'Tromsø',
    tagline: 'Arctic capital — 69°N',
    description: '75,000 residents inside the auroral oval. Northern Lights September–March, midnight sun May–July, orca in the fjords November–February.',
    highlights: ['Northern Lights', 'Whale Watching', 'Midnight Sun', 'Dog Sledding'],
    emoji: '🌌',
    color: 'from-[#1B3A5C] to-[#5CBFEE]',
  },
];

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-[#1B3A5C] text-white">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Norway{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5CBFEE] to-[#00CC6A]">
              Destinations
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Four regions. Four entirely different Norways. Each one worth the trip alone.
          </p>
        </div>
      </section>

      {/* Destination cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {destinations.map((d) => (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Color banner */}
                <div className={`h-3 bg-gradient-to-r ${d.color}`} />
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl">{d.emoji}</span>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#1B3A5C] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">{d.name}</h2>
                  <p className="text-[#1B3A5C] font-medium text-sm mb-3">{d.tagline}</p>
                  <p className="text-slate-600 mb-6 leading-relaxed">{d.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {d.highlights.map((h) => (
                      <span key={h} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{h}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tours CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Know where you're going? Book a tour.</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Northern Lights chases, fjord cruises, Arctic trekking, and cabin stays — all with commission-transparent affiliate links.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/tjenester/northern-lights" className="inline-flex items-center justify-center px-6 py-2.5 bg-white text-[#1B3A5C] font-medium rounded-full hover:shadow-lg transition-all text-sm">Northern Lights</Link>
            <Link href="/destinations/fjords" className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all text-sm">Fjord Cruises</Link>
            <Link href="/tjenester/trekking" className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all text-sm">Arctic Trekking</Link>
            <Link href="/tjenester/remote-cabins" className="inline-flex items-center justify-center px-6 py-2.5 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all text-sm">Remote Cabins</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
