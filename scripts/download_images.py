"""Download all discovered Squarespace images into backend/static/images."""
import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

base = Path(__file__).resolve().parent.parent
out_dir = base / "backend" / "static" / "images"
out_dir.mkdir(parents=True, exist_ok=True)

UA = "Mozilla/5.0 (compatible; HenePortfolioBot/1.0)"


def walk_images(obj, found=None):
    if found is None:
        found = []
    if isinstance(obj, dict):
        if isinstance(obj.get("assetUrl"), str) and "http" in obj["assetUrl"]:
            found.append(
                {
                    "title": obj.get("title") or obj.get("filename") or "",
                    "url": obj["assetUrl"].split("?")[0],
                    "filename": obj.get("filename") or "",
                    "fullUrl": obj.get("fullUrl") or "",
                    "tags": obj.get("tags") or [],
                    "categories": obj.get("categories") or [],
                }
            )
        for v in obj.values():
            walk_images(v, found)
    elif isinstance(obj, list):
        for v in obj:
            walk_images(v, found)
    return found


def safe_name(url: str, filename: str = "") -> str:
    if filename:
        name = urllib.parse.unquote(filename)
    else:
        name = urllib.parse.unquote(url.rstrip("/").split("/")[-1])
    name = re.sub(r"[^\w.\-]+", "_", name)
    return name


all_imgs = []
for p in sorted(base.glob("_json_*.json")):
    data = json.loads(p.read_text(encoding="utf-8"))
    all_imgs.extend(walk_images(data))

# Also from scraped_images.json
scraped = json.loads((base / "scraped_images.json").read_text(encoding="utf-8"))
for gallery, urls in scraped.items():
    for u in urls:
        all_imgs.append(
            {
                "title": gallery,
                "url": u.split("?")[0],
                "filename": "",
                "fullUrl": f"/{gallery}" if gallery != "home" else "/",
                "tags": [gallery],
                "categories": [gallery],
            }
        )

seen = set()
unique = []
for im in all_imgs:
    if im["url"] in seen:
        continue
    seen.add(im["url"])
    unique.append(im)

manifest = []
for i, im in enumerate(unique):
    name = safe_name(im["url"], im.get("filename") or "")
    if not name.lower().endswith((".jpg", ".jpeg", ".png", ".webp", ".gif")):
        name += ".jpg"
    dest = out_dir / name
    # avoid collisions
    if dest.exists() and dest.stat().st_size > 0:
        local = f"images/{name}"
    else:
        hi = im["url"] + "?format=2500w"
        print(f"Downloading [{i+1}/{len(unique)}] {name} ...")
        req = urllib.request.Request(hi, headers={"User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                dest.write_bytes(resp.read())
            print(f"  OK {dest.stat().st_size} bytes")
            local = f"images/{name}"
        except Exception as e:
            print(f"  FAIL {e}")
            local = im["url"] + "?format=1500w"

    manifest.append(
        {
            "id": f"img-{i+1}",
            "title": urllib.parse.unquote(im.get("title") or name),
            "src": f"/static/{local}" if local.startswith("images/") else local,
            "remote": im["url"] + "?format=2500w",
            "fullUrl": im.get("fullUrl") or "",
            "tags": im.get("tags") or [],
            "categories": im.get("categories") or [],
        }
    )

manifest_path = base / "backend" / "data" / "photos.json"
manifest_path.parent.mkdir(parents=True, exist_ok=True)
manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
print(f"Wrote {len(manifest)} entries to {manifest_path}")
