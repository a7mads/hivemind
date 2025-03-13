"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapPlugins';

interface ScrollProgressProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
  zIndex?: number;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  color = "#2e7d32",
  height = 3,
  position = 'top',
  zIndex = 50,
}) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    // Update progress bar width based on scroll position
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      
      gsap.to(progressRef.current, {
        width: `${scrollPercent * 100}%`,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    // Initial update
    updateProgress();

    // Add scroll event listener
    window.addEventListener('scroll', updateProgress);

    return () => {
      // Clean up
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div 
      className={`fixed left-0 ${position === 'top' ? 'top-0' : 'bottom-0'} w-full`}
      style={{ zIndex }}
    >
      <div 
        ref={progressRef}
        className="origin-left"
        style={{ 
          height: `${height}px`, 
          backgroundColor: color,
          width: '0%',
        }}
      />
    </div>
  );
};

export default ScrollProgress; 