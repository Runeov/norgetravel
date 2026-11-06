'use client';

import { useState } from 'react';
import { useAppCopy } from './AppCopy';

const PREVIEW = 360;

/**
 * Long descriptions start clipped with "View more", as on EVE's event pages.
 * The full text is in the HTML either way; the clip is visual only. `lang`
 * marks listing descriptions, which are English on every locale.
 */
export function ExpandableText({ text, lang }: { text: string; lang?: string }) {
  const { expand } = useAppCopy();
  const [open, setOpen] = useState(false);
  const long = text.length > PREVIEW;
  return (
    <div>
      <p lang={lang} className={`whitespace-pre-line text-[15px] leading-relaxed text-app-ink/90 ${long && !open ? 'line-clamp-5' : ''}`}>
        {text}
      </p>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-2 inline-flex min-h-[44px] items-center text-[15px] font-semibold text-app-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
        >
          {open ? expand.less : expand.more}
        </button>
      )}
    </div>
  );
}
