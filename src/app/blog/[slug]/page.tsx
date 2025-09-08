import { notFound } from 'next/navigation'
import { blogPosts } from '@/data/blogs'
import BlogPostContent from '@/components/BlogPostContent'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = blogPosts.find(p => p.slug === resolvedParams.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - Jorciney Dias Chaveiro`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = blogPosts.find(p => p.slug === resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}