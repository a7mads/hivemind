"use client";

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapPlugins';

interface ScrollDrivenAnimationProps {
  className?: string;
}

const ScrollDrivenAnimation: React.FC<ScrollDrivenAnimationProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !textRef.current) return;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline for the animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,           // pin the section
        start: "top top",    // start at the top of the viewport
        end: "+=2000",       // end after scrolling 2000px
        scrub: 1,            // smooth scrubbing
        // markers: true,    // uncomment for debugging
      }
    });

    // Add animations to the timeline
    tl.to(imageRef.current, {
      scale: 1.5,
      rotation: 15,
      duration: 1
    })
    .to(textRef.current.querySelectorAll('.text-item'), {
      y: 0,
      opacity: 1,
      stagger: 0.2,
      duration: 1
    }, "<")
    .to(imageRef.current, {
      x: "30vw",
      duration: 1
    })
    .to(textRef.current, {
      x: "-30vw",
      duration: 1
    }, "<")
    .to(imageRef.current, {
      scale: 1,
      rotation: 0,
      duration: 1
    })
    .to(textRef.current.querySelectorAll('.text-item'), {
      color: "var(--accent)",
      fontWeight: "bold",
      stagger: 0.2,
      duration: 1
    });

    return () => {
      // Clean up ScrollTrigger
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={`scroll-driven-animation h-screen flex items-center justify-center ${className}`}>
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div 
          ref={imageRef} 
          className="w-64 h-64 md:w-80 md:h-80 bg-[var(--accent)] rounded-full flex items-center justify-center mb-8 md:mb-0"
        >
          <span className="text-[var(--primary)] text-2xl font-bold">Scroll Down</span>
        </div>
        
        <div ref={textRef} className="max-w-md">
          <h2 className="text-item text-3xl font-bold mb-4 opacity-0 transform translate-y-20">
            Scroll-Driven Animation
          </h2>
          <p className="text-item text-lg mb-4 opacity-0 transform translate-y-20">
            This animation is entirely driven by your scroll position. As you scroll down, 
            the timeline progresses, creating a smooth, interactive experience.
          </p>
          <p className="text-item text-lg opacity-0 transform translate-y-20">
            ScrollTrigger&apos;s scrub feature ties the animation progress directly to the 
            scroll position, giving you precise control over the animation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScrollDrivenAnimation; 