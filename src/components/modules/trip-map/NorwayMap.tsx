'use client';

import { motion } from 'framer-motion';
import {
  norwayOutline,
  svalbardSpitsbergen,
  svalbardNordaustlandet,
  svalbardEdgeoya,
  referenceMarkers,
  cityZonePositions,
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
  const cityZone = mapZones.find((z) => z.id === 'cities');
  const polygonZones = mapZones.filter((z) => z.id !== 'svalbard' && z.id !== 'cities');

  const cityActive = hoveredZone === 'cities' || selectedZone === 'cities';

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
        <filter id="city-glow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Svalbard inset — scaled and positioned above mainland */}
      <g transform="translate(30, -110) scale(0.55)">
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

        {/* Svalbard island outlines */}
        <path d={svalbardSpitsbergen} fill="white" fillOpacity={0.05} stroke="white" strokeWidth={1} strokeOpacity={0.2} />
        <path d={svalbardNordaustlandet} fill="white" fillOpacity={0.05} stroke="white" strokeWidth={1} strokeOpacity={0.2} />
        <path d={svalbardEdgeoya} fill="white" fillOpacity={0.05} stroke="white" strokeWidth={1} strokeOpacity={0.2} />

        {/* Svalbard interactive zone */}
        {svalbardZone && (() => {
          const isHovered = hoveredZone === svalbardZone.id;
          const isSelected = selectedZone === svalbardZone.id;
          const isActive = isHovered || isSelected;

          return (
            <g>
              {[svalbardSpitsbergen, svalbardNordaustlandet, svalbardEdgeoya].map((path, i) => (
                <motion.path
                  key={i}
                  d={path}
                  fill={svalbardZone.color}
                  initial={{ fillOpacity: 0.15 }}
                  animate={{ fillOpacity: isSelected ? 0.5 : isHovered ? 0.35 : 0.15 }}
                  transition={{ duration: 0.2 }}
                  stroke={svalbardZone.color}
                  strokeWidth={isActive ? 2 : 1}
                  strokeOpacity={isActive ? 0.8 : 0.3}
                  filter={isSelected ? 'url(#zone-glow)' : undefined}
                  className="cursor-pointer"
                  onMouseEnter={() => onHover(svalbardZone.id)}
                  onMouseLeave={() => onHover(null)}
                  onClick={() => onSelect(svalbardZone.id)}
                  {...(i === 0 ? {
                    role: 'button' as const,
                    tabIndex: 0,
                    'aria-label': svalbardZone.name,
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(svalbardZone.id); }
                    },
                  } : {})}
                />
              ))}

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
                animate={{ opacity: isActive ? 1 : 0.6, scale: isActive ? 3 : 1 }}
                transition={{ duration: 0.2 }}
                style={{ transformOrigin: `${svalbardZone.labelPosition.x}px ${svalbardZone.labelPosition.y}px` }}
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

      {/* Polygon-based zones (Northern Norway, Lofoten, Fjords) */}
      {polygonZones.map((zone) => {
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
              animate={{ opacity: isActive ? 1 : 0.6, scale: isActive ? 3 : 1 }}
              transition={{ duration: 0.2 }}
              style={{ transformOrigin: `${zone.labelPosition.x}px ${zone.labelPosition.y}px` }}
            >
              {zone.name}
            </motion.text>

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

      {/* City Norway zone — interactive dot markers with connecting lines */}
      {cityZone && (
        <g>
          {/* Connecting lines between cities */}
          {cityZonePositions.map((city, i) => {
            const next = cityZonePositions[(i + 1) % cityZonePositions.length];
            return (
              <motion.line
                key={`city-line-${i}`}
                x1={city.x}
                y1={city.y}
                x2={next.x}
                y2={next.y}
                stroke="white"
                strokeWidth={0.8}
                strokeDasharray="3 5"
                animate={{ strokeOpacity: cityActive ? 0.4 : 0.08 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-none"
              />
            );
          })}

          {/* City dots */}
          {cityZonePositions.map((city, i) => {
            const isSelected = selectedZone === 'cities';
            return (
              <g key={city.name}>
                {/* Outer glow ring */}
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r={18}
                  fill="white"
                  stroke="white"
                  strokeWidth={cityActive ? 1.5 : 0.5}
                  animate={{
                    fillOpacity: isSelected ? 0.2 : cityActive ? 0.12 : 0.04,
                    strokeOpacity: cityActive ? 0.5 : 0.15,
                  }}
                  transition={{ duration: 0.2 }}
                  filter={isSelected ? 'url(#city-glow)' : undefined}
                  className="cursor-pointer"
                  onMouseEnter={() => onHover('cities')}
                  onMouseLeave={() => onHover(null)}
                  onClick={() => onSelect('cities')}
                  {...(i === 0 ? {
                    role: 'button' as const,
                    tabIndex: 0,
                    'aria-label': cityZone.name,
                    onKeyDown: (e: React.KeyboardEvent) => {
                      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect('cities'); }
                    },
                  } : {})}
                />

                {/* Inner dot */}
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r={4}
                  fill="white"
                  animate={{ fillOpacity: cityActive ? 0.9 : 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="pointer-events-none"
                />

                {/* City name label */}
                <motion.text
                  x={city.x}
                  y={city.y - 24}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize={8}
                  fontWeight={600}
                  letterSpacing={0.3}
                  className="pointer-events-none select-none"
                  animate={{ opacity: cityActive ? 0.9 : 0.35 }}
                  transition={{ duration: 0.2 }}
                >
                  {city.name}
                </motion.text>

                {/* Pulsing ring on selected */}
                {isSelected && (
                  <motion.circle
                    cx={city.x}
                    cy={city.y}
                    r={4}
                    fill="none"
                    stroke="white"
                    strokeWidth={1}
                    initial={{ opacity: 0.6, r: 4 }}
                    animate={{ opacity: [0.6, 0, 0.6], r: [4, 22, 4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: i * 0.3 }}
                  />
                )}
              </g>
            );
          })}

          {/* Zone label — "City Norway" */}
          <motion.text
            x={cityZone.labelPosition.x}
            y={cityZone.labelPosition.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="pointer-events-none select-none"
            fill="white"
            fontSize={11}
            fontWeight={600}
            letterSpacing={0.5}
            animate={{ opacity: cityActive ? 1 : 0.4, scale: cityActive ? 3 : 1 }}
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: `${cityZone.labelPosition.x}px ${cityZone.labelPosition.y}px` }}
          >
            {cityZone.name}
          </motion.text>
        </g>
      )}

      {/* Reference markers (Northern Norway cities) */}
      {referenceMarkers.map((city) => (
        <g key={city.name} className="pointer-events-none">
          <circle cx={city.x} cy={city.y} r={2.5} fill="white" fillOpacity={0.6} />
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
