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
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { tromso } from '@/data/city-guides/tromso';

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
    title: 'Northern Lights chase by minibus',
    description:
      'Licensed Tromsø guides track clear skies by car and drive up to 200 km in a night to find aurora. 6\u20138 hours from 18:00. Book four nights minimum. Cloud cover is the only variable you cannot control.',
    duration: '6\u20138 hours',
    price: 'From 1,290 NOK',
    season: 'Sep\u2013Mar',
    icon: <Sparkles className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Check availability',
    isExternal: true,
  },
  {
    title: 'Whale watching in Kaldfjord',
    description:
      'Orca and humpback pods follow herring into the fjords November\u2013February. Peak December\u2013January. RIB boats get you close; traditional vessels stay warmer for long days. 90% sighting rate at peak season.',
    duration: '4\u20136 hours',
    price: 'From 1,450 NOK',
    season: 'Nov\u2013Feb',
    icon: <Waves className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Check availability',
    isExternal: true,
  },
  {
    title: 'Fjellheisen cable car to Storsteinen',
    description:
      'Four-minute cable car from Solliveien in Tromsdalen to the 421m Storsteinen ledge. Operates 09:00\u201323:00 in aurora season. 295 NOK return, 185 NOK one way. Often the fastest way above the city light dome.',
    duration: '1\u20133 hours',
    price: '295 NOK return',
    season: 'Year-round',
    icon: <Mountain className="w-5 h-5" aria-hidden="true" />,
    href: '/kunnskapsbank/trip-reports/sherpatrappa-floya-tromso',
    linkLabel: 'Read the trail guide',
  },
  {
    title: 'Senja day trip \u2014 Segla and the coast',
    description:
      'Norway\u2019s second-largest island, 2.5 hours from Troms\u00f8 by car via the Senja ferry (Brensholmen\u2013Botnhamn). Segla peak (639m), empty beaches, and working fishing villages. National Tourist Route runs the western coast.',
    duration: 'Full day',
    price: 'From 1,200 NOK (guided)',
    season: 'May\u2013Sep',
    icon: <Car className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Check guided options',
    isExternal: true,
  },
];

const tours: Tour[] = [
  {
    name: 'Tromsø Aurora Chase (Small Group)',
    type: 'Northern Lights, 6\u20138 hours',
    price: 'From 1,290 NOK',
    duration: '6\u20138 hours',
    highlight:
      'Small-group minibus chase with licensed Tromsø guides. Real-time cloud forecasting. Hot drinks and tripods included. Free reschedule if no aurora visible.',
    affiliateUrl:
      'https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Kaldfjord Whale Safari (Hybrid Vessel)',
    type: 'Whale watching, 5\u20136 hours',
    price: 'From 1,450 NOK',
    duration: '5\u20136 hours',
    highlight:
      'Silent hybrid propulsion gets boats closer to orca pods without disturbing the herring shoals. November\u2013February only. Heated indoor lounge, outdoor deck, and thermal suits.',
    affiliateUrl:
      'https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Husky sledding + aurora combo',
    type: 'Winter adventure, 4\u20135 hours',
    price: 'From 2,800 NOK',
    duration: '4\u20135 hours',
    highlight:
      'Evening runs from the Camp Tamok kennels in the Lyngen foothills. Operators track the aurora forecast and extend the stop if conditions align. Warm suits, boots, and dinner included.',
    affiliateUrl:
      'https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Sami reindeer camp and aurora',
    type: 'Cultural + aurora, 5\u20137 hours',
    price: 'From 2,190 NOK',
    duration: '5\u20137 hours',
    highlight:
      'Sami-owned and Sami-led. Feed reindeer, hear a joik, learn the actual working relationship between Sami herders and the herd. Aurora viewing from the lavvu in the evening if skies clear.',
    affiliateUrl:
      'https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
];

const trails: Trail[] = [
  {
    name: 'Sherpatrappa to Fl\u00f8ya via Storsteinen',
    distance: '5 km round trip',
    elevation: '670 m (to Fl\u00f8ya)',
    time: '3\u20135 hours',
    difficulty: 'Moderate',
    description:
      'The 1,200 Nepalese sherpa-built stone steps from Tromsdalen up to Storsteinen (421m, cable car top), with optional extension to Fl\u00f8ya summit (671m). Urban-access trail, year-round with microspikes in winter. DNT Blue.',
    slug: 'sherpatrappa-floya-tromso',
  },
  {
    name: 'Tromsdalstinden summit',
    distance: '18 km round trip',
    elevation: '1,100 m',
    time: '8\u201310 hours',
    difficulty: 'Hard',
    description:
      'The 1,238m signature peak above Troms\u00f8. Trailhead at Troms\u00f8dalen, long approach over tundra and scree, final scramble to the cairn. Summer only (July\u2013September). DNT Red with full Fjellvettreglene protocol.',
    slug: 'tromsdalstinden-summit-tromso',
  },
  {
    name: 'R\u00f8dtinden on Kval\u00f8ya',
    distance: '6 km round trip',
    elevation: '600 m',
    time: '4\u20135 hours',
    difficulty: 'Moderate',
    description:
      '644m peak above Ersfjord, 30 minutes from Troms\u00f8 by car. Trailhead at Finnvika. Steady climb on marked path, short boulder scramble near the top. DNT Blue with scramble. Summit views across Kval\u00f8ya to the Lyngen Alps.',
    slug: 'rodtinden-kvaloya-tromso',
  },
  {
    name: 'B\u00f8nntuva on Kval\u00f8ya',
    distance: '5 km round trip',
    elevation: '500 m',
    time: '3\u20134 hours',
    difficulty: 'Easy',
    description:
      '615m family-friendly Kval\u00f8ya peak, 35 minutes from Troms\u00f8. Trailhead at Eidkjosen. Well-marked, no scrambling, gradual ascent. DNT Blue. Summit views south across Malangen to Senja.',
    slug: 'bonntuva-kvaloya-tromso',
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
}

const featuredRestaurantIds = [
  'emmas-drommekjokken',
  'bardus-bistro',
  'aunegarden',
  'skarven',
];

const norgetravelRatingById: Record<string, number> = {
  'emmas-drommekjokken': 8.9,
  'bardus-bistro': 8.5,
  'aunegarden': 8.1,
  'skarven': 7.7,
};

const restaurants: SimpleRestaurant[] = tromso.restaurants
  .filter((r) => featuredRestaurantIds.includes(r.id))
  .map((r) => ({
    name: r.name,
    cuisine: r.cuisine,
    priceRange: r.averageMealPrice ?? 'Price varies',
    highlight: r.description,
    norgetravelRating: norgetravelRatingById[r.id],
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

export function TromsoActivities() {
  const [activeTab, setActiveTab] = useState<TabId>('featured');

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Mountain className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">What to do in Tromsø</h2>
      </div>
      <div className="max-w-3xl space-y-4 mb-8">
        <p className="text-slate-600 leading-relaxed">
          Tromsø sits at 69°N directly under the auroral oval. 75,000 residents, a working
          port, a university, and a functioning Arctic city. The aurora season runs September to
          March. The midnight sun runs May 18 to July 26. Everything below is a real option
          bookable from the city, or a trailhead you can reach in under 45 minutes by car.
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
                href="https://www.getyourguide.com/tromso-l32375/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-end"
                rel="noopener noreferrer sponsored"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1A365D] hover:text-[#00D084] transition-colors min-h-[44px]"
              >
                View all Tromsø tours on GetYourGuide
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
                    <p className="text-xs text-slate-500 capitalize">{restaurant.cuisine}</p>
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
