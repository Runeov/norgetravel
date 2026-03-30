export interface MapZone {
  id: string;
  name: string;
  tagline: string;
  description: string;
  svgPath: string;
  labelPosition: { x: number; y: number };
  href: string;
  color: string;
  stats: { label: string; value: string }[];
  highlights: string[];
}

// Simplified SVG outline of mainland Norway
export const norwayOutline =
  'M 180 880 L 160 840 L 140 800 L 130 760 L 120 720 L 115 680 L 118 640 L 125 600 L 110 560 L 100 520 L 85 480 L 75 440 L 70 400 L 80 360 L 90 320 L 85 280 L 95 240 L 110 200 L 130 170 L 160 150 L 200 140 L 230 120 L 250 100 L 260 80 L 250 60 L 230 50 L 260 40 L 290 35 L 310 45 L 320 60 L 310 80 L 300 100 L 290 130 L 280 160 L 270 200 L 260 240 L 265 280 L 270 320 L 275 360 L 270 400 L 260 440 L 255 480 L 250 520 L 245 560 L 240 600 L 235 640 L 225 680 L 220 720 L 210 760 L 200 800 L 190 840 Z';

// Svalbard archipelago outline (rendered as inset)
export const svalbardOutline =
  'M 60 30 L 80 20 L 110 15 L 130 20 L 140 35 L 145 55 L 140 75 L 125 90 L 105 95 L 85 90 L 70 80 L 58 60 L 55 45 Z';

// Four interactive destination zones
export const mapZones: MapZone[] = [
  {
    id: 'northern-norway',
    name: 'Northern Norway',
    tagline: 'Aurora capital of the world',
    description:
      '3,500 km of Arctic coastline stretching from Bodø at 67°N to the Russian border. Tromsø sits inside the auroral oval — on a G2+ storm night, the sky turns green from horizon to horizon.',
    svgPath:
      'M 230 50 L 260 40 L 290 35 L 310 45 L 320 60 L 310 80 L 300 100 L 290 130 L 280 160 L 270 200 L 260 240 L 265 260 L 200 270 L 160 250 L 130 230 L 110 200 L 130 170 L 160 150 L 200 140 L 230 120 L 250 100 L 260 80 L 250 60 Z',
    labelPosition: { x: 240, y: 160 },
    href: '/destinations/northern-norway',
    color: '#00CC6A',
    stats: [
      { label: 'Aurora season', value: 'Oct – Mar' },
      { label: 'Midnight sun', value: 'May – Jul' },
      { label: 'Latitude', value: '67°N – 71°N' },
      { label: 'Top base', value: 'Tromsø' },
    ],
    highlights: ['Northern Lights', 'Tromsø', 'Midnight Sun', 'Dog Sledding'],
  },
  {
    id: 'lofoten',
    name: 'Lofoten Islands',
    tagline: 'Mountains straight out of the sea',
    description:
      '170 km of jagged granite peaks rising 1,000m directly from the Norwegian Sea. Red rorbuer, stockfish racks, and the E10 — one road in, one road out. 800,000 visitors in summer, 24,000 residents year-round.',
    svgPath:
      'M 100 200 L 120 185 L 140 175 L 155 180 L 150 200 L 135 215 L 115 225 L 95 220 Z',
    labelPosition: { x: 95, y: 180 },
    href: '/destinations/lofoten',
    color: '#5CBFEE',
    stats: [
      { label: 'Best trekking', value: 'Jun – Sep' },
      { label: 'Skrei season', value: 'Jan – Apr' },
      { label: 'Peak length', value: '170 km' },
      { label: 'Top trail', value: 'Reinebringen' },
    ],
    highlights: ['Reinebringen', 'Rorbu Cabins', 'Sea Kayaking', 'Stockfish'],
  },
  {
    id: 'fjords',
    name: 'Norwegian Fjords',
    tagline: 'Two UNESCO sites, zero-emission from 2026',
    description:
      'Geirangerfjord and Nærøyfjord carry UNESCO World Heritage status. From January 2026, all vessels must meet zero-emission standards. Hurtigruten and Havila Voyages are fully compliant — book with confidence.',
    svgPath:
      'M 70 400 L 80 360 L 90 320 L 100 310 L 130 320 L 150 350 L 155 390 L 150 430 L 130 460 L 100 470 L 80 450 L 75 430 Z',
    labelPosition: { x: 80, y: 390 },
    href: '/destinations/fjords',
    color: '#5CBFEE',
    stats: [
      { label: 'UNESCO fjords', value: '2' },
      { label: 'Best cruise', value: 'May – Sep' },
      { label: 'Electric ferries', value: 'From 2026' },
      { label: 'Top port', value: 'Bergen' },
    ],
    highlights: ['Geirangerfjord', 'Nærøyfjord', 'Electric Cruises', 'Trollstigen'],
  },
  {
    id: 'svalbard',
    name: 'Svalbard',
    tagline: '78°N — the far Arctic',
    description:
      'Polar bears outnumber people 3:1. A direct 3-hour flight from Oslo lands you in Longyearbyen — the world\'s northernmost town with a permanent population. Four months of polar night, four of midnight sun.',
    svgPath: svalbardOutline,
    labelPosition: { x: 100, y: 55 },
    href: '/destinations/svalbard',
    color: '#00CC6A',
    stats: [
      { label: 'Latitude', value: '78°N' },
      { label: 'Polar night', value: 'Nov – Feb' },
      { label: 'Polar bears', value: '~3,000' },
      { label: 'Population', value: '~2,400' },
    ],
    highlights: ['Polar Bears', 'Glacier Hiking', 'Dog Sled Aurora', 'Snowmobile'],
  },
];
