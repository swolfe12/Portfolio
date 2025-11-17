// src/components/Phone.jsx
import { useEffect, useState } from 'react';
import Arcade from '../pages/arcade/Arcade.tsx';
import Links from '../pages/arcade/Links.tsx';
import Resume from '../NotUsing/Resume.jsx';
import SkillsHub from '../pages/arcade/SkillsHub.tsx';
import TempPage from '../pages/arcade/TempPage.tsx';
import Projects from '../pages/arcade/Projects.tsx';
import LockScreen from '../pages/LockScreen';
import phone from './../assets/phone.png';
import keyboard from './../assets/keyboard.png';
const Phone = ({ currentPage = 'home', onNavigate }) => {
  // 'lock' -> lock screen, 'transition' -> black + opening anim, 'app' -> fully open
  const [screenStage, setScreenStage] = useState('lock');

  const renderPhoneScreen = () => {
    console.log("renderPhoneScreen");
    switch (currentPage) {
      case 'home':
        console.log("home page");
        return <Arcade onNavigate={onNavigate} />;
      case 'links':
        return <Links onNavigate={onNavigate} />;
      case 'resume':
        return <Resume onNavigate={onNavigate} />;
      case 'about':
        return <TempPage onNavigate={onNavigate} />;
      case 'projects':
        console.log("case: projects");
        return <Projects onNavigate={onNavigate} />;
      case 'skills':
        return <SkillsHub onNavigate={onNavigate} />;
      default:
        return <Arcade onNavigate={onNavigate} />;
    }
  };

  // When we move to 'transition', wait a tick and then flip to 'app'
  useEffect(() => {
    if (screenStage === 'transition') {
      const timer = setTimeout(() => {
        setScreenStage('app');
      }, 200); // small delay so CSS "opening" class has time to apply
      return () => clearTimeout(timer);
    }
  }, [screenStage]);

  let content;
  if (screenStage === 'lock') {
    content = <LockScreen onUnlock={() => setScreenStage('transition')} />;
  } else {
    content = (
      <div
        className={
          'phone-app-shell ' +
          (screenStage === 'transition' ? 'opening' : 'open')
        }
      >
        {renderPhoneScreen()}
      </div>
    );
  }

  return (
    <>
    <div
      className="phone"
      style={{ backgroundImage: `url(${phone})` }}
      id="phone"
    >
      <div className="phoneScreen">
        {content}
      </div>
    </div>
    <div className="keyboard" style={{ backgroundImage: `url(${keyboard})` }}>
    </div>
    </>
  );
};

export default Phone;
