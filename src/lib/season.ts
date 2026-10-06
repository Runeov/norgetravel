/**
 * Site-wide season switch. The homepage revalidates daily, so it flips on the
 * boundary dates without a redeploy.
 *
 * Winter: 1 October – 14 April (aurora season, polar night, winter roads).
 * Summer: 15 April – 30 September (snow-free trails, fjord season, midnight sun).
 */
export type SiteSeason = 'winter' | 'summer';

export function getSiteSeason(date: Date = new Date()): SiteSeason {
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  if (month >= 10 || month <= 3 || (month === 4 && day < 15)) return 'winter';
  return 'summer';
}

/** Hero image and primary CTA per season. Translated copy lives in the dictionaries (home.seasons). */
export const SEASON_HERO: Record<SiteSeason, { image: string; alt: string; ctaHref: string }> = {
  winter: {
    image: '/images/lyngen/northern-lights/aurora-otertind_petr-pavlicek.jpg',
    alt: 'Green and violet aurora over the snow-covered peak of Otertind in Signaldalen, Northern Norway',
    ctaHref: '/tjenester/northern-lights',
  },
  summer: {
    image: '/images/tromso/landscapes/midnight-sun-sommaroy_vegard-stien.jpg',
    alt: 'Midnight sun over Sommarøy islands and turquoise Arctic waters near Tromsø, Northern Norway',
    ctaHref: '/destinations/fjords',
  },
};

/** Homepage <title> and meta description per season and language. */
export const SEASON_HOME_META: Record<SiteSeason, Record<'en' | 'zh' | 'ja', { title: string; description: string }>> = {
  winter: {
    en: {
      title: 'NorgeTravel | Northern Lights, Arctic Winter and Fjord Travel Guides',
      description:
        'Aurora season in Norway: where to see the Northern Lights from Tromsø, Lyngen and Svalbard, how to drive Arctic roads in snow, and where to stay this winter.',
    },
    zh: {
      title: '挪威旅游攻略：极光、峡湾与北极冬季 | 挪威旅行 NorgeTravel',
      description:
        '住在挪威的编辑撰写的挪威旅游攻略：特罗姆瑟、林根和斯瓦尔巴哪里看极光，冬季雪路自驾，峡湾渡轮，旅行费用与最佳旅行时间。',
    },
    ja: {
      title: 'ノルウェー旅行・観光ガイド：オーロラ、フィヨルド、冬の北極圏 | NorgeTravel',
      description:
        'ノルウェーに住む編集者のノルウェー旅行ガイド。トロムソ、リンゲン、スバールバルでオーロラを見る時期と場所、冬の雪道ドライブ、フィヨルドのフェリー、旅行費用。',
    },
  },
  summer: {
    en: {
      title: 'NorgeTravel 2026 | Midnight Sun Adventures, Fjord Cruises & Arctic Hiking',
      description:
        'Norway travel in 2026: midnight sun kayaking, zero-emission fjord cruises, glacier hikes and sustainable Arctic adventures, with expert local insight.',
    },
    zh: {
      title: '挪威旅游攻略：峡湾、午夜太阳与徒步 | 挪威旅行 NorgeTravel',
      description:
        '住在挪威的编辑撰写的挪威旅游攻略：峡湾自驾与渡轮，罗弗敦群岛，午夜太阳，徒步路线，旅行费用与最佳旅行时间。',
    },
    ja: {
      title: 'ノルウェー旅行・観光ガイド：フィヨルド、白夜、ハイキング | NorgeTravel',
      description:
        'ノルウェーに住む編集者のノルウェー旅行ガイド。フィヨルドのドライブとフェリー、ロフォーテン諸島、白夜、ハイキング、旅行費用とベストシーズン。',
    },
  },
};
