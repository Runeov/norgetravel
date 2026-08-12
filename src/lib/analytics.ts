import { track as trackVercel } from '@vercel/analytics/react';

export type AnalyticsEventName =
  | 'article_engaged'
  | 'scroll_depth'
  | 'related_content_click'
  | 'transport_filter_used'
  | 'transport_operator_click'
  | 'affiliate_click'
  | 'commercial_offer_viewed'
  | 'commercial_offer_clicked'
  | 'trip_item_added'
  | 'trip_item_removed'
  | 'trip_planner_opened'
  | 'trip_planner_minimized'
  | 'trip_planner_closed'
  | 'share_started'
  | 'share_completed';

export type AnalyticsProperty = string | number | boolean | null | undefined;
export type AnalyticsProperties = Record<string, AnalyticsProperty>;

const EVENT_NAMES = new Set<AnalyticsEventName>([
  'article_engaged',
  'scroll_depth',
  'related_content_click',
  'transport_filter_used',
  'transport_operator_click',
  'affiliate_click',
  'commercial_offer_viewed',
  'commercial_offer_clicked',
  'trip_item_added',
  'trip_item_removed',
  'trip_planner_opened',
  'trip_planner_minimized',
  'trip_planner_closed',
  'share_started',
  'share_completed',
]);

export function isAnalyticsEventName(value: string): value is AnalyticsEventName {
  return EVENT_NAMES.has(value as AnalyticsEventName);
}

function compactProperties(properties: AnalyticsProperties): AnalyticsProperties {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined)
  );
}

/**
 * Sends the same event to Vercel Analytics and, after analytics consent has
 * loaded it, GA4. Tracking must never interrupt the visitor's action.
 */
export function trackEvent(
  name: AnalyticsEventName,
  properties: AnalyticsProperties = {}
): void {
  if (typeof window === 'undefined') return;

  const payload = compactProperties({
    path: window.location.pathname,
    language: document.documentElement.lang || undefined,
    ...properties,
  });

  try {
    trackVercel(name, payload);
  } catch {
    // Analytics must never interrupt the product experience.
  }

  try {
    window.gtag?.('event', name, payload);
  } catch {
    // GA4 is unavailable when consent was declined or a blocker is active.
  }
}

export function getLinkDestination(href: string): string {
  try {
    const url = new URL(href, window.location.origin);
    return `${url.origin}${url.pathname}`;
  } catch {
    return href.split('?')[0];
  }
}

export function getPartnerName(href: string): string {
  try {
    return new URL(href, window.location.origin).hostname.replace(/^www\./, '');
  } catch {
    return 'unknown';
  }
}
