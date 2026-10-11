'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTrip } from '@/context/TripContext';
import {
  TRIP_BUDGETS,
  TRIP_INTERESTS,
  TRIP_MOBILITY,
  TRIP_PACES,
  type TripProfile,
} from '@/types/trip';
import { cn } from '@/lib/utils';

const inputClass =
  'w-full min-h-[44px] rounded-sm border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#1B3A5C] focus:outline-none focus:ring-1 focus:ring-[#1B3A5C] transition-colors';
const labelClass = 'block text-sm font-medium uppercase tracking-wide text-slate-700';
const chipClass = (active: boolean) =>
  cn(
    'inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-semibold transition-colors',
    active ? 'border-[#1B3A5C] bg-[#1B3A5C] text-white' : 'border-slate-300 bg-white text-slate-700 hover:border-[#1B3A5C]'
  );

function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** One line that says what we know, or nothing when the profile is empty. */
export function summariseProfile(profile: TripProfile): string | null {
  const parts: string[] = [];
  if (profile.startDate && profile.endDate) parts.push(`${formatDate(profile.startDate)} to ${formatDate(profile.endDate)}`);
  else if (profile.startDate) parts.push(`From ${formatDate(profile.startDate)}`);
  if (profile.travellers) parts.push(`${profile.travellers} ${profile.travellers === 1 ? 'traveller' : 'travellers'}`);
  const interests = TRIP_INTERESTS.filter((i) => profile.interests.includes(i.id)).map((i) => i.label);
  if (interests.length) parts.push(interests.join(', '));
  if (profile.mobility) parts.push(TRIP_MOBILITY.find((m) => m.id === profile.mobility)?.label ?? '');
  if (profile.budget) parts.push(TRIP_BUDGETS.find((b) => b.id === profile.budget)?.label ?? '');
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
  const [open, setOpen] = useState(startOpen);
  const id = useId();
  const summary = summariseProfile(profile);

  const toggleInterest = (interest: TripProfile['interests'][number]) => {
    const has = profile.interests.includes(interest);
    updateProfile({ interests: has ? profile.interests.filter((i) => i !== interest) : [...profile.interests, interest] });
  };

  return (
    <section aria-labelledby={`${id}-title`} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 id={`${id}-title`} className="text-lg font-bold text-[#1B3A5C]">
            Your trip basics
          </h2>
          <p className="mt-1 text-base leading-relaxed text-slate-600">
            {summary ?? 'When, how many, and what you came for. Saved on this device, ready for the route and day plan that come next.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls={`${id}-fields`}
          className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-md border border-slate-300 px-3.5 text-sm font-semibold text-[#1B3A5C] transition-colors hover:bg-slate-50"
        >
          {open ? 'Done' : summary ? 'Edit' : 'Add'}
          <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
        </button>
      </div>

      {open && (
        <div id={`${id}-fields`} className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor={`${id}-start`} className={labelClass}>
                Arrive
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
                Leave
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
              Travellers
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
            <p className={labelClass}>What you came for</p>
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
                    {interest.label}
                  </button>
                );
              })}
            </div>
          </div>

          <OptionGroup label="Pace" options={TRIP_PACES} value={profile.pace} onChange={(pace) => updateProfile({ pace })} />
          <OptionGroup label="Getting around" options={TRIP_MOBILITY} value={profile.mobility} onChange={(mobility) => updateProfile({ mobility })} />
          <OptionGroup label="Budget" options={TRIP_BUDGETS} value={profile.budget} onChange={(budget) => updateProfile({ budget })} />
        </div>
      )}
    </section>
  );
}
