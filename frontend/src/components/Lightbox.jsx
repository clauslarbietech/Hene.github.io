import { useEffect, useRef, useCallback } from "react";

export default function Lightbox({ images, index, onClose, onChange, title }) {
  const closeRef = useRef(null);
  const touchStartX = useRef(null);

  const prev = useCallback(() => {
    onChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onChange]);

  const next = useCallback(() => {
    onChange((index + 1) % images.length);
  }, [index, images.length, onChange]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 48) return;
    if (dx < 0) next();
    else prev();
  };

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <button
        ref={closeRef}
        type="button"
        className="lightbox__close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        Close
      </button>
      <button
        type="button"
        className="lightbox__nav lightbox__nav--prev"
        onClick={prev}
        aria-label="Previous image"
      >
        Prev
      </button>
      <div className="lightbox__stage" key={images[index]}>
        <img
          src={images[index]}
          alt={`${title} ${index + 1} of ${images.length}`}
          className="lightbox__image"
        />
      </div>
      <button
        type="button"
        className="lightbox__nav lightbox__nav--next"
        onClick={next}
        aria-label="Next image"
      >
        Next
      </button>
      <p className="lightbox__meta" aria-live="polite">
        {title} — {index + 1} / {images.length}
      </p>
    </div>
  );
}
