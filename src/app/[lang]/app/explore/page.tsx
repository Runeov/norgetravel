import type { Metadata } from 'next';
import { ArrowRight, ChevronDown, MapPin, X } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { cn } from '@/lib/utils';
import { asLocale, brandTitle } from '@/lib/i18n-seo';
import { appCopy, type AppCopy } from '@/i18n/app-copy';
import { fmt, plural } from '@/i18n/format';
import { getExplore, parseExploreState, type ExploreResult } from '@/lib/app/feed';
import { APP_TABS, exploreHref } from '@/lib/app/model';
import { MAP_VIEWBOX } from '@/lib/app/towns';
import { norwayOutline, svalbardEdgeoya, svalbardNordaustlandet, svalbardSpitsbergen } from '@/data/norway-map-zones';
import { MiniCard } from '@/components/modules/app/cards';
import { categoryIcon } from '@/components/modules/app/category-style';
import { CategoryRow, Panel, Pill, SegmentedTabs } from '@/components/modules/app/ui';

type Params = Promise<{ lang: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const copy = appCopy(lang);
  return { title: brandTitle(copy.meta.explore, lang), description: copy.meta.exploreDescription };
}

// Pins grow with the number of listings, from 28 px to 44 px.
const pinSize = (count: number): number => Math.round(Math.min(44, 28 + Math.log2(count) * 2.2));

const LABELLED_PINS = 7;

