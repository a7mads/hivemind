"use client";

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapPlugins';

const GsapTest: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic GSAP animation to test if GSAP is working
    const basicAnimation = gsap.to(boxRef.current, {
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: "linear"
    });

    // Log to verify GSAP is initialized
    console.log("GSAP initialized:", gsap.version);
    console.log("ScrollTrigger available:", typeof ScrollTrigger);

    // Clean up
    return () => {
      basicAnimation.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">GSAP Test Component</h1>
      
      <div 
        ref={boxRef} 
        className="w-32 h-32 bg-blue-500 flex items-center justify-center text-white font-bold"
      >
        GSAP Box
      </div>
      
      <p className="mt-8 text-lg">
        If you see this box rotating, GSAP is working correctly.
      </p>
    </div>
  );
};

export default GsapTest; 