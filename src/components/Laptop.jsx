// src/components/FunSite/Laptop.jsx
import React from 'react';
import Arcade from '../pages/arcade/Arcade';
import Links from '../pages/arcade/Links';
import Resume from '../pages/arcade/Resume';
import SkillsHub from '../pages/arcade/SkillsHub.tsx';
import AboutMe from '../pages/arcade/AboutMe.tsx';
import laptop from './../assets/laptop.png';


// If you have other sections, import them here:
// import Games from '../FunSite/Arcade/Games';
// import Gallery from '../FunSite/Arcade/Gallery';
// import Music from '../FunSite/Arcade/Music';
// import Chat from '../FunSite/Arcade/Chat';

const Laptop = ({ isOpen, currentPage, onNavigate }) => {
  const renderScreen = () => {
    switch (currentPage) {
      case 'home':
        return <Arcade isArcade={false} onNavigate={onNavigate} />; // desktop-in-laptop landing
      case 'links':
        return <Links isArcade={false} onNavigate={onNavigate} />;
      case 'resume':
        return <Resume isArcade={false} onNavigate={onNavigate} />;
      case 'about':
        return <AboutMe isArcade={false} onNavigate={onNavigate} />; 
      case 'projects':
         return <Arcade isArcade={false} onNavigate={onNavigate} />; 
      case 'skills':
        return <SkillsHub isArcade={false} onNavigate={onNavigate} />;
      default:
        return <Arcade isArcade={false} onNavigate={onNavigate} />; 
    }
  };

  return (
    <div
      className={`laptop clickable${isOpen ? ' scale-up active' : ''}`}
      style={{ backgroundImage: `url(${laptop})` }}
      id="laptop"
    >
      <div className="screen">
        {renderScreen()}
      </div>
    </div>
  );
};

export default Laptop;
