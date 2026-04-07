'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Map, X } from 'lucide-react';
import { useTripMap } from '@/context/TripMapContext';

export function MinimizedTripPlanner() {
  const { isMinimized, restoreMap, closeMap } = useTripMap();

  return (
    <AnimatePresence>
      {isMinimized && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
        >
          <button
            onClick={restoreMap}
            className="group flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white rounded-full shadow-lg shadow-[#1B3A5C]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            aria-label="Restore trip planner"
          >
            <Map className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm font-bold">Trip Planner</span>
            <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" aria-hidden="true" />
          </button>
          <button
            onClick={closeMap}
            className="p-2 bg-slate-800/80 text-white/60 rounded-full hover:bg-slate-700 hover:text-white transition-colors"
            aria-label="Close trip planner"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
