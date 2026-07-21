# Vite Migration Plan

Goal: move the site to Vite while keeping the public site visually and behaviorally the same. The migration should make the code easier to reason about, not introduce a framework for its own sake.

## Guiding Principles

- Keep the site the same for visitors.
- Favor simple modules over clever abstractions.
- Make the file structure easier to scan than one large script.
- Keep authored page copy in HTML.
- Keep repeated content records in data modules.
- Keep generated UI and behavior in focused rendering modules.
- Preserve GitHub Pages hosting through a build-and-deploy flow.
- Do not commit or deploy `dist/`.

## Phase 0: Branch And Baseline

Start from a new branch:

```sh
git switch -c vite-migration
```

Before changing structure, capture the current behavior:

- Homepage loads.
- Featured video poster loads.
- Clicking the poster starts the YouTube embed.
- Video selector changes the active video.
- Musicians render.
- Performances group into Upcoming and Previous.
- Contact email and copy button work.
- EPK and Stage Plot pages still render.

Use screenshots or notes as a visual baseline. The first migration pass should not redesign anything.

## Phase 1: Add Vite With Minimal Movement

Add Vite and update scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "latest"
  }
}
```

Keep the current HTML pages at the root:

- `index.html`
- `epk.html`
- `stage-plot.html`

Vite can serve multiple root HTML pages directly, so there is no need to turn this into a single-page app.

## Phase 2: Introduce A Clear `src/` Structure

Create a structure like:

```txt
src/
  content/
    musicians.js
    performances.js
    site-content.js
    videos.js
  render/
    epk-cards.js
    musicians.js
    performances.js
    stage-plot.js
    videos.js
  behavior/
    copy-buttons.js
    reveal.js
  main.js
```

The intent:

- `content/` holds data records.
- `render/` turns records into DOM.
- `behavior/` wires interactions.
- `main.js` imports the pieces and runs initialization.

Avoid creating components or classes unless they make the code clearer.

## Phase 3: Convert Content Files To Modules

Replace global mutation:

```js
window.GLP_CONTENT.videos = [...]
```

with named exports:

```js
export const videos = [...]
```

Do the same for:

- `site`
- `videos`
- `musicians`
- `performances`

Then `main.js` can import them:

```js
import { site } from "./content/site-content.js";
import { videos } from "./content/videos.js";
import { musicians } from "./content/musicians.js";
import { performances } from "./content/performances.js";
```

This removes the invisible dependency on script order and `window.GLP_CONTENT`.

## Phase 4: Split `site.js` By Responsibility

Move code out of the current large `scripts/site.js` into focused modules:

```txt
render/videos.js
render/musicians.js
render/performances.js
render/epk-cards.js
render/stage-plot.js
behavior/reveal.js
behavior/copy-buttons.js
```

Suggested function shape:

```js
export const renderVideos = ({ videos, site }) => {
  // render video selector
};
```

```js
export const initFeaturedVideo = () => {
  // wire active poster/player behavior
};
```

Keep functions boring and explicit. The win is discoverability, not abstraction.

## Phase 5: Update HTML Script Loading

Replace the current list of script tags:

```html
<script src="scripts/content/site-content.js"></script>
<script src="scripts/content/videos.js"></script>
<script src="scripts/content/musicians.js"></script>
<script src="scripts/content/performances.js"></script>
<script src="scripts/site.js"></script>
```

with one module entry:

```html
<script type="module" src="/src/main.js"></script>
```

Remove manual cache-busting query strings from local files. Vite handles hashed production assets during build.

## Phase 6: Keep Authored Copy In HTML

Preserve the current content boundary:

HTML owns:

- Hero copy.
- Featured video section intro.
- About section copy and image.
- Musicians section intro.
- Performances section intro.
- Booking/contact section prose.

JS owns:

- Video selector buttons.
- Active featured video state.
- Musician cards.
- Performance rows/groups.
- EPK cards.
- Stage plot generated lists.
- Shared booking email setting.
- Copy button behavior.
- Reveal behavior.

This is the rule that should keep the project from feeling mysterious again.

## Phase 7: GitHub Pages Build And Deploy

Use Vite’s build output for deployment, but do not commit `dist/`.

Recommended flow:

```sh
npm run build
```

Then deploy the generated output through GitHub Pages using an action or a deployment tool. Keep source files in the repo; let the deployment process publish the build artifact.

If the site is served from a project subpath, configure Vite’s `base` value before deployment:

```js
export default {
  base: "/gordon-lightfoot-project/"
};
```

If it is served from a custom domain/root, keep:

```js
export default {
  base: "/"
};
```

Confirm this before the deploy step.

## Phase 8: Verification

After migration, verify:

- `npm run dev` serves all pages.
- `npm run build` succeeds.
- `npm run preview` serves the built site.
- Homepage visual layout matches the baseline.
- Video poster and pick play button work.
- YouTube iframe is not present until click.
- Video selector changes title, vocalist, venue, date, poster, and embed.
- Musicians render.
- Performances group by current date, with today counted as Upcoming.
- Booking email is populated everywhere it should be.
- Copy email button works.
- EPK page cards render.
- Stage Plot page renders generated stage/tech content.
- No stable homepage prose is overwritten by JavaScript.

## Possible Follow-Up Cleanup

After the Vite migration is working, consider:

- Remove old `scripts/` content files.
- Normalize CSS comments and temporary experiments.
- Decide whether page-specific entry files would be clearer than one `main.js`.
- Add a short `CONTENT_GUIDE.md` update explaining where to edit videos, musicians, performances, and stable page copy.
- Add a deploy workflow for GitHub Pages.

Do not bundle these cleanups into the first migration unless they are necessary. First make the site work exactly as it does now, with a clearer structure.
