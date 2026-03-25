import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock, Rocket, FileText } from 'lucide-react';
import { AverdiBackground } from '@/components/modules/AverdiBackground';

export const metadata: Metadata = {
  title: 'Averdi Innsikt | Dybdeartikler og Analyser',
  description: 'Faglig fordypning om nordnorsk næringsliv, samfunn og økonomi. Les våre analyser av statsbudsjettet, virkemiddelapparatet og rammebetingelser.',
};

export default function ArtikkelOversikt() {

  // --- FEATURED ARTICLE ---
  const featuredPath = "/kunnskapsbank/artikler/ny-nettside-lansering";

  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      <AverdiBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Header */}
        <header className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-widest mb-4">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            Kunnskapsbanken
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
            Averdi <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E86C1F] to-[#F4B223]">Innsikt</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Vi dykker ned i tallene som former landsdelen. Her finner du våre grundigste analyser, kommentarer og strategiske råd.
          </p>
        </header>

        {/* --- FEATURED ARTICLE (STORE SAKEN) --- */}
        <section className="mb-20">
          <div className="group block relative rounded-3xl overflow-hidden shadow-2xl bg-white hover:shadow-orange-500/10 transition-shadow">
            <div className="grid md:grid-cols-2">
              
              {/* Bilde / Grafikk */}
              <Link href={featuredPath} className="bg-slate-900 relative min-h-[300px] md:min-h-full overflow-hidden flex items-center justify-center p-10 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#E86C1F]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#E86C1F]/30 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#F4B223]/15 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                <div className="relative z-10 text-center">
                  <Rocket className="w-16 h-16 text-[#E86C1F] opacity-30 mx-auto mb-4" aria-hidden="true" />
                  <span className="text-[#E86C1F] font-bold text-4xl md:text-6xl opacity-20 select-none">AVERDI.NO</span>
                </div>
              </Link>

              {/* Innhold */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-4 uppercase tracking-wider">
                  <span className="text-[#E86C1F]">Lansering</span>
                  <span>•</span>
                  <span>4 min lesetid</span>
                </div>
                
                <Link href={featuredPath}>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 group-hover:text-[#E86C1F] transition-colors leading-tight cursor-pointer">
                    Ny nettside: Averdi.no er din nye vekstpartner i nord
                    </h2>
                </Link>
                
                <p className="text-slate-600 text-lg mb-8 line-clamp-3">
                  Sametinget disponerer 788 millioner kroner i 2026. Mange bedrifter er i målgruppen uten å vite om dette. Vi har bygget averdi.no fra grunnen av som et verktøy som oversetter byråkrati til muligheter.
                </p>

                {/* --- CTA BUTTON --- */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <Link 
                        href={featuredPath} 
                        className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#E86C1F] to-[#F4B223] text-white font-bold text-sm hover:shadow-lg hover:shadow-[#E86C1F]/30 transition-all"
                    >
                        <FileText className="w-4 h-4" aria-hidden="true" />
                        Les lanseringsartikkelen
                    </Link>
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E86C1F] to-[#F4B223] flex items-center justify-center text-white font-bold text-sm">
                        AV
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Averdi-teamet</p>
                      <p className="text-xs text-slate-500">Februar 2026</p>
                    </div>
                  </div>
                  
                  <Link href={featuredPath} className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-400 group-hover:bg-[#E86C1F] group-hover:text-white transition-all" aria-label="Les lanseringsartikkelen">
                    <ArrowRight className="w-5 h-5" aria-hidden="true" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- FLERE ARTIKLER --- */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900">Flere saker</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Kort 1 */}
            <Link href="/kunnskapsbank/bedrifter/rekruttering" aria-label="Rekruttering i Nord 2026 — Les mer" className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
              <div className="text-xs font-bold text-blue-600 mb-3 uppercase">Bedrift</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                Slik vinner du rekrutteringskampen i 2026
              </h3>
              <p className="text-slate-600 text-sm mb-6">
                Med 60.000 i gjeldsslette har du et våpen som matcher Oslo-lønn. Her er oppskriften.
              </p>
              <div className="flex items-center text-xs text-slate-400">
                <Clock className="w-3 h-3 mr-1" aria-hidden="true" /> 5 min
              </div>
            </Link>

            {/* Kort 2 */}
            <Link href="/kunnskapsbank/sametinget/naering" aria-label="Næringsstøtte fra Sametinget — Les mer" className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
              <div className="text-xs font-bold text-[#E86C1F] mb-3 uppercase">Sametinget</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#E86C1F] transition-colors">
                Næringsstøtte: Førstemann til mølla
              </h3>
              <p className="text-slate-600 text-sm mb-6">
                Hvorfor du må sende søknaden i januar, og hvordan du unngår likviditetsfellen.
              </p>
              <div className="flex items-center text-xs text-slate-400">
                <Clock className="w-3 h-3 mr-1" aria-hidden="true" /> 4 min
              </div>
            </Link>

            {/* Kort 3 */}
            <Link href="/kunnskapsbank/bedrifter/transport" aria-label="Transport og bagatellstøtte — Les mer" className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all">
              <div className="text-xs font-bold text-slate-500 mb-3 uppercase">Regelverk</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-600 transition-colors">
                Unngå straffeskatt på transport
              </h3>
              <p className="text-slate-600 text-sm mb-6">
                De Minimis-reglene for bagatellstøtte er kompliserte. Sjekk om din bedrift rammes.
              </p>
              <div className="flex items-center text-xs text-slate-400">
                <Clock className="w-3 h-3 mr-1" aria-hidden="true" /> 6 min
              </div>
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
