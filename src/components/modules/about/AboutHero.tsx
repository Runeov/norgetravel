'use client';

import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { MapPin, Compass, Zap } from 'lucide-react';

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-20 pb-16 lg:pt-32 lg:pb-24">
      <NorgeBackground />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3A5C]/10 text-[#1B3A5C] text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00CC6A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00CC6A]"></span>
            </span>
            NorgeTravel.com
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            The honest guide to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A]">
              Arctic Norway
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            We don&apos;t sell fantasy. We prepare travellers for the magnificent, demanding reality of Norway — with honest logistics, expert local knowledge, and zero brochure-speak.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1B3A5C]/10 text-[#1B3A5C] mx-auto mb-4">
                <MapPin className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">4</div>
              <div className="text-sm text-slate-600">Destinations — Northern Norway, Lofoten, Fjords, Svalbard</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1B3A5C]/10 text-[#1B3A5C] mx-auto mb-4">
                <Compass className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">5</div>
              <div className="text-sm text-slate-600">Expert zones — Fjord, Arctic, Peaks, Coast, Urban</div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#00CC6A]/10 text-[#00CC6A] mx-auto mb-4">
                <Zap className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">2026–27</div>
              <div className="text-sm text-slate-600">Peak Aurora season — Solar Cycle 25 maximum</div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
