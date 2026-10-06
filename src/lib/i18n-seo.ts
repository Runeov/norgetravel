import type { Metadata } from 'next';
import { getSiteUrl } from '@/lib/site-url';

export type Locale = 'en' | 'zh' | 'ja';
export const LOCALES: readonly Locale[] = ['en', 'zh', 'ja'];

export const asLocale = (lang: string | undefined): Locale =>
  lang === 'zh' || lang === 'ja' ? lang : 'en';

// The brand is written as two words so it matches the query "norge travel".
// It reads as "Norway travel": 挪威旅行 in Chinese, ノルウェー旅行 in Japanese,
// which are also the head search terms, so the zh and ja brands carry them.
export const SITE_NAME: Record<Locale, string> = {
  en: 'Norge Travel',
  zh: 'Norge Travel 挪威旅行',
  ja: 'Norge Travel ノルウェー旅行',
};

export const OG_LOCALE: Record<Locale, string> = { en: 'en_US', zh: 'zh_CN', ja: 'ja_JP' };
/** <html lang>: Simplified Chinese is stated so Baidu and Google do not have to guess the script. */
export const HTML_LANG: Record<Locale, string> = { en: 'en', zh: 'zh-CN', ja: 'ja' };
/** hreflang codes. zh-Hans leaves room for a Traditional Chinese (zh-Hant) site later. */
export const HREFLANG: Record<Locale, string> = { en: 'en', zh: 'zh-Hans', ja: 'ja' };

const BRAND = '(?:Norge ?Travel(?:\\.com)?(?: 挪威旅行| ノルウェー旅行)?|ノルゲトラベル|挪威旅行 NorgeTravel|ノルウェー旅行 NorgeTravel)';
const BRAND_PREFIX = new RegExp(`^\\s*${BRAND}\\s*[|｜]\\s*`);
const BRAND_SUFFIX = new RegExp(`\\s*[|｜]\\s*${BRAND}\\s*$`);

/**
 * Normalises the brand in a page title to SITE_NAME for the locale: "… | Norge
 * Travel" on English pages, "… | Norge Travel 挪威旅行" and "… | Norge Travel
 * ノルウェー旅行" on the others. An English title that led with the brand keeps
 * leading with it. Safe to apply twice.
 */
export function brandTitle(title: string, lang: string | undefined): string {
  const locale = asLocale(lang);
  const leadsWithBrand = BRAND_PREFIX.test(title);
  const bare = title.replace(BRAND_PREFIX, '').replace(BRAND_SUFFIX, '').trim();
  if (locale === 'en' && leadsWithBrand) return `${SITE_NAME.en} | ${bare}`;
  return `${bare} | ${SITE_NAME[locale]}`;
}

// Static pages with a full Chinese or Japanese version. Any other page serves
// English content under /zh/ and /ja/, so it canonicalises to the English URL
// and stays out of the zh and ja sitemap. Add a path once its copy is translated.
const TRANSLATED_PATHS: Record<Exclude<Locale, 'en'>, readonly string[]> = {
  zh: ['', 'tjenester/northern-lights', 'destinations/tromso'],
  ja: ['', 'tjenester/northern-lights', 'destinations/tromso'],
};

/** Locales that serve this static page in their own language. English is always one. */
export function staticPageLocales(path: string): Locale[] {
  return LOCALES.filter((l) => l === 'en' || TRANSLATED_PATHS[l].includes(path));
}

export function localeUrl(locale: Locale, path: string): string {
  return `${getSiteUrl()}/${locale}/${path ? `${path}/` : ''}`;
}

/**
 * Canonical and hreflang links. A locale that only serves the English copy
 * points its canonical at the English URL instead of competing with it.
 */
export function localeAlternates(
  path: string,
  lang: string | undefined,
  locales: readonly Locale[] = staticPageLocales(path)
): NonNullable<Metadata['alternates']> {
  const current = asLocale(lang);
  return {
    canonical: localeUrl(locales.includes(current) ? current : 'en', path),
    ...(locales.length > 1 && {
      languages: {
        ...Object.fromEntries(locales.map((l) => [HREFLANG[l], localeUrl(l, path)])),
        'x-default': localeUrl('en', path),
      },
    }),
  };
}

/**
 * generateMetadata for a page whose metadata does not change by locale: the
 * brand in its titles is normalised and its canonical and hreflang links added.
 */
export function localizedMetadata(path: string, metadata: Metadata) {
  return async ({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> => {
    const { lang } = await params;
    const og = metadata.openGraph;
    return {
      ...metadata,
      ...(typeof metadata.title === 'string' && { title: brandTitle(metadata.title, lang) }),
      ...(og && typeof og.title === 'string' && { openGraph: { ...og, title: brandTitle(og.title, lang) } }),
      alternates: localeAlternates(path, lang),
    };
  };
}
