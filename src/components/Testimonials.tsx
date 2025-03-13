import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'John D.',
    quote: 'Hivemind transformed my house into a fully automated, secure, and energy-efficient space!',
    role: 'Homeowner',
  },
  {
    id: 2,
    name: 'Sarah M.',
    quote: 'Their team made the process so easy, and now I can control my entire home from my phone!',
    role: 'Tech Enthusiast',
  },
  {
    id: 3,
    name: 'Michael R.',
    quote: 'The security system gives me peace of mind, especially when I\'m traveling for work.',
    role: 'Business Executive',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section bg-[var(--gray-light)]">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white dark:bg-[var(--gray)] p-6 rounded-lg shadow-md"
            >
              <div className="mb-4">
                {/* Quote icon */}
                <svg className="w-8 h-8 text-[var(--secondary)] opacity-50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-lg mb-4 italic">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 