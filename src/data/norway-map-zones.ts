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

// Realistic mainland Norway outline — 143 points from Natural Earth 50m data
// ViewBox: 0 0 400 800 (lon 4.5–31.5 → x, lat 71.5–57.5 → y)
export const norwayOutline =
  'M362.5,141.6 L366.5,120.3 L346.5,82.2 L332.4,89.8 L318.7,105.6 L313.3,147.5 L302.8,166.1 L286.7,153.9 L271.3,160.3 L256.6,134.0 L245.2,132.2 L236.9,141.0 L231.8,165.3 L218.7,173.4 L202.2,173.3 L190.0,194.1 L173.2,228.3 L173.9,258.5 L156.1,304.7 L148.9,334.5 L138.9,399.2 L140.2,427.8 L120.9,432.0 L113.3,481.0 L112.8,509.0 L118.3,567.3 L121.9,593.8 L117.7,617.7 L117.1,654.9 L108.7,674.4 L105.8,718.5 L97.6,706.2 L90.9,679.9 L87.5,688.2 L82.7,712.6 L77.0,713.7 L70.2,729.2 L52.4,763.0 L35.5,764.5 L31.0,765.9 L29.5,756.6 L15.1,724.4 L27.6,714.2 L21.8,703.6 L28.2,682.2 L15.8,697.6 L11.9,677.6 L22.1,671.7 L18.2,665.0 L27.4,637.0 L33.9,631.2 L21.7,645.4 L12.6,670.9 L9.2,666.6 L14.7,653.1 L9.4,631.7 L9.1,620.8 L11.7,597.3 L35.6,594.2 L45.1,589.9 L41.1,583.8 L31.3,586.9 L17.0,591.6 L10.0,573.9 L6.3,559.4 L22.5,555.0 L14.4,546.0 L12.7,534.2 L21.9,519.6 L29.0,517.3 L27.5,507.9 L45.5,511.5 L53.3,501.0 L33.1,501.7 L46.7,479.5 L60.9,492.5 L61.3,466.2 L60.4,451.4 L69.0,459.5 L80.5,458.4 L91.9,459.2 L98.0,444.6 L100.7,431.5 L95.8,434.2 L79.0,450.5 L79.5,433.3 L97.6,393.5 L100.7,385.4 L118.6,365.7 L116.5,360.4 L115.2,339.0 L125.6,313.2 L141.2,297.3 L126.9,289.7 L135.1,268.9 L137.9,259.4 L149.6,247.2 L147.8,242.5 L157.3,225.4 L165.8,227.3 L160.7,215.2 L156.3,202.5 L160.8,199.8 L170.9,187.5 L175.9,196.5 L179.5,176.8 L193.6,174.4 L178.0,169.6 L193.3,142.8 L203.8,116.0 L211.1,121.2 L214.9,109.3 L224.3,114.1 L232.9,89.9 L230.3,122.5 L239.4,109.4 L244.9,92.1 L258.9,95.2 L252.4,71.0 L265.5,66.4 L277.9,86.1 L283.9,62.9 L292.9,41.6 L306.2,35.9 L314.3,36.0 L305.9,67.2 L318.3,50.0 L328.1,49.4 L334.4,50.9 L336.8,31.6 L353.8,36.0 L352.2,47.5 L352.7,60.4 L366.2,38.3 L377.2,46.0 L391.5,62.8 L360.1,80.4 L374.7,101.3 L383.7,101.0 L391.4,108.2 L380.4,106.5 L377.7,120.4 L362.5,141.6Z';

// Svalbard — three separate islands (own coordinate space, rendered as inset)
export const svalbardSpitsbergen =
  'M113.1,37.1 L126.3,38.5 L128.9,63.7 L143.0,58.0 L145.3,76.2 L162.5,84.6 L179.5,90.1 L187.4,112.5 L160.3,121.1 L149.9,151.2 L140.1,169.1 L124.0,204.7 L116.3,232.5 L104.0,237.4 L72.8,204.1 L67.9,183.5 L110.3,168.8 L97.1,165.8 L66.0,169.0 L63.7,150.9 L92.0,141.7 L112.9,134.3 L107.5,124.8 L94.7,126.8 L89.9,111.2 L80.6,114.7 L75.3,120.0 L70.6,136.9 L47.0,134.3 L29.6,111.5 L25.8,94.8 L34.1,94.8 L33.0,75.5 L18.5,79.2 L12.3,57.4 L14.4,44.0 L35.0,47.7 L45.9,45.3 L63.0,49.0 L60.0,65.2 L66.9,63.6 L84.2,51.5 L105.7,95.2 L97.4,47.9 L108.7,30.0 L113.1,37.1Z';

