"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapPlugins';

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
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

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
    
    // Background image fade in
    tl.fromTo(backgroundRef.current, 
      { opacity: 0, scale: 1.1 }, 
      { opacity: 1, scale: 1, duration: 1.5 }
    );
    
    // Heading animation
    tl.fromTo(headingRef.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 }, 
      "-=0.8" // Start slightly before the previous animation ends
    );
    
    // Paragraph animation
    tl.fromTo(paragraphRef.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 }, 
      "-=0.6"
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
    <section className="relative h-screen flex items-center" ref={sectionRef}>
      {/* Background image with parallax effect */}
      <div ref={backgroundRef} className="absolute inset-0 z-0">
        <img
          src={imagePath}
          alt="Smart home"
          className="w-full h-full object-cover brightness-[0.7]"
        />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 text-white">
        <div className="max-w-3xl">
          <h1 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Seamless Smart Home Automation & Security
          </h1>
          <p ref={paragraphRef} className="text-xl md:text-2xl mb-8">
            Advanced technology that makes your home safer, smarter, and more efficient—effortlessly.
          </p>
          <button 
            ref={buttonRef}
            onClick={scrollToContact}
            className="btn-primary bg-[var(--accent)] text-[var(--primary)] hover:bg-white transition-colors duration-300"
          >
            Get a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero; 