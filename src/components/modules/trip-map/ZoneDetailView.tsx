'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  Snowflake,
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
  // Northern Norway
  'northern-lights': Sparkles,
  'dog-sledding': PawPrint,
  'midnight-sun': Sun,
  'arctic-wildlife': Bird,
  // Events
  'festivals-markets': Music,
  'northern-lights-season': Sparkles,
  'midnight-sun-events': Sun,
  'food-drink-events': UtensilsCrossed,
  // Cities
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

// Gradient fallbacks when no image is available
const gradientMap: Record<string, string> = {
  'northern-lights': 'from-emerald-900/80 via-teal-900/70 to-slate-900/90',
  'dog-sledding': 'from-sky-900/80 via-slate-800/70 to-slate-900/90',
  'midnight-sun': 'from-amber-900/80 via-orange-900/70 to-slate-900/90',
  'arctic-wildlife': 'from-cyan-900/80 via-blue-900/70 to-slate-900/90',
  'festivals-markets': 'from-purple-900/80 via-indigo-900/70 to-slate-900/90',
  'northern-lights-season': 'from-emerald-900/80 via-teal-900/70 to-slate-900/90',
  'midnight-sun-events': 'from-amber-900/80 via-orange-900/70 to-slate-900/90',
  'food-drink-events': 'from-red-900/80 via-rose-900/70 to-slate-900/90',
  'oslo': 'from-slate-800/80 via-gray-900/70 to-slate-900/90',
  'bergen': 'from-blue-900/80 via-slate-800/70 to-slate-900/90',
  'trondheim': 'from-indigo-900/80 via-slate-800/70 to-slate-900/90',
  'stavanger': 'from-teal-900/80 via-slate-800/70 to-slate-900/90',
};

export function ZoneDetailView({ data, onBack, allZones, onSwitchZone }: ZoneDetailViewProps) {
  const router = useRouter();

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
                      if (!isActive) onSwitchZone(zone.zoneId);
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

      {/* Cards grid */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {data.subcategories.map((sub, index) => {
            const Icon = iconMap[sub.id] || Sparkles;
            const gradient = gradientMap[sub.id] || 'from-slate-800/80 via-slate-900/70 to-slate-900/90';

            return (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.08, ease: 'easeOut' }}
                className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => router.push(sub.link)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    router.push(sub.link);
                  }
                }}
              >
                {/* Image or gradient background */}
                <div className="relative h-[220px] sm:h-[240px] lg:h-[280px] w-full">
                  {sub.imageUrl ? (
                    <>
                      <Image
                        src={sub.imageUrl}
                        alt={sub.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    </>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
                      {/* Decorative icon */}
                      <Icon
                        className="absolute top-6 right-6 w-16 h-16 text-white/[0.06]"
                        aria-hidden="true"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                  )}

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6">
                    {/* Icon badge */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 backdrop-blur-sm"
                      style={{ backgroundColor: `${data.zoneColor}30` }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: data.zoneColor }}
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="text-lg lg:text-xl font-bold text-white mb-1">
                      {sub.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-3">
                      {sub.shortDesc}
                    </p>

                    {/* CTA */}
                    <div
                      className="inline-flex items-center gap-1.5 text-sm font-bold transition-all group-hover:gap-2.5"
                      style={{ color: data.zoneColor }}
                    >
                      {sub.linkText}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile zone navigation */}
        {allZones && allZones.length > 1 && onSwitchZone && (
          <div className="sm:hidden flex items-center gap-2 mt-6 pt-4 border-t border-white/10">
            {allZones.map((zone) => {
              const isActive = zone.zoneId === data.zoneId;
              const ZoneIcon = zoneIconMap[zone.zoneId] || Calendar;
              return (
                <button
                  key={zone.zoneId}
                  onClick={() => {
                    if (!isActive) onSwitchZone(zone.zoneId);
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

        {/* Desktop prev/next navigation */}
        {allZones && allZones.length > 1 && onSwitchZone && (prevZone || nextZone) && (
          <div className="hidden sm:flex items-center justify-between mt-6 pt-4 border-t border-white/10">
            {prevZone ? (
              <button
                onClick={() => onSwitchZone(prevZone.zoneId)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 text-xs font-medium transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
                {prevZone.zoneName}
              </button>
            ) : <div />}
            {nextZone && (
              <button
                onClick={() => onSwitchZone(nextZone.zoneId)}
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
  );
}
