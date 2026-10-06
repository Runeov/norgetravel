import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { ShieldAlert, Map, BookOpen, ArrowRight, Mountain, Car, Thermometer, Compass, Route, Clock } from 'lucide-react';
import { NorgeBackground } from '@/components/modules/NorgeBackground';
import { TripReportsTabs, type TripReportRegion } from '@/components/modules/TripReportsTabs';
import articlesJson from '@/data/articles.json';
import { localizedMetadata } from '@/lib/i18n-seo';

export const dynamic = 'force-static';

export const generateMetadata = localizedMetadata('travel-guides', {
  title: 'Travel Guides | Safety, Trip Reports & Planning | NorgeTravel',
  description:
    'Expert travel guides for Norway. Mountain safety and the Fjellvettreglene, first-person trip reports from the fjords to Svalbard, and planning guides for the DNT cabin network and the aurora season.',
  openGraph: {
    title: 'Travel Guides | NorgeTravel.com',
    description:
      'Expert travel guides for Norway. Safety preparation, trip reports, and planning guides for the DNT cabin network and the aurora season.',
    url: 'https://norgetravel.com/travel-guides',
    siteName: 'NorgeTravel.com',
    locale: 'en_US',
    type: 'website',
  },
});

interface ArticleEntry {
  slug: string;
  title: string;
  category: string;
  status: string;
  readTime?: number;
  sortOrder?: number;
  tags?: string[];
}

// Each hub section lists every published article in these categories
const SECTION_CATEGORIES: Record<string, string[]> = {
  safety: ['safety'],
  'trip-reports': ['trip-reports'],
  planning: ['planning', 'artikler'],
};

// Tested in order. Magerøya and Kvaløya slugs contain "fjord", so the northern regions come first.
const REGION_RULES: [TripReportRegion, RegExp][] = [
  ['svalbard', /svalbard|longyearbyen/],
  ['lofoten', /lofoten|reinebringen|henningsv|svolv|kvalvika|munkebu|festvag|ryten/],
  [
    'northern-norway',
    /tromso|lyngen|senja|\balta\b|nordkapp|mager|honningsv|kvaloya|skibotn|kjostind|seiland|blaisvatnet|haldde|komsa|rafsbotn|sorlenangs|rornes|fastdal|goalsevarri|segla|husfjell|hesten|barden|knivskjel|storfjellet/,
  ],
  ['cities', /\boslo\b|trondheim|stavanger/],
  ['fjords', /fjord|geiranger|naeroy|sogne|hardanger|flam|trolltunga|voring|folgefonna|urnes|stegastein|nutshell|rimstigen|prest|losta|skagefla|storseter|fossevandring|nali/],
];

function tripReportRegion(article: ArticleEntry): TripReportRegion {
  const haystack = `${article.slug} ${(article.tags ?? []).join(' ')}`.toLowerCase();
  return REGION_RULES.find(([, pattern]) => pattern.test(haystack))?.[0] ?? 'northern-norway';
}

const publishedArticles = Object.values(articlesJson as Record<string, ArticleEntry>)
  .filter((a) => a.status === 'published')
  .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));

const toListItem = (a: ArticleEntry) => ({
  title: a.title,
  slug: a.slug,
  category: a.category,
  readTime: `${a.readTime ?? 5} min`,
  status: 'published' as const,
});

const categoryMeta = [
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
  },
  {
    id: 'planning',
    title: 'Planning Guides',
    description:
      'The logistics that make or break your trip, from the DNT cabin system to timing the Northern Lights season.',
    icon: Map,
    color: 'text-[#00D084]',
    bgColor: 'bg-emerald-50',
    borderHover: 'hover:border-[#00D084]/40',
    shadowHover: 'hover:shadow-[#00D084]/10',
    ctaColor: 'text-emerald-700',
  },
];

const categories = categoryMeta.map((cat) => {
  const entries = publishedArticles.filter((a) => SECTION_CATEGORIES[cat.id].includes(a.category));
  return {
    ...cat,
    articles: entries.map(toListItem),
    tripReports: entries.map((a) => ({ ...toListItem(a), region: tripReportRegion(a) })),
  };
});

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
          item: 'https://norgetravel.com/travel-guides',
        },
      ],
    },
    {
      '@type': 'CollectionPage',
      name: 'Travel Guides | NorgeTravel.com',
      description:
        'Expert travel guides for Norge. Safety, trip reports, and planning guides.',
      url: 'https://norgetravel.com/travel-guides',
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
      <section className="relative overflow-hidden bg-slate-900 text-white -mt-20 pt-20 z-10">
        <Image
          src="/images/guides/guides_banner.jpg"
          alt="Norway travel guides — mountain, fjord, and Arctic landscapes"
          fill
          className="object-cover opacity-50"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/50 to-slate-900/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 py-32 lg:py-40 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/10 text-white text-sm font-bold uppercase tracking-wide mb-6 backdrop-blur-sm">
            <BookOpen className="w-4 h-4" aria-hidden="true" />
            Expert guides
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Norge travel guides
          </h1>
          <p className="text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto">
            The knowledge that separates a good trip from a ruined itinerary. Safety rules, real trip reports, and the logistics detail that Google Maps leaves out.
          </p>
        </div>
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
                {cat.id === 'trip-reports' ? (
                  <TripReportsTabs
                    categoryId={cat.id}
                    articles={cat.tripReports}
                  />
                ) : (
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
                        <Link
                          href={`/travel-guides/${article.category}/${article.slug}`}
                          className={`inline-flex items-center gap-1 text-xs font-bold ${cat.ctaColor} hover:gap-2 transition-all`}
                        >
                          Read guide
                          <ArrowRight className="w-3 h-3" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                )}
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
