'use client';

import { useRef, useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { cn } from '@/lib/utils';
import { fmt } from '@/i18n/format';
import type { Listing } from '@/lib/app/model';
import { useAppCopy } from './AppCopy';
import { Poster } from './Poster';

/**
 * EVE's "Happening Soon" carousel: a swipeable row of event cards with dots
 * that follow the scroll position. The row is a plain scroll container, so it
 * also scrolls with a trackpad, the keyboard or a screen reader.
 */
export function SoonRail({ items, seeAllHref }: { items: Listing[]; seeAllHref: string }) {
  const { soon } = useAppCopy();
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const cardStep = () => {
    const el = rail.current;
    const card = el?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + 12 : 1;
  };

  function onScroll() {
    const el = rail.current;
    if (el) setActive(Math.min(items.length - 1, Math.round(el.scrollLeft / cardStep())));
  }

  function goTo(index: number) {
    rail.current?.scrollTo({ left: index * cardStep(), behavior: 'smooth' });
  }

  return (
    <section aria-labelledby="soon-heading" className="mt-8">
      <div className="mb-3 flex items-center justify-between px-1">
        <h2 id="soon-heading" className="font-display text-xl font-medium text-app-ink">
          {soon.heading}
        </h2>
        <Link
          href={seeAllHref}
          className="inline-flex min-h-[44px] items-center gap-1 text-sm font-medium text-app-ink/80 hover:text-app-ink"
        >
          {soon.seeAll}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div
        ref={rail}
        onScroll={onScroll}
        tabIndex={0}
        aria-label={soon.rail}
        className="app-rail -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {items.map((item) => (
          <article
            key={item.id}
            className="relative h-[220px] w-[min(320px,82vw)] shrink-0 snap-start overflow-hidden rounded-[20px] border border-app-line/15 bg-app-panel"
          >
            <Poster listing={item} sizes="320px" iconSize="h-20 w-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" aria-hidden="true" />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {item.status?.label ?? item.dateLabel}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-3.5 pr-14">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-white/90">{item.categoryLabel}</p>
              <h3 className="mt-0.5 line-clamp-2 font-display text-[17px] font-bold leading-snug text-white">
                <Link
                  href={item.href}
                  className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[20px] focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-app-accent"
                >
                  {item.name}
                </Link>
              </h3>
              <p className="mt-1 truncate text-xs text-white/85">
                <span className="font-semibold text-white">{item.dateLabel}</span>
                <span aria-hidden="true"> · </span>
                {item.place}
              </p>
            </div>
            <span
              className="absolute bottom-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-white"
              aria-hidden="true"
            >
              <ArrowRight className="h-4 w-4" />
            </span>
          </article>
        ))}
      </div>

      {items.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={fmt(soon.show, { name: item.name })}
              aria-current={i === active ? 'true' : undefined}
              className="flex h-6 items-center px-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
            >
              <span className={cn('block h-1.5 rounded-full transition-all', i === active ? 'w-5 bg-app-gold' : 'w-1.5 bg-app-ink/35')} />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
