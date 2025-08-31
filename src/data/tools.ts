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
      { label: 'GitHub', url: 'https://github.com/jorciney', type: 'primary' },
      { label: 'NPM', url: 'https://www.npmjs.com/~jorciney', type: 'secondary' }
    ],
    githubUrl: 'https://github.com/jorciney'
  },
  {
    id: 'micro-frontend-cli',
    title: 'Micro-Frontend CLI',
    description: 'Command-line interface for scaffolding and managing micro-frontend applications with Module Federation.',
    icon: '⚡',
    category: 'cli',
    technologies: ['Node.js', 'Webpack', 'Module Federation', 'Angular'],
    links: [
      { label: 'GitHub', url: 'https://github.com/jorciney', type: 'primary' },
      { label: 'Documentation', url: 'https://github.com/jorciney', type: 'secondary' }
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
      { label: 'GitHub', url: 'https://github.com/jorciney', type: 'primary' },
      { label: 'NPM Package', url: 'https://www.npmjs.com/~jorciney', type: 'secondary' }
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
      { label: 'VS Code Marketplace', url: 'https://marketplace.visualstudio.com/', type: 'primary' },
      { label: 'GitHub', url: 'https://github.com/jorciney', type: 'secondary' }
    ]
  }
]