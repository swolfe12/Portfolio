// src/components/LockScreen.tsx
import { useRef, useState, useEffect } from "react";
import type {
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react";

function getFormattedTime() {
  return new Date().toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

type LockScreenProps = {
  onUnlock?: () => void;
};

type DragEvent =
  | ReactMouseEvent<HTMLDivElement | HTMLButtonElement>
  | ReactTouchEvent<HTMLDivElement | HTMLButtonElement>;

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [dragX, setDragX] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [time, setTime] = useState(getFormattedTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const audio = new Audio("/assets/unlock-sound.wav");
    audioRef.current = audio;
    audio.load();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playUnlockSound = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const getClientX = (e: DragEvent) => {
    if ("touches" in e && e.touches.length > 0) {
      return e.touches[0].clientX;
    }
    return (e as ReactMouseEvent<HTMLDivElement | HTMLButtonElement>)
      .clientX;
  };

  const handleStart = (e: DragEvent) => {
    e.preventDefault();
    dragging.current = true;
  };

  const handleMove = (e: DragEvent) => {
    if (!dragging.current || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const knobWidth = 35;
    const x = getClientX(e) - rect.left - knobWidth / 2;
    const clamped = Math.max(0, Math.min(x, rect.width - knobWidth));
    setDragX(clamped);
  };

  const handleEnd = () => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const knobWidth = 70;
    const threshold = rect.width * 0.8;

    if (dragX + knobWidth >= threshold) {
      setDragX(rect.width - 18);
      playUnlockSound();
      if (onUnlock) {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(
          navigator.userAgent || ""
        );
        const delay = isMobile ? 450 : 200;
        setTimeout(() => {
          onUnlock();
        }, delay);
      } else {
        setDragX(0);
      }
    }
    dragging.current = false;
  };

  return (
    <div className="lock-screen">
      <div className="lock-content">
        <div className="lock-time">{time}</div>
        <img src="/assets/logo2.png" alt="SW logo" className="lock-logo" />
      </div>

      <div
        className="lock-slider-track"
        ref={trackRef}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <span className="lock-slider-text">slide to unlock</span>
        <button
          className="lock-slider-knob"
          style={{ transform: `translateX(${dragX}px)` }}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
        >
          ▸
        </button>
      </div>
    </div>
  );
};

export default LockScreen;
