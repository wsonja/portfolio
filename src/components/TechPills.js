import {
  SiApachehive,
  SiApachekafka,
  SiApple,
  SiC,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiExpress,
  SiFigma,
  SiFlask,
  SiGit,
  SiGnubash,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiJulia,
  SiKubernetes,
  SiLangchain,
  SiLinux,
  SiMongodb,
  SiNeo4J,
  SiNextdotjs,
  SiNodedotjs,
  SiNvidia,
  SiOcaml,
  SiOpenjdk,
  SiPandas,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiPytorch,
  SiReact,
  SiRedis,
  SiRust,
  SiSlack,
  SiSnowflake,
  SiSpringboot,
  SiSupabase,
  SiSwift,
  SiTensorflow,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

const ICONS = {
  Python: SiPython,
  Java: SiOpenjdk,
  Go: SiGo,
  SQL: SiPostgresql,
  PostgreSQL: SiPostgresql,
  C: SiC,
  "C++": SiCplusplus,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Vercel: SiVercel,
  Rust: SiRust,
  OCaml: SiOcaml,
  Swift: SiSwift,
  SwiftUI: SiSwift,
  iOS: SiApple,
  Julia: SiJulia,
  HTML: SiHtml5,
  CSS: SiCss,
  Bash: SiGnubash,
  Git: SiGit,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  MongoDB: SiMongodb,
  MERN: SiMongodb,
  Prisma: SiPrisma,
  Flask: SiFlask,
  "Spring Boot": SiSpringboot,
  TensorFlow: SiTensorflow,
  PyTorch: SiPytorch,
  Pandas: SiPandas,
  Kafka: SiApachekafka,
  Hive: SiApachehive,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  Redis: SiRedis,
  AWS: FaAws,
  Snowflake: SiSnowflake,
  LangChain: SiLangchain,
  Neo4j: SiNeo4J,
  Linux: SiLinux,
  Figma: SiFigma,
  Jira: SiJira,
  Slack: SiSlack,
  Supabase: SiSupabase,
  CUDA: SiNvidia,
};

function techMark(name) {
  const caps = name.match(/[A-Z]/g);
  if (caps && caps.length >= 2 && !/\s/.test(name)) {
    return caps.slice(0, 2).join("");
  }
  const parts = name.split(/[\s./+]+/).filter(Boolean);
  if (parts.length > 1) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2);
}

export default function TechPills({ items }) {
  if (!items?.length) return null;

  return (
    <div className="tech-row">
      {items.map((item) => {
        const Icon = ICONS[item];
        return (
          <div className="tech-pill" key={item} tabIndex={0} title={item}>
            <span className="tech-mark" aria-hidden="true">
              {Icon ? <Icon size={16} /> : <span className="tech-abbr">{techMark(item)}</span>}
            </span>
            <span className="tech-label">{item}</span>
          </div>
        );
      })}
    </div>
  );
}
