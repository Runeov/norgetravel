import { CalendarDays, LayoutGrid, MapPin, SlidersHorizontal, X } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { cn } from '@/lib/utils';
import type { AppCopy } from '@/i18n/app-copy';
import { APP_TABS, calendarHref, feedHref, isFiltered, type FeedState } from '@/lib/app/model';
import type { FeedResult } from '@/lib/app/feed';
import { categoryIcon } from './category-style';
import { NorgeMark } from './NorgeMark';
import { CategoryRow, Panel, Pill, SearchBox, SegmentedTabs } from './ui';

export function feedTabs(state: FeedState, copy: AppCopy) {
  return APP_TABS.map((tab) => ({
    href: feedHref(state, { tab }),
    label: copy.tabs[tab].label,
    active: tab === state.tab,
  }));
}

const searchHidden = (state: FeedState): Record<string, string> => (state.tab === 'events' ? {} : { tab: state.tab });

/** "What's on" window chips for the events tab. */
function WindowPills({ feed, className }: { feed: FeedResult; className?: string }) {
  if (feed.windows.length === 0) return null;
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {feed.windows.map((w) => (
        <Pill
          key={w.value}
          href={feedHref(feed.state, { when: feed.state.when === w.value ? null : w.value })}
          active={feed.state.when === w.value}
          count={w.count}
        >
          {w.label}
        </Pill>
      ))}
    </div>
  );
}

