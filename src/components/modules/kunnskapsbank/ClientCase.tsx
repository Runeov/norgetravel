import { Quote } from 'lucide-react';

interface ClientCaseProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  // logo?: string; // For fremtidig bruk med Image
}

export function ClientCase({ quote, author, role, company }: ClientCaseProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-lg mb-16 relative overflow-hidden">
      {/* Dekorativ bakgrunn */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E86C1F]/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="relative z-10">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Kundeuttalelse</h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sitatet */}
          <div className="flex-1">
            <Quote className="w-10 h-10 text-[#E86C1F]/20 mb-4" aria-hidden="true" />
            <blockquote className="text-xl font-medium text-slate-900 leading-relaxed mb-6">
              "{quote}"
            </blockquote>
            
            <div>
              <cite className="not-italic font-bold text-slate-900 block">{author}</cite>
              <span className="text-slate-500 text-sm">{role}, {company}</span>
            </div>
          </div>

          {/* Logo/Bilde boks (Placeholder for logo) */}
          <div className="w-full md:w-48 h-32 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center p-4">
            <span className="text-slate-400 font-bold text-center text-sm" style={{ whiteSpace: 'pre-line' }}>
              {company.replace(' ', '\n')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}