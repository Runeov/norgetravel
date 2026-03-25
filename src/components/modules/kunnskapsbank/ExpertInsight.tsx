import Image from 'next/image';
import { Quote } from 'lucide-react';
import type { Expert } from '@/data/experts';

interface ExpertInsightProps {
  title: string;
  quote: string;
  expert: Expert;
  children: React.ReactNode;
}

export function ExpertInsight({ title, quote, expert, children }: ExpertInsightProps) {
  return (
    <div className="my-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border border-slate-700">
      
      {/* Dekorativ bakgrunn */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E86C1F]/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-10 items-start">
        
        {/* Venstre: Bilde/Initialer og Info */}
        <div className="flex-shrink-0 flex flex-row md:flex-col items-center md:items-start gap-4 md:w-48">
          
          {/* SJEKK OM BILDE FINNES - HVIS IKKE, VIS INITIALER */}
          {expert.image ? (
            <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#E86C1F]/30 shadow-lg">
              <Image 
                src={expert.image} 
                alt={expert.name} 
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-[#E86C1F]/30 shadow-lg bg-slate-800 flex items-center justify-center">
              <span className="text-2xl md:text-4xl font-bold text-[#E86C1F] tracking-wider">
                {expert.initials}
              </span>
            </div>
          )}

          <div className="text-left md:text-left">
            <p className="font-bold text-lg leading-tight">{expert.name}</p>
            <p className="text-[#E86C1F] text-sm font-medium mt-1">{expert.role}</p>
            <p className="text-slate-400 text-xs mt-2 hidden md:block">{expert.department}</p>
          </div>
        </div>

        {/* Høyre: Innhold */}
        <div className="flex-1">
          <Quote className="w-10 h-10 text-[#E86C1F] mb-6 opacity-80" aria-hidden="true" />
          
          <h2 className="text-2xl font-bold mb-4 text-white">
            {title}
          </h2>
          
          <blockquote className="text-xl font-medium text-slate-200 mb-6 italic border-l-4 border-[#E86C1F] pl-4">
            "{quote}"
          </blockquote>

          <div className="text-slate-300 leading-relaxed text-lg space-y-4">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
}