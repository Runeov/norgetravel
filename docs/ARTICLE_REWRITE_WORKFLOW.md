# Article fact-check/rewrite workflow (articles.json)

Playbook for the "fact-check + rewrite in NorgeTravel voice" pattern applied to batches of articles in `src/data/articles.json`. Covers pre-flight verification, edit strategy, voice enforcement, metadata batching, slug rules, failure modes.

Derived from Sognefjord batch (Rv55, Urnes, Prest, Norway in a Nutshell, Stegastein, Bakka–Nåli → Stalheim–Nåli), 2026-04-13.

**Why:** Each article above had at least one fabricated spec (wrong elevation, invented trailhead, nonexistent trail name, outdated price). Discovering these mid-edit cost time. The fixes below front-load verification and batch edits.

**How to apply:** When treating another batch (e.g. Hardangerfjord, Arctic, Lofoten articles), follow this flow end-to-end. Do not skip verification even if article "looks fine."

---

## 1. Task shape recognition

Trigger phrases:
- "apply the same treatment to [region] articles"
- "fact-check against official sources and rewrite"
- "do [X] article the NorgeTravel way"

Default assumptions unless user says otherwise:
- Rewrite in the zone expert's voice (Ingrid / Bjørn / Marte / Silje / Lars Erik / Hanne — see `.kilocode/rules/NorgeTravel_expert_personas.md`)
- Preserve slugs (URL stability)
- Keep article IDs
- Update: title, subtitle, excerpt, content, metaTitle, metaDescription, tags, featuredImageAlt, readTime
- Do NOT touch: id, slug, category, publishedAt, createdAt, updatedAt (unless user asks)

## 2. Pre-flight verification protocol (MANDATORY, ~60s per article)

Before any Edit, grep the article and verify the three riskiest claims:

```
Risk rank 1 — Existence/identity:
  - Does the named place/trail/route exist under that name?
  - "Bakka–Nåli" did not exist. The trail is Stalheim–Nåli.
  - Check: ut.no, vegvesen.no, Wikipedia NO

Risk rank 2 — Key numeric spec:
  - Elevation, distance, price, duration
  - Prest: source said 580m / Flåm campsite. Reality: 1,478m from Bjørgavegen Fv243.
  - NiN: source said 1,290 NOK. 2026 reality: ~1,595 NOK.

Risk rank 3 — Classification:
  - DNT grade, road designation (Fv vs Rv), UNESCO status
  - Stegastein: source said Rv243. Reality: Fv243 (reclassified).
```

Run all three checks **before** writing any new content. If any fail → the article needs full rewrite, not surgical edits.

## 3. Research source priority (canonical, one per claim type)

| Claim type | Canonical source | Fallback |
|---|---|---|
| Road number / scenic route | nasjonaleturistveger.no, vegvesen.no | kartverket.no |
| DNT trail grade, distance, elevation | ut.no | dnt.no |
| Stave church / cultural heritage | fortidsminneforeningen.no | riksantikvaren.no |
| UNESCO status | whc.unesco.org | — |
| Ferry schedules & operators | Operator site (Norled, Fjord1, The Fjords, Lustrabaatane) | ruteinfo / Entur |
| Norway in a Nutshell / packaged tours | fjordtours.com | visitnorway.com |
| Fjord geography | thefjords.no | visitnorway.com |
| Aurora/KP index | Met.no / NOAA SWPC | — |

**Rule:** Cite one canonical source per claim. Don't cross-reference three sources — wastes cycles.

## 4. Common fabrication patterns observed

Specific failure modes in pre-existing NorgeTravel article content. Check for them by default:

1. **Trailhead displacement** — Trail described as starting from a popular tourist spot when real trailhead is a remote lay-by. (Prest: "Flåm campsite" → Bjørgavegen lay-by 8km from Aurlandsvangen)
2. **Elevation compression** — Low-drama summit elevation invented. (Prest: 580m → 1,478m)
3. **Fabricated hiking alternative** — Real driving/ferry route augmented with an invented "you can also hike it" option with suspiciously specific km/grade. (Stegastein: fake 6km Blue from Aurland village)
4. **Stale road designation** — Rv vs Fv when route has been reclassified. (Stegastein: Rv243 → Fv243)
5. **Out-of-date pricing** — Prices 1–2 years behind. (NiN 2026: ~1,595 NOK, not 1,290)
6. **Nonexistent trail name** — Trail marketed under name that doesn't appear in DNT records. (Bakka–Nåli → actual trail is Stalheim–Nåli)
7. **View direction errors** — Viewpoint described as overlooking X when it actually faces Y. (Nåli: shows Nærøydalen valley, not fjord water; Prest: no Nærøyfjord view)
8. **Missing operator names** — "Electric ferry" without operator/ship. Add: The Fjords DA, Future of the Fjords / Vision of the Fjords, etc.

## 5. Edit strategy decision tree

```
After verification pass:

├── 3/3 claims verified correct
│   └── SURGICAL: Edit only voice violations (em dashes, banned words). 1–3 Edit calls.
│
├── 1 claim wrong, structure sound
│   └── SURGICAL+: Fix the claim, then voice pass. 2–5 Edit calls.
│
├── 2+ claims wrong OR identity issue (wrong trail name/place)
│   └── FULL REWRITE: Replace entire content block. 1 large Edit + 1 metadata Edit.
│
└── Trail/route does not exist
    └── REFRAME: Preserve slug, new content explains the naming confusion,
        redirects to the real thing. 1 large Edit + 1 metadata Edit.
        Add explicit disambiguation paragraph up top.
```

