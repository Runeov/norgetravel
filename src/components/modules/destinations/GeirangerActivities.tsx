'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  Calendar,
  Mountain,
  Waves,
  Car,
  Ship,
  ArrowRight,
  ExternalLink,
  Star,
  UtensilsCrossed,
  Footprints,
  TrendingUp,
  Ruler,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { geirangerTours as tours } from '@/data/fjord-tours';

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

interface Trail {
  name: string;
  distance: string;
  elevation: string;
  time: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  description: string;
  slug?: string;
  internal?: {
    coords?: { lat: number; lng: number };
    dntGrade?: 'green' | 'blue' | 'red' | 'black';
    budget?: 'free' | 'budget' | 'mid-range' | 'luxury';
    seasons?: Array<'winter' | 'spring' | 'summer' | 'autumn'>;
    requiresGuide?: boolean;
    familyFriendly?: boolean;
  };
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

interface Restaurant {
  name: string;
  cuisine: string;
  priceRange: string;
  highlight: string;
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
    title: 'RIB Fjordsafari beneath the waterfalls',
    description:
      '50 minutes on a rigid inflatable boat at 35 knots. The RIB puts you 15 meters from the Seven Sisters waterfall. Full flotation suits provided. 12 passengers per boat.',
    duration: '50 min',
    price: 'From 895 NOK',
    season: 'Mar\u2013Dec',
    icon: <Waves className="w-5 h-5" aria-hidden="true" />,
    href: '/kunnskapsbank/trip-reports/rib-fjordsafari-geirangerfjord-review',
    linkLabel: 'Read our full review',
    bookingUrl:
      'https://www.getyourguide.com/geiranger-l4560/rib-geiranger-fjordsafari-t697794/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    title: 'Kayaking beneath the Seven Sisters',
    description:
      'Guided kayak tour from Geiranger Kayak Centre at Homlong. Maximum 8 paddlers per guide. Drysuits provided. The slowest and most intimate way to experience the fjord.',
    duration: '4 hours',
    price: 'From 1,550 NOK',
    season: 'Apr\u2013Aug',
    icon: <Waves className="w-5 h-5" aria-hidden="true" />,
    href: '/kunnskapsbank/trip-reports/kayaking-seven-sisters-geirangerfjord',
    linkLabel: 'Read our full review',
    bookingUrl:
      'https://www.getyourguide.com/geiranger-l4560/geiranger-kayak-tour-with-waterfall-views-t923778/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    title: 'Geiranger by car: Eagle Road and Dalsnibba',
    description:
      'Three viewpoints in one drive. Eagle Road climbs 620 meters in 11 hairpin bends. Dalsnibba sits at 1,476 meters with the fjord as a thin blue line below. Start at 07:30 to beat the tour buses.',
    duration: '4 hours',
    price: '150 NOK toll',
    season: 'Jun\u2013Oct',
    icon: <Car className="w-5 h-5" aria-hidden="true" />,
    href: '/kunnskapsbank/trip-reports/geiranger-by-car-eagle-road-dalsnibba',
    linkLabel: 'Read our driving guide',
  },
  {
    title: 'Zero-emission fjord sightseeing cruise',
    description:
      'Geiranger Fjordservice operates electric and hybrid vessels on the UNESCO fjord from 2026. The 75-minute sightseeing loop passes the Seven Sisters, the Suitor, and the Bridal Veil. Silent on electric power.',
    duration: '75 min',
    price: 'From 610 NOK',
    season: 'May\u2013Sep',
    icon: <Ship className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/geiranger-l4560/geirangerfjord-sightseeing-boat-with-audio-guide-t637010/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Check availability',
    isExternal: true,
  },
];

const trails: Trail[] = [
  {
    name: 'Waterfall walk (Fossevandring)',
    distance: '1.2 km one way',
    elevation: '85 m',
    time: '30\u201340 min',
    difficulty: 'Easy',
    description:
      'Family-friendly path from the village centre to the Norwegian Fjord Centre. 327 stone steps with handrails, passing multiple waterfalls cascading into the village. Certified National Hiking Trail with 180,000 annual visitors.',
    slug: 'fossevandring-waterfall-walk-geiranger',
    internal: {
      coords: { lat: 62.1017, lng: 7.2067 },
      dntGrade: 'green',
      budget: 'free',
      seasons: ['spring', 'summer', 'autumn'],
      requiresGuide: false,
      familyFriendly: true,
    },
  },
  {
    name: 'Storseterfossen waterfall',
    distance: '2.9 km from Vesteras',
    elevation: '257 m',
    time: '2\u20133 hours round trip',
    difficulty: 'Moderate',
    description:
      'Norway\u2019s first certified National Hiking Trail leads behind a 30-meter waterfall. Secured walkway with guardrails. Drive to Vesteras farm or hike the full 4 km from Geiranger village.',
    slug: 'storseterfossen-walk-behind-waterfall-geiranger',
    internal: {
      coords: { lat: 62.1100, lng: 7.1750 },
      dntGrade: 'blue',
      budget: 'free',
      seasons: ['summer', 'autumn'],
      requiresGuide: false,
      familyFriendly: true,
    },
  },
  {
    name: 'L\u00f8sta viewpoint',
    distance: '~3 km round trip',
    elevation: '210 m',
    time: '2\u20133 hours',
    difficulty: 'Moderate',
    description:
      'Panoramic view directly down into Geirangerfjord from 500 meters above sea level. Starts from Vesteras farm at 340 m. Steep climbs, fixed ropes on the final section, and muddy terrain after rain.',
    slug: 'losta-viewpoint-hike-geiranger',
    internal: {
      coords: { lat: 62.1150, lng: 7.1700 },
      dntGrade: 'blue',
      budget: 'free',
      seasons: ['summer', 'autumn'],
      requiresGuide: false,
      familyFriendly: false,
    },
  },
  {
    name: 'Skagefl\u00e5 mountain farm',
    distance: '4 km from Skagehola',
    elevation: '250 m',
    time: '4\u20136 hours (with boat)',
    difficulty: 'Hard',
    description:
      'DNT Red trail to an abandoned farm perched on a ledge 250 meters above the fjord, facing the Seven Sisters waterfall. Worked until 1916. Take the Fjord Guiding boat to Skagehola (249 NOK one-way) to cut the approach.',
    slug: 'skagefla-mountain-farm-geirangerfjord',
    internal: {
      coords: { lat: 62.1208, lng: 7.1450 },
      dntGrade: 'red',
      budget: 'free',
      seasons: ['summer', 'autumn'],
      requiresGuide: false,
      familyFriendly: false,
    },
  },
];

