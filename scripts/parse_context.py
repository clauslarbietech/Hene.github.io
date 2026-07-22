import json
import re
from pathlib import Path

base = Path(__file__).resolve().parent.parent


def extract_context(html: str):
    m = re.search(
        r"Static\.SQUARESPACE_CONTEXT\s*=\s*(\{.*?\});\s*</script>",
        html,
        re.DOTALL,
    )
    if not m:
        return None
    try:
        return json.loads(m.group(1))
    except json.JSONDecodeError:
        return None


def find_asset_urls(obj, found=None):
    if found is None:
        found = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in ("assetUrl", "overlayOpenUrl", "url") and isinstance(v, str) and "squarespace-cdn" in v:
                found.append(v.split("?")[0])
            elif k == "filename" and isinstance(v, str):
                found.append({"filename": v})
            else:
                find_asset_urls(v, found)
    elif isinstance(obj, list):
        for item in obj:
            find_asset_urls(item, found)
    return found


for fname in sorted(base.glob("_scrape_*.html")):
    html = fname.read_text(encoding="utf-8", errors="ignore")
    ctx = extract_context(html)
    print("\n===", fname.name, "===")
    if not ctx:
        print("no context")
        continue
    coll = ctx.get("collection") or {}
    print("collection title:", coll.get("title"), "type:", coll.get("type"), "id:", coll.get("id"))
    items = coll.get("items") or []
    print("items count:", len(items))
    for it in items[:5]:
        print(" -", it.get("title"), it.get("fullUrl"), (it.get("assetUrl") or "")[:80])
    # also look for system pages / navigation
    nav = ctx.get("website") or {}
    print("site title:", (ctx.get("website") or {}).get("siteTitle"))

# Also dump collection item structure keys from home
home = (base / "_scrape_home.html").read_text(encoding="utf-8", errors="ignore")
ctx = extract_context(home)
if ctx and ctx.get("collection"):
    items = ctx["collection"].get("items") or []
    if items:
        print("\nHOME ITEM KEYS:", sorted(items[0].keys()))
        print(json.dumps(items[0], indent=2)[:1500])
