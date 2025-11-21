import Navbar from "../../components/NavBar";

type ArcadeProps = {
  onNavigate?: (pageId: string) => void;
};

type SkillCategory = "frontend" | "backend" | "accessibility" | "agile";

export const Arcade: React.FC<ArcadeProps> = ({ onNavigate }) => {
  const openSkill = (cat: SkillCategory) => {
    const id = cat.toLowerCase();
    (window as any).__SW_PENDING_SKILL = id;

    onNavigate?.("skills");

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("skills:select", { detail: id }));
    }, 0);
  };

  return (
    <div className="arcade" id="home">
      <Navbar onNavigate={onNavigate} />
      <div className="grid">
        <div className="speech-box" role="region" aria-labelledby="about-title">
          <h2 id="about-title">
            <span className="hey">Hey, everyone!</span> I’m Sam!
          </h2>
          <ul className="contact-links">
            <li>
              <span className="icon-circle" aria-hidden="true">
                📞
              </span>
              <span>
                <a href="tel:+16783148280">(678)314-8280</a>
              </span>
            </li>
            <li>
              <span className="icon-circle" aria-hidden="true">
                ✉️
              </span>
              <span>
                <a href="mailto:samgwolfe12@gmail.com">samgwolfe12@gmail.com</a>
              </span>
            </li>
            <li>
              <span className="icon-circle" aria-hidden="true">
                🔗
              </span>
              <span>
                <a href="https://www.linkedin.com/in/sam-wolfe-59465b186/">
                  LinkedIn
                </a>
              </span>
            </li>
          </ul>
        </div>

        <div className="avatar">
          <img src="/assets/avatar3.webp" alt="Sam avatar" />
        </div>

        <div className="about-blob" role="region" aria-labelledby="about-title">
          <p className="kicker">
            Welcome to my site! Click the buttons below to see what I’m all
            about!
          </p>
          <ul className="about-links">
            <li>
              <button
                type="button"
                onClick={() => openSkill("frontend")}
                aria-label="Open Front-End"
              >
                <span className="dot" aria-hidden="true" />
                <span className="title">front-end fun</span>
                <span className="sub">
                  building sleek, speedy, and sparkly interfaces
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => openSkill("backend")}
                aria-label="Open Back-End"
              >
                <span className="dot" aria-hidden="true" />
                <span className="title">back-end basics</span>
                <span className="sub">
                  the secret sauce powering the pretty stuff!
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => openSkill("accessibility")}
                aria-label="Open Accessibility"
              >
                <span className="dot" aria-hidden="true" />
                <span className="title">accessibility</span>
                <span className="sub">
                  making the web work for everyone (no excuses!)
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => openSkill("agile")}
                aria-label="Open Agile"
              >
                <span className="dot" aria-hidden="true" />
                <span className="title">Agile Workflows</span>
                <span className="sub">where function meets fabulous</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate?.("projects")}
                aria-label="Open Projects"
              >
                <span className="dot" aria-hidden="true" />
                <span className="title">projects</span>
                <span className="sub">what I've been working on</span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate?.("links")}
                aria-label="Open Links"
              >
                <span className="dot" aria-hidden="true" />
                <span className="title">links</span>
                <span className="sub">let's link up!</span>
              </button>
            </li>
          </ul>
          <img
            className="butterfly1 gentle-hover-shake1"
            src="/assets/butterfly1.png"
            alt=""
          />
          <img
            className="butterfly2 gentle-hover-shake2"
            src="/assets/butterfly2.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Arcade;
