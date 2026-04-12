'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  Calendar,
  Mountain,
  Waves,
  Ship,
  ArrowRight,
  ExternalLink,
  Star,
  UtensilsCrossed,
  Footprints,
  TrendingUp,
  Ruler,
  Fish,
  Camera,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { lofotenRestaurants } from '@/data/city-guides/restaurants-lofoten';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ActivityGuide {
  title: string;
  description: string;
  duration: string;
  price: string;
  season: string;
  icon: React.ReactNode;
  href: string;
  linkLabel: string;
  isExternal?: boolean;
}

interface Trail {
  name: string;
  distance: string;
  elevation: string;
  time: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  description: string;
  slug?: string;
}

interface Tour {
  name: string;
  type: string;
  price: string;
  duration: string;
  highlight: string;
  affiliateUrl: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const featuredGuides: ActivityGuide[] = [
  {
    title: 'Reinebringen: 448 sherpa-built steps above Reine',
    description:
      'The most photographed viewpoint in Lofoten. 1,566 stone steps built by Nepalese sherpas from 2018 onward to control erosion from over a million annual visitors. Start in Reine village, 2\u20133 hours round trip, 448 metres elevation. Shoes with grip mandatory. The top ledge gets icy from September onward.',
    duration: '2\u20133 hours',
    price: 'Free (parking 100 NOK)',
    season: 'Jun\u2013Sep',
    icon: <Mountain className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/lofoten-islands-l95198/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Check guided options',
    isExternal: true,
  },
  {
    title: 'Stockfish heritage: the cod drying racks of \u00c5',
    description:
      'Lofoten dries 20,000 tonnes of Arctic cod each year on open wooden racks (hjell) from February to June. The Stockfish Museum in \u00c5 tells the 1,000-year story in 90 minutes. The smell of the racks is the smell of Lofotfiske. Working production, not a photo backdrop.',
    duration: '1\u20132 hours',
    price: '120 NOK entry',
    season: 'Year-round',
    icon: <Fish className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.museumnord.no/en/our-venues/norsk-fiskevaersmuseum/',
    linkLabel: 'Museum details',
    isExternal: true,
  },
  {
    title: 'Cod fishing charter in Lofotfiske season',
    description:
      'Skrei migrates from the Barents Sea to Lofoten to spawn each year from January to April. Charters depart Svolv\u00e6r and Henningsv\u00e6r daily. Rods, bait, and survival suits included. 950\u20131,600 NOK per person for 3\u20135 hours on the Vestfjord. Boats go out in conditions that would ground most tourist operators.',
    duration: '3\u20135 hours',
    price: 'From 950 NOK',
    season: 'Jan\u2013Apr peak',
    icon: <Ship className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/lofoten-islands-l95198/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Book a charter',
    isExternal: true,
  },
  {
    title: 'Midnight sun sea kayak from Svolv\u00e6r',
    description:
      '24-hour daylight from 28 May to 14 July. Paddle from Svolv\u00e6r harbour into the sheltered sounds past rorbu colonies and sea eagle nests. 3\u20134 hours, no experience required, guides carry VHF radios. Water temperature 8\u201312\u00b0C. Best light between 22:00 and 02:00.',
    duration: '3\u20134 hours',
    price: 'From 1,100 NOK',
    season: 'Jun\u2013Aug',
    icon: <Waves className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/lofoten-islands-l95198/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Check availability',
    isExternal: true,
  },
];

const tours: Tour[] = [
  {
    name: 'Lofoten Sea Eagle Safari (Trollfjord)',
    type: 'RIB boat, 2 hours',
    price: 'From 990 NOK',
    duration: '2 hours',
    highlight:
      'Fast RIB from Svolv\u00e6r into the narrow Trollfjord. Sea eagles circle the boat as guides throw fish. 100+ eagle population in the area. Year-round departures. Thermal suits issued at the dock.',
    affiliateUrl:
      'https://www.getyourguide.com/lofoten-islands-l95198/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Cod fishing charter from Svolv\u00e6r',
    type: 'Skrei season, 3\u20135 hours',
    price: 'From 950 NOK',
    duration: '3\u20135 hours',
    highlight:
      'Arctic cod migration peaks January to April. Local skippers know which banks are active each morning. Rods and bait included. You keep what you catch (the boat fillets it). Survival suits mandatory.',
    affiliateUrl:
      'https://www.getyourguide.com/lofoten-islands-l95198/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Northern Lights chase from Svolv\u00e6r',
    type: 'Aurora minibus, 5\u20137 hours',
    price: 'From 1,290 NOK',
    duration: '5\u20137 hours',
    highlight:
      'Lofoten sits under the auroral oval at 68\u00b0N. Chasers drive the E10 east toward Austv\u00e5g\u00f8y or west toward the Moskenes coast depending on cloud. Small groups, hot drinks, tripods provided. Book two nights minimum.',
    affiliateUrl:
      'https://www.getyourguide.com/lofoten-islands-l95198/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Photography workshop in Reine',
    type: 'Half-day guided shoot',
    price: 'From 1,950 NOK',
    duration: '4\u20136 hours',
    highlight:
      'Local photographers run composition workshops at Reinebringen, Hamn\u00f8y bridges, and Sakris\u00f8y. Tripods available, drone guidance, and timing locked to the golden-hour window. Winter sessions focus on aurora over rorbu.',
    affiliateUrl:
      'https://www.getyourguide.com/lofoten-islands-l95198/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
];

const trails: Trail[] = [
  {
    name: 'Reinebringen via the sherpa stairs',
    distance: '2 km round trip',
    elevation: '448 m',
    time: '2\u20133 hours',
    difficulty: 'Moderate',
    description:
      'The most photographed viewpoint in Lofoten. 1,978 stone steps built by Nepalese sherpas between 2016 and 2021. Starts at the south end of Reine village. Exposed in wind. Icy from September. DNT Blue by grade but crowded in summer. Go at 05:00 for the photo without people.',
    slug: 'reinebringen-sherpa-stairs-hike',
  },
  {
    name: 'Ryten and Kvalvika Beach',
    distance: '8 km round trip',
    elevation: '540 m',
    time: '4\u20135 hours',
    difficulty: 'Moderate',
    description:
      'From Torsfjord trailhead across tundra and bog to the 543m Ryten ledge directly above Kvalvika Beach. The white crescent of sand sits 500m below. Optional descent to the beach adds 90 minutes and 300m return climb. DNT Blue.',
    slug: 'ryten-kvalvika-beach-hike',
  },
  {
    name: 'Munkebu hut and Hermannsdalstinden',
    distance: '10 km to hut round trip',
    elevation: '650 m (hut)',
    time: '5\u20136 hours (hut)',
    difficulty: 'Hard',
    description:
      'From S\u00f8rv\u00e5gen toward the DNT Munkebu hut at 488m. Chains and exposed sections. Continuing to Hermannsdalstinden (1,029m, the highest peak on Moskenes\u00f8ya in western Lofoten) doubles the day. DNT Red with scramble. Munkebu hut closed to overnight stays since 2025. Summer only.',
    slug: 'munkebu-hermannsdalstinden-lofoten',
  },
  {
    name: 'Festv\u00e5gtind above Henningsv\u00e6r',
    distance: '5 km round trip',
    elevation: '541 m',
    time: '3\u20134 hours',
    difficulty: 'Moderate',
    description:
      '541m peak directly above the Henningsv\u00e6r football pitch. Trailhead at the E10 bridge. Steady climb on marked path, scramble near the summit. DNT Blue with short exposed sections. Panoramic view across the Henningsv\u00e6r archipelago and Vestfjord.',
    slug: 'festvagtind-henningsvaer-hike',
  },
];

/* ------------------------------------------------------------------ */
/*  Restaurant mapping                                                 */
/* ------------------------------------------------------------------ */

interface SimpleRestaurant {
  name: string;
  cuisine: string;
  priceRange: string;
  highlight: string;
  norgetravelRating?: number;
  location: string;
}

const featuredRestaurantIds = [
  'restaurant-gammelbua',
  'fiskekrogen',
  'anitas-sjmat',
  'brsen-spiseri',
  'maren-anna',
  'holmen-restaurant',
];

const locationHighlights: Record<string, string> = {
  'restaurant-gammelbua':
    'Inside Reine Rorbuer, Reine. Traditional Lofoten menu — skrei in season, stockfish, halibut. Reservations essential.',
  'fiskekrogen':
    "Henningsv\u00e6r harbour institution. Fish soup that locals rank against Maaemo. Queens' Fish Soup is on the menu because Queen Sonja ate it.",
  'anitas-sjmat':
    'Sakris\u00f8y island bridge between Reine and Hamn\u00f8y. Fish burgers, stockfish salad, fresh catch straight from the family boat. Walk-in, order at the counter.',
  'brsen-spiseri':
    'Svin\u00f8ya Rorbuer in Svolv\u00e6r. Historic 1828 warehouse. Stockfish, bacalao, reindeer. The interior is a working-coast archive.',
  'maren-anna':
    'S\u00f8rv\u00e5gen harbour. Small restaurant inside a former fish processing building. Fresh halibut, king crab, Arctic char. Short, confident menu.',
  'holmen-restaurant':
    'Holmen Lofoten, S\u00f8rv\u00e5gen. Fine dining destination that occasionally hosts the Kitchen on the Edge of the World chef-in-residence series.',
};

const norgetravelRatingById: Record<string, number> = {
  'restaurant-gammelbua': 8.3,
  'fiskekrogen': 9.0,
  'anitas-sjmat': 8.7,
  'brsen-spiseri': 8.4,
  'maren-anna': 8.2,
  'holmen-restaurant': 9.1,
};

const restaurants: SimpleRestaurant[] = lofotenRestaurants
  .filter((r) => featuredRestaurantIds.includes(r.id))
  .sort(
    (a, b) =>
      featuredRestaurantIds.indexOf(a.id) - featuredRestaurantIds.indexOf(b.id)
  )
  .map((r) => ({
    name: r.name,
    cuisine: r.cuisine,
    priceRange: r.pricePoint,
    highlight: locationHighlights[r.id] ?? r.description,
    norgetravelRating: norgetravelRatingById[r.id],
    location: r.address.split(',').slice(-2, -1)[0]?.trim() ?? '',
  }));

/* ------------------------------------------------------------------ */
/*  Tab config                                                         */
/* ------------------------------------------------------------------ */

const tabs = [
  { id: 'featured', label: 'Featured', icon: Star },
  { id: 'tours', label: 'Tours', icon: Ship },
  { id: 'hiking', label: 'Hiking', icon: Footprints },
  { id: 'eat', label: 'Where to eat', icon: UtensilsCrossed },
] as const;

type TabId = (typeof tabs)[number]['id'];

const difficultyColor: Record<Trail['difficulty'], string> = {
  Easy: 'bg-emerald-100 text-emerald-800',
  Moderate: 'bg-amber-100 text-amber-800',
  Hard: 'bg-red-100 text-red-800',
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function LofotenActivities() {
  const [activeTab, setActiveTab] = useState<TabId>('featured');

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Camera className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">What to do in Lofoten</h2>
      </div>
      <div className="max-w-3xl space-y-4 mb-8">
        <p className="text-slate-600 leading-relaxed">
          Lofoten sits at 68°N on the edge of the Norwegian Sea. 25,000 residents
          spread across 1,227 km² of jagged granite and fishing villages. Over one
          million visitors a year against that population. What follows is the
          honest version of what is worth your time: the hikes, the fishing
          season that shaped the archipelago, and the restaurants where the
          owners still cook the catch.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8" role="tablist">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors min-h-[44px]',
                isActive
                  ? 'bg-[#1A365D] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#1A365D]/40 hover:text-[#1A365D]'
              )}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div>
        {activeTab === 'featured' && (
          <div className="grid sm:grid-cols-2 gap-6">
            {featuredGuides.map((guide) => (
              <div
                key={guide.title}
                className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1A365D]/10 flex items-center justify-center shrink-0 text-[#1A365D]">
                    {guide.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 pt-1">{guide.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{guide.description}</p>
                <div className="flex flex-wrap gap-3 text-xs mb-4">
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {guide.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                    {guide.price}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    {guide.season}
                  </span>
                </div>
                <div className="mt-auto pt-3 border-t border-slate-100">
                  <a
                    href={guide.href}
                    rel="noopener noreferrer sponsored"
                    target="_blank"
                    className="inline-flex items-center gap-1 text-sm font-bold text-[#1A365D] hover:text-[#00D084] transition-colors"
                  >
                    {guide.linkLabel}
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tours' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {tours.map((tour) => (
                <div
                  key={tour.name}
                  className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1">{tour.name}</h3>
                    <p className="text-xs text-slate-500 mb-3">{tour.type}</p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{tour.highlight}</p>
                    <div className="flex flex-wrap gap-3 text-xs mb-4">
                      <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {tour.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                        {tour.price}
                      </span>
                    </div>
                  </div>
                  <div className="mt-auto pt-3 border-t border-slate-100">
                    <a
                      href={tour.affiliateUrl}
                      rel="noopener noreferrer sponsored"
                      target="_blank"
                      className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:shadow-[#1B3A5C]/20 hover:-translate-y-0.5 transition-all min-h-[44px]"
                    >
                      Check availability
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a
                href="https://www.getyourguide.com/lofoten-islands-l95198/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-end"
                rel="noopener noreferrer sponsored"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1A365D] hover:text-[#00D084] transition-colors min-h-[44px]"
              >
                View all Lofoten tours on GetYourGuide
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {activeTab === 'hiking' && (
          <div className="grid sm:grid-cols-2 gap-6">
            {trails.map((trail) => (
              <div
                key={trail.name}
                className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-slate-800">{trail.name}</h3>
                  <span
                    className={cn(
                      'inline-flex items-center px-2 py-1 rounded-sm text-xs font-bold uppercase tracking-wide shrink-0',
                      difficultyColor[trail.difficulty]
                    )}
                  >
                    {trail.difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{trail.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-3 text-xs pt-3 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                    <Ruler className="w-3 h-3" aria-hidden="true" />
                    {trail.distance}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                    <TrendingUp className="w-3 h-3" aria-hidden="true" />
                    {trail.elevation}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {trail.time}
                  </span>
                  {trail.slug && (
                    <Link
                      href={`/kunnskapsbank/trip-reports/${trail.slug}`}
                      className="inline-flex items-center gap-1 ml-auto text-xs font-bold text-[#1A365D] hover:text-[#00D084] transition-colors"
                    >
                      Read guide
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'eat' && (
          <div className="grid sm:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.name}
                className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1A365D]/10 flex items-center justify-center shrink-0 text-[#1A365D]">
                    <UtensilsCrossed className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-800">{restaurant.name}</h3>
                      {restaurant.norgetravelRating !== undefined && (
                        <span
                          className="inline-flex items-center gap-1 bg-[#1A365D] text-white px-2 py-0.5 rounded-sm text-xs font-bold shrink-0"
                          title="NorgeTravel rating (out of 10)"
                        >
                          <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                          {restaurant.norgetravelRating.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 capitalize">
                      {restaurant.cuisine}
                      {restaurant.location && <> &middot; {restaurant.location}</>}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{restaurant.highlight}</p>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-xs text-slate-600 font-medium">
                    {restaurant.priceRange}
                  </span>
                  {restaurant.norgetravelRating !== undefined && (
                    <span className="text-[10px] uppercase tracking-wide text-slate-400 font-medium">
                      NorgeTravel rated
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
