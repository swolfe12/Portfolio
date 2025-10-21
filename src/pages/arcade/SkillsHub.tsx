import { useEffect, useId, useRef, useState } from "react";
import NavBar from "../../components/NavBar.tsx";
import Slider from "react-slick";
import { SKILL_DATA, Cat } from "./skillsData.ts";
import { useSearchParams, useLocation } from "react-router-dom";

import avatarBase from "../../assets/avatar3.webp";
import room from "../../assets/room.png";
import fhat from "../../assets/fhat.png";
import bhat from "../../assets/bhat.png";
import headphones from "../../assets/plainheadphones.png";
import flower from "../../assets/flower.png";
import glasses from "../../assets/blackglasses.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CATEGORIES = [
  { id: "frontend", label: "Front-End", img: fhat },
  { id: "backend", label: "Back-End", img: bhat },
  { id: "accessibility", label: "Accessibility", img: headphones },
  { id: "cms", label: "CMS", img: flower },
  { id: "uiux", label: "UI/UX", img: glasses },
  { id: "testing", label: "Testing", img: fhat },
] as const;

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  responsive: [{ breakpoint: 768, settings: { slidesToShow: 2 } }],
};

type Props = { isArcade?: boolean; onNavigate?: (pageId: string) => void };
type CatId = (typeof CATEGORIES)[number]["id"];

export default function SkillsHub({ isArcade = true , onNavigate}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // Initialize:
  // - Arcade (routing): read from ?cat=
  // - Laptop (internal): read from pending hand-off if present; otherwise null
  const [selectedId, setSelectedId] = useState<CatId | null>(() => {
    if (isArcade) {
      const initial = (searchParams.get("cat") || "").toLowerCase() as CatId | "";
      return (initial as CatId) || null;
    }
    const pending = (window).__SW_PENDING_SKILL as string | undefined;
    return (pending as CatId) || null;
  });

  // Consume the pending hand-off on mount (laptop mode only)
  useEffect(() => {
    if (isArcade) return;
    const pending = (window).__SW_PENDING_SKILL as string | undefined;
    if (pending) {
      setSelectedId(pending as CatId);
      (window).__SW_PENDING_SKILL = undefined;
    }
  }, [isArcade]);

  const selected: Cat | null = selectedId ? SKILL_DATA[selectedId] ?? null : null;
  const detailsRegionId = useId();
  const detailsTitleRef = useRef<HTMLHeadingElement | null>(null);


  useEffect(() => {
    if (!isArcade) return;
    const urlCat = (searchParams.get("cat") || "").toLowerCase();
    if (urlCat !== (selectedId || "")) {
      setSelectedId((urlCat as CatId) || null);
    }
  }, [isArcade, searchParams, selectedId]);

  // === Laptop mode (internal app): ignore router; listen for the custom event ===
  useEffect(() => {
    if (isArcade) return; // only in laptop mode
    const onSelect = (e: Event) => {
      const cat = (e as CustomEvent).detail as string | undefined;
      if (!cat) return;
      const next = cat.toLowerCase() as CatId;
      if (next !== selectedId) setSelectedId(next);
    };
    window.addEventListener("skills:select", onSelect as EventListener);
    return () => window.removeEventListener("skills:select", onSelect as EventListener);
  }, [isArcade, selectedId]);

  // Accessibility nicety: focus the title when selection changes
  useEffect(() => {
    if (selected && detailsTitleRef.current) {
      detailsTitleRef.current.focus();
    }
  }, [selected]);

  return (
    <div className="skills-hub" aria-labelledby="skills-title">
      {/* Put NavBar on its own layer so clicks always work */}
      <div className="nav-layer">
        <NavBar isArcade={isArcade} onNavigate={onNavigate} />
      </div>

      <div className="game-box">
        <div className="dressup">
          <Slider {...settings} className="skills-carousel" aria-label="Skill categories">
            {CATEGORIES.map((c) => (
              <div key={c.id} className="skills-card">
                <h2 className="sr-only">{c.label}</h2>
                <button
                  type="button"
                  className={`skills-card__link ${selectedId === c.id ? "is-active" : ""}`}
                  onClick={() => {
                    if (isArcade) {
                      // One navigation per click; no effects writing the URL.
                      setSearchParams({ cat: c.id }, { replace: true });
                    } else {
                      // Laptop/internal mode keeps local state only.
                      setSelectedId(c.id);
                    }
                  }}
                  aria-pressed={selectedId === c.id}
                  aria-controls={detailsRegionId}
                  aria-label={`Show ${c.label} details below`}
                >
                  <img
                    src={c.img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={120}
                    height={120}
                    className="skills-card__img"
                  />
                  <span>{c.label}</span>
                </button>
              </div>
            ))}
          </Slider>

          <div className="dressup-avatar" style={{ backgroundImage: `url(${room})` }}>
            <img
              src={selected?.img ?? avatarBase}
              alt="Sam's avatar"
              className="dressup-avatar__img"
            />
          </div>
        </div>

        <section
          id={detailsRegionId}
          className="skills-details"
          aria-live="polite"
          aria-labelledby="skills-title"
        >
          {selected ? (
            <div className="skills-details__inner">
              <header className="skills-header">
                <h1 id="skills-title" ref={detailsTitleRef} tabIndex={-1}>
                  {selected.name}
                </h1>
                <p className="blurb">{selected.blurb}</p>
              </header>

              <div className="bubble-wrap">
                {selected.blocks.map((b) => (
                  <div key={b.title} className="bubble">
                    <h2>{b.title}</h2>
                    <ul>
                      {b.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="skills-details__placeholder">
              Pick a category above to see details here.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
