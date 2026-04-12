'use client';

import { useState } from 'react';
import {
  MapPin,
  Bed,
  UtensilsCrossed,
  ShoppingBag,
  Clock,
  Users,
  Mountain,
  Car,
  AlertTriangle,
  CheckCircle,
  X,
  Info,
  Anchor,
  Fish,
  Ship,
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
  distanceToCentre: string;
  overview: string;
  bestFor: string[];
  notIdealFor: string[];
  accommodation: Accommodation[];
  dining: DiningOption[];
  services: Service[];
  insiderTip: string;
}

const basecamps: BasecampData[] = [
  {
    id: 'svolvaer',
    label: 'Svolvær',
    icon: Anchor,
    name: 'Svolvær (the hub)',
    tagline: 'The largest town, best transport links, and widest choice of rorbu',
    population: '4,700 residents',
    distanceToCentre: 'Airport (SVJ) 5 minutes',
    overview:
      'Svolvær is the administrative and commercial centre of Lofoten on Austvågøya. The airport, the Hurtigruten coastal ferry terminal, and the Bodø car ferry all land here. Svinøya Rorbuer sits across the footbridge from the town square on its own islet. Thon Hotel Svolvær occupies the harbour front. The town is where you base yourself if you want to use Lofoten as a set of day-trip spokes — Reine is a 2-hour drive on the E10, Henningsvær 20 minutes, Nusfjord 50 minutes.',
    bestFor: [
      'First-time visitors to Lofoten',
      'Travellers flying in without a rental car',
      'Hurtigruten passengers continuing north or south',
      'Winter visitors wanting restaurants open every night',
      'Anyone on a 3–4 night trip who wants a single base',
    ],
    notIdealFor: [
      'Travellers chasing the Reine photo at dawn (2-hour drive)',
      'Photographers wanting dark sky for aurora from their window',
      'Visitors who came for a quiet fishing village experience',
    ],
    accommodation: [
      {
        name: 'Svinøya Rorbuer',
        type: 'Heritage rorbu',
        price: '2,400–4,800 NOK/night',
        highlight:
          'Restored fishermen\'s cabins on their own islet, reached by footbridge. The original 1828 buildings have been adapted with modern kitchens and underfloor heating. Børsen Spiseri on site. This is the benchmark rorbu experience in Svolvær.',
      },
      {
        name: 'Thon Hotel Svolvær',
        type: '4-star hotel',
        price: '1,800–3,600 NOK/night',
        highlight:
          'Harbour-front hotel on pilings over the water. Reliable mid-range option with fjord-view rooms. Walking distance to every restaurant in town. Bus stops and Hurtigruten terminal 200 metres away.',
      },
      {
        name: 'Anker Brygge',
        type: 'Rorbu + suites',
        price: '2,000–4,200 NOK/night',
        highlight:
          'Modern rorbu-style cabins on the harbour, plus hotel-style suites in the main building. Good restaurant (Kjøkkenet). Quieter than central Svolvær but still 5 minutes walking to Torget.',
      },
      {
        name: 'Scandic Svolvær',
        type: '4-star hotel',
        price: '1,500–3,000 NOK/night',
        highlight:
          'Chain reliability on the harbour. Breakfast included. The default when Svinøya and Thon sell out in July.',
      },
    ],
    dining: [
      {
        name: 'Børsen Spiseri',
        detail:
          'In the 1828 former general store at Svinøya Rorbuer. Stockfish, Arctic char, skrei in season. The most serious restaurant in Svolvær. Book 2–3 weeks ahead in summer. 550–800 NOK mains.',
      },
      {
        name: 'Du Verden Matbar',
        detail:
          'Small, modern kitchen on Torget serving tapas-style Nordic plates. Popular with locals. Short menu, seasonal. 180–320 NOK per plate.',
      },
      {
        name: 'Bacalao',
        detail:
          'Harbour-front café-bistro named after the Norwegian-Portuguese salt cod dish. Fish soup, burgers, pizza. Reliable lunch and casual dinner. Open year-round.',
      },
      {
        name: 'Paleo Arctic',
        detail:
          'Fine dining with a tasting menu focused on Arctic ingredients. Pre-booking essential. 1,200–1,800 NOK tasting menu.',
      },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Rema 1000 and Coop Prix within 5 minutes walking of Torget.' },
      { label: 'Car rental', available: true, detail: 'Hertz and Avis at Svolvær airport. Book ahead in July–August.' },
      { label: 'EV charging', available: true, detail: 'Rapid chargers at the Circle K and several hotel car parks.' },
      { label: 'Pharmacy', available: true, detail: 'Apotek 1 on Storgata. The only pharmacy in this stretch of Lofoten.' },
      { label: 'Hospital', available: true, detail: 'Nordlandssykehuset Lofoten in Gravdal, 50 minutes by car. Emergency: 113.' },
      { label: 'Hurtigruten stop', available: true, detail: 'Coastal ferry terminal in central harbour. Northbound arrives 18:30, southbound 21:30.' },
    ],
    insiderTip:
      'Book the seat at the bar at Børsen Spiseri if the dining room is full — same kitchen, same menu, easier booking window. In summer, the Trollfjord sea eagle safari departs from the quay 200 metres from Svinøya Rorbuer at 14:00. Walk over, do the 2-hour tour, be back at the rorbu by 17:00 with time to cook the fish you bought at the harbour stall.',
  },
  {
    id: 'henningsvaer',
    label: 'Henningsvær',
    icon: Fish,
    name: 'Henningsvær (the island village)',
    tagline: 'Working fishing community on three islands, climbing and art scene',
    population: '500 residents',
    distanceToCentre: '20 minutes from Svolvær',
    overview:
      'Henningsvær spreads across three small islands connected by single-lane bridges, built around a still-active cod harbour. The village is compact enough to walk end to end in 15 minutes. A climbing community has grown up around the granite walls of Vågakallen. Trevarefabrikken — a former cod-liver-oil factory converted into a cultural centre, bakery, and sauna — anchors the contemporary scene. The village gets busy in the middle of the day in summer but empties in the evening when day-trippers leave.',
    bestFor: [
      'Travellers wanting a working fishing-village experience',
      'Climbers and photographers',
      'Foodies (Fiskekrogen is one of the best in Lofoten)',
      'Visitors based in Svolvær extending to 2 nights here',
    ],
    notIdealFor: [
      'Travellers without a rental car (bus service is thin)',
      'Winter visitors (several restaurants close outside summer)',
      'Anyone needing a pharmacy or bank branch',
    ],
    accommodation: [
      {
        name: 'Henningsvær Bryggehotell',
        type: 'Harbour-front hotel',
        price: '1,900–3,600 NOK/night',
        highlight:
          'Wooden hotel on the main harbour with rooms facing the water. Quieter after the day-trippers leave. Restaurant on site. Walking distance to Fiskekrogen and Trevarefabrikken.',
      },
      {
        name: 'Nyvågar Rorbuhotell',
        type: 'Rorbu hotel',
        price: '1,800–3,400 NOK/night',
        highlight:
          'In Kabelvåg, 15 minutes from Henningsvær on the E10. Collection of rorbu-style cabins around a protected harbour. Good breakfast. Easier parking than Henningsvær itself.',
      },
      {
        name: 'Private rorbu rentals',
        type: 'Self-catering cabin',
        price: '1,400–2,600 NOK/night',
        highlight:
          'Small number of private rorbu and apartment rentals in Henningsvær itself. Book 4–6 months ahead for summer via Booking.com or direct with owners.',
      },
    ],
    dining: [
      {
        name: 'Fiskekrogen',
        detail:
          'On a small islet connected by footbridge. Fish soup is the house speciality — recipe unchanged since the restaurant opened in 1989. Skrei in season. Reservation essential in summer. 400–700 NOK mains.',
      },
      {
        name: 'Trevarefabrikken',
        detail:
          'Former cod-liver-oil factory turned cultural centre. Bakery, café, wood-fired pizza, seasonal dinners. Sauna on the pier. Concerts and film screenings in summer.',
      },
      {
        name: 'Klatrekaféen',
        detail:
          'The climbers\' café at the north of the village. Coffee, cake, basic lunch. Run by the Nord Norsk Klatreskole (Northern Norway Climbing School). Casual, cheap, opens early.',
      },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Joker Henningsvær on the main square. Small but covers essentials. Closes early.' },
      { label: 'Fuel', available: false, detail: 'No fuel in Henningsvær. Nearest at Kabelvåg or Svolvær.' },
      { label: 'EV charging', available: true, detail: 'Slow chargers at Henningsvær Bryggehotell. Rapid charging at Svolvær.' },
      { label: 'Pharmacy', available: false, detail: 'No pharmacy. Nearest in Svolvær (20 min) or Leknes (1 hr 10 min).' },
      { label: 'Parking', available: true, detail: 'Paid parking at the village entrance. The old road is single-lane — do not attempt to drive through in summer.' },
      { label: 'Hospital', available: false, detail: 'Nordlandssykehuset Lofoten in Gravdal, 1 hr 20 min by car. Emergency: 113.' },
    ],
    insiderTip:
      'Visit Henningsvær after 17:00 in summer. The cruise-ship and bus day-trippers leave between 16:00 and 17:00 and the village resets. The light on the harbour between 20:00 and midnight in June–July is the reason photographers come here. The football pitch on the rocks (Henningsvær stadion) sits on the outermost island — walk the 15 minutes out at 22:00 when the midnight sun is low and you will have it to yourself.',
  },
  {
    id: 'reine',
    label: 'Reine',
    icon: Mountain,
    name: 'Reine (south Moskenesøya)',
    tagline: 'The postcard village at the foot of Reinebringen',
    population: '300 residents',
    distanceToCentre: '2 hours from Svolvær (E10)',
    overview:
      'Reine sits at the end of the E10 road corridor on Moskenesøya, at the point where Reinefjord opens onto Vestfjord. Reinebringen (448m) rises directly above the village — the Nepalese sherpa-built staircase starts 800 metres from the centre. Reine, Hamnøy, and Sakrisøya are effectively one cluster of rorbu colonies separated by short bridges. Accommodation is almost entirely rorbu-based. Restaurant choice is thin compared with Svolvær. Base here if the south of Lofoten is the trip.',
    bestFor: [
      'Photographers targeting Reinebringen and Hamnøy',
      'Hikers doing the Munkebu–Hermannsdalstinden traverse',
      'Travellers with 2+ nights who want to skip the Svolvær–Reine drive',
      'Self-catering travellers (most rorbu have full kitchens)',
    ],
    notIdealFor: [
      'Travellers relying on restaurants every night (limited options)',
      'First-time Lofoten visitors without a rental car',
      'Winter visitors — several businesses close November to February',
    ],
    accommodation: [
      {
        name: 'Reine Rorbuer',
        type: 'Heritage rorbu',
        price: '2,600–5,200 NOK/night',
        highlight:
          'Classic red rorbu colony on the Reine harbour, part of the Classic Norway collection. Gammelbua restaurant on site — one of the two serious dinner options in Reine. Wood stoves, full kitchens, fjord views from most cabins.',
      },
      {
        name: 'Eliassen Rorbuer (Hamnøy)',
        type: 'Heritage rorbu',
        price: '2,400–4,800 NOK/night',
        highlight:
          'The rorbu you have seen in every Lofoten photograph — red cabins on stilts with the Olstind mountain behind. 3 minutes drive from Reine. Self-catering. No on-site restaurant. Book 6+ months ahead for summer.',
      },
      {
        name: 'Sakrisøy Rorbuer',
        type: 'Yellow heritage rorbu',
        price: '2,200–4,400 NOK/night',
        highlight:
          'The yellow rorbu cluster on Sakrisøya islet, between Reine and Hamnøy. Anita\'s Sjømat fish shop and deli operates from the same quay. Quieter than Reine itself. Full kitchens.',
      },
      {
        name: 'Holmen Lofoten',
        type: 'Design lodge',
        price: '3,500–7,000 NOK/night',
        highlight:
          'Design-led retreat in Sørvågen, 5 minutes from Reine. Smaller scale, more refined than traditional rorbu. Tasting-menu dinners included in some rates. For the high-end stay.',
      },
    ],
    dining: [
      {
        name: 'Gammelbua (Reine Rorbuer)',
        detail:
          'Serious dinner in Reine. Skrei in season, stockfish, bacalao. Booking essential in summer. 500–750 NOK mains.',
      },
      {
        name: 'Anita\'s Sjømat (Sakrisøya)',
        detail:
          'Fish shop, deli, and café combined. Stockfish burger, fishcakes, skrei sandwich. Casual lunch, not dinner. Closes 18:00.',
      },
      {
        name: 'Maren Anna (Sørvågen)',
        detail:
          '10 minutes from Reine on the E10. Small harbour-front kitchen serving fish soup, cod, and classic Norwegian home cooking. Good mid-range dinner when Gammelbua is full.',
      },
      {
        name: 'Holmen Restaurant (Sørvågen)',
        detail:
          'Restaurant at Holmen Lofoten. Set tasting menu, reservation-only. Not a walk-in option. 1,400–1,800 NOK per person.',
      },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Coop Marked Reine in the village centre. Small. Closes 20:00 weekdays, earlier at weekends.' },
      { label: 'Fuel', available: true, detail: 'Shell Sørvågen, 5 minutes south. Last fuel stop before Å.' },
      { label: 'EV charging', available: true, detail: 'Rapid chargers at the Moskenes ferry quay and in Sørvågen.' },
      { label: 'Pharmacy', available: false, detail: 'No pharmacy. Nearest in Leknes, 1 hour by car.' },
      { label: 'Moskenes ferry', available: true, detail: 'Bodø–Moskenes car ferry terminal 5 minutes from Reine. 3–4 sailings daily in summer.' },
      { label: 'Hospital', available: false, detail: 'Nordlandssykehuset Lofoten in Gravdal, 1 hour by car. Emergency: 113.' },
    ],
    insiderTip:
      'Start the Reinebringen climb at 05:00 in June–July. The sherpa staircase takes 45 minutes to the viewpoint. By 08:00 there are 100 people at the top. By 10:00 there are 300. The village wakes up around 09:30 and the bakery at Reine Rorbuer opens at 08:00 — be back from the climb, fed, and ready to drive Hamnøy before the buses reach Reine around 11:00.',
  },
  {
    id: 'a',
    label: 'Å',
    icon: Ship,
    name: 'Å (end of the E10)',
    tagline: 'The last village on the road — Stockfish Museum and quiet harbours',
    population: '150 residents',
    distanceToCentre: '2 hr 20 min from Svolvær',
    overview:
      'Å sits at the southern tip of Moskenesøya, at the end of the E10. The village is a living open-air museum: the Norwegian Fishing Village Museum occupies the old waterfront buildings and the Norwegian Stockfish Museum sits on the harbour. Population is tiny. The Bodø–Moskenes ferry lands 10 minutes north. Accommodation is almost entirely heritage rorbu rented through the museum foundation. Choose Å if you want the quietest base in Lofoten and do not mind driving 30 minutes for a restaurant that is not the village café.',
    bestFor: [
      'Cultural-interest travellers (stockfish and fishing heritage)',
      'Visitors wanting a genuinely quiet base',
      'Moskenes ferry passengers arriving from Bodø',
      'Photographers targeting the Å harbour and Bunes beach',
    ],
    notIdealFor: [
      'Travellers wanting restaurant choice',
      'Winter visitors — most businesses close November to February',
      'Anyone on a short 2–3 night trip (too far from Svolvær logistics)',
    ],
    accommodation: [
      {
        name: 'Å Rorbuer',
        type: 'Heritage rorbu',
        price: '1,800–3,400 NOK/night',
        highlight:
          'The rorbu collection run by the Lofoten Museum Foundation. Historic fishermen\'s cabins with period fittings updated with modern kitchens and bathrooms. Full self-catering. Breakfast available at the village bakery.',
      },
      {
        name: 'Å Hamna',
        type: 'Apartment + rorbu',
        price: '1,600–3,000 NOK/night',
        highlight:
          'Family-run collection of cabins and apartments around the inner harbour. Good for groups of 4–6. Quieter than Å Rorbuer itself. Full kitchens.',
      },
      {
        name: 'Moskenes Feriesenter (Sørvågen side)',
        type: 'Camping + cabins',
        price: '950–1,900 NOK/night',
        highlight:
          'Budget cabin option 10 minutes from Å near the Moskenes ferry terminal. Sauna, campsite, cabins sleeping 2–6. A genuine lower-cost base when rorbu rates climb in July.',
      },
    ],
    dining: [
      {
        name: 'Bakery at Å Rorbuer',
        detail:
          'The restored 1844 village bakery operating as a living museum in summer. Cinnamon buns, bread, coffee. Opens 08:00. Not a dinner restaurant.',
      },
      {
        name: 'Brygga Restaurant (Å)',
        detail:
          'Seasonal restaurant on the Å harbour. Fish soup, cod, classic fare. Summer only (May–September). Limited opening days outside peak — call ahead.',
      },
      {
        name: 'Maren Anna (Sørvågen)',
        detail:
          '15 minutes north by car. The nearest reliable dinner option. Book if driving after a day at Å.',
      },
      {
        name: 'Self-catering reality',
        detail:
          'Most travellers in Å cook at the rorbu. Stock up at the Coop in Reine or the Joker in Sørvågen. No shop in Å itself.',
      },
    ],
    services: [
      { label: 'Grocery', available: false, detail: 'No shop in Å. Nearest at Joker Sørvågen (10 min) or Coop Reine (15 min).' },
      { label: 'Fuel', available: false, detail: 'No fuel in Å. Nearest Shell at Sørvågen (10 min). Fill up before heading south.' },
      { label: 'EV charging', available: true, detail: 'Slow chargers at Å Rorbuer. Rapid charging at Moskenes ferry terminal.' },
      { label: 'Pharmacy', available: false, detail: 'No pharmacy. Nearest in Leknes, 1 hour 15 min by car.' },
      { label: 'Moskenes ferry', available: true, detail: 'Bodø ferry terminal 10 minutes north. 3–4 sailings daily in summer, 1–2 in winter.' },
      { label: 'Hospital', available: false, detail: 'Nordlandssykehuset Lofoten in Gravdal, 1 hr 15 min by car. Emergency: 113.' },
    ],
    insiderTip:
      'The Bunes beach hike starts with a short ferry from Reinehavn to Vindstad (15 min sailing, 4 departures daily in summer), then a 40-minute walk across a pass to an empty white-sand beach facing Vestfjord. Overnight wild camping is allowed under Allemannsretten at least 150 metres from the nearest building — not a bad option with Fjellvettreglene Rule 1 (plan the trip, tell someone where you are going) in mind.',
  },
];

