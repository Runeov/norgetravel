import { NextRequest, NextResponse } from 'next/server';
import { buildPlan } from '@/lib/plan-engine';
import { parsePlanRequest } from '@/lib/plan-request';
import { newShareId, saveSharedPlan, SHARE_TTL_DAYS, type SharedPlan } from '@/lib/plan-store';
import { getSiteUrl } from '@/lib/site-url';
import type { AgentPlan } from '@/lib/plan-agent';
import type { TripItem, TripItemCategory } from '@/types/trip';

export const dynamic = 'force-dynamic';

const CATEGORIES: TripItemCategory[] = ['cities', 'events', 'experiences', 'accommodation', 'restaurants', 'tours', 'transport', 'guides'];
const PER_IP_LIMIT = 20;
const PER_IP_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

const text = (value: unknown, max: number): string => (typeof value === 'string' ? value.replace(/\s+/g, ' ').trim().slice(0, max) : '');
const optional = (value: unknown, max: number): string | undefined => text(value, max) || undefined;

/** Keeps only the fields a trip item is made of, with sane lengths. */
function cleanItems(raw: unknown): TripItem[] {
  if (!Array.isArray(raw)) return [];
  const items: TripItem[] = [];
  for (const entry of raw.slice(0, 200)) {
    const item = (entry ?? {}) as Record<string, unknown>;
    const id = text(item.id, 160);
    const name = text(item.name, 200);
    const category = CATEGORIES.includes(item.category as TripItemCategory) ? (item.category as TripItemCategory) : null;
    if (!id || !name || !category) continue;
    items.push({
      id,
      name,
      category,
      imageUrl: optional(item.imageUrl, 400),
      location: optional(item.location, 160),
      priceRange: optional(item.priceRange, 40),
      destination: optional(item.destination, 60),
      zone: optional(item.zone, 60),
      href: optional(item.href, 600),
      startDate: optional(item.startDate, 10),
      endDate: optional(item.endDate, 10),
      addedAt: optional(item.addedAt, 40) ?? '',
    });
  }
  return items;
}

/** Keeps a day-by-day plan's text and refs; the facts are rebuilt on the server. */
function cleanDayPlan(raw: unknown): Omit<AgentPlan, 'facts'> | null {
  if (!raw || typeof raw !== 'object') return null;
  const plan = raw as Record<string, unknown>;
  const days = Array.isArray(plan.days) ? plan.days.slice(0, 23) : [];
  if (!days.length) return null;
  const usage = (plan.usage ?? {}) as Record<string, unknown>;
  const num = (value: unknown) => (typeof value === 'number' && Number.isFinite(value) ? value : 0);
  return {
    title: text(plan.title, 120),
    intro: text(plan.intro, 800),
    days: days.map((entry, index) => {
      const day = (entry ?? {}) as Record<string, unknown>;
      return {
        day: typeof day.day === 'number' ? day.day : index + 1,
        date: /^\d{4}-\d{2}-\d{2}$/.test(String(day.date ?? '')) ? String(day.date) : undefined,
        region: text(day.region, 60),
        title: text(day.title, 120),
        summary: text(day.summary, 600),
        items: (Array.isArray(day.items) ? day.items.slice(0, 12) : []).map((rawItem) => {
          const item = (rawItem ?? {}) as Record<string, unknown>;
          return { ref: text(item.ref, 160), note: text(item.note, 300) };
        }).filter((item) => item.ref),
        why: text(day.why, 300),
      };
    }),
    unverified: (Array.isArray(plan.unverified) ? plan.unverified.slice(0, 10) : []).map((line) => text(line, 240)).filter(Boolean),
    model: text(plan.model, 60),
    generatedAt: text(plan.generatedAt, 40),
    inputHash: text(plan.inputHash, 40),
    usage: { input: num(usage.input), output: num(usage.output), cacheRead: num(usage.cacheRead), cacheWrite: num(usage.cacheWrite), calls: num(usage.calls) },
  };
}

function overLimit(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < PER_IP_WINDOW_MS);
  if (recent.length >= PER_IP_LIMIT) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

/**
 * POST /api/plan/share/ with { lang, basics, items, dayPlan }.
 * Stores the plan for 90 days under an unguessable id and returns its URL.
 * The facts are rebuilt here from the basics, so a client cannot store invented ones.
 */
export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Send the plan as JSON.' }, { status: 400 });
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (overLimit(ip)) return NextResponse.json({ error: 'That is a lot of links in a row. Give it ten minutes.' }, { status: 429 });

  const basics = parsePlanRequest((body.basics ?? {}) as Record<string, unknown>);
  const items = cleanItems(body.items);
  if (basics.zones.length === 0 && items.length === 0) {
    return NextResponse.json({ error: 'Pick a destination or save something before sharing.' }, { status: 400 });
  }
  const lang = ['en', 'zh', 'ja'].includes(String(body.lang)) ? String(body.lang) : 'en';

  try {
    const facts = await buildPlan({ ...basics, savedIds: [] });
    const dayPlan = cleanDayPlan(body.dayPlan);
    const now = new Date();
    const { savedIds: _ignored, ...basicsOnly } = basics;
    void _ignored;
    const plan: SharedPlan = {
      id: newShareId(),
      version: 1,
      createdAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + SHARE_TTL_DAYS * 86_400_000).toISOString(),
      lang,
      title: dayPlan?.title || `${facts.zones.map((zone) => zone.name).join(' and ') || 'Norway'} trip plan`,
      basics: basicsOnly,
      items,
      facts,
      dayPlan,
    };
    await saveSharedPlan(plan);
    const url = `${getSiteUrl()}/${lang}/plan/shared/${plan.id}/`;
    return NextResponse.json({ id: plan.id, url, expiresAt: plan.expiresAt }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('plan/share failed', error);
    return NextResponse.json({ error: 'The link could not be made just now. Try again in a minute.' }, { status: 500 });
  }
}
