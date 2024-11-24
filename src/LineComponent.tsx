import React, { useEffect } from 'react';
import { Line } from './line';

const LineComponent: React.FC = () => {
  useEffect(() => {
    // Find all text elements on the page
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
    
    textElements.forEach((el) => {
      // Create a new Line instance for each text element
      const line = new Line({
        el: el as HTMLElement,
      });
      line.show(1); // Apply the effect to the text element
    });

    return () => {
      // Cleanup function to stop effects when component unmounts
      textElements.forEach((el) => {
        // Reset text content or apply any other cleanup logic
        el.innerHTML = el.textContent || '';
      });
    };
  }, []); // Run once on mount

  return null; // No wrapper element needed in React, effect applies to existing elements
};

export default LineComponent;
