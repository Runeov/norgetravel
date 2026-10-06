'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Calendar, 
  BookOpen, 
  Copy, 
  Check, 
  Eye, 
  Twitter, 
  Facebook, 
  Video, 
  Share2,
  Users,
  TrendingUp,
  MousePointerClick
} from 'lucide-react';
import ToggleKunnskapsbankPublishButton from '@/components/admin/ToggleKunnskapsbankPublishButton';
import type { KunnskapsbankSection } from '@/lib/schemas/travel-guides.schema';

interface ArticleData {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  publishedAt: string;
  readTime: number;
}

interface AdminTravelGuidesDashboardProps {
  sections: KunnskapsbankSection[];
  articles: Record<string, any>;
}

export default function AdminTravelGuidesDashboard({
  sections,
  articles,
}: AdminTravelGuidesDashboardProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'pipeline' | 'hubs'>('analytics');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewArticleId, setPreviewArticleId] = useState<string | null>(null);
  const [previewChannel, setPreviewChannel] = useState<'x' | 'reddit' | 'facebook' | 'tiktok'>('x');

  // Extract category IDs dynamically from the sections prop to keep it universal
  const categoryIds = sections.map((s) => s.id);

  // Filter articles by category
  const travelArticles = Object.values(articles).filter(
    (a: any) => categoryIds.includes(a.category)
  );

  // Social media mock metrics
  const totalStats = {
    clicks: '24,582',
    impressions: '380.4k',
    ctr: '6.46%',
    conversions: '1,284'
  };

  const platformPerformance = [
    { name: 'Reddit', clicks: 8912, impressions: 145000, ctr: '6.14%', eng: '412 comments', color: '#FF4500', bg: 'bg-[#FF4500]/10', hoverBg: 'hover:bg-[#FF4500]/20' },
    { name: 'TikTok / YouTube Shorts', clicks: 8345, impressions: 60200, ctr: '13.86%', eng: '1.2k shares', color: '#EE1D52', bg: 'bg-[#EE1D52]/10', hoverBg: 'hover:bg-[#EE1D52]/20' },
    { name: 'X (Twitter)', clicks: 4215, impressions: 112200, ctr: '3.75%', eng: '240 reposts', color: '#1DA1F2', bg: 'bg-[#1DA1F2]/10', hoverBg: 'hover:bg-[#1DA1F2]/20' },
    { name: 'Facebook', clicks: 3110, impressions: 63000, ctr: '4.93%', eng: '84 shares', color: '#1877F2', bg: 'bg-[#1877F2]/10', hoverBg: 'hover:bg-[#1877F2]/20' }
  ];

  // Prepared Social Media Posts
  const socialPosts: Record<string, Record<'x' | 'reddit' | 'facebook' | 'tiktok', string>> = {
    'winter-driving-norway-tires-chains-road-closures': {
      x: `1/ Planning a winter road trip to Norway? Google Maps won't tell you that the Rv55 pass closed in October and won't open until late May. Here are the brutal facts about Norwegian winter driving. 🧵\n\n2/ First: The Tire Law. From Nov 1, you must have winter tires with min 3mm tread depth. Police run checks, and wrong tires carry an immediate 8,500 NOK fine. M+S tires without the snowflake symbol (3PMSF) are illegal. Don't risk it.\n\n3/ Studded vs. Friction? If you are driving north of Narvik or across Lofoten, get studded tires (piggdekk) for black ice. In cities (Oslo, Bergen), piggfrie friction tires are best to avoid the daily studded tire fee (approx. 2,000 NOK/season).\n\n4/ Mountain Passes and Convoys. Passes like Hardangervidda (Rv7) or Strynefjellet (Rv15) switch to "kolonnekjøring" (convoy driving) in storms. You wait at a gate and follow a giant snowplough at 30km/h. Miss the schedule? You sleep in your car.\n\n5/ Carry this kit in the boot: snow chains, ice scraper, headlamp, tow rope, and warm blankets. Roadside rescue can take 4+ hours on remote passes at -20°C. Keep your fuel tank above half at all times.\n\n6/ Read our complete guide to winter driving, pass closures, and rental car tips: https://norgetravel.com/travel-guides/planning/winter-driving-norway-tires-chains-road-closures/`,
      reddit: `Title: A Mountain Guide's Checklist for Winter Driving in Norway (Tire Laws, Pass Closures, and Fines)\n\nEvery winter, tourists get stuck on mountain passes with summer tires or face immediate 8,500 NOK fines from Statens vegvesen. Norwegian winter driving is governed by specific laws and shaped by a road network that shuts down entire routes for months.\n\nHere is the reality check:\n- The Tire Law: Winter tires are mandatory from Nov 1 to the first Sunday after Easter. Minimum tread depth is 3 mm. M+S marked tires without the Three-Peak Mountain Snowflake (3PMSF) symbol are illegal.\n- Studded vs. Friction: Studded tires (piggdekk) are recommended north of Narvik and in Lofoten for coastal black ice. Friction tires (piggfrie) are best for salted city roads (Oslo, Bergen) to avoid the seasonal studded tire fees.\n- Seasonal Road Closures: Google Maps will regularly route you through closed passes. Routes like Rv55 (Sognefjellet) and Rv63 (Trollstigen) close in October/November and do not reopen until late May.\n- Convoy Driving (Kolonnekjoring): In heavy winds or blizzards, passes operate on a convoy system. You must follow a snowplough in a single line.\n\nRead the full breakdown: https://norgetravel.com/travel-guides/planning/winter-driving-norway-tires-chains-road-closures/`,
      facebook: `8,500 NOK. That is the fine Norwegian police hand out for inadequate winter tires. Before you book a rental car for a winter road trip, make sure you know the laws, the pass closures, and the safety kit you must carry. Read the local logistics guide: https://norgetravel.com/travel-guides/planning/winter-driving-norway-tires-chains-road-closures/`,
      tiktok: `[Hook]\n"Google Maps is going to lie to you about driving in Norway this winter..."\n\n[Body]\n"It will route you over the Rv55 mountain pass, not knowing it closed in October and won't open until June. If you show up at a roadside inspection with summer tires, the police will hand you an immediate 8,500 NOK fine.\nIn Norway, winter tires must have at least 3 mm of tread depth. And if you are crossing any mountain passes between November and April, carry snow chains in the boot and practice putting them on before you get stuck at -15°C."\n\n[Call to Action]\n"We put together the complete local guide listing every pass closure, tire rule, and emergency kit item. Hit the link in bio to read it before you rent your car."`
    },
    'allemannsretten-right-to-roam': {
      x: `1/ Norway lets you camp on land you don't own. That doesn't mean you can pitch a tent in someone's hay meadow. Allemannsretten (the right to roam) is a law, and its limits are just as legal. 🧵\n\n2/ Outfield vs infield. The right applies to uncultivated outfield (utmark): mountains, forest, bog, shoreline. Farmyards, fields, meadows and house plots are infield (innmark). No camping there without permission.\n\n3/ The 150-meter rule. Your tent must stand at least 150 m from any inhabited house or cabin. That's the minimum. If you disturb the people living there, you're still too close.\n\n4/ The 2-night limit. Two nights in one spot without the landowner's consent. The limit lifts in the high mountains and far from settlement.\n\n5/ The fire ban. 15 April to 15 September: no fires in or near forest and outfield without municipal permission. The only exception is where fire obviously can't spread, like bare sand at the water's edge.\n\n6/ Local bans. Lofoten bans camping year-round at Haukland beach, and from 1 May to 1 October at Reinebringen, Kalle and other marked sites. Read the sign before you unpack. Full guide: https://norgetravel.com/travel-guides/safety/allemannsretten-right-to-roam/`,
      reddit: `Title: The real rules of wild camping in Norway (Allemannsretten, straight from the law)\n\nWhat tourist blogs call "free camping anywhere" is regulated by the Outdoor Recreation Act of 1957 (friluftsloven). Here's what it actually says:\n\n- Infield vs outfield: you can camp on uncultivated outfield (utmark: mountains, forest, bog). Farmyards, fields, meadows and house plots are infield (innmark) and off-limits without permission.\n- The 150 m rule: your tent must stand at least 150 meters from the nearest inhabited house or cabin.\n- The 2-night rule: up to 2 nights in one spot without the landowner's consent. The limit lifts in the high mountains and far from settlement.\n- Fire ban: no fires in or near forest and outfield from 15 April to 15 September without municipal permission.\n- Lofoten: camping is banned year-round at Haukland beach, and from 1 May to 1 October at Reinebringen, Kalle and other marked sites.\n- Waste: pack it all out, including toilet paper.\n\nFull guide: https://norgetravel.com/travel-guides/safety/allemannsretten-right-to-roam/`,
      facebook: `Thinking of wild camping in Norway? Allemannsretten (the right to roam) lets you camp on land you don't own, within legal limits: 150 meters from houses, 2 nights per spot, no fires in or near forest from 15 April to 15 September, and marked camping bans in Lofoten. Read the rules before you pitch your tent: https://norgetravel.com/travel-guides/safety/allemannsretten-right-to-roam/`,
      tiktok: `[Hook]\n"The biggest myth about camping in Norway is that you can camp anywhere..."\n\n[Body]\n"It's called Allemannsretten, the right to roam, and it has legal limits. First: you can only camp on uncultivated land. Mountains and forest, not farm fields or yards. Second: your tent must stand at least 150 meters from any house or cabin. Third: two nights in one spot, then you need the landowner's permission. Fourth: from April 15 to September 15, no fires in or near forest. And in Lofoten, some beaches and trailheads ban camping outright."\n\n[Call to Action]\n"Read the full guide to Allemannsretten before you pitch your tent. Link in bio."`
    },
    'dnt-cabin-guide': {
      x: `1/ Norway has more than 600 DNT mountain cabins. At many of them you cook your own dinner, carry in firewood for the next guest and open the door with one standard key. Here's how the system works. 🧵\n\n2/ The DNT key is a member benefit. Join DNT (885 NOK/year for an adult in 2026) and pay a 100 NOK deposit, refunded when you hand it back. It opens most self-service and unstaffed cabins.\n\n3/ Three types: staffed (betjent) with dinner and breakfast, self-service (selvbetjent) with a pantry you pay for, and unstaffed (ubetjent) where you carry in every meal.\n\n4/ The routine: boots off at the door, sign the visitor log (besøksprotokollen) with your route, quiet hours 23:00 to 06:00, wash up, carry in firewood for the next guest, lock up.\n\n5/ You pay in the DNT app. It registers your night and your pantry food, and it works without mobile coverage.\n\n6/ Book staffed cabins early at hyttebestilling.dnt.no. Full guide: https://norgetravel.com/travel-guides/planning/dnt-cabin-guide/`,
      reddit: `Title: How Norway's DNT mountain cabins work (key, prices, booking and cabin rules)\n\nThe Norwegian Trekking Association (DNT) and its local associations run more than 600 cabins. Here's how the system operates:\n\n- The DNT key: self-service and unstaffed cabins are locked. Members get the standard DNT key for a 100 NOK refundable deposit. Adult membership is 885 NOK in 2026.\n- Three types:\n  1. Staffed (betjent): hosts cook dinner and breakfast. Most open late June to mid-September.\n  2. Self-service (selvbetjent): no staff, a pantry of tinned and dry food you pay for.\n  3. Unstaffed (ubetjent): no staff and no food. Carry in every meal.\n- Booking: hyttebestilling.dnt.no. Unbooked beds go first come, first served.\n- Payment: the DNT app, which works offline.\n- The routine: boots off, sign the visitor log with your route, quiet hours 23:00 to 06:00, carry in firewood for the next guest, close the gas, lock up.\n\nFull guide: https://norgetravel.com/travel-guides/planning/dnt-cabin-guide/`,
      facebook: `More than 600 mountain cabins and one standard key. Norway's DNT network runs on trust: you sign the log, pay in the app, wash up and carry in firewood for the next guest. Here's how to get the key, what a night costs in 2026 and how to book: https://norgetravel.com/travel-guides/planning/dnt-cabin-guide/`,
      tiktok: `[Hook]\n"One key opens most of Norway's 600-plus mountain cabins..."\n\n[Body]\n"It's the DNT key. Join the Norwegian Trekking Association, pay a 100 kroner deposit, and it's yours. Some cabins are staffed and serve dinner. At the self-service ones, you unlock the door, light the stove and cook from a pantry you pay for in the DNT app. The system works because everyone follows the routine: boots off, sign the visitor log, wash up, and carry in firewood for the next guest before you leave."\n\n[Call to Action]\n"Read our full guide on getting the key and booking your stay. Link in bio."`
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Social Impressions</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalStats.impressions}</span>
            <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-sm">+18.4%</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Link Clicks</span>
            <MousePointerClick className="w-4 h-4 text-[#00D084]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalStats.clicks}</span>
            <span className="text-xs text-[#00D084] font-bold bg-[#00D084]/10 px-1.5 py-0.5 rounded-sm">+12.1%</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Conversion Rate</span>
            <Users className="w-4 h-4 text-purple-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalStats.ctr}</span>
            <span className="text-xs text-purple-600 font-bold bg-purple-50 px-1.5 py-0.5 rounded-sm">+1.4%</span>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">DNT/Booking Leads</span>
            <Share2 className="w-4 h-4 text-orange-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalStats.conversions}</span>
            <span className="text-xs text-orange-600 font-bold bg-orange-50 px-1.5 py-0.5 rounded-sm">+8.2%</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-5 py-3 font-semibold text-sm transition-all relative ${
            activeTab === 'analytics'
              ? 'text-[#1A365D] border-b-2 border-[#1A365D]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Social Analytics
          </div>
        </button>
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`px-5 py-3 font-semibold text-sm transition-all relative ${
            activeTab === 'pipeline'
              ? 'text-[#1A365D] border-b-2 border-[#1A365D]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Staged Release & Social Previews
          </div>
        </button>
        <button
          onClick={() => setActiveTab('hubs')}
          className={`px-5 py-3 font-semibold text-sm transition-all relative ${
            activeTab === 'hubs'
              ? 'text-[#1A365D] border-b-2 border-[#1A365D]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Category Hubs
          </div>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'analytics' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main platform list */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Platform Performance</h2>
              <p className="text-xs text-slate-500">Traffic referrals from social media campaigns.</p>
            </div>
            
            <div className="space-y-4">
              {platformPerformance.map((plat) => (
                <div key={plat.name} className="flex flex-col space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: plat.color }}></span>
                      {plat.name}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {plat.clicks.toLocaleString()} clicks ({plat.ctr} CTR) • <span className="font-semibold text-slate-700">{plat.eng}</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ 
                        backgroundColor: plat.color,
                        width: `${(plat.clicks / 9000) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Performance charts via SVGs */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold text-slate-900">Campaign Traffic Trends</h3>
                <span className="text-xs text-slate-400">Last 7 Days (Indexed)</span>
              </div>
              <div className="h-48 w-full flex items-end">
                <svg className="w-full h-full" viewBox="0 0 600 200">
                  {/* Grid Lines */}
                  <line x1="50" y1="50" x2="550" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="50" y1="100" x2="550" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="50" y1="150" x2="550" y2="150" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="50" y1="190" x2="550" y2="190" stroke="#cbd5e1" strokeWidth="1.5" />
                  
                  {/* Area fill */}
                  <path 
                    d="M 50 190 Q 120 160 200 110 T 350 120 T 450 70 T 550 50 L 550 190 Z" 
                    fill="url(#gradient-area)" 
                    opacity="0.1" 
                  />
                  
                  {/* Line */}
                  <path 
                    d="M 50 190 Q 120 160 200 110 T 350 120 T 450 70 T 550 50" 
                    fill="none" 
                    stroke="#1A365D" 
                    strokeWidth="3.5" 
                    strokeLinecap="round" 
                  />

                  {/* Nodes */}
                  <circle cx="200" cy="110" r="5" fill="#00D084" stroke="#1A365D" strokeWidth="2" />
                  <circle cx="350" cy="120" r="5" fill="#00D084" stroke="#1A365D" strokeWidth="2" />
                  <circle cx="450" cy="70" r="5" fill="#00D084" stroke="#1A365D" strokeWidth="2" />
                  <circle cx="550" cy="50" r="6" fill="#1A365D" />

                  {/* Gradient definitions */}
                  <defs>
                    <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1A365D" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="flex justify-between text-xs text-slate-400 px-12 pt-2">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu (Winter Driving Launch)</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun (Today)</span>
              </div>
            </div>
          </div>

          {/* Quick tips & feedback */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Campaign Overview</h2>
              <p className="text-xs text-slate-500">Local feedback loops.</p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EE1D52]"></span>
                <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wide">Video Spikes CTR</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Short-form videos (TikTok & Shorts) generate the highest click-through rate (**13.8%**). The "8,500 NOK fine" winter driving hook drove a spike of 8k visits in 24 hours.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF4500]"></span>
                <h3 className="font-bold text-xs text-slate-800 uppercase tracking-wide">Reddit Value Loop</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Detailed value posts in `r/Norway` convert to direct booking queries. Keep the posts highly informative with bullet points, and link to the site at the bottom.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          {/* Main list of scheduled articles */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Release Pipeline & Social Assets</h2>
              <p className="text-xs text-slate-500">Staged publication slots and matching promotion templates.</p>
            </div>
            
            <div className="divide-y divide-slate-100">
              {travelArticles.map((article: any) => {
                const isPending = article.status === 'coming-soon';
                const hasSocials = socialPosts[article.slug];

                return (
                  <div key={article.slug} className="p-6 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-sm leading-snug">{article.title}</h3>
                        {isPending ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
                            Scheduled
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            Live
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        {isPending 
                          ? `Publish Date: ${new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
                          : 'Live Today'
                        } • Slug: <code className="bg-slate-50 px-1 py-0.5 rounded text-[11px] text-slate-600">{article.slug}</code>
                      </p>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto">
                      {hasSocials && (
                        <button
                          onClick={() => {
                            setPreviewArticleId(article.slug);
                            setPreviewChannel('x');
                          }}
                          className="px-3.5 py-2 border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 transition-all flex items-center gap-1.5"
                        >
                          <Share2 className="w-3.5 h-3.5 text-slate-500" />
                          Promo Copy
                        </button>
                      )}
                      
                      {!isPending ? (
                        <Link
                          href={`/travel-guides/${article.category}/${article.slug}`}
                          target="_blank"
                          className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View Page
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            alert('This button is an override. In production, updating the status in articles.json and pushing to GitHub will instantly publish and build this page.');
                          }}
                          className="px-3.5 py-2 bg-[#1A365D] hover:bg-[#2C5282] text-white rounded-lg text-xs font-bold transition-all"
                        >
                          Publish Instantly
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Social Promo Previews Overlay / Box */}
          {previewArticleId && socialPosts[previewArticleId] && (
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <button 
                  onClick={() => setPreviewArticleId(null)}
                  className="text-xs text-slate-400 hover:text-white font-bold"
                >
                  Close Preview
                </button>
              </div>

              <div>
                <h3 className="text-base font-bold text-white pr-20">
                  Ready-to-Use Social Copy: {travelArticles.find((a: any) => a.slug === previewArticleId)?.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">Copy and paste these templates to your social feeds.</p>
              </div>

              {/* Channel Selector */}
              <div className="flex gap-2 border-b border-slate-800 pb-3">
                <button
                  onClick={() => setPreviewChannel('x')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    previewChannel === 'x' ? 'bg-[#1DA1F2] text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Twitter className="w-3.5 h-3.5" />
                  X (Twitter) Thread
                </button>
                <button
                  onClick={() => setPreviewChannel('reddit')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    previewChannel === 'reddit' ? 'bg-[#FF4500] text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Reddit Post
                </button>
                <button
                  onClick={() => setPreviewChannel('facebook')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    previewChannel === 'facebook' ? 'bg-[#1877F2] text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Facebook className="w-3.5 h-3.5" />
                  Facebook Post
                </button>
                <button
                  onClick={() => setPreviewChannel('tiktok')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    previewChannel === 'tiktok' ? 'bg-[#EE1D52] text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  TikTok / Shorts Script
                </button>
              </div>

              {/* Promo Text Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 relative">
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleCopy(previewArticleId + '-' + previewChannel, socialPosts[previewArticleId][previewChannel])}
                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-xs font-bold transition-all flex items-center gap-1 text-slate-200"
                    title="Copy to clipboard"
                  >
                    {copiedId === (previewArticleId + '-' + previewChannel) ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy text
                      </>
                    )}
                  </button>
                </div>
                
                <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed pr-24 max-h-72 overflow-y-auto">
                  {socialPosts[previewArticleId][previewChannel]}
                </pre>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'hubs' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Category Hub Status</h2>
            <p className="text-xs text-slate-500">Toggle whether visitors can navigate to these sections.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Section
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Path
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-slate-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sections.map((section) => (
                  <tr
                    key={section.id}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900">{section.title}</p>
                          <p className="text-xs text-slate-500">{section.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs text-slate-600 font-mono bg-slate-50 px-1.5 py-0.5 rounded">{section.path}</code>
                    </td>
                    <td className="px-6 py-4">
                      {section.isPublished ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          Live
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                          Hidden
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-500">
                        {new Date(section.updatedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={section.path}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
                          title="Se på nettstedet"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <ToggleKunnskapsbankPublishButton
                          sectionId={section.id}
                          sectionTitle={section.title}
                          isPublished={section.isPublished}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// Minimal dummy component for lucide-react item
function ExternalLink(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}
