# Image Generation — AI Isn't My Cup of Tea

How to generate comic pages for this project using the local `mcp-image-leo` build.

## Folder structure

```
generated/images/
├── reference/
│   ├── style-sheets/     style_guide, characters, locations, props, typography, masthead
│   ├── templates/        layout templates v1 + v2
│   └── historical/       real LEO photos, Lyons enamel signs (CC licensed)
├── pages/
│   ├── run-01-series/    earliest series_page_* runs
│   ├── run-02-story-early/
│   ├── run-03-story-final/
│   ├── run-04-comic-issues/  comic_issue_01-09
│   ├── run-05-v2/
│   ├── run-06-v3/
│   └── run-07-arc-current/  ← latest run, arc_issue_01-05 + .log.json sidecars
└── other-projects/       teacher, economics, cartoons, misc — not LEO related
```

Every generation writes a `.log.json` sidecar alongside the image.

---

## The 14 reference images

Pass all 14 on every comic page generation. Ordered by priority — most important first.

```
BASE = /Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images

Tier 1 — Style anchor (always):
  reference/style-sheets/style_guide.png
  pages/run-05-v2/story_v2_page_04.png          ⭐ gold standard page

Tier 2 — Characters & world (always):
  reference/style-sheets/style_characters.png
  reference/style-sheets/style_locations.png
  reference/style-sheets/style_props.png

Tier 3 — Typography & masthead (always):
  reference/style-sheets/style_masthead_locked.png
  reference/style-sheets/style_typography.png

Tier 4 — Historical real references (always):
  reference/historical/leo_i_story_photograph.jpg   ← LEO I room at Cadby Hall
  reference/historical/leo_i_john_simmons.jpg        ← man + valve racks
  reference/historical/leo_iii_museum_of_london.jpg  ← operator console
  reference/historical/lyons_tea_enamel_sign_gcr.jpg ← Lyons branding

Tier 5 — Layout & integration:
  reference/templates/template_v2_C_circles.png
  pages/run-04-comic-issues/comic_issue_07_machine_in_teashop.png
  reference/historical/leo_iii_circuit_board_science_museum.jpg
```

---

## Standard call pattern

```typescript
generate_image({
  prompt: "...",
  fileName: "arc_issue_XX_title.png",
  aspectRatio: "2:3",
  quality: "quality",
  maintainCharacterConsistency: true,
  inputImagePaths: [
    "/Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images/reference/style-sheets/style_guide.png",
    "/Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images/pages/run-05-v2/story_v2_page_04.png",
    "/Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images/reference/style-sheets/style_characters.png",
    "/Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images/reference/style-sheets/style_locations.png",
    "/Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images/reference/style-sheets/style_props.png",
    "/Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images/reference/style-sheets/style_masthead_locked.png",
    "/Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images/reference/style-sheets/style_typography.png",
    "/Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images/reference/historical/leo_i_story_photograph.jpg",
    "/Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images/reference/historical/leo_i_john_simmons.jpg",
    "/Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images/reference/historical/leo_iii_museum_of_london.jpg",
    "/Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images/reference/historical/lyons_tea_enamel_sign_gcr.jpg",
    "/Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images/reference/templates/template_v2_C_circles.png",
    "/Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images/pages/run-04-comic-issues/comic_issue_07_machine_in_teashop.png",
    "/Users/richardmorgan/Documents/GitHub/leo-the-computer/generated/images/reference/historical/leo_iii_circuit_board_science_museum.jpg",
  ],
})
```

---

## Reference image library

