import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { asset } from "../asset.js";

export default function Home({ site }) {
  const covers = site.covers || [];
  const { brand, tagline } = site.site;
  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);
  const total = covers.length + 1; // intro + series screens

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return undefined;

    const screens = [...root.querySelectorAll("[data-screen]")];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = Number(visible.target.getAttribute("data-screen"));
        if (!Number.isNaN(idx)) setActive(idx);
      },
      { root, threshold: [0.55, 0.7] }
    );

    screens.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [covers.length]);

  const goTo = (idx) => {
    const root = scrollerRef.current;
    if (!root) return;
    const el = root.querySelector(`[data-screen="${idx}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const heroImage = covers[0]?.image;

  return (
    <div className="flow">
      <div className="flow__scroller" ref={scrollerRef}>
        <section className="screen screen--intro" data-screen="0">
          {heroImage && (
            <img
              src={asset(heroImage)}
              alt=""
              className="screen__bg"
              fetchPriority="high"
            />
          )}
          <div className="screen__veil screen__veil--intro" />
          <div className="screen__content screen__content--intro">
            <p className="screen__kicker">Photography · UX · Portfolio</p>
            <h1 className="screen__brand">{brand}</h1>
            <p className="screen__lede">{tagline}</p>
            <button
              type="button"
              className="screen__scroll"
              onClick={() => goTo(1)}
            >
              Enter work
              <span aria-hidden="true">↓</span>
            </button>
          </div>
        </section>

        {covers.map((cover, i) => (
          <section
            key={cover.id}
            className="screen screen--series"
            data-screen={i + 1}
          >
            <img
              src={asset(cover.image)}
              alt=""
              className="screen__bg"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="screen__veil" />
            <div className="screen__content">
              <p className="screen__index">
                {String(i + 1).padStart(2, "0")} / {String(covers.length).padStart(2, "0")}
              </p>
              <h2 className="screen__title">{cover.title}</h2>
              <p className="screen__subtitle">{cover.subtitle}</p>
              <Link to={`/${cover.slug}`} className="screen__cta">
                View series
              </Link>
            </div>
          </section>
        ))}
      </div>

      <nav className="flow__dots" aria-label="Screens">
        {Array.from({ length: total }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`flow__dot ${active === i ? "is-active" : ""}`}
            aria-label={i === 0 ? "Intro" : covers[i - 1]?.title}
            aria-current={active === i ? "true" : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </nav>
    </div>
  );
}
