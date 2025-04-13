'use client';

import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useState, AnchorHTMLAttributes } from 'react';

interface OptimizedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  className?: string;
  prefetch?: boolean;
  activeClassName?: string;
  onClick?: () => void;
}

/**
 * Optimize edilmiş link bileşeni
 * - Aktif durum izlemesi
 * - Hover yükleme optimizasyonu
 * - Sayfa geçişlerini hızlandırma
 */
const OptimizedLink = ({
  href,
  children,
  className = '',
  prefetch = false,
  activeClassName = '',
  onClick,
  ...props
}: OptimizedLinkProps) => {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const isActive = pathname === href;
  
  // İç linkler için prefetch'i hover ile etkinleştirelim
  const shouldPrefetch = prefetch || isHovered;
  
  // Harici link kontrolü
  const isExternal = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:');
  
  // Hashtag linkler için özel davranış
  const isHashLink = href.startsWith('#');
  
  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHashLink) {
      e.preventDefault();
      const targetId = href;
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Yumuşak kaydırma
      window.scrollTo({
        top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth'
      });
      
      // URL'i güncelle
      window.history.pushState(null, '', href);
    }
    
    // Kullanıcı tarafından sağlanan onClick varsa çalıştır
    if (onClick) onClick();
  };
  
  if (isExternal) {
    return (
      <a 
        href={href} 
        className={`${className} ${isActive ? activeClassName : ''}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  if (isHashLink) {
    return (
      <a 
        href={href} 
        className={`${className} ${isActive ? activeClassName : ''}`}
        onClick={handleHashClick}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  return (
    <NextLink 
      href={href}
      prefetch={shouldPrefetch}
      className={`${className} ${isActive ? activeClassName : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      {...props}
    >
      {children}
    </NextLink>
  );
};

export default OptimizedLink; 