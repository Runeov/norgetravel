import { CalendarDays, Clock, MapPin, Radio } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { cn } from '@/lib/utils';
import type { AppCopy } from '@/i18n/app-copy';
import type { Listing, ListingKind } from '@/lib/app/model';
import { Poster } from './Poster';
import { SaveButton, type SaveTarget } from './SaveButton';
import { ShareButton } from './ShareButton';
import { Avatar } from './ui';
import { categoryIcon } from './category-style';

/*
 * The feed's card types, after EVE's: the lead poster card, the post card used
 * for events, and the listing card used for tours and places. Each card's
 * title link covers the card; save and share sit above it. Card text comes in
 * the page language; descriptions are listing data and marked as English.
 */

export interface CardText {
  featured: string;
  organiser: string;
  kinds: Record<ListingKind, string>;
}

export const cardText = (copy: AppCopy): CardText => ({ ...copy.cards, kinds: copy.labels.kinds });

const saveTarget = (l: Listing): SaveTarget => ({
  kind: l.kind,
  id: l.id,
  name: l.name,
  href: l.href,
  place: l.place,
  priceRange: l.priceRange,
  destination: l.destination,
  ...(l.zone && { zone: l.zone }),
  ...(l.imageUrl && { imageUrl: l.imageUrl }),
  ...(l.startDate && { startDate: l.startDate }),
  ...(l.endDate && { endDate: l.endDate }),
});

/** Dark glass chip used on top of photos, where the text is always light. */
export function PhotoChip({ children, live = false }: { children: React.ReactNode; live?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur',
        live ? 'bg-app-gold text-app-on-gold' : 'bg-black/55 text-white'
      )}
    >
      {children}
    </span>
  );
}

function StatusChip({ listing }: { listing: Listing }) {
  if (!listing.status) return null;
  return (
    <PhotoChip live={listing.status.live}>
      {listing.status.live ? <Radio className="h-3.5 w-3.5" aria-hidden="true" /> : <Clock className="h-3.5 w-3.5" aria-hidden="true" />}
      {listing.status.label}
    </PhotoChip>
  );
}

const STRETCH = "after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[20px] focus-visible:after:ring-2 focus-visible:after:ring-app-accent";

// ─── Lead card ───

