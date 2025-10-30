import React from 'react';
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
            isArcade={false}
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
        return <Arcade isArcade={false} onNavigate={onNavigate} />;
      case 'links':
        return <Links isArcade={false} onNavigate={onNavigate} />;
      case 'resume':
        return <Resume isArcade={false} onNavigate={onNavigate} />;
      case 'about':
        return <TempPage isArcade={false} onNavigate={onNavigate} />;
        // return <AboutMe isArcade={false} onNavigate={onNavigate} />;
      case 'projects':
        return <Projects isArcade={false} onNavigate={onNavigate} />;
      case 'skills':
        return <SkillsHub isArcade={false} onNavigate={onNavigate} />;
      default:
        return <Arcade isArcade={false} onNavigate={onNavigate} />;
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
