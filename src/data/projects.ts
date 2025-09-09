import { Project } from '@/lib/types'

export const projects: Project[] = [
  {
    id: 'telenet-microfrontend',
    title: 'Telenet Micro-Frontend Platform',
    description: 'Led the implementation of Module Federation architecture, improving deployment cycles and team autonomy across multiple frontend teams.',
    icon: '📱',
    technologies: ['Angular 17', 'Module Federation', 'AWS', 'Nx', 'GitLab CI/CD'],
    links: [
      { label: 'Learn More', url: 'https://www.telenet.be', type: 'primary' },
      { label: 'GitHub', url: 'https://github.com/jorciney', type: 'secondary' }
    ],
    featured: true,
    isClientProject: true
  },
  {
    id: 'notary-system',
    title: 'Notary Declaration System',
    description: 'Full-stack application for Fednot helping notaries fill successor declarations with intuitive forms and validation.',
    icon: '⚖️',
    technologies: ['Angular 12', 'Java 11', 'Oracle SQL', 'Maven'],
    links: [
      { label: 'View Details', url: 'https://www.fednot.be', type: 'primary' }
    ],
    featured: true,
    isClientProject: true
  },
  {
    id: 'tvshop-ordering',
    title: 'Telenet - TVShop',
    description: 'Angular application enabling customers to order products directly via Telenet digibox with seamless UX.',
    icon: '📺',
    technologies: ['Angular 8', 'AEM', 'Java 8', 'Spring'],
    links: [
      { label: 'View Project', url: 'https://www.telenet.be/en/residential/tv', type: 'primary' }
    ],
    featured: true,
    isClientProject: true
  },
  {
    id: 'ladoos-tax',
    title: 'Ladoos Tax - Accounting Services',
    description: 'Professional WordPress website for accounting services, featuring service listings, contact forms, and multilingual support for tax consultation.',
    icon: '💼',
    technologies: ['WordPress', 'Custom Theme', 'PHP', 'MySQL', 'Responsive Design'],
    links: [
      { label: 'Visit Website', url: 'https://ladoostax.be/', type: 'primary' }
    ],
    featured: true,
    isClientProject: false
  },
  {
    id: 'igreja-cvc',
    title: 'Igreja CVC - Church Website',
    description: 'WordPress implementation of a modern church website. Collaborated with joaogabriel.studio and Design Storm for the Figma design, while I handled the complete WordPress development and plugin integration.',
    icon: '⛪',
    technologies: ['WordPress', 'Custom Plugins', 'PHP', 'MySQL', 'Figma to WordPress'],
    links: [
      { label: 'Visit Website', url: 'https://igrejacvc.be/', type: 'primary' }
    ],
    featured: true,
    isClientProject: false
  },
  {
    id: 'cleverupps-website',
    title: 'CleverUpps Marketing Website',
    description: 'Company website for CleverUpps Marketing, showcasing digital marketing services, portfolio, and lead generation capabilities with optimized SEO and performance.',
    icon: '🚀',
    technologies: ['WordPress', 'Custom Theme', 'SEO Optimization', 'Performance Optimization', 'Lead Generation'],
    links: [
      { label: 'Visit Website', url: 'https://cleveruppsmarketing.be/', type: 'primary' }
    ],
    featured: true,
    isClientProject: false
  },
  {
    id: 'vacation-prep-assistant',
    title: 'Vacation Prep Assistant',
    description: 'AI-powered travel planning web application with custom packing lists, itinerary management, expense tracking, weather forecasts, and travel checklists. Built with React and Firebase.',
    icon: '✈️',
    technologies: ['React 19', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Vite', 'React Query', 'Framer Motion'],
    links: [
      { label: 'Launch App', url: 'https://vacation-prep-assistant.web.app/', type: 'primary' },
      { label: 'View Source', url: 'https://github.com/jorciney', type: 'secondary' }
    ],
    featured: true,
    isClientProject: false
  }
]
