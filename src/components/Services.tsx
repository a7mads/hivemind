"use client";

import React, { useEffect, useRef } from 'react';
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

  // GSAP animations
  useEffect(() => {
    // Reset the cards ref array
    cardsRef.current = [];

    // Title and subtitle animations
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    gsap.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Service cards staggered animation
    gsap.fromTo(
      cardsRef.current,
      { 
        y: 50, 
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      }
    );

    // Clean up animations on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Add to cards ref array
  const addToCardsRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  return (
    <section id="services" className="section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>Our Services</h2>
        <p className="section-subtitle" ref={subtitleRef}>
          Comprehensive smart home solutions tailored to your needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="bg-white dark:bg-[var(--gray-light)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              ref={(el) => addToCardsRef(el, index)}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[var(--primary)] bg-opacity-10">
                  <Image 
                    src={service.icon} 
                    alt={service.title} 
                    width={32} 
                    height={32}
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">{service.title}</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 