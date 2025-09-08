'use client'

import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { BlogPost } from '@/lib/types'

interface BlogPostContentProps {
  post: BlogPost
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="pt-16 min-h-screen">
      <article className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-8 group"
            onClick={() => window.location.href = '/blog'}
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Button>

          {/* Header */}
          <header className="mb-12">
            {post.featured && (
              <Badge variant="default" className="mb-4">Featured Post</Badge>
            )}
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pb-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>{post.readTime} read</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={16} />
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div 
              className="[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4
                         [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3
                         [&>p]:mb-6 [&>p]:leading-relaxed
                         [&>ul]:mb-6 [&>ul]:ml-6 [&>ul]:list-disc
                         [&>ol]:mb-6 [&>ol]:ml-6 [&>ol]:list-decimal
                         [&>li]:mb-2
                         [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 
                         [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-6
                         [&>code]:bg-gray-100 [&>code]:dark:bg-gray-800 [&>code]:px-2 
                         [&>code]:py-1 [&>code]:rounded [&>code]:text-sm
                         [&>pre]:bg-gray-100 [&>pre]:dark:bg-gray-800 [&>pre]:p-4 
                         [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:my-6
                         whitespace-pre-line"
            >
              {post.content}
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/blog'}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to All Posts
              </Button>
              
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    // Share functionality
                    if (typeof navigator !== 'undefined' && navigator.share) {
                      navigator.share({
                        title: post.title,
                        text: post.excerpt,
                        url: window.location.href,
                      })
                    }
                  }}
                >
                  Share
                </Button>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </div>
  )
}