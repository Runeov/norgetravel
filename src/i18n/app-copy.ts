import { asLocale, type Locale } from '@/lib/i18n-seo';
import type { AppTab, ListingKind } from '@/lib/app/model';
import { CALENDAR_WINDOWS, type CalendarWindow } from '@/lib/event-calendar';
import type { AppTheme } from '@/components/modules/app/theme';
import { GUIDE_SECTIONS, type GuideSectionId } from '@/lib/guide-sections';
import type { PlanZoneId } from '@/lib/planner-data';
import type { TripItemCategory } from '@/types/trip';
import { ENGLISH_BODY_NOTICE } from '@/lib/article-locales';
import type { Destination } from '@/lib/schemas/travel.shared';
import { mapZones } from '@/data/norway-map-zones';
import { LISTING_LABELS, type ListingLabels } from './listing-labels';
import { PLAN_UI } from './plan-ui';
import { CALENDAR_COPY, EVENT_UI, eventRegionNames } from './events-copy';
import { HOME_COPY } from './home-copy';
import type { Plural } from './format';

/**
 * Interface text of the /app section in English, Chinese and Japanese.
 *
 * Listing data (names, descriptions, venues) has no translations and stays in
 * English. English labels that already exist elsewhere (schema label tables,
 * calendar tabs, planner zones, guide sections) are read from there, so they
 * have one owner. Event types, region names and the English-body notice reuse
 * the site's own Chinese and Japanese copy.
 *
 * Templates name their values in braces; see ./format.ts. Chinese templates
 * put a space around Latin data such as names and towns.
 */

// ─── Client text ───
// The part client components read through AppCopyProvider. Plain strings only.

export interface AppClientCopy {
  nav: {
    label: string;
    brand: string;
    home: string;
    feed: string;
    explore: string;
    plan: string;
    saved: string;
    guides: string;
    calendar: string;
    planTrip: string;
    theme: string;
    /** Screen-reader text for the saved count: {n} */
    savedCount: string;
  };
  theme: Record<AppTheme, string>;
  banner: { tabs: Record<AppTab, { title: string; body: string }>; cta: string; close: string };
  save: { add: string; remove: string; pillAdd: string; pillIn: string };
  saved: {
    categories: Partial<Record<TripItemCategory, string>>;
    /** {link} is emptyInlineLink */
    emptyInline: string;
    emptyInlineLink: string;
    emptyTitle: string;
    emptyBody: string;
    browse: string;
    seeAll: string;
  };
  share: { label: string; copied: string; prompt: string };
  planZones: { counts: string; add: string; inPlan: string; browse: string };
  soon: { heading: string; seeAll: string; rail: string; show: string };
  expand: { more: string; less: string };
  dates: {
    /** Intl locale for dates */
    intl: string;
    /** Joins two short dates: "18 Jan – 24 Jan" */
    rangeJoin: string;
    /** Joins two long dates: "Monday 18 January 2027 to …" */
    longJoin: string;
  };
}

// ─── Server text ───

export interface TabCopy {
  label: string;
  /** The plural noun in running text: "events", "活动". */
  noun: string;
  count: Plural;
  search: string;
}

export interface AppCopy extends AppClientCopy {
  locale: Locale;
  meta: {
    feed: Record<AppTab, string>;
    feedDescription: string;
    explore: string;
    exploreDescription: string;
    saved: string;
    savedDescription: string;
    plan: string;
    planDescription: string;
    guides: string;
    guidesDescription: string;
    /** Detail page title: {name}, {place} */
    listing: string;
  };
  tabs: Record<AppTab, TabCopy>;
  common: {
    all: string;
    close: string;
    clearFilters: string;
    listingType: string;
    /** {noun} */
    showMore: string;
    noMatch: string;
    allOf: string;
    /** Appended to a result count: {q}, {town} */
    matching: string;
    inTown: string;
    newTab: string;
  };
  feed: {
    srTitle: string;
    searchPhone: string;
    removeFilter: string;
    filters: string;
    results: string;
    brand: string;
    strap: string;
  };
  filters: {
    whatsOn: string;
    categories: string;
    region: string;
    allNorway: string;
    price: string;
    town: string;
    removeTown: string;
    allFilters: string;
    on: string;
  };
  calendar: {
    /** Window tab, heading, intro, and the empty text ({name}, {date} are the next event). */
    windows: Record<CalendarWindow, { tab: string; heading: string; intro: string; empty: string }>;
    description: string;
    count: Plural;
    windowsNav: string;
    regionsNav: string;
    onNow: string;
    seeNext: string;
    planTitle: string;
    planBody: string;
    planCta: string;
    staysCta: string;
  };
  /** Listing enum names (shared with the planner) and the app's names for one listing of a kind. */
  labels: ListingLabels & { kinds: Record<ListingKind, string> };
  regions: Record<Destination | 'cities', string>;
  zoneText: Record<PlanZoneId, { name: string; tagline: string }>;
  status: { today: string; tomorrow: string; inDays: string; onNowUntil: string };
  cards: { featured: string; organiser: string };
  explore: {
    heading: string;
    category: string;
    map: string;
    svalbard: string;
    towns: string;
    pin: string;
    pinNearby: Plural;
    placed: string;
    unplaced: string;
    pick: string;
    pickBody: string;
    andNearby: string;
    seeAllFeed: string;
    openFeed: string;
    selected: string;
  };
  detail: {
    back: string;
    saveTitle: string;
    saveBody: Record<ListingKind, string>;
    sections: {
      goodToKnow: string;
      gettingThere: string;
      tickets: string;
      links: string;
      tags: string;
      inShort: string;
      faq: string;
      similar: string;
      more: string;
    };
    nearestTown: string;
    open: string;
    facts: {
      when: string;
      where: string;
      entry: string;
      entryUnknown: string;
      dates: string;
      repeats: string;
      capacity: string;
      duration: string;
      durationUnknown: string;
      price: string;
      difficulty: string;
      season: string;
      minAge: string;
      groupSize: string;
      type: string;
      stars: string;
      checkIn: string;
      checkOut: string;
      cuisine: string;
      openingHours: string;
      booking: string;
      reservationRequired: string;
      michelin: string;
      michelinStars: string;
      dietary: string;
    };
    lists: { included: string; amenities: string; knownFor: string };
    tags: { recurring: string; eco: string };
    provider: Record<'organiser' | 'operator', { heading: string; role: string }>;
    links: { tickets: string; organiserSite: string; operatorSite: string; website: string };
    /** The *NoRegion forms are for listings marked "all of Norway", where no region fits the sentence. */
    inShort: {
      event: string;
      eventNoRegion: string;
      eventFree: string;
      tour: string;
      tourNoRegion: string;
      tourDuration: string;
      tourSeason: string;
      stay: string;
      stayNoRegion: string;
      eat: string;
    };
    faq: {
      when: string;
      whenA: string;
      whereEvent: string;
      whereEventA: string;
      cost: string;
      costFree: string;
      costBand: string;
      tourWhen: string;
      tourWhenA: string;
      tourStart: string;
      tourStartA: string;
      where: string;
      whereA: string;
    };
    more: {
      calendar: string;
      categoryEvents: string;
      regionEvents: string;
      freeEvents: string;
      categoryTours: string;
      regionTours: string;
      allTours: string;
      townStays: string;
      townEat: string;
      allPlaces: string;
      plan: string;
    };
  };
  guides: {
    eyebrow: string;
    heading: string;
    intro: string;
    search: string;
    sectionsNav: string;
    all: string;
    regionsNav: string;
    noun: string;
    count: Plural;
    showAll: string;
    readTime: string;
    back: string;
    sections: Record<GuideSectionId, string>;
    planThis: string;
    plannerBody: string;
    and: string;
    openPlanner: string;
    planRegion: string;
    planRegionBody: string;
    moreSection: string;
    /** Shown above a body that is still in English. */
    englishBody?: string;
  };
  plan: {
    eyebrow: string;
    heading: string;
    intro: string;
    savedTitle: string;
    whereTo: string;
    whereToBody: string;
  };
  savedPage: { intro: string; openPlanner: string };
}

