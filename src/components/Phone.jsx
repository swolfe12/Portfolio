// src/components/Phone.jsx
import { useEffect, useState } from "react";
import { useNavigation } from "../hooks/NavigationContext.tsx";
import Arcade from "../pages/arcade/Arcade.tsx";
import Links from "../pages/arcade/Links.tsx";
import Resume from "../pages/arcade/Resume.tsx";
import SkillsHub from "../pages/arcade/SkillsHub.tsx";
import TempPage from "../pages/arcade/TempPage.tsx";
import Projects from "../pages/arcade/Projects.tsx";
import LockScreen from "../pages/LockScreen";
import phone from "./../assets/phone.png";
import keyboard from "./../assets/keyboard.png";
import answer from "./../assets/answer.PNG";
import back from "./../assets/back.png";
//import hangup from "../assets/answer.PNG";
import music from "../assets/music-gems.png";
import cherry from "../assets/cherry.png";
import samSunnies from "../assets/sam-sunnies.webp";

const Phone = ({ currentPage = "home", onNavigate, screenRef }) => {
  // 'lock' -> lock screen, 'transition' -> black + opening anim, 'app' -> fully open

  const [screenStage, setScreenStage] = useState("lock");

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
        return <SkillsHub onNavigate={onNavigate} screenRef={screenRef} />;
      default:
        return <Arcade onNavigate={onNavigate} />;
    }
  };

  // When we move to 'transition', wait a tick and then flip to 'app'
  useEffect(() => {
    if (screenStage === "transition") {
      const timer = setTimeout(() => {
        setScreenStage("app");
      }, 200); // small delay so CSS "opening" class has time to apply
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
    // If we're on the lock screen, start the transition animation
    if (screenStage === "lock") {
      setScreenStage("transition");
    }
    // Tell the parent "show the arcade home page"
    onNavigate?.("home");
  };

  const { goBack, last } = useNavigation();
  const canGoBack = !!last;
  const [showCallModal, setShowCallModal] = useState(false);

  const handleBack = () => {
    console.log("handleBack()");
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
        style={{ backgroundImage: `url(${phone})` }}
        id="phone"
      >
        <div className="bedazzle-bar">
          <img
            src={cherry}
            className="cherry"
            alt="Heart and Cherry Bejewels"
          ></img>
          <img
            src={music}
            className="music"
            alt="Heart and Music Bejewels"
          ></img>
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
                {/* X close button in the corner */}
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
                  <img src={samSunnies} alt="Sam's Profile Pic" />
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
            <img src={back} className="back" alt="Back" />
          </button>
          <div
            className={`home-btn`}
            role="button"
            aria-label="Go to home screen"
            tabIndex={0}
            onClick={goHome}
          ></div>
          <button
            type="button"
            className="phone-btn phone-btn--call"
            onClick={handleCall}
          >
            <img src={answer} className="answer" alt="Answer" />
          </button>
        </div>
      </div>

      <div
        className="keyboard"
        style={{ backgroundImage: `url(${keyboard})` }}
      ></div>
    </>
  );
};

export default Phone;
