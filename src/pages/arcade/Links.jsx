
import Navbar from '../../components/NavBar.tsx';
import github from '../../assets/github.png';
import linkedin from '../../assets/linkedin.png';
import { RiExternalLinkLine } from "react-icons/ri";


export const Links = ({ isArcade = true, onNavigate }) => {
  return (
    <div className='links'>
      <Navbar isArcade={isArcade} onNavigate={onNavigate} />
      <div className="game-box">
          <div className="list">
            <a href="https://github.com/swolfe12?tab=repositories">
              <img src={github} height="200px" alt="Github Icon"></img><br/>
              <span>Github <RiExternalLinkLine /></span>
            </a>
            <a href="https://www.linkedin.com/in/sam-wolfe-59465b186/"> 
              <img src={linkedin} height="200px" alt="LinkedIn Icon"></img><br/>
              <span>LinkedIn <RiExternalLinkLine /></span>
            </a>
          </div>
      </div>
    </div>
  );
};


export default Links;