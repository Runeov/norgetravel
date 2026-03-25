import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Download,
  Users,
  ClipboardList,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { ExpertInsight } from '@/components/modules/kunnskapsbank/ExpertInsight';
import { getExpert } from '@/data/experts';
import { AverdiBackground } from '@/components/modules/AverdiBackground';
import { FaqAccordion } from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'Årsregnskap og revisjonsplikt for lag 2026 | NIF-maler + guide | Averdi Finnmark',
  description:
    'Steg-for-steg + direkte lenker til NIFs gratis Excel-maler for årsregnskap. Kontrollkomité, når trenger du revisor? Guide for idrettslag i nord.',
};

const NIF_BASE = 'https://www.nif.no/contentassets/f82f01cf954f4d7496b3e52ca412b531';

export default function ArsregnskapPage() {
  const ingvald = getExpert('ingvald-laiti');

  const faqData = [
    {
      question: 'Trenger vi revisor for årsregnskapet?',
      answer: 'De fleste idrettslag trenger ikke revisor. Hvis driftskostnadene er under 7 millioner kr to år på rad, holder en kontrollkomité valgt på årsmøtet. Over 7 mill. er revisor lovpålagt. Grensen ble hevet i 2026.',
    },
    {
      question: 'Hva er fristen for å sende årsregnskap til Brønnøysund?',
      answer: 'For de fleste idrettslag er det ingen frist for innsending til Brønnøysundregistrene – vedtak på årsmøtet er det eneste som er påkrevd. Fristen som gjelder internt er at regnskapet sendes til kontrollkomitéen senest 3 uker før møtet.',
    },
    {
      question: 'Kan vi bruke Excel til årsregnskapet?',
      answer: 'Ja! NIF tilbyr gratis Excel-maler som er godkjent for bruk i idrettslag. Last ned malen for funksjonsinndelt årsregnskap og bankavstemmingsmalen fra seksjon 4 på denne siden – de er allerede satt opp riktig.',
    },
    {
      question: 'Hva gjør kontrollkomitéen, og hvem velger dem?',
      answer: 'Kontrollkomitéen er en intern kontroll bestående av 2–3 personer valgt av lagets eget årsmøte. De gjennomgår bilag og regnskap, og leverer en skriftlig beretning med innstilling om godkjenning til neste årsmøte.',
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
          { '@type': 'ListItem', position: 3, name: 'Årsregnskap 2026', item: 'https://www.averdi.no/kunnskapsbank/organisasjoner/arsregnskap' },
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
            Årsregnskap og revisjonsplikt –{' '}
            <span className="text-green-600">komplett guide for lag i nord 2026</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Hvert år skal idrettslaget levere årsregnskap til årsmøtet. De fleste små og
            mellomstore lag gjør dette selv med NIFs gratis Excel-maler. Her får du alt du
            trenger – fra krav og regler til ferdige maler og steg-for-steg-guide.
          </p>
        </div>

        {/* Seksjon 1 – Hva er årsregnskap */}
        <section className="mb-12" aria-labelledby="hva-heading">
          <h2
            id="hva-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              1
            </span>
            Hva er årsregnskap for et idrettslag?
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-4 text-slate-700">
            <p>
              Et årsregnskap for idrettslag består av to hoveddeler:
            </p>
            <ul className="space-y-3">
              {[
                {
                  tittel: 'Resultatregnskap',
                  tekst: 'Viser alle inntekter og kostnader gjennom året – hva kom inn, hva gikk ut.',
                },
                {
                  tittel: 'Balanse',
                  tekst: 'Viser lagets eiendeler (bank, utstyr) og gjeld per 31. desember.',
                },
                {
                  tittel: 'Årsberetning',
                  tekst: 'En kort tekst om hva laget har gjort i året – aktiviteter, medlemmer, viktige hendelser.',
                },
                {
                  tittel: 'Kontrollkomitéberetning',
                  tekst: 'Kontrollkomitéens skriftlige vurdering av at regnskapet er i orden.',
                },
              ].map(({ tittel, tekst }) => (
                <li key={tittel} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 text-green-600 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    <strong>{tittel}:</strong> {tekst}
                  </span>
                </li>
              ))}
            </ul>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
              <strong>For lag i Tiltakssonen:</strong> Dere slipper mange av kravene som gjelder
              store selskaper. Et godt ført regnskap i Excel holder for de fleste – se malene i
              seksjon 4.
            </div>
          </div>
        </section>

        {/* Seksjon 2 – Revisjonsplikt */}
        <section className="mb-12" aria-labelledby="revisjon-heading">
          <h2
            id="revisjon-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              2
            </span>
            Revisjonsplikt – trenger dere revisor?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Kontrollkomité */}
            <div className="bg-white rounded-2xl border-2 border-green-200 shadow-sm p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center text-green-700">
                  <Users className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Kontrollkomité holder</p>
                  <p className="text-xs text-green-600 font-medium">Under 7 mill. kr i driftskostnader</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                  Kontrollkomitéen velges av årsmøtet
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                  Gjennomgår regnskap og bilag
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                  Skriver beretning til årsmøtet
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                  Kostnad: 0 kr (frivillig innsats)
                </li>
              </ul>
              <p className="text-xs text-slate-500 italic mt-4">
                Gjelder: de aller fleste små og mellomstore lag
              </p>
            </div>

            {/* Revisor */}
            <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-7">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Lovpålagt revisor</p>
                  <p className="text-xs text-slate-500 font-medium">Over 7 mill. kr i driftskostnader (to år på rad)</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                  Statsautorisert eller registrert revisor
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                  Full revisjon etter regnskapsloven
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                  Revisjonsberetning legges frem for årsmøtet
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                  Kostnad: 30 000–80 000 kr/år
                </li>
              </ul>
              <p className="text-xs text-slate-500 italic mt-4">
                Gjelder: større klubber med høy omsetning
              </p>
            </div>
          </div>

          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
            <strong>2026-nyhet:</strong> Grensen for revisjonsplikt er hevet til <strong>7 millioner kr</strong> i
            driftskostnader (to år på rad). Mange lag som tidligere trengte revisor slipper det nå!
          </div>
        </section>

        {/* Seksjon 3 – Kontrollkomité i praksis */}
        <section className="mb-12" aria-labelledby="kontroll-heading">
          <h2
            id="kontroll-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              3
            </span>
            Kontrollkomitéen – hva gjør den i praksis?
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <p className="text-slate-600 mb-6">
              Kontrollkomitéen er ikke revisor, men en intern kontroll valgt av lagets egne
              medlemmer. Typisk 2–3 personer som sjekker at pengene er brukt riktig.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  tittel: 'Hva de sjekker',
                  punkter: [
                    'At inntekter og kostnader er riktig ført',
                    'At bilag finnes for alle utlegg',
                    'At bankkontoer stemmer med regnskapet',
                    'At det ikke er uregelmessigheter',
                  ],
                },
                {
                  tittel: 'Hva de leverer',
                  punkter: [
                    'Skriftlig kontrollkomitéberetning',
                    'Innstilling til årsmøtet (godkjenn/godkjenn ikke)',
                    'Eventuelle merknader til styret',
                    'Leveres senest 1 uke før årsmøtet',
                  ],
                },
              ].map(({ tittel, punkter }) => (
                <div key={tittel}>
                  <p className="font-semibold text-slate-800 mb-3">{tittel}</p>
                  <ul className="space-y-2">
                    {punkter.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                        <ClipboardList className="w-4 h-4 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expert Insight */}
        {ingvald && (
          <ExpertInsight
            title="Årsregnskapet er nøkkelen til neste års tilskudd"
            quote="Uten et godkjent årsregnskap kan laget ikke søke spillemidler, og mange banker krever det for å fornye kontoer. Det er ikke papirarbeid – det er lagets viktigste strategiske dokument."
            expert={ingvald}
          >
            <p>
              Vi tar over det løpende regnskapet, sørger for at alt er avstemt mot bank og Vipps,
              og leverer et ferdig årsregnskap klart til kontrollkomitéen og årsmøtet – uten
              stress for kasserer.
            </p>
          </ExpertInsight>
        )}

        {/* Seksjon 4 – NIF-maler */}
        <section className="mb-12 mt-12" aria-labelledby="maler-heading">
          <h2
            id="maler-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              4
            </span>
            NIF-maler – last ned og bruk gratis
          </h2>

          <div className="space-y-4">
            <a
              href={`${NIF_BASE}/arsregnskap-il-funksjonsinndelt---mal.xlsx`}
              download
              className="flex items-start gap-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-green-300 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0 text-green-600 group-hover:bg-green-200 transition-colors">
                <Download className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="flex-grow min-w-0">
                <p className="font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                  Årsregnskap med aktivitetsinndeling (funksjonsinndelt)
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Bruk denne hvis dere vil vise regnskap per gruppe, f.eks. fotball, ski, håndball.
                </p>
                <span className="inline-block mt-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                  Excel-mal · Godkjent av NIF
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-green-500 transition-colors shrink-0 mt-1" aria-hidden="true" />
            </a>

            <a
              href={`${NIF_BASE}/mal-bankavstemming-589799.xlsx`}
              download
              className="flex items-start gap-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-green-300 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0 text-green-600 group-hover:bg-green-200 transition-colors">
                <Download className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="flex-grow min-w-0">
                <p className="font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                  Bankavstemming
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  Enkel mal for å stemme av bank og Vipps – nødvendig før du kan avslutte regnskapet.
                </p>
                <span className="inline-block mt-2 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
                  Excel-mal · Godkjent av NIF
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-green-500 transition-colors shrink-0 mt-1" aria-hidden="true" />
            </a>
          </div>

          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
            <strong>Tips fra Averdi:</strong> Last ned malene, fyll inn tallene fra
            regnskapssystemet deres – ferdig på 1–2 kvelder. Malene er allerede godkjent av NIF
            og passer perfekt til årsmøteprotokollen.
          </div>
        </section>

        {/* Seksjon 5 – Steg for steg */}
        <section className="mb-12" aria-labelledby="steg-heading">
          <h2
            id="steg-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              5
            </span>
            Slik lager dere årsregnskapet – steg for steg
            <span className="text-base font-normal text-slate-500">(2026)</span>
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <ol className="space-y-5">
              {[
                'Avslutt regnskapet 31. desember (avstem bank, Vipps, Spond osv.)',
                'Bruk NIF-malene over – eller regnskapssystem som Fiken/Uni Micro.',
                'Lag resultatregnskap + balanse.',
                'Skriv kort årsberetning (hva har dere brukt pengene på?).',
                'Kontrollkomitéen går gjennom og skriver beretning.',
                'Send til årsmøtet – senest 1 uke før møtet etter NIF-regler.',
                'Vedta på årsmøte – protokollér det!',
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
              <strong>Frist for innsending til Brønnøysund?</strong> Ingen for de fleste små lag –
              kun vedtak på årsmøte er påkrevd.
            </div>
          </div>
        </section>

        {/* Seksjon 6 – Eksempler */}
        <section className="mb-12" aria-labelledby="eksempler-heading">
          <h2
            id="eksempler-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              6
            </span>
            Eksempler for lag i nord
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                label: 'Lite ski-lag',
                omsetning: '1,2 mill. kr omsetning',
                detaljer: 'Forenklet Excel-regnskap + kontrollkomité. Tar 4–6 timer totalt.',
                kostnad: '0 kr',
                kostnadsNotat: 'frivillig innsats',
                farge: 'border-green-200 bg-green-50',
                tekstFarge: 'text-green-700',
              },
              {
                label: 'Mellomstort fotball-lag',
                omsetning: '4,5 mill. kr omsetning',
                detaljer: 'Fullt årsregnskap i regnskapssystem. Kontrollkomité + eventuelt regnskapsfører.',
                kostnad: '5 000–15 000 kr',
                kostnadsNotat: 'hvis dere kjøper hjelp',
                farge: 'border-green-300 bg-green-100',
                tekstFarge: 'text-green-800',
              },
              {
                label: 'Større klubb',
                omsetning: 'Over 7 mill. kr',
                detaljer: 'Lovpålagt revisor + full regnskap etter regnskapsloven.',
                kostnad: '30 000–80 000 kr',
                kostnadsNotat: 'revisor + regnskapsfører',
                farge: 'border-slate-200 bg-slate-50',
                tekstFarge: 'text-slate-700',
              },
            ].map(({ label, omsetning, detaljer, kostnad, kostnadsNotat, farge, tekstFarge }) => (
              <div key={label} className={`rounded-2xl border-2 ${farge} p-6`}>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {label}
                </p>
                <p className="text-sm font-semibold text-slate-700 mb-2">{omsetning}</p>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">{detaljer}</p>
                <p className={`text-xl font-bold ${tekstFarge}`}>{kostnad}</p>
                <p className="text-xs text-slate-500">{kostnadsNotat}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Seksjon 7 – Vanlige feil */}
        <section className="mb-16" aria-labelledby="feil-heading">
          <h2
            id="feil-heading"
            className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3"
          >
            <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold shrink-0">
              7
            </span>
            Vanlige feil vi ser hos lag i nord – og hvordan unngå dem
          </h2>

          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm p-8 space-y-4">
            {[
              {
                feil: 'Blandet privat- og lagpenger i kontoen',
                fix: 'Opprett en dedikert foreningskonto fra dag én – aldri bland.',
              },
              {
                feil: 'Glemt å føre alle Vipps- og kontantinntekter',
                fix: 'Sett rutine: alt bokføres samme dag som pengene kommer inn.',
              },
              {
                feil: 'Ingen avstemming mot bank før årsmøte',
                fix: 'Bruk bankavstemmingsmalen (se seksjon 4) etter hvert månedsskifte.',
              },
              {
                feil: 'Kontrollkomitéen får regnskapet for sent',
                fix: 'Send regnskap til komitéen senest 3 uker før årsmøtet.',
              },
              {
                feil: 'Glemmer å vedta regnskapet på årsmøtet',
                fix: 'Uten vedtak er regnskapet ugyldig – sett det alltid på sakslisten.',
              },
            ].map(({ feil, fix }) => (
              <div key={feil} className="flex items-start gap-3">
                <AlertTriangle
                  className="w-5 h-5 text-amber-500 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-slate-800">{feil}</p>
                  <p className="text-slate-600 text-sm mt-0.5">{fix}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
            <strong>Klar til årsmøte?</strong> Start i januar/februar – da er det rolig. Da blir
            alt klart til mars/april-møtene.
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 md:p-10 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Vil dere ha hjelp med hele årsregnskapet?
          </h2>
          <p className="text-green-100 mb-2 max-w-2xl mx-auto">
            Vi i Averdi i Finnmark og Nord-Troms tar over regnskapet, fyller inn NIF-malene,
            kontrollerer med kontrollkomitéen og sørger for at alt er godkjent. Null stress,
            alt riktig – og vi kjenner Tiltakssonen-reglene bedre enn noen andre.
          </p>
          <p className="text-green-200 text-sm mb-8 max-w-xl mx-auto">
            Første gjennomgang er gratis for nye lag.
          </p>
          <Link
            href="/kontakt?subject=Hjelp+med+årsregnskap"
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
              <p>Basert på NIFs Lovnorm og Klubbguide for årsregnskap i idrettslag, regnskapslovens bestemmelser for frivillige organisasjoner samt NIFs godkjente Excel-maler.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href="https://www.idrettsforbundet.no/klubbguiden" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                idrettsforbundet.no <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <a href="https://www.brreg.no" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                brreg.no <span className="sr-only">(åpnes i ny fane)</span><ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

      </article>
    </main>
  );
}
