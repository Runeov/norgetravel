import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { ArrowRight } from 'lucide-react';
import type { SiteSeason } from '@/lib/season';
import type { HomeCopy } from '@/i18n/home-copy';

// Text per locale comes from HOME_COPY (src/i18n/home-copy.ts)
const destinations = [
  { slug: 'northern-norway', image: '/pics/Tromso/tromso_banner.jpeg' },
  { slug: 'lofoten', image: '/images/lofoten/landscapes/lofoten-landscape-hero_jorn-eriksen.jpg' },
  { slug: 'fjords', image: '/images/narvik/fjord-railway/ofoten-railway-fjord_christina-myrland.jpg' },
  { slug: 'svalbard', image: '/images/svalbard/landscapes/svalbard-landscape_emilien-gigandet-2.jpg' },
  { slug: 'cities', image: '/pics/cities/Bergen_banner.jpeg' },
] as const;

export default function DestinationsTeaser({ copy, season = 'summer' }: { copy: HomeCopy['destinations']; season?: SiteSeason }) {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A365D] mb-2">
              {copy.heading}
            </h2>
            <p className="text-slate-600 text-lg">
              {copy.intro}
            </p>
          </div>
          <Link
            href="/destinations"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#1A365D] hover:text-[#00D084] transition-colors"
          >
            {copy.all}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {destinations.map((dest) => {
            const text = copy.items[dest.slug];
            const seasonal = (season === 'winter' && text.winter) || text;
            return (
              <Link
                key={dest.slug}
                href={`/destinations/${dest.slug}`}
                className="group relative aspect-[3/4] rounded-lg overflow-hidden bg-slate-200"
              >
                <Image
                  src={dest.image}
                  alt={copy.alt.replace('{name}', text.name)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-xs text-white/60 font-medium uppercase tracking-wide">
                    {seasonal.tagline}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-2">{text.name}</h3>
                  <span className="text-sm text-white/80">{seasonal.stat}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1A365D] hover:text-[#00D084] transition-colors min-h-[44px]"
          >
            {copy.all}
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
