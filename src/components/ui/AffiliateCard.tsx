import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AffiliateCardProps {
  /** Partner name */
  name: string;
  /** e.g. "🎟️" or an image src */
  icon?: string;
  /** Short one-liner description */
  description: string;
  /** Commission rate string, e.g. "7%" or "8%–10%" */
  commission: string;
  /** Cookie window, e.g. "30 days" or "364 days" */
  cookie?: string;
  /** Approval difficulty label */
  approval?: 'Easy' | 'Fast' | 'Manual';
  /** Target market label */
  targetMarket?: string;
  /** Affiliate sign-up URL (external) */
  signUpUrl?: string;
  /** Internal content link */
  contentLink?: string;
  contentLinkText?: string;
  /** Visual highlight */
  featured?: boolean;
  className?: string;
}

/**
 * AffiliateCard — NorgeTravel design system
 *
 * Displays a single affiliate program with key metrics.
 *
 * Usage:
 *   <AffiliateCard
 *     name="GetYourGuide"
 *     icon="🎟️"
 *     description="Global activity aggregator — thousands of Tromsø aurora tours."
 *     commission="7%"
 *     cookie="30 days"
 *     approval="Easy"
 *     targetMarket="All travellers"
 *     signUpUrl="https://partner.getyourguide.com/"
 *     featured
 *   />
 */
export function AffiliateCard({
  name,
  icon,
  description,
  commission,
  cookie,
  approval,
  targetMarket,
  signUpUrl,
  contentLink,
  contentLinkText = 'Read our review',
  featured = false,
  className,
}: AffiliateCardProps) {
  const approvalColor: Record<string, string> = {
    Easy: 'bg-green-100 text-green-700',
    Fast: 'bg-blue-100 text-blue-700',
    Manual: 'bg-amber-100 text-amber-700',
  };

  return (
    <div
      className={cn(
        'relative rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5',
        featured
          ? 'border-[#1B3A5C]/30 ring-1 ring-[#1B3A5C]/20'
          : 'border-slate-200',
        className,
      )}
    >
      {/* Featured badge */}
      {featured && (
        <div className="absolute -top-3 left-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] text-white shadow-sm">
            Top pick
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {icon && (
          <span className="text-3xl flex-shrink-0 leading-none">{icon}</span>
        )}
        <div>
          <h3 className="font-bold text-slate-900 text-lg leading-tight">{name}</h3>
          {targetMarket && (
            <p className="text-xs text-slate-400 mt-0.5">{targetMarket}</p>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 leading-relaxed mb-5">{description}</p>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="text-center p-2 bg-[#1B3A5C]/5 rounded-xl">
          <p className="text-xs text-slate-500 mb-1">Commission</p>
          <p className="font-bold text-[#1B3A5C] text-sm">{commission}</p>
        </div>
        {cookie && (
          <div className="text-center p-2 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-500 mb-1">Cookie</p>
            <p className="font-semibold text-slate-700 text-sm">{cookie}</p>
          </div>
        )}
        {approval && (
          <div className="text-center p-2 bg-slate-50 rounded-xl">
            <p className="text-xs text-slate-500 mb-1">Approval</p>
            <span className={cn('inline-block px-2 py-0.5 rounded-full text-xs font-semibold', approvalColor[approval] ?? 'bg-slate-100 text-slate-600')}>
              {approval}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        {signUpUrl && (
          <a
            href={signUpUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-[#1B3A5C] to-[#00CC6A] hover:shadow-md hover:shadow-[#1B3A5C]/20 transition-all"
          >
            Join program
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
        {contentLink && (
          <Link
            href={contentLink}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-[#1B3A5C] border border-[#1B3A5C]/20 hover:bg-[#1B3A5C]/5 transition-colors group"
          >
            {contentLinkText}
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  );
}
