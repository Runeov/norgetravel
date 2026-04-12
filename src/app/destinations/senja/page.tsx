import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Thermometer, Compass } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { DestinationActivities } from '@/components/modules/destinations/DestinationActivities';
import { DestinationBasecamps, type Basecamp } from '@/components/modules/destinations/DestinationBasecamps';

const senjaBasecamps: Basecamp[] = [
  {
    id: 'hamn',
    label: 'Hamn i Senja',
    icon: 'ship',
    name: 'Hamn i Senja',
    tagline: 'Resort on the outer coast',
    population: '~40 permanent',
    distance: 'West Senja · 2 hr 15 min from Tromsø via Gryllefjord ferry',
    overview:
      'A former fishing station rebuilt as a destination resort on the outer coast. Cabins and hotel rooms directly on the sea, sauna and hot tub on the pier, a single good restaurant. The best base if you want Segla and Husfjellet within a short drive and do not need a town around you.',
    bestFor: ['Couples wanting sea-facing cabins', 'Hikers targeting Segla, Husfjellet, Hesten', 'Aurora photographers wanting dark skies from the doorstep'],
    notIdealFor: ['Anyone without a car', 'Travellers wanting multiple restaurant options', 'Budget travellers in peak July'],
    accommodation: [
      { name: 'Hamn i Senja Resort', type: 'Hotel + cabins', price: '1,800–3,800 NOK/night', highlight: 'Sea-view rooms and rorbu-style cabins. Restaurant, sauna, hot tub, RIB safaris run from the pier. The only full-service option on west Senja.' },
      { name: 'Mefjord Brygge (30 km)', type: 'Rorbu resort', price: '1,600–3,200 NOK/night', highlight: 'Alternative if Hamn is full. Working harbour at Mefjordvær, deep-sea fishing base.' },
    ],
    dining: [
      { name: 'Hamn i Senja restaurant', detail: 'Arctic char, stockfish, reindeer. Set menu in peak season. Non-guests accepted when space allows.' },
      { name: 'Bergsbotn viewpoint stop', detail: '30 minutes east on Fv862. Coffee and waffles at the viewing platform. Not dinner, but a worthwhile detour.' },
    ],
    services: [
      { label: 'Grocery', available: false, detail: 'Nearest: Torsken, 15 min drive. Stock up in Finnsnes.' },
      { label: 'Fuel', available: false, detail: 'Fill up at Silsand or Torsken before arriving.' },
      { label: 'EV charging', available: true, detail: 'On-site charger for guests.' },
      { label: 'Ferry link', available: true, detail: 'Gryllefjord–Andenes seasonal ferry, June–August, 1 hr 30 min.' },
      { label: 'Hospital', available: false, detail: 'No medical centre. Nearest: Finnsnes. Emergency: 113.' },
    ],
    insiderTip:
      'The Segla trailhead at Fjordgård is 50 minutes by road. Drive out at 04:00 in July for the midnight-sun shoulder light on the ridge. You will be alone on the summit before the day hikers arrive at 10:00.',
  },
  {
    id: 'finnsnes',
    label: 'Finnsnes',
    icon: 'navigation',
    name: 'Finnsnes',
    tagline: 'Logistics hub at the Senja bridge',
    population: '~5,700',
    distance: 'Mainland side of the Senja bridge · 2 hr from Tromsø',
    overview:
      'The functional town at the gateway to Senja. Hotels, supermarkets, hospital, bus terminal, Hurtigruten stop. Not scenic, but the cheapest and best-equipped base if you are running Senja as a series of day trips.',
    bestFor: ['Self-drive travellers using Senja as day trips', 'Budget travellers', 'Anyone needing services, pharmacy, or medical access'],
    notIdealFor: ['Travellers wanting a scenic basecamp', 'Anyone staying more than 2 nights without driving'],
    accommodation: [
      { name: 'Scandic Finnsnes', type: 'Chain hotel', price: '1,100–1,800 NOK/night', highlight: 'Central, by the harbour. Reliable Scandic standard. Breakfast included. The default business-traveller option.' },
      { name: 'Finnsnes Hotell', type: 'Independent hotel', price: '900–1,500 NOK/night', highlight: 'Slightly cheaper alternative. Basic but clean. Fine for a single night on the way in or out.' },
    ],
    dining: [
      { name: 'Peppes Pizza Finnsnes', detail: 'Chain, but dependable and open late. Useful when you arrive off the Hurtigruten at 22:00.' },
      { name: 'Kafé Oscar', detail: 'Harbourside café and lunch spot. Fish soup, open sandwiches, good coffee.' },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Rema 1000, Kiwi, Coop Obs all in town.' },
      { label: 'Fuel', available: true, detail: 'Multiple stations. Fill up here before crossing the Senja bridge.' },
      { label: 'EV charging', available: true, detail: 'Rapid chargers at Circle K and Mesta.' },
      { label: 'Hospital', available: true, detail: 'UNN Finnsnes — regional hospital. A&E available.' },
      { label: 'Hurtigruten', available: true, detail: 'Coastal ferry stops daily in both directions.' },
    ],
    insiderTip:
      'Drive the Senja National Tourist Route (Fv862) as a clockwise loop from Finnsnes: Gryllefjord, Mefjordvær, Bergsbotn, Tungeneset, Ersfjord, back via the bridge. 170 km, allow 6 hours with stops. One of the best scenic-road days in Norway.',
  },
  {
    id: 'andenes',
    label: 'Andenes',
    icon: 'ship',
    name: 'Andenes',
    tagline: 'Whale-watching capital at the tip of Vesterålen',
    population: '~2,700',
    distance: 'North tip of Andøya · 3 hr from Tromsø via Senja and Gryllefjord–Andenes ferry (summer only)',
    overview:
      'The sperm whale town. The continental shelf drops 1,000 m just off the coast, so bull sperm whales feed here year-round, not seasonally. Also a northern lights and midnight sun destination. Working fishing harbour, Hurtigruten stop, small but complete town.',
    bestFor: ['Whale safari travellers (year-round sperm whales)', 'Aurora travellers wanting a coastal base', 'Road trippers on the Andøya scenic route'],
    notIdealFor: ['Travellers on a tight budget in July', 'Anyone needing extensive dining options'],
    accommodation: [
      { name: 'Thon Hotel Andrikken', type: 'Chain hotel', price: '1,300–2,200 NOK/night', highlight: 'Central Andenes, walking distance to the whale safari dock. Breakfast included. The dependable option.' },
      { name: 'Lysthuset Andenes', type: 'Boutique rooms + restaurant', price: '1,500–2,500 NOK/night', highlight: 'Historic merchant house with a few rooms above the restaurant. Atmosphere and food quality both above the Thon.' },
      { name: 'Andenes Whale Camp', type: 'Hostel', price: 'From 550 NOK/bed', highlight: 'Budget hostel run by the Whale2Sea operator. Combines with their safaris on a package deal.' },
    ],
    dining: [
      { name: 'Lysthuset Andenes', detail: 'Arctic fine dining in a historic merchant house. Sperm whale heritage menu, Arctic char, reindeer. The best meal on Andøya.' },
      { name: 'Bårdsens Brasseri', detail: 'Neighbourhood bistro with a short seasonal menu. Locals eat here year-round. Reliable lunch and dinner option.' },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Coop Extra and Rema 1000 in town.' },
      { label: 'Fuel', available: true, detail: 'Circle K and YX stations.' },
      { label: 'EV charging', available: true, detail: 'Rapid chargers in town.' },
      { label: 'Ferry', available: true, detail: 'Gryllefjord–Andenes runs June to mid-August only, 1 hr 30 min.' },
      { label: 'Airport', available: true, detail: 'Andøya (ANX) — Widerøe connections from Tromsø and Bodø.' },
    ],
    insiderTip:
      'Sperm whales are year-round off Andenes because of the underwater canyon. Winter whale safaris have a 95% sighting rate on days the RIB can sail. The limitation is the weather, not the whales. Book two nights so you have a weather buffer.',
  },
];


