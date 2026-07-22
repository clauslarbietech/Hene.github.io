# Hene

Static photography portfolio for GitHub Pages, inspired by [iamhene.com](https://www.iamhene.com/).

**Stack:** React + Vite (no backend required).

## Local development

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173/HENE.com/).

## Production build

```bash
cd frontend
npm run build
npm run preview
```

Output is in `frontend/dist` (includes `404.html` SPA fallback for client routes).

## GitHub Pages

1. Push this repo to GitHub as **`HENE.com`** on branch **`main`**.
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) builds and deploys on every push to `main`.

Site URL: `https://<your-username>.github.io/HENE.com/`

Vite `base` is set to `/HENE.com/` in [`frontend/vite.config.js`](frontend/vite.config.js). If you later attach a custom domain at the site root, change `base` to `/`.

## Content

- Site structure: [`frontend/src/data/site.json`](frontend/src/data/site.json)
- Images: [`frontend/public/images/`](frontend/public/images/)
- Optional scrape helpers: [`scripts/`](scripts/)

Contact: [imheneinfo@gmail.com](mailto:imheneinfo@gmail.com) · [LinkedIn](https://www.linkedin.com/in/claus-larbie-0ab15460)
