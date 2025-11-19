// src/App.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MyRoom from "./pages/MyRoom.jsx";
import MyPhone from "./pages/MyPhone.jsx";
import Links from "./pages/arcade/Links.tsx";
import SkillsHub from "./pages/arcade/SkillsHub.tsx";
import SkillsCategory from "./pages/arcade/SkillsCategory.tsx";
import Projects from "./pages/arcade/Projects.tsx";
import WorkPopup from "./components/WorkPopup";
import Loader from "./components/Loader";

export default function App() {
  const [ready, setReady] = useState(false);
  //Mobile -> show cell phone lockscreen -> Window opens to "Arcade"
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 959px)");
    const onChange = (e) => setIsMobile(e.matches);

    setIsMobile(mql.matches);
    mql.addEventListener?.("change", onChange) ?? mql.addListener(onChange);
    return () =>
      mql.removeEventListener?.("change", onChange) ??
      mql.removeListener(onChange);
  }, []);

  useEffect(() => {
    const handleLoaded = () => {
      setTimeout(() => {
        setReady(true);
      }, 500); // adjust delay as needed
    };

    if (document.readyState === "complete") {
      setReady(true);
    } else {
      window.addEventListener("load", handleLoaded);
    }

    return () => window.removeEventListener("load", handleLoaded);
  }, []);

  if (!ready) return <Loader />;

  return (
    <>
      <WorkPopup />
      <Routes>
        {isMobile ? (
          <Route path="/" element={<MyPhone onNavigate />} />
        ) : (
          <Route path="/" element={<MyRoom onNavigate />} />
        )}
        <Route path="/links" element={<Links onNavigate />} />
        <Route path="/skills" element={<SkillsHub onNavigate />} />
        <Route
          path="/skills/:categoryId"
          element={<SkillsCategory onNavigate />}
        />
        <Route path="/projects" element={<Projects onNavigate />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
