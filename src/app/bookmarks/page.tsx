import type { Metadata } from 'next'
import BookmarksSection from '@/components/sections/BookmarksSection'
import { getPublicBookmarks } from '@/lib/raindrop'

export const metadata: Metadata = {
  title: 'Bookmarks - Jorciney Dias Chaveiro',
  description: 'Curated collection of useful resources, articles, and tools for developers and tech enthusiasts.',
  keywords: 'bookmarks, resources, articles, tools, development, programming, technology',
}

// Fetch bookmarks at build time for static export
async function getBookmarks() {
  try {
    const collectionId = parseInt(process.env.RAINDROP_COLLECTION_ID || '0')
    const bookmarks = await getPublicBookmarks(collectionId, 0, 50)
    return bookmarks
  } catch (error) {
    console.error('Error fetching bookmarks at build time:', error)
    return []
  }
}

export default async function BookmarksPage() {
  const bookmarks = await getBookmarks()
  
  return (
    <div className="pt-16">
      <BookmarksSection initialBookmarks={bookmarks} />
    </div>
  )
}