import { NextResponse } from 'next/server'
import { getPublicBookmarks, mockBookmarks } from '@/lib/raindrop'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const collectionId = parseInt(searchParams.get('collection') || process.env.RAINDROP_COLLECTION_ID || '0')
    const page = parseInt(searchParams.get('page') || '0') 
    const perpage = parseInt(searchParams.get('perpage') || '25')
    
    // This runs server-side so environment variables are available
    const isDebug = process.env.DEBUG_RAINDROP === 'true'
    
    if (isDebug) {
      console.log('🔍 API Route: Starting bookmark fetch...')
      console.log('📋 Collection ID:', collectionId)
      console.log('📄 Page:', page, 'Per page:', perpage)
    }
    
    const bookmarks = await getPublicBookmarks(collectionId, page, perpage)
    
    // If no bookmarks from API, return mock data
    if (bookmarks.length === 0) {
      console.log('📚 API Route: Using mock data fallback')
      return NextResponse.json({
        items: mockBookmarks,
        source: 'mock'
      })
    }
    
    console.log(`✅ API Route: Returning ${bookmarks.length} bookmarks from Raindrop.io`)
    return NextResponse.json({
      items: bookmarks,
      source: 'raindrop'
    })
    
  } catch (error) {
    console.error('❌ API Route Error:', error)
    return NextResponse.json({
      items: mockBookmarks,
      source: 'mock_error'
    })
  }
}