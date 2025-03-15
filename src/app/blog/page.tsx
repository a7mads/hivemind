import { Metadata } from 'next';
import Link from 'next/link';

// Generate metadata for the blog index page
export const metadata: Metadata = {
  title: 'Smart Home Blog | Hivemind',
  description: 'Explore the latest articles, guides, and news about smart home technology, automation, and security solutions.',
  keywords: 'smart home blog, home automation blog, security blog, smart technology articles',
  alternates: {
    canonical: 'https://hivemind.ae/blog',
  },
  openGraph: {
    title: 'Smart Home Blog | Hivemind',
    description: 'Explore the latest articles, guides, and news about smart home technology, automation, and security solutions.',
    url: 'https://hivemind.ae/blog',
    siteName: 'Hivemind',
    images: [
      {
        url: '/api/og?title=Smart Home Blog&template=blog',
        width: 1200,
        height: 630,
        alt: 'Hivemind Smart Home Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Home Blog | Hivemind',
    description: 'Explore the latest articles, guides, and news about smart home technology, automation, and security solutions.',
    images: ['/api/og?title=Smart Home Blog&template=blog'],
  },
};

// Sample blog posts data
const blogPosts = [
  {
    id: 'smart-home-security',
    title: '5 Essential Smart Home Security Features for 2024',
    excerpt: 'Discover the top 5 smart home security features that every modern home should have in 2024.',
    date: '2024-03-15',
    slug: '/blog/smart-home-security',
    category: 'Security',
  },
  {
    id: 'energy-efficiency',
    title: 'How Smart Home Automation Can Reduce Your Energy Bills',
    excerpt: 'Learn how implementing smart home technology can lead to significant energy savings and reduce your monthly utility bills.',
    date: '2024-03-10',
    slug: '/blog/energy-efficiency',
    category: 'Energy Efficiency',
  },
  {
    id: 'smart-home-beginners',
    title: 'Smart Home for Beginners: Where to Start',
    excerpt: 'New to smart home technology? This guide will help you understand the basics and choose the right devices to begin your smart home journey.',
    date: '2024-03-05',
    slug: '/blog/smart-home-beginners',
    category: 'Guides',
  },
  {
    id: 'voice-assistants',
    title: 'Comparing the Top Voice Assistants for Your Smart Home',
    excerpt: 'A detailed comparison of Amazon Alexa, Google Assistant, and Apple HomeKit to help you choose the right ecosystem for your needs.',
    date: '2024-02-28',
    slug: '/blog/voice-assistants',
    category: 'Comparison',
  },
];

export default function BlogIndexPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Smart Home Blog</h1>
      
      <div className="mb-12">
        <div className="relative w-full h-96 rounded-lg overflow-hidden mb-6">
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Featured Blog Post Image</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md -mt-20 mx-auto max-w-4xl relative">
          <span className="inline-block bg-blue-600 text-white px-3 py-1 text-sm font-semibold rounded mb-2">
            {blogPosts[0].category}
          </span>
          <h2 className="text-3xl font-bold mb-3">
            <Link href={blogPosts[0].slug} className="hover:text-blue-600 transition-colors">
              {blogPosts[0].title}
            </Link>
          </h2>
          <p className="text-gray-600 mb-4">{blogPosts[0].excerpt}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-500">
              {new Date(blogPosts[0].date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <Link href={blogPosts[0].slug} className="text-blue-600 hover:underline">
              Read More →
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(1).map((post) => (
          <article key={post.id} className="border rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Blog Post Image</span>
            </div>
            <div className="p-6">
              <span className="inline-block bg-gray-200 text-gray-800 px-3 py-1 text-sm font-semibold rounded mb-2">
                {post.category}
              </span>
              <h2 className="text-xl font-bold mb-3">
                <Link href={post.slug} className="hover:text-blue-600 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
                <Link href={post.slug} className="text-blue-600 hover:underline text-sm">
                  Read More →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Load More Articles
        </button>
      </div>
    </main>
  );
} 