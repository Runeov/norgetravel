'use client';

import { Suspense, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { groupCalendar, matchesRegion, type CalendarEvent } from '@/lib/event-calendar';
import type { Destination } from '@/lib/schemas/travel.shared';
import type { EventType } from '@/lib/schemas/travel.events.schema';
import { EventRow, type EventRowUi } from './EventRow';

interface AgendaProps {
  events: CalendarEvent[];
  ui: EventRowUi;
  regionNames: Record<Destination, string>;
  typeNames: Record<EventType, string>;
}

interface Filters {
  region: Destination | null;
  type: EventType | null;
  onRegion?: (region: Destination | null) => void;
  onType?: (type: EventType | null) => void;
}

/**
 * The calendar list. Filters live in the URL (?region=lofoten&type=sports),
 * so homepage region links and shared links open a filtered view. The server
 * renders the unfiltered list as the Suspense fallback, so the full calendar
 * is in the HTML; the filtered view takes over once the page has loaded.
 */
export function EventsAgenda(props: AgendaProps) {
  return (
    <Suspense fallback={<AgendaView {...props} region={null} type={null} />}>
      <UrlFilteredAgenda {...props} />
    </Suspense>
  );
}

function UrlFilteredAgenda(props: AgendaProps) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const region = pick(params.get('region'), props.regionNames);
  const type = pick(params.get('type'), props.typeNames);

  const setParam = (key: 'region' | 'type', value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <AgendaView
      {...props}
      region={region}
      type={type}
      onRegion={(value) => setParam('region', value)}
      onType={(value) => setParam('type', value)}
    />
  );
}

/** A URL value is used only when it names a known option; anything else means no filter. */
function pick<K extends string>(value: string | null, names: Record<K, string>): K | null {
  return value !== null && Object.hasOwn(names, value) ? (value as K) : null;
}

function AgendaView({ events, ui, regionNames, typeNames, region, type, onRegion, onType }: AgendaProps & Filters) {
  // Options are the regions and types that have events in this window. The
  // count on each chip is what selecting it would show, given the other filter.
  const regionOptions = useMemo(
    () =>
      (Object.keys(regionNames) as Destination[])
        .filter((r) => r !== 'all' && events.some((e) => e.destination === r))
        .map((r) => ({
          value: r,
          label: regionNames[r],
          count: events.filter((e) => matchesRegion(e, r) && (!type || e.eventType === type)).length,
        })),
    [events, regionNames, type]
  );

  const typeOptions = useMemo(
    () =>
      (Object.keys(typeNames) as EventType[])
        .filter((t) => events.some((e) => e.eventType === t))
        .map((t) => ({
          value: t,
          label: typeNames[t],
          count: events.filter((e) => e.eventType === t && matchesRegion(e, region)).length,
        })),
    [events, typeNames, region]
  );

  const visible = events.filter((e) => matchesRegion(e, region) && (!type || e.eventType === type));
  const { onNow, months } = groupCalendar(visible);

  return (
    <div>
      <div className="space-y-3">
        <ChipGroup label="Region" all="All regions" options={regionOptions} value={region} onChange={onRegion} />
        <ChipGroup label="Type" all="All types" options={typeOptions} value={type} onChange={onType} />
      </div>

      <p className="mt-6 text-sm text-slate-600" aria-live="polite">
        {visible.length === 1 ? '1 event' : `${visible.length} events`}
        {region && ` in ${regionNames[region]}`}
        {type && ` · ${typeNames[type]}`}
      </p>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-8 text-center">
          <p className="font-semibold text-slate-800">No events match both filters in this view.</p>
          <button
            type="button"
            onClick={() => {
              onRegion?.(null);
              onType?.(null);
            }}
            className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-md border border-[#1A365D] px-4 text-sm font-medium text-[#1A365D] hover:bg-[#1A365D]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A365D] focus-visible:ring-offset-2"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-10">
          {onNow.length > 0 && (
            <AgendaGroup id="on-now" heading={ui.onNow} events={onNow} ui={ui} regionNames={regionNames} />
          )}
          {months.map((month) => (
            <AgendaGroup
              key={month.key}
              id={`month-${month.key}`}
              heading={month.label}
              events={month.events}
              ui={ui}
              regionNames={regionNames}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function AgendaGroup({
  id,
  heading,
  events,
  ui,
  regionNames,
}: {
  id: string;
  heading: string;
  events: CalendarEvent[];
  ui: EventRowUi;
  regionNames: Record<Destination, string>;
}) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="mb-4 flex items-center gap-3 text-xl font-bold text-[#1A365D]">
        {heading}
        <span className="rounded-sm bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">{events.length}</span>
      </h2>
      <div className="grid gap-4 lg:grid-cols-2">
        {events.map((event) => (
          <EventRow key={event.id} event={event} ui={ui} regionName={regionNames[event.destination]} />
        ))}
      </div>
    </section>
  );
}

function ChipGroup<V extends string>({
  label,
  all,
  options,
  value,
  onChange,
}: {
  label: string;
  all: string;
  options: { value: V; label: string; count: number }[];
  value: V | null;
  onChange?: (value: V | null) => void;
}) {
  if (options.length < 2) return null;

  const chip = (active: boolean) =>
    cn(
      'inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-md border px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A365D] focus-visible:ring-offset-2',
      active
        ? 'border-[#1A365D] bg-[#1A365D] text-white'
        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400 disabled:cursor-not-allowed disabled:border-slate-100 disabled:bg-slate-50 disabled:text-slate-400 disabled:hover:border-slate-100'
    );

  return (
    <div role="group" aria-label={`Filter by ${label.toLowerCase()}`} className="flex flex-wrap items-center gap-2">
      <span className="w-14 shrink-0 text-xs font-semibold uppercase tracking-wide text-slate-600">{label}</span>
      <button type="button" aria-pressed={value === null} onClick={() => onChange?.(null)} className={chip(value === null)}>
        {all}
      </button>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          // With the other filter set, an option can match nothing. It stays
          // visible with its 0 so the reader sees why, but cannot be picked.
          disabled={option.count === 0 && value !== option.value}
          onClick={() => onChange?.(value === option.value ? null : option.value)}
          className={chip(value === option.value)}
        >
          {option.label}
          <span className={cn('text-xs', value === option.value ? 'text-slate-200' : 'text-slate-500')}>{option.count}</span>
        </button>
      ))}
    </div>
  );
}
