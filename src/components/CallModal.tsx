// src/components/CallModal.tsx
import React, { useEffect, useRef } from "react";
import { useCallModal } from "../context/CallModalContext";

export default function CallModal() {
  const { isOpen, closeCall } = useCallModal();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previousActive = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCall();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previousActive?.focus();
    };
  }, [isOpen, closeCall]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="presentation" onClick={closeCall}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="call-modal-title"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        ref={dialogRef}
      >
        <h2 id="call-modal-title">Incoming Call</h2>
        <p>Connecting you to Sam’s fake portfolio hotline… 📞</p>
        <div className="modal__actions">
          <button type="button" className="basic-btn" onClick={closeCall}>
            Hang Up
          </button>
        </div>
      </div>
    </div>
  );
}
