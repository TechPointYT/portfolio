import { useEffect, useRef, useState } from 'react';
import MissingMedia from './MissingMedia.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

// A phone-shaped looping clip. Plays only while mostly on screen.
// Tiles with `audio` get a sound toggle, since browsers block autoplaying sound.
export default function LoopTile({ src, caption, audio = false }) {
  const videoRef = useRef(null);
  const [missing, setMissing] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    if (!('IntersectionObserver' in window)) {
      video.play().catch(() => {});
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced, missing]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !soundOn;
    video.muted = !next;
    if (next) {
      // Start over so the narration plays from the top.
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    setSoundOn(next);
  };

  return (
    <figure className="loop">
      <div className={`loop__frame ${missing ? 'loop__frame--missing' : ''}`.trim()}>
        {missing ? (
          <MissingMedia src={src} label={caption} />
        ) : (
          <video
            ref={videoRef}
            src={src}
            muted
            loop
            playsInline
            preload="metadata"
            controls={reduced}
            aria-label={caption}
            onError={() => setMissing(true)}
          />
        )}
      </div>
      <figcaption className="loop__caption">{caption}</figcaption>
      {audio && !missing && (
        <button
          type="button"
          className="btn btn--ghost btn--small"
          aria-pressed={soundOn}
          onClick={toggleSound}
        >
          {soundOn ? 'Turn sound off' : 'Turn sound on'}
        </button>
      )}
    </figure>
  );
}
