import Reveal from '../components/Reveal.jsx';
import { ideasIntro } from '../data/site.js';

// Small fixed tilts so the notes look pinned by hand, the same way on every load.
const TILTS = [-1.5, 1, -0.75, 1.5, -1, 0.75];

export default function Ideas({ ideas }) {
  return (
    <section className="ideas" id="ideas" aria-labelledby="ideas-title">
      <Reveal as="h2" id="ideas-title" className="section-title">
        {ideasIntro.title}
      </Reveal>
      <Reveal as="p" className="ideas__intro" delay={90}>
        {ideasIntro.intro}
      </Reveal>

      <ul className="ideas__notes">
        {ideas.map((idea, i) => (
          <Reveal as="li" key={idea.id} delay={120 + (i % 2) * 140}>
            <article className="idea" style={{ '--tilt': `${TILTS[i % TILTS.length]}deg` }}>
              <h3 className="idea__title">{idea.title}</h3>
              <p className="idea__pitch">{idea.pitch}</p>
              <p className="idea__detail">{idea.detail}</p>
            </article>
          </Reveal>
        ))}
      </ul>

      {/* A playful "still loading" sign-off. The spinner and dots are decoration only. */}
      <Reveal as="p" className="ideas__outro">
        <span className="ideas__spinner" aria-hidden="true" />
        {ideasIntro.outro}
        <span className="ideas__dots" aria-hidden="true">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </Reveal>
    </section>
  );
}
