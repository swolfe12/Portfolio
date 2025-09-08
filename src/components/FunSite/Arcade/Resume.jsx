
import Navbar from './NavBar.tsx';
import screensaver from '../../../assets/screensaver.jpg';
import resume from '../../../assets/resume.png';

export const Resume = () => {
    return (
        <div className='resume' style={{ backgroundImage: `url(${screensaver})` }}>
            <Navbar/>
            <div className="grid">
                <img src={resume} alt="resume"></img>
            </div>

        </div>
    )
}

export default Resume;