import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import heroImage from '@/assets/Hero_Tjenester.avif';

export const metadata: Metadata = {
  title: 'Fjord Cruises Norway 2026 | Zero-Emission | NorgeTravel',
  description: 'Compare Norway\'s top fjord cruise operators — Hurtigruten, Havila Voyages, and electric day ferries. Zero-emission mandate 2026. Prices, routes, and commission disclosure.',
};

const operators = [
  {
    name: 'Hurtigruten',
    route: 'Bergen → Kirkenes (12 days) or segment bookings',
    emission: 'Hybrid-electric (MS Fridtjof Nansen & MS Roald Amundsen)',
    priceFrom: 'NOK 12,900/person (inside cabin)',
    aurora: 'Northern Lights Guarantee — free 6-day cruise if you see none',
    commission: 'Hurtigruten Trade Portal (affiliate on request)',
  },
  {
    name: 'Havila Voyages',
    route: 'Bergen → Kirkenes (round trip 11 days)',
    emission: 'LNG + 6.1 MWh battery bank — zero-emission in fjords',
    priceFrom: 'NOK 10,500/person (explorer cabin)',
    aurora: 'No guarantee, but 4 ships dedicate the top deck to aurora viewing',
    commission: 'Havila Agency Form',
  },
  {
    name: 'Fjord Tours (Norway in a Nutshell)',
    route: 'Oslo/Bergen ↔ Flåm ↔ Gudvangen (day trip)',
    emission: 'Electric Nærøyfjord ferries (zero-emission since 2022)',
    priceFrom: 'NOK 1,590/person',
    aurora: 'Day trip — not an aurora product',
    commission: 'GetYourGuide 7%',
  },
];

const comparison = [
  { feature: 'Duration', hurtigruten: '5–12 days', havila: '4–11 days', dayTrip: '1 day' },
  { feature: 'Aurora potential', hurtigruten: 'High (guarantee)', havila: 'High', dayTrip: 'None' },
  { feature: 'Ports', hurtigruten: '34 stops', havila: '34 stops', dayTrip: '3 stops' },
  { feature: 'Zero-emission fjords', hurtigruten: '✓ Hybrid', havila: '✓ Battery', dayTrip: '✓ Electric' },
  { feature: 'Budget/luxury', hurtigruten: 'Mid–luxury', havila: 'Mid–luxury', dayTrip: 'Budget' },
];

export default function FjordCruisesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src={heroImage}
          alt="Norwegian fjord cruise — ship sailing between steep cliffs"
          fill
          className="object-cover opacity-50"
          priority
          quality={75}
          placeholder="blur"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/85" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-48">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5CBFEE]/20 text-[#5CBFEE] text-sm font-medium mb-6">
            ⚡ Zero-Emission Mandate Active 2026
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 max-w-3xl">
            Fjord Cruises
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            Norway mandated zero-emission fjord cruising from January 2026. Hurtigruten and Havila Voyages were ready. Here's how to choose between them — and why a day trip on an electric ferry is a legitimate third option.
          </p>
          <p className="text-sm text-slate-400">From NOK 1,590 (day trip) to NOK 12,900+ (full coastal voyage)</p>
        </div>
      </section>

      {/* Operator cards */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Compare operators</h2>
          <p className="text-slate-500 text-sm mb-10">
            Affiliate disclosure: NorgeTravel earns a commission on bookings made through our links. Your price is unaffected. All operators selected on merit.
          </p>
          <div className="grid lg:grid-cols-3 gap-6">
            {operators.map((op) => (
              <div key={op.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 flex flex-col">
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-slate-900 mb-2">{op.name}</h3>
                  <p className="text-sm text-[#1B3A5C] font-medium mb-1">📍 {op.route}</p>
                  <p className="text-sm text-[#00CC6A] font-medium mb-3">⚡ {op.emission}</p>
                  <p className="text-2xl font-bold text-slate-900 mb-3">From {op.priceFrom}</p>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">🌌 {op.aurora}</p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400 mb-3">Via: {op.commission}</p>
                  <a
                    href="#"
                    rel="noopener noreferrer sponsored"
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-full hover:shadow-lg hover:shadow-[#1B3A5C]/30 hover:-translate-y-0.5 transition-all"
                  >
                    View sailings <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 overflow-x-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10">Side by side</h2>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#1B3A5C] text-white">
                <th className="text-left p-4 rounded-tl-xl">Feature</th>
                <th className="text-left p-4">Hurtigruten</th>
                <th className="text-left p-4">Havila</th>
                <th className="text-left p-4 rounded-tr-xl">Day Trip</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="p-4 font-medium text-slate-700">{row.feature}</td>
                  <td className="p-4 text-slate-600">{row.hurtigruten}</td>
                  <td className="p-4 text-slate-600">{row.havila}</td>
                  <td className="p-4 text-slate-600">{row.dayTrip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Read the fjords guide first</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Not sure which fjords to cruise? Our destination guide covers Geirangerfjord, Nærøyfjord, and Sognefjord with route-specific advice.</p>
          <Link href="/destinations/fjords" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-full hover:shadow-lg transition-all">
            Norwegian Fjords Guide <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