export const svalbardNordaustlandet =
  'M181.6,15.6 L194.9,21.3 L206.3,25.6 L209.1,5.2 L220.9,3.3 L222.6,20.1 L237.2,12.3 L243.6,13.4 L261.1,18.1 L283.6,23.4 L266.8,55.2 L252.4,72.6 L235.5,80.3 L211.6,73.2 L179.3,66.2 L162.4,55.1 L176.1,50.6 L165.0,47.2 L140.5,42.2 L145.4,31.5 L134.8,20.6 L159.0,21.0 L154.4,10.3 L163.5,10.8 L164.2,1.8 L181.6,15.6Z';

export const svalbardEdgeoya =
  'M193.5,119.0 L205.0,142.0 L222.5,144.6 L222.2,158.9 L248.4,171.5 L228.9,189.9 L215.0,199.3 L208.1,196.2 L210.3,184.4 L197.6,187.9 L187.5,174.3 L186.8,155.9 L176.0,130.0 L190.9,118.9 L193.5,119.0Z';

// City marker positions (mainland viewBox 0 0 400 800)
export const cityMarkers = [
  { name: 'Tromsø', x: 214.1, y: 105.8 },
  { name: 'Bodø', x: 146.7, y: 241.1 },
  { name: 'Trondheim', x: 87.3, y: 461.1 },
  { name: 'Bergen', x: 12.2, y: 634.7 },
  { name: 'Oslo', x: 92.6, y: 662.1 },
];

