'use client';

import { CheckCircle2, Search, Wrench } from 'lucide-react';

export default function CompanyValues() {
  const howWeWorkItems = [
    'Fast kontaktperson',
    'Tydelige frister og forutsigbar fremdrift',
    'Råd basert på faktiske tall',
    'Løsninger tilpasset nordnorske rammevilkår',
  ];

  const whatWeDoItems = [
    'Regnskap og lønn',
    'Årsoppgjør og skatt',
    'Budsjett og likviditet',
    'Søknads- og støtteveiledning',
    'Rådgivning ved vekst og endring',
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-[#E86C1F]/10">
              <Search className="w-7 h-7 text-[#E86C1F]" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">🔎 Hvordan vi jobber</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              Vi jobber tett på virksomheten din.
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              Tallene dine skal ikke bare rapporteres. De skal brukes. Derfor kombinerer vi struktur,
              system og løpende dialog, slik at du alltid vet hvor du står og hva som bør gjøres videre.
            </p>
            <h3 className="text-lg font-bold text-slate-900 mb-4">Du får:</h3>
            <ul className="space-y-3 mb-6">
              {howWeWorkItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-[#E86C1F] mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-slate-700 leading-relaxed">
              Vi jobber digitalt, effektivt og direkte. Ingen unødvendig komplisering.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-[#E86C1F]/10">
              <Wrench className="w-7 h-7 text-[#E86C1F]" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">🛠 Hva vi gjør</h2>
            <ul className="space-y-3 mb-6">
              {whatWeDoItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-[#E86C1F] mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-slate-700 leading-relaxed font-medium">
              Kort sagt: Vi gir deg kontroll og beslutningsgrunnlag. Resten bygger du videre på.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

