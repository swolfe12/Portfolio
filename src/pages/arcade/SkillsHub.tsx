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
  { id: "agile", label: "Agile", img: glasses },
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
  const [selectedId, setSelectedId] = useState<CatId | null>(null);

  const selected: Cat | null = selectedId
    ? SKILL_DATA[selectedId] ?? null
    : null;

  const detailsRegionId = useId();
  const detailsTitleRef = useRef<HTMLHeadingElement | null>(null);
  const detailsSectionRef = useRef<HTMLElement | null>(null);

  // 👇 scroll container for this page
  const hubRef = useRef<HTMLDivElement | null>(null);

  // 👇 ref to the react-slick instance so we can call slickGoTo
  const sliderRef = useRef<any>(null);

  // track when selection originated from Home/about-links
  const fromHomeRef = useRef(false);

  const { search } = useLocation();

  const goToCategorySlide = (id: CatId | null) => {
    if (!id || !sliderRef.current) return;
    const index = CATEGORIES.findIndex((c) => c.id === id);
    console.log(index);
    if (index >= 0) {
      sliderRef.current.slickGoTo(index, true);
    }
  };

  // Always start at the *top* of the SkillsHub container (or window fallback)
  useEffect(() => {
    if (hubRef.current) {
      console.log(hubRef.current);
      hubRef.current.scrollTo({ top: -100, left: 0, behavior: "auto" });
    } else {
      window.scrollTo({ top: -100, left: 0, behavior: "auto" });
    }
  }, []);

  // Handle pending skill coming from Arcade (window.__SW_PENDING_SKILL)
  useEffect(() => {
    const pending = (window as any).__SW_PENDING_SKILL as string | undefined;
    if (pending) {
      const id = pending.toLowerCase() as CatId;
      fromHomeRef.current = true;
      setSelectedId(id);
      goToCategorySlide(id);
      (window as any).__SW_PENDING_SKILL = undefined;
    }
  }, []);

  // Support URL query ?cat=frontend, etc. (optional: also align slider)
  useEffect(() => {
    const params = new URLSearchParams(search);
    const urlCat = (params.get("cat") || "").toLowerCase() as CatId | "";

    if (!urlCat) return;

    setSelectedId((prev) => (urlCat === prev ? prev : urlCat));
    // treat deep-link similarly to coming from home, so slider centers correctly
    goToCategorySlide(urlCat);
  }, [search]);

  // Listen for custom "skills:select" events fired from Home (Arcade)
  useEffect(() => {
    const onSelect = (e: Event) => {
      const cat = (e as CustomEvent).detail as string | undefined;
      if (!cat) return;
      const next = cat.toLowerCase() as CatId;

      fromHomeRef.current = true;
      setSelectedId((prev) => {
        if (next !== prev) {
          goToCategorySlide(next);
        }
        return next === prev ? prev : next;
      });
    };

    window.addEventListener("skills:select", onSelect as EventListener);
    return () =>
      window.removeEventListener("skills:select", onSelect as EventListener);
  }, []);

  // When a category is selected, focus the header,
  // then smooth-scroll the .skills-hub container to the details section
  useEffect(() => {
    if (!selected || !detailsSectionRef.current || !hubRef.current) return;

    const headingEl = detailsTitleRef.current;
    const container = hubRef.current;
    const target = detailsSectionRef.current;

    if (headingEl) {
      try {
        (headingEl as any).focus({ preventScroll: true });
      } catch {
        headingEl.focus();
      }
    }

    const timer = window.setTimeout(() => {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const offset =
        targetRect.top - containerRect.top + container.scrollTop - 30;

      container.scrollTo({
        top: offset,
        left: 0,
        behavior: "smooth",
      });
    }, 200);

    return () => window.clearTimeout(timer);
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
      isCurrent: !selectedId,
    },
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
    <div className="skills-hub" aria-labelledby="skills-title" ref={hubRef}>
      <div className="nav-layer">
        <NavBar onNavigate={onNavigate} />
      </div>

      <Breadcrumbs onNavigate={onNavigate} items={breadcrumbItems} />

      <div className="game-box">
        <div className="section-header">Skills</div>

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
            ref={sliderRef}
          >
            {CATEGORIES.map((c, index) => (
              <div key={c.id} className="skills-card">
                <h2 className="sr-only">{c.label}</h2>
                <button
                  type="button"
                  className={`skills-card__link ${
                    selectedId === c.id ? "is-active" : ""
                  }`}
                  onClick={() => {
                    // Clicking inside SkillsHub should also align the slider + select
                    setSelectedId(c.id);
                    goToCategorySlide(c.id);
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
          ref={detailsSectionRef}
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
              {selected.certImg && (
                <section
                  className="skills-cert"
                  aria-label={`${selected.name} certification`}
                >
                  <h2>{selected.certAlt}</h2>
                  <img
                    src={selected.certImg}
                    alt={selected.certAlt ?? `${selected.name} certification`}
                    height={300}
                  />
                </section>
              )}
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
