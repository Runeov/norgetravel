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
  boatRoutePoints,
  boatRoutePath,
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
  const boatZone = mapZones.find((z) => z.id === 'boat-routes');
  const polygonZones = mapZones.filter(
    (z) => z.id !== 'svalbard' && z.id !== 'cities' && z.id !== 'boat-routes'
  );

  const cityActive = hoveredZone === 'cities' || selectedZone === 'cities';
  const boatActive = hoveredZone === 'boat-routes' || selectedZone === 'boat-routes';

  // Sort polygon zones so the active one renders last (SVG z-ordering)
  const sortedPolygonZones = [...polygonZones].sort((a, b) => {
    const aActive = hoveredZone === a.id || selectedZone === a.id;
    const bActive = hoveredZone === b.id || selectedZone === b.id;
    if (aActive && !bActive) return 1;
    if (!aActive && bActive) return -1;
    return 0;
  });

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
            <motion.g
              animate={{ scale: isActive ? 1.5 : 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ transformOrigin: `${svalbardZone.labelPosition.x}px ${svalbardZone.labelPosition.y}px` }}
            >
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
                fontSize={28}
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
            </motion.g>
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

      {/* Polygon-based zones (Northern Norway, Lofoten, Fjords) — active zone renders last for z-ordering */}
      {sortedPolygonZones.map((zone) => {
        const isHovered = hoveredZone === zone.id;
        const isSelected = selectedZone === zone.id;
        const isActive = isHovered || isSelected;

        return (
          <motion.g
            key={zone.id}
            animate={{ scale: isActive ? 1.5 : 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ transformOrigin: `${zone.labelPosition.x}px ${zone.labelPosition.y}px` }}
          >
            <motion.path
              d={zone.svgPath}
              fill={zone.color}
              initial={{ fillOpacity: 0.15 }}
              animate={{
                fillOpacity: isSelected ? 0.5 : isHovered ? 0.35 : 0.15,
              }}
              transition={{ duration: 0.2 }}
              stroke={zone.color}
              strokeWidth={isActive ? 2 : 1}
              strokeOpacity={isActive ? 0.8 : 0.3}
              filter={isSelected ? 'url(#zone-glow)' : undefined}
              className="cursor-pointer"
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
              fontSize={zone.id === 'lofoten' ? 14 : 18}
              fontWeight={600}
              letterSpacing={0.5}
              animate={{ opacity: isActive ? 1 : 0.6 }}
              transition={{ duration: 0.2 }}
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
          </motion.g>
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
                  y={city.y - 28}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize={12}
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
            fontSize={18}
            fontWeight={600}
            letterSpacing={0.5}
            animate={{ opacity: cityActive ? 1 : 0.4 }}
            transition={{ duration: 0.2 }}
          >
            {cityZone.name}
          </motion.text>
        </g>
      )}

      {/* Boat Routes — icon toggles route visibility on click */}
      {boatZone && (
        <g>
          {/* Route line + port markers — only visible when selected */}
          {boatActive && (
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              {/* Route line */}
              <motion.path
                d={boatRoutePath}
                fill="none"
                stroke={boatZone.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6 5"
                strokeWidth={2.5}
                strokeOpacity={0.9}
                className="pointer-events-none"
              />

              {/* Port markers */}
              {boatRoutePoints.map((port) => (
                <g key={port.name} className="pointer-events-none">
                  <circle
                    cx={port.x}
                    cy={port.y}
                    r={4}
                    fill={boatZone.color}
                    fillOpacity={0.95}
                    stroke="white"
                    strokeWidth={1}
                    strokeOpacity={0.6}
                  />
                  <text
                    x={port.x + 7}
                    y={port.y + 1}
                    fill={boatZone.color}
                    fillOpacity={0.85}
                    fontSize={9}
                    fontWeight={600}
                    dominantBaseline="central"
                    className="select-none"
                  >
                    {port.name}
                  </text>
                </g>
              ))}

              {/* Route label */}
              <text
                x={boatZone.labelPosition.x}
                y={boatZone.labelPosition.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="pointer-events-none select-none"
                fill={boatZone.color}
                fontSize={13}
                fontWeight={600}
                letterSpacing={0.4}
                opacity={1}
              >
                {boatZone.name}
              </text>
            </motion.g>
          )}

          {/* Boat icon — always visible, click to toggle route */}
          <g
            className="cursor-pointer"
            onClick={() => onSelect('boat-routes')}
            onMouseEnter={() => onHover('boat-routes')}
            onMouseLeave={() => onHover(null)}
            role="button"
            tabIndex={0}
            aria-label={boatZone.name}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect('boat-routes'); }
            }}
          >
            {/* Hit area */}
            <circle
              cx={55}
              cy={530}
              r={28}
              fill="transparent"
            />

            {/* Glow ring */}
            <motion.circle
              cx={55}
              cy={530}
              r={22}
              fill={boatZone.color}
              stroke={boatZone.color}
              strokeWidth={boatActive ? 2 : 1}
              animate={{
                fillOpacity: boatActive ? 0.25 : 0.08,
                strokeOpacity: boatActive ? 0.7 : 0.25,
              }}
              transition={{ duration: 0.2 }}
              filter={boatActive ? 'url(#city-glow)' : undefined}
            />

            {/* Boat SVG icon (simplified ship silhouette) */}
            <motion.g
              transform="translate(43, 518) scale(1)"
              animate={{ opacity: boatActive ? 1 : 0.7 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none"
            >
              {/* Hull */}
              <path
                d="M2,18 L4,22 L20,22 L22,18 Z"
                fill={boatZone.color}
                fillOpacity={0.9}
              />
              {/* Cabin */}
              <rect x={7} y={12} width={10} height={6} rx={1} fill={boatZone.color} fillOpacity={0.8} />
              {/* Funnel */}
              <rect x={11} y={6} width={3} height={6} rx={0.5} fill={boatZone.color} fillOpacity={0.7} />
              {/* Smoke */}
              <motion.circle
                cx={12.5}
                cy={4}
                r={1.5}
                fill={boatZone.color}
                animate={{ opacity: [0.4, 0.15, 0.4], cy: [4, 1, 4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.g>

            {/* Label below icon */}
            <motion.text
              x={55}
              y={557}
              textAnchor="middle"
              dominantBaseline="central"
              fill="white"
              fontSize={10}
              fontWeight={600}
              letterSpacing={0.3}
              className="pointer-events-none select-none"
              animate={{ opacity: boatActive ? 1 : 0.5 }}
              transition={{ duration: 0.2 }}
            >
              Boat Routes
            </motion.text>

            {/* Pulsing ring when selected */}
            {selectedZone === 'boat-routes' && (
              <motion.circle
                cx={55}
                cy={530}
                r={22}
                fill="none"
                stroke={boatZone.color}
                strokeWidth={1}
                initial={{ opacity: 0.6, r: 22 }}
                animate={{ opacity: [0.6, 0, 0.6], r: [22, 32, 22] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
          </g>
        </g>
      )}

      {/* Reference markers (Northern Norway cities) */}
      {referenceMarkers.map((city) => (
        <g key={city.name} className="pointer-events-none">
          <circle cx={city.x} cy={city.y} r={3} fill="white" fillOpacity={0.6} />
          <text
            x={city.x + 8}
            y={city.y + 1}
            fill="white"
            fillOpacity={0.5}
            fontSize={12}
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
