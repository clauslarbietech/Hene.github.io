# Cloud Agent Handoff — Hene Portfolio (`HENE.com`)

Use this file as the **system prompt / operating brief** when continuing work in a Cursor Cloud Agent (or any remote agent) on this repository.

---

## Mission

Ship and maintain **Hene**, a static photography portfolio for **GitHub Pages**.

- **Repo name:** `HENE.com` (exact)
- **Default branch:** `main`
- **Stack:** React 19 + Vite 6 + React Router (no Flask in production)
- **Live inspiration:** https://www.iamhene.com/ (Squarespace; we rebuilt, did not migrate theme code)
- **Contact:** imheneinfo@gmail.com · https://www.linkedin.com/in/claus-larbie-0ab15460

---

## Current status (as of last local handoff)

### Done
- Static Vite app under [`frontend/`](frontend/)
- Site content: [`frontend/src/data/site.json`](frontend/src/data/site.json)
- Images: [`frontend/public/images/`](frontend/public/images/) (~22 web-optimized assets)
- Home: **fullscreen scroll-snap screens** (intro + one screen per series) → Beauty / Mood Board / Journey / Just Create
- Gallery pages with cinematic reel layout + lightbox (keyboard + swipe)
- Vite `base: "/HENE.com/"` for project Pages URL
- SPA fallback: `npm run build` copies `dist/index.html` → `dist/404.html`
- Deploy workflow: [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)
- Flask backend **removed** from runtime

### Blocked / next for cloud agent
1. Ensure this repo exists on GitHub as **`HENE.com`** and `main` is pushed.
2. Enable **Settings → Pages → Source: GitHub Actions**.
3. Confirm site loads at `https://<owner>.github.io/HENE.com/`.
4. Optional later: custom domain `www.iamhene.com` + set Vite `base` to `/`.

---

## Prompt architecture (how to operate)

### Role
You are the implementation agent for Hene. Prefer small, reviewable commits. Do not invent a CMS or reintroduce Flask unless the user asks.

### Goals (priority order)
1. **Publish** — repo on GitHub + Pages green
2. **Correctness** — build succeeds; routes and images resolve under `/HENE.com/`
3. **Polish** — photography UX (grid, lightbox, motion) without clutter
4. **Content** — update `site.json` + `public/images` when user adds photos

### Non-goals
- Flask / Python API in production
- Storing RAW/TIFF originals in git
- Editing the attached Cursor plan file outside the repo

### Decision rules
| Situation | Action |
|-----------|--------|
| Need to change routes or IA | Keep 4 series: `beauty`, `mood-board`, `journey`, `just-create` |
| Image paths | Relative like `images/foo.jpg`; resolve via [`frontend/src/asset.js`](frontend/src/asset.js) |
| Custom domain attached at root | Set `base: "/"` in [`frontend/vite.config.js`](frontend/vite.config.js) |
| User asks for GitHub Pages only | Stay static; never require a server at runtime |
| Commits | Only when user asks, or when handoff explicitly requires publish |
| Secrets | Never commit tokens; use `gh auth` / Actions OIDC |

---

## Repo layout

```
HENE.com / iamhene
├── .github/workflows/deploy-pages.yml   # Pages deploy on push to main
├── frontend/                            # Vite React app (source of truth)
│   ├── public/images/                   # Static photo assets
│   ├── scripts/spa-fallback.mjs         # Post-build 404.html for SPA
│   ├── src/data/site.json               # Brand, covers, galleries
│   ├── src/pages/Home.jsx               # 4-cover grid
│   ├── src/pages/Gallery.jsx
│   ├── src/components/Lightbox.jsx
│   └── vite.config.js                   # base: /HENE.com/
├── scripts/                             # Optional scrape/download helpers
│   ├── download_images.py
│   └── push-to-github.ps1
├── AGENTS.md                            # This handoff brief
└── README.md                            # Human quick start
```

---

## Commands

```bash
cd frontend
npm ci
npm run dev      # local; note base path /HENE.com/
npm run build    # must succeed; produces dist/ + 404.html
npm run preview
```

### Publish (if remote missing)

```bash
gh auth status
gh repo create "HENE.com" --public --source=. --remote=origin --push
```

Or: `pwsh scripts/push-to-github.ps1`

Then: repo **Settings → Pages → Build and deployment → GitHub Actions**.

---

## Acceptance checks

- [ ] `cd frontend && npm ci && npm run build` exits 0 with no backend
- [ ] Home shows brand **Hene** + 4 covers linking to the four series
- [ ] Lightbox: Esc / arrows / touch swipe; counter visible
- [ ] Deep link `/HENE.com/beauty` works on Pages (404.html fallback)
- [ ] Workflow `Deploy GitHub Pages` succeeds on `main`
- [ ] README matches actual stack (static React, not Flask)

---

## Suggested first cloud-agent prompt

Copy-paste this into the cloud agent to continue:

```text
Read AGENTS.md and README.md in this repo.

Continue the Hene portfolio handoff:
1. Verify frontend builds (`cd frontend && npm ci && npm run build`).
2. Ensure remote is github.com/<owner>/HENE.com on branch main; create/push if needed.
3. Confirm GitHub Pages is set to GitHub Actions and the deploy workflow passes.
4. Smoke-check routes: /, /beauty, /mood-board, /journey, /just-create under base /HENE.com/.
5. Report the live Pages URL and any blockers.

Do not reintroduce Flask. Do not edit unrelated plan files. Prefer small commits only if changes are required.
```

---

## Design constraints (brief)

- Brand-first home; one composition; 4 equal covers (not a carousel)
- Distinctive type (Syne + Cormorant already wired in `index.html`)
- Motion: cover hover, page enter, lightbox transition
- No card chrome in galleries; masonry/column mosaic is fine
