import Reveal from '../components/Reveal.jsx';
import { contact } from '../data/site.js';

export default function Contact() {
  return (
    <footer className="contact" id="contact" aria-labelledby="contact-title">
      <Reveal as="h2" id="contact-title" className="section-title">
        {contact.title}
      </Reveal>
      <Reveal className="contact__card" delay={100}>
        <p className="contact__name">{contact.name}</p>
        <ul className="contact__links">
          {contact.links.map((link) => (
            <li key={link.label}>
              <span className="contact__label">{link.label}</span>
              <a href={link.href}>{link.value}</a>
            </li>
          ))}
        </ul>
      </Reveal>
    </footer>
  );
}
