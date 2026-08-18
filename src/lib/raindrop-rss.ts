// Build-time Raindrop.io integration.
//
// The site is a static export (`output: 'export'`), so there is no server at
// runtime. Fetching Raindrop from the browser does not work either: the public
// RSS endpoint at bg.raindrop.io does not send an Access-Control-Allow-Origin
// header, so the browser blocks the request. Instead we fetch the feed here,
// during `next build`, where CORS does not apply, and bake the result into the
// generated HTML.
//
// Because the data is baked in at build time, new bookmarks show up on the site
// after the next deploy.

import { RaindropBookmark } from './types'

/** Public collection: https://raindrop.io/jorcineydias/dev-39074771 */
export const PUBLIC_COLLECTION_ID = '39074771'

const RSS_BASE_URL = 'https://bg.raindrop.io/rss/public'

function decodeEntities(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
}

function firstTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`))
  return match ? decodeEntities(match[1]).trim() : ''
}

function allTags(xml: string, tag: string): string[] {
  const matches = xml.matchAll(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'g'))
  return Array.from(matches, (m) => decodeEntities(m[1]).trim()).filter(Boolean)
}

function domainOf(link: string): string {
  try {
    return new URL(link).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

function toIsoDate(pubDate: string): string {
  const parsed = new Date(pubDate)
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString()
}

/** Pull the cover image out of the description HTML Raindrop puts in the feed. */
function coverOf(description: string): string {
  const match = description.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match ? match[1] : ''
}

/**
 * Reduce the description HTML to plain text.
 *
 * The feed's description is `<img …/><br/>Some summary`. The image is surfaced
 * separately via `cover`, and stripping the markup here means the component
 * never has to sanitize untrusted HTML in the browser.
 */
function summaryOf(description: string): string {
  return description
    .replace(/<img[^>]*>/gi, '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function parseRssItems(xml: string, collectionId: string): RaindropBookmark[] {
  const items = xml.split('<item>').slice(1).map((chunk) => chunk.split('</item>')[0])

  return items.map((item, index) => {
    const link = firstTag(item, 'link')
    const description = firstTag(item, 'description')

    return {
      // The feed has no numeric ids; the guid is the link, so derive a stable
      // key from the position in the feed.
      _id: index + 1,
      title: firstTag(item, 'title') || 'Untitled',
      excerpt: summaryOf(description),
      note: '',
      type: 'link',
      cover: coverOf(description),
      tags: allTags(item, 'category'),
      domain: domainOf(link),
      createdDate: toIsoDate(firstTag(item, 'pubDate')),
      lastUpdate: toIsoDate(firstTag(item, 'pubDate')),
      link,
      collection: {
        $id: Number(collectionId) || 0,
        title: firstTag(xml.split('<item>')[0], 'title') || 'Bookmarks',
        color: '#3B82F6',
      },
    }
  })
}

/**
 * Fetch bookmarks from a public Raindrop collection's RSS feed.
 *
 * Runs on the server at build time. Returns an empty array on failure so a
 * flaky network never breaks the build — the page renders its empty state.
 */
export async function getBookmarksFromRss(
  collectionId: string = PUBLIC_COLLECTION_ID
): Promise<RaindropBookmark[]> {
  const url = `${RSS_BASE_URL}/${collectionId}`

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/rss+xml, text/xml' },
    })

    if (!response.ok) {
      console.warn(`[raindrop] RSS feed returned ${response.status} for ${url}`)
      return []
    }

    const bookmarks = parseRssItems(await response.text(), collectionId)
    console.info(`[raindrop] Loaded ${bookmarks.length} bookmarks at build time`)
    return bookmarks
  } catch (error) {
    console.warn('[raindrop] Failed to fetch RSS feed at build time:', error)
    return []
  }
}
