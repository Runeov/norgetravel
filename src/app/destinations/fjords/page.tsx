import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import heroImage from '@/assets/Hero_Tjenester.avif';

export const metadata: Metadata = {
  title: 'Norwegian Fjords Travel Guide 2026 | NorgeTravel',
  description: 'Geirangerfjord, Nærøyfjord, Hardangerfjord — the complete guide to Norway\'s UNESCO fjords. Zero-emission cruise operators, best viewpoints, and how to avoid the crowds.',
};

const fjords = [
  {
    name: 'Geirangerfjord',
    length: '15 km',
    unesco: true,
    highlight: 'Seven Sisters waterfall — seven streams drop 250m side by side. Best seen by kayak from below.',
    access: 'Ferry from Hellesylt or Ørsneset. Drive Ørnesvegen (Eagle Road) for the classic overview.',
  },
  {
    name: 'Nærøyfjord',
    length: '18 km',
    unesco: true,
    highlight: 'Narrowest UNESCO fjord in Europe — 250m at its tightest. Electric ferries now run year-round.',
    access: 'From Flåm or Gudvangen. Combine with the Flåm Railway for Norway\'s best day trip.',
  },
  {
    name: 'Hardangerfjord',
    length: '179 km',
    unesco: false,
    highlight: 'Norway\'s second longest. Surrounded by apple orchards that bloom pink in May.',
    access: 'RV7 from Bergen (2h). Øvre Eidfjord is the gateway to Hardangervidda plateau.',
  },
  {
    name: 'Sognefjord',
    length: '205 km',
    unesco: false,
    highlight: 'Norway\'s longest and deepest fjord — 1,308m. The Flåm arm is the postcard version.',
    access: 'Bergen to Flåm by train + ferry. The Nærøyfjord branch is UNESCO-protected.',
  },
];

const operators = [
  { name: 'Hurtigruten', route: 'Full coastal route', emission: 'Hybrid-electric', commission: 'Trade portal' },
  { name: 'Havila Voyages', route: 'Bergen–Kirkenes', emission: 'LNG + battery', commission: 'Agency form' },
  { name: 'Fjord Tours', route: 'Norway in a Nutshell', emission: 'Electric ferries', commission: 'GetYourGuide 7%' },
];

export default function FjordsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src={heroImage}
          alt="Norwegian fjord — steep cliffs and calm blue water"
          fill
          className="object-cover opacity-50"
          priority
          placeholder="blur"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/80" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-48">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5CBFEE]/20 text-[#5CBFEE] text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Destination Guide
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Norwegian Fjords
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            Two of Norway's fjords are UNESCO World Heritage sites. All of them are free to enter. The only cost is getting there — and we'll show you how to do it without a cruise ship crowd.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#5CBFEE]" /> Western Norway</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#00CC6A]" /> Year-round — peak May–Sep</span>
          </div>
        </div>
      </section>

      {/* Fjords list */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">The main fjords</h2>
          <p className="text-slate-600 mb-12 max-w-2xl">Norway has over 1,700 named fjords. These four are where most travellers should start.</p>
          <div className="grid lg:grid-cols-2 gap-6">
            {fjords.map((f) => (
              <div key={f.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-xl text-slate-900">{f.name}</h3>
                  <div className="flex gap-2">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{f.length}</span>
                    {f.unesco && <span className="text-xs bg-[#00CC6A]/10 text-[#00CC6A] font-bold px-2 py-1 rounded-full">UNESCO</span>}
                  </div>
                </div>
                <p className="text-slate-600 text-sm mb-3 leading-relaxed">{f.highlight}</p>
                <p className="text-[#1B3A5C] text-sm font-medium">📍 {f.access}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zero-emission operators */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Zero-emission cruise operators</h2>
          <p className="text-slate-600 mb-10 max-w-2xl">Norway mandates zero-emission fjord cruises from 2026. These operators are already there.</p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {operators.map((op) => (
              <div key={op.name} className="border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-1">{op.name}</h3>
                <p className="text-sm text-slate-500 mb-2">{op.route}</p>
                <span className="inline-block text-xs bg-[#00CC6A]/10 text-[#00CC6A] font-medium px-2 py-1 rounded-full mb-3">{op.emission}</span>
                <p className="text-xs text-slate-400">Affiliate: {op.commission}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400">All operator links on NorgeTravel include rel="sponsored" disclosure per FTC and EU guidelines.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Book a fjord cruise</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Electric ferries, hybrid ships, and day-trip packages — all with zero-emission certification.</p>
          <Link href="/tjenester/fjord-cruises" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-full hover:shadow-lg transition-all">
            View Fjord Cruises <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
