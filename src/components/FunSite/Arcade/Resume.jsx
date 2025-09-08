
import Navbar from './NavBar.tsx';
import screensaver from '../../../assets/screensaver.jpg';
import resume from '../../../assets/resume.png';

export const Resume = ({ isArcade = true, onNavigate }) =>  {
    return (
        <div className='resume-page' style={{ backgroundImage: `url(${screensaver})` }}>
            <Navbar isArcade={isArcade} onNavigate={onNavigate} />
            <div className="grid">
                <img src={resume} alt="resume"></img>
            </div>

        </div>
    )
}

export default Resume;