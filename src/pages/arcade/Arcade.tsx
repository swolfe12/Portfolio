// src/components/FunSite/Arcade/Arcade.jsx
import React from 'react';
import { Link } from "react-router-dom";
import avatar from '../../assets/avatar3.png';
import Navbar from '../../components/NavBar.tsx';
import butterfly1 from '../../assets/butterfly1.png';
import butterfly2 from '../../assets/butterfly2.png';
import screensaver from '../../assets/screensaver.jpg';

export const Arcade = ({ isArcade = true, onNavigate }) => {
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
          
          {isArcade? (
          <ul className="about-links">
            <li>   
              <Link to={`/skills/frontend`}>
                <span className="dot" aria-hidden="true" />
                <span className="title">front-end fun</span>
                <span className="sub">building sleek, speedy, and sparkly interfaces</span>
              </Link>
            </li>
            <li>
               <Link to={`/skills/backend`}>
                <span className="dot" aria-hidden="true" />
                <span className="title">back-end basics</span>
                <span className="sub">the secret sauce powering the pretty stuff</span>
              </Link>
            </li>
            <li>
               <Link to={`/skills/accessibility`}>
                <span className="dot" aria-hidden="true" />
                <span className="title">accessibility</span>
                <span className="sub">making the web work for everyone (no excuses!)</span>
              </Link>
            </li>
            <li>
               <Link to={`/skills/frontent`}>
                <span className="dot" aria-hidden="true" />
                <span className="title">UI/UX  design</span>
                <span className="sub">where function meets fabulous</span>
              </Link>
            </li>
            <li>
               <Link to={`/skills/frontend`}>
                <span className="dot" aria-hidden="true" />
                <span className="title">projects</span>
                <span className="sub">a cool pic for your computer</span>
              </Link>
            </li>
            <li>
               <Link to={`/links`}>
                <span className="dot" aria-hidden="true" />
                <span className="title">links</span>
                <span className="sub">meet all my fab friends!</span>
              </Link>
            </li>
          </ul>
          ) : (
          <ul className="about-links">
            <li>
              <button
                  type="button"
                  onClick={() => onNavigate?.(`skills/frontend`)}
                  aria-label={`Open Backend`}
                >
                <span className="dot" aria-hidden="true" />
                <span className="title">front-end fun</span>
                <span className="sub">building sleek, speedy, and sparkly interfaces</span>
              </button>
            </li>
            <li>
              <button
                  type="button"
                  onClick={() => onNavigate?.(`skills/backend`)}
                  aria-label={`Open Backend`}
                >
                <span className="dot" aria-hidden="true" />
                <span className="title">back-end basics</span>
                <span className="sub">the secret sauce powering the pretty stuff!</span>
              </button>
            </li>
            <li>
              <button
                  type="button"
                  onClick={() => onNavigate?.(`skills/accessibility`)}
                  aria-label={`Open Accessibility`}
                >
                <span className="dot" aria-hidden="true" />
                <span className="title">accessibility</span>
                <span className="sub">making the web work for everyone (no excuses!)</span>
              </button>
            </li>
            <li>
              <button
                  type="button"
                  onClick={() => onNavigate?.(`skills/backend`)}
                  aria-label={`Open Backend`}
                >
                <span className="dot" aria-hidden="true" />
                <span className="title">UI/UX  design</span>
                <span className="sub">where function meets fabulous</span>
              </button>
            </li>
            <li>
              <button
                  type="button"
                  onClick={() => onNavigate?.(`skills/backend`)}
                  aria-label={`Open Backend`}
                >
                <span className="dot" aria-hidden="true" />
                <span className="title">projects</span>
                <span className="sub">a cool pic for your computer</span>
              </button>
            </li>
            <li>
              <button
                  type="button"
                  onClick={() => onNavigate?.(`links`)}
                  aria-label={`Open Backend`}
                >
                <span className="dot" aria-hidden="true" />
                <span className="title">links</span>
                <span className="sub">meet all my fab friends!</span>
              </button>
            </li>
          </ul>
          )};

          <img className="butterfly1 gentle-hover-shake1" src={butterfly1} alt="" />
          <img className="butterfly2 gentle-hover-shake2" src={butterfly2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Arcade;
