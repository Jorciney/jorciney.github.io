import { Experience } from '@/lib/types'

export const experiences: Experience[] = [
  {
    title: 'Technology Lead',
    company: 'Telenet',
    period: '2024 - Present',
    description: 'Leading initiatives to enhance developer experience through scalable architecture and Micro-Frontend adoption using Module Federation.',
    current: true,
    technologies: ['Angular 17/19', 'AWS', 'Module Federation', 'Team Leadership']
  },
  {
    title: 'Dev Lead / Full Stack Developer',
    company: 'Telenet',
    period: '2022 - 2024',
    description: 'Led team implementing Module Federation with Angular 15 monorepo setup and modern development workflows.',
    current: false,
    technologies: ['Angular 15/16', 'Nx', 'Cypress', 'Storybook']
  },
  {
    title: 'Full Stack Developer',
    company: 'Fednot',
    period: '2020 - 2022',
    description: 'Built notary declaration system with Angular and Java in an agile environment.',
    current: false,
    technologies: ['Angular 12', 'Java 11', 'Oracle SQL', 'Agile']
  },
  {
    title: 'React Native Developer',
    company: 'Startup',
    period: '2019 - 2021',
    description: 'Developed mobile apps with React Native and Java backend with MongoDB database.',
    current: false,
    technologies: ['React Native', 'Java', 'Spring Boot', 'MongoDB']
  },
  {
    title: 'Early Career Journey',
    company: 'Various Companies',
    period: '2011 - 2018',
    description: 'Progressed from IT Support to Java Developer to Full Stack Developer, gaining diverse technical experience.',
    current: false,
    technologies: ['Java', 'Spring', 'JavaScript', 'SQL']
  }
]