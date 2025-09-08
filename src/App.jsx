// src/App.jsx
import React, { useEffect, useState } from 'react';
import Portfolio from "./components/FunSite/Portfolio";
import Arcade from './components/FunSite/Arcade/Arcade';
import WorkPopup from './components/WorkPopup';

function App() {
  const [isArcade, setIsArcade] = useState(false);

  useEffect(() => {
    // Keep Arcade active only below 960px
    const query = '(max-width: 959.98px)';
    const mql = window.matchMedia(query);

    const onChange = (e) => setIsArcade(e.matches);

    setIsArcade(mql.matches);
    if (mql.addEventListener) {
      mql.addEventListener('change', onChange);
    } else {
      mql.addListener(onChange);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', onChange);
      } else {
        mql.removeListener(onChange);
      }
    };
  }, []);

  return (
    <div>
      <WorkPopup />
      {isArcade ? <Arcade isArcade /> : <Portfolio />}
    </div>
  );
}

export default App;
