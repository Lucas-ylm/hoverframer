import React, { useEffect } from 'react';
import { Line } from './line';

const LineComponent: React.FC = () => {
  useEffect(() => {
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
    
    textElements.forEach((el) => {
      const line = new Line({
        el: el as HTMLElement,
      });
      line.show(1);
    });

    return () => {
      textElements.forEach((el) => {
        el.innerHTML = el.textContent || '';
      });
    };
  }, []);

  return null; 
};

export default LineComponent;
