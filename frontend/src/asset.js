/** Resolve a public asset path against Vite `base` (needed for GitHub Pages). */
export function asset(path) {
  const clean = String(path || "").replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${clean}`;
}
