// Employee Types
export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  icon: 'briefcase' | 'graduation' | 'award' | 'star';
  highlight?: boolean;
}

export interface RelatedHub {
  title: string;
  link: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  office: string;
  description: string;
  longDescription: string;
  experience: string;
  specialties: string[];
  education: string[];
  languages: string[];
  workingHours: string;
  achievements: string[];
  clientTypes: string[];
  image?: string;
  relatedHubs?: RelatedHub[];
  timeline?: TimelineMilestone[];
  
  // Admin fields
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

// Article Types
export type ArticleCategory =
  | 'artikler'
  | 'bedrift'
  | 'sametinget'
  | 'organisasjoner'
  | 'analyse'
  | 'regelverk'
  | 'safety'
  | 'trip-reports'
  | 'planning';

export type ArticleStatus = 'draft' | 'published';

export interface Article {
  id: string;
  title: string;
  slug: string; // URL-friendly identifier
  subtitle?: string;
  excerpt: string;
  content: string; // HTML from rich text editor
  
  // Metadata
  category: ArticleCategory;
  tags: string[];
  readTime: number; // Minutes
  
  // Author
  authorId: string;
  authorName?: string; // Display name
  
  // Media
  featuredImage?: string | null;
  featuredImageAlt?: string | null;
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  
  // Status
  status: ArticleStatus;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  
  // Display
  isFeatured: boolean;
  sortOrder: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface EmployeesData {
  [key: string]: Employee;
}

export interface ArticlesData {
  [key: string]: Article;
}

// Form Types
export interface EmployeeFormData {
  name: string;
  role: string;
  email: string;
  phone: string;
  office: string;
  description: string;
  longDescription: string;
  experience: string;
  specialties: string;
  education: string;
  languages: string;
  workingHours: string;
  achievements: string;
  clientTypes: string;
  image?: string;
  isActive: boolean;
}

export interface ArticleFormData {
  title: string;
  slug: string;
  subtitle: string;
  excerpt: string;
  content: string;
  category: ArticleCategory;
  tags: string[]; // Array of tags
  readTime: number;
  authorId: string;
  authorName: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  metaTitle?: string;
  metaDescription?: string;
  status: ArticleStatus;
  isFeatured: boolean;
}

// Category display names
export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  artikler: 'Innsikt',
  bedrift: 'Bedrift',
  sametinget: 'Sametinget',
  organisasjoner: 'Organisasjoner',
  analyse: 'Analyse',
  regelverk: 'Regelverk',
  safety: 'Safety & Preparation',
  'trip-reports': 'Trip Reports',
  planning: 'Planning Guides',
};

// Category colors for badges
export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  artikler: 'bg-amber-100 text-amber-700',
  bedrift: 'bg-blue-100 text-blue-700',
  sametinget: 'bg-orange-100 text-orange-700',
  organisasjoner: 'bg-green-100 text-green-700',
  analyse: 'bg-purple-100 text-purple-700',
  regelverk: 'bg-slate-100 text-slate-700',
  safety: 'bg-red-100 text-red-700',
  'trip-reports': 'bg-blue-100 text-blue-700',
  planning: 'bg-emerald-100 text-emerald-700',
};
