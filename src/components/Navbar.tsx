"use client";

import React, { useState, useEffect, useRef, RefCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from '../utils/gsapPlugins';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Create refs for elements we want to animate
  const navbarRef = useRef<HTMLElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const logoImageRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<(HTMLElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  // Create a ref callback that adds elements to our array
  const createRefCallback = <T extends HTMLElement>(index: number): RefCallback<T> => {
    return (element: T | null) => {
      if (element) {
        navItemsRef.current[index] = element;
      }
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Initial animation when component mounts
  useEffect(() => {
    // Navbar entrance animation
    gsap.fromTo(
      navbarRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );

    // Logo animation
    gsap.fromTo(
      logoImageRef.current,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.5 }
    );

    // Nav items staggered animation
    gsap.fromTo(
      navItemsRef.current,
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.4, 
        stagger: 0.1, 
        ease: "power2.out",
        delay: 0.7
      }
    );
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        // Open animation
        gsap.fromTo(
          mobileMenuRef.current,
          { height: 0, opacity: 0 },
          { height: "auto", opacity: 1, duration: 0.3, ease: "power2.out" }
        );
        
        // Animate menu items
        const menuItems = mobileMenuRef.current.querySelectorAll('a');
        gsap.fromTo(
          menuItems,
          { x: -20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, delay: 0.1 }
        );
      } else {
        // Only run close animation if the ref exists and we're closing an already open menu
        if (mobileMenuRef.current && mobileMenuRef.current.offsetHeight > 0) {
          gsap.to(mobileMenuRef.current, { 
            height: 0, 
            opacity: 0, 
            duration: 0.3, 
            ease: "power2.in" 
          });
        }
      }
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Reset navItemsRef before rendering
  useEffect(() => {
    navItemsRef.current = [];
  }, []);

  return (
    <header 
      ref={navbarRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-hivemind-black shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="relative z-10" ref={logoRef}>
          <div ref={logoImageRef} className="relative h-12 w-48">
            <Image 
              src="/Artboard 1HivemindBlack@4x-trans.png" 
              alt="Hivemind Logo" 
              fill
              style={{ objectFit: 'contain' }}
              className={isScrolled ? 'opacity-100' : 'opacity-100 filter brightness-0 invert'}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          <Link 
            href="#about" 
            className={`${isScrolled ? 'text-hivemind-black' : 'text-white'} hover:text-hivemind-green transition-colors`}
            ref={createRefCallback(0)}
          >
            About
          </Link>
          <Link 
            href="#services" 
            className={`${isScrolled ? 'text-hivemind-black' : 'text-white'} hover:text-hivemind-green transition-colors`}
            ref={createRefCallback(1)}
          >
            Services
          </Link>
          <Link 
            href="#why-choose-us" 
            className={`${isScrolled ? 'text-hivemind-black' : 'text-white'} hover:text-hivemind-green transition-colors`}
            ref={createRefCallback(2)}
          >
            Why Choose Us
          </Link>
          <Link 
            href="#testimonials" 
            className={`${isScrolled ? 'text-hivemind-black' : 'text-white'} hover:text-hivemind-green transition-colors`}
            ref={createRefCallback(3)}
          >
            Testimonials
          </Link>
          <Link 
            href="/animations" 
            className={`${isScrolled ? 'text-hivemind-black' : 'text-white'} hover:text-hivemind-green transition-colors`}
            ref={createRefCallback(4)}
          >
            Animations
          </Link>
          <Link 
            href="/scrolltrigger" 
            className={`${isScrolled ? 'text-hivemind-black' : 'text-white'} hover:text-hivemind-green transition-colors`}
            ref={createRefCallback(5)}
          >
            ScrollTrigger
          </Link>
          <Link 
            href="#contact" 
            className="bg-hivemind-green hover:bg-hivemind-green-dark text-white py-3 px-6 rounded-md font-medium transition-colors"
            ref={createRefCallback(6)}
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-hivemind-black dark:text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          ref={createRefCallback(7)}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`fixed inset-0 bg-hivemind-black bg-opacity-95 z-50 transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="container py-4 space-y-4">
          <Link 
            href="#about" 
            className="block text-hivemind-black hover:text-hivemind-green"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="#services" 
            className="block text-hivemind-black hover:text-hivemind-green"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link 
            href="#why-choose-us" 
            className="block text-hivemind-black hover:text-hivemind-green"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Why Choose Us
          </Link>
          <Link 
            href="#testimonials" 
            className="block text-hivemind-black hover:text-hivemind-green"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Testimonials
          </Link>
          <Link 
            href="/animations" 
            className="block text-hivemind-black hover:text-hivemind-green"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Animations
          </Link>
          <Link 
            href="/scrolltrigger" 
            className="block text-hivemind-black hover:text-hivemind-green"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ScrollTrigger
          </Link>
          <Link 
            href="#contact" 
            className="block text-hivemind-black hover:text-hivemind-green"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 