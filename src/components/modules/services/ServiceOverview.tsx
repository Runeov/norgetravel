'use client';

import { CheckCircle2 } from 'lucide-react';

interface ServiceOverviewProps {
  title: string;
  description: string;
  benefits: string[];
  themeColor?: string;
}

export function ServiceOverview({
  title,
  description,
  benefits,
  themeColor = "#E86C1F"
}: ServiceOverviewProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
          {title}
        </h2>
        
        {/* Description */}
        <p className="text-lg text-slate-600 leading-relaxed mb-8 text-center">
          {description}
        </p>
        
        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle2
                className="w-6 h-6 flex-shrink-0 mt-0.5"
                style={{ color: themeColor }}
                aria-hidden="true"
              />
              <span className="text-base text-slate-700 font-medium">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
