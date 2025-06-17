// src/hooks/useDraggable.js
import { useRef, useState, useEffect } from 'react';

export default function useDraggable(containerRef) {
  const elementRef = useRef(null);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    const el = elementRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    offset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setDragging(true);
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e) => {
      const container = containerRef.current;
      const el = elementRef.current;
      if (!container || !el) return;

      const containerRect = container.getBoundingClientRect();

      let newX = e.clientX - containerRect.left - offset.current.x;
      let newY = e.clientY - containerRect.top - offset.current.y;

      newX = Math.max(0, Math.min(newX, container.clientWidth - el.offsetWidth));
      newY = Math.max(0, Math.min(newY, container.clientHeight - el.offsetHeight));

      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, containerRef]);

  return {
    elementRef,
    position,
    dragging,
    handleMouseDown
  };
}
