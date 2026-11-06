import Link from '@/components/LocalizedLink';
import { ArrowRight } from 'lucide-react';
import { eventAnchor, matchesRegion, windowPath, type CalendarEvent } from '@/lib/event-calendar';
import type { Destination } from '@/lib/schemas/travel.shared';
import type { HomeCopy } from '@/i18n/home-copy';
import { EventRowLink, type EventRowUi } from '@/components/modules/events/EventRow';

const REGIONS = ['northern-norway', 'lofoten', 'fjords', 'svalbard'] as const;

interface WhatsOnProps {
  copy: HomeCopy['whatsOn'];
  /** Upcoming events in start order, from buildCalendar */
  events: CalendarEvent[];
  ui: EventRowUi;
  regionNames: Record<Destination, string>;
}

/**
 * Homepage feed of what is on now and what starts next, with region links
 * into the filtered calendar. Each card links to its event in the calendar.
 */
export default function WhatsOn({ copy, events, ui, regionNames }: WhatsOnProps) {
  if (events.length === 0) return null;

  const onNow = events.filter((e) => e.onNow);
  const comingUp = events.filter((e) => !e.onNow);
  const regions = REGIONS.map((region) => ({
    region,
    count: events.filter((e) => matchesRegion(e, region)).length,
  })).filter((r) => r.count > 0);

  const calendar = windowPath('upcoming');

  const feed = (heading: string, items: CalendarEvent[], total: number, columns: boolean) => (
    <div>
      <h3 className="mb-4 flex items-center gap-3 text-lg font-bold text-[#1A365D]">
        {heading}
        <span className="rounded-sm bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">{total}</span>
      </h3>
      <ul className={columns ? 'grid gap-4 md:grid-cols-2' : 'grid gap-4'}>
        {items.map((event) => (
          <li key={event.id}>
            <EventRowLink
              href={`${calendar}#${eventAnchor(event.id)}`}
              event={event}
              ui={ui}
              regionName={regionNames[event.destination]}
              headingLevel="h4"
              className="h-full"
            />
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section aria-labelledby="whats-on-heading" className="bg-slate-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <h2 id="whats-on-heading" className="mb-2 text-3xl font-bold text-[#1A365D] md:text-4xl">
              {copy.heading}
            </h2>
            <p className="max-w-2xl text-lg text-slate-600">{copy.intro}</p>
          </div>
          <Link
            href={calendar}
            className="hidden min-h-[44px] shrink-0 items-center gap-2 text-sm font-semibold text-[#1A365D] hover:underline sm:inline-flex"
          >
            {copy.seeAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {onNow.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-2">
            {feed(copy.onNow, onNow.slice(0, 3), onNow.length, false)}
            {feed(copy.comingUp, comingUp.slice(0, 3), comingUp.length, false)}
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-slate-600">{copy.nothingOn}</p>
            {feed(copy.comingUp, comingUp.slice(0, 4), comingUp.length, true)}
          </>
        )}

        {regions.length > 1 && (
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-slate-600">{copy.byRegion}</span>
            {regions.map(({ region, count }) => (
              <Link
                key={region}
                href={`${calendar}?region=${region}`}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition-colors hover:border-[#1A365D] hover:text-[#1A365D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A365D] focus-visible:ring-offset-2"
              >
                {regionNames[region]}
                <span className="text-xs text-slate-500">{count}</span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 sm:hidden">
          <Link
            href={calendar}
            className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#1A365D]"
          >
            {copy.seeAll}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
