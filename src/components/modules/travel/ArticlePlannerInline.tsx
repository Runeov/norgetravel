import Link from '@/components/LocalizedLink';
import { ArrowRight, Map as MapIcon } from 'lucide-react';
import { plannerBlockHref, type PlannerBlock } from '@/lib/article-blocks';
import { mapZones } from '@/data/norway-map-zones';

// Region names as the zh and ja home pages write them
const ZONE_NAMES: Record<'zh' | 'ja', Record<string, string>> = {
  zh: { 'northern-norway': '挪威北部', lofoten: '罗弗敦群岛', fjords: '峡湾', svalbard: '斯瓦尔巴群岛', cities: '挪威城市', 'boat-routes': '海岸航线' },
  ja: { 'northern-norway': '北ノルウェー', lofoten: 'ロフォーテン諸島', fjords: 'フィヨルド', svalbard: 'スバールバル諸島', cities: 'ノルウェーの都市', 'boat-routes': '沿岸航路' },
};

const COPY = {
  en: {
    label: 'Plan this trip',
    body: (regions: string) => `Open the trip planner with ${regions} already set. Add dates and it lays out the light, the season and the route between stops.`,
    cta: 'Open the planner',
    and: ' and ',
  },
  zh: {
    label: '规划这趟行程',
    body: (regions: string) => `打开行程规划工具，已预设${regions}。填入日期，它会列出光照、季节和各站之间的路线。`,
    cta: '打开规划工具',
    and: '和',
  },
  ja: {
    label: 'この旅を計画する',
    body: (regions: string) => `${regions}を設定済みでトリッププランナーを開きます。日付を入れると、日照、季節、各地点間のルートを表示します。`,
    cta: 'プランナーを開く',
    and: 'と',
  },
} as const;

/** The planner link an article places under its quick answer, set to the regions the article covers. */
export function ArticlePlannerInline({ block, lang, slug }: { block: PlannerBlock; lang: string; slug: string }) {
  const locale = lang === 'zh' || lang === 'ja' ? lang : 'en';
  const copy = COPY[locale];
  const regions = block.zones
    .map((id) => (locale === 'en' ? undefined : ZONE_NAMES[locale][id]) ?? mapZones.find((zone) => zone.id === id)?.name ?? id)
    .join(copy.and);

  return (
    <aside
      aria-label={copy.label}
      className="not-prose my-8 flex flex-col gap-4 rounded-lg border border-[#1A365D]/15 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
    >
      <MapIcon className="hidden h-6 w-6 shrink-0 text-[#1A365D] sm:block" aria-hidden="true" />
      <div className="flex-1">
        <p className="text-sm font-bold uppercase tracking-wide text-[#1A365D]">{copy.label}</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-600">{copy.body(regions)}</p>
      </div>
      <Link
        href={plannerBlockHref(block)}
        data-analytics-event="trip_planner_opened"
        data-analytics-placement="article_planner_inline"
        data-analytics-target={slug}
        className="group inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md bg-[#00D084] px-5 py-2.5 text-sm font-bold text-[#1A365D] transition-colors hover:bg-[#00B875] focus:outline-none focus:ring-2 focus:ring-[#00D084] focus:ring-offset-2"
      >
        {copy.cta}
        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </aside>
  );
}
