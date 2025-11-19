// src/pages/arcade/SkillsHub.tsx
import { useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar.tsx";
import Breadcrumbs from "../../components/Breadcrumbs.tsx";
import { SKILL_DATA, Cat } from "./skillsData.ts";
import avatarBase from "../../assets/avatar3.webp";
import room from "../../assets/room.png";
import fhat from "../../assets/fhat.png";
import bhat from "../../assets/bhat.png";
import headphones from "../../assets/plainheadphones.png";
import flower from "../../assets/flower.png";
import glasses from "../../assets/blackglasses.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CATEGORIES = [
  { id: "frontend", label: "Front-End", img: fhat },
  { id: "backend", label: "Back-End", img: bhat },
  { id: "accessibility", label: "Accessibility", img: headphones },
  { id: "cms", label: "CMS", img: flower },
  { id: "uiux", label: "UI/UX", img: glasses },
] as const;

const isMobile = window.innerWidth < 767;

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: isMobile ? 1 : 1.5,
  slidesToScroll: 1,
  infinite: true,
  vertical: !isMobile,
  focusOnSelect: true,
  swipeToSlide: true,
  centerMode: true,
  responsive: [
    { breakpoint: 900, settings: { slidesToShow: 2, vertical: true } },
  ],
};

type CatId = (typeof CATEGORIES)[number]["id"];

type SkillsHubProps = {
  onNavigate?: (pageId: string) => void;
};

export default function SkillsHub({ onNavigate }: SkillsHubProps) {
  const [selectedId, setSelectedId] = useState<CatId | null>(() => {
    const pending = (window as any).__SW_PENDING_SKILL as string | undefined;
    return (pending as CatId) || null;
  });

  useEffect(() => {
    const pending = (window as any).__SW_PENDING_SKILL as string | undefined;
    if (pending) {
      setSelectedId(pending as CatId);
      (window as any).__SW_PENDING_SKILL = undefined;
    }
  }, []);

  const selected: Cat | null = selectedId
    ? SKILL_DATA[selectedId] ?? null
    : null;

  const detailsRegionId = useId();
  const detailsTitleRef = useRef<HTMLHeadingElement | null>(null);

  const { search } = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const urlCat = (params.get("cat") || "").toLowerCase();

    if (!urlCat) return;

    setSelectedId((prev) => (urlCat === prev ? prev : (urlCat as CatId)));
  }, [search]);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const cat = (e as CustomEvent).detail as string | undefined;
      if (!cat) return;
      const next = cat.toLowerCase() as CatId;
      if (next !== selectedId) setSelectedId(next);
    };
    window.addEventListener("skills:select", onSelect as EventListener);
    return () =>
      window.removeEventListener("skills:select", onSelect as EventListener);
  }, [selectedId]);

  useEffect(() => {
    if (selected && detailsTitleRef.current) {
      detailsTitleRef.current.focus();
    }
  }, [selected]);

  // 🔹 Build breadcrumb items with optional category-level crumb
  const categoryMeta = selectedId
    ? CATEGORIES.find((c) => c.id === selectedId)
    : undefined;

  const categoryLabel =
    categoryMeta?.label || selected?.name || selectedId || "";

  const breadcrumbItems = [
    { id: "home" as const, label: "Home" },
    {
      id: "skills" as const,
      label: "Skills",
      // Skills is "current" only when no specific category is selected
      isCurrent: !selectedId,
    },
    // Add category-level crumb when a category is selected
    ...(selectedId && categoryLabel
      ? [
          {
            id: `skills/${selectedId}`,
            label: categoryLabel,
            isCurrent: true,
          },
        ]
      : []),
  ];

  return (
    <div className="skills-hub" aria-labelledby="skills-title">
      <div className="nav-layer">
        <NavBar onNavigate={onNavigate} />
      </div>

      <Breadcrumbs onNavigate={onNavigate} items={breadcrumbItems} />

      <div className="game-box">
        <div className="section-header"></div>

        <div className="dressup">
          <div
            className="dressup-avatar"
            style={{ backgroundImage: `url(${room})` }}
          >
            <img
              src={selected?.img ?? avatarBase}
              alt="Sam's avatar"
              className="dressup-avatar__img"
            />
          </div>

          <Slider
            {...settings}
            className="skills-carousel"
            aria-label="Skill categories"
          >
            {CATEGORIES.map((c) => (
              <div key={c.id} className="skills-card">
                <h2 className="sr-only">{c.label}</h2>
                <button
                  type="button"
                  className={`skills-card__link ${
                    selectedId === c.id ? "is-active" : ""
                  }`}
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
                    width={100}
                    height={100}
                    className="skills-card__img"
                  />
                  <span>{c.label}</span>
                </button>
              </div>
            ))}
          </Slider>
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
