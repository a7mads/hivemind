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

  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const validateField = (name: string, value: string) => {
    if (name === 'email' && value && !/^\S+@\S+\.\S+$/.test(value)) {
      return 'Please enter a valid email address';
    }
    
    if (value.trim() === '' && name !== 'phone') {
      return 'This field is required';
    }
    
    return '';
  };

  const validateForm = () => {
    const newFieldErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message)
    };
    
    setFieldErrors(newFieldErrors);
    
    // Check if any field has an error
    return !Object.values(newFieldErrors).some(error => error !== '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user types
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submission started');
    
    // Validate all fields
    const isValid = validateForm();
    
    if (!isValid) {
      setStatus({
        ...status,
        submitted: true,
        success: false,
        error: 'Please fill in all required fields correctly'
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
          {(status.submitted || status.error) && (
            <div className={`p-4 mb-6 rounded-md ${status.success ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'}`}>
              {status.success 
                ? 'Thank you for your message! We will get back to you soon.' 
                : `${status.error || 'An error occurred. Please try again.'}`}
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
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-md border ${fieldErrors.name ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-[var(--gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]`}
                placeholder="Your name"
                required
              />
              {fieldErrors.name && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{fieldErrors.name}</p>
              )}
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
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-md border ${fieldErrors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-[var(--gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]`}
                placeholder="Your email"
                required
              />
              {fieldErrors.email && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{fieldErrors.email}</p>
              )}
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
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-md border ${fieldErrors.subject ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-[var(--gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]`}
                required
              >
                <option value="">Select a subject</option>
                <option value="home-automation">Home Automation</option>
                <option value="smart-lighting">Smart Lighting</option>
                <option value="networking">Wi-Fi & Networking</option>
                <option value="security">Security Systems</option>
                <option value="other">Other</option>
              </select>
              {fieldErrors.subject && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{fieldErrors.subject}</p>
              )}
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
                onBlur={handleBlur}
                className={`w-full px-4 py-3 rounded-md border ${fieldErrors.message ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-[var(--gray-light)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]`}
                placeholder="Tell us about your project"
                required
              ></textarea>
              {fieldErrors.message && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">{fieldErrors.message}</p>
              )}
            </div>
            
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="btn-primary w-full md:w-auto"
                disabled={status.submitting}
                onClick={(e) => {
                  // Additional click handler as a backup
                  if (!status.submitting) {
                    // Validate form before submission
                    if (!validateForm()) {
                      e.preventDefault();
                      setStatus({
                        ...status,
                        submitted: true,
                        success: false,
                        error: 'Please fill in all required fields correctly'
                      });
                      return;
                    }
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
              <h3 className="font-semibold text-lg mb-2 text-white">Email Us</h3>
              <a href="mailto:info@hivemind.ae" className="text-white hover:underline">
                info@hivemind.ae
              </a>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2 text-white">Call Us</h3>
              <a href="tel:+971588773993" className="text-white hover:underline">
                +971 58 877 3993
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 