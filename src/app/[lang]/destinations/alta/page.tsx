import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Thermometer, Compass } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { DestinationActivities } from '@/components/modules/destinations/DestinationActivities';
import { DestinationBasecamps, type Basecamp } from '@/components/modules/destinations/DestinationBasecamps';

const altaBasecamps: Basecamp[] = [
  {
    id: 'alta',
    label: 'Alta town',
    icon: 'navigation',
    name: 'Alta',
    tagline: 'Finnmark logistics hub, airport and hospital',
    population: '~21,000',
    distance: 'Alta (ALF) airport · E6 gateway to Finnmark',
    overview:
      'The functional town at the head of Altafjord. Airport, hospital, cathedral, supermarkets, chain hotels. Not scenic by Finnmark standards, but the only complete service base between Tromsø and Kirkenes. The UNESCO-listed Alta rock carvings at Hjemmeluft are 5 minutes from the centre.',
    bestFor: ['Self-drive travellers using Alta as a Finnmark hub', 'Aurora travellers flying direct to ALF', 'Winter travellers wanting reliable services at −25°C'],
    notIdealFor: ['Travellers wanting a scenic or cultural base', 'Anyone staying more than 2 nights without a car'],
    accommodation: [
      { name: 'Scandic Alta', type: 'Chain hotel', price: '1,200–1,900 NOK/night', highlight: 'Largest hotel in town, central, reliable Scandic breakfast. Aurora tours pick up from the lobby.' },
      { name: 'Thon Hotel Alta', type: 'Chain hotel', price: '1,100–1,800 NOK/night', highlight: 'Central alternative. Thon standard, dependable breakfast.' },
      { name: 'Trasti & Trine', type: 'Boutique wilderness lodge', price: '2,400–4,200 NOK/night half-board', highlight: '15 min from town. Run by a chef and a musher. Dog-sledding on site, highly rated restaurant. The non-hotel option.' },
    ],
    dining: [
      { name: 'Trasti & Trine', detail: 'Finnmark fine dining in a timber lodge. Reindeer, Arctic char, cloudberries. The best meal in Alta and worth the 15-minute drive.' },
      { name: 'Du Verden Alta', detail: 'Town-centre seafood restaurant. King crab, halibut. Reliable evening option.' },
      { name: 'Haldde Restaurant (Thon)', detail: 'Hotel restaurant with a short regional menu. Fine for a walk-in dinner after a late aurora tour.' },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Coop Extra, Rema 1000, Kiwi. Stock up before heading further into Finnmark.' },
      { label: 'Fuel', available: true, detail: 'Multiple stations. Fill up before the E6 drive north or east.' },
      { label: 'EV charging', available: true, detail: 'Rapid chargers at Circle K and the airport.' },
      { label: 'Airport', available: true, detail: 'Alta (ALF). Direct SAS and Norwegian from Oslo. Widerøe regional connections.' },
      { label: 'Hospital', available: true, detail: 'Klinikk Alta — regional hospital with A&E. Emergency: 113.' },
    ],
    insiderTip:
      'Alta has genuine cold. Inland Finnmark hits −30°C regularly in January and February. Rental cars need engine block heaters plugged in overnight. Confirm the plug-in parking space when you check in or the car will not start in the morning.',
  },
  {
    id: 'sorrisniva',
    label: 'Sorrisniva',
    icon: 'snowflake',
    name: 'Sorrisniva',
    tagline: 'Igloo hotel and riverside lodge',
    population: '—',
    distance: '20 km south of Alta · 25 min drive',
    overview:
      'A family-run operation on the Alta river. The Sorrisniva Igloo Hotel is rebuilt from snow every winter (December to April). A year-round timber Arctic Wilderness Lodge runs alongside it. Dog sledding, snowmobiling, salmon fishing in summer. Self-contained.',
    bestFor: ['Travellers wanting the one-night igloo experience with a warm lodge backup', 'Winter activity focus (dog sled, snowmobile, aurora)', 'Couples and small groups on a splurge'],
    notIdealFor: ['Travellers needing town services', 'Anyone on a budget', 'Summer travellers focused on rock art and fjord culture'],
    accommodation: [
      { name: 'Sorrisniva Igloo Hotel', type: 'Ice hotel', price: 'From 4,500 NOK/night', highlight: 'Rebuilt from snow every year. Suite-style ice rooms, thermal sleeping bags, breakfast in the adjacent lodge. December to April only. One night is enough.' },
      { name: 'Sorrisniva Arctic Wilderness Lodge', type: 'Boutique lodge', price: '2,800–4,200 NOK/night', highlight: 'Year-round timber lodge on the river. Full-service, restaurant on site, heated throughout. The practical base.' },
    ],
    dining: [
      { name: 'Laksestua Sorrisniva', detail: 'Acclaimed riverside restaurant. Alta river salmon, reindeer, ptarmigan. Set menu in peak season, booking essential.' },
    ],
    services: [
      { label: 'Grocery', available: false, detail: 'Nearest: Alta, 25 min drive.' },
      { label: 'Fuel', available: false, detail: 'Fill up in Alta before arriving.' },
      { label: 'EV charging', available: true, detail: 'Charger on site for lodge guests.' },
      { label: 'Activity desk', available: true, detail: 'Dog sledding, snowmobile, aurora, salmon fishing — all operated in-house.' },
      { label: 'Hospital', available: false, detail: 'Nearest: Klinikk Alta, 25 min. Emergency: 113.' },
    ],
    insiderTip:
      'Book the igloo for one night only, with the timber lodge either side. You experience the ice room, photograph the aurora from the doorstep, and then return to a heated bed on night two. That is how the locals recommend it.',
  },
  {
    id: 'kautokeino',
    label: 'Kautokeino',
    icon: 'mountain',
    name: 'Kautokeino',
    tagline: 'Sámi cultural centre on the Finnmarksvidda',
    population: '~2,900',
    distance: '130 km south of Alta · 2 hr drive on the E45',
    overview:
      'The Sámi-majority municipality on the Finnmark plateau. Sámi University of Applied Sciences, the Beaivváš Sámi National Theatre, the annual Easter Festival. This is not a tourist town — it is a working Sámi community. Travellers come here on Sámi terms, not as spectators.',
    bestFor: ['Travellers wanting Sámi cultural context from Sámi-run organizations', 'Easter Festival visitors (late March / early April)', 'Winter travellers wanting the Finnmarksvidda plateau experience'],
    notIdealFor: ['Travellers wanting nightlife or urban dining', 'Anyone uncomfortable with limited services'],
    accommodation: [
      { name: 'Thon Hotel Kautokeino', type: 'Hotel', price: '1,200–1,900 NOK/night', highlight: 'The main hotel in town. Sámi-design interiors, restaurant on site, aurora pickup. Books out entirely during the Easter Festival — reserve 6 months ahead for that week.' },
      { name: 'Arctic Gold Adventure', type: 'Lavvu camp', price: '1,600–2,800 NOK/night', highlight: 'Traditional Sámi lavvu tents with beds and stoves. Run by a Sámi family. Winter only.' },
    ],
    dining: [
      { name: 'Thon Hotel Kautokeino restaurant', detail: 'Reindeer, bidos (Sámi reindeer stew), cloudberries. The reliable dinner option in town.' },
      { name: 'Cafe Suohpan', detail: 'Small café at the Juhls Silver Gallery. Lunch, coffee, cake. Worth combining with a gallery visit.' },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Coop in the village centre.' },
      { label: 'Fuel', available: true, detail: 'One station. Fill up — there is nothing for 130 km back to Alta.' },
      { label: 'EV charging', available: true, detail: 'Rapid charger at the Coop.' },
      { label: 'Cultural institutions', available: true, detail: 'Sámi University, Beaivváš Sámi National Theatre, Juhls Silver Gallery.' },
      { label: 'Hospital', available: false, detail: 'GP only. Nearest A&E: Alta, 2 hr drive. Emergency: 113.' },
    ],
    insiderTip:
      'If you come for the Easter Festival (late March / early April), book accommodation in October. It is the most important Sámi cultural event of the year — reindeer racing, the Sámi Grand Prix, joik concerts — and the town fills entirely. Respectful attendance is the expectation, not photography.',
  },
  {
    id: 'karasjok',
    label: 'Karasjok',
    icon: 'compass',
    name: 'Karasjok',
    tagline: 'Seat of the Sámi Parliament',
    population: '~2,600',
    distance: '260 km east of Alta · 3 hr 30 min drive on the E6',
    overview:
      'Karasjok is the administrative and political heart of Norwegian Sápmi — home to Sámediggi (the Sámi Parliament), NRK Sápmi, and the RiddoDuottarMuseat network. The parliament building, designed by Stein Halvorsen and Christian Sundby in 2000, is itself worth the drive: a curved timber structure evoking a lavvu. Inland plateau climate means drier winters and stronger cold than the coast. Useful as a stop on a Finnmark loop to Nordkapp, or as a cultural counterpoint to Kautokeino.',
    bestFor: ['Travellers tracing the institutional side of Sámi culture — parliament, archive, museum', 'Finnmark loop drivers (Alta – Kautokeino – Karasjok – Nordkapp)', 'Winter aurora chasers wanting the drier inland plateau sky'],
    notIdealFor: ['Travellers without a car', 'Anyone wanting coastal scenery or fjord access', 'Short-trip visitors basing themselves in one town'],
    accommodation: [
      { name: 'Scandic Karasjok', type: 'Hotel', price: '1,400–2,100 NOK/night', highlight: 'The main hotel in town. Sámi-themed interiors, restaurant serving bidos and reindeer, aurora pickup in winter. Walking distance to Sámediggi and the Sámi museum.' },
      { name: 'Engholm Husky Design Lodge', type: 'Handbuilt cabins', price: '2,400–3,800 NOK/night', highlight: 'Sven Engholm\u2019s hand-built cabins 6 km west of town. Husky kennels on site, dog sledding from the doorstep, riverside sauna. Winter only for sledding.' },
    ],
    dining: [
      { name: 'Scandic Karasjok restaurant', detail: 'Reindeer, bidos, cloudberries. The reliable dinner option. Lunch buffet on festival and event days.' },
      { name: 'Biepmu Kafea (Sápmi Park)', detail: 'Sámi-run café at Sápmi Kulturpark. Lunch plates, reindeer sandwiches, coffee. Open with park hours only.' },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Coop Extra and Rema 1000 in the village.' },
      { label: 'Fuel', available: true, detail: 'Two stations on the E6. Fill up before heading north to Nordkapp or east to Tana.' },
      { label: 'EV charging', available: true, detail: 'Rapid chargers at the Circle K and at Scandic Karasjok.' },
      { label: 'Cultural institutions', available: true, detail: 'Sámediggi (Sámi Parliament, free guided tours), RiddoDuottarMuseat — De Samiske Samlinger, Sápmi Kulturpark, NRK Sápmi headquarters.' },
      { label: 'Hospital', available: false, detail: 'GP only. Nearest A&E: Hammerfest (4 hr) or Kirkenes (3 hr 30 min). Emergency: 113.' },
    ],
    insiderTip:
      'Book the Sámediggi guided tour in advance through sametinget.no — it runs weekdays at 12:30 in summer, fewer slots in winter. The architecture alone is worth the visit: the plenary hall is shaped like a lavvu, and the library is lined with 19,000 Sámi-language books. Combine with an afternoon at De Samiske Samlinger across the river.',
  },
];

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Alta & Sápmi Travel Guide 2026 | NorgeTravel',
  description:
    'Alta, Finnmark, and the Sami heartland. UNESCO rock carvings 7,000 years old, Finnmarksløpet dog race, Kautokeino Easter Festival, and aurora above the Finnmarksvidda plateau.',
  alternates: { canonical: 'https://norgetravel.com/destinations/alta' },
};

