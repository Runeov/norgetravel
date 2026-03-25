'use client';

import { CheckCircle2 } from 'lucide-react';

export interface ServiceFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ServiceFeatureGridProps {
  title: string;
  features: ServiceFeature[];
  themeColor?: string;
}

export function ServiceFeatureGrid({
  title,
  features,
  themeColor = "#E86C1F"
}: ServiceFeatureGridProps) {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
        </div>
        
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300"
            >
              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${themeColor}15` }}
              >
                <div style={{ color: themeColor }}>
                  {feature.icon}
                </div>
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
