'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from '@/components/LocalizedLink';
import {
  AlertTriangle,
  Backpack,
  Bus,
  Calendar,
  Car,
  ExternalLink,
  Lightbulb,
  Map as MapIcon,
  Plane,
  Route,
  Ship,
  Sparkles,
  Star,
  Train,
  BedDouble,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTrip } from '@/context/TripContext';
import { AddToTripButton } from '@/components/ui/AddToTripButton';
import { outboundRel } from '@/lib/outbound-rel';
import { cn } from '@/lib/utils';
import type { LegMethod, PlanLine, PlanResult, Suggestion } from '@/lib/plan-engine';
import type { TripInterest } from '@/types/trip';

/** Zones to plan for when the visitor has chosen none: what they saved, else what they said they came for. */
const INTEREST_ZONES: Record<TripInterest, string[]> = {
  aurora: ['northern-norway'],
  'midnight-sun': ['northern-norway'],
  hiking: ['lofoten', 'fjords'],
  fjords: ['fjords'],
  wildlife: ['northern-norway'],
  'sami-culture': ['northern-norway'],
  food: ['cities'],
  cities: ['cities'],
  family: ['fjords'],
  photography: ['lofoten'],
};

const LEG_ICON: Record<LegMethod, LucideIcon> = {
  fly: Plane,
  drive: Car,
  ferry: Ship,
  'coastal-ship': Ship,
  train: Train,
  bus: Bus,
};

function PlanLinks({ links }: { links: { label: string; href: string }[] }) {
  if (!links.length) return null;
  return (
    <span className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
      {links.map((link) =>
        link.href.startsWith('/') ? (
          <Link key={link.href} href={link.href} className="text-sm font-semibold text-[#1B3A5C] hover:text-[#00CC6A] transition-colors">
            {link.label}
          </Link>
        ) : (
          <a key={link.href} href={link.href} target="_blank" rel={outboundRel(link.href)} className="inline-flex items-center gap-1 text-sm font-semibold text-[#1B3A5C] hover:text-[#00CC6A] transition-colors">
            {link.label}
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        )
      )}
    </span>
  );
}

