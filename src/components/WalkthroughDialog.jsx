import { useRef, useState } from 'react';
import MissingMedia from './MissingMedia.jsx';
import { useReducedMotion } from '../hooks/useReducedMotion.js';

// A button that opens the full walkthrough in a modal dialog.
// `video` is { youtube, length } for a YouTube embed, or { src, poster, length } for a local file.
export default function WalkthroughDialog({ title, video }) {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [missing, setMissing] = useState(false);
  const reduced = useReducedMotion();
  const label = `${title} full walkthrough`;

  const open = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
    if (!reduced) videoRef.current?.play().catch(() => {});
  };
  const close = () => dialogRef.current?.close();
  // Runs on Close button, Esc key, or any other close alike.
  const handleClose = () => {
    setIsOpen(false); // unmounts the YouTube player, which stops it
    videoRef.current?.pause();
  };

  let player;
  if (video.youtube) {
    // Only mounted while open, so YouTube loads on demand and stops on close.
    const params = new URLSearchParams({ autoplay: reduced ? '0' : '1', rel: '0', playsinline: '1' });
    player = isOpen && (
      <iframe
        className="video-dialog__embed"
        src={`https://www.youtube-nocookie.com/embed/${video.youtube}?${params}`}
        title={label}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
      />
    );
  } else if (missing) {
    player = <MissingMedia src={video.src} label={label} />;
  } else {
    player = (
      <video
        ref={videoRef}
        src={video.src}
        poster={video.poster}
        controls
        playsInline
        preload="none"
        onError={() => setMissing(true)}
      />
    );
  }

  return (
    <>
      <button type="button" className="btn" onClick={open}>
        Watch the full walkthrough{video.length ? ` (${video.length})` : ''}
      </button>
      <dialog ref={dialogRef} className="video-dialog" aria-label={label} onClose={handleClose}>
        {player}
        <button type="button" className="btn btn--quiet" onClick={close}>
          Close
        </button>
      </dialog>
    </>
  );
}
