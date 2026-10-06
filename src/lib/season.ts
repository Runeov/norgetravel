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

/** Homepage <title> and meta description per season. ja falls back to en, as in the root layout. */
export const SEASON_HOME_META: Record<SiteSeason, Record<'en' | 'zh', { title: string; description: string }>> = {
  winter: {
    en: {
      title: 'NorgeTravel | Northern Lights, Arctic Winter and Fjord Travel Guides',
      description:
        'Aurora season in Norway: where to see the Northern Lights from Tromsø, Lyngen and Svalbard, how to drive Arctic roads in snow, and where to stay this winter.',
    },
    zh: {
      title: '挪威旅行 | 北极光、北极冬季与峡湾旅行指南 | NorgeTravel',
      description:
        '挪威极光季指南：在特罗姆瑟、林根和斯瓦尔巴哪里看北极光，如何在北极雪路上驾驶，以及极夜期间住在哪里。',
    },
  },
  summer: {
    en: {
      title: 'NorgeTravel 2026 – Midnight Sun Adventures, Fjord Cruises & Arctic Hiking',
      description:
        'The definitive guide to Norge travel in 2026. Midnight sun kayaking, zero-emission fjord cruises, glacier hikes, and sustainable Arctic adventures with expert local insights.',
    },
    zh: {
      title: '挪威旅行 2026 – 午夜太阳探险、峡湾游轮与北极徒步',
      description:
        '2026年挪威旅行的权威指南。拥有当地专家见解的午夜太阳皮划艇、零排放峡湾游轮、冰川徒步及可持续的北极探险。',
    },
  },
};
