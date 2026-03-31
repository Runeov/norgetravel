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
    subtitle: 'Arctic adventures above 67\u00B0N \u2014 cities, activities, tours, and places to stay',
    subcategories: [
      {
        id: 'nn-cities',
        title: 'Cities',
        shortDesc: 'Arctic basecamps from coast to inland',
        content:
          'Seven basecamps spread across 3,500 km of Arctic coastline and Finnmark\u2019s interior. Troms\u00F8 is the largest city above the Arctic Circle in Norway. Alta holds the oldest Northern Lights observatory. Hammerfest claims to be the northernmost city in the world. Each serves a different purpose on your itinerary.',
        bullets: [
          'Troms\u00F8 \u2014 Arctic capital, aurora hub, 75,000 residents',
          'Alta \u2014 Northern Lights observatory, canyon hiking, Sami culture',
          'Hammerfest \u2014 Northernmost city, energy capital, Arctic heritage',
          'Harstad \u2014 Cultural festivals, Trondenes church, gateway to Vester\u00E5len',
          'Senja \u2014 Norway\u2019s second-largest island, Segla peak, fishing villages',
          'Karasjok \u2014 Sami parliament, reindeer herding, Finnmark interior',
          'Skibotn \u2014 Lyngen Alps gateway, fjord-to-summit base, dark-sky site',
        ],
        bulletDetails: [
          {
            title: 'Troms\u00F8',
            content: 'Troms\u00F8 sits at 69\u00B0N with 75,000 residents, a university, a brewery, the Arctic Cathedral, and 69 days of polar night. It is the primary basecamp for Northern Lights chase tours, whale watching departures, and the gateway to Kvaløya and Senja. The Midnight Sun Marathon runs mid-June. The city has more pubs per capita than any Norwegian city outside Bergen.',
            highlights: ['Population: 75,000 \u2014 largest city above the Arctic Circle', 'Aurora season: September\u2013March, inside the auroral oval', 'Midnight sun: May 18 \u2013 July 26', 'Airport: Troms\u00F8 Langnes (TOS), direct flights from Oslo'],
            ctaLink: '/destinations/northern-norway',
            ctaText: 'Explore Troms\u00F8',
          },
          {
            title: 'Alta',
            content: 'Alta sits at the head of Altafjorden in Finnmark. The Northern Lights Observatory opened here in 1899 \u2014 the first in the world. The Alta Canyon is Northern Europe\u2019s largest, 400 meters deep. The town is a basecamp for dog sledding, Sami experiences, and ice hotel stays. The midnight sun lasts from May 16 to July 26.',
            highlights: ['Northern Lights Observatory \u2014 operational since 1899', 'Alta Canyon: 400m deep, 13 km long', 'UNESCO Rock Art site \u2014 6,000-year-old carvings', 'Ice hotel: Sorrisniva Igloo Hotel, rebuilt every winter'],
            ctaLink: '/destinations/northern-norway',
            ctaText: 'Explore Alta',
          },
          {
            title: 'Hammerfest',
            content: 'Hammerfest (70\u00B0N) claims the title of world\u2019s northernmost city. It rebuilt twice \u2014 after a hurricane in 1856 and after German forces burned it in 1944. Today it runs on LNG and Arctic energy. The Royal and Ancient Polar Bear Society is housed here. The town is small (11,000 residents) but strategic: it connects to North Cape via the E6.',
            highlights: ['70\u00B0N \u2014 claims northernmost city status', 'Museum of Reconstruction \u2014 WWII Arctic history', 'Royal and Ancient Polar Bear Society', 'Gateway to North Cape via the E6 (140 km)'],
            ctaLink: '/destinations/northern-norway',
            ctaText: 'Explore Hammerfest',
          },
          {
            title: 'Harstad',
            content: 'Harstad sits on Hinnøya, Norway\u2019s largest island. Trondenes Church (13th century) is the world\u2019s northernmost medieval stone church. The Festspillene i Nord-Norge festival runs every June \u2014 Northern Norway\u2019s largest cultural event. From Harstad, Vester\u00E5len and its whale safaris are within reach.',
            highlights: ['Festspillene i Nord-Norge \u2014 June cultural festival', 'Trondenes Church: northernmost medieval stone church', 'Hinnøya \u2014 Norway\u2019s largest island', 'Vester\u00E5len whale safaris within 1 hour'],
            ctaLink: '/destinations/northern-norway',
            ctaText: 'Explore Harstad',
          },
          {
            title: 'Senja',
            content: 'Senja is Norway\u2019s second-largest island \u2014 1,586 km\u00B2 of jagged peaks, fishing villages, and empty beaches. The western coast is called \u201CNorway in miniature\u201D: mountains, fjords, and white sand within a few kilometres. Segla (639m) is the signature peak. Mefjordv\u00E6r and Husøy are working fishing villages that have not been turned into tourist parks.',
            highlights: ['Segla peak: 639m, 3\u20134 hour hike, exposed ridge', 'Mefjordv\u00E6r \u2014 working fishing village, rorbu accommodation', 'National Tourist Route Senja \u2014 scenic coastal drive', 'Connected to Troms\u00F8 via Finnsnes (bridge)'],
            ctaLink: '/destinations/northern-norway',
            ctaText: 'Explore Senja',
          },
          {
            title: 'Karasjok',
            content: 'Karasjok is the seat of the Sami Parliament (Sametinget) and the cultural capital of the Norwegian Sami people. The town sits deep in the Finnmark interior, 300 km from the coast. Winter temperatures drop to \u221240\u00B0C. Sami-owned reindeer herding experiences, traditional duodji craft workshops, and the Sami museum (De Samiske Samlinger) are here.',
            highlights: ['Sametinget \u2014 the Norwegian Sami Parliament', 'De Samiske Samlinger \u2014 Sami cultural museum', 'Reindeer herding experiences \u2014 Sami-owned and operated', 'Winter temperatures: regularly \u221230\u00B0C to \u221240\u00B0C'],
            ctaLink: '/destinations/northern-norway',
            ctaText: 'Explore Karasjok',
          },
          {
            title: 'Skibotn',
            content: 'Skibotn sits at the head of Lyngen fjord \u2014 the gateway to the Lyngen Alps. The peaks here rise 1,800m directly from the fjord. In winter, this is Norway\u2019s premier ski touring destination. Skibotn is also one of Northern Norway\u2019s best dark-sky sites: the aurora observatory at Skibotn runs research-grade telescopes and public viewing nights.',
            highlights: ['Gateway to the Lyngen Alps \u2014 1,800m peaks from sea level', 'Premier ski touring: January\u2013May', 'Dark-sky aurora observatory with public nights', 'Lyngen fjord \u2014 deep water, dramatic mountain backdrop'],
            ctaLink: '/destinations/northern-norway',
            ctaText: 'Explore Skibotn',
          },
        ],
        link: '/destinations/northern-norway',
        linkText: 'Browse all Northern Norway cities',
      },
      {
        id: 'nn-activities',
        title: 'Activities',
        shortDesc: 'Arctic experiences across every season',
        content:
          'Northern Lights chase tours, dog sledding across frozen lakes, midnight sun hiking, and whale watching \u2014 Northern Norway runs on extreme seasons. Solar Cycle 25 makes 2026\u201327 the last peak aurora window until 2031. The midnight sun delivers 69 days of 24-hour daylight. The wildlife follows the herring.',
        bullets: [
          'Northern Lights Tours \u2014 chase the aurora from Troms\u00F8',
          'Dog Sledding \u2014 husky teams through Arctic wilderness',
          'Midnight Sun \u2014 endless daylight from May to July',
          'Arctic Wildlife \u2014 whales, eagles, and reindeer',
        ],
        bulletDetails: [
          {
            title: 'Northern Lights Tours',
            content: 'Solar Cycle 25 peaked in 2024\u201325 \u2014 the most intense aurora activity in over a decade. The 2026\u201327 season is the final elevated window before the 11-year decline to solar minimum. Troms\u00F8 sits inside the auroral oval at 69\u00B0N. Chase tours depart nightly, driving 50\u2013200 km toward clear skies using real-time magnetometer data.',
            highlights: ['Last peak aurora season until 2031', 'Expert-guided chase tours from Troms\u00F8, nightly Sep\u2013Mar', 'KP3+ geomagnetic storm alerts included', 'Svalbard expeditions from $5,432/person (3 nights)'],
            ctaLink: '/tjenester/northern-lights',
            ctaText: 'Book Northern Lights tours',
          },
          {
            title: 'Dog Sledding',
            content: 'Drive your own team of Alaskan huskies across frozen lakes and through birch forests outside Troms\u00F8 and Alta. Half-day runs cover 20\u201330 km; multi-day expeditions camp on the vidda with your dogs beside you. Season runs November through April \u2014 book early, the best operators fill months ahead.',
            highlights: ['Half-day: 3h, 20\u201330 km, from 1,800 NOK/person', 'Multi-day wilderness camps in lavvu tents', 'Professional kennels with 50\u2013200 dogs', 'Northern Lights combo: day sled + evening aurora chase'],
            ctaLink: '/tjenester/trekking',
            ctaText: 'Book dog sledding',
          },
          {
            title: 'Midnight Sun',
            content: 'North of the Arctic Circle, the sun does not set from mid-May to late July. In Troms\u00F8, midnight sun runs May 18 \u2013 July 26 \u2014 69 consecutive days. This is prime season for hiking, sea kayaking, deep-sea fishing, and coastal cycling under 24-hour golden light.',
            highlights: ['Troms\u00F8 midnight sun: May 18 \u2013 July 26', '24-hour hiking on Fl\u00F8ya and Tromsdalstinden', 'Midnight sea kayaking along the Arctic coast', 'E10 Lofoten road trip in golden midnight light'],
            ctaLink: '/destinations/northern-norway',
            ctaText: 'Plan midnight sun trip',
          },
          {
            title: 'Arctic Wildlife',
            content: 'Humpback and orca pods follow the herring into the fjords from November to January. Sea eagle safaris run year-round from Svolv\u00E6r and Bod\u00F8. In Finnmark, Sami-guided reindeer sledding connects you to a living culture. Puffin colonies nest on R\u00F8st and Bleiksøya from June to August.',
            highlights: ['Whale watching: Nov\u2013Jan, 95%+ sighting rate', 'Sea eagle RIB safaris from Svolv\u00E6r year-round', 'Sami reindeer experiences in Finnmark', 'Puffin colonies: 80,000+ pairs on Bleiksøya'],
            ctaLink: '/tjenester/trekking',
            ctaText: 'Browse wildlife tours',
          },
        ],
        link: '/destinations/northern-norway',
        linkText: 'Browse all activities',
      },
      {
        id: 'nn-events',
        title: 'Events',
        shortDesc: 'Festivals and seasonal happenings',
        content:
          'Events for Northern Norway are coming soon. Check back for festivals, seasonal celebrations, and cultural happenings across the Arctic.',
        bullets: [],
        link: '/travel/events',
        linkText: 'Browse events',
      },
      {
        id: 'nn-tours',
        title: 'Tours',
        shortDesc: 'Guided expeditions and multi-day packages',
        content:
          'Northern Norway is not a self-guided destination for most visitors. The distances are vast, the weather is volatile, and the best experiences require local knowledge. Guided packages combine transport, accommodation, and activities into itineraries that work \u2014 from 3-day aurora breaks to 10-day Arctic coast expeditions.',
        bullets: [
          '3-Day Aurora Break \u2014 Troms\u00F8 base, 2 chase nights',
          '5-Day Arctic Coast \u2014 Troms\u00F8 to Senja to Lofoten',
          '7-Day Finnmark Explorer \u2014 Alta, Karasjok, Hammerfest, North Cape',
          '10-Day Northern Norway Grand \u2014 coast to interior, full circuit',
        ],
        bulletDetails: [
          {
            title: '3-Day Aurora Break',
            content: 'Fly into Troms\u00F8, settle into your hotel, and head out for two consecutive nights of aurora chasing. Guides drive 50\u2013200 km toward clear skies using real-time magnetometer and cloud data. Between chase nights, explore the Arctic Cathedral, Polaria aquarium, and Mack Brewery. Compact, focused, and built around the aurora window.',
            highlights: ['2 nights of guided aurora chasing', 'Central Troms\u00F8 hotel included', 'Daytime city exploration at your own pace', 'Best: October\u2013February for longest dark hours'],
            ctaLink: '/tjenester/northern-lights',
            ctaText: 'Book 3-day aurora break',
          },
          {
            title: '5-Day Arctic Coast',
            content: 'Troms\u00F8 to Senja to Lofoten in five days. Drive the National Tourist Route across Senja, hike Segla, cross to Lofoten via Andøya or Vester\u00E5len, and finish at Reine. Accommodation in rorbuer. This route covers the best of the northern coast without the rushed pace of a 3-day trip.',
            highlights: ['Troms\u00F8 \u2192 Senja \u2192 Vester\u00E5len \u2192 Lofoten', 'Rorbu and boutique accommodation included', 'Segla hike + coastal driving', 'Self-drive or guided options available'],
            ctaLink: '/destinations/northern-norway',
            ctaText: 'See 5-day itinerary',
          },
          {
            title: '7-Day Finnmark Explorer',
            content: 'The interior route: Alta, Karasjok, Hammerfest, and North Cape in one week. Visit the Northern Lights Observatory, the Sami Parliament, and stand at 71\u00B0N. This is the Arctic that most tourists never see \u2014 the Finnmark vidda, the reindeer herders, and the wide-open plateau.',
            highlights: ['Alta \u2192 Karasjok \u2192 Hammerfest \u2192 North Cape', 'Sami Parliament and reindeer experiences', 'Northern Lights Observatory in Alta', 'North Cape at 71\u00B0N \u2014 the symbolic end of Europe'],
            ctaLink: '/destinations/northern-norway',
            ctaText: 'See 7-day itinerary',
          },
          {
            title: '10-Day Northern Norway Grand',
            content: 'The full circuit: Troms\u00F8, Senja, Lofoten, Bod\u00F8, then inland to Alta, Karasjok, and back. Ten days covers both the coast and the interior. You see the fishing villages, the mountains, the Sami heartland, and the Arctic coastline. This is the trip for travelers who want to understand Northern Norway \u2014 not just photograph it.',
            highlights: ['Full coast-to-interior circuit', 'Troms\u00F8, Senja, Lofoten, Alta, Karasjok, Hammerfest', 'Mix of driving, ferries, and short flights', 'All accommodation and key activities included'],
            ctaLink: '/destinations/northern-norway',
            ctaText: 'See 10-day itinerary',
          },
        ],
        link: '/destinations/northern-norway',
        linkText: 'Browse all tours',
      },
      {
        id: 'nn-accommodation',
        title: 'Accommodation',
        shortDesc: 'Rorbuer, lodges, and Arctic hotels',
        content:
          'Northern Norway accommodation ranges from converted fishermen\u2019s cabins (rorbuer) on the coast to wilderness lodges in the Lyngen Alps. Troms\u00F8 has full-service hotels. Lofoten runs on rorbuer. Finnmark offers Sami-run glamping and ice hotels. Book 3\u20136 months ahead for peak aurora and midnight sun seasons.',
        bullets: [
          'Rorbuer \u2014 traditional fishermen\u2019s cabins, coast-wide',
          'Arctic Hotels \u2014 Troms\u00F8, Alta, and Hammerfest',
          'Wilderness Lodges \u2014 Lyngen Alps and Senja',
          'Ice Hotels & Glamping \u2014 Sorrisniva, Finnmark camps',
        ],
        bulletDetails: [
          {
            title: 'Rorbuer',
            content: 'Rorbuer are fishermen\u2019s cabins originally built on stilts over the water so crews could sleep close to their boats during the Lofotfiske season. Today, converted rorbuer are the signature accommodation across the Northern Norway coast \u2014 Svolv\u00E6r, Henningsv\u00E6r, Reine, and Senja all have them. Expect timber walls, a kitchen, and the sound of the sea underneath you.',
            highlights: ['Traditional timber cabins on the water\u2019s edge', 'Self-catering with full kitchen', 'Peak season (Jun\u2013Aug, Dec\u2013Feb): book 3+ months ahead', 'Price range: 1,200\u20133,500 NOK/night'],
            ctaLink: '/travel/accommodation',
            ctaText: 'Browse rorbuer',
          },
          {
            title: 'Arctic Hotels',
            content: 'Troms\u00F8, Alta, and Hammerfest have full-service hotels ranging from budget chains to boutique properties. In Troms\u00F8, Clarion Hotel The Edge and Scandic Ishavshotel sit on the waterfront. Alta has Thon Hotel Alta and the Sorrisniva complex. For aurora-focused stays, pick a hotel with northern-facing rooms and aurora wake-up calls.',
            highlights: ['Troms\u00F8 waterfront hotels with aurora-facing rooms', 'Alta: Thon Hotel and Sorrisniva complex', 'Hammerfest: Thon Hotel and Scandic', 'Aurora wake-up call service at select properties'],
            ctaLink: '/travel/accommodation',
            ctaText: 'Browse Arctic hotels',
          },
          {
            title: 'Wilderness Lodges',
            content: 'The Lyngen Alps and Senja have a growing network of wilderness lodges \u2014 small-scale, off-grid or low-impact properties set against mountain and fjord backdrops. These are not hotel-style operations. Expect 4\u201312 rooms, communal dining, and direct access to hiking, skiing, or kayaking from the front door.',
            highlights: ['4\u201312 rooms per property', 'Lyngen Lodge: ski touring base, fjord views', 'Senja lodges: coastal hiking access', 'Half-board and full-board options available'],
            ctaLink: '/travel/accommodation',
            ctaText: 'Browse wilderness lodges',
          },
          {
            title: 'Ice Hotels & Glamping',
            content: 'Sorrisniva Igloo Hotel in Alta is rebuilt from river ice every November. You sleep in a room carved from ice at \u22125\u00B0C in a thermal sleeping bag on a reindeer-skin bed. Finnmark also has Sami-run glamping camps with heated lavvu tents on the vidda. Both are experience accommodation \u2014 one night is enough, and it is worth it.',
            highlights: ['Sorrisniva: rebuilt every winter from Altaelva river ice', 'Sleep at \u22125\u00B0C in thermal sleeping bags', 'Sami glamping: heated lavvu tents, reindeer-skin beds', 'Book both as one-night experiences'],
            ctaLink: '/travel/accommodation',
            ctaText: 'Browse unique stays',
          },
        ],
        link: '/travel/accommodation',
        linkText: 'Browse all accommodation',
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
