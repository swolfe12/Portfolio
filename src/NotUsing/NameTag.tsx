import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";


type NameTagProps = {
  titles?: string[];
  accent?: string;
  width?: number | string;
  height?: number | string;
  slideMs?: number;
  pauseMs?: number;
  className?: string;
};

const DEFAULT_TITLES = [
  "Software Engineer",
  "Web Developer",
  "UI/UX Engineer",
  "Front-End Dev",
  "Full-Stack Coder",
];

export default function NameTag({
  titles = DEFAULT_TITLES,
  accent = "#1e9bf0",
  width = 520,
  height = 340,
  slideMs = 600,
  pauseMs = 1600,
  className,
}: NameTagProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const liveRef = useRef<HTMLSpanElement | null>(null);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const stepMs = slideMs + pauseMs;

  // Duplicate first item for a seamless-looking loop
  const items = useMemo(() => [...titles, titles[0]], [titles]);

  // ---- Stable callbacks ----
  const stepNext = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  const togglePause = useCallback(() => {
    setPaused((p) => !p);
  }, []);

  // ---- Auto-rotate interval ----
  useEffect(() => {
    if (prefersReduced || paused) return;
    const id = setInterval(stepNext, stepMs);
    return () => clearInterval(id);
  }, [prefersReduced, paused, stepMs, stepNext]);

  // ---- Update SR live text (don’t announce the duplicated last item) ----
  useEffect(() => {
    if (!liveRef.current) return;
    const realIdx = index % titles.length;
    liveRef.current.textContent = titles[realIdx];
  }, [index, titles]);

  // Inline CSS vars + current transform
  const style = {
    "--nt-accent": accent,
    "--nt-w": typeof width === "number" ? `${width}px` : width,
    "--nt-h": typeof height === "number" ? `${height}px` : height,
    "--nt-slide-ms": `${slideMs}ms`,
    "--nt-pause-ms": `${pauseMs}ms`,
    transform: `translateY(calc(${index} * -1 * var(--nt-line-h)))`,
  } as React.CSSProperties;

  return (
    <section
      className={`name-tag ${className ?? ""}`}
      style={{
        width: style["--nt-w"] as string,
        height: style["--nt-h"] as string,
      }}
      aria-label="Hello name tag"
    >
      {/* Top bar */}
      <header className="nt-top" style={{ backgroundColor: "var(--nt-accent)" }}>
        <div className="nt-hello" aria-hidden>
          HELLO
        </div>
        <div className="nt-im">I’M A…</div>
      </header>

      {/* Body */}
      <div className="nt-body" role="group" aria-label="Rotating titles">
        <div
          className={`nt-window ${paused ? "is-paused" : ""}`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ul className="nt-track" style={style} aria-hidden>
            {items.map((t, i) => (
              <li className="nt-item" key={`${t}-${i}`}>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="nt-controls">
          <button
            type="button"
            className="nt-btn"
            onClick={togglePause}
            aria-pressed={paused}
          >
            {paused ? "Resume" : "Pause"}
          </button>
          <button type="button" className="nt-btn" onClick={stepNext}>
            Next
          </button>
        </div>

        {/* Screen reader live region */}
        <span className="sr-only" aria-live="polite" ref={liveRef} />
      </div>
    </section>
  );
}
