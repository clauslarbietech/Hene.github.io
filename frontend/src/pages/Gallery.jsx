import { useMemo, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Lightbox from "../components/Lightbox.jsx";
import { asset } from "../asset.js";

export default function Gallery({ site }) {
  const { slug } = useParams();
  const gallery = useMemo(
    () => (site.galleries || []).find((g) => g.slug === slug),
    [site, slug]
  );
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    setLightboxIndex(null);
  }, [slug]);

  if (!gallery) {
    return (
      <section className="page page--missing">
        <p className="page__eyebrow">404</p>
        <h1 className="page__title">Series not found</h1>
        <Link to="/" className="page__back">
          Back home
        </Link>
      </section>
    );
  }

  const images = gallery.images.map((src) => asset(src));

  return (
    <section className="page gallery-page">
      <header className="page__header">
        <p className="page__eyebrow">Series</p>
        <h1 className="page__title">{gallery.title}</h1>
        <p className="page__desc">{gallery.description}</p>
        <Link to="/" className="page__back">
          All series
        </Link>
      </header>

      <div className="mosaic">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            className="mosaic__item"
            onClick={() => setLightboxIndex(i)}
            aria-label={`Open ${gallery.title} image ${i + 1}`}
          >
            <img src={src} alt={`${gallery.title} ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
          title={gallery.title}
        />
      )}
    </section>
  );
}
