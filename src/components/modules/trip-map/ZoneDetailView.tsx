'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  PawPrint,
  Sun,
  Bird,
  Calendar,
  Music,
  UtensilsCrossed,
  Building2,
  Landmark,
  Church,
  Palette,
} from 'lucide-react';
import type { ZoneDetailData } from '@/data/zone-subcategories';

interface ZoneDetailViewProps {
  data: ZoneDetailData;
  onBack: () => void;
  allZones?: ZoneDetailData[];
  onSwitchZone?: (zoneId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  'northern-lights': Sparkles,
  'dog-sledding': PawPrint,
  'midnight-sun': Sun,
  'arctic-wildlife': Bird,
  'festivals-markets': Music,
  'northern-lights-season': Sparkles,
  'midnight-sun-events': Sun,
  'food-drink-events': UtensilsCrossed,
  'oslo': Building2,
  'bergen': Landmark,
  'trondheim': Church,
  'stavanger': Palette,
};

const zoneIconMap: Record<string, React.ElementType> = {
  'northern-norway': Sparkles,
  'events': Calendar,
  'cities': Building2,
};

// Placeholder gradient backgrounds for each bullet card
const bulletGradients = [
  'from-emerald-800/60 to-emerald-950/80',
  'from-sky-800/60 to-sky-950/80',
  'from-amber-800/60 to-amber-950/80',
  'from-cyan-800/60 to-cyan-950/80',
];

export function ZoneDetailView({ data, onBack, allZones, onSwitchZone }: ZoneDetailViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const currentIndex = allZones?.findIndex((z) => z.zoneId === data.zoneId) ?? -1;
  const prevZone = allZones && currentIndex > 0 ? allZones[currentIndex - 1] : null;
  const nextZone = allZones && currentIndex < (allZones.length - 1) ? allZones[currentIndex + 1] : null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="shrink-0 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
            aria-label="Return to map view"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to map</span>
          </button>

          {/* Zone navigation pills */}
          {allZones && allZones.length > 1 && onSwitchZone && (
            <div className="hidden sm:flex items-center gap-1.5">
              {allZones.map((zone) => {
                const isActive = zone.zoneId === data.zoneId;
                const ZoneIcon = zoneIconMap[zone.zoneId] || Calendar;
                return (
                  <button
                    key={zone.zoneId}
                    onClick={() => {
                      if (!isActive) {
                        setActiveTab(0);
                        onSwitchZone(zone.zoneId);
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-white/15 text-white border border-white/20'
                        : 'bg-white/5 text-white/40 border border-transparent hover:bg-white/10 hover:text-white/70'
                    }`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <ZoneIcon className="w-3 h-3" aria-hidden="true" />
                    {zone.zoneName}
                  </button>
                );
              })}
            </div>
          )}
        </div>

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
                        <div className="p-4 pl-6 pt-2 pb-5 my-1 border-l border-white/10 ml-5">
                          <p className="text-white/60 text-sm leading-relaxed mb-4">
                            {sub.content}
                          </p>
                          {/* Mobile CTA image cards */}
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {sub.bullets.map((bullet, i) => (
                              <button
                                key={i}
                                onClick={() => router.push(sub.link)}
                                className="group/card relative rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all text-left"
                              >
                                <div className={`h-16 w-full bg-gradient-to-br ${bulletGradients[i % bulletGradients.length]}`} />
                                <div className="p-2.5">
                                  <p className="text-white/80 text-xs font-medium leading-snug line-clamp-2">{bullet}</p>
                                  <ArrowRight
                                    className="w-3 h-3 mt-1.5 transition-transform group-hover/card:translate-x-0.5"
                                    style={{ color: data.zoneColor }}
                                    aria-hidden="true"
                                  />
                                </div>
                              </button>
                            ))}
                          </div>
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

          {/* Mobile zone navigation */}
          {allZones && allZones.length > 1 && onSwitchZone && (
            <div className="sm:hidden flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
              {allZones.map((zone) => {
                const isActive = zone.zoneId === data.zoneId;
                const ZoneIcon = zoneIconMap[zone.zoneId] || Calendar;
                return (
                  <button
                    key={zone.zoneId}
                    onClick={() => {
                      if (!isActive) {
                        setActiveTab(0);
                        onSwitchZone(zone.zoneId);
                      }
                    }}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'bg-white/5 text-white/40'
                    }`}
                  >
                    <ZoneIcon className="w-3.5 h-3.5" aria-hidden="true" />
                    {zone.zoneName}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Desktop content panel */}
        <div className="hidden lg:flex flex-1 bg-white/5 rounded-2xl border border-white/10 p-8 min-h-[420px] flex-col backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {data.subcategories[activeTab] && (
              <motion.div
                key={`${data.zoneId}-${activeTab}`}
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
                <p className="text-white/60 text-base leading-relaxed mb-6">
                  {data.subcategories[activeTab].content}
                </p>

                {/* 4 CTA image cards replacing bullet points */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {data.subcategories[activeTab].bullets.map((bullet, i) => (
                    <button
                      key={i}
                      onClick={() => router.push(data.subcategories[activeTab].link)}
                      className="group/card relative rounded-xl overflow-hidden border border-white/10 hover:border-white/25 hover:shadow-lg hover:shadow-black/20 transition-all duration-300 text-left"
                    >
                      {/* Placeholder image area */}
                      <div className={`relative h-24 w-full bg-gradient-to-br ${bulletGradients[i % bulletGradients.length]}`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        {/* Placeholder label */}
                        <span className="absolute top-2 right-2 text-[10px] text-white/30 font-medium uppercase tracking-wider">
                          Image
                        </span>
                      </div>
                      {/* Text + CTA */}
                      <div className="p-3">
                        <p className="text-white/80 text-sm font-medium leading-snug line-clamp-2 mb-2">
                          {bullet}
                        </p>
                        <span
                          className="inline-flex items-center gap-1 text-xs font-bold transition-all group-hover/card:gap-1.5"
                          style={{ color: data.zoneColor }}
                        >
                          Learn more
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/card:translate-x-0.5" aria-hidden="true" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Main CTA + zone navigation */}
                <div className="mt-auto pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => router.push(data.subcategories[activeTab].link)}
                      className="inline-flex items-center gap-2 font-bold text-sm hover:gap-3 transition-all group"
                      style={{ color: data.zoneColor }}
                    >
                      {data.subcategories[activeTab].linkText}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </button>

                    {allZones && allZones.length > 1 && onSwitchZone && (
                      <div className="flex items-center gap-2">
                        {prevZone && (
                          <button
                            onClick={() => {
                              setActiveTab(0);
                              onSwitchZone(prevZone.zoneId);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 text-xs font-medium transition-all"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                            {prevZone.zoneName}
                          </button>
                        )}
                        {nextZone && (
                          <button
                            onClick={() => {
                              setActiveTab(0);
                              onSwitchZone(nextZone.zoneId);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 text-xs font-medium transition-all"
                          >
                            {nextZone.zoneName}
                            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
