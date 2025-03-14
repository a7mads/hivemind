"use client";
import React from "react";
import { ContainerScroll } from "@/components/ContainerScroll";
import Image from "next/image";
import Link from "next/link";

export default function ContainerScrollImageDemo() {
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
            Scroll down to see the <span className="text-blue-500">Home Assistant</span> dashboard
          </h1>
        }
      >
        <div className="flex flex-col items-center justify-center h-full bg-gray-800 rounded-lg p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-full h-full relative overflow-hidden rounded-lg">
              <Image 
                src="https://community-assets.home-assistant.io/optimized/4X/e/f/a/efa4e05f68ccecc65b10d4a7621c42a39a627c21_2_1380x864.jpeg"
                alt="Home Assistant Dashboard"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
} 