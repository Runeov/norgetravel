import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Thermometer, Calendar } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { LofotenActivities } from '@/components/modules/destinations/LofotenActivities';
import { LofotenBasecamps } from '@/components/modules/destinations/LofotenBasecamps';
import { eventsStore } from '@/lib/admin/travel-events';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Lofoten Islands Travel Guide 2026 | NorgeTravel',
  description: 'Everything you need to plan a Lofoten trip: best hikes, where to stay, fishing villages, and when to go. Verified operator links with commission disclosures.',
};

const facts = [
  { label: 'Latitude', value: '68°N' },
  { label: 'Residents', value: '25,000' },
  { label: 'Annual visitors', value: '1+ million' },
  { label: 'Area', value: '1,227 km²' },
  { label: 'Airports', value: 'SVJ / LKN' },
  { label: 'Currency', value: 'NOK' },
];

const seasonalWindows = [
  {
    months: 'Sep–Mar',
    label: 'Aurora season',
    detail:
      'Peak Northern Lights probability at 68°N under the auroral oval. Fewer visitors than summer. 2026–27 is the last elevated solar activity window before the 2031 minimum. Four-night minimum recommended. Weather is the variable, not the aurora.',
  },
  {
    months: 'Jun–Jul',
    label: 'Midnight sun',
    detail:
      '24-hour daylight from 28 May to 14 July. Peak photography season. Also peak crowd season. Book accommodation 6–9 months ahead. Best hiking and sea kayaking conditions. Water 8–12°C.',
  },
  {
    months: 'Jan–Apr',
    label: 'Skrei (cod) season',
    detail:
      'Arctic cod migrate from the Barents Sea to Lofoten to spawn. The 1,000-year cultural event that shaped the archipelago. Fishing charters from NOK 950 per person. Combines with aurora viewing. Stockfish racks fill through February.',
  },
  {
    months: 'May & Aug–Sep',
    label: 'Shoulder season',
    detail:
      'The best balance in Lofoten: long days, workable weather, manageable crowds. Accommodation prices drop 25–35% vs. peak July. September brings autumn colour and the first aurora of the season.',
  },
];

