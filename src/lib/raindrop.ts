import { RaindropBookmark, RaindropCollection, RaindropResponse } from './types'

const RAINDROP_CLIENT_ID = '68b4c6fbf7052835d3498526'
const RAINDROP_BASE_URL = 'https://api.raindrop.io/rest/v1'

/*
 * Raindrop.io API Integration
 * 
 * TROUBLESHOOTING GUIDE:
 * 
 * If you're seeing mock data instead of your real bookmarks:
 * 
 * 1. TOKEN ISSUES:
 *    - Ensure RAINDROP_TOKEN is set in your .env file
 *    - Token should be 36 characters long
 *    - Get token from: https://app.raindrop.io/settings/integrations
 *    - Create new "App", NOT just a test token
 * 
 * 2. AUTHENTICATION FAILURES (401 errors):
 *    - Check that you're using the "Test Token" from your created app
 *    - Verify the token hasn't expired
 *    - Make sure you have bookmarks in your Raindrop.io account
 * 
 * 3. ALTERNATIVE SOLUTION - Static Export:
 *    If API continues to fail, you can use static data:
 *    - Go to https://app.raindrop.io/settings/backups
 *    - Export bookmarks as JSON
 *    - Replace mockBookmarks array below with your exported data
 * 
 * 4. DEBUGGING:
 *    - Check browser console for error messages
 *    - Look at Network tab to see API requests
 *    - Set DEBUG_RAINDROP=true in .env for more logs
 */

export async function getPublicBookmarks(collectionId: number = 0, page: number = 0, perpage: number = 25): Promise<RaindropBookmark[]> {
  const isDebug = process.env.DEBUG_RAINDROP === 'true'
  
  try {
    const token = process.env.RAINDROP_TOKEN
    
    if (!token) {
      console.info('📚 No RAINDROP_TOKEN found - using mock data for demonstration')
      if (isDebug) {
        console.log('💡 To use real bookmarks, add RAINDROP_TOKEN to your .env file')
        console.log('💡 Get your token from: https://app.raindrop.io/settings/integrations')
      }
      return []
    }
    
    if (isDebug) {
      console.log(`🔍 Attempting to fetch bookmarks from collection ${collectionId}`)
      console.log(`🔑 Token length: ${token.length} characters`)
    }
    
    // Try Bearer token authentication first, then fallback to query parameter
    const baseUrl = `${RAINDROP_BASE_URL}/raindrops/${collectionId}`
    const params = new URLSearchParams({
      page: page.toString(),
      perpage: perpage.toString()
    })
    const url = `${baseUrl}?${params.toString()}`
    
    if (isDebug) {
      console.log('🌐 Making request to:', url)
      console.log('🔐 Using Bearer token authentication')
    }
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      const errorText = await response.text()
      
      if (response.status === 401) {
        console.info('🚫 Raindrop API authentication failed - using mock data')
        if (isDebug) {
          console.log('❌ Authentication error details:', errorText)
          console.log('💡 Troubleshooting steps:')
          console.log('   1. Verify RAINDROP_TOKEN in .env file')
          console.log('   2. Ensure token is from https://app.raindrop.io/settings/integrations')
          console.log('   3. Create new "App" and use the "Test Token"')
          console.log('   4. Make sure you have bookmarks in your account')
        }
      } else {
        console.info(`📚 Raindrop API returned ${response.status} - using mock data`)
        if (isDebug) {
          console.log('❌ API error:', errorText)
        }
      }
      
      return []
    }

    const data: RaindropResponse = await response.json()
    const count = data.items?.length || 0
    console.info(`✅ Successfully fetched ${count} bookmarks from Raindrop.io`)
    
    if (isDebug && count > 0) {
      console.log('📖 Sample bookmark:', {
        title: data.items![0].title,
        tags: data.items![0].tags,
        collection: data.items![0].collection?.title
      })
    }
    
    return data.items || []
  } catch (error) {
    console.info('Raindrop API error - using mock data for demonstration:', error)
    return []
  }
}

