import Link from '@/components/LocalizedLink';
import { ArrowRight } from 'lucide-react';
import { localizedMetadata } from '@/lib/i18n-seo';
import { getPlanOverview } from '@/lib/planner-data';
import { PLAN_ZONE_ICONS, zoneAccent } from '@/components/modules/plan/PlanLayout';
import { TripBasics } from '@/components/modules/plan/TripBasics';
import { TripPlanPanel } from '@/components/modules/plan/TripPlanPanel';
import { TripSummaryBar } from '@/components/modules/plan/TripSummaryBar';

export const dynamic = 'force-static';

export const generateMetadata = localizedMetadata('plan', {
  title: 'Plan your Norway trip | NorgeTravel',
  description:
    'Pick a destination, add the places, activities, events, stays and transport you want, and build your Norway trip in one place.',
});

export default async function PlanPage() {
  const overview = await getPlanOverview();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Slides under the transparent navbar like the other dark heroes */}
      <section className="-mt-20 bg-gradient-to-br from-[#1B3A5C] to-[#12294a] pt-20 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#00CC6A]">Trip planner</p>
          <h1 className="mt-2 text-3xl font-bold md:text-5xl">Plan your Norway trip</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            Six destinations. Open one, add what you want to see, do and book, and keep it all in one trip.
            Dates and interests go in below so the route and day plan can follow.
          </p>
          <div className="mt-6">
            <TripSummaryBar />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <TripBasics startOpen />
        <TripPlanPanel />
      </section>

      <section aria-labelledby="plan-zones-title" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 id="plan-zones-title" className="text-2xl font-bold text-[#1B3A5C] md:text-3xl">
          Where to?
        </h2>
        <p className="mt-1 max-w-2xl text-base leading-relaxed text-slate-600">
          Each destination page lists its places, activities, events, stays, restaurants, transport and guides, with an add button on every card.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {overview.map(({ zone, counts }) => {
            const Icon = PLAN_ZONE_ICONS[zone.id];
            return (
              <li key={zone.id}>
                <Link
                  href={`/plan/${zone.id}`}
                  className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-[#1B3A5C]/40 hover:shadow-md"
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2"
                    style={{ borderColor: zoneAccent(zone) }}
                  >
                    {Icon && <Icon className="h-6 w-6 text-[#1B3A5C]" aria-hidden="true" />}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-[#1B3A5C]">{zone.name}</h3>
                  <p className="mt-1 text-base text-slate-600">{zone.tagline}</p>
                  <p className="mt-3 text-sm font-medium text-slate-500">
                    {counts.experiences} activities · {counts.stays} stays · {counts.events} events · {counts.articles} guides
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold text-[#1B3A5C] transition-colors group-hover:text-[#00CC6A]">
                    Open {zone.name}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
