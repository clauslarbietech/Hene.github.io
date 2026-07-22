import { Link } from "react-router-dom";
import { asset } from "../asset.js";

export default function Home({ site }) {
  const covers = site.covers || [];
  const { brand, tagline } = site.site;

  return (
    <section className="home">
      <div className="home__intro">
        <h1 className="home__brand">{brand}</h1>
        <p className="home__tagline">{tagline}</p>
      </div>

      <div className="home__grid" role="list">
        {covers.map((cover, i) => (
          <Link
            key={cover.id}
            to={`/${cover.slug}`}
            className="cover"
            role="listitem"
            style={{ animationDelay: `${0.08 + i * 0.07}s` }}
          >
            <span className="cover__media" aria-hidden="true">
              <img
                src={asset(cover.image)}
                alt=""
                className="cover__image"
                loading={i < 2 ? "eager" : "lazy"}
              />
            </span>
            <span className="cover__meta">
              <span className="cover__title">{cover.title}</span>
              <span className="cover__subtitle">{cover.subtitle}</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
