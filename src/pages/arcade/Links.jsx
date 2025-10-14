
import Navbar from '../../components/NavBar.tsx';
import screensaver from '../../assets/screensaver.jpg';
import github from '../../assets/github.png';
import linkedin from '../../assets/linkedin.png';
import { RiExternalLinkLine } from "react-icons/ri";


export const Links = ({ isArcade = true, onNavigate }) => {
  return (
    <div className='links' style={{ backgroundImage: `url(${screensaver})` }}>
      <Navbar isArcade={isArcade} onNavigate={onNavigate} />
      <div className="game-box">
          <div className="list">
            <a>
              <img src={github} height="200px"></img><br/>
              <span>Github <RiExternalLinkLine /></span>
            </a>
            <a>
              <img src={linkedin} height="200px"></img><br/>
              <span>LinkedIn <RiExternalLinkLine /></span>
            </a>
          </div>
      </div>
    </div>
  );
};


export default Links;