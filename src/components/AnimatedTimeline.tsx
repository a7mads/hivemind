"use client";

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapPlugins';

// Timeline data
const timelineData = [
  {
    id: 1,
    year: 'Day 1',
    title: 'Consultation & Planning',
    description: 'We assess your needs, discuss options, and create a customized smart home plan.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
      </svg>
    )
  },
  {
    id: 2,
    year: 'Week 1',
    title: 'System Design & Preparation',
    description: 'Our engineers design your system architecture and prepare all necessary equipment.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    )
  },
  {
    id: 3,
    year: 'Week 2',
    title: 'Installation & Setup',
    description: 'Our expert technicians install all hardware and configure your system for optimal performance.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
      </svg>
    )
  },
  {
    id: 4,
    year: 'Week 3',
    title: 'Testing & Training',
    description: 'We thoroughly test all systems and provide comprehensive training on how to use your new smart home.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    )
  },
  {
    id: 5,
    year: 'Ongoing',
    title: 'Support & Maintenance',
    description: 'We provide ongoing support, maintenance, and updates to ensure your system runs smoothly.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    )
  }
];

const AnimatedTimeline = () => {
  // Create refs for elements we want to animate
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const timelineItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineDotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineContentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // GSAP animations
  useEffect(() => {
    // Reset refs arrays
    timelineItemRefs.current = [];
    timelineDotRefs.current = [];
    timelineContentRefs.current = [];

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

    // Subtitle animation
    gsap.fromTo(
      subtitleRef.current,
      { 
        opacity: 0,
        y: 20
      },
      { 
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Timeline line animation - progressive growth with scroll
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { 
          scaleY: 0,
          transformOrigin: "top center"
        },
        { 
          scaleY: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 0.5, // Smooth scrubbing effect tied to scroll position
          }
        }
      );
    }

    // Animate each timeline item as it comes into view
    timelineItemRefs.current.forEach((item, index) => {
      if (!item) return;

      // Create a timeline for each item
      const itemTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 75%",
          end: "center 60%",
          toggleActions: "play none none reverse",
          scrub: 0.2, // Smooth scrubbing effect tied to scroll position
        }
      });

      // Dot animation
      if (timelineDotRefs.current[index]) {
        itemTl.fromTo(
          timelineDotRefs.current[index],
          {
            scale: 0,
            opacity: 0
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)"
          },
          0
        );
      }

      // Content animation - different for left and right sides
      if (timelineContentRefs.current[index]) {
        const isEven = index % 2 === 0;
        itemTl.fromTo(
          timelineContentRefs.current[index],
          {
            opacity: 0,
            x: isEven ? 50 : -50,
            y: 20,
            rotation: isEven ? 2 : -2
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.6,
            ease: "power2.out"
          },
          0.2
        );
      }
    });

    // Clean up animations on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Add to refs arrays
  const addToTimelineItemRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      timelineItemRefs.current[index] = el;
    }
  };

  const addToTimelineDotRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      timelineDotRefs.current[index] = el;
    }
  };

  const addToTimelineContentRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      timelineContentRefs.current[index] = el;
    }
  };

  return (
    <section id="process" className="section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>Our Process</h2>
        <p className="section-subtitle" ref={subtitleRef}>
          How we transform your home into a smart living space
        </p>
        
        <div className="relative mt-16 pb-8" ref={timelineRef}>
          {/* Timeline center line */}
          <div 
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform -translate-x-1/2"
            ref={lineRef}
          ></div>
          
          {/* Timeline items */}
          {timelineData.map((item, index) => (
            <div 
              key={item.id}
              className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              ref={(el) => addToTimelineItemRef(el, index)}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div 
                  className="w-6 h-6 rounded-full bg-[var(--primary)] border-4 border-white shadow-md"
                  ref={(el) => addToTimelineDotRef(el, index)}
                ></div>
              </div>
              
              {/* Timeline content */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <div 
                  className="bg-white p-6 rounded-lg shadow-md"
                  ref={(el) => addToTimelineContentRef(el, index)}
                >
                  <div className="flex items-center mb-2 text-[var(--accent)]">
                    <div className={`${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                      {item.icon}
                    </div>
                  </div>
                  <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="text-lg font-semibold text-[var(--primary)]">{item.year}</div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Empty space for the other side */}
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedTimeline; 