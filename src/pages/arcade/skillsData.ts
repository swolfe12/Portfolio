import sfhat from '../../assets/sam-fhat.webp';
import sbhat from '../../assets/sam-bhat.webp';
import sheadphones from '../../assets/sam-headphones.webp';
import sflower from '../../assets/sam-flower.webp';
import ssunnies from '../../assets/sam-sunnies.webp';

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
    name: "Front-End Engineering",
    blurb:
      "React + TypeScript UIs that ship fast, look sharp, and don’t explode on mobile.",
    blocks: [
      { title: "Core", items: ["HTML5", "CSS3", "JavaScript/TypeScript"] },
      { title: "React Ecosystem", items: ["React", "Next.js", "React Router", "Redux"] },
      { title: "Styling", items: ["SCSS/Sass", "CSS Modules", "Tailwind"] },
      { title: "Performance", items: ["Code-splitting", "Lazy-loading", "Image optimization", "Bundle audits"] },
      { title: "Tooling", items: ["Vite", "Webpack", "ESLint / Prettier"] },
    ],
    img: sfhat,
  },

  cms: {
    id: "cms",
    name: "Enterprise CMS & Design Systems",
    blurb:
      "Scaled component libraries and theming across Sitecore & Optimizely ecosystems.",
    blocks: [
      { title: "Platforms", items: ["Sitecore", "Optimizely (Episerver)"] },
      { title: "Patterns", items: ["Headless/Decoupled", "Reusable Components", "Design Systems"] },
      { title: "Content APIs", items: ["REST", "GraphQL"] },
      { title: "Marketing Ops", items: ["Multi-page sites", "Brand migrations", "Authoring workflows"] },
    ],
    img: sflower,
  },

  accessibility: {
    id: "accessibility",
    name: "Accessibility",
    blurb:
      "Audits and remediation aligned to WCAG 2.2 AA across design & build.",
    blocks: [
      { title: "Standards", items: ["WCAG 2.2 AA", "Section 508"] },
      { title: "Practices", items: ["Semantics", "Color contrast", "Readable focus", "Logical focus order"] },
      { title: "Tools", items: ["axe", "Lighthouse", "NVDA", "VoiceOver"] },
      { title: "Process", items: ["Defect triage", "Developer education", "A11y checklists"] },
    ],
    img: sheadphones,
  },

  backend: {
    id: "backend",
    name: "Back-End & APIs",
    blurb:
      "Pragmatic services for integration—Java/Spring Boot, .NET, and Node.",
    blocks: [
      { title: "Languages", items: ["Java", "C#", "Node.js (Express)"] },
      { title: "Frameworks", items: ["Spring Boot", ".NET Web API"] },
      { title: "Data", items: ["PostgreSQL", "SQL Server", "Redis"] },
      { title: "Auth & Security", items: ["JWT/OIDC", "Azure AD", "Keycloak"] },
      { title: "API Styles", items: ["REST", "GraphQL"] },
    ],
    img: sbhat,
  },

  uiux: {
    id: "uiux", // keep id for routing; repurpose as delivery/tooling/testing
    name: "Delivery, CI/CD & Quality",
    blurb: "Agile flow, automation, and tests to keep releases boring (in the best way).",
    blocks: [
      { title: "Ways of Working", items: ["Scrum/Kanban", "Code review", "Branching strategies"] },
      { title: "CI/CD", items: ["GitHub Actions", "Azure DevOps Pipelines", "Automated checks"] },
      { title: "Testing", items: ["Jest/Vitest", "Testing Library", "Playwright", "A11y tests"] },
      { title: "PM & Collab", items: ["Jira", "Confluence", "Figma (handoff)"] },
    ],
    img: ssunnies,
  },
};
