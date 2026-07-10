import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Thermometer, Compass } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { DestinationActivities } from '@/components/modules/destinations/DestinationActivities';
import { DestinationBasecamps, type Basecamp } from '@/components/modules/destinations/DestinationBasecamps';

const nordkappBasecamps: Basecamp[] = [
  {
    id: 'honningsvag',
    label: 'Honningsvåg',
    icon: 'navigation',
    name: 'Honningsvåg',
    tagline: 'Magerøya\'s main town and Hurtigruten stop',
    population: '~2,400',
    distance: '34 km / 45 min south of Nordkapp plateau',
    overview:
      'The functional town on Magerøya and the island\'s only proper service base. Hurtigruten calls here every day in both directions. Hotels, restaurants, supermarkets, cruise-terminal infrastructure. Busy in summer when two cruise ships share the harbour — genuinely quiet by October.',
    bestFor: ['Self-drive travellers needing full services', 'Hurtigruten passengers extending a stopover', 'Cruise-avoiders staying outside the June–August window'],
    notIdealFor: ['Travellers wanting a remote or scenic base', 'Anyone in peak cruise season looking for quiet mornings'],
    accommodation: [
      { name: 'Scandic Nordkapp', type: 'Chain hotel', price: '1,400–2,200 NOK/night', highlight: 'On the hillside above town, direct Nordkapp plateau views. Scandic breakfast, conference scale. The default for self-drive travellers.' },
      { name: 'Arran Nordkapp', type: 'Boutique rooms', price: '1,600–2,600 NOK/night', highlight: 'Small boutique hotel on the harbour. Quieter than the Scandic, better bar.' },
      { name: 'Nordkapp Turisthotell', type: 'Hotel', price: '1,100–1,700 NOK/night', highlight: 'Central, straightforward rooms. The budget option in town.' },
    ],
    dining: [
      { name: 'Corner Spiseri', detail: 'Harbourfront restaurant with an honest seafood menu. King crab, halibut, stockfish. Reliable dinner.' },
      { name: 'Sarnes Seaside Restaurant', detail: '20 min outside town at Sarnesfjord. Set menu, king crab focus, fjord-view dining room. Book ahead.' },
      { name: 'Riccos Kaffebar', detail: 'Central coffee and cake. The morning-briefing spot before the Nordkapp drive.' },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Coop Extra and Joker in town.' },
      { label: 'Fuel', available: true, detail: 'Circle K. Fill up before the Nordkapp drive — no fuel past Skarsvåg.' },
      { label: 'EV charging', available: true, detail: 'Rapid chargers at the Scandic and by the Coop.' },
      { label: 'Hurtigruten', available: true, detail: 'Daily calls, both directions. Southbound 06:15, northbound 11:45.' },
      { label: 'Airport', available: true, detail: 'Honningsvåg (HVG). Widerøe regional flights.' },
      { label: 'Hospital', available: false, detail: 'GP only. Nearest A&E: Hammerfest. Emergency: 113.' },
    ],
    insiderTip:
      'Drive to the Nordkapp plateau at 23:00 in July for the midnight-sun hour. The cruise coaches leave by 21:00, the Thai community fishermen at Skarsvåg have stopped work for the night, and the plateau is largely empty for a window of about 90 minutes.',
  },
  {
    id: 'skarsvag',
    label: 'Skarsvåg',
    icon: 'anchor',
    name: 'Skarsvåg',
    tagline: 'The northernmost fishing village in the world',
    population: '~40',
    distance: '15 km / 20 min south of Nordkapp plateau',
    overview:
      'A working fishing village at 71°06\'N, the closest settlement to the Nordkapp plateau. Dockside cabins, a single good restaurant, no supermarket. Come here for proximity to Nordkapp without the cruise-ship ambience of Honningsvåg, and for the working-harbour atmosphere that Honningsvåg has largely lost.',
    bestFor: ['Travellers wanting the closest base to the plateau', 'Quiet-first travellers avoiding the cruise schedule', 'Aurora photographers wanting dark skies without driving far'],
    notIdealFor: ['Travellers needing services or multiple dining options', 'Anyone without a car'],
    accommodation: [
      { name: 'Kirkeporten Camping', type: 'Cabins + camping', price: '900–1,800 NOK/night cabins', highlight: 'Family-run, wood cabins and motel rooms. Kirkeporten rock arch hike from the door. The best base for early-morning Nordkapp runs.' },
      { name: 'Nordkapp Camping Skarsvåg', type: 'Cabins', price: '800–1,500 NOK/night', highlight: 'Simpler alternative, self-catering cabins. Suits campervan travellers using hook-ups.' },
    ],
    dining: [
      { name: 'Kirkeporten Skarsvåg', detail: 'The one restaurant in the village. King crab, bacalao, reindeer. Set opening hours in shoulder season — check before you arrive.' },
    ],
    services: [
      { label: 'Grocery', available: false, detail: 'Nearest: Honningsvåg, 20 min drive.' },
      { label: 'Fuel', available: true, detail: 'One pump at the village — limited hours. Fill up in Honningsvåg.' },
      { label: 'EV charging', available: false, detail: 'None in the village. Charge in Honningsvåg before arriving.' },
      { label: 'Harbour', available: true, detail: 'Active fishing harbour. King crab boats work out of here year-round.' },
      { label: 'Hospital', available: false, detail: 'Nearest: Hammerfest. Emergency: 113.' },
    ],
    insiderTip:
      'The Kirkeporten rock arch is a 40-minute walk from the campsite. Shoot through the arch toward the Nordkapp plateau at golden hour in September — one of the best compositions on Magerøya and almost no one photographs it.',
  },
  {
    id: 'gjesvaer',
    label: 'Gjesvær',
    icon: 'ship',
    name: 'Gjesvær',
    tagline: 'Bird-cliff harbour on the west coast',
    population: '~120',
    distance: '35 km / 40 min west of Honningsvåg',
    overview:
      'A small working harbour on the west side of Magerøya, the departure point for Gjesværstappan bird-cliff safaris. Puffins, gannets, kittiwakes, sea eagles in colonies of hundreds of thousands from April to August. A quieter alternative to Honningsvåg if your focus is the birds and the coast.',
    bestFor: ['Birdwatchers targeting the Gjesværstappan colonies', 'Travellers wanting a working-harbour base', 'Photographers focused on the west-coast light'],
    notIdealFor: ['Travellers without a car', 'Winter travellers (most operators run May to August only)'],
    accommodation: [
      { name: 'Gjesvær Turistsenter', type: 'Cabins', price: '1,000–1,600 NOK/night', highlight: 'Harbourfront cabins, run by the bird-safari operator Stappan Sjøprodukter. Package deals on cabin + safari.' },
      { name: 'Nordkapp Villa', type: 'Guesthouse', price: '1,200–1,900 NOK/night', highlight: 'Small guesthouse with three rooms, breakfast included. The quieter alternative to the turistsenter.' },
    ],
    dining: [
      { name: 'Gjesvær Turistsenter café', detail: 'Fish soup, open sandwiches, coffee. The only café in the village. Tied to the safari schedule.' },
    ],
    services: [
      { label: 'Grocery', available: false, detail: 'Nearest: Honningsvåg, 40 min drive.' },
      { label: 'Fuel', available: false, detail: 'Fill up in Honningsvåg before arriving.' },
      { label: 'EV charging', available: false, detail: 'None. Charge in Honningsvåg.' },
      { label: 'Bird safari', available: true, detail: 'Stappan Sjøprodukter runs daily RIB safaris to Gjesværstappan, May to August.' },
      { label: 'Hospital', available: false, detail: 'Nearest: Hammerfest. Emergency: 113.' },
    ],
    insiderTip:
      'Book the 17:00 bird safari rather than the mid-morning one. The light is better for photography, and the puffins come back to the cliffs from the open sea to roost — so you see more activity on the rock than during the middle of the day.',
  },
];

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'North Cape (Nordkapp) Travel Guide 2026 | NorgeTravel',
  description:
    'Nordkapp at 71°10\u2032 N — the northernmost point of mainland Europe. Midnight sun from May 14, winter convoys on the E69, Honningsvåg as basecamp, and the Hurtigruten stop that most travellers miss.',
  alternates: { canonical: 'https://norgetravel.com/destinations/nordkapp' },
};

