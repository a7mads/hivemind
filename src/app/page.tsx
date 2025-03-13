"use client";

import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
// Animated components
import AnimatedFeature from '../components/AnimatedFeature';
import AnimatedCounter from '../components/AnimatedCounter';
import AnimatedTimeline from '../components/AnimatedTimeline';
// New animation components
import SmoothScroll from '../components/SmoothScroll';
import ScrollSection from '../components/ScrollSection';
import ScrollProgress from '../components/ScrollProgress';
import { gsap } from '../utils/gsapPlugins';

// ScrollToTop component to handle scrolling to top on page refresh
const ScrollToTop = () => {
  useEffect(() => {
    // Scroll to top on page load/refresh
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    
    // Set up GSAP defaults
    gsap.config({
      nullTargetWarn: false,
    });
    
    // Disable smooth scrolling on mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      document.body.classList.add('is-mobile');
    }

    // Log GSAP version and availability
    console.log('GSAP version:', gsap.version);
    console.log('GSAP registered:', gsap);

    // Add error handler
    const originalError = console.error;
    console.error = (...args) => {
      console.log('ERROR DETECTED:', ...args);
      originalError.apply(console, args);
    };

    return () => {
      // Restore original console.error
      console.error = originalError;
    };
  }, []);

  return null; // This component doesn't render anything
};

export default function Home() {
  useEffect(() => {
    console.log('Home component mounted');
    
    try {
      // Test GSAP
      const testAnimation = gsap.to({}, { duration: 1 });
      console.log('GSAP animation created successfully:', testAnimation);
      testAnimation.kill();
    } catch (error) {
      console.error('Error creating GSAP animation:', error);
    }
  }, []);

  return (
    <main>
      <ScrollToTop />
      <PageTransition />
      <ScrollProgress color="#2e7d32" height={3} />
      
      {/* Use SmoothScroll for desktop only */}
      <SmoothScroll>
        <Navbar />
        
        {/* Hero section */}
        <Hero />
        
        {/* About section with scroll animations */}
        <ScrollSection fadeIn slideUp stagger>
          <About />
        </ScrollSection>
        
        {/* Services section with scroll animations */}
        <ScrollSection fadeIn slideUp delay={0.2}>
          <Services />
        </ScrollSection>
        
        {/* Animated Feature section with scroll animations */}
        <ScrollSection fadeIn slideUp>
          <AnimatedFeature />
        </ScrollSection>
        
        {/* Animated Counter section with scroll animations */}
        <ScrollSection fadeIn slideUp>
          <AnimatedCounter />
        </ScrollSection>
        
        {/* Why Choose Us section with scroll animations */}
        <ScrollSection fadeIn slideUp stagger>
          <WhyChooseUs />
        </ScrollSection>
        
        {/* Animated Timeline section with scroll animations */}
        <ScrollSection fadeIn slideUp>
          <AnimatedTimeline />
        </ScrollSection>
        
        {/* Testimonials section with scroll animations */}
        <ScrollSection fadeIn slideUp stagger>
          <Testimonials />
        </ScrollSection>
        
        {/* Contact section with scroll animations */}
        <ScrollSection fadeIn slideUp>
          <Contact />
        </ScrollSection>
        
        {/* Footer */}
        <Footer />
      </SmoothScroll>
    </main>
  );
}
