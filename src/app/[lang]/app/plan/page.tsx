import type { Metadata } from 'next';
import { getPlanOverview, isPlanZoneId } from '@/lib/planner-data';
import { brandTitle } from '@/lib/i18n-seo';
import { appCopy } from '@/i18n/app-copy';
import { PLAN_UI } from '@/i18n/plan-ui';
import { DEFAULT_FEED, REGION_FILTERS, feedHref, type RegionFilter } from '@/lib/app/model';
import { TripBasics } from '@/components/modules/plan/TripBasics';
import { TripPlanPanel } from '@/components/modules/plan/TripPlanPanel';
import { PlanCopyProvider } from '@/components/modules/plan/PlanCopy';
import { PlanZones, type PlanZoneCard } from '@/components/modules/app/PlanZones';
import { SavedList } from '@/components/modules/app/SavedList';

type Params = Promise<{ lang: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang } = await params;
  const copy = appCopy(lang);
  return { title: brandTitle(copy.meta.plan, lang), description: copy.meta.planDescription };
}

const isRegion = (id: string): id is RegionFilter => (REGION_FILTERS as readonly string[]).includes(id);

/**
 * The trip planner inside the app. The basics form and the plan are the
 * site planner's own components, drawn in the app's colours through the
 * planner tokens and written in the page language through the planner copy;
 * saved items and destinations use the app's cards.
 */
export default async function AppPlanPage({ params }: { params: Params }) {
  const copy = appCopy((await params).lang);
  const overview = await getPlanOverview();
  const zones: PlanZoneCard[] = overview.map(({ zone, counts }) => {
    const text = isPlanZoneId(zone.id) ? copy.zoneText[zone.id] : undefined;
    return {
      id: zone.id,
      name: text?.name ?? zone.name,
      tagline: text?.tagline ?? zone.tagline,
      color: zone.color,
      counts,
      ...(isRegion(zone.id) && { browseHref: feedHref({ ...DEFAULT_FEED, tab: 'tours', region: zone.id }) }),
    };
  });

  return (
    <div className="mx-auto max-w-[760px] px-4 pt-8 lg:pt-10">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-app-accent">{copy.plan.eyebrow}</p>
        <h1 className="mt-1 font-display text-[30px] font-bold leading-tight text-app-ink sm:text-[34px]">{copy.plan.heading}</h1>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-app-ink/80">{copy.plan.intro}</p>
      </header>

      <PlanCopyProvider copy={PLAN_UI[copy.locale]}>
      <div className="mt-6 space-y-4">
        <TripBasics startOpen />

        <section aria-labelledby="plan-saved-title" className="rounded-[20px] border border-app-line/15 bg-app-panel/85 p-5 backdrop-blur">
          <h2 id="plan-saved-title" className="mb-3 font-display text-lg font-bold text-app-ink">
            {copy.plan.savedTitle}
          </h2>
          <SavedList limit={5} inline />
        </section>

        <TripPlanPanel />
      </div>
      </PlanCopyProvider>

      <section aria-labelledby="plan-zones-title" className="mt-10">
        <h2 id="plan-zones-title" className="font-display text-xl font-bold text-app-ink">
          {copy.plan.whereTo}
        </h2>
        <p className="mb-4 mt-1 text-sm text-app-ink/75">{copy.plan.whereToBody}</p>
        <PlanZones zones={zones} />
      </section>
    </div>
  );
}
