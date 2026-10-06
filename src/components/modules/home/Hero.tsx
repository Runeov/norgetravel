'use client';

import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useTripMap } from '@/context/TripMapContext';
import { SEASON_HERO, type SiteSeason } from '@/lib/season';

export default function Hero({ dict, season = 'summer' }: { dict?: any; season?: SiteSeason }) {
  // Fallback to hardcoded English if dict is undefined (for testing/safety)
  const d = dict || {
    heroTitle: "Norge Travel & Adventures",
    heroSubtitle: "Sustainable Arctic adventures hand-picked for the modern explorer. Midnight sun kayaking, zero-emission fjord cruises, glacier hikes, and remote wilderness stays. All in one place.",
    exploreFjords: "Explore Fjords",
    tripPlanner: "Trip Planner"
  };
  const { openMap } = useTripMap();
  const hero = SEASON_HERO[season];
  const seasonal = d.seasons?.[season] ?? {};

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
    <section className="relative overflow-hidden h-screen flex items-center bg-slate-900 text-white -mt-20 pt-20">
      <Image
        src={hero.image}
        alt={hero.alt}
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
            {d.heroTitle}
          </h1>

          {/* Body */}
          <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
            {seasonal.heroSubtitle ?? d.heroSubtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link
              href={hero.ctaHref}
              className="inline-flex items-center justify-center rounded-full text-base font-medium transition-all focus-visible:outline-none bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white hover:shadow-lg hover:shadow-[#00CC6A]/30 hover:-translate-y-0.5 h-12 px-8"
            >
              {seasonal.primaryCta ?? d.exploreFjords}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <button
              onClick={openMap}
              className="inline-flex items-center justify-center rounded-full text-base font-medium transition-all focus-visible:outline-none border border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 h-12 px-8"
            >
              {d.tripPlanner}
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
              <span>{seasonal.seasonBadge ?? 'Midnight Sun Season (Jun–Aug)'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#00CC6A]" aria-hidden="true" />
              <span>Norge 2026: 7.2M Record Arrivals</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
