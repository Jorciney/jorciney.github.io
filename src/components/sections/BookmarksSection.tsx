'use client'

import { useState } from 'react'
import { ExternalLink, Calendar, Tag, Bookmark, Globe, Search, Filter } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { RaindropBookmark } from '@/lib/types'
import { formatBookmarkDate, getBookmarkDomain } from '@/lib/raindrop'
import '@/styles/bookmark-content.css'

interface BookmarksSectionProps {
  /** Fetched from Raindrop at build time — see src/lib/raindrop-rss.ts */
  bookmarks: RaindropBookmark[]
}

export default function BookmarksSection({ bookmarks }: BookmarksSectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [displayCount, setDisplayCount] = useState(6)

  // Get all unique tags
  const allTags = Array.from(
    new Set(bookmarks.flatMap(bookmark => bookmark.tags))
  ).sort()

  // Filter bookmarks based on search and tag
  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = searchTerm === '' || 
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesTag = selectedTag === null || bookmark.tags.includes(selectedTag)
    
    return matchesSearch && matchesTag
  })

  const displayedBookmarks = filteredBookmarks.slice(0, displayCount)

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6)
  }

  return (
    <section id="bookmarks" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">My Bookmarks</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Curated collection of useful resources, articles, and tools I&apos;ve discovered
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-4 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedTag === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTag(null)}
              >
                <Filter size={16} className="mr-2" />
                All
              </Button>
              {allTags.slice(0, 10).map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTagClick(tag)}
                >
                  <Tag size={16} className="mr-2" />
                  {tag}
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Bookmarks Grid */}
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayedBookmarks.map((bookmark) => {
                // Both are prepared at build time in src/lib/raindrop-rss.ts.
                const imageUrl = bookmark.cover || null
                const cleanText = bookmark.excerpt

                return (
                  <Card key={bookmark._id} hover className="h-full overflow-hidden group hover:shadow-lg transition-all duration-300">
                    <div className="p-4">
                      {/* Image positioned at top-start */}
                      <div className="float-left mr-3 mb-2">
                        <div className="w-16 h-16 flex-shrink-0">
                          {imageUrl ? (
                            <div className="w-full h-full relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 shadow-sm">
                              <img
                                src={imageUrl}
                                alt={bookmark.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg flex items-center justify-center shadow-sm">
                              <Globe size={24} className="text-blue-400 dark:text-blue-300 opacity-60" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content that wraps around and below the image */}
                      <div className="overflow-hidden">
                        {/* Title with bookmark icon */}
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {bookmark.title}
                          </h3>
                          <Bookmark size={18} className="text-blue-500 dark:text-blue-400 flex-shrink-0 ml-2 opacity-70" />
                        </div>
                        
                        {/* Meta information */}
                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Globe size={12} />
                            <span>{getBookmarkDomain(bookmark.link)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{formatBookmarkDate(bookmark.createdDate)}</span>
                          </div>
                        </div>
                        
                        {/* Description */}
                        {cleanText && (
                          <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 bookmark-content mb-4 clear-left">
                            {cleanText}
                          </div>
                        )}

                        {/* Content section - positioned below the image */}
                        <div className="clear-left space-y-3">
                          {/* Tags */}
                          {bookmark.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {bookmark.tags.slice(0, 4).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  size="sm"
                                  className="cursor-pointer"
                                  onClick={() => handleTagClick(tag)}
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {bookmark.tags.length > 4 && (
                                <Badge variant="outline" size="sm">
                                  +{bookmark.tags.length - 4}
                                </Badge>
                              )}
                            </div>
                          )}

                          {/* Collection */}
                          {bookmark.collection && (
                            <div>
                              <Badge
                                variant="outline"
                                className="border-2"
                                style={{ borderColor: bookmark.collection.color }}
                              >
                                {bookmark.collection.title}
                              </Badge>
                            </div>
                          )}

                          {/* Note */}
                          {bookmark.note && (
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                              <p className="text-sm text-blue-800 dark:text-blue-200 italic">
                                &quot;{bookmark.note}&quot;
                              </p>
                            </div>
                          )}

                          {/* Action Button */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => window.open(bookmark.link, '_blank', 'noopener,noreferrer')}
                          >
                            <ExternalLink size={14} className="mr-2" />
                            Visit Link
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Load More Button */}
            {filteredBookmarks.length > displayCount && (
              <div className="text-center mt-12">
                <Button variant="secondary" size="lg" onClick={handleLoadMore}>
                  Load More Bookmarks
                </Button>
              </div>
            )}

            {/* Feed unavailable at build time */}
            {bookmarks.length === 0 && (
              <div className="text-center py-12">
                <Bookmark size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">Bookmarks unavailable</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Browse the collection directly on{' '}
                  <a
                    href="https://raindrop.io/jorcineydias/dev-39074771"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Raindrop.io
                  </a>
                  .
                </p>
              </div>
            )}

            {/* No Results */}
            {filteredBookmarks.length === 0 && bookmarks.length > 0 && (
              <div className="text-center py-12">
                <Bookmark size={48} className="mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2">No bookmarks found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}

            {/* Raindrop Attribution */}
            <div className="mt-16 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bookmarks powered by{' '}
                <a
                  href="https://raindrop.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Raindrop.io
                </a>
              </p>
            </div>
        </>
      </div>
    </section>
  )
}