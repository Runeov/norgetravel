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
  Train,
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
  /**
   * Hidden internal metadata. Never rendered in UI.
   * Reserved for the advanced trip planner (filters, map pins, itinerary building).
   */
  internal?: {
    coords?: { lat: number; lng: number };
    dntGrade?: 'green' | 'blue' | 'red' | 'black';
    budget?: 'free' | 'budget' | 'mid-range' | 'luxury';
    seasons?: Array<'winter' | 'spring' | 'summer' | 'autumn'>;
    requiresGuide?: boolean;
    familyFriendly?: boolean;
  };
}

interface Restaurant {
  name: string;
  cuisine: string;
  priceRange: string;
  highlight: string;
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
    title: 'Electric ferry through Nærøyfjord',
    description:
      '2 hours of pure fjord from Flåm to Gudvangen or reverse. The Future of The Fjords catamaran runs silently through 250-meter-wide walls rising 1,700 meters on both sides. Waterfalls appear and disappear as the fjord narrows. This is not a transit crossing — it is the main event.',
    duration: '2 hours',
    price: 'From 450 NOK',
    season: 'Year-round (reduced winter)',
    icon: <Ship className="w-5 h-5" aria-hidden="true" />,
    href: '/kunnskapsbank/trip-reports/naeroyfjord-electric-ferry-review',
    linkLabel: 'Read the full review',
    isExternal: false,
    bookingUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    title: 'Flåm Railway: 866 meters in one hour',
    description:
      'The Flåm Railway drops from Myrdal at 866 meters to Flåm at sea level in 20 km and 20 tunnels. The train slows at Kjosfossen waterfall (225 m drop) and passengers step onto the platform to watch. One of the steepest standard-gauge railways in the world still in operation.',
    duration: '1 hour',
    price: 'From 390 NOK',
    season: 'Year-round',
    icon: <Train className="w-5 h-5" aria-hidden="true" />,
    href: '/kunnskapsbank/trip-reports/flam-railway-myrdal-review',
    linkLabel: 'Read the full review',
    isExternal: false,
    bookingUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    title: 'Kayaking beneath 1,700-meter walls',
    description:
      'Guided kayak tours from Gudvangen paddle into Nærøyfjord at water level. The walls block the sun for most of the day. In a kayak at 250 meters wide, the fjord feels narrower than it looks on a map. Half-day and full-day expeditions available. Drysuits provided.',
    duration: '3.5–8 hours',
    price: 'From 890 NOK',
    season: 'May–September',
    icon: <Waves className="w-5 h-5" aria-hidden="true" />,
    href: '/kunnskapsbank/trip-reports/kayaking-naeroyfjord-guided-review',
    linkLabel: 'Read the full review',
    isExternal: false,
    bookingUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    title: 'Norway in a Nutshell day trip',
    description:
      'Bergen Railway to Myrdal, Flåm Railway to Flåm, Nærøyfjord electric ferry to Gudvangen, bus over Stalheimskleiva back to Voss, train to Bergen. The most efficient way to see the fjords without a car. Departs Bergen 08:05 daily in summer.',
    duration: '10–12 hours',
    price: 'From 1,490 NOK',
    season: 'Daily in summer (May–Sep)',
    icon: <Mountain className="w-5 h-5" aria-hidden="true" />,
    href: '/kunnskapsbank/trip-reports/norway-in-a-nutshell-bergen-review',
    linkLabel: 'Read the full review',
    isExternal: false,
    bookingUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
];

