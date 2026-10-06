'use client';

import { Fragment, useState } from 'react';
import {
  MapPin,
  Bed,
  UtensilsCrossed,
  ShoppingBag,
  Clock,
  Users,
  Mountain,
  Car,
  AlertTriangle,
  CheckCircle,
  X,
  Info,
  Building,
  Waves,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TromsoBasecampId, TromsoBasecampsCopy } from '@/i18n/tromso-copy';

// Text per locale comes from TROMSO_COPY (src/i18n/tromso-copy.ts)
const basecamps: { id: TromsoBasecampId; icon: typeof MapPin }[] = [
  { id: 'sentrum', icon: Building },
  { id: 'tromsdalen', icon: Mountain },
  { id: 'kvaloya', icon: Waves },
];

export function TromsoBasecamps({ copy }: { copy: TromsoBasecampsCopy }) {
  const [activeBase, setActiveBase] = useState<TromsoBasecampId>('sentrum');

  const base = copy.bases[activeBase];

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">
          {copy.heading}
        </h2>
      </div>
      <div className="max-w-3xl space-y-4 mb-8">
        <p className="text-slate-600 leading-relaxed">
          {copy.intro}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8" role="tablist">
        {basecamps.map((b) => {
          const Icon = b.icon;
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
              {copy.bases[b.id].label}
            </button>
          );
        })}
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-start gap-3 mb-1">
            <MapPin
              className="w-5 h-5 text-[#5CBFEE] mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <h3 className="text-lg font-bold text-slate-800">{base.name}</h3>
              <p className="text-sm text-slate-500">{base.tagline}</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mt-3 mb-5">
            {base.overview}
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-sm text-xs font-medium text-slate-700">
              <Users className="w-3 h-3 text-[#1A365D]" aria-hidden="true" />
              {base.population}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-sm text-xs font-medium text-slate-700">
              <Car className="w-3 h-3 text-[#1A365D]" aria-hidden="true" />
              {base.distanceToCentre}
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-emerald-50/50 rounded-lg border border-emerald-200/60 p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-800 uppercase tracking-wide mb-3">
              <CheckCircle className="w-4 h-4" aria-hidden="true" />
              {copy.bestFor}
            </h4>
            <ul className="space-y-2">
              {base.bestFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50/50 rounded-lg border border-amber-200/60 p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-amber-800 uppercase tracking-wide mb-3">
              <AlertTriangle className="w-4 h-4" aria-hidden="true" />
              {copy.notIdealFor}
            </h4>
            <ul className="space-y-2">
              {base.notIdealFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed"
                >
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
                {copy.accommodation}
              </h4>
              <div className="space-y-5">
                {base.accommodation.map((acc) => (
                  <div key={acc.name}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-bold text-slate-800 text-sm">
                        {acc.name}
                      </p>
                      <span className="text-xs text-slate-500 shrink-0">
                        {acc.type}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#1A365D] mb-1.5">
                      {acc.price}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {acc.highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                <UtensilsCrossed
                  className="w-4 h-4 text-[#1A365D]"
                  aria-hidden="true"
                />
                {copy.dining}
              </h4>
              <div className="space-y-4">
                {base.dining.map((d) => (
                  <div key={d.name}>
                    <p className="font-bold text-slate-800 text-sm mb-0.5">
                      {d.name}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {d.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                <ShoppingBag
                  className="w-4 h-4 text-[#1A365D]"
                  aria-hidden="true"
                />
                {copy.services}
              </h4>
              <div className="space-y-3">
                {base.services.map((svc) => (
                  <div key={svc.label} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {svc.available ? (
                        <CheckCircle
                          className="w-3.5 h-3.5 text-[#00D084]"
                          aria-hidden="true"
                        />
                      ) : (
                        <X
                          className="w-3.5 h-3.5 text-slate-400"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {svc.label}
                      </p>
                      <p className="text-xs text-slate-600">{svc.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#1A365D]/5 rounded-lg border border-[#1A365D]/15 p-5">
              <h4 className="flex items-center gap-2 text-sm font-bold text-[#1A365D] uppercase tracking-wide mb-3">
                <Info className="w-4 h-4" aria-hidden="true" />
                {copy.localTip}
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {base.insiderTip}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg border border-slate-200 p-5">
          <div className="flex items-start gap-3">
            <Clock
              className="w-5 h-5 text-[#1A365D] mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-bold text-slate-800 mb-1">
                {copy.leadTimes.title}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {copy.leadTimes.items.map((item, i) => (
                  <Fragment key={item.label}>
                    {i > 0 && copy.leadTimes.gap}
                    <span className="font-semibold text-slate-800">
                      {item.label}
                    </span>
                    {copy.leadTimes.gap}
                    {item.body}
                  </Fragment>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
