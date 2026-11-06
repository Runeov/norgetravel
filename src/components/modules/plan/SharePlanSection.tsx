'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from '@/components/LocalizedLink';
import { Check, Copy, ExternalLink, Link2, RefreshCw } from 'lucide-react';
import { useTrip } from '@/context/TripContext';
import { trackEvent } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { readStoredDayPlan } from './DayPlanSection';
import { usePlanCopy } from './PlanCopy';

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
  const text = usePlanCopy().share;
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
        setMessage('error' in data ? data.error : text.error);
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
      setMessage(text.error);
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
    <section className="border-t border-plan-line pt-5" aria-labelledby="share-plan-title">
      <h3 id="share-plan-title" className="mb-3 flex items-center gap-2 text-lg font-bold text-plan-accent">
        <Link2 className="h-5 w-5" aria-hidden="true" />
        {text.title}
      </h3>
      <p className="text-base leading-relaxed text-plan-muted">{text.body}</p>

      {share && (
        <div className={cn('mt-4 rounded-md border border-plan-line bg-plan-card p-4', stale && 'border-amber-300')}>
          {stale && <p className="mb-2 text-sm text-amber-800">{text.stale}</p>}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              readOnly
              value={share.url}
              onFocus={(e) => e.currentTarget.select()}
              aria-label={text.linkLabel}
              className="min-h-[44px] w-full flex-1 rounded-sm border border-plan-line-strong bg-plan-surface px-3 text-sm text-plan-strong"
            />
            <button type="button" onClick={copy} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md border border-plan-accent px-4 text-sm font-semibold text-plan-accent hover:bg-plan-accent/5 transition-colors">
              {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
              {copied ? text.copied : text.copy}
            </button>
            <Link href={`/plan/shared/${share.id}`} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-plan-solid px-4 text-sm font-semibold text-plan-on-solid hover:bg-plan-solid-hover transition-colors">
              {text.open}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}

      {message && <p className="mt-3 text-base text-plan-danger">{message}</p>}

      <button
        type="button"
        onClick={create}
        disabled={state === 'loading'}
        className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-plan-accent px-5 text-sm font-bold text-plan-accent transition-colors hover:bg-plan-accent/5 disabled:opacity-60"
      >
        {state === 'loading' ? <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
        {state === 'loading' ? text.making : share ? text.again : text.make}
      </button>
    </section>
  );
}
