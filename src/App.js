import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Lumeo from "./pages/Lumeo";
import Rushline from "./pages/Rushline";
import AUV from "./pages/AUV";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/Scroll";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/rushline" element={<Rushline />} />
          <Route path="/projects/lumeo" element={<Lumeo />} />
          <Route path="/projects/auv-vision" element={<AUV />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
