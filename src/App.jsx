import WavyPixels from './sections/WavyPixels.jsx';
import Nav from './sections/Nav.jsx';
import Hero from './sections/Hero.jsx';
import ProjectShowcase from './sections/ProjectShowcase.jsx';
import About from './sections/About.jsx';
import Ideas from './sections/Ideas.jsx';
import Contact from './sections/Contact.jsx';
import { projects } from './data/projects.js';
import { ideas } from './data/ideas.js';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <WavyPixels />
      <Nav />
      <Hero />
      <main id="main" tabIndex={-1}>
        <About />
        <div id="work">
          {projects.map((p) => (
            <ProjectShowcase key={p.id} project={p} />
          ))}
        </div>
        <Ideas ideas={ideas} />
      </main>
      <Contact />
    </>
  );
}
