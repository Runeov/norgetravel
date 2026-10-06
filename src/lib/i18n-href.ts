export const LOCALES = ['en', 'zh', 'ja'] as const;

// First path segments that are not localized pages
const NON_PAGE_SEGMENTS = ['api', 'admin', '_next', 'images', 'pics', 'logos', 'videos'];

const isLocale = (value: string | undefined): value is (typeof LOCALES)[number] =>
  !!value && (LOCALES as readonly string[]).includes(value);

/**
 * Prefixes a site-internal path with the active locale, e.g. "/destinations"
 * -> "/zh/destinations". External URLs, hash links, already-prefixed paths,
 * files and non-page routes are returned unchanged.
 */
export function localizeHref<T>(href: T, lang: string | undefined): T {
  if (typeof href !== 'string' || !isLocale(lang)) return href;
  if (!href.startsWith('/') || href.startsWith('//')) return href;
  const path = href.split(/[?#]/)[0];
  const first = path.split('/')[1];
  if (isLocale(first) || NON_PAGE_SEGMENTS.includes(first) || /\.[a-z0-9]+$/i.test(path)) return href;
  return `/${lang}${href === '/' ? '' : href}` as T;
}
