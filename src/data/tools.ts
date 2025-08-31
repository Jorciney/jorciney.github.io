import { Tool } from '@/lib/types'

export const tools: Tool[] = [
  {
    id: 'angular-project-analyzer',
    title: 'Angular Project Analyzer',
    description: 'CLI tool that analyzes Angular projects for best practices, performance issues, and provides actionable insights.',
    icon: '🔍',
    category: 'analyzer',
    technologies: ['Node.js', 'TypeScript', 'Angular', 'AST'],
    links: [
      { label: 'Download', url: '#', type: 'primary' },
      { label: 'GitHub', url: '#', type: 'secondary' }
    ],
    githubUrl: 'https://github.com/jorciney/angular-analyzer'
  },
  {
    id: 'micro-frontend-cli',
    title: 'Micro-Frontend CLI',
    description: 'Command-line interface for scaffolding and managing micro-frontend applications with Module Federation.',
    icon: '⚡',
    category: 'cli',
    technologies: ['Node.js', 'Webpack', 'Module Federation', 'Angular'],
    links: [
      { label: 'Install', url: '#', type: 'primary' },
      { label: 'Docs', url: '#', type: 'secondary' }
    ],
    downloadUrl: 'npm install -g @jorciney/mf-cli'
  },
  {
    id: 'performance-monitor',
    title: 'Performance Monitor Library',
    description: 'Lightweight library for monitoring frontend performance metrics and core web vitals in real-time.',
    icon: '📊',
    category: 'library',
    technologies: ['TypeScript', 'Web APIs', 'Performance'],
    links: [
      { label: 'Install', url: '#', type: 'primary' },
      { label: 'Documentation', url: '#', type: 'secondary' }
    ],
    downloadUrl: 'npm install @jorciney/performance-monitor'
  },
  {
    id: 'vscode-angular-helper',
    title: 'VS Code Angular Helper',
    description: 'VS Code extension that provides intelligent code completion and refactoring tools for Angular applications.',
    icon: '🎨',
    category: 'extension',
    technologies: ['TypeScript', 'VS Code API', 'Angular Language Server'],
    links: [
      { label: 'Install Extension', url: '#', type: 'primary' },
      { label: 'Marketplace', url: '#', type: 'secondary' }
    ]
  }
]