export function FeaturedCard({ listing, text }: { listing: Listing; text: CardText }) {
  const CategoryIcon = categoryIcon(listing.category);
  return (
    <article className="relative overflow-hidden rounded-[20px] border border-app-line/15 bg-app-panel shadow-xl">
      <div className="relative aspect-[4/5] sm:aspect-[6/7]">
        <Poster listing={listing} sizes="(min-width: 1024px) 600px, 100vw" priority iconSize="h-40 w-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" aria-hidden="true" />
        {/* Whole-card target for pointer users; the title link is the one in the tab order. */}
        <Link href={listing.href} tabIndex={-1} aria-hidden="true" className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <div className="mb-3 flex flex-wrap gap-2">
            {listing.isFeatured && <PhotoChip>{text.featured}</PhotoChip>}
            <StatusChip listing={listing} />
            <PhotoChip>
              <CategoryIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {listing.categoryLabel}
            </PhotoChip>
          </div>
          <h2 className="font-display text-[28px] font-bold leading-tight text-white sm:text-[32px]">
            <Link
              href={listing.href}
              className="pointer-events-auto rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
            >
              {listing.name}
            </Link>
          </h2>
          {listing.dateLabel && (
            <p className="mt-1.5 flex items-center gap-1.5 text-[15px] text-white/90">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {listing.nowLabel ?? listing.dateLabel}
            </p>
          )}
          <div className="pointer-events-auto mt-4 flex items-center gap-2 rounded-2xl border border-white/15 bg-black/45 p-2 pl-2.5 backdrop-blur">
            <Avatar name={listing.provider ?? listing.place} size="h-9 w-9 text-xs" />
            <p className="min-w-0 flex-1 truncate text-[15px] font-semibold text-white">{listing.provider ?? listing.place}</p>
            <SaveButton target={saveTarget(listing)} className="text-white/90 hover:bg-white/10 hover:text-white" />
            {listing.priceLabel && (
              <span className="app-gold-fill shrink-0 rounded-full px-4 py-2 text-sm font-semibold">{listing.priceLabel}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Post card (events) ───

export function PostCard({ listing, text, priority = false }: { listing: Listing; text: CardText; priority?: boolean }) {
  return (
    <article className="relative">
      {listing.provider && (
        <div className="relative z-10 -mb-6 ml-2.5 flex items-center gap-2">
          <Avatar name={listing.provider} size="h-12 w-12 text-sm" />
          <p className="rounded-xl border border-app-line/20 bg-app-panel/95 px-3 py-1.5 text-xs leading-tight shadow">
            <span className="block max-w-[14rem] truncate font-semibold text-app-ink">{listing.provider}</span>
            <span className="text-app-ink/70">{text.organiser}</span>
          </p>
        </div>
      )}
      <div className={cn('relative overflow-hidden rounded-[20px] border border-app-line/15 bg-app-panel', listing.imageUrl ? 'aspect-[16/10]' : 'aspect-[16/6]')}>
        <Poster listing={listing} sizes="(min-width: 1024px) 600px, 100vw" priority={priority} />
        <div className="absolute right-3 top-3 flex gap-2">
          <StatusChip listing={listing} />
        </div>
      </div>
      <div className="flex items-center justify-between px-1.5 pt-1">
        <p className="flex items-center gap-1.5 px-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-app-ink/70">
          {listing.categoryLabel}
          <span aria-hidden="true">·</span>
          {listing.regionLabel}
        </p>
        <div className="relative z-10 flex">
          <SaveButton target={saveTarget(listing)} />
          <ShareButton href={listing.href} title={listing.name} />
        </div>
      </div>
      <div className="px-3">
        <h3 className="font-display text-xl font-bold leading-snug text-app-ink">
          <Link href={listing.href} className={cn(STRETCH, 'hover:text-app-accent')}>
            {listing.name}
          </Link>
        </h3>
        <p lang="en" className="mt-1 line-clamp-2 text-[15px] leading-relaxed text-app-ink/75">
          {listing.blurb}
        </p>
        <div className="mt-2 flex items-baseline justify-between gap-4 text-[15px]">
          <p className="min-w-0 truncate text-app-ink/85">
            {listing.dateLabel}
            <span aria-hidden="true"> · </span>
            {listing.place}
          </p>
          {listing.priceLabel && <p className="shrink-0 font-semibold text-app-ink">{listing.priceLabel}</p>}
        </div>
      </div>
    </article>
  );
}

// ─── Listing card (tours and places) ───

export function ListingCard({ listing, text, priority = false }: { listing: Listing; text: CardText; priority?: boolean }) {
  const badge = listing.kind === 'tours' ? listing.provider : listing.categoryLabel;
  return (
    <article className="relative">
      <div className={cn('relative overflow-hidden rounded-[20px] border border-app-line/15 bg-app-panel', listing.imageUrl ? 'aspect-[3/2]' : 'aspect-[16/6]')}>
        <Poster listing={listing} sizes="(min-width: 1024px) 600px, 100vw" priority={priority} />
        {badge && (
          <span className="absolute left-3 top-3 max-w-[75%] truncate rounded-full bg-black/55 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-white backdrop-blur">
            {badge}
          </span>
        )}
      </div>
      <div className="px-3 pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-app-ink/65">
          {listing.kind === 'tours' ? listing.categoryLabel : text.kinds[listing.kind]}
        </p>
        <h3 className="mt-1 font-display text-lg font-bold leading-snug text-app-ink">
          <Link href={listing.href} className={cn(STRETCH, 'hover:text-app-accent')}>
            {listing.name}
          </Link>
        </h3>
        <p lang="en" className="mt-0.5 line-clamp-1 text-[15px] text-app-ink/75">
          {listing.blurb}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {listing.duration && (
            <span lang="en" className="inline-flex items-center gap-1.5 rounded-full border border-app-line/20 px-2.5 py-1 text-xs font-medium text-app-ink/90">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {listing.duration}
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-app-gold/40 bg-app-gold/10 px-2.5 py-1 text-xs font-semibold text-app-accent">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {listing.townName ?? listing.regionLabel}
          </span>
          {listing.priceLabel && (
            <span className="app-gold-fill ml-auto rounded-full px-4 py-1.5 text-sm font-semibold">{listing.priceLabel}</span>
          )}
        </div>
      </div>
      <div className="relative z-10 flex justify-between px-1.5 pt-1">
        <SaveButton target={saveTarget(listing)} />
        <ShareButton href={listing.href} title={listing.name} />
      </div>
    </article>
  );
}

// ─── Calendar row ───

/** One event in the calendar: the start date as a tile, then the event, with save on the right. */
export function CalendarRow({ listing }: { listing: Listing }) {
  const { tile } = listing;
  return (
    <article className="relative flex items-stretch gap-3 rounded-2xl border border-app-line/10 bg-app-panel/80 p-3 transition-colors hover:border-app-line/30">
      {tile && (
        <div
          className="flex w-[60px] shrink-0 flex-col items-center justify-center rounded-xl bg-app-raised py-2 text-center"
          aria-hidden="true"
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-app-accent">{tile.month}</span>
          <span className="font-display text-[26px] font-bold leading-none text-app-ink">{tile.day}</span>
          <span className="mt-1 text-[11px] text-app-ink/65">{tile.weekday}</span>
        </div>
      )}
      <div className="min-w-0 flex-1 py-0.5">
        <p className="truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-app-ink/60">
          {listing.categoryLabel}
          <span aria-hidden="true"> · </span>
          {listing.regionLabel}
        </p>
        <h3 className="mt-0.5 font-display text-[17px] font-bold leading-snug text-app-ink">
          <Link href={listing.href} className={cn(STRETCH, 'hover:text-app-accent')}>
            {listing.name}
          </Link>
        </h3>
        <p className="mt-0.5 text-sm text-app-ink/85">{listing.nowLabel ?? listing.dateLabel}</p>
        <p className="truncate text-xs text-app-ink/65">{listing.place}</p>
      </div>
      <div className="relative z-10 flex shrink-0 flex-col items-end justify-between">
        <SaveButton target={saveTarget(listing)} />
        {listing.priceLabel && <span className="pb-1 pr-1 text-xs font-semibold text-app-ink">{listing.priceLabel}</span>}
      </div>
    </article>
  );
}

/** Compact row for lists beside the map and under detail pages. */
export function MiniCard({ listing }: { listing: Listing }) {
  return (
    <article className="relative flex items-center gap-3 rounded-2xl border border-app-line/10 bg-app-panel/70 p-2.5 transition-colors hover:border-app-line/30">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl">
        <Poster listing={listing} sizes="64px" iconSize="h-8 w-8" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-app-ink/60">{listing.categoryLabel}</p>
        <h3 className="truncate font-display text-[15px] font-bold text-app-ink">
          <Link href={listing.href} className={cn(STRETCH, 'hover:text-app-accent')}>
            {listing.name}
          </Link>
        </h3>
        <p className="truncate text-xs text-app-ink/70">{listing.dateLabel ?? listing.place}</p>
      </div>
    </article>
  );
}
