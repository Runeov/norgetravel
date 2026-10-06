'use client';

import { Mountain, Compass, Flame } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { HomeCopy } from '@/i18n/home-copy';

// Text per locale comes from HOME_COPY (src/i18n/home-copy.ts)
const pillars = [
  { id: 'grit', icon: Mountain, color: '#1A365D', author: 'Marte Åsheim' },
  { id: 'compass', icon: Compass, color: '#1A365D', author: 'Ingrid Solheim' },
  { id: 'hearth', icon: Flame, color: '#00D084', author: 'Lars Erik Nordvik' },
] as const;

export default function EditorialPromise({ copy }: { copy: HomeCopy['editorial'] }) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion
    ? { initial: {}, animate: {} }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-4">
            {copy.heading}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {copy.intro}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const text = copy.pillars[pillar.id];
            return (
              <motion.div
                key={pillar.id}
                {...variants}
                transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                viewport={{ once: true, margin: '-50px' }}
                whileInView={variants.animate}
                initial={variants.initial}
                className="bg-slate-50 rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-md mb-5"
                  style={{ backgroundColor: `${pillar.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: pillar.color }} aria-hidden="true" />
                </div>
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color: pillar.color }}
                >
                  {text.label}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{text.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{text.body}</p>

                {/* Quote */}
                <blockquote className="border-l-2 border-slate-300 pl-4 mt-auto">
                  <p className="text-sm text-slate-700 italic mb-2">&ldquo;{text.quote}&rdquo;</p>
                  <cite className="text-xs text-slate-500 not-italic font-medium">
                    {pillar.author}, {text.authorRole}
                  </cite>
                </blockquote>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
