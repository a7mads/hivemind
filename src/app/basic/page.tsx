"use client";

import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function BasicPage() {
  useEffect(() => {
    console.log('BasicPage: Component mounted');
  }, []);

  return (
    <main>
      <Navbar />
      
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-8">Basic Page</h1>
        <p className="text-lg max-w-2xl text-center mb-8">
          This is a basic page without any GSAP or ScrollTrigger animations.
          If this page loads correctly but others don&apos;t, there might be an issue with GSAP or ScrollTrigger.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          <div className="bg-blue-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Test Links</h2>
            <ul className="space-y-2">
              <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
              <li><Link href="/simple" className="text-blue-600 hover:underline">Simple Page</Link></li>
              <li><Link href="/gsap-test" className="text-blue-600 hover:underline">GSAP Test</Link></li>
              <li><Link href="/animations" className="text-blue-600 hover:underline">Animations</Link></li>
              <li><Link href="/scrolltrigger" className="text-blue-600 hover:underline">ScrollTrigger</Link></li>
            </ul>
          </div>
          
          <div className="bg-green-100 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Troubleshooting</h2>
            <p>
              If you&apos;re experiencing issues with the other pages, try the following:
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>Clear your browser cache</li>
              <li>Restart the development server</li>
              <li>Check the browser console for errors</li>
              <li>Check the server logs for errors</li>
            </ol>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
} 