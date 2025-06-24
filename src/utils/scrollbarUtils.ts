
export const getScrollbarWidth = (): number => {
  if (typeof window === 'undefined') return 0;
  
  // Create a temporary div to measure scrollbar width
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  // Use bracket notation to avoid TypeScript error
  (outer.style as any).msOverflowStyle = 'scrollbar';
  document.body.appendChild(outer);
  
  const inner = document.createElement('div');
  outer.appendChild(inner);
  
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  
  outer.parentNode?.removeChild(outer);
  
  return scrollbarWidth;
};

export const compensateForScrollbar = (element: HTMLElement) => {
  const scrollbarWidth = getScrollbarWidth();
  element.style.paddingRight = `${scrollbarWidth}px`;
};

export const removeScrollbarCompensation = (element: HTMLElement) => {
  element.style.paddingRight = '';
};
