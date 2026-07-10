import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Revalidate the whole page every 24 hours so Google ratings stay current without a manual deploy
export const revalidate = 86400;
import { ArrowRight, MapPin, Clock, Thermometer, Compass } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { ShareButtons } from '@/components/ui/ShareButtons';
import { TromsoActivities } from '@/components/modules/destinations/TromsoActivities';
import { TromsoBasecamps } from '@/components/modules/destinations/TromsoBasecamps';
import { tromso } from '@/data/city-guides/tromso';

export const metadata: Metadata = {
  title: tromso.metaTitle,
  description: tromso.metaDescription,
};

export default async function TromsoPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white -mt-20 pt-20">
        <Image
          src={tromso.heroImageSrc}
          alt={tromso.heroImageAlt}
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
            {tromso.taglineBadge}
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">{tromso.heroHeadline}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">{tromso.heroBody}</p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            {tromso.heroStats.map((stat) => (
              <span key={stat.text} className="flex items-center gap-2">
                {stat.icon === 'map-pin' && <MapPin className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" />}
                {stat.icon === 'thermometer' && <Thermometer className="w-4 h-4 text-[#5CBFEE]" aria-hidden="true" />}
                {stat.icon === 'clock' && <Clock className="w-4 h-4 text-[#00CC6A]" aria-hidden="true" />}
                {(stat.icon === 'moon' || stat.icon === 'sun') && (
                  <span className="w-4 h-4 text-center text-xs">{stat.icon === 'moon' ? '🌙' : '☀️'}</span>
                )}
                {stat.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-16 bg-[#1B3A5C] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {tromso.facts.map((f) => (
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
          <h2 className="text-3xl font-bold text-slate-900 mb-4">About Tromsø</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <p className="text-slate-600 leading-relaxed">
                Tromsø sits at 69°N on the island of Tromsøya, connected by bridge and tunnel to the mainland and to Kvaløya. It is the largest city above the Arctic Circle in Norway — 75,000 residents, a working port, a university with the world&apos;s northernmost medical school, and a functioning hospital. It is not a tourist outpost. It is an Arctic city that happens to sit directly under the auroral oval.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The Northern Lights appear here on clear nights between September and March when the KP index exceeds 3. Neither condition is guaranteed on any given night. Commercial chases drive 50–200 km from the city to find clear sky. Four-night minimum — anything less is a gamble. The polar night runs November 26 to January 15: 50 days when the sun does not rise above the horizon.
              </p>
              <p className="text-slate-600 leading-relaxed">
                From May 18 to July 26, the midnight sun reverses the clock. Hiking, sea kayaking, and the Midnight Sun Marathon happen under 24-hour daylight. In November, orca and humpback pods follow the herring into Kaldfjord — by December, 400–600 orca concentrate in the fjords for the peak whale-watching season. Tromsø is the basecamp for all of it.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Key facts</h3>
                <dl className="space-y-3">
                  {tromso.facts.map((f) => (
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
                  September to March for Northern Lights. May to July for midnight sun. December to January for peak whale season. Avoid November — polar night has started but aurora chases are hit-or-miss with early-season cloud cover.
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
          <TromsoActivities />
        </div>
      </section>

      {/* When to visit */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">When to visit Tromsø</h2>
          <p className="text-slate-600 mb-10 max-w-2xl">
            Tromsø runs on light. What you can do and see changes completely by season.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tromso.seasonalWindows.map((w) => (
              <div
                key={w.label}
                className="border border-slate-200 rounded-lg p-6"
              >
                <p className="text-xs font-bold text-[#1B3A5C] uppercase tracking-wider mb-1">
                  {w.months}
                </p>
                <h3 className="font-bold text-slate-900 mb-3">{w.label}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{w.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting there */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">How to get to Tromsø</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">✈️</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Direct flights from Oslo (OSL) to Tromsø (TOS)</p>
                <p className="text-slate-600 text-sm mb-3">
                  SAS and Norwegian fly multiple times daily. Flight time: 2 hours. Fares from
                  NOK 799 return in shoulder season. Book 6-8 weeks ahead for winter aurora season.
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
                <p className="font-bold text-slate-900">Hurtigruten coastal ferry</p>
                <p className="text-slate-600 text-sm mb-3">
                  Tromsø is a stop on the Bergen-Kirkenes coastal route. The northbound sailing
                  arrives at 14:30 and departs at 18:30. 12-hour transit from Bergen to Tromsø
                  by Hurtigruten is not realistic. Fly in, sail a segment out.
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
                <p className="font-bold text-slate-900">Driving — E8 from Finland or E6 from the south</p>
                <p className="text-slate-600 text-sm mb-3">
                  From Narvik via E6: 3.5 hours (209 km). From the Finnish border (Skibotn) via
                  E8: 2 hours. Winter driving requires studded tyres. Norwegian law between
                  November 1 and first Sunday after Easter in Nord-Norge.
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
            <div className="flex gap-4 p-5 border border-slate-200 rounded-lg bg-white">
              <span className="text-2xl" aria-hidden="true">🚌</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Express bus from Narvik</p>
                <p className="text-slate-600 text-sm mb-3">
                  The Tromskortet express runs Narvik-Tromsø in 4 hours with multiple daily
                  departures. Narvik has direct rail connections from Stockholm
                  via the Ofoten Line. A scenic entry point for train travellers.
                </p>
                <a
                  href="https://svipper.no"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Book on Svipper <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basecamps — where to base yourself */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <TromsoBasecamps />
        </div>
      </section>

      {/* Related Tours */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Itineraries that include Tromsø</h2>
          <p className="text-slate-600 mb-12 max-w-2xl">
            Multi-day routes built around Tromsø as the Arctic basecamp.
          </p>
          <div className="space-y-4">
            {[
              '7-day Tromsø aurora week: 4 aurora chases, 1 whale safari, 1 dog sled, 1 rest day',
              '10-day Lofoten–Tromsø road trip: fly into Bodø, drive the E10 through Lofoten, ferry to Tromsø',
              '5-day midnight sun intensive (June): Senja island day trip, sea kayaking on Kaldfjord, Fjellheisen at 01:00',
              '14-day Arctic circle: Oslo to Tromsø via Hurtigruten + land segments, including Svalbard option',
            ].map((tour, i) => (
              <div key={i} className="bg-white rounded-lg border border-slate-200 p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1A365D]/10 flex items-center justify-center shrink-0">
                  <Compass className="w-5 h-5 text-[#1A365D]" aria-hidden="true" />
                </div>
                <p className="text-sm text-slate-700 font-medium">{tour}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Byline — Bjørn Haugen */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Link
              href="/om-oss/bjorn-haugen"
              className="group flex items-start gap-5 bg-slate-50 rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 bg-slate-200">
                <Image
                  src="/pics/team/bjorn_profile.png"
                  alt="Bjørn Haugen, Arctic Field Editor at NorgeTravel"
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#6D28D9] uppercase tracking-wide mb-1">The Arctic</p>
                <h3 className="font-bold text-slate-800 group-hover:text-[#1A365D] transition-colors">Bjørn Haugen</h3>
                <p className="text-sm text-slate-500 mb-2">Arktisk feltekspert | Arctic Field Editor</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  DNT-certified guide with 25 years in Nord-Norge and Svalbard. Former search and rescue volunteer in Tromsø. Knows exactly why the tourist board photo of the aurora is not the one you&apos;ll see on night one — and how to plan for the one you will.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to book Tromsø?</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Northern Lights tours, whale safaris, and Arctic trekking — all with
            commission-transparent affiliate links.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tjenester/northern-lights"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-md hover:shadow-lg transition-all"
            >
              Northern Lights Tours <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/destinations/northern-norway"
              className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-md hover:bg-white/20 transition-all backdrop-blur-sm"
            >
              All Northern Norway
            </Link>
          </div>
        </div>
      </section>
      <section className="relative z-10 py-10 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 flex justify-center">
          <ShareButtons url="/destinations/tromso/" title="Tromsø Travel Guide" />
        </div>
      </section>
    </main>
  );
}
