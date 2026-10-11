import { NextRequest, NextResponse } from 'next/server';
import { buildPlan } from '@/lib/plan-engine';
import { parsePlanRequest } from '@/lib/plan-request';

export const dynamic = 'force-dynamic';

/**
 * GET /api/plan/suggest/?start=2027-02-12&end=2027-02-19&travellers=2&interests=aurora,food&pace=steady&mobility=no-car&budget=mid-range&zones=northern-norway&saved=id1,id2
 * Returns the rule-based plan for those inputs. Nothing is stored; the profile lives on the visitor's device.
 */
export async function GET(request: NextRequest) {
  const planRequest = parsePlanRequest(Object.fromEntries(request.nextUrl.searchParams));

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
