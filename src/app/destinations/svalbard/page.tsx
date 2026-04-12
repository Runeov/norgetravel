import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Thermometer } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { SvalbardTabs } from '@/components/modules/destinations/SvalbardTabs';
import { experiencesStore } from '@/lib/admin/travel-experiences';
import { eventsStore } from '@/lib/admin/travel-events';
import { accommodationStore } from '@/lib/admin/travel-accommodation';
import { guidesStore } from '@/lib/admin/travel-guides';
import { CITY_EXPERIENCE_PREFIXES } from '@/lib/city-experience-prefixes';

export const metadata: Metadata = {
  title: 'Svalbard Travel Guide 2026 | NorgeTravel',
  description: 'Plan a Svalbard expedition: polar bears, Arctic glaciers, Northern Lights at 78°N. What to expect, how to get there, and which operators are actually worth the price.',
};

const facts = [
  { label: 'Latitude', value: '74°–81°N' },
  { label: 'Polar night', value: 'Oct 26 – Feb 15' },
  { label: 'Midnight sun', value: 'Apr 19 – Aug 23' },
  { label: 'Population', value: '~2,600 (Longyearbyen)' },
  { label: 'Polar bears', value: '~3,000 (more than humans)' },
  { label: 'Currency', value: 'Norwegian Krone (NOK)' },
];

const experiences = [
  {
    title: 'Polar bear safaris',
    price: 'From NOK 2,400/person',
    duration: '4–8 hours',
    body: 'Snowmobile or boat safaris into the wilderness. You\'ll carry a rifle — or your guide will. It\'s legal and mandatory outside Longyearbyen.',
  },
  {
    title: 'Northern Lights dog sled',
    price: 'From NOK 3,200/person',
    duration: '3 hours',
    body: 'Dog sledding under the aurora at 78°N. This is the most extreme aurora experience on earth. Peak season: Nov–Feb.',
  },
  {
    title: 'Glacier hiking',
    price: 'From NOK 1,600/person',
    duration: 'Full day',
    body: 'Svalbard has 60% glacier coverage. Guided hikes on Longyearbreen and Nordenskiöldbreen with crampons and ice axes provided.',
  },
  {
    title: 'Snowmobile expeditions',
    price: 'From NOK 2,800/person',
    duration: '6–10 hours',
    body: 'Cross-country snowmobile tours to abandoned Russian settlements and remote fjords. No licence required.',
  },
];

export default async function SvalbardPage() {
  const [activities, events, accommodation, tours] = await Promise.all([
    experiencesStore.filterByIdPrefixes(CITY_EXPERIENCE_PREFIXES['svalbard']),
    eventsStore.filterByDestination('svalbard'),
    accommodationStore.filterByDestination('svalbard'),
    guidesStore.filterByDestination('svalbard'),
  ]);
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 text-white -mt-20 pt-20">
        <Image
          src="/images/svalbard/landscapes/svalbard-panorama_emilien-gigandet-1.jpg"
          alt="Svalbard panorama at 78 degrees north, glacial terrain and Arctic mountains under pale polar light"
          fill
          className="object-cover opacity-40"
          priority
          quality={75}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-slate-900/50 to-slate-900/90" />
        <div className="relative z-10 container mx-auto px-4 py-32 lg:py-48">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00CC6A]/20 text-[#00CC6A] text-sm font-medium mb-6">
            <MapPin className="w-4 h-4" />
            Destination Guide
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Svalbard
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            78°N. Polar bears outnumber people 3:1. Four months of total darkness. Four months of midnight sun. This is the far Arctic — and it's accessible with a direct flight from Oslo.
          </p>
          <div className="flex flex-wrap gap-6 text-sm text-slate-300">
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-[#5CBFEE]" /> Longyearbyen (LYR)</span>
            <span className="flex items-center gap-2"><Thermometer className="w-4 h-4 text-[#5CBFEE]" /> −20°C to +10°C</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#00CC6A]" /> 5–10 days recommended</span>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section className="py-16 bg-[#1B3A5C] text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {facts.map((f) => (
              <div key={f.label} className="text-center">
                <p className="text-[#00CC6A] text-xs font-bold uppercase tracking-wider mb-1">{f.label}</p>
                <p className="font-bold">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Svalbard — tabbed section */}
      <section className="relative py-20 overflow-hidden">
        <NorgeBackground />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore Svalbard</h2>
          <p className="text-slate-600 mb-12 max-w-2xl">
            Everything you need for a Svalbard expedition — activities, events, accommodation, and guided tours from licensed operators.
          </p>
          <SvalbardTabs
            activities={activities}
            events={events}
            accommodation={accommodation}
            tours={tours}
            fallbackActivities={experiences}
          />
        </div>
      </section>

      {/* Getting there */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">How to get there</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 border border-slate-200 rounded-2xl">
              <span className="text-2xl">✈️</span>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Direct flights from Oslo (OSL) to Longyearbyen (LYR)</p>
                <p className="text-slate-600 text-sm mb-3">Norwegian Air and SAS fly daily. Flight time: ~3 hours. Fares from NOK 2,400 return.</p>
                <a
                  href="https://www.kiwi.com/deep?from=OSL&to=LYR"
                  rel="noopener noreferrer sponsored"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  Search flights <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="flex gap-4 p-5 border border-slate-200 rounded-2xl">
              <span className="text-2xl">🛂</span>
              <div>
                <p className="font-bold text-slate-900">No visa required</p>
                <p className="text-slate-600 text-sm">The Svalbard Treaty (1920) grants visa-free access to 46 nationalities, including most travellers worldwide.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Plan your Svalbard expedition</h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">We link to Svalbard's top licensed guide operators — with commission transparency on every booking.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tjenester/northern-lights" className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#1B3A5C] font-bold rounded-full hover:shadow-lg transition-all">
              Northern Lights Tours <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/tjenester/trekking" className="inline-flex items-center justify-center px-8 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm">
              Arctic Trekking
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