// ─── Shared pieces ───

/** Planner zones: names from the planner's own copy, taglines from here. */
const zoneText = (locale: Locale, taglines: Record<PlanZoneId, string>): AppCopy['zoneText'] =>
  Object.fromEntries(
    (Object.keys(taglines) as PlanZoneId[]).map((id) => [id, { name: PLAN_UI[locale].zones[id], tagline: taglines[id] }])
  ) as AppCopy['zoneText'];

const regionsFor = (locale: Locale): Record<Destination | 'cities', string> => ({
  ...eventRegionNames(locale),
  cities: HOME_COPY[locale].destinations.items.cities.name,
});

// ─── English ───

const en: AppCopy = {
  locale: 'en',
  nav: {
    label: 'App',
    brand: 'Norway',
    home: 'NorgeTravel app home',
    feed: 'Feed',
    explore: 'Explore',
    plan: 'Plan',
    saved: 'Saved',
    guides: 'Guides',
    calendar: 'Calendar',
    planTrip: 'Plan a trip',
    theme: 'Theme',
    savedCount: '{n} saved',
  },
  theme: { fjord: 'Fjord theme', light: 'Light theme', dark: 'Dark theme' },
  banner: {
    tabs: {
      events: { title: 'Build a trip around a date', body: 'Save events here, then plan the days around them.' },
      tours: { title: 'Save tours for your trip', body: 'Saved tours show up in the trip planner.' },
      places: { title: 'Keep a shortlist', body: 'Saved places show up in the trip planner.' },
    },
    cta: 'Planner',
    close: 'Close',
  },
  save: {
    add: 'Save {name} to your trip',
    remove: 'Remove {name} from your trip',
    pillAdd: 'Add to trip',
    pillIn: 'In your trip',
  },
  saved: {
    categories: {
      events: 'Event',
      experiences: 'Tour',
      tours: 'Tour',
      accommodation: 'Stay',
      restaurants: 'Eat',
      transport: 'Transport',
      cities: 'City',
      guides: 'Guide',
    },
    emptyInline: 'Nothing saved yet. Tap the bookmark on an event, tour or place, or {link}.',
    emptyInlineLink: 'browse the feed',
    emptyTitle: 'Nothing saved yet',
    emptyBody: 'Tap the bookmark on an event, tour or place to keep it here.',
    browse: 'Browse the feed',
    seeAll: 'See all {n} saved',
  },
  share: { label: 'Share {title}', copied: 'Link copied', prompt: 'Copy this link' },
  planZones: {
    counts: '{experiences} activities · {stays} stays · {events} events · {articles} guides',
    add: 'Add to plan',
    inPlan: 'In your plan',
    browse: 'Browse',
  },
  soon: { heading: 'Happening soon', seeAll: 'See all', rail: 'Events starting soon', show: 'Show {name}' },
  expand: { more: 'View more', less: 'View less' },
  dates: { intl: 'en-GB', rangeJoin: ' – ', longJoin: ' to ' },

  meta: {
    feed: {
      events: "What's on in Norway: events and festivals",
      tours: 'Tours and activities in Norway',
      places: 'Places to stay and eat in Norway',
    },
    feedDescription: 'Events, tours, places to stay and places to eat across Norway, from the NorgeTravel listings.',
    explore: 'Explore Norway on the map',
    exploreDescription: 'Events, tours and places from the NorgeTravel listings, pinned by town on a map of Norway.',
    saved: 'Saved for your trip',
    savedDescription: 'Events, tours and places you saved on NorgeTravel.',
    plan: 'Plan your Norway trip',
    planDescription:
      'Set your dates and interests, save events, tours and places, and the planner builds the route, the light and the days.',
    guides: 'Norway travel guides',
    guidesDescription: 'Safety guides, trip reports and planning guides for Norway from the NorgeTravel editors.',
    listing: '{name}, {place}',
  },
  tabs: {
    events: { label: 'Events', noun: 'events', count: { one: '1 event', other: '{n} events' }, search: 'Search events, venues…' },
    tours: { label: 'Tours', noun: 'tours', count: { one: '1 tour', other: '{n} tours' }, search: 'Search tours…' },
    places: { label: 'Places', noun: 'places', count: { one: '1 place', other: '{n} places' }, search: 'Search places…' },
  },
  common: {
    all: 'All',
    close: 'Close',
    clearFilters: 'Clear all filters',
    listingType: 'Listing type',
    showMore: 'Show more {noun}',
    noMatch: 'No {noun} match these filters.',
    allOf: 'All {noun}',
    matching: ' matching “{q}”',
    inTown: ' in {town}',
    newTab: EVENT_UI.en.newTab,
  },
  feed: {
    srTitle: 'NorgeTravel app: {tab}',
    searchPhone: 'What are you looking for in Norway?',
    removeFilter: 'Remove a filter or search for something else.',
    filters: 'Filters',
    results: 'Results',
    brand: 'NORWAY',
    strap: 'EVENTS · TOURS · PLACES',
  },
  filters: {
    whatsOn: "What's on in Norway",
    categories: 'Categories',
    region: 'Region',
    allNorway: 'All of Norway',
    price: 'Price',
    town: 'Town',
    removeTown: 'Remove town filter',
    allFilters: 'All filters',
    on: 'On',
  },
  calendar: {
    windows: Object.fromEntries(
      CALENDAR_WINDOWS.map((w) => {
        const { tab, heading, intro, empty } = CALENDAR_COPY[w];
        return [w, { tab, heading, intro, empty }];
      })
    ) as AppCopy['calendar']['windows'],
    description: CALENDAR_COPY.upcoming.description,
    count: { one: '1 event listed', other: '{n} events listed' },
    windowsNav: 'Event dates',
    regionsNav: 'Regions',
    onNow: EVENT_UI.en.onNow,
    seeNext: 'See the event',
    planTitle: 'Plan the trip around the date',
    planBody: 'Add an event to your trip, then use the planner to work out transport, beds and the days around it.',
    planCta: 'Open the trip planner',
    staysCta: 'Find a place to stay',
  },
  labels: { ...LISTING_LABELS.en, kinds: { events: 'Event', tours: 'Tour', stays: 'Stay', eat: 'Eat' } },
  regions: regionsFor('en'),
  zoneText: zoneText('en', Object.fromEntries(mapZones.map((z) => [z.id, z.tagline])) as Record<PlanZoneId, string>),
  status: { today: 'Today', tomorrow: 'Tomorrow', inDays: 'In {n} days', onNowUntil: 'On now, {until}' },
  cards: { featured: 'Featured', organiser: 'Organiser' },
  explore: {
    heading: 'Explore Norway on the map',
    category: 'Category',
    map: 'Outline map of Norway with Svalbard',
    svalbard: 'Svalbard',
    towns: 'Towns with {noun}',
    pin: '{name}: {count}',
    pinNearby: { one: '{name} and 1 nearby town: {count}', other: '{name} and {n} nearby towns: {count}' },
    placed: '{placed} of {total} placed by town.',
    unplaced: ' The rest name no town we can map.',
    pick: 'Pick a pin',
    pickBody: 'Each pin is a town. Its number is how many {noun} NorgeTravel lists there.',
    andNearby: ' and nearby',
    seeAllFeed: 'See all {n} in the feed',
    openFeed: 'Open in the feed',
    selected: 'Selected town',
  },
  detail: {
    back: 'Back to the feed',
    saveTitle: 'Save it to your trip',
    saveBody: {
      events: 'Saved events show up in the trip planner.',
      tours: 'Saved tours show up in the trip planner.',
      stays: 'Saved places to stay show up in the trip planner.',
      eat: 'Saved places to eat show up in the trip planner.',
    },
    sections: {
      goodToKnow: 'Good to know',
      gettingThere: 'Getting there',
      tickets: 'Tickets and info',
      links: 'Links',
      tags: 'Categories and tags',
      inShort: 'In short',
      faq: 'FAQ',
      similar: 'Similar listings',
      more: 'More things to do in Norway',
    },
    nearestTown: 'Nearest town: {town}',
    open: 'Open',
    facts: {
      when: 'When',
      where: 'Where',
      entry: 'Entry',
      entryUnknown: 'See the organiser',
      dates: 'Dates',
      repeats: 'Repeats',
      capacity: 'Capacity',
      duration: 'Duration',
      durationUnknown: 'Ask the operator',
      price: 'Price',
      difficulty: 'Difficulty',
      season: 'Season',
      minAge: 'Minimum age',
      groupSize: 'Group size',
      type: 'Type',
      stars: '{n}-star',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      cuisine: 'Cuisine',
      openingHours: 'Opening hours',
      booking: 'Booking',
      reservationRequired: 'Reservation required',
      michelin: 'Michelin',
      michelinStars: '{n} star',
      dietary: 'Dietary',
    },
    lists: { included: 'Included', amenities: 'Amenities', knownFor: 'Known for' },
    tags: { recurring: 'Recurring', eco: 'Eco-friendly' },
    provider: {
      organiser: { heading: 'Organiser', role: 'Event organiser' },
      operator: { heading: 'Operator', role: 'Tour operator' },
    },
    links: {
      tickets: EVENT_UI.en.tickets,
      organiserSite: 'Organiser website',
      operatorSite: 'Operator website',
      website: 'Website',
    },
    inShort: {
      event: '{name} is listed under {category}. It takes place at {where} in {region} and runs {when}.',
      eventNoRegion: '{name} is listed under {category}. It takes place at {where} and runs {when}.',
      eventFree: ' Entry is free.',
      tour: '{name} is run by {operator} and listed under {category}. It starts from {start} in {region}.',
      tourNoRegion: '{name} is run by {operator} and listed under {category}. It starts from {start}.',
      tourDuration: ' It takes {duration}.',
      tourSeason: ' Season: {season}.',
      stay: '{name} is a place to stay in {where}, {region}, listed under {category}.',
      stayNoRegion: '{name} is a place to stay in {where}, listed under {category}.',
      eat: '{name} is a place to eat in {where}, listed under {category}. The address is {address}.',
    },
    faq: {
      when: 'When is {name} on?',
      whenA: 'It runs {when}.',
      whereEvent: 'Where is {name}?',
      whereEventA: 'It takes place at {where}.',
      cost: 'How much does {name} cost?',
      costFree: 'Entry to {name} is free.',
      costBand: 'NorgeTravel lists {name} in the {band} price band.',
      tourWhen: 'When does {name} run?',
      tourWhenA: '{season}.',
      tourStart: 'Where does {name} start?',
      tourStartA: 'It starts from {start}.',
      where: 'Where is {name}?',
      whereA: 'The address is {address}.',
    },
    more: {
      calendar: 'Full events calendar',
      categoryEvents: '{category} events',
      regionEvents: 'Events in {region}',
      freeEvents: 'Free events',
      categoryTours: 'More {category} tours',
      regionTours: 'Tours in {region}',
      allTours: 'All tours',
      townStays: 'More places to stay in {place}',
      townEat: 'More places to eat in {place}',
      allPlaces: 'All places to stay and eat',
      plan: 'Plan the trip',
    },
  },
  guides: {
    eyebrow: 'Guides',
    heading: 'Read before you go',
    intro:
      'Mountain safety, trip reports from the fjords to Svalbard, and planning guides for cabins, ferries, costs and the aurora.',
    search: 'Search guides…',
    sectionsNav: 'Guide sections',
    all: 'All guides',
    regionsNav: 'Regions',
    noun: 'guides',
    count: { one: '1 guide', other: '{n} guides' },
    showAll: 'Show all guides',
    readTime: '{n} min read',
    back: 'All guides',
    sections: Object.fromEntries(GUIDE_SECTIONS.map((s) => [s.id, s.title])) as Record<GuideSectionId, string>,
    planThis: 'Plan this trip',
    plannerBody:
      'Open the planner with {regions} already set. Add dates and it lays out the light, the season and the route between stops.',
    and: ' and ',
    openPlanner: 'Open the planner',
    planRegion: 'Plan a {region} trip',
    planRegionBody: 'Set your dates in the planner, save events, tours and places, and it works out the route and the days.',
    moreSection: 'More {section}',
  },
  plan: {
    eyebrow: 'Trip planner',
    heading: 'Plan your Norway trip',
    intro:
      'Set your dates and what you came for. Save events, tours and places from the feed, and the plan below works out the light, the route and the days.',
    savedTitle: 'What you saved',
    whereTo: 'Where to?',
    whereToBody: 'Add destinations to the plan, or browse one to save what you want to do there.',
  },
  savedPage: {
    intro: 'Your saved list is kept on this device and shared with the trip planner.',
    openPlanner: 'Open the trip planner',
  },
};

