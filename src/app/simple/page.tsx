"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Services from '../../components/Services';
import Footer from '../../components/Footer';
import ScrollProgress from '../../components/ScrollProgress';

export default function SimplePage() {
  return (
    <main>
      <ScrollProgress color="var(--accent)" height={3} />
      <Navbar />
      
      {/* Hero section */}
      <Hero />
      
      {/* About section */}
      <About />
      
      {/* Services section */}
      <Services />
      
      {/* Footer */}
      <Footer />
    </main>
  );
} 