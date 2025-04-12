'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

interface MagneticTarget {
  element: HTMLElement;
  originalX: number;
  originalY: number;
  width: number;
  height: number;
}

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [click, setClick] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<'button' | 'link' | 'text' | null>(null);
  const [magneticTarget, setMagneticTarget] = useState<MagneticTarget | null>(null);
  const [cursorText, setCursorText] = useState<string>('');
  
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Manyetik etki için kullanılacak elemanları belirle
  useEffect(() => {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    const updateMagneticElements = () => {
      magneticElements.forEach(elem => {
        if (elem instanceof HTMLElement) {
          const rect = elem.getBoundingClientRect();
          elem.dataset.originalX = String(rect.left + rect.width / 2);
          elem.dataset.originalY = String(rect.top + rect.height / 2);
          elem.dataset.width = String(rect.width);
          elem.dataset.height = String(rect.height);
        }
      });
    };

    updateMagneticElements();
    window.addEventListener('resize', updateMagneticElements);
    window.addEventListener('scroll', updateMagneticElements);

    return () => {
      window.removeEventListener('resize', updateMagneticElements);
      window.removeEventListener('scroll', updateMagneticElements);
    };
  }, []);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorStyle = () => {
      if (typeof window === 'undefined') return;
      
      const elementsUnderCursor = document.elementsFromPoint(position.x, position.y);
      
      // İmleç tipi kontrolü
      const isPointerElement = elementsUnderCursor.some(element => {
        const computedStyle = window.getComputedStyle(element);
        return computedStyle.cursor === 'pointer';
      });
      
      // Hover durumlarını kontrol et
      const buttonElement = elementsUnderCursor.find(el => 
        el.tagName === 'BUTTON' || 
        (el instanceof HTMLElement && el.dataset.cursorType === 'button')
      );
      
      const linkElement = elementsUnderCursor.find(el => 
        el.tagName === 'A' || 
        (el instanceof HTMLElement && el.dataset.cursorType === 'link')
      );
      
      const textElement = elementsUnderCursor.find(el => 
        el instanceof HTMLElement && el.dataset.cursorType === 'text'
      );
      
      // Manyetik elemanları kontrol et
      const magnetic = elementsUnderCursor.find(el => 
        el instanceof HTMLElement && el.hasAttribute('data-magnetic')
      );
      
      if (magnetic instanceof HTMLElement) {
        const originalX = parseFloat(magnetic.dataset.originalX || '0');
        const originalY = parseFloat(magnetic.dataset.originalY || '0');
        const width = parseFloat(magnetic.dataset.width || '0');
        const height = parseFloat(magnetic.dataset.height || '0');
        
        setMagneticTarget({
          element: magnetic,
          originalX,
          originalY,
          width,
          height
        });
        
        // Eğer özel metin varsa onu göster
        setCursorText(magnetic.dataset.cursorText || '');
      } else {
        setMagneticTarget(null);
        setCursorText('');
      }
      
      if (buttonElement) {
        setHoverType('button');
        setIsHovering(true);
      } else if (linkElement) {
        setHoverType('link');
        setIsHovering(true);
      } else if (textElement) {
        setHoverType('text');
        setIsHovering(true);
      } else {
        setHoverType(null);
        setIsHovering(false);
      }
      
      setIsPointer(isPointerElement);
    };

    const handleMouseDown = () => setClick(true);
    const handleMouseUp = () => setClick(false);
    
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mousemove', updateCursorStyle);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mousemove', updateCursorStyle);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [position]);

  // Manyetik efekti uygula
  useEffect(() => {
    if (!magneticTarget) return;

    const strength = 30; // manyetik çekim gücü
    const { element, originalX, originalY, width, height } = magneticTarget;
    
    const distance = {
      x: position.x - originalX,
      y: position.y - originalY
    };
    
    // Mesafeyi normalize et (element sınırları içinde)
    const normalizedX = Math.max(-1, Math.min(1, distance.x / (width / 2)));
    const normalizedY = Math.max(-1, Math.min(1, distance.y / (height / 2)));
    
    // Manyetik çekim etkisini uygula
    gsap.to(element, {
      x: normalizedX * strength,
      y: normalizedY * strength,
      duration: 0.6,
      ease: "power3.out"
    });

    return () => {
      // Fare uzaklaştığında elemanı orijinal konumuna getir
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    };
  }, [magneticTarget, position]);

  // Cursor renkleri ve stili
  const getCursorColor = () => {
    if (hoverType === 'button') return 'var(--primary, 65, 150, 57)';
    if (hoverType === 'link') return 'var(--primary, 65, 150, 57)';
    return '255, 255, 255';
  };

  const getRingColor = () => {
    if (hoverType === 'button') return 'var(--primary, 65, 150, 57)';
    if (hoverType === 'link') return 'var(--primary, 65, 150, 57)';
    return '255, 255, 255';
  };

  const getGlowColor = () => {
    if (hoverType === 'button') return 'radial-gradient(circle, rgba(var(--primary), 0.5) 0%, rgba(var(--primary), 0) 70%)';
    if (hoverType === 'link') return 'radial-gradient(circle, rgba(var(--primary), 0.5) 0%, rgba(var(--primary), 0) 70%)';
    return 'radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%)';
  };

  return (
    <>
      {/* Ana imleç noktası */}
      <motion.div 
        ref={cursorRef}
        className={`fixed z-[var(--z-cursor)] rounded-full pointer-events-none mix-blend-difference ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        animate={{
          x: position.x,
          y: position.y,
          scale: click ? 0.7 : isHovering ? (hoverType === 'button' ? 1.2 : 1) : 1,
          opacity: isHidden ? 0 : 1
        }}
        transition={{ 
          type: "spring", 
          damping: 50, 
          mass: 0.1, 
          stiffness: 800 
        }}
        style={{
          width: isPointer || isHovering ? '30px' : '12px',
          height: isPointer || isHovering ? '30px' : '12px',
          backgroundColor: `rgba(${getCursorColor()}, ${isHovering ? 1 : 0.85})`,
          boxShadow: `0 0 10px 2px rgba(${getCursorColor()}, 0.15)`,
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Takip eden halka */}
      <motion.div 
        ref={ringRef}
        className={`fixed z-[calc(var(--z-cursor)-1)] rounded-full pointer-events-none ${isHidden ? 'opacity-0' : 'opacity-100'}`}
        animate={{
          x: position.x,
          y: position.y,
          scale: click ? 0.8 : isPointer || isHovering 
            ? (hoverType === 'button' ? 1.5 : hoverType === 'link' ? 1.3 : 1.2) 
            : 1,
          opacity: isHidden ? 0 : isPointer || isHovering ? 0.3 : 0.15,
          borderColor: `rgba(${getRingColor()}, ${isHovering ? 0.6 : 0.4})`
        }}
        transition={{ 
          type: "spring", 
          damping: 30, 
          mass: 0.2, 
          stiffness: 200,
          opacity: { duration: 0.25 }
        }}
        style={{
          width: '60px',
          height: '60px',
          border: '1.5px solid rgba(255, 255, 255, 0.6)',
          boxShadow: `0 0 15px rgba(${getRingColor()}, 0.1)`,
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Ekstra ışık efekti */}
      <AnimatePresence>
        {(isPointer || isHovering) && (
          <motion.div 
            ref={glowRef}
            className="fixed z-[calc(var(--z-cursor)-2)] rounded-full pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              x: position.x, 
              y: position.y, 
              opacity: isHidden ? 0 : 0.15,
              scale: isHidden ? 0.5 : 2
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '80px',
              height: '80px',
              background: getGlowColor(),
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Özel metin gösterimi */}
      <AnimatePresence>
        {cursorText && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1,
              x: position.x,
              y: position.y + 40
            }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed z-[var(--z-tooltip)] pointer-events-none text-xs font-medium bg-slate-900/90 text-white px-3 py-1.5 rounded-md backdrop-blur-sm border border-white/10"
            style={{ transform: 'translate(-50%, -50%)' }}
            transition={{ 
              type: "spring", 
              damping: 20,
              stiffness: 300
            }}
          >
            {cursorText}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Tıklama dalgası efekti */}
      <AnimatePresence>
        {click && (
          <motion.div
            initial={{ opacity: 0.5, scale: 0.5 }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
              position: 'fixed',
              left: position.x,
              top: position.y,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: `2px solid rgba(${getCursorColor()}, 0.5)`,
              transform: 'translate(-50%, -50%)',
              zIndex: 'calc(var(--z-cursor) - 3)'
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CustomCursor;