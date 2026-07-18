import React from 'react';
import { PlaneTakeoff, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KiwiFlightBannerProps {
  className?: string;
  destinationCode?: string;
}

export function KiwiFlightBanner({ 
  className,
  destinationCode = 'OSL' 
}: KiwiFlightBannerProps) {
  // Use the standard Kiwi.com deep link structure found elsewhere in the app.
  // Origin is intentionally left blank so Kiwi auto-detects the user's location.
  const kiwiAffiliateUrl = `https://www.kiwi.com/deep?to=${destinationCode}`;

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 p-6 shadow-sm transition-all hover:shadow-md",
      className
    )}>
      {/* Decorative background element */}
      <div className="absolute -right-12 -top-12 opacity-5 pointer-events-none">
        <PlaneTakeoff className="w-48 h-48 text-[#00CC6A]" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <PlaneTakeoff className="w-3.5 h-3.5" />
            Flight Planning
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Compare flights to Norway
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            We partner with Kiwi.com to help you find the most efficient and affordable routes. Search across hundreds of airlines to find direct connections or clever layovers to start your Norwegian adventure.
          </p>
        </div>

        <div className="flex-shrink-0">
          <a
            href={kiwiAffiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1B3A5C] text-white font-medium rounded-lg hover:bg-[#112a45] hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-md"
          >
            Search Flights
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
