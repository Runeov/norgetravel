import { randomBytes } from 'node:crypto';
import { get, put } from '@vercel/blob';
import type { PlanRequest, PlanResult } from '@/lib/plan-engine';
import type { AgentPlan } from '@/lib/plan-agent';
import type { TripItem } from '@/types/trip';

/**
 * Small JSON store on Vercel Blob (private store, token in BLOB_READ_WRITE_TOKEN).
 * Holds shared plans, the agent's memo across serverless instances, and the
 * daily call counter. Without the token it falls back to this process's
 * memory, which is enough for local development.
 */

export const planStoreReady = (): boolean => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const memory = new Map<string, { value: unknown; expires: number }>();
const DAY_MS = 86_400_000;

export async function saveJson(pathname: string, value: unknown, ttlDays: number): Promise<void> {
  if (!planStoreReady()) {
    memory.set(pathname, { value, expires: Date.now() + ttlDays * DAY_MS });
    return;
  }
  await put(pathname, JSON.stringify(value), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/json',
  });
}

export async function loadJson<T>(pathname: string): Promise<T | null> {
  if (!planStoreReady()) {
    const hit = memory.get(pathname);
    if (!hit || hit.expires < Date.now()) return null;
    return hit.value as T;
  }
  try {
    const result = await get(pathname, { access: 'private', useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    return (await new Response(result.stream).json()) as T;
  } catch {
    return null;
  }
}

// ── Shared plans ────────────────────────────────────────────────────────────

export const SHARE_TTL_DAYS = 90;
const SHARE_ID = /^[A-Za-z0-9_-]{8,24}$/;

export interface SharedPlan {
  id: string;
  version: 1;
  createdAt: string;
  expiresAt: string;
  lang: string;
  title: string;
  basics: Omit<PlanRequest, 'savedIds'>;
  items: TripItem[];
  facts: PlanResult;
  dayPlan: Omit<AgentPlan, 'facts'> | null;
}

export function newShareId(): string {
  return randomBytes(9).toString('base64url');
}

export async function saveSharedPlan(plan: SharedPlan): Promise<void> {
  await saveJson(`shared/${plan.id}.json`, plan, SHARE_TTL_DAYS);
}

/** The shared plan, or null when the id is malformed, unknown or past its expiry. */
export async function loadSharedPlan(id: string): Promise<SharedPlan | null> {
  if (!SHARE_ID.test(id)) return null;
  const plan = await loadJson<SharedPlan>(`shared/${id}.json`);
  if (!plan || plan.version !== 1) return null;
  if (new Date(plan.expiresAt).getTime() < Date.now()) return null;
  return plan;
}

// ── Agent memo and daily counter ────────────────────────────────────────────

export const AGENT_MEMO_DAYS = 7;

export async function loadAgentMemo(inputHash: string): Promise<AgentPlan | null> {
  const plan = await loadJson<AgentPlan>(`agent/${inputHash}.json`);
  if (!plan) return null;
  const age = Date.now() - new Date(plan.generatedAt).getTime();
  return age < AGENT_MEMO_DAYS * DAY_MS ? plan : null;
}

export async function saveAgentMemo(plan: AgentPlan): Promise<void> {
  await saveJson(`agent/${plan.inputHash}.json`, plan, AGENT_MEMO_DAYS);
}

/**
 * Counts one model call against today's cap and says whether the cap was
 * already reached. Read-modify-write, so two calls in the same instant may
 * both count as one; the cap is a guard, not an invoice.
 */
export async function countAgentCall(cap: number): Promise<{ allowed: boolean; count: number }> {
  const today = new Date().toISOString().slice(0, 10);
  const pathname = `agent/limits/${today}.json`;
  const current = (await loadJson<{ count: number }>(pathname))?.count ?? 0;
  if (current >= cap) return { allowed: false, count: current };
  await saveJson(pathname, { count: current + 1 }, 2);
  return { allowed: true, count: current + 1 };
}
