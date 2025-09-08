'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Calendar, Tag, Bookmark, Globe, Search, Filter, RefreshCw } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { RaindropBookmark } from '@/lib/types'
import { formatBookmarkDate, getBookmarkDomain, mockBookmarks } from '@/lib/raindrop'
import { fetchPublicRaindrops } from '@/lib/raindrop-client'

interface BookmarksSectionProps {
  initialBookmarks?: RaindropBookmark[]
  enableRuntimeFetch?: boolean
  publicCollectionId?: string
}

export default function BookmarksSection({ 
  initialBookmarks, 
  enableRuntimeFetch = false,
  publicCollectionId 
}: BookmarksSectionProps) {
  // Start with initial bookmarks (empty for runtime fetch)
  const [bookmarks, setBookmarks] = useState<RaindropBookmark[]>(initialBookmarks || [])
  const [loading, setLoading] = useState(enableRuntimeFetch) // Start loading if runtime fetch enabled
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [displayCount, setDisplayCount] = useState(6)
  const [error, setError] = useState<string | null>(null)

  // Runtime fetching for public collections (optional)
  useEffect(() => {
    if (enableRuntimeFetch && publicCollectionId) {
      fetchBookmarksRuntime()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Only run once on mount

  const fetchBookmarksRuntime = async () => {
    if (!publicCollectionId) return
    
    setLoading(true)
    setError(null)
    try {
      const fetchedBookmarks = await fetchPublicRaindrops(publicCollectionId)
      setBookmarks(fetchedBookmarks)
      if (fetchedBookmarks.length === 0) {
        setError('No bookmarks found in this collection')
      }
    } catch (err) {
      console.error('Failed to fetch bookmarks at runtime:', err)
      setError('Failed to load bookmarks. Please try again later.')
      // Fallback to mock data if fetch fails
      setBookmarks(mockBookmarks)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    if (enableRuntimeFetch && publicCollectionId) {
      fetchBookmarksRuntime()
    }
  }

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
            {enableRuntimeFetch && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
                {loading ? 'Loading...' : 'Refresh'}
              </Button>
            )}
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
              <span className="sr-only">Loading bookmarks...</span>
            </div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading bookmarks from Raindrop.io...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            {enableRuntimeFetch && (
              <Button variant="outline" onClick={handleRefresh}>
                Try Again
              </Button>
            )}
          </div>
        )}

        {/* Bookmarks Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedBookmarks.map((bookmark) => (
                <Card key={bookmark._id} hover className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2 mb-2">
                          {bookmark.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <Globe size={14} />
                          <span>{getBookmarkDomain(bookmark.link)}</span>
                          <Calendar size={14} className="ml-2" />
                          <span>{formatBookmarkDate(bookmark.createdDate)}</span>
                        </div>
                      </div>
                      <Bookmark size={20} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    </div>
                    
                    {bookmark.excerpt && (
                      <CardDescription className="line-clamp-3">
                        {bookmark.excerpt}
                      </CardDescription>
                    )}
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col justify-between">
                    {/* Tags */}
                    {bookmark.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
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
                      <div className="mb-4">
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
                      <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
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
                      <ExternalLink size={16} className="mr-2" />
                      Visit Link
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {filteredBookmarks.length > displayCount && (
              <div className="text-center mt-12">
                <Button variant="secondary" size="lg" onClick={handleLoadMore}>
                  Load More Bookmarks
                </Button>
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
        )}
      </div>
    </section>
  )
}