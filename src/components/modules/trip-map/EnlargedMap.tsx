'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, Minus, Plus, X } from 'lucide-react';
import { mapZones } from '@/data/norway-map-zones';
import { zoneSubcategories } from '@/data/zone-subcategories';
import { NorwayMap } from './NorwayMap';

interface EnlargedMapProps {
  hoveredZone: string | null;
  selectedZone: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  onClose: () => void;
  onExplore: (zoneId: string) => void;
}

const MAP_RATIO = 950 / 460; // viewBox height over width
const ZOOM_STEP = 1.4;
const MAX_ZOOM = 5;

/** Full-screen map that scrolls in both directions and zooms with buttons. */
export function EnlargedMap({ hoveredZone, selectedZone, onHover, onSelect, onClose, onExplore }: EnlargedMapProps) {
  const scroller = useRef<HTMLDivElement>(null);
  // `fit` is the width fraction at which the whole map fits the height; `scale` is the current width fraction.
  const [fit, setFit] = useState(0.5);
  const [scale, setScale] = useState(0.8);
  const prevScale = useRef(0.8);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const moved = useRef(false);

  // Start at 1.6 times the size that fits, which is always larger than the panel map
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const fitted = Math.min(1, el.clientHeight / (el.clientWidth * MAP_RATIO));
    const start = fitted * 1.6;
    setFit(fitted);
    setScale(start);
    prevScale.current = start;
  }, []);

  // Keep the point in the middle of the view fixed while zooming
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const ratio = scale / prevScale.current;
    if (ratio !== 1) {
      el.scrollLeft = (el.scrollLeft + el.clientWidth / 2) * ratio - el.clientWidth / 2;
      el.scrollTop = (el.scrollTop + el.clientHeight / 2) * ratio - el.clientHeight / 2;
    }
    prevScale.current = scale;
  }, [scale]);

  const zoom = useCallback(
    (direction: 1 | -1) => {
      setScale((current) => {
        const next = direction > 0 ? current * ZOOM_STEP : current / ZOOM_STEP;
        return Math.min(fit * MAX_ZOOM, Math.max(fit, next));
      });
    },
    [fit]
  );

  const selected = selectedZone ? mapZones.find((zone) => zone.id === selectedZone) ?? null : null;
  const buttonClass =
    'flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10 transition-colors';

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-[#102640]"
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged map of Norway"
    >
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <p className="text-base font-semibold text-white">Drag to move. Tap a destination.</p>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={() => zoom(-1)} disabled={scale <= fit + 0.001} className={buttonClass} aria-label="Zoom out">
            <Minus className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => zoom(1)} disabled={scale >= fit * MAX_ZOOM - 0.001} className={buttonClass} aria-label="Zoom in">
            <Plus className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={onClose} className={buttonClass} aria-label="Close enlarged map">
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="flex-1 overflow-auto cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'pan-x pan-y' }}
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse' || !scroller.current) return;
          drag.current = { x: e.clientX, y: e.clientY, left: scroller.current.scrollLeft, top: scroller.current.scrollTop };
          moved.current = false;
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          const el = scroller.current;
          if (!d || !el) return;
          const dx = e.clientX - d.x;
          const dy = e.clientY - d.y;
          if (Math.abs(dx) + Math.abs(dy) > 6) moved.current = true;
          el.scrollLeft = d.left - dx;
          el.scrollTop = d.top - dy;
        }}
        onPointerUp={() => { drag.current = null; }}
        onPointerLeave={() => { drag.current = null; }}
        onClickCapture={(e) => {
          // A drag that ends on a zone must not count as a tap on it
          if (moved.current) {
            e.stopPropagation();
            e.preventDefault();
            moved.current = false;
          }
        }}
      >
        <div className="mx-auto py-4" style={{ width: `${scale * 100}%` }}>
          <NorwayMap
            hoveredZone={hoveredZone}
            selectedZone={selectedZone}
            onHover={onHover}
            onSelect={onSelect}
            className="w-full h-auto"
          />
        </div>
      </div>

      {selected && (
        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-white/10 bg-[#1B3A5C] px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-white">{selected.name}</p>
            <p className="truncate text-sm text-white/65">{selected.tagline}</p>
          </div>
          <button
            type="button"
            onClick={() => (zoneSubcategories[selected.id] ? onExplore(selected.id) : onClose())}
            className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] px-5 text-base font-bold text-white hover:shadow-lg transition-all"
          >
            {zoneSubcategories[selected.id] ? 'Open' : 'Details'}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
