import Navbar from "../../components/NavBar";
import Breadcrumbs from "../../components/Breadcrumbs";

type ProjectsProps = {
  onNavigate?: (pageId: string) => void;
};

export const Projects: React.FC<ProjectsProps> = ({ onNavigate }) => {
  return (
    <div className="projects">
      <Navbar onNavigate={onNavigate} />
      <Breadcrumbs
        onNavigate={onNavigate}
        items={[
          { id: "home", label: "Home" },
          { id: "projects", label: "Projects", isCurrent: true },
        ]}
      />
      <div className="game-box">
        <div className="section-header">Projects</div>

        <div className="project-card">
          <div className="project-img-container">
            <div
              className="project-img"
              style={{ backgroundImage: 'url("/assets/WCC.png")' }}
            />
            <div className="project-overlay" />
          </div>

          <div className="project-content">
            <div className="title-row">
              <h1 className="project-title">
                Woodstock Community Church Website
                <span className="year-badge">2024</span>
              </h1>
            </div>

            <div className="genres">
              <span className="genre-tag">WebDev</span>
              <span className="genre-tag">Frontend</span>
              <span className="genre-tag">UX/UI Design</span>
            </div>

            <div className="description-section">
              <h5 className="section-title">DESCRIPTION</h5>
              <p className="project-description" id="description">
                Designed and built Woodstock Community Church’s website to
                create a more welcoming, accessible online experience
              </p>
            </div>

            <div className="cast-section">
              <h5 className="section-title">TOOLS</h5>
              <div className="cast-list">
                <div className="cast-item">
                  <img
                    src="/assets/javascript.png"
                    className="cast-photo"
                    alt="JavaScript"
                  />
                  <span className="cast-name">Java-Script</span>
                </div>
                <div className="cast-item">
                  <img
                    src="/assets/sass-logo.png"
                    className="cast-photo"
                    alt="Sass"
                  />
                  <span className="cast-name">Sass</span>
                </div>
                <div className="cast-item">
                  <img
                    src="/assets/html-logo.png"
                    className="cast-photo"
                    alt="HTML5"
                  />
                  <span className="cast-name">HTML5</span>
                </div>
                <div className="cast-item">
                  <img
                    src="/assets/CSS-logo.png"
                    className="cast-photo"
                    alt="CSS3"
                  />
                  <span className="cast-name">CSS3</span>
                </div>
                <div className="cast-item">
                  <img
                    src="/assets/Ionos.jpeg"
                    className="cast-photo"
                    alt="IONOS"
                  />
                  <span className="cast-name">IONOS</span>
                </div>
              </div>
            </div>

            <div className="action-row">
              <a
                className="watch-btn"
                href="https://wcchurch.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="watch-btn-text">CHECK IT OUT</span>
              </a>
            </div>
          </div>
        </div>

        <div className="project-card">
          <div className="project-img-container">
            <div
              className="project-img"
              style={{ backgroundImage: 'url("/assets/art-portfolio.png")' }}
            />
            <div className="project-overlay" />
          </div>

          <div className="project-content">
            <div className="title-row">
              <h1 className="project-title">
                Art Portfolio Website
                <span className="year-badge">2025</span>
              </h1>
            </div>

            <div className="genres">
              <span className="genre-tag">WebDev</span>
              <span className="genre-tag">Full-stack</span>
              <span className="genre-tag">CI/CD</span>
              <span className="genre-tag">UX/UI Design</span>
            </div>

            <div className="description-section">
              <h5 className="section-title">DESCRIPTION</h5>
              <p className="project-description">
                A clean, fast art portfolio site with a flexible cms gallery
                system.
              </p>
            </div>

            <div className="cast-section">
              <h5 className="section-title">TOOLS</h5>
              <div className="cast-list">
                <div className="cast-item">
                  <img
                    src="/assets/react-logo.png"
                    className="cast-photo"
                    alt="React"
                  />
                  <span className="cast-name">React</span>
                </div>
                <div className="cast-item">
                  <img
                    src="/assets/typescript.png"
                    className="cast-photo"
                    alt="TypeScript"
                  />
                  <span className="cast-name">Type-Script</span>
                </div>
                <div className="cast-item">
                  <img
                    src="/assets/sass-logo.png"
                    className="cast-photo"
                    alt="Sass"
                  />
                  <span className="cast-name">Sass</span>
                </div>
                <div className="cast-item">
                  <img
                    src="/assets/git-actions-logo.png"
                    className="cast-photo"
                    alt="Git Actions"
                  />
                  <span className="cast-name">Git Actions</span>
                </div>
                <div className="cast-item">
                  <img
                    src="/assets/vite.jpeg"
                    className="cast-photo"
                    alt="Vite"
                  />
                  <span className="cast-name">Vite</span>
                </div>
                <div className="cast-item">
                  <img
                    src="/assets/netlify.png"
                    className="cast-photo"
                    alt="Netlify"
                  />
                  <span className="cast-name">Netlify</span>
                </div>
              </div>
            </div>

            <div className="action-row">
              <a
                className="watch-btn"
                href="https://emilywolfe.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="watch-btn-text">VIEW PORTFOLIO</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
