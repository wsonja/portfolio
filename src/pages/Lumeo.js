import { Container, Badge, Button, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bgImg from "../assets/wallpaper.jpg";

// replace these with your real images
import lumeoHero from "../assets/lumeo-cover.png";

const skills = [
  "iOS Development",
  "UI/UX Design",
  "ML-Based Routing",
  "Backend Development",
  "AWS Integration",
];

export default function Lumeo() {
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
            to="/projects"
            variant="outline-light"
            className="mb-4 back-button"
          >
            Back to Projects
          </Button>

          <h1 className="project-detail-title mb-3">Lumeo</h1>

          <img
            src={lumeoHero}
            alt="Lumeo cover"
            className="project-detail-hero mb-4"
          />

          <p className="project-detail-description">
            Lumeo is a health-focused urban navigation app designed to help
            users choose cleaner and healthier routes. Instead of optimizing
            only for speed or distance, the app incorporates real-time air
            quality data and customizable priorities so users can balance time,
            convenience, and health in their travel decisions.
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
                <p>
                  Lumeo compares route options using factors such as air
                  quality, travel time, distance, traffic, and public transit
                  transfers. It gives users a more transparent and personalized
                  way to navigate cities while prioritizing healthier mobility.
                </p>
              </div>
            </Col>

            <Col md={6}>
              <div className="project-detail-section">
                <h3>My role</h3>
                <p>
                  I worked on frontend iOS development, UI/UX design,
                  middleware routing, and integration of backend algorithms into
                  the app experience. My work focused on making the routing
                  logic usable and intuitive within the product interface.
                </p>
              </div>
            </Col>

            <Col md={6}>
              <div className="project-detail-section">
                <h3>Core features</h3>
                <p>
                  The app includes route comparison, customizable preferences,
                  social authentication, and health-aware navigation built
                  around real-time air quality information.
                </p>
              </div>
            </Col>

            <Col md={6}>
              <div className="project-detail-section">
                <h3>Why it matters</h3>
                <p>
                  Most navigation apps optimize for efficiency alone. Lumeo
                  reframes navigation as a health decision as well, helping
                  users make more informed choices about how they move through
                  urban environments.
                </p>
              </div>
            </Col>
          </Row>

        </motion.div>
      </Container>
    </div>
  );
}