const restaurants: Restaurant[] = [
  {
    name: 'Brasserie Posten',
    cuisine: 'Scandinavian, locally sourced',
    priceRange: '275\u2013460 NOK mains',
    highlight:
      'Harbourside location at the ferry terminal. Homemade fish soup, halibut, and reindeer dishes. 35 seats. The most consistently reviewed standalone restaurant in the village.',
    norgetravelRating: 8.6,
    internal: {
      coords: { lat: 62.1013, lng: 7.2058 },
      budget: 'mid-range',
      seasons: ['spring', 'summer', 'autumn'],
      familyFriendly: true,
      indoor: true,
    },
  },
  {
    name: 'Wester\u00e5s Gard',
    cuisine: 'Modern Norwegian, farm-based',
    priceRange: '500\u2013600 NOK mains',
    highlight:
      'Working farm restaurant perched above the village with panoramic fjord views. Seasonal menu (May\u2013September). Cod, lamb, homemade desserts. Same farm is the trailhead for Storseterfossen.',
    norgetravelRating: 9.1,
    internal: {
      coords: { lat: 62.1100, lng: 7.1750 },
      budget: 'luxury',
      seasons: ['spring', 'summer', 'autumn'],
      familyFriendly: true,
      indoor: true,
    },
  },
  {
    name: 'Friaren Bistro',
    cuisine: 'Norwegian and international',
    priceRange: '250\u2013400 NOK mains',
    highlight:
      'Outdoor terrace in the village centre, attached to Hotel Geiranger. Summer seafood, lamb, and entrecote. One of the few places with genuine al fresco fjord-side seating.',
    norgetravelRating: 7.6,
    internal: {
      coords: { lat: 62.1020, lng: 7.2060 },
      budget: 'mid-range',
      seasons: ['summer'],
      familyFriendly: true,
      indoor: false,
    },
  },
  {
    name: 'Naustkroa',
    cuisine: 'Norwegian comfort food, seafood',
    priceRange: '200\u2013350 NOK mains',
    highlight:
      'Waterfront boathouse setting with generous portions. Salmon, meatballs, and pizza. More casual and family-oriented. The building sits directly on the water.',
    norgetravelRating: 7.4,
    internal: {
      coords: { lat: 62.1015, lng: 7.2075 },
      budget: 'budget',
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

export function GeirangerActivities() {
  const [activeTab, setActiveTab] = useState<TabId>('featured');

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Mountain className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">
          What to do at Geirangerfjord
        </h2>
      </div>
      <div className="max-w-3xl space-y-4 mb-8">
        <p className="text-slate-600 leading-relaxed">
          Geirangerfjord sits at the head of a 15 km UNESCO-listed inlet with
          200 permanent residents and 900,000 visitors per season. The village
          has no bypass road. Everyone arrives from the same direction, and most
          of them arrive between 10:00 and 15:00 in July.
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
                      <ExternalLink
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <Link
                      href={guide.href}
                      className="inline-flex items-center gap-1 text-sm font-bold text-[#1A365D] hover:text-[#00D084] transition-colors"
                    >
                      {guide.linkLabel}
                      <ArrowRight
                        className="w-3.5 h-3.5"
                        aria-hidden="true"
                      />
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
                      <ExternalLink
                        className="w-3 h-3"
                        aria-hidden="true"
                      />
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
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a
                href="https://www.getyourguide.com/geiranger-l4560/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-end"
                rel="noopener noreferrer sponsored"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1A365D] hover:text-[#00D084] transition-colors min-h-[44px]"
              >
                View all Geirangerfjord tours on GetYourGuide
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
                    <UtensilsCrossed
                      className="w-5 h-5"
                      aria-hidden="true"
                    />
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
