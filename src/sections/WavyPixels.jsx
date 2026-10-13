import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

// A slow wave field drawn as soft pixel blocks behind the whole page.
// The canvas is one pixel per cell and the browser scales it up crisply.
const CELL = 16; // CSS px per pixel block
const FPS = 24;

// Light troughs → fog → mist, with a lavender (--crayon) tint on the crests.
// The darkest level still keeps --slate text above 4.5:1 contrast.
const LEVELS = [
  [246, 247, 248],
  [233, 236, 238], // --fog
  [222, 226, 231], // --mist
  [225, 220, 248], // crayon-tinted crest
];

// 4×4 ordered dither so the bands break into pixels instead of hard edges.
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((n) => (n + 0.5) / 16);

function field(x, y, t) {
  const v =
    Math.sin(x * 0.16 + t * 0.5) +
    Math.sin(y * 0.21 - t * 0.35) +
    Math.sin((x + y) * 0.09 + t * 0.25) +
    Math.sin(Math.hypot(x - 20, y - 10) * 0.14 - t * 0.45);
  return (v + 4) / 8; // 0..1
}

export default function WavyPixels() {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let cols = 0;
    let rows = 0;
    let image = null;
    let frame = 0;
    let last = 0;

    const resize = () => {
      cols = Math.ceil(window.innerWidth / CELL);
      rows = Math.ceil(window.innerHeight / CELL);
      canvas.width = cols;
      canvas.height = rows;
      image = ctx.createImageData(cols, rows);
    };

    const draw = (t) => {
      const data = image.data;
      const top = LEVELS.length - 1;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v = field(x, y, t) * top + BAYER[(y % 4) * 4 + (x % 4)] - 0.5;
          const [r, g, b] = LEVELS[Math.min(top, Math.max(0, Math.round(v)))];
          const i = (y * cols + x) * 4;
          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
          data[i + 3] = 255;
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      if (now - last < 1000 / FPS) return;
      last = now;
      draw(now / 1000);
    };

    const onResize = () => {
      resize();
      if (reduced) draw(0);
    };

    resize();
    if (reduced) draw(0);
    else frame = requestAnimationFrame(tick);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="bg-waves" aria-hidden="true" />;
}
