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
  Apple,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { hardangerfjordTours as tours } from '@/data/fjord-tours';

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
  bookingUrl?: string;
}

interface InternalTrailTags {
  coords?: { lat: number; lng: number };
  dntGrade?: 'green' | 'blue' | 'red' | 'black';
  budget?: 'free' | 'budget' | 'mid-range' | 'luxury';
  seasons?: Array<'winter' | 'spring' | 'summer' | 'autumn'>;
  requiresGuide?: boolean;
  familyFriendly?: boolean;
}

interface InternalTourTags {
  coords?: { lat: number; lng: number };
  difficulty?: 'easy' | 'moderate' | 'hard' | 'expert';
  budget?: 'free' | 'budget' | 'mid-range' | 'luxury';
  seasons?: Array<'winter' | 'spring' | 'summer' | 'autumn'>;
  durationHours?: number;
  requiresGuide?: boolean;
  familyFriendly?: boolean;
  indoor?: boolean;
}

interface InternalRestaurantTags {
  coords?: { lat: number; lng: number };
  budget?: 'free' | 'budget' | 'mid-range' | 'luxury';
  seasons?: Array<'winter' | 'spring' | 'summer' | 'autumn'>;
  familyFriendly?: boolean;
  indoor?: boolean;
}

interface Trail {
  name: string;
  distance: string;
  elevation: string;
  time: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  description: string;
  slug?: string;
  internal?: InternalTrailTags;
}

interface Restaurant {
  name: string;
  cuisine: string;
  priceRange: string;
  highlight: string;
  /** NorgeTravel editorial rating, 1.0–10.0 scale (one decimal). */
  norgetravelRating?: number;
  internal?: InternalRestaurantTags;
}

