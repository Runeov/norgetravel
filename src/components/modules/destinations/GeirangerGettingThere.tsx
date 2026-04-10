'use client';

import { useState } from 'react';
import {
  Car,
  Ship,
  Bus,
  Plane,
  Clock,
  MapPin,
  AlertTriangle,
  Fuel,
  Calendar,
  Navigation,
  Mountain,
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
  distance: string;
  realTime: string;
  mapsTime: string;
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
    id: 'alesund',
    label: '\u00c5lesund',
    icon: Car,
    from: '\u00c5lesund',
    distance: '108 km',
    realTime: '2.5\u20133 hours',
    mapsTime: '2 hours',
    roads: 'E136 \u2192 Fv650 \u2192 Eidsdal\u2013Linge ferry \u2192 Fv63 (Eagle Road)',
    season: 'Year-round (Eagle Road stays open in winter)',
    seasonOpen: true,
    overview:
      'The most reliable route. The Eagle Road descends into Geiranger through 11 hairpin bends with the \u00d8rnesvingen viewpoint at the top. One ferry crossing required. No seasonal closure on this approach.',
    ferries: [
      {
        name: 'Eidsdal\u2013Linge',
        operator: 'Fjord1',
        crossing: '13 minutes',
        frequency: 'Every 30 min peak hours, 26 daily sailings. First 06:45, last 23:15',
        cost: '81 NOK per car (AutoPASS: 41 NOK). Passengers free',
        autoPASS: true,
        preBook: false,
        note: 'Turn-up-and-go county ferry. Expect one-sailing wait 11:00\u201314:00 in July',
      },
    ],
    publicTransport: [
      {
        mode: 'FRAM bus 211',
        description:
          'Eidsdal ferry terminal to Geiranger (Union Hotell). 48 minutes, weekdays. Connect from \u00c5lesund via bus to Eidsdal',
        note: 'Check frammr.no for current timetables',
      },
      {
        mode: 'Fly to \u00c5lesund Vigra (AES)',
        description:
          '\u00c5lesund Airport is 108 km from Geiranger. Transfer 2.5\u20133 hours by rental car including ferry. By bus: 5.5\u20136 hours with connections',
      },
    ],
    stops: [
      {
        name: '\u00d8rnesvingen (Eagle\u2019s Bend)',
        description:
          '620 m above sea level. The most photographed viewpoint over Geirangerfjord. Limited parking. Visit before 10:00 or after 16:00 to avoid congestion.',
      },
      {
        name: 'Eidsdal\u2013Linge ferry crossing',
        description:
          '13-minute crossing of Norddalsfjord. Scenic views in both directions. Step out of the car on deck.',
      },
      {
        name: 'Storfjorden views',
        description:
          '30 minutes outside \u00c5lesund, the road opens to wide fjord panoramas along the E136.',
      },
    ],
    warnings: [
      {
        text: 'The Eagle Road descent has a 10% gradient. Use low gear to prevent brake fade, particularly in campervans and motorhomes.',
      },
      {
        text: 'Fuel up in \u00c5lesund. Geiranger has one fuel station only (Fjordbuda/YX by the ferry quay).',
      },
      {
        text: 'Mobile signal is unreliable near the Eagle Road summit. Download offline maps before departing.',
      },
    ],
    carNote:
      'Standard compact or mid-size handles this route. Campervans permitted but the hairpins are tight. No vehicle length restriction.',
  },
  {
    id: 'trollstigen',
    label: 'Trollstigen',
    icon: Mountain,
    from: '\u00c5ndalsnes',
    distance: '85\u201390 km',
    realTime: '2.5\u20133.5 hours',
    mapsTime: '1.5 hours',
    roads: 'Fv63 (Trollstigen) \u2192 Valldal \u2192 Fv650 \u2192 Eidsdal\u2013Linge ferry \u2192 Fv63 (Eagle Road)',
    season: 'Mid-May to late October (Trollstigen seasonal)',
    seasonOpen: false,
    overview:
      'The most spectacular route. Trollstigen climbs 850 m through 11 hairpin bends alongside the 320 m Stigfossen waterfall. Combines two of Norway\u2019s National Tourist Routes in a single drive. One ferry crossing required.',
    ferries: [
      {
        name: 'Eidsdal\u2013Linge',
        operator: 'Fjord1',
        crossing: '13 minutes',
        frequency: 'Every 30 min peak hours, 26 daily sailings',
        cost: '81 NOK per car (AutoPASS: 41 NOK). Passengers free',
        autoPASS: true,
        preBook: false,
      },
    ],
    publicTransport: [
      {
        mode: 'Train: Oslo \u2192 \u00c5ndalsnes (Rauma Line)',
        description:
          'Change at Domb\u00e5s from the Dovre Line. 6 hours total from Oslo. 4 daily services on the Rauma Line (114 km). One of Europe\u2019s most scenic rail journeys through Romsdalen valley.',
      },
      {
        mode: 'FRAM bus 220',
        description:
          '\u00c5ndalsnes to Geiranger via Trollstigen. 67 minutes, summer only (mid-June to late August). Was cancelled 2024\u20132025 due to Trollstigen closure.',
        note: 'Status for 2026 unconfirmed. Verify at frammr.no before planning',
      },
      {
        mode: 'Fly to Molde \u00c5r\u00f8 (MOL)',
        description:
          'Molde Airport is 85 km from Geiranger via Eidsdal. Transfer 2 hours by car. Bus connections via FRAM with ferry crossings.',
      },
    ],
    stops: [
      {
        name: 'Trollveggen (Troll Wall)',
        description:
          'Europe\u2019s tallest vertical rock face at 1,100 m. Visible from E136 just before the Trollstigen turnoff. Pull over at the marked viewpoint.',
      },
      {
        name: 'Stigfossen waterfall',
        description:
          '320 m waterfall alongside the hairpin bends. The road crosses over it on a stone bridge. You will feel the spray through an open window.',
      },
      {
        name: 'Trollstigen Visitor Centre',
        description:
          'Modern cantilevered viewing platforms at the summit (opened 2012). Look directly down the serpentine road. Caf\u00e9 and toilets. Free entry.',
      },
      {
        name: 'Gudbrandsjuvet gorge',
        description:
          '5 m wide, 25 m deep ravine between Valldal and Trollstigen where the Valld\u00f8la River forces through. Designed viewing platform and summer caf\u00e9.',
      },
      {
        name: '\u00d8rnesvingen (Eagle\u2019s Bend)',
        description:
          'The classic Geirangerfjord panorama from 620 m. Same viewpoint as the \u00c5lesund route.',
      },
    ],
    warnings: [
      {
        text: 'Trollstigen was closed the entire 2024 season and most of 2025 due to rockfall. A 305 million NOK safety project is underway. Verify road status at vegvesen.no or call 175 before departing.',
      },
      {
        text: 'Maximum vehicle length: 13.3 m on Trollstigen. The original-width hairpins are tight for campervans. Give way to oncoming buses.',
      },
      {
        text: 'Summit temperatures can drop near 0\u00b0C even in midsummer. Fog reduces visibility to meters without warning.',
      },
      {
        text: 'Fuel up in \u00c5ndalsnes. No fuel until Geiranger (Fjordbuda/YX).',
      },
    ],
    carNote:
      'Standard car handles this route. Campervans up to 13 m permitted but the hairpins demand careful driving. Use engine braking on descent (10% gradient).',
  },
  {
    id: 'hellesylt',
    label: 'Hellesylt ferry',
    icon: Ship,
    from: 'Hellesylt',
    distance: '17.4 km (crossing)',
    realTime: '1 hr 5 min (ferry)',
    mapsTime: 'N/A',
    roads: 'Rv60 from Stryn (49.5 km, 46 min) \u2192 Hellesylt ferry terminal',
    season: 'April to October (extended to December in 2026)',
    seasonOpen: false,
    overview:
      'The classic Geirangerfjord experience from the water. The ferry passes the Seven Sisters, the Suitor, and the Bridal Veil waterfalls, plus the abandoned farms of Skagefl\u00e5 and Knivsfl\u00e5 perched on cliff ledges. Electric vessel, silent crossing.',
    ferries: [
      {
        name: 'Geiranger\u2013Hellesylt',
        operator: 'FjordX (private operator, not a county ferry)',
        crossing: '1 hour 5 minutes',
        frequency: '3 departures daily from each end. From Hellesylt: 11:00, 14:00, 17:30 (approx.)',
        cost: '~1,069 NOK for car + 2 passengers (2025 prices). From 390 NOK via Fjord Tours',
        autoPASS: false,
        preBook: true,
        note: 'Small-capacity vessel. Sells out in July and August. Book at booking.fjordx.lighthousecloud.app',
      },
    ],
    publicTransport: [
      {
        mode: 'Bus from Stryn to Hellesylt',
        description:
          'Three daily departures. Connect from Bergen or Nordfjordeid. Then board the FjordX ferry to Geiranger.',
      },
    ],
    stops: [
      {
        name: 'Seven Sisters waterfall (De Syv S\u00f8stre)',
        description:
          'Seven streams plunging 250 m into the fjord on the south side. The ferry slows here. Best flow in May\u2013June from snowmelt.',
      },
      {
        name: 'The Suitor (Friaren)',
        description:
          'Directly opposite the Seven Sisters on the north wall. Local legend: the Suitor is forever trying to impress the Sisters.',
      },
      {
        name: 'Bridal Veil (Brudesl\u00f8ret)',
        description:
          'Over 300 m high on the north side. Water runs gently over the rock face. Visible from the deck.',
      },
      {
        name: 'Skagefl\u00e5 and Knivsfl\u00e5 farms',
        description:
          'Abandoned farms on narrow cliff ledges hundreds of meters above the water. Visible from the ferry. Skagefl\u00e5 was worked until 1916.',
      },
    ],
    warnings: [
      {
        text: 'Only 3 departures per day. Miss your sailing and you wait 3\u20134 hours or overnight in Hellesylt.',
      },
      {
        text: 'This is not a county ferry. No AutoPASS discount. Budget ~1,000\u20131,125 NOK for car + passengers.',
      },
      {
        text: 'No drive-on without a reservation during peak weeks (July\u2013August). Do not show up hoping for space.',
      },
    ],
    carNote:
      'Any vehicle size accepted. The approach from Stryn is a standard two-lane road with no restrictions. Fill up in Stryn before boarding.',
  },
  {
    id: 'oslo',
    label: 'Oslo',
    icon: Route,
    from: 'Oslo',
    distance: '430 km (via E6/Rv15)',
    realTime: '7\u20138 hours driving',
    mapsTime: '5.5 hours',
    roads: 'E6 north \u2192 Otta \u2192 Rv15 west \u2192 Lom \u2192 Grotli \u2192 Fv63 south to Geiranger',
    season: 'Fv63 to Geiranger: mid-May to October only',
    seasonOpen: false,
    tollCost: '150\u2013300 NOK in toll stations on E6 (AutoPASS: 20% discount)',
    overview:
      'The most common route from eastern Norway. No ferry required. The E6 is fast motorway to Lillehammer, then two-lane road through Gudbrandsdalen to Lom. The final 25 km from Grotli descends into Geiranger on Fv63, which closes in winter.',
    ferries: [],
    publicTransport: [
      {
        mode: 'Train: Oslo \u2192 \u00c5ndalsnes (Rauma Line)',
        description:
          'Oslo S to Domb\u00e5s (Dovre Line, 4.5 hrs), change to \u00c5ndalsnes (Rauma Line, 1.5 hrs). Then bus or rental car to Geiranger. The Rauma Line through Romsdalen is one of Europe\u2019s most scenic train rides.',
      },
      {
        mode: 'Bus: Vy/Lavprisekspressen',
        description:
          'No direct bus Oslo\u2013Geiranger. Take the train to \u00c5ndalsnes or bus to Otta/Lom, then connect via FRAM regional bus. Total: 10\u201312 hours with connections.',
        note: 'A rental car is the practical choice from Oslo',
      },
    ],
    stops: [
      {
        name: 'Lillehammer',
        description:
          '1994 Winter Olympics town. Maihaugen open-air museum. Good coffee and lunch stop 2 hours from Oslo.',
      },
      {
        name: 'Lom Stave Church',
        description:
          'One of Norway\u2019s largest surviving medieval stave churches (mid-12th century). 5-minute detour from Rv15 in Lom village centre.',
      },
      {
        name: 'Bakeriet i Lom',
        description:
          'Regularly cited as Norway\u2019s best bakery. Cinnamon rolls, sourdough, local pastries. On the main road in Lom. The essential lunch stop on this route.',
      },
      {
        name: 'Dalsnibba / Geiranger Skywalk (1,500 m)',
        description:
          'Toll road detour from Fv63 above Geiranger. Panoramic fjord view from 1,500 m. 350 NOK per car. Open late May\u2013September. No mobile signal at top.',
        detour: true,
      },
      {
        name: 'Flydalsjuvet viewpoint',
        description:
          'Free viewpoint 4 km above Geiranger village. Two platforms with the classic postcard fjord view. Free parking.',
      },
    ],
    warnings: [
      {
        text: 'Fv63 from Grotli to Geiranger closes mid-October to mid-May. Even if the E6 and Rv15 are open year-round, you cannot reach Geiranger from this direction in winter.',
      },
      {
        text: 'Google Maps says 5.5 hours. Reality with fuel, food, and two-lane roads: 7\u20138 hours minimum. Most travellers break the drive with an overnight in Lom or Stryn.',
      },
      {
        text: 'Multiple toll stations on the E6 between Oslo and Otta. Tolls collected automatically by camera. Rental cars have e-toll tags or the agency bills you. Budget 150\u2013300 NOK total.',
      },
      {
        text: 'Fuel up in Lom or Otta. The stretch from Lom to Geiranger (90 km) has no fuel stations until Geiranger village.',
      },
    ],
    carNote:
      'Standard car. No 4WD needed in summer. Winter tires mandatory November\u2013March (3 mm minimum tread). Headlights on at all times, even in daylight.',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function GeirangerGettingThere() {
  const [activeRoute, setActiveRoute] = useState<string>('alesund');

  const route = routes.find((r) => r.id === activeRoute) ?? routes[0];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Ship className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">
          How to reach Geirangerfjord
        </h2>
      </div>
      <div className="max-w-3xl space-y-4 mb-8">
        <p className="text-slate-600 leading-relaxed">
          Four approaches, each with a different character. The times below are
          what the drive actually takes with ferries, single-lane tunnels, and
          mountain road conditions. Not what the map app says.
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
                From {route.from} to Geiranger
              </h3>
              <p className="text-sm text-slate-500 mt-1">{route.roads}</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-5">
            {route.overview}
          </p>

          {/* Quick facts strip */}
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-sm text-xs font-medium text-slate-700">
              <MapPin className="w-3 h-3 text-[#5CBFEE]" aria-hidden="true" />
              {route.distance}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-sm text-xs font-medium text-slate-700">
              <Clock className="w-3 h-3 text-[#1A365D]" aria-hidden="true" />
              {route.realTime}{' '}
              <span className="text-slate-400 line-through ml-1">
                ({route.mapsTime})
              </span>
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
                        <span className="font-normal text-slate-500 ml-2">
                          {ferry.operator}
                        </span>
                      </p>
                      <dl className="space-y-1.5 text-xs">
                        <div className="flex gap-2">
                          <dt className="text-slate-500 w-20 shrink-0">
                            Crossing
                          </dt>
                          <dd className="text-slate-700">{ferry.crossing}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="text-slate-500 w-20 shrink-0">
                            Frequency
                          </dt>
                          <dd className="text-slate-700">{ferry.frequency}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="text-slate-500 w-20 shrink-0">Cost</dt>
                          <dd className="text-slate-700">{ferry.cost}</dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="text-slate-500 w-20 shrink-0">
                            AutoPASS
                          </dt>
                          <dd className="flex items-center gap-1 text-slate-700">
                            {ferry.autoPASS ? (
                              <>
                                <CheckCircle
                                  className="w-3 h-3 text-[#00D084]"
                                  aria-hidden="true"
                                />
                                Yes (50% discount)
                              </>
                            ) : (
                              <>
                                <X
                                  className="w-3 h-3 text-slate-400"
                                  aria-hidden="true"
                                />
                                No
                              </>
                            )}
                          </dd>
                        </div>
                        <div className="flex gap-2">
                          <dt className="text-slate-500 w-20 shrink-0">
                            Pre-book
                          </dt>
                          <dd className="text-slate-700">
                            {ferry.preBook ? (
                              <span className="font-semibold text-[#D32F2F]">
                                Required
                              </span>
                            ) : (
                              'Not needed (turn-up-and-go)'
                            )}
                          </dd>
                        </div>
                      </dl>
                      {ferry.note && (
                        <p className="mt-2 text-xs text-slate-500 italic">
                          {ferry.note}
                        </p>
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
                      <p className="font-bold text-slate-800 text-sm mb-1">
                        {pt.mode}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {pt.description}
                      </p>
                      {pt.note && (
                        <p className="mt-1.5 text-xs text-amber-700 font-medium flex items-start gap-1.5">
                          <Info
                            className="w-3 h-3 mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                          {pt.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  No direct public transport on this route.
                </p>
              )}
            </div>

            {/* Car note */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
                <Car className="w-4 h-4 text-[#1A365D]" aria-hidden="true" />
                Rental car
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {route.carNote}
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Memorable stops */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                <MapPin
                  className="w-4 h-4 text-[#00D084]"
                  aria-hidden="true"
                />
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
                  <AlertTriangle
                    className="w-4 h-4"
                    aria-hidden="true"
                  />
                  Before you drive
                </h4>
                <div className="space-y-3">
                  {route.warnings.map((warning, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5"
                    >
                      <Fuel
                        className="w-3 h-3 text-[#D32F2F] mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {warning.text}
                      </p>
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
            <Ship
              className="w-5 h-5 text-[#5CBFEE] mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-bold text-slate-800 mb-1">
                Hurtigruten also calls at Geiranger
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                June to August only. The coastal voyage ship arrives at
                approximately 14:30 and departs at 15:15. Passengers are
                tendered to shore on the M/S Geirangerfjord shuttle. This is a
                45-minute port call, not a full stop. If Geiranger is your
                destination, this is a scenic arrival but not practical for
                exploring.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
