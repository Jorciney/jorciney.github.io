// Client-side Raindrop API for public collections
// This fetches public collections without authentication

import { RaindropBookmark } from './types'

// Feed item interface (might differ from API format)
interface FeedItem {
  id?: number
  _id?: number
  title: string
  excerpt?: string
  description?: string
  note?: string
  type?: string
  cover?: string
  tags?: string[]
  domain?: string
  created?: string
  createdDate?: string
  lastUpdate?: string
  link?: string
  url?: string
  collection?: {
    $id: number
    title: string
    color?: string
  }
}

export async function fetchPublicRaindrops(collectionId: string | number): Promise<RaindropBookmark[]> {
  try {
    // Use the public feed endpoint which doesn't require authentication
    // Format: https://raindrop.io/{username}/{collection-slug}-{collection-id}/feed
    // For your collection: https://raindrop.io/jorcineydias/dev-39074771/feed
    
    let feedUrl: string
    if (collectionId === '39074771' || collectionId === 39074771) {
      // Your specific public collection
      feedUrl = 'https://raindrop.io/jorcineydias/dev-39074771/feed'
    } else {
      // Generic format - might need adjustment for other collections
      feedUrl = `https://raindrop.io/collection/${collectionId}/feed`
    }
    
    console.log('🔍 Fetching public bookmarks from feed:', feedUrl)
    
    const response = await fetch(feedUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Disable caching for runtime fetches to get latest data
      cache: 'no-cache'
    })

    if (!response.ok) {
      console.error(`Raindrop feed returned ${response.status}`)
      return []
    }

    const data = await response.json()
    console.log(`✅ Fetched ${data.items?.length || 0} public bookmarks from feed`)
    
    // The feed format might be different from the API format
    // Let's map it to our expected structure
    const bookmarks = data.items?.map((item: FeedItem): RaindropBookmark => ({
      _id: item.id || item._id || 0,
      title: item.title,
      excerpt: item.excerpt || item.description || '',
      note: item.note || '',
      type: item.type || 'link',
      cover: item.cover || '',
      tags: item.tags || [],
      domain: item.domain || '',
      createdDate: item.created || item.createdDate || new Date().toISOString(),
      lastUpdate: item.lastUpdate || item.created || new Date().toISOString(),
      link: item.link || item.url || '',
      collection: item.collection ? {
        $id: item.collection.$id,
        title: item.collection.title,
        color: item.collection.color || '#666666'
      } : undefined
    })) || []
    
    return bookmarks
  } catch (error) {
    console.error('Error fetching public raindrops from feed:', error)
    return []
  }
}

// Alternative: Fetch using collection's public RSS feed
export async function fetchViaPublicRSS(username: string, collectionSlug: string): Promise<RaindropBookmark[]> {
  try {
    // Raindrop provides public RSS feeds for public collections
    // Format: https://raindrop.io/collection/{collection-id}/feed
    // or: https://raindrop.io/{username}/{collection-slug}/feed
    const rssUrl = `https://raindrop.io/${username}/${collectionSlug}/feed`
    
    console.log('📡 Fetching via RSS feed:', rssUrl)
    
    // Note: RSS feeds return XML, would need parsing
    // This is just a placeholder for the approach
    const response = await fetch(rssUrl)
    
    if (!response.ok) {
      console.error(`RSS feed returned ${response.status}`)
      return []
    }
    
    // Would need to parse RSS XML to bookmarks format
    // For now, returning empty array
    console.log('⚠️ RSS parsing not implemented yet')
    return []
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    return []
  }
}