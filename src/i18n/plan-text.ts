import type { Locale } from '@/lib/i18n-seo';
import type { Plural } from './format';

/**
 * What the trip planner's rule engine writes, in each language: the guide
 * link labels, the light and season notes, the route legs, the getting-around
 * and packing lines, the reasons shown on suggestions, and the planner's
 * error messages. The engine owns when a line applies; this file owns what it
 * says. Every number, time, road and phone number is the same in all three
 * languages. Place names stay in their Norwegian form where no common Chinese
 * or Japanese name exists. Templates use ./format.ts.
 */

export const PLAN_GUIDE_KEYS = [
  'northernLights',
  'tromso',
  'lofoten',
  'svalbard',
  'fjords',
  'northernNorway',
  'cities',
  'lyngen',
  'transport',
  'packing',
  'winterDriving',
  'mountainCode',
  'ferries',
  'bergenToLofoten',
  'tromsoToLofoten',
  'bergenRailway',
  'hurtigruten',
  'whales',
  'sledding',
  'dnt',
  'bestTime',
  'cost',
  'norrona',
  'hours57',
] as const;
export type PlanGuideKey = (typeof PLAN_GUIDE_KEYS)[number];

export type LightId =
  | 'nnAurora'
  | 'nnPolarNight'
  | 'nnMidnightSun'
  | 'lofotenAurora'
  | 'lofotenMidnightSun'
  | 'lofotenSkrei'
  | 'svalbardPolarNight'
  | 'svalbardMidnightSun'
  | 'fjordsClosures'
  | 'fjordsPeak';

export type SeasonLabelId =
  | 'aurora'
  | 'midnightSun'
  | 'whales'
  | 'snow'
  | 'reindeer'
  | 'frozenGround'
  | 'glacier'
  | 'snowFreeTrails'
  | 'iceFreeFjords'
  | 'skrei'
  | 'ski';

export interface PlanText {
  /** Named to the day-by-day model as the language to write in. Absent for English. */
  languageName?: string;
  dateLocale: string;
  guides: Record<PlanGuideKey, string>;
  light: Record<LightId, string>;
  lightNoDates: string;
  seasonLabels: Record<SeasonLabelId, string>;
  fit: {
    /** {n} regions */
    regions: string;
    /** {nights}, {regions} (a regionCount phrase), {pace}, {short} */
    short: string;
    /** {nights}, {regions}, {pace}, {per} */
    ok: string;
    noDates: string;
    regionCount: Plural;
  };
  method: {
    mobility: string;
    studs: string;
    tromsoBase: string;
    bodoFerry: string;
    fjordQueues: string;
    coastal: string;
    svalbardGuide: string;
  };
  /** Where every route starts. */
  home: string;
  arrival: {
    cities: string;
    fjordsCar: string;
    fjordsNoCar: string;
    boat: string;
    lofotenCar: string;
    lofotenNoCar: string;
    nnWinterNoCar: string;
    nn: string;
    svalbard: string;
  };
  legs: {
    citiesFjordsCar: string;
    citiesFjordsNoCar: string;
    citiesBoat: string;
    fjordsBoat: string;
    citiesLofotenCar: string;
    citiesLofotenNoCar: string;
    fjordsLofotenCar: string;
    fjordsLofotenNoCar: string;
    boatLofoten: string;
    /** Followed by lofotenNnCarWinter or lofotenNnCarOther. */
    lofotenNnCar: string;
    lofotenNnCarWinter: string;
    lofotenNnCarOther: string;
    lofotenNnNoCar: string;
    boatNn: string;
    fjordsNn: string;
    citiesNnCar: string;
    citiesNnNoCar: string;
    nnSvalbard: string;
    lofotenSvalbard: string;
    citiesSvalbard: string;
    fjordsSvalbard: string;
    boatSvalbard: string;
    /** {from}, {to} */
    fallback: string;
  };
  reasons: {
    /** {interests} */
    matches: string;
    /** {label} */
    inSeason: string;
    pick: string;
    /** {rating} */
    rating: string;
    /** {rating}, {reviews} */
    ratingReviews: string;
    inRegion: string;
    bookable: string;
    join: string;
  };
  event: {
    /** {start}, {end} */
    range: string;
    projected: string;
    /** {dates}, {projected}, {location} */
    why: string;
  };
  /** {budget}, {zone} */
  stayNote: string;
  kit: {
    wool: string;
    shell: string;
    layers: string;
    aurora: string;
    hike: string;
    dnt: string;
    autopass: string;
    svalbard: string;
    where: string;
  };
  errors: {
    suggestFailed: string;
    notConfigured: string;
    needJson: string;
    needDates: string;
    oneNight: string;
    maxNights: string;
    tooMany: string;
    dailyLimit: string;
    writeFailed: string;
    /** {ref} */
    leftOut: string;
    shareJson: string;
    shareTooMany: string;
    shareEmpty: string;
    shareFailed: string;
  };
  share: {
    /** {zones} */
    title: string;
    zoneJoin: string;
    norway: string;
  };
}

// ─── English ───

