'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const experts = [
  {
    id: 'ingrid-solheim',
    name: 'Ingrid Solheim',
    role: 'Fjord Logistics Editor',
    zone: 'Fjord Norway',
    basecamp: 'Bergen',
    image: '/pics/team/ingrid_profile.png',
    color: '#0E7490',
    quote: 'You cannot see Sognefjord and Hardangerfjord properly in the same day. Choose one.',
  },
  {
    id: 'bjorn-haugen',
    name: 'Bjørn Haugen',
    role: 'Arctic Field Editor',
    zone: 'The Arctic',
    basecamp: 'Tromsø',
    image: '/pics/team/bjorn_profile.png',
    color: '#6D28D9',
    quote: 'The Northern Lights are not a guaranteed show. Book three nights minimum.',
  },
  {
    id: 'marte-asheim',
    name: 'Marte Åsheim',
    role: 'Mountain Safety Editor',
    zone: 'The High Peaks',
    basecamp: 'Lom',
    image: '/pics/team/Marthe_profile.png',
    color: '#78716C',
    quote: 'The mountain doesn\'t care that you drove four hours to get here. Turn back if the weather says turn back.',
  },
  {
    id: 'silje-nygard',
    name: 'Silje Nygård',
    role: 'Urban Culture Editor',
    zone: 'Urban Hubs',
    basecamp: 'Trondheim',
    image: '/pics/team/Silje_profile.png',
    color: '#334155',
    quote: 'The restaurant review you read was written by someone who visited once, on a press trip, two years ago.',
  },
  {
    id: 'lars-erik-nordvik',
    name: 'Lars Erik Nordvik',
    role: 'Coastal Culture Editor',
    zone: 'Working Coast',
    basecamp: 'Svolvær',
    image: '/pics/team/Lars_profile.png',
    color: '#B45309',
    quote: 'Lofoten in August has 800,000 visitors and 24,000 residents. Plan accordingly.',
  },
];

export default function ZoneExperts() {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion
    ? { initial: {}, animate: {} }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-4">
            Five zones. Five locals.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Every guide on NorgeTravel is written by someone who lives in the zone they cover. Not a content agency in London. Not a freelancer who visited once. The person who grew up there.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {experts.map((expert, i) => (
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
                    alt={`${expert.name}, ${expert.role} at NorgeTravel`}
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
                    {expert.zone}
                  </span>

                  {/* Name on image */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-sm font-bold text-white leading-tight">{expert.name}</h3>
                    <p className="text-[11px] text-white/70 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-2.5 h-2.5" aria-hidden="true" />
                      {expert.basecamp}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="p-3">
                  <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-3">
                    &ldquo;{expert.quote}&rdquo;
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/om-oss"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A365D] hover:text-[#00D084] transition-colors min-h-[44px]"
          >
            Read the full team bios
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
