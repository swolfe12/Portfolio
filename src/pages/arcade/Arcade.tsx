// src/components/FunSite/Arcade/Arcade.jsx
import React from 'react';
import { Link } from "react-router-dom";
import avatar from '../../assets/avatar3.png';
import Navbar from '../../components/NavBar.tsx';
import butterfly1 from '../../assets/butterfly1.png';
import butterfly2 from '../../assets/butterfly2.png';
import screensaver from '../../assets/screensaver.jpg';

export const Arcade = ({ isArcade = true, onNavigate }) => {

  // helper for desktop-in-laptop: switch screen + set ?cat
  const openSkill = (cat) => {
    // move to the skills screen in your internal router
    onNavigate?.('skills');
    // reflect selection in the URL so SkillsHub picks it up
    // works fine inside the laptop iframe/app too
    const url = new URL(window.location.href);
    url.pathname = '/skills';
    url.searchParams.set('cat', cat);
    window.history.pushState({}, '', url);
  };

  return (
    <div className='arcade' id="home" style={{ backgroundImage: `url(${screensaver})` }}>
      <Navbar isArcade={isArcade} onNavigate={onNavigate} />
      <div className="grid">
        <div className="avatar">
          <img src={avatar} alt="Sam avatar" />
        </div>
        <div className="about-blob" role="region" aria-labelledby="about-title">
          <h2 id="about-title">
            <span className="hey">Hey, everyone!</span> I’m Sam!
          </h2>
          <p className="kicker">
            Welcome to my site. Click the buttons below to see what I’m all about!
          </p>

          {isArcade ? (
            <ul className="about-links">
              <li>
                <Link to="/skills?cat=frontend" aria-label="Open Front-End">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">front-end fun</span>
                  <span className="sub">building sleek, speedy, and sparkly interfaces</span>
                </Link>
              </li>
              <li>
                <Link to="/skills?cat=backend" aria-label="Open Back-End">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">back-end basics</span>
                  <span className="sub">the secret sauce powering the pretty stuff</span>
                </Link>
              </li>
              <li>
                <Link to="/skills?cat=accessibility" aria-label="Open Accessibility">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">accessibility</span>
                  <span className="sub">making the web work for everyone (no excuses!)</span>
                </Link>
              </li>
              <li>
                {/* was /skills/frontent — fixed + mapped to uiux */}
                <Link to="/skills?cat=uiux" aria-label="Open UI/UX">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">UI/UX design</span>
                  <span className="sub">where function meets fabulous</span>
                </Link>
              </li>
              <li>
                {/* send Projects to its page (adjust if different) */}
                <Link to="/projects" aria-label="Open Projects">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">projects</span>
                  <span className="sub">a cool pic for your computer</span>
                </Link>
              </li>
              <li>
                <Link to="/links" aria-label="Open Links">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">links</span>
                  <span className="sub">meet all my fab friends!</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="about-links">
              <li>
                <button type="button" onClick={() => openSkill('frontend')} aria-label="Open Front-End">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">front-end fun</span>
                  <span className="sub">building sleek, speedy, and sparkly interfaces</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openSkill('backend')} aria-label="Open Back-End">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">back-end basics</span>
                  <span className="sub">the secret sauce powering the pretty stuff!</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openSkill('accessibility')} aria-label="Open Accessibility">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">accessibility</span>
                  <span className="sub">making the web work for everyone (no excuses!)</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openSkill('uiux')} aria-label="Open UI/UX">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">UI/UX design</span>
                  <span className="sub">where function meets fabulous</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate?.('projects')} aria-label="Open Projects">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">projects</span>
                  <span className="sub">a cool pic for your computer</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate?.('links')} aria-label="Open Links">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">links</span>
                  <span className="sub">meet all my fab friends!</span>
                </button>
              </li>
            </ul>
          )}

          <img className="butterfly1 gentle-hover-shake1" src={butterfly1} alt="" />
          <img className="butterfly2 gentle-hover-shake2" src={butterfly2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Arcade;
