'use client';

import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { Leaf, Ship, Mountain, Fish, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import type { HomeCopy } from '@/i18n/home-copy';

// Text per locale comes from HOME_COPY (src/i18n/home-copy.ts)
const commitments = [
  { id: 'cruising', icon: Ship, author: 'Ingrid Solheim' },
  { id: 'trails', icon: Mountain, author: 'Marte Åsheim' },
  { id: 'coast', icon: Fish, author: 'Lars Erik Nordvik' },
  { id: 'certified', icon: Leaf, author: 'Bjørn Haugen' },
] as const;

export default function SustainableTravel({ copy }: { copy: HomeCopy['sustainable'] }) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion
    ? { initial: {}, animate: {} }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#1A365D] text-white">
      <NorgeBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/10 text-white text-sm font-medium mb-4">
            <Leaf className="w-4 h-4 text-[#00D084]" aria-hidden="true" />
            {copy.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {copy.heading}{' '}
            <span className="text-[#00D084]">{copy.headingAccent}</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            {copy.intro}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {commitments.map((item, i) => {
            const Icon = item.icon;
            const text = copy.items[item.id];
            return (
              <motion.div
                key={item.id}
                {...variants}
                transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
                whileInView={variants.animate}
                initial={variants.initial}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 p-2.5 rounded-md bg-[#00D084]/15">
                    <Icon className="w-5 h-5 text-[#00D084]" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white mb-2">{text.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">{text.body}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40 font-medium">{item.author}</span>
                      <div className="text-right">
                        <span className="text-[#00D084] text-sm font-bold">{text.stat}</span>
                        <span className="text-white/40 text-xs block">{text.statLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            href="/om-oss"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00D084] text-[#1A365D] font-semibold rounded-md hover:bg-[#00B875] transition-colors min-h-[44px]"
          >
            {copy.cta}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
