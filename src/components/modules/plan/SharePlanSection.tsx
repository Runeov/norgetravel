'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from '@/components/LocalizedLink';
import { Check, Copy, ExternalLink, Link2, RefreshCw } from 'lucide-react';
import { useTrip } from '@/context/TripContext';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { readStoredDayPlan } from './DayPlanSection';

const STORAGE_KEY = 'norgetravel-trip-share';

interface StoredShare {
  key: string;
  id: string;
  url: string;
  createdAt: string;
}

function readStored(): StoredShare | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredShare) : null;
  } catch {
    return null;
  }
}

interface SharePlanSectionProps {
  /** The basics as the share route expects them. */
  basics: Record<string, unknown>;
  requestKey: string;
}

/**
 * Makes a link to a read-only copy of the plan (basics, saved items and the
 * written days), good for 90 days, with calendar and print on the shared page.
 */
export function SharePlanSection({ basics, requestKey }: SharePlanSectionProps) {
  const { items } = useTrip();
  const params = useParams<{ lang?: string }>();
  const [share, setShare] = useState<StoredShare | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setShare(readStored());
  }, []);

  const stale = Boolean(share && share.key !== requestKey);

  const create = async () => {
    setState('loading');
    setMessage(null);
    try {
      const stored = readStoredDayPlan();
      const dayPlan = stored && stored.key === requestKey ? { ...stored.plan, facts: undefined } : null;
      const response = await fetch('/api/plan/share/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lang: params?.lang ?? 'en', basics, items, dayPlan }),
      });
      const data = (await response.json()) as { id: string; url: string } | { error: string };
      if (!response.ok || 'error' in data) {
        setMessage('error' in data ? data.error : 'The link could not be made just now.');
        setState('error');
        return;
      }
      const next: StoredShare = { key: requestKey, id: data.id, url: data.url, createdAt: new Date().toISOString() };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage blocked: the link shows for this view only
      }
      setShare(next);
      setState('idle');
      trackEvent('trip_plan_shared', { id: data.id, items: items.length, with_days: Boolean(dayPlan) });
    } catch {
      setMessage('The link could not be made just now.');
      setState('error');
    }
  };

  const copy = async () => {
    if (!share) return;
    try {
      await navigator.clipboard.writeText(share.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the link is visible to select
    }
  };

  return (
    <section className="border-t border-slate-200 pt-5" aria-labelledby="share-plan-title">
      <h3 id="share-plan-title" className="mb-3 flex items-center gap-2 text-lg font-bold text-[#1B3A5C]">
        <Link2 className="h-5 w-5" aria-hidden="true" />
        Share or export
      </h3>
      <p className="text-base leading-relaxed text-slate-600">
        A link to a read-only copy of this plan: the basics, everything saved, and the written days if there are any. The shared page has the calendar file and a print view. Links last 90 days.
      </p>

      {share && (
        <div className={cn('mt-4 rounded-md border border-slate-200 bg-white p-4', stale && 'border-amber-300')}>
          {stale && <p className="mb-2 text-sm text-amber-800">The plan changed since this link was made. Make a new one to share the latest.</p>}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              readOnly
              value={share.url}
              onFocus={(e) => e.currentTarget.select()}
              aria-label="Share link"
              className="min-h-[44px] w-full flex-1 rounded-sm border border-slate-300 bg-slate-50 px-3 text-sm text-slate-800"
            />
            <button type="button" onClick={copy} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-[#1B3A5C] px-4 text-sm font-semibold text-[#1B3A5C] hover:bg-[#1B3A5C]/5 transition-colors">
              {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <Link href={`/plan/shared/${share.id}`} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#1B3A5C] px-4 text-sm font-semibold text-white hover:bg-[#15304d] transition-colors">
              Open
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}

      {message && <p className="mt-3 text-base text-[#D32F2F]">{message}</p>}

      <button
        type="button"
        onClick={create}
        disabled={state === 'loading'}
        className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#1B3A5C] px-5 text-sm font-bold text-[#1B3A5C] transition-colors hover:bg-[#1B3A5C]/5 disabled:opacity-60"
      >
        {state === 'loading' ? <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
        {state === 'loading' ? 'Making the link' : share ? 'Make a new link' : 'Make a share link'}
      </button>
    </section>
  );
}
