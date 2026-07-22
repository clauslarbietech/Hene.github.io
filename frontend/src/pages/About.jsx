import { Link } from "react-router-dom";
import { asset } from "../asset.js";

export default function About({ site }) {
  const about = site.about;
  const { name, email, linkedin } = site.site;

  return (
    <section className="page about-page">
      <div className="about">
        <div className="about__media">
          <img
            src={asset(about.portrait)}
            alt={name}
            className="about__portrait"
          />
        </div>
        <div className="about__copy">
          <p className="page__eyebrow">About</p>
          <h1 className="page__title">{about.title}</h1>
          <p className="about__name">{name}</p>
          <p className="about__intro">{about.intro}</p>

          <ul className="about__focus">
            {about.focus.map((item) => (
              <li key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>

          <p className="about__body">{about.clients}</p>
          <p className="about__body">{about.personal}</p>

          <div className="about__cta">
            <p className="about__touch">Let’s stay in touch</p>
            <a href={`mailto:${email}`}>{email}</a>
            <a href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <Link to="/portfolio" className="screen__cta">
              View portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
