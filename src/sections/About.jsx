import Reveal from '../components/Reveal.jsx';
import { about } from '../data/site.js';

export default function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <Reveal as="h2" id="about-title" className="section-title">
        {about.title}
      </Reveal>
      <Reveal className="about__body" delay={100}>
        {about.paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </Reveal>
    </section>
  );
}
