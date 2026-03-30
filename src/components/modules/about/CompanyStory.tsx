'use client';

import { Mountain, Compass, Flame } from 'lucide-react';

export default function CompanyStory() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How we work
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Three editorial pillars. One rule: tell the traveller what they need to know, not what they want to hear.
            </p>
          </div>

          {/* Pillars */}
          <div className="space-y-12">

            {/* THE GRIT */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#1B3A5C]/10 flex items-center justify-center">
                <Mountain className="w-8 h-8 text-[#1B3A5C]" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#1B3A5C] mb-2 uppercase tracking-wider">THE GRIT</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Reality over fantasy</h3>
                <p className="text-slate-600 leading-relaxed">
                  Norway is breathtaking — and demanding. Trolltunga is a 12-hour trek in sideways rain. The Arctic in February is not a postcard. We tell you the DNT grade, the elevation gain, and the weather reality before you lace up. If a trail is dangerous, we say it. If a route will take 6 hours, not 4, we give you the 6-hour number.
                </p>
              </div>
            </div>

            {/* THE COMPASS */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#1B3A5C]/10 flex items-center justify-center">
                <Compass className="w-8 h-8 text-[#1B3A5C]" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#1B3A5C] mb-2 uppercase tracking-wider">THE COMPASS</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Logistics that actually work</h3>
                <p className="text-slate-600 leading-relaxed">
                  The Bodø–Moskenes ferry crosses the Vestfjord in two hours — in winter, you feel every kilometre. We cover AutoPASS, ferry timetables, seasonal road closures, and the toll fees Google Maps won&apos;t mention. If you need a guide, we tell you who runs it and what it costs. No guessing.
                </p>
              </div>
            </div>

            {/* THE HEARTH */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#00CC6A]/10 flex items-center justify-center">
                <Flame className="w-8 h-8 text-[#00CC6A]" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#00CC6A] mb-2 uppercase tracking-wider">THE HEARTH</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">The reward at the end of the route</h3>
                <p className="text-slate-600 leading-relaxed">
                  After six hours in the sleet, peeling off wet wool by an iron stove in an old bakery — that is <em>koselig</em>. It is not a café aesthetic. We connect you to the working coast, the fishing villages, the Sami communities and the small producers who make Norway worth the effort. Warmth earned is warmth felt.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
