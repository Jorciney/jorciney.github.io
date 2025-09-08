// Client-side Raindrop API for public collections
// This fetches public collections without authentication

import { RaindropBookmark } from './types'

export async function fetchPublicRaindrops(collectionId: string | number): Promise<RaindropBookmark[]> {
  try {
    // Use the CORS-friendly bg.raindrop.io RSS endpoint
    const feedUrl = `https://bg.raindrop.io/rss/public/${collectionId}`
    
    console.log('🔍 Fetching public bookmarks from RSS feed:', feedUrl)
    
    const response = await fetch(feedUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/rss+xml, text/xml',
      },
      // Disable caching for runtime fetches to get latest data
      cache: 'no-cache'
    })

    if (!response.ok) {
      console.error(`Raindrop RSS feed returned ${response.status}`)
      return []
    }

    const xmlText = await response.text()
    console.log('📥 Retrieved RSS XML content')
    
    // Parse XML using DOMParser (available in browsers)
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml')
    
    // Check for parsing errors
    const parserError = xmlDoc.querySelector('parsererror')
    if (parserError) {
      console.error('XML parsing error:', parserError.textContent)
      return []
    }
    
    // Extract items from RSS
    const items = xmlDoc.querySelectorAll('item')
    const bookmarks: RaindropBookmark[] = Array.from(items).map((item, index) => {
      const title = item.querySelector('title')?.textContent || 'Untitled'
      const link = item.querySelector('link')?.textContent || ''
      const description = item.querySelector('description')?.textContent || ''
      const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString()
      
      // Extract tags from category elements
      const categories = item.querySelectorAll('category')
      const tags = Array.from(categories).map(cat => cat.textContent || '').filter(Boolean)
      
      // Extract domain from link
      let domain = ''
      try {
        domain = new URL(link).hostname.replace('www.', '')
      } catch {
        domain = 'unknown'
      }
      
      // Convert pubDate to ISO string
      let createdDate = new Date().toISOString()
      try {
        createdDate = new Date(pubDate).toISOString()
      } catch {
        console.warn('Could not parse date:', pubDate)
      }
      
      return {
        _id: index + 1, // Use index as ID since RSS doesn't have unique IDs
        title,
        excerpt: description,
        note: '',
        type: 'link',
        cover: '',
        tags,
        domain,
        createdDate,
        lastUpdate: createdDate,
        link,
        collection: {
          $id: parseInt(collectionId.toString()) || 0,
          title: 'Dev Resources',
          color: '#3B82F6'
        }
      }
    })
    
    console.log(`✅ Parsed ${bookmarks.length} bookmarks from RSS feed`)
    return bookmarks
  } catch (error) {
    console.error('Error fetching public raindrops from RSS feed:', error)
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