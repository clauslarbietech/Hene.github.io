import re
import json
from pathlib import Path

base = Path(__file__).resolve().parent.parent if Path(__file__).resolve().parent.name == "scripts" else Path(__file__).resolve().parent
# scripts/ -> project root
base = Path(__file__).resolve().parent.parent
pages = {
    "home": "_scrape_home.html",
    "beauty": "_scrape_beauty.html",
    "journey": "_scrape_journey.html",
    "just-create": "_scrape_just-create.html",
    "mood-board": "_scrape_mood.html",
}

all_imgs = {}
for name, fname in pages.items():
    html = (base / fname).read_text(encoding="utf-8", errors="ignore")
    urls = re.findall(
        r"https://images\.squarespace-cdn\.com/content/[^\"'\s\\]+",
        html,
    )
    combined = []
    seen = set()
    for u in urls:
        core = u.split("?")[0]
        if core in seen:
            continue
        if any(x in core.lower() for x in ("favicon", "logo", "icon", "sprite")):
            continue
        seen.add(core)
        combined.append(core + "?format=2500w")
    all_imgs[name] = combined
    print(f"{name}: {len(combined)} images")
    for u in combined[:10]:
        print(" ", u[:140])

out = base / "scraped_images.json"
out.write_text(json.dumps(all_imgs, indent=2), encoding="utf-8")
print(f"wrote {out}")
