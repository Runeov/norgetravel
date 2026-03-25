import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Personvernerklæring',
  description: 'Personvernerklæring for Averdi AS — informasjon om hvilke data vi samler inn og dine rettigheter.',
};

export default function PersonvernPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">Personvernerklæring</h1>
      <p className="text-slate-500 mb-10">Sist oppdatert: 24. februar 2026</p>

      <section className="prose prose-slate max-w-none space-y-10 text-slate-700">

        {/* 1. Behandlingsansvarlig */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">1. Behandlingsansvarlig</h2>
          <p>
            Averdi AS er behandlingsansvarlig for personopplysninger som behandles via dette nettstedet.
          </p>
          <ul className="mt-3 space-y-1 list-none pl-0">
            <li><span className="font-medium">Organisasjonsnummer:</span> 980 383 571</li>
            <li><span className="font-medium">Adresse:</span> Juhána Rásttoš geaidnu 2, 9730 Karasjok</li>
            <li>
              <span className="font-medium">E-post:</span>{' '}
              <a href="mailto:post@averdi.no" className="text-[#E86C1F] hover:underline">post@averdi.no</a>
            </li>
          </ul>
        </div>

        {/* 2. Hvilke data samles inn */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">2. Hvilke personopplysninger samler vi inn?</h2>
          <p>Vi samler inn følgende kategorier av personopplysninger:</p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li>
              <span className="font-medium">Kontaktskjema:</span> navn, e-postadresse, telefonnummer (valgfritt) og innholdet i meldingen du sender oss.
            </li>
            <li>
              <span className="font-medium">Bruksanalyse (kun med samtykke):</span> anonymiserte data om besøk, sidevisninger, museklikk og scrolling via Hotjar. Ingen data kobles til identifiserbare enkeltpersoner.
            </li>
          </ul>
        </div>

        {/* 3. Informasjonskapsler */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">3. Informasjonskapsler (cookies)</h2>
          <p className="mb-4">Nettsiden bruker følgende informasjonskapsler:</p>
          <div className="overflow-x-auto rounded border border-slate-200">
            <table className="w-full text-sm text-left">
              <caption className="sr-only">Oversikt over informasjonskapsler brukt på averdi.no</caption>
              <thead className="bg-slate-100 text-slate-600 uppercase text-xs">
                <tr>
                  <th scope="col" className="px-4 py-3">Navn</th>
                  <th scope="col" className="px-4 py-3">Type</th>
                  <th scope="col" className="px-4 py-3">Formål</th>
                  <th scope="col" className="px-4 py-3">Lagringstid</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-3 font-mono">cookie-consent</td>
                  <td className="px-4 py-3">Nødvendig</td>
                  <td className="px-4 py-3">Husker ditt samtykkevalg</td>
                  <td className="px-4 py-3">Inntil nettleserlagring slettes</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="px-4 py-3 font-mono">_hjSession*</td>
                  <td className="px-4 py-3">Analyse (Hotjar)</td>
                  <td className="px-4 py-3">Anonymisert analyse av sidebruk</td>
                  <td className="px-4 py-3">Sesjon / 1 år</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono">_hjSessionUser*</td>
                  <td className="px-4 py-3">Analyse (Hotjar)</td>
                  <td className="px-4 py-3">Identifiserer anonym bruker mellom besøk</td>
                  <td className="px-4 py-3">1 år</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Du kan trekke tilbake samtykket til analysecookies når som helst ved å klikke «Kun nødvendige» i cookie-banneret som vises ved nytt besøk etter at du har slettet nettleserlagringen din.
          </p>
        </div>

        {/* 4. Rettslig grunnlag */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">4. Rettslig grunnlag</h2>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <span className="font-medium">Analysecookies (Hotjar):</span> samtykke (GDPR art. 6 nr. 1 bokstav a).
            </li>
            <li>
              <span className="font-medium">Nødvendig informasjonskapsel (samtykkevalg):</span> berettiget interesse i å huske ditt valg (GDPR art. 6 nr. 1 bokstav f).
            </li>
            <li>
              <span className="font-medium">Kontaktskjema:</span> oppfyllelse av en avtale eller gjennomføring av tiltak på den registrertes anmodning (GDPR art. 6 nr. 1 bokstav b).
            </li>
          </ul>
        </div>

        {/* 5. Lagring og deling */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">5. Lagringstid og deling</h2>
          <p>
            Opplysninger fra kontaktskjemaet lagres kun så lenge det er nødvendig for å behandle henvendelsen, maksimalt 2 år etter siste kontakt.
          </p>
          <p className="mt-3">
            Hotjar-data behandles av Hotjar Ltd. (Malta) som databehandler under en databehandleravtale. Data overføres ikke til tredjeland uten tilstrekkelige garantier i henhold til GDPR. Se{' '}
            <a href="https://www.hotjar.com/legal/policies/privacy/" target="_blank" rel="noopener noreferrer" className="text-[#E86C1F] hover:underline">Hotjars personvernerklæring<span className="sr-only"> (åpner i ny fane)</span></a>{' '}
            for detaljer.
          </p>
          <p className="mt-3">Vi selger ikke personopplysninger til tredjeparter.</p>
        </div>

        {/* 6. Dine rettigheter */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">6. Dine rettigheter</h2>
          <p>Som registrert har du rett til å:</p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li><span className="font-medium">Innsyn</span> — få vite hvilke opplysninger vi behandler om deg.</li>
            <li><span className="font-medium">Retting</span> — kreve at feilaktige opplysninger rettes.</li>
            <li><span className="font-medium">Sletting</span> — be om at opplysninger slettes («retten til å bli glemt»).</li>
            <li><span className="font-medium">Trekke samtykke</span> — du kan når som helst trekke tilbake samtykke til analysecookies uten at det påvirker lovligheten av behandling basert på samtykke før tilbaketrekkingen.</li>
            <li><span className="font-medium">Klage</span> — du har rett til å klage til <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer" className="text-[#E86C1F] hover:underline">Datatilsynet<span className="sr-only"> (åpner i ny fane)</span></a>.</li>
          </ul>
        </div>

        {/* 7. Kontakt */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-3">7. Kontakt oss</h2>
          <p>
            For spørsmål om personvern eller for å utøve dine rettigheter, ta kontakt med oss på{' '}
            <a href="mailto:post@averdi.no" className="text-[#E86C1F] hover:underline">post@averdi.no</a>.
          </p>
        </div>

      </section>

      <div className="mt-12 pt-8 border-t border-slate-200">
        <Link href="/" className="text-sm text-[#E86C1F] hover:underline">← Tilbake til forsiden</Link>
      </div>
    </main>
  );
}
