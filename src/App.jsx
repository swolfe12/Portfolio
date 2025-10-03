// src/App.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from "./components/FunSite/Portfolio";
import Arcade from './components/FunSite/Arcade/Arcade';
import Resume from './components/FunSite/Arcade/Resume';
import Links from './components/FunSite/Arcade/Links';
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
          <Route path="/resume" element={<Resume isArcade />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Portfolio />
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