export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Senja & Vesterålen Travel Guide 2026 | NorgeTravel',
  description:
    'Senja and Vesterålen without the Lofoten crowds. Sperm whales year-round off Andenes, the Segla ridge, the Fv862 scenic road, and how to get here from Tromsø.',
  alternates: { canonical: 'https://norgetravel.com/destinations/senja' },
};

const facts = [
  { label: 'Location', value: 'Troms & Nordland' },
  { label: 'Senja population', value: '7,800' },
  { label: 'Andenes population', value: '2,700' },
  { label: 'Scenic road', value: 'Fv862 (Senja)' },
  { label: 'Highest peak', value: 'Breidtinden 1,001m' },
  { label: 'Tromsø ferry', value: '40 min (summer)' },
];

const seasonalWindows = [
  { months: 'Jun – Aug', label: 'Midnight sun & hiking', detail: 'Segla, Husfjellet, and Hesten all clear. Midnight sun May 23 to July 22 on Senja. Coastal road is open.' },
  { months: 'Sep – Mar', label: 'Aurora on dark coast', detail: 'Low light pollution. KP 3+ and a clear sky and the fjords light up. Book 4 nights minimum.' },
  { months: 'Year-round', label: 'Sperm whales off Andenes', detail: 'Andenes is one of the few places worldwide with sperm whale sightings every month. Season peaks May to September.' },
  { months: 'Mar – May', label: 'Ski touring', detail: 'Okshornan and the peaks above Mefjord. Stable snow, long days, avalanche skill required.' },
];

