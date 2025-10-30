import React, { useState, useRef, useEffect } from "react";
import "./../styles/main.scss";
import Calendar from '../components/Calendar';
import Clock from '../components/Clock';
import Laptop from '../components/Laptop';
import MashImg from '../components/MashImage';

import contact from './../assets/contact.png';
import plant from './../assets/plant.png';
import coffee from './../assets/coffee2.png';
import gummies from './../assets/gummies.png';
import pens from './../assets/pens.png';
import notebook from './../assets/notebook.png';
import headphones from './../assets/headphones.png';
import lavalamp from './../assets/lavalamp2.png';
import sunnies from './../assets/sunnies.png';
import bulletin from './../assets/bulletin.png';
import jellyfish from './../assets/jellyfish.png';
import samPoster from './../assets/sam-poster.png';
import dogs from './../assets/dogs.png';
import desk from './../assets/desk.png';
import windowImg from './../assets/window.png';
import paper from './../assets/paper.webp';
import mouse from './../assets/mouse.png';
import clouds from './../assets/window.mp4';
import speaker from './../assets/speaker.png';
import neon from './../assets/neon.webp';

const SCALE_MS = 320; // match your CSS transition duration

const Portfolio = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isLaptopOpen, setIsLaptopOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isAnimating, setIsAnimating] = useState(false); // prevents mid-frame flicker

  // .screen element inside Laptop; Laptop must attach ref={screenRef} to its .screen
  const screenRef = useRef(null);

  // Pause glow while animating to avoid reflow/jank overlap
  useEffect(() => {
    const root = document.documentElement;
    if (isAnimating) root.classList.add('glow-paused');
    else root.classList.remove('glow-paused');
    return () => root.classList.remove('glow-paused');
  }, [isAnimating]);

  // Escape to close (safe, small)
  useEffect(() => {
    if (!isLaptopOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') smoothClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
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
      if (document.documentElement.classList.contains('glow-paused')) return;
      const root = document.documentElement;
      root.classList.remove('glow-phase');
      void root.offsetWidth; // force reflow to restart animation
      root.classList.add('glow-phase');
      setTimeout(() => root.classList.remove('glow-phase'), 5000);
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
    const events = ['pointermove', 'keydown', 'touchstart', 'wheel', 'scroll'];

    events.forEach((evt) =>
      window.addEventListener(evt, onUserActivity, { passive: true })
    );

    triggerGlowOnce();
    startIdleWatch();

    return () => {
      clearTimers();
      events.forEach((evt) => window.removeEventListener(evt, onUserActivity));
      document.documentElement.classList.remove('glow-phase');
    };
  }, []);

  return (
    <div className={`portfolio${isAnimating ? ' is-animating' : ''}`}>
      {/* Close on click outside .screen (use CLICK capture = fires after layout, smoother than pointerdown) */}
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
        {isModalOpen && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
              <p>
                Hey! Nice to meet you, I'm Sam. Welcome to my room! Feel free to look around!
                <br /><br />
                P.S. I have some cool projects on my laptop. You should check them out!
              </p>
            </div>
          </div>
        )}

        <img className="plant" src={plant} alt="Plant" />
        <img className="coffee" src={coffee} alt="Coffee" />
        <img className="speaker" src={speaker} alt="Speaker" />
        <img className="gummies" src={gummies} alt="Gummies" />

        <div
          className={`contact glowable${isContactOpen ? ' scale-up active' : ''}`}
          style={{ backgroundImage: `url(${contact})` }}
          onClick={handleContactClick}
        >
          <ul>
            <li>(678) 314-8280</li>
            <li>samgwolfe12@gmail.com</li>
          </ul>
        </div>

        <div className={`laptop-wrapper${isLaptopOpen ? ' active' : ''}`}>
          {/* CLOSED: overlay is the ONLY opener (one clean click) */}
          {!isLaptopOpen && (
            <div
              className="laptop-overlay"
              onClick={(e) => {
                e.stopPropagation();
                smoothOpen();
              }}
            />
          )}

          {/* OPEN: close button */}
          {isLaptopOpen && (
            <button
              className="laptop-close-btn"
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
            screenRef={screenRef} // <-- attach to .screen inside Laptop
          />
        </div>

        <img className="neon" src={neon} alt="neon sign" />
        <img className="bulletin" src={bulletin} alt="bulletin" />
        <img className="jellyfish" src={jellyfish} alt="jellyfish" />
        <img className="sam-poster" src={samPoster} alt="Sam Wolfe" />
        <img className="desk" src={desk} alt="desk" />

        <video autoPlay loop muted playsInline className="clouds" id="myVideo">
          <source src={clouds} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <img className="window" src={windowImg} alt="window" />
        <img className="paper" src={paper} alt="paper" />
        <img className="dogs" src={dogs} alt="dogs" />
        <img className="pens" src={pens} alt="Pens" />
        <img className="notebook" src={notebook} alt="Notebook" />
        <MashImg />
        <img className="headphones" src={headphones} alt="Headphones" />
        <img className="lavalamp" src={lavalamp} alt="Lavalamp" />
        <img className="sunnies" src={sunnies} alt="Sunnies" />
        <img className="mouse" src={mouse} alt="Mouse pad" />

        <Calendar />
        <Clock />
        <div className="border-top"></div>
      </div>
    </div>
  );
};

export default Portfolio;
