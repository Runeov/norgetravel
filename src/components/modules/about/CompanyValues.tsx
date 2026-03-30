'use client';

import { CheckCircle2, Map } from 'lucide-react';

export default function CompanyValues() {
  const howWeWork = [
    'Honest logistics — exact distances, real driving times, actual ferry schedules',
    'Safety first — DNT grades, weather reality, Fjellvettreglene on every relevant route',
    'Anti-brochure — no "breathtaking", no "hidden gems", no passive voice',
    'Local authority — Allemannsretten explained as privilege, not blank permission',
  ];

  const whatWeCover = [
    'Northern Lights tours — GetYourGuide, Viator, private Arctic guides',
    'Fjord cruises — Hurtigruten, Havila Voyages, zero-emission operators',
    'Luxury trekking — Norrøna, 57hours, DNT-certified guides',
    'Remote cabin stays — Rorbu culture, Booking.com, Novasol',
    'Lofoten & Working Coast — skrei season, fishing village etiquette, Bodø ferry reality',
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-[#1B3A5C]/10">
              <Map className="w-7 h-7 text-[#1B3A5C]" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How we work</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Every piece of content runs a reality check: does this tell the traveller what they need to know, or what they want to hear? If it&apos;s the latter — we rewrite it.
            </p>
            <ul className="space-y-3">
              {howWeWork.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-[#1B3A5C] mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-[#00CC6A]/10">
              <CheckCircle2 className="w-7 h-7 text-[#00CC6A]" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">What we cover</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Five affiliate verticals, all vetted for sustainability credentials and honest pricing. Mid-range and luxury segments only — we are not a budget backpacker aggregator.
            </p>
            <ul className="space-y-3">
              {whatWeCover.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-[#00CC6A] mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
