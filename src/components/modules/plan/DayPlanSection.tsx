'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from '@/components/LocalizedLink';
import { AlertTriangle, CalendarDays, ExternalLink, RefreshCw, Sparkles } from 'lucide-react';
import { AddToTripButton } from '@/components/ui/AddToTripButton';
import { trackEvent } from '@/lib/analytics';
import { outboundRel } from '@/lib/outbound-rel';
import { cn } from '@/lib/utils';
import type { AgentPlan, DayPlan } from '@/lib/plan-agent';
import type { PlanResult, Suggestion } from '@/lib/plan-engine';

const STORAGE_KEY = 'norgetravel-trip-dayplan';

interface Stored {
  key: string;
  plan: AgentPlan;
}

function readStored(): Stored | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Stored) : null;
  } catch {
    return null;
  }
}

function store(value: Stored) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Private mode or full storage: the plan lives for this view only
  }
}

function formatDate(value?: string): string | null {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
}

/** Resolves a ref like `activity:<id>` to the fact it points at. */
function resolve(ref: string, facts: PlanResult): { kind: string; suggestion?: Suggestion; text?: string; links?: { label: string; href: string }[] } | null {
  const [kind, ...rest] = ref.split(':');
  const id = rest.join(':');
  if (kind === 'activity') { const s = facts.activities.find((a) => a.id === id); return s ? { kind, suggestion: s } : null; }
  if (kind === 'event') { const s = facts.events.find((a) => a.id === id); return s ? { kind, suggestion: s } : null; }
  if (kind === 'stay') { const s = facts.stays.find((a) => a.id === id); return s ? { kind, suggestion: s } : null; }
  if (kind === 'leg') { const leg = facts.route.legs.find((l) => l.id === id); return leg ? { kind, text: `${leg.from} to ${leg.to}: ${leg.text}`, links: leg.links } : null; }
  if (kind === 'kit') { const line = facts.kit.find((l) => l.id === id); return line ? { kind, text: line.text, links: line.links } : null; }
  return null;
}

function ItemName({ s }: { s: Suggestion }) {
  if (!s.href) return <>{s.name}</>;
  return s.href.startsWith('/') ? (
    <Link href={s.href} className="hover:text-[#1B3A5C] hover:underline">{s.name}</Link>
  ) : (
    <a href={s.href} target="_blank" rel={outboundRel(s.href)} className="inline-flex items-center gap-1 hover:text-[#1B3A5C] hover:underline">
      {s.name}
      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
    </a>
  );
}

