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

/** Shown on Chinese and Japanese pages whose article body has not been translated yet. */
export const ENGLISH_BODY_NOTICE: Record<Exclude<Locale, 'en'>, string> = {
  zh: '本文目前只有英文版。可以使用浏览器的翻译功能阅读全文。',
  ja: 'この記事は現在英語版のみです。ブラウザの翻訳機能で全文をお読みいただけます。',
};
