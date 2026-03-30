export interface ZoneSubCategory {
  id: string;
  title: string;
  shortDesc: string;
  content: string;
  bullets: string[];
  link: string;
  linkText: string;
  imageUrl?: string;
}

export interface ZoneDetailData {
  zoneId: string;
  zoneName: string;
  zoneColor: string;
  headline: string;
  subtitle: string;
  subcategories: ZoneSubCategory[];
}

export const zoneSubcategories: Record<string, ZoneDetailData> = {
  'northern-norway': {
    zoneId: 'northern-norway',
    zoneName: 'Northern Norway',
    zoneColor: '#00CC6A',
    headline: 'Explore Northern Norway',
    subtitle: 'Four Arctic experiences worth the journey north of 67\u00B0N',
    subcategories: [
      {
        id: 'northern-lights',
        title: 'Northern Lights Tours',
        shortDesc: 'Chase the aurora from Troms\u00F8',
        content:
          'Solar Cycle 25 peaked in 2024\u201325 \u2014 the most intense aurora activity in over a decade. The 2026\u201327 season is the last elevated window before the 11-year decline to solar minimum. Troms\u00F8 sits inside the auroral oval at 69\u00B0N, making it the single best base for Northern Lights in Norway.',
        bullets: [
          'Last peak aurora season until 2031 \u2014 Solar Cycle 25',
          'Expert-guided chase tours departing nightly from Troms\u00F8',
          'KP3+ geomagnetic storm alerts built into every package',
          'Svalbard expeditions from $5,432/person (3 nights)',
        ],
        link: '/tjenester/northern-lights',
        linkText: 'Explore Northern Lights tours',
      },
      {
        id: 'dog-sledding',
        title: 'Dog Sledding',
        shortDesc: 'Husky teams through Arctic wilderness',
        content:
          'Drive your own team of Alaskan huskies across frozen lakes and through birch forests outside Troms\u00F8 and Alta. Half-day runs cover 20\u201330 km; multi-day expeditions camp on the vidda with your dogs beside you. Season runs November through April \u2014 book early, the best operators fill months ahead.',
        bullets: [
          'Half-day (3h) and full-day (6h) expeditions available',
          'Multi-day wilderness camps with overnight in lavvu tents',
          'Professional mushers and kennels with 50\u2013200 dogs',
          'Combine with Northern Lights evening chase',
        ],
        link: '/tjenester/trekking',
        linkText: 'Explore dog sledding tours',
      },
      {
        id: 'midnight-sun',
        title: 'Midnight Sun',
        shortDesc: 'Endless daylight from May to July',
        content:
          'North of the Arctic Circle, the sun does not set from mid-May to late July. In Troms\u00F8, midnight sun runs May 18 \u2013 July 26. This is prime season for hiking, sea kayaking, deep-sea fishing, and coastal cycling under 24-hour golden light. Sleep becomes optional \u2014 the landscape does not.',
        bullets: [
          'Troms\u00F8 midnight sun: May 18 \u2013 July 26',
          'Hiking trails accessible 24 hours in full daylight',
          'Sea kayaking along the Arctic coast at midnight',
          'Combine with Lofoten road trip on the E10',
        ],
        link: '/destinations/northern-norway',
        linkText: 'Plan your midnight sun trip',
      },
      {
        id: 'arctic-wildlife',
        title: 'Arctic Wildlife',
        shortDesc: 'Whales, eagles, and reindeer',
        content:
          'Northern Norway is home to humpback and orca pods that follow the herring into the fjords from November to January. Sea eagle safaris run year-round from Svolv\u00E6r and Bod\u00F8. In Finnmark, Sami-guided reindeer sledding connects you to a living culture \u2014 not a tourist show.',
        bullets: [
          'Whale watching season: November \u2013 January (Troms\u00F8/Skjerv\u00F8y)',
          'Sea eagle safaris from Svolv\u00E6r and Bod\u00F8',
          'Sami-guided reindeer experiences in Finnmark',
          'Puffin colonies on coastal islands (June \u2013 August)',
        ],
        link: '/tjenester/trekking',
        linkText: 'Explore Arctic wildlife tours',
      },
    ],
  },
  'events': {
    zoneId: 'events',
    zoneName: 'Events',
    zoneColor: '#5CBFEE',
    headline: 'Norwegian Events & Festivals',
    subtitle: 'Seasonal celebrations across the country \u2014 from polar night to midnight sun',
    subcategories: [
      {
        id: 'festivals-markets',
        title: 'Festivals & Markets',
        shortDesc: 'Music, culture, and local craft',
        content:
          'Norway runs over 1,000 festivals between June and September alone. From Troms\u00F8 International Film Festival in the polar dark to Bergenfest on the harbour in summer, every region has its own draw. The Christmas markets in Bergen and Trondheim open in late November \u2014 arrive early, they sell out fast.',
        bullets: [
          'Bergenfest (June) \u2014 harbour-side music festival, 4 days',
          'Troms\u00F8 International Film Festival (January) \u2014 polar night screenings',
          'Trondheim Calling (February) \u2014 40+ bands across 8 stages',
          'Bergen Christmas Market (Nov\u2013Dec) \u2014 crafts, gl\u00F8gg, local food',
        ],
        link: '/travel/events',
        linkText: 'Browse all events',
      },
      {
        id: 'northern-lights-season',
        title: 'Northern Lights Season',
        shortDesc: 'September\u2013March aurora events',
        content:
          'Northern Lights season runs September through March, peaking October\u2013February when darkness is longest and solar activity remains high. Troms\u00F8 and Alta host dedicated aurora festivals. The 2026\u201327 season is the tail end of Solar Cycle 25 \u2014 book now or wait until 2031 for the next peak.',
        bullets: [
          'Troms\u00F8 Northern Lights Festival (late January)',
          'Alta Northern Lights Festival (February\u2013March)',
          'KP3+ chase events with expert guides',
          'Peak viewing: October\u2013February, 18:00\u201301:00',
        ],
        link: '/tjenester/northern-lights',
        linkText: 'Explore Northern Lights tours',
      },
      {
        id: 'midnight-sun-events',
        title: 'Midnight Sun Events',
        shortDesc: 'Festivals under 24-hour daylight',
        content:
          'When the sun refuses to set, Norway stays awake. The Midnight Sun Marathon in Troms\u00F8 (June) is the most famous \u2014 6,000 runners race under full daylight at midnight. Lofoten hosts open-air concerts, fjord swims, and cycling events through July. The light is extraordinary; the energy matches it.',
        bullets: [
          'Midnight Sun Marathon, Troms\u00F8 (mid-June) \u2014 6,000 runners',
          'Lofoten International Chamber Music Festival (July)',
          'North Cape cycling events (June\u2013July)',
          'Midnight sun kayak races along the Arctic coast',
        ],
        link: '/destinations/northern-norway',
        linkText: 'Plan your midnight sun trip',
      },
      {
        id: 'food-drink-events',
        title: 'Food & Drink',
        shortDesc: 'Skrei, cider, and local cuisine',
        content:
          'Norwegian food events follow the seasons. Skrei season (January\u2013April) brings cod festivals to Lofoten and Finnmark. Hardanger cider week runs in October. Oslo hosts the Nordic Food Festival in September. The Rakfisk Festival in Valdres (November) is not for the faint-hearted \u2014 fermented trout, eaten raw.',
        bullets: [
          'Lofoten Skrei Festival (February\u2013March)',
          'Hardanger Cider Week (October)',
          'Rakfisk Festival, Valdres (November) \u2014 50,000 visitors',
          'Oslo Nordic Food Festival (September)',
        ],
        link: '/travel/events',
        linkText: 'Browse food events',
      },
    ],
  },
  'cities': {
    zoneId: 'cities',
    zoneName: 'City Norway',
    zoneColor: '#FFFFFF',
    headline: 'City Norway',
    subtitle: 'Four cities, four entry points \u2014 each with a different Norway behind it',
    subcategories: [
      {
        id: 'oslo',
        title: 'Oslo',
        shortDesc: 'Capital city, fjord and forest',
        content:
          'Oslo sits at the head of the Oslofjord with the Marka forest wrapping around it from the north. The city runs on public transport \u2014 the T-bane reaches the ski jump at Holmenkollen in 20 minutes. Gr\u00FCnerl\u00F8kka has the food. Bygd\u00F8y has the museums. Aker Brygge has the waterfront. Skip the Royal Palace selfie \u2014 walk Akerselva instead.',
        bullets: [
          'Mathallen food hall at Vulkan \u2014 30+ vendors',
          'Munch Museum (2021) \u2014 13 stories on the waterfront',
          'T-bane to Frognerseteren for forest hiking in 25 minutes',
          'Ferry to Bygd\u00F8y peninsula: Fram Museum, Kon-Tiki, Viking Ship',
        ],
        link: '/destinations/cities',
        linkText: 'Explore Oslo',
      },
      {
        id: 'bergen',
        title: 'Bergen',
        shortDesc: 'Rain, Bryggen, and seven mountains',
        content:
          'Bergen gets 260 days of rain per year. This is not a warning \u2014 it is the character of the city. The wooden Bryggen warehouses date to the Hanseatic period and are a UNESCO site. Fl\u00F8ibanen funicular takes you to 320 meters. The fish market at Torget opens at 07:00. Come before the cruise ships dock at 09:00.',
        bullets: [
          'Bryggen: 14th-century Hanseatic warehouses (UNESCO)',
          'Fl\u00F8ibanen funicular to 320m \u2014 city panorama',
          'Fish market at Torget: arrive before 09:00',
          'Gateway to Hardangerfjord and Sognefjord',
        ],
        link: '/destinations/cities',
        linkText: 'Explore Bergen',
      },
      {
        id: 'trondheim',
        title: 'Trondheim',
        shortDesc: 'Cathedral, cycling, and craft beer',
        content:
          'Trondheim has 190,000 residents, Norway\'s oldest cathedral (Nidarosdomen, founded 1070), and a food scene that rivals Oslo at half the price. Bakklandet is the historic neighbourhood along the Nidelva \u2014 wooden houses, cobblestones, and the Gamle Bybro bridge. The city has more breweries per capita than any other Norwegian city.',
        bullets: [
          'Nidarosdomen: Scandinavia\'s only medieval coronation cathedral',
          'Bakklandet: historic quarter along the Nidelva river',
          'Ravnkloa fish market \u2014 local catch daily',
          'Cycling city: free bike lifts on steep hills',
        ],
        link: '/destinations/cities',
        linkText: 'Explore Trondheim',
      },
      {
        id: 'stavanger',
        title: 'Stavanger',
        shortDesc: 'Oil capital, street art, Preikestolen',
        content:
          'Stavanger is the base for Preikestolen (Pulpit Rock) \u2014 the 604-meter cliff that drops straight into Lysefjord. The city itself runs on oil money and street art. Nuart Festival (founded 2001) has turned the centre into an open-air gallery. Gamle Stavanger has 173 white wooden houses from the 18th century, the best-preserved wooden settlement in Europe.',
        bullets: [
          'Preikestolen trailhead: 25 km from city centre',
          'Nuart street art festival (September)',
          'Gamle Stavanger: 173 white wooden houses',
          'Norwegian Petroleum Museum \u2014 the oil story',
        ],
        link: '/destinations/cities',
        linkText: 'Explore Stavanger',
      },
    ],
  },
};
