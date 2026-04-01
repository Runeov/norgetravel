import type { CityGuide } from '@/types/city-guide';

/**
 * To activate live Google ratings:
 *   1. Add GOOGLE_PLACES_API_KEY to .env.local
 *   2. Fill in each restaurant's placeId below
 *   How to find a Place ID: maps.google.com → find restaurant → share → copy the ChIJ... string
 *   Or use: https://developers.google.com/maps/documentation/places/web-service/place-id
 *
 * Without placeId, stored ratings below are used as fallback.
 * Pages revalidate every 24 hours automatically (ISR).
 */
export const tromso: CityGuide = {
  slug: 'tromso',
  name: 'Troms\u00F8',
  metaTitle: 'Troms\u00F8 Travel Guide 2026 | NorgeTravel',
  metaDescription:
    'Troms\u00F8 at 69\u00B0N: Northern Lights season September\u2013March, midnight sun May\u2013July, whale safaris November\u2013February. Best restaurants, tours, and accommodation with commission-transparent affiliate links.',

  heroImageSrc: '/pics/Tromso/tromso_banner.jpeg',
  heroImageAlt: 'Troms\u00F8 cityscape and harbour at night with Northern Lights \u2014 Arctic Norway',

  taglineBadge: 'Arctic Basecamp',
  heroHeadline: 'Troms\u00F8',
  heroBody:
    "69\u00B0N. 75,000 residents inside the auroral oval. The aurora hangs overhead from September to March, the sun never sets in June, and orca pods follow the herring into the fjords every November. This is Norway's Arctic capital \u2014 not a postcard backdrop.",

  heroStats: [
    { icon: 'map-pin', text: 'Troms\u00F8 Langnes (TOS) \u2014 direct from Oslo' },
    { icon: 'moon', text: 'Polar night: Nov 26 \u2013 Jan 15' },
    { icon: 'sun', text: 'Midnight sun: May 18 \u2013 Jul 26' },
    { icon: 'thermometer', text: '\u221215\u00B0C to +20\u00B0C year-round range' },
    { icon: 'clock', text: '4\u20137 nights recommended' },
  ],

  facts: [
    { label: 'Latitude', value: '69\u00B0N \u2014 inside the auroral oval' },
    { label: 'Population', value: '75,000' },
    { label: 'Polar night', value: 'Nov 26 \u2013 Jan 15 (50 days)' },
    { label: 'Midnight sun', value: 'May 18 \u2013 Jul 26 (69 days)' },
    { label: 'Airport', value: 'Troms\u00F8 Langnes (TOS)' },
    { label: 'Recommended stay', value: '4\u20137 nights' },
  ],

  seasonalWindows: [
    {
      label: 'Northern Lights',
      months: 'Sep \u2013 Mar',
      detail:
        'The auroral oval sits directly over Troms\u00F8. KP index 3+ on a clear night puts the lights overhead. Commercial chases drive 50\u2013200 km to find clear sky. Book 4 nights minimum \u2014 cloud is the variable you cannot control.',
    },
    {
      label: 'Midnight Sun',
      months: 'May \u2013 Jul',
      detail:
        'From May 18 to July 26, the sun does not set. The Midnight Sun Marathon starts at 22:30 and finishes under full daylight. Hiking, sea kayaking, and coastal cycling under 24-hour golden light.',
    },
    {
      label: 'Whale Watching',
      months: 'Nov \u2013 Feb',
      detail:
        'Orca and humpback pods follow herring into the fjords from November. Peak season is December\u2013January when 400\u2013600 orca concentrate in Kaldfjord. Operators report 90% sighting rates at peak. RIB and traditional vessel options from Troms\u00F8 harbour.',
    },
    {
      label: 'Dog Sledding & Events',
      months: 'Jan \u2013 Mar',
      detail:
        "The Finnmarksl\u00F8pet (Europe's longest dog sled race) starts in Alta in March. Troms\u00F8 hosts Nordlysfestivalen in January and the International Film Festival. Winter is the busiest season \u2014 book tours and accommodation well in advance.",
    },
  ],

  experiences: [
    {
      title: 'Northern Lights chase',
      price: 'From \u20AC89/person',
      duration: '4\u20138 hours',
      body: 'Guides track clear skies by car and drive up to 200 km in a night to find the aurora. Private tours for 2\u20136 people move faster and further than group buses. Book 4 nights minimum.',
    },
    {
      title: 'Whale watching \u2014 Kaldfjord',
      price: 'From NOK 1,450/person',
      duration: '4\u20136 hours',
      body: 'Orca and humpback pods feed in the fjords November to February. Peak December\u2013January. RIB boats get you close; traditional vessels are warmer. 90% sighting rate at peak.',
    },
    {
      title: 'Dog sled under the aurora',
      price: 'From NOK 2,800/person',
      duration: '3\u20135 hours',
      body: 'Evening dog sled tours run from kennels outside Troms\u00F8 into the Lyngen foothills. Combine with an aurora chase \u2014 most operators track conditions and adapt the route accordingly.',
    },
    {
      title: 'Senja day trip',
      price: 'From NOK 1,200/person',
      duration: 'Full day',
      body: "Norway's second-largest island, 2.5 hours from Troms\u00F8. Segla peak (639m), empty beaches, and working fishing villages that haven't been converted to tourist parks. The National Tourist Route runs the western coast.",
    },
  ],

  tourOperators: [
    {
      name: 'GetYourGuide \u2014 Troms\u00F8 Aurora',
      type: 'Group & private tours',
      priceFrom: '\u20AC89/person',
      commission: '7%',
      highlight:
        'Largest selection of vetted guides. Free cancellation if no lights on group tours.',
      affiliateUrl: '#',
      rel: 'noopener noreferrer sponsored',
    },
    {
      name: 'Viator \u2014 Northern Lights Chase',
      type: 'Group tours',
      priceFrom: '\u20AC79/person',
      commission: '8\u201310%',
      highlight: 'Best price for group bookings. Mobile tickets. 24/7 support.',
      affiliateUrl: '#',
      rel: 'noopener noreferrer sponsored',
    },
    {
      name: 'Local Private Guides',
      type: 'Private (2\u20138 people)',
      priceFrom: '\u20AC400/group',
      commission: '\u20AC40+ flat',
      highlight:
        'Maximum flexibility. Guide chooses location based on real-time forecast. Worth it for 4+ people.',
      affiliateUrl: '#',
      rel: 'noopener noreferrer sponsored',
    },
  ],

  accommodationAffiliates: [
    {
      name: 'Booking.com \u2014 Troms\u00F8 Hotels',
      type: 'Hotels, apartments, cabins',
      network: 'Awin / CJ',
      commission: '4%',
      affiliateUrl: '#',
      rel: 'noopener noreferrer sponsored',
    },
  ],

  restaurants: [
    // ─── Fine dining & tasting menus ──────────────────────────────────────────
    {
      id: 'emmas-drommekjokken',
      name: "Emma's Dr\u00F8mmekj\u00F8kken",
      // placeId: 'ChIJ...', // TODO: add Place ID for live ratings
      cuisine: 'norwegian',
      pricePoint: '$$$',
      averageMealPrice: 'NOK 650\u2013900 per person',
      address: 'Kirkegata 8, 9008 Troms\u00F8',
      neighbourhood: 'City centre',
      website: 'https://www.emmasdrommekjokken.no',
      reservationUrl: 'https://www.emmasdrommekjokken.no/reservasjon',
      reservationRequired: true,
      openingHours: 'Tue\u2013Sat 18:00\u201322:00',
      description:
        "The Arctic tasting menu that made Troms\u00F8 a culinary destination. Emma Margrete Minde has run this kitchen since 1993 \u2014 northern ingredients (reindeer, king crab, cloudberry) executed with technique and restraint. Seven courses. The dining room holds 30. Book at least two weeks ahead in aurora season.",
      mustOrder: ['Arctic char with cloudberry', 'Reindeer with juniper reduction', 'Cloudberry sorbet'],
      ratings: {
        google: { score: 4.6, reviewCount: 218 },
        tripAdvisor: { score: 4.5, reviewCount: 312, bubbleRating: 5 },
        michelin: { type: 'recommended' },
      },
    },
    // ─── Seafood ──────────────────────────────────────────────────────────────
    {
      id: 'fiskekompaniet',
      name: 'Fiskekompaniet',
      // placeId: 'ChIJ...', // TODO: add Place ID for live ratings
      cuisine: 'seafood',
      pricePoint: '$$$$',
      averageMealPrice: 'NOK 900\u20131,400 per person',
      address: 'Kj\u00F8pmannsgata 12, 9008 Troms\u00F8',
      neighbourhood: 'Harbour front',
      website: 'https://www.fiskekompaniet.net',
      reservationUrl: 'https://www.fiskekompaniet.net/bestill',
      reservationRequired: true,
      openingHours: 'Tue\u2013Sun 17:00\u201322:00',
      description:
        "King crab is the headline. The Barents Sea king crab arrives live, cooked to order, and served with nothing that competes with it. The Arctic menu expands to wolf fish, sea urchin, and langoustine depending on what came off the boats that week.",
      mustOrder: ['Live king crab', 'Sea urchin with sourdough', 'Langoustine bisque'],
      ratings: {
        google: { score: 4.4, reviewCount: 834 },
        tripAdvisor: { score: 4.5, reviewCount: 712, bubbleRating: 5 },
        michelin: { type: 'none' },
      },
    },
    {
      id: 'arctandria',
      name: 'Arctandria',
      // placeId: 'ChIJ...', // TODO: add Place ID for live ratings
      cuisine: 'seafood',
      pricePoint: '$$$',
      averageMealPrice: 'NOK 550\u2013800 per person',
      address: 'Strandtorget 1, 9008 Troms\u00F8',
      neighbourhood: 'Harbour front',
      website: 'https://www.arctandria.no',
      reservationUrl: 'https://www.arctandria.no/reservasjon',
      reservationRequired: false,
      openingHours: 'Mon\u2013Sat 16:00\u201322:00',
      description:
        "One of Troms\u00F8's oldest seafood restaurants, in a preserved wooden building at the water's edge. The cod soup has been on the menu for decades because no one has improved on the recipe. Strong Arctic fish selection: wolf fish, halibut, and whatever the day boats brought in.",
      mustOrder: ['Cod soup', 'Whole grilled halibut', 'Fried wolf fish'],
      ratings: {
        google: { score: 4.3, reviewCount: 521 },
        tripAdvisor: { score: 4.3, reviewCount: 488, bubbleRating: 4 },
        michelin: { type: 'none' },
      },
    },
    {
      id: 'bardus-bistro',
      name: 'Bardus Bistro',
      // placeId: 'ChIJ...', // TODO: add Place ID for live ratings
      cuisine: 'seafood',
      pricePoint: '$$',
      averageMealPrice: 'NOK 350\u2013500 per person',
      address: 'Strandgata 9, 9008 Troms\u00F8',
      neighbourhood: 'Harbour front',
      website: 'https://www.bardusbistro.no',
      reservationRequired: false,
      openingHours: 'Mon\u2013Sat 11:00\u201322:00, Sun 12:00\u201321:00',
      description:
        "The waterfront bistro locals actually use. Cod, skrei in season, and a fish soup that Troms\u00F8 residents have been arguing is the best in Norway for a decade. No tasting menus \u2014 just honest plates of northern seafood at prices that don't require a second mortgage.",
      mustOrder: ['Skrei (Jan\u2013Apr)', 'Fish soup', 'Saithe with brown butter'],
      ratings: {
        google: { score: 4.6, reviewCount: 487 },
        tripAdvisor: { score: 4.5, reviewCount: 421, bubbleRating: 5 },
        michelin: { type: 'none' },
      },
    },
    {
      id: 'risoya',
      name: 'Ris\u00F8ya Sj\u00F8mat',
      // placeId: 'ChIJ...', // TODO: add Place ID for live ratings
      cuisine: 'seafood',
      pricePoint: '$$',
      averageMealPrice: 'NOK 280\u2013420 per person',
      address: 'Ris\u00F8yveien 4, 9020 Troms\u00F8',
      neighbourhood: 'Ris\u00F8ya',
      website: 'https://www.risoyasjømat.no',
      reservationRequired: false,
      openingHours: 'Tue\u2013Sun 12:00\u201320:00',
      description:
        "Casual fish shop and dining counter on the Ris\u00F8ya island, 15 minutes from the city centre. What the fish market looked like before Instagram arrived. Order at the counter: prawns by the bag, smoked salmon on bread, or the daily catch as a simple plate. No pretension.",
      mustOrder: ['Fresh prawns with mayo', 'Smoked salmon on sourdough', 'Daily fish plate'],
      ratings: {
        google: { score: 4.5, reviewCount: 312 },
        tripAdvisor: { score: 4.4, reviewCount: 187, bubbleRating: 4 },
        michelin: { type: 'none' },
      },
    },
    // ─── Local & traditional ──────────────────────────────────────────────────
    {
      id: 'aunegarden',
      name: 'Auneg\u00E5rden',
      // placeId: 'ChIJ...', // TODO: add Place ID for live ratings
      cuisine: 'local',
      pricePoint: '$$$',
      averageMealPrice: 'NOK 500\u2013750 per person',
      address: 'Sjøgata 29, 9008 Troms\u00F8',
      neighbourhood: 'City centre',
      website: 'https://www.aunegarden.no',
      reservationUrl: 'https://www.aunegarden.no/bord',
      reservationRequired: true,
      openingHours: 'Mon\u2013Sat 17:00\u201322:00',
      description:
        "Traditional northern Norwegian cooking in a wooden house from 1838 \u2014 one of the few original buildings left in Troms\u00F8 after the wartime destruction. Reindeer stew, salted leg of lamb (pinnekj\u00F8tt), and dried cod prepared using recipes that predate the tourist industry. The building alone is worth the table.",
      mustOrder: ['Reindeer stew with lingonberry', 'Pinnekj\u00F8tt (salted lamb)', 'Cloudberry cream'],
      ratings: {
        google: { score: 4.4, reviewCount: 389 },
        tripAdvisor: { score: 4.5, reviewCount: 356, bubbleRating: 5 },
        michelin: { type: 'none' },
      },
    },
    {
      id: 'smak-av-tromso',
      name: 'Smak av Troms\u00F8',
      // placeId: 'ChIJ...', // TODO: add Place ID for live ratings
      cuisine: 'local',
      pricePoint: '$$$',
      averageMealPrice: 'NOK 450\u2013680 per person',
      address: 'Grønnegata 45, 9008 Troms\u00F8',
      neighbourhood: 'City centre',
      reservationRequired: true,
      openingHours: 'Wed\u2013Sat 17:00\u201321:30',
      description:
        "The kitchen that specifically sets out to document what the Arctic actually tastes like. Foraged herbs from Troms county, reindeer from Sami herders in Finnmark, cloudberry from the Lyngen plateau, birch syrup from the forest above the treeline. Nothing on this menu could have come from anywhere else.",
      mustOrder: ['Eight-course Arctic tasting menu', 'Reindeer heart tartare', 'Birch syrup ice cream'],
      ratings: {
        google: { score: 4.7, reviewCount: 143 },
        tripAdvisor: { score: 4.6, reviewCount: 118, bubbleRating: 5 },
        michelin: { type: 'none' },
      },
    },
    // ─── Casual & market ──────────────────────────────────────────────────────
    {
      id: 'mathallen-tromso',
      name: 'Mathallen Troms\u00F8',
      // placeId: 'ChIJ...', // TODO: add Place ID for live ratings
      cuisine: 'norwegian',
      pricePoint: '$',
      averageMealPrice: 'NOK 150\u2013280 per person',
      address: 'Gr\u00F8nnegata 37\u201339, 9008 Troms\u00F8',
      neighbourhood: 'City centre',
      reservationRequired: false,
      openingHours: 'Mon\u2013Fri 10:00\u201318:00, Sat 10:00\u201317:00',
      description:
        "Troms\u00F8's indoor food market. Seven producers under one roof: a fishmonger, a cheesemaker, a butcher selling reindeer and elk, and three lunch counters. The place to eat at noon when you're between tours and don't want tourist-priced food.",
      mustOrder: ['Reindeer stew', 'Stockfish salad', 'Local cheese board'],
      ratings: {
        google: { score: 4.3, reviewCount: 193 },
        tripAdvisor: { score: 4.2, reviewCount: 167, bubbleRating: 4 },
        michelin: { type: 'none' },
      },
    },
    // ─── Pubs & bars ──────────────────────────────────────────────────────────
    {
      id: 'skarven',
      name: 'Skarven',
      // placeId: 'ChIJ...', // TODO: add Place ID for live ratings
      cuisine: 'pub',
      pricePoint: '$$',
      averageMealPrice: 'NOK 200\u2013380 per person',
      address: 'Strandtorget 1, 9008 Troms\u00F8',
      neighbourhood: 'Harbour front',
      website: 'https://www.skarven.no',
      reservationRequired: false,
      openingHours: 'Daily 11:00\u201301:00',
      description:
        "Troms\u00F8's most enduring pub. Fishermen, students, and tourists share the same tables without anyone performing for the others. The cod tongue (torsketunge) is on the menu because it should be \u2014 fried in flour and duck fat, a Troms\u00F8 staple since the fishing industry built this city. The Mack beer is brewed a kilometre away.",
      mustOrder: ['Cod tongue (torsketunge)', 'Fish and chips', 'Mack Arctic lager'],
      ratings: {
        google: { score: 4.3, reviewCount: 623 },
        tripAdvisor: { score: 4.0, reviewCount: 589, bubbleRating: 4 },
        michelin: { type: 'none' },
      },
    },
    {
      id: 'mack-olhallen',
      name: 'Mack \u00D8lhallen',
      // placeId: 'ChIJ...', // TODO: add Place ID for live ratings
      cuisine: 'pub',
      pricePoint: '$',
      averageMealPrice: 'NOK 120\u2013240 per person',
      address: 'Storgata 4, 9008 Troms\u00F8',
      neighbourhood: 'City centre',
      website: 'https://www.mack.no/olhallen',
      reservationRequired: false,
      openingHours: 'Mon\u2013Thu 10:00\u201322:00, Fri\u2013Sat 10:00\u201323:00',
      description:
        "The Mack brewery has been in Troms\u00F8 since 1877. The \u00D8lhallen (the brewery bar) opened in 1928 and has been operating continuously since \u2014 including through World War II. Twelve Mack taps, smoked reindeer rolls, simple pub food. No frills. The bar is worth walking into for the building alone.",
      mustOrder: ['Mack \u00D8l (flagship lager)', 'Smoked reindeer roll', 'Arctic Lager'],
      ratings: {
        google: { score: 4.4, reviewCount: 892 },
        tripAdvisor: { score: 4.2, reviewCount: 743, bubbleRating: 4 },
        michelin: { type: 'none' },
      },
    },
    {
      id: 'driv',
      name: 'Driv',
      // placeId: 'ChIJ...', // TODO: add Place ID for live ratings
      cuisine: 'cafe',
      pricePoint: '$',
      averageMealPrice: 'NOK 100\u2013200 per person',
      address: 'Strandtorget 1, 9008 Troms\u00F8',
      neighbourhood: 'Harbour front',
      website: 'https://www.driv.no',
      reservationRequired: false,
      openingHours: 'Daily 10:00\u201302:00',
      description:
        "The student culture hub at Troms\u00F8 harbour. Cheap coffee, outdoor seating in summer (with blankets provided in October), live music most Thursdays, and the kind of food that keeps a university running: wraps, burgers, and a soup of the day. Goes from café to bar after 18:00 without changing its character.",
      mustOrder: ['Fish wrap', 'Soup of the day', 'Flat white'],
      ratings: {
        google: { score: 4.1, reviewCount: 476 },
        tripAdvisor: { score: 4.0, reviewCount: 312, bubbleRating: 4 },
        michelin: { type: 'none' },
      },
    },
  ],
};
