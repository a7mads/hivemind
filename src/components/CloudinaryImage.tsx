"use client";

import { CldImage } from "next-cloudinary";

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
}

export default function CloudinaryImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
}: CloudinaryImageProps) {
  // For demo images, use the Cloudinary demo account
  // In production, you would upload your images to your own Cloudinary account
  // and use the public ID instead of a full URL
  
  // Check if the src is already a Cloudinary URL
  if (src.includes("res.cloudinary.com")) {
    // Extract the public ID from the URL
    const parts = src.split("/upload/");
    const publicId = parts[1];
    
    return (
      <CldImage
        src={publicId}
        alt={alt}
        width={width || 800}
        height={height || 600}
        crop="fill"
        gravity="auto"
        loading="eager"
        sizes={sizes}
        className={className}
      />
    );
  }
  
  // For non-Cloudinary URLs (like Unsplash), use the Next.js Image component
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
    />
  );
} 