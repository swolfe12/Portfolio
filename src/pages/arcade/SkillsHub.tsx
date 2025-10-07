import NavBar from '../../components/NavBar.tsx';
import { Link } from "react-router-dom";
import avatar from '../../assets/avatar3.png';
import FE from '../../assets/FE.png';
import BE from '../../assets/BE.PNG';
import access from '../../assets/access.PNG';
import CMS from '../../assets/CMS.PNG';
import tools from '../../assets/tools.PNG';
import room from '../../assets/room.png';


const CATEGORIES = [
  { id: "frontend", label: "Front-End Dev", img: FE },
  { id: "backend", label: "Back-End Dev", img: BE },
  { id: "accessibility", label: "Accessibility Guru", img: access },
  { id: "cms", label: "CMS Star", img: CMS },
  { id: "agile", label: "Agile Stuff", img:  tools },
  { id: "testing", label: "Testing", img: FE },
] as const;

export default function SkillsHub ({ isArcade = true, onNavigate }){
   console.log("Hub Is arcade", isArcade);
  return (
   
    <div className="skills-hub" aria-labelledby="skills-title">
      <NavBar isArcade={isArcade} onNavigate={onNavigate} />
      <div className="game-box">
        <header className="skills-header">
            <h1 id="skills-title">Explore the different sides of ME!</h1>
          </header>
          <div className="avatar" style={{ backgroundImage: `url(${room})` }}>
            <img src={avatar} alt="Sam's avatar"/>
          </div>
          <div className="skills-grid" role="list">
        {CATEGORIES.map((c) => (
          <article key={c.id} role="listitem" className="skills-card">
            <h2 className="sr-only">{c.label}</h2>
            {isArcade ? (
  
              <Link
                to={`/skills/${c.id}`}
                className="skills-card__link"
                aria-label={`Open ${c.label}`}
              >
                <img
                  src={c.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={120}
                  height={120}
                  className="skills-card__img"
                />
                <span className="sr-only">{c.label}</span>
              </Link>
            ) : (
                <button
                  type="button"
                  className="skills-card__link"
                  onClick={() => onNavigate?.(`skills/${c.id}`)} // <-- important
                  aria-label={`Open ${c.label}`}
                >
                  <img
                  src={c.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={120}
                  height={120}
                  className="skills-card__img"
                />
                </button>
            )}
          </article>
        ))}
      </div>
      </div>
      

      
    </div>
  );
}
