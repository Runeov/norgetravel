'use client';

import { motion } from 'framer-motion';
import { norwayOutline, mapZones } from '@/data/norway-map-zones';

interface NorwayMapProps {
  hoveredZone: string | null;
  selectedZone: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}

export function NorwayMap({ hoveredZone, selectedZone, onHover, onSelect }: NorwayMapProps) {
  return (
    <svg
      viewBox="0 0 380 920"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full max-h-[65vh] lg:max-h-[75vh]"
      role="img"
      aria-label="Interactive map of Norway destinations"
    >
      {/* Subtle grid lines */}
      <defs>
        <filter id="zone-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Norway mainland outline */}
      <path
        d={norwayOutline}
        fill="white"
        fillOpacity={0.05}
        stroke="white"
        strokeWidth={1}
        strokeOpacity={0.2}
      />

      {/* Dashed line connecting Svalbard to mainland */}
      <line
        x1={120}
        y1={95}
        x2={200}
        y2={140}
        stroke="white"
        strokeWidth={0.5}
        strokeOpacity={0.15}
        strokeDasharray="4 6"
      />

      {/* Interactive zone regions */}
      {mapZones.map((zone, i) => {
        const isHovered = hoveredZone === zone.id;
        const isSelected = selectedZone === zone.id;
        const isActive = isHovered || isSelected;

        return (
          <g key={zone.id}>
            <motion.path
              d={zone.svgPath}
              fill={zone.color}
              initial={{ fillOpacity: 0.15 }}
              animate={{
                fillOpacity: isSelected ? 0.5 : isHovered ? 0.35 : 0.15,
                scale: isActive ? 1.01 : 1,
              }}
              transition={{ duration: 0.2 }}
              stroke={zone.color}
              strokeWidth={isActive ? 2 : 1}
              strokeOpacity={isActive ? 0.8 : 0.3}
              filter={isSelected ? 'url(#zone-glow)' : undefined}
              className="cursor-pointer"
              style={{ transformOrigin: `${zone.labelPosition.x}px ${zone.labelPosition.y}px` }}
              onMouseEnter={() => onHover(zone.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(zone.id)}
              role="button"
              tabIndex={0}
              aria-label={zone.name}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(zone.id);
                }
              }}
            />

            {/* Zone label */}
            <motion.text
              x={zone.labelPosition.x}
              y={zone.labelPosition.y}
              textAnchor="middle"
              dominantBaseline="central"
              className="pointer-events-none select-none"
              fill="white"
              fontSize={zone.id === 'lofoten' ? 9 : 11}
              fontWeight={600}
              letterSpacing={0.5}
              animate={{ opacity: isActive ? 1 : 0.6 }}
              transition={{ duration: 0.2 }}
            >
              {zone.name}
            </motion.text>

            {/* Pulsing dot for selected zone */}
            {isSelected && (
              <motion.circle
                cx={zone.labelPosition.x}
                cy={zone.labelPosition.y + (zone.id === 'lofoten' ? 12 : 16)}
                r={3}
                fill={zone.color}
                initial={{ opacity: 0.8, r: 3 }}
                animate={{ opacity: [0.8, 0.3, 0.8], r: [3, 6, 3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
