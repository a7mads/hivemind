import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

console.log('GSAP version:', gsap.version);

// Only register plugins on the client side
if (typeof window !== 'undefined') {
  try {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    console.log('GSAP plugins registered successfully');
    
    // Custom DrawSVG implementation (simplified version)
    const CustomDrawSVGPlugin = {
      name: "drawSVG",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      init(target: SVGElement, vars: Record<string, unknown>) {
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
    
    // Register the custom DrawSVG plugin
    gsap.registerPlugin(CustomDrawSVGPlugin);
    
    // Ensure GSAP is properly initialized
    gsap.defaults({
      overwrite: 'auto',
      ease: 'power2.inOut'
    });
    
    // Force GSAP to update its internal ticker
    gsap.ticker.wake();
    
    console.log('GSAP registered and initialized:', gsap);
  } catch (e) {
    console.error('Failed to register GSAP plugins:', e);
  }
} else {
  console.log('Not on client side, skipping plugin registration');
}

// Custom SplitText implementation (simplified version of GSAP's premium SplitText)
class CustomSplitText {
  private element: HTMLElement;
  private originalHTML: string;
  public chars: HTMLElement[] = [];
  public words: HTMLElement[] = [];
  public lines: HTMLElement[] = [];
  public elements: HTMLElement[] = [];
  public selector: string = '';
  
  constructor(element: HTMLElement, options: { type: string }) {
    this.element = element;
    this.originalHTML = element.innerHTML;
    this.selector = '';
    
    if (options.type.includes('words')) {
      this.splitWords();
    }
    
    if (options.type.includes('chars')) {
      this.splitChars();
    }
    
    if (options.type.includes('lines')) {
      this.splitLines();
    }
    
    // Populate elements array with all split elements
    this.elements = [...this.chars, ...this.words, ...this.lines];
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
  
  private splitLines() {
    // Simple line splitting based on <br> tags
    // This is a simplified version and won't work exactly like the real SplitText
    const html = this.element.innerHTML;
    const lines = html.split('<br>');
    
    let newHtml = '';
    lines.forEach(line => {
      newHtml += `<span class="split-line">${line}</span><br>`;
    });
    
    this.element.innerHTML = newHtml;
    
    // Store references to line elements
    this.lines = Array.from(this.element.querySelectorAll('.split-line'));
  }

  public split(newType?: string) {
    // Method to re-split with a new type if needed
    this.revert();
    
    if (newType) {
      if (newType.includes('words')) {
        this.splitWords();
      }
      
      if (newType.includes('chars')) {
        this.splitChars();
      }
      
      if (newType.includes('lines')) {
        this.splitLines();
      }
    }
    
    // Update elements array
    this.elements = [...this.chars, ...this.words, ...this.lines];
    
    return this;
  }

  public revert() {
    // Restore original HTML
    this.element.innerHTML = this.originalHTML;
    this.chars = [];
    this.words = [];
    this.lines = [];
    this.elements = [];
    return this;
  }
}

// Export GSAP and plugins
export { gsap, ScrollTrigger };
// Export our custom implementations with the names expected by the components
export const SplitText = CustomSplitText;
export const DrawSVGPlugin = {
  name: "drawSVG",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(target: SVGElement, vars: Record<string, unknown>) {
    // Check if it's an SVG path element
    if (!target || target.tagName !== 'path') return false;
    
    // Simple implementation that just sets the stroke-dashoffset and stroke-dasharray
    const pathElement = target as SVGPathElement;
    const length = pathElement.getTotalLength ? pathElement.getTotalLength() : 100;
    
    gsap.set(target, {
      strokeDasharray: length,
      strokeDashoffset: length
    });
    
    return true;
  }
}; 