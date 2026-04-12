'use client';

import { useState } from 'react';
import { Car, Train, Ship, Route, AlertTriangle, CheckCircle, Info, Clock, MapPin, Fuel } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RouteFerry {
  name: string;
  operator: string;
  duration: string;
  frequency: string;
  autopass: boolean;
  preBook: boolean;
  cost: string;
  note?: string;
}

interface PublicTransport {
  type: string;
  operator: string;
  route: string;
  duration: string;
  frequency: string;
  cost: string;
  note?: string;
}

interface RouteStop {
  name: string;
  description: string;
  detourTime?: string;
}

interface RouteWarning {
  level: 'info' | 'warning' | 'critical';
  title: string;
  body: string;
}

interface RouteData {
  id: string;
  label: string;
  icon: typeof Car;
  from: string;
  distance?: string;
  realTime: string;
  mapsTime?: string;
  roads: string;
  season: string;
  seasonOpen: boolean;
  tollCost?: string;
  overview: string;
  ferries: RouteFerry[];
  publicTransport: PublicTransport[];
  stops: RouteStop[];
  warnings: RouteWarning[];
  carNote: string;
}

const routes: RouteData[] = [
  {
    id: 'bergen-train',
    label: 'Bergen (train)',
    icon: Train,
    from: 'Bergen',
    realTime: '5–6 hours (Bergen–Flåm total)',
    roads: 'Bergen Railway → Myrdal → Flåm Railway → Flåm → Sognefjord',
    season: 'Year-round',
    seasonOpen: true,
    overview:
      'Bergen to Sognefjord by public transport is the most iconic approach in Norway — a multi-modal chain of train, mountain railway, and fjord ferry that covers 180 kilometres of dramatically different terrain. The Bergen Railway runs east to Myrdal (2h15min). The Flåm Railway descends 866 metres in 20 kilometres to Flåm at the fjord (55min). From Flåm, the electric ferry continues into Nærøyfjord or the main Sognefjord trunk. This route requires advance booking in July–August — the Flåm Railway in particular sells out weeks ahead.',
    ferries: [
      {
        name: 'Nærøyfjord electric ferry (Flåm → Gudvangen)',
        operator: 'The Future of The Fjords / Norled',
        duration: '2 hours',
        frequency: 'June–August: 2–3 departures daily. Sept–May: reduced.',
        autopass: false,
        preBook: true,
        cost: '~450 NOK adult one-way',
        note: 'Fully electric vessel. Zero emissions on the UNESCO-listed fjord. Pre-booking essential in summer.',
      },
      {
        name: 'Sognefjord main trunk ferry (Flåm → Balestrand → Sogndal)',
        operator: 'Norled express boat',
        duration: '3h15min Flåm–Balestrand / 5h Flåm–Sogndal',
        frequency: 'Year-round (reduced winter). Bergen–Sognefjord direct also available.',
        autopass: false,
        preBook: true,
        cost: '~680 NOK Flåm–Sogndal',
        note: 'The main trunk ferry covers the inner Sognefjord. Connects Flåm to Balestrand, Hella, and Sogndal.',
      },
    ],
    publicTransport: [
      {
        type: 'Train',
        operator: 'Vy',
        route: 'Bergen → Myrdal (Bergen Railway)',
        duration: '2h15min',
        frequency: 'Hourly in daytime',
        cost: 'From ~350 NOK',
        note: 'Book at vy.no. The Voss–Myrdal section is the highest point — bring warm layers even in summer.',
      },
      {
        type: 'Mountain railway',
        operator: 'Flåmsbana (Vy)',
        route: 'Myrdal → Flåm (Flåm Railway)',
        duration: '55 minutes',
        frequency: 'June–August: 8–10 departures daily. Winter: 2–4 daily.',
        cost: 'From 390 NOK one-way / 590 NOK return',
        note: 'Book at flamsbana.no. Sells out weeks ahead in July–August. This is not an optional reservation.',
      },
    ],
    stops: [
      {
        name: 'Voss (train stop)',
        description: 'Mountain town on the Bergen Railway, 1.5 hours from Bergen. Outdoor activity hub: rafting, skydiving, paragliding. Usable as a Sognefjord base — 1.5 hours by bus to Flåm.',
        detourTime: '1–2 days if staying',
      },
      {
        name: 'Kjosfossen waterfall (Flåm Railway)',
        description: 'The Flåm Railway stops at Kjosfossen waterfall for 5 minutes — 350 metres of free fall, close enough to feel the spray. One of the few stops on the route. Have the camera ready.',
        detourTime: '5 min (built into schedule)',
      },
    ],
    warnings: [
      {
        level: 'critical',
        title: 'Flåm Railway books out weeks ahead in summer',
        body: 'The Flåm Railway is Norway\'s most commercially developed rail route. July and August trains fill weeks in advance. Book at flamsbana.no as soon as your dates are confirmed. Walk-up tickets in high summer are essentially impossible.',
      },
      {
        level: 'warning',
        title: 'Nærøyfjord ferry pre-booking required',
        body: 'The electric ferry from Flåm through Nærøyfjord to Gudvangen also sells out in peak season. Book the ferry at the same time as the Flåm Railway, not after.',
      },
    ],
    carNote:
      'No car needed or possible on this route. All ticket booking at flamsbana.no (railway) and norled.no (ferry). The Norled Bergen–Flåm express boat is an alternative if you prefer to skip the train approach entirely — departs Bergen harbour, arrives Flåm in approximately 5.5 hours.',
  },
  {
    id: 'bergen-express-boat',
    label: 'Bergen (express boat)',
    icon: Ship,
    from: 'Bergen',
    realTime: '5.5 hours to Balestrand / 3h direct to Flåm (summer only)',
    roads: 'Bergen harbour → Sognefjord main trunk → Balestrand / Sogndal',
    season: 'Year-round (reduced winter service)',
    seasonOpen: true,
    overview:
      'Norled operates a year-round express boat from Bergen directly into the main Sognefjord. The service runs along the outer coast and into the main fjord trunk, calling at Balestrand (5.5 hours from Bergen) and Sogndal (7 hours). A summer-only fast boat covers Bergen to Flåm in approximately 3 hours. This route covers the widest and deepest sections of Sognefjord — sections not accessible by road — and is the most direct fjord-by-sea experience from Bergen for those without a car.',
    ferries: [
      {
        name: 'Bergen–Balestrand–Sogndal express boat',
        operator: 'Norled',
        duration: '5.5h Bergen–Balestrand / 7h Bergen–Sogndal',
        frequency: '1–2 departures daily year-round',
        autopass: false,
        preBook: true,
        cost: '~480 NOK Bergen–Balestrand / ~680 NOK Bergen–Sogndal',
        note: 'Year-round service. Covered seating, outdoor deck. Book at norled.no. The full route covers the most impressive section of the main fjord trunk.',
      },
      {
        name: 'Bergen–Flåm fast ferry (summer only)',
        operator: 'Norled',
        duration: '~3 hours',
        frequency: 'Summer season only (June–August): 1 departure daily',
        autopass: false,
        preBook: true,
        cost: '~680 NOK one-way',
        note: 'Seasonal fast boat skipping the intermediate stops. Book early — limited capacity.',
      },
    ],
    publicTransport: [],
    stops: [
      {
        name: 'Balestrand',
        description: 'The boat calls at Balestrand after approximately 5.5 hours. The village has been an artist colony since the 19th century (Kaiser Wilhelm II summer retreat, Kviknes Hotel since 1877). One of Sognefjord\'s most atmospheric stops.',
        detourTime: '1 hour stopover on the full route',
      },
    ],
    warnings: [
      {
        level: 'info',
        title: 'The express boat covers the main fjord, not Nærøyfjord',
        body: 'The Bergen express boat travels the main Sognefjord trunk. Nærøyfjord — the UNESCO branch — requires the Flåm-based ferry or the train approach through Myrdal. Plan your route depending on which section of the fjord you want to see.',
      },
      {
        level: 'warning',
        title: 'Winter service significantly reduced',
        body: 'Winter timetables cut the Bergen–Sognefjord service to 1 departure daily on some legs. Check norled.no for current timetables before planning a winter trip by boat.',
      },
    ],
    carNote:
      'This is a passenger-only route — no vehicles. For Sogndal, Balestrand, or fjord villages accessible only by boat, this is the correct approach from Bergen without a car. Book at norled.no.',
  },
  {
    id: 'bergen-car',
    label: 'Bergen (car)',
    icon: Car,
    from: 'Bergen',
    distance: '~200 km to Flåm / ~240 km to Sogndal',
    realTime: '3–4 hours to Flåm / 4–5 hours to Sogndal',
    mapsTime: '2.5 hours (Flåm)',
    roads: 'E16 east → Laerdal Tunnel (24.5 km) → Rv5 → Flåm junction',
    season: 'Year-round',
    seasonOpen: true,
    tollCost: '~120–200 NOK (various tunnels and tolls)',
    overview:
      'Bergen to Sognefjord by car follows the E16 east through the Flåm valley approach. The critical section is the Laerdal Tunnel — at 24.5 kilometres, the longest road tunnel in the world. Built to bypass the Sognefjellet mountain pass (which closes every winter), the tunnel runs at a depth of 1,000 metres under the mountains and has three large caverns lit in different colours to mitigate driver fatigue. The entire tunnel takes approximately 20 minutes to traverse. For Flåm, take the Rv5 branch south from Laerdal toward Aurland and Flåm.',
    ferries: [
      {
        name: 'Hella–Vangsnes–Dragsvik car ferry',
        operator: 'Norled',
        duration: '15 min (Hella–Vangsnes)',
        frequency: 'Year-round: every 30–60 min',
        autopass: true,
        preBook: false,
        cost: '~65 NOK car + driver (AutoPASS)',
        note: 'Connects the two sides of the main Sognefjord trunk. Required for circular routes and reaching Balestrand from the southern shore road.',
      },
    ],
    publicTransport: [],
    stops: [
      {
        name: 'Laerdal Tunnel caverns',
        description: 'The world\'s longest road tunnel (24.5 km) has three large illuminated caverns designed to help drivers maintain alertness. The blue, yellow, and green lighting is unusual and worth observing. Speed limit 80 km/h throughout.',
        detourTime: '20 min (part of drive)',
      },
      {
        name: 'Aurland viewpoint',
        description: 'A signed pullout above Aurland village on Rv50 gives views over Aurlandsfjord — a side branch of Sognefjord. 8 km detour from the main Rv5 route to Flåm.',
        detourTime: '20 min',
      },
      {
        name: 'Stegastein viewpoint',
        description: 'Cantilevered viewing platform at 650 metres above Aurlandsfjord. Take the signed road from Aurland. The platform juts 30 metres over the fjord — floor is partly transparent.',
        detourTime: '45 min from Aurland',
      },
    ],
    warnings: [
      {
        level: 'info',
        title: 'The Laerdal Tunnel replaces the Sognefjellet road in winter',
        body: 'Rv55 over Sognefjellet (the scenic summer alternative) closes every winter. The Laerdal Tunnel is the year-round car route between Bergen and Sognefjord. It is not a scenic route — it is the practical one.',
      },
      {
        level: 'info',
        title: 'Tolls on the E16 approach',
        body: 'Several toll stations exist on the E16 Bergen–Laerdal route. With AutoPASS, total is approximately 120–200 NOK. Without AutoPASS, you will be invoiced by post. Set up AutoPASS at autopass.no before travelling.',
      },
    ],
    carNote:
      'Petrol at Laerdal (before the tunnel) and Flåm. EV charging at Flåm Marina and Laerdal. The Flåm valley road (Rv5 from Aurland) is steep and narrow in sections — caution with campervans over 8 metres.',
  },
  {
    id: 'jotunheimen-rv55',
    label: 'Rv55 Sognefjellet',
    icon: Route,
    from: 'Sogndal ↔ Lom',
    distance: '100 km',
    realTime: '2–3 hours',
    mapsTime: '1h 45 min',
    roads: 'Rv55 Sogndal → Skjolden → Turtagrø → Sognefjellet summit (1,434 m) → Lom',
    season: 'Mid-May to late October (closed in winter)',
    seasonOpen: false,
    overview:
      'The Rv55 Sognefjellet road is one of Norway\'s 18 designated National Tourist Routes and the highest mountain pass road in Northern Europe. It connects Sogndal at the fjord to Lom in Gudbrandsdalen, passing through the heart of Jotunheimen National Park at 1,434 metres. The road was built in 1938 as a summer connection across the mountains and closes every winter when snow makes the pass impassable. The route passes within view of Jostedalsbreen glacier and above the treeline for most of its length. Turtagrø Hotel at 884 metres has been the base for mountaineering expeditions in Hurrungane since 1888.',
    ferries: [],
    publicTransport: [
      {
        type: 'Bus',
        operator: 'Vy Buss',
        route: 'Sogndal → Lom → Otta (seasonal summer service)',
        duration: '3h Sogndal–Lom',
        frequency: 'Summer only: 1–2 departures daily',
        cost: 'From ~250 NOK Sogndal–Lom',
        note: 'Seasonal bus. Connects the fjord to the Jotunheimen and Oslo axis. Check vy.no for current timetables — runs only when road is open.',
      },
    ],
    stops: [
      {
        name: 'Skjolden — innermost Sognefjord point',
        description: 'Skjolden sits at the absolute end of Sognefjord — the innermost point of the longest fjord in Norway. The village is also famous as Ludwig Wittgenstein\'s retreat: the philosopher built a cabin here in 1936 and worked here in summer. A replica of the cabin can be visited.',
        detourTime: '30–45 min',
      },
      {
        name: 'Turtagrø Hotel',
        description: 'Mountain hotel at 884 metres, operating as a mountaineering base since 1888. The original climbers\' logbooks are on display. The Hurrungane massif — among Norway\'s most technically demanding peaks — rises directly behind the building.',
        detourTime: '30 min for coffee / lunch',
      },
      {
        name: 'Sognefjellet summit',
        description: 'At 1,434 metres, the views extend over Jotunheimen peaks in all directions. A DNT mountain cabin (Krossbu) at the summit plateau provides shelter and light refreshments. The summit is above the treeline — wind can be fierce even in summer.',
        detourTime: '20–30 min',
      },
    ],
    warnings: [
      {
        level: 'critical',
        title: 'Road closed late October to mid-May',
        body: 'Rv55 closes each autumn when snow accumulates — typically late October. The road reopens in mid-May, but the exact date varies year to year. Check the official Statens vegvesen road information at vegvesen.no before planning a crossing. Never assume it is open based on calendar date.',
      },
      {
        level: 'warning',
        title: 'Snow and ice on the summit even in June',
        body: 'The Sognefjellet summit at 1,434 metres can carry snow through June and occasional frost in August. Carry warm layers regardless of fjord weather at the base. The temperature at the summit is typically 8–12°C cooler than in Sogndal.',
      },
      {
        level: 'info',
        title: 'Reindeer on the road',
        body: 'Semi-wild reindeer cross Rv55 throughout the summer. Slow to 50 km/h when you see them — they move unpredictably.',
      },
    ],
    carNote:
      'Fill up in Sogndal before the ascent. The next fuel is at Lom on the east side — 100 km away with no services in between except the Turtagrø hotel. EV drivers: check charging capacity at Sogndal before departure and at Lom on arrival. The road is 2WD accessible when open.',
  },
];

