import type { Metadata } from 'next'
import BookmarksSection from '@/components/sections/BookmarksSection'

export const metadata: Metadata = {
  title: 'Bookmarks - Jorciney Dias Chaveiro',
  description: 'Curated collection of useful resources, articles, and tools for developers and tech enthusiasts.',
  keywords: 'bookmarks, resources, articles, tools, development, programming, technology',
}

export default function BookmarksPage() {
  return (
    <div className="pt-16">
      <BookmarksSection />
    </div>
  )
}