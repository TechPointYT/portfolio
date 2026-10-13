import { hero } from '../data/site.js';

// Deterministic pseudo-random delays so letters settle out of sync,
// but the same way on every load.
function letterDelay(i) {
  const jitter = ((i * 37) % 11) * 45;
  return 150 + i * 40 + jitter;
}

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero__grain" aria-hidden="true" />
      <div className="hero__inner">
        <h1 className="hero__name" aria-label={hero.name}>
          {hero.name.split('').map((ch, i) => (
            <span
              key={i}
              className="hero__letter"
              style={{ '--d': `${letterDelay(i)}ms` }}
              aria-hidden="true"
            >
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </h1>
        <p className="hero__line">{hero.line}</p>
      </div>
    </header>
  );
}
