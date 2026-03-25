import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
// Import the base components you provided
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card'; 

// This is where the specific coloring logic lives
const themeClasses = {
  blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
  green: 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white',
  orange: 'bg-orange-50 text-[#E86C1F] group-hover:bg-[#E86C1F] group-hover:text-white',
  gray: 'bg-slate-50 text-slate-600 group-hover:bg-slate-600 group-hover:text-white',
};

interface CategoryCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  theme?: keyof typeof themeClasses; // 'blue' | 'green' | 'orange' | 'gray'
  compact?: boolean;
  className?: string;
}

export function CategoryCard({
  title,
  description,
  href,
  icon: Icon,
  theme = 'blue', // Default theme
  compact = false,
  className,
}: CategoryCardProps) {
  return (
    <Link href={href} aria-label={`${title} — Les mer`} className={cn("group block h-full", className)}>
      <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-slate-300 relative overflow-hidden">
        
        <CardHeader className={cn("pb-2", compact ? "pt-5 px-5" : "pt-6 px-6")}>
          <div className="flex justify-between items-start">
            {/* Icon Box with Dynamic Theme */}
            <div className={cn(
              "rounded-lg transition-colors duration-200 flex items-center justify-center",
              compact ? "w-10 h-10 mb-3" : "w-12 h-12 mb-4",
              themeClasses[theme]
            )}>
              <Icon className={cn("w-5 h-5", compact ? "w-5 h-5" : "w-6 h-6")} aria-hidden="true" />
            </div>
            
            {/* Arrow that appears on hover */}
            <ArrowRight className="w-5 h-5 text-slate-300 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-slate-400" aria-hidden="true" />
          </div>

          <CardTitle className={cn("text-slate-900", compact ? "text-base" : "text-xl")}>
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className={cn("pt-0", compact ? "px-5 pb-5" : "px-6 pb-6")}>
          <CardDescription className={cn(compact ? "text-xs" : "text-sm", "line-clamp-3")}>
            {description}
          </CardDescription>
        </CardContent>
        
      </Card>
    </Link>
  );
}