import { NextRequest, NextResponse } from 'next/server';
import { AgentInputError, AgentUnavailableError, writeDayPlan } from '@/lib/plan-agent';
import { parsePlanRequest } from '@/lib/plan-request';

export const dynamic = 'force-dynamic';
// A plan takes 20 to 70 seconds when the model needs its one retry
export const maxDuration = 120;

// Cost guard rails. Both counters live in the serverless instance, so they are
// per warm instance, not global; the client only calls this on a button press.
const PER_IP_LIMIT = 6; // plans per window
const PER_IP_WINDOW_MS = 10 * 60 * 1000;
const DAILY_CAP = Number.parseInt(process.env.PLAN_AGENT_DAILY_CAP ?? '200', 10);
const hits = new Map<string, number[]>();
let daily = { day: '', count: 0 };

function overLimit(ip: string): string | null {
  const today = new Date().toISOString().slice(0, 10);
  if (daily.day !== today) daily = { day: today, count: 0 };
  if (daily.count >= DAILY_CAP) return 'The day-by-day planner has reached its daily limit. The plan above still works; try again tomorrow.';
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < PER_IP_WINDOW_MS);
  if (recent.length >= PER_IP_LIMIT) return 'That is a few plans in a row. Give it ten minutes and try again.';
  recent.push(now);
  hits.set(ip, recent);
  daily.count += 1;
  return null;
}

/**
 * POST /api/plan/agent/ with the trip basics as JSON (same fields as the suggest route).
 * Returns the day-by-day plan written by the model from the engine's facts.
 * Nothing about the visitor is sent beyond those basics; nothing is stored.
 */
export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'The day-by-day planner is not configured on this deployment.' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Send the trip basics as JSON.' }, { status: 400 });
  }

  const planRequest = parsePlanRequest(body);
  if (!planRequest.startDate || !planRequest.endDate || planRequest.zones.length === 0) {
    return NextResponse.json({ error: 'Dates and at least one destination are needed for a day-by-day plan.' }, { status: 400 });
  }

  // Only requests that will reach the model count against the limits
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
  const limited = overLimit(ip);
  if (limited) return NextResponse.json({ error: limited }, { status: 429 });

  try {
    const plan = await writeDayPlan(planRequest);
    return NextResponse.json(plan, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    if (error instanceof AgentInputError) return NextResponse.json({ error: error.message }, { status: 400 });
    if (error instanceof AgentUnavailableError) return NextResponse.json({ error: 'The day-by-day planner is not configured on this deployment.' }, { status: 503 });
    console.error('plan/agent failed', error);
    return NextResponse.json({ error: 'The planner could not write the plan just now. The plan above still works; try again in a minute.' }, { status: 502 });
  }
}
