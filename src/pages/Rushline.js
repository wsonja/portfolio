import { useEffect, useRef, useState } from "react";
import { Container, Badge, Button, Row, Col } from "react-bootstrap";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import bgImg from "../assets/wallpaper.jpg";
import TechPills from "../components/TechPills";
import "../styles/rushline.css";

import clubsMp4 from "../assets/rushline/rushline-clubs-filter.mp4";
import clubsGif from "../assets/rushline/rushline-clubs-filter.gif";
import clubsPoster from "../assets/rushline/rushline-clubs-filter-poster.png";
import intelMp4 from "../assets/rushline/rushline-club-intel.mp4";
import intelGif from "../assets/rushline/rushline-club-intel.gif";
import intelPoster from "../assets/rushline/rushline-club-intel-poster.png";
import landingMp4 from "../assets/rushline/rushline-landing.mp4";
import landingGif from "../assets/rushline/rushline-landing.gif";
import landingPoster from "../assets/rushline/rushline-landing-poster.png";
import campusMp4 from "../assets/rushline/rushline-campus-toggle.mp4";
import campusGif from "../assets/rushline/rushline-campus-toggle.gif";
import campusPoster from "../assets/rushline/rushline-campus-toggle-poster.png";
import phoneMp4 from "../assets/rushline/rushline-phone.mp4";
import phoneGif from "../assets/rushline/rushline-phone.gif";
import phonePoster from "../assets/rushline/rushline-phone-poster.png";
import process1 from "../assets/rushline/rushline-process-1.png";
import process2 from "../assets/rushline/rushline-process-2.png";
import process3 from "../assets/rushline/rushline-process-3.png";
import process4 from "../assets/rushline/rushline-process-4.png";

const LIVE_URL = "https://rushline.vercel.app";
const REPO_URL = "https://github.com/sahitid/rushline";

const skills = [
  "Web App",
  "Data Scraping",
  "Supabase",
  "Multi-Agent Workflow",
  "Recruiting Intel",
];

const stack = ["Next.js", "React", "Supabase", "PostgreSQL", "Vercel", "Cursor", "Grok Bot"];

const demos = [
  {
    id: "clubs",
    label: "Clubs list",
    kind: "desktop",
    mp4: clubsMp4,
    gif: clubsGif,
    poster: clubsPoster,
    alt: "Rushline's ranked club list being filtered from all 121 clubs to 64 tech clubs, each with a match score out of 100 and its evidence.",
    caption: "Your matches: every Cornell club scored out of 100 for your goals, with the evidence it found.",
  },
  {
    id: "intel",
    label: "Club intel",
    kind: "desktop",
    mp4: intelMp4,
    gif: intelGif,
    poster: intelPoster,
    alt: "Opening Rushline's intel page for Cornell Data Science: a sourced review, the recruiting timeline and where members end up.",
    caption: "A club's intel page: a review with every claim footnoted, the recruiting timeline, and placements.",
  },
  {
    id: "landing",
    label: "Landing",
    kind: "desktop",
    mp4: landingMp4,
    gif: landingGif,
    poster: landingPoster,
    alt: "Rushline's landing page scrolling from the \"Recruit with an insider's edge\" headline to its three feature cards.",
    caption: "The landing page, signed out.",
  },
  {
    id: "campus",
    label: "Campus toggle",
    kind: "desktop",
    mp4: campusMp4,
    gif: campusGif,
    poster: campusPoster,
    alt: "Switching Rushline's landing page between Cornell and Berkeley.",
    caption: "One switch between Cornell and Berkeley.",
  },
  {
    id: "phone",
    label: "Phone",
    kind: "phone",
    mp4: phoneMp4,
    gif: phoneGif,
    poster: phonePoster,
    alt: "Rushline's landing page on a phone, scrolling from the headline to the feature cards.",
    caption: "The same landing page on a phone.",
  },
];

const features = [
  {
    title: "Ranks clubs for you.",
    body: "Pick what you are recruiting for, like Big Tech, Tech or Design, and Rushline scores all 121 Cornell clubs out of 100. Each score shows its evidence: the club site, the roster, Reddit and campus chatter.",
  },
  {
    title: "Intel on every club.",
    body: "A short review where every claim is footnoted to the document it came from, the recruiting timeline with real dates, and placements, meaning where members end up.",
  },
  {
    title: "Your path in.",
    body: "Members and alumni ranked to your goals, with warm-intro suggestions and a first message already drafted.",
  },
  {
    title: "Two campuses, any club.",
    body: "Switch between Cornell and Berkeley, and name any club that is missing to scrape it live.",
  },
];

