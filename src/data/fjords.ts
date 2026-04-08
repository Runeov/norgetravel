export interface FjordStat {
  label: string;
  value: string;
}

export interface FjordActivity {
  title: string;
  description: string;
  duration?: string;
  price?: string;
  season?: string;
}

export interface FjordBasecamp {
  name: string;
  description: string;
  distance?: string;
}

export interface FjordData {
  slug: string;
  name: string;
  heroImage: string;
  heroImageAlt: string;
  metaTitle: string;
  metaDescription: string;
  unesco: boolean;
  length: string;
  depth?: string;
  region: string;
  bestSeason: string;
  overview: string[];
  stats: FjordStat[];
  activities: FjordActivity[];
  gettingThere: string[];
  basecamps: FjordBasecamp[];
  seasonalNotes: { summer: string; winter: string };
  relatedTours: string[];
}

export const fjordData: Record<string, FjordData> = {
  geirangerfjord: {
    slug: 'geirangerfjord',
    name: 'Geirangerfjord',
    heroImage: '/Banners/geiranger_banner.jpg',
    heroImageAlt: 'Geirangerfjord with steep green mountainsides dropping into deep blue water, cruise ship in the distance',
    metaTitle: 'Geirangerfjord Travel Guide 2026 | NorgeTravel',
    metaDescription: 'Geirangerfjord: 15 km UNESCO fjord, Seven Sisters waterfall, zero-emission cruises. Access from Hellesylt or Alesund via Eagle Road. Practical guide with ferry times and crowd avoidance.',
    unesco: true,
    length: '15 km',
    depth: '233 m',
    region: 'Sunnmøre, Møre og Romsdal',
    bestSeason: 'May to September (roads close Oct-May)',
    overview: [
      'Geirangerfjord sits at the head of a 15 km inlet, UNESCO-listed since 2005, with 200 permanent residents and 900,000 visitors per season. The village has no bypass road. Everyone arrives from the same direction, and most of them arrive between 10:00 and 15:00 in July.',
      'The Seven Sisters waterfall drops 250 meters into the fjord in seven distinct streams. Across the water, the Suitor waterfall faces them from the opposite wall. The Bridal Veil cascades down a sheer cliff further west. All three are best seen from the water, not from the road above.',
      'Norway mandated zero-emission vessels in UNESCO fjords from 2026. The days of diesel cruise ships idling in Geirangerfjord are numbered. Electric and hybrid vessels now run the Geiranger to Hellesylt route.',
    ],
    stats: [
      { label: 'Length', value: '15 km' },
      { label: 'Depth', value: '233 m' },
      { label: 'UNESCO', value: 'Since 2005' },
      { label: 'Village population', value: '200' },
      { label: 'Annual visitors', value: '900,000' },
      { label: 'Road access', value: 'May-October only' },
    ],
    activities: [
      {
        title: 'Fjord cruise: Geiranger to Hellesylt',
        description: '15 km past the Seven Sisters, Suitor, and Bridal Veil waterfalls. Zero-emission vessels from 2026. The cruise takes approximately 1 hour and runs multiple daily departures in summer.',
        duration: '1 hour',
        season: 'May-September',
      },
      {
        title: 'Kayaking beneath the Seven Sisters',
        description: 'Guided kayak tours depart from Geiranger village and paddle directly beneath the waterfalls. From the water, you hear them before you see them. Drysuits provided. Water temperature: 8-14 degrees C.',
        duration: '3-5 hours',
        price: 'From 890 NOK',
        season: 'May-September',
      },
      {
        title: 'Eagle Road viewpoint (Ornevegen)',
        description: '11 hairpin bends climbing from Geiranger to the plateau above. The viewpoint at the top gives the classic Geirangerfjord photograph. Drive it or take the scheduled bus.',
        duration: '30 min drive',
      },
      {
        title: 'Dalsnibba viewpoint (1,500m)',
        description: 'The highest road-accessible viewpoint over Geirangerfjord. Toll road from Rv63. Snow walls line the road into June. On a clear day, the fjord is a thin blue line 1,500 meters below.',
        duration: '1 hour round trip from Geiranger',
        price: '150 NOK toll',
        season: 'June-October',
      },
    ],
    gettingThere: [
      'From Alesund: 106 km via Rv63 and the Eagle Road (Ornevegen). Budget 3.5 hours including the hairpin descent. Trollstigen pass can be combined but closes October to May.',
      'From Hellesylt: Ferry crossing, approximately 1 hour. Multiple departures daily in summer. Pre-book in July and August.',
      'From Andalsnes/Trollstigen: Rv63 over Trollstigen pass, then continue to Geiranger. Trollstigen is closed October to May. When open, budget 2 hours from Andalsnes.',
      'From Oslo: 480 km. The fastest route takes 7 hours via E6 and Rv15. Most travellers break the drive with an overnight in Lom or Stryn.',
    ],
    basecamps: [
      { name: 'Geiranger', description: 'The village at the head of the fjord. 200 residents. Hotels, camping, ferry terminal. Everything is walkable.', distance: '0 km' },
      { name: 'Hellesylt', description: 'Western end of the fjord. Smaller, quieter, and the ferry departure point. Good if you want to avoid the village crowds.', distance: '15 km by water' },
      { name: 'Alesund', description: 'Art Nouveau town on the coast. Full services, airport, hotels. Gateway to Geirangerfjord via Eagle Road.', distance: '106 km' },
    ],
    seasonalNotes: {
      summer: 'June to August is peak season. Cruise ships arrive daily. The village fills between 10:00 and 15:00. For empty fjord views, get on the water before 09:00 or after 17:00. The Eagle Road and Dalsnibba are fully open.',
      winter: 'Rv63 closes in October. The village is accessible by ferry only. Accommodation options are limited. Most operators shut down. This is not a winter destination unless you have specific local knowledge.',
    },
    relatedTours: [
      '7-Day Fjords & Mountains: Bergen to Alesund via Sognefjord, Sognefjellet, Geiranger, and Trollstigen',
      '10-Day Vestlandet Grand: the full Bergen to Alesund circuit covering every major fjord',
    ],
  },

  naeroyfjord: {
    slug: 'naeroyfjord',
    name: 'Naeroyfjord',
    heroImage: '/Banners/flaam_banner.jpg',
    heroImageAlt: 'Narrow Naeroyfjord channel with steep mountain walls rising from calm water, small village at the fjord edge',
    metaTitle: 'Naeroyfjord Travel Guide 2026 | NorgeTravel',
    metaDescription: 'Naeroyfjord: Europe\'s narrowest UNESCO fjord at 250m wide. Electric ferry from Flam, kayaking between 1,000m walls. Practical guide with transport and crowd tips.',
    unesco: true,
    length: '18 km',
    depth: '500 m',
    region: 'Aurland, Vestland',
    bestSeason: 'Year-round (electric ferries operate all year)',
    overview: [
      'Naeroyfjord narrows to 250 meters between walls that rise 1,000 meters on both sides. It is the narrowest fjord in Europe and a UNESCO World Heritage site since 2005. The name translates to "narrow fjord" and the first time you see it from the water, you understand why.',
      'The all-electric catamaran Future of The Fjords runs daily between Gudvangen and Flam through the Naeroyfjord. This is the fjord that appears on the Norway in a Nutshell route, combining Flam Railway, ferry, and bus in a single loop from Bergen.',
      'Unlike Geirangerfjord, Naeroyfjord is accessible year-round. The electric ferries run in all seasons, though winter departures are less frequent. The fjord is narrower, quieter, and more intimate than its UNESCO counterpart in the north.',
    ],
    stats: [
      { label: 'Length', value: '18 km' },
      { label: 'Depth', value: '500 m' },
      { label: 'Narrowest point', value: '250 m' },
      { label: 'UNESCO', value: 'Since 2005' },
      { label: 'Wall height', value: '1,000 m+' },
      { label: 'Ferry access', value: 'Year-round' },
    ],
    activities: [
      {
        title: 'Electric ferry: Gudvangen to Flam',
        description: 'The Future of The Fjords catamaran runs daily through the full length of Naeroyfjord. Zero-emission, silent propulsion. The 2-hour crossing passes beneath vertical walls and waterfalls that only exist in spring melt.',
        duration: '2 hours',
        season: 'Year-round',
      },
      {
        title: 'Kayaking Naeroyfjord',
        description: 'Guided half-day trips paddle 8 to 12 km from Gudvangen or Bakka. Full-day expeditions reach Dyrdal and the abandoned farms at the water\'s edge. In a kayak, you hear the waterfalls before you see them. 250 meters between walls that block the sun.',
        duration: '4-8 hours',
        price: 'From 890 NOK',
        season: 'May-September',
      },
      {
        title: 'Flam Railway',
        description: 'The Flam Railway drops 866 meters over 20 km from Myrdal to Flam through 20 tunnels. The train pauses at Kjosfossen waterfall (225m). One of the steepest standard-gauge lines in the world. Combine with the Naeroyfjord ferry for the Norway in a Nutshell route.',
        duration: '1 hour',
        season: 'Year-round',
      },
      {
        title: 'Stegastein viewpoint',
        description: 'A cantilevered platform 650 meters above Aurlandsfjord, 6 km from Flam. The view down to the fjord floor puts the scale of the landscape into perspective. Drive or take the local bus.',
        duration: '1 hour round trip from Flam',
      },
    ],
    gettingThere: [
      'From Bergen: Take the Bergen Railway to Myrdal (2.5 hours), then the Flam Railway to Flam (1 hour). The ferry from Flam to Gudvangen traverses the full Naeroyfjord.',
      'From Gudvangen: The western access point. Electric ferries depart for Flam through the Naeroyfjord. Bus connections from Voss.',
      'From Flam: The eastern access point. Flam sits on Aurlandsfjord, a branch of Sognefjord. Ferries to Gudvangen depart from the harbour.',
      'Norway in a Nutshell: The classic loop combines Bergen Railway, Flam Railway, Naeroyfjord ferry, and bus over Stalheimskleiva back to Voss. Runs as a day trip or multi-day.',
    ],
    basecamps: [
      { name: 'Flam', description: '350 permanent residents at the bottom of the Flam Railway. Hotels, camping, harbour. Peak season brings 300,000+ cruise visitors.', distance: '0 km' },
      { name: 'Gudvangen', description: 'Western entry to Naeroyfjord. Viking Village, kayak centre. Quieter than Flam, fewer overnight options.', distance: '18 km by water' },
      { name: 'Aurland', description: 'Smaller village between Flam and the Laerdal Tunnel. Less crowded. Stegastein viewpoint is here.', distance: '10 km from Flam' },
    ],
    seasonalNotes: {
      summer: 'June to August: the busiest period. Cruise ships dock at Flam daily. The Naeroyfjord ferry sells out on peak days. Book ahead. For quiet mornings, catch the first departure.',
      winter: 'Electric ferries still run but on a reduced schedule. The fjord is quiet, often misty, with snow to the waterline. The Flam Railway runs year-round. A completely different experience from summer.',
    },
    relatedTours: [
      '3-Day Norway in a Nutshell: Bergen, Flam Railway, Naeroyfjord, Gudvangen, Voss, Bergen',
      '5-Day Hardangerfjord & Sognefjord: two fjords, Trolltunga, express boat back to Bergen',
    ],
  },

  hardangerfjord: {
    slug: 'hardangerfjord',
    name: 'Hardangerfjord',
    heroImage: '/Banners/odda_banner.jpg',
    heroImageAlt: 'Inner Hardangerfjord with steep green valley walls, calm water reflecting surrounding mountains near Odda',
    metaTitle: 'Hardangerfjord Travel Guide 2026 | NorgeTravel',
    metaDescription: 'Hardangerfjord: Norway\'s second longest fjord at 179 km. Trolltunga trailhead, Hardanger apple orchards, Folgefonna glacier. Practical guide with driving times and seasonal access.',
    unesco: false,
    length: '179 km',
    depth: '891 m',
    region: 'Hardanger, Vestland',
    bestSeason: 'May to October (apple blossom May, harvest Aug-Oct)',
    overview: [
      'Hardangerfjord stretches 179 km from the Atlantic coast to the inner valleys of Vestland. It is Norway\'s second longest fjord and runs through the heart of Norway\'s fruit-growing region. Forty percent of Norway\'s fruit grows in the orchards lining its shores.',
      'The Hardanger Bridge spans 1,380 meters across the fjord, the longest suspension bridge in Norway. South of the bridge, Sorfjorden leads to Odda and the Trolltunga trailhead. North of it, the cideries along Fv551 open their farmgates from August through October.',
      'This is not a fjord you cover in a day. The inner reaches around Eidfjord connect to Hardangervidda, the largest mountain plateau in Northern Europe. Folgefonna glacier sits above the southern shore with summer skiing on the plateau. The landscape shifts from coastal to alpine within a 2-hour drive.',
    ],
    stats: [
      { label: 'Length', value: '179 km' },
      { label: 'Depth', value: '891 m' },
      { label: 'Bridge span', value: '1,380 m' },
      { label: 'Fruit production', value: '40% of Norway' },
      { label: 'Major glacier', value: 'Folgefonna' },
      { label: 'Trolltunga hike', value: '27 km round-trip' },
    ],
    activities: [
      {
        title: 'Trolltunga hike',
        description: 'The rock ledge jutting 700 meters above Ringedalsvatnet. 27 km round-trip with 800 meters of elevation gain. Budget 10 to 12 hours. This is not a casual walk. A guide is required from October to May. Start from Skjeggedal trailhead near Odda.',
        duration: '10-12 hours',
        season: 'June-September (guided only Oct-May)',
      },
      {
        title: 'Hardanger apple harvest',
        description: 'The orchards along the fjord bloom pink in May and harvest from late August through October. Cideries at Aga, Lofthus, and Ullensvang offer farmgate tastings. The Hardangertun market at Lofthus (third weekend of September) gathers 50 producers.',
        season: 'Blossom: May. Harvest: Aug-Oct.',
      },
      {
        title: 'Folgefonna glacier',
        description: 'Folgefonna National Park sits above the southern shore. The glacier offers summer skiing from June to August. Guided glacier walks depart from Jondal. The contrast between the fjord at sea level and the glacier at 1,200 meters is a 1-hour drive.',
        duration: '4-6 hours guided',
        season: 'June-August',
      },
      {
        title: 'Voringsfossen waterfall',
        description: 'Norway\'s most visited waterfall drops 182 meters into the Mabodalen valley. The new viewing platforms at the canyon edge opened in 2020. The old hotel viewpoint and the new staircase paths give different perspectives. 20 minutes from Eidfjord.',
        duration: '1-2 hours',
      },
    ],
    gettingThere: [
      'From Bergen: Rv7 east via the Hardanger Bridge. Allow 2.5 hours to Eidfjord, 3 hours to Odda. The bridge replaced the ferry crossing in 2013.',
      'From Oslo: E134 west through Kongsberg and Haukeli. 460 km, 6 to 7 hours to Odda. The route crosses the southern edge of Hardangervidda.',
      'From Voss: Rv13 south to Kinsarvik (1.5 hours), then follow the fjord east to Eidfjord or south to Odda.',
      'The Hardangervidda National Tourist Route (Rv7) connects Eidfjord to Geilo, crossing the plateau at 1,250m. One of Norway\'s finest driving routes.',
    ],
    basecamps: [
      { name: 'Odda', description: 'Trolltunga trailhead. Former industrial town reinvented around adventure tourism. Hotels, restaurants, gear rental.', distance: 'Inner Hardangerfjord' },
      { name: 'Eidfjord', description: 'Gateway to Hardangervidda and Voringsfossen. Compact village, cruise port, museum. Starting point for plateau crossings.', distance: 'Mid Hardangerfjord' },
      { name: 'Lofthus', description: 'Heart of the apple orchards. Ullensvang Hotel (since 1846). Farmgate cideries. The Hardanger harvest festival happens here.', distance: 'South shore' },
      { name: 'Norheimsund', description: 'Outer Hardangerfjord. Steinsdalsfossen walk-behind waterfall. Closest point from Bergen.', distance: 'Outer Hardangerfjord' },
    ],
    seasonalNotes: {
      summer: 'June to August: Trolltunga is accessible without a guide. The fjord is busy but never as crowded as Geirangerfjord. Folgefonna offers summer skiing. The orchards are green but not yet ripe.',
      winter: 'Trolltunga requires a guide and full winter equipment from October. The Hardangervidda plateau roads close. The inner fjord villages are quiet. The Hardanger Bridge and main roads remain open year-round.',
    },
    relatedTours: [
      '5-Day Hardangerfjord & Sognefjord: Bergen, Hardanger Bridge, Trolltunga, Vikafjellet, Balestrand, Bergen',
      '10-Day Vestlandet Grand: the full Bergen to Alesund circuit',
    ],
  },

  sognefjord: {
    slug: 'sognefjord',
    name: 'Sognefjord',
    heroImage: '/Banners/gateway_to_sognefjord_banner.jpg',
    heroImageAlt: 'Sognefjord stretching into the distance between green mountain ridges under a blue sky',
    metaTitle: 'Sognefjord Travel Guide 2026 | NorgeTravel',
    metaDescription: 'Sognefjord: Norway\'s longest (205 km) and deepest (1,308 m) fjord. Flam Railway, Naeroyfjord branch, Balestrand. Complete guide with transport, ferries, and itineraries.',
    unesco: false,
    length: '205 km',
    depth: '1,308 m',
    region: 'Sogn og Fjordane, Vestland',
    bestSeason: 'May to September (express boats and Flam Railway run year-round)',
    overview: [
      'Sognefjord is Norway\'s longest fjord at 205 km and its deepest at 1,308 meters. The fjord system branches into multiple arms, each with its own character. The Naeroyfjord branch carries UNESCO status. The Aurlandsfjord arm ends at Flam. The Lustrafjord arm reaches Skjolden at the foot of Jotunheimen.',
      'Balestrand sits on the north shore and has drawn painters, writers, and tourists since the 1850s. Kviknes Hotel has operated here since 1877. Express boats from Bergen reach Balestrand in 3.5 hours. From Balestrand, the fjord stretches 205 km to the open sea.',
      'The Sognefjellet mountain road (Rv55) climbs from the fjord to 1,434 meters, the highest mountain pass in Northern Europe open to public traffic. The road connects Sognefjord to Jotunheimen and opens mid-May to late October. When it closes, the fjord towns rely on ferries and tunnels.',
    ],
    stats: [
      { label: 'Length', value: '205 km' },
      { label: 'Depth', value: '1,308 m' },
      { label: 'UNESCO branch', value: 'Naeroyfjord' },
      { label: 'Highest pass', value: 'Sognefjellet 1,434 m' },
      { label: 'Express boat', value: 'Bergen 3.5 hrs' },
      { label: 'Flam Railway', value: '866 m descent' },
    ],
    activities: [
      {
        title: 'Flam Railway and Naeroyfjord ferry',
        description: 'The Norway in a Nutshell route combines the Flam Railway (866m descent, 20 tunnels) with the electric ferry through Naeroyfjord. From Bergen, the full loop takes one long day or two comfortable days with an overnight in Flam.',
        duration: 'Full day or 2 days',
        season: 'Year-round',
      },
      {
        title: 'Express boat Bergen to Sognefjord',
        description: 'Norled express boats run from Bergen (Strandkaiterminalen) to Balestrand, Vik, Flam, and Sogndal. The Bergen to Balestrand crossing takes 3.5 hours through the outer fjord. No car needed.',
        duration: '3.5 hours to Balestrand',
        season: 'Year-round (reduced winter)',
      },
      {
        title: 'Sognefjellet mountain road',
        description: 'Rv55 from Sogndal to Lom crosses at 1,434 meters, the highest mountain pass in Northern Europe. The road runs between Jotunheimen\'s glaciers and peaks. Snow walls line the road into June. Open mid-May to late October.',
        duration: '3 hours Sogndal to Lom',
        season: 'Mid-May to late October',
      },
      {
        title: 'Urnes Stave Church',
        description: 'Norway\'s oldest stave church, built around 1130, on the east shore of Lustrafjord. UNESCO World Heritage site. The animal carvings on the north portal are among the finest surviving examples of Viking art. Reached by ferry from Solvorn.',
        duration: '2-3 hours including ferry',
        season: 'May-September (church open)',
      },
    ],
    gettingThere: [
      'From Bergen by train: Bergen Railway to Myrdal (2.5 hours), Flam Railway to Flam (1 hour). The most popular route into Sognefjord.',
      'From Bergen by express boat: Norled runs Bergen to Balestrand (3.5 hours) and Bergen to Flam (5.5 hours). No car needed.',
      'From Bergen by car: E16 through the Laerdal Tunnel (24.5 km, the world\'s longest road tunnel) to Laerdal and Sognefjord. 3 to 4 hours.',
      'From Jotunheimen: Rv55 over Sognefjellet from Lom to Sogndal. Open mid-May to late October. One of the best driving routes in Norway.',
    ],
    basecamps: [
      { name: 'Flam', description: 'Flam Railway terminus, Naeroyfjord ferry departure. 350 residents, full tourism services. The busiest point on Sognefjord in summer.', distance: 'Inner Sognefjord' },
      { name: 'Balestrand', description: 'North shore. Kviknes Hotel (1877), painters\' village, express boat hub. 800 residents. Quieter and more historic than Flam.', distance: 'Mid Sognefjord' },
      { name: 'Sogndal', description: 'Largest town on Sognefjord. University, airport (seasonal), Sognefjellet road access. The practical base for longer stays.', distance: 'Mid-inner Sognefjord' },
      { name: 'Laerdal', description: 'Eastern gateway via the Laerdal Tunnel from Bergen. Historic timber houses. Salmon river. Norwegian Wild Salmon Centre.', distance: 'Inner Sognefjord' },
    ],
    seasonalNotes: {
      summer: 'June to August is peak season. The Flam Railway and Naeroyfjord ferry sell out on busy days. Sognefjellet is open, connecting the fjord to Jotunheimen. Express boats run full schedules. Book Flam accommodation 2 to 4 months ahead.',
      winter: 'Sognefjellet closes. The Laerdal Tunnel and express boats keep the fjord towns connected. The Flam Railway runs year-round. Snow reaches the waterline. Balestrand and the inner fjord villages are very quiet.',
    },
    relatedTours: [
      '3-Day Norway in a Nutshell: Bergen, Flam Railway, Naeroyfjord, Gudvangen, Voss, Bergen',
      '5-Day Hardangerfjord & Sognefjord: Trolltunga, Vikafjellet, Balestrand, express boat back to Bergen',
      '7-Day Fjords & Mountains: Bergen to Alesund via Sognefjord, Sognefjellet, Geiranger, Trollstigen',
    ],
  },
};

export function getFjord(slug: string): FjordData | undefined {
  return fjordData[slug];
}

export function getAllFjordSlugs(): string[] {
  return Object.keys(fjordData);
}
