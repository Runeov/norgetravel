'use client';

import { useState } from 'react';
import { MapPin, Train, Ship, Building, Clock, CheckCircle, XCircle, Info, ExternalLink } from 'lucide-react';
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
    id: 'flam',
    label: 'Flåm',
    icon: Train,
    name: 'Flåm',
    tagline: 'The railway village — Sognefjord\'s busiest gateway',
    population: '350 permanent residents / 1.4M+ annual visitors',
    locationNote: 'Head of Aurlandsfjord, junction of Flåm Railway and Nærøyfjord ferry',
    overview:
      'Flåm has 350 permanent residents and receives over 1.4 million visitors per year — a ratio that shapes every aspect of life here. The village exists at the junction of the Flåm Railway (arriving from Myrdal) and the Nærøyfjord electric ferry (departing to Gudvangen). It is the most visited place in Sognefjord and the most logistically convenient: everything — train station, ferry dock, supermarket, gear rental, camping, accommodation — is within 500 metres. It is also crowded from May to September. The crowds are part of what Flåm is. If that is not what you want, base in Aurland (2.5 km) or Balestrand (further, quieter).',
    bestFor: [
      'Norway in a Nutshell travellers using the Flåm Railway / Nærøyfjord ferry',
      'Travellers without a car relying on train and ferry connections',
      'Short stays maximising fjord access without long drives',
      'Families needing all services in walking distance',
    ],
    notIdealFor: [
      'Travellers who want a quiet, uncrowded fjord village experience',
      'Those who find large tour group volumes frustrating',
      'Budget travellers — prices in Flåm are inflated by demand',
    ],
    accommodation: [
      {
        name: 'Fretheim Hotel',
        type: 'Historic hotel (4-star)',
        priceRange: '1,500–3,200 NOK/night',
        note: 'The premium option in Flåm, operating since 1866. Fjord-view rooms, restaurant, spa, and proximity to both railway station and ferry dock. Fills from May onward — book 3–6 months ahead for summer dates.',
        bookingUrl: 'https://www.booking.com/hotel/no/fretheim.html',
      },
      {
        name: 'Flåm Marina & Apartments',
        type: 'Self-catering apartments',
        priceRange: '1,200–2,500 NOK/night',
        note: 'Modern apartments on the harbourfront. Kitchen-equipped. Popular with families and groups. Fjord views from the deck.',
        bookingUrl: 'https://www.booking.com/hotel/no/flam-marina-og-apartments.html',
      },
      {
        name: 'Flåm Camping og Vandrerheim',
        type: 'Camping + hostel',
        priceRange: '200–250 NOK tent / 350–450 NOK hostel bed',
        note: 'The main budget option in Flåm. Tent pitches along the river, basic hostel dormitories, and private cabin rooms. EV charging on-site. Seasonal.',
      },
    ],
    dining: [
      {
        name: 'Ægir Brewery',
        type: 'Viking-hall brewery restaurant',
        priceRange: '250–450 NOK',
        note: 'The single best dining experience in Flåm. Craft ales brewed with glacial fjord water, hearty Norwegian food (elk, reindeer, fjord trout). The building is designed as a Viking longhouse — not authentic, but genuinely atmospheric. Busy from 17:00 — arrive early or book ahead.',
      },
      {
        name: 'Flåmsbryggja restaurant',
        type: 'Waterfront restaurant',
        priceRange: '280–480 NOK',
        note: 'Directly on the quay overlooking the ferry dock and fjord. Traditional Norwegian menu. Open for lunch and dinner. Popular with group tours — slightly more tourist-facing than Ægir.',
      },
      {
        name: 'Joker Flåm',
        type: 'Grocery',
        priceRange: 'Market prices',
        note: 'The only grocery in Flåm. Small but has what you need for self-catering or packed lunches. Open daily in season.',
      },
    ],
    services: [
      { name: 'Train station (Flåm Railway)', available: true, note: 'Terminus of the Flåmsbana. Year-round.' },
      { name: 'Ferry terminal (Nærøyfjord / Sognefjord)', available: true, note: 'Electric ferry to Gudvangen; express boat to Balestrand, Sogndal, Bergen.' },
      { name: 'Petrol station', available: true, note: 'One station in the village' },
      { name: 'EV charging', available: true, note: 'Multiple fast chargers at Flåm Marina and the campsite' },
      { name: 'Supermarket', available: true, note: 'Joker grocery (small, seasonal hours)' },
      { name: 'Gear rental', available: true, note: 'Bike rental and kayak hire at the marina and activity centre' },
      { name: 'Tourist information', available: true, note: 'Year-round visitor centre at the railway station' },
      { name: 'Pharmacy', available: false, note: 'Nearest pharmacy in Aurland (2.5 km) or Lærdal (26 km)' },
    ],
    insiderTip:
      'Between 09:00 and 14:00 on any July or August day, Flåm\'s waterfront is a compressed mass of arriving rail passengers, departing ferry passengers, and cruise guests dropped off from ships moored in the fjord. If you want to experience Flåm\'s genuine character — the river mouth, the valley, the farm above the village — arrive before 08:00 or after 18:00. The evening quiet on the fjord, after the last ferry and train have cleared, is a different place entirely.',
  },
  {
    id: 'balestrand',
    label: 'Balestrand',
    icon: Ship,
    name: 'Balestrand',
    tagline: 'The artists\' village on the main fjord trunk',
    population: '~1,400 residents in Balestrand municipality',
    locationNote: 'North shore of Sognefjord main trunk, 120 km from Bergen by boat',
    overview:
      'Balestrand occupies a different register from Flåm. Where Flåm is a transport junction, Balestrand is a destination that you choose to go to — and that selection filters the crowd. The village has been a retreat for artists and intellectuals since the 19th century. Kaiser Wilhelm II spent several summers here. The Kviknes Hotel has been receiving guests since 1877. There is no railway to Balestrand — you arrive by Norled express boat from Bergen (5.5 hours), by ferry from the south shore, or by car from Sogndal. The fjord views from the hotel gardens, looking south across the full width of Sognefjord, are the widest available from any fixed point on the fjord.',
    bestFor: [
      'Travellers who want Sognefjord without Flåm\'s crowds',
      'Those arriving on the Bergen express boat',
      'Travellers prioritising atmosphere and history over logistics efficiency',
      'Those who want the widest main-trunk fjord views',
    ],
    notIdealFor: [
      'Car-free travellers who need daily Flåm Railway access',
      'Budget travellers — Kviknes Hotel is the main accommodation option',
      'Those who need train connections or large supermarket access',
    ],
    accommodation: [
      {
        name: 'Kviknes Hotel',
        type: 'Historic hotel (4-star)',
        priceRange: '1,800–3,800 NOK/night',
        note: 'Operating continuously since 1877 in the same family. The historic wing is genuinely Victorian — not a replica. Fjord-view rooms, restaurant open to non-guests, and boat dock directly below the garden terrace. One of Norway\'s most historically significant hotels.',
        bookingUrl: 'https://www.booking.com/hotel/no/kviknes.html',
      },
      {
        name: 'Balestrand Hostel (Balestrand Vandrerhjem)',
        type: 'Hostel / budget rooms',
        priceRange: '400–600 NOK/night',
        note: 'Budget accommodation in the village. Basic private rooms and dormitories. The building is positioned on the fjord — views without the price premium of Kviknes.',
      },
      {
        name: 'Dragsvik Fjordhotell',
        type: 'Hotel',
        priceRange: '1,200–2,000 NOK/night',
        note: 'Across the fjord from Balestrand at Dragsvik (accessible by car ferry). Quieter than Balestrand itself. Free parking. Views toward Balestrand.',
      },
    ],
    dining: [
      {
        name: 'Kviknes Hotel restaurant',
        type: 'Fine dining / traditional Norwegian',
        priceRange: '380–650 NOK',
        note: 'Non-guests can book. The Sunday buffet (350–400 NOK) is the best-value meal in Balestrand. Traditional Norwegian dishes with local ingredients: Sognefjord lamb, fjord fish, local dairy.',
      },
      {
        name: 'Balestrand Café',
        type: 'Village café',
        priceRange: '100–200 NOK',
        note: 'The informal village option for coffee and light lunch. Seasonal hours — check locally.',
      },
      {
        name: 'Coop grocery',
        type: 'Grocery',
        priceRange: 'Market prices',
        note: 'Small Coop in the village. Limited range compared to Sogndal — stock up before arriving if self-catering.',
      },
    ],
    services: [
      { name: 'Express boat from Bergen', available: true, note: 'Norled daily year-round — dock in the village.' },
      { name: 'Car ferry to Dragsvik / Hella', available: true, note: 'Connects both sides of Sognefjord main trunk. AutoPASS accepted.' },
      { name: 'Petrol station', available: true, note: 'One station in the municipality' },
      { name: 'EV charging', available: true, note: 'Charging at Kviknes Hotel car park' },
      { name: 'Supermarket', available: true, note: 'Coop (small)' },
      { name: 'Pharmacy', available: false, note: 'Nearest pharmacy in Sogndal (35 km)' },
      { name: 'Medical clinic', available: false, note: 'Nearest clinic in Sogndal' },
      { name: 'Tourist information', available: true, note: 'Visitor centre at the boat dock' },
    ],
    insiderTip:
      'Kaiser Wilhelm II\'s connection to Balestrand is more than a brochure footnote: he funded the English Church (St Olaf\'s) in 1897 as a gift to the British community summering here, and his summer visits shaped the village\'s late 19th-century development. The Anglicans still use the church. The Kviknes family still runs the hotel. These are not reconstructions. The continuity is part of what makes Balestrand different from other Sognefjord villages.',
  },
  {
    id: 'sogndal',
    label: 'Sogndal',
    icon: Building,
    name: 'Sogndal',
    tagline: 'The fjord\'s largest town — university, services, and local life',
    population: '~7,000 residents',
    locationNote: 'Southern shore of Sognefjord, 110 km from Bergen by road (via tunnel)',
    overview:
      'Sogndal is the largest town on Sognefjord and the most functional base — a real Norwegian town with a university (Western Norway University of Applied Sciences), a full-service hospital, supermarkets, pharmacy, petrol, and a local food scene that is not priced for tourist season. It lacks the picture-postcard drama of Flåm or the historic atmosphere of Balestrand, but what it offers is reliability: full services year-round, a functioning public transport network, and proximity to the Rv55 Sognefjellet road for those heading into Jotunheimen. Lustrafjord and Urnes Stave Church are 35 km north.',
    bestFor: [
      'Car-based travellers using Sogndal as a mid-fjord hub',
      'Travellers heading to Jotunheimen via Rv55',
      'Those who want a full range of services without tourist pricing',
      'Multi-day visitors exploring both Sognefjord and Lustrafjord',
    ],
    notIdealFor: [
      'Travellers looking for the classic Norwegian fjord village aesthetic',
      'Car-free travellers who need Flåm Railway access (requires a ferry or car)',
      'Those prioritising scenic views from accommodation',
    ],
    accommodation: [
      {
        name: 'Sogndal Fjordhotel',
        type: 'Hotel (3-star)',
        priceRange: '1,100–1,800 NOK/night',
        note: 'The main hotel in Sogndal town centre. Standard rooms, reliable rather than remarkable. Free parking. 5 minutes by car from the Hella ferry dock for Balestrand connections.',
        bookingUrl: 'https://www.booking.com/searchresults.html?ss=Sogndal+hotel',
      },
      {
        name: 'Loftesnes Hotel',
        type: 'Boutique hotel',
        priceRange: '1,200–2,200 NOK/night',
        note: 'At the edge of Sogndal where the Sognaelva river enters the fjord. Better fjord views than the town-centre hotels. Popular with business travellers during the academic year.',
      },
      {
        name: 'Sogndal Camping',
        type: 'Camping',
        priceRange: '180–220 NOK tent',
        note: 'Seasonal campsite with fjord access. Tent pitches and basic cabins. EV charging. Open May–September.',
      },
    ],
    dining: [
      {
        name: 'Loftesnes Restaurant',
        type: 'Hotel restaurant',
        priceRange: '250–450 NOK',
        note: 'The best dinner option in Sogndal, with fjord views. Traditional Norwegian menu with seasonal local produce. Open to non-guests. Booking recommended Friday–Saturday evenings during the academic year.',
      },
      {
        name: 'Sogndal town cafés and Rema 1000',
        type: 'Casual dining / grocery',
        priceRange: '100–200 NOK café / market prices grocery',
        note: 'Sogndal has a functioning town-centre food scene: bakeries, pizza restaurants, and a Rema 1000 supermarket with the widest grocery range on the fjord. This is where locals eat and shop.',
      },
      {
        name: 'Sogndal student area (Fosshaugane)',
        type: 'Student cafés / casual',
        priceRange: '120–220 NOK',
        note: 'The university campus area has cafés, a pub, and affordable food. During the academic term (September–May), this is the liveliest part of town.',
      },
    ],
    services: [
      { name: 'Airport', available: true, note: 'Sogndal Airport (Haukåsen) — regional flights to Bergen and Oslo' },
      { name: 'Ferry dock (Hella → Vangsnes / Dragsvik)', available: true, note: '10 km from Sogndal. Connects to north shore of Sognefjord. AutoPASS accepted.' },
      { name: 'Petrol station', available: true, note: 'Multiple stations in town' },
      { name: 'EV charging', available: true, note: 'Fast chargers in town centre' },
      { name: 'Supermarket', available: true, note: 'Rema 1000, Kiwi, and Coop in town' },
      { name: 'Pharmacy', available: true, note: 'Full pharmacy in town centre' },
      { name: 'Hospital', available: true, note: 'Sogndal Hospital — regional medical facility' },
      { name: 'Tourist information', available: true, note: 'Visitor centre in town — Sognfjord maps, Rv55 information, Urnes Stave Church ticketing' },
      { name: 'University', available: true, note: 'Western Norway University of Applied Sciences campus — active community September–May' },
    ],
    insiderTip:
      'Sogndal Airport runs regional flights to Bergen (30 min) and Oslo (55 min). If you are doing a one-way fjord itinerary — arriving by boat and leaving by air, or vice versa — Sogndal is the only Sognefjord village where this is logistically clean. Book with Norwegian or Widerøe. The connection is particularly useful in winter when road conditions make a long drive to Bergen less appealing.',
  },
  {
    id: 'laerdal',
    label: 'Lærdal',
    icon: MapPin,
    name: 'Lærdal',
    tagline: 'The tunnel gateway and Norway\'s best-preserved timber town',
    population: '~2,200 residents',
    locationNote: 'Inner Sognefjord, 180 km from Bergen (via Laerdal Tunnel)',
    overview:
      'Lærdal sits at the inner end of the main Sognefjord trunk, 26 km from Flåm and at the Bergen end of the 24.5-kilometre Laerdal Tunnel — the longest road tunnel in the world. The town has two distinct attractions: the tunnel itself (an engineering landmark that took 5 years to build and opened in 2000) and Gamleøyri — the old town, a preserved 18th and 19th-century timber merchant district that is one of the most intact historic townscapes in Norway. The Borgund Stave Church, dated to 1180 CE and one of the best-preserved stave churches in existence, is 25 km up the Laerdalselvi valley.',
    bestFor: [
      'Travellers driving between Bergen and Sognefjord via the Laerdal Tunnel',
      'History and architecture travellers (Gamleøyri old town, Borgund stave church)',
      'Those who want a quieter inner-fjord base closer to the car route',
      'Salmon fishing — the Laerdalselvi is among Norway\'s premium salmon rivers',
    ],
    notIdealFor: [
      'Car-free travellers (Lærdal has limited public transport)',
      'Those primarily focused on Nærøyfjord / Flåm Railway experiences',
      'Travellers looking for a wide range of accommodation and dining options',
    ],
    accommodation: [
      {
        name: 'Lindstrøm Hotel',
        type: 'Historic hotel',
        priceRange: '1,000–1,800 NOK/night',
        note: 'A traditional hotel in the old town district, operating in Lærdal since the 19th century. Heritage rooms, local character. The most atmospherically positioned accommodation in the town.',
        bookingUrl: 'https://www.booking.com/searchresults.html?ss=laerdal+hotel',
      },
      {
        name: 'Lærdal Camping',
        type: 'Camping',
        priceRange: '170–210 NOK tent',
        note: 'On the Laerdalselvi river, used by salmon fishermen in the fishing season (June–September). Basic facilities, quiet.',
      },
    ],
    dining: [
      {
        name: 'Lindstrøm Hotel restaurant',
        type: 'Hotel restaurant',
        priceRange: '250–420 NOK',
        note: 'Traditional Norwegian menu in the old hotel dining room. The most reliable dinner option in Lærdal. Salmon from the Laerdalselvi features prominently in season.',
      },
      {
        name: 'Gamleøyri café (seasonal)',
        type: 'Historic café',
        priceRange: '80–150 NOK',
        note: 'Café operating in the preserved old town during summer months. Waffles, coffee, local produce. Hours are seasonal — check locally.',
      },
      {
        name: 'ICA supermarket',
        type: 'Grocery',
        priceRange: 'Market prices',
        note: 'Full grocery in the town centre. Stock up here if continuing to Flåm (no large grocery) or heading up Rv5 toward Aurland.',
      },
    ],
    services: [
      { name: 'Laerdal Tunnel access', available: true, note: 'World\'s longest road tunnel (24.5 km) — Bergen to Sognefjord year-round connection' },
      { name: 'Petrol station', available: true, note: 'Petrol and diesel before/after the tunnel' },
      { name: 'EV charging', available: true, note: 'Fast chargers at the petrol station' },
      { name: 'Supermarket', available: true, note: 'ICA in town centre' },
      { name: 'Pharmacy', available: false, note: 'Nearest pharmacy in Sogndal (45 km) or Flåm area' },
      { name: 'Borgund Stave Church', available: true, note: '25 km up Rv5 from Lærdal. Built circa 1180 CE. Open May–September. Entrance fee.' },
      { name: 'Salmon fishing permits', available: true, note: 'Laerdalselvi permits through Laerdal Elveeigarlag. Seasonal.' },
      { name: 'Tourist information', available: true, note: 'Visitor centre at the Laerdal Tunnel entrance with tunnel history exhibit' },
    ],
    insiderTip:
      'Gamleøyri — the old town — survived because Lærdal was too remote and poor to modernise in the 20th century. The preserved 18th and 19th-century timber merchant houses are not a museum reconstruction; they are the working town that never got demolished. Walk through it slowly. The woodwork on the building facades, the carved details on the loft storage buildings, and the layout of the merchant plots are a functioning record of how a Norwegian river trading town was built and lived in. Most travellers pass through Lærdal in 10 minutes on the way to Flåm. Give it two hours.',
  },
];

