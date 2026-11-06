"use client";

import Image from "next/image";
import { Bookmark, CalendarDays, MapPin, Trash2 } from "lucide-react";
import Link from "@/components/LocalizedLink";
import { useTrip } from "@/context/TripContext";
import { fmt, fmtNodes } from "@/i18n/format";
import type { AppClientCopy } from "@/i18n/app-copy";
import type { TripItem } from "@/types/trip";
import { useAppCopy } from "./AppCopy";

function dates(item: TripItem, { intl, rangeJoin }: AppClientCopy["dates"]): string | undefined {
  if (!item.startDate) return undefined;
  const short = new Intl.DateTimeFormat(intl, { timeZone: "UTC", day: "numeric", month: "short" });
  const day = (iso: string) => short.format(new Date(`${iso}T00:00:00Z`));
  return item.endDate && item.endDate !== item.startDate
    ? `${day(item.startDate)}${rangeJoin}${day(item.endDate)}`
    : day(item.startDate);
}

/**
 * Everything the visitor saved, from the app or anywhere else on the site.
 * The list lives on this device (TripContext), so the server renders nothing.
 * `inline` is the planner's embedded version: a one-line empty state, and
 * `limit` rows with a link to the rest.
 */
export function SavedList({ limit, inline = false }: { limit?: number; inline?: boolean } = {}) {
  const { items, removeItem } = useTrip();
  const copy = useAppCopy();
  const { saved } = copy;
  const shown = limit ? items.slice(0, limit) : items;

  if (items.length === 0 && inline) {
    return (
      <p className="text-sm text-app-ink/75">
        {fmtNodes(saved.emptyInline, {
          link: (
            <Link href="/app/" className="font-semibold text-app-accent hover:underline">
              {saved.emptyInlineLink}
            </Link>
          ),
        })}
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-[20px] border border-app-line/15 bg-app-panel/85 p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-app-gold/50 text-app-accent">
          <Bookmark className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="mt-4 font-display text-lg font-bold text-app-ink">
          {saved.emptyTitle}
        </p>
        <p className="mt-1 text-sm text-app-ink/75">{saved.emptyBody}</p>
        <Link
          href="/app/"
          className="app-gold-fill mt-5 inline-flex min-h-[44px] items-center rounded-full px-5 text-sm font-semibold"
        >
          {saved.browse}
        </Link>
      </div>
    );
  }

  return (
    <>
      <ul className="space-y-2.5">
        {shown.map((item) => {
          const when = dates(item, copy.dates);
          return (
            <li
              key={item.id}
              className="relative flex items-center gap-3 rounded-2xl border border-app-line/10 bg-app-panel/80 p-2.5"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-app-raised">
                {item.imageUrl && (
                  <Image
                    src={item.imageUrl}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-app-ink/60">
                  {saved.categories[item.category] ?? item.category}
                </p>
                <p className="truncate font-display text-[15px] font-bold text-app-ink">
                  {item.href?.startsWith("/") ? (
                    <Link href={item.href} className="hover:text-app-accent">
                      {item.name}
                    </Link>
                  ) : (
                    item.name
                  )}
                </p>
                <p className="flex items-center gap-3 truncate text-xs text-app-ink/70">
                  {when && (
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" aria-hidden="true" />
                      {when}
                    </span>
                  )}
                  {item.location && (
                    <span className="inline-flex min-w-0 items-center gap-1 truncate">
                      <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                      <span className="truncate">{item.location}</span>
                    </span>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={fmt(copy.save.remove, { name: item.name })}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-app-ink/70 hover:bg-app-ink/10 hover:text-app-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>
      {shown.length < items.length && (
        <Link
          href="/app/saved/"
          className="mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-app-accent hover:underline"
        >
          {fmt(saved.seeAll, { n: items.length })}
        </Link>
      )}
    </>
  );
}
