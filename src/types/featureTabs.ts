import { ReactNode } from 'react';

export interface FeatureTabItem {
  id: string;
  title: string;
  shortDesc: string;
  icon: string;
  // We change 'string' to 'string | ReactNode' to allow HTML/JSX
  content: string | ReactNode; 
  bullets: (string | ReactNode)[];
  link: string;
  linkText?: string;
}

export interface FeatureTabsData {
  title: string;
  introText: string;
  features: FeatureTabItem[];
}