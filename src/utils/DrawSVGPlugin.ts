/**
 * Custom implementation of DrawSVGPlugin functionality
 * This is a simplified version that provides basic SVG path drawing animation
 */

import { gsap } from 'gsap';

interface DrawSVGPluginData {
  target: SVGPathElement | SVGElement;
  start: number;
  end: number;
  length: number;
}

// Create a simple DrawSVGPlugin implementation
const DrawSVGPlugin = {
  name: "drawSVG",
  
  // Initialize the plugin
  init(target: SVGPathElement | SVGElement, value: any): boolean {
    // Check if it's an SVG element with getBBox method
    if (!('getBBox' in target)) {
      return false;
    }
    
    // Get the total length of the path
    const length = 'getTotalLength' in target && typeof target.getTotalLength === 'function' 
      ? target.getTotalLength() 
      : 100;
    
    // Parse the value (e.g., "0% 100%", "0 100", etc.)
    let start: number, end: number;
    
    if (typeof value === "object") {
      start = value.start || 0;
      end = value.end || 100;
    } else if (typeof value === "string" && value.indexOf("%") !== -1) {
      const values = value.split(" ");
      start = parseFloat(values[0]) / 100 * length;
      end = values.length > 1 ? parseFloat(values[1]) / 100 * length : length;
    } else if (typeof value === "string") {
      const values = value.split(" ");
      start = parseFloat(values[0]);
      end = values.length > 1 ? parseFloat(values[1]) : length;
    } else {
      start = 0;
      end = length;
    }
    
    // Store the values for animation
    const data: DrawSVGPluginData = {
      start,
      end,
      length,
      target
    };
    
    // Set initial state
    target.style.strokeDasharray = `${length} ${length}`;
    target.style.strokeDashoffset = `${length - start}`;
    
    // Store the data for use in the render function
    (this as any).data = data;
    
    return true;
  },
  
  // Render the animation at each frame
  render(ratio: number, plugin: any): void {
    const data = plugin.data as DrawSVGPluginData;
    const target = data.target;
    const length = data.length;
    const start = data.start + (data.end - data.start) * ratio;
    
    target.style.strokeDashoffset = `${length - start}`;
  }
};

// Register the plugin with GSAP
gsap.registerPlugin(DrawSVGPlugin);

export { DrawSVGPlugin }; 