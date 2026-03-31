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
  'lofoten': {
    zoneId: 'lofoten',
    zoneName: 'Lofoten & Islands',
    zoneColor: '#5CBFEE',
    headline: 'Lofoten & Islands',
    subtitle: '170 km of jagged peaks, red rorbuer, and the E10 \u2014 one road in, one road out',
    subcategories: [
      {
        id: 'lo-cities',
        title: 'Cities',
        shortDesc: 'Fishing villages and island basecamps',
        content:
          'Cities and villages for Lofoten & Islands are coming soon. Check back for Svolv\u00E6r, Henningsv\u00E6r, Reine, \u00C5, Stamsund, and Vester\u00E5len basecamps.',
        bullets: [],
        link: '/destinations/lofoten',
        linkText: 'Browse Lofoten villages',
      },
      {
        id: 'lo-activities',
        title: 'Activities',
        shortDesc: 'Hiking, kayaking, and fishing culture',
        content:
          'Activities for Lofoten & Islands are coming soon. Check back for Reinebringen hiking, sea kayaking, stockfish tours, surfing at Unstad, and sea eagle safaris.',
        bullets: [],
        link: '/destinations/lofoten',
        linkText: 'Browse activities',
      },
      {
        id: 'lo-events',
        title: 'Events',
        shortDesc: 'Skrei festivals and island happenings',
        content:
          'Events for Lofoten & Islands are coming soon. Check back for the Lofoten Skrei Festival, chamber music festivals, and seasonal happenings.',
        bullets: [],
        link: '/destinations/lofoten',
        linkText: 'Browse events',
      },
      {
        id: 'lo-tours',
        title: 'Tours',
        shortDesc: 'Guided island itineraries',
        content:
          'Tours for Lofoten & Islands are coming soon. Check back for guided E10 road trips, multi-day hiking packages, and fishing village tours.',
        bullets: [],
        link: '/destinations/lofoten',
        linkText: 'Browse tours',
      },
      {
        id: 'lo-accommodation',
        title: 'Accommodation',
        shortDesc: 'Rorbuer, cabins, and coastal lodges',
        content:
          'Accommodation for Lofoten & Islands is coming soon. Check back for rorbuer in Reine and Henningsv\u00E6r, coastal lodges, and camping options.',
        bullets: [],
        link: '/destinations/lofoten',
        linkText: 'Browse accommodation',
      },
    ],
  },
  'svalbard': {
    zoneId: 'svalbard',
    zoneName: 'Svalbard',
    zoneColor: '#00CC6A',
    headline: 'Explore Svalbard',
    subtitle: '78\u00B0N \u2014 polar bears, glaciers, and the far Arctic',
    subcategories: [
      {
        id: 'sv-cities',
        title: 'Cities',
        shortDesc: 'Settlements at the edge of the world',
        content:
          'Svalbard has one town: Longyearbyen, population 2,400. It is the world\u2019s northernmost settlement with a permanent population, a university, a brewery, and a seed vault. Ny-\u00C5lesund is a research station, not a town. Barentsburg is a Russian mining settlement with a population under 500. Everything starts and ends in Longyearbyen.',
        bullets: [],
        link: '/destinations/svalbard',
        linkText: 'Browse Svalbard',
      },
      {
        id: 'sv-activities',
        title: 'Activities',
        shortDesc: 'Expeditions in the high Arctic',
        content:
          'Activities on Svalbard are coming soon. Check back for glacier hiking, snowmobile expeditions, polar bear safaris, and Arctic kayaking.',
        bullets: [],
        link: '/destinations/svalbard',
        linkText: 'Browse activities',
      },
      {
        id: 'sv-events',
        title: 'Events',
        shortDesc: 'Polar festivals and seasonal happenings',
        content:
          'Events for Svalbard are coming soon. Check back for festivals, seasonal celebrations, and cultural happenings in the high Arctic.',
        bullets: [],
        link: '/destinations/svalbard',
        linkText: 'Browse events',
      },
      {
        id: 'sv-tours',
        title: 'Tours',
        shortDesc: 'Guided Arctic expeditions',
        content:
          'Tours for Svalbard are coming soon. Check back for guided expedition packages, multi-day itineraries, and cruise options.',
        bullets: [],
        link: '/destinations/svalbard',
        linkText: 'Browse tours',
      },
      {
        id: 'sv-accommodation',
        title: 'Accommodation',
        shortDesc: 'Where to stay in Longyearbyen',
        content:
          'Accommodation for Svalbard is coming soon. Check back for hotels, guesthouses, and expedition lodges in Longyearbyen.',
        bullets: [],
        link: '/destinations/svalbard',
        linkText: 'Browse accommodation',
      },
    ],
  },
  'fjords': {
    zoneId: 'fjords',
    zoneName: 'Fjords Experience',
    zoneColor: '#5CBFEE',
    headline: 'Fjords Experience',
    subtitle: 'Two UNESCO fjords, zero-emission cruises, and the roads that connect them',
    subcategories: [
      {
        id: 'fj-cities',
        title: 'Cities',
        shortDesc: 'Fjord basecamps and gateway towns',
        content:
          'Seven basecamps spread along Vestlandet\u2019s coast and deep into the fjord valleys. Bergen is the gateway \u2014 260 days of rain and 900 years of history. Fl\u00E5m sits at the bottom of Aurlandsfjord with 350 permanent residents and one of the world\u2019s steepest railway lines. \u00C5lesund rebuilt in Art Nouveau after the 1904 fire. Each town serves a different fjord and a different purpose on your itinerary.',
        bullets: [
          'Bergen \u2014 Vestlandet capital, Bryggen UNESCO site, fjord gateway',
          'Fl\u00E5m \u2014 Aurlandsfjord, Fl\u00E5m Railway, population 350',
          '\u00C5lesund \u2014 Art Nouveau town, Geirangerfjord gateway',
          'Geiranger \u2014 UNESCO fjord village, seasonal road access',
          'Voss \u2014 Adventure capital, Bergen\u2013fjord midpoint',
          'Odda \u2014 Trolltunga trailhead, inner Hardangerfjord',
          'Balestrand \u2014 Historic fjord village, Kviknes Hotel since 1877',
        ],
        bulletDetails: [
          {
            title: 'Bergen',
            content: 'Bergen sits between seven mountains with 285,000 residents, a UNESCO-listed Hanseatic wharf, and 260 days of rain per year. The Fl\u00F8ibanen funicular climbs to 320 meters. The fish market at Torget opens at 07:00 \u2014 arrive before the cruise ships dock at 09:00. Bergen is the starting point for Sognefjord, Hardangerfjord, and the Norway in a Nutshell route. Direct flights from Oslo, London, Amsterdam, and Copenhagen.',
            highlights: ['Population: 285,000 \u2014 Norway\u2019s second city', 'Bryggen: 14th-century Hanseatic warehouses (UNESCO)', 'Fl\u00F8ibanen funicular to 320m panorama', 'Gateway to Sognefjord, Hardangerfjord, and N\u00E6r\u00F8yfjord'],
            ctaLink: '/destinations/fjords',
            ctaText: 'Explore Bergen',
          },
          {
            title: 'Fl\u00E5m',
            content: 'Fl\u00E5m sits at the inner end of Aurlandsfjord \u2014 a branch of Sognefjord \u2014 with 350 permanent residents, one road in, and one ferry out. The Fl\u00E5m Railway drops 866 meters over 20 km from Myrdal, passing through 20 tunnels. Stegastein viewpoint hangs 650 meters above the fjord floor, 6 km from the village. In summer, up to 300,000 cruise passengers disembark here. Come early or come in September.',
            highlights: ['Fl\u00E5m Railway: 866m descent over 20 km, 20 tunnels', 'Stegastein viewpoint: 650m above Aurlandsfjord', 'Ferry connections to Gudvangen and N\u00E6r\u00F8yfjord', 'Peak season: June\u2013August, 300,000+ cruise visitors'],
            ctaLink: '/destinations/fjords',
            ctaText: 'Explore Fl\u00E5m',
          },
          {
            title: '\u00C5lesund',
            content: '\u00C5lesund burned to the ground on January 23, 1904. Kaiser Wilhelm II funded the rebuild. The entire town centre went up in Art Nouveau within three years \u2014 the most concentrated collection of Jugendstil architecture in Scandinavia. Aksla viewpoint (418 steps) gives you the town, the islands, and the ocean in one frame. From here, Geirangerfjord is 106 km and 3.5 hours by road via the \u00D8rnevegen (Eagle Road).',
            highlights: ['Art Nouveau town centre \u2014 rebuilt 1904\u20131907', 'Aksla viewpoint: 418 steps to the top', 'Gateway to Geirangerfjord via \u00D8rnevegen (Eagle Road)', 'Atlantic Road (Atlanterhavsveien): 30 km west'],
            ctaLink: '/destinations/fjords',
            ctaText: 'Explore \u00C5lesund',
          },
          {
            title: 'Geiranger',
            content: 'Geiranger sits at the head of Geirangerfjord \u2014 15 km long, 250 meters wide, UNESCO-listed since 2005. The village has 200 permanent residents and receives 900,000 visitors per season. The road in (Rv63) crosses the \u00D8rnevegen with 11 hairpin bends. Trollstigen pass connects south and closes October to May. The Seven Sisters waterfall drops 250 meters into the fjord. Come in September when the cruise ships thin out.',
            highlights: ['Geirangerfjord: UNESCO since 2005, 15 km long', 'Seven Sisters waterfall: 250m drop into the fjord', '\u00D8rnevegen (Eagle Road): 11 hairpin bends', 'Rv63 via Trollstigen \u2014 closed October\u2013May'],
            ctaLink: '/destinations/fjords',
            ctaText: 'Explore Geiranger',
          },
          {
            title: 'Voss',
            content: 'Voss sits between Bergen and the inner fjords \u2014 a transport hub and Norway\u2019s self-declared adventure capital. The Bergen Railway stops here. Lake Vangsvatnet anchors the town. In summer, Voss runs on skydiving, river rafting on the Stranda, and paragliding from Hangurstoppen (820m). In winter, Voss Resort has 40 km of alpine runs. It is the logical midpoint between Bergen airport and Fl\u00E5m.',
            highlights: ['Bergen Railway stop \u2014 1.5 hours from Bergen', 'River rafting, paragliding, and skydiving hub', 'Voss Resort: 40 km alpine skiing in winter', 'Midpoint between Bergen and Fl\u00E5m'],
            ctaLink: '/destinations/fjords',
            ctaText: 'Explore Voss',
          },
          {
            title: 'Odda',
            content: 'Odda is the basecamp for Trolltunga \u2014 the rock ledge jutting 700 meters above Ringedalsvatnet. The town sits at the southern end of S\u00F8rfjorden, an arm of Hardangerfjord. The hike to Trolltunga is 27 km round-trip with 800 meters of elevation gain and takes 10\u201312 hours. A guide is required from October to May. Odda itself is a former industrial town that has reinvented itself around adventure tourism.',
            highlights: ['Trolltunga trailhead: 27 km round-trip, 10\u201312 hours', 'Trolltunga guided only October\u2013May', 'Inner Hardangerfjord location', 'Folgefonna glacier: summer skiing on the plateau above'],
            ctaLink: '/destinations/fjords',
            ctaText: 'Explore Odda',
          },
          {
            title: 'Balestrand',
            content: 'Balestrand sits on the north shore of Sognefjord and has drawn painters, writers, and tourists since the 1850s. Kviknes Hotel has operated here since 1877 \u2014 one of Norway\u2019s grand fjord hotels. The village has 800 residents, a stave-style church built by an English clergyman in 1897, and express boat connections to Bergen, Fl\u00E5m, and Vik. The Sognefjord stretches 205 km from here to the coast.',
            highlights: ['Kviknes Hotel: operating since 1877', 'Express boat to Bergen, Fl\u00E5m, and Vik', 'Sognefjord: 205 km long, 1,308m at deepest', 'St. Olaf\u2019s Church: English-built stave style, 1897'],
            ctaLink: '/destinations/fjords',
            ctaText: 'Explore Balestrand',
          },
        ],
        link: '/destinations/fjords',
        linkText: 'Browse all fjord cities',
      },
      {
        id: 'fj-activities',
        title: 'Activities',
        shortDesc: 'Cruises, kayaking, and fjord hiking',
        content:
          'Electric fjord cruises through UNESCO waters, sea kayaking beneath 1,000-meter walls, the Fl\u00E5m Railway descent, and cliff hikes that drop straight to the waterline \u2014 the fjords run on water, gradient, and verticality. Zero-emission vessels now cover both Geirangerfjord and N\u00E6r\u00F8yfjord. The hiking season opens in June and closes when the snow returns in October.',
        bullets: [
          'Fjord Cruises \u2014 zero-emission vessels on UNESCO fjords',
          'Kayaking \u2014 sea kayaking in N\u00E6r\u00F8yfjord and Geirangerfjord',
          'Scenic Railways \u2014 Fl\u00E5m Railway and the Bergen Line',
          'Fjord Hiking \u2014 Trolltunga, Preikestolen, Romsdalseggen',
        ],
        bulletDetails: [
          {
            title: 'Fjord Cruises',
            content: 'Norway mandated zero-emission fjord cruising by 2026 \u2014 Geirangerfjord and N\u00E6r\u00F8yfjord are the first enforcement zones. The Future of The Fjords (electric catamaran) runs N\u00E6r\u00F8yfjord daily from Gudvangen to Fl\u00E5m. Havila Voyages operates hybrid vessels on the coastal route. A Geirangerfjord cruise from Geiranger to Hellesylt covers 15 km past the Seven Sisters, Suitor, and Bridal Veil waterfalls.',
            highlights: ['Zero-emission mandate for UNESCO fjords from 2026', 'Future of The Fjords: all-electric, Gudvangen\u2013Fl\u00E5m daily', 'Geirangerfjord: 15 km past the Seven Sisters waterfall', 'Sognefjord cruises: longest fjord in Norway at 205 km'],
            ctaLink: '/tjenester/fjord-cruises',
            ctaText: 'Book fjord cruises',
          },
          {
            title: 'Kayaking',
            content: 'N\u00E6r\u00F8yfjord narrows to 250 meters between walls that rise 1,000 meters on both sides. In a kayak, you hear the waterfalls before you see them. Guided half-day trips paddle 8\u201312 km from Gudvangen or Bakka. Full-day expeditions reach Dyrdal and the abandoned farms at the water\u2019s edge. Geirangerfjord kayaking runs from Geiranger village with views up to the Seven Sisters. Season: May to September. Water temperature: 8\u201314\u00B0C.',
            highlights: ['N\u00E6r\u00F8yfjord: 250m wide, 1,000m walls on both sides', 'Half-day guided: 8\u201312 km, from 890 NOK/person', 'Geirangerfjord kayaking beneath the Seven Sisters', 'Season: May\u2013September, drysuits provided'],
            ctaLink: '/tjenester/fjord-cruises',
            ctaText: 'Book kayaking tours',
          },
          {
            title: 'Scenic Railways',
            content: 'The Fl\u00E5m Railway drops 866 meters over 20 km from Myrdal to Fl\u00E5m \u2014 one of the steepest standard-gauge lines in the world. Twenty tunnels, eighteen of them hand-carved. The train pauses at Kjosfossen waterfall (225m). The Bergen Railway from Oslo to Bergen covers 500 km across the Hardangervidda plateau at 1,222 meters above sea level. Combine both on the Norway in a Nutshell route.',
            highlights: ['Fl\u00E5m Railway: 866m descent, 20 km, 20 tunnels', 'Kjosfossen waterfall stop: 225m cascade beside the tracks', 'Bergen Railway: 500 km, crosses Hardangervidda at 1,222m', 'Norway in a Nutshell: Bergen Railway + Fl\u00E5m Railway + fjord ferry'],
            ctaLink: '/destinations/fjords',
            ctaText: 'Plan scenic rail trips',
          },
          {
            title: 'Fjord Hiking',
            content: 'Trolltunga is a 27 km round-trip to a rock ledge 700 meters above Ringedalsvatnet \u2014 plan 10\u201312 hours and do not underestimate the elevation. Preikestolen (Pulpit Rock) is a 604-meter vertical drop into Lysefjord, 8 km round-trip from the trailhead near Stavanger. Romsdalseggen ridge runs 10 km above \u00C5ndalsnes with 800 meters of exposure. All three require proper boots, rain gear, and respect for the weather.',
            highlights: ['Trolltunga: 27 km round-trip, 800m gain, 10\u201312 hours', 'Preikestolen: 604m cliff, 8 km round-trip, 4 hours', 'Romsdalseggen: 10 km ridge hike above \u00C5ndalsnes', 'Guided required for Trolltunga October\u2013May'],
            ctaLink: '/tjenester/trekking',
            ctaText: 'Browse fjord hikes',
          },
        ],
        link: '/destinations/fjords',
        linkText: 'Browse all activities',
      },
      {
        id: 'fj-events',
        title: 'Events',
        shortDesc: 'Fjord festivals and seasonal happenings',
        content:
          'Events for the fjords region are coming soon. Check back for festivals, seasonal celebrations, and cultural happenings across Vestlandet.',
        bullets: [],
        link: '/travel/events',
        linkText: 'Browse events',
      },
      {
        id: 'fj-tours',
        title: 'Tours',
        shortDesc: 'Guided fjord itineraries and multi-day packages',
        content:
          'The fjord roads are not straight, the ferry schedules are not obvious, and Google Maps does not account for single-lane tunnels. Guided packages and self-drive itineraries combine the ferries, railways, and mountain passes into routes that work \u2014 from a 3-day Norway in a Nutshell circuit to a 10-day Vestlandet grand tour.',
        bullets: [
          '3-Day Norway in a Nutshell \u2014 Bergen, Fl\u00E5m Railway, N\u00E6r\u00F8yfjord',
          '5-Day Hardangerfjord & Sognefjord \u2014 two fjords, one trip',
          '7-Day Fjords & Mountains \u2014 coast to Trollstigen to Geiranger',
          '10-Day Vestlandet Grand \u2014 Bergen to \u00C5lesund, every fjord between',
        ],
        bulletDetails: [
          {
            title: '3-Day Norway in a Nutshell',
            content: 'Bergen to Fl\u00E5m via the Bergen Railway to Myrdal, Fl\u00E5m Railway down to Aurlandsfjord, ferry through N\u00E6r\u00F8yfjord to Gudvangen, bus over Stalheimskleiva to Voss, train back to Bergen. The full loop in one day is rushed \u2014 three days lets you stay overnight in Fl\u00E5m and kayak the fjord before the cruise ships arrive.',
            highlights: ['Bergen Railway + Fl\u00E5m Railway + N\u00E6r\u00F8yfjord ferry', 'Overnight in Fl\u00E5m for early-morning fjord access', 'Stegastein viewpoint day trip from Fl\u00E5m', 'Self-guided or escorted options available'],
            ctaLink: '/tjenester/fjord-cruises',
            ctaText: 'Book Nutshell route',
          },
          {
            title: '5-Day Hardangerfjord & Sognefjord',
            content: 'Bergen to Hardangerfjord via the Hardanger Bridge (longest suspension bridge in Norway at 1,380 meters). Drive the Hardangervidda National Tourist Route to Odda, hike Trolltunga, cross to Sognefjord via Rv13 and the Vikafjellet pass. Take the express boat from Balestrand to Bergen. Five days covers both of Norway\u2019s deepest fjords without the rushed pace.',
            highlights: ['Hardanger Bridge: 1,380m suspension span', 'Trolltunga hike from Odda (full day)', 'Rv13 over Vikafjellet pass between fjords', 'Express boat Balestrand \u2192 Bergen to close the loop'],
            ctaLink: '/destinations/fjords',
            ctaText: 'See 5-day itinerary',
          },
          {
            title: '7-Day Fjords & Mountains',
            content: 'Bergen to \u00C5lesund through every landscape Vestlandet offers. Sognefjord by ferry, Fl\u00E5m Railway, Rv55 over Sognefjellet (Norway\u2019s highest mountain pass at 1,434m, open mid-May to October), down to Geiranger, Trollstigen pass with 11 hairpin bends, and \u00C5lesund\u2019s Art Nouveau waterfront. Seven days, four ferries, and two mountain passes.',
            highlights: ['Bergen \u2192 Sognefjord \u2192 Sognefjellet \u2192 Geiranger \u2192 Trollstigen \u2192 \u00C5lesund', 'Sognefjellet: highest mountain pass, 1,434m (open May\u2013Oct)', 'Trollstigen: 11 hairpin bends, closed Oct\u2013May', 'Four ferry crossings included in route'],
            ctaLink: '/destinations/fjords',
            ctaText: 'See 7-day itinerary',
          },
          {
            title: '10-Day Vestlandet Grand',
            content: 'The full circuit: Bergen to Hardangerfjord, Odda, Trolltunga, across to Sognefjord, Fl\u00E5m, Balestrand, Sognefjellet, Geiranger, Trollstigen, \u00C5lesund, and the Atlantic Road. Ten days covers every major fjord, mountain pass, and railway in western Norway. Expect 1,200 km of driving, six ferry crossings, and at least three mountain passes that close in winter.',
            highlights: ['Full Bergen to \u00C5lesund coastal and fjord circuit', 'Trolltunga, Geirangerfjord, Trollstigen, Atlantic Road', '1,200 km driving, six ferries, three mountain passes', 'All accommodation and ferry bookings included'],
            ctaLink: '/destinations/fjords',
            ctaText: 'See 10-day itinerary',
          },
        ],
        link: '/destinations/fjords',
        linkText: 'Browse all tours',
      },
      {
        id: 'fj-accommodation',
        title: 'Accommodation',
        shortDesc: 'Historic hotels, fjord cabins, and waterside lodges',
        content:
          'Fjord accommodation ranges from 19th-century grand hotels built for the first wave of fjord tourists to converted boathouses and farmsteads on the waterline. Bergen has full-service hotels. The inner fjord villages run on cabins and small lodges. Fl\u00E5m fills fast \u2014 book 2\u20134 months ahead for June to August. September has availability and lower prices.',
        bullets: [
          'Historic Fjord Hotels \u2014 Kviknes, Stalheim, Fl\u00E5msbrygga',
          'Fjord Cabins \u2014 self-catering on the waterline',
          'Bergen City Hotels \u2014 Bryggen-side to boutique',
          'Camping & Glamping \u2014 fjord-edge sites with mountain views',
        ],
        bulletDetails: [
          {
            title: 'Historic Fjord Hotels',
            content: 'Norway\u2019s grand fjord hotels were built in the 1880s\u20131900s when European aristocrats first discovered the fjords. Kviknes Hotel in Balestrand (1877) overlooks Sognefjord. Stalheim Hotel sits 300 meters above N\u00E6r\u00F8ydalen with a view that Kaiser Wilhelm called the finest in Norway. Hotel Union in Geiranger has hosted guests since 1891. These are not chain hotels \u2014 they are buildings with 130 years of guest books.',
            highlights: ['Kviknes Hotel, Balestrand: since 1877, Sognefjord views', 'Stalheim Hotel: 300m above N\u00E6r\u00F8ydalen valley', 'Hotel Union Geiranger: operating since 1891', 'Peak season (Jun\u2013Aug): book 3\u20136 months ahead'],
            ctaLink: '/travel/accommodation',
            ctaText: 'Browse historic hotels',
          },
          {
            title: 'Fjord Cabins',
            content: 'Self-catering cabins line the fjord edges from Hardangerfjord to Sognefjord. These are typically timber-built, 2\u20136 person, with a kitchen, a deck on the water, and a rowing boat included. In the inner fjords around Fl\u00E5m, Aurland, and Undredal, cabins sit beneath 1,000-meter walls. Expect no room service and no reception desk \u2014 a key code and a stocked kitchen are the standard.',
            highlights: ['Self-catering timber cabins on the fjord edge', '2\u20136 person, full kitchen, waterside deck', 'Rowing boat often included', 'Price range: 1,000\u20132,800 NOK/night'],
            ctaLink: '/travel/accommodation',
            ctaText: 'Browse fjord cabins',
          },
          {
            title: 'Bergen City Hotels',
            content: 'Bergen has the full hotel range \u2014 from budget chains near the train station to Bryggen-side boutique properties. Hotel Havnekontoret occupies a 1920s harbour office on the wharf. Det Hanseatiske Hotel sits inside the Bryggen UNESCO zone. For fjord trip logistics, stay near Strandkaiterminalen (the express boat terminal) to catch early departures to Sognefjord and Hardangerfjord.',
            highlights: ['Bryggen-side boutique hotels in UNESCO zone', 'Budget options near Bergen train station', 'Stay near Strandkaiterminalen for ferry departures', 'Waterfront properties with Fl\u00F8yen views'],
            ctaLink: '/travel/accommodation',
            ctaText: 'Browse Bergen hotels',
          },
          {
            title: 'Camping & Glamping',
            content: 'Fjord-edge campsites sit between the water and the mountain wall. Fl\u00E5m Camping and Vinje Camping in Aurland put you on the Aurlandsfjord shore. Geiranger Camping has walk-in access to the village and the ferry terminal. For glamping, the Hardangerfjord has canvas-tent operations with heated beds and fjord views \u2014 the comfort without the concrete. Wild camping under Allemannsretten is permitted 150 meters from buildings, 2-night limit.',
            highlights: ['Fl\u00E5m Camping: directly on Aurlandsfjord shore', 'Geiranger Camping: walk to village and ferry', 'Glamping: heated canvas tents, Hardangerfjord views', 'Wild camping: 150m from buildings, 2-night limit (Allemannsretten)'],
            ctaLink: '/travel/accommodation',
            ctaText: 'Browse camping options',
          },
        ],
        link: '/travel/accommodation',
        linkText: 'Browse all accommodation',
      },
    ],
  },
  'cities': {
    zoneId: 'cities',
    zoneName: 'Cities of Norway',
    zoneColor: '#FFFFFF',
    headline: 'Cities of Norway',
    subtitle: 'Five cities, five entry points \u2014 each with a different Norway behind it',
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
        bulletDetails: [
          {
            title: 'Mathallen Food Hall',
            content: 'Mathallen sits in the Vulkan district along the Akerselva river. Over 30 vendors sell everything from reindeer cured meats to Lofoten stockfish to Norwegian craft beer. This is where Oslo chefs shop on their days off. The weekend market on Saturdays brings in small producers from the surrounding counties. Arrive before noon \u2014 the popular stalls sell out.',
            highlights: ['30+ food vendors and restaurants under one roof', 'Vulkan district along Akerselva \u2014 10 min walk from Gr\u00FCnerl\u00F8kka', 'Saturday producer market with regional specialities', 'Open Tue\u2013Sun, closed Mondays'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Oslo visit',
          },
          {
            title: 'Munch Museum',
            content: 'The new Munch Museum opened in 2021 on the Bj\u00F8rvika waterfront \u2014 13 stories of aluminium and glass holding the largest collection of Edvard Munch\u2019s work. Over 26,000 pieces including paintings, prints, drawings, and personal letters. The Scream is here, behind glass, in a dedicated room. The rooftop bar has views across the Oslofjord. Book timed entry online to skip the queue.',
            highlights: ['26,000+ works by Edvard Munch', '13-storey building on the Bj\u00F8rvika waterfront', 'Timed entry \u2014 book online to avoid queues', 'Rooftop bar with Oslofjord panorama'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Oslo visit',
          },
          {
            title: 'Nordmarka Forest Hiking',
            content: 'Take T-bane line 1 from the city centre to Frognerseteren \u2014 25 minutes, single ticket. Step off the train and you are standing at the edge of Nordmarka, 1,700 km\u00B2 of forest with marked trails, lakes, and DNT cabins. In winter, the same trails become cross-country ski tracks with floodlights. Ullevålseter cabin serves waffles with brown cheese year-round. No car needed.',
            highlights: ['T-bane line 1 to Frognerseteren: 25 min from centre', '1,700 km\u00B2 of marked forest trails', 'Winter: floodlit cross-country ski tracks', 'Ullevålseter DNT cabin \u2014 waffles and brown cheese'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Oslo visit',
          },
          {
            title: 'Bygd\u00F8y Peninsula Museums',
            content: 'Bygd\u00F8y is a 10-minute ferry ride from Aker Brygge (or bus 30). Three museums sit within walking distance of each other: the Fram Museum houses the polar exploration vessel Fram \u2014 the strongest wooden ship ever built. The Kon-Tiki Museum holds Thor Heyerdahl\u2019s balsa raft. The Norwegian Maritime Museum covers 2,000 years of coastal history. Budget half a day minimum.',
            highlights: ['Ferry from Aker Brygge: 10 min, runs every 20 min in summer', 'Fram Museum: the actual polar ship, walk on board', 'Kon-Tiki Museum: Heyerdahl\u2019s original balsa raft', 'Half-day minimum for all three museums'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Oslo visit',
          },
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
        bulletDetails: [
          {
            title: 'Bryggen',
            content: 'Bryggen is a row of Hanseatic commercial buildings along the eastern side of V\u00E5gen harbour. The current structures date to 1702, rebuilt after one of Bergen\u2019s many fires, on the same footprint as the original 14th-century trading post. Walk the narrow alleyways behind the facades \u2014 they are unchanged. Visit before 09:00 or after 18:00 in summer. Between those hours, cruise passengers fill the wooden passages.',
            highlights: ['UNESCO World Heritage Site since 1979', 'Hanseatic Museum inside one of the original buildings', 'Best visited before 09:00 or after 18:00 in summer', 'Narrow rear alleyways \u2014 the unchanged medieval layout'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Bergen visit',
          },
          {
            title: 'Fl\u00F8ibanen Funicular',
            content: 'Fl\u00F8ibanen runs from the city centre to the summit of Fl\u00F8yen at 320 meters. The ride takes 6 minutes. From the top, Bergen spreads out below with V\u00E5gen harbour, the surrounding seven mountains, and the North Sea beyond. Walking trails fan out from the summit into the mountain plateau. The return hike down takes 45 minutes through forest.',
            highlights: ['320m summit \u2014 6-minute ride from city centre', 'Runs every 15 min, extended hours in summer', 'Walking trails from the summit across the mountain plateau', 'Hike down to the city: 45 min through forest'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Bergen visit',
          },
          {
            title: 'Fish Market at Torget',
            content: 'The fish market at Torget has been trading since the 1200s. Today it splits into an outdoor market (summer only) and the indoor Mathallen-style hall (year-round). The outdoor stalls sell fresh shrimp, king crab legs, and smoked salmon direct from the boat. Arrive before the first cruise ship docks at 09:00 or the prices rise and the queues double.',
            highlights: ['Trading since the 1200s \u2014 Bergen\u2019s oldest market', 'Outdoor stalls: fresh shrimp, crab, smoked salmon', 'Arrive before 09:00 to beat cruise ship crowds', 'Indoor fish hall open year-round'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Bergen visit',
          },
          {
            title: 'Gateway to the Fjords',
            content: 'Bergen is the starting point for Hardangerfjord and Sognefjord \u2014 Norway\u2019s two longest fjords. Hardangerfjord is 179 km long, reached in 90 minutes by car via the E16. Sognefjord is 204 km long, the deepest in Norway at 1,308 meters, accessed via the Bergen Railway to Myrdal and the Fl\u00E5m Railway down to Aurlandsfjord. Both routes involve ferries. Check timetables before you drive.',
            highlights: ['Hardangerfjord: 179 km, 90 min drive from Bergen', 'Sognefjord: 204 km, 1,308m deep \u2014 Norway\u2019s deepest', 'Bergen Railway + Fl\u00E5m Railway to Aurlandsfjord', 'Ferry crossings required \u2014 check seasonal timetables'],
            ctaLink: '/destinations/fjords',
            ctaText: 'Explore the fjords',
          },
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
        bulletDetails: [
          {
            title: 'Nidarosdomen',
            content: 'Nidarosdomen was founded in 1070 over the burial site of St. Olav. It is Scandinavia\u2019s only medieval cathedral still used for royal coronations and blessings. The west front has over 70 stone sculptures. The stained glass rose window by Gabriel Kielland faces west and catches the evening light. The crown jewels are displayed in the side chapel. Guided tours run daily in summer.',
            highlights: ['Founded 1070 \u2014 built over the burial site of St. Olav', 'Scandinavia\u2019s only medieval coronation cathedral', 'West front: 70+ carved stone figures', 'Crown jewels on display in the side chapel'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Trondheim visit',
          },
          {
            title: 'Bakklandet',
            content: 'Bakklandet runs along the east bank of the Nidelva river. The wooden houses date to the 18th century, painted in ochre, red, and white, lining cobblestone lanes. Gamle Bybro (the Old Town Bridge, 1681) connects Bakklandet to the city centre. The caf\u00E9s here are where Trondheim locals spend their weekends. Baklandet Skydsstation serves traditional Norwegian food in a building from 1700.',
            highlights: ['18th-century wooden houses along the Nidelva', 'Gamle Bybro: the Old Town Bridge, built 1681', 'Baklandet Skydsstation \u2014 traditional food since 1700', 'Best explored on foot \u2014 15 min walk from Nidarosdomen'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Trondheim visit',
          },
          {
            title: 'Ravnkloa Fish Market',
            content: 'Ravnkloa sits at the mouth of the Nidelva where it meets the Trondheimsfjord. The fish market sells the day\u2019s catch from the boats moored alongside. King crab, fresh shrimp, and smoked trout from local producers. The harbour restaurant Havfruen serves shellfish platters with a view of Munkholmen island. This is where the locals buy fish \u2014 not the supermarket.',
            highlights: ['Harbour-side location at the Nidelva mouth', 'Daily catch direct from the boats', 'Havfruen restaurant \u2014 shellfish and fjord views', 'Munkholmen island visible across the water'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Trondheim visit',
          },
          {
            title: 'Cycling City',
            content: 'Trondheim built the world\u2019s first bicycle lift in 1993 \u2014 the Trampe (now CycloCable) hauls cyclists up the steep Brubakken hill. The city has 200 km of cycling paths and a bike-share system with stations across the centre. In a city with Trondheim\u2019s hills, the lift is not a novelty \u2014 it is infrastructure. The main cycling route follows the Nidelva from Bakklandet south to Lade.',
            highlights: ['World\u2019s first bicycle lift: Trampe/CycloCable at Brubakken', '200 km of cycling paths across the city', 'Bike-share system with city-wide stations', 'Nidelva riverside route: Bakklandet to Lade'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Trondheim visit',
          },
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
        bulletDetails: [
          {
            title: 'Preikestolen (Pulpit Rock)',
            content: 'Preikestolen is a 25\u00D725 meter flat cliff top that drops 604 meters straight into Lysefjord. The trailhead at Preikestolen Fjellstue is 25 km from Stavanger by car, including a ferry crossing from Tau. The hike is 8 km return, 4 hours, 500 meters of elevation gain. DNT Blue grade \u2014 steep sections over rock slabs. No railings at the top. In peak summer, 300,000 people hike this trail. Start before 07:00 or after 16:00.',
            highlights: ['604m vertical drop into Lysefjord \u2014 no railings', '8 km return, 4 hours, 500m elevation gain', 'Ferry from Stavanger to Tau required', 'Start before 07:00 or after 16:00 to avoid crowds'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Stavanger visit',
          },
          {
            title: 'Nuart Street Art Festival',
            content: 'Nuart was founded in 2001 and runs every September. International street artists are invited to create large-scale murals across Stavanger\u2019s city centre. The result is a permanent open-air gallery \u2014 over 100 works on walls, gables, and underpasses. The festival includes talks, workshops, and guided mural walks. Self-guided maps are available year-round from the tourist office.',
            highlights: ['Founded 2001 \u2014 one of Europe\u2019s leading street art festivals', 'September annually \u2014 new murals each year', '100+ permanent works across the city centre', 'Self-guided mural walk maps available year-round'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Stavanger visit',
          },
          {
            title: 'Gamle Stavanger',
            content: 'Gamle Stavanger is 173 white wooden houses from the late 18th and early 19th century, packed into narrow cobblestone streets on the west side of V\u00E5gen harbour. It is the best-preserved wooden house settlement in Northern Europe. These are not museum pieces \u2014 people live in them. Walk quietly. The canning museum (Norsk Hermetikkmuseum) sits in the middle of the district and tells the story of Stavanger before oil.',
            highlights: ['173 white wooden houses from the 1700s\u20131800s', 'Best-preserved wooden settlement in Northern Europe', 'Residents live here \u2014 walk respectfully', 'Norsk Hermetikkmuseum: the pre-oil sardine industry'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Stavanger visit',
          },
          {
            title: 'Norwegian Petroleum Museum',
            content: 'Norway\u2019s oil story started in 1969 when the Ekofisk field was discovered in the North Sea. The Petroleum Museum in Stavanger tells that story from the drilling floor up \u2014 full-scale equipment, subsea technology, and the economics that turned Norway from a fishing nation into one of the wealthiest countries on earth. The architecture itself juts into Stavanger harbour like an offshore platform.',
            highlights: ['Full-scale drilling equipment and subsea technology', 'Ekofisk discovery 1969 \u2014 the start of Norway\u2019s oil era', 'Architecture designed to resemble an offshore platform', 'Located on the harbour \u2014 central Stavanger'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Stavanger visit',
          },
        ],
        link: '/destinations/cities',
        linkText: 'Explore Stavanger',
      },
      {
        id: 'kristiansund',
        title: 'Kristiansund',
        shortDesc: 'Clipfish capital, Atlantic Road gateway',
        content:
          'Kristiansund spreads across four islands connected by bridges and an undersea tunnel in M\u00F8re og Romsdal. The city has been the klippfisk (clipfish) capital of Norway since the 18th century \u2014 dried salted cod exported to Portugal, Spain, and Brazil. The Atlantic Road starts 30 km west: 8.3 km of bridges across open ocean between eight islands. In storm conditions, waves break over the carriageway.',
        bullets: [
          'Atlantic Road (Atlanterhavsveien) \u2014 30 km from city centre',
          'Klippfisk heritage \u2014 300 years of salted cod exports',
          'Grip island \u2014 Norway\u2019s smallest former municipality, stave church from 1470',
          'Opera house \u2014 Nordic Opera Festival every February',
        ],
        bulletDetails: [
          {
            title: 'Atlantic Road (Atlanterhavsveien)',
            content: 'The Atlantic Road is 8.3 km of bridges connecting eight islands across open sea between Krist\u00EDansund and Molde. The Storseisundet Bridge is the centrepiece \u2014 designed to look like it drops off into nothing from the driver\u2019s perspective. In autumn storms, waves crash over the roadway. In calm weather, you can spot seals and whales from the viewpoints. The drive takes 30 minutes from Kristiansund. Stop at the fishing platforms along the route.',
            highlights: ['8.3 km across open ocean \u2014 8 bridges', 'Storseisundet Bridge: the signature curve', '30 min drive from Kristiansund centre', 'Autumn storms: waves break over the carriageway'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Kristiansund visit',
          },
          {
            title: 'Klippfisk Heritage',
            content: 'Kristiansund has exported klippfisk (salted and dried cod) since the early 1700s. The fish was shipped to Portugal, Spain, Italy, and Brazil, where it became bacalhau \u2014 still a national dish. At its peak, Kristiansund processed more clipfish than any other town in Norway. The Klippfiskmuseet on Milnbrygga tells the full story, from the salt houses to the trade routes. The town still smells of it on drying days.',
            highlights: ['Klippfisk capital since the 1700s', 'Exported to Portugal, Spain, Brazil as bacalhau', 'Klippfiskmuseet at Milnbrygga \u2014 the full trade story', 'Annual Klippfiskfestivalen in February'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Kristiansund visit',
          },
          {
            title: 'Grip Island',
            content: 'Grip was Norway\u2019s smallest municipality until 1964 \u2014 a cluster of 80 tiny islands 14 km offshore from Kristiansund. The stave church dates to 1470, one of the smallest in Norway, built from driftwood. At its peak, 400 people lived here from fishing alone. Today the island is car-free and has no permanent residents. Summer boat service runs from Kristiansund harbour.',
            highlights: ['Stave church from 1470 \u2014 built from driftwood', 'Norway\u2019s smallest former municipality', '14 km offshore \u2014 summer boat service only', 'Car-free island, no permanent residents'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Kristiansund visit',
          },
          {
            title: 'Opera House & Nordic Opera Festival',
            content: 'Kristiansund has hosted opera since 1928 \u2014 the oldest opera tradition in Norway outside Oslo. The Nordic Opera Festival runs every February in the opera house on Kongens plass. Productions draw performers from across Scandinavia. The building itself is compact and modern, rebuilt after the town was bombed flat in April 1940. Kristiansund was the first Norwegian town destroyed by German bombing.',
            highlights: ['Opera tradition since 1928 \u2014 oldest outside Oslo', 'Nordic Opera Festival every February', 'Town rebuilt after total destruction in April 1940', 'Compact venue on Kongens plass'],
            ctaLink: '/destinations/cities',
            ctaText: 'Plan your Kristiansund visit',
          },
        ],
        link: '/destinations/cities',
        linkText: 'Explore Kristiansund',
      },
    ],
  },
};
