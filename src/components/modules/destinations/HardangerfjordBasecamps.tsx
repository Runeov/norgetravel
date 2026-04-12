'use client';

import { useState } from 'react';
import { MapPin, Mountain, Apple, Ship, Clock, CheckCircle, XCircle, Info, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Accommodation {
  name: string;
  type: string;
  priceRange: string;
  note: string;
  bookingUrl?: string;
}

interface DiningOption {
  name: string;
  type: string;
  priceRange: string;
  note: string;
}

interface Service {
  name: string;
  available: boolean;
  note?: string;
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

const basecamps: BasecampData[] = [
  {
    id: 'odda',
    label: 'Odda',
    icon: Mountain,
    name: 'Odda',
    tagline: 'The Trolltunga capital',
    population: '~7,200 residents',
    locationNote: 'Innermost point of Sørfjord, 174 km from Bergen',
    overview:
      'Odda sits where Sørfjord ends and the mountains close in. For most of the twentieth century, it was an industrial zinc and carbide town — the factory chimneys are still visible. Since Trolltunga became a phenomenon, the economy has pivoted hard toward outdoor tourism. This is where the majority of Trolltunga hikers sleep, eat, and prepare. The practical infrastructure for a 27-kilometre mountain hike — gear rental, shuttles, early-morning packed lunches, rescue insurance — exists here in a way it does not anywhere else on the fjord.',
    bestFor: [
      'Trolltunga hikers',
      'Multi-day Hardangervidda trekkers',
      'Travellers with early morning departure plans',
      'Budget to mid-range accommodation seekers',
    ],
    notIdealFor: [
      'Travellers who want to experience traditional fjord culture',
      'Those seeking luxury hotel stays',
      'Visitors focused on the apple orchard and cider trail',
    ],
    accommodation: [
      {
        name: 'Trolltunga Hotel',
        type: 'Hotel',
        priceRange: '900–1,800 NOK/night',
        note: 'Purpose-built for Trolltunga hikers. Gear storage, packed lunch service, shuttle pickup arranged at reception. Books out in July and August — reserve minimum 3 months ahead.',
        bookingUrl: 'https://www.booking.com/hotel/no/trolltunga.html',
      },
      {
        name: 'Odda Camping',
        type: 'Camping + Cabins',
        priceRange: '200 NOK tent / 600–900 NOK cabin',
        note: 'On the fjord shore 2 km from town. Tent sites, caravans, and basic cabins. Shared facilities. EV charging. Shuttle to Trolltunga trailhead available.',
      },
      {
        name: 'Buer Gard Camping',
        type: 'Farm camping',
        priceRange: '150–200 NOK tent',
        note: 'Seasonal farm camping closer to the Folgefonna glacier approach. Quiet, basic, operated by a working farm. No EV charging.',
      },
    ],
    dining: [
      {
        name: 'Hardanger Kafé',
        type: 'Café / Lunch',
        priceRange: '150–250 NOK',
        note: 'Practical pre-hike fuel: porridge, sandwiches, packed lunch boxes. Opens at 06:30 in high season. Popular with guided tour groups departing at dawn.',
      },
      {
        name: 'Fjordkroken',
        type: 'Restaurant / Bar',
        priceRange: '250–450 NOK',
        note: 'The most reliable dinner option in Odda. Norwegian staples — lamb, fish, reindeer — alongside pizza for those who exhausted themselves on the plateau. Booking recommended in July–August.',
      },
      {
        name: 'Odda ICA Supermarket',
        type: 'Grocery',
        priceRange: 'Market prices',
        note: 'Full-service grocery for self-catering hikers. Buy your Trolltunga supplies here rather than paying inflated prices at trailhead vending machines. Open 0800–2200 daily in summer.',
      },
    ],
    services: [
      { name: 'Petrol station', available: true, note: 'Esso and Circle K in town' },
      { name: 'EV charging', available: true, note: 'Multiple fast chargers near town centre' },
      { name: 'Supermarket', available: true, note: 'ICA and Coop in town centre' },
      { name: 'Gear rental', available: true, note: 'Trolltunga Active and local outdoor shops rent poles, crampons' },
      { name: 'Pharmacy', available: true, note: 'One pharmacy in town centre' },
      { name: 'Medical clinic', available: true, note: 'Odda legesenter — book ahead or use emergency number 116117' },
      { name: 'Trolltunga shuttle', available: true, note: 'Seasonal shuttle from town to Skjeggedal trailhead. Book at trolltunga.no' },
      { name: 'Tourist information', available: true, note: 'Seasonal visitor centre near the harbour' },
    ],
    insiderTip:
      'Book the Trolltunga shuttle at the same time you book accommodation — it fills before the hotels do in July. The shuttle departs Odda bus station from 05:30 in peak season. Miss it and your only option is a 300-NOK each-way toll road to Skjeggedal, which adds real cost to an already expensive day.',
  },
  {
    id: 'eidfjord',
    label: 'Eidfjord',
    icon: MapPin,
    name: 'Eidfjord',
    tagline: 'Gateway to Vøringsfossen and the plateau',
    population: '~1,000 residents',
    locationNote: 'Head of Eidfjord inlet, 155 km from Bergen',
    overview:
      'Eidfjord is the smallest of the four Hardangerfjord basecamps and the most dramatically situated. The village sits at the base of sheer rock walls where the fjord narrows to a gorge. Twelve kilometres up Rv7 is Vøringsfossen — 182-metre free fall, one of Norway\'s highest waterfalls — and from there the road climbs to the Hardangervidda plateau. Eidfjord is the starting point for the Rv7 National Tourist Route toward Geilo and, in the other direction, the gateway to the inner fjord by boat. It is quiet, uncrowded, and has a gentler pace than Odda.',
    bestFor: [
      'Vøringsfossen visitors',
      'Rv7 National Tourist Route travellers',
      'Hardangervidda day hikes',
      'Travellers who want a quieter base with strong scenery access',
    ],
    notIdealFor: [
      'Those needing train or express bus access from Bergen',
      'Trolltunga-focused hikers (75 km to Odda)',
      'Travellers requiring a full range of urban services',
    ],
    accommodation: [
      {
        name: 'Eidfjord Fjordhotel',
        type: 'Hotel',
        priceRange: '1,200–2,400 NOK/night',
        note: 'The main hotel in the village, directly on the fjord shore. Standard rooms, sauna, fjord-view restaurant. Books solid in summer — reserve early.',
        bookingUrl: 'https://www.booking.com/hotel/no/eidfjord.html',
      },
      {
        name: 'Fossli Hotel',
        type: 'Historic mountain hotel',
        priceRange: '1,500–2,800 NOK/night',
        note: 'Perched above Vøringsfossen at 620 metres, open since 1891. Views directly over the gorge. Historic, characterful, and priced accordingly. Full board packages available.',
      },
      {
        name: 'Eidfjord Camping',
        type: 'Camping',
        priceRange: '180–220 NOK tent',
        note: 'Flat, well-kept campsite at the fjord\'s edge. Seasonal, open May–September. Basic cabins also available at approximately 700 NOK.',
      },
    ],
    dining: [
      {
        name: 'Eidfjord Fjordhotel Restaurant',
        type: 'Hotel restaurant',
        priceRange: '280–500 NOK',
        note: 'The main dinner option in the village. Fish and Norwegian meat dishes. Views across the fjord. Non-guests welcome but booking is strongly advised in July–August.',
      },
      {
        name: 'Fossli Hotel restaurant',
        type: 'Mountain hotel restaurant',
        priceRange: '300–550 NOK',
        note: 'Open to non-guests. Traditional Norwegian three-course dinners. The location — 620 metres up with the gorge outside the window — is worth the price premium.',
      },
      {
        name: 'Eidfjord village café (seasonal)',
        type: 'Café',
        priceRange: '100–200 NOK',
        note: 'Small seasonal café in the village centre. Waffles, coffee, light sandwiches. Hours are irregular — check locally.',
      },
    ],
    services: [
      { name: 'Petrol station', available: true, note: 'One petrol station at the village junction' },
      { name: 'EV charging', available: true, note: 'Available at the petrol station and Fjordhotel car park' },
      { name: 'Supermarket', available: true, note: 'Small Coop grocery in the village' },
      { name: 'Pharmacy', available: false, note: 'Nearest pharmacy in Odda (75 km) or Norheimsund (50 km)' },
      { name: 'Medical clinic', available: false, note: 'No clinic in Eidfjord — Odda legesenter is the nearest' },
      { name: 'Gear rental', available: false, note: 'No outdoor gear rental locally. Bring or rent in Bergen or Odda.' },
      { name: 'Tourist information', available: true, note: 'Hardanger Naturhus visitor centre — geology, Hardangervidda exhibits, trail maps' },
    ],
    insiderTip:
      'Vøringsfossen is at its most powerful in late May and June, when snowmelt from the plateau is at peak volume. By late August the flow is noticeably reduced. If you have a choice of months, June gives you both the full waterfall and snow on the plateau backdrop.',
  },
  {
    id: 'lofthus',
    label: 'Lofthus',
    icon: Apple,
    name: 'Lofthus',
    tagline: 'Apple orchards, Ullensvang Hotel, and fjord serenity',
    population: '~800 in the municipality',
    locationNote: 'Western shore of Sørfjord, 140 km from Bergen',
    overview:
      'Lofthus is the apple orchard village of Hardangerfjord. The western slopes of Sørfjord at Lofthus catch the most sun on the fjord and grow apples, pears, and cherries on terraced hillsides that bloom in late April and early May. The Ullensvang Hotel has stood here since 1846 and remains one of the most historically significant hotels in Norway — Edvard Grieg composed here, and Kaiser Wilhelm II was a regular guest. Lofthus is the place to come if you want the fjord at a slower pace, the cider trail, and accommodation that has actually earned its view.',
    bestFor: [
      'Apple blossom season visitors (late April–mid May)',
      'Hardanger cider and orchard trail explorers',
      'Travellers who want a luxury or heritage hotel experience',
      'Couples and independent travellers who prefer atmosphere over services',
    ],
    notIdealFor: [
      'Trolltunga-bound hikers who need early shuttles',
      'Families needing a wide range of services and activities',
      'Budget travellers — accommodation prices here are higher',
    ],
    accommodation: [
      {
        name: 'Ullensvang Hotel',
        type: 'Historic hotel (4-star)',
        priceRange: '1,500–3,500 NOK/night',
        note: 'The centrepiece of Lofthus since 1846. Fjord-facing rooms, spa, pool, and gardens. Grieg\'s piano remains in the Grieg cabin on the grounds. This is one of Norway\'s genuinely historic hotels, not a heritage imitation.',
        bookingUrl: 'https://www.booking.com/hotel/no/ullensvang-hotel.html',
      },
      {
        name: 'Lofthus Camping',
        type: 'Camping',
        priceRange: '170–200 NOK tent',
        note: 'Orchard camping — tent pitches among the apple trees. Seasonal, May–September. No EV charging. The setting is remarkable even if the facilities are basic.',
      },
      {
        name: 'Hardanger Gard',
        type: 'Farm stays / self-catering',
        priceRange: '1,200–2,000 NOK/night',
        note: 'Several working farms in the Lofthus area offer self-catering fjord-view apartments. Book directly through visitnorway.com or visitullensvang.no.',
      },
    ],
    dining: [
      {
        name: 'Ullensvang Hotel restaurant',
        type: 'Fine dining / traditional Norwegian',
        priceRange: '400–700 NOK',
        note: 'Fjord-view dining room. Focus on local ingredients — Hardanger lamb, trout, and seasonal orchard produce. The Sunday buffet (350 NOK) is a regional institution. Non-guests can book tables.',
      },
      {
        name: 'Hardanger cider farms',
        type: 'Cider tastings / farm shops',
        priceRange: '80–150 NOK for tastings',
        note: 'Lofthus and the surrounding slopes host multiple cider producers: Ullensvang Frukt, Ciderhuset, and Hardanger Saft og Siderfabrikk. Most are open May–September for tastings. The Hardanger cider trail map is available at all tourist offices.',
      },
      {
        name: 'Café Ullensvang (village centre)',
        type: 'Café',
        priceRange: '100–200 NOK',
        note: 'Village café for coffee, waffles, and sandwiches. Informal, local, seasonal hours.',
      },
    ],
    services: [
      { name: 'Petrol station', available: false, note: 'Nearest fuel in Kinsarvik (8 km north) or Odda (30 km south)' },
      { name: 'EV charging', available: true, note: 'Charging at Ullensvang Hotel car park (guests and public)' },
      { name: 'Supermarket', available: false, note: 'Nearest grocery in Kinsarvik (8 km) or Odda (30 km)' },
      { name: 'Pharmacy', available: false, note: 'Nearest pharmacy in Odda (30 km)' },
      { name: 'Ferry connection', available: true, note: 'Ullensvang–Kinsarvik car ferry (seasonal, 10 min). Connects both sides of Sørfjord.' },
      { name: 'Apple blossom trail', available: true, note: 'Signposted walking trail through the orchards. Map at hotel and tourist office.' },
      { name: 'Tourist information', available: true, note: 'Visitor centre at Ullensvang (seasonal). Cider trail maps, orchard calendar.' },
    ],
    insiderTip:
      'Apple blossom season — typically the last week of April to mid-May — is the single most beautiful week in the Hardangerfjord calendar. The entire fjord slope turns white and pink. The Ullensvang Hotel books solid for this period 6–12 months ahead. If you want to be here for blossoms, you plan it a full year in advance, or you book a tent pitch at Lofthus Camping.',
  },
  {
    id: 'norheimsund',
    label: 'Norheimsund',
    icon: Ship,
    name: 'Norheimsund',
    tagline: 'Outer fjord gateway, 80 km from Bergen',
    population: '~2,200 residents',
    locationNote: 'Head of Hardanger outer fjord (Osafjord), 80 km from Bergen',
    overview:
      'Norheimsund is the closest Hardangerfjord village to Bergen — 80 kilometres by road, the first stop after crossing the Hardanger Bridge. It functions as an outer fjord gateway: near enough to Bergen for a day trip, positioned on the fjord with access to Steinsdalsfossen (a waterfall you can walk behind, 2 km from the village), and with reliable year-round services. It does not have the dramatic inner fjord scenery of Eidfjord or the orchard character of Lofthus, but it is practical, accessible, and uncrowded compared to the deeper fjord villages.',
    bestFor: [
      'Day trippers from Bergen',
      'Travellers who want fjord access without a long drive',
      'Those combining Hardangerfjord with a return to Bergen the same day',
      'Steinsdalsfossen visitors',
    ],
    notIdealFor: [
      'Trolltunga hikers — Odda is 95 km further',
      'Those seeking the most dramatic inner fjord scenery',
      'Visitors prioritising the cider trail or apple orchards',
    ],
    accommodation: [
      {
        name: 'Hardanger Hotel',
        type: 'Hotel (3-star)',
        priceRange: '1,000–1,800 NOK/night',
        note: 'The main hotel in Norheimsund. Traditional wooden building on the fjord. Reliable rather than remarkable. Good base for day trip hiking.',
        bookingUrl: 'https://www.booking.com/searchresults.html?ss=Norheimsund',
      },
      {
        name: 'Kvam Camping',
        type: 'Camping',
        priceRange: '180–220 NOK tent',
        note: 'Seasonal campsite on the fjord shore. Tent and caravan pitches, basic cabins. EV charging available.',
      },
    ],
    dining: [
      {
        name: 'Hardanger Hotel restaurant',
        type: 'Hotel restaurant / Traditional Norwegian',
        priceRange: '250–450 NOK',
        note: 'Main dinner option in town. Reliable Norwegian menu with fjord views. Non-guests welcome.',
      },
      {
        name: 'Norheimsund village cafés',
        type: 'Cafés',
        priceRange: '100–200 NOK',
        note: 'Several casual cafés and bakeries in the village centre. Best for lunch and coffee between activities.',
      },
      {
        name: 'Coop grocery',
        type: 'Grocery',
        priceRange: 'Market prices',
        note: 'Full grocery store in the village. Petrol station alongside. Stock up here before driving the inner fjord if self-catering.',
      },
    ],
    services: [
      { name: 'Petrol station', available: true, note: 'Circle K in the village centre' },
      { name: 'EV charging', available: true, note: 'Fast chargers at petrol station' },
      { name: 'Supermarket', available: true, note: 'Coop and Rimi in village centre' },
      { name: 'Pharmacy', available: true, note: 'Pharmacy in the village — check hours seasonally' },
      { name: 'Medical clinic', available: true, note: 'Kvam legesenter. Call 116117 for urgent non-emergency' },
      { name: 'Steinsdalsfossen', available: true, note: 'Free, 2 km from village. Short path walks behind the waterfall.' },
      { name: 'Tourist information', available: true, note: 'Year-round visitor information centre in the village' },
      { name: 'Ferry to Øystese', available: true, note: 'Seasonal local boat service. Check Norled for timetables.' },
    ],
    insiderTip:
      'Steinsdalsfossen is one of the few waterfalls in Norway where you can walk directly behind the curtain of water on a maintained path. The path stays open year-round and is free. Most travellers stop for 20 minutes on their way into the fjord — it deserves 45.',
  },
];

export default function HardangerfjordBasecamps() {
  const [activeBasecamp, setActiveBasecamp] = useState('odda');

  const basecamp = basecamps.find((b) => b.id === activeBasecamp)!;
  const BasecampIcon = basecamp.icon;

  return (
    <section className="py-16 bg-white" aria-labelledby="basecamps-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#00CC6A] mb-2">
            Where to Base Yourself
          </p>
          <h2
            id="basecamps-heading"
            className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-4"
          >
            Hardangerfjord basecamps
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
            Hardangerfjord stretches 179 kilometres. Your basecamp choice determines which experiences are accessible within a day. Odda serves Trolltunga. Eidfjord serves Vøringsfossen. Lofthus serves the apple orchards and cider trail. Norheimsund serves the outer fjord and Bergen day-trippers. They are not interchangeable.
          </p>
        </div>

        {/* Basecamp tabs */}
        <div
          className="flex flex-wrap gap-2 mb-8"
          role="tablist"
          aria-label="Select basecamp"
        >
          {basecamps.map((b) => {
            const Icon = b.icon;
            return (
              <button
                key={b.id}
                role="tab"
                aria-selected={activeBasecamp === b.id}
                aria-controls={`panel-${b.id}`}
                id={`tab-${b.id}`}
                onClick={() => setActiveBasecamp(b.id)}
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 min-h-[44px] border',
                  activeBasecamp === b.id
                    ? 'bg-[#1A365D] text-white border-[#1A365D] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#1A365D] hover:text-[#1A365D]'
                )}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {b.label}
              </button>
            );
          })}
        </div>

        {/* Basecamp panel */}
        <div
          id={`panel-${basecamp.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${basecamp.id}`}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Panel header */}
          <div className="bg-[#1A365D] px-6 py-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <BasecampIcon className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl leading-tight">{basecamp.name}</h3>
                  <p className="text-[#00CC6A] text-sm font-medium">{basecamp.tagline}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#00CC6A]" aria-hidden="true" />
                  {basecamp.locationNote}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#00CC6A]" aria-hidden="true" />
                  {basecamp.population}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Overview */}
            <p className="text-slate-700 leading-relaxed">{basecamp.overview}</p>

            {/* Best for / Not ideal for */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                <h4 className="font-bold text-emerald-800 text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" aria-hidden="true" />
                  Best for
                </h4>
                <ul className="space-y-1.5">
                  {basecamp.bestFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-emerald-900">
                      <span className="text-emerald-500 mt-0.5 shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" aria-hidden="true" />
                  Not ideal for
                </h4>
                <ul className="space-y-1.5">
                  {basecamp.notIdealFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-amber-900">
                      <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Accommodation + Dining | Services + Insider tip */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-5">
                {/* Accommodation */}
                <div>
                  <h4 className="text-sm font-bold text-[#1A365D] uppercase tracking-wide mb-3">
                    Accommodation
                  </h4>
                  <div className="space-y-3">
                    {basecamp.accommodation.map((acc, i) => (
                      <div key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-semibold text-slate-800 text-sm">{acc.name}</p>
                          <span className="text-xs text-slate-500 shrink-0 bg-slate-100 px-2 py-0.5 rounded">
                            {acc.type}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#1A365D] mb-1.5">{acc.priceRange}</p>
                        <p className="text-xs text-slate-600 leading-relaxed">{acc.note}</p>
                        {acc.bookingUrl && (
                          <a
                            href={acc.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-[#1A365D] hover:text-[#00CC6A] transition-colors"
                          >
                            Check availability
                            <ExternalLink className="w-3 h-3" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dining */}
                <div>
                  <h4 className="text-sm font-bold text-[#1A365D] uppercase tracking-wide mb-3">
                    Where to eat
                  </h4>
                  <div className="space-y-3">
                    {basecamp.dining.map((d, i) => (
                      <div key={i} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-semibold text-slate-800 text-sm">{d.name}</p>
                          <span className="text-xs text-slate-500 shrink-0">{d.type}</span>
                        </div>
                        <p className="text-xs font-semibold text-[#1A365D] mb-1.5">{d.priceRange}</p>
                        <p className="text-xs text-slate-600 leading-relaxed">{d.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-5">
                {/* Services */}
                <div>
                  <h4 className="text-sm font-bold text-[#1A365D] uppercase tracking-wide mb-3">
                    Services
                  </h4>
                  <div className="bg-slate-50 rounded-xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
                    {basecamp.services.map((svc, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-3">
                        {svc.available ? (
                          <CheckCircle
                            className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <XCircle
                            className="w-4 h-4 text-slate-300 mt-0.5 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        <div className="min-w-0">
                          <p
                            className={cn(
                              'text-sm font-medium',
                              svc.available ? 'text-slate-800' : 'text-slate-400'
                            )}
                          >
                            {svc.name}
                          </p>
                          {svc.note && (
                            <p className="text-xs text-slate-500 mt-0.5">{svc.note}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insider tip */}
                <div className="bg-[#1A365D] rounded-xl p-5 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-4 h-4 text-[#00CC6A] shrink-0" aria-hidden="true" />
                    <h4 className="font-bold text-sm uppercase tracking-wide">Insider tip</h4>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">{basecamp.insiderTip}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking lead times note */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h4 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" aria-hidden="true" />
            Booking lead times — Hardangerfjord
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-amber-900">
            <div>
              <p className="font-semibold">Trolltunga season (Jul–Aug):</p>
              <p>Book Odda accommodation 2–4 months ahead. Shuttle bus fills even faster.</p>
            </div>
            <div>
              <p className="font-semibold">Apple blossom (late Apr–mid May):</p>
              <p>Ullensvang Hotel books up to 12 months ahead for blossom week. Plan a full year out.</p>
            </div>
            <div>
              <p className="font-semibold">Vøringsfossen peak (Jun–Aug):</p>
              <p>Fossli Hotel and Eidfjord Fjordhotel: 6–8 weeks minimum in high season.</p>
            </div>
            <div>
              <p className="font-semibold">Shoulder season (May, Sep–Oct):</p>
              <p>2–3 weeks generally sufficient. Some accommodation closes after mid-October.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
