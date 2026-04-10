'use client';

import { useState } from 'react';
import {
  MapPin,
  Bed,
  UtensilsCrossed,
  ShoppingBag,
  Fuel,
  Zap,
  Clock,
  Users,
  Mountain,
  Ship,
  Car,
  AlertTriangle,
  CheckCircle,
  X,
  Info,
  Navigation,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Accommodation {
  name: string;
  type: string;
  price: string;
  highlight: string;
}

interface DiningOption {
  name: string;
  detail: string;
}

interface Service {
  label: string;
  available: boolean;
  detail: string;
}

interface BasecampData {
  id: string;
  label: string;
  icon: typeof MapPin;
  name: string;
  tagline: string;
  population: string;
  distanceToGeiranger: string;
  overview: string;
  bestFor: string[];
  notIdealFor: string[];
  accommodation: Accommodation[];
  dining: DiningOption[];
  services: Service[];
  insiderTip: string;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const basecamps: BasecampData[] = [
  {
    id: 'geiranger',
    label: 'Geiranger',
    icon: Ship,
    name: 'Geiranger village',
    tagline: '200 residents, 900,000 visitors, one road in',
    population: '~215 permanent residents',
    distanceToGeiranger: 'You are here',
    overview:
      'The village at the head of the fjord. Everything is walkable. Three hotels, one grocery store, one fuel station, and 150\u2013200 cruise ship calls per season. The village fills between 09:00 and 17:00 when passengers are tendered ashore. After 17:00, you get the fjord to yourself.',
    bestFor: [
      'Short stays (1\u20132 nights)',
      'Hikers targeting Storseterfossen, L\u00f8sta, and Skagefl\u00e5',
      'Travellers wanting sunrise/sunset fjord views without the day crowds',
      'Families using the Hotel Union pool and spa',
    ],
    notIdealFor: [
      'Budget travellers (everything is tourist-priced)',
      'Anyone who dislikes cruise ship crowds during the day',
      'Multi-day stays with no car (limited activities within walking distance)',
    ],
    accommodation: [
      {
        name: 'Hotel Union Geiranger',
        type: '4-star hotel',
        price: '2,000\u20134,500 NOK/night',
        highlight:
          '197 rooms. 4 restaurants including Restaurant Fjorden (buffet, seats 400) and Julie (a la carte). Spa with indoor/outdoor pools. 40 EV charging points. Vintage car museum. The dominant hotel in the village.',
      },
      {
        name: 'Havila Hotel Geiranger',
        type: '4-star hotel',
        price: '1,500\u20133,500 NOK/night',
        highlight:
          'Central village location with direct fjord views. Restaurant Skagefl\u00e5 focuses on traditional Norwegian dishes. Smaller scale than Hotel Union, more intimate.',
      },
      {
        name: 'Grande Fjord Hotel',
        type: '4-star boutique',
        price: '1,200\u20133,500 NOK/night',
        highlight:
          'Family-owned. 100 m from the fjord. 6th-floor panoramic restaurant with Scandinavian dishes. 2 outdoor jacuzzis with fjord views. Expanded with new building in 2024.',
      },
      {
        name: 'Geirangerfjorden Feriesenter',
        type: 'Camping + cabins',
        price: '190\u2013240 NOK (tent) / cabins vary',
        highlight:
          '2 km from village centre. 16 cabins (6 sizes), 42 pitches (37 with electricity). Fjord views. Renovated sanitary facilities with showers, kitchen, laundry.',
      },
    ],
    dining: [
      {
        name: 'Brasserie Posten',
        detail:
          '35 seats by the harbour. Halibut, fish soup, pulled goat wrap. 350\u2013500 NOK mains. Outdoor seating facing the ferry dock.',
      },
      {
        name: 'Vester\u00e5s Gard',
        detail:
          'Mountain farm restaurant above the village. Same farm as the Storseterfossen trailhead. Worth the visit for the setting alone. Seasonal (May\u2013Sep).',
      },
      {
        name: 'Restaurant Fjorden (Hotel Union)',
        detail:
          'Buffet dinner with local ingredients. Seats 400. The most substantial dining option in the village. 500\u2013700 NOK.',
      },
      {
        name: 'Geiranger Sjokolade',
        detail:
          'Chocolatier in the old boathouse. Handmade chocolates and hot cocoa. Open May\u2013October only.',
      },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Joker Geiranger. Small but stocked daily. The only grocery store.' },
      { label: 'Fuel', available: true, detail: 'Fjordbuda/YX by the ferry quay. Fill up before arriving.' },
      { label: 'EV charging', available: true, detail: '14 points total. 3 rapid chargers. Hotel Union has 40 points.' },
      { label: 'Pharmacy', available: false, detail: 'No pharmacy. Nearest in Stranda (45 km) or \u00c5lesund.' },
      { label: 'Parking', available: true, detail: '11 areas in village. Paid April\u2013September. Viewpoints are free.' },
      { label: 'Hospital', available: false, detail: 'No medical centre. Nearest hospital: \u00c5lesund (108 km). Emergency: 113.' },
    ],
    insiderTip:
      'Book accommodation 3\u20136 months ahead for July. The village empties after 17:00 when cruise passengers reboard. The fjord between 05:00 and 08:00 in June is yours alone.',
  },
  {
    id: 'hellesylt',
    label: 'Hellesylt',
    icon: Ship,
    name: 'Hellesylt',
    tagline: 'The quiet end of the fjord',
    population: '~250\u2013300 residents',
    distanceToGeiranger: '17.5 km by ferry (1 hr 5 min) / 85 km by road via Eidsdal',
    overview:
      'Western entry to Geirangerfjord. A 20-metre waterfall splits the village in two. Significantly cheaper and quieter than Geiranger. Use it as a base and take the ferry across for a day trip. Better access to Norangsdalen valley and the Sunnm\u00f8re Alps than anywhere on the Geiranger side.',
    bestFor: [
      'Budget travellers (cheaper accommodation than Geiranger)',
      'Hikers targeting the Sunnm\u00f8re Alps and Norangsdalen',
      'Travellers wanting a quieter, less tourist-facing base',
      'Road trippers passing between \u00c5lesund and Stryn',
    ],
    notIdealFor: [
      'Travellers wanting evening dining options (very limited)',
      'Anyone needing Geiranger viewpoints at sunrise/sunset (ferry schedule limits this)',
      'Those without a car (limited public transport)',
    ],
    accommodation: [
      {
        name: 'Hellesylt Hostel & Motel',
        type: 'Budget hostel/motel',
        price: 'From ~720 NOK/night',
        highlight:
          'Simple rooms with fjord-view terrace. 11 minutes\u2019 walk uphill from centre. Common room with TV. The budget option.',
      },
      {
        name: 'Hellesylt Camping',
        type: 'Campsite',
        price: 'From ~200 NOK/night',
        highlight:
          'Waterfront campsite at the fjord entrance. ~100 pitches for tents, caravans, RVs. 100 m to village centre and grocery stores.',
      },
      {
        name: 'Hotel Union \u00d8ye (23 km away)',
        type: 'Historic hotel',
        price: '2,500\u20134,000 NOK/night',
        highlight:
          'In Norangsdalen, 23 km from Hellesylt. Historic hotel where royalty and artists stayed. If you want the luxury option near Hellesylt, this is it.',
      },
    ],
    dining: [
      {
        name: 'Village caf\u00e9s',
        detail:
          'A few small eateries and a caf\u00e9. Options are limited compared to Geiranger. Bring provisions or cook at your campsite.',
      },
      {
        name: 'Hotel Union \u00d8ye restaurant',
        detail:
          'Worth the 23 km drive to Norangsdalen for dinner. Traditional Norwegian cuisine in a historic setting.',
      },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Co-Op shop with Wi-Fi plus one other small store.' },
      { label: 'Fuel', available: true, detail: 'One fuel station in the village.' },
      { label: 'EV charging', available: true, detail: '2 charging stations.' },
      { label: 'Pharmacy', available: false, detail: 'No pharmacy. Nearest in Stranda or \u00c5lesund.' },
      { label: 'Ferry terminal', available: true, detail: 'FjordX terminal for Geiranger crossing. Arrive 30 min early in peak season.' },
      { label: 'Hospital', available: false, detail: 'No medical centre. Emergency: 113.' },
    ],
    insiderTip:
      'Drive 5.5 km west to Norangsdalen and find Lygnst\u00f8lvatnet lake. An 1908 rockslide dammed the valley and submerged old farm buildings. On calm days you can see ruins through the water. The Sunnm\u00f8re Alps above are genuinely world-class hiking.',
  },
  {
    id: 'alesund',
    label: '\u00c5lesund',
    icon: Navigation,
    name: '\u00c5lesund',
    tagline: 'Art Nouveau city, 108 km from the fjord',
    population: '~55,000',
    distanceToGeiranger: '108 km / 2.5\u20133 hours via Eagle Road + ferry',
    overview:
      'A full-service city with an airport, 20+ restaurants, and Art Nouveau architecture rebuilt after the 1904 fire. Use it as a multi-day base and day-trip to Geiranger (leave by 08:00, return by 19:00). The dining scene, cultural attractions, and evening options are in a different league from anything at the fjord.',
    bestFor: [
      'Travellers flying in (airport with car rental desks)',
      'Multi-day stays (3\u20134 nights) exploring the wider region',
      'Families wanting aquarium, city walks, and boat trips',
      'Anyone who values evening restaurant options',
      'Cultural travellers interested in Art Nouveau architecture',
    ],
    notIdealFor: [
      'Travellers wanting to be at the fjord for sunrise/sunset',
      'One-night-only stays (too far for a quick Geiranger visit)',
      'Budget travellers (\u00c5lesund hotel prices are city-level)',
    ],
    accommodation: [
      {
        name: 'Hotel Brosundet',
        type: 'Boutique hotel',
        price: '2,000\u20133,500 NOK/night',
        highlight:
          '131 rooms in a converted 1904 Art Nouveau warehouse overlooking the strait. Home to Maki restaurant (fine dining). Also operates Molja Lighthouse: a single hotel room inside a 150-year-old lighthouse at the end of a jetty.',
      },
      {
        name: 'Scandic Parken',
        type: 'Chain hotel',
        price: '1,300\u20132,000 NOK/night',
        highlight:
          'Reliable mid-range. Central location. Rated 8.5/10 across 2,700+ reviews. Breakfast included.',
      },
      {
        name: 'Thon Hotel \u00c5lesund',
        type: 'Chain hotel',
        price: '1,300\u20132,000 NOK/night',
        highlight:
          'Central. Rated 8.6/10. Standard Thon quality. Good fallback if Brosundet is booked.',
      },
      {
        name: '\u00c5lesund Youth Hostel',
        type: 'Hostel',
        price: 'From ~420\u2013530 NOK/night',
        highlight:
          'Dorm and private rooms. Clean, spacious. Common lounge. The genuine budget option in the city.',
      },
    ],
    dining: [
      {
        name: 'Maki (Hotel Brosundet)',
        detail:
          'Fine dining in the nautical cellar. Chef Ole Jonny Hjelmeseth. Local fish, crustaceans, cured pollack, cod tongues. The strongest restaurant in \u00c5lesund.',
      },
      {
        name: 'XL Diner',
        detail:
          'One of Europe\u2019s largest bacalao (clipfish) restaurants. Opened 1999. Informal, hearty portions, canal views. Multiple dried cod preparations.',
      },
      {
        name: 'Apotekergata No. 5',
        detail:
          'Well-reviewed Scandinavian cuisine. Central location.',
      },
      {
        name: 'Molo Brew',
        detail:
          'Craft brewery and restaurant. Local beers, casual atmosphere.',
      },
    ],
    services: [
      { label: 'Airport', available: true, detail: '\u00c5lesund Vigra (AES). 12 km from centre. Domestic + some international flights.' },
      { label: 'Car rental', available: true, detail: 'Hertz, Sixt, Europcar, Enterprise, Alamo all at the airport.' },
      { label: 'Grocery', available: true, detail: 'Full range: Rema 1000, Kiwi, Coop. City-level shopping.' },
      { label: 'Fuel', available: true, detail: 'Multiple stations throughout the city.' },
      { label: 'EV charging', available: true, detail: 'Extensive city-wide infrastructure.' },
      { label: 'Pharmacy', available: true, detail: 'Multiple pharmacies (Apotek 1, Boots, Vitus).' },
    ],
    insiderTip:
      'Climb the 418 steps from Byparken to Aksla viewpoint at sunset. The panorama over the Art Nouveau rooftops, islands, and Sunnm\u00f8re Alps is the best free view in western Norway. If you have a spare day, drive 2 hours to Runde island: 100,000 pairs of puffins nest here April\u2013August.',
  },
  {
    id: 'valldal',
    label: 'Valldal',
    icon: Mountain,
    name: 'Valldal',
    tagline: 'Strawberries, design hotels, and the road to Trollstigen',
    population: '~500 in the village (Fjord Municipality: ~2,500)',
    distanceToGeiranger: '36 km via Eidsdal\u2013Linge ferry (~40 min)',
    overview:
      'An agricultural valley between Geiranger and Trollstigen. Norway\u2019s strawberry capital. Home to the Juvet Landscape Hotel (the filming location for Ex Machina). Roadside berry stalls line the road in July. A genuine working valley, not a tourist destination. 40 minutes from Geiranger via the Eidsdal\u2013Linge ferry.',
    bestFor: [
      'Design/architecture travellers (Juvet Landscape Hotel)',
      'Road trippers combining Geiranger and Trollstigen',
      'Food travellers during strawberry season (July\u2013August)',
      'Couples wanting a luxury hotel experience away from crowds',
      'Families wanting a campsite base in a quiet valley',
    ],
    notIdealFor: [
      'Travellers without a car (no useful public transport)',
      'Anyone needing evening dining options (very limited beyond Juvet)',
      'Budget travellers if targeting Juvet (3,500\u20137,500 NOK/night)',
    ],
    accommodation: [
      {
        name: 'Juvet Landscape Hotel',
        type: 'Design hotel',
        price: '3,500\u20137,500 NOK/night (incl. breakfast + dinner)',
        highlight:
          'Glass-and-wood cabins by Jensen & Skodvin Architects. Filming location for Ex Machina and Succession. 7 Landscape Rooms, 2 Bird Houses, 1 Writer\u2019s Lodge. 8 km from Valldal centre at Gudbrandsjuvet gorge. A destination in itself.',
      },
      {
        name: 'Valldal Fjordhotell',
        type: 'Mid-range hotel',
        price: 'From ~1,250 NOK/night',
        highlight:
          '40 rooms on Norddalsfjord. Ground-floor rooms with private terraces. Restaurant with local specialties. ROA sauna by the river. Expanding with 16 new rooms for summer 2026.',
      },
      {
        name: 'Gjerde Camping',
        type: 'Camping + cabins',
        price: 'Cabins from ~800 NOK/night',
        highlight:
          'High-standard cabins (5\u20137 beds) and basic cabins. Family-friendly. Scenic valley setting.',
      },
    ],
    dining: [
      {
        name: 'Juvet restaurant',
        detail:
          'Dinner included for hotel guests. Local ingredients, seasonal menu. Non-guests may be able to book a table. Call ahead.',
      },
      {
        name: 'Jordb\u00e6rstova (Strawberry Caf\u00e9)',
        detail:
          'On the road between Geiranger and \u00c5ndalsnes, 8 km from Juvet. Famous for strawberry cake (Lonely Planet-listed). Multiple strawberry dishes. The essential stop in July.',
      },
      {
        name: 'Valldal Fjordhotell restaurant',
        detail:
          'Local specialties and standard Norwegian dishes. Open to non-guests.',
      },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Small grocery store in Valldal centre.' },
      { label: 'Fuel', available: false, detail: 'No confirmed station. Fill up in \u00c5lesund or Eidsdal.' },
      { label: 'EV charging', available: true, detail: 'Limited. Juvet has chargers for guests.' },
      { label: 'Pharmacy', available: false, detail: 'No pharmacy. Nearest in \u00c5lesund (85 km).' },
      { label: 'Trollstigen access', available: true, detail: '35 km northeast on Fv63. Check road status at vegvesen.no.' },
      { label: 'Hospital', available: false, detail: 'No medical centre. Emergency: 113. Nearest hospital: \u00c5lesund.' },
    ],
    insiderTip:
      'Strawberry season peaks in a 3-week window in July. The roadside stalls between Valldal and Trollstigen sell fruit picked that morning. The microclimate here (long daylight, fjord-moderated temperature) produces unusually sweet berries. If you are here outside July, Juvet alone justifies the detour.',
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function GeirangerBasecamps() {
  const [activeBase, setActiveBase] = useState<string>('geiranger');

  const base = basecamps.find((b) => b.id === activeBase) ?? basecamps[0];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">
          Where to base yourself
        </h2>
      </div>
      <div className="max-w-3xl space-y-4 mb-8">
        <p className="text-slate-600 leading-relaxed">
          Four options, each with a different trade-off between proximity,
          price, and crowd exposure. Geiranger village puts you at the fjord.
          Hellesylt and Valldal buy you quiet. \u00c5lesund gives you a city
          with an airport.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8" role="tablist">
        {basecamps.map((b) => {
          const Icon = b.icon;
          const isActive = activeBase === b.id;
          return (
            <button
              key={b.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveBase(b.id)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors min-h-[44px]',
                isActive
                  ? 'bg-[#1A365D] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#1A365D]/40 hover:text-[#1A365D]'
              )}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {b.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Overview card */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-start gap-3 mb-1">
            <MapPin
              className="w-5 h-5 text-[#5CBFEE] mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <h3 className="text-lg font-bold text-slate-800">{base.name}</h3>
              <p className="text-sm text-slate-500">{base.tagline}</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mt-3 mb-5">
            {base.overview}
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-sm text-xs font-medium text-slate-700">
              <Users className="w-3 h-3 text-[#1A365D]" aria-hidden="true" />
              {base.population}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-sm text-xs font-medium text-slate-700">
              <Car className="w-3 h-3 text-[#1A365D]" aria-hidden="true" />
              {base.distanceToGeiranger}
            </span>
          </div>
        </div>

        {/* Best for / Not ideal for */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-emerald-50/50 rounded-lg border border-emerald-200/60 p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-emerald-800 uppercase tracking-wide mb-3">
              <CheckCircle className="w-4 h-4" aria-hidden="true" />
              Best for
            </h4>
            <ul className="space-y-2">
              {base.bestFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50/50 rounded-lg border border-amber-200/60 p-5">
            <h4 className="flex items-center gap-2 text-sm font-bold text-amber-800 uppercase tracking-wide mb-3">
              <AlertTriangle className="w-4 h-4" aria-hidden="true" />
              Not ideal for
            </h4>
            <ul className="space-y-2">
              {base.notIdealFor.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Accommodation */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                <Bed className="w-4 h-4 text-[#1A365D]" aria-hidden="true" />
                Accommodation
              </h4>
              <div className="space-y-5">
                {base.accommodation.map((acc) => (
                  <div key={acc.name}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-bold text-slate-800 text-sm">
                        {acc.name}
                      </p>
                      <span className="text-xs text-slate-500 shrink-0">
                        {acc.type}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-[#1A365D] mb-1.5">
                      {acc.price}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {acc.highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dining */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                <UtensilsCrossed
                  className="w-4 h-4 text-[#1A365D]"
                  aria-hidden="true"
                />
                Dining
              </h4>
              <div className="space-y-4">
                {base.dining.map((d) => (
                  <div key={d.name}>
                    <p className="font-bold text-slate-800 text-sm mb-0.5">
                      {d.name}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {d.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Services + Insider tip */}
          <div className="space-y-6">
            {/* Services */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                <ShoppingBag
                  className="w-4 h-4 text-[#1A365D]"
                  aria-hidden="true"
                />
                Practical services
              </h4>
              <div className="space-y-3">
                {base.services.map((svc) => (
                  <div key={svc.label} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {svc.available ? (
                        <CheckCircle
                          className="w-3.5 h-3.5 text-[#00D084]"
                          aria-hidden="true"
                        />
                      ) : (
                        <X
                          className="w-3.5 h-3.5 text-slate-400"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {svc.label}
                      </p>
                      <p className="text-xs text-slate-600">{svc.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Insider tip */}
            <div className="bg-[#1A365D]/5 rounded-lg border border-[#1A365D]/15 p-5">
              <h4 className="flex items-center gap-2 text-sm font-bold text-[#1A365D] uppercase tracking-wide mb-3">
                <Info className="w-4 h-4" aria-hidden="true" />
                Local tip
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">
                {base.insiderTip}
              </p>
            </div>
          </div>
        </div>

        {/* Booking lead time note */}
        <div className="bg-slate-50 rounded-lg border border-slate-200 p-5">
          <div className="flex items-start gap-3">
            <Clock
              className="w-5 h-5 text-[#1A365D] mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-bold text-slate-800 mb-1">
                Booking lead times
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-800">
                  Peak July:
                </span>{' '}
                Book hotels 3\u20136 months ahead. Hotel Union and Grande Fjord
                Hotel fill first. Camping has more last-minute
                availability.{' '}
                <span className="font-semibold text-slate-800">
                  September:
                </span>{' '}
                1\u20132 months is usually sufficient. Expect 30\u201340% lower
                rates than July. Mid-range hotel reality: 2,000\u20134,000
                NOK/night in July, 1,200\u20132,500 NOK/night in September.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
