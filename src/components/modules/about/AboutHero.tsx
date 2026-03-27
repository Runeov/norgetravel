'use client';

import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { MapPin, Users, Award } from 'lucide-react';

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-20 pb-16 lg:pt-32 lg:pb-24">
      <NorgeBackground />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E86C1F]/10 text-[#E86C1F] text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E86C1F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E86C1F]"></span>
            </span>
            Etablert 1989
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Tolken av{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E86C1F] to-[#F4B223]">
              Nord-Norge
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Statsautoriserte regnskapsførere i Finnmark og Nord-Troms. Vi hjelper små og mellomstore bedrifter med regnskap, lønn og skatt.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            
            {/* Stat 1 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E86C1F]/10 text-[#E86C1F] mx-auto mb-4">
                <MapPin className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">35+</div>
              <div className="text-sm text-slate-600">År i Karasjok</div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E86C1F]/10 text-[#E86C1F] mx-auto mb-4">
                <Users className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">7</div>
              <div className="text-sm text-slate-600">Erfarne rådgivere</div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#E86C1F]/10 text-[#E86C1F] mx-auto mb-4">
                <Award className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">2</div>
              <div className="text-sm text-slate-600">Statsautoriserte</div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
