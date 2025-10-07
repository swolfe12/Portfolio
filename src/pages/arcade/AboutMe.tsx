
import Navbar from '../../components/NavBar.tsx';
import screensaver from '../../assets/screensaver.jpg';
import portrait from '../../assets/portrait.png';
import nametag from '../../assets/nametag.png';


export const AboutMe = ({ isArcade = true, onNavigate }) => {
  return (
    <div className='about'>
      <Navbar isArcade={isArcade} onNavigate={onNavigate} />
       <div className="game-box">
        <div className="grid">
            <div className="full-box">
                <h1>All About Me</h1>
            </div>
            <div className="half-box">
                <div className="nametag">
                    <h2>My Name Is:</h2>
                   <p>Sam Wolfe</p>
                   
                </div>
            </div>
            <div className="half-box">
                <div className="pic">
                    <img src={portrait} alt="Portrait of Sam"></img>
                    <span>A picture of me</span>
                </div>
            </div>
            <div className="half-box">
                <h2>My Favorite Things:</h2>
                <ul>
                    <li>My Dogs</li>
                    <li>Reading</li>
                    <li>Dr. Pepper</li>
                    <li>Stardew Valley</li>
                </ul>
            </div>
        </div>
        </div>
    </div>
  );
};


export default AboutMe;