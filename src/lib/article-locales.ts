import type { Locale } from '@/lib/i18n-seo';

interface ArticleLike {
  status?: string;
  content?: string;
  updatedAt?: string;
}

const CJK = /[぀-ヿ㐀-鿿]/g;

/** True when an HTML body is written in Chinese or Japanese rather than being an English copy. */
export function isCjkBody(html: string | undefined): boolean {
  const text = (html ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, '');
  return text.length > 0 && (text.match(CJK)?.length ?? 0) / text.length > 0.2;
}

/** A Japanese translation is used only while it is at least as new as the English article. */
export function isCurrentTranslation(en: ArticleLike, ja: ArticleLike | undefined): ja is ArticleLike {
  return !!ja && (ja.updatedAt ?? '') >= (en.updatedAt ?? '');
}

/** Locales that serve this article with a translated body. English is always one. */
export function articleLocales(en: ArticleLike, zh?: ArticleLike, ja?: ArticleLike): Locale[] {
  const locales: Locale[] = ['en'];
  if (zh?.status === 'published' && isCjkBody(zh.content)) locales.push('zh');
  if (isCurrentTranslation(en, ja) && isCjkBody(ja.content)) locales.push('ja');
  return locales;
}
