import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tilgjengelighetserklæring | Averdi AS',
  description: 'Averdi AS sin tilgjengelighetserklæring etter EAA (EU 2019/882). Gi oss tilbakemelding om tilgjengelighetsbarrierer.',
};

export default function TilgjengelighetPage() {
  return (
    <main className="flex-1 bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-blue-300 uppercase tracking-widest mb-3">EAA – European Accessibility Act</p>
          <h1 className="text-4xl font-bold mb-4">Tilgjengelighetserklæring</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Averdi AS er forpliktet til å gjøre nettsiden tilgjengelig for alle, i tråd med
            European Accessibility Act (EU 2019/882) og norsk universell utforming.
          </p>
          <p className="mt-6 text-sm text-blue-300">Sist oppdatert: Juni 2025</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-14">

        {/* 1. Om erklæringen */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Om denne erklæringen</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Denne tilgjengelighetserklæringen gjelder nettstedet <strong>averdi.no</strong> og er utarbeidet
            i tråd med kravene i European Accessibility Act (EAA, EU 2019/882), som gjelder fra 28. juni
            2025, samt norsk lov om universell utforming av IKT (diskriminerings- og
            tilgjengelighetsloven §14).
          </p>
          <p className="text-slate-600 leading-relaxed">
            Vi ønsker at alle skal kunne bruke nettstedet vårt uten barrierer, uavhengig av funksjonsnedsettelse
            eller hjelpemiddel. Standarden vi arbeider mot er <strong>WCAG 2.1 nivå AA</strong>.
          </p>
        </section>

        {/* 2. Status */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Status for tilgjengelighet</h2>
          <div className="flex items-start gap-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl mb-6">
            <span className="text-2xl mt-0.5">⚠️</span>
            <p className="text-slate-700 text-sm leading-relaxed">
              Nettstedet er <strong>delvis i samsvar</strong> med WCAG 2.1 AA. Vi er i gang med å forbedre
              tilgjengeligheten og arbeider systematisk med utbedring av kjente mangler.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Tastaturnavigasjon', status: '✓ Støttes', ok: true },
                { label: 'Tekstalternativer for bilder (alt-tekster)', status: '✓ Implementert', ok: true },
                { label: 'Tilstrekkelig fargekontrast', status: '✓ Kontrollert', ok: true },
                { label: 'Responsivt design (mobil/nettbrett)', status: '✓ Støttes', ok: true },
                { label: 'Skjemaetikettering', status: '✓ Implementert', ok: true },
                { label: 'Skip-navigasjon lenke', status: '✓ Implementert', ok: true },
                { label: 'ARIA landmarks', status: '⚠ Under utbedring', ok: false },
            ].map(({ label, status, ok }) => (
              <div key={label} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-700 text-sm">{label}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${ok ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Kjente begrensninger */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Kjente begrensninger</h2>
          <ul className="space-y-3 text-slate-600">
            {[
              'Noen interaktive elementer mangler fullstendig ARIA-etikettering. Vi jobber med å utbedre dette.',
                'Videoinnhold på nettstedet har foreløpig ikke teksttolking eller lydtekst.',
            ].map((point) => (
              <li key={point} className="flex gap-3">
                <span className="text-yellow-500 font-bold mt-0.5 shrink-0">!</span>
                <span className="text-sm leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. Tilbakemelding (key compliance requirement) */}
        <section className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">4. Gi oss tilbakemelding</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Opplever du tilgjengelighetsbarrierer på averdi.no? Vi ønsker å høre fra deg slik at vi kan
            forbedre opplevelsen for alle brukere. Beskriv gjerne hvilken side du er på, hvilken barriere
            du opplever, og hvilken teknologi/hjelpemiddel du bruker.
          </p>
          <div className="space-y-4">
            <a
              href="mailto:post@averdi.no?subject=Tilbakemelding om tilgjengelighet – averdi.no"
              className="flex items-center gap-3 bg-white border border-blue-200 rounded-xl p-4 hover:border-[#E86C1F] transition-colors group"
            >
              <span className="text-2xl">✉</span>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-[#E86C1F] transition-colors">Send e-post</p>
                <p className="text-sm text-slate-500">post@averdi.no – merk emne med "Tilgjengelighet"</p>
              </div>
            </a>
            <a
              href="tel:+4778466116"
              className="flex items-center gap-3 bg-white border border-blue-200 rounded-xl p-4 hover:border-[#E86C1F] transition-colors group"
            >
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-semibold text-slate-900 group-hover:text-[#E86C1F] transition-colors">Ring oss</p>
                <p className="text-sm text-slate-500">78 46 61 16</p>
              </div>
            </a>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            Vi bestreber oss på å besvare henvendelser om tilgjengelighet innen <strong>5 virkedager</strong>.
          </p>
        </section>

        {/* 5. Klageadgang */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Klageadgang</h2>
          <p className="text-slate-600 leading-relaxed">
            Dersom du ikke er fornøyd med svaret vi gir på din henvendelse om tilgjengelighet, kan du klage
            til <strong>Diskrimineringsnemnda</strong> (diskrimineringsnemnda.no) eller{' '}
            <strong>Digitaliseringsdirektoratet</strong>, som fører tilsyn med at offentlig og privat sektor
            etterlever kravene til universell utforming av IKT.
          </p>
          <a
            href="https://www.diskrimineringsnemnda.no"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-[#E86C1F] font-medium hover:underline text-sm"
          >
            Diskrimineringsnemnda.no<span className="sr-only"> (åpnes i ny fane)</span> →
          </a>
        </section>

        {/* Footer nav */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100 text-sm">
          <Link href="/apenhetsloven" className="text-[#E86C1F] hover:underline">
            → Åpenhetsloven
          </Link>
          <Link href="/" className="text-slate-500 hover:underline ml-auto">
            ← Tilbake til forsiden
          </Link>
        </div>
      </div>
    </main>
  );
}