function CategoryMenu({ explore, copy }: { explore: ExploreResult; copy: AppCopy }) {
  const { state } = explore;
  const active = explore.categories.flatMap((g) => g.options).find((o) => o.value === state.cat);
  return (
    <details className="group relative">
      <summary
        className={cn(
          'flex min-h-[38px] cursor-pointer list-none items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent [&::-webkit-details-marker]:hidden',
          active ? 'app-gold-fill border-transparent' : 'border-app-line/20 bg-app-panel/90 text-app-ink'
        )}
      >
        {active?.label ?? copy.explore.category}
        <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <Panel className="absolute left-0 top-full z-30 mt-2 max-h-[60vh] w-64 overflow-y-auto p-3">
        <div className="space-y-1.5">
          <CategoryRow
            href={exploreHref(state, { cat: null })}
            active={!state.cat}
            icon={<MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />}
          >
            {copy.common.all}
          </CategoryRow>
          {explore.categories.map((group) => (
            <div key={group.label ?? 'all'} className="space-y-1.5">
              {group.label && (
                <p className="px-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-app-ink/55">{group.label}</p>
              )}
              {group.options.map((o) => {
                const Icon = categoryIcon(o.value);
                return (
                  <CategoryRow
                    key={o.value}
                    href={exploreHref(state, { cat: state.cat === o.value ? null : o.value })}
                    active={state.cat === o.value}
                    count={o.count}
                    icon={<Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
                  >
                    {o.label}
                  </CategoryRow>
                );
              })}
            </div>
          ))}
        </div>
      </Panel>
    </details>
  );
}

function SelectedPanel({ explore, copy }: { explore: ExploreResult; copy: AppCopy }) {
  const { state, selected } = explore;
  const tab = copy.tabs[state.tab];
  const text = copy.explore;
  if (!selected) {
    return (
      <Panel className="p-5">
        <h2 className="font-display text-lg font-bold text-app-ink">{text.pick}</h2>
        <p className="mt-1 text-sm text-app-ink/75">{fmt(text.pickBody, { noun: tab.noun })}</p>
        <ul className="mt-4 space-y-1.5">
          {explore.pins.slice(0, 8).map((pin) => (
            <li key={pin.id}>
              <Link
                href={exploreHref(state, { pin: pin.id })}
                scroll={false}
                className="flex min-h-[44px] items-center justify-between rounded-xl border border-app-line/10 px-3.5 text-[15px] text-app-ink hover:border-app-line/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
              >
                <span>
                  {pin.name}
                  {pin.towns.length > 1 && <span className="text-app-ink/60">{text.andNearby}</span>}
                </span>
                <span className="text-sm text-app-ink/65">{pin.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Panel>
    );
  }

  const { pin, town } = selected;
  return (
    <Panel className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold text-app-ink">
            {town?.name ?? pin.name}
            {!town && pin.towns.length > 1 && <span className="font-medium text-app-ink/70">{text.andNearby}</span>}
          </h2>
          <p className="text-sm text-app-ink/70">{plural(tab.count, selected.total)}</p>
        </div>
        <Link
          href={exploreHref(state, { pin: null })}
          scroll={false}
          aria-label={copy.common.close}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-app-ink/75 hover:bg-app-ink/10 hover:text-app-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {pin.towns.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          <Pill href={exploreHref(state, { pin: pin.id, town: null })} active={!town}>
            {copy.common.all}
          </Pill>
          {pin.towns.map((t) => (
            <Pill
              key={t.value}
              href={exploreHref(state, { pin: pin.id, town: t.value })}
              active={town?.id === t.value}
              count={t.count}
            >
              {t.label}
            </Pill>
          ))}
        </div>
      )}

      <ul className="mt-4 space-y-2">
        {selected.items.map((l) => (
          <li key={`${l.kind}-${l.id}`}>
            <MiniCard listing={l} />
          </li>
        ))}
      </ul>
      {selected.feedHref && (
        <Link
          href={selected.feedHref}
          className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-app-accent hover:underline"
        >
          {selected.total > selected.items.length ? fmt(text.seeAllFeed, { n: selected.total }) : text.openFeed}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </Panel>
  );
}

export default async function ExplorePage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { lang } = await params;
  const copy = appCopy(lang);
  const explore = await getExplore(parseExploreState(await searchParams), asLocale(lang));
  const { state } = explore;
  const tab = copy.tabs[state.tab];
  const tabs = APP_TABS.map((t) => ({ href: exploreHref(state, { tab: t }), label: copy.tabs[t].label, active: t === state.tab }));
  const labelled = new Set(explore.pins.slice(0, LABELLED_PINS).map((p) => p.id));
  const vb = MAP_VIEWBOX;

  return (
    <div className="px-4 pt-4 lg:px-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section
          aria-labelledby="explore-heading"
          className="relative overflow-hidden rounded-[20px] border border-app-line/15 bg-app-panel/80 shadow-xl backdrop-blur"
        >
          <div className="relative z-20 flex flex-wrap items-center gap-2 p-3">
            <h1 id="explore-heading" className="mr-auto px-1 font-display text-lg font-bold text-app-ink">
              {copy.explore.heading}
            </h1>
            <CategoryMenu explore={explore} copy={copy} />
            {explore.prices.map((p) => (
              <Pill
                key={p.value}
                href={exploreHref(state, { price: state.price === p.value ? null : p.value })}
                active={state.price === p.value}
                count={p.count}
              >
                {p.label}
              </Pill>
            ))}
          </div>

          <div className="relative mx-auto aspect-[460/950] h-[min(76vh,900px)] max-w-full">
            <svg
              viewBox={`${vb.x} ${vb.y} ${vb.width} ${vb.height}`}
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label={copy.explore.map}
            >
              <path d={norwayOutline} className="fill-app-raised stroke-app-line/30" strokeWidth={1} />
              <g transform="translate(30, -110) scale(0.55)">
                {[svalbardSpitsbergen, svalbardNordaustlandet, svalbardEdgeoya].map((d) => (
                  <path key={d.slice(0, 12)} d={d} className="fill-app-raised stroke-app-line/30" strokeWidth={1.6} />
                ))}
              </g>
              <text x={8} y={-92} className="fill-app-ink/50 text-[11px] font-semibold uppercase tracking-widest">
                {copy.explore.svalbard}
              </text>
            </svg>

            {/* Pins are links laid over the outline, so each has a real tap area and focus ring. */}
            <ol aria-label={fmt(copy.explore.towns, { noun: tab.noun })} className="absolute inset-0">
              {explore.pins.map((pin) => {
                const size = pinSize(pin.count);
                const active = state.pin === pin.id;
                const nearby = pin.towns.length - 1;
                return (
                  <li
                    key={pin.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${pin.left}%`, top: `${pin.top}%`, zIndex: active ? 20 : 10 }}
                  >
                    <Link
                      href={exploreHref(state, { pin: active ? null : pin.id })}
                      scroll={false}
                      aria-current={active ? 'true' : undefined}
                      aria-label={
                        nearby > 0
                          ? plural(copy.explore.pinNearby, nearby, { name: pin.name, count: plural(tab.count, pin.count) })
                          : fmt(copy.explore.pin, { name: pin.name, count: plural(tab.count, pin.count) })
                      }
                      className={cn(
                        "relative flex items-center justify-center rounded-full border-2 text-xs font-bold shadow-lg transition-transform after:absolute after:-inset-2 after:content-[''] hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-ink",
                        active ? 'app-gold-fill border-app-ink' : 'border-app-gold bg-app-bg text-app-accent'
                      )}
                      style={{ width: size, height: size }}
                    >
                      {pin.count}
                    </Link>
                    {(labelled.has(pin.id) || active) && (
                      <span
                        className="pointer-events-none absolute left-full top-1/2 ml-1.5 -translate-y-1/2 whitespace-nowrap rounded-md bg-app-bg/80 px-1.5 py-0.5 text-[11px] font-semibold text-app-ink"
                        aria-hidden="true"
                      >
                        {pin.name}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative z-20 flex flex-col items-center gap-2 p-3">
            <SegmentedTabs label={copy.common.listingType} items={tabs} className="w-full max-w-sm" />
            <p className="text-xs text-app-ink/60">
              {fmt(copy.explore.placed, { placed: explore.total - explore.unplaced, total: plural(tab.count, explore.total) })}
              {explore.unplaced > 0 && copy.explore.unplaced}
            </p>
          </div>
        </section>

        <aside aria-label={copy.explore.selected}>
          <div className="lg:sticky lg:top-4">
            <SelectedPanel explore={explore} copy={copy} />
          </div>
        </aside>
      </div>
    </div>
  );
}
