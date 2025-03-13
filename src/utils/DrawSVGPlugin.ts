/**
 * Enhanced implementation of DrawSVGPlugin functionality
 * This provides SVG path drawing animation similar to GSAP's premium DrawSVGPlugin
 */

import { gsap } from 'gsap';

interface DrawSVGPluginData {
  target: SVGPathElement | SVGElement;
  start: number;
  end: number;
  length: number;
  isPath: boolean;
}

interface DrawSVGValue {
  start?: number | string;
  end?: number | string;
}

interface DrawSVGPluginInstance {
  data: DrawSVGPluginData;
}

// Create an enhanced DrawSVGPlugin implementation
const DrawSVGPlugin = {
  name: "drawSVG",
  
  // Initialize the plugin
  init(target: SVGPathElement | SVGElement, value: DrawSVGValue | string | number): boolean {
    // Check if it's an SVG element
    if (!(target instanceof SVGElement)) {
      return false;
    }
    
    // Determine if it's a path-like element that can be drawn
    const isPath = target.tagName === "path" || 
                  target.tagName === "line" || 
                  target.tagName === "polyline" || 
                  target.tagName === "polygon" || 
                  target.tagName === "circle" || 
                  target.tagName === "rect" || 
                  target.tagName === "ellipse";
    
    if (!isPath) {
      return false;
    }
    
    // Get the total length of the path
    let length = 100;
    
    if ('getTotalLength' in target && typeof target.getTotalLength === 'function') {
      length = target.getTotalLength();
    } else if (target.tagName === "circle") {
      const circle = target as SVGCircleElement;
      const radius = parseFloat(circle.getAttribute('r') || "0");
      length = 2 * Math.PI * radius;
    } else if (target.tagName === "rect") {
      const rect = target as SVGRectElement;
      const width = parseFloat(rect.getAttribute('width') || "0");
      const height = parseFloat(rect.getAttribute('height') || "0");
      length = 2 * (width + height);
    } else if (target.tagName === "line") {
      const line = target as SVGLineElement;
      const x1 = parseFloat(line.getAttribute('x1') || "0");
      const y1 = parseFloat(line.getAttribute('y1') || "0");
      const x2 = parseFloat(line.getAttribute('x2') || "0");
      const y2 = parseFloat(line.getAttribute('y2') || "0");
      length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }
    
    // Parse the value (e.g., "0% 100%", "0 100", etc.)
    let start: number, end: number;
    
    if (typeof value === "object" && value !== null) {
      // Handle object notation { start: "0%", end: "100%" }
      start = parseValue(value.start, length) || 0;
      end = parseValue(value.end, length) || length;
    } else if (typeof value === "string") {
      // Handle string notation "0% 100%" or "0 100"
      const values = value.split(" ");
      start = parseValue(values[0], length) || 0;
      end = values.length > 1 ? parseValue(values[1], length) || length : length;
    } else if (typeof value === "number") {
      // Handle single number (percentage of completion)
      start = 0;
      end = length * Math.min(Math.max(value, 0), 1);
    } else {
      start = 0;
      end = length;
    }
    
    // Store the values for animation
    const data: DrawSVGPluginData = {
      start,
      end,
      length,
      target,
      isPath
    };
    
    // Set initial state
    target.style.strokeDasharray = `${length} ${length}`;
    target.style.strokeDashoffset = `${length - start}`;
    
    // Store the data for use in the render function
    (this as unknown as DrawSVGPluginInstance).data = data;
    
    return true;
  },
  
  // Render the animation at each frame
  render(ratio: number, plugin: DrawSVGPluginInstance): void {
    const data = plugin.data;
    const target = data.target;
    const length = data.length;
    
    // Calculate the current progress
    const start = data.start + (data.end - data.start) * ratio;
    
    // Apply the drawing effect
    target.style.strokeDashoffset = `${length - start}`;
  }
};

// Helper function to parse values that could be percentages or absolute numbers
function parseValue(value: string | number | undefined, length: number): number | undefined {
  if (value === undefined) return undefined;
  
  if (typeof value === "number") return value;
  
  if (typeof value === "string") {
    if (value.endsWith("%")) {
      return (parseFloat(value) / 100) * length;
    }
    return parseFloat(value);
  }
  
  return undefined;
}

// Register the plugin with GSAP
gsap.registerPlugin(DrawSVGPlugin);

export { DrawSVGPlugin };