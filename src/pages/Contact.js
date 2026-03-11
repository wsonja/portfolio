import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin } from "lucide-react";
import bgImg from "../assets/wallpaper.jpg";

export default function Contact() {
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
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          Contact
        </motion.h2>

        <motion.div
          className="contact-buttons"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >

          <a
            className="contact-button"
            href="mailto:sonja.hinting@gmail.com"
          >
            <Mail size={18} />
            sonja.hinting@gmail.com
          </a>

          <a
            className="contact-button"
            href="tel:+16072520129"
          >
            <Phone size={18} />
            +1 (607) 252-0129
          </a>

          <a
            className="contact-button"
            href="https://linkedin.com/in/sonja-wong"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={18} />
            linkedin.com/in/sonja-wong
          </a>

        </motion.div>
      </Container>
    </div>
  );
}