import Navbar from '../../components/NavBar.tsx';
import wcc from '../../assets/WCC.png';
import sass from '../../assets/sass-logo.png';
import css from '../../assets/CSS-logo.png';
import html from '../../assets/html-logo.png';
import artPortfolio from '../../assets/art-portfolio.png';
import projects from '../../assets/projects.png';
import netlify from '../../assets/netlify.png';
import ionos from '../../assets/Ionos.jpeg';
import react from '../../assets/react-logo.png';
import gitactions from '../../assets/git-actions-logo.png';
import vite from '../../assets/vite.jpeg';
import js from '../../assets/javascript.png';
import ts from '../../assets/typescript.png';

type ProjectsProps = {
  onNavigate?: (pageId: string) => void;
}

export const Projects = ({ onNavigate }: ProjectsProps) => {
  return (
    <div className="projects" >
      <Navbar onNavigate={onNavigate} />
      <div className="game-box">
        <div className="section-header">
          <img src={projects} alt="Projects"></img>
        </div>

        {/* --- Card 1: Woodstock Community Church --- */}
        <div className="project-card">
          <div className="project-img-container">
            <div className="project-img" style={{ backgroundImage: `url(${wcc})` }} />
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
                Designed and built Woodstock Community Church’s website to create a more welcoming, accessible online experience
              </p>
            </div>

            <div className="cast-section">
              <h5 className="section-title">TOOLS</h5>
              <div className="cast-list">
                 <div className="cast-item">
                  <img src={js} className="cast-photo" alt="JavaScript" />
                  <span className="cast-name">Java-Script</span>
                </div>
                <div className="cast-item">
                  <img src={sass} className="cast-photo" alt="Sass" />
                  <span className="cast-name">Sass</span>
                </div>
                <div className="cast-item">
                  <img src={html} className="cast-photo" alt="HTML5" />
                  <span className="cast-name">HTML5</span>
                </div>
                <div className="cast-item">
                  <img src={css} className="cast-photo" alt="CSS3" />
                  <span className="cast-name">CSS3</span>
                </div>
                <div className="cast-item">
                  <img src={ionos} className="cast-photo" alt="ionos" />
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

        {/* --- Card 2: Sister's Art Portfolio --- */}
        <div className="project-card">
          <div className="project-img-container">
            <div className="project-img" style={{ backgroundImage: `url(${artPortfolio})` }} />
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
                A clean, fast art portfolio site with a flexible cms gallery system. 
              </p>
            </div>

            <div className="cast-section">
              <h5 className="section-title">TOOLS</h5>
              <div className="cast-list">
                <div className="cast-item">
                  <img src={react} className="cast-photo" alt="React" />
                  <span className="cast-name">React</span>
                </div>
                <div className="cast-item">
                  <img src={ts} className="cast-photo" alt="TypeScript" />
                  <span className="cast-name">Type-Script</span>
                </div>
                <div className="cast-item">
                  <img src={sass} className="cast-photo" alt="Sass" />
                  <span className="cast-name">Sass</span>
                </div>
                <div className="cast-item">
                  <img src={gitactions} className="cast-photo" alt="Git Actions" />
                  <span className="cast-name">Git Actions</span>
                </div>
                <div className="cast-item">
                  <img src={vite} className="cast-photo" alt="Vite" />
                  <span className="cast-name">Vite</span>
                </div>
                <div className="cast-item">
                  <img src={netlify} className="cast-photo" alt="Netlify" />
                  <span className="cast-name">Netlify</span>
                </div>
                {/* If you want to show React/TS/Vite badges, import their logos and add here */}
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
        {/* --- end card 2 --- */}

      </div>
    </div>
  );
};

export default Projects;
