import 'server-only';
import { getArticles, getPublishedArticles } from '@/lib/admin/articles';
import { GUIDE_SECTIONS, guideSectionOf, type GuideSectionId } from '@/lib/guide-sections';
import { tripReportRegion, type TripReportRegion } from '@/lib/trip-report-region';
import { plannerBlockHref, splitAtPlannerMarker } from '@/lib/article-blocks';
import { isCjkBody } from '@/lib/article-locales';
import { injectAffiliateLinks } from '@/lib/affiliate-linker';
import type { Locale } from '@/lib/i18n-seo';
import type { PlanZoneId } from '@/lib/planner-data';
import { APP_COPY, type AppCopy } from '@/i18n/app-copy';
import { fmt } from '@/i18n/format';
import { foldPlaceName } from './towns';
import { PAGE_SIZE, appHref, guideHref, type FilterOption } from './model';

/**
 * The travel guides as app screens: the guide list with its section and
 * region filters, and one guide with its body prepared for the app. Articles,
 * sections, regions and planner blocks come from the site's own helpers.
 *
 * The English article owns each guide's identity, section and region. On
 * Chinese and Japanese pages its title, excerpt and body are replaced by the
 * translation where the article store has one (the same stores and rules as
 * the site's article pages); untranslated text stays English and is marked.
 */

const REGION_IDS: TripReportRegion[] = ['northern-norway', 'lofoten', 'fjords', 'svalbard', 'cities'];

type Article = Awaited<ReturnType<typeof getPublishedArticles>>[number];

export interface GuideCard {
  category: string;
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  readTime: number;
  readLabel: string;
  /** "en" when the title and excerpt are the English originals on a Chinese or Japanese page. */
  lang?: 'en';
  imageUrl?: string;
  imageAlt?: string;
  section: { id: GuideSectionId; title: string };
  region: TripReportRegion;
  regionLabel: string;
  author: string;
  isFeatured: boolean;
}

interface GuideEntry {
  article: Article;
  /** The article as the page language's store has it, when that is not English. */
  local?: Article;
  card: GuideCard;
  /** Folded title, excerpt and region in both languages, for search. */
  search: string;
}

const CJK = /[぀-ヿ㐀-鿿]/;

/** A translated field is used only when it is written in Chinese or Japanese. */
const translated = (text: string | undefined): text is string => !!text && CJK.test(text);

function entry(article: Article, local: Article | undefined, copy: AppCopy): GuideEntry | null {
  const section = guideSectionOf(article.category);
  if (!section) return null;
  const region = tripReportRegion(article);
  const title = translated(local?.title) ? local.title : article.title;
  const excerpt = translated(local?.excerpt) ? local.excerpt : article.excerpt;
  const card: GuideCard = {
    category: article.category,
    slug: article.slug,
    href: guideHref(article.category, article.slug),
    title,
    excerpt,
    readTime: article.readTime,
    readLabel: fmt(copy.guides.readTime, { n: article.readTime }),
    ...(copy.locale !== 'en' && title === article.title && { lang: 'en' as const }),
    ...(article.featuredImage && { imageUrl: article.featuredImage, imageAlt: article.featuredImageAlt || article.title }),
    section: { id: section.id, title: copy.guides.sections[section.id] },
    region,
    regionLabel: copy.regions[region],
    author: local?.authorName || article.authorName || 'NorgeTravel',
    isFeatured: article.isFeatured,
  };
  const search = foldPlaceName(`${title} ${excerpt} ${article.title} ${article.excerpt} ${card.regionLabel}`);
  return { article, ...(local && { local }), card, search };
}

async function guideEntries(locale: Locale): Promise<GuideEntry[]> {
  const copy = APP_COPY[locale];
  const [english, store] = await Promise.all([
    getPublishedArticles(),
    locale === 'en' ? Promise.resolve(undefined) : getArticles(locale),
  ]);
  return english.flatMap((article) => {
    const local = store?.[article.id];
    const usable = local && local.status === 'published' ? local : undefined;
    const e = entry(article, usable, copy);
    return e ? [e] : [];
  });
}

// ─── List ───

export interface GuidesState {
  section: GuideSectionId | null;
  region: TripReportRegion | null;
  q: string;
  limit: number;
}

type SearchParams = Record<string, string | string[] | undefined>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export function parseGuidesState(params: SearchParams): GuidesState {
  const section = first(params.section);
  const region = first(params.region);
  const limit = Number.parseInt(first(params.limit) ?? '', 10);
  return {
    section: GUIDE_SECTIONS.find((s) => s.id === section)?.id ?? null,
    region: (REGION_IDS as string[]).includes(region ?? '') ? (region as TripReportRegion) : null,
    q: (first(params.q) ?? '').slice(0, 80),
    limit: Number.isFinite(limit) && limit > PAGE_SIZE ? Math.min(Math.ceil(limit / PAGE_SIZE), 10) * PAGE_SIZE : PAGE_SIZE,
  };
}

export function guidesHref(state: GuidesState, patch: Partial<GuidesState> = {}): string {
  const next = { ...state, ...patch };
  if (patch.limit === undefined) next.limit = PAGE_SIZE;
  const params = new URLSearchParams();
  if (next.section) params.set('section', next.section);
  if (next.region) params.set('region', next.region);
  if (next.q.trim()) params.set('q', next.q.trim());
  if (next.limit > PAGE_SIZE) params.set('limit', String(next.limit));
  const query = params.toString();
  return `/app/guides/${query ? `?${query}` : ''}`;
}

