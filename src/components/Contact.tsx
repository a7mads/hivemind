import React, { useState, useEffect, useRef } from 'react';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    error: null as string | null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');
    
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({
        ...status,
        error: 'Please fill in all required fields'
      });
      console.log('Validation failed');
      return;
    }
    
    setStatus({
      ...status,
      submitting: true,
      error: null
    });
    
    try {
      console.log('Sending fetch request to /api/contact');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      console.log('Response received:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setStatus({
        submitting: false,
        submitted: true,
        success: true,
        error: null
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus(prev => ({ ...prev, submitted: false }));
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Try fallback method - submit the form directly
      if (formRef.current) {
        console.log('Trying fallback form submission method');
        
        // Create a hidden form for traditional submission
        const fallbackForm = document.createElement('form');
        fallbackForm.method = 'POST';
        fallbackForm.action = '/api/contact';
        fallbackForm.style.display = 'none';
        
        // Add form fields
        for (const [key, value] of Object.entries(formData)) {
          const input = document.createElement('input');
          input.type = 'text';
          input.name = key;
          input.value = value as string;
          fallbackForm.appendChild(input);
        }
        
        // Add to document, submit, and remove
        document.body.appendChild(fallbackForm);
        fallbackForm.submit();
        document.body.removeChild(fallbackForm);
        
        // Show submitting state
        setStatus({
          submitting: true,
          submitted: true,
          success: true,
          error: null
        });
        
        return;
      }
      
      setStatus({
        submitting: false,
        submitted: true,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send message'
      });
    }
  };

  // Add debugging to check if component is mounted properly
  useEffect(() => {
    console.log('Contact component mounted');
  }, []);

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Ready to make your home smarter?</h2>
        <p className="section-subtitle">
          Get in touch with our team for a free consultation
        </p>
        
        <div className="max-w-3xl mx-auto mt-12">
          {status.submitted && (
            <div className={`p-4 mb-6 rounded-md ${status.success ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'}`}>
              {status.success 
                ? 'Thank you for your message! We will get back to you soon.' 
                : `Failed to send message: ${status.error}`}
            </div>
          )}
          
          <form 
            ref={formRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6" 
            onSubmit={handleSubmit}
            method="POST"
            action="/api/contact"
            encType="application/json"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.phone}
                onChange={handleChange}
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
                value={formData.subject}
                onChange={handleChange}
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
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[var(--gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                placeholder="Tell us about your project"
                required
              ></textarea>
            </div>
            
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="btn-primary w-full md:w-auto"
                disabled={status.submitting}
                onClick={(e) => {
                  // Additional click handler as a backup
                  if (!status.submitting) {
                    handleSubmit(e);
                  }
                }}
              >
                {status.submitting ? 'Sending...' : 'Get a Free Consultation'}
              </button>
            </div>
          </form>
          
          <div className="mt-12 flex flex-col md:flex-row justify-center gap-8 text-center">
            <div>
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <a href="mailto:info@hivemind.ae" className="text-[var(--secondary)] hover:underline">
                info@hivemind.ae
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