// ─── Chinese (Simplified) ───

const zh: AppCopy = {
  locale: 'zh',
  nav: {
    label: '应用导航',
    brand: '挪威',
    home: 'NorgeTravel 应用首页',
    feed: '首页',
    explore: '探索',
    plan: '规划',
    saved: '收藏',
    guides: '攻略',
    calendar: '日历',
    planTrip: '规划行程',
    theme: '主题',
    savedCount: '已收藏 {n} 项',
  },
  theme: { fjord: '峡湾主题', light: '浅色主题', dark: '深色主题' },
  banner: {
    tabs: {
      events: { title: '围绕日期安排行程', body: '先在这里收藏活动，再围绕它们安排其余几天。' },
      tours: { title: '为行程收藏体验项目', body: '收藏的体验会出现在行程规划器里。' },
      places: { title: '列一份候选清单', body: '收藏的住宿和餐厅会出现在行程规划器里。' },
    },
    cta: '规划器',
    close: '关闭',
  },
  save: {
    add: '将 {name} 收藏到行程',
    remove: '从行程中移除 {name}',
    pillAdd: '加入行程',
    pillIn: '已加入行程',
  },
  saved: {
    categories: {
      events: '活动',
      experiences: '体验',
      tours: '体验',
      accommodation: '住宿',
      restaurants: '餐饮',
      transport: '交通',
      cities: '城市',
      guides: '攻略',
    },
    emptyInline: '还没有收藏。点一下活动、体验或地点上的书签，或者{link}。',
    emptyInlineLink: '去首页看看',
    emptyTitle: '还没有收藏',
    emptyBody: '点一下活动、体验或地点上的书签，就能保存在这里。',
    browse: '去首页看看',
    seeAll: '查看全部 {n} 项收藏',
  },
  share: { label: '分享 {title}', copied: '链接已复制', prompt: '复制此链接' },
  planZones: {
    counts: '{experiences} 项体验 · {stays} 处住宿 · {events} 个活动 · {articles} 篇攻略',
    add: '加入规划',
    inPlan: '已在规划中',
    browse: '浏览',
  },
  soon: { heading: '即将开始', seeAll: '查看全部', rail: '即将开始的活动', show: '显示 {name}' },
  expand: { more: '展开全文', less: '收起' },
  dates: { intl: 'zh-CN', rangeJoin: '至', longJoin: '至' },

  meta: {
    feed: {
      events: '挪威近期活动：节庆与演出',
      tours: '挪威体验与户外活动',
      places: '挪威住宿与餐饮',
    },
    feedDescription: '挪威各地的活动、体验、住宿和餐饮，来自 NorgeTravel 的收录。',
    explore: '在地图上探索挪威',
    exploreDescription: 'NorgeTravel 收录的活动、体验和地点，按城镇标在挪威地图上。',
    saved: '为行程收藏的内容',
    savedDescription: '您在 NorgeTravel 收藏的活动、体验和地点。',
    plan: '规划您的挪威行程',
    planDescription: '填好日期和兴趣，收藏活动、体验和地点，规划器会排出路线、光照情况和每天的安排。',
    guides: '挪威旅游攻略',
    guidesDescription: 'NorgeTravel 编辑撰写的挪威安全指南、旅行实录和行程规划攻略。',
    listing: '{name}，{place}',
  },
  tabs: {
    events: { label: '活动', noun: '活动', count: { one: '{n} 个活动', other: '{n} 个活动' }, search: '搜索活动、场地…' },
    tours: { label: '体验', noun: '体验', count: { one: '{n} 项体验', other: '{n} 项体验' }, search: '搜索体验…' },
    places: { label: '住宿美食', noun: '地点', count: { one: '{n} 个地点', other: '{n} 个地点' }, search: '搜索住宿和餐厅…' },
  },
  common: {
    all: '全部',
    close: '关闭',
    clearFilters: '清除全部筛选',
    listingType: '内容类型',
    showMore: '显示更多{noun}',
    noMatch: '没有符合这些筛选条件的{noun}。',
    allOf: '全部{noun}',
    matching: '，关键词“{q}”',
    inTown: '，位于 {town}',
    newTab: EVENT_UI.zh.newTab,
  },
  feed: {
    srTitle: 'NorgeTravel 应用：{tab}',
    searchPhone: '想在挪威找些什么？',
    removeFilter: '去掉一个筛选条件，或换个关键词搜索。',
    filters: '筛选',
    results: '结果',
    brand: '挪威',
    strap: '活动 · 体验 · 住宿美食',
  },
  filters: {
    whatsOn: '挪威近期活动',
    categories: '分类',
    region: '地区',
    allNorway: '挪威全境',
    price: '价格',
    town: '城镇',
    removeTown: '移除城镇筛选',
    allFilters: '全部筛选',
    on: '已启用',
  },
  calendar: {
    windows: {
      upcoming: {
        tab: '全部近期活动',
        heading: '挪威的节庆与活动',
        intro: '日期固定的节庆、赛事和捕鱼季，按日期排列。大型活动期间小镇一床难求，先订住处，再买门票。',
        empty: '目前还没有收录活动。下一季的日期公布后再来看看。',
      },
      'next-90-days': {
        tab: '未来 90 天',
        heading: '未来 90 天的挪威活动',
        intro: '从今天起三个月内开始的活动。城市节庆临时安排也来得及；北极地区的活动，机票和房间往往比门票先售罄。',
        empty: '未来 90 天内没有活动开始。下一个收录的活动是 {name}，{date}。',
      },
      winter: {
        tab: '冬季',
        heading: '挪威冬季活动',
        intro: '10月至4月中旬：极夜、极光季和鳕鱼（skrei）捕捞季。在北极圈以北，要做好路面积雪、白天只有几个小时的准备。',
        empty: '冬季日历上暂时没有活动。下一个收录的活动是 {name}，{date}。',
      },
      summer: {
        tab: '夏季',
        heading: '挪威夏季活动',
        intro: '4月中旬至9月：午夜太阳赛跑、音乐节和丰收市集。海岛音乐节提前几个月就会售罄，去那里的渡轮按固定时刻表运行。',
        empty: '夏季日历上暂时没有活动。下一个收录的活动是 {name}，{date}。',
      },
      free: {
        tab: '免费入场',
        heading: '挪威免费活动',
        intro: '不需要门票的活动。免费入场不等于免费旅行：那一周小镇很热闹，交通、餐饮和住宿照样要花钱。',
        empty: '目前没有收录免费活动。下一个收录的活动是 {name}，{date}。',
      },
    },
    description: '挪威的节庆和活动按日期排列，附地区、价格和票务链接。',
    count: { one: '已收录 {n} 个活动', other: '已收录 {n} 个活动' },
    windowsNav: '活动日期',
    regionsNav: '地区',
    onNow: EVENT_UI.zh.onNow,
    seeNext: '查看这个活动',
    planTitle: '围绕日期规划行程',
    planBody: '把活动加入行程，再用规划器安排交通、住宿和前后几天。',
    planCta: '打开行程规划器',
    staysCta: '找住处',
  },
  labels: { ...LISTING_LABELS.zh, kinds: { events: '活动', tours: '体验', stays: '住宿', eat: '餐饮' } },
  regions: regionsFor('zh'),
  zoneText: zoneText('zh', {
    'northern-norway': '世界极光之都',
    lofoten: '山峰从海中直接拔起',
    fjords: '两处世界遗产，2026年起实行零排放',
    svalbard: '北纬78°的远北极地',
    'boat-routes': '卑尔根至希尔克内斯：34个港口，11晚',
    cities: '城市文化与海岸气质',
  }),
  status: { today: '今天', tomorrow: '明天', inDays: '{n} 天后', onNowUntil: '正在进行，{until}' },
  cards: { featured: '精选', organiser: '主办方' },
  explore: {
    heading: '在地图上探索挪威',
    category: '分类',
    map: '挪威及斯瓦尔巴群岛轮廓图',
    svalbard: '斯瓦尔巴',
    towns: '有{noun}的城镇',
    pin: '{name}：{count}',
    pinNearby: { one: '{name} 及附近 {n} 个城镇：{count}', other: '{name} 及附近 {n} 个城镇：{count}' },
    placed: '{total}中有 {placed} 个已按城镇标注。',
    unplaced: '其余的没有可标注的城镇。',
    pick: '选一个标记',
    pickBody: '每个标记代表一个城镇，数字是 NorgeTravel 在当地收录的{noun}数量。',
    andNearby: '及周边',
    seeAllFeed: '在首页查看全部 {n} 个',
    openFeed: '在首页打开',
    selected: '所选城镇',
  },
  detail: {
    back: '返回首页',
    saveTitle: '收藏到行程',
    saveBody: {
      events: '收藏的活动会出现在行程规划器里。',
      tours: '收藏的体验会出现在行程规划器里。',
      stays: '收藏的住宿会出现在行程规划器里。',
      eat: '收藏的餐厅会出现在行程规划器里。',
    },
    sections: {
      goodToKnow: '实用信息',
      gettingThere: '如何前往',
      tickets: '门票与信息',
      links: '链接',
      tags: '分类与标签',
      inShort: '简介',
      faq: '常见问题',
      similar: '相似推荐',
      more: '在挪威还能做什么',
    },
    nearestTown: '最近的城镇：{town}',
    open: '打开',
    facts: {
      when: '时间',
      where: '地点',
      entry: '入场',
      entryUnknown: '请咨询主办方',
      dates: '日期',
      repeats: '举办频率',
      capacity: '容纳人数',
      duration: '时长',
      durationUnknown: '请咨询运营方',
      price: '价格',
      difficulty: '难度',
      season: '季节',
      minAge: '最低年龄',
      groupSize: '团队人数',
      type: '类型',
      stars: '{n} 星级',
      checkIn: '入住',
      checkOut: '退房',
      cuisine: '菜系',
      openingHours: '营业时间',
      booking: '预订',
      reservationRequired: '需要预订',
      michelin: '米其林',
      michelinStars: '{n} 星',
      dietary: '饮食选择',
    },
    lists: { included: '费用包含', amenities: '设施', knownFor: '招牌菜' },
    tags: { recurring: '定期举办', eco: '环保' },
    provider: {
      organiser: { heading: '主办方', role: '活动主办方' },
      operator: { heading: '运营方', role: '旅游运营商' },
    },
    links: {
      tickets: EVENT_UI.zh.tickets,
      organiserSite: '主办方网站',
      operatorSite: '运营方网站',
      website: '网站',
    },
    inShort: {
      event: '{name} 属于{category}类活动，在{region}的 {where} 举行，时间为{when}。',
      eventNoRegion: '{name} 属于{category}类活动，在 {where} 举行，时间为{when}。',
      eventFree: '免费入场。',
      tour: '{name} 由 {operator} 运营，属于{category}类体验，从{region}的 {start} 出发。',
      tourNoRegion: '{name} 由 {operator} 运营，属于{category}类体验，从 {start} 出发。',
      tourDuration: '时长：{duration}。',
      tourSeason: '季节：{season}。',
      stay: '{name} 是位于{region} {where} 的住宿，类型为{category}。',
      stayNoRegion: '{name} 是位于 {where} 的住宿，类型为{category}。',
      eat: '{name} 是位于 {where} 的餐饮场所，菜系为{category}。地址：{address}。',
    },
    faq: {
      when: '{name} 什么时候举行？',
      whenA: '时间为{when}。',
      whereEvent: '{name} 在哪里举行？',
      whereEventA: '在 {where} 举行。',
      cost: '{name} 的费用是多少？',
      costFree: '{name} 免费入场。',
      costBand: 'NorgeTravel 将 {name} 列为{band}价位。',
      tourWhen: '{name} 什么时候开放？',
      tourWhenA: '季节：{season}。',
      tourStart: '{name} 从哪里出发？',
      tourStartA: '从 {start} 出发。',
      where: '{name} 在哪里？',
      whereA: '地址：{address}。',
    },
    more: {
      calendar: '完整活动日历',
      categoryEvents: '{category}类活动',
      regionEvents: '{region}的活动',
      freeEvents: '免费活动',
      categoryTours: '更多{category}体验',
      regionTours: '{region}的体验',
      allTours: '全部体验',
      townStays: '{place} 的更多住宿',
      townEat: '{place} 的更多餐厅',
      allPlaces: '全部住宿与餐饮',
      plan: '规划行程',
    },
  },
  guides: {
    eyebrow: '攻略',
    heading: '出发前读一读',
    intro: '山地安全、从峡湾到斯瓦尔巴群岛的旅行实录，以及木屋、渡轮、费用和极光的行程规划攻略。',
    search: '搜索攻略…',
    sectionsNav: '攻略分类',
    all: '全部攻略',
    regionsNav: '地区',
    noun: '攻略',
    count: { one: '{n} 篇攻略', other: '{n} 篇攻略' },
    showAll: '显示全部攻略',
    readTime: '阅读时间 {n} 分钟',
    back: '全部攻略',
    sections: { safety: '安全与准备', 'trip-reports': '旅行实录', planning: '行程规划' },
    planThis: '规划这趟行程',
    plannerBody: '打开规划器，已选好{regions}。填上日期，它会排出光照、季节和各站之间的路线。',
    and: '和',
    openPlanner: '打开规划器',
    planRegion: '规划{region}之旅',
    planRegionBody: '在规划器里填上日期，收藏活动、体验和地点，它会排出路线和每天的安排。',
    moreSection: '更多{section}',
    englishBody: ENGLISH_BODY_NOTICE.zh,
  },
  plan: {
    eyebrow: '行程规划器',
    heading: '规划您的挪威行程',
    intro: '填好日期和此行的目的。在首页收藏活动、体验和地点，下面的规划会排出光照、路线和每天的安排。',
    savedTitle: '您收藏的内容',
    whereTo: '去哪里？',
    whereToBody: '把目的地加入规划，或者浏览某个目的地，收藏想在那里做的事。',
  },
  savedPage: {
    intro: '收藏清单保存在这台设备上，并与行程规划器共用。',
    openPlanner: '打开行程规划器',
  },
};

