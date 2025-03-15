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
    
    // Define font
    const fontData = await fetch(
      new URL('../../../../public/fonts/Rajdhani-Bold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());
    
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
            fontFamily: 'Rajdhani',
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
            <img
              src={`https://hivemind.com/Artboard 1HivemindBlack@4x-trans.png`} // Replace with your actual logo URL
              alt="Hivemind Logo"
              width={120}
              height={120}
            />
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
        fonts: [
          {
            name: 'Rajdhani',
            data: fontData,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
} 