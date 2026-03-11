import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import bgImg from "../assets/wallpaper.jpg";
import { FaLinkedin } from "react-icons/fa";
import aboutImg from "../assets/headshot.png";

export default function About() {
  return (
    <div
      className="page-bg"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <motion.div
        className="bg-overlay"
        initial={{ opacity: 0.45 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 1.2 }}
      />

      <Container className="about-content">
      <div className="about-grid">
        <div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          About Me
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Hi! My name is Sonja and I am a CS major in Cornell Engineering. I am a creator, coder, musician, and baker based in NY. <br /><br />

          I am also an incoming software engineer intern at Uber in SF and a software lead of 
          Cornell's Autonomous Underwater Vehicles team (might pop down to Irvine for an international 
          robotics competition in July - AUVSI Robosub '26). <br /><br />

          Previously, I worked as an AI Engineer intern at IBM, a software engineer at labs and startups in NYC & SF, 
          a research assistant at Cornell (GP Optimization (Bayesian), ML Urban Routing Algos), and a baker at Cinnabon for four years.
          One of the five startups I worked at IPO-d in 2023. <br /><br />

          With &gt;10k streams on Spotify, I hope to continue making music with my band and am open to collaborations.

        </motion.p>
        <motion.a
          href="https://www.linkedin.com/in/sonja-wong"
          target="_blank"
          rel="noreferrer"
          className="linkedin-button"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <FaLinkedin className="linkedin-icon" />
          LinkedIn
        </motion.a>
        </div>
        <motion.div
          className="about-image-wrap"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <img
            src={aboutImg}
            alt="Sonja Wong"
            className="about-image"
          />
        </motion.div>
        </div>
      </Container>
    </div>
  );
}
