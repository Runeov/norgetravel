import type { MetadataRoute } from 'next';
import articlesEn from '@/data/articles.json';
import articlesZh from '@/data/articles_zh.json';
import { getAllCitySlugs, getAllAttractionParams } from '@/data/city-attractions';
import { getAllFjordSlugs } from '@/data/fjords';
import { ACTIVITY_SLUGS } from '@/data/fjord-tours';
import { getSortedEmployees } from '@/lib/admin/employees';
import { getSiteUrl } from '@/lib/site-url';

type Locale = 'en' | 'zh' | 'ja';
const LOCALES: Locale[] = ['en', 'zh', 'ja'];

// Public routes without dynamic segments. Leaves out /my-trip (per-visitor
// planner) and /travel/guides (no listings yet).
const STATIC_PATHS = [
  '',
  'destinations',
  'destinations/cities',
  'destinations/fjords',
  'destinations/alta',
  'destinations/lofoten',
  'destinations/lyngen',
  'destinations/nordkapp',
  'destinations/northern-norway',
  'destinations/senja',
  'destinations/svalbard',
  'destinations/tromso',
  'om-oss',
  'personvern',
  'tilgjengelighet',
  'tjenester/northern-lights',
  'tjenester/remote-cabins',
  'tjenester/trekking',
  'travel',
  'travel/accommodation',
  'travel/events',
  'travel/experiences',
  'travel/restaurants',
  'travel/transport',
  'travel-guides',
];

interface ArticleEntry {
  slug: string;
  category: string;
  status: string;
  updatedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const url = (locale: Locale, path: string) => `${base}/${locale}/${path ? `${path}/` : ''}`;

  // One entry per locale, each listing every language version as an hreflang alternate
  const entries = (path: string, locales: Locale[] = LOCALES, lastModified?: string): MetadataRoute.Sitemap =>
    locales.map((locale) => ({
      url: url(locale, path),
      ...(lastModified && { lastModified }),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, url(l, path)])),
          'x-default': url(locales.includes('en') ? 'en' : locales[0], path),
        },
      },
    }));

  // The zh site reads articles_zh.json; en and ja both serve articles.json
  const zhPublished = new Set(
    Object.values(articlesZh as Record<string, ArticleEntry>)
      .filter((a) => a.status === 'published')
      .map((a) => a.slug)
  );
  const articles = Object.values(articlesEn as Record<string, ArticleEntry>)
    .filter((a) => a.status === 'published')
    .flatMap((a) =>
      entries(
        `travel-guides/${a.category}/${a.slug}`,
        zhPublished.has(a.slug) ? LOCALES : ['en', 'ja'],
        a.updatedAt
      )
    );

  const employees = await getSortedEmployees();

  return [
    ...STATIC_PATHS.flatMap((path) => entries(path)),
    ...getAllCitySlugs().flatMap((city) => entries(`destinations/cities/${city}`)),
    ...getAllAttractionParams().flatMap(({ city, attraction }) =>
      entries(`destinations/cities/${city}/${attraction}`)
    ),
    ...getAllFjordSlugs().flatMap((fjord) => entries(`destinations/fjords/${fjord}`)),
    ...ACTIVITY_SLUGS.flatMap((activity) => entries(`destinations/fjords/activities/${activity}`)),
    ...employees.flatMap((e) => entries(`om-oss/${e.id}`)),
    ...articles,
  ];
}
