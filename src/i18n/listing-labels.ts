import type { Locale } from '@/lib/i18n-seo';
import { PRICE_RANGE_LABELS, type PriceRange } from '@/lib/schemas/travel.shared';
import {
  DIFFICULTY_LABELS,
  EXPERIENCE_TYPE_LABELS,
  type Difficulty,
  type ExperienceType,
} from '@/lib/schemas/travel.experiences.schema';
import { ACCOMMODATION_TYPE_LABELS, type AccommodationType } from '@/lib/schemas/travel.accommodation.schema';
import { CUISINE_TYPE_LABELS, type CuisineType } from '@/lib/schemas/travel.restaurants.schema';

/**
 * Names for the listing enums (tour types, stay types, cuisines, difficulty,
 * price bands) in each language. English comes from the schema label tables;
 * the app and the trip planner both read these.
 */

export interface ListingLabels {
  tours: Record<ExperienceType, string>;
  stays: Record<AccommodationType, string>;
  eat: Record<CuisineType, string>;
  difficulty: Record<Difficulty, string>;
  price: Record<PriceRange, string>;
}

/** The schema label tables lead with an emoji ("🏨 Hotel"); text and icons are shown separately. */
const plain = <K extends string>(table: Record<K, string>): Record<K, string> =>
  Object.fromEntries(
    Object.entries<string>(table).map(([key, label]) => [key, label.replace(/^[^\p{L}\p{N}]+/u, '').trim()])
  ) as Record<K, string>;

export const LISTING_LABELS: Record<Locale, ListingLabels> = {
  en: {
    tours: plain(EXPERIENCE_TYPE_LABELS),
    stays: plain(ACCOMMODATION_TYPE_LABELS),
    eat: plain(CUISINE_TYPE_LABELS),
    difficulty: plain(DIFFICULTY_LABELS),
    price: PRICE_RANGE_LABELS,
  },
  zh: {
    tours: {
      'northern-lights': '极光',
      'whale-watching': '观鲸',
      'dog-sledding': '狗拉雪橇',
      'glacier-hike': '冰川徒步',
      'fjord-cruise': '峡湾游船',
      fishing: '钓鱼',
      surfing: '冲浪',
      kayaking: '皮划艇',
      snowmobile: '雪地摩托',
      'cultural-tour': '文化游览',
      'photography-tour': '摄影之旅',
    },
    stays: {
      hotel: '酒店',
      cabin: '木屋',
      hostel: '青年旅舍',
      camping: '露营地',
      rorbu: '渔人小屋',
      glamping: '豪华露营',
      apartment: '公寓',
    },
    eat: {
      norwegian: '挪威菜',
      seafood: '海鲜',
      sami: '萨米菜',
      international: '国际料理',
      'fine-dining': '高级餐厅',
      cafe: '咖啡馆',
      bakery: '面包店',
      pub: '酒吧',
    },
    difficulty: { easy: '简单', moderate: '中等', challenging: '较难', expert: '专业级' },
    price: { budget: '经济', 'mid-range': '中档', luxury: '高档', varies: '不固定' },
  },
  ja: {
    tours: {
      'northern-lights': 'オーロラ',
      'whale-watching': 'ホエールウォッチング',
      'dog-sledding': '犬ぞり',
      'glacier-hike': '氷河ハイキング',
      'fjord-cruise': 'フィヨルドクルーズ',
      fishing: '釣り',
      surfing: 'サーフィン',
      kayaking: 'カヤック',
      snowmobile: 'スノーモービル',
      'cultural-tour': '文化ツアー',
      'photography-tour': '写真ツアー',
    },
    stays: {
      hotel: 'ホテル',
      cabin: 'キャビン',
      hostel: 'ホステル',
      camping: 'キャンプ場',
      rorbu: 'ロルブー',
      glamping: 'グランピング',
      apartment: 'アパートメント',
    },
    eat: {
      norwegian: 'ノルウェー料理',
      seafood: 'シーフード',
      sami: 'サーミ料理',
      international: '各国料理',
      'fine-dining': 'ファインダイニング',
      cafe: 'カフェ',
      bakery: 'ベーカリー',
      pub: 'パブ',
    },
    difficulty: { easy: '初級', moderate: '中級', challenging: '上級', expert: 'エキスパート' },
    price: { budget: 'お手頃', 'mid-range': '中価格帯', luxury: '高級', varies: '変動あり' },
  },
};
