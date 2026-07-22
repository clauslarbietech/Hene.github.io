import { Link, NavLink } from "react-router-dom";

export default function Shell({ site, children }) {
  const { brand, email, linkedin } = site.site;

  return (
    <div className="shell">
      <header className="topbar">
        <Link to="/" className="topbar__brand" aria-label={`${brand} home`}>
          {brand}
        </Link>
        <nav className="topbar__nav" aria-label="Primary">
          <NavLink to="/gallery">Gallery</NavLink>
          {site.covers.map((c) => (
            <NavLink key={c.slug} to={`/${c.slug}`}>
              {c.title}
            </NavLink>
          ))}
        </nav>
        <div className="topbar__social">
          <a href={linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            in
          </a>
          <a href={`mailto:${email}`} aria-label="Email">
            @
          </a>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <span>{brand}</span>
        <a href={`mailto:${email}`}>{email}</a>
      </footer>
    </div>
  );
}
