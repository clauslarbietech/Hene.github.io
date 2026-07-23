import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Lightbox from "../components/Lightbox.jsx";
import { asset } from "../asset.js";

export default function GalleryAll({ site }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = useMemo(() => {
    const seen = new Set();
    const all = [];
    (site.galleries || []).forEach((gallery) => {
      (gallery.images || []).forEach((src) => {
        if (seen.has(src)) return;
        seen.add(src);
        all.push({ src: asset(src), series: gallery.title });
      });
    });
    return all;
  }, [site]);

  const sources = images.map((image) => image.src);

  return (
    <section className="page gallery-page gallery-all">
      <header className="page__header">
        <p className="page__eyebrow">Gallery</p>
        <h1 className="page__title">Gallery</h1>
        <p className="page__desc">
          Every frame across Beauty, Mood Board, Journey, and Just Create.
        </p>
        <Link to="/" className="page__back">
          ← All work
        </Link>
      </header>

      <div className="reel">
        {images.map((image, i) => (
          <button
            key={image.src + i}
            type="button"
            className={`reel__frame reel__frame--${(i % 3) + 1}`}
            onClick={() => setLightboxIndex(i)}
            aria-label={`Open ${image.series} image ${i + 1}`}
          >
            <img src={image.src} alt={`${image.series} ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={sources}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
          title="Gallery"
        />
      )}
    </section>
  );
}
