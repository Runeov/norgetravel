'use client';

import { useEffect, useState } from 'react';
import { Route, X } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import type { AppTab } from '@/lib/app/model';
import { useAppCopy } from './AppCopy';

// EVE uses this slot to ask for location access. NorgeTravel listings have no
// coordinates, so the banner points at the trip planner instead.

const KEY = 'nt-app-banner-dismissed';

export function InfoBanner({ tab }: { tab: AppTab }) {
  const { banner } = useAppCopy();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === '1') setHidden(true);
    } catch {
      // Storage blocked: show the banner.
    }
  }, []);

  if (hidden) return null;

  function dismiss() {
    setHidden(true);
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      // The banner stays closed for this visit.
    }
  }

  const copy = banner.tabs[tab];
  return (
    <div className="mt-4 flex items-center gap-3 rounded-[20px] border border-app-line/15 bg-app-panel/90 p-3 pl-4 shadow-lg backdrop-blur">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-app-raised text-app-accent" aria-hidden="true">
        <Route className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold leading-tight text-app-ink">{copy.title}</p>
        <p className="text-xs text-app-ink/75">{copy.body}</p>
      </div>
      <Link
        href="/app/plan/"
        className="app-gold-fill inline-flex min-h-[44px] shrink-0 items-center rounded-xl px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent focus-visible:ring-offset-2 focus-visible:ring-offset-app-bg"
      >
        {banner.cta}
      </Link>
      <button
        type="button"
        onClick={dismiss}
        aria-label={banner.close}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-app-ink/75 hover:bg-app-ink/10 hover:text-app-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
