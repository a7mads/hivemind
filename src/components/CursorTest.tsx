"use client";

import { useEffect } from 'react';

const CursorTest = () => {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    console.log("CursorTest component mounted");
    
    // Create a simple cursor dot
    const testCursor = document.createElement('div');
    testCursor.style.position = 'fixed';
    testCursor.style.width = '20px';
    testCursor.style.height = '20px';
    testCursor.style.borderRadius = '50%';
    testCursor.style.backgroundColor = 'red';
    testCursor.style.zIndex = '10000';
    testCursor.style.pointerEvents = 'none';
    testCursor.style.transform = 'translate(-50%, -50%)';
    testCursor.style.top = '0';
    testCursor.style.left = '0';
    document.body.appendChild(testCursor);
    
    // Mouse move event
    const onMouseMove = (e: MouseEvent) => {
      testCursor.style.top = `${e.clientY}px`;
      testCursor.style.left = `${e.clientX}px`;
      console.log("Test cursor moved", e.clientX, e.clientY);
    };
    
    // Add event listener
    document.addEventListener('mousemove', onMouseMove);
    
    // Clean up
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      if (document.body.contains(testCursor)) {
        document.body.removeChild(testCursor);
      }
    };
  }, []);
  
  return null;
};

export default CursorTest; 