const facts = [
  { label: 'Location', value: 'Finnmark (70°N)' },
  { label: 'Alta population', value: '21,400' },
  { label: 'Kautokeino', value: '2,900' },
  { label: 'Karasjok', value: '2,600' },
  { label: 'UNESCO', value: 'Alta Rock Art (1985)' },
  { label: 'Fly from Oslo', value: '2h direct (ALF)' },
];

const seasonalWindows = [
  { months: 'Nov – Mar', label: 'Aurora over Finnmarksvidda', detail: 'Alta markets itself as "City of the Northern Lights." The plateau above town has some of the most consistent clear-sky statistics in Nord-Norge.' },
  { months: 'Feb – Apr', label: 'Dog sledding & Finnmarksløpet', detail: 'Snow reliable, temperatures manageable. Finnmarksløpet is Europe&apos;s longest sled dog race — 1,200 km starting in Alta. Second week of March.' },
  { months: 'Easter', label: 'Sami Easter Festival, Kautokeino', detail: 'The cultural event of the Sami calendar. Reindeer racing, joik concerts, the Sami Grand Prix. Sami-led, Sami-run. Attend as a respectful guest.' },
  { months: 'May – Jul', label: 'Midnight sun on the Alta River', detail: 'Alta sits at 70°N — midnight sun from May 17 to July 26. Salmon fishing on the Altaelva, and the canyon is accessible by riverboat.' },
];

