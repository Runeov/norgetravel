import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import heroImage from '@/assets/Hero_aboutUS.png';

export const metadata: Metadata = {
  title: 'Remote Cabin Stays Norway 2026 — Hytter & Rorbuer | NorgeTravel',
  description: 'Book remote Norwegian cabin stays — Lofoten rorbuer, Arctic hytter, and off-grid wilderness lodges. Booking.com and Novasol affiliate links with commission transparency.',
};

const cabinTypes = [
  {
    type: 'Rorbu (fisherman\'s cabin)',
    location: 'Lofoten, Vesterålen',
    sleeps: '2–8',
    priceFrom: 'NOK 1,200/night',
    character: 'Red wooden cabins on stilts over the sea. Originally built for seasonal cod fishermen. Now the iconic Lofoten stay.',
    amenities: ['Sea views', 'Private dock', 'Boat rental available', 'Full kitchen'],
  },
  {
    type: 'Arctic hytte (mountain cabin)',
    location: 'Tromsø region, Finnmark',
    sleeps: '2–6',
    priceFrom: 'NOK 900/night',
    character: 'Glass-walled cabins and traditional log hyttер above the treeline. Built for aurora viewing — some have glass roofs.',
    amenities: ['Aurora views', 'Wood-burning stove', 'Sauna', 'Off-grid solar'],
  },
  {
    type: 'Coastal lodge',
    location: 'Fjord Norway, Helgeland',
    sleeps: '4–12',
    priceFrom: 'NOK 2,400/night',
    character: 'Modern architect-designed lodges on remote fjord islands. Access by boat only. Complete seclusion.',
    amenities: ['Private fjord', 'Kayaks included', 'Chef available', 'Helicopter access'],
  },
];

const operators = [
  {
    name: 'Booking.com',
    via: 'Awin / Commission Junction',
    rate: 'Tiered — up to 25%',
    note: 'Largest inventory of Norwegian cabins. Filter by "entire home" and "rural" to find the rorbuer and mountain hyttер.',
  },
  {
    name: 'Novasol',
    via: 'Awin',
    rate: '2.5%',
    note: 'Scandinavian specialist with 30,000 cabins across Norway, Sweden, and Denmark. Best for Lofoten and coastal Norway inventory.',
  },
];

const seasonAdvice = [
  { season: 'Dec–Mar', best: 'Aurora + snow', cabins: 'Arctic hytter with glass walls. Book 3+ months ahead.' },
  { season: 'Apr–May', best: 'Shoulder season', cabins: 'Best prices. Snow melts = muddy trails but zero crowds.' },
  { season: 'Jun–Aug', best: 'Midnight sun', cabins: 'Rorbuer in Lofoten sell out by February. Book early.' },
  { season: 'Sep–Nov', best: 'First auroras + autumn', cabins: 'Ideal photography season. Shoulder prices return.' },
];

export default function RemoteCabinsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src={heroImage}
          alt="Remote Norwegian cabin stay — hytte in wilderness with mountain views"
          fill
          className="object-cover opacity-50"
          priority
          placeholder="blur"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/85" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-48">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00CC6A]/20 text-[#00CC6A] text-sm font-medium mb-6">
            🏚️ Rorbuer · Hytter · Arctic Lodges
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 max-w-3xl">
            Remote Cabin Stays
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            Norway has 500,000 registered cabins (hyttер). Most Norwegians own one. A growing number rent to international travellers — and the best ones are remote enough that you won't see another car for days.
          </p>
          <p className="text-sm text-slate-400">From NOK 900/night · Sleeps 2–12</p>
        </div>
      </section>

      {/* Cabin types */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Types of cabin stay</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {cabinTypes.map((c) => (
              <div key={c.type} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
                <h3 className="font-bold text-xl text-slate-900 mb-1">{c.type}</h3>
                <p className="text-sm text-[#1B3A5C] font-medium mb-1">📍 {c.location}</p>
                <p className="text-sm text-slate-500 mb-3">Sleeps {c.sleeps} · From {c.priceFrom}</p>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{c.character}</p>
                <ul className="space-y-1">
                  {c.amenities.map((a) => (
                    <li key={a} className="text-sm text-slate-500 flex items-center gap-2">
                      <span className="text-[#00CC6A]">✓</span> {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking platforms */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Where to book</h2>
          <p className="text-slate-500 text-sm mb-10">
            Affiliate disclosure: NorgeTravel earns a commission on bookings via these links. Your price is unchanged.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            {operators.map((op) => (
              <div key={op.name} className="border border-slate-200 rounded-2xl p-6 flex flex-col">
                <h3 className="font-bold text-xl text-slate-900 mb-1">{op.name}</h3>
                <p className="text-xs text-slate-400 mb-3">Via {op.via} · {op.rate}</p>
                <p className="text-slate-600 text-sm leading-relaxed flex-1">{op.note}</p>
                <a
                  href="#"
                  rel="noopener noreferrer sponsored"
                  className="mt-4 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Search cabins <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Season guide */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">When to go</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {seasonAdvice.map((s) => (
              <div key={s.season} className="bg-white border border-slate-200 rounded-2xl p-6">
                <p className="text-sm font-bold text-[#1B3A5C] mb-1">{s.season}</p>
                <p className="font-bold text-slate-900 mb-2">{s.best}</p>
                <p className="text-slate-500 text-sm">{s.cabins}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Find your cabin</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Start with the destination guide for the region you're targeting, then search the cabin inventory.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/destinations/lofoten" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-full hover:shadow-lg transition-all">
              Lofoten Rorbuer <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/destinations/northern-norway" className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm">
              Arctic Hytter
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
