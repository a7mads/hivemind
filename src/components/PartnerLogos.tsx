"use client";

import React from 'react';
import Image from 'next/image';

// Define the partner logos
const partnerLogos = [
  { name: 'Control4', logo: '/logos/control4.svg' },
  { name: 'Crestron', logo: '/logos/crestron.svg' },
  { name: 'Lutron', logo: '/logos/lutron.svg' },
  { name: 'Philips Hue', logo: '/logos/philips-hue.svg' },
  { name: 'Ubiquiti', logo: '/logos/ubiquiti.svg' },
  { name: 'Fortinet', logo: '/logos/fortinet.svg' },
  { name: 'Cisco', logo: '/logos/cisco.svg' },
  { name: 'Ring', logo: '/logos/ring.svg' },
  { name: 'Nest', logo: '/logos/nest.svg' },
  { name: 'Yale', logo: '/logos/yale.svg' },
  { name: 'Amazon Alexa', logo: '/logos/amazon-alexa.svg' },
  { name: 'Google Assistant', logo: '/logos/google-assistant.svg' },
  { name: 'Apple HomeKit', logo: '/logos/apple-homekit.svg' },
  { name: 'Hikvision', logo: '/logos/hikvision.svg' },
  { name: 'Arlo', logo: '/logos/arlo.svg' },
  { name: 'Sonos', logo: '/logos/sonos.svg' },
  { name: 'Samsung SmartThings', logo: '/logos/samsung-smartthings.svg' },
  { name: 'Honeywell', logo: '/logos/honeywell.svg' },
  { name: 'TP-Link', logo: '/logos/tp-link.svg' },
  { name: 'Sophos', logo: '/logos/sophos.svg' },
];

const PartnerLogos: React.FC = () => {
  // Split the logos into two rows
  const firstRowLogos = partnerLogos.slice(0, Math.ceil(partnerLogos.length / 2));
  const secondRowLogos = partnerLogos.slice(Math.ceil(partnerLogos.length / 2));

  return (
    <section className="py-10 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-3 text-black">Our Trusted Brands</h2>
          <p className="text-gray-600 mb-8">
            We work with the most advanced smart home, security, and networking brands to bring you a seamless experience.
          </p>
        </div>
      </div>

      {/* First row of logos - moves left */}
      <div className="logo-scroll-container mb-4">
        <div className="logo-scroll logo-scroll-left">
          {/* First set of logos */}
          {firstRowLogos.map((partner, index) => (
            <div 
              key={`first-${partner.name}-${index}`}
              className="logo-item"
            >
              <div className="logo-wrapper">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="logo-image"
                  style={{ objectFit: 'contain' }}
                  onError={() => console.error(`Failed to load logo: ${partner.logo}`)}
                />
              </div>
            </div>
          ))}
          
          {/* Duplicate set for seamless scrolling */}
          {firstRowLogos.map((partner, index) => (
            <div 
              key={`first-dup-${partner.name}-${index}`}
              className="logo-item"
            >
              <div className="logo-wrapper">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="logo-image"
                  style={{ objectFit: 'contain' }}
                  onError={() => console.error(`Failed to load logo: ${partner.logo}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second row of logos - moves right */}
      <div className="logo-scroll-container">
        <div className="logo-scroll logo-scroll-right">
          {/* First set of logos */}
          {secondRowLogos.map((partner, index) => (
            <div 
              key={`second-${partner.name}-${index}`}
              className="logo-item"
            >
              <div className="logo-wrapper">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="logo-image"
                  style={{ objectFit: 'contain' }}
                  onError={() => console.error(`Failed to load logo: ${partner.logo}`)}
                />
              </div>
            </div>
          ))}
          
          {/* Duplicate set for seamless scrolling */}
          {secondRowLogos.map((partner, index) => (
            <div 
              key={`second-dup-${partner.name}-${index}`}
              className="logo-item"
            >
              <div className="logo-wrapper">
                <Image
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  fill
                  className="logo-image"
                  style={{ objectFit: 'contain' }}
                  onError={() => console.error(`Failed to load logo: ${partner.logo}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos; 