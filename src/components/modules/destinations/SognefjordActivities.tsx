'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  Calendar,
  Mountain,
  Waves,
  Ship,
  Train,
  ArrowRight,
  ExternalLink,
  Star,
  UtensilsCrossed,
  Footprints,
  TrendingUp,
  Ruler,
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
    title: 'Flåm Railway: 866 meters in 20 km',
    description:
      'The Flåm Railway descends 866 meters between Myrdal on the Bergen Railway and Flåm at the fjord, in 20 km through 20 tunnels. Built between 1923 and 1940, it remains one of the steepest standard-gauge railways in the world — 80% of the route at a 5.5% gradient. The train stops at Kjosfossen waterfall for a 5-minute platform stop. Pre-booking is essential in July and August — trains sell out weeks ahead.',
    duration: '1 hour one-way',
    price: 'From 390 NOK one-way',
    season: 'Year-round',
    icon: <Train className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Book the Flåm Railway',
    isExternal: true,
    bookingUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    title: 'Nærøyfjord electric ferry',
    description:
      "Nærøyfjord is a branch of Sognefjord — 18 km long, 250 meters wide at its narrowest, with walls rising 1,700 meters. It has held UNESCO World Heritage status since 2005 alongside Geirangerfjord. The passenger ferry operated by The Future of The Fjords — a fully electric vessel — connects Flåm to Gudvangen in two hours through the fjord's most enclosed section. The silence of an electric motor in a fjord this narrow is genuinely different from a conventional ferry.",
    duration: '2 hours',
    price: 'From 450 NOK',
    season: 'Year-round (reduced winter)',
    icon: <Ship className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Book the Nærøyfjord ferry',
    isExternal: true,
    bookingUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    title: 'Sognefjellet National Tourist Route (Rv55)',
    description:
      "The Rv55 crosses Sognefjellet at 1,434 meters — the highest mountain pass road in Northern Europe — between Sogndal on the fjord and Lom on the east side of Jotunheimen. The road passes through Jotunheimen National Park with glacier arms of Jostedalsbreen visible from the carriageway. It opens each year in mid-May and closes in late October. Check vegvesen.no for the exact open date before you plan the crossing.",
    duration: '2–3 hours drive',
    price: 'No toll — self-drive',
    season: 'Mid-May to late October',
    icon: <Mountain className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/sogndal-l3113/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Plan the Rv55 crossing',
    isExternal: true,
  },
  {
    title: 'Urnes Stave Church — circa 1130 CE',
    description:
      "Urnes stave church stands on the eastern shore of Lustrafjord — a side branch of Sognefjord — and is the oldest surviving stave church in Norway, built around 1130 CE. It is a UNESCO World Heritage Site and contains carved wood panels from a previous church dating to approximately 1070 CE. Access requires a 10-minute car ferry from Solvorn. The church is open June to September. This is not a reconstructed attraction. It is the original building.",
    duration: '2–3 hours (including ferry)',
    price: 'Ferry ~40 NOK / Church ~120 NOK',
    season: 'June–September',
    icon: <Waves className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/sogndal-l3113/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Plan your visit',
    isExternal: true,
    bookingUrl:
      'https://www.getyourguide.com/sogndal-l3113/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
];

