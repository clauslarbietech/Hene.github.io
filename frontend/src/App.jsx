import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import GalleryAll from "./pages/GalleryAll.jsx";
import About from "./pages/About.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import BrandKit from "./pages/BrandKit.jsx";
import DodMarketing from "./pages/DodMarketing.jsx";
import Contact from "./pages/Contact.jsx";
import Shell from "./components/Shell.jsx";
import site from "./data/site.json";

export default function App() {
  return (
    <Shell site={site}>
      <Routes>
        <Route path="/" element={<Home site={site} />} />
        <Route path="/gallery" element={<GalleryAll site={site} />} />
        <Route path="/about" element={<About site={site} />} />
        <Route path="/portfolio" element={<Portfolio site={site} />} />
        <Route path="/brand-kit" element={<BrandKit site={site} />} />
        <Route path="/dod-marketing" element={<DodMarketing site={site} />} />
        <Route path="/contact" element={<Contact site={site} />} />
        <Route path="/:slug" element={<Gallery site={site} />} />
      </Routes>
    </Shell>
  );
}
