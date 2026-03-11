import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import bgImg from "../assets/wallpaper.jpg";
import hsImg from "../assets/headshot.png";
import avatarImg from "../assets/avatar.jpg";
import TechMarquee from "../components/TechMarquee";

export default function Home() {
  const { scrollY } = useScroll();

  const introOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const introY = useTransform(scrollY, [0, 300], [0, -80]);
  const introRotate = useTransform(scrollY, [0, 300], [0, -6]);
  const introScale = useTransform(scrollY, [0, 300], [1, 0.93]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.33, 0]);

  const nextSectionRef = useRef(null);

  const scrollToNext = () => {
    nextSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const roles = ["software engineer", "ML researcher", "AI engineer"];

  return (
    <>
      <div
        className="home-bg"
        style={{
          backgroundImage: `url(${bgImg})`,
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#fff",
            opacity: overlayOpacity,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <motion.div
          className="home-intro"
          style={{
            position: "relative",
            zIndex: 2,
            opacity: introOpacity,
            y: introY,
            rotate: introRotate,
            scale: introScale,
          }}
        >
          <motion.img
            src={hsImg}
            alt="Sonja Wong"
            style={{
              boxShadow: "0 2px 12px 0 #c6c0e0aa",
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: "50%",
              marginBottom: "1em",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
          />

          <h1>Sonja Wong</h1>

          <div className="animated-desc">
            <span>
              <Typewriter
                words={roles}
                loop={true}
                cursor={true}
                cursorStyle="_"
                typeSpeed={68}
                deleteSpeed={36}
                delaySpeed={1250}
              />
            </span>
          </div>

          <div className="subtle-desc">based in NY</div>
        </motion.div>

        <button
          className="scroll-indicator"
          onClick={scrollToNext}
          aria-label="Scroll down"
        >
          <span className="scroll-indicator-arrow">↓</span>
        </button>
      </div>

      <div ref={nextSectionRef}>
        <TechMarquee />

        <div className="home-links">
          <motion.div
            whileHover={{ scale: 1.04, y: -6 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link
              to="/about"
              className="home-link-box"
              style={{ backgroundImage: `url(${avatarImg})` }}
            >
              <div className="link-overlay" />
              <span>About</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04, y: -6 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Link
              to="/projects"
              className="home-link-box"
              style={{ backgroundImage: `url(${bgImg})` }}
            >
              <div className="link-overlay" />
              <span>Projects</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}