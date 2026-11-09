# deepakparyani.dev

Personal site of Deepak Paryani — plain HTML/CSS/JS plus a Jekyll-powered blog, deployed by
GitHub Pages to <https://deepakparyani.dev>.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | The main one-page site (hero, Now, About, Skills, Journey, Projects, Writing, Patent, GitHub, Contact) |
| `resume.html` | Print-ready résumé; "Print / Save as PDF" produces a PDF without a separate file to maintain |
| `404.html` | Served by GitHub Pages for unknown paths |
| `blog/index.html` | Blog index with search — rendered by Jekyll at `/blog/` |
| `blog/tags.html` | Tag overview at `/blog/tags/` |
| `blog/tag/*.html` | One front-matter-only stub per tag (GitHub Pages has no `jekyll-archives`) |
| `_posts/*.md` | Blog posts, one Markdown file each |
| `_layouts/*.html` | `blog` (page shell), `post`, `tag` layouts |
| `robots.txt`, `sitemap.xml` | Crawler hints — `sitemap.xml` is Liquid and lists posts automatically |

Note: `index.html`, `resume.html`, `404.html`, `robots.txt` and `CNAME` deliberately have **no
front matter**, so Jekyll copies them byte-for-byte and the homepage can never be broken by a
template change.

## Writing a post

Posts are Markdown files in `_posts/` named `YYYY-MM-DD-slug.md` (the filename date must match
the `date:` in the front matter). The slug becomes the URL: `/blog/slug/`.

```yaml
---
title: "Your title"
description: "One-line summary used on the index, in search and in social previews."
date: 2026-11-09
tags: [agentic-ai, engineering]
---

Body in Markdown. Headings, lists, code blocks and tables all get `prose` styling.
```

Two ways to publish:

1. **Git** — add the file, `git push`. GitHub Pages builds it.
2. **Browser** — [Pages CMS](https://app.pagescms.org) reads `.pages.yml`; sign in with GitHub,
   pick this repo and use the "Posts" collection. It commits the correctly named Markdown file
   for you. Images uploaded there land in `assets/images/`.

**New tags need one extra file.** Because GitHub's Jekyll build has no `jekyll-archives`, add a
stub so `/blog/tag/<slug>/` exists:

```yaml
---
layout: tag
tag: your-tag
title: Writing on your tag
description: Posts about ...
permalink: /blog/tag/your-tag/
---
```

Then run `npm run build:css` (see below) — the tag index and chips pick the tag up from
`site.posts` automatically.

## Comments (optional)

Comments use [Giscus](https://giscus.app) (GitHub Discussions, no database). To switch them on:

1. Install the Giscus GitHub App on this repo and enable Discussions.
2. Copy the generated `data-repo-id` and `data-category-id` into the `giscus:` block of
   `_config.yml`.

Until both ids are non-empty, `_layouts/post.html` renders no comment script at all.

## Styling

Tailwind is **compiled locally and committed**; the CDN script is not used. Custom styles that
Tailwind can't express (glass cards, neon borders, animations, print rules) live in
`css/style.css`.

- Source: `src/tailwind.css`
- Config: `tailwind.config.js` — the `content` list must include every file that can contain class names
- Output: `css/tailwind.css` (**generated — never edit by hand, but do commit it**)

After adding or changing any Tailwind class in `index.html`, `resume.html`, `404.html`,
`_layouts/`, `blog/`, `_posts/` or `js/`:

```bash
npm run build:css
```

Forgetting this is the main way to break the design: the class will simply not exist in the
committed stylesheet. GitHub never runs Tailwind.

## Local development

```bash
npm install          # once
npm run build:css    # build css/tailwind.css
npm run serve        # http://localhost:8080
```

Use `npm run watch:css` while editing markup. There is no local Jekyll needed: `/blog/` pages are
rendered by GitHub Pages, so preview Markdown by pushing (or run Jekyll yourself if you have Ruby).

## Deployment

Pushing to `main` **is** the deploy — GitHub Pages is configured as "Deploy from a branch →
`main` / root". A push goes live in about a minute.

Three consequences worth remembering:

1. `css/tailwind.css` must be committed, because GitHub runs no Tailwind build.
2. `CNAME` (containing `deepakparyani.dev`) must stay in the repo — deleting it drops the
   custom domain from Pages settings.
3. Adding `_config.yml` switched Pages to a **Jekyll build**. If a build fails, GitHub keeps the
   last successful deploy live and reports the error in Settings → Pages.

Check the live result with:

```bash
curl -s https://deepakparyani.dev/blog/ | grep -c "Writing"
curl -s https://deepakparyani.dev/feed.xml | head -5
```

## Analytics (optional)

At the bottom of `index.html`, set `window.GOATCOUNTER_CODE` to the site code from a free
[cookieless GoatCounter](https://www.goatcounter.com) account. While it is empty, no analytics
script is loaded and nothing is tracked.

## Notes

- Journey/skill content is duplicated in `resume.html` — update both when a role changes.
- Social previews use `assets/images/profile.jpg` via the Open Graph tags.
- The homepage "Latest writing" card and blog search both read `/blog/search.json`, generated by
  Liquid — nothing to update by hand when you publish.
- `_config.yml` `exclude:` keeps `node_modules/`, `src/`, `package*.json`, `README.md` and
  `.pages.yml` out of the published site. Add new build-only files there too.
- `node_modules/` and `.reasonix/` are git-ignored.
