'use client';

type JsonLdProps = {
  data: Record<string, any>;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization structured data
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hivemind',
    url: 'https://hivemind.com', // Replace with your actual domain
    logo: 'https://hivemind.com/Artboard 1HivemindBlack@4x-trans.png', // Replace with your actual logo URL
    sameAs: [
      'https://www.facebook.com/hivemind', // Replace with your actual social media URLs
      'https://www.twitter.com/hivemind',
      'https://www.linkedin.com/company/hivemind',
      'https://www.instagram.com/hivemind',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-123-456-7890', // Replace with your actual contact information
      contactType: 'customer service',
      email: 'info@hivemind.com', // Replace with your actual email
      availableLanguage: 'English',
    },
  };

  return <JsonLd data={data} />;
}

type ProductJsonLdProps = {
  name: string;
  description: string;
  image: string;
  price: number;
  currency?: string;
  availability?: string;
  sku: string;
  brand?: string;
  reviewCount?: number;
  ratingValue?: number;
};

// Product structured data
export function ProductJsonLd({
  name,
  description,
  image,
  price,
  currency = 'USD',
  availability = 'https://schema.org/InStock',
  sku,
  brand = 'Hivemind',
  reviewCount,
  ratingValue,
}: ProductJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    sku,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability,
      url: 'https://hivemind.com/products/' + sku, // Replace with your actual product URL pattern
    },
    ...(reviewCount && ratingValue
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue,
            reviewCount,
          },
        }
      : {}),
  };

  return <JsonLd data={data} />;
}

type FAQItem = {
  question: string;
  answer: string;
};

type FAQJsonLdProps = {
  questions: FAQItem[];
};

// FAQ structured data
export function FAQJsonLd({ questions }: FAQJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
} 