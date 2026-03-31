export interface BulletDetail {
  title: string;
  content: string;
  highlights: string[];
  ctaLink: string;
  ctaText: string;
}

export interface ZoneSubCategory {
  id: string;
  title: string;
  shortDesc: string;
  content: string;
  bullets: string[];
  bulletDetails?: BulletDetail[];
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
        bulletDetails: [
          {
            title: 'Solar Cycle 25 \u2014 Last Peak Season',
            content: 'The sun operates on an 11-year magnetic cycle. Solar Cycle 25 peaked in 2024\u201325, producing the strongest geomagnetic storms since 2003. The 2026\u201327 season is the final elevated window before activity drops toward solar minimum around 2031. If you have been waiting for the Northern Lights \u2014 this is the window.',
            highlights: ['G4-class storms produced visible aurora as far south as the UK in 2024', 'KP5+ events expected 8\u201312 times during the 2026\u201327 season', 'Troms\u00F8 at 69\u00B0N sits directly inside the auroral oval', 'After 2027, visible aurora frequency drops 40\u201360% until next peak'],
            ctaLink: '/tjenester/northern-lights',
            ctaText: 'Book peak season tours',
          },
          {
            title: 'Expert-Guided Chase Tours',
            content: 'Chase tours depart nightly from Troms\u00F8 between September and March. Guides use real-time magnetometer data and cloud-cover radar to drive 50\u2013200 km from the city toward clear skies. A typical chase runs 5\u20137 hours. You will ride in a heated minibus, stop at pre-scouted dark-sky locations, and receive hot drinks and tripod setup assistance.',
            highlights: ['Small groups: 8\u201312 people per minibus', 'Departure at 18:00\u201319:00, return by 01:00', 'Photographers get tripod assistance and long-exposure coaching', 'Money-back rebooking if no aurora sighted (most operators)'],
            ctaLink: '/tjenester/northern-lights',
            ctaText: 'Compare chase tours',
          },
          {
            title: 'KP3+ Storm Alert Packages',
            content: 'The KP index measures geomagnetic disturbance on a 0\u20139 scale. KP3 is the threshold where aurora becomes visible to the naked eye in Troms\u00F8. Our partnered operators include real-time KP alerts in every package \u2014 when the magnetometers spike, your guide calls you. Some packages offer flexible rebooking to chase the strongest nights.',
            highlights: ['KP0\u20132: faint glow, camera only', 'KP3\u20134: visible green bands overhead', 'KP5+: full-sky display with reds and purples', 'Alert system via SMS \u2014 30-minute advance notice'],
            ctaLink: '/tjenester/northern-lights',
            ctaText: 'See alert-included packages',
          },
          {
            title: 'Svalbard Aurora Expeditions',
            content: 'Svalbard sits at 78\u00B0N \u2014 the only inhabited place on earth where the Northern Lights appear directly overhead at magnetic zenith. From November to February, the archipelago is in complete polar darkness. Three-night expedition packages fly from Troms\u00F8, include snowmobile transport to dark-sky camps, and are guided by licensed Svalbard operators.',
            highlights: ['Magnetic zenith location: aurora directly overhead', 'Polar night: 24-hour darkness November\u2013February', '3-night packages from $5,432/person including flights', 'Governor permit and polar bear safety escort included'],
            ctaLink: '/tjenester/northern-lights',
            ctaText: 'Explore Svalbard expeditions',
          },
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
        bulletDetails: [
          {
            title: 'Half-Day & Full-Day Runs',
            content: 'Half-day runs (3 hours) cover 20\u201330 km across frozen lakes and through birch forest. You drive your own sled with a team of 4\u20136 Alaskan huskies. Full-day runs (6 hours) push deeper into the wilderness, include a campfire lunch with reindeer stew, and return at dusk. No prior experience required \u2014 the dogs know the trail.',
            highlights: ['Half-day: 3 hours, 20\u201330 km, from 1,800 NOK/person', 'Full-day: 6 hours, 40\u201360 km, campfire lunch included', 'Season: November\u2013April', 'Minimum age: 12 years (half-day), 16 years (full-day)'],
            ctaLink: '/tjenester/trekking',
            ctaText: 'Book a sledding run',
          },
          {
            title: 'Multi-Day Wilderness Camps',
            content: 'Two- and three-day expeditions travel deep into Finnmark or the Lyngen Alps. You camp in traditional lavvu tents with your dog team sleeping beside you. Nights are spent around the fire with your musher guide. These are the trips the mushers themselves love \u2014 silent wilderness, no roads, no phone signal.',
            highlights: ['2\u20133 day expeditions into roadless wilderness', 'Sleep in lavvu tents with reindeer-skin bedding', 'All meals prepared over open fire', 'Maximum 4 guests per expedition'],
            ctaLink: '/tjenester/trekking',
            ctaText: 'Explore multi-day camps',
          },
          {
            title: 'Professional Kennels',
            content: 'The kennels around Troms\u00F8 and Alta house 50\u2013200 Alaskan huskies each. The dogs are bred and trained for Arctic conditions. Before your run, you meet your team, learn to harness them, and understand the commands. The bond between musher and dog is immediate \u2014 these animals live for the trail.',
            highlights: ['Kennels certified by the Norwegian Food Safety Authority', 'Dogs trained from 6 months, retire at 8\u201310 years', 'Veterinary care on-site at all partnered kennels', 'Kennel visits available without booking a run'],
            ctaLink: '/tjenester/trekking',
            ctaText: 'Visit a kennel',
          },
          {
            title: 'Northern Lights Combo',
            content: 'The most popular winter combo in Northern Norway: dog sledding by day, aurora chasing by night. Operators in Troms\u00F8 and Alta bundle both into a single package with shared transport. Run your husky team through the afternoon twilight, return to base for dinner, then depart for a 5-hour Northern Lights chase.',
            highlights: ['Afternoon sled run + evening aurora chase', 'Shared transport between activities', 'Hot drinks and warm gear provided for both', 'Available November\u2013March'],
            ctaLink: '/tjenester/northern-lights',
            ctaText: 'See combo packages',
          },
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
        bulletDetails: [
          {
            title: 'Troms\u00F8 Midnight Sun Window',
            content: 'In Troms\u00F8 (69\u00B0N), the sun does not set between May 18 and July 26. That is 69 consecutive days of daylight. The golden hour lasts all night \u2014 photographers call it the \u201Cmagic light marathon.\u201D Peak midnight sun brightness occurs June 15\u201330 when the sun barely dips toward the horizon at midnight before climbing again.',
            highlights: ['69 days of continuous daylight', 'Sun at its lowest point: 3\u20135\u00B0 above horizon at midnight', 'Best photography: June 15\u201330 for golden midnight light', 'Combine with the Midnight Sun Marathon (mid-June)'],
            ctaLink: '/destinations/northern-norway',
            ctaText: 'Plan your visit',
          },
          {
            title: '24-Hour Hiking',
            content: 'When the sun never sets, the trails never close. The ridges above Troms\u00F8 \u2014 Fl\u00F8ya (600m), Sherpatrappa, and the Tromsdalstinden summit (1,238m) \u2014 are accessible around the clock in full daylight. Start a summit hike at 22:00, reach the top at midnight under golden light with the city spread below you, and descend by 02:00.',
            highlights: ['Fl\u00F8ya: 2\u20133 hours round trip, family-friendly', 'Tromsdalstinden: 6\u20138 hours, DNT Blue grade', 'Trail conditions best June\u2013July (snow-free above treeline)', 'Pack layers \u2014 temperature drops 8\u201312\u00B0C at summit'],
            ctaLink: '/destinations/northern-norway',
            ctaText: 'Browse hiking trails',
          },
          {
            title: 'Midnight Sea Kayaking',
            content: 'Paddle the Arctic coastline at midnight under full daylight. Guided kayak tours depart from Troms\u00F8 and Senja between June and mid-July. The water is calm, the light is golden, and the coastline reveals sea eagles, seals, and the occasional whale surfacing. No kayak experience needed \u2014 guides provide full instruction and stable double kayaks.',
            highlights: ['Guided tours: 3\u20134 hours, from 1,200 NOK/person', 'Double (tandem) kayaks for beginners', 'Water temperature: 8\u201312\u00B0C \u2014 dry suit provided', 'Whale and sea eagle sightings common in June'],
            ctaLink: '/destinations/northern-norway',
            ctaText: 'Book a kayak tour',
          },
          {
            title: 'Lofoten Road Trip on the E10',
            content: 'The E10 runs the entire length of the Lofoten archipelago \u2014 170 km from Fiskeb\u00F8l to \u00C5. Under midnight sun, you can drive the entire route in golden light without headlights. Stop at Reine, Henningsv\u00E6r, and Nusfjord. The Bodø\u2013Moskenes ferry runs late departures in summer \u2014 book the 21:30 sailing for a Vestfjord crossing in full midnight sun.',
            highlights: ['E10: 170 km through Lofoten, 3\u20134 hours driving', 'Bod\u00F8\u2013Moskenes ferry: book the 21:30 summer sailing', 'Key stops: Reine, Henningsv\u00E6r, Nusfjord, \u00C5', 'Rorbu cabin availability tight June\u2013July \u2014 book 3 months ahead'],
            ctaLink: '/destinations/lofoten',
            ctaText: 'Plan the Lofoten drive',
          },
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
        bulletDetails: [
          {
            title: 'Whale Watching \u2014 Orca & Humpback',
            content: 'Every November, billions of herring migrate into the fjords around Troms\u00F8 and Skjerv\u00F8y. Hundreds of orca and humpback whales follow. Whale safari boats depart daily from Skjerv\u00F8y (2.5 hours north of Troms\u00F8) and run through January. You will see whales \u2014 the question is how close. Sighting rates run above 95% in peak season.',
            highlights: ['Season: November\u2013January', 'Departure: Skjerv\u00F8y, 08:00\u201309:00 daily', 'Duration: 6\u20138 hours on the water', 'Sighting rate: 95%+ in November\u2013December'],
            ctaLink: '/tjenester/trekking',
            ctaText: 'Book a whale safari',
          },
          {
            title: 'Sea Eagle Safaris',
            content: 'White-tailed sea eagles \u2014 Europe\u2019s largest raptor, 2.4m wingspan \u2014 hunt the waters around Svolv\u00E6r and Bod\u00F8 year-round. RIB boat safaris bring you within meters as the eagles dive for fish thrown by the guide. The birds are wild, but the feeding locations are consistent. Morning departures offer the best light.',
            highlights: ['Year-round availability from Svolv\u00E6r and Bod\u00F8', 'RIB boat safari: 2\u20133 hours, from 990 NOK/person', 'Eagles dive within 5\u201310 meters of the boat', 'Best photography light: morning departures'],
            ctaLink: '/tjenester/trekking',
            ctaText: 'Book an eagle safari',
          },
          {
            title: 'Sami Reindeer Experiences',
            content: 'In Finnmark, Sami families run reindeer sledding and cultural experiences on their own terms. You ride a reindeer-pulled sled across the vidda, feed the herd, and sit inside a lavvu for a meal of boiled reindeer meat and warm broth. These are Sami-owned operations \u2014 the guides are herders, not performers.',
            highlights: ['Sami-owned and operated \u2014 no cultural appropriation', 'Reindeer sledding: 1\u20132 hours across the vidda', 'Traditional lavvu meal included', 'Available year-round, best October\u2013April'],
            ctaLink: '/tjenester/trekking',
            ctaText: 'Explore Sami experiences',
          },
          {
            title: 'Puffin Colonies',
            content: 'Atlantic puffins nest on the offshore islands of Northern Norway between June and August. The largest colonies are on R\u00F8st (southwest of Lofoten) and Bleiksøya (Vester\u00E5len). Boat tours from Ble\u00EDk run daily in season \u2014 80,000 puffin pairs nest on the island. You will also see razorbills, guillemots, and cormorants.',
            highlights: ['Season: June\u2013August (peak: late June)', 'R\u00F8st: largest puffin colony in Norway', 'Bleiksøya boat tour: 2 hours from Bleik, Vester\u00E5len', '80,000+ nesting puffin pairs on Bleiksøya'],
            ctaLink: '/tjenester/trekking',
            ctaText: 'Book a puffin tour',
          },
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
