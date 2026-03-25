'use client';

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface ServiceProcessProps {
  title: string;
  steps: ProcessStep[];
  themeColor?: string;
}

export function ServiceProcess({
  title,
  steps,
  themeColor = "#E86C1F"
}: ServiceProcessProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
        </div>
        
        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              
              {/* Connector Line (not on last item) */}
              {index < steps.length - 1 && (
                <div 
                  className="hidden md:block absolute top-12 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-slate-200"
                  aria-hidden="true"
                />
              )}
              
              {/* Step Card */}
              <div className="relative bg-slate-50 rounded-2xl p-6 border border-slate-200">
                
                {/* Step Number */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto"
                  style={{ backgroundColor: themeColor }}
                >
                  {step.number}
                </div>
                
                {/* Step Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">
                  {step.title}
                </h3>
                
                {/* Step Description */}
                <p className="text-sm text-slate-600 leading-relaxed text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
