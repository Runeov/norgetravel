'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { ExternalLink, MapPin, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { outboundRel } from '@/lib/outbound-rel';
import { eventAnchor, type CalendarEvent } from '@/lib/event-calendar';
import type { EventUiCopy } from '@/i18n/events-copy';
import { AddToTripButton } from '@/components/ui/AddToTripButton';

export type EventRowUi = Pick<EventUiCopy, 'onNow' | 'free' | 'tickets' | 'newTab'>;

interface EventRowProps {
  event: CalendarEvent;
  ui: EventRowUi;
  regionName: string;
  headingLevel?: 'h3' | 'h4';
}

/**
 * One event as a horizontal row: date tile, then type, region and price,
 * the date or "on now" status, the name and the place. Used in the events
 * calendar (EventRow, with actions) and on the homepage (EventRowLink, the
 * whole card links to the event in the calendar).
 */
function EventRowBody({ event, ui, regionName, headingLevel: Heading = 'h3', children }: EventRowProps & { children?: ReactNode }) {
  const place = event.venue && event.venue !== event.location ? `${event.venue}, ${event.location}` : event.location;

  return (
    <>
      {/* Date tile. The date is also in the status line, so screen readers skip the tile. */}
      <div
        className="flex w-16 shrink-0 flex-col items-center justify-center border-r border-slate-200 bg-slate-50 px-2 py-3 text-center"
        aria-hidden="true"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">{event.tile.month}</span>
        <span className="my-1 text-2xl font-bold leading-none text-[#1A365D]">{event.tile.day}</span>
        <span className="text-xs text-slate-600">{event.tile.weekday}</span>
      </div>

      <div className="min-w-0 flex-1 p-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-600">
          <span className="uppercase tracking-wide">{event.typeLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{regionName}</span>
          {event.isFree && (
            <span className="rounded-sm bg-[#dff7ea] px-1.5 py-0.5 font-semibold text-[#11643f]">{ui.free}</span>
          )}
        </div>

        <p className="mt-1.5 flex flex-wrap items-center gap-2 text-sm font-semibold text-[#1A365D]">
          {event.onNow && (
            <span className="rounded-sm bg-[#00D084] px-1.5 py-0.5 text-xs font-bold uppercase tracking-wide text-[#1A365D]">
              {ui.onNow}
            </span>
          )}
          <time dateTime={event.startDate}>
            {event.untilLabel ?? event.dateLabel}
          </time>
        </p>

        <Heading className="mt-1 text-base font-bold leading-snug text-slate-800 line-clamp-2">{event.name}</Heading>

        <p className="mt-1 flex items-start gap-1.5 text-sm text-slate-600">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="line-clamp-1">{place}</span>
        </p>

        {children}
      </div>

      {event.imageUrl && (
        <div className="relative hidden w-28 shrink-0 bg-slate-200 sm:block">
          <Image src={event.imageUrl} alt={event.imageAlt ?? ''} fill className="object-cover" sizes="112px" />
        </div>
      )}
    </>
  );
}

/** Calendar row with "Add to trip" and the ticket link. */
export function EventRow(props: EventRowProps) {
  const { event, ui } = props;

  return (
    <article
      id={eventAnchor(event.id)}
      className="flex scroll-mt-24 overflow-hidden rounded-lg border border-slate-200 bg-white shadow target:ring-2 target:ring-[#00D084] target:ring-offset-2"
    >
      <EventRowBody {...props}>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">{event.description}</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <AddToTripButton
            compact
            item={{
              id: event.id,
              name: event.name,
              category: 'events',
              imageUrl: event.imageUrl,
              location: event.location,
              priceRange: event.priceRange,
              destination: event.destination,
              startDate: event.startDate,
              endDate: event.endDate,
              addedAt: '',
            }}
          />
          {event.ticketUrl && (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel={outboundRel(event.ticketUrl)}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md bg-[#1A365D] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#15304d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A365D] focus-visible:ring-offset-2"
            >
              <Ticket className="h-4 w-4" aria-hidden="true" />
              {ui.tickets}
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
              <span className="sr-only">{ui.newTab}</span>
            </a>
          )}
        </div>
      </EventRowBody>
    </article>
  );
}

/** Compact row where the whole card links to the event in the calendar. */
export function EventRowLink({ href, className, ...props }: EventRowProps & { href: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        'flex overflow-hidden rounded-lg border border-slate-200 bg-white shadow transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A365D] focus-visible:ring-offset-2',
        className
      )}
    >
      <EventRowBody {...props} />
    </Link>
  );
}