const en: PlanText = {
  dateLocale: 'en-GB',
  guides: {
    northernLights: 'Northern Lights guide',
    tromso: 'Tromsø guide',
    lofoten: 'Lofoten guide',
    svalbard: 'Svalbard guide',
    fjords: 'Fjords guide',
    northernNorway: 'Northern Norway guide',
    cities: 'Cities guide',
    lyngen: 'Lyngen guide',
    transport: 'Transport listings',
    packing: 'Arctic packing guide',
    winterDriving: 'Winter driving guide',
    mountainCode: 'The Mountain Code',
    ferries: 'Norway ferry guide',
    bergenToLofoten: 'Bergen to Lofoten routes',
    tromsoToLofoten: 'Tromsø to Lofoten routes',
    bergenRailway: 'Bergen Railway trip report',
    hurtigruten: 'Hurtigruten Bergen to Tromsø trip report',
    whales: 'Skjervøy whale safari trip report',
    sledding: 'Dog sledding or reindeer sledding guide',
    dnt: 'DNT cabin guide',
    bestTime: 'Best time to visit',
    cost: 'Norway cost guide',
    norrona: 'Norrøna',
    hours57: '57hours Lofoten self-guided hike',
  },
  light: {
    nnAurora:
      'Northern Lights season runs from late September to late March. Tromsø sits under the auroral oval; plan four nights minimum, because two of them may be cloudy.',
    nnPolarNight:
      'Polar night in Tromsø, 27 November to 15 January: the sun stays below the horizon, with twilight at midday. Tours run on headlamps and the sky is dark by 15:00.',
    nnMidnightSun:
      'Midnight sun in Tromsø from 20 May to 22 July: 24-hour daylight for hiking, sea kayaking and the Midnight Sun Marathon.',
    lofotenAurora:
      'Lofoten sits under the auroral oval at 68°N; aurora season is September to March, with the islands darkest from December.',
    lofotenMidnightSun:
      '24-hour daylight from 28 May to 14 July. Peak photography season and peak crowds: book accommodation 6 to 9 months ahead.',
    lofotenSkrei:
      'Skrei season, January to April: the Arctic cod migration, the fishing fleet out daily and the stockfish racks going up from February.',
    svalbardPolarNight:
      'Polar night on Svalbard runs from late October to mid-February: four months of darkness at 78°N. Dog sledding and aurora run through it.',
    svalbardMidnightSun:
      'The sun stays up 24 hours a day from late April to mid-August. The summer expedition season, June to September, opens the fjords for guided glacier and wildlife trips.',
    fjordsClosures:
      'Rv55 over Sognefjellet closes in October and does not reopen until late May, and Trollstigen is shut for the winter. Reroute via the Lærdal tunnel and check Statens vegvesen the morning you drive.',
    fjordsPeak:
      'Peak season on the fjords. Book ahead on the long and tourist crossings, expect ferry queues in July and August, and pay tolls with AutoPASS.',
  },
  lightNoDates:
    'Add your dates and these notes narrow to the light you will actually get: aurora season, polar night or midnight sun.',
  seasonLabels: {
    aurora: 'aurora season, late September to late March',
    midnightSun: 'midnight sun, 20 May to 22 July',
    whales: 'whale season off Skjervøy, October to 31 January',
    snow: 'snow season, November to May',
    reindeer: 'reindeer sledding on snow, November to early April',
    frozenGround: 'frozen ground, February to May',
    glacier: 'accessible glacier surface, May to September',
    snowFreeTrails: 'snow-free trails, June to September',
    iceFreeFjords: 'ice-free fjords, June to August',
    skrei: 'skrei season, January to April',
    ski: 'ski season, February to May',
  },
  fit: {
    regions:
      '{n} regions in one trip means more travel days than place days. Our rule is two regions per trip unless you have 14 nights or more.',
    short:
      '{nights} nights across {regions} at a {pace} pace is {short} short. Drop a region or add nights; the ferry schedules do not care about optimism.',
    ok: '{nights} nights across {regions} works at a {pace} pace ({per} nights per region).',
    noDates: 'Add arrival and departure dates to check whether the pace fits.',
    regionCount: { one: '1 region', other: '{n} regions' },
  },
  method: {
    mobility: 'Say whether you will have a car; the route and the costs change a lot either way.',
    studs:
      'Studded tyres are allowed from 16 October to 30 April in Nordland, Troms and Finnmark (1 November to the first Sunday after Easter further south). Rental cars come with winter tyres; check Statens vegvesen the morning you drive.',
    tromsoBase:
      'Base in Tromsø and book tours with hotel pickup. The airport express is 15 to 20 minutes into town and the Arctic Route buses reach Lyngen and Finland in winter.',
    bodoFerry:
      'Bodø to Moskenes ferry: 3 to 4 hours, only half the capacity can be reserved, and the booking fee is 130 NOK for a car up to 6 m. Book ahead from May to September.',
    fjordQueues:
      'Fjord ferries in July and August mean queues. Get an AutoPASS ferry agreement for the discount and book the long crossings.',
    coastal:
      'Treat the coastal ship as transport with a view, not a cruise: 34 ports, 11 nights for the full Bergen to Kirkenes run. Book a segment and get off where the trip wants you.',
    svalbardGuide:
      'On Svalbard, everything outside Longyearbyen needs a licensed guide, and the 800 hotel beds book out months ahead.',
  },
  home: 'Home',
  arrival: {
    cities:
      'Fly into Oslo (OSL) or Bergen (BGO). The Bergen Railway links the two in about 7 hours; Vy runs 6 to 7 departures a day including a night train.',
    fjordsCar:
      'Fly into Bergen (BGO) and pick up the car there. Bergen to Flåm is 166 km; budget 3.5 hours for the E16 tunnels and the Gudvangen ferry.',
    fjordsNoCar:
      'Fly into Bergen (BGO). Without a car, the Bergen Railway, the Flåm Railway and the fjord ferries do the work: the Norway in a Nutshell route.',
    boat:
      'Fly into Bergen (BGO) and board Hurtigruten or Havila there; the two alternate departures north to Kirkenes, 34 ports and 11 nights for the full run. Segment it rather than sailing it all.',
    lofotenCar:
      'Fly to Evenes (EVE) and drive 164 km on the E10 to Svolvær, no ferry needed. Or fly via Bodø to Svolvær or Leknes with Widerøe and rent there.',
    lofotenNoCar:
      'Widerøe flies nonstop to Bodø, then 25 minutes on to Svolvær or Leknes. Pick one base and let the local buses and tours do the rest.',
    nnWinterNoCar:
      'Fly to Tromsø (TOS); the airport express bus is 15 to 20 minutes into town. In winter a car adds little: aurora chases, whale boats and dog sledding all pick up at hotels.',
    nn: 'Fly to Tromsø (TOS), the Arctic basecamp with the most departures, or to Alta for Finnmark and the Sami heartland.',
    svalbard:
      'Fly to Longyearbyen: 3 hours direct from Oslo, or via Tromsø. All travel to Svalbard is by air, and outside town you need a licensed guide.',
  },
  legs: {
    citiesFjordsCar:
      'From Bergen, the E16 east: Bergen to Flåm is 166 km, 3.5 hours with the tunnels and the Gudvangen ferry. Pay tolls and ferries with AutoPASS.',
    citiesFjordsNoCar:
      'Bergen Railway to Myrdal, Flåm Railway down to Aurlandsfjord, ferry to Gudvangen: the Norway in a Nutshell route, about 8 hours if the connections work.',
    citiesBoat:
      'Board the coastal ship in Bergen. Hurtigruten and Havila alternate departures; book the Bergen to Tromsø leg as a segment.',
    fjordsBoat: 'Back to Bergen to board the coastal ship, or join it at Ålesund, the first port after Bergen.',
    citiesLofotenCar:
      'Fly to Evenes and drive 164 km on the E10 to Svolvær, or fly via Bodø to Svolvær or Leknes. Driving the whole way is 1,570 km and 24 hours at the wheel; plan three days at least.',
    citiesLofotenNoCar:
      'Widerøe nonstop to Bodø, then 25 minutes on to Svolvær or Leknes. Without flying: rail via Trondheim to Bodø (about 10 hours on the Nordland Line), then the ferry or express boat.',
    fjordsLofotenCar:
      'Drop the car in Bergen, fly via Bodø to Svolvær or Leknes, and rent again there; or fly to Evenes and drive the E10 in.',
    fjordsLofotenNoCar: 'Fly from Bergen via Bodø to Svolvær or Leknes, 3 to 4 hours with the connection.',
    boatLofoten:
      'The coastal ship calls at Stamsund at 19:15 and Svolvær at 21:20 northbound. Step off in Svolvær and stay.',
    lofotenNnCar:
      'E10 east over Lofast and Tjeldsund to Bjerkvik, then the E6 north over Gratangsfjellet and the E8 into Tromsø: about 430 km from Svolvær, 5.6 to 7 hours without stops.',
    lofotenNnCarWinter:
      ' Winter: Gratangsfjellet gets convoys and closures, so check vegvesen.no or call 175 before you leave; studded tyres are allowed in Nordland and Troms from 16 October to 30 April.',
    lofotenNnCarOther: ' Allow a full day with stops.',
    lofotenNnNoCar:
      'Widerøe flies Leknes to Tromsø nonstop every day, 16:20 to 17:15 (14:20 on Saturdays); from Svolvær nonstop on Saturdays only, other days via Bodø. Or take the coastal ship north overnight: Svolvær 22:15, Tromsø 14:15 the next day.',
    boatNn: 'Stay aboard to Tromsø, or on to Honningsvåg for North Cape and Kirkenes at the end of the line.',
    fjordsNn:
      'Fly Bergen to Tromsø; Widerøe and SAS connect via Oslo or direct depending on the day. The coastal ship is the slow alternative, Bergen to Tromsø as one segment.',
    citiesNnCar: 'Fly Oslo to Tromsø (TOS) and rent there; driving north is 1,700 km of E6.',
    citiesNnNoCar:
      'Fly Oslo to Tromsø (TOS). The Arctic Route winter buses and the Svipper city buses cover the ground without a car.',
    nnSvalbard:
      'Fly Tromsø to Longyearbyen; most Oslo departures stop in Tromsø, and the direct Oslo flight is 3 hours. Outside Longyearbyen a licensed guide is required.',
    lofotenSvalbard: 'Fly via Tromsø or Oslo to Longyearbyen. All travel to Svalbard is by air.',
    citiesSvalbard: 'Fly Oslo to Longyearbyen direct, 3 hours.',
    fjordsSvalbard: 'Back to Bergen, then Oslo to Longyearbyen, 3 hours direct.',
    boatSvalbard: 'Leave the ship in Tromsø and fly to Longyearbyen.',
    fallback: "Fly between {from} and {to}; Widerøe's regional network covers the gaps the trains and ferries do not.",
  },
  reasons: {
    matches: 'Matches {interests}',
    inSeason: 'in season ({label})',
    pick: 'editor’s pick',
    rating: 'Google {rating}',
    ratingReviews: 'Google {rating} ({reviews})',
    inRegion: 'In this region',
    bookable: 'bookable',
    join: ' · ',
  },
  event: {
    range: '{start} to {end}',
    projected: ' (annual, dates from the previous edition)',
    why: '{dates}{projected} · {location}',
  },
  stayNote: 'Few {budget} listings in {zone}; showing the best rated at any price.',
  kit: {
    wool: 'Wool base layers, top and bottom; merino at 200 g/m² is the Norwegian default. Never cotton: it holds sweat against the skin and speeds heat loss.',
    shell:
      'Windproof shell, insulated mid-layer, mittens over gloves, and boots rated for the cold with ice grips for Tromsø pavements.',
    layers:
      'A windbreaker and a warm layer even in July. The wind off the Vestfjord cuts through a standard sweater, and fjord weather turns in an hour.',
    aurora:
      'Tripod and spare batteries for aurora nights; the cold drains phones and cameras fast. Four nights minimum, two may be cloudy.',
    hike: 'Shoes with grip (the Reinebringen steps ice over from September), a map and compass as the Mountain Code requires, and a plan to turn back if the weather turns.',
    dnt: 'For hut-to-hut days: DNT membership and the DNT key, since the self-service cabins are locked with it.',
    autopass:
      'An AutoPASS tag or a registered number plate: most ferries read it as you drive on, and the prepayment agreement takes 50 percent off private crossings.',
    svalbard:
      'On Svalbard the guide carries the rifle and the kit; you bring warm layers, sunglasses for the ice, and a booking made months ahead.',
    where:
      'Where to get it: Norrøna makes the shells and insulation for this weather, and 57hours packs a full gear list into its Lofoten self-guided hike.',
  },
  errors: {
    suggestFailed: 'The planner could not build a plan right now.',
    notConfigured: 'The day-by-day planner is not configured on this deployment.',
    needJson: 'Send the trip basics as JSON.',
    needDates: 'Dates and at least one destination are needed for a day-by-day plan.',
    oneNight: 'The trip needs at least one night.',
    maxNights: 'The day-by-day plan covers trips of up to 21 nights.',
    tooMany: 'That is a few plans in a row. Give it ten minutes and try again.',
    dailyLimit: 'The day-by-day planner has reached its daily limit. The plan above still works; try again tomorrow.',
    writeFailed: 'The planner could not write the plan just now. The plan above still works; try again in a minute.',
    leftOut: 'Left out, not in our listings: {ref}',
    shareJson: 'Send the plan as JSON.',
    shareTooMany: 'That is a lot of links in a row. Give it ten minutes.',
    shareEmpty: 'Pick a destination or save something before sharing.',
    shareFailed: 'The link could not be made just now. Try again in a minute.',
  },
  share: { title: '{zones} trip plan', zoneJoin: ' and ', norway: 'Norway' },
};

