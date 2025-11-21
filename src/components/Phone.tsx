// src/components/Phone.tsx
import { useEffect, useState } from "react";
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
};

const Phone = ({ currentPage = "home", onNavigate }: PhoneProps) => {
  const [screenStage, setScreenStage] = useState<"lock" | "transition" | "app">(
    "lock"
  );

  const renderPhoneScreen = () => {
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

  useEffect(() => {
    if (screenStage === "transition") {
      const timer = setTimeout(() => {
        setScreenStage("app");
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [screenStage]);

  let content;
  if (screenStage === "lock") {
    content = <LockScreen onUnlock={() => setScreenStage("transition")} />;
  } else {
    content = (
      <div
        className={
          "phone-app-shell " +
          (screenStage === "transition" ? "opening" : "open")
        }
      >
        {renderPhoneScreen()}
      </div>
    );
  }

  const goHome = () => {
    if (screenStage === "lock") {
      setScreenStage("transition");
    }
    onNavigate?.("home");
  };

  const { goBack, last } = useNavigation();
  const canGoBack = !!last;
  const [showCallModal, setShowCallModal] = useState(false);

  const handleBack = () => {
    goBack();
  };

  const handleCall = () => {
    setShowCallModal((prev) => !prev);
  };

  const handleCloseCall = () => {
    setShowCallModal(false);
  };

  return (
    <>
      <div
        className="phone"
        style={{ backgroundImage: 'url("/assets/phone.png")' }}
        id="phone"
      >
        <div className="bedazzle-bar">
          <img
            src="/assets/cherry.png"
            className="cherry"
            alt="Heart and Cherry Bejewels"
          />
          <img
            src="/assets/music-gems.png"
            className="music"
            alt="Heart and Music Bejewels"
          />
        </div>

        <div className="phoneScreen">
          {content}
          {showCallModal && (
            <div
              className="modal-backdrop"
              role="presentation"
              onClick={handleCloseCall}
            >
              <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="call-modal-title"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  className="modal__close"
                  aria-label="Close contact modal"
                  onClick={handleCloseCall}
                >
                  ×
                </button>

                <h2 id="call-modal-title">Add Me To Your Contacts!</h2>

                <div className="contact-pic">
                  <img src="/assets/sam-sunnies.webp" alt="Sam's Profile Pic" />
                </div>

                <div className="contact-buttons">
                  <a
                    href="tel:+16783148280"
                    className="contact-btn contact-btn--phone"
                  >
                    Call Me
                  </a>

                  <a
                    href="mailto:samgwolfe12@gmail.com"
                    className="contact-btn contact-btn--email"
                  >
                    Email Me
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="btn-bar">
          <button
            type="button"
            className="phone-btn phone-btn--back"
            onClick={handleBack}
            disabled={!canGoBack}
            aria-disabled={!canGoBack}
          >
            <img src="/assets/back.png" className="back" alt="Back" />
          </button>
          <div
            className="home-btn"
            role="button"
            aria-label="Go to home screen"
            tabIndex={0}
            onClick={goHome}
          />
          <button
            type="button"
            className="phone-btn phone-btn--call"
            onClick={handleCall}
          >
            <img src="/assets/answer.PNG" className="answer" alt="Answer" />
          </button>
        </div>
      </div>

      <div
        className="keyboard"
        style={{ backgroundImage: 'url("/assets/keyboard.png")' }}
      />
    </>
  );
};

export default Phone;