function CategoryList({ feed, copy }: { feed: FeedResult; copy: AppCopy }) {
  const { state } = feed;
  return (
    <div className="space-y-1.5">
      <CategoryRow
        href={feedHref(state, { cat: null })}
        active={!state.cat}
        icon={<MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />}
      >
        {copy.common.all}
      </CategoryRow>
      {feed.categories.map((group) => (
        <div key={group.label ?? 'all'} className="space-y-1.5">
          {group.label && (
            <p className="px-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-app-ink/55">{group.label}</p>
          )}
          {group.options.map((option) => {
            const Icon = categoryIcon(option.value);
            return (
              <CategoryRow
                key={option.value}
                href={feedHref(state, { cat: state.cat === option.value ? null : option.value })}
                active={state.cat === option.value}
                count={option.count}
                icon={<Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
              >
                {option.label}
              </CategoryRow>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function RegionAndPrice({ feed, copy }: { feed: FeedResult; copy: AppCopy }) {
  const { state } = feed;
  const { filters } = copy;
  return (
    <div className="space-y-4">
      <div>
        <h3 className="mb-2 font-display text-[15px] font-medium text-app-ink">{filters.region}</h3>
        <div className="flex flex-wrap gap-2">
          <Pill href={feedHref(state, { region: null })} active={!state.region}>
            {filters.allNorway}
          </Pill>
          {feed.regions.map((r) => (
            <Pill
              key={r.value}
              href={feedHref(state, { region: state.region === r.value ? null : r.value })}
              active={state.region === r.value}
              count={r.count}
            >
              {r.label}
            </Pill>
          ))}
        </div>
      </div>
      {feed.prices.length > 0 && (
        <div>
          <h3 className="mb-2 font-display text-[15px] font-medium text-app-ink">{filters.price}</h3>
          <div className="flex flex-wrap gap-2">
            {feed.prices.map((p) => (
              <Pill
                key={p.value}
                href={feedHref(state, { price: state.price === p.value ? null : p.value })}
                active={state.price === p.value}
                count={p.count}
              >
                {p.label}
              </Pill>
            ))}
          </div>
        </div>
      )}
      {feed.town && (
        <div>
          <h3 className="mb-2 font-display text-[15px] font-medium text-app-ink">{filters.town}</h3>
          <Pill href={feedHref(state, { town: null })} active>
            {feed.town.name}
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">{filters.removeTown}</span>
          </Pill>
        </div>
      )}
    </div>
  );
}

/** Desktop right rail: search, what's on, categories and the other filters. */
/** Link from the feed's "What's on" chips to the full calendar screen. */
function CalendarLink({ copy, className }: { copy: AppCopy; className?: string }) {
  return (
    <Link
      href={calendarHref()}
      className={cn(
        'inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-app-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent',
        className
      )}
    >
      <CalendarDays className="h-4 w-4" aria-hidden="true" />
      {copy.detail.more.calendar}
    </Link>
  );
}

export function FilterRail({ feed, action, copy }: { feed: FeedResult; action: string; copy: AppCopy }) {
  const { state } = feed;
  return (
    <div className="space-y-3">
      <SearchBox id="search-rail" action={action} query={state.q} placeholder={copy.tabs[state.tab].search} hidden={searchHidden(state)} />
      <Panel className="p-3.5">
        {state.tab === 'events' && (
          <>
            <h2 className="px-1 font-display text-[17px] font-bold text-app-ink">{copy.filters.whatsOn}</h2>
            <WindowPills feed={feed} className="mt-2.5" />
            <CalendarLink copy={copy} className="mt-1 px-1" />
            <div className="my-3.5 border-t border-app-line/15" />
          </>
        )}
        <h2 className="mb-2.5 px-1 font-display text-[13px] font-medium text-app-ink/80">{copy.filters.categories}</h2>
        <CategoryList feed={feed} copy={copy} />
      </Panel>
      <Panel className="p-4">
        <RegionAndPrice feed={feed} copy={copy} />
      </Panel>
      {isFiltered(state) && (
        <Link
          href={feedHref(state, { cat: null, region: null, price: null, when: null, town: null, q: '' })}
          className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl border border-app-line/25 text-[15px] font-semibold text-app-ink hover:border-app-line/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
        >
          <X className="h-4 w-4" aria-hidden="true" />
          {copy.common.clearFilters}
        </Link>
      )}
    </div>
  );
}

/** Phone header, as on EVE's app: brand over the photo, search, tabs, category icons and quick chips. */
export function MobileFeedHeader({ feed, action, copy }: { feed: FeedResult; action: string; copy: AppCopy }) {
  const { state } = feed;
  const options = feed.categories.flatMap((g) => g.options);
  return (
    <div className="lg:hidden">
      <div className="flex flex-col items-center pb-5 pt-9 text-center">
        <NorgeMark height={58} />
        <p className="mt-3 font-display text-[22px] font-medium tracking-[0.4em] text-app-ink">{copy.feed.brand}</p>
        <p className="mt-1 text-[11px] font-medium tracking-[0.3em] text-app-ink/85">{copy.feed.strap}</p>
      </div>
      <SearchBox
        id="search-phone"
        action={action}
        query={state.q}
        placeholder={state.tab === 'events' ? copy.feed.searchPhone : copy.tabs[state.tab].search}
        hidden={searchHidden(state)}
      />
      <SegmentedTabs label={copy.common.listingType} items={feedTabs(state, copy)} className="mt-4" />

      <nav aria-label={copy.filters.categories} className="app-rail -mx-4 mt-4 flex gap-1 overflow-x-auto px-4">
        {[{ value: null, label: copy.common.all, count: undefined }, ...options].map((option) => {
          const active = option.value === null ? !state.cat : state.cat === option.value;
          const Icon = option.value === null ? LayoutGrid : categoryIcon(option.value);
          const disabled = option.count === 0 && !active;
          const body = (
            <>
              <span
                className={cn(
                  'flex h-[50px] w-[50px] items-center justify-center rounded-full border transition-colors',
                  active ? 'border-app-gold bg-app-gold/15 text-app-accent' : 'border-app-line/25 bg-app-panel/60 text-app-ink'
                )}
              >
                <Icon className="h-[22px] w-[22px]" aria-hidden="true" />
              </span>
              <span className="line-clamp-2 min-h-[2.4em] text-[11.5px] font-medium leading-tight">{option.label}</span>
            </>
          );
          const cls = 'flex w-[68px] shrink-0 flex-col items-center gap-1 rounded-xl py-1 text-center';
          return disabled ? (
            <span key={option.label} aria-disabled="true" className={cn(cls, 'opacity-40')}>
              {body}
            </span>
          ) : (
            <Link
              key={option.label}
              href={feedHref(state, { cat: option.value === null || active ? null : option.value })}
              scroll={false}
              aria-current={active ? 'true' : undefined}
              className={cn(cls, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent', active ? 'text-app-accent' : 'text-app-ink/90')}
            >
              {body}
            </Link>
          );
        })}
      </nav>

      <WindowPills feed={feed} className="app-rail -mx-4 mt-3 flex-nowrap overflow-x-auto px-4" />
      {state.tab === 'events' && <CalendarLink copy={copy} className="mt-1 px-1" />}

      <details className="group mt-3">
        <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-center gap-2 rounded-2xl border border-app-line/25 bg-app-panel/60 text-[15px] font-semibold text-app-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent [&::-webkit-details-marker]:hidden">
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          {copy.filters.allFilters}
          {isFiltered(state) && <span className="rounded-full bg-app-gold px-2 text-xs text-app-on-gold">{copy.filters.on}</span>}
        </summary>
        <Panel className="mt-2 p-4">
          <RegionAndPrice feed={feed} copy={copy} />
          {isFiltered(state) && (
            <Link
              href={feedHref(state, { cat: null, region: null, price: null, when: null, town: null, q: '' })}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-app-accent"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              {copy.common.clearFilters}
            </Link>
          )}
        </Panel>
      </details>
    </div>
  );
}
