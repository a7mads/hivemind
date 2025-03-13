"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-[var(--gray-light)] shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[var(--primary)]">
          Hivemind
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link 
            href="#about" 
            className={`${isScrolled ? 'text-[var(--foreground)]' : 'text-white'} hover:text-[var(--accent)] transition-colors`}
          >
            About
          </Link>
          <Link 
            href="#services" 
            className={`${isScrolled ? 'text-[var(--foreground)]' : 'text-white'} hover:text-[var(--accent)] transition-colors`}
          >
            Services
          </Link>
          <Link 
            href="#why-choose-us" 
            className={`${isScrolled ? 'text-[var(--foreground)]' : 'text-white'} hover:text-[var(--accent)] transition-colors`}
          >
            Why Choose Us
          </Link>
          <Link 
            href="#testimonials" 
            className={`${isScrolled ? 'text-[var(--foreground)]' : 'text-white'} hover:text-[var(--accent)] transition-colors`}
          >
            Testimonials
          </Link>
          <Link 
            href="#contact" 
            className="btn-primary text-sm py-2 px-4"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-[var(--primary)] dark:text-white"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
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
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[var(--gray-light)] shadow-md">
          <div className="container py-4 space-y-4">
            <Link 
              href="#about" 
              className="block text-[var(--foreground)] hover:text-[var(--primary)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="#services" 
              className="block text-[var(--foreground)] hover:text-[var(--primary)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="#why-choose-us" 
              className="block text-[var(--foreground)] hover:text-[var(--primary)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Why Choose Us
            </Link>
            <Link 
              href="#testimonials" 
              className="block text-[var(--foreground)] hover:text-[var(--primary)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              href="#contact" 
              className="block text-[var(--foreground)] hover:text-[var(--primary)]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar; 