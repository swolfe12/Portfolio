// src/pages/MyRoom.jsx
import { useState, useRef, useEffect } from "react";
import "./../styles/main.scss";
import Calendar from "../components/Calendar";
import Clock from "../components/Clock";
import Laptop from "../components/Laptop";
import MashImg from "../components/MashImage";

const SCALE_MS = 320; // match your CSS transition duration

const MyRoom = () => {
  //const [isModalOpen, setIsModalOpen] = useState(true);
  const [isLaptopOpen, setIsLaptopOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [isAnimating, setIsAnimating] = useState(false); // prevents mid-frame flicker

  // focus management
  const laptopOpenerRef = useRef(null);
  const laptopCloseBtnRef = useRef(null);

  // .screen element inside Laptop; Laptop must attach ref={screenRef} to its .screen
  const screenRef = useRef(null);

  // Pause glow while animating to avoid reflow/jank overlap
  useEffect(() => {
    const root = document.documentElement;
    if (isAnimating) root.classList.add("glow-paused");
    else root.classList.remove("glow-paused");
    return () => root.classList.remove("glow-paused");
  }, [isAnimating]);

  // Escape to close
  useEffect(() => {
    if (!isLaptopOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") smoothClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLaptopOpen]);

  const smoothOpen = () => {
    if (isAnimating || isLaptopOpen) return;
    setIsAnimating(true);
    // push to next frame so CSS can prep the initial transform before scaling
    requestAnimationFrame(() => {
      setIsLaptopOpen(true);
      // release animating flag after the CSS transition has ended
      const t = setTimeout(() => setIsAnimating(false), SCALE_MS);
      // After it opens, move focus to the close button (or screen)
      requestAnimationFrame(() => {
        laptopCloseBtnRef.current?.focus?.() || screenRef.current?.focus?.();
      });
      // safety in case route changes etc.
      return () => clearTimeout(t);
    });
  };

  const smoothClose = () => {
    if (isAnimating || !isLaptopOpen) return;
    setIsAnimating(true);
    requestAnimationFrame(() => {
      setIsLaptopOpen(false);
      const t = setTimeout(() => setIsAnimating(false), SCALE_MS);
      // Return focus to the opener so keyboard users don't get lost
      requestAnimationFrame(() => {
        laptopOpenerRef.current?.focus?.();
      });
      return () => clearTimeout(t);
    });
  };

  const handleContactClick = () => {
    if (isAnimating) return;
    setIsLaptopOpen(false);
    setIsContactOpen((prev) => !prev);
  };

  // Glow idle animation (unchanged except it respects .glow-paused class)
  useEffect(() => {
    const IDLE_AFTER_MS = 10000;
    const REPEAT_EVERY_MS = 10000;

    let idleTimer = null;
    let repeatTimer = null;

    const triggerGlowOnce = () => {
      // don't pulse while animating to avoid overlap
      if (document.documentElement.classList.contains("glow-paused")) return;
      const root = document.documentElement;
      root.classList.remove("glow-phase");
      void root.offsetWidth; // force reflow to restart animation
      root.classList.add("glow-phase");
      setTimeout(() => root.classList.remove("glow-phase"), 5000);
    };

    const clearTimers = () => {
      if (idleTimer) clearTimeout(idleTimer);
      if (repeatTimer) clearInterval(repeatTimer);
    };

    const startIdleWatch = () => {
      clearTimers();
      idleTimer = setTimeout(() => {
        triggerGlowOnce();
        repeatTimer = setInterval(triggerGlowOnce, REPEAT_EVERY_MS);
      }, IDLE_AFTER_MS);
    };

    const onUserActivity = () => startIdleWatch();
    const events = ["pointermove", "keydown", "touchstart", "wheel", "scroll"];

    events.forEach((evt) =>
      window.addEventListener(evt, onUserActivity, { passive: true })
    );

    triggerGlowOnce();
    startIdleWatch();

    return () => {
      clearTimers();
      events.forEach((evt) => window.removeEventListener(evt, onUserActivity));
      document.documentElement.classList.remove("glow-phase");
    };
  }, []);

  return (
    <div className={`portfolio${isAnimating ? " is-animating" : ""}`}>
      {/* Close on click outside .screen */}
      <div
        className="inner-container"
        onClickCapture={(e) => {
          if (!isLaptopOpen || isAnimating) return;
          const screenEl = screenRef.current;
          if (screenEl && !screenEl.contains(e.target)) {
            e.stopPropagation();
            smoothClose();
          }
        }}
      >
        {/*
        {isModalOpen && (
          <div className="popup">
            <div className="popup-content">
              <button
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
              <p>
                Hey! Nice to meet you, I'm Sam. Welcome to my room! Feel free to
                look around!
                <br />
                <br />
                P.S. I have some cool projects on my laptop. You should check
                them out!
              </p>
            </div>
          </div>
        )}*/}

        <img className="plant" src="/assets/plant.png" alt="Plant" />
        <img className="coffee" src="/assets/coffee2.png" alt="Coffee" />
        <img className="speaker" src="/assets/speaker.png" alt="Speaker" />
        <img className="gummies" src="/assets/gummies.png" alt="Gummies" />

        <div className={`contact-wrap`}>
          <button
            type="button"
            className={`contact glowable${
              isContactOpen ? " scale-up active" : ""
            }`}
            style={{ backgroundImage: 'url("/assets/contact.png")' }}
            onClick={handleContactClick}
            aria-expanded={isContactOpen}
            aria-controls="contact-panel"
            aria-label={
              isContactOpen ? "Hide contact info" : "Show contact info"
            }
          >
            <ul>
              <li>(678)314-8280</li>
              <li>samgwolfe12@gmail.com</li>
            </ul>
          </button>
        </div>

        <div className={`laptop-wrapper${isLaptopOpen ? " active" : ""}`}>
          {!isLaptopOpen && (
            <button
              type="button"
              ref={laptopOpenerRef}
              className="laptop-overlay"
              aria-label="Open laptop"
              onClick={(e) => {
                e.stopPropagation();
                smoothOpen();
              }}
              disabled={isAnimating}
            />
          )}

          {/* close button */}
          {isLaptopOpen && (
            <button
              className="laptop-close-btn"
              ref={laptopCloseBtnRef}
              type="button"
              aria-label="Close laptop"
              onClick={(e) => {
                e.stopPropagation();
                smoothClose();
              }}
              disabled={isAnimating}
            >
              ✕
            </button>
          )}

          <Laptop
            isOpen={isLaptopOpen}
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            screenRef={screenRef}
          />
        </div>

        <img className="neon" src="/assets/neon.webp" alt="neon sign" />
        <img className="bulletin" src="/assets/bulletin.png" alt="bulletin" />
        <img
          className="jellyfish"
          src="/assets/jellyfish.png"
          alt="jellyfish"
        />
        <img
          className="sam-poster"
          src="/assets/sam-poster.png"
          alt="Sam Wolfe"
        />
        <img className="desk" src="/assets/desk.png" alt="desk" />

        <video autoPlay loop muted playsInline className="clouds" id="myVideo">
          <source src="/assets/window.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <img className="window" src="/assets/window.png" alt="window" />
        <img className="paper" src="/assets/paper.webp" alt="paper" />
        <img className="dogs" src="/assets/dogs.png" alt="dogs" />
        <img className="pens" src="/assets/pens.png" alt="Pens" />
        <img className="notebook" src="/assets/notebook.png" alt="Notebook" />
        <MashImg />
        <img
          className="headphones"
          src="/assets/headphones.png"
          alt="Headphones"
        />
        <img className="lavalamp" src="/assets/lavalamp2.png" alt="Lavalamp" />
        <img className="sunnies" src="/assets/sunnies.png" alt="Sunnies" />
        <img className="mouse" src="/assets/mouse.png" alt="Mouse pad" />

        <Calendar />
        <Clock />
        <div className="border-top"></div>
      </div>
    </div>
  );
};

export default MyRoom;
