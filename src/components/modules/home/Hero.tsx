'use client';

import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import heroImage from '@/assets/karasjok_Over.avif';

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
    <section className="relative overflow-hidden bg-slate-50 pt-8 pb-12 lg:pt-20 lg:pb-32">
      <NorgeBackground />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Text Content */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3A5C]/10 text-[#1B3A5C] text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00CC6A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00CC6A]"></span>
              </span>
              Solar Maximum 2026 — Peak Aurora Season
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
              Discover{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A]">
                Arctic Norway
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 mb-8 leading-relaxed">
              Sustainable Arctic adventures hand-picked for the modern explorer. Northern Lights tours, zero-emission fjord cruises, and remote wilderness stays — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 lg:mb-10">
              <button
                onClick={() => scrollToSection('services')}
                className="inline-flex items-center justify-center rounded-full text-base font-medium transition-all focus-visible:outline-none bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white hover:shadow-lg hover:shadow-[#1B3A5C]/30 hover:-translate-y-0.5 h-12 px-8"
              >
                Explore Tours
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center rounded-full text-base font-medium transition-all focus-visible:outline-none border border-[#1B3A5C]/20 bg-white/50 backdrop-blur-sm hover:bg-white/80 hover:text-[#1B3A5C] h-12 px-8"
              >
                Plan Your Trip
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00CC6A]" aria-hidden="true" />
                <span>Zero-Emission Partners</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#00CC6A]" aria-hidden="true" />
                <span>Peak Aurora Season</span>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative order-2 flex items-center justify-center lg:h-full mt-8 lg:mt-0">
            <div className="relative w-full aspect-[4/3] lg:aspect-square max-w-[500px] lg:max-w-none group">
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-[#1B3A5C]/20 to-[#00CC6A]/20 rounded-full blur-2xl -z-10"></div>

              <Image
                src={heroImage}
                alt="Arctic Norway landscape — Northern Lights over the mountains"
                fill
                className="object-cover rounded-3xl shadow-2xl border-4 border-white/50"
                priority
                placeholder="blur"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-[#1B3A5C]/10 hidden sm:block animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <div className="flex items-center gap-3">
                  <div className="bg-[#1B3A5C]/10 p-2 rounded-lg text-[#1B3A5C]">
                    <span className="text-2xl">🌌</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Solar Cycle 25</p>
                    <p className="text-sm font-bold text-slate-900">Best aurora decade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
