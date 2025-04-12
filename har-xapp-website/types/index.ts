import { type IconType } from 'react-icons';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: React.ComponentType<any>;
  image?: string;
  slug?: string;
  svg?: React.ReactNode;
}

export interface ProductFeature {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  badgeText?: string;
}

export interface NavItem {
  title: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterLink {
  title: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: IconType;
}

export interface Testimonial {
  id: string; 
  quote: string;
  author: {
    name: string;
    title: string;
    company: string;
    image?: string;
  };
  rating?: number;
} 