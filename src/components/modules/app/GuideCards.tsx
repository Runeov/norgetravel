import Image from 'next/image';
import { BookOpen, Clock } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { cn } from '@/lib/utils';
import type { GuideCard } from '@/lib/app/guides';
import { PhotoChip } from './cards';

const STRETCH =
  "after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-[20px] focus-visible:after:ring-2 focus-visible:after:ring-app-accent";

function GuideImage({ guide, sizes, priority = false }: { guide: GuideCard; sizes: string; priority?: boolean }) {
  return guide.imageUrl ? (
    <Image src={guide.imageUrl} alt={guide.imageAlt ?? guide.title} fill sizes={sizes} priority={priority} quality={75} className="object-cover" />
  ) : (
    <div className="absolute inset-0 bg-gradient-to-br from-app-raised to-app-panel" aria-hidden="true">
      <BookOpen className="absolute bottom-4 right-4 h-12 w-12 text-app-ink/20" strokeWidth={1.2} />
    </div>
  );
}

const Meta = ({ guide, light = false }: { guide: GuideCard; light?: boolean }) => (
  <p className={cn('flex flex-wrap items-center gap-x-2 text-xs', light ? 'text-white/85' : 'text-app-ink/65')}>
    <span className="inline-flex items-center gap-1">
      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
      {guide.readLabel}
    </span>
    <span aria-hidden="true">·</span>
    <span>{guide.regionLabel}</span>
    <span aria-hidden="true">·</span>
    <span>{guide.author}</span>
  </p>
);

/** Lead guide, drawn like the feed's lead card. */
export function FeaturedGuide({ guide }: { guide: GuideCard }) {
  return (
    <article className="relative overflow-hidden rounded-[20px] border border-app-line/15 bg-app-panel shadow-xl">
      <div className="relative aspect-[4/3]">
        <GuideImage guide={guide} sizes="(min-width: 1024px) 760px, 100vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" aria-hidden="true" />
        {/* Whole-card target for pointer users; the title link is the one in the tab order. */}
        <Link href={guide.href} tabIndex={-1} aria-hidden="true" className="absolute inset-0" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <div className="mb-3 flex gap-2">
            <PhotoChip>{guide.section.title}</PhotoChip>
          </div>
          <h2 lang={guide.lang} className="font-display text-[26px] font-bold leading-tight text-white sm:text-[30px]">
            <Link
              href={guide.href}
              className="pointer-events-auto rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
            >
              {guide.title}
            </Link>
          </h2>
          <p lang={guide.lang} className="mt-2 line-clamp-2 text-[15px] text-white/85">
            {guide.excerpt}
          </p>
          <div className="mt-3">
            <Meta guide={guide} light />
          </div>
        </div>
      </div>
    </article>
  );
}

/** Guide row: photo beside the text on wider screens, above it on phones. */
export function GuideRow({ guide }: { guide: GuideCard }) {
  return (
    <article className="relative flex flex-col gap-3 rounded-[20px] border border-app-line/10 bg-app-panel/70 p-3 transition-colors hover:border-app-line/30 sm:flex-row sm:items-center">
      <div className="relative aspect-[16/9] shrink-0 overflow-hidden rounded-2xl sm:aspect-[4/3] sm:w-44">
        <GuideImage guide={guide} sizes="(min-width: 640px) 176px, 100vw" />
      </div>
      <div className="min-w-0 px-1 pb-1 sm:py-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-app-accent">{guide.section.title}</p>
        <h3 lang={guide.lang} className="mt-0.5 font-display text-lg font-bold leading-snug text-app-ink">
          <Link href={guide.href} className={cn(STRETCH, 'hover:text-app-accent')}>
            {guide.title}
          </Link>
        </h3>
        <p lang={guide.lang} className="mt-1 line-clamp-2 text-sm text-app-ink/75">
          {guide.excerpt}
        </p>
        <div className="mt-2">
          <Meta guide={guide} />
        </div>
      </div>
    </article>
  );
}
