# jorciney.dev

Personal portfolio and technical blog of **Jorciney Dias Chaveiro** — Technology Lead & Full Stack Developer.

Live at **[jorciney.dev](https://jorciney.dev)**.

## Tech stack

- **[Next.js 15](https://nextjs.org)** (App Router) with static export (`output: 'export'`)
- **React 19** + **TypeScript**
- **Tailwind CSS** with dark/light theming (`next-themes`)
- Markdown/MDX blog posts, Raindrop.io-powered bookmarks
- Deployed to **GitHub Pages** via GitHub Actions (`.github/workflows/nextjs-deploy.yml`)

## Development

```bash
npm install       # install dependencies
npm run dev       # start the dev server at http://localhost:3000
npm run build     # production build → static export in out/
npm run lint      # run ESLint
```

## Project structure

- `src/app/` — App Router routes (home, `/blog`, `/bookmarks`, `/qr`)
- `src/components/` — UI, layout, and section components
- `src/data/` — content data (projects, blog metadata)
- `src/lib/` — utilities and feature logic (e.g. `qr/` for the QR generator)
- `public/` — static assets

## Deployment

Pushes to `master` trigger the **Deploy Next.js to GitHub Pages** workflow, which builds the
static export and publishes it. Pages **Source** must be set to **GitHub Actions** (Settings →
Pages), not "Deploy from a branch" — the branch mode would run Jekyll and serve this README
instead of the built site.
