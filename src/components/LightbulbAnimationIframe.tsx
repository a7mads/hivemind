"use client";

import React from 'react';

interface LightbulbAnimationIframeProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const LightbulbAnimationIframe: React.FC<LightbulbAnimationIframeProps> = ({ 
  width = 150, 
  height = 150,
  className = ""
}) => {
  return (
    <div 
      className={`${className}`}
      style={{ width, height }}
    >
      <iframe 
        src="https://cdn.lottielab.com/l/9TJNK95KDLzKsb.html" 
        width="100%" 
        height="100%" 
        style={{ border: 'none', overflow: 'hidden' }}
        allowFullScreen
        title="Interactive Lightbulb Animation"
      />
    </div>
  );
};

export default LightbulbAnimationIframe; 