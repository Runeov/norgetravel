import Image from 'next/image';
import type { Listing } from '@/lib/app/model';
import { categoryHue, categoryIcon } from './category-style';

/**
 * The image area of an app card. Most listings have no photo, so those get a
 * poster built from their category: a tinted gradient and the category icon.
 * Fills its positioned parent.
 */
export function Poster({
  listing,
  sizes,
  priority = false,
  iconSize = 'h-24 w-24',
}: {
  listing: Pick<Listing, 'imageUrl' | 'imageAlt' | 'name' | 'category'>;
  sizes: string;
  priority?: boolean;
  iconSize?: string;
}) {
  if (listing.imageUrl) {
    return (
      <Image
        src={listing.imageUrl}
        alt={listing.imageAlt || listing.name}
        fill
        sizes={sizes}
        priority={priority}
        quality={75}
        className="object-cover"
      />
    );
  }

  const Icon = categoryIcon(listing.category);
  const hue = categoryHue(listing.category);
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(110% 80% at 18% 12%, hsl(${hue} 55% 44% / 0.9), transparent 62%), linear-gradient(160deg, hsl(${hue} 42% 24%), hsl(${hue} 35% 11%))`,
      }}
      aria-hidden="true"
    >
      <Icon className={`absolute bottom-5 right-5 text-white/25 ${iconSize}`} strokeWidth={1.1} />
    </div>
  );
}
