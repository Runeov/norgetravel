import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Route, TrainFront } from 'lucide-react';

export function TransportHero() {
  return (
    <section className="relative -mt-20 overflow-hidden bg-[#102d46] pt-20 text-white">
      <div className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-[1440px] lg:grid-cols-[minmax(0,0.92fr)_minmax(30rem,1.08fr)]">
        <div className="relative z-10 flex items-center px-5 py-14 sm:px-8 lg:px-12 lg:py-16 xl:px-20">
          <div className="max-w-[42rem]">
            <Link
              href="/travel"
              className="mb-10 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-sky-100/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65d6a6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#102d46]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Travel map
            </Link>

            <p className="mb-5 text-sm font-semibold tracking-wide text-[#7bdcb0]">
              Transport across Norway
            </p>
            <h1 className="max-w-[11ch] text-5xl font-semibold leading-[0.96] tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">
              Let the route shape the trip.
            </h1>
            <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-sky-50/75 sm:text-xl">
              Compare practical ways to cross Norway by rail, road, sea, and air.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#transport-options"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#65d6a6] px-5 py-3 text-sm font-bold text-[#102d46] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#82e3ba] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#102d46] active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none"
              >
                Compare options
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/my-trip"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#102d46] active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none"
              >
                View my trip
              </Link>
            </div>

          </div>
        </div>

        <div className="relative min-h-[26rem] overflow-hidden lg:min-h-0">
          <Image
            src="/images/bodo/landscapes/nordland-railway_david-gubler.jpg"
            alt="The Nordland railway crossing an autumn mountain landscape near Bodø"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 54vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#102d46]/55 via-[#102d46]/5 to-transparent lg:from-[#102d46]/70 lg:via-transparent" />
          <div className="absolute inset-x-5 bottom-5 sm:inset-x-8 lg:inset-x-10 lg:bottom-10">
            <div className="ml-auto max-w-sm rounded-xl border border-white/20 bg-[#102d46]/75 p-5 shadow-[0_18px_55px_rgba(5,27,43,0.28)] backdrop-blur-md supports-[not_(backdrop-filter:blur(1px))]:bg-[#102d46]">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#65d6a6] text-[#102d46]">
                  <TrainFront className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-white">The journey is part of the plan</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-sky-50/70">
                    Norway&apos;s railways, express boats, and coastal routes turn travel time into landscape time.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-white/15 pt-4 text-xs font-medium text-sky-100/65">
                <Route className="h-4 w-4" aria-hidden="true" />
                The Nordland railway near Bodø
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
