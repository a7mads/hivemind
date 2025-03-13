"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapPlugins';
import TextReveal from './TextReveal';
import ParallaxImage from './ParallaxImage';

// You can easily switch between these background images by changing the imagePath variable
// hero-bg.jpg: Modern smart home with tablet control
// hero-bg-alt1.jpg: Smart home with modern devices
// hero-bg-alt2.jpg: Futuristic smart home setup with voice control
// hero-bg-alt3.jpg: Sleek modern smart home with minimalist design
// hero-bg-alt4.jpg: Contemporary smart home with elegant aesthetic
// hero-bg-alt5.jpg: High-tech smart home with futuristic interface
// hero-bg-alt6.jpg: Elegant living room with smart home integration
// hero-bg-alt7.jpg: Modern smart home with advanced technology display
const imagePath = '/hero-bg-alt3.jpg'; // Change this to try different images

const Hero = () => {
  // Create refs for elements we want to animate
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll to the contact section when the button is clicked
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // GSAP animations
  useEffect(() => {
    // Create a timeline for sequenced animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Overlay animation (similar to daylightcomputer.com)
    tl.fromTo(overlayRef.current, 
      { scaleY: 1, transformOrigin: 'bottom' }, 
      { scaleY: 0, duration: 1.2, ease: "power4.inOut" }
    );
    
    // Background image fade in
    tl.fromTo(backgroundRef.current, 
      { opacity: 0, scale: 1.1 }, 
      { opacity: 1, scale: 1, duration: 1.5 },
      "-=0.8" // Start before the overlay animation ends
    );
    
    // Button animation
    tl.fromTo(buttonRef.current, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6 },
      "-=0.4"
    );

    // Parallax effect on scroll
    const handleScroll = () => {
      if (backgroundRef.current && sectionRef.current) {
        // Calculate how far down the page we've scrolled
        const scrollPosition = window.scrollY;
        const sectionTop = sectionRef.current.offsetTop;
        const sectionHeight = sectionRef.current.offsetHeight;
        
        // Only apply parallax when the section is in view
        if (scrollPosition >= sectionTop - window.innerHeight && 
            scrollPosition <= sectionTop + sectionHeight) {
          
          // Calculate parallax offset (slower movement for background)
          const parallaxOffset = (scrollPosition - sectionTop) * 0.4;
          
          // Apply transform to create parallax effect
          gsap.to(backgroundRef.current, {
            y: parallaxOffset,
            duration: 0.6,
            ease: "power1.out"
          });
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up animation on component unmount
    return () => {
      tl.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center z-10" ref={sectionRef}>
      {/* Background image with parallax effect */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        <ParallaxImage 
          src={imagePath}
          alt="Smart home"
          speed={0.2}
          direction="up"
          scale={1.2}
          containerClassName="w-full h-full"
          className="brightness-[0.7]"
        />
      </div>
      
      {/* Dark overlay to enhance text readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-5"></div>
      
      {/* Overlay for initial animation (similar to daylightcomputer.com) */}
      <div 
        ref={overlayRef} 
        className="absolute inset-0 bg-hivemind-black z-20"
      ></div>
      
      {/* Content */}
      <div className="container relative z-10 text-white">
        <div className="max-w-3xl">
          <TextReveal className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" type="words,chars" staggerTime={0.02}>
            Seamless Smart Home Automation & Security
          </TextReveal>
          
          <TextReveal className="text-xl md:text-2xl mb-8" type="words" staggerTime={0.05} delay={0.5}>
            Advanced technology that makes your home safer, smarter, and more efficient—effortlessly.
          </TextReveal>
          
          <button 
            ref={buttonRef}
            onClick={scrollToContact}
            className="bg-hivemind-green hover:bg-hivemind-green-dark text-white py-3 px-8 rounded-md font-medium transition-colors duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-scroll-down">
          <svg className="w-8 h-8 text-hivemind-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero; 