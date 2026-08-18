import type { Metadata } from 'next'
import BookmarksSection from '@/components/sections/BookmarksSection'
import { getBookmarksFromRss } from '@/lib/raindrop-rss'

export const metadata: Metadata = {
  title: 'Bookmarks - Jorciney Dias Chaveiro',
  description: 'Curated collection of useful resources, articles, and tools for developers and tech enthusiasts.',
  keywords: 'bookmarks, resources, articles, tools, development, programming, technology',
}

export default async function BookmarksPage() {
  // Fetched at build time — the browser cannot reach Raindrop directly because
  // the feed sends no CORS headers. See src/lib/raindrop-rss.ts.
  const bookmarks = await getBookmarksFromRss()

  return (
    <div className="pt-16">
      <BookmarksSection bookmarks={bookmarks} />
    </div>
  )
}
