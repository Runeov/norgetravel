import Image from 'next/image';
import Link from '@/components/LocalizedLink';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import { AddToTripButton } from '@/components/ui/AddToTripButton';
import type { ArticleCardData, PlaceCardData } from '@/lib/planner-data';

const CARD_IMAGE_SIZES = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';

const ARTICLE_KIND: Record<string, string> = {
  'trip-reports': 'Trip report',
  planning: 'Planning guide',
  safety: 'Safety guide',
};

/** A place inside a zone: a city, village or fjord with the way into its guide. */
export function PlaceCard({ place, zoneId }: { place: PlaceCardData; zoneId: string }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-40 bg-gradient-to-br from-[#1B3A5C] to-[#00CC6A]">
        {place.imageUrl && (
          <Image src={place.imageUrl} alt="" fill className="object-cover" sizes={CARD_IMAGE_SIZES} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-slate-800">{place.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 line-clamp-3">{place.summary}</p>
        {place.highlights.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {place.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#00CC6A]" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
          <AddToTripButton
            item={{
              id: place.id,
              name: place.name,
              category: 'cities',
              imageUrl: place.imageUrl,
              destination: zoneId,
              zone: zoneId,
              href: place.href,
              addedAt: '',
            }}
          />
          <Link
            href={place.href}
            className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-[#1B3A5C] transition-colors hover:text-[#00CC6A]"
          >
            Read the guide
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** A guide or trip report for the zone, with the option to keep it in the trip. */
export function ArticleCard({ article, zoneId }: { article: ArticleCardData; zoneId: string }) {
  const href = `/travel-guides/${article.category}/${article.slug}`;
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link href={href} className="group block">
        <div className="relative h-40 bg-slate-200">
          {article.featuredImage && (
            <Image
              src={article.featuredImage}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={CARD_IMAGE_SIZES}
            />
          )}
        </div>
        <div className="p-5 pb-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {ARTICLE_KIND[article.category] ?? 'Guide'}
            {article.authorName && <span className="normal-case tracking-normal"> · {article.authorName}</span>}
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-800 transition-colors group-hover:text-[#1B3A5C]">{article.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 line-clamp-2">{article.excerpt}</p>
        </div>
      </Link>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 p-5 pt-4">
        <AddToTripButton
          item={{
            id: `guide-${article.slug}`,
            name: article.title,
            category: 'guides',
            imageUrl: article.featuredImage,
            destination: zoneId,
            zone: zoneId,
            href,
            addedAt: '',
          }}
        />
        <span className="inline-flex items-center gap-1 text-sm text-slate-500">
          <Clock className="h-4 w-4" aria-hidden="true" />
          {article.readTime} min read
        </span>
      </div>
    </article>
  );
}
