import { Metadata } from 'next';
import { FAQJsonLd, ProductJsonLd } from '@/components/SEO/JsonLd';

// Sample product data
const products = [
  {
    id: 'smart-lock-pro',
    name: 'Smart Lock Pro',
    description: 'Advanced smart lock with fingerprint, PIN, and app access.',
    price: 199.99,
    image: '/images/products/smart-lock-pro.jpg',
    sku: 'SLP-001',
    reviewCount: 124,
    ratingValue: 4.8,
  },
  {
    id: 'security-camera-360',
    name: 'Security Camera 360',
    description: '360-degree HD security camera with night vision and motion detection.',
    price: 149.99,
    image: '/images/products/security-camera-360.jpg',
    sku: 'SC360-001',
    reviewCount: 89,
    ratingValue: 4.6,
  },
];

// Sample FAQ data
const faqs = [
  {
    question: 'How do I install the Smart Lock Pro?',
    answer: 'Installation is simple and takes about 15 minutes. The package includes all necessary hardware and step-by-step instructions.',
  },
  {
    question: 'Can I access my Security Camera 360 remotely?',
    answer: 'Yes, you can view your camera feed from anywhere using our mobile app or web portal.',
  },
  {
    question: 'Are software updates included?',
    answer: 'Yes, all Hivemind products receive regular software updates to ensure security and add new features.',
  },
];

// Generate metadata for the page
export const metadata: Metadata = {
  title: 'Smart Home Products | Hivemind',
  description: 'Discover our range of innovative smart home products. From security cameras to smart locks, find the perfect solution for your home.',
  keywords: 'smart home products, security cameras, smart locks, home automation products',
  alternates: {
    canonical: 'https://hivemind.com/products',
  },
  openGraph: {
    title: 'Smart Home Products | Hivemind',
    description: 'Discover our range of innovative smart home products. From security cameras to smart locks, find the perfect solution for your home.',
    url: 'https://hivemind.com/products',
    siteName: 'Hivemind',
    images: [
      {
        url: '/api/og?title=Smart Home Products&template=product',
        width: 1200,
        height: 630,
        alt: 'Hivemind Smart Home Products',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart Home Products | Hivemind',
    description: 'Discover our range of innovative smart home products. From security cameras to smart locks, find the perfect solution for your home.',
    images: ['/api/og?title=Smart Home Products&template=product'],
  },
};

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Add structured data for the first product */}
      <ProductJsonLd
        name={products[0].name}
        description={products[0].description}
        image={products[0].image}
        price={products[0].price}
        sku={products[0].sku}
        reviewCount={products[0].reviewCount}
        ratingValue={products[0].ratingValue}
      />
      
      {/* Add FAQ structured data */}
      <FAQJsonLd questions={faqs} />
      
      <h1 className="text-4xl font-bold mb-8 text-center">Our Smart Home Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Product Image</span>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">${product.price}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-6 border-b pb-6">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
} 