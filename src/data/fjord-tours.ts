export type FjordSlug =
  | 'naeroyfjord'
  | 'geirangerfjord'
  | 'sognefjord'
  | 'hardangerfjord';

export const FJORD_LABELS: Record<FjordSlug, string> = {
  naeroyfjord: 'Nærøyfjord',
  geirangerfjord: 'Geirangerfjord',
  sognefjord: 'Sognefjord',
  hardangerfjord: 'Hardangerfjord',
};

export const FJORD_HREFS: Record<FjordSlug, string> = {
  naeroyfjord: '/destinations/fjords/naeroyfjord',
  geirangerfjord: '/destinations/fjords/geirangerfjord',
  sognefjord: '/destinations/fjords/sognefjord',
  hardangerfjord: '/destinations/fjords/hardangerfjord',
};

export type ActivityCategory =
  | 'kayaking'
  | 'cruise'
  | 'rib'
  | 'railway'
  | 'hiking'
  | 'glacier'
  | 'skiing'
  | 'other';

export const ACTIVITY_LABELS: Record<ActivityCategory, string> = {
  kayaking: 'Kayaking',
  cruise: 'Fjord cruises',
  rib: 'RIB speedboats',
  railway: 'Scenic railways',
  hiking: 'Fjord hiking',
  glacier: 'Glacier walks',
  skiing: 'Glacier skiing',
  other: 'Other activities',
};

export const ACTIVITY_BLURBS: Record<ActivityCategory, string> = {
  kayaking:
    'Sea kayak beneath 1,000-meter fjord walls. Guided half-day and full-day paddles across UNESCO Nærøyfjord, Geirangerfjord, Sognefjord and Hardangerfjord. Drysuits provided. Season: May to September.',
  cruise:
    'Zero-emission vessels now run the UNESCO fjords. Electric catamarans on Nærøyfjord, hybrid sightseeing loops on Geirangerfjord, and the longest Sognefjord crossings all sail under the 2026 emission mandate.',
  rib: 'Rigid inflatable boats at 35 knots, the fastest way to the waterfalls. Full flotation suits provided. 12 passengers per boat.',
  railway:
    'The Flåm Railway drops 866 meters in 20 km. The Bergen Line crosses Hardangervidda at 1,222 meters. Combine both on the Norway in a Nutshell route.',
  hiking:
    'Fjord hiking that climbs straight from the waterline. Trolltunga above Ringedalsvatnet, the Prest viewpoint above Flåm, and the farm trails of Nærøyfjord.',
  glacier:
    'Guided crossings on Folgefonna and Jostedalsbreen. Crampons, rope, and certified glacier guides. Summer only.',
  skiing:
    'Summer glacier skiing at Fonna ski resort on Folgefonna. Lift-served, May through August.',
  other: 'Other fjord activities.',
};

export interface TourInternal {
  coords?: { lat: number; lng: number };
  difficulty?: 'easy' | 'moderate' | 'hard' | 'expert';
  budget?: 'free' | 'budget' | 'mid-range' | 'luxury';
  seasons?: Array<'winter' | 'spring' | 'summer' | 'autumn'>;
  durationHours?: number;
  requiresGuide?: boolean;
  familyFriendly?: boolean;
  indoor?: boolean;
}

export interface RawTour {
  name: string;
  type: string;
  price: string;
  duration: string;
  highlight: string;
  affiliateUrl: string;
  internal?: TourInternal;
}

export interface FjordTour extends RawTour {
  fjord: FjordSlug;
  category: ActivityCategory;
}