const steps = [
  {
    title: "The idea",
    body: "The Grok Bot Build Night brief asked for a real back-to-school problem, and clubs and fall recruiting were both on the list. Recruiting is won on information asymmetry, so we set out to put the same ground truth in front of everyone.",
    image: process1,
    alt: "Build Night slide titled \"A real back-to-school problem\" with four prompts: Homework, Clubs, Schedules and Fall recruiting.",
    caption: "The Build Night brief.",
  },
  {
    title: "A scraping pipeline",
    body: "We pulled club websites, Instagram and LinkedIn into one pipeline: about 113 clubs and about 1,400 members, plus more than 400 LinkedIn profiles that power the placements view.",
  },
  {
    title: "One data model in Supabase",
    body: "Everything lands in Supabase (Postgres): clubs, members, the sources behind them and the recruiting dates. That way every match score and every sentence in a review can point back to where it came from.",
  },
  {
    title: "An agent team, with Cursor",
    body: "I built the app in Cursor and ran a team of five Grok Bot agents, each with one job: a lead that breaks work up and routes it, a research agent, a quality agent that catches bugs and reviews drafts, a shipping agent that writes the code, scripts and automations, and a communications agent that only drafts until a person approves. They scraped, verified and loaded data in parallel.",
    image: process2,
    alt: "Slide showing a team of five Grok Bot agents, each with a role: lead and router, quality and safety, communications, shipping, and research.",
    caption: "The five-agent setup, one role each.",
    extraImage: process3,
    extraAlt: "Slide listing how Grok Bot agents work: their own computer in the cloud, signed into your tools, and working after you log off.",
    extraCaption: "Each agent gets its own computer in the cloud, signs into the tools we already use, and keeps working after we log off.",
  },
  {
    title: "Verification",
    body: "No claim without a source. Reviews are assembled from the documents behind them with numbered footnotes, every match shows which evidence it found, and the quality agent's whole job was flagging anything that did not check out.",
  },
  {
    title: "Ship",
    body: "Rushline is a Next.js app on Vercel with a Supabase backend, live at rushline.vercel.app. It was the live demo in my Build Night deck.",
    image: process4,
    alt: "Rushline demo slide showing the landing page on desktop and phone, with a link to rushline.vercel.app.",
    caption: "The Rushline demo slide.",
  },
];

const learned = [
  "Giving each agent one clear job, plus one agent whose only job is routing the work, made parallel work much easier to trust.",
  "Showing where every claim came from did more for trust than any amount of polish.",
  "Scraping is the easy part. Cleaning, matching and checking the data is where the real work is.",
];

function BrowserFrame({ url, children }) {
  return (
    <div className="rushline-browser">
      <div className="rushline-browser-bar" aria-hidden="true">
        <span className="rushline-dot" />
        <span className="rushline-dot" />
        <span className="rushline-dot" />
        <span className="rushline-url">{url}</span>
      </div>
      <div className="rushline-browser-body">{children}</div>
    </div>
  );
}

function PhoneFrame({ children }) {
  return (
    <div className="rushline-phone">
      <div className="rushline-phone-screen">{children}</div>
    </div>
  );
}

function LoopVideo({ demo, reduced }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  // Lazy-load: only attach the src once the player is near the viewport.
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !inView) return;
    video.muted = true;
    if (reduced) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [inView, reduced]);

  return (
    <video
      ref={ref}
      className="rushline-video"
      poster={demo.poster}
      src={inView ? demo.mp4 : undefined}
      muted
      loop
      playsInline
      autoPlay={!reduced}
      controls={reduced}
      preload={inView ? "auto" : "none"}
      aria-label={demo.alt}
    >
      <img src={demo.gif} alt={demo.alt} />
    </video>
  );
}

