"use client";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "../utils/utils";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  image?: string;
}

// Timeline data based on the existing timeline data
const timelineData: TimelineEntry[] = [
  {
    title: "Day 1",
    content: (
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Consultation & Planning</h3>
        <p className="text-neutral-700 dark:text-neutral-300 mb-4">
          We assess your needs, discuss options, and create a customized smart home plan.
        </p>
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop"
            alt="Consultation & Planning" 
            fill
            className="object-cover transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
    ),
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2076&auto=format&fit=crop"
  },
  {
    title: "Week 1",
    content: (
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-bold mb-2 text-black dark:text-white">System Design & Preparation</h3>
        <p className="text-neutral-700 dark:text-neutral-300 mb-4">
          Our engineers design your system architecture and prepare all necessary equipment.
        </p>
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop"
            alt="System Design & Preparation" 
            fill
            className="object-cover transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
    ),
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Week 2",
    content: (
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Installation & Setup</h3>
        <p className="text-neutral-700 dark:text-neutral-300 mb-4">
          Our expert technicians install all hardware and configure your system for optimal performance.
        </p>
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1563770660941-10a63607692e?q=80&w=2070&auto=format&fit=crop"
            alt="Installation & Setup" 
            fill
            className="object-cover transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
    ),
    image: "https://images.unsplash.com/photo-1563770660941-10a63607692e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Week 3",
    content: (
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Testing & Training</h3>
        <p className="text-neutral-700 dark:text-neutral-300 mb-4">
          We thoroughly test all systems and provide comprehensive training on how to use your new smart home.
        </p>
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop"
            alt="Testing & Training" 
            fill
            className="object-cover transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
    ),
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2070&auto=format&fit=crop"
  },
  {
    title: "Ongoing",
    content: (
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-xl">
        <h3 className="text-xl font-bold mb-2 text-black dark:text-white">Support & Maintenance</h3>
        <p className="text-neutral-700 dark:text-neutral-300 mb-4">
          We provide ongoing support, maintenance, and updates to ensure your system runs smoothly.
        </p>
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
            alt="Support & Maintenance" 
            fill
            className="object-cover transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
    ),
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
  }
];

export const Timeline = ({ data = timelineData }: { data?: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
 
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
    
    // Update height on window resize
    const handleResize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  // Track which sections are visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, index].filter((v, i, a) => a.indexOf(v) === i));
          } else {
            setVisibleSections((prev) => prev.filter((i) => i !== index));
          }
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll('.timeline-item');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
 
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });
 
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
 
  return (
    <section id="process" className="section py-6">
      <div
        className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10 py-6 relative overflow-hidden"
        ref={containerRef}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto py-4 px-4 md:px-8 lg:px-10 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-2xl md:text-5xl mb-3 text-black dark:text-white font-bold section-title mx-auto"
          >
            Our Process
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg max-w-2xl section-subtitle mx-auto"
          >
            How we transform your home into a smart living space with our step-by-step approach
          </motion.p>
        </div>
    
        <div ref={ref} className="relative max-w-7xl mx-auto pb-8 z-10">
          <AnimatePresence>
            {data.map((item, index) => (
              <motion.div
                key={index}
                data-index={index}
                className="timeline-item flex justify-start pt-6 md:pt-20 md:gap-10"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
                  <motion.div 
                    className="h-12 absolute left-3 md:left-3 w-12 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.2 }}
                    animate={{ 
                      scale: activeIndex === index || visibleSections.includes(index) ? 1.2 : 1,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div 
                      className={`h-5 w-5 rounded-full bg-gradient-to-br from-green-500 via-emerald-400 to-gray-200 border border-neutral-100 dark:border-neutral-700`}
                      animate={{ 
                        scale: activeIndex === index || visibleSections.includes(index) ? 1.3 : 1,
                        transition: { duration: 0.3 }
                      }}
                    />
                  </motion.div>
                  <motion.h3 
                    className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-500 to-gray-400"
                    animate={{ 
                      x: activeIndex === index ? 10 : 0,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {item.title}
                  </motion.h3>
                </div>
      
                <div className="relative pl-20 pr-4 md:pl-4 w-full">
                  <motion.h3 
                    className="md:hidden block text-2xl mb-3 text-left font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-500 to-gray-400"
                    animate={{ 
                      x: activeIndex === index ? 5 : 0,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    whileHover={{ 
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                    className={`transform transition-all duration-300 ${activeIndex === index ? 'scale-[1.02]' : 'scale-100'}`}
                  >
                    {item.content}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-green-600 via-emerald-400 to-gray-300 from-[0%] via-[50%] rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const AceternityTimeline = () => {
  return <Timeline data={timelineData} />;
};

export default AceternityTimeline; 