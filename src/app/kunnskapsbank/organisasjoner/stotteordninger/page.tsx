import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  ExternalLink,
  Star,
} from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Tilskudd og støtteordninger 2026 for lag i nord | Spillemidler, Inkludering, Sameting | Averdi Finnmark',
  description:
    'Komplett guide 2026: Spillemidler, ny inkluderingstøtte, anleggsmidler, Sameting og regionale gullordninger. Frister + tips for idrettslag i Finnmark og Nord-Troms.',
};

const frister = [
  {
    ordning: 'Spillemidler – utstyr',
    belop: '20 000–100 000 kr+',
    frist: '4. februar 2026',
    haster: true,
    url: 'https://www.idrettsforbundet.no',
    portal: 'SportsAdmin',
  },
  {
    ordning: 'Inkludering i idrettslag',
    belop: 'Varierer',
    frist: 'Løpende',
    haster: false,
    url: null,
    portal: 'Lokalt idrettsråd/krets',
  },
  {
    ordning: 'Sametinget – idrett',
    belop: 'Flere hundre tusen',
    frist: 'Høst/vinter 2026',
    haster: false,
    url: 'https://www.sametinget.no/tilskudd',
    portal: 'sametinget.no',
  },
  {
    ordning: 'Spillemidler – anlegg',
    belop: 'Store summer (+25 % nord)',
    frist: '15. sept (innmelding)',
    haster: false,
    url: 'https://www.anleggsregisteret.no',
    portal: 'Kommune/anleggsregisteret.no',
  },
  {
    ordning: 'IMDi – integrering',
    belop: 'Varierer',
    frist: 'Jan (sjekk ny runde)',
    haster: false,
    url: 'https://www.imdi.no',
    portal: 'imdi.no',
  },
  {
    ordning: 'Troms/Finnmark friluftsliv',
    belop: 'Varierer',
    frist: 'Varierer per ordning',
    haster: false,
    url: 'https://www.tromsfylke.no',
    portal: 'tromsfylke.no',
  },
  {
    ordning: 'Energitiltak frivilligheten',
    belop: 'Varierer',
    frist: 'Løpende',
    haster: false,
    url: 'https://www.regionalforvaltning.no',
    portal: 'regionalforvaltning.no',
  },
];

