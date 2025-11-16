
import Arcade from '../pages/arcade/Arcade.tsx';
import Links from '../pages/arcade/Links';
import Resume from '../NotUsing/Resume.jsx';
import SkillsHub from '../pages/arcade/SkillsHub.tsx';
import TempPage from '../pages/arcade/TempPage.tsx';
import Projects from '../pages/arcade/Projects.tsx';
import phone from './../assets/phone.png';


const Phone = ({currentPage, onNavigate }) => {
      const renderScreen = () => {
        switch (currentPage) {
          case 'home':
            return <Arcade onNavigate={onNavigate} />;
          case 'links':
            return <Links onNavigate={onNavigate} />;
          case 'resume':
            return <Resume onNavigate={onNavigate} />;
          case 'about':
            return <TempPage onNavigate={onNavigate} />;
          case 'projects':
            return <Projects onNavigate={onNavigate} />;
          case 'skills':
            return <SkillsHub onNavigate={onNavigate} />;
          default:
            return <Arcade onNavigate={onNavigate} />;
        }
      };
  return (
    <div
      className={"phone"}
      style={{ backgroundImage: `url(${phone})` }}
      id="phone"
    >
      <div
        className="phoneScreen"
      >
        {renderScreen()}
      </div>

    </div>
  );
};

export default Phone;
