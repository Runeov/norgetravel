'use client';

import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  MapPin,
  Bed,
  UtensilsCrossed,
  ShoppingBag,
  Clock,
  Users,
  Car,
  AlertTriangle,
  CheckCircle,
  X,
  Info,
  Ship,
  Navigation,
  Mountain,
  Snowflake,
  Anchor,
  Compass,
} from 'lucide-react';

export type BasecampIconKey =
  | 'ship'
  | 'navigation'
  | 'mountain'
  | 'snowflake'
  | 'anchor'
  | 'compass'
  | 'map-pin';

const BASECAMP_ICONS: Record<BasecampIconKey, LucideIcon> = {
  ship: Ship,
  navigation: Navigation,
  mountain: Mountain,
  snowflake: Snowflake,
  anchor: Anchor,
  compass: Compass,
  'map-pin': MapPin,
};
import { cn } from '@/lib/utils';

export interface BasecampAccommodation {
  name: string;
  type: string;
  price: string;
  highlight: string;
}

export interface BasecampDining {
  name: string;
  detail: string;
}

export interface BasecampService {
  label: string;
  available: boolean;
  detail: string;
}

export interface Basecamp {
  id: string;
  label: string;
  icon: BasecampIconKey;
  name: string;
  tagline: string;
  population: string;
  distance: string;
  overview: string;
  bestFor: string[];
  notIdealFor: string[];
  accommodation: BasecampAccommodation[];
  dining: BasecampDining[];
  services: BasecampService[];
  insiderTip: string;
}

interface Props {
  heading?: string;
  intro?: string;
  basecamps: Basecamp[];
  bookingNote?: string;
}

export function DestinationBasecamps({
  heading = 'Where to base yourself',
  intro,
  basecamps,
  bookingNote,
}: Props) {
  const [activeBase, setActiveBase] = useState<string>(basecamps[0]?.id ?? '');
  const base = basecamps.find((b) => b.id === activeBase) ?? basecamps[0];

  if (!base) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">{heading}</h2>
      </div>
      {intro && (
        <div className="max-w-3xl mb-8">
          <p className="text-slate-600 leading-relaxed">{intro}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-8" role="tablist">
        {basecamps.map((b) => {
          const Icon = BASECAMP_ICONS[b.icon] ?? MapPin;
          const isActive = activeBase === b.id;
          return (
            <button
              key={b.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveBase(b.id)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors min-h-[44px]',
                isActive
                  ? 'bg-[#1A365D] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#1A365D]/40 hover:text-[#1A365D]'
              )}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {b.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-start gap-3 mb-1">
            <MapPin className="w-5 h-5 text-[#5CBFEE] mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-bold text-slate-800">{base.name}</h3>
              <p className="text-sm text-slate-500">{base.tagline}</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mt-3 mb-5">{base.overview}</p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-sm text-xs font-medium text-slate-700">
              <Users className="w-3 h-3 text-[#1A365D]" aria-hidden="true" />
              {base.population}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-sm text-xs font-medium text-slate-700">
              <Car className="w-3 h-3 text-[#1A365D]" aria-hidden="true" />
              {base.distance}
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-emerald-50/50 rounded-lg border border-emerald-200/60 p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-800 uppercase tracking-wide mb-3">
              <CheckCircle className="w-4 h-4" aria-hidden="true" />
              Best for
            </h4>
            <ul className="space-y-2">
              {base.bestFor.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50/50 rounded-lg border border-amber-200/60 p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-amber-800 uppercase tracking-wide mb-3">
              <AlertTriangle className="w-4 h-4" aria-hidden="true" />
              Not ideal for
            </h4>
            <ul className="space-y-2">
              {base.notIdealFor.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                <Bed className="w-4 h-4 text-[#1A365D]" aria-hidden="true" />
                Accommodation
              </h4>
              <div className="space-y-5">
                {base.accommodation.map((acc) => (
                  <div key={acc.name}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-bold text-slate-800 text-sm">{acc.name}</p>
                      <span className="text-xs text-slate-500 shrink-0">{acc.type}</span>
                    </div>
                    <p className="text-xs font-medium text-[#1A365D] mb-1.5">{acc.price}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{acc.highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                <UtensilsCrossed className="w-4 h-4 text-[#1A365D]" aria-hidden="true" />
                Dining
              </h4>
              <div className="space-y-4">
                {base.dining.map((d) => (
                  <div key={d.name}>
                    <p className="font-bold text-slate-800 text-sm mb-0.5">{d.name}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{d.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                <ShoppingBag className="w-4 h-4 text-[#1A365D]" aria-hidden="true" />
                Practical services
              </h4>
              <div className="space-y-3">
                {base.services.map((svc) => (
                  <div key={svc.label} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {svc.available ? (
                        <CheckCircle className="w-3.5 h-3.5 text-[#00D084]" aria-hidden="true" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{svc.label}</p>
                      <p className="text-xs text-slate-600">{svc.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1A365D]/5 rounded-lg border border-[#1A365D]/15 p-5">
              <h4 className="flex items-center gap-2 text-sm font-bold text-[#1A365D] uppercase tracking-wide mb-3">
                <Info className="w-4 h-4" aria-hidden="true" />
                Local tip
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">{base.insiderTip}</p>
            </div>
          </div>
        </div>

        {bookingNote && (
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#1A365D] mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold text-slate-800 mb-1">Booking lead times</p>
                <p className="text-xs text-slate-600 leading-relaxed">{bookingNote}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
