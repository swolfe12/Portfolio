/*
import Navbar from './NavBar.tsx';
import screensaver from '../../../assets/screensaver.jpg';
import resume from '../../../assets/resume.png';

export const Resume = ({ isArcade = true, onNavigate }) =>  {
    return (
        <div className='resume-page' style={{ backgroundImage: `url(${screensaver})` }}>
            <Navbar isArcade={isArcade} onNavigate={onNavigate} />
            <div className="grid">
                <img src={resume} alt="resume"></img>
            </div>

        </div>
    )
}

export default Resume;
*/
// src/components/FunSite/Arcade/ResumeInteractive.jsx
import React, { useEffect, useId, useRef, useState } from "react";
import Navbar from "./NavBar.tsx";
import screensaver from "../../../assets/screensaver.jpg";
import resumeImg from "../../../assets/resume.png";

const STAR_SIZE = 36; // px for the clickable star

// Configure your hotspots here. left/top are percentages relative to the image.
const HOTSPOTS = [
  {
    id: "name",
    left: 64,  // %
    top: 3,   // %
    title: "Hi! I go by Sam",
    body:
      "Legal name is Samantha, but please call me Sam. Front-end specialist focused on React + TypeScript and delightful, accessible UI.",
  },
  {
    id: "experience-top",
    left: 84,
    top: 19,
    title: "Experience Snapshot",
    body:
      "Led front-end on 30+ projects, upgraded design systems, killed bugs with kindness, and shipped WCAG-compliant UI at scale.",
  },
  {
    id: "skills-center",
    left: 36,
    top: 62,
    title: "Core Skills",
    body:
      "React, TS, CSS architecture, accessibility (WCAG 2.1), performance, design systems, CI/CD habits that won’t ruin Fridays.",
  },
  {
    id: "skills-right",
    left: 86,
    top: 76,
    title: "Tooling I actually use",
    body:
      "GitHub Actions, Webpack, Docker, Sitecore/Optimizely integration, analytics hooks, and pragmatic testing.",
  },
];

export default function ResumeInteractive({ isArcade = true, onNavigate }) {
  const [openId, setOpenId] = useState(null);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const resumeId = useId();

  // Close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpenId(null);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Click-outside to close (only when a panel is open)
  useEffect(() => {
    function onDown(e) {
      if (!openId) return;
      // if click is outside the panel AND not on any star, close
      const panel = panelRef.current;
      const clickedPanel = panel && panel.contains(e.target);
      const clickedStar = e.target.closest?.(".star-btn");
      if (!clickedPanel && !clickedStar) setOpenId(null);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openId]);

  return (
    <div
      className="resume-page"
      style={{ backgroundImage: `url(${screensaver})` }}
    >
      <Navbar isArcade={isArcade} onNavigate={onNavigate} />

      <div className="resume-grid">
        {/* Image wrapper is the positioning context */}
        <div className="resume-figure" ref={overlayRef}>
          <img
            src={resumeImg}
            alt="Resume of Sam Wolfe"
            className="resume-image"
            id={resumeId}
          />

          {/* Hotspot stars */}
          {HOTSPOTS.map((h) => (
            <button
              key={h.id}
              className={`star-btn${openId === h.id ? " active" : ""}`}
              style={{
                left: `calc(${h.left}% - ${STAR_SIZE / 2}px)`,
                top: `calc(${h.top}% - ${STAR_SIZE / 2}px)`,
                width: STAR_SIZE,
                height: STAR_SIZE,
              }}
              aria-haspopup="dialog"
              aria-expanded={openId === h.id}
              aria-controls={`panel-${h.id}`}
              onClick={() => setOpenId((cur) => (cur === h.id ? null : h.id))}
              title={h.title}
              type="button"
            >
              {/* simple star svg */}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.9L18.18 22 12 18.6 5.82 22 7 14.17l-5-4.9 6.91-1.01L12 2z"
                  fill="currentColor"
                />
              </svg>
            </button>
          ))}

          {/* Floating blurb panel (only one open at a time) */}
          {openId && (
            <BlurbPanel
              hotspot={HOTSPOTS.find((h) => h.id === openId)}
              onClose={() => setOpenId(null)}
              panelRef={panelRef}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function BlurbPanel({ hotspot, onClose, panelRef }) {
  // Nudge the panel slightly so it doesn’t sit directly under your finger/star.
  const OFFSET_X = 1;  // %
  const OFFSET_Y = 3;  // %

  return (
    <div
      id={`panel-${hotspot.id}`}
      role="dialog"
      aria-modal="false"
      aria-label={hotspot.title}
      className="blurb-panel"
      ref={panelRef}
      style={{
        left: `min(calc(${hotspot.left + OFFSET_X}% + 0px), 92%)`,
        top: `calc(${hotspot.top + OFFSET_Y}% + 0px)`,
      }}
    >
      <div className="blurb-head">
        <h3 className="blurb-title">{hotspot.title}</h3>
        <button
          className="blurb-close"
          aria-label="Close"
          onClick={onClose}
          type="button"
        >
          ✕
        </button>
      </div>
      <p className="blurb-body">{hotspot.body}</p>
    </div>
  );
}
