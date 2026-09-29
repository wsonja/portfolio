import rushlineImg from "../assets/rushline/rushline-cover.png";
import lumeoImg from "../assets/lumeo-cover.png";
import auvImg from "../assets/auv-cover.png";
import startupMatchImg from "../assets/startup-match-cover.png";
import startupMatchHoverImg from "../assets/startup-match-cover2.png";

export const links = {
  github: "https://github.com/wsonja",
  linkedin: "https://www.linkedin.com/in/sonja-wong",
  substack: "https://substack.com/@sonjawong",
  email: "sonja.hinting@gmail.com",
  cornellEmail: "sw2374@cornell.edu",
  phone: "+1 (607) 252-0129",
  phoneHref: "tel:+16072520129",
};

export const roles = ["software engineer", "ML researcher", "AI engineer"];

export const experiences = [
  {
    org: "Uber",
    role: "Software Engineering Intern",
    team: "Mobility Pricing and Promotions",
    dates: "May 2026 – Aug 2026",
    place: "San Francisco",
    tech: ["Python", "Cadence", "Arize", "Kafka", "Hive", "Neo4j", "Slack", "Jira"],
    points: [
      "Built an agentic oncall system (Python webhook service + custom Cadence-backed harness + Arize tracing + Kafka/Hive logs) that self-resolves 96% of Rider Promotions team's production alerts (2k+ PagerDuty / Slack / Jira issues monthly), cutting response time by 20x and adopted by 10+ teams in the organization.",
      "Shipped 40+ domain skills for promotion-lifecycle debugging and a self-improving knowledge base (Neo4j context graph) for root cause analysis, replacing 3 static legacy bots in Slack and manual debug flows.",
    ],
  },
  {
    org: "Cornell University",
    role: "Teaching Assistant, CS 3110",
    team: "Functional Programming",
    dates: "Jan 2026 – Present",
    place: "Ithaca, NY",
    current: true,
    tech: ["OCaml"],
    points: [
      "Teaching assistant for CS 3110, Functional Programming in OCaml.",
    ],
  },
  {
    org: "IBM",
    role: "AI Engineer Intern",
    team: "Client Engineering, Data & AI",
    dates: "Jun 2025 – Jul 2025",
    place: "Hong Kong",
    tech: ["Python", "GNN", "RAG", "LLM", "SQL"],
    points: [
      "Integrated GNN anti-fraud models into a core banking system (over 200k transactions daily) and implemented software testing workflows that improved model precision and reduced false positives by 35%.",
      "Developed a natural language–to–SQL AI (RAG/LLM) agent integrated with backend data lakehouses for a large hospital (10k+ enquiries monthly), reducing IT support tickets by 50% and data retrieval time by 70%.",
    ],
  },
  {
    org: "uTECH",
    role: "Lead Software Developer, UI Designer",
    team: "Lumeo",
    dates: "Feb 2025 – Present",
    place: "New York",
    current: true,
    tech: ["Swift", "SwiftUI", "iOS", "Maps", "GPS", "AWS"],
    points: [
      "Led development of a SwiftUI iOS health-aware navigation app that integrates Maps, GPS, and custom routing APIs.",
      "Built pollution-optimized routing with weighted shortest-path algorithms, reducing route exposure by 38% in testing.",
    ],
  },
  {
    org: "Cornell University",
    role: "Undergraduate Researcher",
    team: "Advisor: David Bindel, Dept. of CS",
    dates: "Feb 2025 – Present",
    place: "Ithaca, NY",
    current: true,
    tech: ["Julia", "Bayesian Optimization", "HPC", "Gaussian Processes"],
    points: [
      "Conducted HPC autotuning research on a Bayesian optimization framework for tuning exascale applications.",
      "Reimplemented a Gaussian process surrogate model in Julia to independently validate prediction behavior.",
    ],
  },
  {
    org: "CUAUV",
    role: "Lead Software Engineer",
    team: "Cornell Autonomous Underwater Vehicles",
    dates: "Nov 2024 – Present",
    place: "Ithaca, NY",
    current: true,
    tech: ["C++", "CUDA", "YOLO", "Eigen", "Python", "Docker"],
    points: [
      "Spearheaded 10+ infrastructure projects and developed a custom 7-channel YOLO OBB pipeline (20% accuracy gain).",
      "Doubled vision FPS by rebuilding camera acquisition and preprocessing in C++/CUDA with shared-memory staging.",
      "Cut Kalman filter (sensor fusion) CPU usage ~10x by migrating to C++/Eigen, freeing compute for YOLO inference.",
    ],
  },
  {
    org: "Women in Computing Cornell",
    role: "VP Corporate, Technical Director",
    dates: "Nov 2024 – Present",
    place: "Ithaca, NY",
    current: true,
    tech: ["React", "Node.js", "Express", "MongoDB"],
    points: [
      "Led communications with 60+ corporate partners (initiated 12 new sponsorships) and manage an alumni network of 500+.",
      "Managed 20+ developers and designers to build AI-native MERN-stack websites for 10+ corporate clients and startups.",
    ],
  },
  {
    org: "Millennium × WICC",
    role: "Project",
    dates: "2024 – 2026",
    place: "New York",
    tech: ["Python", "NLP", "LSTM", "ARIMA"],
    points: [
      "Investigated the AI market with time-series modeling (ARIMA) and deep learning (LSTM) for revenue, EBITA, and stock-price work, guided by Millennium analysts.",
      "Analyzed public financial data for crypto sentiment, web-scraped social and news sources, and built a custom NLP model (BERTopic + RoBERTa).",
    ],
  },
  {
    org: "Jane Street",
    role: "SWE Fellow, INFOCUS",
    dates: "Jan 2026",
    place: "New York",
    tech: [],
    points: ["Jane Street INFOCUS software engineering fellowship."],
  },
  {
    org: "IMC Trading",
    role: "Trading Fellow, WiTT",
    dates: "Jan 2026",
    place: "New York",
    tech: [],
    points: ["IMC Women in Trading & Technology fellowship, SWE track."],
  },
];

