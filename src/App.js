import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import FloatingNav from "./components/FloatingNav";
import { useState, useEffect } from "react";
import Lumeo from "./pages/Lumeo";
import AUV from "./pages/AUV";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/Scroll";

function AppInner() {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const alwaysShowNav = !isHome;

  const [navOpacity, setNavOpacity] = useState(alwaysShowNav ? 1 : 0);

  useEffect(() => {
    if (alwaysShowNav) {
      // About / Projects: nav always visible
      setNavOpacity(1);
      return;
    }

    // Home: fade nav in on scroll
    const handleScroll = () => {
      const fadeStart = 100;
      const fadeEnd = 300;
      const scroll = window.scrollY;

      let opacity = 0;
      if (scroll > fadeStart) {
        opacity = Math.min(
          (scroll - fadeStart) / (fadeEnd - fadeStart),
          1
        );
      }
      setNavOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysShowNav]);

  return (
    <>
      <FloatingNav navOpacity={navOpacity} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/projects/lumeo" element={<Lumeo />} />
        <Route path="/projects/auv-vision" element={<AUV />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <AppInner />
      </Layout>
    </BrowserRouter>
  );
}
