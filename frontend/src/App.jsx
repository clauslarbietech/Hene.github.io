import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Gallery from "./pages/Gallery.jsx";
import Shell from "./components/Shell.jsx";
import site from "./data/site.json";

export default function App() {
  return (
    <Shell site={site}>
      <Routes>
        <Route path="/" element={<Home site={site} />} />
        <Route path="/:slug" element={<Gallery site={site} />} />
      </Routes>
    </Shell>
  );
}
