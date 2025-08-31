'use client'

import { projects } from '@/data/projects'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { ExternalLink, Github } from 'lucide-react'

export default function ProjectsSection() {
  const featuredProjects = projects.filter(project => project.featured)
  
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            A selection of projects I've worked on, from enterprise solutions to innovative tools.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <Card key={project.id} hover className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{project.icon}</span>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                </div>
                <CardDescription>
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1">
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <div className="flex gap-2 w-full">
                  {project.links.map((link, index) => (
                    <Button
                      key={index}
                      variant={link.type === 'primary' ? 'default' : 'outline'}
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        if (link.url.startsWith('#')) {
                          // Handle internal links if needed
                        } else {
                          window.open(link.url, '_blank')
                        }
                      }}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      {link.label}
                    </Button>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Button variant="secondary" size="lg">
            <Github size={20} className="mr-2" />
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}