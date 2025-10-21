import React from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatar3.webp";
import Navbar from "../../components/NavBar.tsx";
import butterfly1 from "../../assets/butterfly1.png";
import butterfly2 from "../../assets/butterfly2.png";

export const Arcade = ({ isArcade = true, onNavigate }) => {
  
  const openSkill = (cat) => {
    const id = String(cat).toLowerCase();

    // 1) Stash for SkillsHub to read on mount (in case event fires before it mounts)
    window.__SW_PENDING_SKILL = id;

    // 2) Switch the internal screen in the laptop app
    onNavigate?.("skills");

    // 3) Nudge an event on the next tick so a mounted hub can also react
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("skills:select", { detail: id }));
    }, 0);
  };

  return (
    <div className="arcade" id="home">
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
            // Full-site routing mode (mobile / outside the laptop): use real <Link>s
            <ul className="about-links">
              <li>
                <Link to="skills?cat=frontend" aria-label="Open Front-End">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">front-end fun</span>
                  <span className="sub">building sleek, speedy, and sparkly interfaces</span>
                </Link>
              </li>
              <li>
                <Link to="skills?cat=backend" aria-label="Open Back-End">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">back-end basics</span>
                  <span className="sub">the secret sauce powering the pretty stuff</span>
                </Link>
              </li>
              <li>
                <Link to="skills?cat=accessibility" aria-label="Open Accessibility">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">accessibility</span>
                  <span className="sub">making the web work for everyone (no excuses!)</span>
                </Link>
              </li>
              <li>
                <Link to="skills?cat=uiux" aria-label="Open UI/UX">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">UI/UX design</span>
                  <span className="sub">where function meets fabulous</span>
                </Link>
              </li>
              <li>
                <Link to="projects" aria-label="Open Projects">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">projects</span>
                  <span className="sub">what I've been working on</span>
                </Link>
              </li>
              <li>
                <Link to="links" aria-label="Open Links">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">links</span>
                  <span className="sub">let's link up!</span>
                </Link>
              </li>
            </ul>
          ) : (
            // Laptop (inside the portfolio app): internal nav + custom event
            <ul className="about-links">
              <li>
                <button type="button" onClick={() => openSkill("frontend")} aria-label="Open Front-End">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">front-end fun</span>
                  <span className="sub">building sleek, speedy, and sparkly interfaces</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openSkill("backend")} aria-label="Open Back-End">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">back-end basics</span>
                  <span className="sub">the secret sauce powering the pretty stuff!</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openSkill("accessibility")} aria-label="Open Accessibility">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">accessibility</span>
                  <span className="sub">making the web work for everyone (no excuses!)</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openSkill("uiux")} aria-label="Open UI/UX">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">UI/UX design</span>
                  <span className="sub">where function meets fabulous</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate?.("projects")} aria-label="Open Projects">
                  <span className="dot" aria-hidden="true" />
                  <span className="title">projects</span>
                  <span className="sub">a cool pic for your computer</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate?.("links")} aria-label="Open Links">
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
