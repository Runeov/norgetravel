import type { MetadataRoute } from 'next';
import articlesEn from '@/data/articles.json';
import articlesZh from '@/data/articles_zh.json';
import articlesJa from '@/data/articles_ja.json';
import { getAllCitySlugs, getAllAttractionParams } from '@/data/city-attractions';
import { getAllFjordSlugs } from '@/data/fjords';
import { ACTIVITY_SLUGS } from '@/data/fjord-tours';
import { getSortedEmployees } from '@/lib/admin/employees';
import { HREFLANG, localeUrl, staticPageLocales, type Locale } from '@/lib/i18n-seo';
import { articleLocales } from '@/lib/article-locales';

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
  content?: string;
  updatedAt?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // One entry per locale that serves the page in its own language. A zh or ja
  // URL that only repeats the English copy canonicalises to English, so it is left out.
  const entries = (path: string, locales: Locale[] = staticPageLocales(path), lastModified?: string): MetadataRoute.Sitemap =>
    locales.map((locale) => ({
      url: localeUrl(locale, path),
      ...(lastModified && { lastModified }),
      ...(locales.length > 1 && {
        alternates: {
          languages: {
            ...Object.fromEntries(locales.map((l) => [HREFLANG[l], localeUrl(l, path)])),
            'x-default': localeUrl('en', path),
          },
        },
      }),
    }));

  const zh = articlesZh as Record<string, ArticleEntry>;
  const ja = articlesJa as Record<string, ArticleEntry>;
  const articles = Object.entries(articlesEn as Record<string, ArticleEntry>)
    .filter(([, a]) => a.status === 'published')
    .flatMap(([key, a]) =>
      entries(`travel-guides/${a.category}/${a.slug}`, articleLocales(a, zh[key], ja[key]), a.updatedAt)
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
