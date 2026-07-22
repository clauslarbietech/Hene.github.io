import { Link, NavLink, useLocation } from "react-router-dom";

export default function Shell({ site, children }) {
  const { brand, email, linkedin } = site.site;
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "";

  return (
    <div className={`shell ${isHome ? "shell--flow" : ""}`}>
      <header className={`topbar ${isHome ? "topbar--over" : ""}`}>
        <Link to="/" className="topbar__brand" aria-label={`${brand} home`}>
          {brand}
        </Link>
        <nav className="topbar__nav" aria-label="Primary">
          {(site.nav || []).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {item.label}
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
      {!isHome && (
        <footer className="footer">
          <span>{brand}</span>
          <a href={`mailto:${email}`}>{email}</a>
        </footer>
      )}
    </div>
  );
}
