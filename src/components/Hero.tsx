"use client";

import React from 'react';

// You can easily switch between these background images by changing the imagePath variable
// hero-bg.jpg: Modern smart home with tablet control
// hero-bg-alt1.jpg: Smart home with modern devices
// hero-bg-alt2.jpg: Futuristic smart home setup with voice control
// hero-bg-alt3.jpg: Sleek modern smart home with minimalist design
// hero-bg-alt4.jpg: Contemporary smart home with elegant aesthetic
// hero-bg-alt5.jpg: High-tech smart home with futuristic interface
// hero-bg-alt6.jpg: Elegant living room with smart home integration
// hero-bg-alt7.jpg: Modern smart home with advanced technology display
const imagePath = '/hero-bg-alt3.jpg'; // Change this to try different images

const Hero = () => {
  // Function to scroll to the contact section when the button is clicked
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={imagePath}
          alt="Smart home"
          className="w-full h-full object-cover brightness-[0.7]"
        />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Seamless Smart Home Automation & Security
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Advanced technology that makes your home safer, smarter, and more efficient—effortlessly.
          </p>
          <button 
            onClick={scrollToContact}
            className="btn-primary bg-[var(--accent)] text-[var(--primary)] hover:bg-white transition-colors duration-300"
          >
            Get a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero; 