const tours: Tour[] = [
  {
    name: 'Norway in a Nutshell (Bergen day trip)',
    type: 'Guided full-day loop',
    price: 'From 1,490 NOK',
    duration: '10–12 hours',
    highlight:
      'Bergen Railway to Myrdal, Flåm Railway to Flåm, Nærøyfjord electric ferry to Gudvangen, bus over Stalheimskleiva back to Voss, train to Bergen. The most efficient way to see the fjords without a car. Departs Bergen 08:05 daily in summer.',
    affiliateUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Nærøyfjord kayak (half-day)',
    type: 'Guided small group',
    price: 'From 890 NOK',
    duration: '3.5 hours',
    highlight:
      'Departs from Gudvangen Viking Village. Groups of maximum 8 with one guide. Paddle into the fjord past abandoned farm terraces and seasonal waterfalls. Drysuits provided. No prior kayak experience required.',
    affiliateUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'RIB speedboat on Aurlandsfjord',
    type: 'Guided 1.5 hours',
    price: 'From 1,095 NOK',
    duration: '1.5 hours',
    highlight:
      'High-speed RIB from Flåm harbour up Aurlandsfjord and into the Nærøyfjord entrance. Flotation suits provided. View of Stegastein from the water. Maximum 12 passengers per boat.',
    affiliateUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Flåm Railway experience',
    type: 'Self-guided with optional audio',
    price: 'From 390 NOK',
    duration: '1 hour',
    highlight:
      'Myrdal to Flåm (or reverse). Includes Kjosfossen waterfall stop. Buy tickets in advance through the Flåm Railway official booking or at Flåm station. The route is most scenic descending from Myrdal.',
    affiliateUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
];

const trails: Trail[] = [
  {
    name: 'Rimstigen',
    distance: '5.5 km one way',
    elevation: '850 m',
    time: '4–5 hours',
    difficulty: 'Hard',
    description:
      'The historic mountain path from Gudvangen up to the Nali farm terrace 850 meters above sea level. Steep from the first step. Rimstigen is closed November to April. Access from the fjord side is by boat from Gudvangen — there is no road to the trailhead. Book a boat connection from visitflam.com and factor crossing time into your day. DNT Red grade. 850 meters of elevation in 5.5 km.',
    slug: 'rimstigen-naeroyfjord-trail-report',
  },
  {
    name: 'Stegastein viewpoint',
    distance: '6 km one way',
    elevation: '640 m',
    time: '5–6 hours round trip',
    difficulty: 'Moderate',
    description:
      'The walking route from Aurland village to the 30-meter cantilevered platform at 640 meters above Aurlandsfjord. The drive up the Rv243 Bjørgavegen takes 20 minutes and fills the car park by midday in summer. The trail takes 2.5 to 3 hours up through forest and past abandoned summer farms. You earn the platform on foot and choose your window.',
    slug: 'stegastein-viewpoint-aurland-hike',
  },
  {
    name: 'Bakka–Nali farm trail',
    distance: '3 km one way',
    elevation: '800 m',
    time: '5–6 hours round trip',
    difficulty: 'Hard',
    description:
      'The old farm path from Bakka village on Nærøyfjord to the abandoned summer farm at Nali, 800 meters above the water. DNT Red: sustained steep gradient, exposed upper sections, no facilities. Access to Bakka by local ferry from Gudvangen or road via Dyrdal. One of the few trails in the UNESCO fjord where you look straight down at the ferry route.',
    slug: 'bakka-nali-farm-trail-naeroyfjord',
  },
  {
    name: 'Prest viewpoint — above Flåm',
    distance: '4 km return',
    elevation: '580 m',
    time: '2.5–3.5 hours',
    difficulty: 'Moderate',
    description:
      'The Prest trail climbs steeply from Flåm village to a viewpoint at 580 meters directly above the start of Nærøyfjord. On a clear day you see the entire fjord confluence — Aurlandsfjord, the start of Nærøyfjord, and Flåm village below. Less crowded than the Aurland side trails. Starts from the signed trailhead at the far end of the campsite.',
    slug: 'prest-viewpoint-flam-trail',
  },
];

const restaurants: Restaurant[] = [
  {
    name: 'Ægir Brewery Restaurant',
    cuisine: 'Norwegian / Craft beer',
    priceRange: '250–450 NOK mains',
    highlight:
      'Viking longhouse exterior in Flåm village. Brews on-site — the pale ale is the one to order. Pork ribs and smoked salmon are the reliable mains. Outdoor terrace facing the Flåm Railway platform. Tables fill by 18:00 in summer — arrive early or book ahead.',
  },
  {
    name: 'Flåmsbrygga',
    cuisine: 'Norwegian seafood',
    priceRange: '200–400 NOK mains',
    highlight:
      'On the Flåm harbour. Fish soup and grilled fish direct from Sognefjord. Simpler than Ægir and better for lunch after the morning ferry. Outdoor seating on the dock when the weather holds.',
  },
  {
    name: 'Fretheim Hotel Restaurant',
    cuisine: 'Norwegian',
    priceRange: '300–500 NOK mains',
    highlight:
      'The dining room in the historic 1866 wooden hotel at Flåm. Traditional Norwegian dishes including local lamb and cured fish. Book ahead for dinner — the hotel fills in July and walk-ins compete with guests for tables.',
  },
  {
    name: 'Gudvangen Viking Village',
    cuisine: 'Traditional / Cultural',
    priceRange: '150–250 NOK',
    highlight:
      'Open-fire cooking area serving traditional food during operating hours. Smoked meats and flatbreads cooked on open hearths. Not a restaurant in the conventional sense — a cultural experience with food. Open May to September.',
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

export default function NaeroyfjordActivities() {
  const [activeTab, setActiveTab] = useState<TabId>('featured');

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Mountain className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">
          What to do at Nærøyfjord
        </h2>
      </div>
      <div className="max-w-3xl space-y-4 mb-8">
        <p className="text-slate-600 leading-relaxed">
          Nærøyfjord is 18 km of UNESCO fjord narrowing to 250 meters, with walls that rise
          1,700 meters above the waterline. The electric ferry is the main event. The Flåm
          Railway is the best way to arrive. Everything else is built around those two facts.
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
                href="https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-end"
                rel="noopener noreferrer sponsored"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1A365D] hover:text-[#00D084] transition-colors min-h-[44px]"
              >
                View all Nærøyfjord tours on GetYourGuide
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {/* Hiking */}
        {activeTab === 'hiking' && (
          <div className="grid sm:grid-cols-2 gap-6">
            {trails.map((trail) => {
              const cardInner = (
                <>
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
                  {trail.slug && (
                    <div className="pt-3 mt-3 border-t border-slate-100">
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-[#1A365D] group-hover:text-[#00D084] transition-colors">
                        Read the full trail guide
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  )}
                </>
              );

              return trail.slug ? (
                <Link
                  key={trail.name}
                  href={`/kunnskapsbank/trip-reports/${trail.slug}`}
                  className="group bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md hover:border-[#1A365D]/40 transition-all flex flex-col"
                >
                  {cardInner}
                </Link>
              ) : (
                <div
                  key={trail.name}
                  className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
                >
                  {cardInner}
                </div>
              );
            })}
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
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {restaurant.name}
                    </h3>
                    <p className="text-xs text-slate-500">{restaurant.cuisine}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {restaurant.highlight}
                </p>
                <div className="mt-auto pt-3 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-xs text-slate-600 font-medium">
                    {restaurant.priceRange}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
