import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Only register plugins on the client side
if (typeof window !== 'undefined') {
  try {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    console.log('GSAP plugins registered successfully');
  } catch (e) {
    console.warn('Failed to register GSAP plugins:', e);
  }
}

// Custom SplitText implementation (simplified version of GSAP's premium SplitText)
export class SplitText {
  private element: HTMLElement;
  private originalHTML: string;
  public chars: HTMLElement[] = [];
  public words: HTMLElement[] = [];
  
  constructor(element: HTMLElement, options: { type: string }) {
    this.element = element;
    this.originalHTML = element.innerHTML;
    
    if (options.type.includes('words')) {
      this.splitWords();
    }
    
    if (options.type.includes('chars')) {
      this.splitChars();
    }
  }

  private splitWords() {
    // Simple word splitting
    const text = this.element.textContent || '';
    const words = text.split(' ');
    
    let html = '';
    words.forEach(word => {
      html += `<span class="split-word">${word}</span> `;
    });
    
    this.element.innerHTML = html.trim();
    
    // Store references to word elements
    this.words = Array.from(this.element.querySelectorAll('.split-word'));
  }

  private splitChars() {
    // If we've already split into words, split those
    if (this.words.length > 0) {
      this.words.forEach(word => {
        const text = word.textContent || '';
        let html = '';
        
        for (let i = 0; i < text.length; i++) {
          html += `<span class="split-char">${text[i]}</span>`;
        }
        
        word.innerHTML = html;
      });
    } else {
      // Split directly into characters
      const text = this.element.textContent || '';
      let html = '';
      
      for (let i = 0; i < text.length; i++) {
        html += `<span class="split-char">${text[i]}</span>`;
      }
      
      this.element.innerHTML = html;
    }
    
    // Store references to character elements
    this.chars = Array.from(this.element.querySelectorAll('.split-char'));
  }

  public revert() {
    // Restore original HTML
    this.element.innerHTML = this.originalHTML;
    this.chars = [];
    this.words = [];
  }
}

// Custom DrawSVG implementation (simplified version)
export const DrawSVGPlugin = {
  name: "drawSVG",
  init(target: SVGElement, vars: any) {
    // Check if it's an SVG path element
    if (!target || target.tagName !== 'path') return false;
    
    // Simple implementation that just sets the stroke-dashoffset and stroke-dasharray
    // This is a very simplified version and won't work exactly like the real DrawSVGPlugin
    const pathElement = target as SVGPathElement;
    const length = pathElement.getTotalLength ? pathElement.getTotalLength() : 100;
    
    gsap.set(target, {
      strokeDasharray: length,
      strokeDashoffset: length
    });
    
    return true;
  }
};

// Export GSAP and plugins
export { gsap, ScrollTrigger }; 