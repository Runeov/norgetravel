// src/lib/affiliate-linker.ts

interface KeywordLink {
  keyword: string;
  url: string;
  title?: string;
  /** true when the URL carries our affiliate parameters; adds rel="sponsored" */
  sponsored?: boolean;
}

// Every URL here was checked live on 7 October 2026 (Rules.md section 19).
// The old Travelpayouts redirects (tp.media/r?marker=715596&p=<name>) all
// answered 400, so partners without a working affiliate link are linked
// directly, without tracking, until real deep links are generated in the
// Travelpayouts dashboard (marker 715596, trs 514175, plus the programme's
// numeric id and a campaign_id).

const GYG = 'partner_id=5DXMTLJ&utm_medium=online_publisher';
const GYG_NORWAY = `https://www.getyourguide.com/norway-l169022/?${GYG}`;
const GYG_NORWAY_HIKING = `https://www.getyourguide.com/norway-l169022/hiking-tc71/?${GYG}`;
const GYG_OSLO_TOUR = `https://www.getyourguide.com/oslo-l38/history-and-secrets-of-oslo-tour-t867411/?${GYG}`;
const LOCALRENT = 'https://www.localrent.com/';
const GETTRANSFER = 'https://gettransfer.com/en';

// ---------------------------------------------------------
// WESTERN DICTIONARY (Used for English and European locales)
// ---------------------------------------------------------
const WESTERN_DICTIONARY: KeywordLink[] = [
  // --- TOURS & ACTIVITIES ---
  { keyword: 'fjord tour', url: GYG_NORWAY, title: 'Book a Fjord Tour', sponsored: true },
  { keyword: 'guided hike', url: GYG_NORWAY_HIKING, title: 'Book Guided Hikes in Norway', sponsored: true },
  { keyword: 'Oslo tour', url: GYG_OSLO_TOUR, title: 'Book the History and Secrets of Oslo Tour', sponsored: true },
  { keyword: 'audio guide', url: 'https://wegotrip.com/', title: 'Download City Audio Guide' },
  { keyword: 'museum tickets', url: 'https://www.tiqets.com/en/', title: 'Book Museum Tickets' },

  // --- CAR RENTALS ---
  { keyword: 'rent a car in Norway', url: LOCALRENT, title: 'Rent a car in Norway' },
  { keyword: 'car rental', url: LOCALRENT, title: 'Rent a car in Norway' },

  // --- SIM CARDS & TRANSFERS ---
  { keyword: 'travel SIM', url: 'https://www.gigsky.com/', title: 'Get a Norway travel SIM' },
  { keyword: 'eSIM for Norway', url: 'https://www.airalo.com/norway-esim', title: 'Get an eSIM for Norway' },
  { keyword: 'airport transfer', url: GETTRANSFER, title: 'Book an airport transfer' },
];

// ---------------------------------------------------------
// ASIAN DICTIONARY (Used for Chinese and Japanese locales)
// GetYourGuide serves Chinese and Japanese readers and pays commission;
// KKday is linked directly for package tours.
// ---------------------------------------------------------
const ASIAN_DICTIONARY: KeywordLink[] = [
  // --- TOURS & ACTIVITIES ---
  { keyword: 'fjord tour', url: GYG_NORWAY, title: 'Book a Fjord Tour', sponsored: true },
  { keyword: 'guided hike', url: GYG_NORWAY_HIKING, title: 'Book Guided Hikes in Norway', sponsored: true },
  { keyword: 'Oslo tour', url: GYG_OSLO_TOUR, title: 'Book Oslo Tours', sponsored: true },

  // --- CAR RENTALS ---
  { keyword: 'rent a car in Norway', url: LOCALRENT, title: 'Rent a car in Norway' },
  { keyword: 'car rental', url: LOCALRENT, title: 'Rent a car in Norway' },

  // --- PACKAGE TOURS ---
  { keyword: 'package tour', url: 'https://www.kkday.com/', title: 'Book a Package Tour in Norway' },

  // --- TRANSFERS ---
  { keyword: 'airport transfer', url: GETTRANSFER, title: 'Book an airport transfer' },
];

/**
 * Injects locale-aware affiliate links into raw HTML content.
 * Carefully avoids replacing text inside existing HTML tags or inside existing <a> links.
 */
export function injectAffiliateLinks(html: string, locale: string = 'en'): string {
  if (!html) return html;

  let processedHtml = html;

  // Dynamically select the dictionary based on the locale
  const isAsianLocale = locale === 'zh' || locale === 'ja';
  const dictionary = isAsianLocale ? ASIAN_DICTIONARY : WESTERN_DICTIONARY;

  // We sort by length descending to ensure longer keywords (like "rent a car in Norway")
  // are replaced before shorter ones (like "car rental") that might overlap.
  const sortedDict = [...dictionary].sort((a, b) => b.keyword.length - a.keyword.length);

  for (const { keyword, url, title, sponsored } of sortedDict) {
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex chars

    // Using a function replacer to preserve the exact case of the matched text.
    // NOTE: Removed the 'g' flag so we only replace the FIRST occurrence of the keyword.
    // This prevents keyword stuffing and protects against Google SEO penalties.
    const regex = new RegExp(`(?![^<]*>|[^<>]*<\\/a>)\\b(${escapedKeyword})\\b`, 'i');
    const rel = sponsored ? 'noopener noreferrer sponsored' : 'noopener noreferrer';

    processedHtml = processedHtml.replace(regex, (match) => {
      return `<a href="${url}" target="_blank" rel="${rel}" title="${title || match}" class="affiliate-link">${match}</a>`;
    });
  }

  return processedHtml;
}
