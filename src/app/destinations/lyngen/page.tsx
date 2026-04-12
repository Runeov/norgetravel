import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Thermometer, Compass } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { DestinationActivities } from '@/components/modules/destinations/DestinationActivities';
import { DestinationBasecamps, type Basecamp } from '@/components/modules/destinations/DestinationBasecamps';

const lyngenBasecamps: Basecamp[] = [
  {
    id: 'lyngseidet',
    label: 'Lyngseidet',
    icon: 'navigation',
    name: 'Lyngseidet',
    tagline: 'Administrative centre on the peninsula',
    population: '~900',
    distance: 'Lyngen peninsula · 2 hr from Tromsø via Olderdalen ferry',
    overview:
      'The main village on the Lyngen peninsula. Grocery, fuel, medical centre, and the ferry link east to Olderdalen. A practical base if you want to ski the peaks directly above town without a long drive each morning.',
    bestFor: ['Self-drive ski tourers targeting the peninsula', 'Travellers needing services on-peninsula', 'Budget travellers wanting a real village, not a lodge'],
    notIdealFor: ['Travellers without a car', 'Luxury travellers wanting lodge service'],
    accommodation: [
      { name: 'Magic Mountain Lodge', type: 'Boutique lodge', price: '1,800–3,200 NOK/night', highlight: 'Run by ski guides. Half-board, drying room, avalanche-transceiver rentals. The serious ski-touring option in Lyngseidet.' },
      { name: 'Lyngstuva Lodge', type: 'Guesthouse', price: '1,200–1,900 NOK/night', highlight: 'Simpler base in the village. Self-catering kitchen, fjord-view rooms.' },
    ],
    dining: [
      { name: 'Magic Mountain Lodge restaurant', detail: 'Half-board set menu for guides and guests. Walk-ins possible when space allows. Reindeer, Arctic char.' },
      { name: 'Kafe Kvinnfolk', detail: 'Village café, lunch plates, cakes. Closed evenings.' },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Coop Extra in the village.' },
      { label: 'Fuel', available: true, detail: 'One station. Fill up before heading further up the peninsula.' },
      { label: 'EV charging', available: true, detail: 'Rapid charger at the Coop.' },
      { label: 'Ferry', available: true, detail: 'Lyngseidet–Olderdalen hourly, 40 min crossing. Cuts the Tromsø drive by an hour.' },
      { label: 'Medical centre', available: true, detail: 'GP in the village. Emergency: 113.' },
    ],
    insiderTip:
      'The Olderdalen ferry is the key to flexible days. Ski on the peninsula, cross east, and drive back to Tromsø via the E6 instead of around Ullsfjord. Saves over an hour to the airport.',
  },
  {
    id: 'djupvik',
    label: 'Djupvik',
    icon: 'ship',
    name: 'Djupvik / Koppangen',
    tagline: 'Lodges on the west shore of Lyngenfjord',
    population: '~50',
    distance: 'West shore of Lyngenfjord · 1 hr 45 min from Tromsø',
    overview:
      'A string of lodges on the west side of Lyngenfjord facing directly across to the highest peaks. No village, no services — just the water, the road, and the view. The premium ski-touring base for full-service guiding and catering.',
    bestFor: ['Guided ski-touring weeks with catering included', 'Photographers wanting the classic Lyngen skyline from the doorstep', 'Couples booking an all-inclusive stay'],
    notIdealFor: ['Self-catering travellers', 'Anyone wanting a village atmosphere', 'Budget travellers'],
    accommodation: [
      { name: 'Lyngen Lodge', type: 'Luxury lodge', price: 'From 3,800 NOK/night half-board', highlight: 'British-run ski lodge at Djupvik. Half-board, guide desk, boat access to remote peaks. Week-long packages in the ski season.' },
      { name: 'Koppangen Brygger', type: 'Cabin rentals', price: '2,200–3,500 NOK/night', highlight: 'Sea-facing cabins at Koppangen, 15 min north of Djupvik. Self-catering. Photographers\' favourite.' },
    ],
    dining: [
      { name: 'Lyngen Lodge dining room', detail: 'Guest-only half-board. One of the best tables in Nord-Norge. Reindeer, king crab, Arctic char.' },
      { name: 'Koppangen Brygger', detail: 'Self-catering. Nearest restaurant: Magic Mountain Lodge in Lyngseidet (30 min south).' },
    ],
    services: [
      { label: 'Grocery', available: false, detail: 'Nearest: Lyngseidet (30 min) or Nordkjosbotn (45 min).' },
      { label: 'Fuel', available: false, detail: 'Fill up in Nordkjosbotn or Lyngseidet before arriving.' },
      { label: 'EV charging', available: true, detail: 'Chargers at Lyngen Lodge for guests.' },
      { label: 'Boat access', available: true, detail: 'Lyngen Lodge runs its own boat to trailheads across the fjord.' },
      { label: 'Hospital', available: false, detail: 'Nearest A&E: Tromsø. Emergency: 113.' },
    ],
    insiderTip:
      'The view across to Jiehkkevárri from Djupvik is the classic Lyngen photograph. Shoot it at 10:00 in March when the sun clears the east ridge. By 14:00 the peaks are in backlight.',
  },
  {
    id: 'tromso',
    label: 'Tromsø',
    icon: 'mountain',
    name: 'Tromsø',
    tagline: 'Arctic city, Lyngen as day trips',
    population: '~77,000',
    distance: '1 hr 30 min to the Lyngen peninsula via Breivikeidet–Svensby ferry',
    overview:
      'The big Arctic city makes a viable Lyngen base for travellers combining city and mountain. Full range of hotels, restaurants, direct flights, and rental cars. You trade an extra 90 minutes each way against much broader evening options.',
    bestFor: ['Travellers combining city culture with ski days', 'Aurora chasers running multiple zones', 'Groups needing flight + hotel + car logistics in one hub'],
    notIdealFor: ['Serious ski tourers wanting maximum mountain time', 'Anyone targeting early-morning starts on Lyngen peaks'],
    accommodation: [
      { name: 'Clarion Hotel The Edge', type: 'Design hotel', price: '1,800–3,200 NOK/night', highlight: 'On the harbour. Rooftop bar with fjord views. Walk to restaurants and the cable car.' },
      { name: 'Scandic Ishavshotel', type: 'Business hotel', price: '1,500–2,400 NOK/night', highlight: 'Also on the harbour, Hurtigruten stop next door. Reliable Scandic breakfast.' },
      { name: 'Smarthotel Tromsø', type: 'Budget', price: '900–1,500 NOK/night', highlight: 'Central, small rooms, no frills. Best value in town.' },
    ],
    dining: [
      { name: 'Fiskekompaniet', detail: 'Harbourfront seafood. King crab, halibut, Arctic char. The evening-out restaurant.' },
      { name: 'Smakfullt', detail: 'Small-plates bistro, imaginative, locally sourced. Booking essential.' },
      { name: 'Mathallen Tromsø', detail: 'Food hall and fishmonger. Buy skrei, coffee, stockfish, and picnic supplies for the drive out.' },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Multiple chains across the city.' },
      { label: 'Fuel', available: true, detail: 'Circle K and YX stations. Fill up before the Lyngen drive.' },
      { label: 'EV charging', available: true, detail: 'Dense charger network across town.' },
      { label: 'Airport', available: true, detail: 'Tromsø (TOS). Direct SAS and Norwegian from Oslo, plus international summer routes.' },
      { label: 'Hospital', available: true, detail: 'UNN — the largest hospital in Nord-Norge.' },
    ],
    insiderTip:
      'For day trips to Lyngen from Tromsø, take the Breivikeidet–Svensby ferry (hourly most of the day, 20 min crossing). It cuts 45 minutes off the drive around Ullsfjord each way.',
  },
  {
    id: 'skibotn',
    label: 'Skibotn',
    icon: 'compass',
    name: 'Skibotn',
    tagline: 'Drier inland base at the south end of Lyngenfjord',
    population: '~550',
    distance: 'South end of Lyngenfjord · 2 hr from Tromsø via E8/E6',
    overview:
      'Skibotn sits where the Skibotn valley meets the south end of Lyngenfjord, on the E6 between Tromsø and the Finnish border. The inland rain-shadow gives it clearer skies than coastal Lyngen — locals from Tromsø drive here to chase aurora when the coast is socked in. Historic Finnish-border trading post, gateway to the southern Lyngen Alps peaks and to Kilpisjärvi (Finland) one hour east.',
    bestFor: ['Aurora chasers wanting the driest sky in the region', 'Travellers combining Norway and Finland (Kilpisjärvi is 1 hr east)', 'Cross-country skiers — the valley has reliable snow and groomed tracks'],
    notIdealFor: ['Steep ski-touring travellers targeting the main Lyngen peaks (those are further north)', 'Luxury travellers — accommodation is simple'],
    accommodation: [
      { name: 'Skibotn Camping', type: 'Cabins and camping', price: '800–1,400 NOK/night', highlight: 'Riverside cabins with kitchenettes. Open year-round. Aurora visible from the doorstep on clear nights.' },
      { name: 'Olderelv Camping', type: 'Cabins', price: '900–1,600 NOK/night', highlight: 'Simple cabins a few minutes north of the village on the E6. Family-run.' },
    ],
    dining: [
      { name: 'Skibotn Gjestestue', detail: 'Roadside kitchen on the E6. Reindeer stew, fiskesuppe, burgers. Open lunch and dinner.' },
      { name: 'Coop Marked Skibotn', detail: 'Groceries and bakery counter. The main self-catering option — nothing else is open late.' },
    ],
    services: [
      { label: 'Grocery', available: true, detail: 'Coop Marked in the village.' },
      { label: 'Fuel', available: true, detail: 'Circle K on the E6. Last Norwegian fuel before the Finnish border (40 km east).' },
      { label: 'EV charging', available: true, detail: 'Rapid charger at the Circle K.' },
      { label: 'Border crossing', available: true, detail: 'E8 east to Kilpisjärvi (Finland), 45 km. Open 24/7, no controls.' },
      { label: 'Hospital', available: false, detail: 'Nearest A&E: Tromsø (2 hr). Emergency: 113.' },
    ],
    insiderTip:
      'When Tromsø is under cloud, drive to Skibotn. The valley sits in the rain shadow of the Lyngen Alps and regularly has clear sky when the coast does not. The aurora forecast is the same — the weather forecast is not.',
  },
];

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Lyngen Alps Travel Guide 2026 | NorgeTravel',
  description:
    'The most serious alpine terrain in Nord-Norge. Ski-touring peaks rising 1,834 m from Lyngenfjord. Under two hours from Tromsø airport. Season, access, and guide requirements.',
  alternates: { canonical: 'https://norgetravel.com/destinations/lyngen' },
};