function DemoSwitcher() {
  const [active, setActive] = useState(demos[0].id);
  const reduced = useReducedMotion();
  const tabRefs = useRef([]);
  const demo = demos.find((d) => d.id === active);

  const onKeyDown = (e, i) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + demos.length) % demos.length;
    setActive(demos[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="rushline-demo mb-4">
      <div className="rushline-tabs" role="tablist" aria-label="Rushline demo loops">
        {demos.map((d, i) => (
          <button
            key={d.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            id={`rushline-tab-${d.id}`}
            type="button"
            role="tab"
            aria-selected={d.id === active}
            aria-controls="rushline-demo-panel"
            tabIndex={d.id === active ? 0 : -1}
            className={`rushline-tab${d.id === active ? " is-active" : ""}`}
            onClick={() => setActive(d.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div
        id="rushline-demo-panel"
        role="tabpanel"
        aria-labelledby={`rushline-tab-${demo.id}`}
        className="rushline-stage"
      >
        {demo.kind === "phone" ? (
          <PhoneFrame>
            <LoopVideo key={demo.id} demo={demo} reduced={reduced} />
          </PhoneFrame>
        ) : (
          <BrowserFrame url="rushline.vercel.app">
            <LoopVideo key={demo.id} demo={demo} reduced={reduced} />
          </BrowserFrame>
        )}
        <p className="rushline-caption">{demo.caption}</p>
      </div>
    </div>
  );
}

function LiveDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rushline-live">
      {open ? (
        <BrowserFrame url="rushline.vercel.app">
          <iframe
            src={LIVE_URL}
            title="Rushline, live"
            className="rushline-iframe"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </BrowserFrame>
      ) : (
        <Button variant="outline-light" onClick={() => setOpen(true)}>
          Load live demo
        </Button>
      )}
      <p className="rushline-caption">
        This loads the real app inside the page. Signing in works best in its own tab, so if
        anything looks off,{" "}
        <a href={LIVE_URL} target="_blank" rel="noreferrer">
          open Rushline in a new tab
        </a>
        .
      </p>
    </div>
  );
}

export default function Rushline() {
  return (
    <div className="page-bg" style={{ backgroundImage: `url(${bgImg})` }}>
      <div className="bg-overlay" />

      <Container className="project-detail-content py-5">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Button
            as={Link}
            to="/#projects"
            variant="outline-light"
            className="mb-4 back-button"
          >
            Back to Projects
          </Button>

          <h1 className="project-detail-title mb-3">Rushline</h1>

          <p className="rushline-pitch">
            Rushline ranks Cornell clubs against what you want to do, and shows you the
            evidence behind every match.
          </p>

          <div className="rushline-actions mb-4">
            <Button variant="light" href={LIVE_URL} target="_blank" rel="noreferrer">
              Try it live
            </Button>
            <Button variant="outline-light" href={REPO_URL} target="_blank" rel="noreferrer">
              GitHub
            </Button>
          </div>

          <DemoSwitcher />

          <p className="project-detail-description">
            Club recruiting runs on information that usually comes from knowing someone in
            the club. My co-builder Sahiti and I made Rushline to close that gap. It reads
            the primary sources, like club websites, rosters, Reddit and live chatter, and
            turns them into a ranked list of 121 Cornell clubs, a sourced intel page for each
            one, and a clear path in. It works for Berkeley too.
          </p>

          <div className="mb-4">
            {skills.map((skill) => (
              <Badge key={skill} pill bg="light" text="dark" className="me-2 mb-2 skill-pill">
                {skill}
              </Badge>
            ))}
          </div>

          <Row className="g-4 mt-2">
            <Col md={6}>
              <div className="project-detail-section">
                <h3>What it does</h3>
                <ul className="rushline-list">
                  {features.map((f) => (
                    <li key={f.title}>
                      <strong>{f.title}</strong> {f.body}
                    </li>
                  ))}
                </ul>
              </div>
            </Col>

            <Col md={6}>
              <div className="project-detail-section">
                <h3>Why it matters</h3>
                <p>
                  Some students know which clubs fit them, when applications are due and who
                  to talk to. Others find out after the deadline. Rushline puts the same
                  ground truth in front of everyone, with sources attached.
                </p>
                <div className="rushline-stats">
                  <div>
                    <strong>121</strong>
                    <span>Cornell clubs ranked</span>
                  </div>
                  <div>
                    <strong>~1,400</strong>
                    <span>club members in the data</span>
                  </div>
                  <div>
                    <strong>400+</strong>
                    <span>LinkedIn profiles behind placements</span>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={12}>
              <div className="project-detail-section">
                <h3>Try the live app</h3>
                <LiveDemo />
              </div>
            </Col>

            <Col xs={12}>
              <div className="project-detail-section">
                <h3>How I built it</h3>
                <ol className="rushline-steps">
                  {steps.map((step, i) => (
                    <li key={step.title} className="rushline-step">
                      <span className="rushline-step-num" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h4>{step.title}</h4>
                        <p>{step.body}</p>
                        {step.image && (
                          <figure className="rushline-figure">
                            <img src={step.image} alt={step.alt} loading="lazy" />
                            <figcaption>{step.caption}</figcaption>
                          </figure>
                        )}
                        {step.extraImage && (
                          <figure className="rushline-figure">
                            <img src={step.extraImage} alt={step.extraAlt} loading="lazy" />
                            <figcaption>{step.extraCaption}</figcaption>
                          </figure>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Col>

            <Col md={6}>
              <div className="project-detail-section">
                <h3>Stack</h3>
                <TechPills items={stack} />
              </div>
            </Col>

            <Col md={6}>
              <div className="project-detail-section">
                <h3>What I learned</h3>
                <ul className="rushline-list">
                  {learned.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </div>
  );
}