function DayCard({ day, facts }: { day: DayPlan; facts: PlanResult }) {
  const date = formatDate(day.date);
  return (
    <li className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Day {day.day}
        {date && <> · {date}</>}
        {day.region && <> · {day.region}</>}
      </p>
      <h4 className="mt-1 text-lg font-bold text-[#1B3A5C]">{day.title}</h4>
      <p className="mt-2 text-base leading-relaxed text-slate-700">{day.summary}</p>
      {day.items.length > 0 && (
        <ul className="mt-4 space-y-3">
          {day.items.map((item, index) => {
            const resolved = resolve(item.ref, facts);
            if (!resolved) return null;
            return (
              <li key={`${item.ref}-${index}`} className="flex flex-col gap-2 rounded-md bg-slate-50 p-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  {resolved.suggestion ? (
                    <p className="font-semibold text-slate-800"><ItemName s={resolved.suggestion} /></p>
                  ) : (
                    <p className="text-sm font-semibold text-slate-800">{resolved.text}</p>
                  )}
                  {item.note && <p className="mt-0.5 text-sm text-slate-600">{item.note}</p>}
                  {resolved.links && resolved.links.length > 0 && (
                    <span className="mt-1 flex flex-wrap gap-x-3">
                      {resolved.links.map((link) =>
                        link.href.startsWith('/') ? (
                          <Link key={link.href} href={link.href} className="text-sm font-semibold text-[#1B3A5C] hover:text-[#00CC6A]">{link.label}</Link>
                        ) : (
                          <a key={link.href} href={link.href} target="_blank" rel={outboundRel(link.href)} className="text-sm font-semibold text-[#1B3A5C] hover:text-[#00CC6A]">{link.label}</a>
                        )
                      )}
                    </span>
                  )}
                </div>
                {resolved.suggestion && (
                  <AddToTripButton
                    compact
                    className="shrink-0"
                    item={{
                      id: resolved.suggestion.id,
                      name: resolved.suggestion.name,
                      category: resolved.suggestion.category,
                      imageUrl: resolved.suggestion.imageUrl,
                      location: resolved.suggestion.location,
                      priceRange: resolved.suggestion.priceRange,
                      destination: resolved.suggestion.zone,
                      zone: resolved.suggestion.zone,
                      href: resolved.suggestion.href,
                      startDate: resolved.suggestion.startDate,
                      endDate: resolved.suggestion.endDate,
                      addedAt: '',
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
      {day.why && <p className="mt-3 text-sm italic text-slate-500">{day.why}</p>}
    </li>
  );
}

interface DayPlanSectionProps {
  /** The basics as the suggest route receives them; also the key the stored plan is matched against. */
  request: Record<string, unknown>;
  requestKey: string;
  ready: boolean;
}

/**
 * The day-by-day plan written by the model from the engine's facts. Only runs
 * on a button press, is kept on the device, and says when the basics have
 * changed since it was written.
 */
export function DayPlanSection({ request, requestKey, ready }: DayPlanSectionProps) {
  const [stored, setStored] = useState<Stored | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    setStored(readStored());
  }, []);

  const plan = stored?.plan ?? null;
  const stale = useMemo(() => Boolean(stored && stored.key !== requestKey), [stored, requestKey]);

  const write = async () => {
    setState('loading');
    setMessage(null);
    trackEvent('trip_plan_requested', { zones: String(request.zones ?? ''), nights: String(request.nights ?? '') });
    try {
      const response = await fetch('/api/plan/agent/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });
      const data = (await response.json()) as AgentPlan | { error: string };
      if (!response.ok || 'error' in data) {
        setMessage('error' in data ? data.error : 'The planner could not write the plan just now.');
        setState('error');
        trackEvent('trip_plan_failed', { status: response.status });
        return;
      }
      const next = { key: requestKey, plan: data };
      store(next);
      setStored(next);
      setState('idle');
      trackEvent('trip_plan_generated', { days: data.days.length, model: data.model, cache_read: data.usage.cacheRead });
    } catch {
      setMessage('The planner could not write the plan just now.');
      setState('error');
      trackEvent('trip_plan_failed', { status: 0 });
    }
  };

  return (
    <section className="border-t border-slate-200 pt-5" aria-labelledby="day-plan-title">
      <h3 id="day-plan-title" className="mb-3 flex items-center gap-2 text-lg font-bold text-[#1B3A5C]">
        <CalendarDays className="h-5 w-5" aria-hidden="true" />
        Day by day
      </h3>

      {!plan && (
        <p className="text-base leading-relaxed text-slate-600">
          {ready
            ? 'Our planning model turns the facts above into a day-by-day plan: arrival, what to do each day, where to sleep, when to leave. It only uses what is listed here, and it says what it could not verify.'
            : 'Add arrival and departure dates and a destination, and the model can write the days out.'}
        </p>
      )}

      {plan && (
        <div className={cn('space-y-4', state === 'loading' && 'opacity-60')}>
          {stale && (
            <p className="flex items-start gap-2 rounded-md bg-amber-50 p-3 text-sm text-amber-900">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              Your basics changed since this plan was written. Write it again to match them.
            </p>
          )}
          <div>
            <h4 className="text-xl font-bold text-[#1B3A5C]">{plan.title}</h4>
            <p className="mt-1 text-base leading-relaxed text-slate-700">{plan.intro}</p>
          </div>
          <ol className="space-y-4">
            {plan.days.map((day) => (
              <DayCard key={day.day} day={day} facts={plan.facts} />
            ))}
          </ol>
          {plan.unverified.length > 0 && (
            <div className="rounded-md border border-slate-200 bg-white p-4">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Not in our listings, check before you book</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
                {plan.unverified.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="text-xs text-slate-500">
            Written {formatDate(plan.generatedAt.slice(0, 10)) ?? ''} from the facts above. Prices and times come from our listings; confirm them with the operator before you book.
          </p>
        </div>
      )}

      {message && <p className="mt-3 text-base text-[#D32F2F]">{message}</p>}

      {ready && (
        <button
          type="button"
          onClick={write}
          disabled={state === 'loading'}
          className="mt-4 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] px-6 text-base font-bold text-white transition-all hover:shadow-lg hover:shadow-[#00CC6A]/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {state === 'loading' ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" />
              Writing your days, about 30 seconds
            </>
          ) : plan ? (
            <>
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
              Write it again
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Write my day-by-day plan
            </>
          )}
        </button>
      )}
    </section>
  );
}
