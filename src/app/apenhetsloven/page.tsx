import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Åpenhetsloven – Redegjørelse | Averdi AS',
  description: 'Averdi AS sin redegjørelse for aktsomhetsvurderinger etter Åpenhetsloven §5. Oppdatert 2025.',
};

export default function ApenhetslovanPage() {
  return (
    <main className="flex-1 bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-orange-400 uppercase tracking-widest mb-3">Lovpålagt informasjon</p>
          <h1 className="text-4xl font-bold mb-4">Åpenhetsloven</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Redegjørelse for aktsomhetsvurderinger knyttet til menneskerettigheter og anstendig arbeid.
          </p>
          <p className="mt-6 text-sm text-slate-400">Sist oppdatert: Juni 2025 &mdash; Averdi AS, org.nr. 980 383 571</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-16 space-y-16">

        {/* 1. Om Averdi og loven */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Om Averdi AS og Åpenhetsloven</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Averdi AS er et statsautorisert regnskapsførerselskap etablert i 1989, med hovedkontor i Karasjok.
            Vi leverer regnskaps-, lønns- og rådgivningstjenester til næringsdrivende og organisasjoner i
            Nord-Norge, med særlig kompetanse på samisk næringsliv og offentlig sektor.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Åpenhetsloven (lov om virksomheters åpenhet og arbeid med grunnleggende menneskerettigheter og
            anstendige arbeidsforhold) trådte i kraft 1. juli 2022. Loven pålegger virksomheter å utføre
            aktsomhetsvurderinger og å offentliggjøre en redegjørelse for disse vurderingene. Averdi AS
            arbeider aktivt med å etterleve lovens krav og støtter prinsippene i FNs veiledende prinsipper
            for næringsliv og menneskerettigheter (UNGPs).
          </p>
        </section>

        {/* 2. Aktsomhetsvurderinger */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Aktsomhetsvurderinger – vår prosess</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Vi gjennomfører aktsomhetsvurderinger i tråd med OECDs retningslinjer for flernasjonale selskaper
            og Åpenhetsloven §4. Prosessen er integrert i vår ordinære driftsoppfølging og inkluderer
            følgende steg:
          </p>
          <ol className="space-y-4">
            {[
              {
                step: '1. Forankring i selskapets retningslinjer',
                text: 'Styret og daglig ledelse har forankret ansvar for menneskerettigheter og anstendige arbeidsforhold i Averdis interne retningslinjer.',
              },
              {
                step: '2. Kartlegging og vurdering av negativ påvirkning',
                text: 'Vi kartlegger vår virksomhet, leverandørkjede og forretningsforbindelser med tanke på risiko for brudd på menneskerettigheter og arbeidsrettigheter.',
              },
              {
                step: '3. Iverksetting av tiltak',
                text: 'Der vi avdekker faktisk eller potensiell negativ påvirkning, setter vi i verk tiltak for å stanse, forebygge eller begrense skaden.',
              },
              {
                step: '4. Oppfølging og evaluering',
                text: 'Vi følger opp iverksatte tiltak og evaluerer effekt på risikoforholdene.',
              },
              {
                step: '5. Kommunikasjon',
                text: 'Vi kommuniserer åpent om prosessen, funn og tiltak gjennom denne redegjørelsen og på forespørsel.',
              },
            ].map(({ step, text }) => (
              <li key={step} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                <span className="font-bold text-[#E86C1F] shrink-0 pt-0.5">›</span>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">{step}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 3. Risikovurdering og funn */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Risikovurdering og funn</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Som en tjenesteleverandør med begrenset vareproduksjon og en primært norsk leverandørkjede anser
            Averdi AS den samlede risikoen for alvorlige brudd på menneskerettigheter og arbeidsrettigheter
            som lav til moderat. Nedenfor gir vi en oversikt over de viktigste risikofaktorene og tiltak.
          </p>
          <div className="space-y-4">
            {[
              {
                area: 'Egne ansatte',
                risk: 'Lav',
                color: 'bg-green-50 text-green-700',
                text: 'Averdi AS er underlagt norsk arbeidslivslovgivning. Alle ansatte har skriftlige arbeidsavtaler, markedskonform lønn og gode arbeidsforhold. Verneombud er valgt og arbeidsmiljøutvalg er etablert.',
              },
              {
                area: 'IT- og programvareleverandører',
                risk: 'Moderat',
                color: 'bg-yellow-50 text-yellow-700',
                text: 'Vi benytter norske og internasjonale programvareselskaper (bl.a. for regnskapssystemer og skylagring). Vi stiller krav om etterlevelse av menneskerettigheter og arbeidsforhold i avtaler, og prioriterer leverandører med dokumenterte etikkprogrammer.',
              },
              {
                area: 'Kontor- og forbruksartikler',
                risk: 'Lav til moderat',
                color: 'bg-yellow-50 text-yellow-700',
                text: 'Vi kjøper kontorutstyr og forbruksartikler primært fra norske distributører. Vi er oppmerksomme på at produksjonsleddet kan innebære risiko i lavkostland. Vi prioriterer leverandører med dokumenterte bærekraftsprogrammer.',
              },
            ].map(({ area, risk, color, text }) => (
              <div key={area} className="border border-slate-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">{area}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${color}`}>Risiko: {risk}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Tiltak og resultater */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Tiltak og resultater</h2>
          <ul className="space-y-3 text-slate-600">
            {[
              'Etisk retningslinje for ansatte er vedtatt og gjennomgått i personalsamlinger.',
              'Leverandørvurdering er integrert i innkjøpsprosessen for nye vesentlige leverandørforhold.',
              'IT-sikkerhet og personvern er revidert i tråd med GDPR og gjeldende norsk lov.',
              'Vi deltar i faglig oppdatering om bærekraft og ansvarlig næringsliv gjennom bransjeorganisasjoner.',
              'Ingen alvorlige brudd på menneskerettigheter eller arbeidsrettigheter er avdekket i 2024/2025.',
            ].map((tilt) => (
              <li key={tilt} className="flex gap-3">
                <span className="text-[#E86C1F] font-bold mt-0.5">✓</span>
                <span>{tilt}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Rett til informasjon §6 */}
        <section aria-labelledby="apenhetsloven-kontakt" className="bg-orange-50 border border-orange-100 rounded-2xl p-8">
          <h2 id="apenhetsloven-kontakt" className="text-2xl font-bold text-slate-900 mb-3">5. Kontaktpunkt for aktsomhetsforespørsler (§6)</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            Etter åpenhetsloven §6 kan enhver person sende skriftlig forespørsel om Averdi AS
            sin aktsomhetsvurdering – herunder faktiske og potensielle negative konsekvenser for
            grunnleggende menneskerettigheter og anstendige arbeidsforhold.
            Vi besvarer henvendelser innen tre uker.
          </p>
          <address className="not-italic space-y-3">
            <a
              href="mailto:post@averdi.no?subject=Forespørsel etter Åpenhetsloven §6"
              className="flex items-center gap-3 text-[#E86C1F] font-semibold hover:underline"
            >
              <span aria-hidden="true" className="text-xl">✉</span>
              post@averdi.no
            </a>
            <a
              href="tel:+4778466116"
              className="flex items-center gap-3 text-[#E86C1F] font-semibold hover:underline"
            >
              <span aria-hidden="true" className="text-xl">📞</span>
              78 46 61 16
            </a>
            <p className="text-sm text-slate-500 mt-2">
              Averdi AS, Juhána Rásttoš geaidnu 2, 9730 Karasjok
            </p>
          </address>
        </section>

        {/* Footer nav */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-100 text-sm">
          <Link href="/tilgjengelighet" className="text-[#E86C1F] hover:underline">
            → Tilgjengelighetserklæring
          </Link>
          <Link href="/" className="text-slate-500 hover:underline ml-auto">
            ← Tilbake til forsiden
          </Link>
        </div>
      </div>
    </main>
  );
}
