"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger } from '../utils/gsapPlugins';

const services = [
  {
    id: 1,
    title: 'Home Automation',
    description: 'Control everything from lights to thermostats with a touch or voice command.',
    icon: '/icons/home-automation.svg',
  },
  {
    id: 2,
    title: 'Smart Lighting',
    description: 'Energy-efficient, automated lighting with customizable moods and presets.',
    icon: '/icons/smart-lighting.svg',
  },
  {
    id: 3,
    title: 'Wi-Fi & Network Solutions',
    description: 'Whole-home connectivity with high-speed, secure networks.',
    icon: '/icons/wifi-network.svg',
  },
  {
    id: 4,
    title: 'Security & Firewalls',
    description: 'AI-powered surveillance, smart locks, and cybersecurity protection.',
    icon: '/icons/security.svg',
  },
];

const Services = () => {
  // Create refs for elements we want to animate
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  
  // GSAP animations
  useEffect(() => {
    // Reset the refs arrays
    cardsRef.current = [];
    iconRefs.current = [];
    titleRefs.current = [];

    // Title animation with text reveal effect
    if (titleRef.current) {
      // Split the text into words
      const words = titleRef.current.textContent?.split(' ') || [];
      titleRef.current.innerHTML = '';
      
      // Create a span for each word
      words.forEach((word, i) => {
        const wordSpan = document.createElement('span');
        wordSpan.innerHTML = word + (i < words.length - 1 ? '&nbsp;' : '');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.overflow = 'hidden';
        
        const innerSpan = document.createElement('span');
        innerSpan.innerHTML = word + (i < words.length - 1 ? '&nbsp;' : '');
        innerSpan.style.display = 'inline-block';
        innerSpan.style.transform = 'translateY(100%)';
        
        wordSpan.appendChild(innerSpan);
        titleRef.current?.appendChild(wordSpan);
      });
      
      // Animate each word
      gsap.to(titleRef.current.querySelectorAll('span > span'), {
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }

    // Subtitle animation with fade in
    gsap.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Service cards staggered animation with 3D effect
    gsap.fromTo(
      cardsRef.current,
      { 
        y: 80, 
        opacity: 0,
        rotationX: 15,
        rotationY: -15,
        transformPerspective: 800
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // Animate icons with a bounce effect
    gsap.fromTo(
      iconRefs.current,
      { 
        scale: 0,
        rotation: -30
      },
      {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        delay: 0.3,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // Animate service titles with a text reveal
    gsap.fromTo(
      titleRefs.current,
      { 
        y: 20,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.15,
        delay: 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

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

  // Card hover animation
  const handleCardHover = (index: number, isEnter: boolean) => {
    if (cardsRef.current[index]) {
      gsap.to(cardsRef.current[index], {
        y: isEnter ? -10 : 0,
        scale: isEnter ? 1.03 : 1,
        boxShadow: isEnter ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        duration: 0.3,
        ease: "power2.out"
      });
    }
    
    if (iconRefs.current[index]) {
      gsap.to(iconRefs.current[index], {
        rotation: isEnter ? 360 : 0,
        scale: isEnter ? 1.1 : 1,
        duration: 0.5,
        ease: "power1.out"
      });
    }
  };

  return (
    <section id="services" className="section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title overflow-hidden" ref={titleRef}>Our Services</h2>
        <p className="section-subtitle" ref={subtitleRef}>
          Comprehensive smart home solutions tailored to your needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="bg-white dark:bg-[var(--gray-light)] p-6 rounded-lg shadow-md transition-all duration-300"
              ref={(el) => addToCardsRef(el, index)}
              onMouseEnter={() => handleCardHover(index, true)}
              onMouseLeave={() => handleCardHover(index, false)}
            >
              <div className="flex justify-center mb-4">
                <div 
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-[var(--primary)] bg-opacity-10"
                  ref={(el) => addToIconRef(el, index)}
                >
                  <Image 
                    src={service.icon} 
                    alt={service.title} 
                    width={32} 
                    height={32}
                  />
                </div>
              </div>
              <h3 
                className="text-xl font-semibold text-center mb-3"
                ref={(el) => addToTitleRef(el, index)}
              >
                {service.title}
              </h3>
              <p className="text-center text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 