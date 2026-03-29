'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { TRAVEL_CATEGORIES } from '@/lib/schemas/travel.shared';

const tabs = [
  { href: '/admin/travel', label: 'Overview', emoji: '📊' },
  ...TRAVEL_CATEGORIES.map((cat) => ({
    href: `/admin/travel/${cat.slug}`,
    label: cat.label,
    emoji: cat.emoji,
  })),
];

export default function AdminTravelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isTabActive = (href: string) => {
    if (href === '/admin/travel') {
      return pathname === '/admin/travel';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Travel Map</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage travel listings across all categories
        </p>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-1 overflow-x-auto pb-px -mb-px">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200',
                isTabActive(tab.href)
                  ? 'border-[#1B3A5C] text-[#1B3A5C]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              )}
            >
              <span>{tab.emoji}</span>
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
