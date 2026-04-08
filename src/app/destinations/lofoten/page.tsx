import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Thermometer, UtensilsCrossed, Calendar } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { RestaurantGrid } from '@/components/modules/destinations/RestaurantGrid';
import { lofotenRestaurants } from '@/data/city-guides/restaurants-lofoten';
import { eventsStore } from '@/lib/admin/travel-events';

export const metadata: Metadata = {
  title: 'Lofoten Islands Travel Guide 2026 | NorgeTravel',
  description: 'Everything you need to plan a Lofoten trip: best hikes, where to stay, fishing villages, and when to go. Verified operator links with commission disclosures.',
};

const experiences = [
  { emoji: '🥾', title: 'Reinebringen', body: 'The iconic 448-step hike above Reine. Allow 2–3 hours round trip. No shuttle — it starts from the village.' },
  { emoji: '🎣', title: 'Stockfish heritage', body: 'Lofoten dries 20,000 tonnes of cod each year. The Stockfish Museum in Å tells the full story in 90 minutes.' },
  { emoji: '🏄', title: 'Unstad surf beach', body: "One of Europe's most northerly surf breaks. Waves 1–4m, water 8–12°C. Wetsuits provided by local schools." },
  { emoji: '🛶', title: 'Sea kayaking', body: 'Paddle between fishermen\'s cabins (rorbuer). Multi-day routes connect Svolvær to Å — 200 km of sheltered fjords.' },
  { emoji: '🌅', title: 'Midnight sun photography', body: 'June–July: 24-hour daylight turns village harbours into photography gold. Best light 10 pm–2 am.' },
  { emoji: '🐟', title: 'Cod fishing charter', body: 'Year-round fishing. Peak season Jan–Apr when Arctic cod migrate to spawn. Charters from NOK 950/person.' },
];

export default async function LofotenPage() {
  const events = await eventsStore.filterByDestination('lofoten');
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src="/images/lofoten/landscapes/lofoten-landscape-hero_jorn-eriksen.jpg"
          alt="Lofoten archipelago from above, jagged peaks rising from the Norwegian Sea with fishing villages below"
          fill
          className="object-cover opacity-50"
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/80" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-48">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00CC6A]/20 text-[#00CC6A] text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Destination Guide
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Lofoten Islands
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            Mountains that shoot 1,000 metres straight out of the sea. Red fishing cabins on stilts. The most photographed archipelago in Europe — for good reason.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#5CBFEE]" /> 68°N, Nordland County</span>
            <span className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-[#5CBFEE]" /> −5°C to +18°C</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#00CC6A]" /> 5–10 days ideal</span>
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">What to do</h2>
          <p className="text-slate-600 mb-12 max-w-2xl">Lofoten isn't one experience — it's six stacked on top of each other.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((e) => (
              <div key={e.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
                <span className="text-3xl mb-4 block">{e.emoji}</span>
                <h3 className="font-bold text-slate-900 mb-2">{e.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{e.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting there */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Getting there</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 border border-slate-200 rounded-2xl">
              <span className="text-2xl">✈️</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Fly to Svolvær (SVJ) or Leknes (LKN)</p>
                <p className="text-slate-600 text-sm mb-3">Daily connections from Oslo (1h 45m). Book 6-8 weeks ahead for summer.</p>
                <a
                  href="https://www.kiwi.com/deep?from=OSL&to=SVJ"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Search flights <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-2xl">
              <span className="text-2xl">🚗</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Drive the E10 from Narvik</p>
                <p className="text-slate-600 text-sm mb-3">3 hours from Narvik. The E10 crosses the islands via bridges. No ferry needed.</p>
                <a
                  href="https://www.discovercars.com/?pos=EVE"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Compare car rentals <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-2xl">
              <span className="text-2xl">🚢</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Hurtigruten coastal express</p>
                <p className="text-slate-600 text-sm mb-3">Stops at Stamsund and Svolvær. Combine with a coastal cruise for the full experience.</p>
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

      {/* When to visit */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">When to visit</h2>
          <p className="text-slate-600 mb-8">
            Lofoten now draws over <strong>1 million visitors a year</strong> against a permanent population of 25,000 — a 40:1 ratio. Timing your trip well makes a genuine difference.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            <div className="p-5 border border-slate-200 rounded-2xl bg-white">
              <p className="font-bold text-slate-900 mb-1">Sep–Mar — Aurora season</p>
              <p className="text-slate-600 text-sm">Peak Northern Lights probability. Fewer visitors than summer. 2026–27 is the last elevated solar activity window before the 2031 minimum — book now.</p>
            </div>
            <div className="p-5 border border-slate-200 rounded-2xl bg-white">
              <p className="font-bold text-slate-900 mb-1">Jun–Jul — Midnight sun</p>
              <p className="text-slate-600 text-sm">24-hour daylight for photography. Peak crowds — book accommodation 6–8 weeks ahead. Best hiking and kayaking conditions.</p>
            </div>
            <div className="p-5 border border-slate-200 rounded-2xl bg-white">
              <p className="font-bold text-slate-900 mb-1">Jan–Apr — Cod fishing</p>
              <p className="text-slate-600 text-sm">Arctic cod migrate to Lofoten to spawn. Peak season for fishing charters from NOK 950/person. Combines well with aurora viewing.</p>
            </div>
            <div className="p-5 border border-slate-200 rounded-2xl bg-white">
              <p className="font-bold text-slate-900 mb-1">May & Aug–Sep — Shoulder season</p>
              <p className="text-slate-600 text-sm">Best balance of good weather, long days, and manageable crowds. Accommodation prices drop 20–30% vs. peak summer.</p>
            </div>
          </div>

          <div className="p-6 border border-[#00CC6A]/30 bg-[#00CC6A]/5 rounded-2xl">
            <p className="font-bold text-slate-900 mb-2">Want Lofoten landscapes without the crowds? Consider Senja Island.</p>
            <p className="text-slate-600 text-sm">
              Senja — two hours north of Tromsø — offers the same dramatic peaks-into-sea scenery as Lofoten with a fraction of the foot traffic. It's one of Norway's fastest-growing destinations on TikTok and Instagram, but still has space. No new airport, no cruise ship docks. If you're flexible, it's worth the detour.
            </p>
          </div>
        </div>
      </section>

      {/* Events */}
      {events.length > 0 && (
        <section className="py-20 bg-white">
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
                <div key={event.id} className="bg-slate-50 rounded-lg border border-slate-200 p-6">
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

      {/* Restaurants */}
      {lofotenRestaurants.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <UtensilsCrossed className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
              <h2 className="text-3xl font-bold text-slate-900">Where to eat in Lofoten</h2>
            </div>
            <p className="text-slate-600 mb-12 max-w-2xl">
              {lofotenRestaurants.length} restaurants across the archipelago. Scores combine Google, TripAdvisor, Facebook, and Yelp ratings.
            </p>
            <RestaurantGrid
              restaurants={lofotenRestaurants}
              cityName="Lofoten"
            />
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Book your Lofoten adventure</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">Guided treks, rorbuer stays, and fishing charters — all vetted and commission-disclosed.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tjenester/trekking" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-full hover:shadow-lg transition-all">
              Arctic Trekking <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/tjenester/remote-cabins" className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm">
              Rorbu Cabin Stays
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
