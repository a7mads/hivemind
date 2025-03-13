"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapPlugins';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const smoothScrolling = useRef<boolean>(true);
  const currentY = useRef<number>(0);
  const targetY = useRef<number>(0);
  const scrollTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    // Skip smooth scrolling on mobile devices
    if (window.innerWidth < 768) {
      smoothScrolling.current = false;
      return;
    }

    // Set initial height
    if (scrollContainer.current && viewportRef.current) {
      document.body.style.height = `${scrollContainer.current.offsetHeight}px`;
    }

    // Handle resize
    const handleResize = () => {
      if (scrollContainer.current) {
        document.body.style.height = `${scrollContainer.current.offsetHeight}px`;
      }
    };

    // Update scroll position
    const updateScroll = () => {
      if (!smoothScrolling.current) return;
      
      targetY.current = window.scrollY;
      
      // Smooth scrolling animation
      if (scrollTween.current) {
        scrollTween.current.kill();
      }
      
      scrollTween.current = gsap.to(currentY, {
        current: targetY.current,
        duration: 0.8,
        ease: "power3.out",
        overwrite: true,
        onUpdate: () => {
          if (scrollContainer.current) {
            scrollContainer.current.style.transform = `translateY(${-currentY.current}px)`;
          }
        }
      });
    };

    // Set up ResizeObserver to detect content changes
    const resizeObserver = new ResizeObserver(handleResize);
    if (scrollContainer.current) {
      resizeObserver.observe(scrollContainer.current);
    }

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updateScroll);

    // Initial setup
    handleResize();
    updateScroll();

    return () => {
      // Clean up
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateScroll);
      if (scrollContainer.current) {
        resizeObserver.unobserve(scrollContainer.current);
      }
      if (scrollTween.current) {
        scrollTween.current.kill();
      }
      document.body.style.height = '';
    };
  }, []);

  return (
    <div ref={viewportRef} className="viewport fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div ref={scrollContainer} className="scroll-container will-change-transform pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll; 