const warningStyles = {
  info: {
    container: 'bg-blue-50 border-l-4 border-blue-500',
    icon: <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" aria-hidden="true" />,
    title: 'font-semibold text-blue-800 text-sm',
    body: 'text-blue-900 text-sm mt-0.5',
  },
  warning: {
    container: 'bg-amber-50 border-l-4 border-amber-500',
    icon: <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" aria-hidden="true" />,
    title: 'font-semibold text-amber-800 text-sm',
    body: 'text-amber-900 text-sm mt-0.5',
  },
  critical: {
    container: 'bg-[#D32F2F]/10 border-l-4 border-[#D32F2F]',
    icon: <AlertTriangle className="w-4 h-4 text-[#D32F2F] mt-0.5 shrink-0" aria-hidden="true" />,
    title: 'font-semibold text-[#D32F2F] text-sm',
    body: 'text-slate-700 text-sm mt-0.5',
  },
};

export default function SognefjordGettingThere() {
  const [activeRoute, setActiveRoute] = useState('bergen-train');

  const route = routes.find((r) => r.id === activeRoute)!;
  const RouteIcon = route.icon;

  return (
    <section className="py-16 bg-slate-50" aria-labelledby="getting-there-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#00CC6A] mb-2">
            Getting There
          </p>
          <h2
            id="getting-there-heading"
            className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-4"
          >
            How to reach Sognefjord
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
            Sognefjord stretches 205 kilometres from the North Sea to Skjolden — Norway&apos;s longest and deepest fjord at 1,308 metres. Four approach axes connect it to Bergen, Oslo, and Jotunheimen. The Flåm Railway and Nærøyfjord ferry is the classic car-free combination. The Laerdal Tunnel carries the year-round car route. The Sognefjellet mountain road opens each summer for those coming from the east.
          </p>
        </div>

        {/* Route tabs */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
          aria-label="Select approach route"
        >
          {routes.map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.id}
                role="tab"
                aria-selected={activeRoute === r.id}
                aria-controls={`panel-${r.id}`}
                id={`tab-${r.id}`}
                onClick={() => setActiveRoute(r.id)}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 min-h-[44px] border',
                  activeRoute === r.id
                    ? 'bg-[#1A365D] text-white border-[#1A365D] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#1A365D] hover:text-[#1A365D]'
                )}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {r.label}
                {!r.seasonOpen && (
                  <span className="ml-1 px-1.5 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-700 border border-amber-300">
                    Seasonal
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Route panel */}
        <div
          id={`panel-${route.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${route.id}`}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Panel header */}
          <div className="bg-[#1A365D] px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <RouteIcon className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">{route.label}</h3>
                <p className="text-slate-300 text-sm">{route.roads}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              {route.distance && (
                <span className="flex items-center gap-1.5 text-slate-200">
                  <MapPin className="w-4 h-4 text-[#00CC6A]" aria-hidden="true" />
                  {route.distance}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-slate-200">
                <Clock className="w-4 h-4 text-[#00CC6A]" aria-hidden="true" />
                {route.realTime}
                {route.mapsTime && (
                  <span className="text-slate-400 line-through text-xs ml-1">
                    {route.mapsTime}
                  </span>
                )}
              </span>
              {route.tollCost && (
                <span className="flex items-center gap-1.5 text-slate-200">
                  <Fuel className="w-4 h-4 text-[#00CC6A]" aria-hidden="true" />
                  {route.tollCost}
                </span>
              )}
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Season badge + overview */}
            <div>
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-3',
                  route.seasonOpen
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                )}
              >
                {route.seasonOpen ? (
                  <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                )}
                {route.season}
              </span>
              <p className="text-slate-700 leading-relaxed">{route.overview}</p>
            </div>

            {/* Warnings */}
            {route.warnings.length > 0 && (
              <div className="space-y-3">
                {route.warnings.map((w, i) => {
                  const styles = warningStyles[w.level];
                  return (
                    <div key={i} className={cn('p-3 rounded-r-lg flex gap-2.5', styles.container)}>
                      {styles.icon}
                      <div>
                        <p className={styles.title}>{w.title}</p>
                        <p className={styles.body}>{w.body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2-col grid: ferries/transport | stops */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: Ferries + Public transport */}
              <div className="space-y-4">
                {route.ferries.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-[#1A365D] uppercase tracking-wide mb-3 flex items-center gap-2">
                      <Ship className="w-4 h-4" aria-hidden="true" />
                      Ferry crossings
                    </h4>
                    <div className="space-y-3">
                      {route.ferries.map((f, i) => (
                        <div key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="font-semibold text-slate-800 text-sm">{f.name}</p>
                            <span className="text-xs text-slate-500 shrink-0">{f.operator}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600 mb-2">
                            <span>Duration: {f.duration}</span>
                            <span>Frequency: {f.frequency}</span>
                            <span>Cost: {f.cost}</span>
                            <span>
                              AutoPASS:{' '}
                              {f.autopass ? (
                                <span className="text-emerald-600 font-medium">Yes</span>
                              ) : (
                                <span className="text-slate-400">No</span>
                              )}
                            </span>
                          </div>
                          {f.preBook && (
                            <p className="text-xs font-semibold text-[#D32F2F]">
                              Pre-booking required
                            </p>
                          )}
                          {f.note && <p className="text-xs text-slate-500 mt-1 italic">{f.note}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {route.publicTransport.length > 0 && (
                  <div>
                    <h4 className="text-sm font-bold text-[#1A365D] uppercase tracking-wide mb-3 flex items-center gap-2">
                      <Train className="w-4 h-4" aria-hidden="true" />
                      Public transport
                    </h4>
                    <div className="space-y-3">
                      {route.publicTransport.map((pt, i) => (
                        <div key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="font-semibold text-slate-800 text-sm">
                              {pt.type} — {pt.operator}
                            </p>
                          </div>
                          <p className="text-xs text-slate-700 mb-2">{pt.route}</p>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600">
                            <span>Duration: {pt.duration}</span>
                            <span>Frequency: {pt.frequency}</span>
                            <span className="col-span-2">Cost: {pt.cost}</span>
                          </div>
                          {pt.note && (
                            <p className="text-xs text-slate-500 mt-2 italic">{pt.note}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Stops */}
              {route.stops.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-[#1A365D] uppercase tracking-wide mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    Stops along the route
                  </h4>
                  <div className="space-y-3">
                    {route.stops.map((stop, i) => (
                      <div key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-semibold text-slate-800 text-sm">{stop.name}</p>
                          {stop.detourTime && (
                            <span className="text-xs text-slate-500 shrink-0 whitespace-nowrap">
                              +{stop.detourTime}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {stop.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Car note */}
            <div className="bg-[#1A365D]/5 border border-[#1A365D]/15 rounded-lg p-4">
              <p className="text-sm font-semibold text-[#1A365D] mb-1">Practical note</p>
              <p className="text-sm text-slate-700">{route.carNote}</p>
            </div>
          </div>
        </div>

        {/* Bottom orientation note */}
        <div className="mt-6 bg-white border border-slate-200 rounded-xl p-5">
          <h4 className="font-bold text-[#1A365D] text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-[#00CC6A]" aria-hidden="true" />
            Sognefjord orientation
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Sognefjord has two distinct sections: the main fjord trunk (Bergen–Balestrand–Sogndal axis, accessed by car on the E16 or by Norled boat) and the Nærøyfjord branch (Flåm–Gudvangen, accessed by the Flåm Railway and electric ferry). Most travellers combine both on a loop: Bergen → Flåm by train → Nærøyfjord ferry → Gudvangen → bus to Voss → train to Bergen. Those with more time extend the loop to include Balestrand and Sogndal on the main trunk.
          </p>
        </div>
      </div>
    </section>
  );
}