interface Tour {
  name: string;
  type: string;
  price: string;
  duration: string;
  highlight: string;
  affiliateUrl: string;
  internal?: InternalTourTags;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const featuredGuides: ActivityGuide[] = [
  {
    title: 'Trolltunga: the full route from Skjeggedal',
    description:
      '27 km round-trip with 800 meters of elevation gain. The rock ledge juts 700 meters above Ringedalsvatnet lake. Budget 10 to 12 hours — not 6, as many Instagram posts imply. A guide is required by Norwegian law from October 1 to May 31. In summer, the trailhead fills by 07:00 on weekends. Start before dawn or book a guided departure for the early slot.',
    duration: '10–12 hours',
    price: 'Free trail (guide required Oct–May)',
    season: 'Jun–Sep (self-guided). Oct–May (guide required).',
    icon: <Mountain className="w-5 h-5" aria-hidden="true" />,
    href: '/kunnskapsbank/trip-reports/trolltunga-skjeggedal-trip-report',
    linkLabel: 'Read the full report',
    isExternal: false,
    bookingUrl:
      'https://www.getyourguide.com/odda-l2558/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    title: 'Vøringsfossen: 182 meters into Måbødalen',
    description:
      "Norway's most visited waterfall drops 182 meters into the Måbødalen valley, 2 km from Eidfjord on Rv7. The 2020 viewing platforms reach different angles of the falls. The upper platform is accessible by road from Rv7. The valley-floor view requires a 30-minute hike from Fossli. Both are worth it. Visit before 11:00 to beat the tour buses.",
    duration: '1–2 hours',
    price: 'Free (parking paid)',
    season: 'May–October (road access)',
    icon: <Waves className="w-5 h-5" aria-hidden="true" />,
    href: '/kunnskapsbank/trip-reports/voringsfossen-mabodalen-guide',
    linkLabel: 'Read the full guide',
    isExternal: false,
  },
  {
    title: 'Hardanger apple harvest and cider trail',
    description:
      "Forty percent of Norway's fruit grows along the Hardangerfjord shores. The orchards bloom pink in May and harvest from late August through October. Cideries at Aga, Lofthus, and Ullensvang open their farmgates during harvest season. The Hardangertun market at Lofthus runs on the third weekend of September with 50 producers.",
    duration: 'Half-day to full-day',
    price: 'Tastings from 80–150 NOK',
    season: 'Blossom: May. Harvest: Aug–Oct.',
    icon: <Apple className="w-5 h-5" aria-hidden="true" />,
    href: '/kunnskapsbank/trip-reports/hardanger-cider-harvest-trail',
    linkLabel: 'Read the full guide',
    isExternal: false,
    bookingUrl:
      'https://www.getyourguide.com/hardangerfjord-l97248/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    title: 'Folgefonna glacier walk',
    description:
      'Folgefonna is the third largest glacier in Norway. Guided walks depart from the Fonnabu visitor centre on the plateau above Jondal. Crampons and ice axe provided. The contrast between the fjord at sea level and the glacier at 1,200 meters is a 1-hour drive. No prior glacier experience required.',
    duration: '4–6 hours',
    price: 'From 850 NOK',
    season: 'May–September',
    icon: <Mountain className="w-5 h-5" aria-hidden="true" />,
    href: '/kunnskapsbank/trip-reports/folgefonna-glacier-walk-report',
    linkLabel: 'Read the full review',
    isExternal: false,
    bookingUrl:
      'https://www.getyourguide.com/hardangerfjord-l97248/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
];

const trails: Trail[] = [
  {
    name: 'Trolltunga',
    distance: '27 km return',
    elevation: '800 m',
    time: '10–12 hours',
    difficulty: 'Hard',
    description:
      "Norway's most photographed rock ledge juts 700 meters above Ringedalsvatnet. The full route from Skjeggedal is 27 km return with 800 meters of elevation gain. DNT Red grade. A guide is required by Norwegian law from October 1 to May 31. Start before 07:00 in summer to secure trailhead parking. The ledge itself is 2 meters wide — the queue can be 30 minutes at midday in July.",
    internal: {
      coords: { lat: 60.1244, lng: 6.7403 },
      dntGrade: 'red',
      budget: 'free',
      seasons: ['summer', 'autumn'],
      requiresGuide: false,
      familyFriendly: false,
    },
  },
  {
    name: 'Ringedalsvatnet lake loop',
    distance: '14 km return (to lake)',
    elevation: '400 m',
    time: '5–6 hours',
    difficulty: 'Moderate',
    description:
      'The Trolltunga route passes Ringedalsvatnet, the turquoise lake below the rock ledge. Turning back at the lake (rather than continuing to Trolltunga) gives a DNT Blue-grade experience with comparable scenery at half the effort. The lake reflects the surrounding peaks on calm mornings.',
    internal: {
      coords: { lat: 60.1200, lng: 6.7500 },
      dntGrade: 'blue',
      budget: 'free',
      seasons: ['summer', 'autumn'],
      requiresGuide: false,
      familyFriendly: true,
    },
  },
  {
    name: 'Hardangervidda plateau day walk',
    distance: '8–15 km (varies by route)',
    elevation: '200–400 m',
    time: '3–6 hours',
    difficulty: 'Moderate',
    description:
      'The Hardangervidda National Park begins directly above Eidfjord. Marked trails from the Rv7 give access to the plateau without a multi-day commitment. The Dyranut DNT cabin is 15 km from the Rv7 trailhead. The plateau wild reindeer herds are most visible in August. Check weather at yr.no before departing.',
    internal: {
      coords: { lat: 60.4183, lng: 7.5155 },
      dntGrade: 'blue',
      budget: 'free',
      seasons: ['summer', 'autumn'],
      requiresGuide: false,
      familyFriendly: false,
    },
  },
  {
    name: 'Vøringsfossen valley floor walk',
    distance: '3 km return',
    elevation: '150 m',
    time: '1–1.5 hours',
    difficulty: 'Easy',
    description:
      'From the Fossli parking area, descend to the floor of Måbødalen for the base view of Vøringsfossen — 182 meters of free fall with the full drop visible from below. A shorter and easier alternative to the upper-platform viewpoint accessible by road. Visit before 10:00 in summer to avoid the tour bus crowds.',
    internal: {
      coords: { lat: 60.4287, lng: 7.2512 },
      dntGrade: 'green',
      budget: 'free',
      seasons: ['spring', 'summer', 'autumn'],
      requiresGuide: false,
      familyFriendly: true,
    },
  },
];

const restaurants: Restaurant[] = [
  {
    name: 'Ullensvang Hotel restaurant',
    cuisine: 'Norwegian / Nordic',
    priceRange: '300–600 NOK mains',
    highlight:
      'The grand hotel at Lofthus has operated since 1846. The restaurant uses apples, cider, and lamb from the surrounding farms. The dining room overlooks the orchard and Sørfjorden below. Book 24 hours ahead in season — the hotel fills with guests and the restaurant follows.',
    norgetravelRating: 8.5,
    internal: {
      coords: { lat: 60.3297, lng: 6.6548 },
      budget: 'luxury',
      seasons: ['spring', 'summer', 'autumn'],
      familyFriendly: true,
      indoor: true,
    },
  },
  {
    name: 'Hardanger cider farms (Lofthus/Aga)',
    cuisine: 'Farmgate tastings',
    priceRange: '80–150 NOK (tastings)',
    highlight:
      'The orchards along the south shore from Aga to Ullensvang open their farmgates from August through October. Cider tastings, apple juice, and direct sales from the producer. The Hardangertun market on the third weekend of September gathers 50 producers in one place.',
    norgetravelRating: 9.2,
    internal: {
      coords: { lat: 60.3296, lng: 6.6548 },
      budget: 'budget',
      seasons: ['summer', 'autumn'],
      familyFriendly: true,
      indoor: false,
    },
  },
  {
    name: 'Eidfjord Hotel restaurant',
    cuisine: 'Norwegian',
    priceRange: '200–400 NOK mains',
    highlight:
      'Reliable mid-range dining in Eidfjord village. Local fish and meat dishes. The most consistent option in Eidfjord for travellers not staying at the Quality Hotel Vøringsfoss. Walk-ins usually accommodated.',
    norgetravelRating: 7.0,
    internal: {
      coords: { lat: 60.4679, lng: 7.0686 },
      budget: 'mid-range',
      seasons: ['winter', 'spring', 'summer', 'autumn'],
      familyFriendly: true,
      indoor: true,
    },
  },
  {
    name: 'Trolltunga Hotel restaurant (Odda)',
    cuisine: 'Norwegian',
    priceRange: '200–350 NOK mains',
    highlight:
      'In Odda town, 23 km from the Skjeggedal trailhead. The best option for a post-Trolltunga dinner — you will be hungry. Simple Norwegian dishes with generous portions. The breakfast for next-day hikers is good value.',
    norgetravelRating: 7.4,
    internal: {
      coords: { lat: 60.0680, lng: 6.5463 },
      budget: 'mid-range',
      seasons: ['spring', 'summer', 'autumn'],
      familyFriendly: true,
      indoor: true,
    },
  },
];

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

/* ------------------------------------------------------------------ */
/*  Difficulty badge colours                                           */
/* ------------------------------------------------------------------ */

const difficultyColor: Record<Trail['difficulty'], string> = {
  Easy: 'bg-emerald-100 text-emerald-800',
  Moderate: 'bg-amber-100 text-amber-800',
  Hard: 'bg-red-100 text-red-800',
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HardangerfjordActivities() {
  const [activeTab, setActiveTab] = useState<TabId>('featured');

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Mountain className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">
          What to do at Hardangerfjord
        </h2>
      </div>
      <div className="max-w-3xl space-y-4 mb-8">
        <p className="text-slate-600 leading-relaxed">
          Hardangerfjord is 179 km of fjord, glacier, waterfall, and orchard. Trolltunga is the
          headline — but it demands 10 to 12 hours, not 6. Vøringsfossen and the cider farms are
          the experiences most travellers overlook. This fjord rewards slow travel.
        </p>
      </div>

      {/* Tabs */}
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

      {/* Tab panels */}
      <div>
        {/* Featured */}
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
                  <h3 className="text-lg font-bold text-slate-800 pt-1">
                    {guide.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {guide.description}
                </p>
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
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  {guide.isExternal ? (
                    <a
                      href={guide.href}
                      rel="noopener noreferrer sponsored"
                      target="_blank"
                      className="inline-flex items-center gap-1 text-sm font-bold text-[#1A365D] hover:text-[#00D084] transition-colors"
                    >
                      {guide.linkLabel}
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      href={guide.href}
                      className="inline-flex items-center gap-1 text-sm font-bold text-[#1A365D] hover:text-[#00D084] transition-colors"
                    >
                      {guide.linkLabel}
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  )}
                  {guide.bookingUrl && (
                    <a
                      href={guide.bookingUrl}
                      rel="noopener noreferrer sponsored"
                      target="_blank"
                      className="inline-flex items-center gap-1 text-xs font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] px-3 py-1.5 rounded-md hover:shadow-md transition-all min-h-[32px]"
                    >
                      Book tour
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tours */}
        {activeTab === 'tours' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {tours.map((tour) => (
                <div
                  key={tour.name}
                  className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1">
                      {tour.name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-3">{tour.type}</p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {tour.highlight}
                    </p>
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
                href="https://www.getyourguide.com/hardangerfjord-l97248/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-end"
                rel="noopener noreferrer sponsored"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1A365D] hover:text-[#00D084] transition-colors min-h-[44px]"
              >
                View all Hardangerfjord tours on GetYourGuide
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {/* Hiking */}
        {activeTab === 'hiking' && (
          <div className="grid sm:grid-cols-2 gap-6">
            {trails.map((trail) => (
              <div
                key={trail.name}
                className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-slate-800">
                    {trail.name}
                  </h3>
                  <span
                    className={cn(
                      'inline-flex items-center px-2 py-1 rounded-sm text-xs font-bold uppercase tracking-wide shrink-0',
                      difficultyColor[trail.difficulty]
                    )}
                  >
                    {trail.difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {trail.description}
                </p>
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
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Where to eat */}
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
                      <h3 className="text-lg font-bold text-slate-800">
                        {restaurant.name}
                      </h3>
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
                    <p className="text-xs text-slate-500">{restaurant.cuisine}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {restaurant.highlight}
                </p>
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
