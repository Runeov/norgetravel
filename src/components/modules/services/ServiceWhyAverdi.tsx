'use client';

import { CheckCircle2 } from 'lucide-react';

export interface WhyPoint {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ServiceWhyAverdiProps {
  title?: string;
  points: WhyPoint[];
  themeColor?: string;
}

export function ServiceWhyAverdi({
  title = "Hvorfor velge Averdi?",
  points,
  themeColor = "#E86C1F"
}: ServiceWhyAverdiProps) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
        </div>
        
        {/* Points Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: `${themeColor}15` }}
              >
                <div style={{ color: themeColor }}>
                  {point.icon}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {point.title}
              </h3>
              
              {/* Description */}
              <p className="text-base text-slate-600 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
