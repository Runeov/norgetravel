'use client';

import { useState } from 'react';
import {
  MapPin,
  Bed,
  UtensilsCrossed,
  ShoppingBag,
  Clock,
  Users,
  Ship,
  Car,
  AlertTriangle,
  CheckCircle,
  X,
  Info,
  Train,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface InternalAccommodationTags {
  coords?: { lat: number; lng: number };
  budget?: 'free' | 'budget' | 'mid-range' | 'luxury';
  seasons?: Array<'winter' | 'spring' | 'summer' | 'autumn'>;
  familyFriendly?: boolean;
  indoor?: boolean;
}

interface Accommodation {
  name: string;
  type: string;
  price: string;
  highlight: string;
  internal?: InternalAccommodationTags;
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
  locationNote: string;
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
    id: 'flam',
    label: 'Flam',
    icon: Train,
    name: 'Flam',
    tagline: '350 residents, 1.4 million visitors per year',
    population: '~350 permanent residents',
    locationNote: 'Head of Aurlandsfjord — Flam Railway terminus',
    overview:
      'Flam sits at the bottom of the Flam Railway and the Naeroyfjord ferry departure point. It is the busiest tourist access point in the Sognefjord system, with 1.4 million visitors passing through annually. The village fills completely between 10:00 and 16:00 in July when cruise ships tender passengers ashore. After 17:00, the place empties and the fjord is yours.',
    bestFor: [
      'Accessing the Flam Railway and Naeroyfjord ferry',
      'Norway in a Nutshell travellers',
      'Short stays (1–2 nights)',
      'Travellers who want services within walking distance',
    ],
    notIdealFor: [
      'Budget travellers (tourist-priced across the board)',
      'Anyone who dislikes crowds between 10:00 and 16:00',
      'Quiet escapes — Flam is a transit hub, not a retreat',
    ],
    accommodation: [
      {
        name: 'Fretheim Hotel',
        type: '4-star historic hotel',
        price: '1,500–3,500 NOK/night',
        highlight:
          'The original 1866 wooden hotel building is still standing. 87 rooms. Restaurant and bar on-site. Located at the fjord edge, 200m from the Flam Railway station. The historic wing has smaller rooms with original fittings — worth asking for specifically.',
        internal: {
          coords: { lat: 60.8632, lng: 7.1136 },
          budget: 'mid-range',
          seasons: ['winter', 'spring', 'summer', 'autumn'],
          familyFriendly: true,
          indoor: true,
        },
      },
      {
        name: 'Flam Marina & Apartments',
        type: 'Apartment / self-catering',
        price: '1,200–2,500 NOK/night',
        highlight:
          'Modern apartments directly on the harbour. Some units have fjord-facing terraces. Kitchen included — useful for multi-night stays when you want to avoid tourist-priced restaurants every evening.',
        internal: {
          coords: { lat: 60.8632, lng: 7.1136 },
          budget: 'mid-range',
          seasons: ['winter', 'spring', 'summer', 'autumn'],
          familyFriendly: true,
          indoor: true,
        },
      },
      {
        name: 'Flam Camping',
        type: 'Camping + cabins',
        price: '200–250 NOK (tent) / cabins from 800 NOK',
        highlight:
          '2 km from the village centre. Pitches with fjord views. Basic sanitary facilities. The cheapest option in the area and genuinely pleasant in good weather. Bring your own bedding for cabins.',
        internal: {
          coords: { lat: 60.8632, lng: 7.1136 },
          budget: 'budget',
          seasons: ['spring', 'summer', 'autumn'],
          familyFriendly: true,
          indoor: true,
        },
      },
    ],
    dining: [
      {
        name: 'Ægir Brewery Restaurant',
        detail:
          'Viking longhouse exterior in the village. House-brewed beers. Pork ribs and smoked salmon are the reliable mains. Outdoor terrace facing the Flam Railway platform. Book ahead for dinner in July.',
      },
      {
        name: 'Flamsbrygga',
        detail:
          'Harbour-side restaurant. Fish soup and grilled fish from Sognefjord. Better for lunch than dinner — the menu is simpler and prices slightly lower than Ægir.',
      },
      {
        name: 'Fretheim Hotel Restaurant',
        detail:
          'Traditional Norwegian dining in the historic hotel. Local lamb and cured fish. Book 24 hours ahead for dinner — hotel guests compete with walk-ins for limited covers.',
      },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Joker Flam. Small but stocked daily. The only grocery store in the village.' },
      { label: 'Fuel', available: true, detail: 'One fuel station in the village. Fill up in Aurland or Voss for better prices.' },
      { label: 'EV charging', available: true, detail: 'Charging points at Flam Marina and the hotel car park. Verify availability at Fretheim Hotel.' },
      { label: 'Pharmacy', available: false, detail: 'No pharmacy. Nearest in Aurland (10 km) or Voss (55 km).' },
      { label: 'Parking', available: true, detail: 'Several car parks near the harbour. Paid April–October. Fill by 10:00 on peak days.' },
      { label: 'Medical', available: false, detail: 'No medical centre. Nearest hospital: Voss (55 km). Emergency: 113.' },
    ],
    insiderTip:
      'The Naeroyfjord ferry first departure is often 08:30 or 09:00 in summer. Take it. The fjord is empty, the light is different, and Gudvangen before 11:00 is a different place than at 14:00.',
  },
  {
    id: 'gudvangen',
    label: 'Gudvangen',
    icon: Ship,
    name: 'Gudvangen',
    tagline: 'Western end of Naeroyfjord — the quiet alternative',
    population: '~75 permanent residents',
    locationNote: 'Base of Stalheimskleiva — 18 km by water from Flam',
    overview:
      'Gudvangen sits at the western end of Naeroyfjord, where the fjord meets the Nærøydalen valley. It is a fraction of Flam\'s size with a fraction of its crowds. The Viking Village is the main attraction on land. The Naeroyfjord ferry departs from here toward Flam. Most travellers pass through; few stay overnight. The ones who do get the fjord to themselves in the evening.',
    bestFor: [
      'Starting the Naeroyfjord kayaking (departs from Viking Village)',
      'Travellers completing the Nutshell route in this direction (arriving at Gudvangen)',
      'Quiet overnight stays away from Flam crowds',
      'Access to Stalheimskleiva viewpoint and hike',
    ],
    notIdealFor: [
      'Multi-day stays (services are extremely limited)',
      'Travellers who need a pharmacy, grocery, or fuel within walking distance',
      'Families expecting hotel-level amenities',
    ],
    accommodation: [
      {
        name: 'Gudvangen Fjordtell',
        type: 'Camping + basic cabins',
        price: '180–220 NOK (tent) / cabins from 650 NOK',
        highlight:
          'Basic but functional. The site is at the valley floor with views up toward the fjord entrance. Sanitary facilities on-site. The cheapest basecamp in the Naeroyfjord area.',
        internal: {
          coords: { lat: 60.8710, lng: 6.8413 },
          budget: 'budget',
          seasons: ['spring', 'summer', 'autumn'],
          familyFriendly: true,
          indoor: true,
        },
      },
      {
        name: 'Gudvangen Viking Village accommodation',
        type: 'Longhouse / communal lodging',
        price: 'From 500 NOK per person',
        highlight:
          'Sleep in the Viking Village settlement — communal longhouse-style accommodation open May to September. Not for everyone, but an unusual experience. Breakfast included. Book via the Viking Village directly.',
        internal: {
          coords: { lat: 60.8710, lng: 6.8413 },
          budget: 'budget',
          seasons: ['spring', 'summer', 'autumn'],
          familyFriendly: false,
          indoor: true,
        },
      },
    ],
    dining: [
      {
        name: 'Viking Village open-fire kitchen',
        detail:
          'Traditional food cooked on open hearths during operating hours (May–September). Smoked meats, flatbreads, and Viking-era recipes. Cultural experience with a meal included. Open to day visitors.',
      },
      {
        name: 'Gudvangen Fjordtell café',
        detail:
          'Basic café at the camping site. Coffee, sandwiches, and simple hot meals. Open to non-guests. The only other food option in Gudvangen.',
      },
    ],
    services: [
      { label: 'Grocery', available: false, detail: 'No grocery store. Nearest: Flam (18 km by water) or Voss (40 km by car).' },
      { label: 'Fuel', available: false, detail: 'No fuel station. Fill up in Flam, Aurland, or Voss before arriving.' },
      { label: 'EV charging', available: false, detail: 'No reliable public charging in Gudvangen. Charge before arriving.' },
      { label: 'Pharmacy', available: false, detail: 'No pharmacy. Nearest: Voss (40 km).' },
      { label: 'Parking', available: true, detail: 'Large car park at the Naeroyfjord ferry terminal. Paid in summer.' },
      { label: 'Medical', available: false, detail: 'No medical facility. Emergency: 113.' },
    ],
    insiderTip:
      'The Gudvangen Viking Village opens at 10:00. Arrive at 09:30, before the Nutshell tour groups from Bergen arrive by ferry at around 12:00. Two hours here before the crowds is the difference between a genuine visit and a queue.',
  },
  {
    id: 'aurland',
    label: 'Aurland',
    icon: MapPin,
    name: 'Aurland',
    tagline: 'The quiet middle — Stegastein above, fjord below',
    population: '~1,700 (municipality) / ~500 in the village',
    locationNote: '10 km from Flam along Aurlandsfjord',
    overview:
      'Aurland village sits 10 km from Flam on the same fjord branch. It is smaller, quieter, and significantly less crowded. The Stegastein viewpoint (650 m above the fjord) is accessible from here by road or on foot. Aurland makes a better overnight base than Flam for travellers who want to access both the Naeroyfjord ferry (at Flam) and the surrounding hiking without being in the middle of the tourist transit.',
    bestFor: [
      'Travellers who want quiet evenings after Flam day trips',
      'Hikers targeting Stegastein from below',
      'Couples and independent travellers who find Flam too busy',
      'Travellers with cars who want easy fjord access without the Flam parking problem',
    ],
    notIdealFor: [
      'Travellers without a car (Aurland has very limited bus connections)',
      'Anyone expecting the same range of restaurants as Flam',
    ],
    accommodation: [
      {
        name: 'Aurland Fjordhotel',
        type: '3-star hotel',
        price: '1,200–2,500 NOK/night',
        highlight:
          'On the Aurland waterfront. Restaurant on-site. 20 rooms. The fjord view from the upper rooms is better than anything available in Flam at the same price point.',
        internal: {
          coords: { lat: 60.9050, lng: 7.1855 },
          budget: 'mid-range',
          seasons: ['winter', 'spring', 'summer', 'autumn'],
          familyFriendly: true,
          indoor: true,
        },
      },
      {
        name: 'Lunde Camping',
        type: 'Camping + cabins',
        price: '190–220 NOK (tent) / cabins from 700 NOK',
        highlight:
          'Small, family-run site 2 km from Aurland village. Fjord-edge pitches. Quieter than Flam Camping. Book ahead for cabins in July.',
        internal: {
          coords: { lat: 60.9050, lng: 7.1855 },
          budget: 'budget',
          seasons: ['spring', 'summer', 'autumn'],
          familyFriendly: true,
          indoor: true,
        },
      },
    ],
    dining: [
      {
        name: 'Aurland Fjordhotel restaurant',
        detail:
          'The main dining option in Aurland. Traditional Norwegian menu. Dinner service 18:00–21:00. Book if you are not a hotel guest. Local lamb and fish dishes.',
      },
      {
        name: 'Cafés and local shops',
        detail:
          'Aurland village has a small grocery and a couple of cafés for lunch. Limited evening dining outside the hotel — stock up in Flam if you plan a self-catering evening.',
      },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Small local shop in the village. Limited range — stock up in Flam for extended stays.' },
      { label: 'Fuel', available: true, detail: 'One fuel station on the main road through Aurland.' },
      { label: 'EV charging', available: true, detail: 'Several charging points in Aurland. Check Chargemap for current availability.' },
      { label: 'Pharmacy', available: false, detail: 'No pharmacy. Nearest: Voss (55 km) or Laerdal (35 km).' },
      { label: 'Parking', available: true, detail: 'Free parking throughout Aurland. No paid zones — a major advantage over Flam.' },
      { label: 'Medical', available: false, detail: 'No medical facility. Emergency: 113.' },
    ],
    insiderTip:
      'Drive the Rv243 from Aurland up to Stegastein at sunset. The road closes for winter but in June to September the evening light on the Aurlandsfjord from 650 meters is worth the 20-minute drive. Return to Aurland for dinner — the hotel restaurant takes walk-ins until 20:30.',
  },
];

