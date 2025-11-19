// src/components/LockScreen.jsx
import { useRef, useState, useEffect } from "react";
import logo from "./../assets/logo2.png";
import unlockSound from "./../assets/unlock-sound.wav";

function getFormattedTime() {
  return new Date().toLocaleTimeString([], {
    hour: "numeric", // ← no more leading zero
    minute: "2-digit", // minutes can stay padded
  });
}

const LockScreen = ({ onUnlock }) => {
  const [dragX, setDragX] = useState(0);
  const trackRef = useRef(null);
  const dragging = useRef(false);
  const audioRef = useRef(null);

  const [time, setTime] = useState(getFormattedTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    audio.play().catch(() => {});
  };

  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const handleStart = (e) => {
    e.preventDefault();
    dragging.current = true;
  };

  const handleMove = (e) => {
    if (!dragging.current || !trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();

    const knobWidth = 35;
    const x = getClientX(e) - rect.left - knobWidth / 2;
    const clamped = x;
    //const clamped = Math.max(0, Math.min(x, rect.width - knobWidth));
    setDragX(clamped);
  };

  const handleEnd = () => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    console.log("width: " + rect.width);
    const knobWidth = 70;
    const threshold = rect.width * 1.0;
    console.log("threshold: " + threshold);

    if (dragX + knobWidth >= threshold) {
      setDragX(rect.width);
      playUnlockSound();
      //console.log("dragX + knobWidth: " + dragX + knobWidth);
      if (onUnlock) {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(
          navigator.userAgent || ""
        );

        const delay = isMobile ? 450 : 200; // mobile needs more time to actually output the audio

        setTimeout(() => {
          onUnlock();
        }, delay);
      } else {
        setDragX(0);
      }

      dragging.current = false;
    }
  };

  return (
    <div className="lock-screen">
      <div className="lock-content">
        <div className="lock-time">{time}</div>
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
