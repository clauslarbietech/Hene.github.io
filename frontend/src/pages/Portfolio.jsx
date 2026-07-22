import { Link } from "react-router-dom";
import { asset } from "../asset.js";

export default function Portfolio({ site }) {
  const { title, subtitle, cards } = site.portfolio;

  return (
    <section className="page portfolio-page">
      <header className="page__header">
        <p className="page__eyebrow">Selected work</p>
        <h1 className="page__title">{title}</h1>
        <p className="page__desc">{subtitle}</p>
      </header>

      <div className="work-cards">
        {cards.map((card, i) => {
          const inner = (
            <>
              <span className="work-card__media">
                <img
                  src={asset(card.image)}
                  alt=""
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </span>
              <span className="work-card__meta">
                <span className="work-card__index">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="work-card__title">{card.title}</span>
                <span className="work-card__subtitle">{card.subtitle}</span>
                <span className="work-card__action">
                  {card.external ? "Open case study →" : "View project →"}
                </span>
              </span>
            </>
          );

          if (card.external) {
            return (
              <a
                key={card.id}
                href={card.href}
                className="work-card"
                target="_blank"
                rel="noreferrer"
              >
                {inner}
              </a>
            );
          }

          return (
            <Link key={card.id} to={card.href} className="work-card">
              {inner}
            </Link>
          );
        })}
      </div>

      <div className="portfolio-photo">
        <p className="page__eyebrow">Photography series</p>
        <div className="portfolio-photo__row">
          {site.covers.map((c) => (
            <Link key={c.slug} to={`/${c.slug}`} className="portfolio-photo__link">
              {c.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
