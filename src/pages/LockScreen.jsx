// src/components/LockScreen.jsx
import { useRef, useState, useEffect } from "react";
import logo from "./../assets/logo2.png";
import unlockSound from "./../assets/unlock-sound.wav";

const LockScreen = ({ onUnlock }) => {
  const [dragX, setDragX] = useState(0);
  const trackRef = useRef(null);
  const dragging = useRef(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(unlockSound);
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
    audio.play().catch(() => {
      // ignore autoplay errors
    });
  };

  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const handleStart = (e) => {
    e.preventDefault();

    dragging.current = true;
  };

  const handleMove = (e) => {
    if (!dragging.current || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = getClientX(e) - rect.left;
    const knobWidth = 60; // same as CSS height-ish

    const clamped = Math.max(
      0,
      Math.min(x - knobWidth / 2, rect.width - knobWidth)
    );
    setDragX(clamped);
  };

  const handleEnd = () => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const knobWidth = 44;
    const threshold = rect.width * 0.6;

    if (dragX + knobWidth >= threshold) {
      setDragX(rect.width - knobWidth);
      playUnlockSound();
      if (onUnlock) onUnlock();
    } else {
      setDragX(0);
    }

    dragging.current = false;
  };

  return (
    <div className="lock-screen">
      <div className="lock-content">
        <div className="lock-time">1:00am</div>
        <img src={logo} alt="SW logo" className="lock-logo" />
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
