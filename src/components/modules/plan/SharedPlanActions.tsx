'use client';

import { useState } from 'react';
import { useLocalizedRouter } from '@/lib/use-localized-router';
import { CalendarPlus, Check, Copy, Download, Printer } from 'lucide-react';
import { useTrip } from '@/context/TripContext';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { trackEvent } from '@/lib/analytics';
import { buildIcs } from '@/lib/plan-ics';
import { buildPlanQuery } from '@/lib/plan-key';
import type { SharedPlan } from '@/lib/plan-store';
import type { TripInterest } from '@/types/trip';

const DAYPLAN_KEY = 'norgetravel-trip-dayplan';

function resolveName(ref: string, facts: SharedPlan['facts']): string | null {
  const [kind, ...rest] = ref.split(':');
  const id = rest.join(':');
  if (kind === 'activity') return facts.activities.find((a) => a.id === id)?.name ?? null;
  if (kind === 'event') return facts.events.find((a) => a.id === id)?.name ?? null;
  if (kind === 'stay') return facts.stays.find((a) => a.id === id)?.name ?? null;
  if (kind === 'leg') {
    const leg = facts.route.legs.find((l) => l.id === id);
    return leg ? `${leg.from} to ${leg.to} (${leg.method.replace('-', ' ')})` : null;
  }
  if (kind === 'kit') return facts.kit.find((l) => l.id === id)?.text.slice(0, 80) ?? null;
  return null;
}

/** Saves text as a file from the browser. */
function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Buttons under a shared plan: take it into your own planner, calendar, print, share. */
export function SharedPlanActions({ plan, url }: { plan: SharedPlan; url: string }) {
  const { clearTrip, addItem, updateProfile } = useTrip();
  const router = useLocalizedRouter();
  const [copied, setCopied] = useState(false);
  const [importing, setImporting] = useState(false);

  const usePlan = () => {
    setImporting(true);
    clearTrip();
    for (const item of plan.items) addItem({ ...item, addedAt: item.addedAt || new Date().toISOString() });
    const profile = {
      zones: plan.basics.zones,
      startDate: plan.basics.startDate,
      endDate: plan.basics.endDate,
      travellers: plan.basics.travellers,
      interests: plan.basics.interests as TripInterest[],
      pace: plan.basics.pace,
      mobility: plan.basics.mobility,
      budget: plan.basics.budget,
    };
    updateProfile(profile);
    if (plan.dayPlan) {
      try {
        const key = buildPlanQuery(profile, plan.basics.zones, plan.items.map((item) => item.id));
        window.localStorage.setItem(DAYPLAN_KEY, JSON.stringify({ key, plan: { ...plan.dayPlan, facts: plan.facts } }));
      } catch {
        // Storage blocked: the day plan stays on this page only
      }
    }
    trackEvent('trip_plan_imported', { id: plan.id, items: plan.items.length, days: plan.dayPlan?.days.length ?? 0 });
    setTimeout(() => router.push('/plan'), 150);
  };

  const calendar = () => {
    if (!plan.dayPlan) return;
    const ics = buildIcs({
      uidBase: plan.id,
      title: plan.title,
      url,
      days: plan.dayPlan.days.map((day) => ({
        day: day.day,
        date: day.date,
        title: day.title,
        summary: day.summary,
        items: day.items.map((item) => resolveName(item.ref, plan.facts)).filter((name): name is string => Boolean(name)),
      })),
    });
    download(`norge-travel-plan-${plan.id}.ics`, ics, 'text/calendar;charset=utf-8');
    trackEvent('trip_plan_calendar', { id: plan.id, days: plan.dayPlan.days.length });
  };

  const print = () => {
    trackEvent('trip_plan_printed', { id: plan.id });
    window.print();
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the share buttons still work
    }
  };

  const button = 'inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors';

  return (
    <div className="space-y-4 print:hidden" data-no-print>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={usePlan}
          disabled={importing}
          className={`${button} bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] font-bold text-white hover:shadow-lg hover:shadow-[#00CC6A]/30 hover:-translate-y-0.5 transition-all disabled:opacity-60`}
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          {importing ? 'Opening your planner' : 'Use this plan in my planner'}
        </button>
        {plan.dayPlan && (
          <button type="button" onClick={calendar} className={`${button} border border-white/40 text-white hover:bg-white/10`}>
            <CalendarPlus className="h-4 w-4" aria-hidden="true" />
            Calendar (.ics)
          </button>
        )}
        <button type="button" onClick={print} className={`${button} border border-white/40 text-white hover:bg-white/10`}>
          <Printer className="h-4 w-4" aria-hidden="true" />
          Print or save as PDF
        </button>
        <button type="button" onClick={copy} className={`${button} border border-white/40 text-white hover:bg-white/10`}>
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? 'Link copied' : 'Copy link'}
        </button>
      </div>
      <ShareButtons url={url} title={plan.title} label="Send it" className="text-white" />
    </div>
  );
}
