'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Check, Share2 } from 'lucide-react';
import { localizeHref } from '@/lib/i18n-href';
import { cn } from '@/lib/utils';
import { fmt } from '@/i18n/format';
import { useAppCopy } from './AppCopy';

/**
 * Shares a listing link with the system share sheet, or copies it where the
 * browser has none. The confirmation is announced to screen readers.
 */
export function ShareButton({ href, title, className }: { href: string; title: string; className?: string }) {
  const params = useParams<{ lang?: string }>();
  const { share: text } = useAppCopy();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function share() {
    const url = new URL(localizeHref(href, params?.lang), window.location.origin).toString();
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // Closing the share sheet rejects; nothing to report.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt(text.prompt, url);
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label={fmt(text.label, { title })}
      className={cn(
        'relative inline-flex h-11 w-11 items-center justify-center rounded-full text-app-ink/80 transition-colors hover:bg-app-ink/10 hover:text-app-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent',
        className
      )}
    >
      {copied ? <Check className="h-5 w-5 text-app-accent" aria-hidden="true" /> : <Share2 className="h-5 w-5" aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? text.copied : ''}
      </span>
    </button>
  );
}