## 6. Voice enforcement order (do in this sequence)

Run **immediately after draft, before metadata**:

1. **Em dash scan** — grep ` — ` in new content. Replace every instance with `.` or `,`. Ban is absolute per `.kilocode/rules/Norgetravel_banned_words.md` Part 4B.
2. **Banned words scan** — grep for: `stunning|magical|breathtaking|charming|vibrant|quaint|idyllic|unspoiled|timeless|remote|epic|dramatic|majestic|iconic|jaw-dropping|hidden gem|bucket list|once-in-a-lifetime|unforgettable|fairy tale|wonderland|mystical|ethereal|picturesque|pristine|rustic`. Replace each with specific fact.
3. **Florida test** — Read each descriptive sentence. If it could describe any destination, rewrite with Norway-specific noun/number.
4. **Active voice check** — Passive constructions <10%. Rewrite "can be seen" / "is located" / "is offered."
5. **Byline** — Close every Ingrid/Bjørn/Marte article with the expert's voice signature paragraph.

**Why this order:** Doing voice at the end forces re-edits. Doing it before metadata means one content edit, then one metadata edit — not three edits per article.

## 7. Metadata batching template

Batch ALL of these into ONE Edit call after content is final:

```json
{
  "title": "...",
  "subtitle": "...",
  "excerpt": "...",
  "metaTitle": "... | NorgeTravel",
  "metaDescription": "...",
  "tags": [...],
  "featuredImageAlt": "...",
  "readTime": 8
}
```

- `metaTitle` <70 chars ideal
- `metaDescription` 150–160 chars, specific, no banned words
- `tags` kebab-case
- `readTime` in minutes (~200 words/min)

**Do not** make separate edits for tags, readTime, metaTitle. One Edit = all metadata.

## 8. Slug preservation rules

| Situation | Slug action |
|---|---|
| Content mostly correct, voice rewrite | Keep slug |
| Factual correction, same topic | Keep slug |
| Trail/place renamed (real → real) | Keep slug (URL stability wins over semantic accuracy) |
| Trail doesn't exist, reframed to different trail | Keep slug, add disambiguation paragraph |
| User explicitly asks to change slug | Change it |

**Rule:** Never change a slug without explicit user instruction. URL breakage > editorial neatness.

## 9. Handling articles.json (large file)

File is >2000 lines. Do NOT read whole file.

Workflow:
```
1. Grep slug to find article:
   Grep pattern="\"slug\": \"target-slug\"" path=src/data/articles.json output_mode=content -n

2. Read scoped to article:
   Read offset=<line from grep> limit=200

3. Edit with old_string containing enough context to be unique
   (article ID in old_string prevents cross-article collisions)

4. JSON validity check ONCE at end of batch:
   node -e "JSON.parse(require('fs').readFileSync('src/data/articles.json','utf8')); console.log('valid JSON')"
```

## 10. Default tag taxonomy

Current pattern observed in existing articles:
- **Location:** region + specific place (`fjord-norway`, `sognefjord`, `aurland`)
- **Activity:** `hiking`, `driving`, `cruise`, `viewpoint`, `cultural-site`
- **Classification:** `dnt-blue`, `dnt-red`, `unesco`, `scenic-route`
- **Infrastructure:** `e16`, `fv243`, `rv55`, `ferry`
- **Expert (if used):** `ingrid-solheim`, `bjorn-haugen`, etc.

**TODO:** User mentioned default tags related to "execution policy tab" — clarify and add here.

## 11. Per-article execution checklist

```
[ ] Grep slug, read scoped range
[ ] Verify 3 riskiest claims against canonical sources
[ ] Decide: surgical / surgical+ / full rewrite / reframe
[ ] Draft new content in target expert's voice
[ ] Em dash scan → replace
[ ] Banned word scan → replace
[ ] Florida test → specific nouns/numbers
[ ] Active voice <10% passive
[ ] Add expert byline closer
[ ] Edit content (1 call)
[ ] Edit metadata (1 call: title, subtitle, excerpt, metaTitle, metaDescription, tags, featuredImageAlt, readTime)
[ ] Mark todo complete
```

After entire batch:
```
[ ] node -e "JSON.parse(...)" validity check
[ ] Report summary of what was verified/corrected/reframed per article
```

## 12. Anti-patterns to avoid

- ❌ Reading the whole articles.json file (wastes context)
- ❌ Three edits per article (content, then tags, then readTime) — batch metadata
- ❌ Voice pass at the end — do it before metadata
- ❌ Cross-referencing multiple sources for the same claim — pick one canonical
- ❌ Fabricating specifics when research is thin — hedge with "consult ut.no for current grade" rather than invent numbers
- ❌ Changing slugs without explicit instruction
- ❌ Trusting existing article specs — always verify top 3 claims
- ❌ Em dashes. Ever. `.` or `,` only.
- ❌ Reading file after Edit to verify change (Edit errors if it fails; harness tracks state)
