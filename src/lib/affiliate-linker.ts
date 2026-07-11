// src/lib/affiliate-linker.ts

interface KeywordLink {
  keyword: string;
  url: string;
  title?: string;
}

// ---------------------------------------------------------
// WESTERN DICTIONARY (Used for English and European locales)
// Focus: GetYourGuide, WeGoTrip, Tiqets, Localrent
// ---------------------------------------------------------
const WESTERN_DICTIONARY: KeywordLink[] = [
  // --- TOURS & ACTIVITIES ---
  {
    keyword: 'fjord tour',
    url: 'https://www.getyourguide.com/norwegian-fjords-l134812/?partner_id=5DXMTLJ&utm_medium=online_publisher', 
    title: 'Book a Fjord Tour',
  },
  {
    keyword: 'guided hike',
    url: 'https://www.getyourguide.com/norway-l36/hiking-tc95/?partner_id=5DXMTLJ&utm_medium=online_publisher', 
    title: 'Book Guided Hikes in Norway',
  },
  {
    keyword: 'Oslo tour',
    url: 'https://www.getyourguide.com/oslo-l38/history-and-secrets-of-oslo-tour-t867411/?partner_id=5DXMTLJ&utm_medium=online_publisher', 
    title: 'Book the History and Secrets of Oslo Tour',
  },
  {
    keyword: 'audio guide',
    url: 'https://tp.media/r?marker=715596&p=WeGoTrip',
    title: 'Download City Audio Guide',
  },
  {
    keyword: 'museum tickets',
    url: 'https://tp.media/r?marker=715596&p=Tiqets',
    title: 'Book Museum Tickets',
  },

  // --- CAR RENTALS ---
  {
    keyword: 'rent a car in Norway',
    url: 'https://tp.media/r?marker=715596&p=Localrent',
    title: 'Rent a car in Norway',
  },
  {
    keyword: 'car rental',
    url: 'https://tp.media/r?marker=715596&p=Localrent', 
    title: 'Rent a car in Norway',
  },

  // --- SIM CARDS & TRANSFERS ---
  {
    keyword: 'travel SIM',
    url: 'https://tp.media/r?marker=715596&p=GigSky',
    title: 'Get a Norway travel SIM',
  },
  {
    keyword: 'eSIM for Norway',
    url: 'https://tp.media/r?marker=715596&p=Airalo',
    title: 'Get an eSIM for Norway',
  },
  {
    keyword: 'airport transfer',
    url: 'https://tp.media/r?marker=715596&p=GetTransfer',
    title: 'Book an airport transfer',
  }
];

// ---------------------------------------------------------
// ASIAN DICTIONARY (Used for Chinese and Japanese locales)
// Focus: Klook, KKday (High conversion + High commission for Asia)
// ---------------------------------------------------------
const ASIAN_DICTIONARY: KeywordLink[] = [
  // --- TOURS & ACTIVITIES (Klook & KKday) ---
  {
    keyword: 'fjord tour',
    url: 'https://tp.media/r?marker=715596&p=Klook&u=https%3A%2F%2Fwww.klook.com', // Placeholder for Klook Fjord Tour
    title: 'Book a Fjord Tour',
  },
  {
    keyword: 'guided hike',
    url: 'https://tp.media/r?marker=715596&p=KKday&u=https%3A%2F%2Fwww.kkday.com', // Placeholder for KKday Tour
    title: 'Book Guided Hikes in Norway',
  },
  {
    keyword: 'Oslo tour',
    url: 'https://tp.media/r?marker=715596&p=Klook&u=https%3A%2F%2Fwww.klook.com', 
    title: 'Book Oslo Tours',
  },
  
  // --- CAR RENTALS (Klook) ---
  {
    keyword: 'rent a car in Norway',
    url: 'https://tp.media/r?marker=715596&p=Klook&u=https%3A%2F%2Fwww.klook.com%2Fcar-rentals%2F',
    title: 'Rent a car in Norway',
  },
  {
    keyword: 'car rental',
    url: 'https://tp.media/r?marker=715596&p=Klook&u=https%3A%2F%2Fwww.klook.com%2Fcar-rentals%2F', 
    title: 'Rent a car in Norway',
  },

  // --- PACKAGE TOURS (KKday) ---
  {
    keyword: 'package tour',
    url: 'https://tp.media/r?marker=715596&p=KKday&u=https%3A%2F%2Fwww.kkday.com',
    title: 'Book a Package Tour in Norway',
  },

  // --- TRANSFERS ---
  {
    keyword: 'airport transfer',
    url: 'https://tp.media/r?marker=715596&p=Klook&u=https%3A%2F%2Fwww.klook.com%2Fairport-transfers%2F',
    title: 'Book an airport transfer',
  }
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

  for (const { keyword, url, title } of sortedDict) {
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex chars
    
    // Using a function replacer to preserve the exact case of the matched text.
    // NOTE: Removed the 'g' flag so we only replace the FIRST occurrence of the keyword. 
    // This prevents keyword stuffing and protects against Google SEO penalties.
    const regex = new RegExp(`(?![^<]*>|[^<>]*<\\/a>)\\b(${escapedKeyword})\\b`, 'i');
    
    processedHtml = processedHtml.replace(regex, (match) => {
      return `<a href="${url}" target="_blank" rel="sponsored noopener" title="${title || match}" class="affiliate-link">${match}</a>`;
    });
  }

  return processedHtml;
}
