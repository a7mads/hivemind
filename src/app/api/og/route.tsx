import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get the query parameters
    const title = searchParams.get('title') || 'Hivemind';
    const description = searchParams.get('description') || 'Smart Home Automation & Security Solutions';
    const template = searchParams.get('template') || 'default';
    
    // Background color based on template
    let bgColor = '#000000';
    if (template === 'product') {
      bgColor = '#1a1a1a';
    } else if (template === 'blog') {
      bgColor = '#0f172a';
    }
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bgColor,
            color: 'white',
            padding: '40px',
            fontFamily: 'sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            {/* Logo placeholder - in production, use an absolute URL to your logo */}
            <div
              style={{
                width: '120px',
                height: '120px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '50%',
                color: bgColor,
                fontSize: '24px',
                fontWeight: 'bold',
              }}
            >
              HIVEMIND
            </div>
          </div>
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              textAlign: 'center',
              margin: '0',
              lineHeight: '1.2',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '32px',
              textAlign: 'center',
              margin: '20px 0',
              maxWidth: '800px',
            }}
          >
            {description}
          </p>
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <p style={{ fontSize: '24px', margin: '0' }}>hivemind.com</p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
} 