'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Calculator, TrendingUp, Users, Wallet, 
  AlertCircle, Home, MapPin, Zap, GraduationCap, Building2, CheckCircle2 
} from 'lucide-react';
import Link from 'next/link';
import { McpDataSpan } from '@/components/ui/McpDataSpan';
import { satser2025 } from '@/data/agaData';
import { getPropertyTaxRate } from '@/data/propertyTaxData';
import { DESTINATION_MUNICIPALITIES, ORIGIN_CITIES, getAgaRate } from '@/data/calculatorData';

// Satser for 2026 (Prop. 1 S)
const CONSTANTS = {
  studielanSone5: 60000,
  finnmarkFradrag: 45000,
  skattSone1: 0.22,
  skattSone5: 0.185,
  marginalSkatt: 0.45,
  elAvgift: 0.095, 
};

export function InnsatssoneCalculator() {
  const [step, setStep] = useState(1);
  
  // -- INPUTS --
  const [origin, setOrigin] = useState(ORIGIN_CITIES[0]); // Oslo default
  const [dest, setDest] = useState(DESTINATION_MUNICIPALITIES[0]); // Alta default
  const [propertyValue, setPropertyValue] = useState(10000000); // 10 mill næringsbygg
  
  const [employees, setEmployees] = useState(10);
  const [avgSalary, setAvgSalary] = useState(650000);
  const [executives, setExecutives] = useState(1);
  const [execSalary, setExecSalary] = useState(1200000);
  
  const [includePersonal, setIncludePersonal] = useState(true);

  // -- CALCULATIONS --
  const results = useMemo(() => {
    // 1. AGA (Bedrift)
    const originRate = getAgaRate(origin.zone);
    const destRate = getAgaRate(dest.zone);
    const totalPayroll = (employees * avgSalary) + (executives * execSalary);
    const agaSaving = totalPayroll * (originRate - destRate);

    // 2. Eiendomsskatt NÆRING (Bedrift)
    const pTaxRateOrigin = getPropertyTaxRate(origin.name);
    const pTaxRateDest = getPropertyTaxRate(dest.name);
    
    const pTaxCostOrigin = propertyValue * (pTaxRateOrigin / 1000);
    const pTaxCostDest = propertyValue * (pTaxRateDest / 1000);
    const pTaxDiff = pTaxCostOrigin - pTaxCostDest; // Positivt = Spart, Negativt = Økt kostnad

    // 3. Personlig verdi (Ansatte) - Kun i Sone 5
    let personalValueTotal = 0;
    let grossEquivalentPerEmp = 0;

    if (includePersonal && dest.zone === "5") {
      const loanBenefit = CONSTANTS.studielanSone5;
      const deductionBenefit = CONSTANTS.finnmarkFradrag * CONSTANTS.skattSone5;
      // Trinnskatt + Lavere sats: Enkelt estimat ca 15.000 diff på en snittlønn
      const taxDiffEstim = 15000; 
      const elBenefit = 5000; // Konservativt

      const netBenefitPerPerson = loanBenefit + deductionBenefit + taxDiffEstim + elBenefit;
      
      // Hva måtte en Oslo-bedrift betalt brutto for å matche denne netto-fordelen?
      grossEquivalentPerEmp = netBenefitPerPerson / (1 - CONSTANTS.marginalSkatt);
      personalValueTotal = grossEquivalentPerEmp * (employees + executives);
    }

    return {
      agaSaving,
      pTaxDiff,
      pTaxRateOrigin,
      pTaxRateDest,
      grossEquivalentPerEmp,
      personalValueTotal,
      totalImpact: agaSaving + pTaxDiff + personalValueTotal,
      isZone5: dest.zone === "5"
    };
  }, [origin, dest, propertyValue, employees, avgSalary, executives, execSalary, includePersonal]);

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-5xl mx-auto my-16 font-sans">
      
      {/* Header */}
      <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Calculator className="w-6 h-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-bold text-lg">InnsatssoneKalkulator (Næring)</h3>
            <p className="text-xs text-slate-400">Data fra SSB & Statsbudsjettet 2026</p>
          </div>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${step >= i ? 'bg-blue-500' : 'bg-slate-700'}`} />
          ))}
        </div>
      </div>

      <div className="p-6 md:p-10 min-h-[500px]">
        <AnimatePresence mode='wait'>
          
          {/* --- STEG 1: BEDRIFTSDATA --- */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* LOKASJON */}
                <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2"><MapPin className="w-4 h-4" aria-hidden="true" /> Flytting / Etablering</h4>
                  
                  <div>
                    <label htmlFor="calc-location" className="text-xs font-bold text-slate-500 uppercase">Fra (Referanse)</label>
                    <select
                      id="calc-location"
                      className="w-full mt-1 p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                      value={origin.name}
                      onChange={(e) => setOrigin(ORIGIN_CITIES.find(c => c.name === e.target.value) || origin)}
                    >
                      {ORIGIN_CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="calc-municipality" className="text-xs font-bold text-blue-600 uppercase">Til (Innsatssone)</label>
                    <select
                      id="calc-municipality"
                      className="w-full mt-1 p-3 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold"
                      value={dest.name}
                      onChange={(e) => setDest(DESTINATION_MUNICIPALITIES.find(c => c.name === e.target.value) || dest)}
                    >
                      {DESTINATION_MUNICIPALITIES.map(c => <option key={c.name} value={c.name}>{c.name} (Sone {c.zone})</option>)}
                    </select>
                  </div>
                </div>

                {/* EIENDOM */}
                <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2"><Building2 className="w-4 h-4" aria-hidden="true" /> Næringseiendom</h4>
                  
                  <div>
                    <label htmlFor="calc-property-value" className="text-xs font-bold text-slate-500 uppercase">Eiendommens verdi</label>
                    <input
                      id="calc-property-value"
                      type="number"
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(Number(e.target.value))}
                      step="1000000"
                      className="w-full mt-1 p-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  <div className="flex justify-between items-center text-sm pt-2">
                    <span className="text-slate-500">Sats {dest.name}:</span>
                    <span className="font-bold text-slate-900">{results.pTaxRateDest} ‰</span>
                  </div>
                  
                  {results.pTaxDiff < 0 && (
                    <div className="bg-orange-100 text-orange-800 text-xs p-2 rounded flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                      <span>{dest.name} har høyere promillesats enn {origin.name}.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* LØNNSKOSTNADER */}
              <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Users className="w-4 h-4" aria-hidden="true" /> Ansatte & Lønn</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="calc-employees" className="text-xs text-slate-500">Antall ansatte</label>
                    <input id="calc-employees" type="number" value={employees} onChange={e => setEmployees(Number(e.target.value))} className="w-full p-2 border rounded-lg font-bold" />
                  </div>
                  <div>
                    <label htmlFor="calc-salary" className="text-xs text-slate-500">Snittlønn</label>
                    <input id="calc-salary" type="number" value={avgSalary} onChange={e => setAvgSalary(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
                  </div>
                  <div>
                    <label htmlFor="calc-executives" className="text-xs text-slate-500">Antall ledere</label>
                    <input id="calc-executives" type="number" value={executives} onChange={e => setExecutives(Number(e.target.value))} className="w-full p-2 border rounded-lg font-bold" />
                  </div>
                  <div>
                    <label htmlFor="calc-exec-salary" className="text-xs text-slate-500">Lederlønn</label>
                    <input id="calc-exec-salary" type="number" value={execSalary} onChange={e => setExecSalary(Number(e.target.value))} className="w-full p-2 border rounded-lg" />
                  </div>
                </div>
              </div>

              {/* Advarselboks oppdatert med riktig satsreferanse */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-blue-800">
                  Vi sammenligner kostnaden mot en bedrift i {origin.name} (Sone {origin.zone}) med 
                  <McpDataSpan 
                    id={`aga-sone${origin.zone}-ref`} 
                    value={satser2025.satser[origin.zone]?.ordinaer} 
                    format="percentage" 
                    className="font-bold mx-1"
                  /> 
                  arbeidsgiveravgift.
                </p>
              </div>

              <div className="flex justify-end">
                <button onClick={nextStep} className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2">
                  Se regnestykket <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

            </motion.div>
          )}

          {/* --- STEG 2: RESULTAT & VISNING --- */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
              
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Her ligger gevinsten</h2>
                <p className="text-slate-600">
                  I {dest.name} (Sone {dest.zone}) er arbeidsgiveravgiften 
                  {/* HER VAR FEILEN - NÅ RETTET: Fjernet '* 100' */}
                  <McpDataSpan 
                    id={`aga-sats-${dest.zone}`} 
                    value={satser2025.satser[dest.zone]?.ordinaer} 
                    format="percentage" 
                    className="font-bold text-slate-900 mx-1"
                  />.
                </p>
              </div>

              <div className="text-center">
                <p className="text-slate-500 uppercase tracking-wider text-xs font-bold mb-2">Total årlig likviditetseffekt</p>
                <div className="text-5xl md:text-6xl font-extrabold text-blue-600 mb-2">
                  {Math.round(results.totalImpact).toLocaleString()} kr
                </div>
                <p className="text-slate-400 text-sm">Summen av bedriftens besparelser og ansattes kjøpekraftsøkning</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Bedriftens Gevinst */}
                <div className="bg-white border-2 border-blue-100 p-6 rounded-2xl">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" aria-hidden="true" /> For Bedriften
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm text-blue-900">Spart Arbeidsgiveravgift</span>
                      <span className="font-bold text-blue-700">+{Math.round(results.agaSaving).toLocaleString()} kr</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-700">Eiendomsskatt (Diff)</span>
                      <span className={`font-bold ${results.pTaxDiff >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {Math.round(results.pTaxDiff).toLocaleString()} kr
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ansatt Gevinst */}
                <div className="bg-white border-2 border-green-100 p-6 rounded-2xl relative">
                  {!results.isZone5 && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] z-10 flex items-center justify-center p-6 text-center">
                      <p className="font-bold text-slate-500">Personlige fordeler (gjeldsslette/skatt) gjelder kun i Sone 5 (Tiltakssonen).</p>
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" aria-hidden="true" /> Rekrutteringskraft
                    </h3>
                    <label htmlFor="calc-include-personal" className="relative inline-flex items-center cursor-pointer">
                      <input id="calc-include-personal" type="checkbox" checked={includePersonal} onChange={(e) => setIncludePersonal(e.target.checked)} className="sr-only peer" aria-label="Inkluder personlige fordeler" />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm text-green-900">Verdi per ansatt (Brutto-ekv.)</span>
                      <span className="font-bold text-green-700">+{Math.round(results.grossEquivalentPerEmp).toLocaleString()} kr</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">
                      Dette er "Oslo-tillegget" du måtte betalt i lønn for å matche kjøpekraften i {dest.name} (gratis barnehage, strøm, studielån).
                    </p>
                  </div>
                </div>
              </div>

              {/* RÅDGIVNING */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-2">Få hjelp til etableringen</h4>
                  <p className="text-slate-300 text-sm">
                    Vi kjenner reglene for bagatellstøtte (transport), hjemmekontor og rapportering. 
                    Vi kan også hjelpe deg med søknad til Sametingets næringsfond.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Link href="/kunnskapsbank/sametinget" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all text-sm">
                    Se støtteordninger
                  </Link>
                  <button onClick={() => setStep(1)} className="px-6 py-3 border border-slate-600 text-slate-300 font-bold rounded-full hover:bg-slate-800 transition-all text-sm">
                    Endre tall
                  </button>
                </div>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}