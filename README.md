# David Alvarez — portfolio

A small Vite + React site. The only dependencies are react, react-dom, vite and @vitejs/plugin-react.

## Run it
    npm install
    npm run dev       # local dev server at http://localhost:5173
    npm run build     # production build into dist/
    npm run preview   # serve the production build locally

## Deploy to GitHub Pages
The site is set up for GitHub Pages and works at either `username.github.io` or `username.github.io/<repo>/`
with no config changes (asset and media paths are relative).

1. Push this folder to a GitHub repo with a `main` branch.
2. In the repo, go to Settings → Pages and set Source to **GitHub Actions**.
3. Every push to `main` now builds and publishes the site (`.github/workflows/deploy.yml`).
   You can also run it by hand from the Actions tab.

Keep media paths in the data files relative (`media/clip.mp4`, no leading slash), or they will break
when the site is served from a repo subfolder. GitHub's servers are case-sensitive, so file names must
match their paths exactly.

### Custom domain (optional)
The site runs at `https://techpointyt.github.io/portfolio/` by default. To move it to your own domain later:

1. Buy the domain from any registrar.
2. At the registrar, add DNS records pointing it at GitHub Pages:

   | Type | Name | Value |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | AAAA | @ | 2606:50c0:8000::153 |
   | AAAA | @ | 2606:50c0:8001::153 |
   | AAAA | @ | 2606:50c0:8002::153 |
   | AAAA | @ | 2606:50c0:8003::153 |
   | CNAME | www | techpointyt.github.io |

3. In the repo, go to Settings → Pages → Custom domain, enter the domain, and save.
   Once the DNS check passes (it can take up to a day), turn on **Enforce HTTPS**.
4. Recommended: verify the domain under your GitHub account Settings → Pages, so nobody else can claim it.

No code changes are needed: asset and media paths are relative. Because this repo deploys with GitHub Actions,
the domain lives in the repo settings, and a `CNAME` file is not needed (GitHub ignores it for Actions deployments).

## Add your media
Put these in `public/media/`:

| File | What it is |
| --- | --- |
| `loop-drawing.mp4` | Short silent loop, "Draw your hero" (phone screen recording, 1080×2340) |
| `loop-pageturn.mp4` | Short silent loop, "Turn the page" |
| `loop-firstpage.mp4` | Short loop **with narration**, "The story begins" (gets a "Turn sound on" button) |
| `plantbuddy-loop-*.mp4` | The three PlantBuddy loops (same pattern, all silent) |

The full walkthroughs are YouTube Shorts, set with `full: { youtube: '<video id>' }` in `src/data/projects.js`.
They open in YouTube's player inside the dialog, which only loads when the dialog opens.

Until a file exists, its spot shows a dashed "Add … to public/media." placeholder instead of breaking.
Keep the loops short and small (a few MB each). They load only their metadata until they scroll into view.

## Add a project
Edit `src/data/projects.js`. That is the only file you need to change.

- Each project gets a full section like Storybook: `loops` (any number of clips), plus optional `full`, `story` and `stack`.
  Set `audio: true` on a loop to give it a sound toggle. Sections appear in the order they are listed.

## Tweak the motion
- Hero letters: `letterDelay()` in `src/sections/Hero.jsx` and `@keyframes settle` in `src/styles/sections/hero.css`
- Hero grain (same file): `.hero__grain`, `@keyframes denoise` and `@keyframes drift`
- Scroll reveals: `.reveal` in `src/styles/components/reveal.css` (blur, distance, timing). Use `<Reveal delay={…}>` to stagger siblings.

When the visitor prefers reduced motion, all reveals and animations are off. The loops then don't autoplay and show native controls instead.

## Project structure

    src/
      data/         all the words: projects.js, ideas.js, and site.js (hero, about, ideas intro, contact links)
      sections/     the parts of the page, top to bottom: WavyPixels, Nav, Hero, About, ProjectShowcase, Ideas, Contact
      components/   reusable pieces: Reveal, LoopTile, WalkthroughDialog, MissingMedia
      hooks/        useReveal (scroll-in), useReducedMotion
      styles/       mirrors the folders above; index.css loads everything in order

To change wording, edit a file in `src/data/`. Components only handle layout and behavior.
Each component has a matching stylesheet named after it in kebab case, for example
`src/sections/ProjectShowcase.jsx` and `src/styles/sections/project-showcase.css`. Each stylesheet holds
all the rules for that piece, including its phone-width and reduced-motion rules; `src/styles/base/`
has the design tokens, element defaults and page layout.

