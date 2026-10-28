import { PLAN_ZONE_IDS, type PlanZoneId } from '@/lib/planner-data';
import { TRIP_INTERESTS } from '@/types/trip';
import type { TripInterest } from '@/types/trip';

export interface PlannerBlock {
  zones: PlanZoneId[];
  interests: TripInterest[];
}

// <!--planner zones="lofoten,northern-norway" interests="wildlife"--> in an article body
const PLANNER_MARKER = /<!--\s*planner\b([^>]*?)-->/;

const INTEREST_IDS = new Set<string>(TRIP_INTERESTS.map((interest) => interest.id));

function listAttribute(attributes: string, name: string): string[] {
  const match = attributes.match(new RegExp(`${name}="([^"]*)"`));
  return (match?.[1] ?? '').split(',').map((value) => value.trim()).filter(Boolean);
}

/** Splits an article body at its planner marker, so the page can render the planner block in its place. */
export function splitAtPlannerMarker(html: string): { before: string; after: string; block: PlannerBlock | null } {
  const match = html.match(PLANNER_MARKER);
  if (!match || match.index === undefined) return { before: html, after: '', block: null };
  const zones = listAttribute(match[1], 'zones').filter((zone): zone is PlanZoneId =>
    (PLAN_ZONE_IDS as readonly string[]).includes(zone)
  );
  const interests = listAttribute(match[1], 'interests').filter((id): id is TripInterest => INTEREST_IDS.has(id));
  return {
    before: html.slice(0, match.index),
    after: html.slice(match.index + match[0].length),
    block: zones.length ? { zones, interests } : null,
  };
}

/** One region opens its planner page; several open the overview. The planner reads the query on load. */
export function plannerBlockHref(block: PlannerBlock): string {
  const path = block.zones.length === 1 ? `/plan/${block.zones[0]}/` : '/plan/';
  const query = new URLSearchParams({ zones: block.zones.join(',') });
  if (block.interests.length) query.set('interests', block.interests.join(','));
  return `${path}?${query.toString().replace(/%2C/g, ',')}`;
}

const decodeEntities = (text: string) =>
  text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const plainText = (html: string) => decodeEntities(html.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

/**
 * The question and answer pairs under an article's "Questions travellers ask" heading:
 * each h3 is a question, the paragraphs and lists up to the next heading are its answer.
 */
export function extractFaq(html: string): { question: string; answer: string }[] {
  const start = html.search(/<h2[^>]*>\s*Questions travellers ask\s*<\/h2>/i);
  if (start < 0) return [];
  const section = html.slice(start).replace(/^<h2[^>]*>.*?<\/h2>/i, '');
  const end = section.search(/<h2[\s>]|<p class="text-sm/);
  const body = end < 0 ? section : section.slice(0, end);
  return body
    .split(/<h3[^>]*>/i)
    .slice(1)
    .map((chunk) => {
      const [question, rest = ''] = chunk.split(/<\/h3>/i);
      return { question: plainText(question), answer: plainText(rest) };
    })
    .filter((pair) => pair.question && pair.answer);
}
