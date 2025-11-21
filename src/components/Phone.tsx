// src/components/Phone.tsx
import { useState } from "react";
import { useNavigation } from "../context/NavigationContext";
import Arcade from "../pages/arcade/Arcade";
import Links from "../pages/arcade/Links";
import Resume from "../pages/arcade/Resume";
import SkillsHub from "../pages/arcade/SkillsHub";
import TempPage from "../pages/arcade/TempPage";
import Projects from "../pages/arcade/Projects";
import LockScreen from "../pages/LockScreen";

type PhoneProps = {
  currentPage?: string;
  onNavigate?: (pageId: string) => void;
  screenRef?: React.RefObject<HTMLDivElement>;
};

const Phone: React.FC<PhoneProps> = ({
  currentPage = "home",
  onNavigate,
  screenRef,
}) => {
  const [screenStage, setScreenStage] = useState<"lock" | "transition" | "app">(
    "lock"
  );
  const { goBack } = useNavigation();

  const openScreen = () => {
    setScreenStage("transition");
    setTimeout(() => setScreenStage("app"), 400);
  };
  /*
  const closeScreen = () => {
    setScreenStage("transition");
    setTimeout(() => setScreenStage("lock"), 400);
  };

  useEffect(() => {
    if (screenStage === "lock") {
      closeScreen;
    }
  }, [screenStage]);
*/
  const getPageComponent = () => {
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
    <div className="phone-wrapper">
      <div
        className="phone"
        style={{ backgroundImage: 'url("/assets/phone.png")' }}
      >
        <div className="status-bar">
          <div className="time">9:41</div>
          <div className="icons">
            <span className="icon-signal" />
            <span className="icon-wifi" />
            <span className="icon-battery" />
          </div>
        </div>

        <div className={`phone-screen ${screenStage}`}>
          {screenStage === "lock" && <LockScreen onUnlock={openScreen} />}
          {screenStage === "app" && (
            <div className="app-screen">
              <button className="back-btn" onClick={goBack}>
                <img src="/assets/back.png" alt="Back" />
              </button>

              <div
                className="screen"
                ref={screenRef}
                onPointerDown={(e) => e.stopPropagation()}
              >
                {getPageComponent()}
              </div>
            </div>
          )}
        </div>

        <div className="bottom-bar">
          <img src="/assets/keyboard.png" alt="Keyboard" className="nav-icon" />
          <img src="/assets/music-gems.png" alt="Music" className="nav-icon" />
          <img src="/assets/cherry.png" alt="Cherry" className="nav-icon" />
        </div>

        <div className="incoming-call">
          <button className="answer-btn">
            <img src="/assets/answer.PNG" alt="Answer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Phone;
