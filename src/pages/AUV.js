import { useState } from "react";
import { Container, Badge, Button, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bgImg from "../assets/wallpaper.jpg";

import auvHero from "../assets/auv-cover.png";
import auvDiagram from "../assets/auv-diagram.png";
import auvDetection from "../assets/auv-detection.png";
import auvModalities from "../assets/auv-modalities.png";
import auvLabelStudio from "../assets/auv-labelstudio.png";

const skills = [
  "C++",
  "YOLO",
  "Computer Vision",
  "Depth",
  "Surface Normals",
  "Label Studio",
  "Data Pipeline",
  "Real-Time Inference",
];

const metrics = [
  { label: "Input Representation", value: "7D" },
  { label: "Inference Speedup", value: "~6x" },
  { label: "Deployment", value: "On-Sub" },
  { label: "Labeling Flow", value: "Auto + Human" },
];

const flowSteps = [
  {
    title: "Capture",
    text: "Collect synchronized RGB, depth, and normal-map underwater footage from the AUV environment.",
  },
  {
    title: "Ingest",
    text: "Move raw mission video into a repeatable dataset structure that supports training and relabeling.",
  },
  {
    title: "Auto-Label",
    text: "Use a pretrained model to generate annotation proposals and reduce manual labeling time.",
  },
  {
    title: "Review in Label Studio",
    text: "Correct and validate detections in a human-in-the-loop workflow for higher quality labels.",
  },
  {
    title: "Augment + Transform",
    text: "Convert inputs into train-ready multimodal tensors and improve robustness to underwater conditions.",
  },
  {
    title: "Train 7D YOLO",
    text: "Train a custom detector on RGB, depth, and surface normals rather than RGB alone.",
  },
  {
    title: "Deploy in C++",
    text: "Run faster real-time inference onboard using an optimized C++ pipeline.",
  },
];

const gallery = [
    {
        src: auvModalities,
        title: "Multimodal Inputs",
        subtitle:
          "Depth, RGB, Surface Normals input from ZED (Stereo Camera).",
      },
      {
        src: auvLabelStudio,
        title: "Label Studio Workflow",
        subtitle:
          "Annotation management and review pipeline used to refine training labels.",
      },
    {
      src: auvDetection,
      title: "Detection Output",
      subtitle:
        "Example model predictions on underwater poles during inference.",
    },
    
  ];

function ImageModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="image-modal-backdrop" onClick={onClose}>
      <div
        className="image-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="image-modal-close" onClick={onClose}>
          ×
        </button>
        <img src={item.src} alt={item.title} className="image-modal-img" />
        <h3 className="mt-3 mb-1">{item.title}</h3>
        <p className="mb-0 text-muted-custom">{item.subtitle}</p>
      </div>
    </div>
  );
}

export default function AUV() {
  const [selectedImage, setSelectedImage] = useState(null);

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

          <section className="auv-hero-section">
            <div className="auv-hero-copy">
              <div className="project-kicker">Autonomous Underwater Vehicle</div>
              <h1 className="project-detail-title mb-3">AUV Vision Pipeline</h1>
              <p className="project-detail-description">
                Redesign of our underwater vision stack into an end-to-end multimodal
                pipeline, from dataset ingest, model-assisted labeling (Label Studio), 
                7-channel YOLO training, underwater post-processing,
                and real-time C++ deployment.
              </p>

              <div className="mb-4 mt-4">
                {skills.map((skill) => (
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
            </div>

            <div className="auv-hero-image-wrap">
              <img
                src={auvHero}
                alt="AUV vision pipeline cover"
                className="project-detail-hero"
              />
            </div>
          </section>

          <section className="metrics-grid mt-5">
            {metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="metric-card"
              >
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
              </motion.div>
            ))}
          </section>

          <Row className="g-4 mt-2">
            <Col md={6}>
              <motion.div
                className="project-detail-section"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3>What I built</h3>
                <p>
                  I rebuilt the data annotation and training pipeline, from splitting 
                  videos to frames, transforming data to build 7-channel datasets, 
                  seeding annotations with a pretrained model, training the 7-channel 
                  YOLO v8 OBB model, to then deploy the resulting weights back into 
                  the onboard inference stack.
                </p>
              </motion.div>
            </Col>

            <Col md={6}>
              <motion.div
                className="project-detail-section"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 }}
              >
                <h3>Technical jump</h3>
                <p>
                  Instead of relying only on RGB channels, I extended the pipeline to
                  a custom 7-channel representation built from RGB, depth, and surface
                  normals. That gave the detector stronger geometric cues in a domain
                  where visibility, lighting, and color consistency are often poor.
                </p>
              </motion.div>
            </Col>

            <Col md={6}>
              <motion.div
                className="project-detail-section"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 }}
              >
                <h3>Performance impact</h3>
                <p>
                  With the inference pipeline in largely in C++ and upgraded SDKs,
                  FPS is now 6x faster, making our model much more practical 
                  for real-time inference during navigation and mission execution.
                </p>
              </motion.div>
            </Col>

            <Col md={6}>
              <motion.div
                className="project-detail-section"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.18 }}
              >
                <h3>Underwater robustness</h3>
                <p>
                  With the system's improved underwater-specific post-processing, including
                  caustics removal to reduce pool-light distortion and improve
                  consistency for downstream detection, the model can now deal
                  with the visual noise that makes underwater vision especially difficult.
                </p>
              </motion.div>
            </Col>
          </Row>

          <section className="mt-5">
            <div className="section-header">
              <h2>System architecture</h2>
              <p>
                This is our full pipeline, from raw underwater footage to
                deployed real-time detection on the sub.
              </p>
            </div>

            <div className="flow-grid">
              {flowSteps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  className="flow-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                >
                  <div className="flow-number">{idx + 1}</div>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mt-5">
            <div className="featured-artifact">
              <div className="featured-artifact-copy">
                <div className="project-kicker">Featured artifact (Fei)</div>
                <h2>Working data flow sketch</h2>
                <p>
                  This diagram depicts the system workflow: video capture on the sub, movement into
                  structured datasets, Label Studio review, augmentation, training in
                  Colab, and returning optimized weights back into deployment. <br></br><br></br>
                  Credits: Anthony Fei (diagram)
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.015 }}
                className="featured-artifact-image-wrap"
                onClick={() =>
                    setSelectedImage({
                      src: auvDiagram,
                      title: "Working Data Flow Sketch",
                      subtitle:
                        "System workflow from sub video capture through dataset generation, Label Studio review, training, and deployment.",
                    })
                  }
              >
                <img
                  src={auvDiagram}
                  alt="AUV informal data flow diagram"
                  className="featured-artifact-image"
                />
              </motion.div>
            </div>
          </section>

          <section className="mt-5">
            <div className="section-header">
                <h2>Intermediate Outputs:</h2>
                <p>Click any image to enlarge it.</p>
            </div>

            <div className="image-row">
                {gallery.map((item, idx) => (
                <motion.div
                    key={item.title}
                    className={`image-card ${idx === 0 ? "middle-card" : ""}`}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                    onClick={() => setSelectedImage(item)}
                >
                    <img
                    src={item.src}
                    alt={item.title}
                    className="image-card-img"
                    />
                </motion.div>
                ))}
            </div>
            </section>
        </motion.div>
      </Container>

      <ImageModal item={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
}