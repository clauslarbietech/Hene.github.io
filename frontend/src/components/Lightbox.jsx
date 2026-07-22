import { useEffect } from "react";

export default function Lightbox({ images, index, onClose, onChange, title }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onChange((index + 1) % images.length);
      if (e.key === "ArrowLeft")
        onChange((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, images.length, onClose, onChange]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" className="lightbox__close" onClick={onClose}>
        Close
      </button>
      <button
        type="button"
        className="lightbox__nav lightbox__nav--prev"
        onClick={() => onChange((index - 1 + images.length) % images.length)}
      >
        Prev
      </button>
      <img src={images[index]} alt="" className="lightbox__image" />
      <button
        type="button"
        className="lightbox__nav lightbox__nav--next"
        onClick={() => onChange((index + 1) % images.length)}
      >
        Next
      </button>
      <p className="lightbox__meta">
        {title} — {index + 1} / {images.length}
      </p>
    </div>
  );
}
