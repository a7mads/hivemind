import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
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
          <button className="btn-primary bg-[var(--accent)] text-[var(--primary)] hover:bg-white">
            Get a Free Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero; 