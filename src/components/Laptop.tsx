import React from "react";
import Arcade from "../pages/arcade/Arcade";
import Links from "../pages/arcade/Links";
import SkillsHub from "../pages/arcade/SkillsHub";
import TempPage from "../pages/arcade/TempPage";
import Projects from "../pages/arcade/Projects";
import Resume from "../pages/arcade/Resume";

type LaptopProps = {
  isOpen: boolean;
  currentPage: string;
  onNavigate: (pageId: string) => void;
  screenRef: React.RefObject<HTMLDivElement>;
};

const Laptop: React.FC<LaptopProps> = ({
  isOpen,
  currentPage,
  onNavigate,
  screenRef,
}) => {
  if (typeof currentPage === "string" && currentPage.startsWith("skills/")) {
    const categoryId = currentPage.slice("skills/".length);
    return (
      <div
        className={`laptop glowable${isOpen ? " scale-up active" : ""}`}
        style={{ backgroundImage: 'url("/assets/laptop.png")' }}
        id="laptop"
      >
        <div
          className="screen"
          ref={screenRef}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <SkillsHub onNavigate={onNavigate} categoryId={categoryId} />
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    switch (currentPage) {
      case "home":
        return <Arcade onNavigate={onNavigate} />;
      case "links":
        return <Links onNavigate={onNavigate} />;
      case "resume":
        return <Resume onNavigate={onNavigate} />;
      case "about":
        return <TempPage onNavigate={onNavigate} />;
      case "projects":
        return <Projects onNavigate={onNavigate} />;
      case "skills":
        return <SkillsHub onNavigate={onNavigate} />;
      default:
        return <Arcade onNavigate={onNavigate} />;
    }
  };

  return (
    <div
      className={`laptop glowable${isOpen ? " scale-up active" : ""}`}
      style={{ backgroundImage: 'url("/assets/laptop.png")' }}
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
