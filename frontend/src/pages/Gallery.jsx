import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Lightbox from "../components/Lightbox.jsx";

export default function Gallery({ site, slug: slugProp }) {
  const { slug: slugParam } = useParams();
  const slug = slugProp || slugParam;
  const gallery = useMemo(
    () => (site.galleries || []).find((g) => g.slug === slug),
    [site, slug]
  );
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!gallery) {
    return (
      <section className="page">
        <p>Series not found.</p>
        <Link to="/">Back home</Link>
      </section>
    );
  }

  return (
    <section className="page gallery-page">
      <header className="page__header">
        <p className="page__eyebrow">Series</p>
        <h1 className="page__title">{gallery.title}</h1>
        <p className="page__desc">{gallery.description}</p>
      </header>

      <div className="mosaic">
        {gallery.images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            className={`mosaic__item mosaic__item--${(i % 5) + 1}`}
            onClick={() => setLightboxIndex(i)}
          >
            <img src={src} alt={`${gallery.title} ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={gallery.images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
          title={gallery.title}
        />
      )}
    </section>
  );
}
