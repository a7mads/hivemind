import { gsap } from 'gsap';

/**
 * Collection of reusable GSAP animations for components
 */

// Text reveal animation for headings
export const textRevealAnimation = (element: HTMLElement, delay: number = 0) => {
  const splitText = element.textContent?.split(' ') || [];
  element.innerHTML = '';
  
  // Create a span for each word
  splitText.forEach((word, i) => {
    const wordSpan = document.createElement('span');
    wordSpan.innerHTML = word + (i < splitText.length - 1 ? '&nbsp;' : '');
    wordSpan.style.display = 'inline-block';
    wordSpan.style.overflow = 'hidden';
    
    const innerSpan = document.createElement('span');
    innerSpan.innerHTML = word + (i < splitText.length - 1 ? '&nbsp;' : '');
    innerSpan.style.display = 'inline-block';
    innerSpan.style.transform = 'translateY(100%)';
    
    wordSpan.appendChild(innerSpan);
    element.appendChild(wordSpan);
  });
  
  // Animate each word
  return gsap.to(element.querySelectorAll('span > span'), {
    y: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out",
    delay
  });
};

// Staggered fade in animation for multiple elements
export const staggeredFadeIn = (elements: HTMLElement[], delay: number = 0, staggerAmount: number = 0.1) => {
  return gsap.fromTo(
    elements,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: staggerAmount,
      ease: "power2.out",
      delay
    }
  );
};

// SVG path drawing animation
export const drawSVGAnimation = (svgElement: SVGElement, delay: number = 0) => {
  const paths = svgElement.querySelectorAll('path, circle, rect, polyline');
  
  return gsap.fromTo(
    paths,
    { drawSVG: "0%" },
    {
      drawSVG: "100%",
      duration: 1,
      stagger: 0.1,
      ease: "power2.inOut",
      delay
    }
  );
};

// 3D card hover effect
export const card3DHoverEffect = (card: HTMLElement, intensity: number = 15) => {
  const cardBounds = card.getBoundingClientRect();
  
  const handleMouseMove = (e: MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const cardCenterX = cardBounds.left + cardBounds.width / 2;
    const cardCenterY = cardBounds.top + cardBounds.height / 2;
    
    const percentX = (mouseX - cardCenterX) / (cardBounds.width / 2);
    const percentY = -((mouseY - cardCenterY) / (cardBounds.height / 2));
    
    gsap.to(card, {
      rotationY: intensity * percentX,
      rotationX: intensity * percentY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
      transformStyle: "preserve-3d"
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(card, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "power2.out"
    });
  };
  
  card.addEventListener('mousemove', handleMouseMove);
  card.addEventListener('mouseleave', handleMouseLeave);
  
  // Return cleanup function
  return () => {
    card.removeEventListener('mousemove', handleMouseMove);
    card.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Magnetic button effect
export const magneticButtonEffect = (button: HTMLElement, intensity: number = 0.3) => {
  const buttonBounds = button.getBoundingClientRect();
  
  const handleMouseMove = (e: MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const buttonCenterX = buttonBounds.left + buttonBounds.width / 2;
    const buttonCenterY = buttonBounds.top + buttonBounds.height / 2;
    
    const deltaX = mouseX - buttonCenterX;
    const deltaY = mouseY - buttonCenterY;
    
    gsap.to(button, {
      x: deltaX * intensity,
      y: deltaY * intensity,
      duration: 0.3,
      ease: "power2.out"
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)"
    });
  };
  
  button.addEventListener('mousemove', handleMouseMove);
  button.addEventListener('mouseleave', handleMouseLeave);
  
  // Return cleanup function
  return () => {
    button.removeEventListener('mousemove', handleMouseMove);
    button.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Parallax scroll effect
export const parallaxScrollEffect = (element: HTMLElement, speed: number = 0.5) => {
  gsap.to(element, {
    y: () => window.innerHeight * speed * -1,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
};

// Text scramble effect
export const textScrambleEffect = (element: HTMLElement, finalText: string, duration: number = 2) => {
  const chars = '!<>-_\\/[]{}—=+*^?#________';
  const originalText = finalText;
  let currentText = '';
  let iteration = 0;
  const maxIterations = 15;
  
  const scramble = () => {
    if (iteration >= maxIterations) {
      element.textContent = originalText;
      return;
    }
    
    iteration++;
    
    currentText = originalText
      .split('')
      .map((char, i) => {
        if (i < iteration / maxIterations * originalText.length) {
          return originalText[i];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    
    element.textContent = currentText;
    
    requestAnimationFrame(scramble);
  };
  
  scramble();
}; 