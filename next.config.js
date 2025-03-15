/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'ui.aceternity.com', 'community-assets.home-assistant.io', 'hivemind.ae'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'ui.aceternity.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'community-assets.home-assistant.io',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'hivemind.ae',
        pathname: '**',
      },
    ],
    unoptimized: false,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable trailing slashes for better SEO
  trailingSlash: true,
  // Configure redirects for SEO
  async redirects() {
    return [
      // Redirect old URLs to new ones if needed
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 308 status code (permanent redirect)
      },
      // Redirect non-www to www (or vice versa) for SEO consistency
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'hivemind.ae', // Replace with your actual domain
          },
        ],
        destination: 'https://www.hivemind.ae/:path*', // Replace with your actual domain
        permanent: true,
      },
    ];
  },
  // Configure rewrites for clean URLs
  async rewrites() {
    return [
      // Example: Clean URLs for blog posts
      {
        source: '/blog/:slug',
        destination: '/blog/:slug',
      },
    ];
  },
  // Configure headers for SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Enable compression for better performance
  compress: true,
};

module.exports = nextConfig; 