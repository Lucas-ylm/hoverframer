import React, { useEffect, useRef, useCallback } from 'react';
import { Line } from './line';

const VISIBILITY_CHECK_INTERVAL = 100;
const SHOW_DELAY = 500;
const OBSERVER_THRESHOLD = 0.4;

const LineComponent: React.FC = () => {
  const linesRef = useRef<Line[]>([]);
  const timeoutsRef = useRef<number[]>([]);
  const intervalRef = useRef<number>();
  const observerRef = useRef<IntersectionObserver>();

  const isElementInViewport = useCallback((el: Element) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight ?? document.documentElement.clientHeight;
    const windowWidth = window.innerWidth ?? document.documentElement.clientWidth;
    
    return (
      rect.top <= windowHeight &&
      rect.bottom >= 0 &&
      rect.left <= windowWidth &&
      rect.right >= 0
    );
  }, []);

  const checkVisibility = useCallback(() => {
    requestAnimationFrame(() => {
      linesRef.current.forEach((line) => {
        if (line?.el && !isElementInViewport(line.el)) {
          line.hide(0);
        }
      });
    });
  }, [isElementInViewport]);

  useEffect(() => {
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
    const textArray = Array.from(textElements);
    
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = textArray.indexOf(entry.target);
        if (index !== -1) {
          const currentTimeout = timeoutsRef.current[index];
          if (currentTimeout) {
            window.clearTimeout(currentTimeout);
          }

          if (entry.isIntersecting) {
            timeoutsRef.current[index] = window.setTimeout(() => {
              requestAnimationFrame(() => {
                linesRef.current[index]?.show(0);
              });
            }, SHOW_DELAY);
          } else {
            requestAnimationFrame(() => {
              linesRef.current[index]?.hide(0);
            });
          }
        }
      });
    }, {
      threshold: OBSERVER_THRESHOLD,
    });

    linesRef.current = textArray.map(el => new Line({ el: el as HTMLElement }));
    
    textArray.forEach(el => observerRef.current?.observe(el));

    const startVisibilityCheck = () => {
      checkVisibility();
      intervalRef.current = window.setTimeout(startVisibilityCheck, VISIBILITY_CHECK_INTERVAL);
    };
    
    startVisibilityCheck();

    return () => {
      observerRef.current?.disconnect();
      timeoutsRef.current.forEach(window.clearTimeout);
      window.clearTimeout(intervalRef.current);
      
      linesRef.current.forEach(line => {
        if (line?.el) {
          line.el.innerHTML = line.el.textContent ?? '';
        }
      });
      
      linesRef.current = [];
      timeoutsRef.current = [];
    };
  }, [checkVisibility]);

  return null;
};

export default LineComponent;