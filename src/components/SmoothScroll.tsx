"use client";

import React, { useEffect, useRef, useCallback } from 'react';
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
  const resizeObserver = useRef<ResizeObserver | null>(null);

  // Store the current scrollContainer element in a ref to avoid cleanup issues
  const scrollContainerElement = useRef<HTMLDivElement | null>(null);

  // Callback ref to store the element reference safely
  const setScrollContainerRef = useCallback((node: HTMLDivElement | null) => {
    // Store the node in our ref
    scrollContainer.current = node;
    scrollContainerElement.current = node;
    
    // If we had an observer and an old node, disconnect it
    if (resizeObserver.current && !node) {
      resizeObserver.current.disconnect();
    }
    
    // If we have a new node, observe it
    if (node && resizeObserver.current) {
      resizeObserver.current.observe(node);
    }
  }, []);

  useEffect(() => {
    // Skip smooth scrolling on mobile devices
    if (window.innerWidth < 768) {
      smoothScrolling.current = false;
      return;
    }

    // Set initial height
    if (scrollContainerElement.current && viewportRef.current) {
      document.body.style.height = `${scrollContainerElement.current.offsetHeight}px`;
    }

    // Handle resize
    const handleResize = () => {
      if (scrollContainerElement.current) {
        document.body.style.height = `${scrollContainerElement.current.offsetHeight}px`;
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
          if (scrollContainerElement.current) {
            scrollContainerElement.current.style.transform = `translateY(${-currentY.current}px)`;
          }
        }
      });
    };

    // Set up ResizeObserver to detect content changes
    resizeObserver.current = new ResizeObserver(handleResize);
    if (scrollContainerElement.current) {
      resizeObserver.current.observe(scrollContainerElement.current);
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
      
      // Use the stored reference for cleanup
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
      
      if (scrollTween.current) {
        scrollTween.current.kill();
      }
      
      document.body.style.height = '';
    };
  }, []);

  return (
    <div ref={viewportRef} className="viewport fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div ref={setScrollContainerRef} className="scroll-container will-change-transform pointer-events-auto">
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll; 