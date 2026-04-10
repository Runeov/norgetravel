import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldAlert, Map, BookOpen, ArrowRight, Mountain, Car, Thermometer, Compass, Route, Clock } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Travel Guides | Safety, Trip Reports & Planning | NorgeTravel',
  description:
    'Expert travel guides for Norway. Mountain safety and the Fjellvettreglene, first-person trip reports from Lofoten to Svalbard, and logistics guides for ferries, driving, and budgets.',
  alternates: {
    canonical: '/kunnskapsbank',
  },
  openGraph: {
    title: 'Travel Guides | NorgeTravel.com',
    description:
      'Expert travel guides for Norway. Safety preparation, trip reports, and planning guides for ferries, driving, budgets, and the DNT cabin network.',
    url: 'https://norgetravel.com/kunnskapsbank',
    siteName: 'NorgeTravel.com',
    locale: 'en_US',
    type: 'website',
  },
};

const categories = [
  {
    id: 'safety',
    title: 'Safety & Preparation',
    description:
      'The Fjellvettreglene, packing for Arctic conditions, winter driving rules, and Allemannsretten explained. Read before you go.',
    icon: ShieldAlert,
    color: 'text-[#D32F2F]',
    bgColor: 'bg-red-50',
    borderHover: 'hover:border-[#D32F2F]/40',
    shadowHover: 'hover:shadow-[#D32F2F]/10',
    ctaColor: 'text-[#D32F2F]',
    articles: [
      {
        title: 'The Mountain Code: 9 rules every hiker in Norway must follow',
        slug: 'fjellvettreglene-mountain-code',
        readTime: '12 min',
        status: 'published' as const,
      },
      {
        title: 'Winter driving in Norway: tires, chains, and the roads that close',
        slug: 'winter-driving-norway',
        readTime: '10 min',
        status: 'coming-soon' as const,
      },
      {
        title: 'What to pack for Arctic Norway, month by month',
        slug: 'arctic-norway-packing-guide',
        readTime: '12 min',
        status: 'coming-soon' as const,
      },
      {
        title: 'Allemannsretten explained: your rights and obligations',
        slug: 'allemannsretten-right-to-roam',
        readTime: '7 min',
        status: 'coming-soon' as const,
      },
    ],
  },
  {
    id: 'trip-reports',
    title: 'Trip Reports',
    description:
      'First-person accounts from our editorial team. What actually happened, what went wrong, and what was worth every kilometer.',
    icon: Compass,
    color: 'text-[#1A365D]',
    bgColor: 'bg-blue-50',
    borderHover: 'hover:border-[#1A365D]/40',
    shadowHover: 'hover:shadow-[#1A365D]/10',
    ctaColor: 'text-[#1A365D]',
    articles: [
      {
        title: 'RIB Fjordsafari Geirangerfjord: what the cruise ship cannot show you',
        slug: 'rib-fjordsafari-geirangerfjord-review',
        readTime: '8 min',
        status: 'published' as const,
      },
      {
        title: 'Kayaking beneath the Seven Sisters: 4 hours on Geirangerfjord at paddle height',
        slug: 'kayaking-seven-sisters-geirangerfjord',
        readTime: '9 min',
        status: 'published' as const,
      },
      {
        title: 'Geiranger by car: Eagle Road, Flydalsjuvet, and Dalsnibba in one drive',
        slug: 'geiranger-by-car-eagle-road-dalsnibba',
        readTime: '10 min',
        status: 'published' as const,
      },
      {
        title: 'Storseterfossen: walking behind a 30-meter waterfall above Geirangerfjord',
        slug: 'storseterfossen-walk-behind-waterfall-geiranger',
        readTime: '9 min',
        status: 'published' as const,
      },
      {
        title: 'Fossevandring: 327 stone steps through the waterfalls of Geiranger village',
        slug: 'fossevandring-waterfall-walk-geiranger',
        readTime: '7 min',
        status: 'published' as const,
      },
      {
        title: 'Løsta viewpoint: the short, steep hike to Geirangerfjord\u2019s best panorama',
        slug: 'losta-viewpoint-hike-geiranger',
        readTime: '8 min',
        status: 'published' as const,
      },
      {
        title: 'Skageflå mountain farm: a Red-grade hike to the abandoned ledge above the Seven Sisters',
        slug: 'skagefla-mountain-farm-geirangerfjord',
        readTime: '10 min',
        status: 'published' as const,
      },
      {
        title: 'Besseggen in October: why the shoulder season is worth the cold',
        slug: 'besseggen-october-trip-report',
        readTime: '9 min',
        status: 'coming-soon' as const,
      },
      {
        title: 'Three nights chasing aurora from Tromso: what actually happened',
        slug: 'aurora-tromso-trip-report',
        readTime: '8 min',
        status: 'coming-soon' as const,
      },
    ],
  },
  {
    id: 'planning',
    title: 'Planning Guides',
    description:
      'The logistics that make or break your trip. Ferry schedules, real driving times, budget breakdowns, and the DNT cabin system explained.',
    icon: Map,
    color: 'text-[#00D084]',
    bgColor: 'bg-emerald-50',
    borderHover: 'hover:border-[#00D084]/40',
    shadowHover: 'hover:shadow-[#00D084]/10',
    ctaColor: 'text-emerald-700',
    articles: [
      {
        title: 'Bergen to Lofoten: every route compared (fly, drive, ferry, Hurtigruten)',
        slug: 'bergen-to-lofoten-routes',
        readTime: '14 min',
        status: 'coming-soon' as const,
      },
      {
        title: 'Norway ferry guide 2026: schedules, AutoPASS, and booking',
        slug: 'norway-ferry-guide',
        readTime: '12 min',
        status: 'coming-soon' as const,
      },
      {
        title: 'How much does Norway cost? A real budget breakdown by region',
        slug: 'norway-cost-budget-guide',
        readTime: '10 min',
        status: 'coming-soon' as const,
      },
      {
        title: 'Best time to visit Norway by region and activity',
        slug: 'best-time-visit-norway',
        readTime: '11 min',
        status: 'coming-soon' as const,
      },
      {
        title: 'DNT cabin guide: how the hut system works, keys, and booking',
        slug: 'dnt-cabin-guide',
        readTime: '9 min',
        status: 'coming-soon' as const,
      },
    ],
  },
];

