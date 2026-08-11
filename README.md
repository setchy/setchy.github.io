[![Netlify Status][netlify-badge]][netlify-deploys] [![Renovate enabled][renovate-badge]][renovate]

## My Personal Site

This repository contains the content for [setchy.io][setchyio].

### Tech Stack

- [Astro][astro]
- [Netlify][netlify-deploys]

### Local Development

To run locally:

```
npm install
npm run dev
```

The site will be served at http://localhost:4321

### Build

```
npm run build
```

The static output is written to `dist/`.

### Content

Section pages live in `src/content/sections/` as markdown files with
frontmatter (`title`, `date`, `tags`, `permalink`, `cover`). The About page
lives in `src/content/pages/`.

### Deploy

The site is deployed to Netlify from the `main` branch. Build command is
`npm run build`, publish directory is `dist` (see `netlify.toml`).

## Package updates

Run the following to check for any dependency updates:

```
npm update
```

[netlify-badge]: https://img.shields.io/netlify/9abe65ca-45b7-47c3-a0c8-8338b6c1252c?logo=netlify&logoColor=white
[netlify-deploys]: https://app.netlify.com/projects/setchy/deploys
[setchyio]: https://setchy.io
[astro]: https://astro.build
[renovate-badge]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?logo=renovate&logoColor=white
[renovate]: https://renovatebot.com
