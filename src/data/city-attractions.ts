export interface AttractionStat {
  label: string;
  value: string;
}

export interface AttractionHighlight {
  icon: string;
  title: string;
  body: string;
}

export interface PracticalInfoItem {
  title: string;
  content: string;
}

export interface CityAttraction {
  slug: string;
  citySlug: string;
  cityName: string;
  title: string;
  tagline: string;
  metaDescription: string;
  heroDescription: string;
  heroImage: string;
  heroImageAlt: string;
  stats: AttractionStat[];
  overview: string[];
  highlights: AttractionHighlight[];
  practicalInfo: PracticalInfoItem[];
}

export interface CityData {
  slug: string;
  name: string;
  tagline: string;
  metaDescription: string;
  heroDescription: string;
  heroImage: string;
  heroImageAlt: string;
  stats: AttractionStat[];
  gradient: string;
}

export const cities: CityData[] = [
  {
    slug: 'oslo',
    name: 'Oslo',
    tagline: 'Capital city, fjord and forest',
    metaDescription:
      'Oslo travel guide: Mathallen food hall, Munch Museum, Nordmarka forest hiking, and Bygdøy museums. Practical info for visiting Norway\u2019s capital.',
    heroDescription:
      'Oslo sits at the head of the Oslofjord with 1,700 km\u00B2 of forest wrapping around it from the north. The T-bane reaches the ski jump at Holmenkollen in 20 minutes. Gr\u00FCnerl\u00F8kka has the food. Bygd\u00F8y has the museums. Aker Brygge has the waterfront.',
    heroImage: '/pics/cities/oslo_bjorvika.jpeg',
    heroImageAlt: 'Oslo Bj\u00F8rvika waterfront district at dusk, Norway',
    stats: [
      { label: 'Population', value: '709,000' },
      { label: 'Airport', value: 'OSL Gardermoen' },
      { label: 'Train from airport', value: '19 min (Flytoget)' },
      { label: 'Best time', value: 'May\u2013Sep / Dec' },
    ],
    gradient: 'from-slate-800 to-slate-900',
  },
  {
    slug: 'bergen',
    name: 'Bergen',
    tagline: 'Rain, Bryggen, and seven mountains',
    metaDescription:
      'Bergen travel guide: Bryggen UNESCO site, Fl\u00F8ibanen funicular, Torget fish market, and fjord access. What to see and when to visit.',
    heroDescription:
      'Bergen gets 260 days of rain per year. This is not a warning \u2014 it is the character of the city. The wooden Bryggen warehouses date to the Hanseatic period. Fl\u00F8ibanen takes you to 320 meters. The fish market at Torget opens at 07:00. Come before the cruise ships dock.',
    heroImage: '/pics/cities/Bergen_banner.jpeg',
    heroImageAlt: 'Bergen harbour and Bryggen Hanseatic wharf, Norway',
    stats: [
      { label: 'Population', value: '287,000' },
      { label: 'Airport', value: 'BGO Flesland' },
      { label: 'Rain days/year', value: '~260' },
      { label: 'Best time', value: 'May\u2013Sep' },
    ],
    gradient: 'from-blue-900 to-slate-900',
  },
  {
    slug: 'trondheim',
    name: 'Trondheim',
    tagline: 'Cathedral, cycling, and craft beer',
    metaDescription:
      'Trondheim travel guide: Nidarosdomen cathedral, Bakklandet neighbourhood, Ravnkloa fish market, and Norway\u2019s cycling capital.',
    heroDescription:
      'Trondheim has 190,000 residents, Scandinavia\u2019s only medieval coronation cathedral, and a food scene that rivals Oslo at half the price. Bakklandet runs along the Nidelva with wooden houses from the 1700s. The city has more breweries per capita than any other Norwegian city.',
    heroImage: '/pics/cities/trondheim_banner.jpeg',
    heroImageAlt: 'Trondheim city panorama with the Nidelva river, Norway',
    stats: [
      { label: 'Population', value: '190,000' },
      { label: 'Airport', value: 'TRD V\u00E6rnes' },
      { label: 'Founded', value: '997 AD' },
      { label: 'Best time', value: 'Jun\u2013Sep' },
    ],
    gradient: 'from-emerald-900 to-slate-900',
  },
  {
    slug: 'stavanger',
    name: 'Stavanger',
    tagline: 'Oil capital, street art, Preikestolen',
    metaDescription:
      'Stavanger travel guide: Preikestolen hiking, Nuart street art, Gamle Stavanger wooden houses, and the Petroleum Museum.',
    heroDescription:
      'Stavanger is the base for Preikestolen \u2014 the 604-meter cliff that drops straight into Lysefjord. The city runs on oil money and street art. Nuart Festival has turned the centre into an open-air gallery. Gamle Stavanger has 173 white wooden houses, the best-preserved wooden settlement in Northern Europe.',
    heroImage: '/pics/cities/Stavanger_banner.jpeg',
    heroImageAlt: 'Stavanger harbour and old town, Norway',
    stats: [
      { label: 'Population', value: '144,000' },
      { label: 'Airport', value: 'SVG Sola' },
      { label: 'To Preikestolen', value: '25 km + ferry' },
      { label: 'Best time', value: 'May\u2013Sep' },
    ],
    gradient: 'from-amber-900 to-slate-900',
  },
  {
    slug: 'kristiansund',
    name: 'Kristiansund',
    tagline: 'Clipfish capital, Atlantic Road gateway',
    metaDescription:
      'Kristiansund travel guide: Atlantic Road drive, klippfisk heritage, Grip island stave church, and the Nordic Opera Festival.',
    heroDescription:
      'Kristiansund spreads across four islands connected by bridges and an undersea tunnel in M\u00F8re og Romsdal. The city has been the klippfisk capital of Norway since the 1700s. The Atlantic Road starts 30 km west: 8.3 km of bridges across open ocean.',
    heroImage: '/pics/cities/Kristiansund_banner.jpeg',
    heroImageAlt: 'Kristiansund archipelago and harbour, M\u00F8re og Romsdal, Norway',
    stats: [
      { label: 'Population', value: '24,000' },
      { label: 'Airport', value: 'KSU Kvernberget' },
      { label: 'To Atlantic Road', value: '30 km' },
      { label: 'Best time', value: 'Jun\u2013Sep' },
    ],
    gradient: 'from-cyan-900 to-slate-900',
  },
  {
    slug: 'tromso',
    name: 'Troms\u00F8',
    tagline: 'Arctic capital, Northern Lights basecamp',
    metaDescription:
      'Troms\u00F8 travel guide: Northern Lights chasing, Arctic Cathedral, whale watching, and the gateway to the Arctic. Practical info for visiting Norway\u2019s Arctic capital.',
    heroDescription:
      'Troms\u00F8 sits at 69\u00B0N with 75,000 residents, a university, a brewery, and 69 days of polar night. The city is the main basecamp for Northern Lights trips, whale watching in the fjords, and Svalbard departures. The Arctic Cathedral crosses the sound in Tromsdalen.',
    heroImage: '/pics/Tromso/tromso_banner.jpeg',
    heroImageAlt: 'Troms\u00F8 city and harbour with Arctic Cathedral, Northern Norway',
    stats: [
      { label: 'Population', value: '75,000' },
      { label: 'Airport', value: 'TOS Langnes' },
      { label: 'Polar night', value: 'Nov 21\u2013Jan 21' },
      { label: 'Best time', value: 'Sep\u2013Mar (aurora) / Jun\u2013Aug (midnight sun)' },
    ],
    gradient: 'from-violet-900 to-slate-900',
  },
  {
    slug: 'alta',
    name: 'Alta',
    tagline: 'Canyon, rock carvings, and Northern Lights',
    metaDescription:
      'Alta travel guide: UNESCO rock carvings, Northern Lights observatory at Haldde, dog sledding, and the Alta Canyon. Gateway to Finnmark.',
    heroDescription:
      'Alta sits at 70\u00B0N at the head of the Altafjord in Finnmark. The UNESCO-listed rock carvings at Hj\u00E6mmalu\u0307ft date to 7,000 years ago. The Northern Lights observatory at Haldde sits at 904 meters. The Alta Canyon is Northern Europe\u2019s largest at 400 meters deep.',
    heroImage: '/pics/Finnmark/alta_banner.jpeg',
    heroImageAlt: 'Alta river and canyon landscape, Finnmark, Northern Norway',
    stats: [
      { label: 'Population', value: '21,000' },
      { label: 'Airport', value: 'ALF Alta' },
      { label: 'Canyon depth', value: '400 m' },
      { label: 'Best time', value: 'Sep\u2013Mar (aurora) / Jun\u2013Aug (midnight sun)' },
    ],
    gradient: 'from-indigo-900 to-slate-900',
  },
  {
    slug: 'bodo',
    name: 'Bod\u00F8',
    tagline: 'Saltstraumen, sea eagles, gateway to Lofoten',
    metaDescription:
      'Bod\u00F8 travel guide: Saltstraumen maelstrom, sea eagle safaris, European Capital of Culture 2024, and the Lofoten ferry departure.',
    heroDescription:
      'Bod\u00F8 is the departure point for the Lofoten ferry across the Vestfjord. Saltstraumen, 33 km southeast, is the world\u2019s strongest tidal current at 400 million cubic meters of water per cycle. The city was European Capital of Culture in 2024. Sea eagles nest in the surrounding fjords.',
    heroImage: '/pics/vesteraalen/vesteralen_banner.jpeg',
    heroImageAlt: 'Bod\u00F8 coastline and Vestfjord, Nordland, Northern Norway',
    stats: [
      { label: 'Population', value: '53,000' },
      { label: 'Airport', value: 'BOO Bod\u00F8' },
      { label: 'Ferry to Lofoten', value: 'Bod\u00F8\u2013Moskenes' },
      { label: 'Best time', value: 'Jun\u2013Sep' },
    ],
    gradient: 'from-sky-900 to-slate-900',
  },
  {
    slug: 'hammerfest',
    name: 'Hammerfest',
    tagline: 'One of the northernmost cities in the world',
    metaDescription:
      'Hammerfest travel guide: Royal and Ancient Polar Bear Society, M\u00E9ridian Column UNESCO site, and Arctic town life at 70\u00B0N.',
    heroDescription:
      'Hammerfest sits at 70\u00B040\u2019N on the coast of Finnmark. The Royal and Ancient Polar Bear Society museum dates to 1963. The Meridian Column is a UNESCO World Heritage Site marking the first international scientific collaboration to measure the Earth\u2019s shape. The town was razed in 1944 and rebuilt from scratch.',
    heroImage: '/pics/Finnmark/nordkapp.jpeg',
    heroImageAlt: 'Hammerfest Arctic coastline, Finnmark, Northern Norway',
    stats: [
      { label: 'Population', value: '11,000' },
      { label: 'Airport', value: 'HFT Hammerfest' },
      { label: 'Latitude', value: '70\u00B040\u2019N' },
      { label: 'Best time', value: 'Jun\u2013Sep / Jan\u2013Mar (aurora)' },
    ],
    gradient: 'from-slate-800 to-blue-900',
  },
  {
    slug: 'narvik',
    name: 'Narvik',
    tagline: 'War history, Ofoten railway, and Arctic skiing',
    metaDescription:
      'Narvik travel guide: WWII museum, Narvikfjellet ski resort, Ofoten Line railway, and the gateway to the Lofoten Islands via the E10.',
    heroDescription:
      'Narvik sits on the Ofotfjord in Nordland, connected to Sweden by the Ofoten Line railway built to transport iron ore. The WWII battles of Narvik in 1940 were among the first Allied victories. Narvikfjellet ski resort drops 900 meters to sea level. The E10 to Lofoten starts here.',
    heroImage: '/pics/Tromso/Landscape.jpeg',
    heroImageAlt: 'Narvik and the Ofotfjord surrounded by mountains, Nordland, Northern Norway',
    stats: [
      { label: 'Population', value: '19,000' },
      { label: 'Airport', value: 'EVE Harstad/Narvik' },
      { label: 'E10 to Svolver', value: '230 km' },
      { label: 'Best time', value: 'Jun\u2013Sep / Feb\u2013Apr (skiing)' },
    ],
    gradient: 'from-zinc-800 to-slate-900',
  },
  {
    slug: 'senja',
    name: 'Senja',
    tagline: 'Norway in miniature, fewer crowds',
    metaDescription:
      'Senja travel guide: Segla peak, the National Tourist Route, Husøy fishing village, and Norway\u2019s second-largest island without the Lofoten crowds.',
    heroDescription:
      'Senja is Norway\u2019s second-largest island: fjords, fishing villages, and mountain peaks without the Lofoten visitor pressure. The National Tourist Route along the western coast passes Tungeneset viewpoint and Bergsbotn. Segla peak (639 m) is the signature hike. Hus\u00F8y fishing village sits on a 500-meter-wide island.',
    heroImage: '/pics/senja/senja_banner.jpeg',
    heroImageAlt: 'Senja coastline with dramatic mountains and fjords, Northern Norway',
    stats: [
      { label: 'Area', value: '1,586 km\u00B2' },
      { label: 'Nearest airport', value: 'TOS Troms\u00F8 (3h drive)' },
      { label: 'Segla peak', value: '639 m' },
      { label: 'Best time', value: 'Jun\u2013Sep' },
    ],
    gradient: 'from-teal-900 to-slate-900',
  },
  {
    slug: 'nordkapp',
    name: 'Nordkapp',
    tagline: 'The northernmost point of mainland Europe',
    metaDescription:
      'Nordkapp travel guide: North Cape plateau, midnight sun, Honningsv\u00E5g town, and the 307-meter cliff at 71\u00B010\u2019N.',
    heroDescription:
      'Nordkapp is the 307-meter cliff at 71\u00B010\u2019N marketed as the northernmost point of mainland Europe. Honningsv\u00E5g is the town at the base: 2,500 residents, a fishing harbour, and the Hurtigruten port. The midnight sun is visible from May 14 to July 29. In winter, the plateau is often closed by wind and snow.',
    heroImage: '/pics/nordkapp/nordkapp_banner.jpeg',
    heroImageAlt: 'North Cape plateau and globe monument at midnight sun, Nordkapp, Norway',
    stats: [
      { label: 'Population', value: '2,500 (Honningsv\u00E5g)' },
      { label: 'Airport', value: 'HVG Honningsv\u00E5g' },
      { label: 'Latitude', value: '71\u00B010\u2019N' },
      { label: 'Best time', value: 'May\u2013Jul (midnight sun)' },
    ],
    gradient: 'from-orange-900 to-slate-900',
  },
  {
    slug: 'lyngen',
    name: 'Lyngen',
    tagline: 'Alpine fjord peaks and ski touring',
    metaDescription:
      'Lyngen travel guide: Lyngen Alps ski touring, Arctic alpine climbing, Lyngenfjord scenery, and remote Northern Norway wilderness.',
    heroDescription:
      'The Lyngen Alps rise directly from the Lyngenfjord: glaciated peaks to 1,833 meters with their feet in the Arctic Ocean. The area is the premier ski touring destination in Northern Norway from February to May. In summer, the midnight sun lights the peaks around the clock. The E6 runs along the fjord\u2019s western shore.',
    heroImage: '/pics/lyngen/Lyngen_banner.jpeg',
    heroImageAlt: 'Lyngen Alps rising from the Lyngenfjord, Troms, Northern Norway',
    stats: [
      { label: 'Highest peak', value: 'Jiehkkev\u00E1rri (1,833 m)' },
      { label: 'Nearest airport', value: 'TOS Troms\u00F8 (2h drive)' },
      { label: 'Ski season', value: 'Feb\u2013May' },
      { label: 'Best time', value: 'Feb\u2013May (ski) / Jun\u2013Sep (hike)' },
    ],
    gradient: 'from-blue-900 to-slate-900',
  },
];

