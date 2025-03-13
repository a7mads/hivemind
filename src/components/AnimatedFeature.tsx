"use client";

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, DrawSVGPlugin } from '../utils/gsapPlugins';

const AnimatedFeature = () => {
  // Create refs for elements we want to animate
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const featureBoxRef = useRef<HTMLDivElement | null>(null);
  const circleRef = useRef<SVGCircleElement | null>(null);
  const iconRefs = useRef<(SVGPathElement | null)[]>([]);
  const textBlocksRef = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP animations
  useEffect(() => {
    // Reset refs arrays
    iconRefs.current = [];
    textBlocksRef.current = [];

    // Create a master timeline
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Title animation
    masterTl.fromTo(
      titleRef.current,
      { 
        opacity: 0,
        y: 50
      },
      { 
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }
    );

    // Subtitle animation
    masterTl.fromTo(
      subtitleRef.current,
      { 
        opacity: 0,
        y: 30
      },
      { 
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      },
      "-=0.6" // Start slightly before the previous animation ends
    );

    // Feature box animation
    masterTl.fromTo(
      featureBoxRef.current,
      { 
        opacity: 0,
        scale: 0.9,
        y: 30
      },
      { 
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)"
      },
      "-=0.4"
    );

    // Circle animation - always use the fallback animation
    if (circleRef.current) {
      // Set initial state
      const circumference = 2 * Math.PI * 80; // 2πr where r=80
      circleRef.current.style.strokeDasharray = `${circumference}`;
      circleRef.current.style.strokeDashoffset = `${circumference}`;
      
      // Animate
      masterTl.to(
        circleRef.current,
        { 
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut"
        },
        "-=0.8"
      );
    }

    // Icon animations
    masterTl.fromTo(
      iconRefs.current,
      { 
        scale: 0,
        opacity: 0
      },
      { 
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=1.2"
    );

    // Text blocks animation
    masterTl.fromTo(
      textBlocksRef.current,
      { 
        x: -20,
        opacity: 0
      },
      { 
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      },
      "-=0.8"
    );

    // Floating animation for the feature box (continuous)
    gsap.to(featureBoxRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Rotation animation for the circle (continuous)
    gsap.to(circleRef.current, {
      rotation: 360,
      transformOrigin: "center center",
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    // Clean up animations on component unmount
    return () => {
      masterTl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Add to icon refs array
  const addToIconRef = (el: SVGPathElement | null, index: number) => {
    if (el) {
      iconRefs.current[index] = el;
    }
  };

  // Add to text blocks refs array
  const addToTextBlocksRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      textBlocksRef.current[index] = el;
    }
  };

  return (
    <section id="animated-feature" className="section bg-[var(--gray-light)]" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>Smart Home Experience</h2>
        <p className="section-subtitle" ref={subtitleRef}>
          Discover how our integrated solutions transform your living space
        </p>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-16">
          {/* Feature visualization */}
          <div 
            className="relative w-full max-w-md aspect-square"
            ref={featureBoxRef}
          >
            {/* SVG animation */}
            <svg 
              viewBox="0 0 200 200" 
              className="w-full h-full absolute top-0 left-0"
            >
              {/* Decorative circle */}
              <circle
                ref={circleRef}
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              
              {/* Smart home icon in center */}
              <g transform="translate(70, 70) scale(0.6)">
                <path
                  ref={(el) => addToIconRef(el, 0)}
                  d="M100,20 L180,80 L180,180 L20,180 L20,80 L100,20z"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="4"
                />
                <path
                  ref={(el) => addToIconRef(el, 1)}
                  d="M70,180 L70,120 L130,120 L130,180"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="4"
                />
                <path
                  ref={(el) => addToIconRef(el, 2)}
                  d="M60,80 L140,80 L140,110 L60,110 L60,80z"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="4"
                />
                <circle
                  ref={(el) => addToIconRef(el, 3)}
                  cx="100"
                  cy="50"
                  r="10"
                  fill="var(--accent)"
                />
              </g>
              
              {/* Feature icons around the circle */}
              <g transform="translate(40, 40) scale(0.2)">
                <path
                  ref={(el) => addToIconRef(el, 4)}
                  d="M50,50 L150,50 L150,150 L50,150 L50,50z M50,100 L150,100 M100,50 L100,150"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="8"
                />
              </g>
              
              <g transform="translate(140, 40) scale(0.2)">
                <path
                  ref={(el) => addToIconRef(el, 5)}
                  d="M100,50 C150,50 150,150 100,150 C50,150 50,50 100,50z"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="8"
                />
                <path
                  ref={(el) => addToIconRef(el, 6)}
                  d="M70,100 L130,100"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="8"
                />
              </g>
              
              <g transform="translate(40, 140) scale(0.2)">
                <path
                  ref={(el) => addToIconRef(el, 7)}
                  d="M50,100 L150,100 M100,50 L100,150"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="8"
                />
                <circle
                  ref={(el) => addToIconRef(el, 8)}
                  cx="100"
                  cy="100"
                  r="40"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="8"
                />
              </g>
              
              <g transform="translate(140, 140) scale(0.2)">
                <path
                  ref={(el) => addToIconRef(el, 9)}
                  d="M75,50 L125,50 L150,100 L125,150 L75,150 L50,100 L75,50z"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="8"
                />
                <circle
                  ref={(el) => addToIconRef(el, 10)}
                  cx="100"
                  cy="100"
                  r="20"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="8"
                />
              </g>
            </svg>
          </div>
          
          {/* Feature text content */}
          <div className="w-full max-w-xl space-y-8">
            <div 
              className="feature-block"
              ref={(el) => addToTextBlocksRef(el, 0)}
            >
              <h3 className="text-2xl font-semibold mb-2 text-[var(--accent)]">Centralized Control</h3>
              <p className="text-lg">
                Manage your entire home from a single interface. Control lighting, climate, security, and entertainment systems with just a tap or voice command.
              </p>
            </div>
            
            <div 
              className="feature-block"
              ref={(el) => addToTextBlocksRef(el, 1)}
            >
              <h3 className="text-2xl font-semibold mb-2 text-[var(--accent)]">Intelligent Automation</h3>
              <p className="text-lg">
                Your home learns your preferences and adapts to your lifestyle. Set schedules, create scenes, and let your home respond automatically to your needs.
              </p>
            </div>
            
            <div 
              className="feature-block"
              ref={(el) => addToTextBlocksRef(el, 2)}
            >
              <h3 className="text-2xl font-semibold mb-2 text-[var(--accent)]">Seamless Integration</h3>
              <p className="text-lg">
                All your devices work together in perfect harmony. Our systems integrate with the leading smart home brands and technologies for a unified experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedFeature; 