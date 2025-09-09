'use client'

import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { BlogPost } from '@/lib/types'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

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
          <div className="prose prose-lg dark:prose-invert max-w-none
                          prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                          prose-h1:text-3xl prose-h1:font-bold prose-h1:mt-8 prose-h1:mb-4
                          prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
                          prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                          prose-p:mb-6 prose-p:leading-relaxed
                          prose-ul:mb-6 prose-ul:ml-6 
                          prose-ol:mb-6 prose-ol:ml-6 
                          prose-li:mb-2
                          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
                          prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6
                          prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 
                          prose-code:py-1 prose-code:rounded prose-code:text-sm
                          prose-code:before:content-none prose-code:after:content-none
                          prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800 prose-pre:text-gray-100
                          prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:my-6
                          prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
                          prose-table:my-6 prose-thead:border-b-2 prose-thead:border-gray-300 dark:prose-thead:border-gray-700
                          prose-th:text-left prose-th:py-2 prose-th:px-4
                          prose-td:py-2 prose-td:px-4 prose-tr:border-b prose-tr:border-gray-200 dark:prose-tr:border-gray-800
                          prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                          prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                // Custom image rendering to handle relative paths
                img: ({...props}) => {
                  const src = typeof props.src === 'string' ? props.src : ''
                  // Convert relative paths to absolute paths
                  const absoluteSrc = src.startsWith('/') ? src : `/${src}`
                  return <img {...props} src={absoluteSrc} alt={props.alt || ''} className="rounded-lg shadow-lg my-8 w-full" />
                },
                // Custom code block rendering
                pre: ({children, ...props}) => {
                  return (
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6" {...props}>
                      {children}
                    </pre>
                  )
                },
                // Custom inline code rendering
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                code: ({children, className, ...props}: any) => {
                  const isInline = !className?.includes('language-')
                  if (isInline) {
                    return (
                      <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm" {...props}>
                        {children}
                      </code>
                    )
                  }
                  return <code className={className} {...props}>{children}</code>
                },
                // Custom table rendering for better styling
                table: ({children, ...props}) => {
                  return (
                    <div className="overflow-x-auto my-6">
                      <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700" {...props}>
                        {children}
                      </table>
                    </div>
                  )
                },
                th: ({children, ...props}) => {
                  return (
                    <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 dark:text-gray-100" {...props}>
                      {children}
                    </th>
                  )
                },
                td: ({children, ...props}) => {
                  return (
                    <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800" {...props}>
                      {children}
                    </td>
                  )
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
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