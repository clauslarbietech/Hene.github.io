import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Shell({ site, children }) {
  const { brand, email, linkedin } = site.site;
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "";
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className={`shell ${isHome ? "shell--flow" : ""}`}>
      <header
        className={`topbar ${isHome ? "topbar--over" : ""} ${
          menuOpen ? "topbar--open" : ""
        }`}
      >
        <Link to="/" className="topbar__brand" aria-label={`${brand} home`}>
          {brand}
        </Link>

        <button
          type="button"
          className="topbar__toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="topbar__toggle-bar" />
          <span className="topbar__toggle-bar" />
          <span className="topbar__toggle-bar" />
        </button>

        <nav
          id="primary-nav"
          className={`topbar__nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary"
        >
          {(site.nav || []).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="topbar__nav-social">
            <a href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={`mailto:${email}`}>Email</a>
          </div>
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
