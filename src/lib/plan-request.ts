import type { PlanRequest } from '@/lib/plan-engine';
import { isPlanZoneId, type PlanZoneId } from '@/lib/planner-data';
import {
  TRIP_BUDGETS,
  TRIP_INTERESTS,
  TRIP_MOBILITY,
  TRIP_PACES,
  type TripBudget,
  type TripInterest,
  type TripMobility,
  type TripPace,
} from '@/types/trip';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

type Raw = Record<string, unknown>;

const str = (value: unknown): string | undefined => (typeof value === 'string' && value.trim() ? value.trim() : undefined);

/** Accepts a comma-separated string or an array of strings. */
const list = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.filter((v): v is string => typeof v === 'string').map((v) => v.trim()).filter(Boolean);
  const text = str(value);
  return text ? text.split(',').map((v) => v.trim()).filter(Boolean) : [];
};

const oneOf = <T extends string>(value: unknown, allowed: readonly { id: T }[]): T | undefined =>
  allowed.some((option) => option.id === value) ? (value as T) : undefined;

/**
 * Turns query parameters or a JSON body into a PlanRequest. Anything the
 * engine would not understand is dropped rather than rejected, so a stale
 * client never breaks the planner.
 */
export function parsePlanRequest(raw: Raw): PlanRequest {
  const start = str(raw.start) ?? str(raw.startDate);
  const end = str(raw.end) ?? str(raw.endDate);
  const travellersRaw = Number.parseInt(String(raw.travellers ?? ''), 10);

  return {
    startDate: start && ISO_DATE.test(start) ? start : undefined,
    endDate: end && ISO_DATE.test(end) ? end : undefined,
    travellers: Number.isFinite(travellersRaw) && travellersRaw > 0 ? Math.min(travellersRaw, 16) : undefined,
    interests: list(raw.interests).filter((v): v is TripInterest => TRIP_INTERESTS.some((i) => i.id === v)),
    pace: oneOf<TripPace>(raw.pace, TRIP_PACES),
    mobility: oneOf<TripMobility>(raw.mobility, TRIP_MOBILITY),
    budget: oneOf<TripBudget>(raw.budget, TRIP_BUDGETS),
    zones: list(raw.zones).filter((v): v is PlanZoneId => isPlanZoneId(v)),
    savedIds: list(raw.saved ?? raw.savedIds).slice(0, 200),
  };
}