const facts = [
  { label: 'Location', value: 'Troms (E90 km of Tromsø)' },
  { label: 'Range length', value: '90 km' },
  { label: 'Highest peak', value: 'Jiehkkevárri 1,834m' },
  { label: 'Ski season', value: 'Feb – May' },
  { label: 'Basecamps', value: 'Lyngseidet · Tromsø' },
  { label: 'From Tromsø', value: '1h 30m (via ferry)' },
];

const seasonalWindows = [
  { months: 'Feb – May', label: 'Ski touring season', detail: 'Stable snowpack, long days. Peak season is late March to late April — daylight is back, the corn cycle kicks in, and conditions are most reliable.' },
  { months: 'Jun – Aug', label: 'Summer hiking & peaks', detail: 'Jiehkkevárri is a glaciated summit — guide required. Non-glaciated peaks like Store Kjostind and Rørnestinden accessible with experience.' },
  { months: 'Sep – Mar', label: 'Aurora over the peaks', detail: 'Lyngenfjord has almost no light pollution. Otertind reflected in the fjord under aurora is one of the most photographed scenes in Troms.' },
  { months: 'Year-round', label: 'Dog sledding & whale safari', detail: 'Dog sledding in Tamokdalen from December. Skjervøy humpback safaris November to mid-January when herring concentrate in Kvænangen.' },
];

