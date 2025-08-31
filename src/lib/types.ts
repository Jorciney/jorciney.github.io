export interface Project {
  id: string
  title: string
  description: string
  icon: string
  technologies: string[]
  links: ProjectLink[]
  featured?: boolean
}

export interface ProjectLink {
  label: string
  url: string
  type: 'primary' | 'secondary'
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  tags: string[]
  featured?: boolean
}

export interface Experience {
  title: string
  company: string
  period: string
  description: string
  current: boolean
  technologies?: string[]
}

export interface Skill {
  category: string
  technologies: string[]
}

export interface Tool extends Project {
  category: 'cli' | 'library' | 'extension' | 'analyzer'
  downloadUrl?: string
  githubUrl?: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}