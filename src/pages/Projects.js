import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bgImg from "../assets/wallpaper.jpg";
import { FaGithub } from "react-icons/fa";

import lumeoImg from "../assets/lumeo-cover.png";
import auvImg from "../assets/auv-cover.png";
import restImg from "../assets/project-rest-cover.png";
import serafinalImg from "../assets/serafinal-cover.png";
import maintenanceImg from "../assets/maintenance-cover.png";
import startupMatchImg from "../assets/startup-match-cover.png";
import startupMatchHoverImg from "../assets/startup-match-cover2.png";

const projects = [
  {
    title: "Lumeo",
    image: lumeoImg,
    description:
      "A health-focused iOS navigation app that helps users choose routes using real-time air quality data and customizable travel preferences.",
    skills: ["iOS", "UI/UX", "Routing Algos"],
    link: "/projects/lumeo",
    hasPage: true,
  },
  {
    title: "AUV Vision Pipeline",
    image: auvImg,
    description:
      "Custom 7D YOLO vision pipeline for autonomous underwater vehicles with RGB, surface normals, depth channels and real-time C++ inference.",
    skills: ["C++", "7D Multimodal YOLO", "ML"],
    link: "/projects/auv-vision",
    hasPage: true,
  },
  {
    title: "StartupMatch",
    image: startupMatchImg,
    hoverImage: startupMatchHoverImg,
    description:
      "A web app that matches students to startups based on their skills, interests, and experience. Ranked using NLP and similarity scoring. Hover over the image!",
    skills: ["NLP Matching", "TF-IDF", "OCR", "MERN Stack"],
    link: "https://github.com/wsonja/Startup-Match",
    hasPage: false,
  },
  {
    title: "Project Rest",
    image: restImg,
    description:
      "An AI-driven restaurant analytics platform with recommendation features and dashboard insights for an F&B startup.",
    skills: ["AI Recommendation Engine", "BusinessAnalytics"],
    link: "https://github.com/wsonja/Project-Rest",
    hasPage: false,
  },
  {
    title: "Sera",
    image: serafinalImg,
    description:
      "A full-stack Java stock portfolio app with ML-based prediction features and portfolio performance insights. Supports multiple (international) markets.",
    skills: ["Java", "Full Stack", "ML", "Finance"],
    link: "https://github.com/wsonja/serafinal",
    hasPage: false,
  },
  {
    title: "Maintenance Tracker",
    image: maintenanceImg,
    description:
      "A web platform for equipment and maintenance record management with tested CRUD workflows, validation, and filtering.",
    skills: ["MERN","Playwright E2E Testing", "Prisma"],
    link: "https://github.com/wsonja/maintenanceTracker",
    hasPage: false,
  },
];

export default function Projects() {
  return (
    <div
      className="page-bg"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      <div className="bg-overlay" />

      <Container fluid className="projects-content py-5">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          Projects
        </motion.h2>

        <Row className="g-4">
          {projects.map((project, idx) => (
            <Col md={6} lg={4} key={project.title}>
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <Card className="project-card h-100 border-0 shadow-sm">
                  <div className="project-image-wrapper">
                    <Card.Img
                      variant="top"
                      src={project.image}
                      alt={project.title}
                      className="project-image"
                    />
                    {project.hoverImage && (
                      <Card.Img
                        variant="top"
                        src={project.hoverImage}
                        alt={project.title}
                        className="project-image hover-image"
                      />
                    )}
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="mb-3">{project.title}</Card.Title>

                    <Card.Text className="text-muted mb-3">
                      {project.description}
                    </Card.Text>

                    <div className="mb-4">
                      {project.skills.map((skill) => (
                        <Badge
                          key={skill}
                          pill
                          bg="light"
                          text="dark"
                          className="me-2 mb-2 skill-pill"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-auto">
                      {project.hasPage ? (
                        <Button as={Link} to={project.link} variant="dark">
                          Read More ↗
                        </Button>
                      ) : (
                        <Button
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        variant="outline-dark"
                        className="github-button"
                      >
                        <FaGithub style={{ marginRight: "8px", marginBottom: "0.15rem" }} />
                        GitHub
                      </Button>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}