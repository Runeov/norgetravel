'use client';

import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTripMap } from '@/context/TripMapContext';

export default function Hero() {
  const { openMap } = useTripMap();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-slate-900 text-white">
      <Image
        src="/images/tromso/landscapes/midnight-sun-sommaroy_vegard-stien.jpg"
        alt="Midnight sun over Sommarøy islands and turquoise Arctic waters near Tromsø, Northern Norway"
        fill
        className="object-cover opacity-50"
        priority
        quality={75}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/80" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="max-w-2xl">

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Discover{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5CBFEE] to-[#00CC6A]">
              Arctic Norway
            </span>
          </h1>

          {/* Body */}
          <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
            Sustainable Arctic adventures hand-picked for the modern explorer. Midnight sun kayaking, zero-emission fjord cruises, glacier hikes, and remote wilderness stays. All in one place.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <button
              onClick={() => scrollToSection('services')}
              className="inline-flex items-center justify-center rounded-full text-base font-medium transition-all focus-visible:outline-none bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white hover:shadow-lg hover:shadow-[#00CC6A]/30 hover:-translate-y-0.5 h-12 px-8"
            >
              Explore Tours
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </button>
            <button
              onClick={openMap}
              className="inline-flex items-center justify-center rounded-full text-base font-medium transition-all focus-visible:outline-none border border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 h-12 px-8"
            >
              Trip Planner
            </button>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00CC6A]" aria-hidden="true" />
              <span>Zero-Emission Partners</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00CC6A]" aria-hidden="true" />
              <span>Midnight Sun Season (Jun–Aug)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00CC6A]" aria-hidden="true" />
              <span>Norway 2025: 7.2M Record Arrivals</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
