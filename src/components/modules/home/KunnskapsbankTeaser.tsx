import Link from 'next/link';
import Image from 'next/image';
import heroImage from '@/assets/karasjok_Over.avif';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function TravelGuideTeaser() {
  return (
    <section id="travel-guide" className="py-24 relative overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-[600px] h-[600px] bg-[#1B3A5C]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[600px] h-[600px] bg-[#00CC6A]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B3A5C]/10 text-[#1B3A5C] text-sm font-medium mb-4">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Travel Guide
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">
            Plan the perfect Norway trip
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            In-depth guides on Northern Lights seasons, sustainable cruise options, trekking routes, and budgeting for Arctic Norway.
          </p>
        </div>

        {/* Featured Guide: Northern Lights 2026 */}
        <div className="mb-12">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#1B3A5C]/10 relative group hover:border-[#1B3A5C]/30 transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A]"></div>

            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-4 py-1.5 bg-[#00CC6A]/10 text-[#00CC6A] rounded-full text-sm font-semibold">
                  Featured Guide — Solar Maximum 2026
                </div>
                <h3 className="text-3xl font-bold text-slate-900">
                  When &amp; where to see the Northern Lights in Norway
                </h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Solar Cycle 25 is at its peak. We break down the best locations, what G-scale geomagnetic storms mean for visibility, and which tour operators offer aurora guarantees.
                </p>
                <Link
                  href="/kunnskapsbank"
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-full shadow-md hover:shadow-lg hover:shadow-[#1B3A5C]/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Read the guide
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
              </div>

              <div className="relative h-64 md:h-full min-h-[300px] bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
                <Image
                  src={heroImage}
                  alt="Northern Lights over Arctic Norway"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/kunnskapsbank"
            className="inline-flex items-center justify-center text-[#1B3A5C] text-lg font-medium hover:text-[#00CC6A] transition-colors group"
          >
            Browse all travel guides
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
