export interface ZoneSubCategory {
  id: string;
  title: string;
  shortDesc: string;
  content: string;
  bullets: string[];
  link: string;
  linkText: string;
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
};
