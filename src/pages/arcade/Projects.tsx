import Navbar from '../../components/NavBar.tsx';
import screensaver from '../../assets/screensaver.jpg';
import wcc from '../../assets/WCC.png';
import sass from '../../assets/sass-logo.png';
import css from '../../assets/CSS-logo.png';
import html from '../../assets/html-logo.png';
import artPortfolio from '../../assets/art-portfolio.png';

export const Projects = ({ isArcade = true, onNavigate }) => {
  return (
    <div className="projects" style={{ backgroundImage: `url(${screensaver})` }}>
      <Navbar isArcade={isArcade} onNavigate={onNavigate} />

      <div className="game-box">
        <div className="section-header">
          <h1>My Projects</h1>
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
                I redesigned and rebuilt Woodstock Community Church’s website to create a more
                welcoming and accessible online experience. The new site features a modern layout,
                mobile-friendly design, and simplified navigation that highlights the church’s events,
                ministries, and message. Built with semantic HTML and responsive CSS/Sass, it loads
                quickly and is easy to update going forward.
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
                A clean, fast portfolio site for my sister’s artwork with a flexible gallery system. 
                Pieces are organized by medium (oil, acrylic, watercolor, digital) and support titles, 
                dates, dimensions, pricing, and availability. The layout is fully responsive, features 
                keyboard-navigable modals for artwork details, and lazy-loads images for performance. 
                Content can be updated by dropping new images and front-matter metadata files—no CMS required.
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
