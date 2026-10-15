# Willow Wu: Personal Website

Static personal site: home, experience, resume, about, colophon, and four case studies.
No framework and no build step.

## Preview locally

From this folder:

```sh
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Publish

Upload the contents of this folder to any static host (GitHub Pages, Vercel, Netlify, Cloudflare Pages).

## Structure

- `index.html`, `path.html`, `resumes.html`, `about.html`, `colophon.html`
- `work/` case studies
- `styles.css` the only stylesheet; `app.js` image viewer and footer year
- `assets/fonts/` self-hosted Latin subsets of Newsreader and IBM Plex Sans
- `assets/projects/` approved public screenshots and illustrations only
- `assets/social/` Open Graph images

## Content sources

Facts on the site match the current resume in the private career repository
(`career_system/resume/variants/flagship_swe_ai.tex` and the project cards).
Employer work is described at the level of detail already on the resume.
