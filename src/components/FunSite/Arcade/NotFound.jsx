
import Navbar from './NavBar.tsx';
import screensaver from '../../../assets/screensaver.jpg';


export const NotFound = ({ isArcade = true, onNavigate }) =>  {
    return (
        <div className='not-found' style={{ backgroundImage: `url(${screensaver})` }}>
            <Navbar isArcade={isArcade} onNavigate={onNavigate} />
            <div className="grid">
                <h1> Sorry, this page is in progress</h1>
            </div>

        </div>
    )
}

export default NotFound;