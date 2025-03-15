import { Metadata } from 'next';

type PageSEOProps = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  twitterImage?: string;
};

export function generateMetadata({
  title,
  description,
  path,
  ogImage = '/og-image.jpg',
  twitterImage = '/twitter-image.jpg',
}: PageSEOProps): Metadata {
  // Replace with your actual domain
  const baseUrl = 'https://hivemind.com';
  
  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      siteName: 'Hivemind',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [twitterImage],
    },
  };
} 