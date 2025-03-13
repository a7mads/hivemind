"use client";

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, SplitText } from '../utils/gsapPlugins';

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerTime?: number;
  delay?: number;
  trigger?: HTMLElement | null;
  start?: string;
  type?: 'chars' | 'words' | 'lines' | 'chars,words' | 'words,chars';
  ease?: string;
  duration?: number;
  y?: number;
  x?: number;
}

const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  staggerTime = 0.03,
  delay = 0,
  trigger = null,
  start = 'top 80%',
  type = 'chars',
  ease = 'power3.out',
  duration = 0.5,
  y = 100,
  x = 0,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const splitTextRef = useRef<SplitText | null>(null);
  const hasAnimated = useRef<boolean>(false);

  useEffect(() => {
    if (!textRef.current) return;

    // Create SplitText instance
    splitTextRef.current = new SplitText(textRef.current, { type });
    
    // Get the elements to animate based on type
    let elements: HTMLElement[] = [];
    if (type.includes('chars')) {
      elements = splitTextRef.current.chars;
    } else if (type.includes('words')) {
      elements = splitTextRef.current.words;
    }

    // Set initial state
    gsap.set(elements, { 
      y: y, 
      x: x, 
      opacity: 0 
    });

    // Create ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: trigger || textRef.current,
      start,
      onEnter: () => {
        if (hasAnimated.current) return;
        
        // Animate elements
        gsap.to(elements, {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          stagger: staggerTime,
          ease,
          delay,
          onComplete: () => {
            hasAnimated.current = true;
          }
        });
      }
    });

    return () => {
      // Clean up
      scrollTrigger.kill();
      if (splitTextRef.current) {
        splitTextRef.current.revert();
      }
    };
  }, [staggerTime, delay, trigger, start, type, ease, duration, y, x]);

  return (
    <div ref={textRef} className={`text-reveal ${className}`}>
      {children}
    </div>
  );
};

export default TextReveal; 