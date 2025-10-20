import sfhat from '../../assets/sam-fhat.png';
import sbhat from '../../assets/sam-bhat.png';
import sheadphones from '../../assets/sam-headphones.png';

// types & shared data for Skills
export type Block = { title: string; items: string[] };
export type Cat = {
  id: string;
  name: string;
  blurb: string;
  blocks: Block[];
  img: string; // avatar image for this category
};



export const SKILL_DATA: Record<string, Cat> = {
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
    img: sfhat,
  },
};