// Category icon mapping for article list
const articleIcons: Record<string, typeof Mountain> = {
  safety: Thermometer,
  'trip-reports': Route,
  planning: Car,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://norgetravel.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Travel Guides',
          item: 'https://norgetravel.com/kunnskapsbank',
        },
      ],
    },
    {
      '@type': 'CollectionPage',
      name: 'Travel Guides | NorgeTravel.com',
      description:
        'Expert travel guides for Norway. Safety, trip reports, and planning guides.',
      url: 'https://norgetravel.com/kunnskapsbank',
      publisher: {
        '@type': 'Organization',
        name: 'NorgeTravel.com',
        url: 'https://norgetravel.com',
      },
    },
  ],
};

export default function KunnskapsbankPage() {
  return (
    <main className="min-h-screen bg-slate-50 relative overflow-hidden">
      <NorgeBackground />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-16 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#1A365D]/10 text-[#1A365D] text-sm font-bold uppercase tracking-wide mb-6">
          <BookOpen className="w-4 h-4" aria-hidden="true" />
          Expert guides
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-[#1A365D] mb-6 tracking-tight">
          Norway travel guides
        </h1>
        <p className="text-xl text-slate-600 mb-4 leading-relaxed max-w-2xl mx-auto">
          The knowledge that separates a good trip from a ruined itinerary. Safety rules, real trip reports, and the logistics detail that Google Maps leaves out.
        </p>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 pb-24 relative z-10">
        <div className="space-y-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const ArticleIcon = articleIcons[cat.id] || BookOpen;

            return (
              <div key={cat.id} id={cat.id} className="scroll-mt-24">
                {/* Category header */}
                <div className="flex items-start gap-4 mb-6">
                  <div
                    className={`w-12 h-12 ${cat.bgColor} rounded-lg flex items-center justify-center ${cat.color} shrink-0`}
                  >
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      {cat.title}
                    </h2>
                    <p className="text-slate-600 mt-1 leading-relaxed max-w-2xl">
                      {cat.description}
                    </p>
                  </div>
                </div>

                {/* Article cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.articles.map((article) => (
                    <div
                      key={article.slug}
                      className={`bg-white border border-slate-200 rounded-lg p-5 transition-all duration-200 ${cat.borderHover} hover:shadow-lg ${cat.shadowHover} flex flex-col`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <ArticleIcon
                          className={`w-4 h-4 mt-1 ${cat.color} shrink-0`}
                          aria-hidden="true"
                        />
                        <h3 className="text-base font-bold text-slate-800 leading-snug">
                          {article.title}
                        </h3>
                      </div>
                      <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                          <Clock className="w-3 h-3" aria-hidden="true" />
                          {article.readTime}
                        </span>
                        {article.status === 'coming-soon' ? (
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                            Coming soon
                          </span>
                        ) : (
                          <Link
                            href={`/kunnskapsbank/${cat.id}/${article.slug}`}
                            className={`inline-flex items-center gap-1 text-xs font-bold ${cat.ctaColor} hover:gap-2 transition-all`}
                          >
                            Read guide
                            <ArrowRight className="w-3 h-3" aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#1A365D] py-16 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Plan your route with real data
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
            Our travel map shows every ferry crossing, accommodation option, and local guide across Norway. Start building your itinerary.
          </p>
          <Link
            href="/travel"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#00D084] text-[#1A365D] font-bold rounded-md hover:bg-[#00B875] transition-colors group"
          >
            Open Travel Map
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
