import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaWhatsapp, FaInstagram, FaSnapchatGhost, FaTwitter, FaFacebookF } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-hivemind-black text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-8">
              <Image 
                src="/Artboard 1HivemindBlack@4x-trans.png" 
                alt="Hivemind Logo" 
                width={550} 
                height={120} 
                className="mb-6 filter brightness-0 invert"
                style={{ objectFit: 'contain', height: '120px', width: 'auto' }}
              />
            </div>
            <p className="mb-4 max-w-md">
              Advanced technology that makes your home safer, smarter, and more efficient—effortlessly.
            </p>
            <div className="flex space-x-4">
              {/* WhatsApp */}
              <a href="#" className="text-white hover:text-hivemind-green transition-colors">
                <FaWhatsapp className="w-6 h-6" />
              </a>
              {/* Instagram */}
              <a href="#" className="text-white hover:text-hivemind-green transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              {/* Snapchat */}
              <a href="#" className="text-white hover:text-hivemind-green transition-colors">
                <FaSnapchatGhost className="w-6 h-6" />
              </a>
              {/* Twitter */}
              <a href="#" className="text-white hover:text-hivemind-green transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              {/* Facebook */}
              <a href="#" className="text-white hover:text-hivemind-green transition-colors">
                <FaFacebookF className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-hivemind-green">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#about" className="hover:text-hivemind-green transition-colors">About</Link></li>
              <li><Link href="#services" className="hover:text-hivemind-green transition-colors">Services</Link></li>
              <li><Link href="#why-choose-us" className="hover:text-hivemind-green transition-colors">Why Choose Us</Link></li>
              <li><Link href="#testimonials" className="hover:text-hivemind-green transition-colors">Testimonials</Link></li>
              <li><Link href="#contact" className="hover:text-hivemind-green transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-hivemind-green">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-1 text-hivemind-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Abu Dhabi, United Arab Emirates</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-1 text-hivemind-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@hivemind.ae</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-1 text-hivemind-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+971 58 877 3993</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Hivemind. All rights reserved.</p>
          <p className="mt-2 text-sm">
            <Link href="/privacy" className="hover:text-hivemind-green transition-colors">Privacy Policy</Link> | 
            <Link href="/terms" className="hover:text-hivemind-green transition-colors ml-2">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;