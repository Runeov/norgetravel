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
  UtensilsCrossed,
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
    title: 'Electric ferry through Naeroyfjord',
    description:
      '2 hours of pure fjord from Flam to Gudvangen or reverse. The Future of The Fjords catamaran runs silently through 250-meter-wide walls rising 1,000 meters on both sides. Waterfalls appear and disappear as the fjord narrows. This is not a transit crossing — it is the main event.',
    duration: '2 hours',
    price: 'From 450 NOK',
    season: 'Year-round (reduced winter)',
    icon: <Ship className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Book the Naeroyfjord ferry',
    isExternal: true,
    bookingUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    title: 'Flam Railway: 866 meters in one hour',
    description:
      'The Flam Railway drops from Myrdal at 866 meters to Flam at sea level in 20 km and 20 tunnels. The train slows at Kjosfossen waterfall (225 m drop) and passengers step onto the platform to watch. One of the steepest standard-gauge railways in the world still in operation.',
    duration: '1 hour',
    price: 'From 390 NOK',
    season: 'Year-round',
    icon: <Train className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Book the Flam Railway',
    isExternal: true,
    bookingUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    title: 'Kayaking beneath 1,000-meter walls',
    description:
      'Guided kayak tours from Gudvangen paddle into Naeroyfjord at water level. The walls block the sun for most of the day. In a kayak at 250 meters wide, the fjord feels narrower than it looks on a map. Half-day and full-day expeditions available. Drysuits provided.',
    duration: '3.5–8 hours',
    price: 'From 890 NOK',
    season: 'May–September',
    icon: <Waves className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Book kayak tour',
    isExternal: true,
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
      'Bergen Railway to Myrdal, Flam Railway to Flam, Naeroyfjord electric ferry to Gudvangen, bus over Stalheimskleiva back to Voss, train to Bergen. The most efficient way to see the fjords without a car. Departs Bergen 08:05 daily in summer.',
    affiliateUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Naeroyfjord kayak (half-day)',
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
      'High-speed RIB from Flam harbour up Aurlandsfjord and into the Naeroyfjord entrance. Flotation suits provided. View of Stegastein from the water. Maximum 12 passengers per boat.',
    affiliateUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Flam Railway experience',
    type: 'Self-guided with optional audio',
    price: 'From 390 NOK',
    duration: '1 hour',
    highlight:
      'Myrdal to Flam (or reverse). Includes Kjosfossen waterfall stop. Buy tickets in advance through the Flam Railway official booking or at Flam station. The route is most scenic descending from Myrdal.',
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
      'The historic mountain path from Gudvangen village up to the Nali farm terrace, 850 meters above sea level. Steep from the first step. The path was the only access route for farmers on the upper shelf before any road was built. 850 meters of elevation gain in 5.5 km. DNT Red grade. Views from the top span the full length of Naeroyfjord. Descent on the same route — the knees will feel it.',
  },
  {
    name: 'Stegastein viewpoint hike',
    distance: '5 km return',
    elevation: '650 m',
    time: '2.5–3.5 hours',
    difficulty: 'Moderate',
    description:
      'From Aurland village, climb to Stegastein — a cantilevered platform jutting 4 meters out from the cliff 650 meters above Aurlandsfjord. The fjord and surrounding peaks are visible from the platform. Marked trail with a moderate gradient. Alternatively, drive to the car park and walk the last 200 meters from the road.',
  },
  {
    name: 'Bakka–Nali farm trail',
    distance: '8 km return',
    elevation: '500 m',
    time: '3–4 hours',
    difficulty: 'Moderate',
    description:
      'From Bakka village (reached by boat from Gudvangen or Flam), climb through abandoned farm terraces on the fjord shelf. The trail passes the remains of farm buildings inhabited until the 1970s. The view across Naeroyfjord from the upper shelf is unobstructed in both directions. DNT Blue grade. Start early if combining with the boat crossing.',
  },
];

