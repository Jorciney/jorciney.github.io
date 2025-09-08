// Client-side Raindrop API for public collections
// This fetches public collections without authentication

import { RaindropBookmark, RaindropResponse } from './types'

const RAINDROP_PUBLIC_API = 'https://api.raindrop.io/rest/v1/raindrops'

export async function fetchPublicRaindrops(collectionId: string | number): Promise<RaindropBookmark[]> {
  try {
    // Public collections can be accessed without authentication
    // The collection must be set to "public" in Raindrop.io settings
    const url = `${RAINDROP_PUBLIC_API}/${collectionId}`
    
    console.log('🔍 Fetching public bookmarks from Raindrop...')
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      console.error(`Raindrop API returned ${response.status}`)
      return []
    }

    const data: RaindropResponse = await response.json()
    console.log(`✅ Fetched ${data.items?.length || 0} public bookmarks`)
    
    return data.items || []
  } catch (error) {
    console.error('Error fetching public raindrops:', error)
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