const tours: Tour[] = [
  {
    name: 'Norway in a Nutshell — Bergen loop',
    type: 'Rail + ferry combination',
    price: 'From 1,290 NOK',
    duration: '10–12 hours',
    highlight:
      'Bergen to Voss by train, Voss to Myrdal by train, Flåm Railway to Flåm, electric ferry through Nærøyfjord to Gudvangen, bus over Stalheim to Voss, train back to Bergen. Covers the full Sognefjord/Nærøyfjord experience in a single day without a car. Departs Bergen 08:05 daily in summer.',
    affiliateUrl:
      'https://www.getyourguide.com/bergen-l173/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Sognefjord express boat — Bergen to Flåm',
    type: 'Norled express boat service',
    price: 'From 680 NOK Bergen–Flåm',
    duration: '5.5 hours Bergen–Flåm',
    highlight:
      'Norled operates the express boat from Bergen directly into the main Sognefjord trunk, calling at Balestrand, Leikanger, and Flåm. Covers sections of Sognefjord not accessible by road. Operates summer season on the full route; year-round between Flåm and Balestrand.',
    affiliateUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Jostedalsbreen glacier walk',
    type: 'Guided glacier experience',
    price: 'From 850 NOK',
    duration: '3–5 hours',
    highlight:
      "Jostedalsbreen is the largest glacier in mainland Europe — 487 square kilometres. Outlet glaciers accessible from the Sognefjord area include Nigardsbreen (from Luster) and Supphellebreen (from Fjærland). All require a certified guide with glacier equipment. Solo walks on the glacier are not permitted.",
    affiliateUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Sognefjord sea kayak',
    type: 'Guided half-day or full-day',
    price: 'From 950 NOK half day',
    duration: '4–8 hours',
    highlight:
      'Sea kayaking on the main Sognefjord trunk between Balestrand and Sogndal. Guided tours run from Balestrand. The scale of Sognefjord — 1,308 m at its deepest — is best understood from water level. Suitable for beginners on guided tours. Wet or drysuits provided.',
    affiliateUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
];

const trails: Trail[] = [
  {
    name: 'Prest viewpoint — above Flåm',
    distance: '4 km return',
    elevation: '580 m',
    time: '2.5–3.5 hours',
    difficulty: 'Moderate',
    description:
      'The Prest trail climbs steeply from Flåm village to a viewpoint 580 meters above the Nærøyfjord confluence. On a clear day the view spans Aurlandsfjord and the start of Nærøyfjord. Less crowded than Stegastein. Starts from the signed trailhead at the far end of the campsite. The ascent is steep — use hiking poles.',
  },
  {
    name: 'Stegastein viewpoint from Aurland',
    distance: '8 km return (on foot) or drive',
    elevation: '650 m',
    time: '3–4 hours on foot / 10 min by car',
    difficulty: 'Easy',
    description:
      'Stegastein is a cantilevered viewing platform 650 meters above Aurlandsfjord, 8 km by road from Aurland village. It can be driven to (free, no toll), making it accessible to all mobility levels. Alternatively, hike the signed trail from Aurland village in 3–4 hours. The platform juts 30 meters out over the fjord — the floor is partly transparent.',
  },
  {
    name: 'Rimstigen — medieval path above Nærøyfjord',
    distance: '5.5 km one way',
    elevation: '850 m',
    time: '4–5 hours one way',
    difficulty: 'Hard',
    description:
      "A medieval farmers' path connecting Nærøyfjord to the plateau. Steep, exposed in sections, and only accessible from the fjord side by boat — Dyrdal has no road. Factor in boat timing from Flåm or Gudvangen when planning the day. The wet rock sections become dangerously slippery in rain. DNT Red grade. The descent to Bakka on the far side is nearly as steep.",
  },
  {
    name: 'Kvænangseidet — Sognefjord main trunk ridge',
    distance: '8 km return',
    elevation: '700 m',
    time: '3.5–5 hours',
    difficulty: 'Moderate',
    description:
      'A less-visited ridge walk above Sogndal with panoramic views over the main Sognefjord trunk and glacier views east toward Jostedalsbreen. The trail starts from the Sogndal side and reaches a plateau at 700 meters. A practical alternative for hikers based in Sogndal who want a mountain day without driving to Flåm.',
  },
];

const restaurants: Restaurant[] = [
  {
    name: 'Ægir Brewery — Flåm',
    cuisine: 'Norwegian / Craft beer',
    priceRange: '250–450 NOK mains',
    highlight:
      'A Viking hall-styled brewery in Flåm harbour, producing beers brewed with glacial meltwater and local botanicals. The food is hearty: elk burgers, fjord trout, Nordic sharing boards. The busiest restaurant in Flåm — arrive early or book ahead. The house dark ale is worth ordering.',
  },
  {
    name: 'Kviknes Hotel — Balestrand',
    cuisine: 'Norwegian / Historic hotel',
    priceRange: '350–600 NOK mains',
    highlight:
      'Kviknes Hotel has operated in Balestrand since 1877 and retains its Victorian-era wooden architecture. The restaurant uses local dairy, fjord fish, and mountain game. The finest dining in the Sognefjord area. Kaiser Wilhelm II stayed here repeatedly in the early 1900s. Non-guests can book the restaurant.',
  },
  {
    name: 'Fretheim Hotel restaurant — Flåm',
    cuisine: 'Norwegian / Seasonal menu',
    priceRange: '280–500 NOK mains',
    highlight:
      "Fretheim Hotel has been the upper-end option in Flåm since 1866. The restaurant focuses on seasonal local produce: Flåm valley lamb, Sognefjord trout, and foraged ingredients from the surrounding mountains. Less crowded than Ægir, slightly more formal. Booking essential July–August.",
  },
  {
    name: 'Sogndal town cafés',
    cuisine: 'Norwegian / Local dining',
    priceRange: '150–300 NOK',
    highlight:
      "Sogndal is the main town on Sognefjord — 7,000 residents, university, airport — with a functioning local food scene: bakeries, cafés, and a Rema 1000 for self-catering. Loftesnes Restaurant at the edge of town is the reliable dinner option with fjord views. Less tourist-priced than Flåm.",
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

export default function SognefjordActivities() {
  const [activeTab, setActiveTab] = useState<TabId>('featured');

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Mountain className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">
          What to do at Sognefjord
        </h2>
      </div>
      <div className="max-w-3xl space-y-4 mb-8">
        <p className="text-slate-600 leading-relaxed">
          Sognefjord is 205 km long, 1,308 meters at its deepest, and branches into more
          than a dozen sub-fjords including the UNESCO-listed Nærøyfjord. The Flåm Railway,
          Jostedalsbreen glacier, and Sognefjellet mountain road are all within a day's reach.
          This is the most activity-dense fjord region in Norway.
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
                View all Sognefjord tours on GetYourGuide
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