const restaurants: Restaurant[] = [
  {
    name: 'Ægir Brewery Restaurant',
    cuisine: 'Norwegian / Craft beer',
    priceRange: '250–450 NOK mains',
    highlight:
      'Viking longhouse exterior in Flam village. Brews on-site — the pale ale is the one to order. Pork ribs and smoked salmon are the reliable mains. Outdoor terrace facing the Flam Railway platform. Tables fill by 18:00 in summer — arrive early or book ahead.',
  },
  {
    name: 'Flamsbrygga',
    cuisine: 'Norwegian seafood',
    priceRange: '200–400 NOK mains',
    highlight:
      'On the Flam harbour. Fish soup and grilled fish direct from Sognefjord. Simpler than Ægir and better for lunch after the morning ferry. Outdoor seating on the dock when the weather holds.',
  },
  {
    name: 'Fretheim Hotel Restaurant',
    cuisine: 'Norwegian',
    priceRange: '300–500 NOK mains',
    highlight:
      'The dining room in the historic 1866 wooden hotel at Flam. Traditional Norwegian dishes including local lamb and cured fish. Book ahead for dinner — the hotel fills in July and walk-ins compete with guests for tables.',
  },
  {
    name: 'Gudvangen Viking Village',
    cuisine: 'Traditional / Cultural',
    priceRange: '150–250 NOK',
    highlight:
      'Open-fire cooking area serving traditional food during operating hours. Smoked meats and flatbreads cooked on open hearths. Not a restaurant in the conventional sense — a cultural experience with food. Open May to September. Worth the stop if you are based in Gudvangen.',
  },
];

type TabId = 'featured' | 'tours' | 'hiking' | 'dining';

const tabs: { id: TabId; label: string; icon: typeof Mountain }[] = [
  { id: 'featured', label: 'Featured experiences', icon: Waves },
  { id: 'tours', label: 'Guided tours', icon: Ship },
  { id: 'hiking', label: 'Hiking', icon: Mountain },
  { id: 'dining', label: 'Where to eat', icon: UtensilsCrossed },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function NaeroyfjordActivities() {
  const [activeTab, setActiveTab] = useState<TabId>('featured');

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Mountain className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">
          What to do at Naeroyfjord
        </h2>
      </div>
      <div className="max-w-3xl space-y-4 mb-8">
        <p className="text-slate-600 leading-relaxed">
          Naeroyfjord is 18 km of UNESCO fjord narrowing to 250 meters, with walls that rise
          1,000 meters above the waterline. The electric ferry is the main event. The Flam
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
                  <h3 className="text-lg font-bold text-slate-800 pt-1">{guide.title}</h3>
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
                      Book now
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
                    <h3 className="font-bold text-slate-900 mb-1">{tour.name}</h3>
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
                View all Naeroyfjord tours on GetYourGuide
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {/* Hiking */}
        {activeTab === 'hiking' && (
          <div className="space-y-6">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md">
              <div className="flex items-start gap-3">
                <Mountain className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-bold text-amber-800">Trail advisory</h4>
                  <p className="text-amber-900 text-sm mt-1">
                    Rimstigen is closed November to April. The Bakka farm trail requires a
                    seasonal boat crossing — verify schedule at visitflam.com. Always check
                    trail conditions at ut.no before departing.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {trails.map((trail) => (
                <div
                  key={trail.name}
                  className="bg-white rounded-lg border border-slate-200 p-6"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold text-slate-800">{trail.name}</h3>
                    <span
                      className={cn(
                        'text-xs font-bold px-2.5 py-1 rounded-sm shrink-0',
                        trail.difficulty === 'Hard'
                          ? 'bg-[#D32F2F] text-white'
                          : trail.difficulty === 'Moderate'
                          ? 'bg-blue-600 text-white'
                          : 'bg-emerald-600 text-white'
                      )}
                    >
                      {trail.difficulty === 'Hard'
                        ? 'DNT Red'
                        : trail.difficulty === 'Moderate'
                        ? 'DNT Blue'
                        : 'DNT Green'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Ruler className="w-3.5 h-3.5" aria-hidden="true" />
                      {trail.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                      {trail.elevation} ascent
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {trail.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{trail.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dining */}
        {activeTab === 'dining' && (
          <div className="grid sm:grid-cols-2 gap-6">
            {restaurants.map((r) => (
              <div
                key={r.name}
                className="bg-white rounded-lg border border-slate-200 p-6"
              >
                <h3 className="font-bold text-slate-900 mb-1">{r.name}</h3>
                <div className="flex flex-wrap gap-2 text-xs mb-3">
                  <span className="bg-slate-100 px-2 py-0.5 rounded-sm text-slate-600">
                    {r.cuisine}
                  </span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded-sm text-slate-600">
                    {r.priceRange}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{r.highlight}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
