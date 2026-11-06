'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTrip } from '@/context/TripContext';
import { mapZones } from '@/data/norway-map-zones';
import {
  TRIP_BUDGETS,
  TRIP_INTERESTS,
  TRIP_MOBILITY,
  TRIP_PACES,
  type TripProfile,
} from '@/types/trip';
import { cn } from '@/lib/utils';
import { fmt, plural } from '@/i18n/format';
import { PLAN_UI_EN } from '@/i18n/plan-ui/en';
import type { PlanUiCopy } from '@/i18n/plan-ui/types';
import type { PlanZoneId } from '@/lib/planner-data';
import { usePlanCopy } from './PlanCopy';

const inputClass =
  'w-full min-h-[44px] rounded-sm border border-plan-line-strong bg-plan-card px-4 py-2.5 text-base text-plan-heading placeholder:text-plan-faint focus:border-plan-accent focus:outline-none focus:ring-1 focus:ring-plan-accent transition-colors';
const labelClass = 'block text-sm font-medium uppercase tracking-wide text-plan-body';
const chipClass = (active: boolean) =>
  cn(
    'inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-semibold transition-colors',
    active ? 'border-plan-accent bg-plan-solid text-plan-on-solid' : 'border-plan-line-strong bg-plan-card text-plan-body hover:border-plan-accent'
  );

function formatDate(value: string, locale: string): string {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' });
}

const zoneLabel = (copy: PlanUiCopy, zone: { id: string; name: string }) => copy.zones[zone.id as PlanZoneId] ?? zone.name;

/** One line that says what we know, or nothing when the profile is empty. */
export function summariseProfile(profile: TripProfile, copy: PlanUiCopy = PLAN_UI_EN): string | null {
  const parts: string[] = [];
  const day = (value: string) => formatDate(value, copy.dateLocale);
  const zoneNames = mapZones.filter((zone) => profile.zones.includes(zone.id)).map((zone) => zoneLabel(copy, zone));
  if (zoneNames.length) parts.push(zoneNames.join(' + '));
  if (profile.startDate && profile.endDate) parts.push(fmt(copy.basics.range, { start: day(profile.startDate), end: day(profile.endDate) }));
  else if (profile.startDate) parts.push(fmt(copy.basics.from, { start: day(profile.startDate) }));
  if (profile.travellers) parts.push(plural(copy.basics.travellerCount, profile.travellers));
  const interests = TRIP_INTERESTS.filter((i) => profile.interests.includes(i.id)).map((i) => copy.interests[i.id]);
  if (interests.length) parts.push(interests.join(copy.listJoin));
  if (profile.mobility) parts.push(copy.mobility[profile.mobility]);
  if (profile.budget) parts.push(copy.budgets[profile.budget]);
  return parts.length ? parts.filter(Boolean).join(' · ') : null;
}

function OptionGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string; hint?: string }[];
  value: T | undefined;
  onChange: (next: T | undefined) => void;
}) {
  return (
    <div role="radiogroup" aria-label={label}>
      <p className={labelClass}>{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.id === value;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(active ? undefined : option.id)}
              className={chipClass(active)}
              title={option.hint}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Dates, party size and interests, stored on the visitor's device.
 * This is the input the route and day-by-day plan will work from.
 */
export function TripBasics({ startOpen = false }: { startOpen?: boolean }) {
  const { profile, updateProfile } = useTrip();
  const copy = usePlanCopy();
  const text = copy.basics;
  const [open, setOpen] = useState(startOpen);
  const id = useId();
  const summary = summariseProfile(profile, copy);
  const paces = TRIP_PACES.map((p) => ({ id: p.id, ...copy.paces[p.id] }));
  const mobility = TRIP_MOBILITY.map((m) => ({ id: m.id, label: copy.mobility[m.id] }));
  const budgets = TRIP_BUDGETS.map((b) => ({ id: b.id, label: copy.budgets[b.id] }));

  const toggleInterest = (interest: TripProfile['interests'][number]) => {
    const has = profile.interests.includes(interest);
    updateProfile({ interests: has ? profile.interests.filter((i) => i !== interest) : [...profile.interests, interest] });
  };

  const toggleZone = (zoneId: string) => {
    const has = profile.zones.includes(zoneId);
    updateProfile({ zones: has ? profile.zones.filter((z) => z !== zoneId) : [...profile.zones, zoneId] });
  };

  return (
    <section aria-labelledby={`${id}-title`} className="rounded-lg border border-plan-line bg-plan-card p-5 shadow-sm md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 id={`${id}-title`} className="text-lg font-bold text-plan-accent">
            {text.title}
          </h2>
          <p className="mt-1 text-base leading-relaxed text-plan-muted">{summary ?? text.intro}</p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls={`${id}-fields`}
          className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-md border border-plan-line-strong px-3.5 text-sm font-semibold text-plan-accent transition-colors hover:bg-plan-surface"
        >
          {open ? text.done : summary ? text.edit : text.add}
          <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
        </button>
      </div>

      {open && (
        <div id={`${id}-fields`} className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <p className={labelClass}>{text.where}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {mapZones.map((zone) => {
                const active = profile.zones.includes(zone.id);
                return (
                  <button
                    key={zone.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleZone(zone.id)}
                    className={chipClass(active)}
                  >
                    {zoneLabel(copy, zone)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${id}-start`} className={labelClass}>
                {text.arrive}
              </label>
              <input
                id={`${id}-start`}
                type="date"
                value={profile.startDate ?? ''}
                max={profile.endDate}
                onChange={(e) => updateProfile({ startDate: e.target.value || undefined })}
                className={cn(inputClass, 'mt-2')}
              />
            </div>
            <div>
              <label htmlFor={`${id}-end`} className={labelClass}>
                {text.leave}
              </label>
              <input
                id={`${id}-end`}
                type="date"
                value={profile.endDate ?? ''}
                min={profile.startDate}
                onChange={(e) => updateProfile({ endDate: e.target.value || undefined })}
                className={cn(inputClass, 'mt-2')}
              />
            </div>
          </div>

          <div>
            <label htmlFor={`${id}-travellers`} className={labelClass}>
              {text.travellers}
            </label>
            <input
              id={`${id}-travellers`}
              type="number"
              inputMode="numeric"
              min={1}
              max={16}
              value={profile.travellers ?? ''}
              placeholder="2"
              onChange={(e) => {
                const next = Number.parseInt(e.target.value, 10);
                updateProfile({ travellers: Number.isFinite(next) && next > 0 ? Math.min(next, 16) : undefined });
              }}
              className={cn(inputClass, 'mt-2 md:max-w-[10rem]')}
            />
          </div>

          <div className="md:col-span-2">
            <p className={labelClass}>{text.cameFor}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {TRIP_INTERESTS.map((interest) => {
                const active = profile.interests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleInterest(interest.id)}
                    className={chipClass(active)}
                  >
                    {copy.interests[interest.id]}
                  </button>
                );
              })}
            </div>
          </div>

          <OptionGroup label={text.pace} options={paces} value={profile.pace} onChange={(pace) => updateProfile({ pace })} />
          <OptionGroup label={text.gettingAround} options={mobility} value={profile.mobility} onChange={(next) => updateProfile({ mobility: next })} />
          <OptionGroup label={text.budget} options={budgets} value={profile.budget} onChange={(budget) => updateProfile({ budget })} />
        </div>
      )}
    </section>
  );
}
