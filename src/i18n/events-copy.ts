import type { Locale } from '@/lib/i18n-seo';
import type { EventType } from '@/lib/schemas/travel.events.schema';
import type { CalendarWindow } from '@/lib/event-calendar';
import type { Destination } from '@/lib/schemas/travel.shared';
import { HOME_COPY } from './home-copy';

// Text on event cards, shared by the events calendar (English) and the
// homepage "What's on" section (every locale).

export interface EventUiCopy {
  types: Record<EventType, string>;
  onNow: string;
  /** {date} is the last day of the event */
  until: string;
  free: string;
  tickets: string;
  newTab: string;
}

export const EVENT_UI: Record<Locale, EventUiCopy> = {
  en: {
    types: {
      festival: 'Festival',
      concert: 'Concert',
      market: 'Market',
      sports: 'Sport',
      cultural: 'Culture',
      'midnight-sun': 'Midnight sun',
      'northern-lights': 'Northern lights',
      'food-drink': 'Food and drink',
      outdoor: 'Outdoor',
      seasonal: 'Seasonal',
    },
    onNow: 'On now',
    until: 'until {date}',
    free: 'Free entry',
    tickets: 'Tickets',
    newTab: '(opens in a new tab)',
  },
  zh: {
    types: {
      festival: '节庆',
      concert: '音乐会',
      market: '集市',
      sports: '体育赛事',
      cultural: '文化',
      'midnight-sun': '午夜太阳',
      'northern-lights': '极光',
      'food-drink': '美食',
      outdoor: '户外',
      seasonal: '季节活动',
    },
    onNow: '正在进行',
    until: '持续至{date}',
    free: '免费入场',
    tickets: '购票',
    newTab: '（在新标签页打开）',
  },
  ja: {
    types: {
      festival: 'フェスティバル',
      concert: 'コンサート',
      market: 'マーケット',
      sports: 'スポーツ',
      cultural: '文化',
      'midnight-sun': '白夜',
      'northern-lights': 'オーロラ',
      'food-drink': '食とドリンク',
      outdoor: 'アウトドア',
      seasonal: '季節の行事',
    },
    onNow: '開催中',
    until: '{date}まで',
    free: '入場無料',
    tickets: 'チケット',
    newTab: '（新しいタブで開きます）',
  },
};

const ALL_NORWAY: Record<Locale, string> = { en: 'All of Norway', zh: '挪威全境', ja: 'ノルウェー全域' };

/** Region names for event cards and filters, taken from the homepage destination names. */
export function eventRegionNames(locale: Locale): Record<Destination, string> {
  const items = HOME_COPY[locale].destinations.items;
  return {
    'northern-norway': items['northern-norway'].name,
    lofoten: items.lofoten.name,
    fjords: items.fjords.name,
    svalbard: items.svalbard.name,
    all: ALL_NORWAY[locale],
  };
}

// ─── Events calendar pages (English only, like the other /travel pages) ───

export interface CalendarWindowCopy {
  tab: string;
  title: string;
  description: string;
  heading: string;
  intro: string;
  /** Shown when the window has no events. {name} and {date} describe the next listed event. */
  empty: string;
}

export const CALENDAR_COPY: Record<CalendarWindow, CalendarWindowCopy> = {
  upcoming: {
    tab: 'All upcoming',
    title: 'Events & Festivals in Norway | NorgeTravel',
    description:
      'Norway’s festivals and events by date, from the Tromsø International Film Festival to midnight sun races, Sami Easter in Kautokeino and the Lofoten cod season.',
    heading: 'Events and festivals in Norway',
    intro:
      'Festivals, races and fishing seasons with fixed dates, in date order. Small towns fill up for the big ones, so book the bed before the ticket.',
    empty: 'Nothing is listed yet. Check back once the next season’s dates are announced.',
  },
  'next-90-days': {
    tab: 'Next 90 days',
    title: 'Events in Norway in the Next 90 Days | NorgeTravel',
    description:
      'Festivals, races and seasonal events in Norway starting within the next 90 days, with dates, towns and ticket links.',
    heading: 'Events in Norway in the next 90 days',
    intro:
      'What starts between today and three months from now. City festivals work at short notice. For Arctic events, flights and rooms run out before tickets do.',
    empty: 'Nothing on our calendar starts in the next 90 days. The next listed event is {name}, {date}.',
  },
  winter: {
    tab: 'Winter season',
    title: 'Winter Events & Festivals in Norway | NorgeTravel',
    description:
      'Winter events in Norway from October to mid-April: polar night festivals, aurora season, sled dog races and the Lofoten cod season.',
    heading: 'Winter events in Norway',
    intro:
      'October to mid-April: polar night, aurora season and the skrei cod fishery. Above the Arctic Circle, plan for snow on the roads and a few hours of daylight.',
    empty: 'Nothing on our winter calendar yet. The next listed event is {name}, {date}.',
  },
  summer: {
    tab: 'Summer season',
    title: 'Summer Events & Festivals in Norway | NorgeTravel',
    description:
      'Summer events in Norway from mid-April to September: midnight sun races, island music festivals, food festivals and harvest markets.',
    heading: 'Summer events in Norway',
    intro:
      'Mid-April to September: midnight sun races, music festivals and harvest markets. Island festivals sell out months ahead, and the ferries to them run on fixed timetables.',
    empty: 'Nothing on our summer calendar yet. The next listed event is {name}, {date}.',
  },
  free: {
    tab: 'Free entry',
    title: 'Free Events & Festivals in Norway | NorgeTravel',
    description:
      'Events and festivals in Norway with free entry, with dates and towns. Travel, food and beds still cost what they cost that week.',
    heading: 'Free events in Norway',
    intro:
      'Events with no entry ticket. Free entry is not a free trip: you still pay for travel, food and a bed in a town that is busy that week.',
    empty: 'No free events are listed right now. The next listed event is {name}, {date}.',
  },
};
