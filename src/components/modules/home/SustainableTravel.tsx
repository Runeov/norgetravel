'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Ship, Mountain, Fish, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { NorgeBackground } from '@/components/modules/NorgeBackground';

const commitments = [
  {
    icon: Ship,
    title: 'Zero-emission fjord cruising',
    body: 'From January 2026, all vessels entering Geirangerfjord and Nærøyfjord must meet zero-emission standards. Our partners Hurtigruten and Havila Voyages exceed that bar. Havila runs on 4-hour battery sailing through the UNESCO fjords. We verify compliance before we recommend any operator.',
    author: 'Ingrid Solheim',
    stat: 'Zero emissions',
    statLabel: 'UNESCO fjords, 2026',
  },
  {
    icon: Mountain,
    title: 'Protecting the trails',
    body: 'Reinebringen in Lofoten had its trail rebuilt by Nepalese sherpas to control erosion from overtourism. Besseggen sees 60,000 hikers per summer. We grade every route honestly using DNT standards and surface alternatives to overloaded trails. The Fjellvettreglene is not optional guidance. It is the rule.',
    author: 'Marte Åsheim',
    stat: '22,000 km',
    statLabel: 'DNT marked trails',
  },
  {
    icon: Fish,
    title: 'Supporting the working coast',
    body: 'Lofoten had 800,000 visitors and 24,000 residents in a single summer. We steer travellers to buy stockfish from the producer, not the souvenir shop. We explain rorbu etiquette. We direct spending to the communities that have fished these waters for a thousand years, not the tourist-trap chains.',
    author: 'Lars Erik Nordvik',
    stat: '1,000 years',
    statLabel: 'Lofoten fishing culture',
  },
  {
    icon: Leaf,
    title: 'Eco-certified operators only',
    body: 'NorgeTravel is a certified Eco-Lighthouse (Miljøfyrtårn) business. We prioritise accommodation and tour operators with verified sustainability credentials. When a partner has a mixed record, we note it. Sustainability is a genuine commitment here, not a marketing badge.',
    author: 'Bjørn Haugen',
    stat: 'Miljøfyrtårn',
    statLabel: 'Eco-Lighthouse certified',
  },
];

export default function SustainableTravel() {
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
            Sustainable Arctic travel
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            We don&apos;t promote overtourism.{' '}
            <span className="text-[#00D084]">We prevent it.</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Norway is not a theme park. Our editorial team lives in these places. We protect what we write about because we answer to the communities, not to booking volumes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {commitments.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
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
                    <h3 className="font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">{item.body}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/40 font-medium">{item.author}</span>
                      <div className="text-right">
                        <span className="text-[#00D084] text-sm font-bold">{item.stat}</span>
                        <span className="text-white/40 text-xs block">{item.statLabel}</span>
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
            Meet the team
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
