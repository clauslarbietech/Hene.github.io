import json
from pathlib import Path

base = Path(__file__).resolve().parent.parent


def walk_images(obj, found=None, path=""):
    if found is None:
        found = []
    if isinstance(obj, dict):
        asset = obj.get("assetUrl") or obj.get("originalSize") 
        if isinstance(obj.get("assetUrl"), str) and "http" in obj["assetUrl"]:
            found.append(
                {
                    "title": obj.get("title") or obj.get("filename"),
                    "url": obj["assetUrl"].split("?")[0],
                    "filename": obj.get("filename"),
                    "body": (obj.get("body") or "")[:80],
                    "fullUrl": obj.get("fullUrl"),
                    "tags": obj.get("tags"),
                }
            )
        for k, v in obj.items():
            walk_images(v, found, path + "/" + k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            walk_images(v, found, path + f"[{i}]")
    return found


for name in ["home", "gallery", "beauty", "journey", "mood", "just"]:
    p = base / f"_json_{name}.json"
    if not p.exists():
        continue
    data = json.loads(p.read_text(encoding="utf-8"))
    imgs = walk_images(data)
    # unique by url
    seen = set()
    uniq = []
    for im in imgs:
        if im["url"] not in seen:
            seen.add(im["url"])
            uniq.append(im)
    print(f"\n=== {name}: {len(uniq)} images ===")
    for im in uniq[:15]:
        print(f"  {im.get('title')} | {im.get('fullUrl')} | {im['url'][-60:]}")

# Inspect gallery collection structure
g = json.loads((base / "_json_gallery.json").read_text(encoding="utf-8"))
print("\nGALLERY top keys related:")
for k in g:
    v = g[k]
    if isinstance(v, list):
        print(f"  {k}: list[{len(v)}]")
    elif isinstance(v, dict):
        print(f"  {k}: dict keys={list(v.keys())[:12]}")
    else:
        print(f"  {k}: {type(v).__name__}")

# collection items?
coll = g.get("collection") or {}
print("collection keys", list(coll.keys())[:30])
print("collection items", len(coll.get("items") or []))

# Maybe items at top level in older API - check mainContent length
mc = g.get("mainContent") or ""
print("mainContent type", type(mc), "len", len(mc) if isinstance(mc, str) else "n/a")