export default function SenjaPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-slate-900 text-white -mt-20 pt-20">
        <Image
          src="/images/senja/landscapes/senja-panorama_dji.jpg"
          alt="Senja island panorama with jagged peaks dropping into a fjord"
          fill
          priority
          quality={60}
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/85" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-48">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00CC6A]/20 text-[#00CC6A] text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            Destination Guide
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 max-w-3xl">Senja & Vesterålen</h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            Same peaks-into-sea scenery as Lofoten. A fraction of the crowds. Senja for the jagged coast and the Segla ridge. Vesterålen for sperm whales year-round off Andenes.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" /> −6°C to +18°C</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" /> Best: Jun–Aug (hiking) / Sep–Mar (aurora)</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#00CC6A]" aria-hidden="true" /> 3–5 days recommended</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#1B3A5C] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {facts.map((f) => (
              <div key={f.label} className="text-center">
                <p className="text-[#00CC6A] text-xs font-bold uppercase tracking-wider mb-1">{f.label}</p>
                <p className="font-bold text-sm">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-white">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">About Senja & Vesterålen</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-slate-600 leading-relaxed">
                Senja is Norway&apos;s second-largest island at 1,586 km². The outer coast drops straight into the Norwegian Sea in a chain of serrated granite peaks that every photographer who sees Lofoten eventually discovers. The Fv862 is one of 18 designated National Scenic Routes (Nasjonale Turistveger), and the stretch between Gryllefjord and Mefjord is the scenic claim most often compared, correctly, to the E10 on the outer Lofoten islands.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Vesterålen sits north of Lofoten and south of Senja. Andenes, on the northern tip of Andøya, is one of the few places in the world with sperm whale sightings every month of the year — the Bleik Canyon drops to 2,000 m depth within 10 km of shore and sperm whales feed in it year-round. Hurtigruten stops at Stokmarknes and Sortland. The island of Hadseløya connects to Lofoten by a bridge at Melbu.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Neither archipelago has the tourist saturation of Lofoten. Senja in particular has retained a working fishing culture — Mefjordvær, Husøy, and Gryllefjord are active ports, not postcards. Come here for hiking, scenic driving, whale safaris, and aurora on a coast that does not yet have a parking problem. That will change. Come now.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Key facts</h3>
                <dl className="space-y-3">
                  {facts.map((f) => (
                    <div key={f.label} className="flex justify-between gap-4 text-sm">
                      <dt className="text-slate-500 shrink-0">{f.label}</dt>
                      <dd className="font-medium text-slate-800 text-right">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">Best time to visit</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  June to August for hiking and the midnight sun. Late September through March for aurora on the dark coast. Whale safaris from Andenes run year-round, but the May to September window has the stablest sea state.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden bg-slate-50">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <DestinationActivities
            heading="What to do in Senja & Vesterålen"
            intro="Four activities worth structuring a trip around. Senja for the peaks-into-sea coast and the Segla ridge. Vesterålen for the year-round sperm whale safaris off Andenes and the Hurtigruten calls at Stokmarknes."
            featured={[
              {
                title: 'Segla ridge',
                image: '/images/senja/activities/hiking-segla_visit-senja.jpg',
                alt: 'Hiker on the Segla ridge above Bergsfjord on Senja',
                body: '6 km round trip, 639 m elevation gain, 4 to 5 hours. Blue-grade trail with a final scramble. Park at Bergsbotn. Busy in July. Start at 06:00.',
              },
              {
                title: 'Sperm whale safari, Andenes',
                image: '/images/senja/nature/whale-senja_yngve-olsen.jpg',
                alt: 'Whale tail breaking the surface off the coast of northern Norway',
                body: 'Whale2Sea and Whalesafari Andenes run year-round. 4 to 6 hours. Sighting rate 95% in summer, 80% in winter. Book 48 hours ahead in peak season.',
              },
              {
                title: 'Fv862 scenic drive',
                image: '/images/senja/activities/senja-scenic-road_runar-larsen.jpg',
                alt: 'Car on the Fv862 National Scenic Route on Senja island',
                body: 'Gryllefjord to Botnhamn via Tungeneset and Ersfjord. 102 km. Budget a full day. The viewpoints and pullouts are why you drove here.',
              },
              {
                title: 'Aurora on the outer coast',
                image: '/images/senja/nature/aurora-senja_reiner-schaufler-1.jpg',
                alt: 'Northern Lights arching over Senja coastline at night',
                body: 'No light pollution past Finnsnes. Ersfjord, Tungeneset, and the beach at Ersfjordstranda are the shortlist. KP 3+ and a clear sky. Four nights minimum.',
              },
            ]}
            tours={[
              {
                name: 'Sperm whale safari, Andenes',
                type: 'Wildlife, 4–6 hours',
                price: 'From 1,450 NOK',
                duration: '4–6 hours',
                highlight: 'Whalesafari Andenes and Whale2Sea run to the Bleik Canyon where sperm whales feed year-round. 95% sighting rate in summer, 80% in winter. Thermal suits included. 45-minute minibus transfer from Andenes harbour to the boat.',
                affiliateUrl: 'https://www.getyourguide.com/s/?q=andenes+whale+safari&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
              {
                name: 'Senja full-day from Tromsø',
                type: 'Guided day trip, 10–12 hours',
                price: 'From 1,990 NOK',
                duration: '10–12 hours',
                highlight: 'Brensholmen–Botnhamn ferry, Segla viewpoint at Bergsbotn, Tungeneset, and the fishing village of Husøy. Small-group minibus with local guide. Summer only (ferry-dependent, late May to late August).',
                affiliateUrl: 'https://www.getyourguide.com/tromso-l235/senja-day-trip-tc1088/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
              {
                name: 'Aurora chase from Finnsnes',
                type: 'Northern Lights, 6–8 hours',
                price: 'From 1,490 NOK',
                duration: '6–8 hours',
                highlight: 'Local operators chase clear-sky windows across Senja and the Malangen peninsula. 18:00 pickup, return 01:00–02:00. Tripod and hot drinks included. Book four nights minimum — cloud is the only variable you cannot control.',
                affiliateUrl: 'https://www.getyourguide.com/s/?q=senja+northern+lights&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
              {
                name: 'Deep-sea fishing, Mefjordvær',
                type: 'Fishing, 3–4 hours',
                price: 'From 890 NOK',
                duration: '3–4 hours',
                highlight: 'Mefjord Brygge and local skippers run charters into the outer fjords. Cod, haddock, and coalfish are the common catch. Rods and waterproofs provided. Bring the fish back to the quay — restaurants at Mefjord Brygge will cook what you caught.',
                affiliateUrl: 'https://www.getyourguide.com/s/?q=senja+fishing&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
            ]}
            toursFooterHref="https://www.getyourguide.com/s/?q=senja&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-end"
            toursFooterLabel="View all Senja & Vesterålen tours on GetYourGuide"
            trails={[
              {
                name: 'Segla ridge',
                slug: 'segla-senja-ridge-hike',
                distance: '6 km round trip',
                elevation: '639 m',
                time: '4–5 hours',
                difficulty: 'Moderate',
                description: 'The Senja signature peak. Trailhead at Fjordgård. Marked path up through birch, then open ridge with a narrow final scramble to the summit cairn. DNT Blue with scramble. Start before 07:00 in July. The trailhead car park fills.',
              },
              {
                name: 'Husfjellet',
                slug: 'husfjellet-senja-hike',
                distance: '5 km round trip',
                elevation: '635 m',
                time: '3–4 hours',
                difficulty: 'Moderate',
                description: '635m peak above Skaland. Trailhead at Skaland mine road. Steady climb on good path, open plateau summit with views across to Okshornan. DNT Blue. Boardwalks on the boggy lower section.',
              },
              {
                name: 'Hesten (Senja)',
                slug: 'hesten-senja-viewpoint-hike',
                distance: '7 km round trip',
                elevation: '556 m',
                time: '4 hours',
                difficulty: 'Moderate',
                description: 'The viewpoint peak looking directly at Segla across the Mefjord. Trailhead at Fjordgård. DNT Blue. Better photograph than Segla itself because Segla fills the frame from the summit.',
              },
              {
                name: 'Barden',
                slug: 'barden-senja-ridge-hike',
                distance: '11 km round trip',
                elevation: '775 m',
                time: '5–6 hours',
                difficulty: 'Hard',
                description: 'The big day out on northern Senja. Trailhead at Ersfjord. Long approach, steep final ridge with exposure, summit at 775m. DNT Red. Full Fjellvettreglene protocol. Summer only, dry conditions.',
              },
            ]}
            restaurants={[
              {
                name: 'Hamn i Senja',
                cuisine: 'Nordic seafood',
                priceRange: '450–700 NOK',
                highlight: 'Restored fishing village on the outer coast at Hamn. Dining room over the harbour. Local cod, halibut, and king crab in season. Hotel rooms and rorbu on site if you want to stay.',
              },
              {
                name: 'Mefjord Brygge',
                cuisine: 'Seafood',
                priceRange: '350–600 NOK',
                highlight: 'Working quay at Mefjordvær. Bring your own catch from the boat and the kitchen will cook it. If you did not fish, the menu runs daily from the local landing. Rorbu accommodation next door.',
              },
              {
                name: 'Lysthuset Andenes',
                cuisine: 'Local seafood',
                priceRange: '380–580 NOK',
                highlight: 'Andenes harbourfront restaurant. Stockfish, bacalao, and king crab. The whale-safari crowd eats here between the morning boat and the afternoon return. Book a table for dinner in peak season.',
              },
              {
                name: 'Bårdsens Brasseri, Andenes',
                cuisine: 'Bistro',
                priceRange: '300–520 NOK',
                highlight: 'Neighbourhood bistro in Andenes. Shorter menu, solid bread, fish-of-the-day plates. Locals eat here year-round, which is the point.',
              },
            ]}
          />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <DestinationBasecamps
            basecamps={senjaBasecamps}
            intro="Three bases cover Senja and Vesterålen without backtracking. Hamn for the outer coast and Segla. Finnsnes for services and the cheapest hotels. Andenes for year-round sperm whales and the northern tip of Vesterålen."
          />
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">When to visit</h2>
          <p className="text-slate-600 mb-10 max-w-2xl">
            Senja and Vesterålen switch seasons sharply. Plan around the window, not the other way around.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalWindows.map((w) => (
              <div key={w.label} className="border border-slate-200 rounded-lg p-6">
                <p className="text-xs font-bold text-[#1B3A5C] uppercase tracking-wider mb-1">{w.months}</p>
                <h3 className="font-bold text-slate-900 mb-3">{w.label}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{w.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">How to get here</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">✈️</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Fly to Tromsø (TOS), Harstad/Narvik (EVE), or Andenes (ANX)</p>
                <p className="text-slate-600 text-sm mb-3">
                  Tromsø is the easiest entry for Senja (2 to 3 hours drive plus the summer-only Brensholmen–Botnhamn ferry). Harstad/Narvik Evenes is the closest major airport to both archipelagos. Widerøe flies to Andenes directly.
                </p>
                <a href="https://www.kiwi.com/deep?from=OSL&to=TOS" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Search flights <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚗</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Drive from Tromsø or Harstad</p>
                <p className="text-slate-600 text-sm mb-3">
                  Tromsø to Senja (Botnhamn) via the summer ferry Brensholmen–Botnhamn: 40 minutes on the water, 3 hours total. Winter route via E6 and Finnsnes: 4 hours. Harstad to Andenes on the Andøya scenic route: 3 hours. Studded tyres required in winter.
                </p>
                <a href="https://www.discovercars.com/?pos=TOS" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Compare car rentals <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Hurtigruten to Stokmarknes or Sortland</p>
                <p className="text-slate-600 text-sm mb-3">
                  The Bergen–Kirkenes coastal route stops at both. Stokmarknes has the Hurtigruten Museum. From there, Andenes is 2 hours by car. Pair a Hurtigruten segment with a rental to see both archipelagos.
                </p>
                <a href="https://www.hurtigruten.com/en" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Browse sailings <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Itineraries that include Senja & Vesterålen</h2>
          <div className="space-y-4">
            {[
              '5-day Senja loop from Tromsø: Botnhamn ferry, Segla hike, Fv862 drive, 2 nights on the outer coast',
              '7-day Senja + Vesterålen: ferry to Senja, drive south to Andenes, sperm whale safari, Hurtigruten out of Stokmarknes',
              '10-day Lofoten–Vesterålen–Senja: fly Bodø, drive the E10 north, bridge to Vesterålen, ferry Gryllefjord–Andenes (summer only)',
            ].map((tour, i) => (
              <div key={i} className="bg-slate-50 rounded-lg border border-slate-200 p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1A365D]/10 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-[#1A365D]" aria-hidden="true" />
                </div>
                <p className="text-sm text-slate-700 font-medium">{tour}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Link href="/om-oss/bjorn-haugen" className="group flex items-start gap-5 bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-slate-200">
                <Image src="/pics/team/bjorn_profile.png" alt="Bjørn Haugen, Arctic Field Editor at NorgeTravel" fill className="object-cover" sizes="64px" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wide mb-1">The Arctic</p>
                <h3 className="font-bold text-slate-800 group-hover:text-[#1A365D] transition-colors">Bjørn Haugen</h3>
                <p className="text-sm text-slate-500 mb-2">Arktisk feltekspert | Arctic Field Editor</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  DNT-certified guide with 25 years in Nord-Norge. Senja is where he sends travellers who tell him Lofoten is already booked out, and who are willing to earn the view.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to plan Senja & Vesterålen?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Whale safaris, Segla hikes, and aurora on the outer coast — with commission-transparent affiliate links.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tjenester/northern-lights" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-md hover:shadow-lg transition-all">
              Northern Lights Tours <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/destinations/northern-norway" className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-md hover:bg-white/20 transition-all backdrop-blur-sm">
              All Northern Norway
            </Link>
          </div>
        </div>
      </section>
      <section className="relative z-10 py-10 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <ShareButtons url="/destinations/senja/" title="Senja & Vesterålen Travel Guide" />
        </div>
      </section>
    </main>
  );
}
