import { NextRequest, NextResponse } from 'next/server';
import { buildPlan, type PlanRequest } from '@/lib/plan-engine';
import { isPlanZoneId, type PlanZoneId } from '@/lib/planner-data';
import { TRIP_BUDGETS, TRIP_INTERESTS, TRIP_MOBILITY, TRIP_PACES, type TripBudget, type TripInterest, type TripMobility, type TripPace } from '@/types/trip';

export const dynamic = 'force-dynamic';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const list = (value: string | null) => (value ? value.split(',').map((v) => v.trim()).filter(Boolean) : []);
const oneOf = <T extends string>(value: string | null, allowed: readonly { id: T }[]): T | undefined =>
  allowed.some((option) => option.id === value) ? (value as T) : undefined;

/**
 * GET /api/plan/suggest?start=2027-02-12&end=2027-02-19&travellers=2&interests=aurora,food&pace=steady&mobility=no-car&budget=mid-range&zones=northern-norway&saved=id1,id2
 * Returns the rule-based plan for those inputs. Nothing is stored; the profile lives on the visitor's device.
 */
export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams;
  const startDate = ISO_DATE.test(q.get('start') ?? '') ? q.get('start')! : undefined;
  const endDate = ISO_DATE.test(q.get('end') ?? '') ? q.get('end')! : undefined;
  const travellersRaw = Number.parseInt(q.get('travellers') ?? '', 10);

  const planRequest: PlanRequest = {
    startDate,
    endDate,
    travellers: Number.isFinite(travellersRaw) && travellersRaw > 0 ? Math.min(travellersRaw, 16) : undefined,
    interests: list(q.get('interests')).filter((v): v is TripInterest => TRIP_INTERESTS.some((i) => i.id === v)),
    pace: oneOf<TripPace>(q.get('pace'), TRIP_PACES),
    mobility: oneOf<TripMobility>(q.get('mobility'), TRIP_MOBILITY),
    budget: oneOf<TripBudget>(q.get('budget'), TRIP_BUDGETS),
    zones: list(q.get('zones')).filter((v): v is PlanZoneId => isPlanZoneId(v)),
    savedIds: list(q.get('saved')).slice(0, 200),
  };

  try {
    const plan = await buildPlan(planRequest);
    return NextResponse.json(plan, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
    });
  } catch (error) {
    console.error('plan/suggest failed', error);
    return NextResponse.json({ error: 'The planner could not build a plan right now.' }, { status: 500 });
  }
}
