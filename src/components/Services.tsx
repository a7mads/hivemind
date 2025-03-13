import React from 'react';
import Image from 'next/image';

const services = [
  {
    id: 1,
    title: 'Home Automation',
    description: 'Control everything from lights to thermostats with a touch or voice command.',
    icon: '/icons/home-automation.svg',
  },
  {
    id: 2,
    title: 'Smart Lighting',
    description: 'Energy-efficient, automated lighting with customizable moods and presets.',
    icon: '/icons/smart-lighting.svg',
  },
  {
    id: 3,
    title: 'Wi-Fi & Network Solutions',
    description: 'Whole-home connectivity with high-speed, secure networks.',
    icon: '/icons/wifi-network.svg',
  },
  {
    id: 4,
    title: 'Security & Firewalls',
    description: 'AI-powered surveillance, smart locks, and cybersecurity protection.',
    icon: '/icons/security.svg',
  },
];

const Services = () => {
  return (
    <section id="services" className="section">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Comprehensive smart home solutions tailored to your needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white dark:bg-[var(--gray-light)] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[var(--primary)] bg-opacity-10">
                  <Image 
                    src={service.icon} 
                    alt={service.title} 
                    width={32} 
                    height={32}
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-3">{service.title}</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 