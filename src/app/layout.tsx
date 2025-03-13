import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hivemind - Smart Home Automation & Security Solutions",
  description: "Advanced technology that makes your home safer, smarter, and more efficient—effortlessly.",
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '32x32',
        type: 'image/ico',
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
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