export default async function LofotenPage() {
  const events = await eventsStore.filterByDestination('lofoten');
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white -mt-20 pt-20">
        <Image
          src="/images/lofoten/landscapes/lofoten-landscape-hero_jorn-eriksen.jpg"
          alt="Lofoten archipelago from above, jagged peaks rising from the Norwegian Sea with fishing villages below"
          fill
          className="object-cover opacity-50"
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/85" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-48">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00CC6A]/20 text-[#00CC6A] text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            Destination Guide
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">Lofoten Islands</h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            Mountains rise 1,000 metres straight out of the Norwegian Sea. Red rorbu sit on stilts over the water. The most photographed archipelago in Europe, with over a million visitors a year against 25,000 residents.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" /> 68°N, Nordland County</span>
            <span className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" /> −5°C to +18°C</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#00CC6A]" aria-hidden="true" /> 5–10 days ideal</span>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-16 bg-[#1B3A5C] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {facts.map((f) => (
              <div key={f.label} className="text-center">
                <p className="text-[#00CC6A] text-xs font-bold uppercase tracking-wider mb-1">
                  {f.label}
                </p>
                <p className="font-bold text-sm">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="relative py-20 overflow-hidden bg-white">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">About Lofoten</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-slate-600 leading-relaxed">
                Lofoten is a chain of six main islands reaching 150 km into the Norwegian Sea from the Nordland coast. Jagged granite peaks drop directly into deep fjords. The E10 road connects Austvågøya to Moskenesøya across a sequence of bridges. No ferry is required between the islands themselves. The archipelago sits at 68°N, north of the Arctic Circle, under the auroral oval.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The cod fishery has shaped Lofoten for a thousand years. Arctic cod (skrei) migrate from the Barents Sea every January to spawn here, and have done since the Viking Age. 20,000 tonnes of fish are dried on wooden racks (hjell) every winter. The racks fill the coastline through February and the smell is part of visiting in spring. In 1893 a storm killed 130 fishermen in a single night. The Stockfish Museum in Å tells the story in 90 minutes.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Tourism changed the islands in the 2010s. Over a million visitors now arrive annually. A 40:1 ratio against the resident population. Reinebringen had to be reinforced with a 1,978-step sherpa-built staircase in 2019 to stop the trail eroding. Henningsvær stadion, the football pitch on the rocks, was photographed to global attention in 2017 and the village has not been quiet since. The working harbours continue regardless. Base yourself thoughtfully, visit the busy spots outside the 10:00–16:00 window, and Lofoten still works.
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
                  June to early July for midnight sun and hiking, with peak crowds and prices. September to March for aurora, skrei season from January. Late August and early September is the best all-round window: still-long days, shoulder pricing, first aurora nights possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities tabs */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <LofotenActivities />
        </div>
      </section>

      {/* When to visit */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">When to visit Lofoten</h2>
          <p className="text-slate-600 mb-10 max-w-2xl">
            Over a million visitors a year against 25,000 residents. Timing the trip well changes the experience entirely.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {seasonalWindows.map((w) => (
              <div key={w.label} className="border border-slate-200 rounded-lg p-6 bg-white">
                <p className="text-xs font-bold text-[#1B3A5C] uppercase tracking-wider mb-1">{w.months}</p>
                <h3 className="font-bold text-slate-900 mb-3">{w.label}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{w.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-6 border border-[#00CC6A]/30 bg-[#00CC6A]/5 rounded-lg max-w-3xl">
            <p className="font-bold text-slate-900 mb-2">Want Lofoten landscapes without the crowds? Consider Senja Island.</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Senja, two hours north of Tromsø, has the same peaks-into-sea scenery with a fraction of the foot traffic. It is one of Norway&apos;s fastest-growing destinations on TikTok and Instagram but still has space. No new airport, no cruise ship docks. If the dates are flexible, it is worth the detour.
            </p>
          </div>
        </div>
      </section>

      {/* Getting there */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">How to get to Lofoten</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">✈️</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Fly to Svolvær (SVJ) or Leknes (LKN)</p>
                <p className="text-slate-600 text-sm mb-3">
                  Widerøe flies Oslo–Bodø–Svolvær and Oslo–Bodø–Leknes daily. Total flight time 3–4 hours including connection. Book 6–8 weeks ahead for summer. Evenes (EVE) near Narvik is a larger airport 3 hours drive from Svolvær with direct flights from Oslo.
                </p>
                <a
                  href="https://www.kiwi.com/deep?from=OSL&to=SVJ"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Search flights <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">⛴️</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Bodø–Moskenes car ferry</p>
                <p className="text-slate-600 text-sm mb-3">
                  Torghatten Nord operates the car ferry across the Vestfjord. 3–4 hours crossing. 3–4 daily sailings in summer, 1–2 in winter. Pre-booking strongly advised for vehicles in July–August. Passenger-only express boats (hurtigbåt) also run.
                </p>
                <a
                  href="https://www.torghatten-nord.no"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Ferry schedule <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚗</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Drive the E10 from Narvik or Evenes</p>
                <p className="text-slate-600 text-sm mb-3">
                  The E10 enters Lofoten from the east at Bjerkvik near Narvik. 3 hours to Svolvær, 5 hours to Reine. No ferry required. The road crosses the islands on bridges. Winter driving needs studded tyres. Legal requirement in Nordland from 1 November to the first Sunday after Easter.
                </p>
                <a
                  href="https://www.discovercars.com/?pos=EVE"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Compare car rentals <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Hurtigruten coastal ferry</p>
                <p className="text-slate-600 text-sm mb-3">
                  Stamsund and Svolvær are stops on the Bergen–Kirkenes route. Northbound arrives Stamsund 19:00, Svolvær 21:00. Not a fast way to reach Lofoten. A scenic segment to add to a longer coastal itinerary rather than a primary access route.
                </p>
                <a
                  href="https://www.hurtigruten.com/en"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Browse sailings <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basecamps — where to base yourself */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <LofotenBasecamps />
        </div>
      </section>

      {/* Events */}
      {events.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-slate-900">Events and festivals</h2>
            </div>
            <p className="text-slate-600 mb-12 max-w-2xl">
              {events.length} events across the Lofoten calendar, from the 1,000-year-old cod fishing season to midnight sun music festivals.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{event.name}</h3>
                  {'startDate' in event && (
                    <p className="text-xs text-[#00CC6A] font-medium mb-3">
                      {new Date(event.startDate as string).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}
                      {'endDate' in event && event.endDate !== event.startDate && (
                        <> – {new Date(event.endDate as string).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}</>
                      )}
                    </p>
                  )}
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{event.description}</p>
                  {'venue' in event && (
                    <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
                      <MapPin className="w-3 h-3" aria-hidden="true" />
                      {event.venue as string}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Expert Byline — Lars Erik Nordvik */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/om-oss/lars-erik-nordvik"
              className="group flex items-start gap-5 bg-slate-50 rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-slate-200">
                <Image
                  src="/pics/team/Lars_profile.png"
                  alt="Lars Erik Nordvik, Coastal Culture & Logistics Editor at NorgeTravel"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#B45309] uppercase tracking-wide mb-1">The Working Coast</p>
                <h3 className="font-bold text-slate-800 group-hover:text-[#1A365D] transition-colors">Lars Erik Nordvik</h3>
                <p className="text-sm text-slate-500 mb-2">Kystkultur-ekspert | Coastal Culture &amp; Logistics Editor</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Born and raised in Svolvær. Family-owned cod vessel, winter skrei season in his childhood. Writes the Lofoten that is not in the wide-angle photograph: the 4 am harbour, the rorbu that still smells of salt and old wood, and the ferry schedule from Bodø that defines the trip before it starts.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Book your Lofoten adventure</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Guided treks, rorbu stays, and cod fishing charters. All with commission-transparent affiliate links.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tjenester/trekking" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-md hover:shadow-lg transition-all">
              Arctic Trekking <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/tjenester/remote-cabins" className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-md hover:bg-white/20 transition-all backdrop-blur-sm">
              Rorbu Cabin Stays
            </Link>
          </div>
        </div>
      </section>
      <section className="relative z-10 py-10 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <ShareButtons url="/destinations/lofoten/" title="Lofoten Islands Travel Guide" />
        </div>
      </section>
    </main>
  );
}
