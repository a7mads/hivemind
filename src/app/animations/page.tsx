"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';
import ScrollSection from '../../components/ScrollSection';
import TextReveal from '../../components/TextReveal';
import ParallaxImage from '../../components/ParallaxImage';
import HorizontalScroll from '../../components/HorizontalScroll';
import ScrollProgress from '../../components/ScrollProgress';

export default function AnimationsDemo() {
  return (
    <main>
      <ScrollProgress color="var(--accent)" height={3} />
      
      <SmoothScroll>
        <Navbar />
        
        {/* Hero Section */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ParallaxImage 
              src="/hero-bg-alt5.jpg"
              alt="Hero background"
              speed={0.2}
              direction="up"
              scale={1.2}
              containerClassName="w-full h-full"
              className="brightness-[0.7]"
            />
          </div>
          
          <div className="container relative z-10 text-white text-center">
            <TextReveal className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6" type="words,chars" staggerTime={0.02}>
              Animation Showcase
            </TextReveal>
            
            <TextReveal className="text-xl md:text-2xl mb-8" type="words" staggerTime={0.05} delay={0.5}>
              Inspired by daylightcomputer.com
            </TextReveal>
            
            <div className="mt-8">
              <a href="#sections" className="btn-primary bg-[var(--accent)] text-[var(--primary)] hover:bg-white transition-colors duration-300">
                Explore Animations
              </a>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
            <span className="text-white text-sm mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-2 bg-white rounded-full animate-scroll-down mt-2"></div>
            </div>
          </div>
        </section>
        
        {/* Sections with different animations */}
        <div id="sections" className="py-20 bg-[var(--background)]">
          <div className="container mb-20">
            <ScrollSection fadeIn slideUp>
              <h2 className="text-4xl font-bold mb-12 text-center">Animation Components</h2>
              <p className="text-xl text-center max-w-3xl mx-auto mb-8">
                These components use GSAP and ScrollTrigger to create smooth animations triggered by scrolling.
              </p>
            </ScrollSection>
          </div>
          
          {/* Text Reveal Demo */}
          <ScrollSection className="py-20 bg-[var(--gray-light)]" fadeIn slideUp>
            <div className="container">
              <h2 className="text-3xl font-bold mb-8 text-center">Text Reveal Animation</h2>
              
              <div className="max-w-4xl mx-auto">
                <TextReveal className="text-4xl font-bold mb-6" type="chars" staggerTime={0.02}>
                  Character by character animation
                </TextReveal>
                
                <TextReveal className="text-2xl mb-8" type="words" staggerTime={0.1} delay={0.5}>
                  This text animates word by word with a slight delay
                </TextReveal>
                
                <TextReveal className="text-xl" type="words,chars" staggerTime={0.02} delay={1}>
                  This combines both word and character animations for a more complex effect
                </TextReveal>
              </div>
            </div>
          </ScrollSection>
          
          {/* Parallax Image Demo */}
          <ScrollSection className="py-20" fadeIn slideUp>
            <div className="container">
              <h2 className="text-3xl font-bold mb-8 text-center">Parallax Image Effects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="h-80">
                  <ParallaxImage 
                    src="/hero-bg-alt1.jpg"
                    alt="Parallax Up"
                    speed={0.3}
                    direction="up"
                    containerClassName="w-full h-full rounded-lg overflow-hidden"
                  />
                  <p className="text-center mt-4">Parallax Up</p>
                </div>
                
                <div className="h-80">
                  <ParallaxImage 
                    src="/hero-bg-alt2.jpg"
                    alt="Parallax Down"
                    speed={0.3}
                    direction="down"
                    containerClassName="w-full h-full rounded-lg overflow-hidden"
                  />
                  <p className="text-center mt-4">Parallax Down</p>
                </div>
              </div>
            </div>
          </ScrollSection>
          
          {/* Horizontal Scroll Demo */}
          <div className="py-20 bg-[var(--gray-light)]">
            <div className="container mb-8">
              <h2 className="text-3xl font-bold mb-4 text-center">Horizontal Scroll</h2>
              <p className="text-center mb-8">Scroll down to see the horizontal scrolling effect</p>
            </div>
            
            <HorizontalScroll>
              {[1, 2, 3, 4, 5].map((item) => (
                <div 
                  key={item}
                  className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                >
                  <div className="text-center">
                    <h3 className="text-5xl font-bold mb-4">Section {item}</h3>
                    <p className="text-xl">Horizontal scrolling panel</p>
                  </div>
                </div>
              ))}
            </HorizontalScroll>
          </div>
          
          {/* Staggered Animation Demo */}
          <ScrollSection className="py-20" fadeIn slideUp stagger>
            <div className="container">
              <h2 className="text-3xl font-bold mb-8 text-center">Staggered Animations</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div 
                    key={item}
                    className="bg-white p-6 rounded-lg shadow-lg"
                  >
                    <h3 className="text-xl font-bold mb-2">Card {item}</h3>
                    <p>These cards animate one after another with a staggered delay.</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollSection>
          
          {/* Pinned Section Demo */}
          <ScrollSection className="py-20 bg-[var(--gray-light)]" pinned scrub>
            <div className="container h-screen flex flex-col items-center justify-center">
              <h2 className="text-3xl font-bold mb-8 text-center">Pinned Section</h2>
              <p className="text-xl text-center max-w-3xl mx-auto mb-8">
                This section stays pinned while you scroll, with elements that animate based on scroll position.
              </p>
              
              <div className="w-64 h-64 bg-[var(--accent)] rounded-full flex items-center justify-center text-[var(--primary)] font-bold text-2xl">
                Scroll Down
              </div>
            </div>
          </ScrollSection>
        </div>
        
        <Footer />
      </SmoothScroll>
    </main>
  );
} 