export const projects = [
  {
    title: "Rushline",
    image: rushlineImg,
    description:
      "Club recruiting intel for Cornell and Berkeley. It ranks clubs against your goals and shows the evidence behind every match, from club sites and rosters to Reddit and where members end up.",
    skills: ["Next.js", "React", "Supabase", "PostgreSQL", "Vercel", "Cursor", "Grok Bot"],
    link: "/projects/rushline",
    hasPage: true,
  },
  {
    title: "Lumeo",
    image: lumeoImg,
    description:
      "A health-focused iOS navigation app that helps users choose routes using real-time air quality data and customizable travel preferences.",
    skills: ["Swift", "SwiftUI", "iOS", "UI/UX", "Routing", "AWS"],
    link: "/projects/lumeo",
    hasPage: true,
  },
  {
    title: "AUV Vision Pipeline",
    image: auvImg,
    description:
      "Custom 7D YOLO vision pipeline for autonomous underwater vehicles with RGB, surface normals, depth channels and real-time C++ inference.",
    skills: ["C++", "CUDA", "YOLO", "Eigen", "Computer Vision"],
    link: "/projects/auv-vision",
    article:
      "https://medium.com/@cuauv.cornell/yolo7d-multispectral-real-time-object-detection-for-auvs-3769bb889124",
    hasPage: true,
  },
  {
    title: "StartupMatch",
    image: startupMatchImg,
    hoverImage: startupMatchHoverImg,
    description:
      "A web app that matches students to startups based on their skills, interests, and experience. Ranked using NLP and similarity scoring. Hover over the image.",
    skills: ["NLP", "TF-IDF", "OCR", "React", "Node.js", "MongoDB"],
    link: "https://github.com/wsonja/Startup-Match",
    hasPage: false,
  },
];

export const posts = [
  {
    source: "LinkedIn",
    date: "10 Aug 2026",
    title: "Wrapping up the summer in San Francisco",
    excerpt:
      "Won the Uber Intern Hackathon, became a Cursor Campus Lead, and won the first Cursor Campus Cup Hackathon.",
    href: "https://www.linkedin.com/posts/sonja-wong_as-im-wrapping-up-my-summer-in-sf-i-am-activity-7492640949462806528-lBih",
  },
  {
    source: "LinkedIn",
    date: "15 Apr 2026",
    title: "Goldman Sachs Engineering Emerging Leaders Series in Dallas",
    excerpt:
      "On working with teammates Jonathan Smith, Mathewos Ayelework, Gustavo Aldrey, Harsha Kalivarapu, and Epaphras Akinola, and mentors Bhavya Sree Bombay and Yiying Di.",
    href: "https://www.linkedin.com/posts/sonja-wong_it-was-such-a-great-experience-working-with-activity-7450191679908855808-i2CF",
  },
  {
    source: "LinkedIn",
    date: "05 Dec 2025",
    title: "Jane Street INFOCUS and IMC WiTT",
    excerpt:
      "Joining Jane Street and IMC Trading for their IN FOCUS and Women in Trading & Technology programs.",
    href: "https://www.linkedin.com/posts/sonja-wong_i-am-excited-to-announce-that-i-will-be-joining-activity-7402738569989300224-mHKx",
  },
  {
    source: "LinkedIn",
    date: "21 Aug 2025",
    title: "A summer with IBM Client Engineering",
    excerpt:
      "Interning with Client Engineering (Data & AI) and Technical Sales: a natural language–to–SQL RAG agent, and multi-GNN anti-fraud models in production.",
    href: "https://www.linkedin.com/posts/sonja-wong_ibm-internship-artificialintelligence-activity-7364280139288920065-h7dE",
  },
  {
    source: "LinkedIn",
    date: "29 Apr 2025",
    title: "Joining IBM in Hong Kong",
    excerpt:
      "Announcing a summer with IBM in the Hong Kong office, then back to research at Cornell and Cornell AUV.",
    href: "https://www.linkedin.com/posts/sonja-wong_i-am-incredibly-excited-to-announce-that-activity-7323010986691481600-2hTe",
  },
  {
    source: "LinkedIn",
    date: "14 Apr 2025",
    title: "Millennium, and a year of the project",
    excerpt:
      "Grateful for the Millennium project, mentor Elif Babaoğlu, and teammates Kenza Daoudi, Douae M., Varija M., and Krishna Patel.",
    href: "https://www.linkedin.com/posts/sonja-wong_so-grateful-for-this-amazing-experience-at-activity-7317547322513465347-zk1C",
  },
  {
    source: "Substack",
    date: "Ongoing",
    title: "Notes on Substack",
    excerpt: "Writing and notes live at substack.com/@sonjawong.",
    href: "https://substack.com/@sonjawong",
  },
];

export const skills = [
  "Python",
  "Java",
  "Go",
  "SQL",
  "C",
  "C++",
  "JavaScript",
  "TypeScript",
  "Rust",
  "OCaml",
  "Swift",
  "Julia",
  "HTML",
  "CSS",
  "Bash",
  "Git",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Prisma",
  "Flask",
  "Spring Boot",
  "TensorFlow",
  "PyTorch",
  "Pandas",
  "Kafka",
  "Hive",
  "Docker",
  "Kubernetes",
  "Redis",
  "AWS",
  "Snowflake",
  "Redshift",
  "LangChain",
  "Neo4j",
  "Linux",
  "Figma",
  "Power BI",
  "Jira",
  "Playwright",
  "Cursor",
];
