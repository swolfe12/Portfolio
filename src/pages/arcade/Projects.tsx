import Navbar from '../../components/NavBar.tsx';
import wcc from '../../assets/WCC.png';
import sass from '../../assets/sass-logo.png';
import css from '../../assets/CSS-logo.png';
import html from '../../assets/html-logo.png';
import artPortfolio from '../../assets/art-portfolio.png';
import projects from '../../assets/projects.png';

export const Projects = ({ isArcade = true, onNavigate }) => {
  return (
    <div className="projects" >
      <Navbar isArcade={isArcade} onNavigate={onNavigate} />

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
              <span className="genre-tag">Design</span>
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
              </div>
            </div>

            <div className="action-row">
              <a
                className="watch-btn"
                href="https://woodstockchurch.org" // TODO: replace if different
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
              <span className="genre-tag">Frontend</span>
              <span className="genre-tag">Design</span>
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
