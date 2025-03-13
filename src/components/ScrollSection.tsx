"use client";

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapPlugins';

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fadeIn?: boolean;
  slideUp?: boolean;
  stagger?: boolean;
  parallax?: boolean;
  pinned?: boolean;
  scrub?: boolean | number;
  start?: string;
  end?: string;
  markers?: boolean;
  delay?: number;
}

const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  className = '',
  id,
  fadeIn = true,
  slideUp = true,
  stagger = false,
  parallax = false,
  pinned = false,
  scrub = false,
  start = 'top 80%',
  end = 'bottom 20%',
  markers = false,
  delay = 0,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef<boolean>(false);

  useEffect(() => {
    if (!sectionRef.current || !childrenRef.current) return;

    // Create ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start,
      end: pinned ? 'bottom top' : end,
      markers,
      pin: pinned,
      scrub: scrub,
      onEnter: () => {
        if (hasAnimated.current && !scrub) return;
        
        const tl = gsap.timeline();
        
        // Apply animations based on props
        if (fadeIn && slideUp) {
          if (stagger) {
            // Stagger animation for child elements
            const children = childrenRef.current?.children;
            if (children && children.length > 0) {
              tl.fromTo(
                children,
                { 
                  y: 50, 
                  opacity: 0 
                },
                { 
                  y: 0, 
                  opacity: 1, 
                  duration: 0.8, 
                  stagger: 0.1,
                  ease: "power3.out",
                  delay
                }
              );
            }
          } else {
            // Animate the entire container
            tl.fromTo(
              childrenRef.current,
              { 
                y: 50, 
                opacity: 0 
              },
              { 
                y: 0, 
                opacity: 1, 
                duration: 0.8,
                ease: "power3.out",
                delay
              }
            );
          }
        } else if (fadeIn) {
          tl.fromTo(
            childrenRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: "power3.out", delay }
          );
        } else if (slideUp) {
          tl.fromTo(
            childrenRef.current,
            { y: 50 },
            { y: 0, duration: 0.8, ease: "power3.out", delay }
          );
        }
        
        // Apply parallax effect
        if (parallax && !scrub) {
          tl.fromTo(
            childrenRef.current,
            { y: 100 },
            { y: -50, ease: "none", scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              markers: false,
            }}
          );
        }
        
        hasAnimated.current = true;
      },
      onLeaveBack: () => {
        if (!scrub) return;
        hasAnimated.current = false;
      }
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [fadeIn, slideUp, stagger, parallax, pinned, scrub, start, end, markers, delay]);

  return (
    <div ref={sectionRef} className={`scroll-section ${className}`} id={id}>
      <div ref={childrenRef} className="scroll-section-content">
        {children}
      </div>
    </div>
  );
};

export default ScrollSection; 