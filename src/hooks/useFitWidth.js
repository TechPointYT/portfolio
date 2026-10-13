import { useLayoutEffect, useRef } from 'react';

// Sizes the text in `fitRef` so it runs exactly as wide as `matchRef`, on one line.
// If that would make it smaller than `minPx`, it uses `minPx` and wraps instead.
// Re-measures when web fonts finish loading and when the window resizes.
export function useFitWidth({ minPx = 16 } = {}) {
  const matchRef = useRef(null);
  const fitRef = useRef(null);

  useLayoutEffect(() => {
    const fit = () => {
      const target = matchRef.current;
      const el = fitRef.current;
      if (!target || !el) return;
      // Measure at a known size on one line, then scale to the target width.
      el.style.whiteSpace = 'nowrap';
      el.style.fontSize = '100px';
      const size = (100 * target.offsetWidth) / el.scrollWidth;
      const fits = size >= minPx;
      el.style.fontSize = `${fits ? size : minPx}px`;
      el.style.whiteSpace = fits ? 'nowrap' : 'normal';
    };

    fit();
    document.fonts?.ready.then(fit);
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [minPx]);

  return [matchRef, fitRef];
}
