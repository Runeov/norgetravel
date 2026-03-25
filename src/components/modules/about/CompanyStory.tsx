'use client';

import { Building2, Users, Monitor, TrendingUp, Shield } from 'lucide-react';

export default function CompanyStory() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Vår historie
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Fra lokalt regnskapskontor til den ledende tolken av Nord-Norges unike forretningsmuligheter.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-12">

            {/* 1989 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#E86C1F]/10 flex items-center justify-center">
                <Building2 className="w-8 h-8 text-[#E86C1F]" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#E86C1F] mb-2">1989</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Behovet var lokalt og konkret</h3>
                <p className="text-slate-600 leading-relaxed">
                  Ingvald startet Laitis Regnskapskontor i 1989. Han hadde jobbet i bank etter endt utdanning og så at mange bedrifter manglet tett økonomisk oppfølging. Banken kunne gi lån, men bedriftene trengte noen som fulgte tallene hver måned. Målet var enkelt: gi lokale bedrifter kontroll på økonomien. Vi har samarbeidet med lokale bedrifter siden 90-tallet.
                </p>
              </div>
            </div>

            {/* 1999 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#E86C1F]/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-[#E86C1F]" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#E86C1F] mb-2">1999</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Averdi blir etablert</h3>
                <p className="text-slate-600 leading-relaxed">
                  I 1999 ble Averdi etablert. Det ga rom for vekst, flere ansatte og bredere kompetanse. For kundene betydde det mer enn et navnebytte. De fikk tilgang til et større fagmiljø og bedre kapasitet, men med samme faste kontaktperson.
                </p>
              </div>
            </div>

            {/* 2005 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#E86C1F]/10 flex items-center justify-center">
                <Monitor className="w-8 h-8 text-[#E86C1F]" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#E86C1F] mb-2">2005</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Digitalisering før det ble standard</h3>
                <p className="text-slate-600 leading-relaxed">
                  Vi tok i bruk skybaserte løsninger tidlig. Det gjorde at kundene fikk tilgang til egne tall i stedet for å vente på papirutskrifter. De kunne se resultat og likviditet når de ville. Det ga raskere beslutninger og færre overraskelser.
                </p>
              </div>
            </div>

            {/* 2015 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#E86C1F]/10 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-[#E86C1F]" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#E86C1F] mb-2">2015</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Mer rådgivning, mindre bare bokføring</h3>
                <p className="text-slate-600 leading-relaxed">
                  Regelverket ble mer komplekst. Bedrifter trengte mer enn føring av bilag. Vi styrket rådgivningen innen skatt, arbeidsgiveravgift og tiltakssonen i Finnmark og Nord-Troms. Kundene fikk konkrete råd basert på egne tall.
                </p>
              </div>
            </div>

            {/* 2022 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#E86C1F]/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#E86C1F]" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-[#E86C1F] mb-2">2022</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Ny generasjon, samme prinsipp</h3>
                <p className="text-slate-600 leading-relaxed">
                  Ny generasjon tok over eierskapet. Kompetansen ble videreført. Systemene ble modernisert. Retningen er den samme som i 1989: du skal forstå tallene dine, og du skal bruke dem aktivt.
                </p>
              </div>
            </div>

          </div>


        </div>
      </div>
    </section>
  );
}
