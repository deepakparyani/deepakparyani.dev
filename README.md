# deepakparyani.dev

Personal site of Deepak Paryani — plain HTML/CSS/JS, deployed by GitHub Pages to
<https://deepakparyani.dev>.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | The main one-page site (hero, Now, About, Skills, Journey, Projects, Patent, GitHub, Contact) |
| `resume.html` | Print-ready résumé; "Print / Save as PDF" produces a PDF without a separate file to maintain |
| `404.html` | Served by GitHub Pages for unknown paths |
| `robots.txt`, `sitemap.xml` | Crawler hints — bump `lastmod` in the sitemap when content changes |

## Styling

Tailwind is **compiled at build time**; the CDN script is not used. Custom styles that Tailwind
can't express (glass cards, neon borders, animations, print rules) live in `css/style.css`.

- Source: `src/tailwind.css`
- Config: `tailwind.config.js` — the `content` list must include every file that can contain class names
- Output: `css/tailwind.css` (**generated — never edit by hand, but do commit it**)

After adding or changing any Tailwind class in `index.html`, `resume.html`, `404.html` or `js/`:

```bash
npm run build:css
```

Forgetting this is the one way to break the design: the class will simply not exist in the
committed stylesheet.

## Local development

```bash
npm install          # once
npm run build:css    # build css/tailwind.css
npm run serve        # http://localhost:8080
```

Use `npm run watch:css` while editing markup.

## Deployment

Pushing to `main` **is** the deploy — GitHub Pages is configured as "Deploy from a branch →
`main` / root", so there is no workflow and no build step in CI. A push goes live in about a
minute.

Two consequences worth remembering:

1. `css/tailwind.css` must be committed, because GitHub runs no build.
2. `CNAME` (containing `deepakparyani.dev`) must stay in the repo — deleting it drops the
   custom domain from Pages settings.

Check the live result with:

```bash
curl -s https://deepakparyani.dev/ | grep -c "Finarkein"
```

## Analytics (optional)

At the bottom of `index.html`, set `window.GOATCOUNTER_CODE` to the site code from a free
[cookieless GoatCounter](https://www.goatcounter.com) account. While it is empty, no analytics
script is loaded and nothing is tracked.

## Notes

- Journey/skill content is duplicated in `resume.html` — update both when a role changes.
- Social previews use `assets/images/profile.jpg` via the Open Graph tags in `index.html`.
- `node_modules/` and `.reasonix/` are git-ignored.