type TabId = 'flam' | 'gudvangen' | 'aurland';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function NaeroyfjordBasecamps() {
  const [activeBase, setActiveBase] = useState<string>('flam');

  const base = basecamps.find((b) => b.id === activeBase) ?? basecamps[0];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">
          Where to base yourself at Naeroyfjord
        </h2>
      </div>
      <div className="max-w-3xl mb-8">
        <p className="text-slate-600 leading-relaxed">
          Three towns on the same fjord system, each with a different energy. Flam is the transit
          hub. Gudvangen is the quiet western entry. Aurland is the underrated middle option for
          travellers who want fjord access without the Flam crowds.
        </p>
      </div>

      {/* Basecamp tabs */}
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
            <MapPin className="w-5 h-5 text-[#5CBFEE] mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-bold text-slate-800">{base.name}</h3>
              <p className="text-sm text-slate-500">{base.tagline}</p>
            </div>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mt-3 mb-5">{base.overview}</p>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-sm text-xs font-medium text-slate-700">
              <Users className="w-3 h-3 text-[#1A365D]" aria-hidden="true" />
              {base.population}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-sm text-xs font-medium text-slate-700">
              <Car className="w-3 h-3 text-[#1A365D]" aria-hidden="true" />
              {base.locationNote}
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
          {/* Left: Accommodation + Dining */}
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
                      <p className="font-bold text-slate-800 text-sm">{acc.name}</p>
                      <span className="text-xs text-slate-500 shrink-0">{acc.type}</span>
                    </div>
                    <p className="text-xs font-medium text-[#1A365D] mb-1.5">{acc.price}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{acc.highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                <UtensilsCrossed className="w-4 h-4 text-[#1A365D]" aria-hidden="true" />
                Dining
              </h4>
              <div className="space-y-4">
                {base.dining.map((d) => (
                  <div key={d.name}>
                    <p className="font-bold text-slate-800 text-sm mb-0.5">{d.name}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{d.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Services + Insider tip */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                <ShoppingBag className="w-4 h-4 text-[#1A365D]" aria-hidden="true" />
                Practical services
              </h4>
              <div className="space-y-3">
                {base.services.map((svc) => (
                  <div key={svc.label} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {svc.available ? (
                        <CheckCircle className="w-3.5 h-3.5 text-[#00D084]" aria-hidden="true" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{svc.label}</p>
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
              <p className="text-xs text-slate-700 leading-relaxed">{base.insiderTip}</p>
            </div>
          </div>
        </div>

        {/* Booking lead times */}
        <div className="bg-slate-50 rounded-lg border border-slate-200 p-5">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#1A365D] mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold text-slate-800 mb-1">Booking lead times</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-800">Peak July:</span> Book Fretheim
                Hotel 2–4 months ahead. Flam Marina apartments fill quickly. Camping has more
                last-minute availability.{' '}
                <span className="font-semibold text-slate-800">September:</span> 2–4 weeks is
                usually sufficient. Expect 25–35% lower rates than July. Mid-range hotel reality:
                1,500–3,000 NOK/night in July, 1,000–2,000 NOK/night in September.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
