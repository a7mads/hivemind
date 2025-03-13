"use client";

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapPlugins';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: number;
  containerClassName?: string;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className = '',
  speed = 0.5,
  direction = 'up',
  scale = 1.2,
  containerClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    // Set initial scale to ensure no gaps during parallax
    gsap.set(imageRef.current, { scale });

    // Calculate movement direction and amount
    let xMove = 0;
    let yMove = 0;
    
    switch (direction) {
      case 'up':
        yMove = containerRef.current.offsetHeight * speed * -1;
        break;
      case 'down':
        yMove = containerRef.current.offsetHeight * speed;
        break;
      case 'left':
        xMove = containerRef.current.offsetWidth * speed * -1;
        break;
      case 'right':
        xMove = containerRef.current.offsetWidth * speed;
        break;
    }

    // Create parallax effect
    const parallaxTween = gsap.fromTo(
      imageRef.current,
      { y: direction === 'down' ? yMove * -1 : 0, x: direction === 'right' ? xMove * -1 : 0 },
      {
        y: direction === 'up' ? yMove : 0,
        x: direction === 'left' ? xMove : 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    return () => {
      // Clean up
      if (parallaxTween) {
        parallaxTween.kill();
      }
    };
  }, [speed, direction, scale]);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${containerClassName}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
};

export default ParallaxImage; 