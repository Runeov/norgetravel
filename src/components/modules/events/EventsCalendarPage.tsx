import Link from '@/components/LocalizedLink';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { eventsStore } from '@/lib/admin/travel-events';
import {
  CALENDAR_WINDOWS,
  buildCalendar,
  eventAnchor,
  osloToday,
  windowPath,
  windowRoute,
  type CalendarEvent,
  type CalendarWindow,
} from '@/lib/event-calendar';
import { localeUrl } from '@/lib/i18n-seo';
import { getSiteUrl } from '@/lib/site-url';
import { CALENDAR_COPY, EVENT_UI, eventRegionNames } from '@/i18n/events-copy';
import { EventsAgenda } from './EventsAgenda';

// The calendar pages are English only, like the rest of /travel. Under /zh/
// and /ja/ they serve this copy and canonicalise to the English URL.
const LOCALE = 'en';

/**
 * schema.org Event list for search and answer engines, from the same entries
 * the page shows. URLs point at the English page, which is the canonical one.
 */
function eventListJsonLd(events: CalendarEvent[], window: CalendarWindow, heading: string) {
  const page = localeUrl('en', windowRoute(window));
  const absolute = (src: string) => (/^https?:\/\//.test(src) ? src : `${getSiteUrl()}${src.startsWith('/') ? '' : '/'}${src}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: heading,
    url: page,
    itemListElement: events.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: event.name,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate ?? event.startDate,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        location: { '@type': 'Place', name: event.venue ?? event.location, address: `${event.location}, Norway` },
        url: `${page}#${eventAnchor(event.id)}`,
        ...(event.imageUrl && { image: absolute(event.imageUrl) }),
        ...(event.isFree && {
          isAccessibleForFree: true,
          offers: { '@type': 'Offer', price: 0, priceCurrency: 'NOK', ...(event.ticketUrl && { url: event.ticketUrl }) },
        }),
      },
    })),
  };
}

/**
 * Events calendar for one window: breadcrumb, heading, window tabs, then the
 * list grouped into "On now" and start months.
 */
export async function EventsCalendarPage({ window }: { window: CalendarWindow }) {
  const today = osloToday();
  const ui = EVENT_UI[LOCALE];
  const copy = CALENDAR_COPY[window];
  const published = await eventsStore.getPublished();
  const events = buildCalendar(published, { window, locale: LOCALE, ui, today });
  const next = events.length === 0 ? buildCalendar(published, { window: 'upcoming', locale: LOCALE, ui, today })[0] : undefined;

  return (
    <div className="min-h-screen bg-slate-50">
      {events.length > 0 && (
        <script
          type="application/ld+json"
          // Escaped so text in the data cannot close the script element
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListJsonLd(events, window, copy.heading)).replace(/</g, '\\u003c') }}
        />
      )}
      {/* Dark header under the transparent navbar, like the other /travel and /plan pages */}
      <header className="-mt-20 bg-[#1A365D] pt-20 text-white">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-white hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                <Link href="/travel/" className="hover:text-white hover:underline">
                  Travel
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </li>
              <li>
                {window === 'upcoming' ? (
                  <span aria-current="page">Events</span>
                ) : (
                  <Link href={windowPath('upcoming')} className="hover:text-white hover:underline">
                    Events
                  </Link>
                )}
              </li>
              {window !== 'upcoming' && (
                <>
                  <li aria-hidden="true">
                    <ChevronRight className="h-4 w-4" />
                  </li>
                  <li>
                    <span aria-current="page">{copy.tab}</span>
                  </li>
                </>
              )}
            </ol>
          </nav>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl">{copy.heading}</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-slate-300">{copy.intro}</p>
          <p className="mt-3 text-sm font-medium text-slate-200">
            {events.length === 1 ? '1 event listed' : `${events.length} events listed`}
          </p>

          <nav aria-label="Event dates" className="mt-6 flex flex-wrap gap-x-1">
            {CALENDAR_WINDOWS.map((w) => (
              <Link
                key={w}
                href={windowPath(w)}
                aria-current={w === window ? 'page' : undefined}
                className={cn(
                  'inline-flex min-h-[44px] shrink-0 items-center border-b-2 px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white',
                  w === window
                    ? 'border-[#00D084] text-white'
                    : 'border-transparent text-slate-300 hover:border-slate-400 hover:text-white'
                )}
              >
                {CALENDAR_COPY[w].tab}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {events.length > 0 ? (
          <EventsAgenda
            events={events}
            ui={{ onNow: ui.onNow, free: ui.free, tickets: ui.tickets, newTab: ui.newTab }}
            regionNames={eventRegionNames(LOCALE)}
            typeNames={ui.types}
          />
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-8">
            <p className="text-slate-800">
              {next ? copy.empty.replace('{name}', next.name).replace('{date}', next.dateLabel) : CALENDAR_COPY.upcoming.empty}
            </p>
            {next && (
              <Link
                href={`${windowPath('upcoming')}#${eventAnchor(next.id)}`}
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#1A365D] hover:underline"
              >
                See it in the full calendar
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        )}
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-[#1A365D]">Plan the trip around the date</h2>
            <p className="mt-2 text-slate-600">
              Add an event to your trip, then use the planner to work out transport, beds and the days around it.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/plan/"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[#00D084] px-5 text-sm font-semibold text-[#1A365D] transition-colors hover:bg-[#00B875] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A365D] focus-visible:ring-offset-2"
            >
              Open the trip planner
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/travel/accommodation/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-[#1A365D] px-5 text-sm font-semibold text-[#1A365D] transition-colors hover:bg-[#1A365D]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A365D] focus-visible:ring-offset-2"
            >
              Find a place to stay
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
