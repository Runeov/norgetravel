'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  Calendar,
  Mountain,
  Ship,
  ArrowRight,
  ExternalLink,
  Star,
  UtensilsCrossed,
  Footprints,
  TrendingUp,
  Ruler,
  Snowflake,
  ShieldAlert,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityGuide {
  title: string;
  description: string;
  duration: string;
  price: string;
  season: string;
  icon: React.ReactNode;
  href: string;
  linkLabel: string;
  isExternal?: boolean;
  bookingUrl?: string;
}

interface Trail {
  name: string;
  distance: string;
  elevation: string;
  time: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  description: string;
  slug?: string;
}

interface Tour {
  name: string;
  type: string;
  price: string;
  duration: string;
  highlight: string;
  affiliateUrl: string;
}

interface Restaurant {
  name: string;
  cuisine: string;
  priceRange: string;
  highlight: string;
  norgetravelRating?: number;
}

const featuredGuides: ActivityGuide[] = [
  {
    title: 'Platåberget plateau hike',
    description:
      'The 450m plateau directly above Longyearbyen. 7 km round trip, 4–5 hours, DNT Blue. Still legally requires polar bear protection under Sysselmesteren rules — guided or with a rifle and trained carrier.',
    duration: '4–5 hours',
    price: 'From 990 NOK (guided)',
    season: 'Jun–Sep',
    icon: <Mountain className="w-5 h-5" aria-hidden="true" />,
    href: '/kunnskapsbank/trip-reports/plataberget-longyearbyen-svalbard',
    linkLabel: 'Read the trail guide',
  },
  {
    title: 'Polar bear safety briefing',
    description:
      'Before you leave the Longyearbyen settlement limit, you need either a licensed guide or your own rifle with a trained carrier. Signal pistol is minimum. Svalbard Skytterlag rents rifles to qualified visitors. This is law, not recommendation.',
    duration: '1 hour briefing',
    price: 'Free at Sysselmesteren',
    season: 'Year-round',
    icon: <ShieldAlert className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.sysselmesteren.no/en/travel-in-svalbard/',
    linkLabel: 'Read the regulation',
    isExternal: true,
  },
  {
    title: 'Northern Lights from 78°N',
    description:
      'Svalbard is the only populated place on earth where the aurora appears during daylight hours in polar night. Late October to mid-February. Step outside the Longyearbyen light dome or book a snowcat/dogsled operator.',
    duration: '3–5 hours',
    price: 'From 1,890 NOK',
    season: 'Oct 26 – Feb 15',
    icon: <Snowflake className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/longyearbyen-l97776/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Check availability',
    isExternal: true,
  },
  {
    title: 'Isfjord boat expedition to Pyramiden',
    description:
      'Full-day boat from Longyearbyen to the abandoned Soviet mining settlement of Pyramiden. 6–8 hours on the water, glacier fronts, belugas and walrus if you are lucky. Summer only (May–Sep).',
    duration: 'Full day',
    price: 'From 2,890 NOK',
    season: 'May–Sep',
    icon: <Ship className="w-5 h-5" aria-hidden="true" />,
    href: 'https://www.getyourguide.com/longyearbyen-l97776/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
    linkLabel: 'Check availability',
    isExternal: true,
  },
];

