"use client";

import React from "react";
import Image from "next/image";

const partnerLogos = [
  "/logos/logo1.svg", "/logos/logo2.svg", "/logos/logo3.svg", "/logos/logo4.svg", 
  "/logos/logo5.svg", "/logos/logo6.svg", "/logos/logo7.svg", "/logos/logo8.svg"
];

const PartnerLogos = () => {
  // Create duplicate arrays for seamless scrolling
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];
  
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Trusted by Industry Leaders</h2>
        
        {/* First row - scrolling left */}
        <div className="logo-scroll-container">
          <div className="logo-scroll">
            <ul className="logo-scroll-content">
              {duplicatedLogos.map((logo, index) => (
                <li key={`logo1-${index}`}>
                  <div className="logo-item">
                    <Image 
                      src={logo} 
                      alt={`Partner ${index % partnerLogos.length + 1}`} 
                      width={150}
                      height={60}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Second row - scrolling right */}
        <div className="logo-scroll-container">
          <div className="logo-scroll logo-scroll-reverse">
            <ul className="logo-scroll-content">
              {duplicatedLogos.map((logo, index) => (
                <li key={`logo2-${index}`}>
                  <div className="logo-item">
                    <Image 
                      src={logo} 
                      alt={`Partner ${index % partnerLogos.length + 1}`} 
                      width={150}
                      height={60}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos; 