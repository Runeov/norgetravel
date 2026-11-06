import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, Clock, Languages, Map as MapIcon, Route, User } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { asLocale, brandTitle } from '@/lib/i18n-seo';
import { appCopy } from '@/i18n/app-copy';
import { fmt } from '@/i18n/format';
import { getGuide } from '@/lib/app/guides';
import { GuideRow } from '@/components/modules/app/GuideCards';
import { ShareButton } from '@/components/modules/app/ShareButton';

type Params = Promise<{ lang: string; category: string; slug: string }>;

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, category, slug } = await params;
  const guide = await getGuide(category, slug, asLocale(lang));
  return guide ? { title: brandTitle(guide.card.title, lang), description: guide.card.excerpt } : {};
}

// The app's reading style. Stored HTML also carries the site's light classes;
// app-theme.css maps those inside .app-article.
const PROSE = [
  'app-article prose prose-lg max-w-none',
  'prose-headings:font-display prose-headings:font-bold prose-headings:text-app-ink',
  'prose-h2:mb-5 prose-h2:mt-14 prose-h2:text-[28px] prose-h3:mt-10 prose-h3:text-xl',
  'prose-p:leading-relaxed prose-p:text-app-ink/85 prose-li:text-app-ink/85 prose-li:marker:text-app-accent',
  'prose-a:font-medium prose-a:text-app-accent prose-a:no-underline hover:prose-a:underline',
  'prose-strong:text-app-ink prose-blockquote:border-l-app-gold prose-blockquote:text-app-ink/80',
  'prose-img:rounded-[20px] prose-hr:border-app-line/20 prose-th:text-app-ink prose-td:border-app-line/20',
  'prose-figcaption:text-app-ink/60',
].join(' ');

export default async function AppGuidePage({ params }: { params: Params }) {
  const { lang, category, slug } = await params;
  const guide = await getGuide(category, slug, asLocale(lang));
  if (!guide) notFound();
  const copy = appCopy(lang);
  const text = copy.guides;
  const { card } = guide;
  const date = new Intl.DateTimeFormat(copy.dates.intl, { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <article className="mx-auto max-w-[760px] px-4 pt-6 lg:pt-10">
      <div className="flex items-center justify-between">
        <Link
          href="/app/guides/"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full pr-3 text-sm font-medium text-app-ink/80 hover:text-app-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {text.back}
        </Link>
        <ShareButton href={card.href} title={card.title} />
      </div>

      <header className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-app-accent">
          {card.section.title} · {card.regionLabel}
        </p>
        <h1 lang={card.lang} className="mt-2 font-display text-[32px] font-bold leading-tight text-app-ink sm:text-[40px]">
          {card.title}
        </h1>
        {guide.subtitle && (
          <p lang={card.lang} className="mt-3 text-xl font-medium text-app-ink/80">
            {guide.subtitle}
          </p>
        )}
        <p lang={card.lang} className="mt-3 text-lg leading-relaxed text-app-ink/80">
          {card.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-app-line/15 pt-4 text-sm text-app-ink/70">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-4 w-4" aria-hidden="true" />
            {card.author}
          </span>
          {guide.publishedAt && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={guide.publishedAt}>{date.format(new Date(guide.publishedAt))}</time>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {card.readLabel}
          </span>
        </div>
        {guide.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {guide.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-app-line/20 px-2.5 py-0.5 text-xs text-app-ink/75">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      {guide.hero && (
        <figure className="mt-8">
          {guide.hero.kind === 'video' ? (
            <video src={guide.hero.src} autoPlay muted loop playsInline className="w-full rounded-[20px]" />
          ) : (
            <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] border border-app-line/15">
              <Image src={guide.hero.src} alt={guide.hero.alt} fill priority sizes="(min-width: 1024px) 760px, 100vw" className="object-cover" />
            </div>
          )}
          {guide.hero.kind === 'image' && guide.hero.caption && (
            <figcaption className="mt-2 text-xs text-app-ink/60">{guide.hero.caption}</figcaption>
          )}
        </figure>
      )}

      <div className="mt-8">
        {guide.englishNotice && (
          <p className="mb-6 flex items-start gap-2.5 rounded-2xl border border-app-gold/40 bg-app-gold/10 px-4 py-3 text-sm text-app-ink/90">
            <Languages className="mt-0.5 h-4 w-4 shrink-0 text-app-accent" aria-hidden="true" />
            {guide.englishNotice}
          </p>
        )}
        <div
          lang={guide.bodyLang}
          data-analytics-placement="article_body"
          className={PROSE}
          dangerouslySetInnerHTML={{ __html: guide.before }}
        />
        {guide.planner && (
          <aside className="my-8 flex flex-col gap-4 rounded-[20px] border border-app-gold/40 bg-app-panel/85 p-5 sm:flex-row sm:items-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-app-raised text-app-accent" aria-hidden="true">
              <MapIcon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-app-ink">{text.planThis}</p>
              <p className="text-sm text-app-ink/75">{fmt(text.plannerBody, { regions: guide.planner.regions })}</p>
            </div>
            <Link href={guide.planner.href} className="app-gold-fill inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full px-5 text-sm font-semibold">
              {text.openPlanner}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </aside>
        )}
        {guide.after && (
          <div
            lang={guide.bodyLang}
            data-analytics-placement="article_body"
            className={PROSE}
            dangerouslySetInnerHTML={{ __html: guide.after }}
          />
        )}
      </div>

      <section className="mt-12 flex flex-col gap-4 rounded-[20px] border border-app-line/15 bg-app-panel/85 p-6 sm:flex-row sm:items-center">
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl font-bold text-app-ink">{fmt(text.planRegion, { region: card.regionLabel })}</h2>
          <p className="mt-1 text-sm text-app-ink/75">{text.planRegionBody}</p>
        </div>
        <Link href={guide.planHref} className="app-gold-fill inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full px-5 text-sm font-semibold">
          <Route className="h-4 w-4" aria-hidden="true" />
          {text.openPlanner}
        </Link>
      </section>

      {guide.related.length > 0 && (
        <section aria-labelledby="related-guides" className="mt-12">
          <h2 id="related-guides" className="mb-4 font-display text-xl font-bold text-app-ink">
            {fmt(text.moreSection, { section: card.section.title.toLowerCase() })}
          </h2>
          <ul className="space-y-3">
            {guide.related.map((g) => (
              <li key={`${g.category}/${g.slug}`}>
                <GuideRow guide={g} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
