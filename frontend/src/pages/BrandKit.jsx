import { useState } from "react";
import { Link } from "react-router-dom";
import Lightbox from "../components/Lightbox.jsx";
import { asset } from "../asset.js";

export default function BrandKit({ site }) {
  const data = site.brandKit;
  const [lightbox, setLightbox] = useState(null);

  const open = (images, index) => {
    setLightbox({ images: images.map(asset), index, title: data.title });
  };

  return (
    <section className="page project-page">
      <header className="page__header">
        <p className="page__eyebrow">Portfolio</p>
        <h1 className="page__title">{data.title}</h1>
        <p className="page__desc">{data.subtitle}</p>
        <Link to="/portfolio" className="page__back">
          ← Portfolio
        </Link>
      </header>

      <div className="spec-strip">
        {data.specs.map((spec) => (
          <span key={spec}>{spec}</span>
        ))}
      </div>

      {data.sections.map((section) => (
        <div key={section.title} className="project-block">
          <h2 className="project-block__title">{section.title}</h2>
          <div className="reel">
            {section.images.map((src, i) => (
              <button
                key={src}
                type="button"
                className={`reel__frame reel__frame--${(i % 3) + 1}`}
                onClick={() => open(section.images, i)}
                aria-label={`Open ${section.title} image ${i + 1}`}
              >
                <img src={asset(src)} alt={`${section.title} ${i + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      ))}

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          title={lightbox.title}
          onClose={() => setLightbox(null)}
          onChange={(idx) => setLightbox((prev) => ({ ...prev, index: idx }))}
        />
      )}
    </section>
  );
}
