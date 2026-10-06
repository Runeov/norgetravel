// Affiliate parameters we actually use. A link without one of these is a plain
// recommendation and must not be marked sponsored (Rules.md section 19).
const AFFILIATE = /partner_id=|[?&]aid=\d|[?&]a_aid=|affilid=|[?&]marker=|tp\.media|awin1\.com|anrdoezrs\.net|jdoqocy\.com|tkqlhce\.com|dpbolvw\.net|kqzyfj\.com/i;

export const SPONSORED_REL = 'noopener noreferrer sponsored';
export const PLAIN_REL = 'noopener noreferrer';

/** rel attribute for an outbound link: sponsored only when the URL carries affiliate tracking. */
export function outboundRel(url: string | null | undefined): string {
  return url && AFFILIATE.test(url) ? SPONSORED_REL : PLAIN_REL;
}

export const isAffiliateUrl = (url: string | null | undefined): boolean => !!url && AFFILIATE.test(url);
