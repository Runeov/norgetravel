import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Thermometer } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import heroImage from '@/assets/karasjok_Over.avif';

export const metadata: Metadata = {
  title: 'Lofoten Islands Travel Guide 2026 | NorgeTravel',
  description: 'Everything you need to plan a Lofoten trip: best hikes, where to stay, fishing villages, and when to go. Verified operator links with commission disclosures.',
};

const experiences = [
  { emoji: '🥾', title: 'Reinebringen', body: 'The iconic 448-step hike above Reine. Allow 2–3 hours round trip. No shuttle — it starts from the village.' },
  { emoji: '🎣', title: 'Stockfish heritage', body: 'Lofoten dries 20,000 tonnes of cod each year. The Stockfish Museum in Å tells the full story in 90 minutes.' },
  { emoji: '🏄', title: 'Unstad surf beach', body: 'One of Europe's most northerly surf breaks. Waves 1–4m, water 8–12°C. Wetsuits provided by local schools.' },
  { emoji: '🛶', title: 'Sea kayaking', body: 'Paddle between fishermen\'s cabins (rorbuer). Multi-day routes connect Svolvær to Å — 200 km of sheltered fjords.' },
  { emoji: '🌅', title: 'Midnight sun photography', body: 'June–July: 24-hour daylight turns village harbours into photography gold. Best light 10 pm–2 am.' },
  { emoji: '🐟', title: 'Cod fishing charter', body: 'Year-round fishing. Peak season Jan–Apr when Arctic cod migrate to spawn. Charters from NOK 950/person.' },
];

export default function LofoteнPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src={heroImage}
          alt="Lofoten Islands aerial view — dramatic peaks and fishing villages"
          fill
          className="object-cover opacity-50"
          priority
          placeholder="blur"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/80" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-48">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00CC6A]/20 text-[#00CC6A] text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Destination Guide
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Lofoten Islands
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            Mountains that shoot 1,000 metres straight out of the sea. Red fishing cabins on stilts. The most photographed archipelago in Europe — for good reason.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#5CBFEE]" /> 68°N, Nordland County</span>
            <span className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-[#5CBFEE]" /> −5°C to +18°C</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#00CC6A]" /> 5–10 days ideal</span>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">What to do</h2>
          <p className="text-slate-600 mb-12 max-w-2xl">Lofoten isn't one experience — it's six stacked on top of each other.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((e) => (
              <div key={e.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
                <span className="text-3xl mb-4 block">{e.emoji}</span>
                <h3 className="font-bold text-slate-900 mb-2">{e.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting there */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Getting there</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 border border-slate-200 rounded-2xl">
              <span className="text-2xl">✈️</span>
              <div>
                <p className="font-bold text-slate-900">Fly to Svolvær (SVJ) or Leknes (LKN)</p>
                <p className="text-slate-600 text-sm">Daily connections from Oslo (1h 45m). Book 6–8 weeks ahead for summer.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-2xl">
              <span className="text-2xl">🚗</span>
              <div>
                <p className="font-bold text-slate-900">Drive the E10 from Narvik</p>
                <p className="text-slate-600 text-sm">3 hours from Narvik. The E10 crosses the islands via bridges — no ferry needed.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-2xl">
              <span className="text-2xl">🚢</span>
              <div>
                <p className="font-bold text-slate-900">Hurtigruten coastal express</p>
                <p className="text-slate-600 text-sm">Stops at Stamsund and Svolvær. Combine with a coastal cruise for the full experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Book your Lofoten adventure</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Guided treks, rorbuer stays, and fishing charters — all vetted and commission-disclosed.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tjenester/trekking" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-full hover:shadow-lg transition-all">
              Arctic Trekking <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/tjenester/remote-cabins" className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm">
              Rorbu Cabin Stays
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
