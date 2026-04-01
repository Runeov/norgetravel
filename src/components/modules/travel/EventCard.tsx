'use client';

import Image from 'next/image';
import { Calendar, MapPin, ExternalLink, Ticket } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Event } from '@/lib/schemas/travel.events.schema';
import { EVENT_TYPE_LABELS } from '@/lib/schemas/travel.events.schema';
import { formatEventDateRange, isUpcoming, EVENT_TYPE_COLORS } from '@/lib/utils/event-helpers';
import { AddToTripButton } from '@/components/ui/AddToTripButton';
import type { TripItem } from '@/types/trip';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const upcoming = isUpcoming(event);
  const dateStr = formatEventDateRange(event.startDate, event.endDate);
  const typeLabel = EVENT_TYPE_LABELS[event.eventType];
  const typeColor = EVENT_TYPE_COLORS[event.eventType];

  const tripItem: TripItem = {
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
  };

  return (
    <article
      className={cn(
        'bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow group',
        !upcoming && 'opacity-70'
      )}
    >
      {/* Banner image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-200">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.imageAlt || event.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-slate-100 text-slate-400">
            <Calendar className="w-10 h-10" aria-hidden="true" />
          </div>
        )}

        {/* Type badge */}
        <span className={cn('absolute top-3 left-3 px-2 py-1 rounded-sm text-xs font-bold', typeColor)}>
          {typeLabel}
        </span>

        {/* Free badge */}
        {event.isFree && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-sm text-xs font-bold bg-[#00CC6A] text-white">
            Free
          </span>
        )}

        {/* Past event overlay */}
        {!upcoming && (
          <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
            <span className="px-3 py-1 bg-slate-900/80 text-white text-sm font-bold rounded-sm">
              Past event
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Date — prominent */}
        <div className="flex items-center gap-2 mb-2 text-[#1B3A5C] font-bold text-sm">
          <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
          <time dateTime={event.startDate}>{dateStr}</time>
        </div>

        <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2">
          {event.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-3">
          <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="line-clamp-1">{event.location}</span>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
          {event.description}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <AddToTripButton item={tripItem} className="flex-1" />
          {event.ticketUrl && (
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md min-h-[44px] bg-[#1B3A5C] text-white hover:bg-[#15304d] transition-colors flex-1"
            >
              <Ticket className="w-4 h-4" aria-hidden="true" />
              Tickets
              <ExternalLink className="w-3 h-3 ml-0.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
