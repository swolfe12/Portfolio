// src/components/FunSite/Arcade/NavBar.tsx
import React, { useEffect, useId, useRef, useState } from "react";
import { Link } from 'react-router-dom';

type Category = {
  id: string;
  label: string;
  href?: string;
  subitems?: { id: string; label: string; href: string }[];
};

const CATEGORIES: Category[] = [
  { id: "chat", label: "Chat Room", href: "/chat" },
  { id: "games", label: "Games", href: "/games" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  { id: "resume", label: "Resume", href: "/resume" },
  { id: "links", label: "Links", href: "/links" },
];

type NavbarProps = {
  isArcade: boolean; // true = mobile mode (navigate), false = desktop-in-laptop (no URL change)
  onNavigate?: (pageId: string) => void; // used when isArcade === false
};

export default function Navbar({ isArcade, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const navId = useId();
  const dialogId = useId();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastFocusableRef = useRef<HTMLButtonElement | null>(null);
  const scrollYRef = useRef(0);

  // Lock scroll when menu opens
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

  // Escape to close
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const toggleExpanded = (id: string) =>
    setExpanded((cur) => ({ ...cur, [id]: !cur[id] }));

  const renderDesktopItem = (c: Category, i: number) => {
    return (
      <li key={c.id} className="nav-item">
        {isArcade ? (
          <Link className="nav-link" to={c.href || "#"}>
            {c.label}
          </Link>
        ) : (
          <button
            className="nav-link"
            onClick={() => onNavigate?.(c.id)}
            type="button"
          >
            {c.label}
          </button>
        )}
        {i < CATEGORIES.length - 1 && (
          <span className="divider" aria-hidden="true"></span>
        )}
      </li>
    );
  };

  const renderDrawerItem = (c: Category) => {
    const hasSubs = c.subitems && c.subitems.length > 0;
    const isOpen = !!expanded[c.id];
    const panelId = `panel-${c.id}`;

    if (!hasSubs) {
      return (
        <li key={c.id} className="drawer-item">
          {isArcade ? (
            <Link
              to={c.href || "#"}
              className="drawer-link"
              onClick={() => setOpen(false)}
            >
              {c.label}
            </Link>
          ) : (
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
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>
        <div
          id={panelId}
          role="region"
          aria-label={`${c.label} subcategories`}
          hidden={!isOpen}
        >
          <div className="sub-list" role="list">
            {c.subitems!.map((s) => (
              <li key={s.id}>
                {isArcade ? (
                  <Link
                    to={s.href}
                    className="sub-link"
                    onClick={() => setOpen(false)}
                  >
                    {s.label}
                  </Link>
                ) : (
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
                )}
              </li>
            ))}
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
      <header className="site-header" role="banner">
        <div className="nav-container">

         {isArcade ? (
          <Link
            to="/"
            className="brand"
            onClick={() => setOpen(false)}
          >
            Sam's Portfolio
          </Link>
        ) : (
          <button
            className="brand"
            type="button"
            onClick={() => {
              setOpen(false);
              onNavigate?.('home'); // or whatever your landing id is
            }}
          >
            Sam's Portfolio
          </button>
        )}
          <nav
            className="primary-nav desktop-only"
            aria-label="Primary"
            id={navId}
            role="navigation"
          >
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
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
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
              <h2 id={`${dialogId}-title`} className="drawer-title">
                Menu
              </h2>
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
    </>
  );
}
