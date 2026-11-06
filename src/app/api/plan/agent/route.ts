import { NextRequest, NextResponse } from 'next/server';
import { AgentInputError, AgentUnavailableError, writeDayPlan } from '@/lib/plan-agent';
import { parsePlanRequest } from '@/lib/plan-request';
import { countAgentCall, planStoreReady } from '@/lib/plan-store';
import { asLocale } from '@/lib/i18n-seo';
import { PLAN_TEXT, type PlanText } from '@/i18n/plan-text';

export const dynamic = 'force-dynamic';
// A plan takes 20 to 70 seconds when the model needs its one retry
export const maxDuration = 120;

// Cost guard rails. The per-IP window lives in the serverless instance; the
// daily cap lives in the plan store when it is configured, so it holds across
// instances. The client only calls this on a button press.
const PER_IP_LIMIT = 6; // plans per window
const PER_IP_WINDOW_MS = 10 * 60 * 1000;
const DAILY_CAP = Number.parseInt(process.env.PLAN_AGENT_DAILY_CAP ?? '200', 10);
const hits = new Map<string, number[]>();
let daily = { day: '', count: 0 };

async function overLimit(ip: string, errors: PlanText['errors']): Promise<string | null> {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < PER_IP_WINDOW_MS);
  if (recent.length >= PER_IP_LIMIT) return errors.tooMany;

  if (planStoreReady()) {
    const { allowed } = await countAgentCall(DAILY_CAP).catch(() => ({ allowed: true }));
    if (!allowed) return errors.dailyLimit;
  } else {
    const today = new Date().toISOString().slice(0, 10);
    if (daily.day !== today) daily = { day: today, count: 0 };
    if (daily.count >= DAILY_CAP) return errors.dailyLimit;
    daily.count += 1;
  }

  recent.push(now);
  hits.set(ip, recent);
  return null;
}

/**
 * POST /api/plan/agent/ with the trip basics as JSON (same fields as the suggest route).
 * Returns the day-by-day plan written by the model from the engine's facts.
 * Nothing about the visitor is sent beyond those basics; nothing is stored.
 */
export async function POST(request: NextRequest) {
  // The page language rides on the query too, so errors before the body is read are in it
  const queryErrors = PLAN_TEXT[asLocale(request.nextUrl.searchParams.get('lang') ?? undefined)].errors;
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: queryErrors.notConfigured }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: queryErrors.needJson }, { status: 400 });
  }

  const planRequest = parsePlanRequest(body);
  const errors = PLAN_TEXT[planRequest.locale ?? 'en'].errors;
  if (!planRequest.startDate || !planRequest.endDate || planRequest.zones.length === 0) {
    return NextResponse.json({ error: errors.needDates }, { status: 400 });
  }

  // Only requests that will reach the model count against the limits
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  const limited = await overLimit(ip, errors);
  if (limited) return NextResponse.json({ error: limited }, { status: 429 });

  try {
    const plan = await writeDayPlan(planRequest);
    return NextResponse.json(plan, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof AgentInputError) return NextResponse.json({ error: error.message }, { status: 400 });
    if (error instanceof AgentUnavailableError) return NextResponse.json({ error: errors.notConfigured }, { status: 503 });
    console.error('plan/agent failed', error);
    return NextResponse.json({ error: errors.writeFailed }, { status: 502 });
  }
}
