import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CTABannerProps {
  /** Main heading */
  headline: string;
  /** Supporting copy (optional) */
  subline?: string;
  /** Primary button label */
  primaryLabel: string;
  /** Primary button destination — use href for links, onPrimaryClick for scroll actions */
  primaryHref?: string;
  onPrimaryClick?: () => void;
  /** Secondary button label (optional) */
  secondaryLabel?: string;
  secondaryHref?: string;
  onSecondaryClick?: () => void;
  /** Visual variant */
  variant?: 'navy' | 'green' | 'gradient';
  className?: string;
}

/**
 * CTABanner — NorgeTravel design system
 *
 * Full-width call-to-action section. Drop into any page between content blocks.
 *
 * Usage:
 *   <CTABanner
 *     headline="Ready to chase the Northern Lights?"
 *     subline="Solar Cycle 25 peaks in 2026 — the best aurora decade in a generation."
 *     primaryLabel="Explore tours"
 *     primaryHref="/tjenester/northern-lights"
 *     secondaryLabel="Read our guide"
 *     secondaryHref="/kunnskapsbank"
 *     variant="gradient"
 *   />
 */
export function CTABanner({
  headline,
  subline,
  primaryLabel,
  primaryHref,
  onPrimaryClick,
  secondaryLabel,
  secondaryHref,
  onSecondaryClick,
  variant = 'gradient',
  className,
}: CTABannerProps) {
  const bgClass: Record<string, string> = {
    navy: 'bg-[#1B3A5C]',
    green: 'bg-[#00CC6A]',
    gradient: 'bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A]',
  };

  const textColor = variant === 'green' ? 'text-slate-900' : 'text-white';
  const sublineColor = variant === 'green' ? 'text-slate-700' : 'text-white/80';
  const secondaryClass =
    variant === 'green'
      ? 'border-slate-900/30 text-slate-900 hover:bg-slate-900/10'
      : 'border-white/30 text-white hover:bg-white/10';

  const PrimaryButton = primaryHref ? (
    <Link
      href={primaryHref}
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[#1B3A5C] bg-white hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group"
    >
      {primaryLabel}
      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
    </Link>
  ) : (
    <button
      onClick={onPrimaryClick}
      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[#1B3A5C] bg-white hover:bg-slate-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group"
    >
      {primaryLabel}
      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
    </button>
  );

  const SecondaryButton = secondaryLabel ? (
    secondaryHref ? (
      <Link
        href={secondaryHref}
        className={cn('inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border transition-all duration-300', secondaryClass)}
      >
        {secondaryLabel}
      </Link>
    ) : (
      <button
        onClick={onSecondaryClick}
        className={cn('inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border transition-all duration-300', secondaryClass)}
      >
        {secondaryLabel}
      </button>
    )
  ) : null;

  return (
    <section className={cn('relative overflow-hidden rounded-3xl', bgClass[variant], className)}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-8 py-16 text-center">
        <h2 className={cn('text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight', textColor)}>
          {headline}
        </h2>
        {subline && (
          <p className={cn('text-lg mb-10 max-w-2xl mx-auto', sublineColor)}>
            {subline}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {PrimaryButton}
          {SecondaryButton}
        </div>
      </div>
    </section>
  );
}
