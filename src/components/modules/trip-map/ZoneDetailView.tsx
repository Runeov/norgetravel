'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Sparkles, PawPrint, Sun, Bird } from 'lucide-react';
import type { ZoneDetailData } from '@/data/zone-subcategories';

interface ZoneDetailViewProps {
  data: ZoneDetailData;
  onBack: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  'northern-lights': Sparkles,
  'dog-sledding': PawPrint,
  'midnight-sun': Sun,
  'arctic-wildlife': Bird,
};

export function ZoneDetailView({ data, onBack }: ZoneDetailViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-4"
          aria-label="Return to map view"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to map</span>
        </button>
        <h2 className="text-2xl lg:text-3xl font-bold text-white">
          {data.headline}
        </h2>
        <p className="text-white/50 text-sm mt-1">
          {data.subtitle}
        </p>
      </div>

      {/* Tab layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 overflow-y-auto lg:overflow-visible">

        {/* Left: Tab buttons */}
        <div className="lg:w-[280px] shrink-0 flex flex-col gap-2">
          {data.subcategories.map((sub, index) => {
            const isActive = activeTab === index;
            const Icon = iconMap[sub.id] || Sparkles;

            return (
              <div key={sub.id} className="flex flex-col">
                <button
                  onClick={() => setActiveTab(index)}
                  aria-expanded={isActive}
                  aria-controls={`zone-tab-${sub.id}`}
                  className={`group flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 w-full border ${
                    isActive
                      ? 'bg-white/10 border-white/20'
                      : 'bg-white/5 border-transparent hover:bg-white/8 hover:border-white/10'
                  }`}
                >
                  <div
                    className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      isActive ? 'bg-white/15' : 'bg-white/5 group-hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-white/80" aria-hidden="true" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-bold text-sm transition-colors truncate ${
                        isActive ? 'text-white' : 'text-white/70'
                      }`}
                    >
                      {sub.title}
                    </h3>
                    <p className="text-xs text-white/40 hidden sm:block truncate">
                      {sub.shortDesc}
                    </p>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isActive
                        ? 'text-white/60 rotate-90 lg:rotate-0 lg:translate-x-0.5'
                        : 'text-white/20'
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* Mobile accordion content */}
                <div className="lg:hidden">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        id={`zone-tab-${sub.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pl-16 pt-2 pb-5 ml-5 my-1 border-l border-white/10">
                          <p className="text-white/60 text-sm leading-relaxed mb-4">
                            {sub.content}
                          </p>
                          <ul className="space-y-2 mb-4">
                            {sub.bullets.map((bullet, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                                <CheckCircle2
                                  className="w-4 h-4 mt-0.5 shrink-0"
                                  style={{ color: data.zoneColor }}
                                  aria-hidden="true"
                                />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                          <button
                            onClick={() => router.push(sub.link)}
                            className="font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                            style={{ color: data.zoneColor }}
                          >
                            {sub.linkText}
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Desktop content panel */}
        <div className="hidden lg:flex flex-1 bg-white/5 rounded-2xl border border-white/10 p-8 min-h-[420px] flex-col backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {data.subcategories[activeTab] && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col h-full"
                role="tabpanel"
              >
                {/* Tab header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${data.zoneColor}20` }}
                  >
                    {(() => {
                      const Icon = iconMap[data.subcategories[activeTab].id] || Sparkles;
                      return <Icon className="w-6 h-6" style={{ color: data.zoneColor }} aria-hidden="true" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {data.subcategories[activeTab].title}
                    </h3>
                    <div
                      className="h-1 w-10 mt-2 rounded-full"
                      style={{ backgroundColor: data.zoneColor }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/60 text-base leading-relaxed mb-8">
                  {data.subcategories[activeTab].content}
                </p>

                {/* Bullets grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {data.subcategories[activeTab].bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-5 h-5 shrink-0 mt-0.5"
                        style={{ color: data.zoneColor }}
                        aria-hidden="true"
                      />
                      <span className="text-white/80 font-medium text-sm">{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto pt-6 border-t border-white/10">
                  <button
                    onClick={() => router.push(data.subcategories[activeTab].link)}
                    className="inline-flex items-center gap-2 font-bold text-sm hover:gap-3 transition-all group"
                    style={{ color: data.zoneColor }}
                  >
                    {data.subcategories[activeTab].linkText}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
