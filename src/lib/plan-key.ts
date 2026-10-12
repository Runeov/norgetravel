import type { TripProfile } from '@/types/trip';

/**
 * The query string the plan panel sends to the suggest route. It doubles as
 * the key a written day-by-day plan is matched against, so a shared plan that
 * is imported with the same basics and items lands as current, not stale.
 */
export function buildPlanQuery(profile: TripProfile, zones: string[], itemIds: string[]): string {
  const params = new URLSearchParams();
  if (profile.startDate) params.set('start', profile.startDate);
  if (profile.endDate) params.set('end', profile.endDate);
  if (profile.travellers) params.set('travellers', String(profile.travellers));
  if (profile.interests.length) params.set('interests', profile.interests.join(','));
  if (profile.pace) params.set('pace', profile.pace);
  if (profile.mobility) params.set('mobility', profile.mobility);
  if (profile.budget) params.set('budget', profile.budget);
  if (zones.length) params.set('zones', zones.join(','));
  if (itemIds.length) params.set('saved', itemIds.slice(0, 200).join(','));
  return params.toString();
}
