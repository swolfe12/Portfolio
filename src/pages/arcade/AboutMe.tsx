import Navbar from "../../components/NavBar";

type AboutMeProps = {
  onNavigate?: (pageId: string) => void;
};

export const AboutMe = ({ onNavigate }: AboutMeProps) => {
  return (
    <div className="about">
      <Navbar onNavigate={onNavigate} />
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
              <img src="/assets/portrait.png" alt="Portrait of Sam" />
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
