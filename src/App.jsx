// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Arcade from './pages/arcade/Arcade.tsx';
import Links from './pages/arcade/Links';
import SkillsHub from './pages/arcade/SkillsHub.tsx';
import SkillsCategory from './pages/arcade/SkillsCategory.tsx';
import Projects from './pages/arcade/Projects.tsx';
import WorkPopup from './components/WorkPopup';


export default function App() {

  //Mobile -> show cell phone lockscreen -> Window opens to "Arcade"
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 959px)');
    const onChange = e => setIsMobile(e.matches);

    setIsMobile(mql.matches);
    mql.addEventListener?.('change', onChange) ?? mql.addListener(onChange);
    return () => mql.removeEventListener?.('change', onChange) ?? mql.removeListener(onChange);
  }, []);

  return (
    
    <>
      <WorkPopup />
        <Routes>
          <Route path="/" element={<Portfolio onNavigate/>} />
          <Route path="/links" element={<Links onNavigate/>} />
          <Route path="/skills" element={<SkillsHub onNavigate/>} />
          <Route path="/skills/:categoryId" element={<SkillsCategory onNavigate/>} />
          <Route path="/projects" element={<Projects onNavigate/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </>
  );
}
