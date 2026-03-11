import "./TechMarquee.css";

const TECH = [
  "Figma",
  "React",
  "SQL",
  "Java",
  "Python",
  "Swift",
  "JavaScript",
  "TypeScript",
  "Git",
  "PowerBI",
  "Node",
  "Express",
  "MongoDB",
];

export default function TechMarquee() {
  return (
    <div className="tech-marquee">
      <div className="tech-track">
        {[...TECH, ...TECH].map((item, idx) => (
          <span className="tech-item" key={idx}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