export default function StotteordningerPage() {
  const janAtle = getExpert('jan-atle');

  const faqData = [
    {
      question: 'Hva er fristen for spillemidler til utstyr i 2026?',
      answer: 'Fristen er onsdag 4. februar 2026 kl. 23:59 via SportsAdmin. Fristen er absolutt – ingen unntak. Søknaden gjelder utstyr som er kjøpt og betalt i 2025.',
    },
    {
      question: 'Kan vi søke flere støtteordninger samtidig?',
      answer: 'Ja, det er fullt mulig å søke parallelt på flere ordninger. Vær obs på at noen ordninger ikke tillater dobbeltfinansiering av nøyaktig samme kostnad. Les vilkårene nøye eller ta kontakt med oss – vi kartlegger hva dere kan kombinere.',
    },
    {
      question: 'Hva skjer hvis vi ikke sender sluttrapport?',
      answer: 'Manglende sluttrapport kan føre til at tilskuddsgiveren krever pengene tilbake og eventuelt nekter dere å søke igjen. Sett fristen for sluttrapport i kalenderen med en gang dere mottar tilskuddet.',
    },
    {
      question: 'Hva trenger vi for å søke spillemidler til utstyr?',
      answer: 'Dere trenger: fakturaer for utstyr kjøpt i 2025, lagets organisasjonsnummer, registrering i SportsAdmin, og at laget er tilknyttet NIF. Særidrettslag søker direkte, fleridrettslag gruppevis via forbundene (f.eks. fotball via NFF).',
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
          { '@type': 'ListItem', position: 3, name: 'Støtteordninger 2026', item: 'https://www.averdi.no/kunnskapsbank/organisasjoner/stotteordninger' },
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

        <Link
          href="/kunnskapsbank/organisasjoner"
          className="inline-flex items-center text-slate-500 hover:text-green-600 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Tilbake til Forenings-hub
        </Link>

        {/* Hero */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            For Kasserere & Styreledere
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
            Tilskudd og støtteordninger –{' '}
            <span className="text-green-600">Få ekstra penger til laget ditt i 2026!</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Idrettslag, velforeninger og samiske lag i Finnmark og Nord-Troms har masse muligheter
            til å hente inn titusener eller hundretusener ekstra. Spillemidler, inkluderingstøtte,
            Sameting-midler og regionale gullordninger – det handler om å være tidlig ute og ha
            orden i papirene.
          </p>
        </div>

        {/* Hastevarsel – 4. februar */}
        <div className="mb-14 bg-red-50 border-2 border-red-300 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center shrink-0 text-red-600">
            <Calendar className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <p className="font-bold text-red-800 text-lg">Haster: Spillemidler til utstyr</p>
            <p className="text-red-700 mt-1">
              Frist <strong>onsdag 4. februar 2026 kl. 23:59</strong> via SportsAdmin. Mange lag i
              nord får 20 000–100 000 kr. Har dere fakturaene klare?
            </p>
          </div>
        </div>

        {/* Seksjon 1 – Spillemidler utstyr */}
        <section className="mb-12" aria-labelledby="spillemidler-heading">
          <h2
            id="spillemidler-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              1
            </span>
            Spillemidler til utstyr
            <span className="text-base font-normal text-slate-500">(mest populært for lag i nord)</span>
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <ul className="space-y-3 mb-6">
              {[
                'Totalt 43 millioner kr å fordele – 7 mill. mer enn i fjor!',
                'Støtte til utstyr kjøpt i 2025: drakter, baller, ski, vektstenger, kiosk-utstyr osv.',
                'Frist: onsdag 4. februar 2026 (kl. 23:59)',
                'Søk via SportsAdmin (idrettsforbundet.no)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-700 mb-4">
              <p className="font-semibold mb-2">Slik søker dere:</p>
              <p>
                Logg inn i SportsAdmin. Særidrettslag søker direkte, fleridrettslag gruppevis
                (fotball via NFF, ski via NSF). Last opp fakturaer for utstyr kjøpt i 2025.
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
              <strong>Tips:</strong> Mange lag i nord får 20 000–100 000 kr. Start å samle
              kvitteringer nå!
            </div>
          </div>
        </section>

        {/* Seksjon 2 – Frifond */}
        <section className="mb-12" aria-labelledby="frifond-heading">
          <h2
            id="frifond-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              2
            </span>
            Frifond – støtte til barn og unge
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <ul className="space-y-3 mb-6">
              {[
                'Midler til aktiviteter for barn og unge (6–19 år)',
                'Søkes via særforbund eller LNU',
                'Frist vanligvis mai/juni 2026 (sjekk KlubbAdmin eller frifond.no)',
                'Kan brukes til leirer, cuper, utstyr og inkludering',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
              <strong>Regional bonus:</strong> Lag i Finnmark/Nord-Troms prioriteres ofte på grunn
              av lange reiser og høye kostnader.
            </div>
          </div>
        </section>

        {/* Seksjon 3 – Sametinget */}
        <section className="mb-12" aria-labelledby="sameting-heading">
          <h2
            id="sameting-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              3
            </span>
            Sametinget – gull for samiske lag og foreninger
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <ul className="space-y-3 mb-6">
              {[
                'Totalt 6,283 millioner kr i 2026 – økning på 600 000 kr',
                'Direktetilskudd til organisasjoner + deltakelse i Arctic Winter Games',
                'Kultur- og idrettsstipend til ungdom (4 × 25 000 kr)',
                'Egen idrettsavtale med Sámi Valáštallan Lihttu (SVL), SHL og FA Sápmi',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <Star className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-sm text-slate-700">
              <p className="font-semibold mb-1">Slik søker dere:</p>
              <p>
                Lokale samiske lag søker ofte via SVL eller direkte på{' '}
                <a
                  href="https://www.sametinget.no/tilskudd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 underline hover:text-green-800"
                >
                  sametinget.no/tilskudd
                  <span className="sr-only"> (åpner i ny fane)</span>
                </a>
                . Sjekk utlysninger høst/vinter 2026.
              </p>
            </div>
          </div>
        </section>

        {/* Expert Insight */}
        {janAtle && (
          <ExpertInsight
            title="De fleste lag søker på under halvparten de har krav på"
            quote="Etter 30 år med søknadsarbeid ser jeg det fortsatt: lag som sliter med underskudd fordi de ikke visste om en ordning de oppfylte alle kravene til. Pengene finnes – men fristen gikk ut."
            expert={janAtle}
          >
            <p>
              Jeg kartlegger hvilke ordninger laget ditt kvalifiserer for, fyller ut søknadene og
              sørger for at dokumentasjonen er på plass – inkludert regnskapsrapporter og
              årsberetning. Første kartlegging er gratis.
            </p>
          </ExpertInsight>
        )}

        {/* Seksjon 4 – Kommunale midler */}
        <section className="mb-12 mt-12" aria-labelledby="kommunale-heading">
          <h2
            id="kommunale-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              4
            </span>
            Kommunale og fylkeskommunale tilskudd
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                { tittel: 'Aktivitetstilskudd', tekst: 'Per aktive medlem i laget' },
                { tittel: 'Leietilskudd', tekst: 'Hall- og lokalleie dekkes helt eller delvis' },
                {
                  tittel: 'Friluftslivsmidler',
                  tekst: 'F.eks. 4,2 mill. kr i Troms nylig utlyst',
                },
                {
                  tittel: 'Kompetanse & tjenesteutvikling',
                  tekst: 'Statsforvalteren i Troms og Finnmark – frist 16. mars 2026',
                },
              ].map(({ tittel, tekst }) => (
                <div
                  key={tittel}
                  className="flex items-start gap-3 bg-slate-50 rounded-xl p-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{tittel}</p>
                    <p className="text-slate-500 text-sm mt-0.5">{tekst}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
              <strong>Tips:</strong> Kontakt idrettsrådet i kommunen – de hjelper ofte med
              søknaden og kjenner lokale ordninger ingen andre vet om.
            </div>
          </div>
        </section>

        {/* Seksjon 5 – Flere ordninger */}
        <section className="mb-12" aria-labelledby="andre-heading">
          <h2
            id="andre-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              5
            </span>
            Flere viktige ordninger 2026
          </h2>

          <div className="space-y-4">
            {[
              {
                tittel: 'Inkludering i idrettslag (30 millioner kr)',
                tekst:
                  'For barn og unge med økonomiske eller kulturelle barrierer. Løpende søknad via lokale idrettsråd/kretser.',
                notat: 'Kontakt ditt idrettsråd nå!',
                farge: 'border-green-200',
              },
              {
                tittel: 'Spillemidler til idrettsanlegg (bygging/rehabilitering)',
                tekst:
                  'Økte satser i 2026: nærmiljøanlegg opp til 400 000 kr, idrettshaller +40 % mer enn før. Søk via kommunen → anleggsregisteret.no.',
                notat: 'Innmeldingsfrist ofte 15. september.',
                farge: 'border-slate-200',
              },
              {
                tittel: 'IMDi – Tilskudd til integreringsarbeid',
                tekst:
                  'Ca. 41 millioner kr nasjonalt. For lag som jobber med innvandrere og samfunnsdeltakelse. Frist var januar 2026.',
                notat: 'Følg imdi.no for neste runde.',
                farge: 'border-slate-200',
              },
              {
                tittel: 'Bufdir – Inkludering av barn og unge',
                tekst:
                  'Store summer til fritids- og ferieaktiviteter. Frist for 2026 var november 2025.',
                notat: 'Følg bufdir.no for 2027-runden.',
                farge: 'border-slate-200',
              },
              {
                tittel: 'Energitiltak for frivilligheten',
                tekst:
                  'Støtte til energibesparende tiltak i klubbhus, haller eller anlegg – solceller, isolasjon osv.',
                notat: 'Søk via regionalforvaltning.no',
                farge: 'border-slate-200',
              },
              {
                tittel: 'Arrangementsstøtte internasjonale idrettsarrangementer (KUD)',
                tekst: 'For større arrangementer i Norge.',
                notat: 'Frist 1. mars 2026.',
                farge: 'border-slate-200',
              },
            ].map(({ tittel, tekst, notat, farge }) => (
              <div
                key={tittel}
                className={`bg-white rounded-2xl border ${farge} shadow-sm p-6`}
              >
                <p className="font-bold text-slate-900 mb-1">{tittel}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{tekst}</p>
                <p className="text-green-700 text-sm font-medium mt-2">{notat}</p>
              </div>
            ))}

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <p className="font-bold text-slate-900 mb-3">Andre fond verdt å sjekke</p>
              <ul className="space-y-2 text-sm text-slate-600">
                {[
                  'Stiftelsen Dam (via NIF – helse- og aktivitetsprosjekter)',
                  'Lokale næringsfond (f.eks. Ishavskraft, Caverion-fondet)',
                  'Solidaritetsfond via idrettskretsen',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Frist-tabell */}
        <section className="mb-16" aria-labelledby="frister-heading">
          <h2
            id="frister-heading"
            className="text-2xl font-bold text-slate-900 mb-6"
          >
            Oversikt over viktige frister 2026
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <caption className="sr-only">Oversikt over tilskuddsordninger og frister 2026</caption>
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th scope="col" className="text-left px-5 py-3 font-semibold text-slate-700">Ordning</th>
                  <th scope="col" className="text-left px-5 py-3 font-semibold text-slate-700 hidden sm:table-cell">Typisk beløp</th>
                  <th scope="col" className="text-left px-5 py-3 font-semibold text-slate-700">Frist</th>
                  <th scope="col" className="text-left px-5 py-3 font-semibold text-slate-700 hidden md:table-cell">Hvor søke</th>
                </tr>
              </thead>
              <tbody>
                {frister.map(({ ordning, belop, frist, haster, url, portal }) => (
                  <tr
                    key={ordning}
                    className={`border-b border-slate-100 last:border-0 ${haster ? 'bg-red-50' : 'hover:bg-slate-50'} transition-colors`}
                  >
                    <td className="px-5 py-4 font-medium text-slate-800">
                      {haster && (
                        <span className="inline-block mr-2 text-xs font-bold text-white bg-red-500 px-1.5 py-0.5 rounded">
                          HASTER
                        </span>
                      )}
                      {ordning}
                    </td>
                    <td className="px-5 py-4 text-slate-600 hidden sm:table-cell">{belop}</td>
                    <td className={`px-5 py-4 font-medium ${haster ? 'text-red-700' : 'text-slate-700'}`}>
                      {frist}
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-green-600 hover:text-green-800 hover:underline"
                        >
                          {portal}
                          <ExternalLink className="w-3 h-3" aria-hidden="true" />
                          <span className="sr-only"> (åpner i ny fane)</span>
                        </a>
                      ) : (
                        <span className="text-slate-600">{portal}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Vanlige feil */}
        <section className="mb-16" aria-labelledby="feil-heading">
          <h2
            id="feil-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">!</span>
            Vanlige feil vi ser hos lag i nord – og hvordan unngå dem
          </h2>

          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-8 space-y-4">
            {[
              {
                feil: 'Glemmer fristen for spillemidler til utstyr (4. februar!)',
                fix: 'Sett alarmen i dag. Fristen er absolutt og gjelder alle lag – ingen unntak.',
              },
              {
                feil: 'Mangler fakturaer/kvitteringer eller god regnskapsdokumentasjon',
                fix: 'Arkiver alle bilag løpende. Uten dokumentasjon = avslag.',
              },
              {
                feil: 'Søker for sent på regionale midler',
                fix: 'Følg idrettsrådet og kommunen – de kunngjør lokale frister separat.',
              },
              {
                feil: 'Ikke registrert i Frivillighetsregisteret',
                fix: 'Sjekk på brreg.no i dag. Mange ordninger krever dette som minimumskrav.',
              },
              {
                feil: 'Glemmer å rapportere etterpå',
                fix: 'Sluttrapport er påkrevd for de fleste ordninger – mangler den, kan de kreve pengene tilbake.',
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

          <div className="mt-5 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
            <strong>Klar til å søke?</strong> Sett opp en enkel kalender for 2026-fristene i dag.
            Da går dere ikke glipp av noe!
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 md:p-10 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Vil dere ha hjelp med å finne rett ordning og fylle ut søknader?
          </h2>
          <p className="text-green-100 mb-2 max-w-2xl mx-auto">
            Vi i Averdi i Finnmark og Nord-Troms kjenner alle regionale bonuser og hjelper med
            hele prosessen – fra kartlegging til innlevert søknad og riktig bokføring. Null stress,
            maks penger inn.
          </p>
          <p className="text-green-200 text-sm mb-8 max-w-xl mx-auto">
            Første kartlegging av mulighetene deres er gratis for nye lag.
          </p>
          <Link
            href="/kontakt?subject=Støtteordninger+kartlegging"
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
              <p>Basert på Lotteri- og stiftelsestilsynets tilskuddsportaler, Idrettsforbundets SportsAdmin, Sametingets tilskuddsutlysninger og Statsbudsjettet 2026.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href="https://lottstift.no" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                lottstift.no <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <a href="https://www.sametinget.no/tilskudd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                sametinget.no <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <a href="https://www.idrettsforbundet.no" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                idrettsforbundet.no <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </article>
    </main>
  );
}
