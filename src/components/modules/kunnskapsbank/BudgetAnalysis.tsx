import { FileText, TrendingUp, AlertTriangle, Shield, AlertCircle } from 'lucide-react';

export function BudgetAnalysis() {
  return (
    <section className="my-16 bg-slate-900 text-white rounded-2xl overflow-hidden shadow-xl border border-slate-700">
      <div className="flex flex-col md:flex-row">

        {/* Venstre */}
        <div className="p-8 md:p-12 md:w-2/5 bg-slate-800 relative flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <FileText className="w-32 h-32 text-white" aria-hidden="true" />
          </div>
          <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider rounded-full mb-6 border border-blue-500/30">
            Averdi Innsikt
          </span>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">
            Nominell økning i 2026 er 3,4 %. Realveksten er 0,4 % etter prisjustering.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Mesteparten av økningen er bundet til faste institusjonskostnader. Summen tilgjengelig for søknadsbaserte prosjekter er reelt sett lavere enn i fjor.
          </p>
          <div className="flex items-center gap-3 text-sm text-slate-400 mt-auto">
            <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-white">AV</div>
            <span>Analysert av Averdi-teamet</span>
          </div>
        </div>

        {/* Høyre: 4 punkter */}
        <div className="p-8 md:p-12 md:w-3/5 bg-slate-900">
          <div className="space-y-7">

            {/* Punkt 1 */}
            <div className="flex gap-4">
              <div className="mt-1 bg-yellow-500/10 p-2 rounded-lg h-fit flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-yellow-500" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white mb-1">Variert næringsliv: taket er 800 000 kr</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Mange søker fremdeles om 500 000 kr. Sametinget hevet maksgrensen i 2026. Sjekk utlysningen før du setter søknadsbeløp.
                </p>
              </div>
            </div>

            {/* Punkt 2 */}
            <div className="flex gap-4">
              <div className="mt-1 bg-red-500/10 p-2 rounded-lg h-fit flex-shrink-0">
                <Shield className="w-5 h-5 text-red-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white mb-1">De minimis-grensen er en skjult risiko</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Alle offentlige tilskudd telles samlet — Sametinget, Innovasjon Norge, fylkeskommunen. Grensen er ca. 2,3 mill. kr over tre år. Overskrides den, kan midler kreves tilbake.
                </p>
              </div>
            </div>

            {/* Punkt 3 */}
            <div className="flex gap-4">
              <div className="mt-1 bg-orange-500/10 p-2 rounded-lg h-fit flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-orange-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white mb-1">Doarjja avviser før noen har lest søknaden</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Utdatert styreregistrering i Enhetsregisteret blokkerer innsending — uavhengig av søknadens kvalitet. Vi sjekker dette før vi sender.
                </p>
              </div>
            </div>

            {/* Punkt 4 */}
            <div className="flex gap-4">
              <div className="mt-1 bg-green-500/10 p-2 rounded-lg h-fit flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-green-500" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white mb-1">Midler kan gå tomme før fristen</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Mange ordninger har løpende behandling. Det betyr at potten kan være tom lenge før søknadsfristen. Vi anbefaler å søke så tidlig på året som mulig.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
