
import Navbar from '../../components/NavBar.tsx';
import screensaver from '../../assets/screensaver.jpg';
import signImage from '../../assets/work-sign.png';


export const TempPage = ({ isArcade = true, onNavigate }) => {
  return (
    <div className='temp' style={{ backgroundImage: `url(${screensaver})` }}>
      <Navbar isArcade={isArcade} onNavigate={onNavigate} />
        <div className="popup-overlay">
      <div className="popup-box">
        <img src={signImage} alt="Work in Progress" className="sign-img" />
      </div>
    </div>
  
    </div>
  );
};


export default TempPage;