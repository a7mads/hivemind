"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapPlugins';

// Stats data
const stats = [
  {
    id: 1,
    value: 500,
    suffix: '+',
    label: 'Projects Completed',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    )
  },
  {
    id: 2,
    value: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
      </svg>
    )
  },
  {
    id: 3,
    value: 10,
    suffix: 'K+',
    label: 'Smart Devices Installed',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect>
        <polyline points="17 2 12 7 7 2"></polyline>
      </svg>
    )
  },
  {
    id: 4,
    value: 15,
    suffix: '+',
    label: 'Years of Experience',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    )
  }
];

const AnimatedCounter = () => {
  // Create refs for elements we want to animate
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // State to track counter values
  const [counters, setCounters] = useState<number[]>(stats.map(() => 0));

  // GSAP animations
  useEffect(() => {
    // Reset refs arrays
    counterRefs.current = [];
    cardRefs.current = [];
    iconRefs.current = [];

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { 
        opacity: 0,
        y: 30
      },
      { 
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Card animations with stagger
    gsap.fromTo(
      cardRefs.current,
      { 
        opacity: 0,
        y: 50,
        scale: 0.9
      },
      { 
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      }
    );

    // Icon animations
    gsap.fromTo(
      iconRefs.current,
      { 
        rotation: -30,
        opacity: 0
      },
      { 
        rotation: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      }
    );

    // Counter animations using state instead of innerText
    stats.forEach((stat, index) => {
      // Create a counter animation using onUpdate
      gsap.to({}, {
        duration: 2,
        delay: 0.5 + (index * 0.1),
        ease: "power2.out",
        onUpdate: function() {
          const progress = this.progress();
          const value = Math.round(progress * stat.value);
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = value;
            return newCounters;
          });
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      });
    });

    // Clean up animations on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Add to refs arrays
  const addToCardRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardRefs.current[index] = el;
    }
  };

  const addToIconRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      iconRefs.current[index] = el;
    }
  };

  return (
    <section id="stats" className="section bg-[var(--primary)] text-white" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title text-white" ref={titleRef}>Our Impact by the Numbers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {stats.map((stat, index) => (
            <div 
              key={stat.id}
              className="bg-[var(--primary-dark)] p-6 rounded-lg shadow-lg text-center"
              ref={(el) => addToCardRef(el, index)}
            >
              <div 
                className="flex justify-center mb-4 text-[var(--accent)]"
                ref={(el) => addToIconRef(el, index)}
              >
                {stat.icon}
              </div>
              
              <div className="counter-value text-4xl font-bold mb-2">
                <span>{counters[index]}</span>
                <span>{stat.suffix}</span>
              </div>
              
              <div className="counter-label text-lg opacity-80">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedCounter; 