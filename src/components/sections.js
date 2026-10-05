import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import headshot from "../assets/headshot-web.jpg";
import dusk from "../assets/landscape-dusk.jpg";
import bokeh from "../assets/landscape-bokeh.jpg";
import IntroCard from "./IntroCard";
import TechPills from "./TechPills";
import {
  experiences,
  links,
  posts,
  projects,
  roles,
  skills,
} from "../data/content";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-intro">
        <img className="hero-avatar" src={headshot} alt="Sonja Wong" />
        <div>
          <p className="eyebrow">Computer science · Cornell Engineering</p>
          <h1>Sonja Wong</h1>
          <p className="roles" aria-live="polite">
            <Typewriter
              words={roles}
              loop
              cursor
              cursorStyle="_"
              typeSpeed={68}
              deleteSpeed={36}
              delaySpeed={1250}
            />
          </p>
          <div className="hero-socials">
            <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={links.substack} target="_blank" rel="noreferrer">Substack</a>
          </div>
        </div>
      </div>
      <IntroCard />
      <ScrollCue />
    </section>
  );
}

function ScrollCue() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a className={`scroll-cue${hidden ? " is-hidden" : ""}`} href="#uber" aria-label="Scroll down">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </a>
  );
}

export function Featured() {
  return (
    <section className="feature" id="uber">
      <div className="feature-copy">
        <p className="eyebrow">May 2026 – Aug 2026</p>
        <h2>Software engineering intern at Uber.</h2>
        <p>
          Mobility Pricing and Promotions, San Francisco. An agentic oncall
          system for the Rider Promotions team, plus the skills and knowledge
          graph that replaced the old debug bots.
        </p>
        <a className="text-link" href="#work">
          See the full role
        </a>
      </div>
      <div className="feature-panel" style={{ backgroundImage: `url(${bokeh})` }}>
        <div>
          <strong>96%</strong>
          <span>of team alerts self-resolved</span>
        </div>
        <div>
          <strong>20×</strong>
          <span>faster response time</span>
        </div>
        <div>
          <strong>40+</strong>
          <span>domain skills shipped</span>
        </div>
        <div>
          <strong>10+</strong>
          <span>teams adopted it</span>
        </div>
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section className="block" id="work">
      <div className="block-head">
        <h2>Work</h2>
        <p>Roles from my resume, with the stack I used on each one.</p>
      </div>
      <div className="jobs">
        {experiences.map((job) => (
          <article className="job" key={`${job.org}-${job.role}`}>
            <div className="job-top">
              <div>
                <h3>
                  {job.org}
                  {job.current && <span className="now">Current</span>}
                </h3>
                <p className="job-role">{job.role}</p>
                {job.team && <p className="job-team">{job.team}</p>}
              </div>
              <div className="job-when">
                <p>{job.dates}</p>
                {job.place && <p>{job.place}</p>}
              </div>
            </div>
            {job.tech.length > 0 && (
              <div className="job-tech">
                <p className="label">Technologies</p>
                <TechPills items={job.tech} />
              </div>
            )}
            <div className="job-done">
              <p className="label">What I’ve done</p>
              <ul>
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProjectGrid() {
  return (
    <section className="block" id="projects">
      <div className="block-head">
        <h2>Projects</h2>
        <p>Hover any icon to see the technology.</p>
      </div>
      <div className="project-grid">
        {projects.map((project) => {
          const shot = (
            <div className="shot">
              {project.image && <img src={project.image} alt="" />}
              {project.hoverImage && (
                <img className="shot-hover" src={project.hoverImage} alt="" />
              )}
            </div>
          );
          return (
          <article className="project" key={project.title}>
            {project.hasPage ? (
              <Link className="shot-link" to={project.link} aria-label={`${project.title}, read more`}>
                {shot}
              </Link>
            ) : (
              shot
            )}
            <div className="project-body">
              <h3>{project.title}</h3>
              {project.description ? <p>{project.description}</p> : <p className="project-space" />}
              {project.skills.length > 0 && <TechPills items={project.skills} />}
              <div className="project-links">
                {project.hasPage ? (
                  <Link className="text-link" to={project.link}>
                    Read more
                  </Link>
                ) : (
                  <a className="text-link" href={project.link} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
                {project.article && (
                  <a className="text-link" href={project.article} target="_blank" rel="noreferrer">
                    Medium
                  </a>
                )}
              </div>
            </div>
          </article>
          );
        })}
      </div>
    </section>
  );
}

export function Writing() {
  const scroller = useRef(null);

  const slide = (direction) => {
    const node = scroller.current;
    if (!node) return;
    node.scrollBy({ left: direction * (node.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <section className="block" id="writing">
      <div className="block-head split">
        <div>
          <h2>Writing</h2>
          <p>LinkedIn posts, plus Substack.</p>
        </div>
        <div className="carousel-controls">
          <a href={links.substack} target="_blank" rel="noreferrer">
            Substack
          </a>
          <button type="button" onClick={() => slide(-1)} aria-label="Previous posts">
            ←
          </button>
          <button type="button" onClick={() => slide(1)} aria-label="Next posts">
            →
          </button>
        </div>
      </div>
      <div className="carousel" ref={scroller}>
        {posts.map((post, idx) => (
          <a
            className="post-card"
            key={post.href}
            href={post.href}
            target="_blank"
            rel="noreferrer"
          >
            <div className="post-art">
              <img src={idx % 2 === 0 ? dusk : bokeh} alt="" />
            </div>
            <h3>{post.title}</h3>
            <p className="post-date">
              <span>{post.source}</span> · {post.date}
            </p>
            <p>{post.excerpt}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  return (
    <section className="block" id="skills">
      <div className="block-head">
        <h2>Technologies</h2>
        <p>The full set from my resume. Hover any icon to see its name.</p>
      </div>
      <TechPills items={skills} />
    </section>
  );
}

export function AboutBlock() {
  return (
    <section className="block about-block" id="about">
      <div className="block-head">
        <h2>About</h2>
      </div>
      <div className="about-layout">
        <div className="prose">
          <p>
            Hi! My name is Sonja and I am a CS major in Cornell Engineering. I am a
            creator, coder, musician, and baker based in NY.
          </p>
          <p>
            I spent the summer as a software engineering intern at Uber in San
            Francisco, and I am a software lead of Cornell’s Autonomous Underwater
            Vehicles team (I bring my team to an international robotics competition
            every July — AUVSI Robosub).
          </p>
          <p>
            Previously, I worked as an AI Engineer intern at IBM, a software engineer
            at labs and startups in NYC & SF, a research assistant at Cornell (GP
            optimization, Bayesian, and ML urban routing algorithms), and a baker at
            Cinnabon for four years. One of the five startups I worked at IPO’d in
            2023.
          </p>
          <p>
            With &gt;10k streams on Spotify, I hope to continue making music with my
            band and am open to collaborations.
          </p>
        </div>
        <aside className="about-facts">
          <div>
            <p className="label">Education</p>
            <p>
              Cornell University, College of Engineering
              <br />
              B.S. Computer Science · GPA 3.92
              <br />
              Expected May 2028 · Ithaca, NY
            </p>
          </div>
          <div>
            <p className="label">Languages</p>
            <p>
              English, Cantonese, and Mandarin. German (C1), French (B2), Korean
              (TOPIK 3).
            </p>
          </div>
          <div>
            <p className="label">Also</p>
            <p>
              Jane Street SWE Fellow (INFOCUS), IMC Trading Fellow (WiTT), Millennium
              × WICC (’24–’26). CS 3110 TA.
            </p>
          </div>
        </aside>
      </div>
      <div className="about-lists">
        <div>
          <p className="label">Clubs</p>
          <p>
            Cornell University Autonomous Underwater Vehicles, Cornell Data Strategy,
            Women in Computing Cornell, Kappa Theta Pi, Society of Women Engineers,
            Cornell Marketing Club, Webdev Club.
          </p>
        </div>
        <div>
          <p className="label">Coursework</p>
          <p>
            Distributed Systems, Machine Learning, Analysis of Algorithms, OOP and
            Data Structures, Systems Programming, Linear Algebra, Discrete Structures,
            Financial Accounting, Multivariable Calculus, Statistics.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ContactBlock() {
  return (
    <section className="block contact-block" id="contact">
      <div className="block-head">
        <h2>Contact</h2>
        <p>Email, phone, GitHub, LinkedIn, and Substack.</p>
      </div>
      <div className="contact-grid">
        <a href={`mailto:${links.email}`}>{links.email}</a>
        <a href={`mailto:${links.cornellEmail}`}>{links.cornellEmail}</a>
        <a href={links.phoneHref}>{links.phone}</a>
        <a href={links.github} target="_blank" rel="noreferrer">
          github.com/wsonja
        </a>
        <a href={links.linkedin} target="_blank" rel="noreferrer">
          linkedin.com/in/sonja-wong
        </a>
        <a href={links.substack} target="_blank" rel="noreferrer">
          substack.com/@sonjawong
        </a>
      </div>
    </section>
  );
}
