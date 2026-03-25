import { cn } from '@/lib/utils';

export interface ComparisonRow {
  /** Partner / operator name */
  name: string;
  /** e.g. "CJ Affiliate" | "Internal" | "Awin" */
  network?: string;
  /** e.g. "8% – 10%" */
  commission: string;
  /** e.g. "30 days" */
  cookie?: string;
  /** Short niche description */
  niche: string;
  /** Highlight this row (e.g. recommended partner) */
  featured?: boolean;
}

interface ComparisonTableProps {
  rows: ComparisonRow[];
  caption?: string;
  className?: string;
}

/**
 * ComparisonTable — NorgeTravel design system
 *
 * Usage:
 *   <ComparisonTable
 *     caption="Northern Lights tour affiliate programs"
 *     rows={[
 *       { name: 'GetYourGuide', network: 'Awin', commission: '7%', cookie: '30 days', niche: 'Global activity aggregator', featured: true },
 *       { name: 'Viator', network: 'CJ / Impact', commission: '8%–10%', cookie: '30 days', niche: 'TripAdvisor-owned tours' },
 *     ]}
 *   />
 */
export function ComparisonTable({ rows, caption, className }: ComparisonTableProps) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-2xl border border-slate-200 shadow-sm', className)}>
      <table className="w-full text-sm text-left">
        {caption && (
          <caption className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 border-b border-slate-200">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="bg-[#1B3A5C] text-white">
            <th scope="col" className="px-4 py-3 font-semibold rounded-tl-2xl">Partner</th>
            <th scope="col" className="px-4 py-3 font-semibold">Network</th>
            <th scope="col" className="px-4 py-3 font-semibold">Commission</th>
            <th scope="col" className="px-4 py-3 font-semibold">Cookie</th>
            <th scope="col" className="px-4 py-3 font-semibold rounded-tr-2xl">Niche</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr
              key={row.name}
              className={cn(
                'transition-colors',
                row.featured
                  ? 'bg-[#00CC6A]/8 hover:bg-[#00CC6A]/12'
                  : 'bg-white hover:bg-slate-50',
              )}
            >
              <td className="px-4 py-3 font-semibold text-slate-900 flex items-center gap-2">
                {row.featured && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#00CC6A]/20 text-[#007a40]">
                    Top pick
                  </span>
                )}
                {row.name}
              </td>
              <td className="px-4 py-3 text-slate-500">{row.network ?? '—'}</td>
              <td className="px-4 py-3 font-medium text-[#1B3A5C]">{row.commission}</td>
              <td className="px-4 py-3 text-slate-500">{row.cookie ?? '—'}</td>
              <td className="px-4 py-3 text-slate-600">{row.niche}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
