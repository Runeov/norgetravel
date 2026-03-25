import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, AlertTriangle, ArrowRight, TrendingUp, FileText, Calendar, ExternalLink } from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Momskompensasjon for lag og foreninger 2026 | Forenklet vs dokumentert modell | Averdi Finnmark',
  description: 'Få tilbake moms på utstyr, kiosk og drift – steg-for-steg. Forenklet modell (8 % på 7 mill.) eller dokumentert modell med faktiske momsbeløp. Frist september 2026 + beregningseksempler.',
};

export default function MomskompensasjonPage() {
  const ingvald = getExpert('ingvald-laiti');

  const faqData = [
    {
      question: 'Hva er fristen for momskompensasjonssøknaden i 2026?',
      answer: 'For idrettslag via NIF/KlubbAdmin er fristen vanligvis ca. 15. august 2026 – sjekk nøyaktig dato i KlubbAdmin. For andre foreninger via tilskudd.lottstift.no er fristen 1. september 2026. Fristen er absolutt.',
    },
    {
      question: 'Kan vi søke momskompensasjon uten regnskapsfører?',
      answer: 'Ja, mange lag klarer det selv via KlubbAdmin eller Lottstift-portalen med forenklet modell. Men for å velge riktig modell og sikre at dere får maksimalt tilbake, kan det lønne seg å få profesjonell hjelp.',
    },
    {
      question: 'Hva er forskjellen mellom forenklet og dokumentert modell?',
      answer: 'Forenklet modell gir 8 % av totale driftskostnader (opp til 7 mill. kr) og krever minimalt ekstraarbeid. Dokumentert modell gir refusjon av faktisk betalt moms og kan gi mer penger hvis laget har mye moms på fakturaer, men krever en detaljert fakturaliste.',
    },
    {
      question: 'Vi er ikke registrert i Frivillighetsregisteret – kan vi søke?',
      answer: 'Nei. Registrering i Frivillighetsregisteret (brreg.no) er et absolutt krav for momskompensasjon. Uten dette er utbetalingen null. Registreringen er gratis og tar noen virkedager.',
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
          { '@type': 'ListItem', position: 3, name: 'Momskompensasjon 2026', item: 'https://www.averdi.no/kunnskapsbank/organisasjoner/moms' },
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
            Momskompensasjon for lag og foreninger –{' '}
            <span className="text-green-600">Ikke gå glipp av pengene dine i 2026!</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Hvert år betaler idrettslag, velforeninger og samiske lag i Finnmark og Nord-Troms titusener –
            ofte hundretusener – i moms på drakter, utstyr, kioskvarer, reiser, hallleie og arrangementer.
            Den gode nyheten? Dere kan få det aller meste tilbake gjennom momskompensasjon.
          </p>
          <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-5 text-green-800">
            <p className="font-semibold mb-1">Ekstra godt i 2026</p>
            <p className="text-sm leading-relaxed">
              Regjeringen har satt av nok penger til full kompensasjon. Mange lag i nord får
              <strong> 50 000–300 000 kr eller mer</strong> rett inn på kontoen – penger som kan gå
              rett til barne- og ungdomsaktivitet.
            </p>
          </div>
        </div>

        {/* Frister-kort */}
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 text-amber-600">
              <Calendar className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Frist – idrettslag via NIF</p>
              <p className="text-sm text-slate-600 mt-1">ca. 15. august 2026 (sjekk nøyaktig dato i KlubbAdmin)</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 text-amber-600">
              <Calendar className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Absolutt frist – andre foreninger</p>
              <p className="text-sm text-slate-600 mt-1">1. september 2026 via tilskudd.lottstift.no</p>
            </div>
          </div>
        </div>

        {/* Seksjon 1 */}
        <section className="mb-12" aria-labelledby="hvem-heading">
          <h2 id="hvem-heading" className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
            Hvem kan få momskompensasjon?
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <p className="text-slate-600 mb-5 font-medium">Dere kvalifiserer hvis:</p>
            <ul className="space-y-3 mb-6">
              {[
                'Laget er registrert i Frivillighetsregisteret (Brønnøysundregistrene)',
                'Frivillig innsats er en viktig del av det dere driver med',
                'Dere er en demokratisk, ideell forening (ikke næringsvirksomhet eller politisk parti)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="space-y-3 text-sm text-slate-700 border-t border-slate-100 pt-5">
              <p><strong>Idrettslag:</strong> Nesten alle NIF-tilknyttede lag får det – dere søker via NIF.</p>
              <p><strong>Velforeninger og samiske lag:</strong> Ja, så lenge dere oppfyller vilkårene om frivillighet.</p>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4 text-green-800">
                <strong>Regional bonus for nord:</strong> Som lag i Tiltakssonen sparer dere allerede mye
                på andre ting (f.eks. 0 % arbeidsgiveravgift). Momskompensasjonen kommer på toppen – ekstra gull verdt!
              </div>
            </div>
          </div>
        </section>

        {/* Seksjon 2 */}
        <section className="mb-12" aria-labelledby="regler-heading">
          <h2 id="regler-heading" className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
            Nye, bedre regler i 2026
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-4">
            {[
              {
                tittel: 'Hevet grense for revisjonsplikt',
                tekst: 'Grensen hevet til 7 millioner kr i driftskostnader (to år på rad). Små og mellomstore lag slipper revisor!',
              },
              {
                tittel: 'Forenklet modell – ny sats',
                tekst: '8 % kompensasjon på de første 7 mill. kr i grunnlag, deretter 6 % på beløp over 7 mill.',
              },
              {
                tittel: 'Full kompensasjon i budsjettet',
                tekst: 'Dere får høyere prosent enn noen gang – regjeringen har satt av nok.',
              },
              {
                tittel: 'Automatisk regnskapshenting',
                tekst: 'Regnskap hentes automatisk fra Regnskapsregisteret for mange lag.',
              },
            ].map(({ tittel, tekst }) => (
              <div key={tittel} className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-slate-800">{tittel}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{tekst}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Expert Insight */}
        {ingvald && (
          <ExpertInsight
            title="Regnskapet avgjør om søknaden godkjennes"
            quote="Momskompensasjon er i bunn og grunn en dokumentasjonsoppgave. Søknaden faller gjennom ikke fordi laget ikke kvalifiserer, men fordi én bilagsrekke mangler. Vi ser det hvert år – og det er alltid unødvendig."
            expert={ingvald}
          >
            <p>
              Vi setter opp regnskapet riktig fra start, velger riktig søknadsmodell og sikrer at
              dokumentasjonen holder for Lotteri- og stiftelsestilsynets krav. Du slipper å bekymre
              deg for den tekniske biten.
            </p>
          </ExpertInsight>
        )}

        {/* Seksjon 3 */}
        <section className="mb-12 mt-12" aria-labelledby="nif-heading">
          <h2 id="nif-heading" className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
            Slik søker idrettslag via NIF
            <span className="text-base font-normal text-slate-500">(enklest for dere)</span>
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <p className="text-slate-600 mb-6">De fleste idrettslag i Finnmark/Nord-Troms gjør dette via KlubbAdmin:</p>
            <ol className="space-y-5">
              {[
                'Sjekk at laget er registrert i Frivillighetsregisteret.',
                'Ha godkjent årsregnskap for 2025 klart (det søkes på fjorårets kostnader).',
                'Logg inn i KlubbAdmin (ka.nif.no) når Samordnet rapportering åpner (vanligvis april/mai).',
                'Fyll inn medlemstall, aktivitet og regnskapstall – momskompensasjon er en del av dette.',
                'Velg forenklet modell (de fleste små lag bruker denne).',
                'Send innen internfristen til NIF – vanligvis 15. august 2026 (sjekk nøyaktig dato i KlubbAdmin).',
              ].map((steg, i) => (
                <li key={i} className="flex gap-4">
                  <span className="w-7 h-7 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-slate-700">{steg}</p>
                </li>
              ))}
            </ol>
            <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600">
              NIF sender alt videre til Lotteri- og stiftelsestilsynet. Dere får utbetaling i desember/januar.
            </div>
          </div>
        </section>

        {/* Seksjon 4 */}
        <section className="mb-12" aria-labelledby="andre-heading">
          <h2 id="andre-heading" className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">4</span>
            Slik søker andre lag og foreninger
            <span className="text-base font-normal text-slate-500">(ikke via sentralledd)</span>
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <ol className="space-y-5">
              {[
                'Gå til tilskudd.lottstift.no når portalen åpner (april/mai 2026).',
                'Velg forenklet modell (enklest) eller dokumentert modell (se seksjon 6).',
                'Last opp: årsregnskap, årsberetning og eventuell revisorrapport.',
                'Send innen absolutt frist 1. september 2026.',
              ].map((steg, i) => (
                <li key={i} className="flex gap-4">
                  <span className="w-7 h-7 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-slate-700">{steg}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Seksjon 5 */}
        <section className="mb-12" aria-labelledby="hva-heading">
          <h2 id="hva-heading" className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">5</span>
            Hva får dere kompensasjon for?
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { kategori: 'Utstyr & drakter', detaljer: 'Drakter, baller, treningsutstyr og treningsleir' },
              { kategori: 'Kiosk & arrangementer', detaljer: 'Kioskvarer, billettsalg og arrangementskostnader' },
              { kategori: 'Drift & lokaler', detaljer: 'Strøm, vedlikehold, hallleie og reiser' },
              { kategori: 'Generell drift', detaljer: 'Nesten alt dere har betalt 25 % eller 12 % moms på' },
            ].map(({ kategori, detaljer }) => (
              <div key={kategori} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-slate-900">{kategori}</p>
                    <p className="text-slate-600 text-sm mt-1">{detaljer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
            <strong>Tips:</strong> Før alt løpende i regnskapet gjennom året – da blir søknaden superenkel.
          </div>
        </section>

        {/* Seksjon 6 – Forenklet vs dokumentert */}
        <section className="mb-12" aria-labelledby="modell-heading">
          <h2 id="modell-heading" className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">6</span>
            Forenklet vs. dokumentert modell
          </h2>
          <p className="text-slate-600 mb-6 ml-12">
            De fleste lag i nord velger forenklet – men dokumentert modell kan gi mer penger
            hvis dere har mye moms på fakturaer.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Forenklet */}
            <div className="bg-white rounded-2xl border-2 border-green-200 shadow-sm p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center text-green-700">
                  <FileText className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Forenklet modell</p>
                  <p className="text-xs text-green-600 font-medium">Anbefalt for de fleste</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 mb-5">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />8 % av totale driftskostnader (opp til 7 mill.)</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />6 % på kostnader over 7 mill.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />Minimalt med ekstraarbeid</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />Ingen krav til fakturaliste</li>
              </ul>
              <p className="text-xs text-slate-500 italic">Passer for: de aller fleste lag og foreninger</p>
            </div>

            {/* Dokumentert */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                  <FileText className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Dokumentert modell</p>
                  <p className="text-xs text-slate-500 font-medium">Mer arbeid, kan gi mer penger</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-700 mb-5">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />100 % av faktisk dokumentert moms</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />Minstegrense: 7 000 kr i søknadsbeløp</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />Krever detaljert fakturaliste med bilagsnr., dato og momsbeløp</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />Last opp transaksjonsliste fra regnskapssystemet</li>
              </ul>
              <p className="text-xs text-slate-500 italic">Passer for: lag med mye dyre innkjøp og godt ordnet regnskap</p>
            </div>
          </div>

          {/* Eksempel dokumentert */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-900">
            <p className="font-semibold mb-2">Eksempel – når dokumentert lønner seg:</p>
            <p>
              Et lag har driftskostnader på 3,5 mill. kr.
              Forenklet modell gir <strong>8 % = 280 000 kr</strong>.
              Men fakturaene viser at de faktisk betalte <strong>310 000 kr i moms</strong>.
              Med dokumentert modell får de <strong>310 000 kr</strong> – 30 000 kr mer!
            </p>
          </div>
        </section>

        {/* Seksjon 7 – Beregningseksempler */}
        <section className="mb-12" aria-labelledby="beregning-heading">
          <h2 id="beregning-heading" className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">7</span>
            Hvor mye kan dere få i 2026?
            <span className="text-base font-normal text-slate-500">(forenklet modell)</span>
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                label: 'Lite idrettslag',
                kostnader: '1 200 000 kr',
                utregning: '8 % av 1,2 mill.',
                resultat: '96 000 kr',
                farge: 'border-green-200 bg-green-50',
                tekstFarge: 'text-green-700',
              },
              {
                label: 'Mellomstort lag',
                kostnader: '3 800 000 kr',
                utregning: '8 % av 3,8 mill.',
                resultat: '304 000 kr',
                farge: 'border-green-300 bg-green-100',
                tekstFarge: 'text-green-800',
              },
              {
                label: 'Større lag',
                kostnader: '9 500 000 kr',
                utregning: '8 % av 7 mill. + 6 % av 2,5 mill.',
                resultat: '710 000 kr',
                farge: 'border-green-400 bg-green-200',
                tekstFarge: 'text-green-900',
              },
            ].map(({ label, kostnader, utregning, resultat, farge, tekstFarge }) => (
              <div key={label} className={`rounded-2xl border-2 ${farge} p-6 text-center`}>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</p>
                <p className="text-sm text-slate-600 mb-1">Driftskostnader: {kostnader}</p>
                <p className="text-xs text-slate-500 mb-3">{utregning}</p>
                <p className={`text-2xl font-bold ${tekstFarge}`}>{resultat}</p>
                <p className="text-xs text-slate-500 mt-1">tilbake til laget</p>
              </div>
            ))}
          </div>
        </section>

        {/* Seksjon 8 – Vanlige feil */}
        <section className="mb-16" aria-labelledby="feil-heading">
          <h2 id="feil-heading" className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">8</span>
            Vanlige feil vi ser hos lag i nord – og hvordan unngå dem
          </h2>

          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-8 space-y-4">
            {[
              {
                feil: 'Ikke registrert i Frivillighetsregisteret',
                fix: 'Sjekk dette i dag på brreg.no – uten registrering er utbetalingen null.',
              },
              {
                feil: 'Blandet privat og lag-regnskap',
                fix: 'Opprett egen foreningskonto og hold alt adskilt fra dag én.',
              },
              {
                feil: 'Gå glipp av fristen',
                fix: 'Fristen er absolutt – sett den i kalenderen nå og start i god tid.',
              },
              {
                feil: 'Glemmer å skille kostnader til anlegg vs. drift',
                fix: 'Anleggskostnader behandles annerledes – spør oss om riktig kontosetting.',
              },
              {
                feil: 'Gammelt regnskapssystem uten god oversikt',
                fix: 'Moderne systemer som Fiken eller PowerOffice gjør dokumentasjonen enkel.',
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
            Vil dere ha hjelp med alt sammen?
          </h2>
          <p className="text-green-100 mb-2 max-w-2xl mx-auto">
            Vi i Averdi tar over regnskapet, velger riktig modell (forenklet eller dokumentert),
            forbereder hele søknaden og sørger for at dere får maksimalt ut. Null stress, alt riktig –
            og vi kjenner nordnorske lag bedre enn noen andre.
          </p>
          <p className="text-green-200 text-sm mb-8 max-w-xl mx-auto">
            Første prat og gjennomgang er gratis for nye lag.
          </p>
          <Link
            href="/kontakt?subject=Momskompensasjon+hjelp"
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
              <p>Basert på Lotteri- og stiftelsestilsynets regelverk for momskompensasjon (2026), Frivillighetsregisterets krav og NIFs rapporteringsrutiner via KlubbAdmin.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href="https://lottstift.no/momskompensasjon" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                lottstift.no <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <a href="https://www.brreg.no/frivillighetsregisteret" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                brreg.no <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </article>
    </main>
  );
}
