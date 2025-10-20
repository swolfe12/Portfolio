import Navbar from '../../components/NavBar.tsx';
import screensaver from '../../assets/screensaver.jpg';
import wcc from '../../assets/WCC.png';
import sass from '../../assets/sass-logo.png';
import css from '../../assets/CSS-logo.png';
import html from '../../assets/html-logo.png';

export const Projects = ({ isArcade = true, onNavigate }) => {
  return (
    <div className="projects" style={{ backgroundImage: `url(${screensaver})` }}>
      <Navbar isArcade={isArcade} onNavigate={onNavigate} />

      <div className="game-box">
        <div className="section-header">
            <h1>My Projects</h1>
        </div>
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
              <span className="genre-tag">Full-stack</span>
              <span className="genre-tag">Design</span>
            </div>

            <div className="description-section">
              <h5 className="section-title">DESCRIPTION</h5>
              <p className="project-description" id="description">
                The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner
                bandits intertwine in four tales of violence and redemption.
              </p>
            </div>

            <div className="cast-section">
              <h5 className="section-title">TOOLS</h5>
              <div className="cast-list">
                <div className="cast-item">
                  <img
                    src={sass}
                    className="cast-photo"
                    alt="Sass"
                  />
                  <span className="cast-name">Sass</span>
                </div>
                <div className="cast-item">
                  <img
                    src={html}
                    className="cast-photo"
                    alt="html5"
                  />
                  <span className="cast-name">HTML5</span>
                </div>
                <div className="cast-item">
                  <img
                    src={css}
                    className="cast-photo"
                    alt="Css3"
                  />
                  <span className="cast-name">CSS3</span>
                </div>
                
              </div>
            </div>

            <div className="action-row">
              <div className="watch-btn">
                <span className="watch-btn-text">CHECK IT OUT</span>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
