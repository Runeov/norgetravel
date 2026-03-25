'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceCTAProps {
  title: string;
  description: string;
  primaryCTA: {
    text: string;
    link: string;
  };
  secondaryCTA?: {
    text: string;
    link: string;
  };
}

export function ServiceCTA({
  title,
  description,
  primaryCTA,
  secondaryCTA
}: ServiceCTAProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-3xl p-12 text-center">
          
          {/* Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          
          {/* Description */}
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
            {/* Primary CTA */}
            <Link
              href={primaryCTA.link}
              className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium text-[#E86C1F] bg-white rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 focus:outline-none"
            >
              {primaryCTA.text}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            
            {/* Secondary CTA */}
            {secondaryCTA && (
              <Link
                href={secondaryCTA.link}
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white border-2 border-white rounded-full hover:bg-white hover:text-[#E86C1F] transition-all duration-300 focus:outline-none"
              >
                {secondaryCTA.text}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
