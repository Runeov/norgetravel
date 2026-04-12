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
  Building,
  Waves,
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
    id: 'sentrum',
    label: 'Sentrum',
    icon: Building,
    name: 'Sentrum (city centre)',
    tagline: 'Walking distance to the harbour, Storgata, and tour pickups',
    population: 'Tromsøya island',
    distanceToCentre: 'You are here',
    overview:
      'The waterfront strip on Tromsøya island. Where most first-time visitors should stay. Scandic Ishavshotel and Clarion The Edge sit directly on the harbour with fjord-view rooms. Tour operators pick up almost hourly from the Scandic during aurora season. Walk to Mathallen food hall, the Polar Museum, Macks brewery, and every serious restaurant in the city.',
    bestFor: [
      'First-time visitors to Tromsø',
      'Travellers without a rental car',
      'Aurora chasers using commercial tour pickups',
      'Whale-watching passengers (harbour departures)',
      'Anyone wanting dinner options within walking distance',
    ],
    notIdealFor: [
      'Dark-sky aurora viewing from your balcony (light pollution)',
      'Budget travellers in peak aurora season (prices spike)',
      'Travellers wanting quiet (Storgata is active until late)',
    ],
    accommodation: [
      {
        name: 'Scandic Ishavshotel',
        type: '4-star hotel',
        price: '2,200–4,500 NOK/night',
        highlight:
          'Directly on the harbour with triangular glass facade and fjord-view rooms. The operational heart of Tromsø tourism. Most aurora and whale-watching tour pickups depart from the lobby. Panorama bar on the top floor. Breakfast included.',
      },
      {
        name: 'Clarion Collection Hotel With',
        type: '4-star hotel',
        price: '1,900–4,000 NOK/night',
        highlight:
          'Formerly The Edge, now Clarion Collection With. Tallest building in Tromsø. Rooftop restaurant and bar on the 11th floor with panoramic harbour and Arctic Cathedral views. Free afternoon waffles and evening meal for guests.',
      },
      {
        name: 'Radisson Blu Hotel Tromsø',
        type: '4-star hotel',
        price: '1,800–3,800 NOK/night',
        highlight:
          'Central Storgata location. Reliable mid-to-upper range. Yonas restaurant downstairs. Good fallback when Scandic and Clarion are full (which is often in January–March).',
      },
      {
        name: 'Smarthotel Tromsø',
        type: 'Budget hotel',
        price: '1,100–2,200 NOK/night',
        highlight:
          'Compact rooms, central location. The genuine budget option in Sentrum during aurora season. No restaurant, no extras. Book early.',
      },
    ],
    dining: [
      {
        name: 'Emmas Drømmekjøkken',
        detail:
          'Local institution since 1999. Scandinavian fine dining upstairs, bistro (Emmas Under) downstairs. Arctic char, reindeer, king crab. 500–800 NOK mains. Book 2–3 weeks ahead in aurora season.',
      },
      {
        name: 'Bardus Bistro',
        detail:
          'Small modern Nordic kitchen attached to the Tromsø Culture House. Seasonal menu, short and confident. Popular with locals. 400–650 NOK mains.',
      },
      {
        name: 'Fiskekompaniet',
        detail:
          'Harbour-front seafood restaurant. King crab, scallops, halibut. Straightforward preparation, premium ingredients. 450–750 NOK mains.',
      },
      {
        name: 'Mathallen Tromsø',
        detail:
          'Food hall on Grønnegata. Local producers under one roof: Arctic cheeses, smoked fish, bakery, small café. Lunch stop, not dinner.',
      },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Kiwi, Rema 1000, Coop Mega within 5 minutes walking.' },
      { label: 'Car rental', available: true, detail: 'Hertz, Avis, Europcar. Airport pickup recommended over city desks.' },
      { label: 'EV charging', available: true, detail: 'Multiple hotel-linked and public chargers. Fjellheisen has rapid chargers.' },
      { label: 'Pharmacy', available: true, detail: 'Apotek 1 on Storgata. 24-hour service via phone order.' },
      { label: 'Hospital', available: true, detail: 'UNN Tromsø – University Hospital of Northern Norway. Emergency: 113.' },
      { label: 'Tour pickups', available: true, detail: 'Scandic Ishavshotel and Radisson Blu are primary aurora tour pickup points.' },
    ],
    insiderTip:
      'Book aurora tours before you book the hotel, not after. Operators sell out 4–6 weeks ahead in January–March. If your preferred tour (Chasing Lights, Tromsø Friluftsenter) is full on night 1 but available on night 3, align your dates. The hotel will always have a room somewhere in Sentrum.',
  },
  {
    id: 'tromsdalen',
    label: 'Tromsdalen',
    icon: Mountain,
    name: 'Tromsdalen (mainland side)',
    tagline: 'Arctic Cathedral and Fjellheisen cable car at your door',
    population: 'Mainland side of Tromsø bridge',
    distanceToCentre: '10 minutes by car or bus from Sentrum',
    overview:
      'The eastern side of the bridge where the Arctic Cathedral sits on the waterfront and the Fjellheisen cable car climbs to 421m. Quieter than Sentrum, with darker sky at the base of Storsteinen. Bus 26 runs to the city centre every 10–15 minutes. Better aurora viewing from your window if skies cooperate, but noticeably fewer dining options after dark.',
    bestFor: [
      'Repeat visitors who have done Sentrum and want quieter nights',
      'Aurora viewers who want to step outside the hotel and look up',
      'Travellers using Fjellheisen cable car daily',
      'Families preferring to be out of the pub district',
    ],
    notIdealFor: [
      'First-time visitors (logistics cost of crossing the bridge)',
      'Travellers relying on walk-in restaurants at 21:00',
      'Anyone without a car or confidence with the bus network',
    ],
    accommodation: [
      {
        name: 'Tromsø Lodge & Camping',
        type: 'Cabins + camping',
        price: '950–1,900 NOK/night (cabin)',
        highlight:
          'Riverside cabins at the base of Tromsdalen valley. 2 km from Fjellheisen. Sauna, self-catering kitchen, cabin sleeps 2–6. A genuine budget option with darker sky than anywhere in Sentrum.',
      },
      {
        name: 'Private cabins and apartments',
        type: 'Airbnb / Novasol / Finn.no',
        price: '1,000–2,200 NOK/night',
        highlight:
          'The realistic Tromsdalen stock. Hotels on this side of the bridge are thin — most visitors who want the eastern base rent a private apartment or cabin around Tromsdalen, Solligården, or the Fjellheisen approach. Book 2–3 months ahead in aurora season.',
      },
      {
        name: 'Honest note on hotels',
        type: 'Tromsdalen reality',
        price: '—',
        highlight:
          'There is no Radisson Blu, Scandic, or Clarion on the Tromsdalen side. Every major hotel chain in Tromsø is on Tromsøya island in Sentrum. If you want a branded 4-star with tour pickups at the lobby, stay in Sentrum. If you want dark sky and quiet, accept that the stock here is cabins and rentals.',
      },
    ],
    dining: [
      {
        name: 'Fjellstua (top of Fjellheisen)',
        detail:
          'Restaurant at 421m above the fjord. Panoramic glass dining room overlooking Tromsøya and the Lyngen Alps. Open evenings — ride the cable car up for dinner. Book ahead.',
      },
      {
        name: 'Egon Tromsdalen',
        detail:
          'Standard Norwegian chain. Reliable, open late, kid-friendly. Steaks, burgers, fish. Not ambitious but it is open when locals-only places close.',
      },
      {
        name: 'Bus 26 to Sentrum',
        detail:
          'For serious dining, plan to cross. 10 minutes by bus, 5 minutes by car. The eastern side is genuinely thin on restaurants after 20:00.',
      },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Rema 1000 and Coop within 10 minutes walking.' },
      { label: 'Fjellheisen cable car', available: true, detail: 'Up to Storsteinen (421m). Last departure 23:00 in summer, 22:30 in winter.' },
      { label: 'EV charging', available: true, detail: 'Rapid chargers at Fjellheisen base and Radisson Blu.' },
      { label: 'Pharmacy', available: false, detail: 'No pharmacy on this side. Nearest in Sentrum (10 min) or K1 shopping centre.' },
      { label: 'Bus to Sentrum', available: true, detail: 'Bus 26 every 10–15 minutes. Tickets via Svipper app.' },
      { label: 'Hospital', available: false, detail: 'UNN Tromsø is on the island. 10 minutes by car. Emergency: 113.' },
    ],
    insiderTip:
      'The Fjellheisen cable car is the single best aurora viewing platform in the city. Ride up after 21:00 on a clear night with KP index 3 or above. The café on top serves hot chocolate and the terrace is wide enough to set up a tripod. Last descent 23:00 in summer, 22:30 in winter. Miss it and you walk 2.5 km down the Sherpa Stairs in the dark.',
  },
  {
    id: 'kvaloya',
    label: 'Kvaløya',
    icon: Waves,
    name: 'Kvaløya island',
    tagline: 'Dark-sky base with no light pollution, rental car required',
    population: 'Adjacent island, reached by Sandnessund bridge',
    distanceToCentre: '25 minutes by car, 45 by bus from Sentrum',
    overview:
      'The neighbouring island west of Tromsøya. Kaldfjord — the winter whale-watching fjord where 400–600 orca concentrate between November and January — is on the south side. Aurora viewing here is substantially better than from the city because there is no light pollution. Cabins and rorbu-style lodges dominate. This is where you base yourself if you have a rental car and want dark skies. Not for travellers eating out nightly.',
    bestFor: [
      'Travellers with a rental car and 4+ nights',
      'Serious aurora viewers (no light pollution)',
      'Winter whale-watching in Kaldfjord (Nov–Jan)',
      'Photographers with tripods and patience',
      'Couples wanting a cabin rather than a hotel',
    ],
    notIdealFor: [
      'Travellers without a car (bus is slow and infrequent)',
      'Anyone relying on walking to restaurants',
      'Short stays of 1–2 nights',
      'First-time visitors to Tromsø',
    ],
    accommodation: [
      {
        name: 'Arctic Panorama Lodge',
        type: 'Cabin lodge',
        price: '1,800–3,500 NOK/night',
        highlight:
          'Wooden cabins on the north shore of Kvaløya with direct fjord views. 30 minutes from Sentrum. Hot tubs, sauna, self-catering kitchens. Built for aurora viewing — large windows facing north.',
      },
      {
        name: 'Tromsø Ice Domes / Camp Tamok',
        type: 'Glass igloo + activity camp',
        price: '4,500–9,000 NOK/night',
        highlight:
          '75 km inland toward the Finnish border, not on Kvaløya itself but in the same dark-sky tier. Ice hotel suites and glass igloos with aurora views from the bed. Dog sled, snowmobile, and aurora chase included in some packages.',
      },
      {
        name: 'Kvaløya cabin rentals (Airbnb/Novasol)',
        type: 'Private cabin',
        price: '1,200–2,400 NOK/night',
        highlight:
          'Significant stock of private cabins around Eidkjosen, Ersfjordbotn, and Kaldfjord. Typically 2–6 bed with kitchen and wood stove. Cheapest dark-sky option. Book via Novasol or Airbnb.',
      },
      {
        name: 'Sommarøy Arctic Hotel',
        type: '3-star fjord hotel',
        price: '1,400–2,800 NOK/night',
        highlight:
          '60 km west on Sommarøy island at the end of the Kvaløya road. White-sand beaches (yes, at 69°N), fish restaurant, fjord-view rooms. Worth the drive for 2–3 nights.',
      },
    ],
    dining: [
      {
        name: 'Bryggejentene (Ersfjordbotn)',
        detail:
          'Small seasonal restaurant on the south Kvaløya coast. Local fish, short menu, casual. Open summer only. A destination lunch if you are hiking in the area.',
      },
      {
        name: 'Sommarøy Arctic Hotel restaurant',
        detail:
          'The main sit-down option on Kvaløya. Fish soup, halibut, lamb. Open year-round. 400–650 NOK mains.',
      },
      {
        name: 'Self-catering reality',
        detail:
          'Most cabins come with kitchens because dining options are thin. Stock up at Eurospar Kvaløysletta on arrival. Fish counter in the supermarket is genuinely good.',
      },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Eurospar Kvaløysletta and Coop Kvaløya at the bridge crossing.' },
      { label: 'Fuel', available: true, detail: 'Shell Kvaløysletta and Circle K near the bridge. Fill up before driving west.' },
      { label: 'EV charging', available: true, detail: 'Slow chargers at cabins. Rapid charger at Eurospar. Plan ahead for long drives.' },
      { label: 'Pharmacy', available: false, detail: 'No pharmacy on Kvaløya. Nearest in Sentrum (25 min).' },
      { label: 'Bus to Sentrum', available: true, detail: 'Bus 42 to Sentrum. Runs hourly, less at weekends. Not a practical aurora chase method.' },
      { label: 'Hospital', available: false, detail: 'UNN Tromsø is on Tromsøya. 25–30 minutes by car. Emergency: 113.' },
    ],
    insiderTip:
      'The west coast of Kvaløya — Ersfjordbotn, Tussøya, Sommarøy — has some of the best northern sky exposure in the region. If the forecast shows clear sky west but cloud east, drive out rather than chase with a tour. KP index 3 and a clear night from Ersfjord gives you a display unfiltered by city light. Bring a thermos, park at the shoreline, and wait.',
  },
];

export function TromsoBasecamps() {
  const [activeBase, setActiveBase] = useState<string>('sentrum');

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
          Three bases, each with a different trade-off between convenience,
          price, and dark sky. Sentrum puts you on the harbour with every tour
          pickup at the door. Tromsdalen buys you quiet nights and the
          Fjellheisen cable car. Kvaløya gives you no light pollution, if you
          have a rental car.
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
                  Aurora season (Nov–Mar):
                </span>{' '}
                Book hotels 3–6 months ahead. Sentrum fills first. Scandic
                Ishavshotel and Clarion With sell out by October for peak
                January–February dates.{' '}
                <span className="font-semibold text-slate-800">
                  Midnight sun (Jun–Jul):
                </span>{' '}
                2–3 months lead time usually enough. Prices 30–40% lower than
                aurora peak.{' '}
                <span className="font-semibold text-slate-800">
                  Shoulder (Sep–Oct, Apr–May):
                </span>{' '}
                Last-minute is often fine. Aurora is still possible in
                September, cheaper than January.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
