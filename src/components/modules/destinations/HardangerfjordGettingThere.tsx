'use client';

import { useState } from 'react';
import { Car, Train, AlertTriangle, CheckCircle, Info, Clock, MapPin, Ship, Route, Fuel } from 'lucide-react';
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
    id: 'bergen-car',
    label: 'From Bergen',
    icon: Car,
    from: 'Bergen',
    distance: '155 km to Eidfjord / 175 km to Odda',
    realTime: '2.5–3 hours',
    mapsTime: '2 hours',
    roads: 'E39 → Rv48 → Hardanger Bridge → Rv7 → Eidfjord/Norheimsund',
    season: 'Year-round',
    seasonOpen: true,
    tollCost: '~52 NOK (Hardanger Bridge, AutoPASS)',
    overview:
      'The Bergen approach crosses the Hardanger Bridge — at 1,380 metres, the longest suspension bridge in Norway and one of the longest in the world when it opened in 2013. The route runs east on E39, branches onto Rv48 at Tysse, crosses the bridge into Kvam, then follows Rv7 east along the inner fjord to Eidfjord. For Odda and Trolltunga, continue south on Rv13 at Kinsarvik.',
    ferries: [],
    publicTransport: [
      {
        type: 'Bus',
        operator: 'Skyss / Nor-Way Bussekspress',
        route: 'Bergen → Norheimsund → Eidfjord → Odda (line 990/991)',
        duration: '3–4 hours to Odda',
        frequency: '3–4 departures daily',
        cost: 'From ~280 NOK Bergen–Odda',
        note: 'Covers all major Hardangerfjord villages. Book at nor-way.no or use Skyss app.',
      },
    ],
    stops: [
      {
        name: 'Hardanger Bridge viewpoint',
        description: 'The bridge spans 1,380m across Eidfjord inlet. A roadside viewing area 2 km west of the crossing gives the clearest photograph without traffic.',
        detourTime: '10 min',
      },
      {
        name: 'Norheimsund',
        description: 'First significant fjord village, 80 km from Bergen. Steinsdalsfossen waterfall is 2 km inland — one of the few waterfalls you can walk behind. Petrol, grocery, and EV charging.',
        detourTime: '20–30 min',
      },
      {
        name: 'Kinsarvik',
        description: 'Junction village. Go straight for Eidfjord (Vøringsfossen). Turn south on Rv13 for Lofthus, Ullensvang, and Odda (Trolltunga).',
        detourTime: '10 min',
      },
    ],
    warnings: [
      {
        level: 'info',
        title: 'Hardanger Bridge toll',
        body: 'The bridge costs approximately 52 NOK by AutoPASS. Without AutoPASS, you will be photographed and invoiced by post. Set up AutoPASS before arrival at autopass.no if you plan multiple Norwegian toll crossings.',
      },
      {
        level: 'info',
        title: 'Norheimsund route alternative',
        body: 'An older ferry-free route via Rv49 and Rv7 through Granvin is slower but avoids the bridge toll. Add 30–40 minutes.',
      },
    ],
    carNote:
      'Petrol and EV charging at Norheimsund (80 km from Bergen), Kinsarvik (130 km), and Odda. The inner fjord villages between Kinsarvik and Eidfjord have no fuel. Do not arrive at Trolltunga with less than half a tank.',
  },
  {
    id: 'oslo-car',
    label: 'From Oslo',
    icon: Car,
    from: 'Oslo',
    distance: '~460 km to Odda',
    realTime: '6–7 hours',
    mapsTime: '5.5 hours',
    roads: 'E134 west → Notodden → Kongsberg → Haukelifjell → Rv13 north → Odda',
    season: 'Year-round (E134 open all winter)',
    seasonOpen: true,
    tollCost: '~200–300 NOK (various E134 tolls)',
    overview:
      'Oslo to Hardangerfjord by car is a full-day commitment. The primary route takes E134 west via Notodden and Kongsberg, climbs the Haukelifjell plateau at approximately 1,000 metres, then descends on Rv13 to Odda at the southern tip of the fjord. The E134 remains open year-round, unlike higher mountain passes, making it the reliable four-season connection between Eastern Norway and the Hardangerfjord region.',
    ferries: [],
    publicTransport: [
      {
        type: 'Bus',
        operator: 'Vy / Nor-Way Bussekspress',
        route: 'Oslo → Kongsberg → Odda (line 185)',
        duration: '5.5–6.5 hours',
        frequency: '2–3 departures daily',
        cost: 'From ~380 NOK',
        note: 'Book at nor-way.no. Change at Kongsberg or Notodden depending on service.',
      },
    ],
    stops: [
      {
        name: 'Notodden',
        description: 'Fuel and food stop at the halfway point (230 km from Oslo). Notodden Bluesfestival draws 50,000 visitors each August — book accommodation months ahead if you travel in that window.',
        detourTime: '20 min',
      },
      {
        name: 'Haukelifjell summit',
        description: 'The E134 crosses Haukelifjell at 1,001 metres. A petrol station and café at Haukeli serves as the last services before the descent into Røldal and Odda. In winter, tyre chains may be required on the Rv13 descent.',
        detourTime: '15 min',
      },
      {
        name: 'Røldal stave church',
        description: 'One of Norway\'s best-preserved medieval stave churches, dating to approximately 1200 CE. 5 km east of Rv13, open summer months.',
        detourTime: '30 min',
      },
    ],
    warnings: [
      {
        level: 'info',
        title: 'Rv13 winter driving',
        body: 'The Rv13 descent from Haukelifjell into Røldal and Odda can require winter tyres or chains from October to April. The E134 over Haukelifjell itself is generally kept clear. Check vegvesen.no before departure in marginal weather.',
      },
      {
        level: 'warning',
        title: 'Odda is 7 km from Trolltunga parking',
        body: 'The Trolltunga parking area at Skjeggedal is 7 km and 300 metres above Odda. The shuttle bus from Odda town centre runs in summer. Driving the private toll road to Skjeggedal adds ~130 NOK each way.',
      },
    ],
    carNote:
      'Fill up in Notodden or at the Haukeli plateau services. Odda has a full-service petrol station and supermarket. Trolltunga hikes start at 06:00 in peak season — plan to arrive in Odda the evening before, not on the morning of the hike.',
  },
  {
    id: 'voss-car',
    label: 'From Voss',
    icon: Car,
    from: 'Voss',
    distance: '65 km to Kinsarvik',
    realTime: '1–1.5 hours',
    mapsTime: '55 minutes',
    roads: 'Rv13 south → Granvin → Kinsarvik (for Eidfjord/Odda)',
    season: 'Year-round',
    seasonOpen: true,
    tollCost: 'None',
    overview:
      'Voss sits on the Bergen Railway line and functions as the eastern gateway into Hardangerfjord. The Rv13 south from Voss follows the valley through Granvin and descends to the fjord at Kinsarvik. From Kinsarvik, turn east on Rv7 for Eidfjord and Vøringsfossen, or south on Rv13 for Lofthus, Ullensvang, and Odda. This is the shortest car approach to the fjord from any Bergen-accessible rail hub.',
    ferries: [],
    publicTransport: [
      {
        type: 'Train + Bus',
        operator: 'Vy (train) + Skyss (bus)',
        route: 'Bergen → Voss (1h by train), then bus connection Rv13 south',
        duration: '1h train + 1.5h bus = 2.5h total',
        frequency: 'Trains hourly; bus connections 3–4 times daily',
        cost: 'From ~380 NOK Bergen–Eidfjord combined',
        note: 'Voss rail station is the jump-off point for bus connections into the inner Hardangerfjord.',
      },
    ],
    stops: [
      {
        name: 'Granvin',
        description: 'Small village 20 km south of Voss where the valley opens to Hardangerfjord views. Photogenic but no services.',
        detourTime: '5 min',
      },
      {
        name: 'Kinsarvik junction',
        description: 'The decision point: east for Eidfjord and Vøringsfossen (Rv7), south for Lofthus apple orchards, Ullensvang Hotel, and Odda with Trolltunga (Rv13). Both roads follow the fjord shore.',
        detourTime: '5 min',
      },
    ],
    warnings: [
      {
        level: 'info',
        title: 'Voss is a viable Hardangerfjord base',
        body: 'Voss has plentiful accommodation and sits on the Bergen Railway. If Odda or Eidfjord are full during peak Trolltunga season, Voss works as a commuter base — 1 hour to Odda, 1.5 hours to Eidfjord.',
      },
    ],
    carNote:
      'Voss has full services: petrol, supermarket, EV charging. The Rv13 south to Kinsarvik is well-maintained year-round with no toll charges. This is a reliable all-season route.',
  },
  {
    id: 'ntr-rv7',
    label: 'Tourist Route Rv7',
    icon: Route,
    from: 'Eidfjord → Geilo',
    distance: '83 km',
    realTime: '1.5–2 hours',
    mapsTime: '1 hour 20 min',
    roads: 'Rv7 → Eidfjord → Dyranut → Hardangervidda → Geilo',
    season: 'Mid-May to early October (closed in winter)',
    seasonOpen: false,
    overview:
      'The Rv7 over Hardangervidda is one of Norway\'s 18 designated National Tourist Routes — an 83 km high-altitude road that climbs from sea level at Eidfjord to 1,243 metres at Dyranut before descending to Geilo on the east side of the plateau. The route crosses the southern half of Hardangervidda, Norway\'s largest mountain plateau and national park, with panoramic views across treeless terrain inhabited by Europe\'s largest wild reindeer herd (approximately 8,000 animals). The Fossli Hotel viewpoint above Vøringsfossen is 12 km from Eidfjord on this road.',
    ferries: [],
    publicTransport: [
      {
        type: 'Bus',
        operator: 'Vy Buss',
        route: 'Eidfjord → Geilo → Oslo (seasonal summer service)',
        duration: '2h Eidfjord–Geilo; 5h Geilo–Oslo',
        frequency: '1–2 departures daily in summer season',
        cost: 'From ~180 NOK Eidfjord–Geilo',
        note: 'Summer only. Connects the fjord to the Oslo–Bergen axis. Check vy.no for current timetables.',
      },
    ],
    stops: [
      {
        name: 'Vøringsfossen viewpoint',
        description: 'Fossli viewpoint sits directly above the 182-metre waterfall on Rv7, 12 km from Eidfjord. New viewing platforms opened in 2020. Free access. One of Norway\'s most-visited natural sites.',
        detourTime: '30–45 min',
      },
      {
        name: 'Dyranut plateau',
        description: 'The highest point on Rv7 at 1,243 metres. A petrol station, café, and DNT unmanned cabin operate here. This is the last services before descending to Geilo. Reindeer cross the road frequently — slow down.',
        detourTime: '20 min',
      },
      {
        name: 'Hardangervidda NP boundary marker',
        description: 'The road passes through the heart of Hardangervidda National Park for approximately 30 km. No camping within 150 metres of the road. Allemannsretten applies on the open plateau.',
        detourTime: '5 min',
      },
    ],
    warnings: [
      {
        level: 'critical',
        title: 'Road closed October to mid-May',
        body: 'Rv7 over Hardangervidda closes when snow accumulates — typically late October and reopens mid-May. Check vegvesen.no for the exact current open/closed status. Do not assume it is open based on calendar date alone.',
      },
      {
        level: 'warning',
        title: 'Weather changes within 30 minutes on the plateau',
        body: 'Hardangervidda plateau weather is distinct from the fjord below. Fog, snow, and horizontal rain occur on the plateau even in July. Carry warm layers regardless of the weather at Eidfjord when you depart.',
      },
      {
        level: 'info',
        title: 'Reindeer on the road',
        body: 'Approximately 8,000 wild reindeer inhabit Hardangervidda. They cross Rv7 without warning. Drive at 60 km/h or below when visibility is limited. Collisions with reindeer are common and can be serious.',
      },
    ],
    carNote:
      'Fill the tank at Eidfjord or Fossli before ascending. The next fuel is at Dyranut (expensive) or Geilo. EV drivers: plan charging at Eidfjord or Geilo — there is no EV charging on the plateau itself. The route is 2WD accessible when open, but low-clearance vehicles should take care over unpaved scenic detours.',
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

export default function HardangerfjordGettingThere() {
  const [activeRoute, setActiveRoute] = useState('bergen-car');

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
            How to reach Hardangerfjord
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
            Norway&apos;s longest accessible fjord stretches 179 kilometres from the North Sea to Eidfjord. The Hardanger Bridge, Rv7 National Tourist Route, and E134 over Haukelifjell are the three main access axes. The fjord has no passenger ferry from Bergen — a car or bus is required to reach the inner villages.
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

            {/* Warnings — always first if critical */}
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

              {/* Right: Stops along the route */}
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
              <p className="text-sm font-semibold text-[#1A365D] mb-1">Driver note</p>
              <p className="text-sm text-slate-700">{route.carNote}</p>
            </div>
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-6 bg-white border border-slate-200 rounded-xl p-5">
          <h4 className="font-bold text-[#1A365D] text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
            <Info className="w-4 h-4 text-[#00CC6A]" aria-hidden="true" />
            No ferry from Bergen to Hardangerfjord
          </h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            Unlike Nærøyfjord and Sognefjord, Hardangerfjord has no passenger express boat connection from Bergen. The fjord is accessed exclusively by car, bus, or bus-and-train combination via Voss. The closest thing to a fjord boat experience is the historic Ullensvang–Kinsarvik car ferry (seasonal, 10-minute crossing) which connects the two shores of the inner fjord. Check Norled or Skyss for timetables.
          </p>
        </div>
      </div>
    </section>
  );
}
