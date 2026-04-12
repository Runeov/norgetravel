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
  Snowflake,
  Apple,
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
    title: 'Trolltunga: the full route from Skjeggedal',
    description:
      '27 km round-trip with 800 meters of elevation gain. The rock ledge juts 700 meters above Ringedalsvatnet lake. Budget 10 to 12 hours — not 6, as many Instagram posts imply. A guide is required by law from October 1 to May 31. In summer, the trailhead fills by 07:00 on weekends. Start before dawn or book a guided departure for the early slot.',
    duration: '10–12 hours',
    price: 'Free trail (guide required Oct–May)',
    season: 'Jun–Sep (self-guided). Oct–May (guide required).',
    icon: <Mountain className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/odda-l2558/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Book guided Trolltunga',
    isExternal: true,
    bookingUrl:
      'https://www.getyourguide.com/odda-l2558/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    title: 'Voringsfossen: 182 meters into Mabodalen',
    description:
      'Norway\'s most visited waterfall drops 182 meters into the Mabodalen valley, 2 km from Eidfjord on Rv7. The new 2020 viewing platforms reach different angles of the falls. The upper platform is accessible by road from Rv7. The valley-floor view requires a 30-minute hike from Fossli. Both are worth it. Visit before 11:00 to beat the tour buses.',
    duration: '1–2 hours',
    price: 'Free (parking paid)',
    season: 'May–October (road access)',
    icon: <Waves className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/eidfjord-l2524/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Plan your visit',
    isExternal: true,
  },
  {
    title: 'Hardanger apple harvest and cider trail',
    description:
      'Forty percent of Norway\'s fruit grows along the Hardangerfjord shores. The orchards bloom pink in May and harvest from late August through October. Cideries at Aga, Lofthus, and Ullensvang open their farmgates during harvest season. The Hardangertun market at Lofthus runs on the third weekend of September with 50 producers. This is the Norway the fjord photos do not show you.',
    duration: 'Half-day to full-day',
    price: 'Tastings from 80–150 NOK',
    season: 'Blossom: May. Harvest: Aug–Oct.',
    icon: <Apple className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/hardangerfjord-l97248/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Book cider farm tour',
    isExternal: true,
    bookingUrl:
      'https://www.getyourguide.com/hardangerfjord-l97248/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
];

const tours: Tour[] = [
  {
    name: 'Guided Trolltunga (summer)',
    type: 'Small group guided hike',
    price: 'From 995 NOK',
    duration: '10–12 hours',
    highlight:
      'Guided departure from Skjeggedal trailhead. Guide ensures the group maintains the pace needed to complete the route safely before dark. Early departures (06:00) available for June to August. Maximum 12 per group. The guide carries a first aid kit and satellite communicator.',
    affiliateUrl:
      'https://www.getyourguide.com/odda-l2558/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Folgefonna glacier walk',
    type: 'Guided glacier experience',
    price: 'From 850 NOK',
    duration: '4–6 hours',
    highlight:
      'Folgefonna is the third largest glacier in Norway. Guided walks depart from the Fonnabu visitor centre on the plateau above Jondal. Crampons and ice axe provided. The contrast between the fjord at sea level and the glacier at 1,200 meters is a 1-hour drive. No prior glacier experience required.',
    affiliateUrl:
      'https://www.getyourguide.com/hardangerfjord-l97248/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Hardangerfjord sightseeing cruise',
    type: 'Boat tour',
    price: 'From 650 NOK',
    duration: '2–3 hours',
    highlight:
      'Departs from Eidfjord or Norheimsund. The cruise covers the inner fjord, passing the Hardanger Bridge (1,380m span) and the orchard villages along the south shore. Best option for travellers who want the fjord from the water without committing to a full day.',
    affiliateUrl:
      'https://www.getyourguide.com/hardangerfjord-l97248/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Folgefonna summer skiing',
    type: 'Ski day on the glacier',
    price: 'From 480 NOK (lift pass)',
    duration: 'Full day',
    highlight:
      'Folgefonna Ski Resort operates June to August on the glacier plateau. The ski lifts run at 1,200m while the fjord swelters at sea level below. Ski and snowboard rental available at the resort. The descent to Jondal and back is an experience on its own.',
    affiliateUrl:
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
      'Norway\'s most photographed rock ledge, 700 meters above Ringedalsvatnet. The full route from Skjeggedal is 27 km return with 800 meters of elevation gain. DNT Red grade. A guide is required by law from October 1 to May 31. In summer, start before 07:00 to secure trailhead parking and avoid the peak-hour crowd on the ledge. The rock ledge itself is 2 meters wide — the queue can be 30 minutes long at midday in July.',
  },
  {
    name: 'Ringedalsvatnet lake loop',
    distance: '14 km return (to lake)',
    elevation: '400 m',
    time: '5–6 hours',
    difficulty: 'Moderate',
    description:
      'The Trolltunga route passes Ringedalsvatnet, the turquoise lake below the rock ledge. Turning back at the lake (rather than continuing to Trolltunga) gives a DNT Blue-grade experience: the scenery is comparable, the effort is half. The lake reflects the surrounding peaks on calm mornings. A good alternative if the 12-hour Trolltunga route exceeds your capacity.',
  },
  {
    name: 'Hardangervidda plateau day walk',
    distance: '8–15 km (varies by route)',
    elevation: '200–400 m',
    time: '3–6 hours',
    difficulty: 'Moderate',
    description:
      'The Hardangervidda National Park begins directly above Eidfjord. Marked trails from the Rv7 give access to the plateau without a multi-day commitment. The Dyranut DNT cabin is 15 km from the Rv7 trailhead — a full day out and back. The plateau wild reindeer herds are most visible in August. Check weather at yr.no before departing — the plateau changes fast.',
  },
];

