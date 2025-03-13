import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

// Only register plugins on the client side
if (typeof window !== 'undefined') {
  try {
    // Register ScrollTrigger, SplitText, and DrawSVGPlugin
    gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);
    console.log('GSAP plugins registered successfully');
  } catch (e) {
    console.warn('Failed to register GSAP plugins:', e);
  }
}

// Export GSAP and plugins
export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin }; 