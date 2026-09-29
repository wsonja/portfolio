import { links } from "../data/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={links.substack} target="_blank" rel="noreferrer">Substack</a>
        <a href={`mailto:${links.email}`}>Email</a>
      </div>
      <p>© {new Date().getFullYear()} Sonja Wong</p>
    </footer>
  );
}
