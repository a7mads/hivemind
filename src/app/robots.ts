import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // Add any paths you want to exclude from crawling
    },
    sitemap: 'https://hivemind.ae/sitemap.xml', // Replace with your actual domain
  };
} 