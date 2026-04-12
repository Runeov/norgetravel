'use client';

import { useState } from 'react';
import {
  Car,
  Ship,
  Bus,
  Train,
  Clock,
  MapPin,
  AlertTriangle,
  Calendar,
  Navigation,
  CheckCircle,
  X,
  Route,
  Info,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface RouteFerry {
  name: string;
  operator: string;
  crossing: string;
  frequency: string;
  cost: string;
  autoPASS: boolean;
  preBook: boolean;
  note?: string;
}

interface RouteStop {
  name: string;
  description: string;
  detour?: boolean;
}

interface RouteWarning {
  text: string;
}

interface PublicTransport {
  mode: string;
  description: string;
  note?: string;
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

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const routes: RouteData[] = [
  {
    id: 'bergen-train',
    label: 'Bergen (train)',
    icon: Train,
    from: 'Bergen',
    realTime: '5.5–6 hours Bergen to Gudvangen',
    roads: 'Bergen Railway → Myrdal → Flam Railway → Flam → Naeroyfjord ferry → Gudvangen',
    season: 'Year-round (ferry reduced in winter)',
    seasonOpen: true,
    overview:
      'The classic approach and the backbone of the Norway in a Nutshell route. No car required. Bergen Railway to Myrdal (2h15min), Flam Railway to Flam (1 hour, 866m descent), then the Naeroyfjord electric ferry to Gudvangen (2 hours). The Kjosfossen waterfall stop on the Flam Railway is included in every departure.',
    ferries: [
      {
        name: 'Naeroyfjord ferry (Flam–Gudvangen)',
        operator: 'Flam Naeroyfjord AS (Future of The Fjords)',
        crossing: '2 hours',
        frequency: 'Summer: 4–6 daily sailings. Winter: 2–3 sailings.',
        cost: '~450 NOK adult (2025 prices). Children free under 4.',
        autoPASS: false,
        preBook: true,
        note:
          'Passenger ferry only — no vehicles. Book ahead for July and August. This is the main Naeroyfjord experience, not just a transit crossing.',
      },
    ],
    publicTransport: [
      {
        mode: 'Bergen Railway (Bergensbanen)',
        description:
          'Bergen to Myrdal: 2h15min. The train runs along the full Bergen Railway line. Myrdal is the junction for the Flam Railway — do not miss the connection.',
        note: 'Book Bergen Railway tickets at vy.no. Flam Railway tickets separately at flamsbana.no.',
      },
      {
        mode: 'Flam Railway (Flamsbana)',
        description:
          'Myrdal to Flam: 1 hour, 20 km, 866m descent. The train stops at Kjosfossen waterfall (225m drop) for a 5-minute photo stop. Every departure does this.',
      },
    ],
    stops: [
      {
        name: 'Kjosfossen waterfall',
        description:
          '225-meter drop visible from the Flam Railway platform stop. The train pauses here on every departure. Pack a rain jacket — the mist carries far.',
      },
      {
        name: 'Flam village',
        description:
          'The ferry departs from Flam harbour. Allow 30 minutes between the Flam Railway arrival and the first available ferry departure.',
      },
      {
        name: 'Naeroyfjord narrows',
        description:
          '250 meters wide at the narrowest point, 1,000-meter walls on both sides. The ferry slows through here. Come onto the deck regardless of weather.',
      },
    ],
    warnings: [
      {
        text: 'The Naeroyfjord ferry sells out on peak summer days. Book your ferry slot before you book the Flam Railway.',
      },
      {
        text: 'Return timing from Gudvangen: buses run to Voss (35 min) with connections to Bergen. Confirm the last bus of the day before you board.',
      },
    ],
    carNote:
      'This is a car-free route. If travelling with a car, use the Bergen by car route (E16 via Laerdal Tunnel) instead.',
  },
  {
    id: 'bergen-car',
    label: 'Bergen (car)',
    icon: Car,
    from: 'Bergen',
    distance: '265 km to Flam',
    realTime: '3–3.5 hours to Flam',
    mapsTime: '2.5 hours',
    roads: 'E16 east → Laerdal Tunnel (24.5 km) → Rv5 north → Aurland → Flam',
    season: 'Year-round',
    seasonOpen: true,
    tollCost: 'E16 toll stations ~150–200 NOK',
    overview:
      'The most direct car route. E16 runs east from Bergen through the mountain valleys, enters the 24.5-km Laerdal Tunnel, and emerges at Laerdal. From there, Rv5 north follows Laerdalselva river to Aurland and Flam on Aurlandsfjord. No ferry required on the approach. The tunnel has three mountain-hall sections lit in blue and yellow to reduce driver fatigue.',
    ferries: [],
    publicTransport: [
      {
        mode: 'Nutshell bus (Voss–Gudvangen)',
        description:
          'If driving to Flam and leaving the car, the return Gudvangen–Voss bus runs multiple times per day in summer. Connects to Bergen by train from Voss.',
        note: 'Check Skyss.no for current timetables.',
      },
    ],
    stops: [
      {
        name: 'Voss',
        description:
          'Midpoint at 120 km from Bergen. Adventure sports capital of Vestland. Fuel, cafes, and EV charging available.',
      },
      {
        name: 'Laerdal old town (Gamlebyens)',
        description:
          '130 preserved 18th- and 19th-century timber buildings at the end of the Laerdal Tunnel. A 20-minute walk through the village is worth it.',
        detour: true,
      },
      {
        name: 'Borgund Stave Church',
        description:
          '7 km south of E16 on Rv50. One of the best-preserved stave churches in Norway, built around 1150. 45-minute detour from the main route.',
        detour: true,
      },
      {
        name: 'Stegastein viewpoint',
        description:
          'On Rv243 above Aurland, 650 meters above the fjord. 15-minute detour from the Aurland turn-off. The cantilevered platform juts 4 meters out from the cliff.',
        detour: true,
      },
    ],
    warnings: [
      {
        text: 'The Laerdal Tunnel is 24.5 km long. Speed limit 70 km/h. Three stop points inside for rest. Do not use the tunnel without fuel and a full battery if EV.',
      },
      {
        text: 'Flam parking fills by 10:00 in peak season. Arrive before 09:00 or use the overflow car park 1 km from the harbour.',
      },
      {
        text: 'E16 toll booths are automated. Register your number plate at autopass.no before departure to avoid a fine.',
      },
    ],
    carNote:
      'Standard compact or mid-size handles this route easily. No restrictions on campervans — the E16 is a full-width road throughout. Laerdal Tunnel height limit: 4.5m.',
  },
  {
    id: 'voss',
    label: 'Voss',
    icon: Car,
    from: 'Voss',
    distance: '40 km to Gudvangen',
    realTime: '50 min to Gudvangen',
    mapsTime: '40 min',
    roads: 'Rv13 south → Stalheimskleiva (13 hairpins) or Nærøytunnel bypass → Gudvangen',
    season: 'Year-round (Stalheimskleiva closed Oct–May)',
    seasonOpen: true,
    overview:
      'The shortest approach. Voss is 40 km from Gudvangen via Rv13. Two options at the bottom of the descent: Stalheimskleiva (13 hairpin bends, 13% gradient, 2.5 km) or the Nærøytunnel bypass (open to all vehicles, less scenic). Stalheimskleiva is closed October to May and prohibited for vehicles over 19 tonnes or longer than 12.4 meters.',
    ferries: [],
    publicTransport: [
      {
        mode: 'Skyss bus (Voss–Gudvangen)',
        description:
          'Multiple daily services run from Voss bus station to Gudvangen. Journey 35–45 minutes. This is the bus connection used on the Nutshell return route.',
        note: 'Check Skyss.no for timetables. Bus connects at Voss to Bergen Railway.',
      },
    ],
    stops: [
      {
        name: 'Stalheim Hotel viewpoint',
        description:
          'At the top of Stalheimskleiva, panoramic view into the Nærøydalen valley below. Free parking at the hotel. Worth 15 minutes even if you descend via the tunnel.',
      },
      {
        name: 'Stalheimskleiva',
        description:
          '13% gradient, 13 hairpin bends, 2.5 km descent. One of the steepest public roads in Europe. Campervans, caravans, and long vehicles must use the tunnel instead.',
      },
      {
        name: 'Gudvangen Viking Village',
        description:
          'At the Gudvangen valley floor. Cultural Viking settlement open May to September. Worth 1–2 hours before or after the Naeroyfjord ferry.',
      },
    ],
    warnings: [
      {
        text: 'Stalheimskleiva is prohibited for vehicles over 19 tonnes or longer than 12.4 meters (incl. trailer). Use the Nærøytunnel bypass.',
      },
      {
        text: 'Stalheimskleiva closes October to May. Snow can make it impassable earlier. The tunnel bypass is open year-round.',
      },
      {
        text: 'Gudvangen has very limited parking. Arrive before 10:00 in summer to secure a spot near the Viking Village and ferry terminal.',
      },
    ],
    carNote:
      'Standard car: Stalheimskleiva is manageable but tight. Use low gear on the descent. Caravans and campervans: use the Nærøytunnel, not Stalheimskleiva.',
  },
  {
    id: 'oslo',
    label: 'Oslo (car)',
    icon: Car,
    from: 'Oslo',
    distance: '365 km to Flam',
    realTime: '4.5–5.5 hours to Flam',
    mapsTime: '4 hours',
    roads: 'E16 west → Hønefoss → Fagernes → Lærdalsøyri (Laerdal) → Rv5 north → Flam',
    season: 'Year-round',
    seasonOpen: true,
    tollCost: 'Multiple E16 stations ~200–300 NOK total',
    overview:
      'A full driving day from Oslo. E16 west from Oslo runs through Hønefoss and the Valdres valley, climbing through Filefjell (national park) before descending to Laerdal in Sognefjord. From Laerdal, Rv5 north runs 40 km along Aurlandsfjord to Flam. No mountain pass crossing required — E16 uses the Filefjell tunnel system. Year-round route.',
    ferries: [],
    publicTransport: [
      {
        mode: 'Oslo to Bergen by train, then Bergen approach',
        description:
          'Oslo to Bergen by Bergen Railway: 6.5 hours. Then continue as the Bergen by train route. Total Oslo to Gudvangen: approximately 12–13 hours with connections. Break the journey with an overnight in Bergen or Voss.',
      },
    ],
    stops: [
      {
        name: 'Fagernes',
        description:
          'Midpoint at 210 km from Oslo. The main service town on the E16 before the mountain section. Fuel, EV charging, restaurants.',
      },
      {
        name: 'Borgund Stave Church',
        description:
          '7 km south of E16 on Rv50, just before reaching Laerdal. Built around 1150. One of the best-preserved stave churches in Norway. 45-minute detour.',
        detour: true,
      },
      {
        name: 'Laerdal old town',
        description:
          '130 preserved timber buildings. 20-minute walk from the E16 junction. Arrive before 11:00 to have the streets to yourself.',
        detour: true,
      },
    ],
    warnings: [
      {
        text: 'E16 from Oslo is a full-day drive. Budget a proper overnight in Laerdal or Aurland rather than arriving in Flam exhausted.',
      },
      {
        text: 'Filefjell can have winter conditions from October to May. E16 is generally open year-round, but check Statens vegvesen (vegvesen.no) for closures before departure.',
      },
    ],
    carNote:
      'All vehicle types permitted on E16 and Rv5. No length or weight restrictions. The road is dual carriageway between Oslo and Hønefoss, single carriageway through the mountain section.',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function NaeroyfjordGettingThere() {
  const [activeRoute, setActiveRoute] = useState<string>('bergen-train');

  const route = routes.find((r) => r.id === activeRoute) ?? routes[0];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Ship className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">
          How to reach Naeroyfjord
        </h2>
      </div>
      <div className="max-w-3xl space-y-4 mb-8">
        <p className="text-slate-600 leading-relaxed">
          Four approaches. The train route through the Flam Railway is the most spectacular arrival.
          The car routes give you flexibility for the surrounding area. Times below are real driving
          and travel times — not what Google Maps says.
        </p>
      </div>

      {/* Route tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist">
        {routes.map((r) => {
          const Icon = r.icon;
          const isActive = activeRoute === r.id;
          return (
            <button
              key={r.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveRoute(r.id)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors min-h-[44px]',
                isActive
                  ? 'bg-[#1A365D] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#1A365D]/40 hover:text-[#1A365D]'
              )}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {r.label}
            </button>
          );
        })}
      </div>

      {/* Route content */}
      <div className="space-y-6">
        {/* Overview card */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-start gap-3 mb-4">
            <Navigation
              className="w-5 h-5 text-[#1A365D] mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                From {route.from} to Naeroyfjord
              </h3>
              <p className="text-sm text-slate-500 mt-1">{route.roads}</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-5">{route.overview}</p>

          {/* Quick facts strip */}
          <div className="flex flex-wrap gap-3">
            {route.distance && (
              <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-sm text-xs font-medium text-slate-700">
                <MapPin className="w-3 h-3 text-[#5CBFEE]" aria-hidden="true" />
                {route.distance}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-sm text-xs font-medium text-slate-700">
              <Clock className="w-3 h-3 text-[#1A365D]" aria-hidden="true" />
              {route.realTime}
              {route.mapsTime && (
                <span className="text-slate-400 line-through ml-1">({route.mapsTime})</span>
              )}
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium border',
                route.seasonOpen
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              )}
            >
              <Calendar className="w-3 h-3" aria-hidden="true" />
              {route.season}
            </span>
            {route.tollCost && (
              <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-sm text-xs font-medium text-slate-700">
                Tolls: {route.tollCost}
              </span>
            )}
          </div>
        </div>

        {/* Two-column layout for details */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Ferries */}
            {route.ferries.length > 0 && (
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                  <Ship className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" />
                  Ferries on this route
                </h4>
                <div className="space-y-4">
                  {route.ferries.map((ferry) => (
                    <div key={ferry.name}>
                      <p className="font-bold text-slate-800 text-sm mb-2">
                        {ferry.name}
                        <span className="font-normal text-slate-500 ml-2">{ferry.operator}</span>
                      </p>
                      <dl className="space-y-1.5 text-xs">
                        <div className="flex gap-2">
                          <dt className="text-slate-500 w-20 shrink-0">Crossing</dt>
                          <dd className="text-slate-700">{ferry.crossing}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="text-slate-500 w-20 shrink-0">Frequency</dt>
                          <dd className="text-slate-700">{ferry.frequency}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="text-slate-500 w-20 shrink-0">Cost</dt>
                          <dd className="text-slate-700">{ferry.cost}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="text-slate-500 w-20 shrink-0">AutoPASS</dt>
                          <dd className="flex items-center gap-1 text-slate-700">
                            {ferry.autoPASS ? (
                              <>
                                <CheckCircle className="w-3 h-3 text-[#00D084]" aria-hidden="true" />
                                Yes (50% discount)
                              </>
                            ) : (
                              <>
                                <X className="w-3 h-3 text-slate-400" aria-hidden="true" />
                                No
                              </>
                            )}
                          </dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="text-slate-500 w-20 shrink-0">Pre-book</dt>
                          <dd className="text-slate-700">
                            {ferry.preBook ? (
                              <span className="font-semibold text-[#D32F2F]">Required in summer</span>
                            ) : (
                              'Not needed (turn-up-and-go)'
                            )}
                          </dd>
                        </div>
                      </dl>
                      {ferry.note && (
                        <p className="mt-2 text-xs text-slate-500 italic">{ferry.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Public transport */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                <Bus className="w-4 h-4 text-[#1A365D]" aria-hidden="true" />
                Public transport
              </h4>
              {route.publicTransport.length > 0 ? (
                <div className="space-y-4">
                  {route.publicTransport.map((pt) => (
                    <div key={pt.mode}>
                      <p className="font-bold text-slate-800 text-sm mb-1">{pt.mode}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{pt.description}</p>
                      {pt.note && (
                        <p className="mt-1.5 text-xs text-amber-700 font-medium flex items-start gap-1.5">
                          <Info className="w-3 h-3 mt-0.5 shrink-0" aria-hidden="true" />
                          {pt.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  No direct public transport on this route. Consider the Bergen by train approach for a car-free journey.
                </p>
              )}
            </div>

            {/* Car note */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
                <Car className="w-4 h-4 text-[#1A365D]" aria-hidden="true" />
                Rental car
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">{route.carNote}</p>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Stops */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                <MapPin className="w-4 h-4 text-[#00D084]" aria-hidden="true" />
                Stops along the way
              </h4>
              <div className="space-y-4">
                {route.stops.map((stop) => (
                  <div key={stop.name} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1A365D] mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {stop.name}
                        {stop.detour && (
                          <span className="ml-2 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-sm">
                            Detour
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                        {stop.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warnings */}
            {route.warnings.length > 0 && (
              <div className="bg-[#D32F2F]/5 rounded-lg border border-[#D32F2F]/20 p-6">
                <h4 className="flex items-center gap-2 text-sm font-bold text-[#D32F2F] uppercase tracking-wide mb-4">
                  <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                  Before you go
                </h4>
                <div className="space-y-3">
                  {route.warnings.map((warning, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Route className="w-3 h-3 text-[#D32F2F] mt-0.5 shrink-0" aria-hidden="true" />
                      <p className="text-xs text-slate-700 leading-relaxed">{warning.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hurtigruten note */}
        <div className="bg-slate-50 rounded-lg border border-slate-200 p-5">
          <div className="flex items-start gap-3">
            <Ship className="w-5 h-5 text-[#5CBFEE] mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-slate-800 mb-1">
                Express boat from Bergen (Norled)
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                Norled operates express boats from Bergen Strandkaiterminalen to Flam (5.5 hours)
                and Gudvangen (not direct — connect via Flam). The express boat runs through
                Sognefjord and is a scenic alternative for travellers without a car. Check
                Norled.no for current timetables and seasonal availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
