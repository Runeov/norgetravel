import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, ArrowRight, ExternalLink } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Idrettslag & Vipps 2026 | Enkel registrering + regnskapstips | Averdi Finnmark',
  description: 'Steg-for-steg: Slik registrerer du Vipps for idrettslaget ditt. Kiosk, kontingent, billettsalg – uten rot i regnskapet. Guide for lag i Finnmark og Nord-Troms.',
};

export default function VippsGuidePage() {
  const alida = getExpert('alida');

  const faqData = [
    {
      question: 'Kan alle idrettslag registrere seg på Vipps?',
      answer: 'Ja, alle idrettslag med organisasjonsnummer, bankkonto i lagets navn og en person med signeringsrett kan registrere seg. Prosessen er digital og tar vanligvis 1–2 virkedager.',
    },
    {
      question: 'Hva koster det å ha Vipps for et idrettslag?',
      answer: 'Vipps tar et lite transaksjonsgebyr per betaling. For de fleste lag er dette lavere enn kostnadene ved kontanthåndtering og manuell bokføring. Vipps Donasjoner er dessuten gratis for frivillige organisasjoner.',
    },
    {
      question: 'Kan vi bruke Vipps til å kreve inn kontingent?',
      answer: 'Ja, via Spond eller MinIdrett kan dere sende betalingslenker direkte til foresatte. Det er den enkleste måten å samle inn kontingent – ingen purring, ingen papir, og alt registreres automatisk.',
    },
    {
      question: 'Hva skjer hvis vi glemmer å bokføre Vipps-inntekter?',
      answer: 'Udokumenterte inntekter kan ødelegge grunnlaget for momskompensasjonssøknaden og gi et urealistisk bilde av lagets økonomi. Sett rutine på å bokføre Vipps-rapporter rett etter hvert arrangement eller kioskvakt.',
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: faqData.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Kunnskapsbank', item: 'https://www.averdi.no/kunnskapsbank' },
          { '@type': 'ListItem', position: 2, name: 'Lag & Forening', item: 'https://www.averdi.no/kunnskapsbank/organisasjoner' },
          { '@type': 'ListItem', position: 3, name: 'Vipps-guide for idrettslag', item: 'https://www.averdi.no/kunnskapsbank/organisasjoner/vipps' },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <AverdiBackground />

      <article className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Link href="/kunnskapsbank/organisasjoner" className="inline-flex items-center text-slate-500 hover:text-green-600 mb-8 font-medium transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Tilbake til Forenings-hub
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            For Kasserere & Styreledere
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Idrettslag & Vipps –{' '}
            <span className="text-green-600">Sånn får du det til uten rot!</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Vipps har blitt redningen for nesten alle idrettslag i nord. Enten det er pølse og
            vaffel på kiosk under cup, billettsalg til hjemmekamp, eller rask innbetaling av
            kontingent – Vipps gjør det befriende enkelt for både foreldre og kasserer.
          </p>
          <p className="text-xl text-slate-600 leading-relaxed mt-4">
            Men: uten riktig oppsett blir det fort rot i regnskapet. Her får du en komplett,
            oppdatert guide som viser akkurat hvordan du registrerer Vipps for idrettslaget
            ditt i 2026, hvordan du bruker det smart, og hvordan du bokfører alt riktig så det
            er klart til årsregnskapet.
          </p>
        </div>

        {/* Section 1 */}
        <section className="mb-12" aria-labelledby="krav-heading">
          <h2 id="krav-heading" className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
            Sjekk om laget ditt kan få Vipps
            <span className="text-base font-normal text-slate-500">(tar 2 minutter)</span>
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <p className="text-slate-600 mb-5 font-medium">Du trenger:</p>
            <ul className="space-y-3 mb-6">
              {[
                'Organisasjonsnummer (Brønnøysundregistrene)',
                'Bankkonto registrert kun i lagets navn (ikke privat)',
                'En person med signeringsrett i styret (vanligvis styreleder eller kasserer) med BankID på mobil',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
              <strong>Tips fra nord:</strong> De fleste idrettslag i Finnmark og Nord-Troms har
              allerede dette. Mangler du orgnr? Vi i Averdi hjelper deg gratis med å fikse det.
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12" aria-labelledby="steg-heading">
          <h2 id="steg-heading" className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
            Slik registrerer du Vipps for idrettslaget – steg for steg
            <span className="text-base font-normal text-slate-500">(2026)</span>
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <ol className="space-y-5">
              {[
                { step: 1, text: 'Gå til Vipps bedriftsportal' },
                { step: 2, text: 'Velg Norge og «Betalingsløsning»' },
                {
                  step: 3,
                  text: 'Svar på spørsmålene',
                  sub: [
                    'Velg «Forening / Lag / Frivillig organisasjon» der det passer',
                    'Beskriv at dere er et idrettslag (NIF-medlem hjelper ofte)',
                    'Velg «Vipps på nett» eller «Vipps i butikk/kiosk» etter behov (de fleste lag velger begge)',
                  ],
                },
                { step: 4, text: 'Logg inn med BankID (bruk den som har signeringsrett)' },
                {
                  step: 5,
                  text: 'Søk opp laget ditt med organisasjonsnummer – det skal dukke opp automatisk',
                },
                { step: 6, text: 'Koble til lagets bankkonto (IBAN og kontonummer)' },
                { step: 7, text: 'Les gjennom og signer avtalen elektronisk' },
                {
                  step: 8,
                  text: 'Send inn – du får svar på e-post innen 1–2 virkedager (ofte samme dag)',
                },
              ].map(({ step, text, sub }) => (
                <li key={step} className="flex gap-4">
                  <span className="w-7 h-7 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {step}
                  </span>
                  <div>
                    <p className="text-slate-700 font-medium">{text}</p>
                    {sub && (
                      <ul className="mt-2 space-y-1 ml-4">
                        {sub.map((s) => (
                          <li key={s} className="text-slate-500 text-sm list-disc">{s}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
              <strong>Ferdig!</strong> Du får ditt eget Vipps-nummer (f.eks. #123456) som du kan
              bruke overalt.
            </div>
            <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
              <strong>Proff-tips:</strong> Be om «Vipps-donasjoner» samtidig hvis dere tar imot
              sponsorgaver eller innsamlinger.
            </div>
          </div>
        </section>

        {/* Expert Insight */}
        {alida && (
          <ExpertInsight
            title="Koble Vipps direkte til regnskapet"
            quote="Mange lag bruker Vipps perfekt på kiosk, men glemmer å bokføre det riktig etterpå. Da hjelper det lite med god inntekt hvis regnskapet ikke stemmer til søknad om momskompensasjon."
            expert={alida}
          >
            <p>
              Vi setter opp integrasjon mellom Vipps og regnskapssystemet ditt – enten det er
              Fiken, Uni Micro eller Mamut. Da slipper kasserer å punche tall manuelt, og alt
              er klart til årsregnskap og momskompensasjonssøknad.
            </p>
          </ExpertInsight>
        )}

        {/* Section 3 */}
        <section className="mb-12 mt-12" aria-labelledby="smart-heading">
          <h2 id="smart-heading" className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
            Bruk Vipps smart i idrettslaget ditt
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                title: 'Kiosk & arrangementer',
                text: 'Del Vipps-nummeret på plakater, i Spond-appen eller på Facebook. Sett opp faste beløp for vanlige varer.',
              },
              {
                title: 'Kontingent',
                text: 'Send betalingslenke via Spond eller MinIdrett slik at foresatte betaler direkte.',
              },
              {
                title: 'Billettsalg',
                text: 'Lag egen betalingslenke for kamp eller turnering – ingen kø i kassa.',
              },
              {
                title: 'Donasjoner',
                text: 'Bruk Vipps-donasjoner-knapp på lagets hjemmeside for sponsorgaver og innsamlinger.',
              },
            ].map(({ title, text }) => (
              <div key={title} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12" aria-labelledby="bokforing-heading">
          <h2 id="bokforing-heading" className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
            Bokfør Vipps-innbetalingene riktig
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-slate-700">
                <strong>Inntekt:</strong> Bruk konto 3000-serien (kontingent, billettsalg, kioskinntekter)
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-slate-700">
                <strong>Merk alltid bilag</strong> med referanse, f.eks.:
                «Vipps #123456 – kamp 15.02» eller «Kontingent 2026 – Ola Nordmann»
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
              <strong>Averdi-råd:</strong> Koble Vipps direkte til regnskapssystemet (Fiken, Uni Micro
              eller Mamut) – da bokføres salg automatisk på riktig konto og gebyrene splittes ut.
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-16" aria-labelledby="feil-heading">
          <h2 id="feil-heading" className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">5</span>
            Vanlige feil vi ser hos lag i nord – og hvordan fikse dem
          </h2>

          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-8 space-y-4">
            {[
              {
                feil: 'Vipps-nummer brukt privat',
                fix: 'Fører til blanding av privat og klubb-penger. Sett alltid opp eget nummer i lagets navn.',
              },
              {
                feil: 'Glemt å bokføre kiosksalg samme dag',
                fix: 'Sett en rutine: ansvarlig bokfører salget umiddelbart etter arrangementet.',
              },
              {
                feil: 'Feil konto ved donasjoner',
                fix: 'Donasjoner og sponsorinntekter hører til ulike kontoer – spør oss om riktig oppsett.',
              },
              {
                feil: 'Bankkonto er i privatpersons navn',
                fix: 'Vipps krever konto i lagets navn. Opprett foreningskonto i banken din først.',
              },
            ].map(({ feil, fix }) => (
              <div key={feil} className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-slate-800">{feil}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{fix}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 md:p-10 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Vil dere ha Vipps satt opp riktig fra dag én?
          </h2>
          <p className="text-green-100 mb-8 max-w-xl mx-auto">
            Ta kontakt med Alida – vår spesialist på idrettslag og foreninger. Første samtale
            er gratis for nye lag.
          </p>
          <Link
            href="/kontakt?subject=Vipps-oppsett+for+idrettslag"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-green-700 font-bold rounded-full hover:bg-green-50 transition-colors"
          >
            Ta kontakt nå
            <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Ofte stilte spørsmål</h2>
          <FaqAccordion items={faqData} themeColor="#16a34a" />
        </div>

        {/* Kilder */}
        <div className="border-t border-slate-200 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-slate-500">
            <div className="max-w-2xl">
              <p className="font-semibold text-slate-700 mb-1">Kilder</p>
              <p>Basert på Vipps' offisielle registreringsveiledning for foreninger og Idrettsforbundets anbefalinger for betalingsløsninger i idrettslag.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href="https://portal.vipps.no" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                portal.vipps.no <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <a href="https://www.idrettsforbundet.no/klubbguiden" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                idrettsforbundet.no <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </article>
    </main>
  );
}