// ─── Japanese ───

const ja: AppCopy = {
  locale: 'ja',
  nav: {
    label: 'アプリのナビゲーション',
    brand: 'ノルウェー',
    home: 'NorgeTravelアプリのホーム',
    feed: 'ホーム',
    explore: '探す',
    plan: 'プラン',
    saved: '保存済み',
    guides: 'ガイド',
    calendar: 'カレンダー',
    planTrip: '旅行を計画する',
    theme: 'テーマ',
    savedCount: '保存済み {n}件',
  },
  theme: { fjord: 'フィヨルドテーマ', light: 'ライトテーマ', dark: 'ダークテーマ' },
  banner: {
    tabs: {
      events: { title: '日付を軸に旅を組み立てる', body: 'ここでイベントを保存して、前後の日程を計画しましょう。' },
      tours: { title: 'ツアーを旅程に保存', body: '保存したツアーは旅行プランナーに表示されます。' },
      places: { title: '候補リストを作る', body: '保存した宿やお店は旅行プランナーに表示されます。' },
    },
    cta: 'プランナー',
    close: '閉じる',
  },
  save: {
    add: '{name}を旅程に保存',
    remove: '{name}を旅程から削除',
    pillAdd: '旅程に追加',
    pillIn: '旅程に追加済み',
  },
  saved: {
    categories: {
      events: 'イベント',
      experiences: 'ツアー',
      tours: 'ツアー',
      accommodation: '宿泊',
      restaurants: 'グルメ',
      transport: '交通',
      cities: '都市',
      guides: 'ガイド',
    },
    emptyInline: 'まだ何も保存していません。イベント、ツアー、宿・グルメのブックマークをタップするか、{link}から探しましょう。',
    emptyInlineLink: 'ホーム',
    emptyTitle: 'まだ何も保存していません',
    emptyBody: 'イベント、ツアー、宿・グルメのブックマークをタップすると、ここに保存されます。',
    browse: 'ホームで探す',
    seeAll: '保存した{n}件をすべて見る',
  },
  share: { label: '{title}を共有', copied: 'リンクをコピーしました', prompt: 'このリンクをコピーしてください' },
  planZones: {
    counts: 'ツアー{experiences}件 · 宿泊{stays}件 · イベント{events}件 · ガイド{articles}件',
    add: 'プランに追加',
    inPlan: 'プランに追加済み',
    browse: '見る',
  },
  soon: { heading: 'まもなく開催', seeAll: 'すべて見る', rail: 'まもなく始まるイベント', show: '{name}を表示' },
  expand: { more: 'もっと見る', less: '閉じる' },
  dates: { intl: 'ja-JP', rangeJoin: '～', longJoin: '～' },

  meta: {
    feed: {
      events: 'ノルウェーのイベント・フェスティバル情報',
      tours: 'ノルウェーのツアーとアクティビティ',
      places: 'ノルウェーの宿泊施設とグルメ',
    },
    feedDescription: 'NorgeTravelに掲載されたノルウェー各地のイベント、ツアー、宿泊施設、飲食店。',
    explore: '地図でノルウェーを探す',
    exploreDescription: 'NorgeTravelに掲載のイベント、ツアー、宿・グルメを、町ごとにノルウェーの地図に表示します。',
    saved: '旅程に保存したもの',
    savedDescription: 'NorgeTravelで保存したイベント、ツアー、宿・グルメ。',
    plan: 'ノルウェー旅行を計画する',
    planDescription:
      '日程と興味を入力し、イベントやツアー、宿・グルメを保存すると、プランナーがルート、日照、日ごとの予定を組み立てます。',
    guides: 'ノルウェー旅行ガイド',
    guidesDescription: 'NorgeTravel編集部によるノルウェーの安全ガイド、旅行記、旅の計画ガイド。',
    listing: '{name}（{place}）',
  },
  tabs: {
    events: { label: 'イベント', noun: 'イベント', count: { one: 'イベント{n}件', other: 'イベント{n}件' }, search: 'イベント・会場を検索…' },
    tours: { label: 'ツアー', noun: 'ツアー', count: { one: 'ツアー{n}件', other: 'ツアー{n}件' }, search: 'ツアーを検索…' },
    places: {
      label: '宿・グルメ',
      noun: '宿・グルメ',
      count: { one: '宿・グルメ{n}件', other: '宿・グルメ{n}件' },
      search: '宿・グルメを検索…',
    },
  },
  common: {
    all: 'すべて',
    close: '閉じる',
    clearFilters: 'すべての条件をクリア',
    listingType: '種類',
    showMore: '{noun}をもっと見る',
    noMatch: '条件に合う{noun}はありません。',
    allOf: 'すべての{noun}',
    matching: '・キーワード「{q}」',
    inTown: '・{town}',
    newTab: EVENT_UI.ja.newTab,
  },
  feed: {
    srTitle: 'NorgeTravelアプリ：{tab}',
    searchPhone: 'ノルウェーで何を探しますか？',
    removeFilter: '条件を外すか、別のキーワードで検索してください。',
    filters: '絞り込み',
    results: '検索結果',
    brand: 'ノルウェー',
    strap: 'イベント · ツアー · 宿・グルメ',
  },
  filters: {
    whatsOn: 'ノルウェーのイベント情報',
    categories: 'カテゴリー',
    region: '地域',
    allNorway: 'ノルウェー全域',
    price: '料金',
    town: '町',
    removeTown: '町の絞り込みを解除',
    allFilters: 'すべての条件',
    on: 'オン',
  },
  calendar: {
    windows: {
      upcoming: {
        tab: '今後のすべて',
        heading: 'ノルウェーのイベントとフェスティバル',
        intro:
          '日程の決まったフェスティバル、レース、漁のシーズンを日付順に掲載しています。大きなイベントの時期は小さな町の宿が埋まるので、チケットより先に宿を確保しましょう。',
        empty: 'まだ掲載しているイベントはありません。次のシーズンの日程が発表されたら、また確認してください。',
      },
      'next-90-days': {
        tab: '今後90日間',
        heading: '今後90日間のノルウェーのイベント',
        intro:
          '今日から3か月以内に始まるイベントです。都市のフェスティバルは直前でも間に合いますが、北極圏のイベントはチケットより先に航空券と宿がなくなります。',
        empty: '今後90日間に始まるイベントはありません。次に掲載しているイベントは{name}（{date}）です。',
      },
      winter: {
        tab: '冬シーズン',
        heading: 'ノルウェーの冬のイベント',
        intro:
          '10月から4月中旬まで：極夜、オーロラシーズン、スクレイ（タラ）漁の季節です。北極圏では道路の積雪と、数時間しかない日照を前提に計画してください。',
        empty: '冬のカレンダーにはまだイベントがありません。次に掲載しているイベントは{name}（{date}）です。',
      },
      summer: {
        tab: '夏シーズン',
        heading: 'ノルウェーの夏のイベント',
        intro:
          '4月中旬から9月まで：白夜のレース、音楽フェスティバル、収穫祭のマーケット。島のフェスティバルは数か月前に売り切れ、島へのフェリーは決まった時刻表で運航します。',
        empty: '夏のカレンダーにはまだイベントがありません。次に掲載しているイベントは{name}（{date}）です。',
      },
      free: {
        tab: '入場無料',
        heading: 'ノルウェーの入場無料イベント',
        intro:
          '入場券のいらないイベントです。入場無料でも旅費が無料になるわけではありません。混み合う週の町では、交通、食事、宿の費用はいつもどおりかかります。',
        empty: '現在、入場無料のイベントは掲載されていません。次に掲載しているイベントは{name}（{date}）です。',
      },
    },
    description: 'ノルウェーのフェスティバルやイベントを、地域、料金、チケット情報とともに日付順に掲載しています。',
    count: { one: '掲載イベント{n}件', other: '掲載イベント{n}件' },
    windowsNav: '開催時期',
    regionsNav: '地域',
    onNow: EVENT_UI.ja.onNow,
    seeNext: 'このイベントを見る',
    planTitle: '日付を軸に旅を計画する',
    planBody: 'イベントを旅程に追加して、プランナーで交通、宿、前後の日程を組み立てましょう。',
    planCta: '旅行プランナーを開く',
    staysCta: '宿を探す',
  },
  labels: { ...LISTING_LABELS.ja, kinds: { events: 'イベント', tours: 'ツアー', stays: '宿泊', eat: 'グルメ' } },
  regions: regionsFor('ja'),
  zoneText: zoneText('ja', {
    'northern-norway': '世界のオーロラの都',
    lofoten: '海からそそり立つ山々',
    fjords: '世界遺産2か所、2026年からゼロエミッション',
    svalbard: '北緯78度、北極圏の果て',
    'boat-routes': 'ベルゲン～キルケネス：34港、11泊',
    cities: '都市の文化と海辺の暮らし',
  }),
  status: { today: '今日', tomorrow: '明日', inDays: '{n}日後', onNowUntil: '開催中・{until}' },
  cards: { featured: 'おすすめ', organiser: '主催者' },
  explore: {
    heading: '地図でノルウェーを探す',
    category: 'カテゴリー',
    map: 'ノルウェーとスバールバル諸島の地図',
    svalbard: 'スバールバル',
    towns: '{noun}のある町',
    pin: '{name}：{count}',
    pinNearby: { one: '{name}と周辺の町{n}か所：{count}', other: '{name}と周辺の町{n}か所：{count}' },
    placed: '{total}のうち{placed}件を町ごとに表示しています。',
    unplaced: '残りは地図上の町と結び付けられません。',
    pick: 'ピンを選んでください',
    pickBody: '各ピンは町を表し、数字はNorgeTravelがその町で掲載している{noun}の数です。',
    andNearby: '周辺',
    seeAllFeed: 'ホームで{n}件すべて見る',
    openFeed: 'ホームで開く',
    selected: '選択した町',
  },
  detail: {
    back: 'ホームに戻る',
    saveTitle: '旅程に保存する',
    saveBody: {
      events: '保存したイベントは旅行プランナーに表示されます。',
      tours: '保存したツアーは旅行プランナーに表示されます。',
      stays: '保存した宿泊施設は旅行プランナーに表示されます。',
      eat: '保存した飲食店は旅行プランナーに表示されます。',
    },
    sections: {
      goodToKnow: '基本情報',
      gettingThere: 'アクセス',
      tickets: 'チケットと情報',
      links: 'リンク',
      tags: 'カテゴリーとタグ',
      inShort: '概要',
      faq: 'よくある質問',
      similar: '似ている掲載情報',
      more: 'ノルウェーでほかにできること',
    },
    nearestTown: '最寄りの町：{town}',
    open: '開く',
    facts: {
      when: '日時',
      where: '場所',
      entry: '入場',
      entryUnknown: '主催者にご確認ください',
      dates: '開催期間',
      repeats: '開催頻度',
      capacity: '定員',
      duration: '所要時間',
      durationUnknown: '催行会社にご確認ください',
      price: '料金',
      difficulty: '難易度',
      season: 'シーズン',
      minAge: '最低年齢',
      groupSize: 'グループの人数',
      type: 'タイプ',
      stars: '{n}つ星',
      checkIn: 'チェックイン',
      checkOut: 'チェックアウト',
      cuisine: '料理',
      openingHours: '営業時間',
      booking: '予約',
      reservationRequired: '要予約',
      michelin: 'ミシュラン',
      michelinStars: '{n}つ星',
      dietary: '食事制限への対応',
    },
    lists: { included: '料金に含まれるもの', amenities: '設備', knownFor: '名物' },
    tags: { recurring: '定期開催', eco: '環境に配慮' },
    provider: {
      organiser: { heading: '主催者', role: 'イベント主催者' },
      operator: { heading: '催行会社', role: 'ツアー催行会社' },
    },
    links: {
      tickets: EVENT_UI.ja.tickets,
      organiserSite: '主催者のウェブサイト',
      operatorSite: '催行会社のウェブサイト',
      website: 'ウェブサイト',
    },
    inShort: {
      event: '{name}は「{category}」のイベントです。{region}の{where}で{when}に開催されます。',
      eventNoRegion: '{name}は「{category}」のイベントです。{where}で{when}に開催されます。',
      eventFree: '入場は無料です。',
      tour: '{name}は{operator}が催行する「{category}」のツアーで、{region}の{start}から出発します。',
      tourNoRegion: '{name}は{operator}が催行する「{category}」のツアーで、{start}から出発します。',
      tourDuration: '所要時間：{duration}。',
      tourSeason: 'シーズン：{season}。',
      stay: '{name}は{region}の{where}にある宿泊施設で、タイプは「{category}」です。',
      stayNoRegion: '{name}は{where}にある宿泊施設で、タイプは「{category}」です。',
      eat: '{name}は{where}にある飲食店で、料理は「{category}」です。住所：{address}。',
    },
    faq: {
      when: '{name}はいつ開催されますか？',
      whenA: '{when}に開催されます。',
      whereEvent: '{name}はどこで開催されますか？',
      whereEventA: '会場は{where}です。',
      cost: '{name}の料金はいくらですか？',
      costFree: '{name}は入場無料です。',
      costBand: 'NorgeTravelでは{name}を「{band}」に分類しています。',
      tourWhen: '{name}はいつ催行されますか？',
      tourWhenA: 'シーズン：{season}。',
      tourStart: '{name}の出発地はどこですか？',
      tourStartA: '{start}から出発します。',
      where: '{name}はどこにありますか？',
      whereA: '住所は{address}です。',
    },
    more: {
      calendar: 'イベントカレンダー',
      categoryEvents: '{category}のイベント',
      regionEvents: '{region}のイベント',
      freeEvents: '入場無料のイベント',
      categoryTours: 'ほかの{category}ツアー',
      regionTours: '{region}のツアー',
      allTours: 'すべてのツアー',
      townStays: '{place}のほかの宿泊施設',
      townEat: '{place}のほかの飲食店',
      allPlaces: 'すべての宿・グルメ',
      plan: '旅程を計画する',
    },
  },
  guides: {
    eyebrow: 'ガイド',
    heading: '出発前に読むガイド',
    intro: '山の安全、フィヨルドからスバールバル諸島までの旅行記、山小屋・フェリー・費用・オーロラについての計画ガイド。',
    search: 'ガイドを検索…',
    sectionsNav: 'ガイドの分類',
    all: 'すべてのガイド',
    regionsNav: '地域',
    noun: 'ガイド',
    count: { one: 'ガイド{n}件', other: 'ガイド{n}件' },
    showAll: 'すべてのガイドを表示',
    readTime: '読了時間 {n}分',
    back: 'すべてのガイド',
    sections: { safety: '安全と準備', 'trip-reports': '旅行記', planning: '旅の計画ガイド' },
    planThis: 'この旅を計画する',
    plannerBody: '{regions}を設定した状態でプランナーを開きます。日程を入れると、日照、季節、立ち寄り先の間のルートが表示されます。',
    and: 'と',
    openPlanner: 'プランナーを開く',
    planRegion: '{region}の旅を計画する',
    planRegionBody: 'プランナーに日程を入力し、イベントやツアー、宿・グルメを保存すると、ルートと日ごとの予定を組み立てます。',
    moreSection: 'ほかの{section}',
    englishBody: ENGLISH_BODY_NOTICE.ja,
  },
  plan: {
    eyebrow: '旅行プランナー',
    heading: 'ノルウェー旅行を計画する',
    intro:
      '日程と旅の目的を入力してください。ホームでイベントやツアー、宿・グルメを保存すると、下のプランが日照、ルート、日ごとの予定を組み立てます。',
    savedTitle: '保存したもの',
    whereTo: 'どこへ行きますか？',
    whereToBody: '目的地をプランに追加するか、目的地ごとに見て、やりたいことを保存しましょう。',
  },
  savedPage: {
    intro: '保存リストはこの端末に保存され、旅行プランナーと共有されます。',
    openPlanner: '旅行プランナーを開く',
  },
};

export const APP_COPY: Record<Locale, AppCopy> = { en, zh, ja };

export const appCopy = (lang: string | undefined): AppCopy => APP_COPY[asLocale(lang)];

/** The part client components need, so pages do not ship the server-only text. */
export const clientCopy = (copy: AppCopy): AppClientCopy => ({
  nav: copy.nav,
  theme: copy.theme,
  banner: copy.banner,
  save: copy.save,
  saved: copy.saved,
  share: copy.share,
  planZones: copy.planZones,
  soon: copy.soon,
  expand: copy.expand,
  dates: copy.dates,
});
