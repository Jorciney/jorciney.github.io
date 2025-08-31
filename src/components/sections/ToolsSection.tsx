'use client'

import { tools } from '@/data/tools'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Download, ExternalLink, Terminal, Code, Package, Wrench } from 'lucide-react'

const categoryIcons = {
  cli: Terminal,
  library: Package,
  extension: Code,
  analyzer: Wrench
}

const categoryVariants = {
  cli: 'success' as const,
  library: 'default' as const,
  extension: 'warning' as const,
  analyzer: 'danger' as const
}

export default function ToolsSection() {
  return (
    <section id="tools" className="py-20 px-4 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Developer Tools</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Open-source tools and libraries I've built to improve developer productivity and code quality.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => {
            const IconComponent = categoryIcons[tool.category]
            
            return (
              <Card key={tool.id} hover className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{tool.icon}</span>
                      <div>
                        <CardTitle className="text-xl">{tool.title}</CardTitle>
                        <Badge className="mt-1" variant={categoryVariants[tool.category]} size="sm">
                          <IconComponent size={12} className="mr-1" />
                          {tool.category.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription>
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {tool.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {tool.downloadUrl && (
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-3 font-mono text-sm">
                      {tool.downloadUrl}
                    </div>
                  )}
                </CardContent>
                
                <CardFooter>
                  <div className="flex gap-2 w-full">
                    {tool.links.map((link, index) => (
                      <Button
                        key={index}
                        variant={link.type === 'primary' ? 'default' : 'outline'}
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          if (link.url.startsWith('#')) {
                            const sectionId = link.url.replace('#', '')
                            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
                          } else {
                            window.open(link.url, '_blank', 'noopener,noreferrer')
                          }
                        }}
                      >
                        {link.label.includes('Install') || link.label.includes('Download') ? (
                          <Download size={16} className="mr-2" />
                        ) : (
                          <ExternalLink size={16} className="mr-2" />
                        )}
                        {link.label}
                      </Button>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
        
        {/* Open Source Note */}
        <div className="text-center mt-12 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Open Source Commitment</h3>
          <p className="text-gray-600 dark:text-gray-400">
            All tools are open-source and available on GitHub. Contributions and feedback are always welcome!
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="mt-4"
            onClick={() => window.open('https://github.com/jorciney', '_blank', 'noopener,noreferrer')}
          >
            <ExternalLink size={16} className="mr-2" />
            View All on GitHub
          </Button>
        </div>
      </div>
    </section>
  )
}