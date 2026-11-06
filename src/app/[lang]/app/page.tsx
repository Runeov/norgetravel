import type { Metadata } from 'next';
import { ChevronDown } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { localizeHref } from '@/lib/i18n-href';
import { asLocale, brandTitle } from '@/lib/i18n-seo';
import { appCopy } from '@/i18n/app-copy';
import { fmt, plural } from '@/i18n/format';
import { getFeed, parseFeedState } from '@/lib/app/feed';
import { PAGE_SIZE, feedHref, isFiltered } from '@/lib/app/model';
import { FeaturedCard, ListingCard, PostCard, cardText } from '@/components/modules/app/cards';
import { FilterRail, MobileFeedHeader, feedTabs } from '@/components/modules/app/FeedFilters';
import { InfoBanner } from '@/components/modules/app/InfoBanner';
import { SoonRail } from '@/components/modules/app/SoonRail';
import { SegmentedTabs } from '@/components/modules/app/ui';

type Params = Promise<{ lang: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params, searchParams }: { params: Params; searchParams: SearchParams }): Promise<Metadata> {
  const { lang } = await params;
  const copy = appCopy(lang);
  const state = parseFeedState(await searchParams);
  return {
    title: brandTitle(copy.meta.feed[state.tab], lang),
    description: copy.meta.feedDescription,
  };
}

export default async function AppFeedPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { lang } = await params;
  const copy = appCopy(lang);
  const state = parseFeedState(await searchParams);
  const feed = await getFeed(state, asLocale(lang));
  const action = localizeHref('/app/', lang);
  const filtered = isFiltered(state);
  const tab = copy.tabs[state.tab];
  const text = cardText(copy);

  return (
    <div className="mx-auto flex max-w-[884px] gap-4 px-4 lg:px-0 lg:pt-3">
      <div className="mx-auto w-full min-w-0 max-w-[600px] lg:mx-0">
        <h1 className="sr-only">{fmt(copy.feed.srTitle, { tab: tab.label })}</h1>
        <MobileFeedHeader feed={feed} action={action} copy={copy} />
        <SegmentedTabs label={copy.common.listingType} items={feedTabs(state, copy)} className="sticky top-3 z-20 hidden lg:flex" />
        <InfoBanner tab={state.tab} />

        {filtered && (
          <p className="mt-6 px-1 text-sm text-app-ink/80" aria-live="polite">
            <span className="font-semibold text-app-ink">{plural(tab.count, feed.total)}</span>
            {state.q && fmt(copy.common.matching, { q: state.q })}
            {feed.town && fmt(copy.common.inTown, { town: feed.town.name })}
          </p>
        )}

        {feed.featured && (
          <div className="mt-4">
            <FeaturedCard listing={feed.featured} text={text} />
          </div>
        )}
        {feed.soon.length > 0 && <SoonRail items={feed.soon} seeAllHref={feedHref(state, { when: 'next-90-days' })} />}

        {feed.items.length > 0 ? (
          <section aria-label={filtered ? copy.feed.results : fmt(copy.common.allOf, { noun: tab.noun })} className="mt-8 space-y-10">
            {feed.items.map((listing, i) =>
              listing.kind === 'events' ? (
                <PostCard key={listing.id} listing={listing} text={text} priority={i === 0 && !feed.featured} />
              ) : (
                <ListingCard key={`${listing.kind}-${listing.id}`} listing={listing} text={text} priority={i === 0} />
              )
            )}
          </section>
        ) : (
          !feed.featured && (
            <div className="mt-8 rounded-[20px] border border-app-line/15 bg-app-panel/85 p-8 text-center">
              <p className="font-display text-lg font-bold text-app-ink">{fmt(copy.common.noMatch, { noun: tab.noun })}</p>
              <p className="mt-1 text-sm text-app-ink/75">{copy.feed.removeFilter}</p>
              <Link
                href={feedHref(state, { cat: null, region: null, price: null, when: null, town: null, q: '' })}
                className="app-gold-fill mt-5 inline-flex min-h-[44px] items-center rounded-full px-5 text-sm font-semibold"
              >
                {copy.common.clearFilters}
              </Link>
            </div>
          )
        )}

        {feed.hasMore && (
          <div className="mt-10 flex justify-center">
            <Link
              href={feedHref(state, { limit: state.limit + PAGE_SIZE })}
              scroll={false}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-app-line/25 bg-app-panel/70 px-6 text-[15px] font-semibold text-app-ink hover:border-app-line/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
            >
              {fmt(copy.common.showMore, { noun: tab.noun })}
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>

      <aside aria-label={copy.feed.filters} className="hidden w-[268px] shrink-0 lg:block">
        <div className="app-rail sticky top-3 max-h-[calc(100vh-1.5rem)] overflow-y-auto pb-4">
          <FilterRail feed={feed} action={action} copy={copy} />
        </div>
      </aside>
    </div>
  );
}
