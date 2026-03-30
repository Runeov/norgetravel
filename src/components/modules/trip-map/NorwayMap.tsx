'use client';

import { motion } from 'framer-motion';
import {
  norwayOutline,
  svalbardSpitsbergen,
  svalbardNordaustlandet,
  svalbardEdgeoya,
  cityMarkers,
  mapZones,
} from '@/data/norway-map-zones';

interface NorwayMapProps {
  hoveredZone: string | null;
  selectedZone: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}

export function NorwayMap({ hoveredZone, selectedZone, onHover, onSelect }: NorwayMapProps) {
  const svalbardZone = mapZones.find((z) => z.id === 'svalbard');
  const mainlandZones = mapZones.filter((z) => z.id !== 'svalbard');

  return (
    <svg
      viewBox="-30 -120 460 950"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full max-h-[65vh] lg:max-h-[75vh]"
      role="img"
      aria-label="Interactive map of Norway destinations"
    >
      <defs>
        <filter id="zone-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Svalbard inset — scaled and positioned above mainland */}
      <g transform="translate(30, -110) scale(0.55)">
        {/* Inset border */}
        <rect
          x={-5}
          y={-5}
          width={310}
          height={260}
          fill="none"
          stroke="white"
          strokeWidth={0.5}
          strokeOpacity={0.15}
          strokeDasharray="4 6"
          rx={4}
        />

        {/* Svalbard islands outline */}
        <path
          d={svalbardSpitsbergen}
          fill="white"
          fillOpacity={0.05}
          stroke="white"
          strokeWidth={1}
          strokeOpacity={0.2}
        />
        <path
          d={svalbardNordaustlandet}
          fill="white"
          fillOpacity={0.05}
          stroke="white"
          strokeWidth={1}
          strokeOpacity={0.2}
        />
        <path
          d={svalbardEdgeoya}
          fill="white"
          fillOpacity={0.05}
          stroke="white"
          strokeWidth={1}
          strokeOpacity={0.2}
        />

        {/* Svalbard interactive zone — uses Spitsbergen as click target */}
        {svalbardZone && (() => {
          const isHovered = hoveredZone === svalbardZone.id;
          const isSelected = selectedZone === svalbardZone.id;
          const isActive = isHovered || isSelected;

          return (
            <g>
              {/* Clickable overlay covering all three islands */}
              <motion.path
                d={svalbardSpitsbergen}
                fill={svalbardZone.color}
                initial={{ fillOpacity: 0.15 }}
                animate={{
                  fillOpacity: isSelected ? 0.5 : isHovered ? 0.35 : 0.15,
                }}
                transition={{ duration: 0.2 }}
                stroke={svalbardZone.color}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 0.8 : 0.3}
                filter={isSelected ? 'url(#zone-glow)' : undefined}
                className="cursor-pointer"
                onMouseEnter={() => onHover(svalbardZone.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onSelect(svalbardZone.id)}
                role="button"
                tabIndex={0}
                aria-label={svalbardZone.name}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(svalbardZone.id);
                  }
                }}
              />
              <motion.path
                d={svalbardNordaustlandet}
                fill={svalbardZone.color}
                initial={{ fillOpacity: 0.15 }}
                animate={{
                  fillOpacity: isSelected ? 0.5 : isHovered ? 0.35 : 0.15,
                }}
                transition={{ duration: 0.2 }}
                stroke={svalbardZone.color}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 0.8 : 0.3}
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => onHover(svalbardZone.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onSelect(svalbardZone.id)}
              />
              <motion.path
                d={svalbardEdgeoya}
                fill={svalbardZone.color}
                initial={{ fillOpacity: 0.15 }}
                animate={{
                  fillOpacity: isSelected ? 0.5 : isHovered ? 0.35 : 0.15,
                }}
                transition={{ duration: 0.2 }}
                stroke={svalbardZone.color}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 0.8 : 0.3}
                className="cursor-pointer pointer-events-auto"
                onMouseEnter={() => onHover(svalbardZone.id)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onSelect(svalbardZone.id)}
              />

              {/* Svalbard label */}
              <motion.text
                x={svalbardZone.labelPosition.x}
                y={svalbardZone.labelPosition.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="pointer-events-none select-none"
                fill="white"
                fontSize={14}
                fontWeight={600}
                letterSpacing={0.5}
                animate={{ opacity: isActive ? 1 : 0.6 }}
                transition={{ duration: 0.2 }}
              >
                {svalbardZone.name}
              </motion.text>

              {isSelected && (
                <motion.circle
                  cx={svalbardZone.labelPosition.x}
                  cy={svalbardZone.labelPosition.y + 18}
                  r={3}
                  fill={svalbardZone.color}
                  initial={{ opacity: 0.8, r: 3 }}
                  animate={{ opacity: [0.8, 0.3, 0.8], r: [3, 6, 3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </g>
          );
        })()}
      </g>

      {/* Dashed line connecting Svalbard inset to mainland */}
      <line
        x1={110}
        y1={30}
        x2={220}
        y2={90}
        stroke="white"
        strokeWidth={0.5}
        strokeOpacity={0.15}
        strokeDasharray="4 6"
      />

      {/* Norway mainland outline */}
      <path
        d={norwayOutline}
        fill="white"
        fillOpacity={0.05}
        stroke="white"
        strokeWidth={1}
        strokeOpacity={0.2}
      />

      {/* Interactive mainland zone regions */}
      {mainlandZones.map((zone) => {
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

      {/* City markers */}
      {cityMarkers.map((city) => (
        <g key={city.name} className="pointer-events-none">
          <circle
            cx={city.x}
            cy={city.y}
            r={2.5}
            fill="white"
            fillOpacity={0.6}
          />
          <text
            x={city.x + 6}
            y={city.y + 1}
            fill="white"
            fillOpacity={0.4}
            fontSize={8}
            fontWeight={500}
            dominantBaseline="central"
          >
            {city.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
