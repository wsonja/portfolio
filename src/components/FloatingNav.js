import React from "react";
import { Link } from "react-router-dom";
import "./FloatingNav.css";

export default function FloatingNav({ navOpacity = 0 }) {
  return (
    <nav
      className="floating-nav"
      aria-label="floating main site navigation"
      style={{
        opacity: navOpacity,
        pointerEvents: navOpacity > 0.01 ? "auto" : "none",
        transition: "opacity 0.3s, transform 0.3s"
      }}
    >
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/projects">Projects</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}