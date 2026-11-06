import type { Metadata } from 'next';
import { ArrowRight, Radio } from 'lucide-react';
import Link from '@/components/LocalizedLink';
import { asLocale, brandTitle } from '@/lib/i18n-seo';
import { appCopy } from '@/i18n/app-copy';
import { fmt, plural } from '@/i18n/format';
import { getCalendar, parseCalendarState } from '@/lib/app/feed';
import { DEFAULT_FEED, calendarHref, feedHref, type Listing } from '@/lib/app/model';
import { CalendarRow } from '@/components/modules/app/cards';
import { Pill } from '@/components/modules/app/ui';

type Params = Promise<{ lang: string }>;
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ params, searchParams }: { params: Params; searchParams: SearchParams }): Promise<Metadata> {
  const { lang } = await params;
  const copy = appCopy(lang);
  const state = parseCalendarState(await searchParams);
  return { title: brandTitle(copy.calendar.windows[state.window].heading, lang), description: copy.calendar.description };
}

function Group({ id, title, items, live = false }: { id: string; title: string; items: Listing[]; live?: boolean }) {
  return (
    <section aria-labelledby={id} className="mt-8">
      <h2 id={id} className="mb-3 flex items-center gap-2 px-1 font-display text-lg font-bold text-app-ink">
        {live && <Radio className="h-4 w-4 text-app-accent" aria-hidden="true" />}
        {title}
        <span className="rounded-full bg-app-panel/80 px-2 py-0.5 text-xs font-semibold text-app-ink/70">{items.length}</span>
      </h2>
      <ul className="space-y-2.5">
        {items.map((listing) => (
          <li key={listing.id}>
            <CalendarRow listing={listing} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * The events calendar inside the app: every listed event by date, on now
 * first and then by start month, with the season windows and regions as
 * filters. It replaces the site's /travel/events pages for app visitors.
 */
export default async function AppCalendarPage({ params, searchParams }: { params: Params; searchParams: SearchParams }) {
  const { lang } = await params;
  const copy = appCopy(lang);
  const text = copy.calendar;
  const calendar = await getCalendar(parseCalendarState(await searchParams), asLocale(lang));
  const { state } = calendar;
  const window = text.windows[state.window];

  return (
    <div className="mx-auto max-w-[760px] px-4 pt-8 lg:pt-10">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-app-accent">{copy.nav.calendar}</p>
        <h1 className="mt-1 font-display text-[30px] font-bold leading-tight text-app-ink sm:text-[34px]">{window.heading}</h1>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-app-ink/80">{window.intro}</p>
        <p className="mt-3 text-sm font-semibold text-app-ink" aria-live="polite">
          {plural(text.count, calendar.total)}
        </p>
      </header>

      <nav aria-label={text.windowsNav} className="app-rail -mx-4 mt-5 flex gap-2 overflow-x-auto px-4">
        {calendar.windows.map((w) => (
          <Pill key={w.value} href={calendarHref(state, { window: w.value })} active={state.window === w.value} count={w.count}>
            {w.label}
          </Pill>
        ))}
      </nav>
      <nav aria-label={text.regionsNav} className="app-rail -mx-4 mt-2 flex gap-2 overflow-x-auto px-4">
        <Pill href={calendarHref(state, { region: null })} active={!state.region}>
          {copy.filters.allNorway}
        </Pill>
        {calendar.regions.map((r) => (
          <Pill
            key={r.value}
            href={calendarHref(state, { region: state.region === r.value ? null : r.value })}
            active={state.region === r.value}
            count={r.count}
          >
            {r.label}
          </Pill>
        ))}
      </nav>

      {calendar.total > 0 ? (
        <>
          {calendar.onNow.length > 0 && <Group id="calendar-now" title={text.onNow} items={calendar.onNow} live />}
          {calendar.months.map((month) => (
            <Group key={month.key} id={`calendar-${month.key}`} title={month.label} items={month.items} />
          ))}
        </>
      ) : (
        <div className="mt-8 rounded-[20px] border border-app-line/15 bg-app-panel/85 p-6">
          <p className="text-[15px] text-app-ink/90">
            {calendar.next
              ? fmt(window.empty, { name: calendar.next.name, date: calendar.next.dateLabel ?? '' })
              : text.windows.upcoming.empty}
          </p>
          {calendar.next && (
            <Link
              href={calendar.next.href}
              className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-app-accent hover:underline"
            >
              {text.seeNext}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      )}

      <section className="mt-12 flex flex-col gap-4 rounded-[20px] border border-app-line/15 bg-app-panel/85 p-6">
        <div>
          <h2 className="font-display text-xl font-bold text-app-ink">{text.planTitle}</h2>
          <p className="mt-1 text-sm text-app-ink/75">{text.planBody}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/app/plan/" className="app-gold-fill inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 text-sm font-semibold">
            {text.planCta}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href={feedHref({ ...DEFAULT_FEED, tab: 'places', region: state.region })}
            className="inline-flex min-h-[44px] items-center rounded-full border border-app-line/25 px-5 text-sm font-semibold text-app-ink hover:border-app-line/50"
          >
            {text.staysCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
