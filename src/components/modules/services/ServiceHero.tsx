'use client';

import Image, { StaticImageData } from 'next/image';
import { ArrowRight } from 'lucide-react';
import { AverdiBackground } from '@/components/modules/AverdiBackground';

interface ServiceHeroProps {
  title: string;
  subtitle: string;
  description: string;
  stats?: { value: string; label: string };
  ctaText?: string;
  ctaLink?: string;
  heroImage?: StaticImageData;
  heroImageAlt?: string;
}

export function ServiceHero({
  title,
  subtitle,
  description,
  stats,
  ctaText = "Kontakt oss",
  ctaLink = "#contact",
  heroImage,
  heroImageAlt = ""
}: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background hero image */}
      {heroImage && (
        <>
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            priority
            className="object-cover object-center z-0"
            sizes="100vw"
          />
          {/* Dark overlay so text stays readable */}
          <div className="absolute inset-0 bg-black/50 z-[1]" />
        </>
      )}

      {!heroImage && <AverdiBackground />}

      <div className={`max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10 py-24 md:py-32`}>
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Stats Badge */}
          {stats && (
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 ${
              heroImage
                ? 'bg-white/20 text-white backdrop-blur-sm'
                : 'bg-[#E86C1F]/10 text-[#E86C1F]'
            }`}>
              {stats.value} {stats.label}
            </div>
          )}
          
          {/* Title */}
          <h1 className={`text-4xl md:text-6xl font-bold tracking-tight mb-6 ${heroImage ? 'text-white' : 'text-slate-900'}`}>
            {title}
          </h1>
          
          {/* Subtitle */}
          <p className={`text-2xl md:text-3xl font-semibold mb-6 ${heroImage ? 'text-white/90' : 'text-slate-700'}`}>
            {subtitle}
          </p>
          
          {/* Description */}
          <p className={`text-lg leading-relaxed mb-8 ${heroImage ? 'text-white/80' : 'text-slate-600'}`}>
            {description}
          </p>
          
          {/* CTA Button */}
          <a
            href={ctaLink}
            className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-full hover:shadow-lg hover:shadow-[#E86C1F]/30 hover:-translate-y-0.5 focus:outline-none"
          >
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
