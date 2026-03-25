'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- UPDATE START ---
export interface FaqItem {
  question: string;
  // Changed from 'string' to 'React.ReactNode' to support HTML/JSX in answers
  answer: React.ReactNode; 
}
// --- UPDATE END ---

interface FaqAccordionProps {
  items: FaqItem[];
  themeColor?: string;
  className?: string;
}

export function FaqAccordion({ 
  items, 
  themeColor = "#E86C1F", 
  className 
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("flex flex-col gap-4 max-w-3xl mx-auto", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex flex-col">
          
          {/* Spørsmålsknapp */}
          <button
            onClick={() => handleToggle(index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-content-${index}`}
            className={cn(
              "group relative flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-300 border-2 w-full",
              openIndex === index 
                ? "bg-white shadow-md z-10 border-transparent" 
                : "bg-white border-transparent hover:border-slate-200 hover:bg-slate-50"
            )}
            style={{
              borderColor: openIndex === index ? themeColor : undefined
            }}
          >
            {/* Ikon */}
            <div 
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                openIndex === index ? "bg-white text-white" : "bg-slate-100 text-slate-400 group-hover:bg-white"
              )}
              style={{
                backgroundColor: openIndex === index ? themeColor : undefined,
                color: openIndex === index ? '#fff' : undefined
              }}
            >
              <HelpCircle className="w-5 h-5" aria-hidden="true" />
            </div>

            {/* Tekst */}
            <div className="flex-1 pr-4">
              <h3 
                className="font-bold text-lg transition-colors"
                style={{ color: openIndex === index ? themeColor : '#0f172a' }}
              >
                {item.question}
              </h3>
            </div>

            {/* Pil */}
            <ChevronRight
              className={cn("w-5 h-5 transition-transform duration-300 text-slate-300",
                openIndex === index ? "rotate-90" : "group-hover:text-slate-400"
              )}
              style={{ color: openIndex === index ? themeColor : undefined }}
              aria-hidden="true"
            />
          </button>

          {/* Svarinnhold (Expandable) */}
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                key="content"
                id={`faq-content-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-2 ml-4 border-l-2 border-dashed border-slate-200">
                  <div className="bg-slate-50 rounded-xl p-6 text-slate-600 leading-relaxed text-lg">
                    {item.answer}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}