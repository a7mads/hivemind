"use client";
import React from "react";
import { ContainerScroll } from "@/components/ContainerScroll";
import Link from "next/link";

export default function ContainerScrollDemo() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <header className="p-4 flex justify-between items-center">
        <Link href="/" className="text-white hover:text-gray-300 transition-colors">
          ← Back to Home
        </Link>
      </header>
      
      <ContainerScroll
        titleComponent={
          <h1 className="text-4xl font-bold text-white mb-10">
            Scroll down to see the <span className="text-blue-500">animation</span> effect
          </h1>
        }
      >
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-3xl font-bold mb-8">Container Scroll Animation</h2>
          <p className="text-lg mb-8 max-w-2xl text-center">
            This is a demonstration of the Container Scroll Animation component from Aceternity UI.
            As you scroll, the card rotates and scales to create an engaging visual effect.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
              <p>Smooth scroll-driven animations powered by Framer Motion</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Feature 2</h3>
              <p>Responsive design that adapts to mobile and desktop</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Feature 3</h3>
              <p>Customizable content and styling options</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">Feature 4</h3>
              <p>Easy integration with Next.js and Tailwind CSS</p>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
} 