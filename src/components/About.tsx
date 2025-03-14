"use client";

import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, SplitText } from '../utils/gsapPlugins';

const About = () => {
  // Create refs for elements we want to animate
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);

  // GSAP animations
  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
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

    // Text animation with character splitting
    if (textRef.current) {
      try {
        // Create a SplitText instance for the paragraph
        const splitText = new SplitText(textRef.current, { type: "words,chars" });
        const chars = splitText.chars;

        // Animate each character
        gsap.fromTo(
          chars,
          { 
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.03,
            stagger: 0.02,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );

        // Highlight the bold text with a special animation
        const boldText = textRef.current.querySelector('span');
        if (boldText) {
          gsap.fromTo(
            boldText,
            { color: "inherit" },
            { 
              color: "var(--accent)",
              duration: 0.8,
              delay: 1.5,
              scrollTrigger: {
                trigger: textRef.current,
                start: "top 80%",
                toggleActions: "play none none none"
              }
            }
          );
        }

        // Clean up on unmount
        return () => {
          splitText.revert();
        };
      } catch {
        // Fallback animation if SplitText fails
        gsap.fromTo(
          textRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.3,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }

    // Clean up animations on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" className="section bg-[var(--gray-light)] relative z-20" ref={sectionRef}>
      <div className="container relative">
        <h2 className="section-title relative z-20" ref={titleRef}>About Hivemind</h2>
        <div className="max-w-4xl mx-auto text-center relative z-20">
          <p className="text-lg md:text-xl relative" ref={textRef}>
            <span className="text-[var(--accent)]">Hivemind</span> is an Emirati-owned company based in the UAE, operated and managed by highly skilled Emirati engineers with deep expertise in <span className="font-semibold">smart home automation, networking, and security</span>. Our mission is to provide seamless, secure, and cutting-edge technology solutions that enhance modern living in the UAE.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About; 