// Four interactive destination zones — polygons traced over the realistic outline
export const mapZones: MapZone[] = [
  {
    id: 'northern-norway',
    name: 'Northern Norway',
    tagline: 'Aurora capital of the world',
    description:
      '3,500 km of Arctic coastline stretching from Bodø at 67°N to the Russian border. Tromsø sits inside the auroral oval — on a G2+ storm night, the sky turns green from horizon to horizon.',
    svgPath:
      'M173.2,228.3 L190.0,194.1 L202.2,173.3 L218.7,173.4 L231.8,165.3 L236.9,141.0 L245.2,132.2 L256.6,134.0 L271.3,160.3 L286.7,153.9 L302.8,166.1 L313.3,147.5 L318.7,105.6 L332.4,89.8 L346.5,82.2 L366.5,120.3 L362.5,141.6 L377.7,120.4 L380.4,106.5 L391.4,108.2 L383.7,101.0 L374.7,101.3 L360.1,80.4 L391.5,62.8 L377.2,46.0 L366.2,38.3 L352.7,60.4 L352.2,47.5 L353.8,36.0 L336.8,31.6 L334.4,50.9 L328.1,49.4 L318.3,50.0 L305.9,67.2 L314.3,36.0 L306.2,35.9 L292.9,41.6 L283.9,62.9 L277.9,86.1 L265.5,66.4 L252.4,71.0 L258.9,95.2 L244.9,92.1 L239.4,109.4 L230.3,122.5 L232.9,89.9 L224.3,114.1 L214.9,109.3 L211.1,121.2 L203.8,116.0 L193.3,142.8 L178.0,169.6 L193.6,174.4 L179.5,176.8 L175.9,196.5 L170.9,187.5 L160.8,199.8 L156.3,202.5 L160.7,215.2 L165.8,227.3 L157.3,225.4 L147.8,242.5 L149.6,247.2 L156.1,304.7 L173.9,258.5 L173.2,228.3Z',
    labelPosition: { x: 290, y: 120 },
    href: '/destinations/northern-norway',
    color: '#00CC6A',
    stats: [
      { label: 'Aurora season', value: 'Oct \u2013 Mar' },
      { label: 'Midnight sun', value: 'May \u2013 Jul' },
      { label: 'Latitude', value: '67\u00B0N \u2013 71\u00B0N' },
      { label: 'Top base', value: 'Troms\u00F8' },
    ],
    highlights: ['Northern Lights', 'Troms\u00F8', 'Midnight Sun', 'Dog Sledding'],
  },
  {
    id: 'lofoten',
    name: 'Lofoten Islands',
    tagline: 'Mountains straight out of the sea',
    description:
      '170 km of jagged granite peaks rising 1,000m directly from the Norwegian Sea. Red rorbuer, stockfish racks, and the E10 \u2014 one road in, one road out. 800,000 visitors in summer, 24,000 residents year-round.',
    svgPath:
      'M120.9,170.0 L135.0,160.0 L155.0,165.0 L160.0,180.0 L155.0,200.0 L148.9,215.0 L138.0,230.0 L125.0,235.0 L115.0,225.0 L112.0,210.0 L110.0,195.0 L115.0,180.0 L120.9,170.0Z',
    labelPosition: { x: 120, y: 195 },
    href: '/destinations/lofoten',
    color: '#5CBFEE',
    stats: [
      { label: 'Best trekking', value: 'Jun \u2013 Sep' },
      { label: 'Skrei season', value: 'Jan \u2013 Apr' },
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
      'Geirangerfjord and N\u00E6r\u00F8yfjord carry UNESCO World Heritage status. From January 2026, all vessels must meet zero-emission standards. Hurtigruten and Havila Voyages are fully compliant \u2014 book with confidence.',
    svgPath:
      'M6.3,559.4 L10.0,573.9 L17.0,591.6 L31.3,586.9 L41.1,583.8 L45.1,589.9 L35.6,594.2 L11.7,597.3 L9.1,620.8 L9.4,631.7 L14.7,653.1 L9.2,666.6 L12.6,670.9 L21.7,645.4 L33.9,631.2 L27.4,637.0 L18.2,665.0 L22.1,671.7 L11.9,677.6 L15.8,697.6 L28.2,682.2 L21.8,703.6 L27.6,714.2 L15.1,724.4 L29.5,756.6 L31.0,765.9 L35.5,764.5 L52.4,763.0 L70.2,729.2 L77.0,713.7 L82.7,712.6 L87.5,688.2 L90.9,679.9 L97.6,706.2 L105.8,718.5 L108.7,674.4 L117.1,654.9 L117.7,617.7 L121.9,593.8 L118.3,567.3 L112.8,509.0 L113.3,481.0 L120.9,432.0 L140.2,427.8 L138.9,399.2 L148.9,334.5 L156.1,304.7 L149.6,247.2 L147.8,242.5 L137.9,259.4 L135.1,268.9 L126.9,289.7 L141.2,297.3 L125.6,313.2 L115.2,339.0 L116.5,360.4 L118.6,365.7 L100.7,385.4 L97.6,393.5 L79.5,433.3 L79.0,450.5 L95.8,434.2 L100.7,431.5 L98.0,444.6 L91.9,459.2 L80.5,458.4 L69.0,459.5 L60.4,451.4 L61.3,466.2 L60.9,492.5 L46.7,479.5 L33.1,501.7 L53.3,501.0 L45.5,511.5 L27.5,507.9 L29.0,517.3 L21.9,519.6 L12.7,534.2 L14.4,546.0 L22.5,555.0 L6.3,559.4Z',
    labelPosition: { x: 55, y: 580 },
    href: '/destinations/fjords',
    color: '#5CBFEE',
    stats: [
      { label: 'UNESCO fjords', value: '2' },
      { label: 'Best cruise', value: 'May \u2013 Sep' },
      { label: 'Electric ferries', value: 'From 2026' },
      { label: 'Top port', value: 'Bergen' },
    ],
    highlights: ['Geirangerfjord', 'N\u00E6r\u00F8yfjord', 'Electric Cruises', 'Trollstigen'],
  },
  {
    id: 'svalbard',
    name: 'Svalbard',
    tagline: '78\u00B0N \u2014 the far Arctic',
    description:
      'Polar bears outnumber people 3:1. A direct 3-hour flight from Oslo lands you in Longyearbyen \u2014 the world\'s northernmost town with a permanent population. Four months of polar night, four of midnight sun.',
    svgPath: svalbardSpitsbergen,
    labelPosition: { x: 100, y: 140 },
    href: '/destinations/svalbard',
    color: '#00CC6A',
    stats: [
      { label: 'Latitude', value: '78\u00B0N' },
      { label: 'Polar night', value: 'Nov \u2013 Feb' },
      { label: 'Polar bears', value: '~3,000' },
      { label: 'Population', value: '~2,400' },
    ],
    highlights: ['Polar Bears', 'Glacier Hiking', 'Dog Sled Aurora', 'Snowmobile'],
  },
];