export interface GuidesResult {
  state: GuidesState;
  featured?: GuideCard;
  items: GuideCard[];
  total: number;
  hasMore: boolean;
  sections: FilterOption<GuideSectionId>[];
  regions: FilterOption<TripReportRegion>[];
}

export async function getGuides(state: GuidesState, locale: Locale): Promise<GuidesResult> {
  const copy = APP_COPY[locale];
  const entries = await guideEntries(locale);
  const q = foldPlaceName(state.q);
  const tests = {
    section: (e: GuideEntry) => !state.section || e.card.section.id === state.section,
    region: (e: GuideEntry) => !state.region || e.card.region === state.region,
    q: (e: GuideEntry) => !q || e.search.includes(q),
  };
  const apply = (except?: keyof typeof tests) =>
    entries.filter((e) => (Object.keys(tests) as (keyof typeof tests)[]).every((k) => k === except || tests[k](e)));

  const results = apply().map((e) => e.card);
  const unfiltered = !state.section && !state.region && !state.q;
  const featured = unfiltered ? results.find((c) => c.isFeatured && c.imageUrl) ?? results.find((c) => c.imageUrl) : undefined;
  const list = featured ? results.filter((c) => c !== featured) : results;

  return {
    state,
    ...(featured && { featured }),
    items: list.slice(0, state.limit),
    total: results.length,
    hasMore: list.length > state.limit,
    sections: GUIDE_SECTIONS.map((s) => ({
      value: s.id,
      label: copy.guides.sections[s.id],
      count: apply('section').filter((e) => e.card.section.id === s.id).length,
    })),
    regions: REGION_IDS.map((r) => ({
      value: r,
      label: copy.regions[r],
      count: apply('region').filter((e) => e.card.region === r).length,
    })),
  };
}

// ─── One guide ───

export interface GuideDetail {
  card: GuideCard;
  subtitle?: string;
  tags: string[];
  publishedAt?: string;
  /** Hero image or video, unless the body already shows the same image. */
  hero?: { kind: 'image'; src: string; alt: string; caption?: string } | { kind: 'video'; src: string };
  /** Body HTML before and after the planner block, with site links pointed at app screens. */
  before: string;
  after: string;
  /** "en" when the body is the English original on a Chinese or Japanese page. */
  bodyLang?: 'en';
  /** Shown above an English body on a Chinese or Japanese page. */
  englishNotice?: string;
  planner?: { href: string; regions: string };
  /** The planner set to the guide's region, for the closing card. */
  planHref: string;
  related: GuideCard[];
}

// Links in stored article HTML. Internal ones are rewritten like the app's
// own links; external ones (and the affiliate links added below) are kept.
const withAppLinks = (html: string): string =>
  html.replace(/href="(\/[^"]*)"/g, (_, href: string) => `href="${appHref(href)}"`);

const RELATED_COUNT = 3;

/** Planner blocks name planner zones; the four regions and the cities use the app's region names. */
const zoneName = (id: string, copy: AppCopy): string =>
  (copy.regions as Record<string, string | undefined>)[id] ?? copy.zoneText[id as PlanZoneId]?.name ?? id;

export async function getGuide(category: string, slug: string, locale: Locale): Promise<GuideDetail | null> {
  const copy = APP_COPY[locale];
  const all = await guideEntries(locale);
  const found = all.find(({ article }) => article.category === category && article.slug === slug);
  if (!found) return null;
  const { article, local, card } = found;

  const localBody = local && isCjkBody(local.content) ? local.content : undefined;
  const englishBody = locale !== 'en' && !localBody;
  const body = splitAtPlannerMarker(localBody ?? article.content);
  const prepare = (html: string) => withAppLinks(injectAffiliateLinks(html, locale));

  const sameSection = all.map((e) => e.card).filter((c) => c.section.id === card.section.id && c.slug !== card.slug);
  const related = [...sameSection.filter((c) => c.region === card.region), ...sameSection.filter((c) => c.region !== card.region)].slice(
    0,
    RELATED_COUNT
  );

  const content = localBody ?? article.content;
  const showHero = article.featuredVideo || (article.featuredImage && !content.includes(article.featuredImage));
  const subtitle = translated(local?.subtitle) ? local.subtitle : article.subtitle;

  return {
    card,
    ...(subtitle && { subtitle }),
    tags: local?.tags?.length ? local.tags : article.tags,
    ...(article.publishedAt && { publishedAt: article.publishedAt }),
    ...(showHero && {
      hero: article.featuredVideo
        ? { kind: 'video' as const, src: article.featuredVideo }
        : {
            kind: 'image' as const,
            src: article.featuredImage as string,
            alt: article.featuredImageAlt || article.title,
            ...((article.featuredImageCaption || article.featuredImageAlt) && {
              caption: article.featuredImageCaption || article.featuredImageAlt || undefined,
            }),
          },
    }),
    before: prepare(body.before),
    after: prepare(body.after),
    ...(englishBody && { bodyLang: 'en' as const, ...(copy.guides.englishBody && { englishNotice: copy.guides.englishBody }) }),
    ...(body.block && {
      planner: {
        href: appHref(plannerBlockHref(body.block)),
        regions: body.block.zones.map((z) => zoneName(z, copy)).join(copy.guides.and),
      },
    }),
    planHref: `/app/plan/?zones=${card.region}`,
    related,
  };
}
