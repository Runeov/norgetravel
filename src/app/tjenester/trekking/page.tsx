import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import heroImage from '@/assets/hero_raadgivning.avif';

export const metadata: Metadata = {
  title: 'Arctic Trekking Norway 2026 — Lofoten & Svalbard | NorgeTravel',
  description: 'Guided Arctic trekking in Lofoten and Svalbard. Norrøna-equipped guides, 57hours expedition booking, and multi-day wilderness routes. Prices from NOK 2,400/person.',
};

const routes = [
  {
    name: 'Reinebringen, Lofoten',
    difficulty: 'Moderate',
    duration: '2–3 hours',
    elevation: '448m',
    season: 'May–Oct',
    body: 'The most photographed view in Norway. Metal steps cut into the ridge in 2022 make it safer than before. Go at midnight in June for the full midnight sun effect.',
  },
  {
    name: 'Munkebu Hut Trek, Lofoten',
    difficulty: 'Moderate–Hard',
    duration: '2 days',
    elevation: '600m',
    season: 'Jun–Sep',
    body: 'A classic Lofoten hut-to-hut route. The Munkebu hut sits on a ridge with 360° views over Solvågen and Vindstad — only accessible by foot or ferry.',
  },
  {
    name: 'Trollfjord trail, Lofoten',
    difficulty: 'Hard',
    duration: '6–8 hours',
    elevation: '900m',
    season: 'Jul–Sep',
    body: 'Technical scrambling into the narrowest fjord in Lofoten. Guide required. Norrøna Sport provides the hardshell layers that make this route viable in Norwegian weather.',
  },
  {
    name: 'Svalbard Wilderness Trek',
    difficulty: 'Expedition',
    duration: '5–10 days',
    elevation: 'Variable',
    season: 'Jul–Aug',
    body: 'Multi-day glacier and tundra trekking with polar bear watch. Mandatory armed guide. 57hours connects you to licensed Svalbard expedition outfitters.',
  },
];

const gear = [
  { brand: 'Norrøna Sport', via: 'Commission Junction (CJ)', rate: '10%', note: 'Norwegian brand built for Arctic conditions. Lofoten jacket line is purpose-made for this region.' },
  { brand: '57hours', via: 'Lead-based affiliate', rate: 'Lead fee', note: 'Books guided expeditions with vetted mountain guides. Specialises in remote and technical routes.' },
];

export default function TrekkingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src={heroImage}
          alt="Arctic trekking in Lofoten — hiker on ridge with fjord below"
          fill
          className="object-cover opacity-50"
          priority
          quality={75}
          placeholder="blur"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/85" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-48">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00CC6A]/20 text-[#00CC6A] text-sm font-medium mb-6">
            🥾 Guided & Self-Guided Routes
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 max-w-3xl">
            Arctic Trekking
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            Lofoten has peaks that rise 1,000 metres from sea level over 5 km. Svalbard has polar bears. Both require the right gear and — for Svalbard — a licensed guide. We connect you to both.
          </p>
          <p className="text-sm text-slate-400">From NOK 2,400/person for guided day treks</p>
        </div>
      </section>

      {/* Routes */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Featured routes</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {routes.map((r) => (
              <div key={r.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    r.difficulty === 'Expedition' ? 'bg-red-100 text-red-700' :
                    r.difficulty === 'Hard' ? 'bg-orange-100 text-orange-700' :
                    r.difficulty === 'Moderate–Hard' ? 'bg-amber-100 text-amber-700' :
                    'bg-green-100 text-green-700'
                  }`}>{r.difficulty}</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{r.duration}</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">↑ {r.elevation}</span>
                  <span className="text-xs bg-[#1B3A5C]/10 text-[#1B3A5C] px-2 py-1 rounded-full">{r.season}</span>
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-3">{r.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gear & booking */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Gear and guided bookings</h2>
          <p className="text-slate-500 text-sm mb-10">
            Affiliate disclosure: NorgeTravel earns a commission on gear and guide bookings. Your price is unchanged.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            {gear.map((g) => (
              <div key={g.brand} className="border border-slate-200 rounded-2xl p-6 flex flex-col">
                <h3 className="font-bold text-xl text-slate-900 mb-1">{g.brand}</h3>
                <p className="text-xs text-slate-400 mb-3">Via {g.via} · {g.rate}</p>
                <p className="text-slate-600 text-sm leading-relaxed flex-1">{g.note}</p>
                <a
                  href="#"
                  rel="noopener noreferrer sponsored"
                  className="mt-4 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Shop / Book <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Choose your destination</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Lofoten for accessible drama. Svalbard for the true Arctic. Both are within reach.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/destinations/lofoten" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-full hover:shadow-lg transition-all">
              Lofoten Guide <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/destinations/svalbard" className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm">
              Svalbard Expeditions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
