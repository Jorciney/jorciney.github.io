import type { Metadata } from 'next'
import BookmarksSection from '@/components/sections/BookmarksSection'

export const metadata: Metadata = {
  title: 'Bookmarks - Jorciney Dias Chaveiro',
  description: 'Curated collection of useful resources, articles, and tools for developers and tech enthusiasts.',
  keywords: 'bookmarks, resources, articles, tools, development, programming, technology',
}

export default function BookmarksPage() {
  // Your public collection ID from https://raindrop.io/jorcineydias/dev-39074771
  const publicCollectionId = '39074771'
  
  return (
    <div className="pt-16">
      <BookmarksSection 
        initialBookmarks={[]} // Start with empty, will fetch at runtime
        enableRuntimeFetch={true} // Enable runtime fetching for public collection
        publicCollectionId={publicCollectionId}
      />
    </div>
  )
}