export default function AltaPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-slate-900 text-white -mt-20 pt-20">
        <Image
          src="/images/alta/northern-lights/aurora-alta_anne-olsen-ryum.jpg"
          alt="Northern Lights arching over Alta, Finnmark"
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
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 max-w-3xl">Alta & Sápmi</h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            UNESCO rock carvings 7,000 years old. The Sami heartland on the Finnmarksvidda plateau. Europe&apos;s longest sled dog race. Gateway to the interior of Finnmark.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" /> −25°C to +18°C</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" /> Best: Nov–Mar (aurora) / Easter (Sami)</span>
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
          <h2 className="text-3xl font-bold text-slate-900 mb-4">About Alta & Sápmi</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-slate-600 leading-relaxed">
                Alta is the largest town in Finnmark — 21,400 residents at 70°N, on the inner stretch of the Altafjord. The town markets itself as the City of the Northern Lights, and the claim is backed up by the cloud statistics: Finnmarksvidda, the plateau above town, has some of the clearest winter skies in Nord-Norge. The world&apos;s first permanent observatory for aurora research operated in Alta from 1899. The science is not a tourist story. It is the town&apos;s actual history.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Above and around Alta lies Sápmi — the cultural region of the Sami people, Norway&apos;s Indigenous community. Kautokeino (Guovdageaidnu) is a Sami-majority municipality, 2,900 residents, and hosts the Sami Easter Festival every year — the cultural anchor of the Sami calendar. Karasjok (Kárášjohka) is home to the Sami Parliament, Sámediggi. The Finnmarksvidda plateau, 22,000 km², is active reindeer herding territory. You are crossing a working cultural landscape, not a backdrop.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The Alta Rock Art UNESCO site at Hjemmeluft dates to 4,200 to 500 BC — 7,000 years of hunting, fishing, and shamanic imagery carved into the bedrock. In winter, Alta runs dog sledding, snowmobile tours on the plateau, and the Sorrisniva Igloo Hotel (rebuilt annually from river ice). Finnmarksløpet, Europe&apos;s longest sled dog race at 1,200 km, starts and finishes in Alta the second week of March. This is an Arctic town that works — and one of the best places in Norway for aurora.
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
                  November to March for aurora. February to April for dog sledding. Easter for the Sami festival in Kautokeino — Sami-led event, Sami-run programming. May to July for midnight sun and salmon season on the Alta River.
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
            heading="What to do in Alta & Sápmi"
            intro="Four anchors for an Alta and Sápmi trip. UNESCO rock art at Hjemmeluft, aurora chases onto the Finnmarksvidda plateau, the Sami Easter Festival at Kautokeino, and the dog-sledding and ice-hotel cluster around the Alta River."
            featured={[
              {
                title: 'Alta Rock Art UNESCO',
                image: '/images/alta/culture-history/alta-rock-carvings.jpg',
                alt: 'Prehistoric rock carvings at the Alta UNESCO site in Hjemmeluft',
                body: '7,000 years of carvings at Hjemmeluft. Open-air trail, ~3 km, allow 2 hours. The Alta Museum on site is world-class. Closed in deep winter. Check hours.',
              },
              {
                title: 'Aurora on the plateau',
                image: '/images/alta/northern-lights/aurora-hunting-alta.jpg',
                alt: 'Aurora hunting tour with guide on the Finnmarksvidda plateau',
                body: 'Finnmarksvidda has clearer winter skies than the coast. Guided chases drive 30 to 100 km from Alta to find clear windows. KP 3+ and the plateau delivers.',
              },
              {
                title: 'Sami Easter Festival, Kautokeino',
                image: '/images/sapmi/sami-culture/kautokeino-easter-festival_jorn-tomter.jpg',
                alt: 'Sami Easter Festival in Kautokeino with reindeer racing and traditional gakti dress',
                body: 'The cultural event of the Sami calendar. Reindeer racing on the frozen river, joik concerts, Sami Grand Prix. Book accommodation 6 months ahead. The town fills up.',
              },
              {
                title: 'Sorrisniva & dog sledding',
                image: '/images/alta/activities/sorrisniva-igloo_yngve-olsen.jpg',
                alt: 'Sorrisniva Igloo Hotel built from river ice near Alta',
                body: 'Sorrisniva Igloo Hotel is rebuilt annually from Alta River ice. Open mid-December to early April. Dog sledding operators like Holmen Husky run half-day and overnight trips.',
              },
            ]}
            tours={[
              {
                name: 'Aurora chase from Alta',
                type: 'Small-group minibus chase',
                price: 'From 1,590 NOK',
                duration: '5–6 hours',
                highlight: 'Drive 30 to 100 km onto the Finnmarksvidda plateau to find clear sky. Thermal suits, tripods, and hot drinks included. Book three consecutive nights for weather contingency.',
                affiliateUrl: 'https://www.getyourguide.com/s/?q=alta+northern+lights&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
              {
                name: 'Holmen Husky, half-day sledding',
                type: 'Drive-your-own sled',
                price: 'From 1,990 NOK',
                duration: '4 hours',
                highlight: 'Family-run kennel outside Alta. Drive your own team through the forest above the Alta River. Transfer from town included. December to mid-April.',
                affiliateUrl: 'https://www.getyourguide.com/s/?q=alta+dog+sledding&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
              {
                name: 'Sorrisniva Igloo Hotel overnight',
                type: 'Ice hotel · full package',
                price: 'From 4,500 NOK',
                duration: '1 night',
                highlight: 'Rebuilt annually from Alta River ice. Includes ice bar, thermal sleeping bag brief, dinner at Laksestua, morning sauna. Open mid-December to early April.',
                affiliateUrl: 'https://www.getyourguide.com/s/?q=sorrisniva&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
              {
                name: 'Alta Rock Art guided tour',
                type: 'UNESCO site · with archaeologist',
                price: 'From 590 NOK',
                duration: '2 hours',
                highlight: 'Guided walk through the Hjemmeluft carvings with a museum archaeologist. Context for 7,000 years of imagery you would miss on a self-guided visit. Summer and shoulder season only.',
                affiliateUrl: 'https://www.getyourguide.com/s/?q=alta+rock+art&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
            ]}
            toursFooterHref="https://www.getyourguide.com/s/?q=alta&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-end"
            toursFooterLabel="See all Alta & Finnmark tours on GetYourGuide"
            trails={[
              {
                name: 'Haldde',
                slug: 'haldde-alta-observatory-hike',
                distance: '10 km',
                elevation: '904 m',
                time: '5–6 hours',
                difficulty: 'Moderate',
                description: 'The old aurora observatory summit above Kåfjord. First permanent aurora research station in the world, 1899. Stone ruins on top. Clear day gives sight lines across Altafjord to the Seiland glacier. DNT Blue.',
              },
              {
                name: 'Komsafjellet',
                slug: 'komsafjellet-alta-short-hike',
                distance: '4 km',
                elevation: '212 m',
                time: '1–2 hours',
                difficulty: 'Easy',
                description: 'Short hike from central Alta to the summit above town. View over the fjord and the rock art site at Hjemmeluft. A good after-flight leg-stretcher. DNT Green.',
              },
              {
                name: 'Rafsbotnfjellet',
                slug: 'rafsbotnfjellet-alta-family-hike',
                distance: '8 km',
                elevation: '558 m',
                time: '3–4 hours',
                difficulty: 'Moderate',
                description: 'Family hike 20 minutes east of Alta. Marked trail through birch forest to an open plateau with cairn and fjord views. Snow-free late May to mid-October. DNT Blue.',
              },
              {
                name: 'Storvikaksla, Seiland approach',
                slug: 'storvikaksla-seiland-ridge-hike',
                distance: '14 km',
                elevation: '750 m',
                time: '6–7 hours',
                difficulty: 'Hard',
                description: 'Requires the ferry to Seiland island, west of Alta. Empty terrain, arctic fox country, glaciated summit in the distance. Solid navigation needed. DNT Red.',
              },
            ]}
            restaurants={[
              {
                name: 'Trasti & Trine',
                cuisine: 'Modern Arctic · tasting menus',
                priceRange: 'Set menu, ~1,400 NOK',
                highlight: 'The Alta food institution. Tasting menus built around Finnmark ingredients: reindeer, ptarmigan, cloudberries, Arctic char. Run by a former Finnmarksløpet musher couple. Book weeks ahead.',
                rating: 4.8,
              },
              {
                name: 'Laksestua, Sorrisniva',
                cuisine: 'Norwegian · river lodge',
                priceRange: '500–900 NOK mains',
                highlight: 'Timber dining room beside the Alta River. Salmon from the river in season, reindeer in winter. Part of the Sorrisniva complex. Non-guest dinners available — book ahead.',
                rating: 4.7,
              },
              {
                name: 'Du Verden Alta',
                cuisine: 'Contemporary · bistro',
                priceRange: '350–550 NOK mains',
                highlight: 'Central Alta bistro. Arctic char, halibut, reindeer burger. More accessible than Trasti & Trine and easier to get into same-day. Good wine list.',
                rating: 4.5,
              },
              {
                name: 'Thon Hotel Kautokeino restaurant',
                cuisine: 'Sami-influenced · hotel dining',
                priceRange: '300–500 NOK mains',
                highlight: 'The dependable Kautokeino option outside festival season. Bidos reindeer stew, flatbread, cloudberry dessert. The Juhls silver gallery is a 10-minute walk.',
                rating: 4.3,
              },
            ]}
          />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <DestinationBasecamps
            basecamps={altaBasecamps}
            intro="Three bases cover Alta and Sápmi. The town itself for services and the airport. Sorrisniva for the igloo and the riverside lodge. Kautokeino on the Finnmarksvidda for Sámi cultural context — visited on Sámi terms, not as a tourist stop."
          />
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">When to visit</h2>
          <p className="text-slate-600 mb-10 max-w-2xl">
            Finnmark swings from −25°C in February to midnight sun in June. Your window shapes your trip.
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
                <p className="font-bold text-slate-900">Fly to Alta (ALF)</p>
                <p className="text-slate-600 text-sm mb-3">
                  SAS and Norwegian fly direct from Oslo. 2 hours. Alta Airport is 4 km from the town centre — taxi or rental car. Widerøe connects smaller Finnmark airports (Hammerfest, Kirkenes, Lakselv).
                </p>
                <a href="https://www.kiwi.com/deep?from=OSL&to=ALF" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Search flights <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚗</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Drive the E6 through Finnmark</p>
                <p className="text-slate-600 text-sm mb-3">
                  Tromsø to Alta: 409 km via E6 and E8, 6 hours in summer, longer in winter. Alta to Kautokeino: 130 km, 2 hours. Alta to Karasjok: 260 km, 3 hours 30 minutes. Studded tyres required November 1 to the first Sunday after Easter in Nord-Norge.
                </p>
                <a href="https://www.discovercars.com/?pos=ALF" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Compare car rentals <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Hurtigruten to Hammerfest or Honningsvåg</p>
                <p className="text-slate-600 text-sm mb-3">
                  The Bergen–Kirkenes coastal route stops at Hammerfest (3 hours by road from Alta) and Honningsvåg (4 hours 30 minutes). Pair a northbound Hurtigruten segment with a rental out of Alta.
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
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Itineraries that include Alta & Sápmi</h2>
          <div className="space-y-4">
            {[
              '5-day Alta aurora week: 3 aurora chases, 1 dog sled day, 1 rock art & museum day, 1 Sorrisniva overnight',
              '7-day Finnmark loop: Alta – Kautokeino – Karasjok – Tana – Nordkapp, by rental car',
              '10-day Sami Easter special: arrive Alta, transfer to Kautokeino for the festival, return via Karasjok and the Sámediggi',
              '14-day Finnmark + North Cape: combine Alta, Hammerfest, Honningsvåg, and Kirkenes with Hurtigruten and rental segments',
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
                  DNT-certified guide with 25 years in Nord-Norge. Sami cultural events are Sami-led and Sami-programmed — attend as a respectful guest, not an audience. Book through Sami-run operators.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to book Alta & Sápmi?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Aurora chases, dog sledding, Sami-led cultural experiences — with commission-transparent affiliate links.
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
          <ShareButtons url="/destinations/alta/" title="Alta & Sápmi Travel Guide" />
        </div>
      </section>
    </main>
  );
}