const tours: Tour[] = [
  {
    name: 'Platåberget guided hike',
    type: 'Day hike, DNT Blue',
    price: 'From 990 NOK',
    duration: '4–5 hours',
    highlight:
      'Licensed guide with rifle, standard Svalbard summer start. Small groups, 07:30 or 13:00 departures from Longyearbyen. Includes polar bear safety briefing and the logistics you cannot self-organize.',
    affiliateUrl:
      'https://www.getyourguide.com/longyearbyen-l97776/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Polar bear and glacier snowmobile safari',
    type: 'Winter expedition, full day',
    price: 'From 3,990 NOK',
    duration: '8–10 hours',
    highlight:
      'Snowmobile across the ice plateau toward the east coast. No polar bear sighting guaranteed — this is wildlife observation, not a zoo. Licensed guide, armed. Full thermal gear included.',
    affiliateUrl:
      'https://www.getyourguide.com/longyearbyen-l97776/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Dog sledding with aurora',
    type: 'Winter, 3–4 hours',
    price: 'From 2,190 NOK',
    duration: '3–4 hours',
    highlight:
      'Kennels at Bolterdalen, 15 minutes out of Longyearbyen. Evening runs during polar night chase the aurora away from the settlement light dome. Thermal suits, boots, and overmitts included.',
    affiliateUrl:
      'https://www.getyourguide.com/longyearbyen-l97776/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
  {
    name: 'Pyramiden day cruise',
    type: 'Boat expedition, full day',
    price: 'From 2,890 NOK',
    duration: '10 hours',
    highlight:
      'MS Billefjord sails north from Longyearbyen across Isfjord, past Nordenskiöldbreen glacier front, to the abandoned Soviet mining town of Pyramiden. Guided tour of the settlement, lunch on board.',
    affiliateUrl:
      'https://www.getyourguide.com/longyearbyen-l97776/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-middle',
  },
];

const trails: Trail[] = [
  {
    name: 'Platåberget plateau',
    distance: '7 km round trip',
    elevation: '450 m',
    time: '4–5 hours',
    difficulty: 'Easy',
    description:
      'The 450m plateau directly above Longyearbyen. Steep 300m ascent from Nybyen, then gentle plateau walking. DNT Blue. Still legally requires polar bear protection under Sysselmesteren rules.',
    slug: 'plataberget-longyearbyen-svalbard',
  },
  {
    name: 'Sarkofagen via Longyearbreen',
    distance: '10 km round trip',
    elevation: '750 m',
    time: '6–8 hours',
    difficulty: 'Moderate',
    description:
      'The classic Longyearbyen day hike. Up Longyearbreen glacier moraine to the 862m Sarkofagen summit. Crampons not required in summer but recommended. DNT Blue–Red. Guided only.',
    slug: 'sarkofagen-longyearbyen-svalbard',
  },
  {
    name: 'Trollsteinen ridge extension',
    distance: '14 km round trip',
    elevation: '850 m',
    time: '8–10 hours',
    difficulty: 'Hard',
    description:
      'Extension beyond Sarkofagen onto the 853m Trollsteinen ridge. Exposed scrambling, glacier crossing. Full Fjellvettreglene protocol. DNT Red. Guided only, weather-dependent.',
    slug: 'trollsteinen-longyearbyen-svalbard',
  },
  {
    name: 'Hiorthfjellet across Adventfjorden',
    distance: '14 km round trip',
    elevation: '925 m',
    time: 'Full day',
    difficulty: 'Hard',
    description:
      'The 925m peak facing Longyearbyen across the fjord. Boat transfer to the trailhead, climb from sea level, back before last pickup. DNT Red. Guided only. Svalbard\'s most logistically complex day hike.',
    slug: 'hiorthfjellet-adventfjorden-svalbard',
  },
];

const restaurants: Restaurant[] = [
  {
    name: 'Huset',
    cuisine: 'Fine dining, Arctic ingredients',
    priceRange: 'From 1,490 NOK tasting menu',
    highlight:
      'The historic mess hall of the mining era, now one of the world\'s northernmost fine dining rooms. Seven-course tasting menu built around Svalbard reindeer, Arctic char, and foraged herbs. Wine cellar holds 20,000 bottles.',
    norgetravelRating: 8.8,
  },
  {
    name: 'Gruvelageret',
    cuisine: 'Arctic bistro',
    priceRange: '450–650 NOK mains',
    highlight:
      'Converted mining warehouse in Nybyen, at the foot of the Longyearbreen valley. Grilled reindeer, Arctic char, and whale steak. Practical, unfussy, and walking distance from the Platåberget trailhead.',
    norgetravelRating: 8.4,
  },
  {
    name: 'Stationen',
    cuisine: 'Modern Norwegian',
    priceRange: '320–480 NOK mains',
    highlight:
      'Old cableway station on the hillside above town. Reindeer burger, cod cheeks, locally brewed Svalbardbryggeri beer. Windows look out over Adventfjorden, the same water that got you here.',
    norgetravelRating: 7.9,
  },
  {
    name: 'Kroa',
    cuisine: 'Pub, Svalbard reindeer',
    priceRange: '280–420 NOK mains',
    highlight:
      'Longyearbyen\'s working pub. Timbered interior salvaged from the Russian settlement at Grumant. Reindeer stew, local beer on tap, and the only place in town where you can reliably meet the guides before their next departure.',
    norgetravelRating: 7.6,
  },
];

const tabs = [
  { id: 'featured', label: 'Featured', icon: Star },
  { id: 'tours', label: 'Tours', icon: Ship },
  { id: 'hiking', label: 'Hiking', icon: Footprints },
  { id: 'eat', label: 'Where to eat', icon: UtensilsCrossed },
] as const;

type TabId = (typeof tabs)[number]['id'];

const difficultyColor: Record<Trail['difficulty'], string> = {
  Easy: 'bg-emerald-100 text-emerald-800',
  Moderate: 'bg-amber-100 text-amber-800',
  Hard: 'bg-red-100 text-red-800',
};

export function SvalbardActivities() {
  const [activeTab, setActiveTab] = useState<TabId>('featured');

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Mountain className="w-6 h-6 text-[#1A365D]" aria-hidden="true" />
        <h2 className="text-3xl font-bold text-slate-900">What to do in Svalbard</h2>
      </div>
      <div className="max-w-3xl space-y-4 mb-8">
        <p className="text-slate-600 leading-relaxed">
          Svalbard sits at 74–81°N. Four months of polar night, four months of midnight sun, and
          roughly 3,000 polar bears against 2,600 humans. Outside the Longyearbyen settlement
          limit you are legally required to carry polar bear protection — either as a licensed
          guide or as a qualified rifle carrier. Every activity below respects that rule.
        </p>
        <div className="bg-[#D32F2F]/10 border-l-4 border-[#D32F2F] p-4 rounded-r-md">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#D32F2F] mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-bold text-[#D32F2F] text-sm">Sysselmesteren polar bear rule</p>
              <p className="text-slate-700 text-sm mt-1">
                Signal pistol is the legal minimum outside Longyearbyen. A rifle with a trained
                carrier is the working standard. Svalbard Skytterlag rents rifles to qualified
                visitors. Book a licensed guide if you are not certified.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8" role="tablist">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors min-h-[44px]',
                isActive
                  ? 'bg-[#1A365D] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#1A365D]/40 hover:text-[#1A365D]'
              )}
            >
              <Icon className="w-4 h-4" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div>
        {activeTab === 'featured' && (
          <div className="grid sm:grid-cols-2 gap-6">
            {featuredGuides.map((guide) => (
              <div
                key={guide.title}
                className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1A365D]/10 flex items-center justify-center shrink-0 text-[#1A365D]">
                    {guide.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 pt-1">{guide.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{guide.description}</p>
                <div className="flex flex-wrap gap-3 text-xs mb-4">
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {guide.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                    {guide.price}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    {guide.season}
                  </span>
                </div>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  {guide.isExternal ? (
                    <a
                      href={guide.href}
                      rel="noopener noreferrer sponsored"
                      target="_blank"
                      className="inline-flex items-center gap-1 text-sm font-bold text-[#1A365D] hover:text-[#00D084] transition-colors"
                    >
                      {guide.linkLabel}
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      href={guide.href}
                      className="inline-flex items-center gap-1 text-sm font-bold text-[#1A365D] hover:text-[#00D084] transition-colors"
                    >
                      {guide.linkLabel}
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tours' && (
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {tours.map((tour) => (
                <div
                  key={tour.name}
                  className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-1">{tour.name}</h3>
                    <p className="text-xs text-slate-500 mb-3">{tour.type}</p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">{tour.highlight}</p>
                    <div className="flex flex-wrap gap-3 text-xs mb-4">
                      <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {tour.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                        {tour.price}
                      </span>
                    </div>
                  </div>
                  <div className="mt-auto pt-3 border-t border-slate-100">
                    <a
                      href={tour.affiliateUrl}
                      rel="noopener noreferrer sponsored"
                      target="_blank"
                      className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] rounded-md hover:shadow-lg hover:shadow-[#1B3A5C]/20 hover:-translate-y-0.5 transition-all min-h-[44px]"
                    >
                      Check availability
                      <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a
                href="https://www.getyourguide.com/longyearbyen-l97776/?partner_id=5DXMTLJ&utm_medium=online_publisher&placement=content-end"
                rel="noopener noreferrer sponsored"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#1A365D] hover:text-[#00D084] transition-colors min-h-[44px]"
              >
                View all Svalbard tours on GetYourGuide
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}

        {activeTab === 'hiking' && (
          <div className="grid sm:grid-cols-2 gap-6">
            {trails.map((trail) => (
              <div
                key={trail.name}
                className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold text-slate-800">{trail.name}</h3>
                  <span
                    className={cn(
                      'inline-flex items-center px-2 py-1 rounded-sm text-xs font-bold uppercase tracking-wide shrink-0',
                      difficultyColor[trail.difficulty]
                    )}
                  >
                    {trail.difficulty}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{trail.description}</p>
                <div className="mt-auto flex flex-wrap items-center gap-3 text-xs pt-3 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                    <Ruler className="w-3 h-3" aria-hidden="true" />
                    {trail.distance}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                    <TrendingUp className="w-3 h-3" aria-hidden="true" />
                    {trail.elevation}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-slate-600 font-medium">
                    <Clock className="w-3 h-3" aria-hidden="true" />
                    {trail.time}
                  </span>
                  {trail.slug && (
                    <Link
                      href={`/kunnskapsbank/trip-reports/${trail.slug}`}
                      className="inline-flex items-center gap-1 ml-auto text-xs font-bold text-[#1A365D] hover:text-[#00D084] transition-colors"
                    >
                      Read guide
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'eat' && (
          <div className="grid sm:grid-cols-2 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.name}
                className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1A365D]/10 flex items-center justify-center shrink-0 text-[#1A365D]">
                    <UtensilsCrossed className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-bold text-slate-800">{restaurant.name}</h3>
                      {restaurant.norgetravelRating !== undefined && (
                        <span
                          className="inline-flex items-center gap-1 bg-[#1A365D] text-white px-2 py-0.5 rounded-sm text-xs font-bold shrink-0"
                          title="NorgeTravel rating (out of 10)"
                        >
                          <Star className="w-3 h-3 fill-current" aria-hidden="true" />
                          {restaurant.norgetravelRating.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 capitalize">{restaurant.cuisine}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">{restaurant.highlight}</p>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-sm text-xs text-slate-600 font-medium">
                    {restaurant.priceRange}
                  </span>
                  {restaurant.norgetravelRating !== undefined && (
                    <span className="text-[10px] uppercase tracking-wide text-slate-400 font-medium">
                      NorgeTravel rated
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
