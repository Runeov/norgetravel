'use client';

import Script from 'next/script';

interface HotjarProps {
  hjid: string;
  hjsv?: string;
}

/**
 * Hotjar Analytics Component
 * 
 * Add your Hotjar Site ID (hjid) to enable heatmaps, recordings, and feedback.
 * Get your Site ID from: https://insights.hotjar.com/site/list
 * 
 * Usage in layout.tsx:
 * <Hotjar hjid="YOUR_SITE_ID" />
 */
export function Hotjar({ hjid, hjsv = '6' }: HotjarProps) {
  // Don't load in development
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  // Don't load if no Site ID provided
  if (!hjid || hjid === 'YOUR_SITE_ID') {
    console.warn('[Hotjar] No Site ID provided. Skipping Hotjar initialization.');
    return null;
  }

  return (
    <Script
      id="hotjar-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:${hjid},hjsv:${hjsv}};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
      }}
    />
  );
}