export default function SognefjordBasecamps() {
  const [activeBasecamp, setActiveBasecamp] = useState('flam');

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
            Sognefjord basecamps
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
            Sognefjord stretches 205 kilometres with radically different character at each end. Flåm handles Nærøyfjord and the Flåm Railway. Balestrand handles the historic main trunk. Sogndal handles services and Jotunheimen access. Lærdal handles the tunnel approach and heritage. These are not interchangeable bases — your basecamp determines what you can reach in a day.
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
            Booking lead times — Sognefjord
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-amber-900">
            <div>
              <p className="font-semibold">Flåm Railway (Jul–Aug):</p>
              <p>Book weeks to months ahead. July trains sell out the fastest. No walk-up availability in high season.</p>
            </div>
            <div>
              <p className="font-semibold">Flåm accommodation (Jun–Aug):</p>
              <p>Fretheim Hotel: 3–6 months ahead for summer dates. Camping: 2–4 weeks.</p>
            </div>
            <div>
              <p className="font-semibold">Balestrand / Kviknes Hotel:</p>
              <p>6–8 weeks for summer dates. Winter and shoulder season often available last-minute.</p>
            </div>
            <div>
              <p className="font-semibold">Sognefjellet road (Rv55):</p>
              <p>No booking required — but verify it is open at vegvesen.no before making plans that depend on it.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
