import { useEffect, useId, useRef, useState } from "react";
import NavBar from '../../components/NavBar.tsx';
import Slider from "react-slick";
import { SKILL_DATA, Cat } from "./skillsData.ts";
import { useSearchParams } from "react-router-dom";

import avatarBase from '../../assets/avatar3.webp';
import room from '../../assets/room.png';
import fhat from '../../assets/fhat.png';
import bhat from '../../assets/bhat.png';
import headphones from '../../assets/plainheadphones.png';
import flower from '../../assets/flower.png';
import glasses from '../../assets/blackglasses.png';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CATEGORIES = [
  { id: "frontend", label: "Front-End", img: fhat },
  { id: "backend", label: "Back-End", img: bhat },
  { id: "accessibility", label: "Accessibility", img: headphones },
  { id: "cms", label: "CMS", img: flower },
  { id: "uiux", label: "UI/UX", img:  glasses },
  { id: "testing", label: "Testing", img: fhat },
] as const;

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  responsive: [
    { breakpoint: 768,  settings: { slidesToShow: 2 } }
  ],
};

type Props = { isArcade?: boolean; onNavigate?: (pageId: string) => void };


export default function SkillsHub({ isArcade = true }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState(null);

const selected: Cat | null = selectedId ? SKILL_DATA[selectedId] ?? null : null;
const detailsRegionId = useId();
const detailsTitleRef = useRef(null);


// keep URL in sync when user clicks carousel
useEffect(() => {
  const current = (searchParams.get("cat") || "").toLowerCase();
  // only update if different; use replace to avoid stacking history
  if ((selectedId || "") !== current) {
    if (selectedId) setSearchParams({ cat: selectedId }, { replace: true });
    else setSearchParams({}, { replace: true });
  }
  // OK to depend on selectedId + searchParams + setSearchParams
  // react-router guarantees stable setters
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedId]);

// respond to back/forward changes to ?cat
useEffect(() => {
  const urlCat = (searchParams.get("cat") || "").toLowerCase();
  // only update state if it actually changed
  if (urlCat !== (selectedId || "")) {
    setSelectedId(urlCat || null);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [searchParams]);

  return (
    <div className="skills-hub" aria-labelledby="skills-title">
      <NavBar isArcade={isArcade} />
      <div className="game-box">
        <div className="dressup">
          <Slider {...settings} className="skills-carousel" aria-label="Skill categories">
            {CATEGORIES.map((c) => (
              <div key={c.id} className="skills-card">
                <h2 className="sr-only">{c.label}</h2>
                <button
                  type="button"
                  className={`skills-card__link ${selectedId === c.id ? "is-active" : ""}`}
                  onClick={() => setSelectedId(c.id)}
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
            {/* If a category is selected, use its avatar image; else show base avatar */}
            <img
              src={selected?.img ?? avatarBase}
              alt="Sam's avatar"
              className="dressup-avatar__img"
            />
          </div>
        </div>

        {/* Inline details region */}
        <section
          id={detailsRegionId}
          className="skills-details"
          aria-live="polite"
          aria-labelledby="skills-title"
        >
          {selected ? (
            <div className="skills-details__inner">
              <header className="skills-header">
                <h1
                  id="skills-title"
                  ref={detailsTitleRef}
                  tabIndex={-1}
                >
                  {selected.name}
                </h1>
                <p className="blurb">{selected.blurb}</p>
              </header>

              <div className="bubble-wrap">
                {selected.blocks.map((b) => (
                  <div key={b.title} className="bubble">
                    <h2>{b.title}</h2>
                    <ul>
                      {b.items.map((i) => <li key={i}>{i}</li>)}
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
