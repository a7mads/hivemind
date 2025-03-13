"use client";

import { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapPlugins';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const followerRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    // Only run on client side and check if we're in a browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    // Check if we're on a touch device (no cursor needed)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    
    console.log("CustomCursor component mounted");
    
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = '#00f5d4'; // Using the accent color directly
    cursor.style.zIndex = '9999';
    cursor.style.pointerEvents = 'none';
    cursor.style.mixBlendMode = 'difference';
    cursor.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(cursor);
    
    const follower = document.createElement('div');
    follower.id = 'cursor-follower';
    follower.style.position = 'fixed';
    follower.style.width = '30px';
    follower.style.height = '30px';
    follower.style.borderRadius = '50%';
    follower.style.border = '2px solid #00f5d4'; // Using the accent color directly
    follower.style.zIndex = '9998';
    follower.style.pointerEvents = 'none';
    follower.style.mixBlendMode = 'difference';
    follower.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(follower);
    
    cursorRef.current = cursor;
    followerRef.current = follower;
    
    // Set initial position off-screen
    gsap.set(cursor, { x: -100, y: -100 });
    gsap.set(follower, { x: -100, y: -100 });
    
    // Mouse move event
    const onMouseMove = (e: MouseEvent) => {
      console.log("Mouse moved", e.clientX, e.clientY);
      
      // Animate cursor to mouse position
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power1.out'
      });
      
      // Animate follower with slight delay for smooth effect
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out'
      });
    };
    
    // Hover effects for interactive elements
    const onMouseEnter = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3
      });
      
      gsap.to(follower, {
        scale: 1.5,
        opacity: 0.5,
        duration: 0.3
      });
    };
    
    const onMouseLeave = () => {
      gsap.to([cursor, follower], {
        scale: 1,
        opacity: 1,
        duration: 0.3
      });
    };
    
    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Clean up
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
      
      if (cursorRef.current && document.body.contains(cursorRef.current)) {
        document.body.removeChild(cursorRef.current);
      }
      
      if (followerRef.current && document.body.contains(followerRef.current)) {
        document.body.removeChild(followerRef.current);
      }
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, []);
  
  return null; // This component doesn't render anything visible
};

export default CustomCursor; 