export const naeroyfjordTours: RawTour[] = [
  {
    name: 'Norway in a Nutshell (Bergen day trip)',
    type: 'Guided full-day loop',
    price: 'From 1,490 NOK',
    duration: '10–12 hours',
    highlight:
      'Bergen Railway to Myrdal, Flåm Railway to Flåm, Nærøyfjord electric ferry to Gudvangen, bus over Stalheimskleiva back to Voss, train to Bergen. The most efficient way to see the fjords without a car. Departs Bergen 08:05 daily in summer.',
    affiliateUrl:
      'https://www.getyourguide.com/flam-l108502/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 60.3913, lng: 5.3221 },
      difficulty: 'easy',
      budget: 'mid-range',
      seasons: ['spring', 'summer', 'autumn'],
      durationHours: 11,
      requiresGuide: false,
      familyFriendly: true,
      indoor: true,
    },
  },
  {
    name: 'Nærøyfjord kayak (half-day)',
    type: 'Guided small group',
    price: 'From 890 NOK',
    duration: '3.5 hours',
    highlight:
      'Departs from Gudvangen Viking Village. Groups of maximum 8 with one guide. Paddle into the fjord past abandoned farm terraces and seasonal waterfalls. Drysuits provided. No prior kayak experience required.',
    affiliateUrl:
      'https://www.getyourguide.com/flam-l108502/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 60.8710, lng: 6.8413 },
      difficulty: 'moderate',
      budget: 'mid-range',
      seasons: ['spring', 'summer', 'autumn'],
      durationHours: 3.5,
      requiresGuide: true,
      familyFriendly: true,
      indoor: false,
    },
  },
  {
    name: 'RIB speedboat on Aurlandsfjord',
    type: 'Guided 1.5 hours',
    price: 'From 1,095 NOK',
    duration: '1.5 hours',
    highlight:
      'High-speed RIB from Flåm harbour up Aurlandsfjord and into the Nærøyfjord entrance. Flotation suits provided. View of Stegastein from the water. Maximum 12 passengers per boat.',
    affiliateUrl:
      'https://www.getyourguide.com/flam-l108502/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 60.8632, lng: 7.1136 },
      difficulty: 'easy',
      budget: 'mid-range',
      seasons: ['spring', 'summer', 'autumn'],
      durationHours: 1.5,
      requiresGuide: true,
      familyFriendly: true,
      indoor: false,
    },
  },
  {
    name: 'Flåm Railway experience',
    type: 'Self-guided with optional audio',
    price: 'From 390 NOK',
    duration: '1 hour',
    highlight:
      'Myrdal to Flåm (or reverse). Includes Kjosfossen waterfall stop. Buy tickets in advance through the Flåm Railway official booking or at Flåm station. The route is most scenic descending from Myrdal.',
    affiliateUrl:
      'https://www.getyourguide.com/flam-l108502/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 60.8632, lng: 7.1136 },
      difficulty: 'easy',
      budget: 'mid-range',
      seasons: ['winter', 'spring', 'summer', 'autumn'],
      durationHours: 1,
      requiresGuide: false,
      familyFriendly: true,
      indoor: true,
    },
  },
];

export const geirangerTours: RawTour[] = [
  {
    name: 'RIB Fjordsafari',
    type: 'Speedboat tour',
    price: 'From 895 NOK',
    duration: '50 min',
    highlight:
      'RIB boat at 35 knots, 15 meters from the waterfalls. Full flotation suits and goggles provided. 12 passengers per boat.',
    affiliateUrl:
      'https://www.getyourguide.com/geiranger-l4560/rib-geiranger-fjordsafari-t697794/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 62.1017, lng: 7.2067 },
      difficulty: 'easy',
      budget: 'mid-range',
      seasons: ['spring', 'summer', 'autumn'],
      durationHours: 0.85,
      requiresGuide: true,
      familyFriendly: true,
      indoor: false,
    },
  },
  {
    name: 'Guided kayak tour',
    type: 'Kayaking',
    price: 'From 1,550 NOK',
    duration: '4 hours',
    highlight:
      'Paddle beneath the Seven Sisters with a certified guide. Drysuits provided. Maximum 8 per group. No experience required.',
    affiliateUrl:
      'https://www.getyourguide.com/geiranger-l4560/geiranger-kayak-tour-with-waterfall-views-t923778/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 62.1058, lng: 7.1970 },
      difficulty: 'moderate',
      budget: 'luxury',
      seasons: ['spring', 'summer'],
      durationHours: 4,
      requiresGuide: true,
      familyFriendly: false,
      indoor: false,
    },
  },
  {
    name: 'Fjord sightseeing cruise',
    type: 'Zero-emission cruise',
    price: 'From 610 NOK',
    duration: '75 min',
    highlight:
      'Electric sightseeing loop from Geiranger. Passes the Seven Sisters, the Suitor, and the Bridal Veil. Audio guide included.',
    affiliateUrl:
      'https://www.getyourguide.com/geiranger-l4560/geirangerfjord-sightseeing-boat-with-audio-guide-t637010/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 62.1017, lng: 7.2067 },
      difficulty: 'easy',
      budget: 'mid-range',
      seasons: ['spring', 'summer', 'autumn'],
      durationHours: 1.25,
      requiresGuide: true,
      familyFriendly: true,
      indoor: true,
    },
  },
  {
    name: 'Fjord cruise with Hellesylt stop',
    type: 'Cruise + village visit',
    price: 'From 750 NOK',
    duration: '2.5 hours',
    highlight:
      'Cruise the full 15 km UNESCO fjord to Hellesylt with a 1.5-hour stop in the village before the return sailing.',
    affiliateUrl:
      'https://www.getyourguide.com/geiranger-l4560/geiranger-fjord-tour-from-geiranger-15-hour-in-hellesylt-t734295/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 62.1017, lng: 7.2067 },
      difficulty: 'easy',
      budget: 'mid-range',
      seasons: ['spring', 'summer', 'autumn'],
      durationHours: 2.5,
      requiresGuide: true,
      familyFriendly: true,
      indoor: true,
    },
  },
];

