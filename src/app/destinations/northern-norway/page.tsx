import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Sun, Thermometer, Clock } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import heroImage from '@/assets/karasjok_Over.avif';

export const metadata: Metadata = {
  title: 'Northern Norway Travel Guide 2026 | NorgeTravel',
  description: 'Plan your Northern Norway trip: Tromsø aurora tours, Lofoten trekking, midnight sun cruises. Best time to visit, what to pack, and vetted operators.',
};

const highlights = [
  { icon: '🌌', title: 'Aurora Capital', body: 'Tromsø sits at 69°N — inside the auroral oval. On a G2+ storm night, the sky turns green from horizon to horizon.' },
  { icon: '☀️', title: 'Midnight Sun', body: 'May 20 – July 22, the sun never dips below the horizon. Hike at 2 am with full daylight.' },
  { icon: '🏔️', title: 'Lofoten Islands', body: '170 km of jagged peaks rising straight from the sea. Village-to-village treks, world-class surf, and stockfish culture.' },
  { icon: '🚢', title: 'Hurtigruten', body: 'The coastal route from Bergen to Kirkenes stops at 34 ports. Northern Norway\'s towns are best linked by ship.' },
];

const bestFor = [
  { season: 'Oct – Mar', activity: 'Northern Lights', detail: 'Polar night + clear skies = aurora hunting season' },
  { season: 'Jun – Aug', activity: 'Midnight Sun', detail: 'Hiking, kayaking, fishing in endless daylight' },
  { season: 'Mar – Apr', activity: 'Dog sledding & snowmobile', detail: 'Snow cover reliable, temps manageable' },
  { season: 'Sep', activity: 'Photography', detail: 'First auroras return + autumn foliage' },
];

export default function NorthernNorwayPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src={heroImage}
          alt="Northern Lights over Arctic Norway"
          fill
          className="object-cover opacity-50"
          priority
          quality={75}
          placeholder="blur"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/80" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-48">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00CC6A]/20 text-[#00CC6A] text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Destination Guide
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 max-w-3xl">
            Northern Norway
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            3,500 km of Arctic coastline. The world's densest aurora zone. Midnight sun from May to July. This is where serious Norway travel begins.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-[#5CBFEE]" /> −15°C to +20°C</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#5CBFEE]" /> Best: Oct–Apr (aurora) / Jun–Aug (midnight sun)</span>
            <span className="flex items-center gap-2"><Sun className="w-4 h-4 text-[#00CC6A]" /> 2–3 weeks recommended</span>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Northern Norway</h2>
          <p className="text-slate-600 mb-12 max-w-2xl">Norway has 83,000 km of coastline. The northern third has most of the drama.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h) => (
              <div key={h.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
                <span className="text-3xl mb-4 block">{h.icon}</span>
                <h3 className="font-bold text-slate-900 mb-2">{h.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best time */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">When to go</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bestFor.map((b) => (
              <div key={b.season} className="border border-slate-200 rounded-2xl p-6">
                <p className="text-sm font-bold text-[#1B3A5C] mb-1">{b.season}</p>
                <p className="font-bold text-slate-900 mb-2">{b.activity}</p>
                <p className="text-slate-500 text-sm">{b.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tours CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to book?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">We've vetted the best operators for Northern Norway — with transparent commission disclosures on every link.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tjenester/northern-lights" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-full hover:shadow-lg transition-all">
              Northern Lights Tours <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/tjenester/trekking" className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm">
              Arctic Trekking
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
