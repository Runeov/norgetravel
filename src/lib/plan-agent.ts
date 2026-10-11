import Anthropic from '@anthropic-ai/sdk';
import { createHash } from 'node:crypto';
import { buildPlan, type PlanRequest, type PlanResult } from '@/lib/plan-engine';

/**
 * Phase 3 of the trip planner: the model writes the day-by-day plan, but only
 * from the facts the rule engine hands it. Every item it schedules must point
 * at an id from those facts; anything else is dropped and reported. The
 * system prompt and the tool schema are cached for an hour, so a request pays
 * for the per-trip facts and the answer, not the instructions.
 */

export interface DayPlanItem {
  /** `activity:<id>`, `event:<id>`, `stay:<id>`, `leg:<id>` or `kit:<id>` from the facts. */
  ref: string;
  note: string;
}

export interface DayPlan {
  day: number;
  date?: string;
  region: string;
  title: string;
  summary: string;
  items: DayPlanItem[];
  why: string;
}

export interface AgentPlan {
  title: string;
  intro: string;
  days: DayPlan[];
  /** What the model wanted to say but could not back with our facts. */
  unverified: string[];
  facts: PlanResult;
  model: string;
  generatedAt: string;
  inputHash: string;
  usage: { input: number; output: number; cacheRead: number; cacheWrite: number; calls: number };
}

export class AgentUnavailableError extends Error {}
export class AgentInputError extends Error {}

const MODEL = process.env.PLAN_AGENT_MODEL ?? 'claude-sonnet-5-5';
// Eight detailed days run to 3,000 to 4,000 output tokens; a cut-off reply arrives as an empty tool input
const MAX_OUTPUT_TOKENS = 6000;
const MEMO_LIMIT = 50;

const BANNED =
  /\b(breathtaking|stunning|magical|vibrant|charming|hidden gems?|bucket list|once-in-a-lifetime|unforgettable|quaint|idyllic|unspoiled|timeless|epic|dramatic|majestic|iconic|jaw-dropping|fairy ?tale|wonderland|mystical|must-see|must-do|picturesque|pristine|nestled|boasts|wanderlust)\b/gi;

const SYSTEM_PROMPT = `You are the planning editor at Norgetravel.com, "The Real Norway, Unfiltered". You write day-by-day trip plans for international travellers from facts that the site's rule engine hands you. You are the honest local guide: direct, specific, never a brochure.

Hard rules, in order:
1. Use only the facts you are given. Every activity, event, stay, transport leg and kit line you schedule must be one of the provided items, referenced by its exact id in the ref field. Never invent places, operators, prices, times, distances, opening hours or weather. If the facts lack something a day needs, say so in "unverified" instead of filling the gap.
2. Respect the light and season lines. No aurora in midnight sun, no midnight-sun activities in polar night, no closed roads. Respect the "fit" lines: if the trip is short for its pace, say what to drop.
3. Follow the route legs in the order given. Day 1 is the arrival day and uses the arrival leg; the last day is the departure day. The number of days equals the nights plus one and is given to you.
4. Pace: relaxed means one thing a day, steady two, packed three. Hiking days cite the Mountain Code line and a turn-back plan. Winter days say when it gets dark.
4b. Where to sleep: on the arrival day and on every day the base changes, include a stay item (stay:<id>) with a note on why that one, so the traveller can book it. The departure day includes the departure leg if one is given, otherwise the kit or stay line that matters that morning.
5. Voice: English, sentence case titles, active voice, exact numbers only from the facts, contractions where natural. No em dashes anywhere; use full stops or commas. Never use these words: breathtaking, stunning, magical, vibrant, charming, hidden gem, bucket list, once-in-a-lifetime, unforgettable, quaint, idyllic, unspoiled, timeless, epic, dramatic, majestic, iconic, jaw-dropping, fairy tale, wonderland, mystical, must-see, picturesque, pristine, nestled, boasts, wanderlust. Do not pad with filler like "In today's world" or "It's worth noting".
6. Each day: a title of at most eight words, a summary of at most 60 words that tells the traveller what the day actually involves (cold, distance, timing), the items with a one-line note each (why this one, what to book, when to leave), and one sentence in "why" that gives the reasoning (season, light, pace, logistics).
7. The intro is at most 80 words and opens with the reality check, not a welcome. The title is at most ten words.
8. Submit the plan only through the submit_plan tool.`;

