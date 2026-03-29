# AI Isn't My Cup of Tea — Image Generation Log

Each entry shows: what was generated, what reference image was fed in, the key prompt, and notes on what worked or failed. Images are linked so you can follow the chain.

---

## The Anchor Image — Use This as the Style Reference

### `story_v2_page_04.png` ⭐ BEST REFERENCE
**Date:** 2026-03-28 | **Quality:** quality | **Aspect:** 3:4

**Reference fed in:** [`story_page_03.png`](images/story_page_03.png)

**Result:** ![story_v2_page_04](images/story_v2_page_04.png)

**Why it's the anchor:** Clean monochrome sepia. Circular panels worked. Masthead well integrated. No colour drift. Newspaper print quality. Use this as `inputImagePath` for new generations.

**Known issues:** Title is all-caps "AI ISN'T MY CUP OF TEA" — should be mixed case.

---

## The Final Series (series_page_*.png)
*All generated using `story_v2_page_04.png` as the style anchor — parallel generation, not chained.*

---

### `series_page_01.png` — Issue One: The Silence of the Ledgers
**Date:** 2026-03-28 | **Quality:** quality | **Aspect:** 3:4

**Reference fed in:** [`story_v2_page_04.png`](images/story_v2_page_04.png)

**Result:** ![series_page_01](images/series_page_01.png)

**Layout:** Hero panel (clerks office) + 3 small panels below

**What worked:** Title close to correct mixed case. Clean monochrome. Story So Far present. Next Issue present.

**Prompt summary:** Vast clerks office. Simmons watching. Sketch in notebook. Teacup with steam. "Next Issue: Simmons crosses the Atlantic."

---

### `series_page_02.png` — Issue Two: Simmons Goes to America
**Date:** 2026-03-28 | **Quality:** quality | **Aspect:** 3:4

**Reference fed in:** [`story_v2_page_04.png`](images/story_v2_page_04.png)

**Result:** ![series_page_02](images/series_page_02.png)

**Layout:** 4 horizontal newspaper strips stacked

**What worked:** Story layout clear. Ocean liner → ENIAC → diner → homeward journey.

**Problems:** Title reverted to ALL CAPS.

---

### `series_page_03.png` — Issue Three: Not My Cup of Tea
**Date:** 2026-03-28 | **Quality:** quality | **Aspect:** 3:4

**Reference fed in:** [`story_v2_page_04.png`](images/story_v2_page_04.png)

**Result:** ![series_page_03](images/series_page_03.png)

**Layout:** 2×3 grid, 6 panels

**What worked:** Boardroom scene strong. "Remarkable. But hardly... practical." panel works well.

**Problems:** Title all-caps.

---

### `series_page_04.png` — Issue Four: Building the Brain
**Date:** 2026-03-28 | **Quality:** quality | **Aspect:** 3:4

**Reference fed in:** [`story_v2_page_04.png`](images/story_v2_page_04.png)

**Result:** ![series_page_04](images/series_page_04.png)

**Layout:** 3 circular panels + full-width + 2 small

**What worked:** Closest match to anchor. Circular panels strong. Clean monochrome.

**Problems:** Title all-caps.

---

### `series_page_05.png` — Issue Five: LEO Goes to Work (FAILED)
**Date:** 2026-03-28 | **Quality:** quality | **Aspect:** 3:4

**Reference fed in:** [`story_v2_page_04.png`](images/story_v2_page_04.png)

**Result:** ![series_page_05](images/series_page_05.png)

**Problems:** COLOUR introduced — blue/green tones in computer room panels. Night scene description triggered colour. Do not use.

---

### `series_page_05b.png` — Issue Five: LEO Goes to Work (RETRY)
**Date:** 2026-03-28 | **Quality:** quality | **Aspect:** 3:4

**Reference fed in:** [`story_v2_page_04.png`](images/story_v2_page_04.png)

**Result:** ![series_page_05b](images/series_page_05b.png)

**Layout:** Tall left panel + 3 small right column + wide cinematic strip bottom

**What worked:** Colour removed. Layout strong. Story So Far present. Next Issue present.

**Problems:** Title rendered as "AI AIN'T MY CUP OF TEA" — Gemini changed "Isn't" to "Ain't". Needs another retry.

---

## Style Reference Sheets

### `style_characters.png` — Character designs
**Reference fed in:** none

**Result:** ![style_characters](images/style_characters.png)

Characters: The Manager (bowler hat, teacup), Simmons (wire specs, notebook), The Clerk (shirtsleeves), The Nippy (black dress, white apron/cap), The Robot (boxy riveted 1950s sci-fi), LEO (computer wall).

---

### `style_masthead_locked.png` — Masthead at 3× detail
**Reference fed in:** [`style_typography.png`](images/style_typography.png)

**Result:** ![style_masthead_locked](images/style_masthead_locked.png)

The intended locked masthead design. Use as reference for header consistency.

---

### `story_v2_page_04.png` — Good header integration reference
**Result:** ![comic_issue_07_machine_in_teashop](images/comic_issue_07_machine_in_teashop.png)

Good header but missing Story So Far and Next Issue. Portrait vignette in header left side is a strong design choice.

---

## Key Lessons

| Problem | Cause | Fix |
|---------|-------|-----|
| Title goes ALL CAPS | Gemini defaults to display caps for headlines | Explicitly describe each letter's case; or do masthead externally in Canva/Figma |
| Title changes to "Ain't" | Gemini "corrects" the phrasing | Spell out: "the word Is-n-apostrophe-t" |
| Colour creep in dark scenes | Night/glow descriptions invite colour | Avoid night/glow entirely; say "strictly monochrome sepia ink, no lighting effects" |
| Style drift when chaining | Each page inherits previous page's errors | Always chain back to the anchor (`story_v2_page_04.png`), never to the previous story page |
| Header looks "stuck on" | Described as a "strip" or "band" | Describe borders as "flowing into" panel borders; lion crest "bleeds into" panel area |

---

## Log Format for New Generations

When a new image is generated, add an entry here:

```markdown
### `filename.png` — Description
**Date:** YYYY-MM-DD | **Quality:** quality/balanced | **Aspect:** 3:4

**Reference fed in:** [`reference_image.png`](images/reference_image.png)

**Result:** ![filename](images/filename.png)

**What worked / Problems:**
```
