// src/App.jsx
import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MyRoom from "./pages/MyRoom.jsx";
import MyPhone from "./pages/MyPhone.jsx";
import Links from "./pages/arcade/Links.tsx";
import SkillsHub from "./pages/arcade/SkillsHub.tsx";
import Projects from "./pages/arcade/Projects.tsx";
import Loader from "./components/Loader";
import Resume from "./pages/arcade/Resume.tsx";

import {
  NavigationProvider,
  useNavigation,
} from "./context/NavigationContext.tsx";

export default function App() {
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Watches for change in window size and sets IsMobile accordingly
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 959px)");
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    mql.addEventListener?.("change", onChange) ?? mql.addListener(onChange);
    return () =>
      mql.removeEventListener?.("change", onChange) ??
      mql.removeListener(onChange);
  }, []);

  //Page load spinner
  useEffect(() => {
    const MIN_SPINNER_MS = 500;
    const start = performance.now();
    let done = false;

    // If the minimum amount of time hasnt passed keep spinning until then
    const finish = () => {
      if (done) return;
      done = true;

      const elapsed = performance.now() - start;
      const remaining = MIN_SPINNER_MS - elapsed;

      if (remaining <= 0) {
        setReady(true);
      } else {
        setTimeout(() => setReady(true), remaining);
      }
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
    }

    return () => {
      done = true;
      window.removeEventListener("load", finish);
    };
  }, []);

  if (!ready) return <Loader />;

  return (
    /* App.jsx is not wrapped in NavigationProvider so I make AppWithNav ao it looks like this: 
    -App
    --NavigationProvider
    ---AppWithNav
    */
    <NavigationProvider>
      <AppWithNav isMobile={isMobile} />
    </NavigationProvider>
  );
}

// This lives inside NavigationProvider, so it can use the hook
function AppWithNav({ isMobile }) {
  const { goTo } = useNavigation();

  return (
    <>
      <Routes>
        {isMobile ? (
          <Route path="/" element={<MyPhone onNavigate={goTo} />} />
        ) : (
          <Route path="/" element={<MyRoom onNavigate={goTo} />} />
        )}
        <Route path="/links" element={<Links onNavigate={goTo} />} />
        <Route path="/skills" element={<SkillsHub onNavigate={goTo} />} />
        <Route path="/resume" element={<Resume onNavigate={goTo} />} />
        <Route path="/projects" element={<Projects onNavigate={goTo} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
