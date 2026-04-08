'use client';

import { Mountain, Compass, Flame } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const pillars = [
  {
    id: 'grit',
    label: 'THE GRIT',
    title: 'Reality over fantasy',
    icon: Mountain,
    color: '#1A365D',
    quote: 'Trolltunga is a 12-hour trek in sideways rain. If you are not prepared, do not start.',
    author: 'Marte Åsheim',
    authorRole: 'Mountain Safety Editor, Lom',
    body: 'Norway is demanding. We tell you the DNT trail grade, the elevation gain in metres, and the weather reality before you lace up. If a trail is dangerous, we say it. If a route takes 6 hours, not the 4 hours Google Maps claims, we give you the 6-hour number.',
  },
  {
    id: 'compass',
    label: 'THE COMPASS',
    title: 'Logistics that actually work',
    icon: Compass,
    color: '#1A365D',
    quote: 'Google Maps has never waited in a Gudvangen ferry queue. I have. Here is the actual timing.',
    author: 'Ingrid Solheim',
    authorRole: 'Fjord Logistics Editor, Bergen',
    body: 'The Bodø to Moskenes ferry crosses the Vestfjord in two hours. In winter, you feel every kilometre. We cover AutoPASS, ferry timetables, seasonal road closures, and the toll fees nobody mentions. No guessing. Exact numbers.',
  },
  {
    id: 'hearth',
    label: 'THE HEARTH',
    title: 'The reward at the end of the route',
    icon: Flame,
    color: '#00D084',
    quote: 'A rorbu smells of salt and old wood. This is not a negative.',
    author: 'Lars Erik Nordvik',
    authorRole: 'Coastal Culture Editor, Svolvær',
    body: 'After six hours in the sleet, peeling off wet wool by an iron stove in an old bakery is the true definition of koselig. We connect you to the working coast, the fishing villages, the Sami communities, and the producers who make Norway worth the effort.',
  },
];

export default function EditorialPromise() {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion
    ? { initial: {}, animate: {} }
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-4">
            How we work
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Three editorial pillars. One rule: tell the traveller what they need to know, not what they want to hear. Every guide on this site was written by someone who lives in the zone they cover.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
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
                  {pillar.label}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">{pillar.body}</p>

                {/* Quote */}
                <blockquote className="border-l-2 border-slate-300 pl-4 mt-auto">
                  <p className="text-sm text-slate-700 italic mb-2">&ldquo;{pillar.quote}&rdquo;</p>
                  <cite className="text-xs text-slate-500 not-italic font-medium">
                    {pillar.author}, {pillar.authorRole}
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
