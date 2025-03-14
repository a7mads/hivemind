"use client";

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapPlugins';

interface ScrollTriggerDemoProps {
  className?: string;
}

const ScrollTriggerDemo: React.FC<ScrollTriggerDemoProps> = ({ className = '' }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !panelsRef.current || !textRef.current) return;

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline for the text animation
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        // markers: true, // Uncomment for debugging
      }
    });

    textTl.from(".reveal-text", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Create a pinned section with panels that change as you scroll
    const panels = gsap.utils.toArray<HTMLElement>(panelsRef.current.children);
    
    // Create a ScrollTrigger for the horizontal scroll
    const panelsST = ScrollTrigger.create({
      id: "panelsContainer",
      trigger: panelsRef.current,
      pin: true,
      scrub: 1,
      snap: 1 / (panels.length - 1),
      start: "top top",
      end: () => "+=" + (panelsRef.current?.offsetWidth || 0),
      // markers: true, // Uncomment for debugging
    });
    
    gsap.to(panels, {
      xPercent: -100 * (panels.length - 1),
      ease: "none",
      scrollTrigger: panelsST
    });

    // Create a parallax effect for the background images
    panels.forEach((panel) => {
      const img = panel.querySelector('.panel-bg');
      if (img) {
        gsap.to(img, {
          y: "20%",
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    });

    return () => {
      // Clean up all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className={`scroll-trigger-demo ${className}`}>
      {/* Text reveal section */}
      <div ref={textRef} className="py-20 bg-gradient-to-b from-[var(--background)] to-[var(--gray-light)]">
        <div className="container mx-auto px-4">
          <h2 className="reveal-text text-4xl font-bold mb-6 text-center">ScrollTrigger Demo</h2>
          <p className="reveal-text text-xl mb-8 text-center max-w-3xl mx-auto">
            This section demonstrates how to use GSAP ScrollTrigger to create engaging scroll-based animations.
          </p>
          <p className="reveal-text text-lg mb-12 text-center max-w-2xl mx-auto">
            Scroll down to see a horizontal scrolling section with pinned content that changes as you scroll.
          </p>
        </div>
      </div>

      {/* Horizontal scroll panels */}
      <div ref={panelsRef} className="panels-container overflow-hidden">
        {[1, 2, 3, 4].map((panel) => (
          <div 
            key={panel} 
            className="panel w-screen h-screen flex items-center justify-center relative"
          >
            <div className="panel-bg absolute inset-0 w-full h-full bg-cover bg-center -z-10" 
                 style={{ backgroundImage: `url(/hero-bg-alt${panel}.jpg)` }}></div>
            <div className="panel-content bg-black/50 p-8 rounded-lg max-w-xl text-white">
              <h3 className="text-3xl font-bold mb-4">Panel {panel}</h3>
              <p className="text-lg mb-6">
                This panel is part of a horizontal scrolling section. As you scroll down, 
                the panels move horizontally, creating an engaging user experience.
              </p>
              <p className="text-lg">
                The background image has a subtle parallax effect, moving at a different 
                rate than the foreground content.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Final section */}
      <div className="py-20 bg-gradient-to-b from-[var(--gray-light)] to-[var(--background)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">ScrollTrigger Complete</h2>
          <p className="text-xl max-w-3xl mx-auto">
            You&apos;ve experienced the power of GSAP ScrollTrigger. This library offers many more 
            features for creating complex scroll-based animations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScrollTriggerDemo; 