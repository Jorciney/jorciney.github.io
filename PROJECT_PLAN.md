# Portfolio Website Development Plan

## Project Overview
Modern portfolio website for Jorciney Dias Chaveiro using Next.js 14, TypeScript, and Tailwind CSS.

## Development Phases

### Phase 1: Project Setup ✅
- [x] Backup existing content
- [x] Clean up repository
- [ ] Initialize Next.js with TypeScript
- [ ] Install dependencies
- [ ] Configure project structure

### Phase 2: Core Infrastructure
- [ ] Set up folder structure (src/app, components, lib, data)
- [ ] Configure global styles and theme
- [ ] Create root layout with metadata
- [ ] Set up theme provider (dark/light mode)
- [ ] Configure TypeScript types

### Phase 3: Layout Components
- [ ] Create Header component with navigation
- [ ] Create Footer component
- [ ] Implement responsive mobile menu
- [ ] Add theme toggle functionality

### Phase 4: Hero & About Sections
- [ ] Implement HeroSection with animations
- [ ] Create AboutSection with skills display
- [ ] Add professional summary
- [ ] Integrate experience timeline

### Phase 5: Projects & Tools
- [ ] Create ProjectsSection component
- [ ] Set up projects data structure
- [ ] Implement ToolsSection for dev tools
- [ ] Add project cards with links

### Phase 6: Blog Integration
- [ ] Set up MDX support
- [ ] Create blog utilities (getAllPosts, getPostBySlug)
- [ ] Implement BlogSection on homepage
- [ ] Create blog listing page
- [ ] Create individual blog post pages
- [ ] Migrate existing blog content

### Phase 7: Additional Sections
- [ ] Implement ResumeSection
- [ ] Create BookmarksSection
- [ ] Add ContactSection with form
- [ ] Integrate social links

### Phase 8: UI Components
- [ ] Create Button component
- [ ] Create Card component
- [ ] Create Badge component
- [ ] Create Input component
- [ ] Add loading states and animations

### Phase 9: Data & Content
- [ ] Set up projects data
- [ ] Configure skills data
- [ ] Add experience data
- [ ] Create tools catalog
- [ ] Migrate blog posts to MDX

### Phase 10: Performance & SEO
- [ ] Optimize images
- [ ] Configure metadata
- [ ] Add Open Graph tags
- [ ] Implement sitemap
- [ ] Add analytics

### Phase 11: Deployment
- [ ] Configure for GitHub Pages
- [ ] Set up CI/CD workflow
- [ ] Configure custom domain
- [ ] Test production build
- [ ] Deploy to production

## Current Status
- **Phase 1**: In Progress
- **Next Step**: Initialize Next.js project

## Technical Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX for blog posts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes

## Key Features
1. Responsive design
2. Dark/light mode
3. Blog with MDX
4. Project showcase
5. Developer tools section
6. Resume/CV section
7. Bookmarks integration
8. Contact form
9. SEO optimized
10. Performance focused

## File Structure
```
src/
├── app/
│   ├── layout.tsx (root layout)
│   ├── page.tsx (homepage)
│   ├── globals.css
│   └── blog/
├── components/
│   ├── layout/
│   ├── sections/
│   └── ui/
├── lib/
├── data/
└── content/
```

## Git Strategy
- Incremental commits
- Descriptive commit messages
- Feature-based commits
- No AI/Claude mentions
- Best practices followed

## Notes
- Preserve existing blog content
- Maintain SEO from previous site
- Ensure mobile-first approach
- Focus on performance
- Clean, maintainable code