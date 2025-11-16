
import React, { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom';

type Category = {
  id: string;
  label: string;
  href?: string;
  subitems?: { id: string; label: string; href: string }[];
};

const CATEGORIES: Category[] = [
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "skills", label: "Skills", href: "/skills"},
  { id: "resume", label: "Resume", href: "/resume" }, // kept for active styles; we'll intercept it
  { id: "links", label: "Links", href: "/links" },
];


const RESUME_URL =
  "https://docs.google.com/document/d/1ei5dTmXsQ0X0AeQnxmuT2cDt-WKHS_6uZe_WAqVl7yU/edit?usp=sharing";

  type NavbarProps = {
  onNavigate?: (pageId: string) => void;
};

export default function Navbar({ onNavigate }: NavbarProps) {
  const { pathname } = useLocation();
  const isActive = (href?: string) => !!href && (pathname === href || pathname.startsWith(href + "/"));

  const [open, setOpen] = useState(false);           // mobile drawer open
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [exitOpen, setExitOpen] = useState(false);   // external confirm modal open

  const navId = useId();
  const dialogId = useId();
  const exitId = useId();

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusableRef = useRef<HTMLButtonElement | null>(null);
  const resumeTriggerRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const exitCancelBtnRef = useRef<HTMLButtonElement | null>(null);
  const scrollYRef = useRef(0);

  // Lock scroll when mobile menu opens
  useEffect(() => {
    if (open) {
      scrollYRef.current = window.scrollY;
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.classList.add("nav-scroll-lock");
    } else {
      document.body.classList.remove("nav-scroll-lock");
      document.body.style.top = "";
      window.scrollTo(0, scrollYRef.current);
    }
  }, [open]);

  // Escape to close mobile drawer or the exit modal
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (exitOpen) {
          e.preventDefault();
          setExitOpen(false);
          (resumeTriggerRef.current as HTMLElement | null)?.focus?.();
        } else if (open) {
          e.preventDefault();
          setOpen(false);
          menuButtonRef.current?.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, exitOpen]);

  // Open confirm modal for Resume
  const handleResumeClick = (e?: React.MouseEvent, triggerEl?: HTMLElement | null) => {
    e?.preventDefault();
    setOpen(false);           // close mobile drawer if it was open
    if (triggerEl) resumeTriggerRef.current = triggerEl as any;
    setExitOpen(true);
  };

  const confirmLeave = () => {
    setExitOpen(false);
    // Open in a new tab for safety; change to '_self' if you want same-tab
    window.open(RESUME_URL, "_blank", "noopener,noreferrer");
    (resumeTriggerRef.current as HTMLElement | null)?.focus?.();
  };

  const cancelLeave = () => {
    setExitOpen(false);
    (resumeTriggerRef.current as HTMLElement | null)?.focus?.();
  };

  const toggleExpanded = (id: string) =>
    setExpanded((cur) => ({ ...cur, [id]: !cur[id] }));

  const renderDesktopItem = (c: Category, i: number) => {
    const hasSubs = c.subitems && c.subitems.length > 0;

    if (!hasSubs) {
      const isResume = c.id === "resume";

      return (
        <li key={c.id} className="nav-item">
          {isResume ? (
            // Render a button styled like your link to intercept and show modal
            <button
              className={`nav-link ${isActive(c.href) ? "is-active" : ""}`}
              type="button"
              onClick={(e) => handleResumeClick(e, e.currentTarget)}
              aria-haspopup="dialog"
              aria-controls={exitId}
            >
              {c.label}
            </button>
          )  : (
            <button
              className="nav-link"
              type="button"
              onClick={() => onNavigate?.(c.id)}
              aria-current={isActive(c.href) ? "page" : undefined}
            >
              {c.label}
            </button>
          )}
          {i < CATEGORIES.length - 1 && <span className="divider" aria-hidden="true"></span>}
        </li>
      );
    }
    // (Submenu code omitted for brevity; unchanged)
    return null;
  };

  const renderDrawerItem = (c: Category) => {
    const hasSubs = c.subitems && c.subitems.length > 0;
    const isOpen = !!expanded[c.id];
    const panelId = `panel-${c.id}`;
    const isResume = c.id === "resume";

    if (!hasSubs) {
      return (
        <li key={c.id} className="drawer-item">
          {isResume ? (
            <button
              className="drawer-link"
              type="button"
              onClick={(e) => handleResumeClick(e, e.currentTarget)}
              aria-haspopup="dialog"
              aria-controls={exitId}
            >
              {c.label}
            </button>
          ) :  (
            <button
              className="drawer-link"
              type="button"
              onClick={() => {
                onNavigate?.(c.id);
                setOpen(false);
              }}
            >
              {c.label}
            </button>
          )}
        </li>
      );
    }

    return (
      <li key={c.id} className="drawer-item">
        <button
          className="disclosure"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggleExpanded(c.id)}
          type="button"
        >
          <span>{c.label}</span>
          <svg
            className={`chev ${isOpen ? "rot" : ""}`}
            viewBox="0 0 24 24"
            width="24"
            height="24"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </button>
        <div id={panelId} role="region" aria-label={`${c.label} subcategories`} hidden={!isOpen}>
          <div className="sub-list" role="list">
            {c.subitems!.map((s) => (
              <li key={s.id}>

                  <button
                    className="sub-link"
                    type="button"
                    onClick={() => {
                      onNavigate?.(s.id);
                      setOpen(false);
                    }}
                  >
                    {s.label}
                  </button>
              </li>
            ))}
          </div>
        </div>
      </li>
    );
  };

  // Simple focus trap for the exit modal
  useEffect(() => {
    if (!exitOpen) return;
    const prevActive = document.activeElement as HTMLElement | null;
    exitCancelBtnRef.current?.focus();

    const handleFocus = (e: FocusEvent) => {
      if (!exitOpen) return;
      const dialogEl = document.getElementById(exitId);
      if (dialogEl && !dialogEl.contains(e.target as Node)) {
        e.preventDefault();
        (dialogEl.querySelector("[data-autofocus]") as HTMLElement)?.focus?.();
      }
    };

    document.addEventListener("focusin", handleFocus);
    return () => {
      document.removeEventListener("focusin", handleFocus);
      prevActive?.focus?.();
    };
  }, [exitOpen, exitId]);

  return (
    <>
      <header className="site-header" role="banner">
        <div className="nav-container">

            <button
              className="brand"
              type="button"
              onClick={() => {
                setOpen(false);
                onNavigate?.("home");
              }}
            >
              Sam's Portfolio
            </button>
          <nav className="primary-nav desktop-only" aria-label="Primary" id={navId} role="navigation">
            <div className="nav-list" role="list">
              {CATEGORIES.map((c, i) => renderDesktopItem(c, i))}
            </div>
          </nav>

          {/* Mobile toggle */}
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-toggle mobile-only"
            aria-expanded={open}
            aria-controls={dialogId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24">
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <div
          className="mobile-overlay"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setOpen(false);
              menuButtonRef.current?.focus();
            }
          }}
        >
          <div
            className="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${dialogId}-title`}
            id={dialogId}
            ref={dialogRef}
          >
            <div className="drawer-bar">
              <h2 id={`${dialogId}-title`} className="drawer-title">Menu</h2>
              <button
                className="icon-btn"
                onClick={() => {
                  setOpen(false);
                  menuButtonRef.current?.focus();
                }}
                aria-label="Close menu"
                ref={lastFocusableRef}
              >
                ✕
              </button>
            </div>

            <nav aria-label="Primary" role="navigation">
              <div className="drawer-list" role="list">
                {CATEGORIES.map((c) => renderDrawerItem(c))}
              </div>
            </nav>
          </div>
        </div>
      )}

      {exitOpen && (
        <div
          className="external-overlay"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) cancelLeave();
          }}
        >
          <div
            id={exitId}
            className="external-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${exitId}-title`}
            aria-describedby={`${exitId}-desc`}
          >
            <h2 id={`${exitId}-title`} className="external-title">You’re leaving this site</h2>
            <p id={`${exitId}-desc`} className="external-desc">
              You’re about to open your resume on Google Docs. Do you want to continue?
            </p>
            <div className="external-actions">
              <button
                ref={exitCancelBtnRef}
                data-autofocus
                className="btn btn-secondary"
                type="button"
                onClick={cancelLeave}
              >
                Cancel
              </button>
              <button className="btn btn-primary" type="button" onClick={confirmLeave}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