// ─── Chinese (Simplified) ───

const zh: PlanText = {
  languageName: 'Simplified Chinese (zh-CN)',
  dateLocale: 'zh-CN',
  guides: {
    northernLights: '极光指南',
    tromso: '特罗姆瑟指南',
    lofoten: '罗弗敦群岛指南',
    svalbard: '斯瓦尔巴群岛指南',
    fjords: '峡湾指南',
    northernNorway: '挪威北部指南',
    cities: '挪威城市指南',
    lyngen: '林根指南',
    transport: '交通信息',
    packing: '北极地区装备清单',
    winterDriving: '冬季驾驶指南',
    mountainCode: '挪威山区守则',
    ferries: '挪威渡轮指南',
    bergenToLofoten: '卑尔根至罗弗敦路线',
    tromsoToLofoten: '特罗姆瑟至罗弗敦路线',
    bergenRailway: '卑尔根铁路旅行实录',
    hurtigruten: '海达路德卑尔根至特罗姆瑟旅行实录',
    whales: 'Skjervøy 观鲸旅行实录',
    sledding: '狗拉雪橇与驯鹿雪橇指南',
    dnt: 'DNT木屋指南',
    bestTime: '最佳旅行时间',
    cost: '挪威旅行费用指南',
    norrona: 'Norrøna',
    hours57: '57hours 罗弗敦自助徒步',
  },
  light: {
    nnAurora: '极光季从9月下旬持续到3月下旬。特罗姆瑟正处在极光带下方；至少安排四晚，因为其中可能有两晚是阴天。',
    nnPolarNight:
      '特罗姆瑟的极夜从11月27日持续到1月15日：太阳始终在地平线以下，只有正午前后有一段暮光。旅游团靠头灯进行，15:00天就黑了。',
    nnMidnightSun: '特罗姆瑟的午夜太阳从5月20日持续到7月22日：24小时日照，适合徒步、海上皮划艇和午夜太阳马拉松。',
    lofotenAurora: '罗弗敦群岛位于北纬68°的极光带下方；极光季为9月至3月，12月起群岛最暗。',
    lofotenMidnightSun: '5月28日至7月14日为24小时日照。这是摄影旺季，也是人最多的时候：住宿要提前6到9个月预订。',
    lofotenSkrei: '1月至4月是鳕鱼（skrei）季：北极鳕鱼洄游，渔船每天出海，2月起晒鱼架陆续搭起。',
    svalbardPolarNight:
      '斯瓦尔巴群岛的极夜从10月下旬持续到2月中旬：北纬78°长达四个月的黑暗。狗拉雪橇和极光观赏在此期间照常进行。',
    svalbardMidnightSun:
      '4月下旬至8月中旬，太阳24小时不落。6月至9月的夏季探险季开放峡湾，可以参加有向导的冰川和野生动物行程。',
    fjordsClosures:
      '翻越 Sognefjellet 的 Rv55 公路10月封闭，到5月下旬才重新开放；精灵之路（Trollstigen）整个冬季关闭。改走 Lærdal 隧道，出发当天早上查看挪威公路管理局（Statens vegvesen）的信息。',
    fjordsPeak: '峡湾旺季。长航线和观光航线要提前预订，7月和8月渡轮会排队，过路费用 AutoPASS 支付。',
  },
  lightNoDates: '填上日期，这些说明就会缩小到您实际会遇到的光照：极光季、极夜或午夜太阳。',
  seasonLabels: {
    aurora: '极光季，9月下旬至3月下旬',
    midnightSun: '午夜太阳，5月20日至7月22日',
    whales: 'Skjervøy 外海观鲸季，10月至1月31日',
    snow: '积雪季，11月至5月',
    reindeer: '雪地驯鹿雪橇，11月至4月初',
    frozenGround: '地面封冻期，2月至5月',
    glacier: '冰川表面可通行，5月至9月',
    snowFreeTrails: '步道无雪，6月至9月',
    iceFreeFjords: '峡湾无冰，6月至8月',
    skrei: '鳕鱼（skrei）季，1月至4月',
    ski: '滑雪季，2月至5月',
  },
  fit: {
    regions: '一趟行程去{n}个地区，路上的天数会比在当地的天数还多。我们的原则是：除非有14晚或以上，否则每趟最多两个地区。',
    short: '以{pace}的节奏用{nights}晚游览{regions}，还差{short}晚。请减少一个地区或增加天数；渡轮时刻表不会因为您乐观而迁就您。',
    ok: '以{pace}的节奏用{nights}晚游览{regions}是可行的（每个地区{per}晚）。',
    noDates: '填上抵达和离开日期，就能检查节奏是否合适。',
    regionCount: { one: '{n}个地区', other: '{n}个地区' },
  },
  method: {
    mobility: '请说明是否开车；有没有车，路线和费用都会差很多。',
    studs:
      '在诺尔兰、特罗姆斯和芬马克，10月16日至4月30日允许使用钉胎（更南部地区为11月1日至复活节后的第一个星期日）。租的车配有冬季轮胎；出发当天早上查看挪威公路管理局（Statens vegvesen）的信息。',
    tromsoBase: '以特罗姆瑟为据点，预订含酒店接送的旅游团。机场快线15到20分钟进城，冬季的 Arctic Route 巴士可到林根和芬兰。',
    bodoFerry:
      '博德（Bodø）至莫斯克内斯（Moskenes）渡轮：航程3到4小时，只有一半舱位可以预订，6米以内的汽车预订费为130挪威克朗。5月至9月要提前预订。',
    fjordQueues: '7月和8月的峡湾渡轮要排队。办一份 AutoPASS 渡轮协议享受折扣，长航线要提前预订。',
    coastal: '把沿海航船当作风景好的交通工具，而不是邮轮：卑尔根到希尔克内斯全程34个港口、11晚。只订一段航程，在行程需要的地方下船。',
    svalbardGuide: '在斯瓦尔巴群岛，朗伊尔城以外的一切活动都需要持证向导，岛上800张酒店床位会提前几个月订满。',
  },
  home: '出发地',
  arrival: {
    cities: '飞抵奥斯陆（OSL）或卑尔根（BGO）。卑尔根铁路连接两地，约7小时；Vy 每天6到7班，包括一班夜车。',
    fjordsCar: '飞抵卑尔根（BGO），在那里取车。卑尔根到弗洛姆（Flåm）166公里；算上 E16 的隧道和古德旺根（Gudvangen）渡轮，预留3.5小时。',
    fjordsNoCar: '飞抵卑尔根（BGO）。没有车也能玩：卑尔根铁路、弗洛姆铁路和峡湾渡轮就能完成，这就是“挪威缩影”（Norway in a Nutshell）路线。',
    boat: '飞抵卑尔根（BGO），在那里登上海达路德（Hurtigruten）或 Havila 的船；两家轮流发船北上希尔克内斯，全程34个港口、11晚。分段乘坐，不必坐完全程。',
    lofotenCar:
      '飞到埃维内斯（EVE），沿 E10 开164公里到斯沃尔维尔（Svolvær），不用坐渡轮。也可以搭威德罗（Widerøe）航空经博德飞到斯沃尔维尔或莱克内斯（Leknes），在当地租车。',
    lofotenNoCar: '威德罗航空直飞博德，再飞25分钟到斯沃尔维尔或莱克内斯。选一个据点，其余交给当地巴士和旅游团。',
    nnWinterNoCar:
      '飞到特罗姆瑟（TOS），机场快线巴士15到20分钟进城。冬天有车用处不大：追极光、观鲸船和狗拉雪橇都在酒店接人。',
    nn: '飞到航班最多的北极据点特罗姆瑟（TOS），或飞到阿尔塔（Alta），前往芬马克和萨米文化腹地。',
    svalbard: '飞到朗伊尔城（Longyearbyen）：从奥斯陆直飞3小时，或经特罗姆瑟中转。去斯瓦尔巴群岛只能坐飞机，出了镇子需要持证向导。',
  },
  legs: {
    citiesFjordsCar: '从卑尔根沿 E16 向东：卑尔根到弗洛姆166公里，算上隧道和古德旺根渡轮需3.5小时。过路费和渡轮费用 AutoPASS 支付。',
    citiesFjordsNoCar:
      '坐卑尔根铁路到米达尔（Myrdal），换弗洛姆铁路下到奥兰峡湾（Aurlandsfjord），再坐渡轮到古德旺根：这就是“挪威缩影”路线，衔接顺利的话约8小时。',
    citiesBoat: '在卑尔根登上沿海航船。海达路德和 Havila 轮流发船；把卑尔根到特罗姆瑟作为一段来预订。',
    fjordsBoat: '回卑尔根登上沿海航船，或者在卑尔根之后的第一个港口奥勒松（Ålesund）上船。',
    citiesLofotenCar:
      '飞到埃维内斯，沿 E10 开164公里到斯沃尔维尔，或经博德飞到斯沃尔维尔或莱克内斯。全程开车是1,570公里、24小时的驾驶；至少安排三天。',
    citiesLofotenNoCar:
      '搭威德罗航空直飞博德，再飞25分钟到斯沃尔维尔或莱克内斯。不坐飞机的话：坐火车经特隆赫姆到博德（诺尔兰铁路约10小时），再换渡轮或快船。',
    fjordsLofotenCar: '在卑尔根还车，经博德飞到斯沃尔维尔或莱克内斯，再在当地租车；或者飞到埃维内斯，沿 E10 开进去。',
    fjordsLofotenNoCar: '从卑尔根经博德飞到斯沃尔维尔或莱克内斯，含转机3到4小时。',
    boatLofoten: '北行的沿海航船19:15停靠斯塔姆松（Stamsund），21:20停靠斯沃尔维尔。在斯沃尔维尔下船住下。',
    lofotenNnCar:
      '沿 E10 向东经 Lofast 和 Tjeldsund 到 Bjerkvik，再沿 E6 向北翻越 Gratangsfjellet，接 E8 进入特罗姆瑟：从斯沃尔维尔出发约430公里，不停车需5.6到7小时。',
    lofotenNnCarWinter:
      '冬季：Gratangsfjellet 路段会有车队护送和封路，出发前查看 vegvesen.no 或拨打175；诺尔兰和特罗姆斯10月16日至4月30日允许使用钉胎。',
    lofotenNnCarOther: '算上停留，预留一整天。',
    lofotenNnNoCar:
      '威德罗航空每天有莱克内斯直飞特罗姆瑟的航班，16:20起飞、17:15到达（周六14:20起飞）；斯沃尔维尔只有周六直飞，其他日子经博德中转。也可以坐沿海航船连夜北上：斯沃尔维尔22:15开船，次日14:15到特罗姆瑟。',
    boatNn: '留在船上直到特罗姆瑟，或继续前往可去北角（North Cape）的霍宁斯沃格（Honningsvåg），以及航线终点希尔克内斯。',
    fjordsNn: '从卑尔根飞特罗姆瑟；威德罗航空和北欧航空（SAS）视日期经奥斯陆中转或直飞。沿海航船是慢一些的选择，把卑尔根到特罗姆瑟作为一段。',
    citiesNnCar: '从奥斯陆飞特罗姆瑟（TOS），在当地租车；开车北上要走1,700公里的 E6。',
    citiesNnNoCar: '从奥斯陆飞特罗姆瑟（TOS）。冬季的 Arctic Route 巴士和 Svipper 市内巴士，不开车也能到处走。',
    nnSvalbard: '从特罗姆瑟飞朗伊尔城；奥斯陆出发的航班大多经停特罗姆瑟，奥斯陆直飞需3小时。在朗伊尔城以外必须有持证向导。',
    lofotenSvalbard: '经特罗姆瑟或奥斯陆飞朗伊尔城。去斯瓦尔巴群岛只能坐飞机。',
    citiesSvalbard: '从奥斯陆直飞朗伊尔城，3小时。',
    fjordsSvalbard: '回卑尔根，再从奥斯陆直飞朗伊尔城，3小时。',
    boatSvalbard: '在特罗姆瑟下船，飞往朗伊尔城。',
    fallback: '在{from}和{to}之间坐飞机；火车和渡轮到不了的地方，威德罗航空的支线网络可以补上。',
  },
  reasons: {
    matches: '符合：{interests}',
    inSeason: '当季（{label}）',
    pick: '编辑推荐',
    rating: 'Google {rating}',
    ratingReviews: 'Google {rating}（{reviews}）',
    inRegion: '位于该地区',
    bookable: '可预订',
    join: ' · ',
  },
  event: {
    range: '{start}至{end}',
    projected: '（每年举办，日期参照上一届）',
    why: '{dates}{projected} · {location}',
  },
  stayNote: '{zone}的{budget}住宿不多，改为显示所有价位中评分最高的。',
  kit: {
    wool: '上下身都穿羊毛打底；200克/平方米的美利奴羊毛是挪威人的标准配置。千万别穿棉质：它会把汗贴在皮肤上，加快散热。',
    shell: '防风外壳、保暖中层、手套外再套连指手套，以及耐寒的靴子，加上防滑鞋钉应付特罗姆瑟结冰的人行道。',
    layers: '即使在7月也要带防风外套和保暖层。从韦斯特峡湾（Vestfjord）吹来的风能吹透普通毛衣，峡湾的天气一小时就会变。',
    aurora: '看极光的夜晚带上三脚架和备用电池；寒冷会让手机和相机很快没电。至少四晚，其中两晚可能是阴天。',
    hike: '防滑的鞋（9月起 Reinebringen 的台阶会结冰），按山区守则要求带地图和指南针，并定好天气变坏时的折返计划。',
    dnt: '走木屋连线的日子：需要 DNT 会员资格和 DNT 钥匙，因为自助木屋要用它开锁。',
    autopass: 'AutoPASS 电子标签或已登记的车牌：大多数渡轮会在您开车上船时自动识别，预付协议可让私家车渡轮费用减半。',
    svalbard: '在斯瓦尔巴群岛，向导携带步枪和装备；您要带的是保暖衣物、应对冰面反光的墨镜，以及提前几个月做好的预订。',
    where: '去哪里买：Norrøna 生产适合这种天气的外壳和保暖层，57hours 的罗弗敦自助徒步行程附有完整的装备清单。',
  },
  errors: {
    suggestFailed: '规划器暂时无法生成规划。',
    notConfigured: '此站点尚未配置逐日行程规划。',
    needJson: '请以 JSON 格式发送行程基本信息。',
    needDates: '逐日行程需要日期和至少一个目的地。',
    oneNight: '行程至少需要一晚。',
    maxNights: '逐日行程最多支持21晚的行程。',
    tooMany: '连续生成的行程有点多了。请过十分钟再试。',
    dailyLimit: '逐日行程规划今天已达到使用上限。上面的规划仍然可用；请明天再试。',
    writeFailed: '规划器暂时无法写出行程。上面的规划仍然可用；请过一分钟再试。',
    leftOut: '已略去，不在我们的收录中：{ref}',
    shareJson: '请以 JSON 格式发送规划。',
    shareTooMany: '连续生成的链接太多了。请过十分钟再试。',
    shareEmpty: '分享前请先选择目的地或收藏一些内容。',
    shareFailed: '暂时无法生成链接。请过一分钟再试。',
  },
  share: { title: '{zones}行程规划', zoneJoin: '和', norway: '挪威' },
};

