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
    featured: true
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
    featured: true
  },
  {
    id: 'digibox-ordering',
    title: 'Telenet DigiBox Ordering',
    description: 'Angular application enabling customers to order products directly via Telenet digibox with seamless UX.',
    icon: '📺',
    technologies: ['Angular 8', 'AEM', 'Java 8', 'Spring'],
    links: [
      { label: 'View Project', url: 'https://www.telenet.be/en/residential/tv', type: 'primary' }
    ],
    featured: true
  }
]