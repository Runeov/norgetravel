import Link from 'next/link';

interface CtaBlockProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export function CtaBlock({ 
  title, 
  description, 
  primaryButtonText, 
  primaryButtonLink, 
  secondaryButtonText, 
  secondaryButtonLink 
}: CtaBlockProps) {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden mt-16">
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href={primaryButtonLink} 
            className="inline-flex items-center justify-center px-8 py-4 bg-[#E86C1F] text-white font-bold rounded-full hover:bg-[#d65f18] transition-all hover:scale-105 shadow-lg shadow-orange-900/20"
          >
            {primaryButtonText}
          </Link>
          
          {secondaryButtonText && secondaryButtonLink && (
            <Link 
              href={secondaryButtonLink} 
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10"
            >
              {secondaryButtonText}
            </Link>
          )}
        </div>
      </div>
      
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  );
}