export const attractions: CityAttraction[] = [
  // ═══════════════════════════════════════
  // OSLO
  // ═══════════════════════════════════════
  {
    slug: 'mathallen',
    citySlug: 'oslo',
    cityName: 'Oslo',
    title: 'Mathallen Food Hall',
    tagline: 'Where Oslo chefs shop on their days off',
    heroImage: '/pics/cities/oslo_bjorvika.jpeg',
    heroImageAlt: 'Oslo Vulkan and Akerselva riverside district, Norway',
    metaDescription:
      'Mathallen Oslo guide: 30+ food vendors at Vulkan, weekend producer markets, how to get there, and what to eat. The food hall the locals use.',
    heroDescription:
      'Mathallen sits in the Vulkan district along the Akerselva river. Over 30 vendors sell reindeer cured meats, Lofoten stockfish, Norwegian craft beer, and brown cheese from small-batch producers. This is where Oslo\u2019s chefs shop on their days off.',
    stats: [
      { label: 'Location', value: 'Vulkan, Gr\u00FCnerl\u00F8kka' },
      { label: 'Vendors', value: '30+' },
      { label: 'Hours', value: 'Tue\u2013Sun, closed Mon' },
      { label: 'Nearest T-bane', value: 'Sch\u00F8yen / walk from Gr\u00FCnerl\u00F8kka' },
    ],
    overview: [
      'Mathallen opened in 2012 inside a converted industrial building at Vulkan, a former factory district along the Akerselva river. The concept was straightforward: bring Norway\u2019s best small food producers under one roof. It worked. Today, over 30 vendors sell everything from aged Norwegian cheeses to Arctic char, from fresh-baked sourdough to single-origin coffee.',
      'The ground floor is the main market \u2014 counters selling fresh fish, cured meats, spices, and baked goods. The upper level houses sit-down restaurants, a wine bar, and a microbrewery. On Saturdays, the outdoor market along the riverside brings in farmers from \u00D8stlandet with seasonal produce.',
      'This is not a tourist food court. The prices reflect Norwegian reality \u2014 lunch runs 150\u2013250 NOK. But the quality is genuine. The reindeer bresaola at Strøm-Larsen, the brown cheese selection at Brunost-disken, the coffee at Supreme Roastworks \u2014 these are the same products served in Oslo\u2019s best restaurants.',
    ],
    highlights: [
      { icon: '\uD83E\uDDC0', title: 'Norwegian Cheese', body: 'Brunost (brown cheese), Jarlsberg, Nidelven Blue, and small-batch goat cheese from mountain dairies. The brunost is boiled whey, not caramelised sugar \u2014 the common mistranslation.' },
      { icon: '\uD83C\uDF7A', title: 'Craft Beer', body: 'Oslo\u2019s craft beer scene exploded after 2010. Mathallen has a dedicated beer bar with rotating taps from Norwegian microbreweries \u2014 Lervig, Nøgne Ø, and Lindheim among them.' },
      { icon: '\uD83D\uDC1F', title: 'Fresh Seafood', body: 'Whole Arctic char, smoked salmon, cured stockfish, and shrimp straight from the Oslofjord boats. The fish counter at Vulkanfisk is where restaurant chefs place their orders.' },
      { icon: '\uD83C\uDF3E', title: 'Saturday Market', body: 'The outdoor weekend market runs along the Akerselva. Farmers from the surrounding counties sell seasonal vegetables, berries, honey, and freshly pressed apple juice from Hardanger.' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: 'Walk from Gr\u00FCnerl\u00F8kka (10 min) or Storgata (12 min). Tram 11, 12, 13 to Sch\u00F8yen gate. No dedicated parking \u2014 use the Vulkan garage (65 NOK/hour).' },
      { title: 'Opening hours', content: 'Tuesday\u2013Saturday 10:00\u201320:00. Sunday 11:00\u201318:00. Closed Mondays. Individual restaurants may stay open later.' },
      { title: 'What to eat', content: 'Start with the reindeer bresaola at Strøm-Larsen. Try the brunost tasting at the cheese counter. Coffee from Supreme Roastworks. Lunch at Hitchhiker for pan-Asian or Smalhans deli for Nordic.' },
      { title: 'Budget', content: 'Coffee: 50\u201365 NOK. Lunch: 150\u2013250 NOK. Cheese/charcuterie board: 180\u2013280 NOK. Saturday market produce: 40\u2013120 NOK per item.' },
    ],
  },
  {
    slug: 'munch-museum',
    citySlug: 'oslo',
    cityName: 'Oslo',
    title: 'Munch Museum',
    tagline: '26,000 works by Edvard Munch in a 13-storey tower on the waterfront',
    heroImage: '/pics/cities/oslo_opera.jpeg',
    heroImageAlt: 'Oslo Opera House and Bj\u00F8rvika waterfront at dusk, Norway',
    metaDescription:
      'Munch Museum Oslo guide: how to see The Scream, timed entry tickets, rooftop bar, and the full collection of 26,000 works in the Bj\u00F8rvika waterfront tower.',
    heroDescription:
      'The Munch Museum opened in 2021 on the Bj\u00F8rvika waterfront \u2014 a 13-storey tower of perforated aluminium holding the world\u2019s largest collection of Edvard Munch\u2019s work. Over 26,000 pieces: paintings, prints, drawings, sculptures, and personal letters.',
    stats: [
      { label: 'Location', value: 'Bj\u00F8rvika waterfront' },
      { label: 'Collection', value: '26,000+ works' },
      { label: 'Building', value: '13 storeys, opened 2021' },
      { label: 'Tickets', value: 'Timed entry, book online' },
    ],
    overview: [
      'Munch donated his entire collection to the city of Oslo when he died in 1944. For decades, the works were housed in a modest building in T\u00F8yen. The new museum, designed by Estudio Herreros, opened in October 2021 on the Bj\u00F8rvika waterfront \u2014 the same harbour district as the Oslo Opera House.',
      'The building is 60 meters tall with 13 exhibition floors. The exterior is clad in perforated, recycled aluminium panels that shift in transparency with the light. Inside, the galleries rotate selections from the 26,000-piece collection \u2014 no visit shows the same exhibition twice.',
      'The Scream is here. Both the 1893 pastel version and the 1910 tempera painting are displayed in a dedicated, climate-controlled room on the 6th floor. Photography is allowed without flash. The room is small and intentionally quiet.',
      'Beyond The Scream, the collection spans Munch\u2019s full career: the early realist paintings, the Berlin period, the monumental University Aula murals (as studies), and the late self-portraits from Ekely. The breadth is the point \u2014 Munch was not a one-painting artist.',
    ],
    highlights: [
      { icon: '\uD83C\uDFA8', title: 'The Scream', body: 'Both versions are displayed in a dedicated 6th-floor room. The 1893 pastel is the most recognised. Timed entry controls crowd size \u2014 book the first or last slot for the quietest viewing.' },
      { icon: '\uD83C\uDFD7\uFE0F', title: 'Architecture', body: '60 meters tall, clad in recycled aluminium. The building leans 20 degrees at the top \u2014 visible from across the harbour. Designed by Spanish-Norwegian firm Estudio Herreros.' },
      { icon: '\uD83C\uDF78', title: 'Rooftop Bar', body: 'The top floor has a cocktail bar with floor-to-ceiling windows facing the Oslofjord. Open until late on weekends. The view across to Aker Brygge and the fjord islands is worth the drink price.' },
      { icon: '\uD83D\uDCDA', title: 'Rotating Exhibitions', body: 'With 26,000 works, the museum rotates constantly. Temporary exhibitions pair Munch with contemporary artists. Check the current programme before visiting \u2014 each visit is different.' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: 'Bj\u00F8rvika waterfront, next to the Oslo Opera House. Tram 18, 19 to Bj\u00F8rvika. Bus 34, 54, 74 to Operaen. 10-minute walk from Oslo S (central station).' },
      { title: 'Tickets', content: 'Timed entry only \u2014 book online at munchmuseet.no. Adults: 160 NOK. Under 18: free. Oslo Pass: included. Book 2\u20133 days ahead in summer.' },
      { title: 'Time needed', content: '2\u20133 hours minimum. The Scream room takes 15\u201320 minutes. The rotating exhibitions fill 3\u20134 floors. The rooftop bar adds another 30 minutes.' },
      { title: 'Tips', content: 'First slot (10:00) and last slot (before closing) are quietest. The museum shop on the ground floor sells high-quality prints. The waterfront promenade connects directly to the Opera House roof \u2014 walk it after your visit.' },
    ],
  },
  {
    slug: 'nordmarka',
    citySlug: 'oslo',
    cityName: 'Oslo',
    title: 'Nordmarka Forest',
    tagline: 'From city centre to wilderness in 25 minutes by metro',
    heroImage: '/pics/cities/oslo_viegelandsparken.jpeg',
    heroImageAlt: 'Vigeland sculpture park, Oslo, Norway',
    metaDescription:
      'Nordmarka hiking guide from Oslo: T-bane access, marked trails, DNT cabins, winter skiing, and the Ullevålseter waffle stop.',
    heroDescription:
      'Take T-bane line 1 from the city centre to Frognerseteren \u2014 25 minutes, single ticket. Step off the train and you stand at the edge of Nordmarka: 1,700 km\u00B2 of forest with marked trails, lakes, and DNT cabins. No car needed.',
    stats: [
      { label: 'Access', value: 'T-bane line 1 to Frognerseteren' },
      { label: 'Area', value: '1,700 km\u00B2' },
      { label: 'Trails', value: 'DNT-marked, year-round' },
      { label: 'Season', value: 'Hiking: May\u2013Oct / Skiing: Dec\u2013Mar' },
    ],
    overview: [
      'Nordmarka is Oslo\u2019s backyard forest \u2014 1,700 km\u00B2 of spruce, pine, and birch stretching north from the city boundary. The T-bane metro delivers you to the trailhead at Frognerseteren in 25 minutes from the National Theatre station. Same ticket, same zone.',
      'The trail network is maintained by DNT Oslo and marked with blue and red blazes on trees. In summer, the forest fills with hikers, runners, and families heading to the swimming lakes. Sognsvann is the closest lake \u2014 a 3.3 km loop around the shoreline, flat and accessible. Deeper in, the trails thin out and the solitude is real.',
      'In winter, the same trails become cross-country ski tracks. Oslo has 2,600 km of prepared ski trails in the Marka forests \u2014 many of them floodlit until 22:00. Norwegians commute to ski after work. The rental shop at Voksenlia has everything you need.',
      'Ullevålseter is the classic hiking destination: a DNT cabin 8 km from Frognerseteren, serving waffles with brown cheese and sour cream. The hike takes 2 hours each way on well-marked paths. In winter, ski there in 90 minutes.',
    ],
    highlights: [
      { icon: '\uD83D\uDE87', title: 'Metro Access', body: 'T-bane line 1 from Nationaltheatret to Frognerseteren: 25 minutes, regular city ticket (40 NOK). No transfers. Step off the platform and the trail starts.' },
      { icon: '\uD83C\uDFBF', title: 'Winter Skiing', body: '2,600 km of prepared cross-country tracks across the Marka forests. Floodlit trails open until 22:00. Ski rental at Voksenlia. Norwegians ski here after work \u2014 you can too.' },
      { icon: '\uD83E\uDDC7', title: 'Ullevålseter Cabin', body: 'DNT cabin 8 km from Frognerseteren. Famous for waffles with brunost and sour cream. Open weekends year-round, daily in summer. The hike is flat to rolling \u2014 suitable for all levels.' },
      { icon: '\uD83C\uDFCA', title: 'Lake Swimming', body: 'Sognsvann is the closest lake (T-bane to Sognsvann station). 3.3 km loop trail. Swimming from June to August \u2014 water temperature peaks at 20\u00B0C in July. Free, no facilities.' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: 'T-bane line 1 to Frognerseteren (trailhead with views) or Sognsvann (lakeside loop). Regular city ticket. Departures every 15 minutes.' },
      { title: 'What to bring', content: 'Summer: hiking boots, rain jacket, water, snacks. Winter: cross-country skis (rent at Voksenlia or Skiservice near Sognsvann), warm layers, headlamp for evening skiing.' },
      { title: 'Key routes', content: 'Frognerseteren \u2192 Ullevålseter: 8 km, 2 hours, rolling terrain. Sognsvann loop: 3.3 km, 45 min, flat. Frognerseteren \u2192 Tryvann tower: 3 km, 1 hour, uphill with city panorama.' },
      { title: 'Safety', content: 'Trails are well-marked and heavily used. Mobile coverage throughout. In winter, stay on groomed tracks unless you have backcountry experience. Check skiforeningen.no for trail conditions.' },
    ],
  },
  {
    slug: 'bygdoy-museums',
    citySlug: 'oslo',
    cityName: 'Oslo',
    title: 'Bygd\u00F8y Peninsula Museums',
    tagline: 'Four world-class museums on a single peninsula, reachable by ferry',
    heroImage: '/pics/cities/oslo_bjorvika.jpeg',
    heroImageAlt: 'Oslo harbour and waterfront, Norway',
    metaDescription:
      'Bygd\u00F8y museums guide: Fram Museum, Kon-Tiki, Viking Ship Museum, and Norwegian Folk Museum. Ferry access, tickets, and visiting order.',
    heroDescription:
      'Bygd\u00F8y is a 10-minute ferry ride from Aker Brygge. Four museums sit within walking distance of each other: the Fram Museum, the Kon-Tiki Museum, the Norwegian Maritime Museum, and the Norwegian Museum of Cultural History. Budget half a day minimum.',
    stats: [
      { label: 'Location', value: 'Bygd\u00F8y peninsula' },
      { label: 'Ferry', value: '10 min from Aker Brygge' },
      { label: 'Museums', value: '4 major collections' },
      { label: 'Time needed', value: 'Half day minimum' },
    ],
    overview: [
      'Bygd\u00F8y sits on the western side of the Oslofjord, a 10-minute ferry ride from Aker Brygge or a 20-minute bus ride (line 30) from the city centre. The peninsula holds four of Norway\u2019s most significant museums, all within a 15-minute walk of each other.',
      'The Fram Museum houses the polar exploration vessel Fram \u2014 the strongest wooden ship ever built, used by Fridtjof Nansen and Roald Amundsen on their Arctic and Antarctic expeditions. You can walk on the deck, go below, and stand in the same cabin where Amundsen plotted the route to the South Pole.',
      'Next door, the Kon-Tiki Museum holds Thor Heyerdahl\u2019s original balsa raft, which crossed the Pacific in 1947. The Ra II reed boat is also here. Heyerdahl\u2019s expeditions challenged established theories of human migration \u2014 the museum presents both the adventures and the science.',
      'The Norwegian Museum of Cultural History (Norsk Folkemuseum) is an open-air museum with 160 historic buildings relocated from across Norway, including a stave church from Gol dating to 1200. In summer, costumed guides demonstrate traditional crafts.',
    ],
    highlights: [
      { icon: '\u26F5', title: 'Fram Museum', body: 'Walk aboard the Fram \u2014 Nansen took it to 85\u00B0N in 1896, Amundsen sailed it to Antarctica in 1910. The ship is displayed inside a purpose-built hall. The polar simulator on the lower level recreates \u221230\u00B0C conditions.' },
      { icon: '\uD83D\uDEF6', title: 'Kon-Tiki Museum', body: 'Heyerdahl\u2019s original 1947 balsa raft, the Ra II papyrus boat, and expedition artefacts. The museum film shows the Pacific crossing. Small museum \u2014 allow 45\u201360 minutes.' },
      { icon: '\u26EA', title: 'Folk Museum', body: '160 historic buildings from across Norway, including the Gol Stave Church (c. 1200). Open-air grounds with costumed interpreters in summer. Indoor exhibitions on Sami culture and Norwegian folk art.' },
      { icon: '\u26F4\uFE0F', title: 'Ferry from Aker Brygge', body: 'The Bygd\u00F8y ferry departs Aker Brygge every 20 minutes in summer (May\u2013Sep). Regular Ruter ticket. The ride across the fjord takes 10 minutes and drops you at Dronningen pier, 5 minutes from the museums.' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: 'Ferry from Aker Brygge (10 min, every 20 min, May\u2013Sep). Bus 30 from Jernbanetorget year-round (20 min). Cycling: flat route along the waterfront, 25 min from centre.' },
      { title: 'Tickets', content: 'Each museum has separate admission. Fram Museum: 150 NOK. Kon-Tiki: 140 NOK. Folk Museum: 180 NOK. Oslo Pass covers all four. Under 18 free at all museums.' },
      { title: 'Visiting order', content: 'Start with the Fram Museum (largest, most time-intensive). Then Kon-Tiki (next door, 45\u201360 min). Walk to the Folk Museum last (largest grounds, stave church). Skip the Maritime Museum if time is short.' },
      { title: 'Food', content: 'The Folk Museum has a caf\u00E9 in the main building. Otherwise, pack lunch or eat at Aker Brygge before or after the ferry. No good restaurant options on the peninsula itself.' },
    ],
  },

  // ═══════════════════════════════════════
  // BERGEN
  // ═══════════════════════════════════════
  {
    slug: 'bryggen',
    citySlug: 'bergen',
    cityName: 'Bergen',
    title: 'Bryggen',
    tagline: 'Hanseatic trading warehouses from the 14th century, rebuilt after every fire',
    heroImage: '/pics/cities/Bergen_banner.jpeg',
    heroImageAlt: 'Bryggen Hanseatic wharf reflected in V\u00E5gen harbour, Bergen, Norway',
    metaDescription:
      'Bryggen Bergen guide: UNESCO World Heritage Hanseatic wharf, best visiting times, Hanseatic Museum, and the hidden alleyways behind the facades.',
    heroDescription:
      'Bryggen is a row of Hanseatic commercial buildings along the eastern side of V\u00E5gen harbour. The current structures date to 1702, rebuilt after one of Bergen\u2019s many fires, on the same medieval footprint. UNESCO World Heritage since 1979.',
    stats: [
      { label: 'Location', value: 'V\u00E5gen harbour, central Bergen' },
      { label: 'UNESCO status', value: 'Since 1979' },
      { label: 'Current buildings', value: 'Rebuilt 1702' },
      { label: 'Best time to visit', value: 'Before 09:00 or after 18:00' },
    ],
    overview: [
      'Bergen was one of the Hanseatic League\u2019s four major trading offices from the 14th century. German merchants controlled the stockfish trade \u2014 dried cod from Northern Norway exchanged for grain, cloth, and salt from the continent. Bryggen was their base of operations.',
      'The wooden buildings have burned and been rebuilt at least six times. The current row dates to 1702, after the Great Fire. But the plot layout, the narrow alleyways, the building footprints \u2014 these follow the medieval pattern exactly. Walk through the rear passages and you are in a 700-year-old street plan.',
      'The Hanseatic Museum, inside one of the original Bryggen buildings, recreates the living and working conditions of the German merchants. The sleeping quarters are cramped. The stockfish storage rooms still smell of cod. The counting house has original ledgers.',
      'Bryggen is Bergen\u2019s most visited site, and the cruise ship crowds between 09:00 and 15:00 in summer make the narrow passages uncomfortable. Visit early morning or evening. The wooden facades glow in low light, and the alleyways are yours.',
    ],
    highlights: [
      { icon: '\uD83C\uDFDB\uFE0F', title: 'Hanseatic Museum', body: 'Inside an original Bryggen building. Recreated merchant quarters: sleeping bunks, stockfish stores, counting rooms. Separate entrance fee. Allow 45\u201360 minutes.' },
      { icon: '\uD83D\uDEF6', title: 'Hidden Alleyways', body: 'The narrow passages behind the Bryggen facades are the unchanged medieval street layout. Artists\u2019 workshops and small galleries occupy the upper floors. Quieter than the waterfront side.' },
      { icon: '\uD83D\uDD25', title: 'Fire History', body: 'Bergen has burned repeatedly \u2014 1198, 1248, 1476, 1702, 1916, 1955. Bryggen survived each fire by being rebuilt on the same footprint. The 1955 fire led to the archaeological excavations that earned UNESCO status.' },
      { icon: '\uD83D\uDCF7', title: 'Photography', body: 'The wooden facades face west and catch evening light. Best photos: after 18:00 in summer when the cruise passengers have left and the sun hits the coloured wood directly.' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: 'Central Bergen, on V\u00E5gen harbour. 5-minute walk from the Bybanen (light rail) Byparken stop. 10-minute walk from Bergen bus station and train station.' },
      { title: 'Crowds', content: 'Cruise ships dock daily May\u2013Sep. Between 09:00 and 15:00 the Bryggen area is packed. Visit before 09:00 or after 18:00 for the authentic experience.' },
      { title: 'Hanseatic Museum', content: 'Adults: 130 NOK. Located in a separate Bryggen building. Currently split between two locations during renovation \u2014 check hanseatiskemuseum.no for current setup.' },
      { title: 'Nearby', content: 'The Fish Market (Torget) is a 3-minute walk south. Fl\u00F8ibanen funicular station is 5 minutes east. The Bryggen Tracteursted restaurant inside the wharf buildings serves traditional Bergen fish soup.' },
    ],
  },
  {
    slug: 'floibanen',
    citySlug: 'bergen',
    cityName: 'Bergen',
    title: 'Fl\u00F8ibanen Funicular',
    tagline: '320 meters above Bergen in 6 minutes',
    heroImage: '/pics/cities/Bergen_banner.jpeg',
    heroImageAlt: 'Bergen panorama from Fl\u00F8yen mountain, Norway',
    metaDescription:
      'Fl\u00F8ibanen Bergen guide: funicular to Fl\u00F8yen summit, hiking trails, panoramic views, and the walk back down through the forest.',
    heroDescription:
      'Fl\u00F8ibanen runs from the city centre to the summit of Fl\u00F8yen at 320 meters. The ride takes 6 minutes. From the top, Bergen spreads below with V\u00E5gen harbour, the surrounding seven mountains, and the North Sea horizon.',
    stats: [
      { label: 'Summit', value: '320 meters' },
      { label: 'Ride time', value: '6 minutes' },
      { label: 'Frequency', value: 'Every 15 min' },
      { label: 'Walk down', value: '45 min through forest' },
    ],
    overview: [
      'The Fl\u00F8ibanen funicular has been running since 1918. The current carriages were replaced in 2002 and carry 80 passengers per trip. The lower station sits two blocks east of Bryggen, in the centre of Bergen.',
      'At the summit, a viewing platform faces west across V\u00E5gen harbour, Bryggen, Nordnes, and the offshore islands. On clear days \u2014 and Bergen averages only 100 of those per year \u2014 the visibility extends 50 km. At night, the city lights below are worth the return ticket.',
      'The summit is also the starting point for a network of walking trails across the Fl\u00F8yen plateau. The easiest leads to Skomakerdiket lake (10 minutes, flat), where there is a playground and picnic area. Longer trails connect to Brushytten (45 min) and further into the mountain network behind Bergen.',
      'The walk back down to the city takes 45 minutes through mixed forest on a well-maintained gravel path. The trail passes viewpoints, park benches, and a troll sculpture forest. Most visitors take the funicular up and walk down \u2014 this is the recommended approach.',
    ],
    highlights: [
      { icon: '\uD83C\uDF04', title: 'Panoramic View', body: 'The summit platform faces west. On clear days, visibility reaches 50 km across the North Sea. In the evening, the harbour lights and Bryggen rooftops are directly below.' },
      { icon: '\uD83E\uDDED', title: 'Mountain Trails', body: 'From the summit, marked trails lead across the Fl\u00F8yen plateau. Skomakerdiket lake: 10 min, flat. Brushytten viewpoint: 45 min. Connection to Ulriken via Vidden trail: 4\u20135 hours.' },
      { icon: '\uD83C\uDF32', title: 'Forest Walk Down', body: 'The walk back to the city takes 45 minutes through forest. Well-maintained gravel path, viewpoints along the way. Take the funicular up, walk down \u2014 the standard approach.' },
      { icon: '\uD83C\uDF19', title: 'Evening Visit', body: 'The funicular runs late (until 23:00 in summer). The city lights view from the summit after dark is one of the best things you can do in Bergen for free (with ticket).' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: 'Lower station on Vetrlidsallmenningen, 2 blocks east of Bryggen. 5-minute walk from the Fish Market. No parking at the station \u2014 walk or take the Bybanen to Byparken.' },
      { title: 'Tickets', content: 'Adults: 65 NOK one way, 100 NOK return. Children half price. Bergen Card: free. Buy online or at the ticket machines at the lower station.' },
      { title: 'Hours', content: 'Mon\u2013Fri 07:30\u201323:00. Sat\u2013Sun 08:00\u201323:00. Every 15 minutes. Reduced hours in winter. Check floyen.no for current schedule.' },
      { title: 'Tips', content: 'Buy one-way up, walk down (45 min). Visit in the evening for city lights. If it is raining at street level, it is raining at the summit \u2014 Bergen\u2019s weather does not improve with altitude.' },
    ],
  },
  {
    slug: 'fish-market',
    citySlug: 'bergen',
    cityName: 'Bergen',
    title: 'Fish Market at Torget',
    tagline: 'Trading since the 1200s, still selling the morning catch',
    heroImage: '/pics/cities/Bergen_banner.jpeg',
    heroImageAlt: 'Bergen fish market at Torget harbour, Norway',
    metaDescription:
      'Bergen Fish Market guide: Torget outdoor stalls, indoor hall, best seafood, opening times, and how to avoid cruise ship crowds.',
    heroDescription:
      'The fish market at Torget has been trading since the 1200s. Today it splits into an outdoor market (summer only) and the indoor fish hall (year-round). Fresh shrimp, king crab legs, and smoked salmon direct from the boats.',
    stats: [
      { label: 'Location', value: 'Torget, central Bergen' },
      { label: 'Trading since', value: '1200s' },
      { label: 'Outdoor stalls', value: 'May\u2013Sep' },
      { label: 'Indoor hall', value: 'Year-round' },
    ],
    overview: [
      'Torget \u2014 Bergen\u2019s main square at the head of V\u00E5gen harbour \u2014 has hosted a fish market for over 800 years. The tradition predates the Hanseatic period. When German merchants arrived in the 14th century, the market was already old.',
      'The outdoor stalls run from May to September. Fishmongers sell the morning\u2019s catch: fresh shrimp by the bag, whole salmon, king crab legs split and grilled to order, smoked mackerel, and fish cakes. The prices are tourist-adjusted in summer but the product is genuine \u2014 these are working fishmongers, not actors.',
      'The indoor fish hall (Mathallen Bergen, opened 2012) operates year-round with permanent vendors. Fresh fish counters, a sushi bar, seafood restaurants, and a deli selling cured and smoked fish to take away. Less atmospheric than the outdoor stalls but more practical in Bergen\u2019s rain.',
      'The key to the Fish Market: arrive before the cruise ships dock. The first ships typically unload passengers at 09:00. By 10:00, the market is standing room only. At 07:00, it is local fishmongers setting up their stalls. That is the market worth visiting.',
    ],
    highlights: [
      { icon: '\uD83E\uDD90', title: 'King Crab', body: 'Norwegian king crab legs, grilled and split on the spot. The crabs come from Finnmark, 2,000 km north. A full serving runs 250\u2013400 NOK depending on the size and the stall.' },
      { icon: '\uD83E\uDD9E', title: 'Fresh Shrimp', body: 'Buy a bag of fresh-boiled shrimp (150\u2013200 NOK) and peel them on the harbour wall. Bread and lemon from the neighbouring stall. This is Bergen\u2019s cheapest quality lunch.' },
      { icon: '\uD83C\uDFE0', title: 'Indoor Fish Hall', body: 'Year-round indoor market with permanent vendors. Fish counters, sushi, seafood restaurants, and a deli for vacuum-packed smoked salmon to take home.' },
      { icon: '\u23F0', title: 'Timing', body: 'Before 09:00: local fishmongers, few tourists. 09:00\u201315:00: cruise passengers, higher prices, crowds. After 16:00: stalls closing but deals on remaining stock.' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: 'Torget square, at the head of V\u00E5gen harbour. 3-minute walk south from Bryggen. 5-minute walk from Bybanen Byparken stop.' },
      { title: 'Hours', content: 'Outdoor stalls: May\u2013Sep, 07:00\u201319:00 (varies). Indoor hall: year-round, Mon\u2013Sat 10:00\u201322:00, Sun 11:00\u201322:00.' },
      { title: 'Prices', content: 'Shrimp bag: 150\u2013200 NOK. King crab serving: 250\u2013400 NOK. Fish cakes: 80\u2013120 NOK. Smoked salmon pack: 150\u2013250 NOK. Prices are higher at outdoor tourist-facing stalls.' },
      { title: 'Tips', content: 'Arrive before 09:00. Buy shrimp and eat on the harbour wall. The indoor hall is better value than the outdoor stalls. For the best smoked salmon to take home, buy vacuum-packed from the indoor vendors.' },
    ],
  },
  {
    slug: 'fjord-gateway',
    citySlug: 'bergen',
    cityName: 'Bergen',
    title: 'Gateway to the Fjords',
    tagline: 'Hardangerfjord and Sognefjord start here',
    heroImage: '/pics/cities/Bergen_banner.jpeg',
    heroImageAlt: 'Bergen harbour \u2014 gateway to the Norwegian fjords',
    metaDescription:
      'Bergen as fjord gateway: how to reach Hardangerfjord and Sognefjord, driving routes, ferry connections, and the Bergen Railway to Fl\u00E5m.',
    heroDescription:
      'Bergen is the starting point for Hardangerfjord and Sognefjord \u2014 Norway\u2019s two longest fjords. One is 179 km long, the other 204 km and 1,308 meters deep. Both routes involve ferries. Check timetables before you drive.',
    stats: [
      { label: 'Hardangerfjord', value: '179 km, 90 min drive' },
      { label: 'Sognefjord', value: '204 km, 1,308 m deep' },
      { label: 'Fl\u00E5m Railway', value: 'Via Bergen Railway to Myrdal' },
      { label: 'Ferry operators', value: 'Norled, Fjord1' },
    ],
    overview: [
      'Bergen sits at the intersection of two fjord systems. Hardangerfjord stretches 179 km south-east, reaching Eidfjord and the Hardangervidda plateau. Sognefjord extends 204 km north-east \u2014 the longest fjord in Norway and the deepest at 1,308 meters.',
      'To reach Hardangerfjord by car, drive the E16 east then Rv7 south. The route takes 90 minutes to the fjord edge at Norheimsund. From there, the Hardanger Bridge (2013, toll: 150 NOK) crosses to Ullensvang and the fruit-growing villages. In May, the apple and cherry orchards bloom along the entire south shore.',
      'For Sognefjord, the Bergen Railway runs to Myrdal (2.5 hours), where you transfer to the Fl\u00E5m Railway \u2014 a 20 km descent dropping 866 meters through 20 tunnels to Aurlandsfjord. The Fl\u00E5m Railway is an engineering achievement, not a tourist train. It was built between 1924 and 1940 to connect the mountain communities to the coast.',
      'By car, Sognefjord is reached via the E16 through the L\u00E6rdal Tunnel (world\u2019s longest road tunnel at 24.5 km) or by ferry from Gudvangen to Kaupanger. Both options take 4\u20135 hours from Bergen. The ferry is the better choice for scenery.',
    ],
    highlights: [
      { icon: '\uD83D\uDE82', title: 'Fl\u00E5m Railway', body: 'Myrdal to Fl\u00E5m: 20 km, 866m descent, 20 tunnels. One of the steepest standard-gauge railways in the world. The Kjosfossen waterfall stop is a 93m cascade visible from the platform.' },
      { icon: '\uD83C\uDF38', title: 'Hardanger Orchards', body: 'The south shore of Hardangerfjord is Norway\u2019s fruit garden. Apple, cherry, plum, and pear orchards bloom in May. Cider production from local farms runs August\u2013October.' },
      { icon: '\u26F4\uFE0F', title: 'Fjord Ferries', body: 'Norled and Fjord1 operate car ferries and express boats. The Gudvangen\u2013Kaupanger ferry crosses Sognefjord in 2 hours. Book online for summer departures \u2014 queues at the terminal start early.' },
      { icon: '\uD83D\uDEA7', title: 'L\u00E6rdal Tunnel', body: '24.5 km \u2014 the world\u2019s longest road tunnel. Three illuminated rest caverns break the monotony. Free to drive. The alternative to the ferry for reaching inner Sognefjord.' },
    ],
    practicalInfo: [
      { title: 'Hardangerfjord by car', content: 'E16 east then Rv7 south. 90 min to Norheimsund. Hardanger Bridge toll: 150 NOK (AutoPASS). Summer: continue to Eidfjord and V\u00F8ringsfossen waterfall (182m drop).' },
      { title: 'Sognefjord by train', content: 'Bergen Railway to Myrdal (2.5 hours, NSB). Transfer to Fl\u00E5m Railway (1 hour, 866m descent). Book Fl\u00E5m Railway tickets at vy.no \u2014 sells out weeks ahead in summer.' },
      { title: 'Sognefjord by car', content: 'E16 through L\u00E6rdal Tunnel (24.5 km, free). Or ferry from Gudvangen to Kaupanger (2 hours). Total driving time from Bergen: 4\u20135 hours either route.' },
      { title: 'Which fjord first?', content: 'Hardangerfjord for orchards, waterfalls, and a shorter drive. Sognefjord for depth, scale, and the Fl\u00E5m Railway experience. One fjord per day minimum \u2014 do not try both in the same day.' },
    ],
  },

  // ═══════════════════════════════════════
  // TRONDHEIM
  // ═══════════════════════════════════════
  {
    slug: 'nidarosdomen',
    citySlug: 'trondheim',
    cityName: 'Trondheim',
    title: 'Nidarosdomen',
    tagline: 'Scandinavia\u2019s only medieval coronation cathedral, founded 1070',
    heroImage: '/pics/cities/trondheim_nidarosdomen.jpeg',
    heroImageAlt: 'Nidarosdomen cathedral west front, Trondheim, Norway',
    metaDescription:
      'Nidarosdomen Trondheim guide: Scandinavia\u2019s medieval coronation cathedral, the west front sculptures, crown jewels, and guided tours.',
    heroDescription:
      'Nidarosdomen was founded in 1070 over the burial site of St. Olav \u2014 the king who brought Christianity to Norway. It is Scandinavia\u2019s only medieval cathedral still used for royal coronations and blessings. The west front has over 70 carved stone figures.',
    stats: [
      { label: 'Founded', value: '1070 AD' },
      { label: 'Style', value: 'Romanesque / Gothic' },
      { label: 'West front', value: '70+ stone sculptures' },
      { label: 'Crown jewels', value: 'On display in side chapel' },
    ],
    overview: [
      'King Olav Haraldsson fell at the Battle of Stiklestad in 1030. Within a year, miracles were reported at his burial site in Trondheim. The church built over his grave became a pilgrimage destination. By 1070, construction began on a stone cathedral that would take 230 years to complete.',
      'Nidarosdomen is built in two styles: the transept and chapter house are Romanesque (1070\u20131150), and the nave and choir are English Gothic (1150\u20131300). The architectural shift is visible inside \u2014 round Norman arches give way to pointed Gothic vaults as you walk from east to west.',
      'The west front is the most elaborate medieval stone facade in Scandinavia. Over 70 carved figures \u2014 saints, kings, apostles, and prophets \u2014 fill the niches. Many are 19th-century replacements of originals destroyed by weather. The original medieval heads are displayed inside the Archbishop\u2019s Palace museum next door.',
      'The cathedral has been damaged by fire at least five times and rebuilt each time. Norwegian kings were crowned here from 1818 until 1906, and royal blessings continue. The crown jewels are displayed in a side chapel \u2014 the Norwegian regalia are modest compared to most European monarchies, reflecting the country\u2019s democratic character.',
    ],
    highlights: [
      { icon: '\u26EA', title: 'West Front', body: '70+ carved stone figures in Gothic niches. The facade faces west and catches afternoon and evening light. The rose window by Gabriel Kielland (1930) is 12 meters in diameter.' },
      { icon: '\uD83D\uDC51', title: 'Crown Jewels', body: 'Norwegian royal regalia on display in the side chapel. Three crowns, an orb, and a sceptre. Modest by European standards \u2014 Norway\u2019s monarchy is deliberately understated.' },
      { icon: '\uD83D\uDEB6', title: 'Pilgrim Route', body: 'Nidarosdomen is the endpoint of the St. Olav Pilgrim Route (Pilegrimsleden) \u2014 643 km from Oslo. Modern pilgrims walk it in 4\u20135 weeks. The pilgrim office is behind the cathedral.' },
      { icon: '\uD83C\uDFB6', title: 'Organ Concerts', body: 'The cathedral organ has 9,000 pipes. Free organ concerts on Saturdays during summer. The acoustics in the Gothic nave are exceptional \u2014 the sound fills the space without amplification.' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: 'Central Trondheim, south end of Munkegata. 10-minute walk from the train station. 5-minute walk from Bakklandet across Gamle Bybro.' },
      { title: 'Tickets', content: 'Adults: 120 NOK. Combined ticket with Archbishop\u2019s Palace: 180 NOK. Under 16: free. Guided tours daily in summer (included in ticket). Check nidarosdomen.no for current hours.' },
      { title: 'Time needed', content: '1\u20131.5 hours for the cathedral. Add 45 minutes for the Archbishop\u2019s Palace museum. Add 30 minutes for the crown jewels chapel.' },
      { title: 'Tips', content: 'Visit in the afternoon when the west front catches the light. Saturday organ concerts are free and worth timing your visit around. The pilgrim office behind the cathedral stamps pilgrim passports.' },
    ],
  },
  {
    slug: 'bakklandet',
    citySlug: 'trondheim',
    cityName: 'Trondheim',
    title: 'Bakklandet',
    tagline: 'Wooden houses, cobblestones, and the Old Town Bridge since 1681',
    heroImage: '/pics/cities/trondheim_city.jpeg',
    heroImageAlt: 'Bakklandet wooden houses along the Nidelva river, Trondheim, Norway',
    metaDescription:
      'Bakklandet Trondheim guide: historic wooden neighbourhood along the Nidelva, Gamle Bybro bridge, best caf\u00E9s, and the walk from Nidarosdomen.',
    heroDescription:
      'Bakklandet runs along the east bank of the Nidelva river. Wooden houses from the 18th century, painted in ochre, red, and white, line cobblestone lanes. Gamle Bybro (the Old Town Bridge, 1681) connects Bakklandet to the city centre.',
    stats: [
      { label: 'Location', value: 'East bank of the Nidelva' },
      { label: 'Gamle Bybro', value: 'Built 1681' },
      { label: 'Buildings', value: '18th-century wooden houses' },
      { label: 'Walk from centre', value: '5\u201310 minutes' },
    ],
    overview: [
      'Bakklandet was a working-class neighbourhood from the 1600s to the 1900s. Dockworkers, craftsmen, and small traders lived in the narrow wooden houses along the Nidelva river. By the 1960s, the city planned to demolish it for a motorway. Residents fought back. The neighbourhood survived.',
      'Today, Bakklandet is Trondheim\u2019s most atmospheric district. The wooden houses have been restored, painted in period colours, and the cobblestone lanes are lined with caf\u00E9s, bookshops, and vintage stores. It does not feel manufactured \u2014 residents still live here, and the shops serve locals as much as visitors.',
      'Gamle Bybro (the Old Town Bridge) connects Bakklandet to the main city across the Nidelva. The current red-painted wooden bridge dates to 1681. From the bridge, the view upstream shows the coloured warehouses on stilts over the water \u2014 Trondheim\u2019s version of Bryggen, less famous but equally historic.',
      'The Trampe bicycle lift starts at the base of Bakklandet \u2014 the steep hill up to Kristiansten Fortress. Walk up instead for the best viewpoint in Trondheim: the fortress ramparts look directly down over Bakklandet, the Nidelva, and the cathedral spire beyond.',
    ],
    highlights: [
      { icon: '\uD83C\uDF09', title: 'Gamle Bybro', body: 'The Old Town Bridge, built 1681, painted red. The view from the bridge \u2014 coloured warehouses on stilts, reflected in the Nidelva \u2014 is the defining image of Trondheim.' },
      { icon: '\u2615', title: 'Caf\u00E9 Culture', body: 'Baklandet Skydsstation serves traditional Norwegian food in a building from 1700. Dromedar Kaffebar roasts their own beans. Both are institutions, not tourist traps \u2014 Trondheim locals use them daily.' },
      { icon: '\uD83C\uDFD4\uFE0F', title: 'Kristiansten Fortress', body: 'Walk up the steep hill behind Bakklandet (15 min) to the 1685 fortress. Free entry. The ramparts provide the best panoramic view of Trondheim \u2014 cathedral, river, harbour, and mountains.' },
      { icon: '\uD83C\uDFE0', title: 'Living Neighbourhood', body: 'Bakklandet was saved from demolition in the 1960s by resident protests. The houses are privately owned and occupied. This is a living district, not an open-air museum.' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: 'Cross Gamle Bybro from the city centre (5 min walk from Nidarosdomen). Or walk along the Nidelva riverside path from the train station (10 min).' },
      { title: 'What to do', content: 'Walk the cobblestone lanes. Coffee at Dromedar Kaffebar. Lunch at Baklandet Skydsstation. Browse the vintage and bookshops. Walk up to Kristiansten Fortress for the view.' },
      { title: 'Time needed', content: '1\u20132 hours for a relaxed walk with coffee. Add 30 minutes for Kristiansten Fortress. Combine with Nidarosdomen (10 min walk across the bridge).' },
      { title: 'Tips', content: 'Best in the morning before tour groups arrive. The Trampe bicycle lift at the base of the hill is a curiosity but walking up is faster and more rewarding. The waterfront warehouses are best photographed from Gamle Bybro at golden hour.' },
    ],
  },
  {
    slug: 'ravnkloa',
    citySlug: 'trondheim',
    cityName: 'Trondheim',
    title: 'Ravnkloa Fish Market',
    tagline: 'Daily catch from the fjord, sold at the harbour mouth',
    heroImage: '/pics/cities/trondheim_city.jpeg',
    heroImageAlt: 'Trondheim harbour at Ravnkloa, Nidelva mouth, Norway',
    metaDescription:
      'Ravnkloa Trondheim fish market guide: daily catch, king crab, harbour restaurants, and Munkholmen island ferry connection.',
    heroDescription:
      'Ravnkloa sits at the mouth of the Nidelva where it meets the Trondheimsfjord. The fish market sells the day\u2019s catch from the boats moored alongside. King crab, fresh shrimp, and smoked trout from local producers.',
    stats: [
      { label: 'Location', value: 'Nidelva harbour mouth' },
      { label: 'Type', value: 'Working fish market' },
      { label: 'Speciality', value: 'Fjord shrimp, king crab' },
      { label: 'Munkholmen ferry', value: 'Departs from here' },
    ],
    overview: [
      'Ravnkloa is where the Nidelva river meets the Trondheimsfjord. The fish market here is small \u2014 three or four stalls on a good day \u2014 but genuine. The fish comes from the fjord boats moored at the quay, not from a distribution warehouse.',
      'The market sells fresh-caught shrimp (buy a bag and peel them on the harbour wall), smoked fjord trout, cured salmon, and seasonal catches. King crab from Finnmark appears in winter. In summer, the shrimp season runs June through August and the quality peaks in July.',
      'Havfruen (The Mermaid) restaurant sits at the edge of Ravnkloa, facing Munkholmen island across the harbour. The shellfish platter is the order \u2014 local langoustines, mussels, shrimp, and crab. Book a window table for the harbour view.',
      'The Munkholmen ferry departs from the Ravnkloa quay. Munkholmen is a small island 2 km offshore that has served as a monastery (1100s), a fortress (1600s), a prison (1700s), and is now a public beach and swimming spot in summer. The ferry takes 10 minutes.',
    ],
    highlights: [
      { icon: '\uD83E\uDD9E', title: 'Fjord Shrimp', body: 'Fresh-boiled shrimp from the Trondheimsfjord, sold by the bag. Peak season: June\u2013August. Buy, peel, eat on the harbour wall \u2014 the simplest and best lunch in Trondheim.' },
      { icon: '\uD83C\uDFDD\uFE0F', title: 'Munkholmen Island', body: 'Monastery, fortress, prison, beach. The ferry departs from Ravnkloa every 30 min in summer. 10-minute ride. Free entry to the island. Swimming and sunbathing from the south shore.' },
      { icon: '\uD83C\uDF7D\uFE0F', title: 'Havfruen Restaurant', body: 'Harbour-side seafood restaurant at Ravnkloa. Shellfish platter with local langoustines, crab, and mussels. Book a window table. The view across to Munkholmen completes the meal.' },
      { icon: '\uD83D\uDC1F', title: 'Smoked Fish', body: 'Smoked fjord trout and cured salmon from local producers. Vacuum-packed for travel. The smoked trout from the Trondheimsfjord has a distinct, clean flavour different from farmed Atlantic salmon.' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: 'Ravnkloa quay, at the harbour mouth of the Nidelva. 8-minute walk north from the train station. 10-minute walk from Nidarosdomen via Munkegata.' },
      { title: 'Hours', content: 'Fish market: mornings, Mon\u2013Sat (seasonal, varies). Havfruen restaurant: Tue\u2013Sat, lunch and dinner. Munkholmen ferry: May\u2013Sep, every 30 min.' },
      { title: 'Prices', content: 'Shrimp bag: 100\u2013180 NOK. Smoked trout: 120\u2013200 NOK. Havfruen shellfish platter: 450\u2013650 NOK. Munkholmen ferry: 100 NOK return.' },
      { title: 'Tips', content: 'The fish market is small and sells out early. Arrive before 11:00 for the best selection. Combine with a Munkholmen ferry trip: buy shrimp at Ravnkloa, take the ferry, eat on the island beach.' },
    ],
  },
  {
    slug: 'cycling',
    citySlug: 'trondheim',
    cityName: 'Trondheim',
    title: 'Cycling in Trondheim',
    tagline: 'The world\u2019s first bicycle lift and 200 km of cycling paths',
    heroImage: '/pics/cities/trondheim_banner.jpeg',
    heroImageAlt: 'Trondheim cityscape and cycling routes, Norway',
    metaDescription:
      'Trondheim cycling guide: Trampe bicycle lift, bike-share system, best cycling routes along the Nidelva, and why this is Norway\u2019s cycling city.',
    heroDescription:
      'Trondheim built the world\u2019s first bicycle lift in 1993. The CycloCable hauls cyclists up the steep Brubakken hill. The city has 200 km of cycling paths, a bike-share system, and a cycling culture that runs deeper than any other Norwegian city.',
    stats: [
      { label: 'Cycling paths', value: '200 km' },
      { label: 'Bike lift', value: 'Trampe / CycloCable' },
      { label: 'Bike-share', value: 'City-wide stations' },
      { label: 'Key route', value: 'Nidelva riverside' },
    ],
    overview: [
      'Trondheim is Norway\u2019s cycling city by design, not by accident. The city invested in bicycle infrastructure decades before it became fashionable. The Trampe bicycle lift \u2014 a metal plate that pushes your right foot while you sit on the saddle \u2014 was installed in 1993 at Brubakken, the steep hill between Bakklandet and Kristiansten Fortress.',
      'The lift was rebuilt as the CycloCable in 2013 with modern technology. It remains the only public bicycle lift in the world. The 130-meter ascent takes 90 seconds. Locals use it daily for the commute up from the river valley. Visitors use it once and take the stairs after that.',
      'The city\u2019s 200 km of cycling paths connect every district. The main route follows the Nidelva river south from Bakklandet to Lade, passing through parks, under bridges, and along the riverbank. The route is flat, paved, and separated from car traffic. In summer, it extends to the Lade peninsula and the beaches at Korsvika.',
      'Trondheim Bysykkel (city bikes) are available from April to November. Stations are spread across the city centre. The first 45 minutes are free with registration. For longer routes, dedicated bike rental shops near the train station offer multi-speed bikes and e-bikes.',
    ],
    highlights: [
      { icon: '\uD83D\uDEB4', title: 'CycloCable Bike Lift', body: 'The world\u2019s only public bicycle lift. 130 meters up the Brubakken hill in 90 seconds. Put your right foot on the metal plate, hold the bike, and the cable pulls you up. Free to use.' },
      { icon: '\uD83D\uDEE4\uFE0F', title: 'Nidelva Riverside Route', body: 'Flat, paved cycling path along the Nidelva river. Bakklandet to Lade: 6 km, 25 min. Passes under Gamle Bybro, through parks, and along the fjord shore.' },
      { icon: '\uD83D\uDEB2', title: 'City Bike Share', body: 'Trondheim Bysykkel: April\u2013November. Register online. First 45 min free. Stations across the city centre. Ideal for short hops between Nidarosdomen, Bakklandet, and Ravnkloa.' },
      { icon: '\uD83C\uDFD6\uFE0F', title: 'Lade Peninsula', body: 'Continue the Nidelva route east to the Lade peninsula. Korsvika beach: sand and shallow water, swimmable June\u2013August. The Ladestien coastal trail circles the peninsula \u2014 8 km loop.' },
    ],
    practicalInfo: [
      { title: 'CycloCable location', content: 'Brubakken hill, base of Bakklandet. Look for the metal rail in the road surface. Free. Operates May\u2013October, 07:00\u201320:00.' },
      { title: 'Bike rental', content: 'Trondheim Bysykkel: free first 45 min with registration at bysykkel.no. Dedicated rental shops near the train station offer day rentals (250\u2013400 NOK) and e-bikes (400\u2013600 NOK).' },
      { title: 'Best route', content: 'Bakklandet \u2192 Nidelva riverside path \u2192 Lade \u2192 Korsvika beach. 12 km one way, flat, 45 min at leisure pace. Return the same way or loop via Lade peninsula (add 8 km).' },
      { title: 'Safety', content: 'Cycling paths are separated from car traffic on main routes. Helmet not legally required but recommended. Lock bikes at designated racks \u2014 bike theft is common in Norwegian cities.' },
    ],
  },

  // ═══════════════════════════════════════
  // STAVANGER
  // ═══════════════════════════════════════
  {
    slug: 'preikestolen',
    citySlug: 'stavanger',
    cityName: 'Stavanger',
    title: 'Preikestolen (Pulpit Rock)',
    tagline: '604-meter vertical drop into Lysefjord, no railings',
    heroImage: '/pics/cities/stavanger_prekestolen.jpeg',
    heroImageAlt: 'Preikestolen (Pulpit Rock) cliff 604 meters above Lysefjord, Stavanger, Norway',
    metaDescription:
      'Preikestolen hiking guide from Stavanger: trail distance, elevation, ferry crossing, crowd strategy, and what to expect at the 604m cliff edge.',
    heroDescription:
      'Preikestolen is a 25\u00D725 meter flat cliff top that drops 604 meters straight into Lysefjord. No railings. No barrier. The trailhead is 25 km from Stavanger by car, including a ferry crossing. The hike is 8 km return with 500 meters of elevation gain.',
    stats: [
      { label: 'Cliff height', value: '604 meters' },
      { label: 'Trail', value: '8 km return, 4 hours' },
      { label: 'Elevation gain', value: '500 meters' },
      { label: 'Annual hikers', value: '300,000+' },
    ],
    overview: [
      'Preikestolen \u2014 Pulpit Rock \u2014 is a flat-topped cliff formation overhanging Lysefjord. The plateau is approximately 25 by 25 meters, cracked from the mountain face by frost erosion during the last ice age. Geologists estimate it separated from the cliff wall around 10,000 years ago.',
      'The hike starts at Preikestolen Fjellstue (mountain lodge), 25 km from Stavanger. Access requires a ferry crossing from Tau \u2014 the drive plus ferry takes about 45 minutes total. From the trailhead, the route is 4 km one way, gaining 500 meters of elevation over a mix of gravel paths, boardwalks, and rock slabs.',
      'The trail is classified DNT Blue \u2014 steep in places, with some scrambling over wet rock. It is not technical, but it is not a casual stroll. In rain (frequent), the rock slabs become slippery. Proper hiking boots are not optional. The round trip takes 4 hours for fit hikers, longer with stops.',
      'At the top, there are no railings, no barriers, and no safety infrastructure. You walk to the edge and look down 604 meters to the fjord water. Norwegian authorities have deliberately chosen not to install fencing \u2014 the philosophy is that nature carries inherent risk, and visitors are responsible for their own safety.',
      'The trail receives over 300,000 hikers per year. In peak summer (July\u2013August), the cliff top can have 50\u2013100 people at once. The parking lot fills by 09:00. Start before 07:00 or after 16:00 to avoid the worst crowds.',
    ],
    highlights: [
      { icon: '\u26F0\uFE0F', title: 'The Cliff Edge', body: 'A 25\u00D725m flat plateau dropping 604m straight into Lysefjord. No railings. The view straight down is the draw \u2014 the fjord water is directly beneath your feet. Not recommended for anyone with severe vertigo.' },
      { icon: '\uD83E\uDDED', title: 'DNT Blue Trail', body: '4 km one way, 500m elevation gain. Mix of gravel, boardwalk, and bare rock. Steep sections require both hands in places. Wet rock is slippery \u2014 hiking boots mandatory.' },
      { icon: '\u26F4\uFE0F', title: 'Ferry Access', body: 'The Tau ferry runs from Stavanger (Fiskepiren terminal). 40-minute crossing. Departures every 30\u201360 min. From Tau, 15-minute drive to the trailhead. Check kolumbus.no for the timetable.' },
      { icon: '\u23F0', title: 'Crowd Strategy', body: 'Peak season: 300,000+ hikers. Parking fills by 09:00 Jul\u2013Aug. Start before 07:00 or after 16:00. October\u2013November: 90% fewer people, but colder and wetter. The view is the same.' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: 'Ferry from Stavanger (Fiskepiren) to Tau: 40 min. Drive from Tau to Preikestolen Fjellstue trailhead: 15 min. Parking at Fjellstue: 300 NOK/day. Alternatively: bus from Stavanger (seasonal, check kolumbus.no).' },
      { title: 'What to bring', content: 'Hiking boots (mandatory). Rain jacket and extra layer (conditions change fast). 1.5L water minimum. Snacks. No cotton base layers \u2014 wool or synthetic only.' },
      { title: 'Time needed', content: '4 hours round trip minimum (fit hikers). 5\u20136 hours at moderate pace with stops. Add 90 minutes for ferry + drive each way. Total from Stavanger: 7\u20138 hours.' },
      { title: 'Safety', content: 'No railings at the top. Stay back from the edge in wind. Wet rock slabs are dangerously slippery. Do not attempt in ice or snow without experience. Turn back if weather deteriorates. Emergency: 112.' },
    ],
  },
  {
    slug: 'nuart',
    citySlug: 'stavanger',
    cityName: 'Stavanger',
    title: 'Nuart Street Art Festival',
    tagline: 'Over 100 murals turning Stavanger into an open-air gallery since 2001',
    heroImage: '/pics/cities/Stavanger_banner.jpeg',
    heroImageAlt: 'Stavanger city centre and harbour, Norway',
    metaDescription:
      'Nuart Stavanger guide: Europe\u2019s leading street art festival, self-guided mural walks, the annual September programme, and where to find the best works.',
    heroDescription:
      'Nuart was founded in 2001 and runs every September. International street artists create large-scale murals across Stavanger\u2019s city centre. Over 100 permanent works on walls, gables, and underpasses have turned the city into an open-air gallery year-round.',
    stats: [
      { label: 'Founded', value: '2001' },
      { label: 'Festival month', value: 'September' },
      { label: 'Permanent works', value: '100+' },
      { label: 'Self-guided maps', value: 'Available year-round' },
    ],
    overview: [
      'Nuart started in 2001 as a small street art project in Stavanger. It has grown into one of Europe\u2019s most respected street art festivals, inviting internationally recognised artists \u2014 Banksy-adjacent names like ROA, Phlegm, Ernest Zacharevic, and Martin Whatson \u2014 to create large-scale works across the city.',
      'Each September, new murals appear on building facades, gable ends, underpasses, and walls throughout the city centre. The works are diverse: political commentary, surrealist imagery, photorealistic portraits, and abstract compositions. The festival includes public talks, workshops, and guided mural walks with the artists.',
      'Outside the festival, the murals remain. Over 100 works are distributed across central Stavanger, concentrated around the areas between the cathedral and the harbour. The tourist office provides free self-guided mural walk maps. The walk covers 3\u20134 km and takes 1.5\u20132 hours at a comfortable pace.',
      'Nuart also runs Nuart Aberdeen \u2014 a sister festival in Scotland \u2014 and the Nuart Journal, an online publication on street art and urban culture. The Stavanger festival remains the flagship, and the September programme draws street art enthusiasts from across Europe.',
    ],
    highlights: [
      { icon: '\uD83C\uDFA8', title: 'Festival Week', body: 'September annually. New murals go up during the week. Public talks, artist workshops, and guided walks. The festival opening night is free and public.' },
      { icon: '\uD83D\uDDFA\uFE0F', title: 'Self-Guided Walk', body: '100+ permanent murals across the city centre. Free map from the tourist office or download from nuartfestival.no. The walk covers 3\u20134 km \u2014 allow 1.5\u20132 hours.' },
      { icon: '\uD83C\uDFD7\uFE0F', title: 'Notable Artists', body: 'ROA (animal murals), Phlegm (surrealist ink-style), Martin Whatson (stencil art), Ernest Zacharevic (interactive murals). Each year\u2019s lineup is announced in June.' },
      { icon: '\uD83D\uDCF1', title: 'Year-Round Access', body: 'The murals do not disappear after the festival. Walk the streets any time of year. New works layer over old ones \u2014 each visit reveals a different city.' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: 'The murals are distributed across central Stavanger, concentrated between the cathedral and the harbour. Start at the tourist office (Strandkaien) for the map.' },
      { title: 'Festival dates', content: 'September annually. Exact dates announced on nuartfestival.no in spring. The main week runs Thursday\u2013Sunday with murals created live during the day.' },
      { title: 'Self-guided walk', content: 'Free map from the tourist office or nuartfestival.no. 3\u20134 km route through the city centre. Allow 1.5\u20132 hours. Best in daylight for photography.' },
      { title: 'Tips', content: 'Start early \u2014 the light on west-facing walls is best in the morning. Some of the best works are on side streets and in underpasses, not on main roads. Look up \u2014 many murals are on upper floors and gable ends.' },
    ],
  },
  {
    slug: 'gamle-stavanger',
    citySlug: 'stavanger',
    cityName: 'Stavanger',
    title: 'Gamle Stavanger',
    tagline: '173 white wooden houses from the 1700s, still lived in',
    heroImage: '/pics/cities/Stavanger_banner.jpeg',
    heroImageAlt: 'Gamle Stavanger white wooden houses and cobblestone streets, Norway',
    metaDescription:
      'Gamle Stavanger guide: 173 white wooden houses, best-preserved wooden settlement in Northern Europe, the canning museum, and respectful visiting.',
    heroDescription:
      'Gamle Stavanger is 173 white wooden houses from the late 18th and early 19th century, packed into narrow cobblestone streets on the west side of V\u00E5gen harbour. The best-preserved wooden house settlement in Northern Europe. People live here.',
    stats: [
      { label: 'Houses', value: '173 white wooden' },
      { label: 'Period', value: '1700s\u20131800s' },
      { label: 'Status', value: 'Residential, protected' },
      { label: 'Walk from centre', value: '5 minutes' },
    ],
    overview: [
      'Gamle Stavanger occupies the hillside west of V\u00E5gen harbour. The 173 wooden houses were built between the late 1700s and early 1800s, during the height of Stavanger\u2019s herring and sardine industry. The workers who processed the fish in the canning factories lived in these houses.',
      'The houses are small \u2014 two storeys, narrow facades, white-painted clapboard. The streets between them are cobblestoned and barely wide enough for two people to pass. Gardens with roses, rhubarb, and old fruit trees fill the narrow plots between buildings.',
      'This is not a museum district. Every house is privately owned and occupied. Residents have maintained the buildings to strict preservation standards since the area was protected in the 1950s. Walk quietly. Do not photograph through windows. Respect the fact that this is someone\u2019s home.',
      'The Norsk Hermetikkmuseum (Norwegian Canning Museum) sits in the middle of Gamle Stavanger, inside a former sardine canning factory. The museum tells the story of Stavanger before oil \u2014 when the city was the sardine capital of Europe. Smoking demonstrations happen on the first Sunday of each month.',
    ],
    highlights: [
      { icon: '\uD83C\uDFE1', title: 'Wooden Architecture', body: '173 white clapboard houses, all privately owned and occupied. The smallest residential buildings in central Stavanger, preserved since the 1950s. The white paint tradition dates to when white lead paint became affordable in the 1800s.' },
      { icon: '\uD83C\uDF3A', title: 'Hidden Gardens', body: 'Between the houses, narrow garden plots hold roses, rhubarb, berry bushes, and old fruit trees. The gardens are private but visible over low fences. They add colour from May to September.' },
      { icon: '\uD83E\uDD6B', title: 'Canning Museum', body: 'Norsk Hermetikkmuseum: inside a former sardine factory. Stavanger processed sardines for export from the 1870s to the 1960s. Smoking demonstrations on the first Sunday of each month \u2014 the smell of smoked brisling fills the street.' },
      { icon: '\uD83D\uDEB6', title: 'Walking the Streets', body: 'Allow 30\u201345 minutes to walk the cobblestone lanes. Start from the harbour side (Øvre Strandgate) and wind uphill through the narrowest passages. Morning light hits the white facades from the east.' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: 'West side of V\u00E5gen harbour, 5-minute walk from the city centre. Enter from Øvre Strandgate (harbour side) or from Nedre Strandgate below.' },
      { title: 'Canning Museum', content: 'Norsk Hermetikkmuseum: adults 120 NOK. Open Tue\u2013Sun. Smoking demonstrations: first Sunday of each month, 11:00\u201314:00. The smell alone draws a crowd.' },
      { title: 'Time needed', content: '30\u201345 minutes for the streets. Add 45 minutes for the Canning Museum. Total: 1.5 hours.' },
      { title: 'Etiquette', content: 'These are private homes. Do not enter gardens. Do not photograph through windows. Keep voices low. Walk on the cobblestones, not on planted borders. Respect the residents who keep this place alive.' },
    ],
  },
  {
    slug: 'petroleum-museum',
    citySlug: 'stavanger',
    cityName: 'Stavanger',
    title: 'Norwegian Petroleum Museum',
    tagline: 'From fishing nation to oil power in a single generation',
    heroImage: '/pics/cities/Stavanger_banner.jpeg',
    heroImageAlt: 'Stavanger harbour and Petroleum Museum, Norway',
    metaDescription:
      'Norwegian Petroleum Museum Stavanger: the Ekofisk discovery, full-scale drilling equipment, the economics of oil, and the building shaped like an offshore platform.',
    heroDescription:
      'Norway\u2019s oil story started in 1969 when the Ekofisk field was discovered in the North Sea. The Petroleum Museum tells that story from the drilling floor up \u2014 full-scale equipment, subsea technology, and the economics that turned a fishing nation into one of the world\u2019s wealthiest countries.',
    stats: [
      { label: 'Location', value: 'Kjeringholmen, Stavanger harbour' },
      { label: 'Subject', value: 'Norwegian oil and gas industry' },
      { label: 'Key exhibit', value: 'Full-scale drilling equipment' },
      { label: 'Architecture', value: 'Offshore platform design' },
    ],
    overview: [
      'In 1959, a Dutch gas discovery at Groningen triggered a search for hydrocarbons under the North Sea. Norway divided the continental shelf into blocks and offered them to international oil companies. On Christmas Eve 1969, Phillips Petroleum struck oil at Ekofisk. Norway changed overnight.',
      'The Petroleum Museum, opened in 1999, sits on Kjeringholmen at the edge of Stavanger harbour. The building is designed to resemble an offshore platform \u2014 angular concrete and steel jutting into the water. Inside, the museum walks visitors through the full story: geology, exploration, drilling, production, safety, and the economic transformation.',
      'The centrepiece is a full-scale section of a drilling floor. Visitors can operate a simulated drill string and understand the forces involved in boring 5,000 meters below the seabed. The subsea technology exhibition shows the remotely operated vehicles (ROVs) and pipeline systems that work at 300 meters depth.',
      'The museum does not avoid the difficult questions. The environmental cost of oil extraction, the Bravo blowout of 1977, the Alexander Kielland disaster of 1980 (123 workers killed), and Norway\u2019s complicated position as a climate-conscious nation that funds its welfare state with petroleum revenue \u2014 all are presented.',
    ],
    highlights: [
      { icon: '\uD83D\uDEE2\uFE0F', title: 'Ekofisk Discovery', body: 'December 23, 1969. Phillips Petroleum hit oil at Ekofisk in the Norwegian North Sea. The field produced for over 50 years. The discovery exhibit recreates the moment with original equipment and communications.' },
      { icon: '\u2699\uFE0F', title: 'Drilling Floor', body: 'Full-scale section of an offshore drilling floor. Operate a simulated drill string. Understand the engineering of boring 5,000 meters below the seabed. The noise and scale are designed to be felt, not just observed.' },
      { icon: '\uD83E\uDD16', title: 'Subsea Technology', body: 'ROVs, pipeline systems, and subsea Christmas trees (wellhead control systems). The technology that allows production at 300 meters depth. Interactive displays explain how each component functions.' },
      { icon: '\uD83D\uDCB0', title: 'The Oil Fund', body: 'Norway\u2019s Government Pension Fund Global \u2014 worth over 17 trillion NOK \u2014 was built from oil revenue. The museum explains how petroleum wealth was converted into a sovereign wealth fund and what that means for Norway\u2019s economy.' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: 'Kjeringholmen, on the harbour in central Stavanger. 5-minute walk from the city centre. 10-minute walk from the train/bus station.' },
      { title: 'Tickets', content: 'Adults: 180 NOK. Children (3\u201315): 80 NOK. Family ticket available. Free with Stavanger museum card.' },
      { title: 'Time needed', content: '1.5\u20132 hours. The drilling floor and subsea exhibits need at least 30 minutes each. The historical and economic sections add another 30\u201345 minutes.' },
      { title: 'Tips', content: 'The rooftop terrace has harbour views. The museum shop sells oil industry books and models. Combine with Gamle Stavanger (10-minute walk west) for a half-day programme: oil future and pre-oil past side by side.' },
    ],
  },

  // ═══════════════════════════════════════
  // KRISTIANSUND
  // ═══════════════════════════════════════
  {
    slug: 'atlantic-road',
    citySlug: 'kristiansund',
    cityName: 'Kristiansund',
    title: 'Atlantic Road (Atlanterhavsveien)',
    tagline: '8.3 km of bridges across open ocean, waves crashing over the road',
    heroImage: '/pics/cities/Kristiansund_banner.jpeg',
    heroImageAlt: 'Atlantic Road (Atlanterhavsveien) bridges across open ocean, Norway',
    metaDescription:
      'Atlantic Road guide from Kristiansund: 8.3 km ocean road, Storseisundet Bridge, storm driving, fishing platforms, and seasonal conditions.',
    heroDescription:
      'The Atlantic Road is 8.3 km of bridges connecting eight islands across open sea between Kristiansund and Molde. The Storseisundet Bridge is the centrepiece \u2014 designed to look like it drops off into nothing from the driver\u2019s perspective.',
    stats: [
      { label: 'Length', value: '8.3 km' },
      { label: 'Bridges', value: '8' },
      { label: 'Opened', value: '1989' },
      { label: 'From Kristiansund', value: '30 km, 30 min' },
    ],
    overview: [
      'The Atlantic Road (Atlanterhavsveien) opened in 1989 after six years of construction. It connects the island of Averøy to the mainland across a chain of small islands and skerries in the Norwegian Sea. The road replaced a ferry route and was initially a toll road \u2014 the toll was paid off in 1999.',
      'Eight bridges carry the road across open water. The Storseisundet Bridge is the most photographed: a 260-meter span that curves upward and appears to end in mid-air when seen from the approach. The optical illusion is not intentional \u2014 it is the result of the bridge\u2019s steep gradient designed to allow fishing boats to pass underneath.',
      'In autumn and winter storms, waves crash over the road surface. The Atlantic Road is one of the only roads in the world where you can legally drive through ocean spray. Storm chasing \u2014 driving the road during heavy weather \u2014 is a draw for photographers and adrenaline seekers. The road remains open in all but the most extreme conditions.',
      'Along the route, fishing platforms extend from the roadside into the ocean. Locals cast for cod, pollock, and coalfish from these platforms year-round. Several designated pull-offs provide viewpoints, walking paths, and access to the fishing spots. The Eldhusøya viewing area has a looped walking path across a small island connected to the road.',
    ],
    highlights: [
      { icon: '\uD83C\uDF0A', title: 'Storm Driving', body: 'Autumn and winter storms send waves across the road surface. The road stays open. Driving it in heavy weather is a visceral experience \u2014 ocean spray hits the windshield as you cross between islands.' },
      { icon: '\uD83C\uDF09', title: 'Storseisundet Bridge', body: '260 meters, steep gradient, optical illusion. From the approach, the bridge appears to end in the sky. Drive it, then stop at the pull-off on the east side for the classic photo angle.' },
      { icon: '\uD83C\uDFA3', title: 'Roadside Fishing', body: 'Fishing platforms extend from the roadside into open ocean. Cod, pollock, and coalfish year-round. No permit needed for sea fishing in Norway. Bring your own gear or rent in Kristiansund.' },
      { icon: '\uD83D\uDEB6', title: 'Eldhusøya Walk', body: 'A looped walking path crosses the small island of Eldhusøya, connected to the road by a short bridge. The path takes 15\u201320 minutes and puts you at sea level between the skerries. Wind-exposed \u2014 hold your hat.' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: '30 km west of Kristiansund via Rv64 through the Atlanterhavstunnelen (undersea tunnel, 5.7 km). Free. 30-minute drive. From Molde: 55 km east via Rv64.' },
      { title: 'When to drive', content: 'Summer (Jun\u2013Aug): calm conditions, midnight light, fishing. Autumn/winter (Oct\u2013Feb): storm conditions, dramatic waves, fewer tourists. The road is open year-round.' },
      { title: 'Stops', content: 'Eldhusøya viewpoint and walking loop. Storseisundet Bridge pull-off (east side). Fishing platforms at multiple points. Allow 1\u20132 hours to drive and stop, not 15 minutes.' },
      { title: 'Tips', content: 'Drive the road in both directions \u2014 the perspective changes completely. In storm conditions, reduce speed and be prepared for spray on the windshield. The fishing platforms are slippery when wet.' },
    ],
  },
  {
    slug: 'klippfisk',
    citySlug: 'kristiansund',
    cityName: 'Kristiansund',
    title: 'Klippfisk Heritage',
    tagline: '300 years of salted cod that fed half of southern Europe',
    heroImage: '/pics/cities/Kristiansund_banner.jpeg',
    heroImageAlt: 'Kristiansund harbour with klippfisk drying racks, Norway',
    metaDescription:
      'Kristiansund klippfisk guide: 300 years of clipfish history, the Klippfiskmuseet, bacalhau connection, and the annual Klippfiskfestivalen.',
    heroDescription:
      'Kristiansund has exported klippfisk (salted and dried cod) since the early 1700s. The fish was shipped to Portugal, Spain, Italy, and Brazil, where it became bacalhau \u2014 a national dish in each country. Kristiansund processed more clipfish than any other town in Norway.',
    stats: [
      { label: 'Industry since', value: '1700s' },
      { label: 'Export markets', value: 'Portugal, Spain, Brazil, Italy' },
      { label: 'Museum', value: 'Klippfiskmuseet, Milnbrygga' },
      { label: 'Festival', value: 'Klippfiskfestivalen, February' },
    ],
    overview: [
      'Klippfisk is cod that has been salted and dried on flat rocks (klipper) in the open air. The process preserves the fish for months without refrigeration \u2014 critical in the centuries before cold chains. Kristiansund\u2019s geography was perfect: flat coastal rocks, strong winds, and proximity to the rich cod fishing grounds of the Norwegian Sea.',
      'The industry took off in the early 1700s when Scottish and Dutch merchants established salt cod trade routes from Kristiansund to the Catholic countries of southern Europe, where fish was in high demand for religious fasting days. The connection endures: bacalhau (from the Norwegian word bakkelau) is today the national dish of Portugal and a staple across Brazil.',
      'At its peak in the 19th century, Kristiansund had over 100 clipfish drying operations. The entire town smelled of salt and cod. Families worked the rocks, turning the fish by hand, weather-watching obsessively. A rain shower at the wrong moment could ruin an entire season\u2019s production.',
      'The Klippfiskmuseet (Clipfish Museum) at Milnbrygga tells the full story: the salt trade, the drying process, the export routes, and the lives of the workers. The annual Klippfiskfestivalen in February celebrates the heritage with cooking competitions, tastings, and Norwegian-Portuguese cultural exchange.',
    ],
    highlights: [
      { icon: '\uD83D\uDC1F', title: 'The Process', body: 'Cod is headed, split, salted, and laid flat on coastal rocks to dry in wind and sun. The drying takes 2\u20133 months. The result is a board-stiff, preserved fish that can be stored and shipped without refrigeration.' },
      { icon: '\uD83C\uDDF5\uD83C\uDDF9', title: 'Bacalhau Connection', body: 'Portuguese and Brazilian cuisine adopted klippfisk as bacalhau. Portugal alone has over 365 bacalhau recipes \u2014 one for every day of the year. The trade route from Kristiansund to Lisbon ran for 300 years.' },
      { icon: '\uD83C\uDFDB\uFE0F', title: 'Klippfiskmuseet', body: 'At Milnbrygga on the harbour. The museum covers the salt trade, drying techniques, export history, and working conditions. Small but thorough. Allow 45\u201360 minutes.' },
      { icon: '\uD83C\uDF89', title: 'Klippfiskfestivalen', body: 'February annually. Cooking competitions, tastings, Portuguese-Norwegian cultural events. Local restaurants serve special klippfisk menus throughout the month.' },
    ],
    practicalInfo: [
      { title: 'Klippfiskmuseet', content: 'Milnbrygga, central Kristiansund harbour. Adults: 80 NOK. Open May\u2013Aug daily, Sep\u2013Apr weekdays only. Check kristiansund.museum.no for current hours.' },
      { title: 'Where to eat klippfisk', content: 'Smia Fiskerestaurant on the harbour serves traditional klippfisk dishes. Bacalao (the local stew version) is on most restaurant menus in town. The February festival is the best time for dedicated tastings.' },
      { title: 'Festival', content: 'Klippfiskfestivalen: February annually. Free outdoor events. Restaurant special menus. Check visitkristiansund.com for the programme.' },
      { title: 'Context', content: 'Klippfisk built Kristiansund. Before the oil era, before the Atlantic Road, there was cod and salt. Understanding the klippfisk industry is understanding why this town exists.' },
    ],
  },
  {
    slug: 'grip-island',
    citySlug: 'kristiansund',
    cityName: 'Kristiansund',
    title: 'Grip Island',
    tagline: 'Norway\u2019s smallest former municipality, 14 km offshore with a stave church from 1470',
    heroImage: '/pics/cities/Kristiansund_banner.jpeg',
    heroImageAlt: 'Kristiansund coastal archipelago, gateway to Grip island, Norway',
    metaDescription:
      'Grip island guide from Kristiansund: stave church from 1470, former fishing community, summer boat service, and what to see on the car-free island.',
    heroDescription:
      'Grip was Norway\u2019s smallest municipality until 1964 \u2014 a cluster of 80 tiny islands 14 km offshore from Kristiansund. The stave church dates to 1470, built from driftwood. At its peak, 400 people lived here from fishing alone. Today: no permanent residents, summer boat service only.',
    stats: [
      { label: 'Distance', value: '14 km offshore' },
      { label: 'Stave church', value: 'Built 1470' },
      { label: 'Former population', value: '~400' },
      { label: 'Access', value: 'Summer boat only' },
    ],
    overview: [
      'Grip is a cluster of approximately 80 small islands and skerries 14 km northwest of Kristiansund in the open Norwegian Sea. The main island is tiny \u2014 barely 300 meters across \u2014 but for centuries it supported a fishing community of up to 400 people living from the cod, herring, and pollock that schooled in the surrounding waters.',
      'The stave church on Grip dates to approximately 1470 and is one of the smallest stave churches in Norway. It was built from driftwood and ship timbers \u2014 there are no trees on Grip. The church has survived storms, fires, and centuries of salt air. The painted altarpiece from the 1600s is still in place.',
      'Life on Grip was hard. The islands have no natural harbour \u2014 boats were hauled up on rocks. Fresh water was collected from rain. The community was self-sufficient by necessity: they fished, dried cod on the rocks, and traded with Kristiansund for supplies. The last permanent residents left in the 1970s.',
      'Today, Grip is a protected cultural heritage site. The houses are maintained as summer cabins, and a handful of families still spend their holidays here. The summer boat service from Kristiansund runs from June to August. The island is car-free (there is nowhere to drive). Allow 2\u20133 hours to explore.',
    ],
    highlights: [
      { icon: '\u26EA', title: 'Stave Church (1470)', body: 'One of Norway\u2019s smallest stave churches, built from driftwood and ship timber on a treeless island. The painted altarpiece from the 1600s survives. Open in summer during boat service hours.' },
      { icon: '\uD83C\uDFD8\uFE0F', title: 'Former Fishing Village', body: 'Up to 400 people lived here, hauling boats over rocks and drying cod in the wind. The houses remain \u2014 clustered tight against the storms, some now maintained as summer cabins.' },
      { icon: '\uD83C\uDF0A', title: 'Open Sea Location', body: '14 km from the mainland in the Norwegian Sea. The boat ride crosses open water. On rough days, the crossing is cancelled. On calm days, the views of the coast from offshore are exceptional.' },
      { icon: '\uD83D\uDEB6', title: 'Island Walk', body: 'The island is 300 meters across. Walk the entire perimeter in 30 minutes. Visit the stave church, the old fish-drying rocks, the lighthouse, and the harbour where boats were hauled ashore.' },
    ],
    practicalInfo: [
      { title: 'Getting there', content: 'Summer boat service from Kristiansund harbour: June\u2013August. Departures vary \u2014 check visitkristiansund.com for the current timetable. Crossing time: 45\u201360 min depending on vessel and conditions.' },
      { title: 'On the island', content: 'No shops, no restaurants, no facilities. Bring water, snacks, and warm clothing \u2014 it is windier offshore than on the mainland. The stave church is open during boat service hours.' },
      { title: 'Time needed', content: '2\u20133 hours on the island. The boat schedule typically allows 2\u20134 hours ashore. Check the return departure before exploring.' },
      { title: 'Weather', content: 'The boat does not run in rough weather. Check the forecast and be prepared for cancellation. If the crossing is running, bring a windproof layer \u2014 the open sea wind is constant.' },
    ],
  },
  {
    slug: 'opera-festival',
    citySlug: 'kristiansund',
    cityName: 'Kristiansund',
    title: 'Opera House & Nordic Opera Festival',
    tagline: 'Norway\u2019s oldest opera tradition outside Oslo, since 1928',
    heroImage: '/pics/cities/Kristiansund_banner.jpeg',
    heroImageAlt: 'Kristiansund city centre rebuilt after 1940, Norway',
    metaDescription:
      'Kristiansund opera guide: Norway\u2019s oldest opera outside Oslo, the annual Nordic Opera Festival in February, and the rebuilt city\u2019s cultural heart.',
    heroDescription:
      'Kristiansund has hosted opera since 1928 \u2014 the oldest opera tradition in Norway outside Oslo. The Nordic Opera Festival runs every February in the opera house on Kongens plass. The city was bombed flat in April 1940 and rebuilt from nothing. Opera survived.',
    stats: [
      { label: 'Opera since', value: '1928' },
      { label: 'Festival', value: 'February annually' },
      { label: 'Venue', value: 'Kongens plass opera house' },
      { label: 'City rebuilt', value: 'After 1940 bombing' },
    ],
    overview: [
      'Kristiansund\u2019s relationship with opera is unlikely and enduring. The tradition began in 1928 when local amateur performers staged their first production. It has run every year since, through war, rebuilding, and economic change. No other Norwegian city outside Oslo has maintained a continuous opera programme this long.',
      'On April 28, 1940, German bombers destroyed Kristiansund almost entirely \u2014 the first Norwegian town to be levelled by aerial bombing. 850 houses were destroyed. The town centre burned for days. The population evacuated. When they returned, they rebuilt the city in functionalist style \u2014 the clean, angular architecture that defines central Kristiansund today.',
      'The opera house on Kongens plass was part of that rebuilding. It is a compact, modern venue \u2014 not a grand European opera house, but a working performance space suited to a town of 24,000. The annual Nordic Opera Festival in February draws performers from across Scandinavia and is the cultural highlight of Kristiansund\u2019s calendar.',
      'The festival runs for one week. Productions include full opera, chamber concerts, and contemporary music theatre. Tickets sell locally and to opera enthusiasts across the Nordic countries. The combination of opera, klippfisk, and February weather creates a distinctly Kristiansund experience: culture, food, and the Norwegian coast at its rawest.',
    ],
    highlights: [
      { icon: '\uD83C\uDFB6', title: 'Nordic Opera Festival', body: 'February annually. Full opera productions, chamber concerts, music theatre. Nordic performers and directors. One week. Tickets available from operaen.com from November.' },
      { icon: '\uD83C\uDFD7\uFE0F', title: 'Rebuilt City', body: 'Kristiansund was bombed flat on April 28, 1940. The functionalist architecture of the rebuilt city centre is itself a cultural landmark \u2014 Norway\u2019s largest collection of post-war reconstruction architecture.' },
      { icon: '\uD83C\uDFAD', title: 'Amateur Roots', body: 'The opera tradition started with local amateurs in 1928. Nearly a century later, the programme blends professional and community performers. The tradition is owned by the town, not imported.' },
      { icon: '\u2744\uFE0F', title: 'February Atmosphere', body: 'Opera in February means short daylight, cold winds, and warm concert halls. The contrast is deliberate. Combine with the Klippfiskfestivalen (same month) for the full winter Kristiansund experience.' },
    ],
    practicalInfo: [
      { title: 'Festival dates', content: 'February annually, one week. Exact dates announced on operaen.com in autumn. Book tickets from November \u2014 the main productions sell out.' },
      { title: 'Venue', content: 'Opera house on Kongens plass, central Kristiansund. Compact venue \u2014 every seat has good sightlines. 5-minute walk from the harbour.' },
      { title: 'Tickets', content: 'Available from operaen.com. Main productions: 350\u2013600 NOK. Chamber concerts: 200\u2013350 NOK. Student discounts available.' },
      { title: 'Combining with Klippfiskfestivalen', content: 'Both events run in February. Plan 3\u20134 days to attend both. Opera in the evening, klippfisk tastings during the day. Book accommodation early \u2014 Kristiansund has limited hotel capacity.' },
    ],
  },
];

// Helper functions
export function getCity(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}

export function getCityAttractions(citySlug: string): CityAttraction[] {
  return attractions.filter((a) => a.citySlug === citySlug);
}

export function getAttraction(citySlug: string, attractionSlug: string): CityAttraction | undefined {
  return attractions.find((a) => a.citySlug === citySlug && a.slug === attractionSlug);
}

export function getAllCitySlugs(): string[] {
  return cities.map((c) => c.slug);
}

export function getAllAttractionParams(): { city: string; attraction: string }[] {
  return attractions.map((a) => ({ city: a.citySlug, attraction: a.slug }));
}
