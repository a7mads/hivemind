"use client";
import React from "react";
import { ContainerScrollImage } from "@/components/ContainerScrollImage";
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
      
      <ContainerScrollImage
        titleComponent={
          <h1 className="text-4xl font-bold text-white mb-10">
            Scroll down to see the <span className="text-blue-500">Home Assistant</span> dashboard
          </h1>
        }
      >
        <Image 
          src="https://community-assets.home-assistant.io/optimized/4X/e/f/a/efa4e05f68ccecc65b10d4a7621c42a39a627c21_2_1380x864.jpeg"
          alt="Home Assistant Dashboard"
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </ContainerScrollImage>
    </div>
  );
} 