const SUBMIT_PLAN_TOOL: Anthropic.Tool = {
  name: 'submit_plan',
  description: 'Submit the finished day-by-day plan. Every item ref must be an id from the facts provided in the conversation.',
  input_schema: {
    type: 'object',
    properties: {
      title: { type: 'string', description: 'Plan title, at most ten words, sentence case.' },
      intro: { type: 'string', description: 'At most 80 words. Opens with the reality check for these dates and regions.' },
      days: {
        type: 'array',
        description: 'One entry per day, arrival day first, departure day last.',
        items: {
          type: 'object',
          properties: {
            day: { type: 'integer', description: 'Day number starting at 1.' },
            date: { type: 'string', description: 'ISO date (YYYY-MM-DD) when the trip has dates.' },
            region: { type: 'string', description: 'Region name for the day, from the facts.' },
            title: { type: 'string', description: 'At most eight words, sentence case.' },
            summary: { type: 'string', description: 'At most 60 words of what the day involves.' },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  ref: { type: 'string', description: 'activity:<id>, event:<id>, stay:<id>, leg:<id> or kit:<id> from the facts.' },
                  note: { type: 'string', description: 'One line: why this one, what to book, when to leave.' },
                },
                required: ['ref', 'note'],
              },
            },
            why: { type: 'string', description: 'One sentence of reasoning for the day.' },
          },
          required: ['day', 'region', 'title', 'summary', 'items', 'why'],
        },
      },
      unverified: {
        type: 'array',
        items: { type: 'string' },
        description: 'Things a traveller would want that the facts do not cover, one line each. Empty when nothing is missing.',
      },
    },
    required: ['title', 'intro', 'days', 'unverified'],
  },
  cache_control: { type: 'ephemeral', ttl: '1h' },
};

// ── Facts the model sees ────────────────────────────────────────────────────

function factsForModel(facts: PlanResult, request: PlanRequest) {
  return {
    basics: {
      startDate: request.startDate,
      endDate: request.endDate,
      nights: facts.window.nights,
      days: (facts.window.nights ?? 0) + 1,
      season: facts.window.season,
      travellers: request.travellers,
      interests: request.interests,
      pace: request.pace ?? 'steady',
      mobility: request.mobility ?? 'unknown',
      budget: request.budget,
      regionsInOrder: facts.zones.map((zone) => zone.name),
    },
    light: facts.light.map((line) => line.text),
    fit: facts.fit.map((line) => line.text),
    legs: facts.route.legs.map((leg) => ({ id: `leg:${leg.id}`, from: leg.from, to: leg.to, method: leg.method, text: leg.text })),
    gettingAround: facts.route.method.map((line) => line.text),
    activities: facts.activities.map((item) => ({ id: `activity:${item.id}`, name: item.name, region: item.zone, location: item.location, why: item.why, price: item.priceRange })),
    events: facts.events.map((item) => ({ id: `event:${item.id}`, name: item.name, region: item.zone, location: item.location, start: item.startDate, end: item.endDate })),
    stays: facts.stays.map((item) => ({ id: `stay:${item.id}`, name: item.name, region: item.zone, location: item.location, why: item.why })),
    kit: facts.kit.map((line) => ({ id: `kit:${line.id}`, text: line.text })),
  };
}

type RefMap = Set<string>;