export default function LyngenPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-slate-900 text-white -mt-20 pt-20">
        <Image
          src="/images/lyngen/landscapes/lyngen-alps-panorama_petr-pavlicek-1.jpg"
          alt="Lyngen Alps panorama with snow-covered peaks above the Lyngenfjord"
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
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 max-w-3xl">Lyngen Alps</h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            The most serious alpine terrain in Nord-Norge. 90 km of peaks rising 1,800 metres directly from the fjord. Under two hours from Tromsø airport by road and ferry.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" /> −12°C to +15°C</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" /> Best: Feb–May (ski) / Sep–Mar (aurora)</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#00CC6A]" aria-hidden="true" /> 4–7 days recommended</span>
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
          <h2 className="text-3xl font-bold text-slate-900 mb-4">About the Lyngen Alps</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-slate-600 leading-relaxed">
                The Lyngen peninsula runs 90 km north from the Ullsfjord crossing to the Lyngseidet isthmus. From the Lyngenfjord, the peaks rise almost vertically to 1,800 metres. The combination of fjord water at sea level and big alpine terrain directly above it is unusual in Europe and is why Lyngen draws ski-touring operators from Chamonix, Innsbruck, and Bozeman every spring.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Jiehkkevárri, at 1,834 m, is the highest peak in Troms and a glaciated summit — a guided objective only. The non-glaciated peaks around Lyngseidet and the Kjosen valley (Store Kjostind, Storgalten, Rørnestinden) are the bread-and-butter objectives for intermediate ski tourers. The peak season is late March to late April, when the sun is back and the snow is cycling on the south aspects.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Outside ski season, the range is a summer hiking, cycling, and sea-kayaking destination, and the Lyngenfjord has one of the darkest night skies in Nord-Norge. Aurora photography from Otertind, Lyngstuva, and the Storfjord shoreline is world-class. The region is also a strong whale-safari entry point — Skjervøy, 3 hours north of Lyngseidet, is the winter humpback hub.
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
                  Late March to late April for ski touring — the short window when daylight is back and the snow is stable. June to August for summer hiking. September to March for aurora. December to mid-January for humpback whales off Skjervøy.
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
            heading="What to do in Lyngen"
            intro="Four reasons people fly to Tromsø and then drive straight through it. Ski touring in spring, aurora over the fjord from September, humpback safaris from Skjervøy in the winter herring season, and dog sledding from Tamokdalen year-round on snow."
            featured={[
              {
                title: 'Ski touring, Lyngseidet',
                image: '/images/lyngen/activities/ski-touring-lyngen-alps_hendrik-morkel.jpg',
                alt: 'Ski tourer climbing a ridge in the Lyngen Alps with the fjord below',
                body: 'Store Kjostind, Storgalten, Rørnestinden. Certified guide required for glaciated terrain. Avalanche Level 2 skills minimum. Peak weeks: late March to late April.',
              },
              {
                title: 'Aurora over Otertind',
                image: '/images/lyngen/northern-lights/aurora-otertind_petr-pavlicek.jpg',
                alt: 'Northern Lights above the Otertind peak reflected in the Lyngenfjord',
                body: 'One of the most photographed scenes in Troms. Shoot from the E6 pullout at Skibotn or Otertinden. KP 3+ and a clear night. The fjord acts as a mirror.',
              },
              {
                title: 'Humpback safari, Skjervøy',
                image: '/images/lyngen/activities/humpback-whale_francisco-damm.jpg',
                alt: 'Humpback whale surfacing off Skjervøy in Nord-Troms',
                body: 'Late November to mid-January. Herring concentrate in Kvænangen and humpbacks follow. RIB safaris from Skjervøy harbour. 4 to 6 hours. Sighting rate 90% in peak weeks.',
              },
              {
                title: 'Dog sledding, Tamokdalen',
                image: '/images/lyngen/activities/dogsledding-huskies_petr-pavlicek.jpg',
                alt: 'Dog sled team running through snowy Tamokdalen valley near the Lyngen Alps',
                body: 'Lyngsfjord Adventure and Tromsø Villmarkssenter run tours from Tamokdalen, 1.5 hours from Tromsø. Half-day, full-day, and overnight trips. December through April.',
              },
            ]}
            tours={[
              {
                name: 'Guided ski touring day, Lyngen Alps',
                type: 'Ski touring · certified guide',
                price: 'From 2,900 NOK',
                duration: '8 hours',
                highlight: 'Non-glaciated peak with a certified ski guide from Lyngseidet. Transceiver, shovel, probe included. Avalanche Level 2 skills expected. Peak weeks late March to late April.',
                affiliateUrl: 'https://www.getyourguide.com/s/?q=lyngen+ski+touring&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
              {
                name: 'Humpback whale safari, Skjervøy',
                type: 'RIB safari · winter herring season',
                price: 'From 1,890 NOK',
                duration: '4–5 hours',
                highlight: 'Late November to mid-January only, when herring concentrate in Kvænangen. Thermal suits provided. Sighting rate above 90% in peak weeks. Departs Skjervøy harbour.',
                affiliateUrl: 'https://www.getyourguide.com/s/?q=skjervoy+whale+safari&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
              {
                name: 'Dog sledding, Tamokdalen',
                type: 'Drive-your-own sled',
                price: 'From 1,990 NOK',
                duration: '4 hours',
                highlight: 'Lyngsfjord Adventure kennel in Tamokdalen. Drive your own team of six huskies through the valley. Transfer from Tromsø included. December to April.',
                affiliateUrl: 'https://www.getyourguide.com/s/?q=tamokdalen+dog+sledding&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
              {
                name: 'Aurora camp, Camp Tamok',
                type: 'Northern Lights + Sami camp',
                price: 'From 1,790 NOK',
                duration: '6 hours',
                highlight: 'Away from Tromsø light pollution in the Tamok valley. Lavvu fire, bidos stew, thermal suits. Three-night minimum booking recommended for weather contingency.',
                affiliateUrl: 'https://www.getyourguide.com/s/?q=camp+tamok+aurora&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
              },
            ]}
            toursFooterHref="https://www.getyourguide.com/s/?q=lyngen&partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-end"
            toursFooterLabel="See all Lyngen tours on GetYourGuide"
            trails={[
              {
                name: 'Rørnestinden',
                slug: 'rornestinden-lyngen-ridge-hike',
                distance: '8 km',
                elevation: '900 m',
                time: '5–6 hours',
                difficulty: 'Hard',
                description: 'Classic non-glaciated Lyngen peak above the Kjosen valley. Steep final ridge. Exposure on the summit. Ski touring in spring, scramble in summer. DNT Red.',
              },
              {
                name: 'Goalsevárri (Store Kjostind approach)',
                slug: 'goalsevarri-store-kjostind-ski-tour',
                distance: '6 km',
                elevation: '833 m',
                time: '4–5 hours',
                difficulty: 'Moderate',
                description: 'Popular intermediate ski-touring objective above Lyngseidet. No glacier. South-facing, corn cycle by mid-April. Reliable powder in March. DNT Blue in summer.',
              },
              {
                name: 'Fastdalstinden',
                slug: 'fastdalstinden-lyngen-ski-tour',
                distance: '9 km',
                elevation: '1,100 m',
                time: '6–7 hours',
                difficulty: 'Hard',
                description: 'A big day with a sustained climb and exposed summit ridge. Non-glaciated but demands fitness and route-finding. Classic spring ski tour from Koppangen.',
              },
              {
                name: 'Sørlenangsbreen glacier approach',
                slug: 'sorlenangsbreen-glacier-lyngen',
                distance: '12 km',
                elevation: '950 m',
                time: '7–8 hours',
                difficulty: 'Hard',
                description: 'Glaciated terrain. Rope team, harness, crevasse rescue skills required. Guide mandatory unless you have alpine experience. Book through a certified operator.',
              },
            ]}
            restaurants={[
              {
                name: 'Magic Mountain Lodge',
                cuisine: 'Nordic · lodge dining',
                priceRange: '550–850 NOK mains',
                highlight: 'Lyngseidet lodge favoured by ski-touring groups. Arctic char, reindeer, and a long wine list. Book ahead in March and April — it fills with guided weeks.',
                rating: 4.6,
              },
              {
                name: 'Lyngen Lodge, Djupvik',
                cuisine: 'Modern Arctic · fjordside',
                priceRange: 'Set menu, non-guest dining limited',
                highlight: 'British-owned lodge on the west shore of the fjord. Six-course set menus. Non-guest seats scarce. Worth the call for the view of the Lyngen range across the water.',
                rating: 4.7,
              },
              {
                name: 'Koppangen Brygger',
                cuisine: 'Seafood · working harbour',
                priceRange: '350–550 NOK mains',
                highlight: 'Rorbu-style restaurant on the east side of the fjord. Cod, halibut, king crab in season. The deck looks straight at Fastdalstinden.',
                rating: 4.5,
              },
              {
                name: 'Fjellgaarden Lyngen',
                cuisine: 'Traditional Norwegian · farm kitchen',
                priceRange: '300–500 NOK mains',
                highlight: 'Family-run farm kitchen near Lyngseidet. Lamb from the farm, potato dumplings, cloudberry dessert. Open evenings only outside peak season.',
                rating: 4.6,
              },
            ]}
          />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <DestinationBasecamps
            basecamps={lyngenBasecamps}
            intro="Three bases work for Lyngen. Lyngseidet to stay on the peninsula. Djupvik for the premium lodges across the fjord from the highest peaks. Tromsø if you are combining the Alps with the city."
          />
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">When to visit</h2>
          <p className="text-slate-600 mb-10 max-w-2xl">
            Lyngen has four distinct seasons for travellers. The ski-touring window is the narrowest and the most specific.
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
                <p className="font-bold text-slate-900">Fly to Tromsø (TOS) — the only sensible entry</p>
                <p className="text-slate-600 text-sm mb-3">
                  SAS and Norwegian from Oslo multiple times daily. 2 hours. From Tromsø airport to Lyngseidet via the Breivikeidet–Svensby ferry: 1 hour 30 minutes total (40 minutes drive, 20 minutes ferry, 30 minutes drive).
                </p>
                <a href="https://www.kiwi.com/deep?from=OSL&to=TOS" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Search flights <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚗</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Drive the Ullsfjord ferry route from Tromsø</p>
                <p className="text-slate-600 text-sm mb-3">
                  Breivikeidet–Svensby ferry runs hourly most of the day. 20 minutes on the water. AutoPASS enabled. The alternative is driving around via Nordkjosbotn on the E6 and E8 — 2 hours 30 minutes, longer but all-road.
                </p>
                <a href="https://www.discovercars.com/?pos=TOS" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Compare car rentals <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🧗</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Book a guided ski-touring week</p>
                <p className="text-slate-600 text-sm mb-3">
                  Lyngen Lodge, Magic Mountain Lodge, and international operators like Mountain Tracks and 57hours run 6 and 7-day ski-touring weeks in peak season. Boat-based operators run the Lyngen coast from sailboats and expedition motor-yachts.
                </p>
                <Link href="/tjenester/trekking" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  Guided adventures <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Itineraries that include Lyngen</h2>
          <div className="space-y-4">
            {[
              '7-day ski-touring week, Lyngseidet basecamp: 5 tour days, 1 rest/aurora day, 1 travel day',
              '5-day photo-focused aurora + landscape trip: Tromsø + Storfjord + Lyngenfjord + Skjervøy',
              '10-day Nord-Troms loop: Tromsø – Lyngen – Kvænangen – Skjervøy – back via the Ullsfjord ferry',
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
                  DNT-certified guide with 25 years of Lyngen seasons. The glaciated terrain is not optional learning — book a guide, carry the beacon, and respect the range.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to book Lyngen?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Ski-touring weeks, aurora nights, and whale safaris — with commission-transparent affiliate links.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tjenester/trekking" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-md hover:shadow-lg transition-all">
              Arctic Trekking <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/destinations/northern-norway" className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-md hover:bg-white/20 transition-all backdrop-blur-sm">
              All Northern Norway
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
