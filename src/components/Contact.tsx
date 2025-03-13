import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Ready to make your home smarter?</h2>
        <p className="section-subtitle">
          Get in touch with our team for a free consultation
        </p>
        
        <div className="max-w-3xl mx-auto mt-12">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[var(--gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="Your name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[var(--gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="Your email"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="block font-medium">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[var(--gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="Your phone number"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="block font-medium">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[var(--gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                required
              >
                <option value="">Select a subject</option>
                <option value="home-automation">Home Automation</option>
                <option value="smart-lighting">Smart Lighting</option>
                <option value="networking">Wi-Fi & Networking</option>
                <option value="security">Security Systems</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="message" className="block font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[var(--gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="Tell us about your project"
                required
              ></textarea>
            </div>
            
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="btn-primary w-full md:w-auto"
              >
                Get a Free Consultation
              </button>
            </div>
          </form>
          
          <div className="mt-12 flex flex-col md:flex-row justify-center gap-8 text-center">
            <div>
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <a href="mailto:info@hivemind.com" className="text-[var(--secondary)] hover:underline">
                info@hivemind.com
              </a>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <a href="tel:+1234567890" className="text-[var(--secondary)] hover:underline">
                (123) 456-7890
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 