export const sognefjordTours: RawTour[] = [
  {
    name: 'Norway in a Nutshell — Bergen loop',
    type: 'Rail + ferry combination',
    price: 'From 1,290 NOK',
    duration: '10–12 hours',
    highlight:
      'Bergen to Voss by train, Voss to Myrdal by train, Flåm Railway to Flåm, electric ferry through Nærøyfjord to Gudvangen, bus over Stalheim to Voss, train back to Bergen. Covers the full Sognefjord/Nærøyfjord experience in a single day without a car. Departs Bergen 08:05 daily in summer.',
    affiliateUrl:
      'https://www.getyourguide.com/bergen-l1132/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 60.3913, lng: 5.3221 },
      difficulty: 'easy',
      budget: 'mid-range',
      seasons: ['spring', 'summer', 'autumn'],
      durationHours: 11,
      requiresGuide: false,
      familyFriendly: true,
      indoor: true,
    },
  },
  {
    name: 'Sognefjord express boat — Bergen to Flåm',
    type: 'Norled express boat service',
    price: 'From 680 NOK Bergen–Flåm',
    duration: '5.5 hours Bergen–Flåm',
    highlight:
      'Norled operates the express boat from Bergen directly into the main Sognefjord trunk, calling at Balestrand, Leikanger, and Flåm. Covers sections of Sognefjord not accessible by road. Operates summer season on the full route; year-round between Flåm and Balestrand.',
    affiliateUrl:
      'https://www.getyourguide.com/flam-l108502/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 60.3913, lng: 5.3221 },
      difficulty: 'easy',
      budget: 'mid-range',
      seasons: ['spring', 'summer', 'autumn'],
      durationHours: 5.5,
      requiresGuide: false,
      familyFriendly: true,
      indoor: true,
    },
  },
  {
    name: 'Jostedalsbreen glacier walk',
    type: 'Guided glacier experience',
    price: 'From 850 NOK',
    duration: '3–5 hours',
    highlight:
      'Jostedalsbreen is the largest glacier in mainland Europe at 487 square kilometres. Outlet glaciers accessible from the Sognefjord area include Nigardsbreen (from Luster) and Supphellebreen (from Fjærland). All require a certified guide with glacier equipment. Solo walks on the glacier are not permitted.',
    affiliateUrl:
      'https://www.getyourguide.com/flam-l108502/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 61.6850, lng: 7.2250 },
      difficulty: 'moderate',
      budget: 'mid-range',
      seasons: ['summer', 'autumn'],
      durationHours: 4,
      requiresGuide: true,
      familyFriendly: false,
      indoor: false,
    },
  },
  {
    name: 'Sognefjord sea kayak',
    type: 'Guided half-day or full-day',
    price: 'From 950 NOK half day',
    duration: '4–8 hours',
    highlight:
      'Sea kayaking on the main Sognefjord trunk between Balestrand and Sogndal. Guided tours run from Balestrand. The scale of Sognefjord, 1,308 m at its deepest, is best understood from water level. Suitable for beginners on guided tours. Wet or drysuits provided.',
    affiliateUrl:
      'https://www.getyourguide.com/flam-l108502/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 61.2076, lng: 6.5327 },
      difficulty: 'moderate',
      budget: 'mid-range',
      seasons: ['summer'],
      durationHours: 5,
      requiresGuide: true,
      familyFriendly: false,
      indoor: false,
    },
  },
];