export async function getPublicCollections(): Promise<RaindropCollection[]> {
  try {
    const token = process.env.RAINDROP_TOKEN
    
    if (!token) {
      console.info('No RAINDROP_TOKEN found - skipping collections fetch')
      return []
    }
    
    // Build URL with test token as query parameter
    const url = `${RAINDROP_BASE_URL}/collections?test_token=${token}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      console.info(`Collections API returned ${response.status}`)
      return []
    }

    const data = await response.json()
    console.info(`Successfully fetched ${data.items?.length || 0} collections from Raindrop.io`)
    return data.items || []
  } catch (error) {
    console.info('Error fetching collections - using default collections')
    return []
  }
}

export function formatBookmarkDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function getBookmarkDomain(url: string): string {
  try {
    const domain = new URL(url).hostname
    return domain.replace('www.', '')
  } catch {
    return 'Unknown'
  }
}

// Mock data for development/fallback
export const mockBookmarks: RaindropBookmark[] = [
  {
    _id: 1,
    title: "React 18 Concurrent Features",
    excerpt: "Deep dive into React 18's new concurrent features, Suspense, and performance improvements",
    note: "Essential reading for modern React development",
    type: "link",
    cover: "",
    tags: ["react", "javascript", "frontend", "performance"],
    domain: "react.dev",
    createdDate: "2024-01-15T10:30:00Z",
    lastUpdate: "2024-01-15T10:30:00Z",
    link: "https://react.dev/blog/2022/03/29/react-v18",
    collection: {
      $id: 1,
      title: "Frontend Development",
      color: "#3B82F6"
    }
  },
  {
    _id: 2,
    title: "Next.js 14 App Router Guide",
    excerpt: "Complete guide to Next.js 14 App Router, server components, and streaming",
    note: "Best practices for modern Next.js development",
    type: "link",
    cover: "",
    tags: ["nextjs", "react", "ssr", "documentation"],
    domain: "nextjs.org",
    createdDate: "2024-01-20T14:15:00Z",
    lastUpdate: "2024-01-20T14:15:00Z",
    link: "https://nextjs.org/docs/app",
    collection: {
      $id: 1,
      title: "Frontend Development",
      color: "#3B82F6"
    }
  },
  {
    _id: 3,
    title: "Tailwind CSS Best Practices",
    excerpt: "Advanced Tailwind CSS techniques, custom components, and design system patterns",
    note: "Great for building scalable design systems",
    type: "link",
    cover: "",
    tags: ["tailwind", "css", "design", "ui"],
    domain: "tailwindcss.com",
    createdDate: "2024-01-25T09:45:00Z",
    lastUpdate: "2024-01-25T09:45:00Z",
    link: "https://tailwindcss.com/docs/reusing-styles",
    collection: {
      $id: 1,
      title: "Frontend Development",
      color: "#3B82F6"
    }
  },
  {
    _id: 4,
    title: "TypeScript 5.0 New Features",
    excerpt: "Overview of TypeScript 5.0 features including decorators, const assertions, and more",
    note: "Latest TypeScript improvements for better developer experience",
    type: "link",
    cover: "",
    tags: ["typescript", "javascript", "programming", "tools"],
    domain: "typescriptlang.org",
    createdDate: "2024-02-01T16:20:00Z",
    lastUpdate: "2024-02-01T16:20:00Z",
    link: "https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/",
    collection: {
      $id: 3,
      title: "Programming Languages",
      color: "#8B5CF6"
    }
  },
  {
    _id: 5,
    title: "AWS Lambda Performance Optimization",
    excerpt: "Best practices for optimizing AWS Lambda functions for performance and cost",
    note: "Critical for serverless architecture",
    type: "link",
    cover: "",
    tags: ["aws", "lambda", "serverless", "performance"],
    domain: "aws.amazon.com",
    createdDate: "2024-02-05T11:30:00Z",
    lastUpdate: "2024-02-05T11:30:00Z",
    link: "https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html",
    collection: {
      $id: 2,
      title: "Cloud & DevOps",
      color: "#F59E0B"
    }
  },
  {
    _id: 6,
    title: "Docker Multi-Stage Builds Guide",
    excerpt: "Advanced Docker techniques for creating efficient, secure container images",
    note: "Must-know for containerized applications",
    type: "link",
    cover: "",
    tags: ["docker", "containers", "devops", "optimization"],
    domain: "docs.docker.com",
    createdDate: "2024-02-10T15:45:00Z",
    lastUpdate: "2024-02-10T15:45:00Z",
    link: "https://docs.docker.com/develop/dev-best-practices/",
    collection: {
      $id: 2,
      title: "Cloud & DevOps",
      color: "#F59E0B"
    }
  },
  {
    _id: 7,
    title: "Web Accessibility Guidelines (WCAG 2.2)",
    excerpt: "Updated accessibility guidelines and best practices for inclusive web development",
    note: "Essential for creating accessible applications",
    type: "link",
    cover: "",
    tags: ["accessibility", "a11y", "wcag", "inclusive-design"],
    domain: "w3.org",
    createdDate: "2024-02-15T08:20:00Z",
    lastUpdate: "2024-02-15T08:20:00Z",
    link: "https://www.w3.org/WAI/WCAG22/quickref/",
    collection: {
      $id: 4,
      title: "Web Standards",
      color: "#10B981"
    }
  },
  {
    _id: 8,
    title: "GitHub Actions Advanced Workflows",
    excerpt: "Complex GitHub Actions patterns, matrix builds, and deployment strategies",
    note: "Great for CI/CD automation",
    type: "link",
    cover: "",
    tags: ["github-actions", "ci-cd", "automation", "deployment"],
    domain: "docs.github.com",
    createdDate: "2024-02-20T13:10:00Z",
    lastUpdate: "2024-02-20T13:10:00Z",
    link: "https://docs.github.com/en/actions/using-workflows/advanced-workflow-features",
    collection: {
      $id: 2,
      title: "Cloud & DevOps",
      color: "#F59E0B"
    }
  },
  {
    _id: 9,
    title: "React Testing Library Best Practices",
    excerpt: "Testing strategies and patterns for React applications using Testing Library",
    note: "Essential for writing maintainable tests",
    type: "link",
    cover: "",
    tags: ["testing", "react", "javascript", "quality"],
    domain: "testing-library.com",
    createdDate: "2024-02-25T10:30:00Z",
    lastUpdate: "2024-02-25T10:30:00Z",
    link: "https://testing-library.com/docs/react-testing-library/intro/",
    collection: {
      $id: 5,
      title: "Testing & Quality",
      color: "#EF4444"
    }
  }
]