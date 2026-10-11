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
  mapCallouts,
  boatRoutePoints,
  boatRoutePath,
} from '@/data/norway-map-zones';
import type { MapCallout, MapZone } from '@/data/norway-map-zones';

interface NorwayMapProps {
  hoveredZone: string | null;
  selectedZone: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  /** Sizing classes for the svg. The default fits the planner panel. */
  className?: string;
}

// Sizes are viewBox units. The map renders at 0.6 to 0.8 screen px per unit,
// so 24 units is 15 to 19 px: the floor for a label read on a phone outdoors.
const FONT = {
  zone: 24,
  zoneLineHeight: 26,
  svalbard: 40, // inside a 0.55 scaled group, so 22 units on the page
  city: 18,
  marker: 18,
  port: 13,
  callout: 20,
};

const DEFAULT_CLASS = 'w-full h-auto max-h-[75vh] lg:h-full lg:max-h-[80vh]';

function keyActivate(fn: () => void) {
  return (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fn();
    }
  };
}

/* ── Callout icons, drawn for a 40 unit radius and scaled to fit ─────────── */
function CalloutIcon({ icon, cx, cy, r, color }: { icon: MapCallout['icon']; cx: number; cy: number; r: number; color: string }) {
  const transform = `translate(${cx}, ${cy}) scale(${r / 40})`;

  if (icon === 'mountain') {
    return (
      <g transform={transform} className="pointer-events-none">
        <path d="M-26,14 L-10,-12 L-2,0 L8,-18 L26,14 Z" fill={color} fillOpacity={0.9} />
        <path d="M8,-18 L12,-11 L8,-8 L4,-11 Z" fill="white" fillOpacity={0.9} />
        <path d="M-10,-12 L-7,-7 L-10,-4 L-13,-7 Z" fill="white" fillOpacity={0.9} />
      </g>
    );
  }

  if (icon === 'city') {
    return (
      <g transform={transform} className="pointer-events-none">
        <rect x={-24} y={-4} width={14} height={20} rx={1} fill={color} fillOpacity={0.85} />
        <rect x={-7} y={-18} width={14} height={34} rx={1} fill={color} fillOpacity={0.95} />
        <rect x={10} y={2} width={14} height={14} rx={1} fill={color} fillOpacity={0.75} />
        <rect x={-3} y={-12} width={3} height={3} fill="#1B3A5C" />
        <rect x={2} y={-12} width={3} height={3} fill="#1B3A5C" />
        <rect x={-3} y={-5} width={3} height={3} fill="#1B3A5C" />
        <rect x={2} y={-5} width={3} height={3} fill="#1B3A5C" />
      </g>
    );
  }

  return (
    <g transform={transform} className="pointer-events-none">
      <path d="M-22,8 L-17,18 L17,18 L22,8 Z" fill={color} fillOpacity={0.95} />
      <rect x={-11} y={-4} width={22} height={12} rx={1.5} fill={color} fillOpacity={0.85} />
      <rect x={-3} y={-16} width={6} height={12} rx={1} fill={color} fillOpacity={0.75} />
      <motion.circle
        cx={0}
        r={2.5}
        fill={color}
        initial={{ opacity: 0.5, cy: -20 }}
        animate={{ opacity: [0.5, 0.15, 0.5], cy: [-20, -26, -20] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </g>
  );
}

/* ── Pull-out callout: a big circle at sea with a leader line to its place ── */
function Callout({
  callout,
  zone,
  hovered,
  selected,
  onHover,
  onSelect,
}: {
  callout: MapCallout;
  zone: MapZone;
  hovered: boolean;
  selected: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const { cx, cy, r, leaderTo, lines, icon } = callout;
  const active = hovered || selected;
  const dx = leaderTo.x - cx;
  const dy = leaderTo.y - cy;
  const length = Math.hypot(dx, dy) || 1;
  const startX = cx + (dx / length) * r;
  const startY = cy + (dy / length) * r;
  const labelTop = cy + r + 5;
  const labelHeight = lines.length * (FONT.callout + 3);

  return (
    <g>
      <motion.line
        x1={startX}
        y1={startY}
        x2={leaderTo.x}
        y2={leaderTo.y}
        stroke={zone.color}
        strokeWidth={1.5}
        strokeDasharray="5 4"
        animate={{ strokeOpacity: active ? 0.9 : 0.4 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none"
      />
      <motion.circle
        cx={leaderTo.x}
        cy={leaderTo.y}
        r={3.5}
        fill={zone.color}
        animate={{ fillOpacity: active ? 1 : 0.6 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none"
      />

      <g
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={zone.name}
        aria-pressed={selected}
        onClick={() => onSelect(zone.id)}
        onMouseEnter={() => onHover(zone.id)}
        onMouseLeave={() => onHover(null)}
        onKeyDown={keyActivate(() => onSelect(zone.id))}
      >
        {/* Hit area covers the circle and its label */}
        <rect x={cx - r - 6} y={cy - r - 6} width={2 * r + 12} height={2 * r + 12 + labelHeight} fill="transparent" />

        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill={zone.color}
          stroke={zone.color}
          strokeWidth={active ? 2.5 : 1.5}
          animate={{
            fillOpacity: selected ? 0.35 : hovered ? 0.24 : 0.14,
            strokeOpacity: active ? 0.95 : 0.55,
          }}
          transition={{ duration: 0.2 }}
          filter={selected ? 'url(#city-glow)' : undefined}
        />

        <CalloutIcon icon={icon} cx={cx} cy={cy} r={r} color={zone.color} />

        <motion.text
          x={cx}
          y={labelTop}
          textAnchor="middle"
          dominantBaseline="hanging"
          fill="white"
          fontSize={FONT.callout}
          fontWeight={700}
          letterSpacing={0.3}
          className="pointer-events-none select-none"
          animate={{ opacity: active ? 1 : 0.85 }}
          transition={{ duration: 0.2 }}
        >
          {lines.map((line, i) => (
            <tspan key={line} x={cx} dy={i === 0 ? 0 : FONT.callout + 3}>
              {line}
            </tspan>
          ))}
        </motion.text>

        {selected && (
          <motion.circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={zone.color}
            strokeWidth={1.5}
            initial={{ opacity: 0.7, r }}
            animate={{ opacity: [0.7, 0, 0.7], r: [r, r + 14, r] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </g>
    </g>
  );
}

export function NorwayMap({ hoveredZone, selectedZone, onHover, onSelect, className }: NorwayMapProps) {
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
      className={className ?? DEFAULT_CLASS}
      role="group"
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

      {/* Svalbard inset, scaled and positioned above the mainland */}
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

        <path d={svalbardSpitsbergen} fill="white" fillOpacity={0.05} stroke="white" strokeWidth={1} strokeOpacity={0.2} />
        <path d={svalbardNordaustlandet} fill="white" fillOpacity={0.05} stroke="white" strokeWidth={1} strokeOpacity={0.2} />
        <path d={svalbardEdgeoya} fill="white" fillOpacity={0.05} stroke="white" strokeWidth={1} strokeOpacity={0.2} />

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
                    onKeyDown: keyActivate(() => onSelect(svalbardZone.id)),
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
                fontSize={FONT.svalbard}
                fontWeight={600}
                letterSpacing={0.5}
                animate={{ opacity: isActive ? 1 : 0.7 }}
                transition={{ duration: 0.2 }}
              >
                {svalbardZone.name}
              </motion.text>

              {isSelected && (
                <motion.circle
                  cx={svalbardZone.labelPosition.x}
                  cy={svalbardZone.labelPosition.y + 26}
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

      {/* Dashed line connecting the Svalbard inset to the mainland */}
      <line x1={110} y1={30} x2={220} y2={90} stroke="white" strokeWidth={0.5} strokeOpacity={0.15} strokeDasharray="4 6" />

      {/* Norway mainland outline */}
      <path d={norwayOutline} fill="white" fillOpacity={0.05} stroke="white" strokeWidth={1} strokeOpacity={0.2} />

      {/* Polygon zones (Northern Norway, Lofoten, Fjords). The active zone renders last. */}
      {sortedPolygonZones.map((zone) => {
        const isHovered = hoveredZone === zone.id;
        const isSelected = selectedZone === zone.id;
        const isActive = isHovered || isSelected;
        const hasCallout = Boolean(mapCallouts[zone.id]);
        const lines = zone.labelLines ?? [zone.name];

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
              initial={{ fillOpacity: hasCallout ? 0.25 : 0.15 }}
              animate={{
                fillOpacity: isSelected ? 0.5 : isHovered ? 0.35 : hasCallout ? 0.25 : 0.15,
              }}
              transition={{ duration: 0.2 }}
              stroke={zone.color}
              strokeWidth={isActive ? 2 : hasCallout ? 1.5 : 1}
              strokeOpacity={isActive ? 0.8 : hasCallout ? 0.55 : 0.3}
              filter={isSelected ? 'url(#zone-glow)' : undefined}
              className="cursor-pointer"
              onMouseEnter={() => onHover(zone.id)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onSelect(zone.id)}
              role="button"
              tabIndex={0}
              aria-label={zone.name}
              onKeyDown={keyActivate(() => onSelect(zone.id))}
            />

            {/* Zones with a callout carry their label there instead */}
            {!hasCallout && (
              <motion.text
                x={zone.labelPosition.x}
                y={zone.labelPosition.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="pointer-events-none select-none"
                fill="white"
                fontSize={FONT.zone}
                fontWeight={600}
                letterSpacing={0.5}
                animate={{ opacity: isActive ? 1 : 0.7 }}
                transition={{ duration: 0.2 }}
              >
                {lines.map((line, i) => (
                  <tspan
                    key={line}
                    x={zone.labelPosition.x}
                    dy={i === 0 ? (-(lines.length - 1) * FONT.zoneLineHeight) / 2 : FONT.zoneLineHeight}
                  >
                    {line}
                  </tspan>
                ))}
              </motion.text>
            )}

            {isSelected && !hasCallout && (
              <motion.circle
                cx={zone.labelPosition.x}
                cy={zone.labelPosition.y + (lines.length * FONT.zoneLineHeight) / 2 + 6}
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

      {/* City Norway: dot markers joined by dashed lines; the label sits in its callout */}
      {cityZone && (
        <g>
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

          {cityZonePositions.map((city, i) => {
            const isSelected = selectedZone === 'cities';
            return (
              <g key={city.name}>
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
                    onKeyDown: keyActivate(() => onSelect('cities')),
                  } : {})}
                />

                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r={4}
                  fill="white"
                  animate={{ fillOpacity: cityActive ? 0.9 : 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="pointer-events-none"
                />

                <motion.text
                  x={city.x}
                  y={city.y - 28}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize={FONT.city}
                  fontWeight={600}
                  letterSpacing={0.3}
                  className="pointer-events-none select-none"
                  animate={{ opacity: cityActive ? 0.95 : 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  {city.name}
                </motion.text>

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
        </g>
      )}

      {/* Boat routes: the coastal line and its ports appear while the zone is active */}
      {boatZone && boatActive && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
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

          {boatRoutePoints.map((port) => {
            // Ports that are also city dots already carry a name on the map
            const namedElsewhere = cityZonePositions.some((city) => city.name === port.name)
              || referenceMarkers.some((marker) => marker.name === port.name);
            return (
              <g key={port.name} className="pointer-events-none">
                <circle cx={port.x} cy={port.y} r={4} fill={boatZone.color} fillOpacity={0.95} stroke="white" strokeWidth={1} strokeOpacity={0.6} />
                {!namedElsewhere && (
                  <text
                    x={port.x + 7}
                    y={port.y + 1}
                    fill={boatZone.color}
                    fillOpacity={0.9}
                    fontSize={FONT.port}
                    fontWeight={600}
                    dominantBaseline="central"
                    className="select-none"
                  >
                    {port.name}
                  </text>
                )}
              </g>
            );
          })}
        </motion.g>
      )}

      {/* Pull-out callouts for Lofoten, the boat routes and the cities */}
      {Object.values(mapCallouts).map((callout) => {
        const zone = mapZones.find((z) => z.id === callout.zoneId);
        if (!zone) return null;
        return (
          <Callout
            key={callout.zoneId}
            callout={callout}
            zone={zone}
            hovered={hoveredZone === zone.id}
            selected={selectedZone === zone.id}
            onHover={onHover}
            onSelect={onSelect}
          />
        );
      })}

      {/* Reference markers (Northern Norway cities) */}
      {referenceMarkers.map((city) => (
        <g key={city.name} className="pointer-events-none">
          <circle cx={city.x} cy={city.y} r={3} fill="white" fillOpacity={0.6} />
          <text
            x={city.x + 8}
            y={city.y + 1}
            fill="white"
            fillOpacity={0.6}
            fontSize={FONT.marker}
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
