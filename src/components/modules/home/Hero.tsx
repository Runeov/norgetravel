'use client';

import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Hero() {

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
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background image */}
      <Image
        src="/landing.png"
        alt="Arctic Norway — Northern Lights over a Norwegian fjord landscape"
        fill
        className="object-cover"
        priority
        sizes="100vw"
        quality={90}
      />

      {/* Gradient overlay — dark left, transparent right */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1B3A5C]/85 via-[#1B3A5C]/55 to-transparent z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-20">
        <div className="max-w-2xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00CC6A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00CC6A]"></span>
            </span>
            2026–27 Aurora Season — Last Peak Before 2031
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Discover{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5CBFEE] to-[#00CC6A]">
              Arctic Norway
            </span>
          </h1>

          {/* Body */}
          <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed">
            Sustainable Arctic adventures hand-picked for the modern explorer. Northern Lights tours, zero-emission fjord cruises, and remote wilderness stays — all in one place.
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
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center justify-center rounded-full text-base font-medium transition-all focus-visible:outline-none border border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 h-12 px-8"
            >
              Plan Your Trip
            </button>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00CC6A]" aria-hidden="true" />
              <span>Zero-Emission Partners</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00CC6A]" aria-hidden="true" />
              <span>Peak Aurora Season</span>
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
