# GKN Aerospace MMA Tank — Garden Grove

**A transparent estimate, not official guidance.**

An independent, open-source educational dashboard that helps Garden Grove /
Orange County residents understand the methyl methacrylate (MMA) tank incident
at the GKN Aerospace facility using transparent, science-backed,
uncertainty-aware estimates.

> ⚠️ **This site is not affiliated with OCFA, GKN Aerospace, the City of Garden
> Grove, EPA, or Cal OES. It does not determine whether any address is safe.
> Follow official evacuation and re-entry instructions.**

---

## What this site does

- Explains the **mechanisms** behind the incident: why MMA can polymerize
  exothermically, why heat and venting matter, and why pressure is hard to know.
- Lets you explore **transparent "what-if" scenarios** (temperature over time,
  energy-equivalent polymerization, vapor pressure vs. temperature) by adjusting
  every assumption yourself.
- Surfaces **uncertainty everywhere** — ranges, assumptions, and an explicit
  "Known Unknowns" list — instead of false precision.
- Includes a **FAQ** and a plain-language **glossary** (also fully translated).
- Cites a **public source** for every fact, constant, and threshold.

## What this site does **not** do

- It does **not** provide official guidance, and is not affiliated with any
  agency.
- It does **not** tell you whether it is safe to enter, stay, or return to any
  location.
- It does **not** claim to know the exact tank composition, exact failure time,
  exact internal pressure, or exact plume path.
- It does **not** estimate the tank's failure pressure or draw a live hazard map
  — both would imply certainty that does not exist publicly.

**For decisions about safety, follow OCFA, the City of Garden Grove, Cal OES,
EPA, and the Orange County Health Care Agency.**

