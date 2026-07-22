# Cursor Cloud Agent — bootstrap prompt

If you are a **Cursor Cloud Agent** cloning or opening this repo for the first time, start here.

## Immediate instructions

1. Open and follow **[AGENTS.md](AGENTS.md)** end-to-end (mission, status, commands, acceptance checks).
2. Treat **[AGENTS.md](AGENTS.md)** as the architecture + operating prompt; treat **[README.md](README.md)** as human quick start.
3. Working directory for the app is always `frontend/` for install/build/dev.
4. Deploy path is GitHub Actions → GitHub Pages (see `.github/workflows/deploy-pages.yml`).

## One-shot continue prompt

```text
You are continuing the Hene photography portfolio (repo HENE.com).

Read AGENTS.md first. Then:
- Build: cd frontend && npm ci && npm run build
- Publish: ensure origin points at public repo HENE.com and main is pushed
- Enable Pages via GitHub Actions if not already
- Verify /HENE.com/ and series routes work

Constraints: static React/Vite only; no Flask; keep the 4-cover home IA; use site.json + public/images for content.
```

## Owner notes

Local machine may still need `gh auth login` before the first push. Once the cloud agent has GitHub credentials for this repo, prefer completing publish from the cloud environment.
