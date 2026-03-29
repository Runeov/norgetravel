'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BookOpen,
  MapPin,
  ChevronRight,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: 'Ansatte',
    href: '/admin/employees',
    icon: <Users className="w-5 h-5" />,
    children: [
      { label: 'Alle ansatte', href: '/admin/employees' },
      { label: 'Ny ansatt', href: '/admin/employees/new' },
    ],
  },
  {
    label: 'Artikler',
    href: '/admin/articles',
    icon: <FileText className="w-5 h-5" />,
    children: [
      { label: 'Alle artikler', href: '/admin/articles' },
      { label: 'Ny artikkel', href: '/admin/articles/new' },
    ],
  },
  {
    label: 'Kunnskapsbank',
    href: '/admin/kunnskapsbank',
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    label: 'Travel Map',
    href: '/admin/travel',
    icon: <MapPin className="w-5 h-5" />,
    children: [
      { label: 'Overview', href: '/admin/travel' },
      { label: 'Transport', href: '/admin/travel/transport' },
      { label: 'Accommodation', href: '/admin/travel/accommodation' },
      { label: 'Guides', href: '/admin/travel/guides' },
      { label: 'Experiences', href: '/admin/travel/experiences' },
      { label: 'Restaurants', href: '/admin/travel/restaurants' },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    if (href === '/admin/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };
  
  const isChildActive = (href: string) => pathname === href;
  
  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-100">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E86C1F] to-[#F4B223] flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <span className="font-bold text-slate-900">Averdi</span>
            <span className="text-xs text-slate-500 block">Admin Panel</span>
          </div>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive(item.href)
                  ? "bg-[#E86C1F]/10 text-[#E86C1F]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {item.icon}
              <span className="flex-1">{item.label}</span>
              {item.children && (
                <ChevronRight 
                  className={cn(
                    "w-4 h-4 transition-transform",
                    isActive(item.href) && "rotate-90"
                  )} 
                />
              )}
            </Link>
            
            {/* Children */}
            {item.children && isActive(item.href) && (
              <div className="ml-8 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200",
                      isChildActive(child.href)
                        ? "text-[#E86C1F] font-medium"
                        : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    {child.label.includes('Ny') ? (
                      <Plus className="w-3 h-3" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50" />
                    )}
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-slate-100">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <span>← Tilbake til nettsiden</span>
        </Link>
      </div>
    </aside>
  );
}