const facts = [
  { label: 'Latitude', value: '71°10\u2032 21\u2033 N' },
  { label: 'Basecamp', value: 'Honningsvåg (2,500)' },
  { label: 'Tunnel', value: 'Nordkapptunnelen 6.9 km' },
  { label: 'Midnight sun', value: 'May 14 – Jul 29' },
  { label: 'Polar night', value: 'Nov 20 – Jan 22' },
  { label: 'Entry fee', value: 'NOK 330 (2026)' },
];

const seasonalWindows = [
  { months: 'May – Jul', label: 'Midnight sun', detail: '24-hour daylight from May 14 to July 29. The plateau is busy — 200,000 visitors per year, concentrated in this window. Cruise ships dock in Honningsvåg.' },
  { months: 'Aug – Sep', label: 'Autumn shoulder', detail: 'Midnight sun gone, first auroras back by mid-September. Crowds thin. Weather is volatile — Mageroya gets hit hard by Barents Sea storms.' },
  { months: 'Nov – Feb', label: 'Polar night & winter convoy', detail: 'Sun does not rise November 20 to January 22. E69 to the cape runs as a convoy only — scheduled escorts from Skarsvåg, twice daily weather-permitting.' },
  { months: 'Mar – Apr', label: 'Light returns', detail: 'Full daylight back by late March, snow still on the ground, aurora still active. King crab safaris out of Honningsvåg and Kirkenes are running. Best all-round window.' },
];

