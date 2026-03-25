function resolveSiteUrl() {
  const fallback = 'https://norgetravel.com';
  const candidates = [
    process.env.SITE_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const value of candidates) {
    if (!value) continue;
    const trimmed = value.trim();
    if (!trimmed) continue;
    const withProtocol = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
    try {
      const url = new URL(withProtocol);
      url.hash = '';
      url.search = '';
      return url.toString().replace(/\/$/, '');
    } catch {
      // Try next candidate
    }
  }

  return fallback;
}

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: resolveSiteUrl(),
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/team-demo', // Internal demo page
    '/kunnskapsbank/artikler/sosiookonomiske-forskjeller_Long',
    '/admin',
    '/admin/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/team-demo', '/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    // Custom priority for different page types
    let priority = config.priority;
    let changefreq = config.changefreq;

    // Homepage gets highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'weekly';
    }
    // Hub pages get high priority
    else if (path === '/kunnskapsbank' || 
             path === '/kunnskapsbank/sametinget' || 
             path === '/kunnskapsbank/bedrifter' ||
             path === '/kunnskapsbank/organisasjoner') {
      priority = 0.9;
      changefreq = 'weekly';
    }
    // Article and subpages
    else if (path.startsWith('/kunnskapsbank/')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    // Service pages
    else if (path.startsWith('/tjenester/')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    // About page
    else if (path === '/om-oss') {
      priority = 0.8;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
