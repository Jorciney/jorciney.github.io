import type { Metadata } from 'next'
import BlogSection from '@/components/sections/BlogSection'

export const metadata: Metadata = {
  title: 'Blog - Jorciney Dias Chaveiro',
  description: 'Thoughts on software development, technology, and digital innovation. Sharing insights from my journey as a full-stack developer.',
  keywords: 'blog, software development, technology, programming, web development, digital marketing',
}

export default function BlogPage() {
  return (
    <div className="pt-16">
      <BlogSection />
    </div>
  )
}