// ─── Japanese ───

const ja: PlanText = {
  languageName: 'Japanese',
  dateLocale: 'ja-JP',
  guides: {
    northernLights: 'オーロラガイド',
    tromso: 'トロムソガイド',
    lofoten: 'ロフォーテン諸島ガイド',
    svalbard: 'スバールバル諸島ガイド',
    fjords: 'フィヨルドガイド',
    northernNorway: '北ノルウェーガイド',
    cities: 'ノルウェーの都市ガイド',
    lyngen: 'リンゲンガイド',
    transport: '交通情報',
    packing: '北極圏の持ち物ガイド',
    winterDriving: '冬の運転ガイド',
    mountainCode: '山の行動規範',
    ferries: 'ノルウェーのフェリーガイド',
    bergenToLofoten: 'ベルゲンからロフォーテンへのルート',
    tromsoToLofoten: 'トロムソからロフォーテンへのルート',
    bergenRailway: 'ベルゲン鉄道の旅行記',
    hurtigruten: 'フッティルーテン ベルゲン～トロムソ旅行記',
    whales: 'シェルヴォイのホエールサファリ旅行記',
    sledding: '犬ぞりとトナカイぞりのガイド',
    dnt: 'DNT山小屋ガイド',
    bestTime: 'ベストシーズン',
    cost: 'ノルウェーの旅費ガイド',
    norrona: 'Norrøna',
    hours57: '57hours ロフォーテンのセルフガイドハイキング',
  },
  light: {
    nnAurora:
      'オーロラシーズンは9月下旬から3月下旬まで。トロムソはオーロラ帯の真下にあります。2晩は曇るかもしれないので、最低4泊を計画してください。',
    nnPolarNight:
      'トロムソの極夜は11月27日から1月15日まで。太陽は地平線の下にとどまり、正午ごろに薄明かりがあるだけです。ツアーはヘッドランプを使い、15:00には暗くなります。',
    nnMidnightSun:
      'トロムソの白夜は5月20日から7月22日まで。24時間明るく、ハイキング、シーカヤック、ミッドナイトサン・マラソンが楽しめます。',
    lofotenAurora:
      'ロフォーテン諸島は北緯68度、オーロラ帯の下にあります。オーロラシーズンは9月から3月で、12月からが最も暗くなります。',
    lofotenMidnightSun:
      '5月28日から7月14日までは24時間明るい時期です。写真の最盛期で、混雑も最大です。宿は6～9か月前に予約してください。',
    lofotenSkrei:
      '1月から4月はスクレイ（タラ）の季節です。北極のタラが回遊し、漁船が毎日出漁し、2月からは干しダラの棚が立ち並びます。',
    svalbardPolarNight:
      'スバールバル諸島の極夜は10月下旬から2月中旬まで。北緯78度で4か月続く暗闇の期間です。犬ぞりとオーロラ観賞はこの間も行われます。',
    svalbardMidnightSun:
      '4月下旬から8月中旬までは太陽が24時間沈みません。6月から9月の夏の探検シーズンにはフィヨルドが開き、ガイド付きの氷河や野生動物のツアーに参加できます。',
    fjordsClosures:
      'ソグネフィエル（Sognefjellet）を越えるRv55は10月に閉鎖され、5月下旬まで再開しません。トロルスティーゲン（Trollstigen）も冬の間は閉鎖されます。レールダール（Lærdal）トンネル経由に切り替え、運転する日の朝にノルウェー道路局（Statens vegvesen）の情報を確認してください。',
    fjordsPeak:
      'フィヨルドの最盛期です。長距離航路や観光航路は事前に予約し、7月と8月はフェリーの待ち列を覚悟してください。通行料はAutoPASSで支払います。',
  },
  lightNoDates: '日程を入れると、実際に体験する光の条件（オーロラシーズン、極夜、白夜）に絞って表示します。',
  seasonLabels: {
    aurora: 'オーロラシーズン、9月下旬～3月下旬',
    midnightSun: '白夜、5月20日～7月22日',
    whales: 'シェルヴォイ沖のクジラシーズン、10月～1月31日',
    snow: '積雪期、11月～5月',
    reindeer: '雪上のトナカイぞり、11月～4月上旬',
    frozenGround: '地面が凍る時期、2月～5月',
    glacier: '氷河の上を歩ける時期、5月～9月',
    snowFreeTrails: '登山道に雪がない時期、6月～9月',
    iceFreeFjords: 'フィヨルドが凍らない時期、6月～8月',
    skrei: 'スクレイの季節、1月～4月',
    ski: 'スキーシーズン、2月～5月',
  },
  fit: {
    regions:
      '1回の旅で{n}地域を回ると、滞在する日より移動する日のほうが多くなります。14泊以上ない限り、1回の旅は2地域までというのが私たちのルールです。',
    short:
      '{regions}を{pace}のペースで{nights}泊で回るには、{short}泊足りません。地域を1つ減らすか、泊数を増やしてください。フェリーの時刻表は楽観的な計画に合わせてくれません。',
    ok: '{regions}を{pace}のペースで{nights}泊なら無理がありません（1地域あたり{per}泊）。',
    noDates: '到着日と出発日を入れると、ペースに無理がないかを確認できます。',
    regionCount: { one: '{n}地域', other: '{n}地域' },
  },
  method: {
    mobility: '車を使うかどうかを選んでください。どちらかでルートも費用も大きく変わります。',
    studs:
      'ノールラン、トロムス、フィンマルクでは10月16日から4月30日までスパイクタイヤが使えます（それより南は11月1日からイースター後の最初の日曜日まで）。レンタカーには冬用タイヤが付いています。運転する日の朝にノルウェー道路局（Statens vegvesen）の情報を確認してください。',
    tromsoBase:
      'トロムソを拠点にし、ホテル送迎付きのツアーを予約しましょう。空港バスで市内まで15～20分、冬はArctic Routeのバスがリンゲンやフィンランドまで走ります。',
    bodoFerry:
      'ボードー～モスケネスのフェリーは所要3～4時間で、予約できるのは定員の半分だけです。長さ6 mまでの車の予約料金は130ノルウェークローネ。5月から9月は事前に予約してください。',
    fjordQueues:
      '7月と8月のフィヨルドフェリーは行列になります。割引のためにAutoPASSのフェリー契約を結び、長距離の航路は予約しましょう。',
    coastal:
      '沿岸急行船はクルーズではなく、景色のよい交通手段と考えてください。ベルゲンからキルケネスまで全行程で34港、11泊です。区間だけ予約して、旅に合う港で降りましょう。',
    svalbardGuide:
      'スバールバル諸島では、ロングイェールビーンの外に出るには必ず公認ガイドが必要です。ホテルのベッド800床は数か月前に埋まります。',
  },
  home: '出発地',
  arrival: {
    cities:
      'オスロ（OSL）かベルゲン（BGO）に到着します。ベルゲン鉄道で両都市間は約7時間。Vyが夜行列車を含めて1日6～7本運行しています。',
    fjordsCar:
      'ベルゲン（BGO）に到着し、そこで車を受け取ります。ベルゲンからフロムまでは166 km。E16のトンネルとグドヴァンゲンのフェリーを含め、3.5時間を見込んでください。',
    fjordsNoCar:
      'ベルゲン（BGO）に到着します。車がなくても、ベルゲン鉄道、フロム鉄道、フィヨルドのフェリーで回れます。「ノルウェー・イン・ア・ナットシェル」のルートです。',
    boat: 'ベルゲン（BGO）に到着し、そこでフッティルーテンかハヴィラに乗船します。2社が交互に北のキルケネスへ出航し、全行程で34港、11泊。全部乗るより区間で乗りましょう。',
    lofotenCar:
      'エヴェネス（EVE）に飛び、E10を164 km走ればスヴォルヴェルに着きます。フェリーは不要です。またはヴィデロー航空でボードー経由でスヴォルヴェルかレクネスへ飛び、現地で車を借ります。',
    lofotenNoCar:
      'ヴィデロー航空でボードーへ直行し、そこから25分でスヴォルヴェルかレクネスへ。拠点を1つ決めて、あとは地元のバスとツアーに任せましょう。',
    nnWinterNoCar:
      'トロムソ（TOS）に飛びます。空港バスで市内まで15～20分。冬は車があってもあまり役立ちません。オーロラツアー、クジラの船、犬ぞりはどれもホテルまで迎えに来ます。',
    nn: '便数が最も多い北極圏の拠点トロムソ（TOS）へ飛ぶか、フィンマルクとサーミ文化の中心地へ向かうならアルタへ飛びます。',
    svalbard:
      'ロングイェールビーンへ飛びます。オスロから直行便で3時間、またはトロムソ経由。スバールバル諸島へは空路のみで、町の外では公認ガイドが必要です。',
  },
  legs: {
    citiesFjordsCar:
      'ベルゲンからE16を東へ。ベルゲンからフロムまで166 km、トンネルとグドヴァンゲンのフェリーを含めて3.5時間です。通行料とフェリー代はAutoPASSで支払います。',
    citiesFjordsNoCar:
      'ベルゲン鉄道でミュルダールへ、フロム鉄道でアウルランフィヨルドへ下り、フェリーでグドヴァンゲンへ。「ノルウェー・イン・ア・ナットシェル」のルートで、乗り継ぎがうまくいけば約8時間です。',
    citiesBoat:
      'ベルゲンで沿岸急行船に乗船します。フッティルーテンとハヴィラが交互に出航します。ベルゲン～トロムソを1区間として予約しましょう。',
    fjordsBoat: 'ベルゲンに戻って沿岸急行船に乗るか、ベルゲンの次の港オーレスンで乗船します。',
    citiesLofotenCar:
      'エヴェネスへ飛んでE10を164 km走りスヴォルヴェルへ。またはボードー経由でスヴォルヴェルかレクネスへ飛びます。全行程を車で走ると1,570 km、運転だけで24時間かかるので、最低3日は見込んでください。',
    citiesLofotenNoCar:
      'ヴィデロー航空でボードーへ直行し、そこから25分でスヴォルヴェルかレクネスへ。飛行機を使わないなら、トロンハイム経由の鉄道でボードーへ（ノールラン線で約10時間）、そこからフェリーか高速船です。',
    fjordsLofotenCar:
      'ベルゲンで車を返し、ボードー経由でスヴォルヴェルかレクネスへ飛んで現地で再び借ります。またはエヴェネスへ飛び、E10で入ります。',
    fjordsLofotenNoCar: 'ベルゲンからボードー経由でスヴォルヴェルかレクネスへ。乗り継ぎを含めて3～4時間です。',
    boatLofoten: '北行きの沿岸急行船は19:15にスタムスン、21:20にスヴォルヴェルに寄港します。スヴォルヴェルで降りて滞在しましょう。',
    lofotenNnCar:
      'E10を東へ、ロファスト（Lofast）とチェルスン（Tjeldsund）を経てビェルクヴィーク（Bjerkvik）へ。そこからE6を北上してグラタングスフィエレ（Gratangsfjellet）を越え、E8でトロムソへ入ります。スヴォルヴェルから約430 km、休憩なしで5.6～7時間です。',
    lofotenNnCarWinter:
      '冬はグラタングスフィエレで隊列走行や通行止めがあるため、出発前にvegvesen.noを確認するか175に電話してください。ノールランとトロムスでは10月16日から4月30日までスパイクタイヤが使えます。',
    lofotenNnCarOther: '休憩を入れて丸1日見込んでください。',
    lofotenNnNoCar:
      'ヴィデロー航空がレクネス～トロムソの直行便を毎日運航しています。16:20発17:15着（土曜は14:20発）。スヴォルヴェルからの直行便は土曜のみで、ほかの日はボードー経由です。または沿岸急行船で夜通し北上します。スヴォルヴェル22:15発、翌日14:15トロムソ着です。',
    boatNn: 'トロムソまで乗り続けるか、ノールカップに近いホニングスヴォーグ、終点のキルケネスまで乗ります。',
    fjordsNn:
      'ベルゲンからトロムソへ飛びます。ヴィデロー航空とSASが曜日によってオスロ経由か直行で結んでいます。時間をかけるなら沿岸急行船で、ベルゲン～トロムソを1区間として乗ります。',
    citiesNnCar: 'オスロからトロムソ（TOS）へ飛び、現地で車を借ります。車で北上するとE6を1,700 km走ることになります。',
    citiesNnNoCar: 'オスロからトロムソ（TOS）へ飛びます。冬のArctic RouteのバスとSvipperの市内バスで、車なしでも移動できます。',
    nnSvalbard:
      'トロムソからロングイェールビーンへ飛びます。オスロ発の便はほとんどがトロムソに寄り、オスロからの直行便は3時間です。ロングイェールビーンの外では公認ガイドが必要です。',
    lofotenSvalbard: 'トロムソかオスロ経由でロングイェールビーンへ。スバールバル諸島へは空路のみです。',
    citiesSvalbard: 'オスロからロングイェールビーンへ直行便で3時間。',
    fjordsSvalbard: 'ベルゲンに戻り、オスロからロングイェールビーンへ直行便で3時間。',
    boatSvalbard: 'トロムソで下船し、ロングイェールビーンへ飛びます。',
    fallback: '{from}と{to}の間は飛行機で移動します。鉄道やフェリーが届かない区間は、ヴィデロー航空の地域路線がカバーしています。',
  },
  reasons: {
    matches: '興味に合う：{interests}',
    inSeason: 'シーズン中（{label}）',
    pick: '編集部のおすすめ',
    rating: 'Google {rating}',
    ratingReviews: 'Google {rating}（{reviews}件）',
    inRegion: 'この地域にあります',
    bookable: '予約可',
    join: ' · ',
  },
  event: {
    range: '{start}～{end}',
    projected: '（毎年開催、日付は前回のもの）',
    why: '{dates}{projected} · {location}',
  },
  stayNote: '{zone}には{budget}の宿が少ないため、価格を問わず評価の高い宿を表示しています。',
  kit: {
    wool: '上下ともウールのベースレイヤーを。200 g/m²のメリノがノルウェーの定番です。綿は絶対に避けてください。汗が肌に張り付き、体温を奪います。',
    shell:
      '防風シェル、保温性のあるミドルレイヤー、手袋の上にミトン、耐寒ブーツ。トロムソの凍った歩道には靴用の滑り止めを付けてください。',
    layers:
      '7月でもウインドブレーカーと防寒着を。ヴェストフィヨルドからの風は普通のセーターを突き抜け、フィヨルドの天気は1時間で変わります。',
    aurora:
      'オーロラの夜には三脚と予備バッテリーを。寒さでスマートフォンやカメラの電池はすぐに切れます。最低4泊、うち2晩は曇るかもしれません。',
    hike: 'グリップの効く靴（レイネブリンゲンの石段は9月から凍ります）、山の行動規範が求める地図とコンパス、そして天気が崩れたら引き返す計画を。',
    dnt: '山小屋をつなぐ日は、DNTの会員資格とDNTの鍵が必要です。セルフサービスの山小屋はこの鍵で施錠されています。',
    autopass:
      'AutoPASSのタグか登録済みのナンバープレートを。ほとんどのフェリーは乗船時に読み取り、前払い契約で自家用車のフェリー代が50%引きになります。',
    svalbard:
      'スバールバル諸島では、ガイドがライフルと装備を持ちます。あなたが用意するのは防寒着、氷の照り返し用のサングラス、そして数か月前に済ませた予約です。',
    where:
      '入手先：Norrønaはこの天候に合うシェルと保温着を作っています。57hoursのロフォーテン・セルフガイドハイキングには装備リスト一式が付いています。',
  },
  errors: {
    suggestFailed: 'プランナーは現在プランを作成できません。',
    notConfigured: 'この環境では日ごとのプラン作成が設定されていません。',
    needJson: '旅行の基本情報をJSONで送信してください。',
    needDates: '日ごとのプランには日程と行き先が1つ以上必要です。',
    oneNight: '旅程には1泊以上が必要です。',
    maxNights: '日ごとのプランは21泊までの旅に対応しています。',
    tooMany: '続けてプランを作成しすぎています。10分ほどおいて、もう一度お試しください。',
    dailyLimit: '日ごとのプラン作成は本日の上限に達しました。上のプランはそのまま使えます。明日またお試しください。',
    writeFailed: 'プランナーは現在プランを作成できませんでした。上のプランはそのまま使えます。1分ほどしてからお試しください。',
    leftOut: '掲載情報にないため省きました：{ref}',
    shareJson: 'プランをJSONで送信してください。',
    shareTooMany: '続けてリンクを作成しすぎています。10分ほどおいてください。',
    shareEmpty: '共有する前に、行き先を選ぶか何かを保存してください。',
    shareFailed: 'リンクを作成できませんでした。1分ほどしてからお試しください。',
  },
  share: { title: '{zones}の旅行プラン', zoneJoin: 'と', norway: 'ノルウェー' },
};

export const PLAN_TEXT: Record<Locale, PlanText> = { en, zh, ja };
