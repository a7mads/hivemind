"use client";

import React, { useRef, useState, useEffect } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

// We'll use a different approach to load the animation
interface LightbulbAnimationProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

const LightbulbAnimation: React.FC<LightbulbAnimationProps> = ({ 
  width = 150, 
  height = 150,
  className = ""
}) => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);

  // Load the animation data
  useEffect(() => {
    // Fetch the JSON file directly
    fetch('/lottie/lightbulb.json')
      .then(response => response.json())
      .then(data => {
        setAnimationData(data);
      })
      .catch(error => {
        console.error("Failed to load lightbulb animation:", error);
      });
  }, []);

  // Handle hover interactions
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (lottieRef.current) {
      lottieRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (lottieRef.current && isPlaying) {
      lottieRef.current.stop();
      setIsPlaying(false);
    }
  };

  // Handle click interaction
  const handleClick = () => {
    if (lottieRef.current) {
      if (isPlaying) {
        lottieRef.current.stop();
        setIsPlaying(false);
      } else {
        lottieRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  if (!animationData) {
    return <div style={{ width, height }} className={className}>Loading animation...</div>;
  }

  return (
    <div 
      className={`cursor-pointer ${className}`}
      style={{ width, height }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default LightbulbAnimation; 