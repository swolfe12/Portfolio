
import Arcade from '../pages/arcade/Arcade.tsx';
import Links from '../pages/arcade/Links';
import Resume from '../NotUsing/Resume.jsx';
import SkillsHub from '../pages/arcade/SkillsHub.tsx';
import TempPage from '../pages/arcade/TempPage.tsx';
import SkillsCategory from '../pages/arcade/SkillsCategory.tsx';
import Projects from '../pages/arcade/Projects.tsx';
// import AboutMe from '../pages/arcade/AboutMe.tsx';
import laptop from './../assets/laptop.png';

const Laptop = ({ isOpen, currentPage, onNavigate, screenRef }) => {
  if (typeof currentPage === 'string' && currentPage.startsWith('skills/')) {
    const categoryId = currentPage.slice('skills/'.length);
    return (
      <div
        className={`laptop glowable${isOpen ? ' scale-up active' : ''}`}
        style={{ backgroundImage: `url(${laptop})` }}
        id="laptop"
      >
        <div
          className="screen"
          ref={screenRef}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <SkillsCategory
            onNavigate={onNavigate}
            categoryId={categoryId}
          />
        </div>
      </div>
    );
  }

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
        // return <AboutMe isArcade={false} onNavigate={onNavigate} />;
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
      className={`laptop glowable${isOpen ? ' scale-up active' : ''}`}
      style={{ backgroundImage: `url(${laptop})` }}
      id="laptop"
    >
      <div
        className="screen"
        ref={screenRef}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {renderScreen()}
      </div>
    </div>
  );
};

export default Laptop;
