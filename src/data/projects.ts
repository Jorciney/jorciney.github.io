import { Project } from '@/lib/types'

export const projects: Project[] = [
  {
    id: 'kitchen-3d',
    title: 'Interactive 3D Kitchen Designer',
    description: 'A real-time, browser-based 3D kitchen and living-room configurator built from scratch with Three.js. Features switchable layouts, live material/finish swatches, clickable measurements, walk-through navigation, and physically-based rendering (ACES tone mapping, IBL reflections).',
    icon: '🍳',
    technologies: ['Three.js', 'WebGL', 'JavaScript', '3D Rendering', 'PBR'],
    links: [
      { label: 'Launch 3D Kitchen', url: '/kitchen/', type: 'primary' }
    ],
    featured: true,
    isClientProject: false
  },
  {
    id: 'cleverbooking',
    title: 'CleverBooking',
    description: 'All-in-one SaaS booking platform for service businesses (salons, clinics, spas). A single admin dashboard plus a branded customer booking page covering appointments, CRM & segments, staff & roles, multi-location, Stripe payments, and analytics across 12 integrated modules. Features Google Meet video bookings, a WhatsApp AI booking bot, an embeddable widget, and a fully localized 5-language experience.',
    icon: '📅',
    logo: '/assets/projects/cleverbooking.png',
    technologies: ['SaaS', 'Multi-tenant', 'Stripe', 'WhatsApp API', 'Google Meet', 'i18n (5 languages)'],
    links: [
      { label: 'Visit Website', url: 'https://www.clever-booking.com', type: 'primary' },
      { label: 'Open the App', url: 'https://business.clever-booking.com/admin', type: 'secondary' }
    ],
    featured: true,
    isClientProject: false
  },
  {
    id: 'salunas',
    title: 'Salunas — Salon Marketplace',
    description: 'Consumer marketplace for discovering and booking beauty & wellness salons across Belgium, built on top of CleverBooking. Smart search by service, location, and booking mode (in-person, mobile, or online), real-time availability, and instant booking that flows straight into the salon’s CleverBooking dashboard.',
    icon: '💇',
    logo: '/assets/projects/salunas.png',
    technologies: ['Marketplace', 'Real-time Booking', 'Geo Search', 'SEO', 'i18n', 'Multi-country'],
    links: [
      { label: 'Visit Website', url: 'https://www.salunas.com', type: 'primary' }
    ],
    featured: true,
    isClientProject: false
  },
  {
    id: 'cleverupps-shop',
    title: 'CleverUpps Shop',
    description: 'E-commerce storefront for CleverUpps’ 3D-printed products — playful toys for kids, durable gear for dogs, and sculptural home décor, designed in-house and printed to order in small, low-waste batches in Belgium. Features a made-to-order print flow, Mollie hosted checkout (Bancontact, Visa, Mastercard), tracked shipping via Sendcloud, category browsing, and a fully localized 4-language storefront.',
    icon: '🛒',
    logo: '/assets/projects/cleverupps-shop.png',
    technologies: ['E-commerce', 'Mollie Payments', 'Bancontact', 'Sendcloud', '3D Printing', 'i18n (4 languages)'],
    links: [
      { label: 'Visit Website', url: 'https://shop.cleverupps.be', type: 'primary' }
    ],
    featured: true,
    isClientProject: false
  },
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
