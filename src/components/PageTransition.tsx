"use client";

import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapPlugins';

const PageTransition = () => {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create overlay elements for transition
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[9999] pointer-events-none';
    overlay.style.backgroundColor = 'var(--primary)';
    overlay.style.transform = 'translateY(100%)';
    document.body.appendChild(overlay);
    
    overlayRef.current = overlay;

    // Initial page load animation
    const tl = gsap.timeline();
    
    tl.fromTo(
      overlay,
      { y: 0 },
      { 
        y: '-100%', 
        duration: 0.8, 
        ease: 'power3.inOut',
        delay: 0.2
      }
    );

    // Clean up
    return () => {
      if (overlayRef.current && document.body.contains(overlayRef.current)) {
        document.body.removeChild(overlayRef.current);
      }
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default PageTransition; 