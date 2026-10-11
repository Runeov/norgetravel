import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from '@/components/LocalizedLink';
import { ArrowLeft } from 'lucide-react';
import { brandTitle, localeAlternates, LOCALES } from '@/lib/i18n-seo';
import { getZoneStream, isPlanZoneId, getPlanZone, PLAN_ZONE_IDS, SECTION_LIMITS } from '@/lib/planner-data';
import { extractRatings } from '@/lib/ratings';
import { PlanSection, PlanSectionNav, PlanZoneLinks } from '@/components/modules/plan/PlanLayout';
import { ArticleCard, PlaceCard } from '@/components/modules/plan/PlanCards';
import { TripBasics } from '@/components/modules/plan/TripBasics';
import { TripSummaryBar } from '@/components/modules/plan/TripSummaryBar';
import { TravelCard } from '@/components/modules/travel/TravelCard';
import { EventCard } from '@/components/modules/travel/EventCard';
import { TransportCard } from '@/components/modules/travel/TransportCard';

interface Props {
  params: Promise<{ lang: string; zone: string }>;
}

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => PLAN_ZONE_IDS.map((zone) => ({ lang, zone })));
}

function clip(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}.`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zone, lang } = await params;
  if (!isPlanZoneId(zone)) return {};
  const data = getPlanZone(zone);
  const title = brandTitle(`Plan a ${data.name} trip: what to do, where to stay | NorgeTravel`, lang);
  return {
    title,
    description: clip(data.description),
    alternates: localeAlternates(`plan/${zone}`, lang),
    openGraph: { title, description: clip(data.description), type: 'website' },
  };
}

const GRID = 'grid gap-5 md:grid-cols-2 lg:grid-cols-3';

export default async function PlanZonePage({ params }: Props) {
  const { zone } = await params;
  if (!isPlanZoneId(zone)) notFound();

  const stream = await getZoneStream(zone);
  const { zone: data } = stream;

  const sections = [
    { id: 'where', label: 'Where', count: stream.places.length },
    { id: 'do', label: 'Do', count: stream.experiencesTotal },
    { id: 'attend', label: 'Attend', count: stream.eventsTotal },
    { id: 'stay', label: 'Stay', count: stream.staysTotal },
    { id: 'eat', label: 'Eat', count: stream.restaurantsTotal },
    { id: 'move', label: 'Move', count: stream.transportTotal },
    { id: 'read', label: 'Read', count: stream.articlesTotal },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Slides under the transparent navbar like the other dark heroes */}
      <section className="-mt-20 bg-gradient-to-br from-[#1B3A5C] to-[#12294a] pt-20 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <Link
            href="/plan"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All destinations
          </Link>
          <span className="mt-4 block h-1 w-10 rounded-full" style={{ backgroundColor: data.color }} />
          <h1 className="mt-3 text-3xl font-bold md:text-5xl">Plan a {data.name} trip</h1>
          <p className="mt-2 text-lg font-medium text-white/80">{data.tagline}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">{data.description}</p>
          <dl className="mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {data.stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5">
                <dt className="text-xs font-medium uppercase tracking-wider text-white/60">{stat.label}</dt>
                <dd className="mt-0.5 text-base font-bold">{stat.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <TripSummaryBar />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <PlanZoneLinks activeId={zone} className="py-6" />
        <TripBasics />
        <PlanSectionNav sections={sections} />

        <PlanSection
          id="where"
          eyebrow="Where"
          title={`Places in ${data.name}`}
          intro="The towns, villages and fjords that anchor a trip here. Each opens its own guide."
          count={stream.places.length}
          shown={stream.places.length}
        >
          <div className={GRID}>
            {stream.places.map((place) => (
              <PlaceCard key={place.id} place={place} zoneId={zone} />
            ))}
          </div>
        </PlanSection>

        <PlanSection
          id="do"
          eyebrow="Do"
          title="Activities and tours"
          intro="Featured and best-rated first. Add what you want, then book from the card."
          count={stream.experiencesTotal}
          shown={SECTION_LIMITS.experiences}
          seeAllHref="/travel/experiences"
        >
          <div className={GRID}>
            {stream.experiences.map((item) => (
              <TravelCard key={item.id} item={item} category="experiences" ratings={extractRatings(item)} />
            ))}
          </div>
        </PlanSection>

        <PlanSection
          id="attend"
          eyebrow="Attend"
          title="Events and festivals"
          intro="Dated events in this region. Ticket release dates matter as much as departure times."
          count={stream.eventsTotal}
          shown={SECTION_LIMITS.events}
          seeAllHref="/travel/events"
        >
          <div className={GRID}>
            {stream.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </PlanSection>

        <PlanSection
          id="stay"
          eyebrow="Stay"
          title="Places to stay"
          intro="Hotels, cabins and rorbuer with their guest ratings. Book through the card."
          count={stream.staysTotal}
          shown={SECTION_LIMITS.stays}
          seeAllHref="/travel/accommodation"
        >
          <div className={GRID}>
            {stream.stays.map((item) => (
              <TravelCard key={item.id} item={item} category="accommodation" ratings={extractRatings(item)} />
            ))}
          </div>
        </PlanSection>

        <PlanSection
          id="eat"
          eyebrow="Eat"
          title="Restaurants"
          intro="Where to eat after the day out. Ratings come from Google and refresh daily."
          count={stream.restaurantsTotal}
          shown={SECTION_LIMITS.restaurants}
          seeAllHref="/travel/restaurants"
        >
          <div className={GRID}>
            {stream.restaurants.map((item) => (
              <TravelCard key={item.id} item={item} category="restaurants" ratings={extractRatings(item)} />
            ))}
          </div>
        </PlanSection>

        <PlanSection
          id="move"
          eyebrow="Move"
          title="Getting here and around"
          intro="Ferries, trains, buses and flights that serve this region, with operator links."
          count={stream.transportTotal}
          shown={SECTION_LIMITS.transport}
          seeAllHref="/travel/transport"
        >
          <div className={GRID}>
            {stream.transport.map((item) => (
              <TransportCard key={item.id} item={item} />
            ))}
          </div>
        </PlanSection>

        <PlanSection
          id="read"
          eyebrow="Read"
          title="Guides and trip reports"
          intro="What our editors found on the ground: distances, costs, weather and what to pack."
          count={stream.articlesTotal}
          shown={SECTION_LIMITS.articles}
          seeAllHref="/travel-guides"
        >
          <div className={GRID}>
            {stream.articles.map((article) => (
              <ArticleCard key={article.slug} article={article} zoneId={zone} />
            ))}
          </div>
        </PlanSection>

        <div className="border-t border-slate-200 py-10">
          <p className="text-base text-slate-600">Looking somewhere else?</p>
          <PlanZoneLinks activeId={zone} className="mt-3 pb-6" />
        </div>
      </div>
    </main>
  );
}
