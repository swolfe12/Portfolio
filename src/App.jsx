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
  const [isArcade, setIsArcade] = useState(false);

  useEffect(() => {
    const query = '(max-width: 959.98px)';
    const mql = window.matchMedia(query);
    const onChange = e => setIsArcade(e.matches);

    setIsArcade(mql.matches);
    mql.addEventListener?.('change', onChange) ?? mql.addListener(onChange);
    return () => mql.removeEventListener?.('change', onChange) ?? mql.removeListener(onChange);
  }, []);

  return (
    
    <>
      <WorkPopup />
      {isArcade ? (
        <Routes>
          <Route path="/" element={<Arcade isArcade />} />
          <Route path="/links" element={<Links isArcade />} />
          <Route path="/skills" element={<SkillsHub isArcade/>} />
          <Route path="/skills/:categoryId" element={<SkillsCategory />} />
          <Route path="/projects" element={<Projects isArcade/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/links" element={<Links isArcade />} />
          <Route path="/skills" element={<SkillsHub isArcade/>} />
          <Route path="/skills/:categoryId" element={<SkillsCategory />} />
          <Route path="/projects" element={<Projects isArcade/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
    /*
    <>
    <Routes>
          <Route path="/" element={<Arcade isArcade />} />
          <Route path="/links" element={<Links isArcade />} />
          <Route path="/resume" element={<Resume isArcade />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </>*/
  );
}