| File | Tier | Contents |
|------|------|----------|
| `reference/style-sheets/style_guide.png` | 1 — always | Line weight, palette swatches, panel borders, what NOT to do |
| `pages/run-05-v2/story_v2_page_04.png` | 1 — always ⭐ | Best quality page — the gold standard anchor |
| `reference/style-sheets/style_characters.png` | 2 — always | Manager, Simmons, Clerk, Nippy, Robot, LEO |
| `reference/style-sheets/style_locations.png` | 2 — always | Cadby Hall, Corner House, computer room, boardroom |
| `reference/style-sheets/style_props.png` | 2 — always | Teacup, ledger, adding machine, valves, Lyons tin |
| `reference/style-sheets/style_masthead_locked.png` | 3 — always | Masthead typography reference |
| `reference/style-sheets/style_typography.png` | 3 — always | Type specimens: title, caption, speech bubble, ribbon |
| `reference/historical/leo_i_story_photograph.jpg` | 4 — always | Real photo: LEO I full room at Cadby Hall |
| `reference/historical/leo_i_john_simmons.jpg` | 4 — always | Real photo: engineer + valve racks (scale reference) |
| `reference/historical/leo_iii_museum_of_london.jpg` | 4 — always | Real photo: LEO III operator console |
| `reference/historical/lyons_tea_enamel_sign_gcr.jpg` | 4 — always | Real photo: Lyons Tea enamel sign branding |
| `reference/templates/template_v2_C_circles.png` | 5 — layout | Circular panel layout template |
| `pages/run-04-comic-issues/comic_issue_07_machine_in_teashop.png` | 5 — layout | Good header integration example |
| `reference/historical/leo_iii_circuit_board_science_museum.jpg` | 5 — detail | LEO circuit board detail |

---

## Prompt structure for a comic page

Every page prompt should have these four zones with explicit height proportions:

```
MASTHEAD (integrated — borders flow into panels below, ~12% height):
Title "AI Isn't My Cup of Tea" mixed case bold condensed hand-lettered.
J. LYONS & CO. lion crest left. Corner House vignette right.
Strap line: "The true story of LEO — the world's first business computer
— and the tea company that built it."

STORY SO FAR (~10% height, full-width box, decorative border):
"The Story So Far: [one sentence recap]"

ISSUE TITLE strip: "Issue N: Title"

PANELS (~68% height):
[panel descriptions]

NEXT ISSUE BOX (~10% height, ornate border):
"Next Issue: [teaser]"

FOOTER: "Page N" centred. Small teacup logo bottom-right.
```

The explicit percentages stop panels from expanding and squeezing out the Story So Far and Next Issue boxes.

---

## Lessons learned (hard way)

### Never chain story pages
Always anchor to the four reference images — never to the previous story page. Chaining accumulates drift. By page 5 of a chained sequence you get colour creep, font changes, and layout collapse.

### Monochrome — be explicit every time
End every prompt with:
```
Pure sepia ink on cream paper throughout. Strictly monochrome.
No colour, no tinted areas, no warm or cool tones.
Crosshatched ink line art only. Newspaper print quality.
```

Describing any light source (valve glow, screen light, night scenes) will introduce colour no matter what you say elsewhere.

### Typography drifts — it's a model limit
The masthead title changes capitalisation and weight between generations. This can't be fully fixed through prompting. The real fix: create the masthead once in Canva with Rockwell Condensed or Clarendon, export as PNG, add to the reference images array. Until then, the best prompt phrasing:
```
Title "AI Isn't My Cup of Tea" — mixed case, NOT all-caps.
Letters s, n, t, y, u, p, f, e, a must be visibly shorter than capitals.
```

### The header feels "stuck on"
Use "flows into" and "bleeds into" language — never "strip", "band", or "header":
```
The masthead border flows continuously into the panel borders below.
The lion crest bleeds slightly down into the panel area.
One unified illustration, not assembled from parts.
```

### Panel count limit
5–6 panels is the sweet spot. At 7+ the model simplifies the layout and loses caption boxes. For 6-panel grids specify: "2 columns × 3 rows, equal size."

---

## Known issues

| Issue | Fix |
|-------|-----|
| Title renders ALL CAPS | Add masthead PNG to reference images; describe lowercase letters explicitly |
| Colour appears despite instructions | Remove all light/glow/atmosphere references; add explicit monochrome line |
| Next Issue box missing | Add explicit height percentage for each zone |
| Header looks pasted on | Replace "strip/band" with "flows into / bleeds into" language |
| Characters look different per page | Pass `style_characters.png` + `maintainCharacterConsistency: true` |
| Style drifts across pages | Check you're anchoring to `story_v2_page_04.png`, not a story page |
