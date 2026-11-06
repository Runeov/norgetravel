import Image from 'next/image';
import logo from '@/assets/norgeTravel.png';
import { cn } from '@/lib/utils';

// The logo file is the full lockup (mark, wordmark and strapline) on a large
// transparent canvas. The mark occupies x 984–1832, y 296–944 of 2816 × 1536,
// so the image is scaled and offset inside a box the size of the mark.
const MARK = { x: 984, y: 296, width: 848, height: 648 };

/** The NorgeTravel mark in white, cropped from the logo lockup. */
export function NorgeMark({ height = 32, className }: { height?: number; className?: string }) {
  const scale = height / MARK.height;
  return (
    <span
      className={cn('app-mark relative inline-block shrink-0 overflow-hidden', className)}
      style={{ width: Math.round(MARK.width * scale), height }}
      aria-hidden="true"
    >
      <Image
        src={logo}
        alt=""
        width={Math.round(logo.width * scale)}
        height={Math.round(logo.height * scale)}
        className="absolute max-w-none brightness-0 invert"
        style={{ left: -MARK.x * scale, top: -MARK.y * scale }}
        priority
      />
    </span>
  );
}
