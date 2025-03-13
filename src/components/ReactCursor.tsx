"use client";

import { useState, useEffect } from 'react';

const ReactCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Check if we're on a touch device (no cursor needed)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;
    
    console.log("ReactCursor component mounted");
    
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    
    const onMouseLeave = () => {
      setIsVisible(false);
    };
    
    const onMouseEnter = () => {
      setIsVisible(true);
    };
    
    // Handle hover states for interactive elements
    const handleElementMouseEnter = () => {
      setIsHovering(true);
    };
    
    const handleElementMouseLeave = () => {
      setIsHovering(false);
    };
    
    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementMouseEnter);
      el.addEventListener('mouseleave', handleElementMouseLeave);
    });
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Clean up
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementMouseEnter);
        el.removeEventListener('mouseleave', handleElementMouseLeave);
      });
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, [isVisible]);
  
  if (typeof window === 'undefined') return null;
  
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
          width: isHovering ? '18px' : '12px',
          height: isHovering ? '18px' : '12px',
          backgroundColor: '#00f5d4',
          borderRadius: '50%',
          zIndex: 9999,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.3s, height 0.3s, opacity 0.3s',
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
          width: isHovering ? '45px' : '30px',
          height: isHovering ? '45px' : '30px',
          border: '2px solid #00f5d4',
          borderRadius: '50%',
          zIndex: 9998,
          pointerEvents: 'none',
          mixBlendMode: 'difference',
          opacity: isVisible ? (isHovering ? 0.5 : 1) : 0,
          transition: 'width 0.3s, height 0.3s, opacity 0.3s',
          transitionTimingFunction: 'ease-out',
        }}
      />
    </>
  );
};

export default ReactCursor; 