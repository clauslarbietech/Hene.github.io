from pathlib import Path
import json
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "data"
STATIC = ROOT / "static"
FRONTEND_DIST = ROOT.parent / "frontend" / "dist"

app = Flask(__name__, static_folder=str(STATIC), static_url_path="/static")
CORS(app)


def load_json(name: str):
    return json.loads((DATA / name).read_text(encoding="utf-8"))


@app.get("/api/health")
def health():
    return jsonify({"ok": True, "service": "hene-portfolio"})


@app.get("/api/site")
def site():
    return jsonify(load_json("site.json"))


@app.get("/api/photos")
def photos():
    return jsonify(load_json("photos.json"))


@app.get("/api/galleries/<slug>")
def gallery(slug: str):
    site_data = load_json("site.json")
    for g in site_data.get("galleries", []):
        if g.get("slug") == slug:
            return jsonify(g)
    return jsonify({"error": "not found"}), 404


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def spa(path: str):
    """Serve the React build in production; API stays under /api."""
    if path.startswith("api/") or path.startswith("static/"):
        return jsonify({"error": "not found"}), 404
    index = FRONTEND_DIST / "index.html"
    if index.exists():
        candidate = FRONTEND_DIST / path
        if path and candidate.exists() and candidate.is_file():
            return send_from_directory(FRONTEND_DIST, path)
        return send_from_directory(FRONTEND_DIST, "index.html")
    return jsonify(
        {
            "message": "Hene API is running. Start the React frontend with npm run dev in /frontend.",
            "endpoints": ["/api/site", "/api/photos", "/api/galleries/<slug>"],
        }
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