export const hardangerfjordTours: RawTour[] = [
  {
    name: 'Guided Trolltunga (summer)',
    type: 'Small group guided hike',
    price: 'From 995 NOK',
    duration: '10–12 hours',
    highlight:
      'Guided departure from Skjeggedal trailhead. Guide ensures the group maintains the pace needed to complete the route safely before dark. Early departures (06:00) available for June to August. Maximum 12 per group. The guide carries a first aid kit and satellite communicator.',
    affiliateUrl:
      'https://www.getyourguide.com/odda-l97971/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 60.1244, lng: 6.7403 },
      difficulty: 'hard',
      budget: 'mid-range',
      seasons: ['summer', 'autumn'],
      durationHours: 11,
      requiresGuide: true,
      familyFriendly: false,
      indoor: false,
    },
  },
  {
    name: 'Folgefonna glacier walk',
    type: 'Guided glacier experience',
    price: 'From 850 NOK',
    duration: '4–6 hours',
    highlight:
      'Folgefonna is the third largest glacier in Norway. Guided walks depart from the Fonnabu visitor centre on the plateau above Jondal. Crampons and ice axe provided. The contrast between the fjord at sea level and the glacier at 1,200 meters is a 1-hour drive.',
    affiliateUrl:
      'https://www.getyourguide.com/vestland-county-l1985/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 60.0330, lng: 6.3280 },
      difficulty: 'moderate',
      budget: 'mid-range',
      seasons: ['summer'],
      durationHours: 5,
      requiresGuide: true,
      familyFriendly: false,
      indoor: false,
    },
  },
  {
    name: 'Hardangerfjord sightseeing cruise',
    type: 'Boat tour',
    price: 'From 650 NOK',
    duration: '2–3 hours',
    highlight:
      'Departs from Eidfjord or Norheimsund. The cruise covers the inner fjord, passing the Hardanger Bridge (1,380 m span) and the orchard villages along the south shore. Best option for travellers who want the fjord from the water without committing to a full day.',
    affiliateUrl:
      'https://www.getyourguide.com/vestland-county-l1985/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 60.4679, lng: 7.0686 },
      difficulty: 'easy',
      budget: 'mid-range',
      seasons: ['spring', 'summer', 'autumn'],
      durationHours: 2.5,
      requiresGuide: false,
      familyFriendly: true,
      indoor: false,
    },
  },
  {
    name: 'Folgefonna summer skiing',
    type: 'Ski day on the glacier',
    price: 'From 480 NOK (lift pass)',
    duration: 'Full day',
    highlight:
      'Folgefonna Ski Resort operates June to August on the glacier plateau at 1,200 m while the fjord is warm below. Ski and snowboard rental available at the resort. The descent to Jondal and back is an experience on its own.',
    affiliateUrl:
      'https://www.getyourguide.com/vestland-county-l1985/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    internal: {
      coords: { lat: 60.0330, lng: 6.3280 },
      difficulty: 'moderate',
      budget: 'mid-range',
      seasons: ['summer'],
      durationHours: 8,
      requiresGuide: false,
      familyFriendly: true,
      indoor: false,
    },
  },
];

function categorize(input: { type: string; name: string }): ActivityCategory {
  const s = `${input.type} ${input.name}`.toLowerCase();
  if (s.includes('kayak')) return 'kayaking';
  if (s.includes('rib') || s.includes('speedboat')) return 'rib';
  if (
    s.includes('railway') ||
    s.includes('flåm railway') ||
    s.includes('flam railway') ||
    s.includes('train')
  )
    return 'railway';
  if (s.includes('ski')) return 'skiing';
  if (
    s.includes('glacier') ||
    s.includes('folgefonna') ||
    s.includes('jostedal')
  )
    return 'glacier';
  if (
    s.includes('cruise') ||
    s.includes('sightseeing') ||
    s.includes('ferry') ||
    s.includes('boat') ||
    s.includes('express boat') ||
    s.includes('norway in a nutshell')
  )
    return 'cruise';
  if (
    s.includes('trolltunga') ||
    s.includes('hike') ||
    s.includes('trek') ||
    s.includes('preikestolen')
  )
    return 'hiking';
  return 'other';
}

function tag(fjord: FjordSlug, list: RawTour[]): FjordTour[] {
  return list.map((t) => ({ ...t, fjord, category: categorize(t) }));
}

export const fjordTours: FjordTour[] = [
  ...tag('naeroyfjord', naeroyfjordTours),
  ...tag('geirangerfjord', geirangerTours),
  ...tag('sognefjord', sognefjordTours),
  ...tag('hardangerfjord', hardangerfjordTours),
];

export function getToursByCategory(category: ActivityCategory): FjordTour[] {
  return fjordTours.filter((t) => t.category === category);
}

export const ACTIVITY_SLUGS: ActivityCategory[] = [
  'kayaking',
  'cruise',
  'rib',
  'railway',
  'hiking',
  'glacier',
  'skiing',
];
