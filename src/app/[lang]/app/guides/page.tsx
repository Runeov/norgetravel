import type { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { localizeHref } from '@/lib/i18n-href';
import { asLocale, brandTitle } from '@/lib/i18n-seo';
import { appCopy } from '@/i18n/app-copy';
import { fmt, plural } from '@/i18n/format';
import { PAGE_SIZE } from '@/lib/app/model';
import { getGuides, guidesHref, parseGuidesState } from '@/lib/app/guides';
import { FeaturedGuide, GuideRow } from '@/components/modules/app/GuideCards';
import { Pill, SearchBox } from '@/components/modules/app/ui';

type Params = Promise<{ lang: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const copy = appCopy(lang);
  return { title: brandTitle(copy.meta.guides, lang), description: copy.meta.guidesDescription };
}

export default async function AppGuidesPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { lang } = await params;
  const copy = appCopy(lang);
  const text = copy.guides;
  const guides = await getGuides(parseGuidesState(await searchParams), asLocale(lang));
  const { state } = guides;
  const filtered = Boolean(state.section || state.region || state.q);

  return (
    <div className="mx-auto max-w-[760px] px-4 pt-8 lg:pt-10">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-app-accent">{text.eyebrow}</p>
        <h1 className="mt-1 font-display text-[30px] font-bold leading-tight text-app-ink sm:text-[34px]">{text.heading}</h1>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-app-ink/80">{text.intro}</p>
      </header>

      <SearchBox
        id="search-guides"
        action={localizeHref('/app/guides/', lang)}
        query={state.q}
        placeholder={text.search}
        hidden={state.section ? { section: state.section } : {}}
        className="mt-5"
      />

      <nav aria-label={text.sectionsNav} className="app-rail -mx-4 mt-4 flex gap-2 overflow-x-auto px-4">
        <Pill href={guidesHref(state, { section: null })} active={!state.section}>
          {text.all}
        </Pill>
        {guides.sections.map((s) => (
          <Pill
            key={s.value}
            href={guidesHref(state, { section: state.section === s.value ? null : s.value })}
            active={state.section === s.value}
            count={s.count}
          >
            {s.label}
          </Pill>
        ))}
      </nav>
      <nav aria-label={text.regionsNav} className="app-rail -mx-4 mt-2 flex gap-2 overflow-x-auto px-4">
        {guides.regions.map((r) => (
          <Pill
            key={r.value}
            href={guidesHref(state, { region: state.region === r.value ? null : r.value })}
            active={state.region === r.value}
            count={r.count}
          >
            {r.label}
          </Pill>
        ))}
      </nav>

      {filtered && (
        <p className="mt-5 px-1 text-sm text-app-ink/80" aria-live="polite">
          <span className="font-semibold text-app-ink">{plural(text.count, guides.total)}</span>
          {state.q && fmt(copy.common.matching, { q: state.q })}
        </p>
      )}

      {guides.featured && (
        <div className="mt-6">
          <FeaturedGuide guide={guides.featured} />
        </div>
      )}

      {guides.items.length > 0 ? (
        <ul className="mt-6 space-y-3">
          {guides.items.map((g) => (
            <li key={`${g.category}/${g.slug}`}>
              <GuideRow guide={g} />
            </li>
          ))}
        </ul>
      ) : (
        !guides.featured && (
          <div className="mt-8 rounded-[20px] border border-app-line/15 bg-app-panel/85 p-8 text-center">
            <p className="font-display text-lg font-bold text-app-ink">{fmt(copy.common.noMatch, { noun: text.noun })}</p>
            <Link
              href={guidesHref(state, { section: null, region: null, q: '' })}
              className="app-gold-fill mt-5 inline-flex min-h-[44px] items-center rounded-full px-5 text-sm font-semibold"
            >
              {text.showAll}
            </Link>
          </div>
        )
      )}

      {guides.hasMore && (
        <div className="mt-8 flex justify-center">
          <Link
            href={guidesHref(state, { limit: state.limit + PAGE_SIZE })}
            scroll={false}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-app-line/25 bg-app-panel/70 px-6 text-[15px] font-semibold text-app-ink hover:border-app-line/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
          >
            {fmt(copy.common.showMore, { noun: text.noun })}
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      )}
    </div>
  );
}
