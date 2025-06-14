import { useState, useEffect, useRef } from 'react';

export const useLayoutInfo = () => {
  const navbarRef = useRef<HTMLElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const measureHeight = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };

    // Measure height initially
    measureHeight();

    // Observe for changes to the navbar's size
    const observer = new MutationObserver(measureHeight);
    if (navbarRef.current) {
      observer.observe(navbarRef.current, { subtree: true, attributes: true });
    }

    // Measure height on window resize
    window.addEventListener('resize', measureHeight);

    // Clean up
    return () => {
      window.removeEventListener('resize', measureHeight);
      observer.disconnect();
    };
  }, []); // Empty dependency array means this effect sets up observers/listeners once

  // Optional: Add a dependency on isMenuOpen if passing it into the hook is desired
  // For now, MutationObserver handles changes automatically

  return { navbarRef, navbarHeight };
}; 