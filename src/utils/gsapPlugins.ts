import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Define a type for the DrawSVGPlugin
interface DrawSVGPluginType {
  version: string;
}

// Create a mock DrawSVGPlugin for fallback
const MockDrawSVGPlugin: DrawSVGPluginType = {
  version: 'mock'
};

// Only register plugins on the client side
if (typeof window !== 'undefined') {
  try {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    console.log('ScrollTrigger registered successfully');
  } catch (error) {
    console.error('Error registering ScrollTrigger:', error);
  }
}

// Custom SplitText class for text animations
class SplitText {
  elements: HTMLElement[];
  chars: HTMLElement[];
  words: HTMLElement[];
  lines: HTMLElement[];
  
  constructor(target: string | HTMLElement | NodeList | HTMLElement[], config: any = {}) {
    this.elements = [];
    this.chars = [];
    this.words = [];
    this.lines = [];
    
    // Convert target to array of elements
    if (typeof target === 'string') {
      const elements = document.querySelectorAll(target);
      this.elements = Array.from(elements) as HTMLElement[];
    } else if (target instanceof HTMLElement) {
      this.elements = [target];
    } else if (target instanceof NodeList || Array.isArray(target)) {
      this.elements = Array.from(target) as HTMLElement[];
    }
    
    // Process each element
    this.elements.forEach(element => {
      const originalText = element.innerHTML;
      let newHtml = '';
      
      if (config.type === 'chars' || config.type === 'both') {
        // Split into characters
        const chars = originalText.split('');
        newHtml = chars.map(char => {
          if (char === ' ') {
            return ' ';
          }
          const charSpan = document.createElement('span');
          charSpan.className = 'split-char';
          charSpan.innerHTML = char;
          this.chars.push(charSpan);
          return charSpan.outerHTML;
        }).join('');
        element.innerHTML = newHtml;
      } else if (config.type === 'words') {
        // Split into words
        const words = originalText.split(' ');
        newHtml = words.map(word => {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'split-word';
          wordSpan.innerHTML = word;
          this.words.push(wordSpan);
          return wordSpan.outerHTML;
        }).join(' ');
        element.innerHTML = newHtml;
      } else if (config.type === 'lines') {
        // This is a simplified version - in a real implementation,
        // you would need to calculate actual line breaks based on layout
        const lines = originalText.split('\n');
        newHtml = lines.map(line => {
          const lineSpan = document.createElement('span');
          lineSpan.className = 'split-line';
          lineSpan.innerHTML = line;
          this.lines.push(lineSpan);
          return lineSpan.outerHTML;
        }).join('<br>');
        element.innerHTML = newHtml;
      }
    });
  }
  
  revert() {
    // Revert elements to their original state
    this.elements.forEach(element => {
      const originalText = Array.from(element.childNodes)
        .map(node => node.textContent)
        .join('');
      element.innerHTML = originalText;
    });
    
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}

// Try to dynamically import DrawSVGPlugin if available
let DrawSVGPlugin: DrawSVGPluginType = MockDrawSVGPlugin;

// Export the plugins
export { gsap, ScrollTrigger, DrawSVGPlugin, SplitText }; 