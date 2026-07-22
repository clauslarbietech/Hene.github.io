# Hene

High-end photography portfolio inspired by [iamhene.com](https://www.iamhene.com/).

**Stack:** Flask API + React (Vite) frontend.

## Quick start

```bash
# Backend
cd backend
python -m pip install -r requirements.txt
python app.py

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 — Vite proxies `/api` and `/static` to Flask on port 5000.

## Production build

```bash
cd frontend && npm run build
cd ../backend && python app.py
```

Flask serves the built SPA from `frontend/dist` plus `/api` and `/static`.

## Content

- Site structure: `backend/data/site.json`
- Photo manifest: `backend/data/photos.json`
- Images: `backend/static/images/`

Contact: [imheneinfo@gmail.com](mailto:imheneinfo@gmail.com) · [LinkedIn](https://www.linkedin.com/in/claus-larbie-0ab15460)