function refsOf(facts: PlanResult): RefMap {
  const refs = new Set<string>();
  for (const item of facts.activities) refs.add(`activity:${item.id}`);
  for (const item of facts.events) refs.add(`event:${item.id}`);
  for (const item of facts.stays) refs.add(`stay:${item.id}`);
  for (const leg of facts.route.legs) refs.add(`leg:${leg.id}`);
  for (const line of facts.kit) refs.add(`kit:${line.id}`);
  return refs;
}

// ── Validation of what came back ────────────────────────────────────────────

const clean = (text: unknown, max = 600): string =>
  String(text ?? '')
    .replace(/\s*—\s*/g, ', ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);

interface Validated {
  title: string;
  intro: string;
  days: DayPlan[];
  unverified: string[];
  bannedWords: string[];
}

function validate(input: unknown, refs: RefMap, days: number): Validated {
  const raw = (input ?? {}) as Record<string, unknown>;
  const unverified: string[] = Array.isArray(raw.unverified) ? raw.unverified.map((line) => clean(line, 200)).filter(Boolean).slice(0, 8) : [];
  const dayList: DayPlan[] = [];
  const rawDays = Array.isArray(raw.days) ? raw.days : [];

  for (const [index, entry] of rawDays.slice(0, Math.max(days, 1) + 2).entries()) {
    const day = (entry ?? {}) as Record<string, unknown>;
    const items: DayPlanItem[] = [];
    for (const rawItem of Array.isArray(day.items) ? day.items : []) {
      const item = (rawItem ?? {}) as Record<string, unknown>;
      const ref = clean(item.ref, 120);
      if (refs.has(ref)) items.push({ ref, note: clean(item.note, 240) });
      else if (ref) unverified.push(`Left out, not in our listings: ${ref.replace(/^[a-z]+:/, '')}`);
    }
    dayList.push({
      day: Number.isInteger(day.day) ? (day.day as number) : index + 1,
      date: typeof day.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(day.date) ? day.date : undefined,
      region: clean(day.region, 60),
      title: clean(day.title, 90),
      summary: clean(day.summary, 500),
      items,
      why: clean(day.why, 240),
    });
  }

  const everything = [raw.title, raw.intro, ...dayList.flatMap((d) => [d.title, d.summary, d.why, ...d.items.map((i) => i.note)])].map((t) => clean(t)).join(' ');
  const bannedWords = [...new Set((everything.match(BANNED) ?? []).map((w) => w.toLowerCase()))];

  return { title: clean(raw.title, 90), intro: clean(raw.intro, 700), days: dayList, unverified: [...new Set(unverified)].slice(0, 10), bannedWords };
}

// ── The call ────────────────────────────────────────────────────────────────

const memo = new Map<string, AgentPlan>();

function remember(plan: AgentPlan) {
  if (memo.size >= MEMO_LIMIT) memo.delete(memo.keys().next().value as string);
  memo.set(plan.inputHash, plan);
}

/** The model may answer with plain JSON instead of the tool; read that too so one odd reply does not fail the plan. */
function jsonFromText(response: Anthropic.Message): unknown {
  const text = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map((block) => block.text)
    .join('\n');
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start < 0 || end <= start) return undefined;
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return undefined;
  }
}

async function ask(client: Anthropic, messages: Anthropic.MessageParam[]) {
  // This model does not accept a forced tool choice, so the system prompt insists on the tool and the text path is the fallback
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_OUTPUT_TOKENS,
    system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral', ttl: '1h' } }],
    tools: [SUBMIT_PLAN_TOOL],
    tool_choice: { type: 'auto' },
    messages,
  });
  const toolUse = response.content.find((block): block is Anthropic.ToolUseBlock => block.type === 'tool_use');
  const usage = {
    input: response.usage.input_tokens,
    output: response.usage.output_tokens,
    cacheRead: response.usage.cache_read_input_tokens ?? 0,
    cacheWrite: response.usage.cache_creation_input_tokens ?? 0,
  };
  if (!toolUse || response.stop_reason === 'max_tokens') {
    const text = response.content.filter((block): block is Anthropic.TextBlock => block.type === 'text').map((block) => block.text).join(' ');
    console.warn('plan/agent: reply not usable as a plan', { stop: response.stop_reason, blocks: response.content.map((block) => block.type), text: text.slice(0, 300) });
  }
  return { input: toolUse?.input ?? jsonFromText(response), usage, stop: response.stop_reason };
}