function Lines({ lines, tone = 'plain' }: { lines: PlanLine[]; tone?: 'plain' | 'warn' }) {
  return (
    <ul className="space-y-3">
      {lines.map((line) => (
        <li key={line.id} className={cn('flex gap-3 text-base leading-relaxed text-slate-700', tone === 'warn' && line.id.startsWith('fit-nights') && 'text-[#D32F2F]')}>
          {tone === 'warn' ? (
            <AlertTriangle className={cn('mt-1 h-4 w-4 shrink-0', line.id === 'fit-ok' ? 'text-[#00CC6A]' : 'text-amber-600')} aria-hidden="true" />
          ) : (
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B3A5C]" aria-hidden="true" />
          )}
          <span className="min-w-0">
            {line.text}
            {line.detail && <span className="block text-sm text-slate-500">{line.detail}</span>}
            <PlanLinks links={line.links} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function SuggestionRow({ item }: { item: Suggestion }) {
  const external = item.href && !item.href.startsWith('/');
  return (
    <li className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <p className="font-bold text-slate-800">
          {item.href ? (
            external ? (
              <a href={item.href} target="_blank" rel={outboundRel(item.href)} className="inline-flex items-center gap-1 hover:text-[#1B3A5C] hover:underline">
                {item.name}
                <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              </a>
            ) : (
              <Link href={item.href} className="hover:text-[#1B3A5C] hover:underline">
                {item.name}
              </Link>
            )
          ) : (
            item.name
          )}
        </p>
        <p className="mt-0.5 text-sm text-slate-600">{item.why}</p>
      </div>
      <AddToTripButton
        compact
        className="shrink-0"
        item={{
          id: item.id,
          name: item.name,
          category: item.category,
          imageUrl: item.imageUrl,
          location: item.location,
          priceRange: item.priceRange,
          destination: item.zone,
          zone: item.zone,
          href: item.href,
          startDate: item.startDate,
          endDate: item.endDate,
          addedAt: '',
        }}
      />
    </li>
  );
}

function Section({ icon: Icon, title, count, children }: { icon: LucideIcon; title: string; count?: number; children: React.ReactNode }) {
  return (
    <section className="border-t border-slate-200 pt-5">
      <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-[#1B3A5C]">
        <Icon className="h-5 w-5" aria-hidden="true" />
        {title}
        {count !== undefined && <span className="rounded-full bg-slate-100 px-2 text-xs font-semibold text-slate-600">{count}</span>}
      </h3>
      {children}
    </section>
  );
}

/**
 * The plan so far: light and season, whether the pace fits, the route, what to
 * do, attend and book, and what to pack. Built on the server from our own data
 * and the visitor's trip basics; every line links to the guide it came from.
 */
export function TripPlanPanel() {
  const { profile, items } = useTrip();
  const [plan, setPlan] = useState<PlanResult | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  const zones = useMemo(() => {
    if (profile.zones.length) return profile.zones;
    const fromItems = [...new Set(items.map((item) => item.zone).filter((zone): zone is string => Boolean(zone)))];
    if (fromItems.length) return fromItems;
    return [...new Set(profile.interests.flatMap((interest) => INTEREST_ZONES[interest]))];
  }, [profile.zones, profile.interests, items]);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (profile.startDate) params.set('start', profile.startDate);
    if (profile.endDate) params.set('end', profile.endDate);
    if (profile.travellers) params.set('travellers', String(profile.travellers));
    if (profile.interests.length) params.set('interests', profile.interests.join(','));
    if (profile.pace) params.set('pace', profile.pace);
    if (profile.mobility) params.set('mobility', profile.mobility);
    if (profile.budget) params.set('budget', profile.budget);
    if (zones.length) params.set('zones', zones.join(','));
    if (items.length) params.set('saved', items.map((item) => item.id).slice(0, 200).join(','));
    return params.toString();
  }, [profile, zones, items]);

  const hasInput = zones.length > 0;

  useEffect(() => {
    if (!hasInput) {
      setPlan(null);
      setState('idle');
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setState('loading');
      try {
        const response = await fetch(`/api/plan/suggest?${query}`, { signal: controller.signal });
        if (!response.ok) throw new Error(String(response.status));
        setPlan((await response.json()) as PlanResult);
        setState('ready');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') setState('error');
      }
    }, 350);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, hasInput]);

  const summary = plan
    ? [
        plan.window.season ? `${plan.window.season} trip` : null,
        plan.window.nights ? `${plan.window.nights} nights` : null,
        plan.zones.map((zone) => zone.name).join(', '),
      ].filter(Boolean).join(' · ')
    : null;

  return (
    <section aria-labelledby="trip-plan-title" className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm md:p-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Built from your basics and what you saved</p>
          <h2 id="trip-plan-title" className="text-2xl font-bold text-[#1B3A5C]">
            Your plan so far
          </h2>
        </div>
        {summary && <p className="text-sm font-medium text-slate-600">{summary}</p>}
      </div>

      {!hasInput && (
        <p className="mt-4 text-base leading-relaxed text-slate-600">
          Pick a destination or an interest above, or save something from a destination page, and the plan builds here: the light you will get, whether the pace fits, the route, what to do and book, and what to pack.
        </p>
      )}

      {state === 'error' && (
        <p className="mt-4 text-base text-[#D32F2F]">The planner could not build a plan just now. Try again in a moment.</p>
      )}

      {state === 'loading' && !plan && (
        <div className="mt-6 space-y-3" aria-live="polite" aria-busy="true">
          <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
        </div>
      )}

      {plan && (
        <div className={cn('mt-6 space-y-6', state === 'loading' && 'opacity-60 transition-opacity')} aria-live="polite">
          {plan.light.length > 0 && (
            <Section icon={Lightbulb} title="Light and season">
              <Lines lines={plan.light} />
            </Section>
          )}
          {plan.fit.length > 0 && (
            <Section icon={AlertTriangle} title="Does it fit?">
              <Lines lines={plan.fit} tone="warn" />
            </Section>
          )}
          {plan.route.legs.length > 0 && (
            <Section icon={Route} title="Route">
              <ol className="space-y-3">
                {plan.route.legs.map((leg, index) => {
                  const Icon = LEG_ICON[leg.method];
                  return (
                    <li key={leg.id} className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1B3A5C] text-white">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold uppercase tracking-wide text-slate-500">
                          {index + 1}. {leg.from} to {leg.to}
                        </span>
                        <span className="block text-base leading-relaxed text-slate-700">{leg.text}</span>
                        <PlanLinks links={leg.links} />
                      </span>
                    </li>
                  );
                })}
              </ol>
            </Section>
          )}
          {plan.route.method.length > 0 && (
            <Section icon={MapIcon} title="Getting around">
              <Lines lines={plan.route.method} />
            </Section>
          )}
          {(plan.activities.length > 0 || plan.skippedActivities.count > 0) && (
            <Section icon={Sparkles} title="Do" count={plan.activities.length}>
              {plan.activities.length === 0 && (
                <p className="text-base leading-relaxed text-slate-600">Nothing in our listings for these interests runs in your dates. Change the dates or the interests and this fills in.</p>
              )}
              <ul className="space-y-3">
                {plan.activities.map((item) => (
                  <SuggestionRow key={item.id} item={item} />
                ))}
              </ul>
              {plan.skippedActivities.count > 0 && (
                <p className="mt-3 text-sm text-slate-500">
                  {plan.skippedActivities.count} {plan.skippedActivities.count === 1 ? 'activity runs' : 'activities run'} outside your dates and {plan.skippedActivities.count === 1 ? 'was' : 'were'} left out
                  {plan.skippedActivities.examples.length ? ` (${plan.skippedActivities.examples.join(', ')})` : ''}.
                </p>
              )}
            </Section>
          )}
          {plan.events.length > 0 && (
            <Section icon={Calendar} title="Attend" count={plan.events.length}>
              <ul className="space-y-3">
                {plan.events.map((item) => (
                  <SuggestionRow key={item.id} item={item} />
                ))}
              </ul>
            </Section>
          )}
          {plan.stays.length > 0 && (
            <Section icon={BedDouble} title="Stay" count={plan.stays.length}>
              {plan.stayNote && <p className="mb-3 text-sm text-slate-500">{plan.stayNote}</p>}
              <ul className="space-y-3">
                {plan.stays.map((item) => (
                  <SuggestionRow key={item.id} item={item} />
                ))}
              </ul>
            </Section>
          )}
          {plan.kit.length > 0 && (
            <Section icon={Backpack} title="Pack">
              <Lines lines={plan.kit} />
            </Section>
          )}
          {plan.sources.length > 0 && (
            <Section icon={Star} title="Built from">
              <PlanLinks links={plan.sources} />
            </Section>
          )}
        </div>
      )}
    </section>
  );
}
