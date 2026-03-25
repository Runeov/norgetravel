'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Oppdatert interface for å støtte JSX i content/bullets (for live data)
export interface FeatureTabItem {
  id: string;
  title: string;
  shortDesc: string;
  icon: string; // URL til bilde/ikon
  content: string | React.ReactNode; // Tillater JSX
  bullets: (string | React.ReactNode)[]; // Tillater JSX i lister
  link: string;
  linkText?: string;
}

interface FeatureTabsProps {
  items: FeatureTabItem[];
  themeColor?: string; 
  className?: string;
}

export function FeatureTabs({ 
  items, 
  themeColor = "#E86C1F", 
  className 
}: FeatureTabsProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<number | null>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className={cn("grid lg:grid-cols-12 gap-8 items-start", className)}>
      
      {/* --- VENSTRE KOLONNE: Navigasjon (Desktop) + Accordion (Mobil) --- */}
      <div className="lg:col-span-5 flex flex-col gap-3">
        {items.map((item, index) => {
          const isActive = activeTab === index;
          return (
            <div key={item.id} className="flex flex-col">
              
              {/* Knapp */}
              <button
                onClick={() => handleTabClick(index)}
                aria-expanded={isActive}
                aria-controls={`tab-content-${item.id}`}
                className={cn(
                  "group relative flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 border-2 w-full",
                  isActive 
                    ? "bg-white shadow-sm z-10" 
                    : "bg-white border-transparent hover:border-gray-200 hover:bg-gray-50"
                )}
                style={{
                  borderColor: isActive ? themeColor : 'transparent',
                  backgroundColor: isActive ? `${themeColor}0D` : undefined
                }}
              >
                <div 
                  className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors",
                    isActive ? "bg-white" : "bg-gray-100 group-hover:bg-white"
                  )}
                >
                  <img src={item.icon} alt="" className="w-8 h-8 object-contain" aria-hidden="true" />
                </div>

                <div className="flex-1">
                  <h3 
                    className="font-bold text-lg transition-colors"
                    style={{ color: isActive ? themeColor : '#0f172a' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 hidden sm:block">
                    {item.shortDesc}
                  </p>
                </div>

                <ChevronRight 
                  className={cn("w-5 h-5 transition-transform duration-300", isActive ? "rotate-90 lg:rotate-0 lg:translate-x-1" : "text-gray-300")}
                  style={{ color: isActive ? themeColor : undefined }}
                  aria-hidden="true"
                />
              </button>

              {/* --- MOBIL INNHOLD (Accordion) --- */}
              <div className="lg:hidden">
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      id={`tab-content-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div 
                        className="p-4 pl-20 pt-2 pb-6 ml-8 my-2 border-l-2"
                        style={{ borderColor: `${themeColor}33` }}
                      >
                          <div className="text-slate-600 mb-4 text-sm leading-relaxed">
                            {item.content}
                          </div>
                          <ul className="space-y-2 mb-4">
                            {item.bullets.map((bullet, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: themeColor }} aria-hidden="true" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                          <button 
                            onClick={() => router.push(item.link)}
                            className="font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
                            style={{ color: themeColor }}
                            aria-label={`Les mer om ${item.title}`}
                          >
                            {item.linkText || `Les mer om ${item.title.toLowerCase()}`} 
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- HØYRE KOLONNE: Innhold (Desktop) --- */}
      <div className="hidden lg:flex lg:col-span-7 bg-slate-50 rounded-2xl p-8 sm:p-10 border border-slate-100 min-h-[500px] flex-col relative overflow-hidden">
         <AnimatePresence mode='wait'>
            {activeTab !== null && items[activeTab] && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
                role="tabpanel"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center p-3">
                    <img src={items[activeTab].icon} alt="" className="w-full h-full object-contain" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900">{items[activeTab].title}</h3>
                    <div className="h-1 w-12 mt-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                  </div>
                </div>

                <div className="text-lg text-slate-600 leading-relaxed mb-8">
                  {items[activeTab].content}
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  {items[activeTab].bullets.map((bullet, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: themeColor }} aria-hidden="true" />
                      <span className="text-slate-700 font-medium text-sm">{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-200">
                  <button 
                    onClick={() => router.push(items[activeTab].link)}
                    className="inline-flex items-center gap-2 font-bold hover:gap-3 transition-all group"
                    style={{ color: themeColor }}
                    aria-label={`Gå til ${items[activeTab].title}`}
                  >
                     {items[activeTab].linkText || `Les mer om ${items[activeTab].title.toLowerCase()}`}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}