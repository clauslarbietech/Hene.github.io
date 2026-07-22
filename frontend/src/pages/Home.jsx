import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

export default function Home({ site }) {
  const covers = site.covers || [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % covers.length);
  }, [covers.length]);

  useEffect(() => {
    if (paused || covers.length < 2) return undefined;
    const id = setInterval(next, 5200);
    return () => clearInterval(id);
  }, [paused, next, covers.length]);

  if (!covers.length) return null;

  const current = covers[active];

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero__stage">
        {covers.map((cover, i) => (
          <div
            key={cover.id}
            className={`hero__slide ${i === active ? "is-active" : ""}`}
            aria-hidden={i !== active}
          >
            <img src={cover.image} alt="" className="hero__image" />
          </div>
        ))}
        <div className="hero__veil" />
      </div>

      <div className="hero__content">
        <p className="hero__brand">{site.site.brand}</p>
        <h1 className="hero__title">{current.title}</h1>
        <p className="hero__tagline">{site.site.tagline}</p>
        <div className="hero__cta">
          <Link to={`/${current.slug}`} className="btn btn--light">
            View series
          </Link>
          <Link to="/gallery" className="btn btn--ghost">
            Full gallery
          </Link>
        </div>
      </div>

      <div className="hero__rail" role="tablist" aria-label="Series">
        {covers.map((cover, i) => (
          <button
            key={cover.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`hero__dot ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="hero__dot-label">{cover.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
