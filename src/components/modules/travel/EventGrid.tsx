'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { Event, EventType } from '@/lib/schemas/travel.events.schema';
import { EVENT_TYPE_LABELS } from '@/lib/schemas/travel.events.schema';
import { sortEventsByDate, isUpcoming, EVENT_TYPE_COLORS } from '@/lib/utils/event-helpers';
import { EventCard } from './EventCard';

type DateFilter = 'upcoming' | 'past' | 'all';

interface EventGridProps {
  events: Event[];
  destination?: string;
}

export function EventGrid({ events, destination }: EventGridProps) {
  const [dateFilter, setDateFilter] = useState<DateFilter>('upcoming');
  const [typeFilter, setTypeFilter] = useState<EventType | 'all'>('all');

  // Get unique event types present in the data
  const eventTypes = useMemo(() => {
    const types = new Set(events.map((e) => e.eventType));
    return Array.from(types).sort();
  }, [events]);

  const filtered = useMemo(() => {
    let result = events;

    // Filter by destination if provided
    if (destination) {
      result = result.filter((e) => e.destination === destination || e.destination === 'all');
    }

    // Filter by date
    if (dateFilter === 'upcoming') {
      result = result.filter(isUpcoming);
    } else if (dateFilter === 'past') {
      result = result.filter((e) => !isUpcoming(e));
    }

    // Filter by type
    if (typeFilter !== 'all') {
      result = result.filter((e) => e.eventType === typeFilter);
    }

    return sortEventsByDate(result);
  }, [events, destination, dateFilter, typeFilter]);

  const dateOptions: { value: DateFilter; label: string }[] = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'past', label: 'Past' },
    { value: 'all', label: 'All' },
  ];

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Date filter */}
        <div className="flex gap-1.5">
          {dateOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setDateFilter(opt.value)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md min-h-[44px] transition-colors',
                dateFilter === opt.value
                  ? 'bg-[#1B3A5C] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Type filter */}
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => setTypeFilter('all')}
            className={cn(
              'px-3 py-1.5 text-sm font-medium rounded-md min-h-[44px] transition-colors',
              typeFilter === 'all'
                ? 'bg-[#1B3A5C] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
          >
            All types
          </button>
          {eventTypes.map((type) => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded-md min-h-[44px] transition-colors',
                typeFilter === type
                  ? EVENT_TYPE_COLORS[type]
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              )}
            >
              {EVENT_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500 mb-4" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'event' : 'events'} found
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500">
          <p className="text-lg font-medium mb-2">No events match your filters</p>
          <p className="text-sm">Try adjusting the date or type filter</p>
        </div>
      )}
    </div>
  );
}
