# 🌧️ Raindrop.io Bookmarks Integration

The `/bookmarks` page shows the bookmarks from the public Raindrop collection
[jorcineydias/dev-39074771](https://raindrop.io/jorcineydias/dev-39074771).

## How it works

This site is a static export (`output: 'export'` in `next.config.mjs`), so there
is no server running at request time. The bookmarks are therefore fetched
**during `next build`**, in `src/lib/raindrop-rss.ts`, and baked into the
generated HTML.

```
next build ──▶ fetch https://bg.raindrop.io/rss/public/39074771
           ──▶ parse RSS into RaindropBookmark[]
           ──▶ src/app/bookmarks/page.tsx (server component)
           ──▶ BookmarksSection renders static HTML
```

No API token is required — the collection is public and the feed is open.

## Why not fetch from the browser?

That was the previous approach and it silently failed. The Raindrop RSS endpoint
responds fine, but it does **not** send an `Access-Control-Allow-Origin` header,
so the browser blocks any cross-origin `fetch()` from `jorciney.dev`. The page
ended up with an empty list.

You can confirm the missing header at any time:

```bash
curl -sI https://bg.raindrop.io/rss/public/39074771 | grep -i access-control
# (no output — no CORS header)
```

Fetching at build time avoids the problem entirely, since CORS is a browser
restriction and does not apply server-side.

## Updating the bookmarks on the site

Bookmarks are a build-time snapshot. After adding bookmarks in Raindrop, push a
commit (or re-run the Pages deploy) and the new build picks them up.

## Changing the collection

The collection must be **public** (Raindrop → collection → Share → "Anyone with
the link"). Then update the ID in `src/lib/raindrop-rss.ts`:

```ts
export const PUBLIC_COLLECTION_ID = '39074771'
```

The ID is the number at the end of the collection URL.

## What the feed provides

| Field | Source |
|---|---|
| `title` | `<title>` |
| `link` | `<link>` |
| `excerpt` | `<description>`, with markup stripped |
| `cover` | the `<img>` inside `<description>` |
| `tags` | `<category>` elements |
| `createdDate` | `<pubDate>` |

Raindrop's private notes are not exposed in the public feed, so `note` is always
empty.

## Troubleshooting

Run a build and check the log — the fetch reports what it got:

```bash
npm run build
# [raindrop] Loaded 29 bookmarks at build time
```

If the feed is unreachable, the build logs a warning, keeps going, and the page
renders a "Bookmarks unavailable" state that links to the collection directly. A
flaky network never breaks the build.

If you see 0 bookmarks, verify the collection is still public:

```bash
curl -s https://bg.raindrop.io/rss/public/39074771 | grep -c '<item>'
```
