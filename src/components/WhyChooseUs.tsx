import React from 'react';
import Image from 'next/image';
// import LightbulbAnimation from './LightbulbAnimation';
// import LightbulbAnimationIframe from './LightbulbAnimationIframe';

const features = [
  {
    id: 1,
    title: '100% Seamless Integration',
    description: 'All systems work together smoothly.',
    icon: '/icons/integration.svg',
  },
  {
    id: 2,
    title: 'Expert Support',
    description: 'From installation to maintenance, we\'re always here.',
    icon: '/icons/support.svg',
  },
  {
    id: 3,
    title: 'Top-Tier Security',
    description: 'Protecting your home with enterprise-grade technology.',
    icon: '/icons/security-shield.svg',
  },
  {
    id: 4,
    title: 'Energy Efficiency & Cost Savings',
    description: 'Automation that optimizes energy use.',
    icon: '/icons/energy.svg',
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="section bg-[var(--primary)] text-white">
      <div className="container">
        <div className="flex items-center justify-center mb-6">
          <h2 className="section-title text-white">Why Choose Us?</h2>
        </div>
        <p className="section-subtitle text-white opacity-90">
          We deliver excellence in every aspect of smart home technology
        </p>
        
        <div className="flex items-center space-x-4 p-6 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors mb-8 mt-12">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--accent)]">
              <Image 
                src="/icons/uae-flag.svg" 
                alt="Local Expertise" 
                width={24} 
                height={24}
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Local Expertise, Trusted by UAE Homes & Businesses</h3>
            <p className="opacity-90">
              As a UAE-based company led by Emirati engineers, we bring a deep understanding of local infrastructure, security regulations, and environmental factors, ensuring tailored smart home solutions designed for homes and businesses in the region.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-start space-x-4 p-6 rounded-lg bg-white bg-opacity-10 hover:bg-opacity-20 transition-colors">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[var(--accent)]">
                  <Image 
                    src={feature.icon} 
                    alt={feature.title} 
                    width={24} 
                    height={24}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="opacity-90">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 