'use client';

import { useState } from 'react';
import { Train, Ship, Mountain, UtensilsCrossed, ExternalLink, AlertTriangle, Clock, TrendingUp, Ruler, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedActivity {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  price: string;
  description: string;
  highlights: string[];
  bookingUrl?: string;
  warning?: string;
  badge?: string;
}

interface GuidedTour {
  name: string;
  operator: string;
  duration: string;
  price: string;
  description: string;
  includes: string[];
  bookingUrl: string;
}

interface HikingRoute {
  name: string;
  grade: 'Easy' | 'Moderate' | 'Hard';
  distance: string;
  elevation: string;
  time: string;
  description: string;
  warning?: string;
}

interface DiningPlace {
  name: string;
  location: string;
  type: string;
  priceRange: string;
  description: string;
  mustOrder: string;
}

const gradeColors = {
  Easy: 'bg-emerald-600 text-white',
  Moderate: 'bg-blue-600 text-white',
  Hard: 'bg-[#D32F2F] text-white',
};

const featuredActivities: FeaturedActivity[] = [
  {
    id: 'flam-railway',
    name: 'Flåm Railway (Flåmsbana)',
    tagline: 'One of the world\'s steepest standard-gauge railways',
    duration: '1 hour one-way (55 min)',
    price: 'From 390 NOK one-way / 590 NOK return',
    badge: 'Signature experience',
    description:
      'The Flåm Railway descends 866 metres over 20 kilometres between Myrdal (on the Bergen Railway) and Flåm at the fjord. Built between 1923 and 1940, it is still one of the steepest standard-gauge railways in the world — 80% of the route at a 5.5% gradient. The train passes through 20 tunnels and stops at Kjosfossen waterfall (350 metres high) for a 5-minute platform stop. This is not a tourist replica: it operates year-round and functions as both a regional transport link and a scenic ride.',
    highlights: [
      'Myrdal–Flåm: 866 metres of descent over 20 km',
      'Kjosfossen waterfall stop — 350m drop visible from the platform',
      'Bergen–Myrdal–Flåm–Gudvangen (Norway in a Nutshell) loop possible in one day',
      'Pre-booking essential July–August — trains sell out weeks ahead',
    ],
    bookingUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&cmp=sognefjord_flam_railway',
    warning:
      'July–August trains sell out weeks in advance. Book at flamsbana.no or the GYG link above as soon as your dates are confirmed. Walk-up tickets are rarely available in peak season.',
  },
  {
    id: 'naeroyfjord-cruise',
    name: 'Nærøyfjord electric ferry',
    tagline: 'The UNESCO-listed branch fjord by zero-emission boat',
    duration: '2 hours (Flåm to Gudvangen)',
    price: '~450 NOK adult one-way',
    badge: 'UNESCO World Heritage',
    description:
      'Nærøyfjord is a branch of Sognefjord — 18 kilometres long, 250 metres wide at its narrowest, with walls rising 1,700 metres above the water. It has held UNESCO World Heritage status since 2005 alongside Geirangerfjord. The passenger ferry operated by The Future of The Fjords — a fully electric vessel — connects Flåm to Gudvangen in two hours through the fjord\'s most enclosed section. The silence of an electric motor in a fjord this narrow is genuinely different from a conventional ferry. It is the correct boat to take.',
    highlights: [
      '18 km fjord — 250 m wide at the narrowest point',
      'Walls rising to 1,700 m on both sides',
      'Fully electric vessel: zero emissions, minimal noise',
      'Connections at both ends for Norway in a Nutshell route',
      'Waterfalls visible at close range from the deck — Kjelfossen (1,375m) and Råkendalsfossen',
    ],
    bookingUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&cmp=sognefjord_naeroyfjord_ferry',
  },
  {
    id: 'sognefjellet-road',
    name: 'Sognefjellet National Tourist Route (Rv55)',
    tagline: 'The highest mountain pass road in Northern Europe',
    duration: '2–3 hours (Sogndal to Lom)',
    price: 'No toll — self-drive',
    badge: 'Seasonal (mid-May to late Oct)',
    description:
      'The Rv55 crosses Sognefjellet at 1,434 metres — the highest mountain pass road in Northern Europe. Running 100 kilometres between Sogndal on the fjord and Lom on the east side of Jotunheimen, it passes through Jotunheimen National Park and the Jostedalsbreen glacier country. The road was designated one of Norway\'s 18 National Tourist Routes. It opened as a motor road in 1938 and closes every winter when snow makes the pass impassable — typically late October to mid-May. Glaciers visible from the road include Fannaråkbreen and arms of Jostedalsbreen.',
    highlights: [
      'Summit at 1,434 m — Northern Europe\'s highest mountain road',
      'Passes through Jotunheimen National Park',
      'Jostedalsbreen glacier arms visible from the road',
      'Sognefjellet Lodge (Turtagrø Hotel) at 884 m — historic climbing base since 1888',
      'Closed late October to mid-May: check vegvesen.no for exact open date',
    ],
    warning:
      'Rv55 closes each winter when snow makes the pass impassable — typically late October and reopens mid-May. The exact date varies by year. Do not plan a crossing without verifying the current open/closed status at vegvesen.no.',
  },
  {
    id: 'urnes-stave-church',
    name: 'Urnes Stave Church',
    tagline: 'Norway\'s oldest stave church — UNESCO World Heritage, circa 1130 CE',
    duration: '2–3 hours including ferry to Ornes',
    price: 'Ferry ~40 NOK / Church entrance ~120 NOK',
    badge: 'UNESCO World Heritage',
    description:
      'Urnes stave church stands on the eastern shore of Lustrafjord — a side branch of Sognefjord — and is the oldest surviving stave church in Norway, built around 1130 CE. It is a UNESCO World Heritage Site and contains carved wood panels from a previous church on the same site dating to approximately 1070 CE, making it a 950-year-old building with original decorative elements that are nearly 1,000 years old. Access requires a small car ferry from Solvorn — a 10-minute crossing. The church is open June to September. This is not a reconstructed attraction. It is the original building.',
    highlights: [
      'Built circa 1130 CE — oldest surviving stave church in Norway',
      'UNESCO World Heritage since 1979',
      'Original carved wood panels from 1070 CE predecessor',
      'Access via 10-minute ferry from Solvorn (Urnes ferje)',
      'Open June–September. Closed rest of year.',
      'Lustrafjord views from the churchyard — one of Sognefjord\'s quietest branches',
    ],
    bookingUrl:
      'https://www.getyourguide.com/sogndal-l3113/?partner_id=5DXMTLJ&utm_medium=online_publisher&cmp=sognefjord_urnes',
  },
];

const guidedTours: GuidedTour[] = [
  {
    name: 'Norway in a Nutshell — Bergen Loop',
    operator: 'Fjord Tours / Rail + Ferry combination',
    duration: 'Full day (10–12 hours)',
    price: 'From 1,290 NOK',
    description:
      'The original multi-modal Sognefjord day tour: Bergen–Voss by train, Voss–Myrdal by train, Flåm Railway to Flåm, electric ferry through Nærøyfjord to Gudvangen, bus over Stalheim to Voss, train back to Bergen. Covers the full Sognefjord/Nærøyfjord experience in a single day without a car.',
    includes: ['Bergen Railway (Voss section)', 'Flåm Railway', 'Nærøyfjord electric ferry', 'Bus Gudvangen–Voss', 'Return train Bergen'],
    bookingUrl:
      'https://www.getyourguide.com/bergen-l173/?partner_id=5DXMTLJ&utm_medium=online_publisher&cmp=sognefjord_nutshell',
  },
  {
    name: 'Sognefjord fjord cruise — Balestrand to Flåm',
    operator: 'Norled express boat',
    duration: '3.5 hours Bergen–Balestrand / 1.5h Balestrand–Flåm',
    price: 'From 680 NOK Bergen–Flåm (seasonal)',
    description:
      'Norled operates the express boat service from Bergen directly into the main Sognefjord, calling at Balestrand, Leikanger, and Flåm. The boat covers sections of Sognefjord not accessible by road, including the main trunk of the fjord between Vangsnes and Hella. Operates summer season only on the full route; year-round between Flåm and Balestrand.',
    includes: ['Covered cabin seating', 'Outdoor deck', 'WiFi', 'Light refreshments on board'],
    bookingUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&cmp=sognefjord_express_boat',
  },
  {
    name: 'Guided Jostedalsbreen glacier walk',
    operator: 'Jostedal Glacier Guides / NTT',
    duration: '3–5 hours',
    price: 'From 850 NOK',
    description:
      'Jostedalsbreen is the largest glacier in mainland Europe — 487 square kilometres. Several outlet glaciers are accessible on guided walks from the Sognefjord area: Nigardsbreen (from Luster), Briksdalbreen (from Stryn), and Supphellebreen (from Fjærland). All require a certified guide with glacier equipment. Solo walks on the glacier are not permitted.',
    includes: ['Crampons and ice axes provided', 'Certified glacier guide', 'Safety briefing', 'Glacier walking instruction'],
    bookingUrl:
      'https://www.getyourguide.com/flam-l2424/?partner_id=5DXMTLJ&utm_medium=online_publisher&cmp=sognefjord_glacier',
  },
  {
    name: 'Fjord kayak — Sognefjord main trunk',
    operator: 'Njord Expedition / local operators',
    duration: 'Half day (4–5h) or full day (7–8h)',
    price: 'From 950 NOK half day',
    description:
      'Sea kayaking on the main Sognefjord trunk between Balestrand and Sogndal covers sections of the fjord where the depth exceeds 1,200 metres beneath the kayak. Guided tours run from Balestrand. The scale of Sognefjord — 55 km wide at its broadest, 1,308 m at its deepest — is best understood from water level. Suitable for beginners on guided tours. Independent kayaking requires fjord experience and weather assessment.',
    includes: ['Sea kayak and paddle', 'Wetsuit or drysuit', 'Safety equipment', 'Qualified guide'],
    bookingUrl:
      'https://www.getyourguide.com/balestrand-l?partner_id=5DXMTLJ&utm_medium=online_publisher&cmp=sognefjord_kayak',
  },
];

const hikingRoutes: HikingRoute[] = [
  {
    name: 'Prest viewpoint — above Flåm',
    grade: 'Moderate',
    distance: '4 km return',
    elevation: '+580 m',
    time: '2.5–3.5 hours',
    description:
      'The Prest trail climbs steeply from Flåm village to a viewpoint at 580 metres directly above the start of Nærøyfjord. On a clear day you see the entire fjord confluence — Aurlandsfjord, the start of Nærøyfjord, and Flåm village below. Less crowded than the Aurland side trails. Starts from the signed trailhead at the far end of the campsite. The ascent is steep — use hiking poles.',
  },
  {
    name: 'Stegastein viewpoint from Aurland',
    grade: 'Easy',
    distance: '8 km return (road walk) or drive to top',
    elevation: '+652 m by road / flat at top',
    time: '1 hour by car / 3–4 hours on foot',
    description:
      'Stegastein is a cantilevered viewing platform at 650 metres above Aurlandsfjord, 8 km by road from Aurland village. It can be driven to (free, no toll), making it accessible to all mobility levels. Alternatively, hike the signed trail from Aurland village in 3–4 hours. The platform juts 30 metres out over the fjord — the floor is partly transparent. One of Norway\'s most photographed fjord viewpoints and genuinely worth it.',
  },
  {
    name: 'Rimstigen — ancient mountain path above Nærøyfjord',
    grade: 'Hard',
    distance: '5.5 km one-way (point-to-point)',
    elevation: '+850 m from Dyrdal',
    time: '4–5 hours (one-way)',
    description:
      'Rimstigen is a medieval farmers\' path connecting Nærøyfjord to the plateau. It is one of the most demanding trails in the Flåm area: steep, exposed in sections, and only accessible from the fjord side by boat (Dyrdal has no road). The descent to Bakka on the far side is nearly as steep. The trail rewards with near-vertical views down into the narrowest section of Nærøyfjord. DNT Red grade.',
    warning:
      'Rimstigen requires good physical condition and a dry day — the wet rock sections become dangerously slippery in rain. The fjord-side start at Dyrdal is boat-access only. Factor in boat timing from Flåm or Gudvangen.',
  },
  {
    name: 'Kvænangseidet — Sognefjord main trunk ridge',
    grade: 'Moderate',
    distance: '8 km return',
    elevation: '+700 m',
    time: '3.5–5 hours',
    description:
      'A less-visited ridge walk above Sogndal giving panoramic views over the main Sognefjord trunk — the widest section of the fjord at this point. The trail starts from the Sogndal side and reaches a plateau with glacier views to the east (Jostedalsbreen) and fjord views west. A practical alternative for hikers based in Sogndal who want a mountain day without driving to Flåm.',
  },
];

const diningPlaces: DiningPlace[] = [
  {
    name: 'Ægir Brewery — Flåm',
    location: 'Flåm harbour',
    type: 'Brewery restaurant / Nordic pub',
    priceRange: '250–450 NOK',
    description:
      'A Viking hall-styled brewery in Flåm harbour, producing Sognefjord-specific beers brewed with glacial meltwater and local botanicals. The Nøgne Ø collaboration beers and house ales are among the best craft beers produced in fjord Norway. The food is hearty: elk burgers, fjord trout, Nordic sharing boards. It is the busiest restaurant in Flåm — arrive early or book ahead.',
    mustOrder: 'Sumbel (house dark ale) and the reindeer stew with flatbread',
  },
  {
    name: 'Kviknes Hotel — Balestrand',
    location: 'Balestrand village, fjord-front',
    type: 'Historic hotel restaurant',
    priceRange: '350–600 NOK',
    description:
      'Kviknes Hotel has operated in Balestrand since 1877 and retains its Victorian-era wooden architecture. The restaurant is the finest in the Sognefjord area: traditional Norwegian cuisine using local dairy, fjord fish, and mountain game. Kaiser Wilhelm II stayed here repeatedly in the early 1900s. Non-guests can book the restaurant. The Sunday buffet is the regional institution.',
    mustOrder: 'Gravet laks (cured salmon) and the Hardanger lamb with root vegetables',
  },
  {
    name: 'Fretheim Hotel restaurant — Flåm',
    location: 'Flåm village centre',
    type: 'Hotel restaurant / Seasonal menu',
    priceRange: '280–500 NOK',
    description:
      'Fretheim Hotel has been the upper-end option in Flåm since 1866. The restaurant focuses on seasonal local produce: Flåm valley lamb, Sognefjord trout, and foraged ingredients from the surrounding mountains. Less crowded than Ægir, slightly more formal. Booking essential July–August.',
    mustOrder: 'Sognefjord trout — sourced from the fjord catchment',
  },
  {
    name: 'Sogndal cafés and Loftesnes dining',
    location: 'Sogndal town centre',
    type: 'Town café / local dining',
    priceRange: '150–300 NOK',
    description:
      'Sogndal is the main town on Sognefjord (7,000 residents, university) and has a functioning local food scene: bakeries, cafés, and a Rema 1000 for self-catering. Loftesnes Restaurant at the edge of town is the reliable dinner option with fjord views. Less tourist-priced than Flåm — Sogndal is where the locals eat.',
    mustOrder: 'Raspeballer (potato dumplings) — the regional working-class dish served on Thursdays',
  },
];

const tabs = [
  { id: 'featured', label: 'Featured', icon: Star },
  { id: 'tours', label: 'Guided tours', icon: Ship },
  { id: 'hiking', label: 'Hiking', icon: Mountain },
  { id: 'dining', label: 'Where to eat', icon: UtensilsCrossed },
];

export default function SognefjordActivities() {
  const [activeTab, setActiveTab] = useState('featured');

  return (
    <section className="py-16 bg-white" aria-labelledby="activities-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#00CC6A] mb-2">
            Things to do
          </p>
          <h2
            id="activities-heading"
            className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-4"
          >
            Sognefjord activities
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
            At 205 kilometres, Sognefjord is the longest fjord in Norway and the second longest in the world. The Flåm Railway, Nærøyfjord branch, Sognefjellet road, and Jostedalsbreen glacier make it the single most activity-dense fjord region in the country.
          </p>
        </div>

        {/* Tabs */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
          aria-label="Activity categories"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 min-h-[44px] border',
                  activeTab === tab.id
                    ? 'bg-[#1A365D] text-white border-[#1A365D] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#1A365D] hover:text-[#1A365D]'
                )}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Featured activities */}
        {activeTab === 'featured' && (
          <div
            id="panel-featured"
            role="tabpanel"
            aria-labelledby="tab-featured"
            className="space-y-5"
          >
            {featuredActivities.map((act) => (
              <div
                key={act.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="bg-[#1A365D] px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-white font-bold text-lg">{act.name}</h3>
                      {act.badge && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#00CC6A] text-[#1A365D]">
                          {act.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-300 text-sm">{act.tagline}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-200 shrink-0">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#00CC6A]" aria-hidden="true" />
                      {act.duration}
                    </span>
                    <span className="font-semibold text-[#00CC6A]">{act.price}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {act.warning && (
                    <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg flex gap-2.5">
                      <AlertTriangle
                        className="w-4 h-4 text-amber-600 mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <p className="text-sm text-amber-900">{act.warning}</p>
                    </div>
                  )}

                  <p className="text-slate-700 leading-relaxed">{act.description}</p>

                  <div>
                    <p className="text-xs font-bold text-[#1A365D] uppercase tracking-wide mb-2">
                      Key facts
                    </p>
                    <ul className="space-y-1.5">
                      {act.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="text-[#00CC6A] mt-0.5 shrink-0 font-bold">—</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {act.bookingUrl && (
                    <a
                      href={act.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A365D] hover:bg-[#152d52] text-white text-sm font-semibold rounded-lg transition-colors min-h-[44px]"
                    >
                      Check availability
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Guided tours */}
        {activeTab === 'tours' && (
          <div
            id="panel-tours"
            role="tabpanel"
            aria-labelledby="tab-tours"
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {guidedTours.map((tour, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col"
              >
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-bold text-[#1A365D] text-base leading-tight">{tour.name}</h3>
                    <span className="text-sm font-bold text-[#00CC6A] shrink-0 whitespace-nowrap">
                      {tour.price}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mb-3">
                    {tour.operator} · {tour.duration}
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">{tour.description}</p>
                  <div>
                    <p className="text-xs font-bold text-[#1A365D] uppercase tracking-wide mb-2">
                      Includes
                    </p>
                    <ul className="space-y-1">
                      {tour.includes.map((inc, j) => (
                        <li key={j} className="flex items-center gap-2 text-xs text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00CC6A] shrink-0" aria-hidden="true" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <a
                  href={tour.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="mt-5 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1A365D] hover:bg-[#152d52] text-white text-sm font-semibold rounded-lg transition-colors min-h-[44px]"
                >
                  Book this tour
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Hiking */}
        {activeTab === 'hiking' && (
          <div
            id="panel-hiking"
            role="tabpanel"
            aria-labelledby="tab-hiking"
            className="space-y-4"
          >
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg flex gap-3 mb-6">
              <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold text-blue-800 text-sm">DNT trail grading</p>
                <p className="text-blue-900 text-sm mt-0.5">
                  Trails use the Norwegian DNT standard: Green (all levels), Blue (moderate fitness), Red (demanding, some technical terrain). Norwegian Red is not the same as &quot;moderate&quot; on international apps. Come prepared for the grade you choose.
                </p>
              </div>
            </div>

            {hikingRoutes.map((trail, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-bold text-[#1A365D] text-base">{trail.name}</h3>
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide',
                          gradeColors[trail.grade]
                        )}
                      >
                        {trail.grade}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Ruler className="w-3.5 h-3.5" aria-hidden="true" />
                        {trail.distance}
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                        {trail.elevation}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        {trail.time}
                      </span>
                    </div>
                  </div>
                </div>

                {trail.warning && (
                  <div className="bg-[#D32F2F]/10 border-l-4 border-[#D32F2F] p-3 rounded-r-lg flex gap-2.5 mb-3">
                    <AlertTriangle
                      className="w-4 h-4 text-[#D32F2F] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-slate-700">{trail.warning}</p>
                  </div>
                )}

                <p className="text-sm text-slate-700 leading-relaxed">{trail.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Dining */}
        {activeTab === 'dining' && (
          <div
            id="panel-dining"
            role="tabpanel"
            aria-labelledby="tab-dining"
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {diningPlaces.map((place, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="mb-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-[#1A365D] text-base leading-tight">{place.name}</h3>
                    <span className="text-sm font-bold text-[#00CC6A] shrink-0 whitespace-nowrap">
                      {place.priceRange}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {place.location} · {place.type}
                  </p>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed mb-4">{place.description}</p>
                <div className="bg-[#1A365D]/5 border border-[#1A365D]/15 rounded-lg px-4 py-3">
                  <p className="text-xs font-bold text-[#1A365D] uppercase tracking-wide mb-1">
                    Order this
                  </p>
                  <p className="text-sm text-slate-700">{place.mustOrder}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
