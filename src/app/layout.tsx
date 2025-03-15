import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd } from "@/components/SEO/JsonLd";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { CookieConsent } from "@/components/cookies";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hivemind - Smart Home Automation & Security Solutions",
  description: "Advanced technology that makes your home safer, smarter, and more efficient—effortlessly. Discover our innovative smart home solutions today. Coming soon in Arabic.",
  keywords: "smart home, home automation, security solutions, smart security, IoT, connected home, home technology, UAE, Abu Dhabi, Dubai, Arabic, المنزل الذكي, أتمتة المنزل",
  authors: [{ name: "Hivemind" }],
  creator: "Hivemind",
  publisher: "Hivemind",
  metadataBase: new URL('https://hivemind.ae'), // Replace with your actual domain
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'ar-AE': '/ar-AE', // Future Arabic (UAE) support
    },
  },
  openGraph: {
    title: "Hivemind - Smart Home Automation & Security Solutions",
    description: "Advanced technology that makes your home safer, smarter, and more efficient—effortlessly.",
    url: 'https://hivemind.ae', // Replace with your actual domain
    siteName: 'Hivemind',
    images: [
      {
        url: '/og-image.jpg', // Create and add this image to your public folder
        width: 1200,
        height: 630,
        alt: 'Hivemind - Smart Home Solutions',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['ar_AE'], // Add Arabic locale for future support
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hivemind - Smart Home Automation & Security Solutions',
    description: 'Advanced technology that makes your home safer, smarter, and more efficient—effortlessly.',
    images: ['/twitter-image.jpg'], // Create and add this image to your public folder
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      {
        url: '/Artboard 1HivemindBlack@4x-trans.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    apple: {
      url: '/Artboard 1HivemindBlack@4x-trans.png',
      sizes: '180x180',
      type: 'image/png',
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${rajdhani.variable} antialiased`}>
        <CookieConsent>
          <OrganizationJsonLd />
          {children}
          <Analytics />
          <SpeedInsights />
        </CookieConsent>
      </body>
    </html>
  );
}