export default function NordkappPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-slate-900 text-white -mt-20 pt-20">
        <Image
          src="/images/nordkapp/landscapes/nordkapp-cliff_trym-bergsmo.jpg"
          alt="North Cape cliff at 71°N — the northernmost point of mainland Europe"
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
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 max-w-3xl">North Cape</h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            71°10&#39; North. The northernmost point of mainland Europe. Midnight sun from mid-May to late July. A winter drive that runs as a convoy.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" /> −20°C to +12°C</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" /> Best: May–Jul (midnight sun) / Mar–Apr (aurora)</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#00CC6A]" aria-hidden="true" /> 2–3 days recommended</span>
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
          <h2 className="text-3xl font-bold text-slate-900 mb-4">About Nordkapp</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-slate-600 leading-relaxed">
                Nordkapp sits at 71°10&#39; 21&#8243; North on the island of Magerøya, in Finnmark. The cliff stands 307 m above the Barents Sea. It is marketed as the northernmost point of mainland Europe, which is almost true — the actual northernmost point is Knivskjelodden, the promontory 1 km west and 18 m further north, reachable by a 9 km hiking trail in summer.
              </p>
              <p className="text-slate-600 leading-relaxed">
                200,000 people make it to the cape every year. Most arrive in the midnight sun window between mid-May and late July. The visitor centre (Nordkapphallen) has a panoramic hall, a short film, a restaurant, and a bar. The entry fee is NOK 330 in 2026 and includes access to the plateau, the iron Globe monument, and the facilities. There is no cheaper way to reach the viewing platform.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Honningsvåg, 34 km south, is the logistics base — a town of 2,500 people, the administrative centre of Nordkapp municipality, and a Hurtigruten stop. In winter, the E69 from Skarsvåg to the cape runs as a convoy only — scheduled escorts, usually twice daily. The tunnel to Magerøya (Nordkapptunnelen, 6.9 km and 212 m below sea level) removed the ferry in 1999. The cape is now a road destination year-round — but winter is nothing like summer.
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
                  Late May to July for midnight sun, the headline experience. March to April for daylight with snow still on the ground and active aurora. Avoid November to mid-December — polar night plus early winter storms on the Barents Sea is the worst-value window.
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
            heading="What to do at North Cape"
            intro="The plateau itself, plus three reasons to stay more than one night on Magerøya. The midnight sun runs May 14 to July 29. The aurora window opens mid-September. The king crab boats run year-round when the Barents Sea lets them."
            featured={[
              {
                title: 'The cape & Globe monument',
                image: '/images/nordkapp/landscapes/nordkapp-view_dagny-oren.jpg',
                alt: 'The iron Globe monument at the Nordkapp plateau above the Barents Sea',
                body: 'Nordkapphallen visitor centre, viewing platform, Globe monument, panoramic film. Entry NOK 330. Allow 2 hours. Cruise-ship crush 11:00 to 15:00 in July. Visit at 22:00 or 03:00.',
              },
              {
                title: 'Knivskjelodden hike',
                image: '/images/nordkapp/midnight-sun/midnight-sun-knivskjellodden_kjell-bendik-pedersen.jpg',
                alt: 'Midnight sun over the Knivskjelodden promontory, the actual northernmost point of mainland Europe',
                body: 'The actual northernmost point. 9 km one-way, mostly flat, 4 to 5 hours round trip. Free. No entry fee, no crowd, and a sign-in book at the end. June to September only.',
              },
              {
                title: 'King crab safari, Honningsvåg',
                image: '/images/nordkapp/activities/king-crab-catch_tommy-andreassen.jpg',
                alt: 'King crab safari boat in the Barents Sea near Honningsvåg',
                body: 'RIB boat out into the Barents Sea, crabs pulled live from the sea, eaten immediately. 3 to 4 hours. Year-round, though winter trips depend heavily on weather.',
              },
              {
                title: 'Aurora over Magerøya',
                image: '/images/nordkapp/northern-lights/aurora-nordkapp_bjarne-riesto.jpg',
                alt: 'Northern Lights above the Nordkapp plateau in winter',
                body: 'Very low light pollution, but heavy coastal weather. Cloud is the main enemy. Mid-September to late March. Book 3 to 4 nights. One clear-sky night is not guaranteed.',
              },
            ]}
            tours={[
              {
                name: 'King crab safari, Honningsvåg',
                type: 'RIB · catch and eat',
                price: 'From 1,890 NOK',
                duration: '3–4 hours',
                highlight: 'RIB boat out of Honningsvåg harbour. Crabs pulled live and cooked dockside. Thermal suits provided. Winter trips run when the Barents Sea allows — check the day-before forecast.',
                affiliateUrl: 'https://www.getyourguide.com/s/?q=honningsvag+king+crab&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
              {
                name: 'Nordkapp plateau transfer from Honningsvåg',
                type: 'Coach · includes entry',
                price: 'From 790 NOK + 330 entry',
                duration: '4 hours',
                highlight: 'Scheduled coach from Honningsvåg harbour to the plateau, 34 km each way. Useful if you arrive on Hurtigruten without a car or want the convoy driven for you in winter.',
                affiliateUrl: 'https://www.getyourguide.com/s/?q=nordkapp+tour&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
              {
                name: 'Bird safari to Gjesvær (Birdsafari)',
                type: 'Boat · puffins and gannets',
                price: 'From 890 NOK',
                duration: '2 hours',
                highlight: 'The Gjesværstappan reserve holds hundreds of thousands of nesting seabirds — Atlantic puffin, gannet, kittiwake. May to mid-August only. Runs from Gjesvær, 30 km west of Honningsvåg.',
                affiliateUrl: 'https://www.getyourguide.com/s/?q=gjesvaer+bird+safari&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
              {
                name: 'Aurora chase, Magerøya',
                type: 'Minibus · small group',
                price: 'From 1,290 NOK',
                duration: '4–5 hours',
                highlight: 'Guide drives across Magerøya looking for a break in the coastal cloud. Lower success rate than inland Finnmark — book two or three consecutive nights. Late September to late March.',
                affiliateUrl: 'https://www.getyourguide.com/s/?q=nordkapp+northern+lights&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
            ]}
            toursFooterHref="https://www.getyourguide.com/s/?q=nordkapp&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-end"
            toursFooterLabel="See all North Cape tours on GetYourGuide"
            trails={[
              {
                name: 'Knivskjelodden',
                slug: 'knivskjelodden-nordkapp-hike',
                distance: '18 km round trip',
                elevation: '150 m',
                time: '4–5 hours',
                difficulty: 'Moderate',
                description: 'The actual northernmost point of mainland Europe. 9 km each way, mostly flat tundra, boggy in places. Sign-in book at the promontory. No entry fee. June to September only. DNT Blue.',
              },
              {
                name: 'Storfjellet, Honningsvåg',
                slug: 'storfjellet-honningsvag-hike',
                distance: '6 km',
                elevation: '275 m',
                time: '2–3 hours',
                difficulty: 'Easy',
                description: 'Marked trail from Honningsvåg to the summit above town. Views over the harbour and out toward Nordkapp. Snow-free mid-June to September. DNT Green.',
              },
              {
                name: 'Tufjordfjellet',
                slug: 'tufjordfjellet-magerya-coastal-hike',
                distance: '5 km',
                elevation: '280 m',
                time: '2 hours',
                difficulty: 'Easy',
                description: 'Short coastal hike on the west side of Magerøya above Gjesvær. Seabird colonies visible below on the Gjesværstappan reserve. Best combined with a bird-safari morning. DNT Green.',
              },
              {
                name: 'Duksfjordfjellet',
                slug: 'duksfjordfjellet-magerya-inland-hike',
                distance: '8 km',
                elevation: '420 m',
                time: '3–4 hours',
                difficulty: 'Moderate',
                description: 'Quieter inland summit above Duksfjord on southern Magerøya. Exposed tundra, reindeer territory in summer. Carry navigation — the cairns are sparse. DNT Blue.',
              },
            ]}
            restaurants={[
              {
                name: 'Corner Spiseri, Honningsvåg',
                cuisine: 'Arctic · bistro',
                priceRange: '350–550 NOK mains',
                highlight: 'Central Honningsvåg bistro. King crab in season, halibut, reindeer. The most reliable evening option in town and popular with Hurtigruten crews on turnaround.',
                rating: 4.5,
              },
              {
                name: 'Kirkeporten Restaurant, Skarsvåg',
                cuisine: 'Traditional Norwegian',
                priceRange: '300–500 NOK mains',
                highlight: 'The stop on the drive to the cape. Small hotel restaurant in "the world\'s northernmost fishing village." Bacalao, cod, reindeer. Open year-round, winter hours limited.',
                rating: 4.4,
              },
              {
                name: 'Sarnes Seaside Restaurant',
                cuisine: 'Seafood · fjord-side',
                priceRange: '400–650 NOK mains',
                highlight: 'On the E69 between Olderfjord and Honningsvåg, south of the tunnel. Worth the stop on the drive up. Arctic char and king crab. Reservation recommended in summer.',
                rating: 4.6,
              },
              {
                name: 'Riccos Kaffebar, Honningsvåg',
                cuisine: 'Café · breakfast and lunch',
                priceRange: '90–180 NOK',
                highlight: 'Daytime café in the harbour. Good coffee, soups, waffles with brown cheese. Useful for a pre-safari meal or a rainy-afternoon hide. Closes evenings.',
                rating: 4.7,
              },
            ]}
          />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <DestinationBasecamps
            basecamps={nordkappBasecamps}
            intro="Three bases on Magerøya. Honningsvåg for services and the Hurtigruten call. Skarsvåg for the closest approach to the plateau. Gjesvær for the bird-cliffs at Gjesværstappan."
          />
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">When to visit</h2>
          <p className="text-slate-600 mb-10 max-w-2xl">
            The cape delivers a radically different experience across the year. Pick the season deliberately.
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
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Hurtigruten to Honningsvåg</p>
                <p className="text-slate-600 text-sm mb-3">
                  Nordkapp is one of the headline port calls on the Bergen–Kirkenes coastal route. Northbound arrivals are timed to allow the optional cape excursion. The most common way visitors reach the cape — and the easiest in winter.
                </p>
                <a href="https://www.hurtigruten.com/en" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Browse sailings <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">✈️</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Fly to Honningsvåg (HVG) or Alta (ALF)</p>
                <p className="text-slate-600 text-sm mb-3">
                  Widerøe flies to Honningsvåg with connections from Tromsø. Alta is the larger airport — 240 km south of Honningsvåg, 3 hours 30 minutes by road. Most self-drive travellers route Oslo–Alta–Nordkapp.
                </p>
                <a href="https://www.kiwi.com/deep?from=OSL&to=ALF" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Search flights <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚗</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Drive the E6 and E69 — winter convoy applies</p>
                <p className="text-slate-600 text-sm mb-3">
                  Alta to Nordkapp: 240 km via E6 and E69. The Nordkapptunnelen (6.9 km, 212 m below sea level) connects Magerøya to the mainland. In winter, the final 14 km from Skarsvåg to the cape runs as a convoy only — twice daily escorts, weather-dependent. Studded tyres mandatory.
                </p>
                <a href="https://www.discovercars.com/?pos=ALF" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Compare car rentals <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Itineraries that include Nordkapp</h2>
          <div className="space-y-4">
            {[
              '3-day Nordkapp add-on from Alta: Alta – Honningsvåg – Nordkapp – back via Hammerfest',
              '5-day Finnmark coast loop: Alta – Hammerfest – Honningsvåg – Nordkapp – Kirkenes',
              '12-day Hurtigruten round trip Bergen–Kirkenes–Bergen: Nordkapp on day 6 northbound',
              '7-day summer midnight-sun trip: Tromsø – Alta – Nordkapp – return by Widerøe',
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
                  DNT-certified guide with 25 years in Nord-Norge. One night at Nordkapp is the common trap — the weather wins more often than the calendar. Build in a second night on Magerøya.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to book Nordkapp?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Hurtigruten segments, king crab safaris, and aurora weeks — with commission-transparent affiliate links.
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
          <ShareButtons url="/destinations/nordkapp/" title="North Cape Travel Guide" />
        </div>
      </section>
    </main>
  );
}
