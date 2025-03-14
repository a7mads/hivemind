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
            Scroll down to see the <span className="text-blue-500">image</span> animation
          </h1>
        }
      >
        <div className="flex flex-col items-center justify-center h-full bg-gray-800 rounded-lg p-8">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Using a placeholder image since we couldn't download the original */}
            <div className="w-full max-w-4xl aspect-video bg-gray-700 rounded-lg overflow-hidden">
              <div className="w-full h-full p-8 flex flex-col">
                <div className="flex items-center mb-8">
                  <div className="w-10 h-10 rounded-full bg-blue-500 mr-4"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-600 rounded-full w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-600 rounded-full w-1/4"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="h-24 bg-gray-600 rounded-lg"></div>
                  <div className="h-24 bg-gray-600 rounded-lg"></div>
                  <div className="h-24 bg-gray-600 rounded-lg"></div>
                </div>
                
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="bg-gray-600 rounded-lg p-4">
                    <div className="h-4 bg-gray-500 rounded-full w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-500 rounded-full w-full mb-2"></div>
                    <div className="h-3 bg-gray-500 rounded-full w-4/5 mb-2"></div>
                    <div className="h-3 bg-gray-500 rounded-full w-3/5"></div>
                  </div>
                  <div className="bg-gray-600 rounded-lg p-4">
                    <div className="h-4 bg-gray-500 rounded-full w-1/2 mb-4"></div>
                    <div className="h-3 bg-gray-500 rounded-full w-full mb-2"></div>
                    <div className="h-3 bg-gray-500 rounded-full w-4/5 mb-2"></div>
                    <div className="h-3 bg-gray-500 rounded-full w-3/5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
} 