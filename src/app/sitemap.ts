import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace with your actual domain
  const baseUrl = 'https://hivemind.ae';
  
  // Define your routes - add all your important pages here
  const routes = [
    '',
    '/basic',
    '/simple',
    '/gsap-test',
    '/products',
    '/blog',
    '/blog/smart-home-security',
    '/blog/energy-efficiency',
    '/blog/smart-home-beginners',
    '/blog/voice-assistants',
    // Add more routes as needed
  ];

  // Define language paths - currently only English, but preparing for Arabic
  const languages = [
    { code: 'en-US', path: '' }, // Default language (no prefix)
    // Uncomment when Arabic version is ready
    // { code: 'ar-AE', path: '/ar-AE' },
  ];

  // Current date for lastModified
  const date = new Date();

  // Generate sitemap entries for all routes in all languages
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add entries for current language (English)
  routes.forEach(route => {
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

    sitemapEntries.push({
      url: `${baseUrl}${route}`,
      lastModified: date,
      changeFrequency,
      priority,
    });

    // Add a commented entry for future Arabic version
    // This won't be active in the sitemap but serves as a placeholder
    /* Future Arabic version
    sitemapEntries.push({
      url: `${baseUrl}/ar-AE${route}`,
      lastModified: date,
      changeFrequency,
      priority: priority * 0.9, // Slightly lower priority for non-primary language
    });
    */
  });

  return sitemapEntries;
} 