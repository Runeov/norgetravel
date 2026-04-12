import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Sun, Thermometer, Clock, Calendar } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { eventsStore } from '@/lib/admin/travel-events';


export const metadata: Metadata = {
  title: 'Northern Norway Travel Guide 2026 | NorgeTravel',
  description: 'Plan your Northern Norway trip: Tromsø aurora tours, Lofoten trekking, midnight sun cruises. Best time to visit, what to pack, and vetted operators.',
};

const highlights = [
  {
    title: 'Aurora Capital',
    body: 'Tromsø sits at 69°N inside the auroral oval. On a G2+ storm night, the sky turns green from horizon to horizon.',
    image: '/images/tromso/northern-lights/aurora-kvaloya_vegard-stien.jpg',
    imageAlt: 'Aurora borealis over Kvaløya island near Tromsø, green bands reflected in calm Arctic water',
    link: '/destinations/tromso',
    linkLabel: 'Explore Tromsø',
  },
  {
    title: 'Lofoten Islands',
    body: '170 km of jagged peaks rising straight from the sea. Village-to-village treks, world-class surf, and stockfish culture.',
    image: '/images/lofoten/landscapes/lofoten-coast_baard-loeken.jpg',
    imageAlt: 'Lofoten coastline with dramatic mountain peaks rising from the Norwegian Sea',
    link: '/destinations/lofoten',
    linkLabel: 'Explore Lofoten',
  },
  {
    title: 'Svalbard',
    body: '78°N. Polar bears outnumber people. Four months of total darkness, four months of midnight sun. Accessible with a direct flight from Oslo.',
    image: '/images/svalbard/landscapes/svalbard-panorama_emilien-gigandet-1.jpg',
    imageAlt: 'Svalbard glacial landscape under pale Arctic light at 78 degrees north',
    link: '/destinations/svalbard',
    linkLabel: 'Explore Svalbard',
  },
  {
    title: 'North Cape',
    body: '71°N. The northernmost point in mainland Europe. Midnight sun from mid-May to late July. 300,000 visitors per year reach this cliff.',
    image: '/images/nordkapp/landscapes/nordkapp-cliff_trym-bergsmo.jpg',
    imageAlt: 'North Cape cliff edge at 71 degrees north, the northernmost point of mainland Europe',
    link: '/destinations/northern-norway',
    linkLabel: 'Coming soon',
  },
  {
    title: 'Senja Island',
    body: 'The same dramatic peaks-into-sea scenery as Lofoten with a fraction of the foot traffic. No cruise ship docks. No new airport. Space to breathe.',
    image: '/images/senja/landscapes/senja-scenic_baard-loeken.jpg',
    imageAlt: 'Senja island coastline with jagged mountain peaks and sheltered fishing harbour',
    link: '/destinations/northern-norway',
    linkLabel: 'Coming soon',
  },
  {
    title: 'Alta',
    body: 'UNESCO rock carvings 7,000 years old. World-class dog sledding. The Northern Lights Cathedral. Gateway to Finnmark.',
    image: '/images/alta/northern-lights/aurora-alta_anne-olsen-ryum.jpg',
    imageAlt: 'Northern Lights over Alta, Finnmark with green aurora illuminating the Arctic sky',
    link: '/destinations/northern-norway',
    linkLabel: 'Coming soon',
  },
];

const bestFor = [
  { season: 'Oct – Mar', activity: 'Northern Lights', detail: 'Polar night + clear skies = aurora hunting season' },
  { season: 'Jun – Aug', activity: 'Midnight Sun', detail: 'Hiking, kayaking, fishing in endless daylight' },
  { season: 'Mar – Apr', activity: 'Dog sledding & snowmobile', detail: 'Snow cover reliable, temps manageable' },
  { season: 'Sep', activity: 'Photography', detail: 'First auroras return + autumn foliage' },
];

export default async function NorthernNorwayPage() {
  const events = await eventsStore.filterByDestination('northern-norway');
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white -mt-20 pt-20">
        <Image
          src="/images/tromso/northern-lights/aurora-tromso_yngve-olsen-1.jpg"
          alt="Aurora borealis over Tromso at 69 degrees north, green bands across a dark Arctic sky"
          fill
          className="object-cover opacity-50"
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/40 to-slate-900/80" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-48">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00CC6A]/20 text-[#00CC6A] text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            Destination Guide
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 max-w-3xl">
            Northern Norway
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            3,500 km of Arctic coastline. The world's densest aurora zone. Midnight sun from May to July. This is where serious Norway travel begins.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" /> −15°C to +20°C</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" /> Best: Oct-Apr (aurora) / Jun-Aug (midnight sun)</span>
            <span className="flex items-center gap-2"><Sun className="w-4 h-4 text-[#00CC6A]" aria-hidden="true" /> 2-3 weeks recommended</span>
          </div>
        </div>
      </section>

      {/* Destinations grid */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore Northern Norway</h2>
          <p className="text-slate-600 mb-12 max-w-2xl">Six destinations across the Arctic. Each one distinct. Pick your basecamp.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((h) => (
              <div key={h.title} className="group bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200/50 hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={h.image}
                    alt={h.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{h.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{h.body}</p>
                  {h.linkLabel === 'Coming soon' ? (
                    <span className="text-sm text-slate-400 font-medium">Coming soon</span>
                  ) : (
                    <Link
                      href={h.link}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1B3A5C] hover:text-[#00CC6A] transition-colors"
                    >
                      {h.linkLabel}
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best time */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">When to go</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bestFor.map((b) => (
              <div key={b.season} className="border border-slate-200 rounded-lg p-6">
                <p className="text-sm font-bold text-[#1B3A5C] mb-1">{b.season}</p>
                <p className="font-bold text-slate-900 mb-2">{b.activity}</p>
                <p className="text-slate-500 text-sm">{b.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting there */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Getting there</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">✈️</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Fly to Tromsø (TOS), Bodø (BOO), or Alta (ALF)</p>
                <p className="text-slate-600 text-sm mb-3">
                  SAS and Norwegian fly multiple times daily from Oslo. Tromsø: 2 hours. Bodø: 1h 30m. Widerøe connects smaller airports across Nordland and Troms.
                </p>
                <a
                  href="https://www.kiwi.com/deep?from=OSL&to=TOS"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Search flights <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚢</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Hurtigruten coastal express</p>
                <p className="text-slate-600 text-sm mb-3">
                  The Bergen-Kirkenes route stops at 34 ports along the Northern Norwegian coast. Tromsø, Svolvær, Stamsund, Bodø, and Hammerfest are all on the line.
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
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚗</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Drive the E6 northbound</p>
                <p className="text-slate-600 text-sm mb-3">
                  The E6 runs the length of Norway. Trondheim to Bodø: 10 hours. Bodø to Tromsø: 8 hours. Winter driving requires studded tyres by law north of Trondheim from November 1.
                </p>
                <a
                  href="https://www.discovercars.com/?pos=TOS"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Compare car rentals <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
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
              {events.length} events across Northern Norway, from film festivals in polar darkness to Sami cultural gatherings and midnight sun marathons.
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

      {/* Tours CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to book?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">We have vetted the best operators for Northern Norway with transparent commission disclosures on every link.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tjenester/northern-lights" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-md hover:shadow-lg transition-all">
              Northern Lights Tours <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Link>
            <Link href="/tjenester/trekking" className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-md hover:bg-white/20 transition-all backdrop-blur-sm">
              Arctic Trekking
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
