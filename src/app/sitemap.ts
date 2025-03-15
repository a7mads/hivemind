import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace with your actual domain
  const baseUrl = 'https://hivemind.ae';
  
  // Define your routes - add all your important pages here
  const routes = [
    '',
    '/basic',
    '/simple',
    '/container-scroll',
    '/container-scroll-image',
    '/gsap-test',
    '/products',
    '/blog',
    '/blog/smart-home-security',
    '/blog/energy-efficiency',
    '/blog/smart-home-beginners',
    '/blog/voice-assistants',
    // Add more routes as needed
  ];

  // Current date for lastModified
  const date = new Date();

  // Generate sitemap entries
  return routes.map(route => {
    // Set priority based on the route
    let priority = 0.7;
    if (route === '') {
      priority = 1.0; // Homepage gets highest priority
    } else if (route === '/products') {
      priority = 0.9; // Products page gets high priority
    } else if (route.startsWith('/blog') && route !== '/blog') {
      priority = 0.8; // Individual blog posts get medium-high priority
    } else if (route === '/blog') {
      priority = 0.8; // Blog index gets medium-high priority
    }

    // Set change frequency based on the route
    let changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly';
    if (route === '') {
      changeFrequency = 'daily'; // Homepage changes frequently
    } else if (route.startsWith('/blog')) {
      changeFrequency = 'weekly'; // Blog content changes weekly
    } else if (route === '/products') {
      changeFrequency = 'weekly'; // Product pages change weekly
    }

    return {
      url: `${baseUrl}${route}`,
      lastModified: date,
      changeFrequency,
      priority,
    };
  });
} 