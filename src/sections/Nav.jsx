import { useEffect, useState } from 'react';

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'ideas', label: 'Ideas' },
  { id: 'contact', label: 'Contact' },
];

// Floating pill nav. Stays out of the hero, resolves in once you scroll past it,
// and highlights the section you're reading.
export default function Nav() {
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState(null);
  const [atBottom, setAtBottom] = useState(false);

  // Show once most of the hero has scrolled away.
  useEffect(() => {
    const hero = document.getElementById('top');
    if (!hero) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setShown(window.scrollY > hero.offsetHeight * 0.6);
      // The footer is short, so it may never reach the middle of the screen.
      setAtBottom(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Scroll spy: the active section is the one crossing the middle of the screen.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const current = atBottom ? 'contact' : active;

  return (
    <nav className={`nav ${shown ? 'is-shown' : ''}`.trim()} aria-label="Main">
      <ul>
        {LINKS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={id === 'contact' ? 'nav__cta' : undefined}
              aria-current={current === id ? 'true' : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
