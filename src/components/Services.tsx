"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, SplitText } from '../utils/gsapPlugins';
import { card3DHoverEffect } from '../utils/gsapAnimations';
import LightbulbAnimation from './LightbulbAnimation';

const services = [
  {
    id: 1,
    title: 'Home Automation',
    description: 'Control everything from lights to thermostats with a touch or voice command.',
    icon: '/icons/home-automation-animated.svg',
    color: '#0a2463',
  },
  {
    id: 2,
    title: 'Smart Lighting',
    description: 'Energy-efficient, automated lighting with customizable moods and presets.',
    icon: '/icons/smart-lighting-animated.svg',
    color: '#3e92cc',
  },
  {
    id: 3,
    title: 'Wi-Fi & Network Solutions',
    description: 'Whole-home connectivity with high-speed, secure networks.',
    icon: '/icons/wifi-network-animated.svg',
    color: '#00f5d4',
  },
  {
    id: 4,
    title: 'Security & Firewalls',
    description: 'AI-powered surveillance, smart locks, and cybersecurity protection.',
    icon: '/icons/security-animated.svg',
    color: '#ff5a5f',
  },
];

const Services = () => {
  // Create refs for elements we want to animate
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const svgRefs = useRef<(SVGSVGElement | null)[]>([]);
  
  // State for the active card
  const [activeCard, setActiveCard] = useState<number | null>(null);
  
  // GSAP animations
  useEffect(() => {
    // Reset the refs arrays
    cardsRef.current = [];
    iconRefs.current = [];
    titleRefs.current = [];
    descRefs.current = [];
    svgRefs.current = [];

    // Create a timeline for the section entrance
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none none",
      }
    });

    // Title animation with SplitText
    if (titleRef.current) {
      const splitTitle = new SplitText(titleRef.current, { type: "chars, words" });
      
      mainTl.from(splitTitle.chars, {
        opacity: 0,
        y: 100,
        rotationX: -90,
        stagger: 0.02,
        duration: 0.8,
        ease: "back.out(1.7)",
      }, 0);
    }

    // Subtitle animation
    mainTl.fromTo(
      subtitleRef.current,
      { 
        y: 50, 
        opacity: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)"
      },
      {
        y: 0,
        opacity: 1,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 1,
        ease: "power3.out"
      },
      0.4
    );

    // Cards container animation
    mainTl.fromTo(
      cardsContainerRef.current,
      { 
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
      },
      0.6
    );

    // Service cards staggered animation
    mainTl.fromTo(
      cardsRef.current,
      { 
        y: 100, 
        opacity: 0,
        scale: 0.8,
        rotationY: -15,
        transformPerspective: 1000
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        stagger: 0.15,
        ease: "elastic.out(1, 0.75)",
      },
      0.8
    );

    // Animate SVG elements
    svgRefs.current.forEach((svgRef, index) => {
      if (svgRef) {
        // Get all paths in the SVG
        const paths = svgRef.querySelectorAll('path, circle, rect, polyline');
        
        // Create a timeline for each SVG
        const svgTl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsRef.current[index],
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
        
        // Draw each path
        svgTl.fromTo(
          paths, 
          { 
            drawSVG: "0%",
            opacity: 0
          },
          {
            drawSVG: "100%",
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.inOut"
          }
        );
      }
    });

    // Apply 3D hover effect to each card
    cardsRef.current.forEach((card) => {
      if (card) {
        const cleanup = card3DHoverEffect(card, 5);
        return () => cleanup();
      }
    });

    // Clean up animations on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Add to refs arrays
  const addToCardsRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  const addToIconRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      iconRefs.current[index] = el;
    }
  };

  const addToTitleRef = (el: HTMLHeadingElement | null, index: number) => {
    if (el) {
      titleRefs.current[index] = el;
    }
  };

  const addToDescRef = (el: HTMLParagraphElement | null, index: number) => {
    if (el) {
      descRefs.current[index] = el;
    }
  };

  const addToSvgRef = (el: SVGSVGElement | null, index: number) => {
    if (el) {
      svgRefs.current[index] = el;
    }
  };

  // Card hover and click animations
  const handleCardHover = (index: number, isEnter: boolean) => {
    if (iconRefs.current[index]) {
      gsap.to(iconRefs.current[index], {
        y: isEnter ? -8 : 0,
        scale: isEnter ? 1.1 : 1,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
    }

    if (svgRefs.current[index]) {
      // Animate specific SVG elements based on the service type
      const paths = svgRefs.current[index].querySelectorAll('path, circle, rect, polyline');
      
      if (isEnter) {
        gsap.to(paths, {
          stroke: services[index].color,
          strokeWidth: 2,
          stagger: 0.03,
          duration: 0.3,
          ease: "power1.inOut"
        });
      } else {
        gsap.to(paths, {
          stroke: "#0a2463",
          strokeWidth: 1.5,
          stagger: 0.02,
          duration: 0.3,
          ease: "power1.inOut"
        });
      }
    }
  };

  const handleCardClick = (index: number) => {
    // Toggle active state
    const newActiveCard = activeCard === index ? null : index;
    setActiveCard(newActiveCard);
    
    // Animate all cards
    cardsRef.current.forEach((card, i) => {
      if (card) {
        if (newActiveCard === null) {
          // Reset all cards
          gsap.to(card, {
            y: 0,
            x: 0,
            scale: 1,
            opacity: 1,
            width: "100%",
            height: "auto",
            duration: 0.5,
            ease: "power3.out"
          });
        } else if (i === newActiveCard) {
          // Expand active card
          gsap.to(card, {
            y: 0,
            x: 0,
            scale: 1.05,
            opacity: 1,
            zIndex: 10,
            duration: 0.5,
            ease: "power3.out"
          });
        } else {
          // Minimize other cards
          gsap.to(card, {
            y: 10,
            x: 0,
            scale: 0.95,
            opacity: 0.7,
            zIndex: 1,
            duration: 0.5,
            ease: "power3.out"
          });
        }
      }
    });

    // Animate description text for the active card
    if (descRefs.current[index] && newActiveCard !== null) {
      gsap.fromTo(
        descRefs.current[index],
        { height: "auto", opacity: 0.7 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  };

  return (
    <section id="services" className="section py-20 md:py-32" ref={sectionRef}>
      <div className="container">
        <div className="flex items-center justify-center mb-6">
          <h2 className="section-title font-montserrat text-4xl md:text-5xl font-bold text-center overflow-hidden mr-4" ref={titleRef}>
            Our Services
          </h2>
          <LightbulbAnimation width={60} height={60} className="hidden md:block" />
        </div>
        <p className="section-subtitle font-poppins text-lg md:text-xl text-center max-w-3xl mx-auto mb-16 text-gray-600 dark:text-gray-300" ref={subtitleRef}>
          Comprehensive smart home solutions tailored to your needs
        </p>
        
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
          ref={cardsContainerRef}
        >
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`bg-white dark:bg-[var(--gray-light)] p-8 rounded-xl shadow-lg transition-all duration-300 cursor-pointer transform ${activeCard === index ? 'ring-2 ring-[var(--accent)]' : ''}`}
              ref={(el) => addToCardsRef(el, index)}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
              onClick={() => handleCardClick(index)}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <div 
                className="flex justify-center mb-6 transition-all duration-300"
                ref={(el) => addToIconRef(el, index)}
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[var(--primary)] bg-opacity-5 p-4">
                  <div className="w-full h-full" dangerouslySetInnerHTML={{ 
                    __html: `<object type="image/svg+xml" data="${service.icon}" class="w-full h-full" ref=${(el: HTMLObjectElement | null) => {
                      if (el && el.contentDocument) {
                        const svg = el.contentDocument.querySelector('svg');
                        if (svg) addToSvgRef(svg as unknown as SVGSVGElement, index);
                      }
                    }}></object>` 
                  }} />
                </div>
              </div>
              <h3 
                className="text-xl font-montserrat font-semibold text-center mb-4"
                ref={(el) => addToTitleRef(el, index)}
              >
                {service.title}
              </h3>
              <p 
                className="text-center text-gray-600 dark:text-gray-300 font-poppins"
                ref={(el) => addToDescRef(el, index)}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 