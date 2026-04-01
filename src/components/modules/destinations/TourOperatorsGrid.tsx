import { ArrowRight } from 'lucide-react';
import type { TourOperator } from '@/types/city-guide';

interface TourOperatorsGridProps {
  operators: TourOperator[];
  heading?: string;
}

export function TourOperatorsGrid({
  operators,
  heading = 'Recommended operators',
}: TourOperatorsGridProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-900 mb-3">{heading}</h2>
      <p className="text-slate-500 text-sm mb-10">
        Affiliate disclosure: NorgeTravel earns a commission when you book via our links. Your
        price does not change. Operators are selected independently.
      </p>
      <div className="grid lg:grid-cols-3 gap-6">
        {operators.map((op) => (
          <div
            key={op.name}
            className="bg-white rounded-lg p-6 shadow-sm border border-slate-200/50 flex flex-col"
          >
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 mb-1">{op.name}</h3>
              <p className="text-sm text-slate-500 mb-3">{op.type}</p>
              <p className="text-2xl font-bold text-[#1B3A5C] mb-4">{op.priceFrom}</p>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">{op.highlight}</p>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 mb-3">Commission: {op.commission}</p>
              <a
                href={op.affiliateUrl}
                rel={op.rel}
                className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:shadow-[#1B3A5C]/20 hover:-translate-y-0.5 transition-all"
              >
                Check availability <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
