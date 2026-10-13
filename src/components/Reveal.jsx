import { useReveal } from '../hooks/useReveal.js';

// Wrap any block to have it resolve from blur into focus as it scrolls in.
// `delay` (ms) lets siblings resolve slightly out of sync.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