const restaurants: Restaurant[] = [
  {
    name: 'Ullensvang Hotel restaurant',
    cuisine: 'Norwegian / Nordic',
    priceRange: '300–600 NOK mains',
    highlight:
      'The grand hotel at Lofthus has operated since 1846. The restaurant uses apples, cider, and lamb from the surrounding farms. The dining room overlooks the orchard and Sorfjorden below. Book 24 hours ahead in season — the hotel fills with guests and the restaurant follows.',
  },
  {
    name: 'Hardanger Cider farms (Lofthus/Aga)',
    cuisine: 'Farmgate tastings',
    priceRange: '80–150 NOK (tastings)',
    highlight:
      'The orchards along the south shore from Aga to Ullensvang open their farmgates from August through October. Cider tastings, apple juice, and direct sales from the producer. The Hardangertun market on the third weekend of September gathers 50 producers in one place.',
  },
  {
    name: 'Eidfjord Hotel restaurant',
    cuisine: 'Norwegian',
    priceRange: '200–400 NOK mains',
    highlight:
      'Reliable mid-range dining in Eidfjord village. Local fish and meat dishes. The most consistent option in Eidfjord for travellers not staying at the Quality Hotel Vøringsfoss. Walk-ins usually accommodated.',
  },
  {
    name: 'Trolltunga Hotel restaurant (Odda)',
    cuisine: 'Norwegian',
    priceRange: '200–350 NOK mains',
    highlight:
      'In Odda town, 23 km from the Skjeggedal trailhead. The best option for a post-Trolltunga dinner — you will be hungry enough for the full menu. Simple Norwegian dishes with generous portions. The breakfast for next-day hikers is good value.',
  },
];

type TabId = 'featured' | 'tours' | 'hiking' | 'dining';

const tabs: { id: TabId; label: string; icon: typeof Mountain }[] = [
  { id: 'featured', label: 'Featured experiences', icon: Mountain },
  { id: 'tours', label: 'Guided tours', icon: Ship },
  { id: 'hiking', label: 'Hiking', icon: TrendingUp },
  { id: 'dining', label: 'Where to eat', icon: UtensilsCrossed },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function HardangerfjordActivities() {
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
          headline — but it demands 10 to 12 hours, not 6. Voringsfossen and the cider farms are
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
          <div className="space-y-6">
            <div className="bg-[#D32F2F]/10 border-l-4 border-[#D32F2F] p-4 rounded-r-md">
              <div className="flex items-start gap-3">
                <Mountain className="w-5 h-5 text-[#D32F2F] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="font-bold text-[#D32F2F]">Trolltunga safety warning</h4>
                  <p className="text-slate-700 text-sm mt-1">
                    A licensed guide is required by Norwegian law for Trolltunga from October 1 to
                    May 31. In summer, start before 07:00 to secure parking and avoid the midday
                    queue on the ledge. The Fjellvettreglene Rule 2 applies: adapt the trip to your
                    ability and the conditions. Rescue operations here are costly and common.
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
