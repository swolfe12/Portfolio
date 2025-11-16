
import { Link, useParams } from "react-router-dom";
import NavBar from '../../components/NavBar.tsx';
import room from '../../assets/room.png';
import sfhat from '../../assets/sam-fhat.png';
import sbhat from '../../assets/sam-bhat.png';
import sheadphones from '../../assets/sam-headphones.png';

type Block = { title: string; items: string[] };
type Cat = {
  id: string;
  name: string;
  blurb: string;
  blocks: Block[];
  img: string;
};

const DATA: Record<string, Cat> = {
  frontend: {
    id: "frontend",
    name: "Front-End Developer",
    blurb:
      "Semantic, accessible, fast UIs with React/TypeScript and modern tooling.",
    blocks: [
      { title: "Core", items: ["HTML5", "CSS3", "JavaScript (ES202x)"] },
      { title: "Frameworks", items: ["React", "React Router", "Redux/Zustand"] },
      { title: "Styling", items: ["SCSS/Sass", "CSS Modules", "Tailwind"] },
      { title: "Tooling", items: ["Vite", "Webpack", "Gulp", "ESLint/Prettier"] },
      { title: "A11y", items: ["WCAG 2.2", "ARIA", "Keyboard & Focus Mgmt"] },
    ],
    img: sfhat,
  },
  backend: {
    id: "backend",
    name: "Back-End Developer",
    blurb:
      "APIs and services with Java/Spring Boot and C#/.NET when needed.",
    blocks: [
      { title: "Languages", items: ["Java", "C#", "Node.js (Express)"] },
      { title: "Frameworks", items: ["Spring Boot", ".NET Web API"] },
      { title: "Data", items: ["PostgreSQL", "SQL Server", "Redis"] },
      { title: "Auth", items: ["JWT/OIDC", "Keycloak", "Azure AD"] },
    ],
    img: sbhat,
  },
  accessibility: {
    id: "accessibility",
    name: "Accessibility",
    blurb:
      "Audit, remediation, and shift-left a11y practices across design & dev.",
    blocks: [
      { title: "Standards", items: ["WCAG 2.2 AA", "Section 508"] },
      { title: "Practices", items: ["Semantics", "Color contrast", "Focus order"] },
      { title: "Tools", items: ["Axe", "Lighthouse", "NVDA/VoiceOver"] },
    ],
    img: sheadphones,
  },
  cms: {
    id: "cms",
    name: "CMS",
    blurb:
      "Scaled component libraries and theming for enterprise CMS ecosystems.",
    blocks: [
      { title: "Platforms", items: ["Sitecore", "Optimizely (Episerver)"] },
      { title: "Patterns", items: ["Headless", "Design Systems", "GraphQL/REST"] },
    ],
    img: sfhat,
  },
  agile: {
    id: "agile",
    name: "Agile & DevEx",
    blurb: "Delivery flow that doesn’t suck.",
    blocks: [
      { title: "Practices", items: ["Scrum/Kanban", "Code review", "CI/CD"] },
      { title: "Tools", items: ["GitHub Actions", "Azure DevOps", "Jira"] },
    ],
    img: sfhat,
  },
  testing: {
    id: "testing",
    name: "Testing",
    blurb: "Catch regressions before users do.",
    blocks: [
      { title: "Types", items: ["Unit", "Integration", "e2e", "a11y tests"] },
      { title: "Tools", items: ["Vitest/Jest", "Testing Library", "Playwright"] },
    ],
    img:sfhat,
  },
};

type SkillsCategoryProps = {
  onNavigate?: (pageId:string) => void;
  propCategoryId?: number;
}

export default function SkillCategory({ onNavigate, propCategoryId}: SkillsCategoryProps) {

  const { categoryId: routeCategoryId = "" } = useParams();
  const key = (propCategoryId ?? routeCategoryId ?? "").toLowerCase();
  const cat = DATA[key];

  if (!cat) {
    return (
      <main className="skills-screen">
        <div className="skills-category">
          <p>Whoops — that category doesn’t exist.</p>
          <p>
            <Link to="/skills" className="btn">Back to Skills</Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="skills-category" aria-labelledby="skills-title">
      <NavBar  onNavigate={onNavigate}/>
      <div className="game-box">
        <header className="skills-header">
          <h1 id="skills-title">{cat.name}</h1>
          <p className="blurb">{cat.blurb}</p>
        </header>
        <div className="avatar" style={{ backgroundImage: `url(${room})` }}>
            <img src={cat.img} alt="Sam's avatar"/>
            
          </div>

        <div className="bubble-wrap">
          {cat.blocks.map((b) => (
            <div key={b.title} className="bubble">
              <h2>{b.title}</h2>
              <ul>
                {b.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <footer className="skills-footer">
          <Link className="btn" to="/skills">← All categories</Link>
        </footer>
      </div>
    </div>      
  );
}