---

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) (v4, via the official Vite plugin)
- [Recharts](https://recharts.org/) for the line charts; hand-built SVG/HTML for
  the composition bar and plume graphic
- Fully client-side — no backend, no external API calls. All facts live in local
  source files under `src/data/`.
- **Multilingual**: English, Spanish (Español), Vietnamese (Tiếng Việt), and
  Korean (한국어), with
  a language switcher in the header. The choice is saved in `localStorage` and the
  default follows the browser language.
- **Shareable links**: copy/native-share buttons, plus a deep link that encodes
  the temperature scenario (and language) in the URL so others open the same view.
  Every shared link points back to the site, the page carries a URL watermark in
  the header and footer, and OpenGraph/Twitter meta give shared links a clean
  preview.

## Run locally

```bash
npm install      # install dependencies
npm run dev      # start the dev server (hot reload)
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
npm test         # run the pure-function unit tests
```

> Note: `npm run dev` serves at the base path `/ggtank/`. Open the URL printed by
> Vite (it includes `/ggtank/`).

---

## How to update observations (no coding required)

The tank-temperature timeline lives in **`src/data/observations.ts`**. It is the
only file a non-developer needs to touch to add a new reading.

1. Open `src/data/observations.ts`.
2. Copy an existing block and edit the values:

   ```ts
   {
     timestamp: "2026-05-24T09:00:00-07:00", // date & time, Pacific (-07:00)
     label: "Reported internal gauge temperature",
     tempF: 92,                               // temperature in °F
     source: "AP public reporting",           // where you read it
     confidence: "reported",                  // "reported" | "estimated" | "official"
   },
   ```

3. Keep entries in time order (oldest first). Only add figures you can attribute
   to a named public source.
4. Save. In `npm run dev` the site updates instantly. For the live site, commit
   and push to `main` — the deploy workflow republishes automatically. The "Last
   data update" timestamp in the header reflects the newest entry.

Other adjustable data files:

- `src/data/constants.ts` — every scientific constant, threshold, and default
  (the single source of truth; no magic numbers live in components).
- `src/data/sources.ts` — the source list and official-channel links.

---

## Languages / translations

The UI ships in English, Spanish, Vietnamese, and Korean. Translations live in
`src/i18n/`:

- `en.ts` is the source of truth and defines the translation **shape**.
- `es.ts`, `vi.ts`, and `ko.ts` must satisfy that shape — TypeScript flags any
  missing or misnamed key at build time, so a translation can't silently go missing.

To **edit wording**, change the relevant string in the language file. To **add a
new language**, copy `es.ts`, translate the values, then register it in
`src/i18n/index.tsx` (`DICTIONARIES` and `LANGUAGES`). Proper nouns, agency
acronyms, chemical names, source-document titles, and units are intentionally
left untranslated.

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow at
`.github/workflows/deploy.yml` that builds and deploys the site to GitHub Pages.

1. Push this repository to GitHub as **`ggtank`** (so the site is served from
   `https://<username>.github.io/ggtank/`). The Vite `base` is already set to
   `"/ggtank/"` in `vite.config.ts`.
2. In the repo, go to **Settings → Pages → Build and deployment** and set
   **Source** to **GitHub Actions**.
3. Merge to the **`main`** branch (or run the workflow manually from the
   **Actions** tab). The workflow installs dependencies, runs the unit tests,
   builds, and deploys `dist/`.
4. The published URL appears in the workflow's `deploy` job summary.

If you fork this under a different repository name, update `base` in
`vite.config.ts` to `"/<your-repo-name>/"` to match.

---

## Modeling notes & limitations

- **Temperature scenarios** are arithmetic, not forecasts:
  - _Linear_: `T(t) = T0 + rate·t`.
  - _Cooling-controlled_: the rising rate decays over time
    (`rate·exp(-cooling·t/12)`), integrated over the horizon.
  - _Accelerating_: an **illustrative** runaway-like Euler integration
    (`dT/dt = rate·exp(a·t) − k·(T − ambient)`), capped past MMA's boiling point
    because the lumped model stops being meaningful there. **Not a prediction.**
- **Composition / energy estimator** reports an **energy-equivalent** conversion
  fraction — the share of full MMA→PMMA polymerization energy that would account
  for the measured temperature rise. Mathematically the bulk mass and density
  cancel, so this percentage is the **same for any volume**; only the absolute
  Joules scale with volume. The estimate can be badly wrong if cooling removed
  significant heat, if internal temperatures are uneven, if there is venting, if
  material has gelled, or if pressure relief occurred. It is **not** a
  measurement of actual contents.
- **Vapor pressure** is the NOAA CHRIS **equilibrium** vapor pressure of the
  liquid — **not** total tank pressure. Actual tank pressure depends on venting,
  headspace, gas generation, blocked polymer, leaks/cracks, and structure.
- **Plume** content is conceptual education only. Real dispersion depends on
  wind, terrain, buildings, and conditions; simplified Gaussian tools (e.g.,
  NOAA ALOHA) have well-known limitations.
- **Exposure limits** (NIOSH/OSHA) are included for education. They are
  occupational limits for healthy adult workers, **not** residential
  safety-clearance levels.

All values are reported or assumed figures that carry real uncertainty.

---

## Sources

Full citations (with the role each plays) are listed in-app under
**Sources & Assumptions** and in `src/data/sources.ts`:

- California Governor — Proclamation of a State of Emergency (May 23, 2026)
- Associated Press — Garden Grove chemical tank crisis report (May 24, 2026)
- Reuters — tank temperature and cooling/stabilization report (May 23, 2026)
- NOAA CAMEO Chemicals — Methyl Methacrylate Monomer
- NOAA CHRIS — Methyl Methacrylate physical property table
- NIOSH Pocket Guide — Methyl Methacrylate
- BASF Safety Data Sheet — Methyl Methacrylate (rev. 2025/10/09)
- Methacrylate Producers Association / CEFIC — Methacrylate Esters Safe Handling
  Manual
- NIST Chemistry WebBook — Methyl methacrylate heat capacity
- NOAA ALOHA — limitations and assumptions
- Polymer-chemistry literature — MMA→PMMA heat of polymerization (~57.8 kJ/mol)

---

## Project structure

```
src/
  data/
    constants.ts      # scientific constants, thresholds, vapor-pressure table
    observations.ts   # editable tank-reading timeline (start here for updates)
    sources.ts        # source records + official channels
  lib/
    units.ts          # pure unit conversions (+ units.test.ts)
    model.ts          # the scientific model (+ model.test.ts)
    format.ts         # date formatting
  components/         # one component per dashboard section
  App.tsx             # page composition
  main.tsx            # entry point
```

## License

[MIT](./LICENSE).
