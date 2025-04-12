import { type ReactNode, type ComponentType } from 'react';

// Feature tipi
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: ComponentType<any>;
  image?: string;
  slug?: string;
  svg?: ReactNode;
} 