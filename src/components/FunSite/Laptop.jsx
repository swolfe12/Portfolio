// src/components/FunSite/Laptop.jsx
import React from 'react';
import Arcade from '../FunSite/Arcade/Arcade';
import Links from '../FunSite/Arcade/Links';
import Resume from '../FunSite/Arcade/Resume';
import laptop from './../../assets/laptop.png';

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
        return <Links />;
      case 'resume':
        return <Resume />;
      // case 'games':
      //   return <Games />;
      // case 'gallery':
      //   return <Gallery />;
      // case 'music':
      //   return <Music />;
      // case 'chat':
      //   return <Chat />;
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
