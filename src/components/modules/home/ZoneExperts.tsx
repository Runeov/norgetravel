'use client';

import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { HomeCopy } from '@/i18n/home-copy';

// Text per locale comes from HOME_COPY (src/i18n/home-copy.ts)
const experts = [
  { id: 'ingrid-solheim', name: 'Ingrid Solheim', image: '/pics/team/ingrid_profile.jpg', color: '#0E7490' },
  { id: 'bjorn-haugen', name: 'Bjørn Haugen', image: '/pics/team/bjorn_profile.jpg', color: '#6D28D9' },
  { id: 'marte-asheim', name: 'Marte Åsheim', image: '/pics/team/Marthe_profile.jpg', color: '#78716C' },
  { id: 'silje-nygard', name: 'Silje Nygård', image: '/pics/team/Silje_profile.jpg', color: '#334155' },
  { id: 'lars-erik-nordvik', name: 'Lars Erik Nordvik', image: '/pics/team/Lars_profile.jpg', color: '#B45309' },
] as const;

export default function ZoneExperts({ copy }: { copy: HomeCopy['experts'] }) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion
    ? { initial: {}, animate: {} }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-4">
            {copy.heading}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {copy.intro}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {experts.map((expert, i) => {
            const text = copy.people[expert.id];
            return (
            <motion.div
              key={expert.id}
              {...variants}
              transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
              viewport={{ once: true, margin: '-50px' }}
              whileInView={variants.animate}
              initial={variants.initial}
            >
              <Link
                href={`/om-oss/${expert.id}`}
                className="group block bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-md transition-all"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-slate-200">
                  <Image
                    src={expert.image}
                    alt={copy.alt.replace('{name}', expert.name).replace('{role}', text.role)}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Zone badge */}
                  <span
                    className="absolute top-3 left-3 inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wide text-white border-l-2"
                    style={{ borderColor: expert.color, backgroundColor: 'rgba(0,0,0,0.5)' }}
                  >
                    {text.zone}
                  </span>

                  {/* Name on image */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-sm font-bold text-white leading-tight">{expert.name}</h3>
                    <p className="text-[11px] text-white/70 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-2.5 h-2.5" aria-hidden="true" />
                      {text.basecamp}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="p-3">
                  <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-3">
                    &ldquo;{text.quote}&rdquo;
                  </p>
                </div>
              </Link>
            </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/om-oss"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A365D] hover:text-[#00D084] transition-colors min-h-[44px]"
          >
            {copy.cta}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
