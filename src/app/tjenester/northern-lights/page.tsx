import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import heroImage from '@/assets/karasjok_Over.avif';

export const metadata: Metadata = {
  title: 'Northern Lights Tours Tromsø 2026 | NorgeTravel',
  description: 'The best Northern Lights tours in Tromsø for Solar Cycle 25 — private chases, guided photography, dog sled aurora, and Hurtigruten\'s guarantee. Prices and commission disclosed.',
};

const operators = [
  {
    name: 'GetYourGuide — Tromsø Aurora',
    type: 'Group & private tours',
    priceFrom: '€89/person',
    commission: '7%',
    highlight: 'Largest selection of vetted guides. Cancellation if no lights.',
    rel: 'noopener noreferrer sponsored',
  },
  {
    name: 'Viator — Northern Lights Chase',
    type: 'Group tours',
    priceFrom: '€79/person',
    commission: '8–10%',
    highlight: 'Best price for group bookings. Mobile tickets. 24/7 support.',
    rel: 'noopener noreferrer sponsored',
  },
  {
    name: 'Local Private Guides',
    type: 'Private (2–8 people)',
    priceFrom: '€400/group',
    commission: '€40+ flat',
    highlight: 'Maximum flexibility. Guide chooses the location based on real-time forecast.',
    rel: 'noopener noreferrer sponsored',
  },
];

const tips = [
  { title: 'Book October–March', body: 'Polar night = dark skies 24/7. September and April have short dark windows — not ideal for chases.' },
  { title: 'Check Kp index daily', body: 'Space Weather Center posts 3-day forecasts. Kp ≥ 3 is visible from Tromsø. Kp ≥ 5 (G1 storm) puts the aurora overhead.' },
  { title: 'Private tour vs group', body: 'A private guide for 4 people costs ~€100/person and can drive 300+ km in a night. Group tours are fixed-route — fine if skies are clear.' },
  { title: 'Hurtigruten guarantee', body: 'If you cruise Tromsø–Kirkenes and see no Northern Lights, Hurtigruten offers a free 6-day cruise. One of the safest bets in aurora tourism.' },
];

export default function NorthernLightsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src={heroImage}
          alt="Northern Lights aurora borealis over Tromsø Norway"
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
            <span className="w-2 h-2 rounded-full bg-[#00CC6A] animate-pulse" />
            Solar Cycle 25 — Peak Activity 2026
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 max-w-3xl">
            Northern Lights Tours
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            Solar Cycle 25 hit its predicted peak in 2025 and remains highly active through 2026. This is statistically the best aurora decade since records began. Tromsø is your base.
          </p>
          <div className="flex gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#00CC6A]" fill="currentColor" /> From €79/person</span>
            <span className="flex items-center gap-2">🌌 Oct–Mar peak season</span>
          </div>
        </div>
      </section>

      {/* Operators */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Recommended operators</h2>
          <p className="text-slate-500 text-sm mb-10">
            Affiliate disclosure: NorgeTravel earns a commission when you book via our links. This doesn't change your price. Operators are selected independently.
          </p>
          <div className="grid lg:grid-cols-3 gap-6">
            {operators.map((op) => (
              <div key={op.name} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 flex flex-col">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 mb-1">{op.name}</h3>
                  <p className="text-sm text-slate-500 mb-3">{op.type}</p>
                  <p className="text-2xl font-bold text-[#1B3A5C] mb-4">{op.priceFrom}</p>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{op.highlight}</p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-400 mb-3">Commission: {op.commission}</p>
                  <a
                    href="#"
                    rel={op.rel}
                    className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-full hover:shadow-lg hover:shadow-[#1B3A5C]/30 hover:-translate-y-0.5 transition-all"
                  >
                    Check availability <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">How to maximise your chances</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
            {tips.map((t) => (
              <div key={t.title} className="border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">{t.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destination CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start with the destination guide</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Not sure which region to base yourself in? Read our Northern Norway and Svalbard guides first.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/destinations/northern-norway" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-full hover:shadow-lg transition-all">
              Northern Norway Guide <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/destinations/svalbard" className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm">
              Svalbard at 78°N
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