export function LofotenBasecamps() {
  const [activeBase, setActiveBase] = useState<string>('svolvaer');

  const base = basecamps.find((b) => b.id === activeBase) ?? basecamps[0];

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">
          Where to base yourself
        </h2>
      </div>
      <div className="max-w-3xl space-y-4 mb-8">
        <p className="text-slate-600 leading-relaxed">
          Four bases, each with a different trade-off. Svolvær gives you transport
          links and restaurants. Henningsvær is a working harbour with a serious
          food scene in a 500-person village. Reine puts you at the foot of
          Reinebringen and the postcard rorbu. Å is the quietest, at the end of
          the E10, with the Stockfish Museum on its doorstep.
        </p>
      </div>

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

      <div className="space-y-6">
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
              {base.distanceToCentre}
            </span>
          </div>
        </div>

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

        <div className="grid lg:grid-cols-2 gap-6">
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

          <div className="space-y-6">
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
                  Peak summer (Jun–Aug):
                </span>{' '}
                Book rorbu 6–9 months ahead. Eliassen Rorbuer on Hamnøy and
                Reine Rorbuer sell out by February for July dates.{' '}
                <span className="font-semibold text-slate-800">
                  Skrei season (Jan–Apr):
                </span>{' '}
                3–4 months ahead for fishing-focused accommodation in Svolvær
                and Henningsvær. Aurora visitors compete for the same rooms.{' '}
                <span className="font-semibold text-slate-800">
                  Shoulder (May, Sep–Oct):
                </span>{' '}
                4–6 weeks lead time usually enough. Prices 25–35% lower than
                July, weather still workable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