/** Builds the facts, asks the model for the day-by-day plan, and keeps only what the facts support. */
export async function writeDayPlan(request: PlanRequest): Promise<AgentPlan> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new AgentUnavailableError('ANTHROPIC_API_KEY is not set');
  if (!request.startDate || !request.endDate || request.zones.length === 0) {
    throw new AgentInputError('Dates and at least one destination are needed for a day-by-day plan.');
  }

  const facts = await buildPlan(request);
  if (!facts.window.nights || facts.window.nights < 1) throw new AgentInputError('The trip needs at least one night.');
  if (facts.window.nights > 21) throw new AgentInputError('The day-by-day plan covers trips of up to 21 nights.');

  const compact = factsForModel(facts, request);
  const inputHash = createHash('sha256').update(JSON.stringify({ request: { ...request, savedIds: undefined }, compact })).digest('hex').slice(0, 24);
  const cached = memo.get(inputHash);
  if (cached) return cached;

  const client = new Anthropic({ apiKey });
  const refs = refsOf(facts);
  const dayCount = facts.window.nights + 1;
  const factsMessage: Anthropic.MessageParam = {
    role: 'user',
    content: `Trip basics and every fact you may use, as JSON. Plan ${dayCount} days (arrival day to departure day).\n${JSON.stringify(compact)}`,
  };

  let calls = 1;
  const first = await ask(client, [factsMessage]);
  let usage = first.usage;
  let stop = first.stop;
  let result = validate(first.input, refs, dayCount);

  // One retry covers the two ways a reply goes wrong: no days, or brochure words
  const problem = result.days.length === 0 ? 'empty' : result.bannedWords.length ? 'banned' : null;
  if (problem) {
    if (problem === 'empty') {
      console.warn('plan/agent: no days in the first reply', { stop, input: JSON.stringify(first.input ?? null).slice(0, 600) });
    }
    calls += 1;
    const draftNote = problem === 'empty'
      ? 'Draft submitted without a days array.'
      : `Draft submitted. It used these banned words: ${result.bannedWords.join(', ')}.`;
    const complaint = problem === 'empty'
      ? `That submission had no days. Submit the complete plan now through submit_plan with all ${dayCount} days, each with items that use the given ids.`
      : 'Rewrite the whole plan without those words and without em dashes, keeping every ref. Submit it again through submit_plan.';
    const retry = await ask(client, [factsMessage, { role: 'assistant', content: draftNote }, { role: 'user', content: complaint }]);
    const second = validate(retry.input, refs, dayCount);
    usage = { input: usage.input + retry.usage.input, output: usage.output + retry.usage.output, cacheRead: usage.cacheRead + retry.usage.cacheRead, cacheWrite: usage.cacheWrite + retry.usage.cacheWrite };
    stop = retry.stop;
    if (second.days.length) result = second;
  }

  if (result.days.length === 0) {
    throw new Error(`The model returned no days (stop reason ${stop})`);
  }

  const plan: AgentPlan = {
    title: result.title,
    intro: result.intro,
    days: result.days,
    unverified: result.unverified,
    facts,
    model: MODEL,
    generatedAt: new Date().toISOString(),
    inputHash,
    usage: { ...usage, calls },
  };
  console.info('plan/agent', { model: MODEL, calls, ...usage, days: plan.days.length, banned: result.bannedWords });
  remember(plan);
  return plan;
}
