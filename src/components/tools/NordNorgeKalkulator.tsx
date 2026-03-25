'use client';

import { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { cn } from '@/lib/utils';
import { Info, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// ── Municipality data ──────────────────────────────────────────────────────────
interface Municipality {
  name: string;
  sone: '1' | '4a' | '5';
  avgRent: number;
}

const MUNICIPALITIES: Municipality[] = ([
  // Sone 1
  { name: 'Oslo',         sone: '1',  avgRent: 17500 },
  { name: 'Bergen',       sone: '1',  avgRent: 14200 },
  { name: 'Trondheim',    sone: '1',  avgRent: 13800 },
  { name: 'Stavanger',    sone: '1',  avgRent: 14500 },
  { name: 'Kristiansand', sone: '1',  avgRent: 12500 },
  { name: 'Drammen',      sone: '1',  avgRent: 13000 },
  { name: 'Fredrikstad',  sone: '1',  avgRent: 12200 },
  { name: 'Sandnes',      sone: '1',  avgRent: 13800 },
  { name: 'Tromsø',       sone: '1',  avgRent: 13200 },
  { name: 'Bodø',         sone: '1',  avgRent: 12800 },
  { name: 'Ålesund',      sone: '1',  avgRent: 12000 },
  { name: 'Harstad',      sone: '1',  avgRent: 11500 },
  { name: 'Narvik',       sone: '1',  avgRent: 10800 },
  { name: 'Mo i Rana',    sone: '1',  avgRent: 10500 },
  { name: 'Finnsnes',     sone: '1',  avgRent:  9900 },
  // Sone 4a
  { name: 'Lenvik',       sone: '4a', avgRent:  9600 },
  { name: 'Senja',        sone: '4a', avgRent:  9400 },
  { name: 'Bardu',        sone: '4a', avgRent:  9000 },
  { name: 'Salangen',     sone: '4a', avgRent:  8800 },
  { name: 'Lavangen',     sone: '4a', avgRent:  8500 },
  { name: 'Gratangen',    sone: '4a', avgRent:  8400 },
  { name: 'Ibestad',      sone: '4a', avgRent:  8300 },
  { name: 'Dyrøy',        sone: '4a', avgRent:  8200 },
  // Sone 5 – Tiltakssonen
  { name: 'Alta',         sone: '5',  avgRent: 11200 },
  { name: 'Hammerfest',   sone: '5',  avgRent: 11000 },
  { name: 'Vadsø',        sone: '5',  avgRent: 10200 },
  { name: 'Vardø',        sone: '5',  avgRent:  9500 },
  { name: 'Karasjok',     sone: '5',  avgRent:  9000 },
  { name: 'Kautokeino',   sone: '5',  avgRent:  8800 },
  { name: 'Porsanger',    sone: '5',  avgRent:  9200 },
  { name: 'Lebesby',      sone: '5',  avgRent:  8600 },
  { name: 'Gamvik',       sone: '5',  avgRent:  8400 },
  { name: 'Berlevåg',     sone: '5',  avgRent:  8300 },
  { name: 'Tana',         sone: '5',  avgRent:  8700 },
  { name: 'Nesseby',      sone: '5',  avgRent:  8500 },
  { name: 'Båtsfjord',    sone: '5',  avgRent:  8900 },
  { name: 'Sør-Varanger', sone: '5',  avgRent: 10500 },
  { name: 'Nordkapp',     sone: '5',  avgRent:  9100 },
  { name: 'Kvænangen',    sone: '5',  avgRent:  8300 },
  { name: 'Nordreisa',    sone: '5',  avgRent:  9000 },
  { name: 'Skjervøy',     sone: '5',  avgRent:  8700 },
  { name: 'Kåfjord',      sone: '5',  avgRent:  8500 },
  { name: 'Storfjord',    sone: '5',  avgRent:  8400 },
  { name: 'Lyngen',       sone: '5',  avgRent:  8600 },
] as Municipality[]).sort((a, b) => a.name.localeCompare(b.name, 'nb'));

const AGA_RATES: Record<string, number> = { '1': 0.141, '4a': 0.079, '5': 0.000 };
const ZONE_LABELS: Record<string, string> = {
  '1':  'Sone 1 (14,1 %)',
  '4a': 'Sone 4a (7,9 %)',
  '5':  'Sone 5 – Tiltakssonen (0 %)',
};

// ── Helpers ────────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK', maximumFractionDigits: 0 }).format(n);

const fmtCompact = (n: number) =>
  new Intl.NumberFormat('nb-NO', { notation: 'compact', maximumFractionDigits: 1 }).format(n) + ' kr';

// ── Component ──────────────────────────────────────────────────────────────────
export function NordNorgeKalkulator() {
  const [currentMun, setCurrentMun] = useState<Municipality>(
    MUNICIPALITIES.find(m => m.name === 'Oslo')!
  );
  const [targetMun, setTargetMun] = useState<Municipality>(
    MUNICIPALITIES.find(m => m.name === 'Alta')!
  );
  const [salary, setSalary]         = useState(700000);
  const [employees, setEmployees]   = useState(5);
  const [numChildren, setNumChildren] = useState(2);
  const [showSources, setShowSources] = useState(false);

  // ── Core calculation ──
  const calc = useMemo(() => {
    const vacationPay = salary * 0.12;
    const pensionBase = salary + vacationPay;
    const pension     = pensionBase * 0.02;
    const agaBase     = salary + vacationPay + pension;

    const agaCostCurrent = agaBase * AGA_RATES[currentMun.sone];
    const agaCostTarget  = agaBase * AGA_RATES[targetMun.sone];

    const totalCostCurrent = agaBase + agaCostCurrent;
    const totalCostTarget  = agaBase + agaCostTarget;
    const perEmpAGASavings = totalCostCurrent - totalCostTarget;

    const rentSavingsPerEmp = (currentMun.avgRent - targetMun.avgRent) * 12;

    const isZone5 = targetMun.sone === '5';
    const barnehageSavingsPerEmp  = isZone5 ? 1200 * 12 * numChildren : 0;
    const finnmarkCashPerEmp      = isZone5 ? 9900  : 0;
    const studentLoanPerEmp       = isZone5 ? 60000 : 0;
    const lowerTaxSavingsPerEmp   = isZone5 ? Math.round(salary * 0.035) : 0;
    const ekstraBarnetrygdPerEmp  = isZone5 ? 500 * 12 * numChildren : 0;

    const employeeBenefitsPerEmp =
      rentSavingsPerEmp + barnehageSavingsPerEmp + finnmarkCashPerEmp +
      studentLoanPerEmp + lowerTaxSavingsPerEmp + ekstraBarnetrygdPerEmp;

    const totalPerEmp   = perEmpAGASavings + employeeBenefitsPerEmp;
    const totalSavings  = totalPerEmp * employees;

    return {
      agaBase, agaCostCurrent, agaCostTarget, perEmpAGASavings,
      totalCostCurrent, totalCostTarget,
      rentSavingsPerEmp, barnehageSavingsPerEmp, finnmarkCashPerEmp,
      studentLoanPerEmp, lowerTaxSavingsPerEmp, ekstraBarnetrygdPerEmp,
      employeeBenefitsPerEmp, totalPerEmp, totalSavings, isZone5,
    };
  }, [currentMun, targetMun, salary, employees, numChildren]);

  // ── Chart data ──
  // Show AGA cost only (the variable employer cost that differs between zones)
  const costChartData = {
    labels: [currentMun.name, targetMun.name],
    datasets: [{
      label: 'Arbeidsgiveravgift per ansatt (NOK)',
      data: [calc.agaCostCurrent, calc.agaCostTarget],
      backgroundColor: ['#94a3b8', '#E86C1F'],
      borderRadius: 8,
      borderSkipped: false as const,
    }],
  };

  const valueSlices = [
    { label: 'Finnmarksfradrag 2026',         value: calc.finnmarkCashPerEmp,     color: '#F59E0B' },
    { label: 'Studielånsnedskrivning',         value: calc.studentLoanPerEmp,      color: '#14B8A6' },
    { label: 'Lavere skatt (3,5 pp)',          value: calc.lowerTaxSavingsPerEmp,  color: '#10B981' },
    { label: 'Husleiesparing',                 value: calc.rentSavingsPerEmp,      color: '#8B5CF6' },
    { label: 'Gratis barnehage',               value: calc.barnehageSavingsPerEmp, color: '#EC4899' },
    { label: 'Ekstra barnetrygd (500 kr/mnd)', value: calc.ekstraBarnetrygdPerEmp, color: '#3B82F6' },
  ].filter(s => s.value > 0);

  const hasValueSlices = valueSlices.length > 0;

  const valueChartData = {
    labels: hasValueSlices ? valueSlices.map(s => s.label) : ['Ingen fordeler i valgt sone'],
    datasets: [{
      label: 'Verdi per ansatt (NOK)',
      data:  hasValueSlices ? valueSlices.map(s => s.value) : [1],
      backgroundColor: hasValueSlices ? valueSlices.map(s => s.color) : ['#e2e8f0'],
      hoverOffset: 8,
    }],
  };

  // ── Breakdown rows ──
  const breakdownRows: [string, string, string, string][] = [
    ['AGA-sats',                    ZONE_LABELS[currentMun.sone], ZONE_LABELS[targetMun.sone], fmt(calc.perEmpAGASavings)],
    ['Husleie (12 mnd)',            fmt(currentMun.avgRent * 12), fmt(targetMun.avgRent * 12), fmt(calc.rentSavingsPerEmp)],
    ['Barnehage',                   '–', calc.barnehageSavingsPerEmp > 0 ? 'Gratis' : '–', fmt(calc.barnehageSavingsPerEmp)],
    ['Finnmarksfradrag',            '–', calc.finnmarkCashPerEmp > 0 ? 'Ja' : '–', fmt(calc.finnmarkCashPerEmp)],
    ['Studielånsnedskrivning',      '–', calc.studentLoanPerEmp > 0 ? '60 000 kr' : '–', fmt(calc.studentLoanPerEmp)],
    ['Lavere skatt (3,5 pp)',       '–', calc.lowerTaxSavingsPerEmp > 0 ? 'Ja' : '–', fmt(calc.lowerTaxSavingsPerEmp)],
    ['Ekstra barnetrygd (500/mnd)', '–', calc.ekstraBarnetrygdPerEmp > 0 ? '500 kr/mnd per barn' : '–', fmt(calc.ekstraBarnetrygdPerEmp)],
  ];

  return (
    <div className="space-y-6 font-sans">

      {/* ── INPUTS ── */}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Fra */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            📍 Fra kommune
          </h2>
          <div>
            <label htmlFor="nord-calc-current-mun" className="block text-sm font-semibold text-slate-700 mb-1">Nåværende kommune</label>
            <select
              id="nord-calc-current-mun"
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent transition-all"
              value={currentMun.name}
              onChange={e => setCurrentMun(MUNICIPALITIES.find(m => m.name === e.target.value)!)}
            >
              {MUNICIPALITIES.map(m => (
                <option key={m.name} value={m.name}>{m.name} – {ZONE_LABELS[m.sone]}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="nord-calc-salary" className="block text-sm font-semibold text-slate-700 mb-1">Årslønn per ansatt (kr)</label>
            <input
              id="nord-calc-salary"
              type="number"
              value={salary}
              min={200000} max={3000000} step={10000}
              onChange={e => setSalary(Number(e.target.value))}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="nord-calc-employees" className="block text-sm font-semibold text-slate-700 mb-1">Antall ansatte</label>
            <input
              id="nord-calc-employees"
              type="number"
              value={employees}
              min={1} max={500} step={1}
              onChange={e => setEmployees(Number(e.target.value))}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Til */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            🎯 Til kommune
          </h2>
          <div>
            <label htmlFor="nord-calc-target-mun" className="block text-sm font-semibold text-slate-700 mb-1">Målkommune</label>
            <select
              id="nord-calc-target-mun"
              className="w-full px-3 py-2.5 border border-[#E86C1F]/40 rounded-xl bg-orange-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent transition-all font-semibold"
              value={targetMun.name}
              onChange={e => setTargetMun(MUNICIPALITIES.find(m => m.name === e.target.value)!)}
            >
              {MUNICIPALITIES.map(m => (
                <option key={m.name} value={m.name}>{m.name} – {ZONE_LABELS[m.sone]}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="nord-calc-children" className="block text-sm font-semibold text-slate-700 mb-1">Antall barn per ansatt (barnehage)</label>
            <input
              id="nord-calc-children"
              type="number"
              value={numChildren}
              min={0} max={10} step={1}
              onChange={e => setNumChildren(Number(e.target.value))}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E86C1F] focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* ── RESULT BANNER ── */}
      <div className="bg-gradient-to-r from-[#E86C1F] to-[#F4B223] rounded-2xl p-8 text-center text-white shadow-lg">
        <p className="text-sm opacity-85 mb-1">Estimert total besparelse per år</p>
        <p className="text-5xl font-extrabold tracking-tight">{fmt(calc.totalSavings)}</p>
        <p className="text-sm opacity-75 mt-1">Arbeidsgiver + ansattfordeler kombinert</p>
      </div>

      {/* ── INSIGHT ── */}
      <div className="bg-orange-50 border-l-4 border-[#E86C1F] rounded-r-xl p-4 text-sm text-orange-900 leading-relaxed">
        <span className="font-bold">{currentMun.name}</span>{' '}
        <span className="inline-block px-2 py-0.5 rounded-full bg-orange-100 border border-orange-200 text-xs font-bold text-[#E86C1F]">
          {ZONE_LABELS[currentMun.sone]}
        </span>
        {' → '}
        <span className="font-bold">{targetMun.name}</span>{' '}
        <span className="inline-block px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-xs font-bold text-teal-700">
          {ZONE_LABELS[targetMun.sone]}
        </span>
        <br /><br />
        AGA-besparelse per ansatt: <strong>{fmt(calc.perEmpAGASavings)}</strong> /år.{' '}
        Ansattfordeler per ansatt: <strong>{fmt(calc.employeeBenefitsPerEmp)}</strong> /år.
        {calc.isZone5 && (
          <>
            <br />
            I 2026 gir Tiltakssonen <strong>18,5 %</strong> skatt på alminnelig inntekt (mot 22 % ellers).
            {' '}+ 45 000 kr Finnmarksfradrag + 60 000 kr studielånsnedskrivning + 500 kr/mnd ekstra barnetrygd per barn (fra okt 2025).
          </>
        )}
      </div>

      {/* ── CHARTS ── */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            📊 Arbeidsgiveravgift per ansatt
          </h2>
          <div className="h-64">
            <Bar
              aria-label="Stolpediagram som viser arbeidsgiveravgift per ansatt"
              data={costChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: { callbacks: { label: ctx => fmt(ctx.raw as number) } },
                },
                scales: {
                  y: { ticks: { callback: v => fmtCompact(v as number) } },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            💰 Fordeler per ansatt – målkommune
          </h2>
          <div className="h-64">
            <Doughnut
              aria-label="Kakediagram som viser fordeler per ansatt i målkommunen"
              data={valueChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom', labels: { font: { size: 11 } } },
                  tooltip: {
                    callbacks: {
                      label: ctx => hasValueSlices ? fmt(ctx.raw as number) : '',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* ── BREAKDOWN TABLE ── */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm overflow-x-auto">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">🔍 Detaljert oversikt</h2>
        <table className="w-full text-sm border-collapse" aria-label="Lønnskostnadsbesparelse per reisedestinasjon">
          <thead>
            <tr className="bg-slate-50">
              <th scope="col" className="text-left px-3 py-2 font-semibold text-slate-500 rounded-l-lg">Post</th>
              <th scope="col" className="text-left px-3 py-2 font-semibold text-slate-500">Fra-kommune</th>
              <th scope="col" className="text-left px-3 py-2 font-semibold text-slate-500">Til-kommune</th>
              <th scope="col" className="text-right px-3 py-2 font-semibold text-slate-500 rounded-r-lg">Besparelse</th>
            </tr>
          </thead>
          <tbody>
            {breakdownRows.map(([post, fra, til, spar], i) => (
              <tr key={i} className="border-b border-slate-50 last:border-0">
                <td className="px-3 py-2 text-slate-700">{post}</td>
                <td className="px-3 py-2 text-slate-500">{fra}</td>
                <td className="px-3 py-2 text-slate-500">{til}</td>
                <td className={cn('px-3 py-2 text-right font-semibold', spar && spar !== '' ? 'text-[#E86C1F]' : 'text-slate-400')}>
                  {spar}
                </td>
              </tr>
            ))}
            {/* Totals */}
            <tr className="border-t-2 border-slate-200 bg-slate-50">
              <td className="px-3 py-2 font-bold text-slate-900">Total per ansatt</td>
              <td /><td />
              <td className="px-3 py-2 text-right font-bold text-[#E86C1F]">{fmt(calc.totalPerEmp)}</td>
            </tr>
            <tr className="bg-orange-50">
              <td className="px-3 py-2 font-bold text-slate-900">Total {employees} ansatte</td>
              <td /><td />
              <td className="px-3 py-2 text-right font-bold text-[#E86C1F] text-base">{fmt(calc.totalSavings)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── DATA SOURCES ── */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden">
        <button
          onClick={() => setShowSources(s => !s)}
          className="w-full flex items-center justify-between px-5 py-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
          aria-expanded={showSources}
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Info className="w-4 h-4 text-[#E86C1F]" aria-hidden="true" />
            Datakilder og forutsetninger
          </span>
          {showSources
            ? <ChevronUp className="w-4 h-4 text-slate-400" aria-hidden="true" />
           : <ChevronDown className="w-4 h-4 text-slate-400" aria-hidden="true" />
          }
        </button>

        {showSources && (
          <div className="px-5 py-6 bg-white space-y-6 text-base text-slate-700 leading-relaxed">

            {/* AGA */}
            <div className="border-l-2 border-[#E86C1F] pl-4 space-y-2">
              <p className="font-bold text-slate-900">Arbeidsgiveravgift (AGA)</p>
              <p>
                Satsene er fastsatt i <strong>Stortingsvedtak om fastsetting av avgifter mv. til folketrygden</strong> og gjelder per 2026:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Sone 1 (resten av landet): <strong>14,1 %</strong></li>
                <li>Sone 4a (7 Nord-Troms-kommuner): <strong>7,9 %</strong></li>
                <li>Sone 5 – Tiltakssonen (Finnmark + 7 Nord-Troms): <strong>0 %</strong></li>
              </ul>
              <a
                href="https://www.skatteetaten.no/bedrift-og-organisasjon/arbeidsgiver/arbeidsgiveravgift/satser-for-arbeidsgiveravgift/"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#E86C1F] hover:underline font-medium"
              >
                Skatteetaten – AGA-satser <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>

            {/* Husleie */}
            <div className="border-l-2 border-purple-400 pl-4 space-y-2">
              <p className="font-bold text-slate-900">Husleie (gjennomsnittlig månedlig leie)</p>
              <p>
                Tallene er <strong>Averdi-estimater</strong> basert på annonsedata fra Finn.no og SSB Leiemarkedsundersøkelse (LMU) for 2024–2025.
                De representerer en typisk 2–3-roms leilighet i kommunesenteret.
                Faktisk leie varierer med boligtype, beliggenhet og standard.
              </p>
              <a
                href="https://www.ssb.no/priser-og-prisindekser/eiendomspriser/statistikk/leiemarkedsundersokelsen"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-purple-700 hover:underline font-medium"
              >
                SSB – Leiemarkedsundersøkelsen <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>

            {/* Feriepenger & pensjon */}
            <div className="border-l-2 border-teal-400 pl-4 space-y-2">
              <p className="font-bold text-slate-900">Feriepenger og pensjon (beregningsgrunnlag)</p>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Feriepenger: <strong>12 %</strong> av årslønn (Ferieloven § 10, minstesats)</li>
                <li>Pensjon: <strong>2 %</strong> av (lønn + feriepenger) – minstesats etter OTP-loven</li>
                <li>AGA beregnes av lønn + feriepenger + pensjon</li>
              </ul>
            </div>

            {/* Finnmarksfradrag */}
            <div className="border-l-2 border-yellow-500 pl-4 space-y-2">
              <p className="font-bold text-slate-900">Finnmarksfradrag 2026</p>
              <p>
                Forslag i Statsbudsjettet 2026: fradraget økes til <strong>45 000 kr</strong>.
                Kalkulatoren viser kontantverdien: 45 000 kr × 22 % skattesats = <strong>9 900 kr</strong> spart skatt per år.
              </p>
              <a
                href="https://www.skatteetaten.no/satser/finnmarksfradraget/"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-yellow-700 hover:underline font-medium"
              >
                Skatteetaten – Finnmarksfradraget <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>

            {/* Studielån */}
            <div className="border-l-2 border-teal-500 pl-4 space-y-2">
              <p className="font-bold text-slate-900">Studielånsnedskrivning 2026</p>
              <p>
                Forslag i Statsbudsjettet 2026: inntil <strong>60 000 kr</strong> per år slettes for personer bosatt og arbeidende i Tiltakssonen.
                Ordningen administreres av Lånekassen.
              </p>
              <a
                href="https://lanekassen.no/nb-NO/gjeld-og-betaling/finnmark-eller-nord-troms/"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-teal-700 hover:underline font-medium"
              >
                Lånekassen – Nedskriving i Finnmark/Nord-Troms <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>

            {/* Lavere skatt */}
            <div className="border-l-2 border-green-500 pl-4 space-y-2">
              <p className="font-bold text-slate-900">Lavere skatt på alminnelig inntekt (3,5 pp)</p>
              <p>
                I Tiltakssonen er skattesatsen på alminnelig inntekt <strong>18,5 %</strong> mot <strong>22 %</strong> ellers i landet.
                Kalkulatoren estimerer besparelsen som 3,5 % av bruttolønnen – en forenkling som ikke tar hensyn til fradrag.
              </p>
            </div>

            {/* Barnehage */}
            <div className="border-l-2 border-pink-400 pl-4 space-y-2">
              <p className="font-bold text-slate-900">Gratis barnehage</p>
              <p>
                Barn i Tiltakssonen har rett til <strong>gratis barnehageplass</strong> (0 kr foreldrebetaling).
                Kalkulatoren bruker maksimalpris for barnehage utenfor sonen: <strong>1 200 kr/mnd</strong> per barn (2025-sats, Kunnskapsdepartementet).
              </p>
              <a
                href="https://www.udir.no/regelverk-og-tilsyn/barnehage/foreldrebetaling/"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-pink-700 hover:underline font-medium"
              >
                Udir – Foreldrebetaling i barnehage <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>

            {/* Ekstra barnetrygd */}
            <div className="border-l-2 border-blue-400 pl-4 space-y-2">
              <p className="font-bold text-slate-900">Ekstra barnetrygd (500 kr/mnd per barn)</p>
              <p>
                Fra oktober 2025 får familier i Tiltakssonen <strong>500 kr ekstra per barn per måned</strong> i barnetrygd.
                Kalkulatoren multipliserer dette med 12 måneder og antall barn du oppgir.
              </p>
              <a
                href="https://www.nav.no/barnetrygd"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-700 hover:underline font-medium"
              >
                NAV – Barnetrygd <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>

            <p className="text-sm text-slate-500 pt-3 border-t border-slate-100 leading-relaxed">
              Kalkulatoren er veiledende og basert på forslag til Statsbudsjettet 2026. Tall kan avvike fra endelig vedtatt budsjett. Ikke juridisk eller skattemessig rådgivning.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
