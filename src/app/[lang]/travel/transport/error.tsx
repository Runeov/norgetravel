'use client';

import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export default function TransportError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-[70dvh] bg-[#f5f8f9] px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-8 shadow-[0_18px_60px_rgba(27,58,92,0.08)] sm:p-12">
        <p className="text-sm font-semibold text-[#39708e]">Transport guide unavailable</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-900 text-balance">
          We could not load the routes.
        </h1>
        <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
          Try again now, or return to the travel map and continue planning from there.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#1B3A5C] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#112a45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C] focus-visible:ring-offset-2"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Try again
          </button>
          <Link
            href="/travel"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-[#1B3A5C] transition-colors hover:border-[#1B3A5C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B3A5C] focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Travel map
          </Link>
        </div>
      </div>
    </div>
  );
}
