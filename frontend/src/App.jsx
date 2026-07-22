import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import Shell from "./components/Shell.jsx";

export default function App() {
  const [site, setSite] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/site")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load site");
        return r.json();
      })
      .then(setSite)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="boot-error">
        <p>Could not reach the Hene API.</p>
        <p className="boot-error__hint">
          Run <code>python backend/app.py</code> then <code>npm run dev</code> in{" "}
          <code>frontend</code>.
        </p>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="boot-loader" aria-busy="true">
        <span className="boot-loader__mark">Hene</span>
      </div>
    );
  }

  return (
    <Shell site={site}>
      <Routes>
        <Route path="/" element={<Home site={site} />} />
        <Route path="/gallery" element={<Gallery site={site} slug="gallery" />} />
        <Route path="/:slug" element={<Gallery site={site} />} />
      </Routes>
    </Shell>
  );
}
