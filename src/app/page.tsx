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

// ScrollToTop component to handle scrolling to top on page refresh
const ScrollToTop = () => {
  useEffect(() => {
    // Scroll to top on page load/refresh
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  return null; // This component doesn't render anything
};

export default function Home() {
  return (
    <main>
      <ScrollToTop />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
