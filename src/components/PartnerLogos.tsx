"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from '../utils/gsapPlugins';

// Define the partner logos
const partnerLogos = [
  { name: 'Control4', logo: '/logos/control4.svg' },
  { name: 'Crestron', logo: '/logos/crestron.svg' },
  { name: 'Lutron', logo: '/logos/lutron.svg' },
  { name: 'Philips Hue', logo: '/logos/philips-hue.svg' },
  { name: 'Ubiquiti', logo: '/logos/ubiquiti.svg' },
  { name: 'Fortinet', logo: '/logos/fortinet.svg' },
  { name: 'Cisco', logo: '/logos/cisco.svg' },
  { name: 'Ring', logo: '/logos/ring.svg' },
  { name: 'Nest', logo: '/logos/nest.svg' },
  { name: 'Yale', logo: '/logos/yale.svg' },
  { name: 'Amazon Alexa', logo: '/logos/amazon-alexa.svg' },
  { name: 'Google Assistant', logo: '/logos/google-assistant.svg' },
  { name: 'Apple HomeKit', logo: '/logos/apple-homekit.svg' },
  { name: 'Hikvision', logo: '/logos/hikvision.svg' },
  { name: 'Arlo', logo: '/logos/arlo.svg' },
  { name: 'Sonos', logo: '/logos/sonos.svg' },
  { name: 'Samsung SmartThings', logo: '/logos/samsung-smartthings.svg' },
  { name: 'Honeywell', logo: '/logos/honeywell.svg' },
  { name: 'TP-Link', logo: '/logos/tp-link.svg' },
  { name: 'Sophos', logo: '/logos/sophos.svg' },
];

const PartnerLogos: React.FC = () => {
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);
  // Store animation instances in refs
  const firstRowAnimRef = useRef<gsap.core.Tween | null>(null);
  const secondRowAnimRef = useRef<gsap.core.Tween | null>(null);
  // Track if we're using fallback animations
  const [usingFallback, setUsingFallback] = useState(false);

  // Split the logos into two rows
  const firstRowLogos = partnerLogos.slice(0, Math.ceil(partnerLogos.length / 2));
  const secondRowLogos = partnerLogos.slice(Math.ceil(partnerLogos.length / 2));

  // Function to apply CSS fallback animations
  const applyFallbackAnimations = () => {
    console.log('Applying CSS fallback animations for logo scrolling');
    setUsingFallback(true);
    
    if (firstRowRef.current) {
      firstRowRef.current.style.animation = 'scroll-left 30s linear infinite';
    }
    
    if (secondRowRef.current) {
      secondRowRef.current.style.animation = 'scroll-right 30s linear infinite';
    }
  };

  // Initialize GSAP animations
  useEffect(() => {
    console.log('PartnerLogos component mounted');
    
    // Store local references to DOM elements to avoid cleanup issues
    const firstRowElement = firstRowRef.current;
    const secondRowElement = secondRowRef.current;
    
    // Ensure elements exist before attempting animation
    if (!firstRowElement || !secondRowElement) {
      console.error('Row elements not found, cannot initialize animations');
      return;
    }

    // Function to initialize GSAP animations
    const initGsapAnimations = () => {
      try {
        console.log('Initializing GSAP animations for logo scrolling');
        
        // Animate the first row to move left
        firstRowAnimRef.current = gsap.to(firstRowElement, {
          x: '-50%',
          repeat: -1,
          duration: 30,
          ease: 'linear',
          onStart: () => console.log('First row animation started'),
          onError: (err: Error) => {
            console.error('Error in first row animation:', err);
            applyFallbackAnimations();
          }
        });

        // Animate the second row to move right
        secondRowAnimRef.current = gsap.to(secondRowElement, {
          x: '0%', // Start from -50% (set in the style)
          repeat: -1,
          duration: 30,
          ease: 'linear',
          onStart: () => console.log('Second row animation started'),
          onError: (err: Error) => {
            console.error('Error in second row animation:', err);
            applyFallbackAnimations();
          }
        });

        console.log('GSAP animations created successfully');
      } catch (error) {
        console.error('Error creating GSAP animations:', error);
        applyFallbackAnimations();
      }
    };

    // Try to initialize GSAP animations with a slight delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      initGsapAnimations();
    }, 500);

    return () => {
      // Clear the timeout
      clearTimeout(timeoutId);
      
      // Clean up animations using the stored animation instances
      try {
        console.log('Cleaning up GSAP animations');
        
        // Kill the animations directly
        if (firstRowAnimRef.current) {
          firstRowAnimRef.current.kill();
        }
        if (secondRowAnimRef.current) {
          secondRowAnimRef.current.kill();
        }
      } catch (error) {
        console.error('Error cleaning up GSAP animations:', error);
      }
    };
  }, []);

  return (
    <section className="py-10 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-black">Our Trusted Brands</h2>
          <p className="text-gray-600 mb-8">
            We work with the most advanced smart home, security, and networking brands to bring you a seamless experience.
          </p>
        </div>
      </div>

      {/* First row of logos - moves left */}
      <div className="relative overflow-hidden py-4 mb-4">
        <div 
          ref={firstRowRef}
          className={`flex items-center space-x-10 whitespace-nowrap ${usingFallback ? 'animate-scroll-left' : ''}`}
          style={{ width: '200%' }}
        >
          {/* Duplicate logos for infinite scroll effect */}
          {[...firstRowLogos, ...firstRowLogos].map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`}
              className="logo-item flex-shrink-0 h-16 w-32 relative cursor-pointer filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
            >
              <div className="relative h-full w-full">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="opacity-70 hover:opacity-100 transition-opacity"
                  style={{ objectFit: 'contain' }}
                  onError={() => console.error(`Failed to load logo: ${partner.logo}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second row of logos - moves right */}
      <div className="relative overflow-hidden py-4">
        <div 
          ref={secondRowRef}
          className={`flex items-center space-x-10 whitespace-nowrap ${usingFallback ? 'animate-scroll-right' : ''}`}
          style={{ width: '200%', transform: 'translateX(-50%)' }}
        >
          {/* Duplicate logos for infinite scroll effect */}
          {[...secondRowLogos, ...secondRowLogos].map((partner, index) => (
            <div 
              key={`${partner.name}-${index}`}
              className="logo-item flex-shrink-0 h-16 w-32 relative cursor-pointer filter grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
            >
              <div className="relative h-full w-full">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="opacity-70 hover:opacity-100 transition-opacity"
                  style={{ objectFit: 'contain' }}
                  onError={() => console.error(`Failed to load logo: ${partner.logo}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos; 