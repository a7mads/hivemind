"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapPlugins';

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  pinSpacing?: boolean;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  className = '',
  containerClassName = '',
  pinSpacing = true,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !triggerRef.current || !horizontalRef.current) return;

    const sections = horizontalRef.current.children;
    const totalWidth = Array.from(sections).reduce((width, section) => {
      return width + (section as HTMLElement).offsetWidth;
    }, 0);

    // Set the horizontal scroll container width
    gsap.set(horizontalRef.current, {
      width: totalWidth
    });

    // Create horizontal scroll animation
    const scrollTween = gsap.to(horizontalRef.current, {
      x: () => -(totalWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: () => `+=${totalWidth}`,
        pin: true,
        pinSpacing,
        scrub: true,
        invalidateOnRefresh: true,
      }
    });

    return () => {
      // Clean up
      if (scrollTween) {
        scrollTween.scrollTrigger?.kill();
      }
    };
  }, [pinSpacing]);

  return (
    <div ref={sectionRef} className={`horizontal-scroll ${containerClassName}`}>
      <div ref={triggerRef} className="trigger-section w-full">
        <div 
          ref={horizontalRef} 
          className={`horizontal-container flex flex-nowrap ${className}`}
          style={{ willChange: 'transform' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll; 