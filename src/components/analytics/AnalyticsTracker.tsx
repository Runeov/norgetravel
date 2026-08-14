'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useScroll } from 'framer-motion';
import {
  getLinkDestination,
  getPartnerName,
  isAnalyticsEventName,
  trackEvent,
  type AnalyticsProperties,
} from '@/lib/analytics';

const ARTICLE_PATH = /\/travel-guides\/[^/]+\/[^/]+\/?$/;

export function AnalyticsTracker() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (!pathname) return;

    const sentDepths = new Set<number>();
    const isArticle = ARTICLE_PATH.test(pathname);
    let visibleSeconds = 0;

    const engagementTimer = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      visibleSeconds += 1;

      if (isArticle && visibleSeconds === 30) {
        trackEvent('article_engaged', { duration_seconds: 30 });
      }
    }, 1000);

    const stopTrackingScroll = scrollYProgress.on('change', (progress) => {
      const percent = Math.min(100, Math.round(progress * 100));
      for (const threshold of [50, 90]) {
        if (percent >= threshold && !sentDepths.has(threshold)) {
          sentDepths.add(threshold);
          trackEvent('scroll_depth', {
            percent: threshold,
            content_type: isArticle ? 'article' : 'page',
          });
        }
      }
    });

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;
      if (link.dataset.analyticsHandled === 'true') return;

      const explicitEvent = link.dataset.analyticsEvent;
      if (explicitEvent && isAnalyticsEventName(explicitEvent)) {
        const properties: AnalyticsProperties = {
          placement: link.dataset.analyticsPlacement,
          target: link.dataset.analyticsTarget,
          link_text: link.textContent?.trim().slice(0, 80),
        };
        trackEvent(explicitEvent, properties);
        return;
      }

      const isAffiliate =
        link.rel.split(/\s+/).includes('sponsored') ||
        link.classList.contains('affiliate-link');

      if (isAffiliate) {
        trackEvent('affiliate_click', {
          partner: getPartnerName(link.href),
          destination: getLinkDestination(link.href),
          placement:
            link.closest<HTMLElement>('[data-analytics-placement]')?.dataset.analyticsPlacement ||
            (isArticle ? 'article_body' : 'unknown'),
          link_text: link.textContent?.trim().slice(0, 80),
        });
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      window.clearInterval(engagementTimer);
      stopTrackingScroll();
      document.removeEventListener('click', handleClick);
    };
  }, [pathname, scrollYProgress]);

  return null;
}
