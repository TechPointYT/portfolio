import Reveal from '../components/Reveal.jsx';
import LoopTile from '../components/LoopTile.jsx';
import WalkthroughDialog from '../components/WalkthroughDialog.jsx';

// The full section for each project in src/data/projects.js:
// title and summary, a row of looping clips, the walkthrough, the "Built with" tags,
// then the write-up behind a "Read how I built it" toggle.
// `status`, `full`, `story` and `stack` are optional.
export default function ProjectShowcase({ project }) {
  const { id, title, status, summary, loops = [], full, story = [], stack = [] } = project;
  const titleId = `${id}-title`;
  const stackId = `${id}-stack`;

  return (
    <section className="showcase" id={id} aria-labelledby={titleId}>
      <header className="showcase__head">
        <Reveal as="h2" id={titleId} className="showcase__title">
          {title}
        </Reveal>
        {status && (
          <Reveal as="p" className="showcase__status" delay={60}>
            {status}
          </Reveal>
        )}
        <Reveal as="p" className="showcase__summary" delay={90}>
          {summary}
        </Reveal>
      </header>

      {loops.length > 0 && (
        <ul className="loops" aria-label={`${title} clips`}>
          {loops.map((loop, i) => (
            <Reveal as="li" key={loop.src} delay={120 + i * 140}>
              <LoopTile {...loop} />
            </Reveal>
          ))}
        </ul>
      )}

      {full && (
        <Reveal className="showcase__cta" delay={160}>
          <WalkthroughDialog title={title} video={full} />
        </Reveal>
      )}

      {(story.length > 0 || stack.length > 0) && (
        <div className="showcase__text">
          {stack.length > 0 && (
            <Reveal className="showcase__stack">
              <h3 id={stackId}>Built with</h3>
              <ul className="tags" aria-labelledby={stackId}>
                {stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Reveal>
          )}
          {/* The demos lead; the write-up is there for anyone who opts in. */}
          {story.length > 0 && (
            <Reveal delay={120}>
              <details className="showcase__story">
                <summary>Read how I built it</summary>
                <div className="showcase__story-body">
                  {story.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </details>
            </Reveal>
          )}
        </div>
      )}
    </section>
  );
}
