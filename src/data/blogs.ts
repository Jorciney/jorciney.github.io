import { BlogPost } from '@/lib/types'

export const blogPosts: BlogPost[] = [
  {
    slug: 'angular-webpack-vs-esbuild',
    title: 'Angular webpack vs esbuild',
    excerpt: 'A comprehensive comparison between webpack and esbuild for Angular applications, including build times, configuration differences, and performance benchmarks.',
    content: `# Angular webpack vs esbuild

## What is webpack?
Webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.

1. **Popularity and Community Support**:
   - Webpack is highly popular in web development.
   - Boasts a large, active community with many plugins and loaders.

2. **Flexibility and Configurability**:
   - Highly configurable, handling a wide range of file types.
   - Ideal for complex bundling scenarios.

3. **Integration and Ecosystem**:
   - Integrates well with tools and frameworks like React, Angular, and Vue.js.

4. **Build Speed**:
   - Slower build times, especially noticeable in larger projects.

5. **Learning Curve**:
   - Steeper learning curve due to extensive configuration options.

## What is esbuild?
As they already say on their [website](https://esbuild.github.io/): esbuild is a fast, modern bundler written in Go. It is up to 100x faster than other bundlers.

1. **Performance**:
   - Known for high-speed performance, significantly faster than Webpack.
   - Written in Go with efficient algorithms.

2. **Simplicity and Ease of Use**:
   - Simple, straightforward setup with minimal configuration.

3. **Limited Flexibility**:
   - Less flexible compared to Webpack, suited for simpler builds.

4. **Growing Community and Ecosystem**:
   - Rapidly gaining popularity with a growing ecosystem.

5. **Use Case**:
   - Ideal for projects where speed is a priority and build complexity is low.

But is it so fast? Let's find out!

## Speed comparison between Webpack and esbuild

### Start time
First let's compare the time it takes to start the application. For this test, I'm using both applications with Nx. The application is a simple Angular created as shown in my Nx standalone app guide.

| Angular app using **Webpack** | Angular app using **esbuild** |
|-------------------------------|------------------------------|
| ![Webpack start time](/assets/posts/2023-11-18-ng-app-webpack-start-time.png) | ![esbuild start time](/assets/posts/2023-11-18-ng-app-esbuild-start-time.png) |
| Start time of 1.755 seconds | Start time of 1.249 seconds |

### Build time

| Angular app using **Webpack** | Angular app using **esbuild** |
|-------------------------------|------------------------------|
| ![Webpack build time](/assets/posts/2023-11-18-ng-app-webpack-build-time.png) | ![esbuild build time](/assets/posts/2023-11-18-ng-app-esbuild-build-time.png) |
| Where the build time is 5.303 seconds | With esbuild we could build our application in only 1.765 seconds |

### The main difference in config
As you can see in the screenshot below the main difference between the two configs is the build executor.
Both use the [\`@angular-devkit/build-angular\`](https://www.npmjs.com/package/@angular-devkit/build-angular), but esbuilder uses the \`application\` builder, while webpack uses the \`browser\` builder

![Builder comparison](/assets/posts/2023-11-18-esbuild-vs-webpack-builder.png)

![Config comparison](/assets/posts/2023-11-18-esbuild-vs-webpack-config.png)

## Conclusion

As you can see from the images above, esbuild is a lot faster than webpack.
I believe the bigger the application, the bigger the difference will be.
I'm not saying that webpack is bad, but if you are looking for a faster alternative, esbuild is the way to go.
I'm sure looking forward to testing esbuild on a bigger application.`,
    date: '2023-11-18',
    readTime: '6 min',
    tags: ['Angular', 'webpack', 'esbuild', 'Build Tools', 'Performance'],
    featured: true
  },
  {
    slug: 'how-to-start-an-standalone-app-with-nx',
    title: 'How to use Nx to create a Standalone Angular Application',
    excerpt: 'Learn how to leverage Nx to create standalone Angular applications with all the benefits of the Nx ecosystem without the complexity of a full monorepo.',
    content: `# Nx in a standalone Angular application

Since the release of version [14.6.0](https://github.com/nrwl/nx/releases/tag/14.6.0), Nx has been able to generate Angular standalone applications.

But what does that mean? To understand that, let's first understand Nx a little bit better.

## A little bit about NX

[Nx](https://nx.dev/) has always been a big player when it comes to monorepos. It has been used widely around the world by many companies to create/manage their monorepos.

What does Nx bring to the table?

Here is small list of the most important features:
* Nx Generators and custom schematics
* [Nx Cloud](https://nx.app/) & Nx Cloud Workflows  
* Nx Cache local and remote
* Has a powerful task scheduler
* Nx graph _(which helps you avoid/visualize circular dependencies)_
* Nx Community _(which has a strong presence, with over 3,900,000 downloads)_
* It makes our lives a lot easier when enforcing module boundaries
* Easy integration with new tools _(such as Cypress, Jest, Playwright, Storybook, Tailwind...)_
* Easy to update dependencies using the automated code migrations

In this article, we will see how to use Nx to create a standalone Angular application.

## Diving into the code

### Generating the new Angular standalone application
\`\`\`bash
npx create-nx-workspace@latest my-new-app-name --preset=angular-standalone
\`\`\` 

You will then be prompted with the following questions:

![Nx create app questions](/assets/posts/2023-11-15_nx-create-app-questions.png)

### Running the application
Now that our application has been generated, we can run it using the following command:
\`\`\`bash
cd my-new-app-name
nx serve my-new-app-name
\`\`\`

### Running other configurations
\`\`\`bash
nx e2e e2e # will run our cypress tests
nx test # will run our unit tests
nx lint # will run linting
\`\`\`

### Folder structure
\`\`\`
my-new-app-name
├── README.md
├── e2e
│   ├── cypress.config.ts
│   ├── project.json
│   ├── src
│   │   ├── e2e
│   │   │   └── app.cy.ts
│   │   ├── fixtures
│   │   │   └── example.json
│   │   └── support
│   │       ├── app.po.ts
│   │       ├── commands.ts
│   │       └── e2e.ts
│   └── tsconfig.json
├── jest.config.ts
├── jest.preset.js
├── nx.json
├── package-lock.json
├── package.json
├── project.json
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   └── nx-welcome.component.ts
│   ├── assets
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── styles.scss
│   └── test-setup.ts
├── tsconfig.app.json
├── tsconfig.editor.json
├── tsconfig.json
└── tsconfig.spec.json
\`\`\`

## Conclusion

Nx standalone applications provide a perfect middle ground between the simplicity of a single Angular application and the power of a full Nx workspace. You get all the benefits of Nx tooling, caching, and task orchestration without the complexity of managing multiple applications.

This approach is ideal for:
- Teams new to Nx who want to start simple
- Single application projects that might grow into monorepos
- Projects that need advanced tooling but don't require multiple applications yet`,
    date: '2023-11-15',
    readTime: '5 min',
    tags: ['Nx', 'Angular', 'Standalone', 'Tools', 'Frontend'],
    featured: true
  },
  {
    slug: 'building-scalable-micro-frontends',
    title: 'Building Scalable Micro-Frontends with Module Federation',
    excerpt: 'Learn how to implement Module Federation architecture to improve deployment cycles and team autonomy across multiple frontend teams.',
    content: `
      Module Federation has revolutionized how we build and deploy micro-frontends. In this post, I'll share insights from implementing this architecture at Telenet.

      ## Why Module Federation?

      Traditional monolithic frontends face several challenges:
      - Long deployment cycles
      - Team dependencies
      - Difficult to scale
      - Technology lock-in

      Module Federation addresses these issues by allowing teams to develop and deploy independently while sharing code at runtime.

      ## Key Benefits

      1. **Independent Deployments**: Teams can deploy their modules without affecting others
      2. **Shared Dependencies**: Reduce bundle size by sharing common libraries
      3. **Technology Flexibility**: Different teams can use different versions of frameworks
      4. **Better Team Autonomy**: Teams own their entire vertical slice

      ## Implementation Strategy

      The key to successful implementation is careful planning of module boundaries and shared contracts...
    `,
    date: '2024-01-15',
    readTime: '8 min',
    tags: ['Architecture', 'Micro-Frontend', 'Module Federation', 'Angular'],
    featured: true
  },
  {
    slug: 'wordpress-performance-optimization',
    title: 'WordPress Performance Optimization: From 5s to Sub-1s Load Times',
    excerpt: 'A comprehensive guide to optimizing WordPress websites for lightning-fast performance, including practical tips and real-world examples.',
    content: `
      Performance is crucial for user experience and SEO. Here's how I optimized multiple WordPress sites to achieve sub-second load times.

      ## The Performance Challenge

      Most WordPress sites suffer from:
      - Bloated themes and plugins
      - Unoptimized images
      - Excessive database queries
      - Poor caching strategies

      ## Optimization Techniques

      ### 1. Image Optimization
      - Implement lazy loading
      - Use WebP format with fallbacks
      - Properly size images for different viewports

      ### 2. Caching Strategy
      - Browser caching
      - Page caching
      - Object caching
      - CDN integration

      ### 3. Database Optimization
      - Clean up post revisions
      - Optimize database tables
      - Implement query caching

      ### 4. Code Optimization
      - Minify CSS and JavaScript
      - Eliminate render-blocking resources
      - Reduce HTTP requests

      ## Results

      After implementing these optimizations on CleverUpps Marketing website, we achieved:
      - 85% reduction in load time
      - 95+ PageSpeed score
      - 40% increase in conversions
    `,
    date: '2024-01-08',
    readTime: '10 min',
    tags: ['WordPress', 'Performance', 'SEO', 'Web Development'],
    featured: true
  },
  {
    slug: 'digital-marketing-tech-stack',
    title: 'Building a Modern Digital Marketing Tech Stack',
    excerpt: 'Explore the essential tools and technologies needed to build an effective digital marketing operation in 2024.',
    content: `
      As the founder of CleverUpps Marketing, I've learned that the right tech stack can make or break your digital marketing efforts.

      ## Core Components

      ### Analytics & Tracking
      - Google Analytics 4
      - Google Tag Manager
      - Microsoft Clarity
      - Hotjar for heatmaps

      ### Marketing Automation
      - Email marketing platforms
      - Social media schedulers
      - CRM integration
      - Lead scoring systems

      ### Content Management
      - Headless CMS options
      - Digital Asset Management
      - Content calendars
      - Collaboration tools

      ### Performance Marketing
      - Google Ads
      - Meta Business Suite
      - LinkedIn Campaign Manager
      - Programmatic platforms

      ## Integration Strategy

      The key is ensuring all tools communicate effectively...
    `,
    date: '2023-12-20',
    readTime: '6 min',
    tags: ['Digital Marketing', 'MarTech', 'Tools', 'Strategy'],
    featured: false
  },
  {
    slug: 'angular-to-react-migration',
    title: 'Migrating from Angular to React: Lessons Learned',
    excerpt: 'A detailed guide on migrating large-scale applications from Angular to React, including common pitfalls and best practices.',
    content: `
      While both Angular and React are excellent frameworks, sometimes business needs require migration. Here's what I learned from recent migration projects.

      ## Planning the Migration

      ### Assessment Phase
      - Audit existing functionality
      - Identify shared components
      - Map out dependencies
      - Create migration roadmap

      ### Incremental Approach
      - Start with leaf components
      - Use a strangler fig pattern
      - Maintain both systems temporarily
      - Gradual feature migration

      ## Technical Considerations

      ### State Management
      - Moving from Services to Context/Redux
      - Handling async operations
      - Managing side effects

      ### Routing
      - Angular Router to React Router
      - Preserving deep links
      - Handling guards and resolvers

      ## Key Takeaways

      1. Don't rush the migration
      2. Invest in automated testing
      3. Keep the team trained
      4. Document everything
    `,
    date: '2023-12-10',
    readTime: '12 min',
    tags: ['Angular', 'React', 'Migration', 'JavaScript'],
    featured: false
  },
  {
    slug: 'seo-friendly-spa',
    title: 'Making Single Page Applications SEO-Friendly',
    excerpt: 'How to ensure your SPA ranks well in search engines with server-side rendering, pre-rendering, and other optimization techniques.',
    content: `
      SPAs offer great user experience but can struggle with SEO. Here's how to get the best of both worlds.

      ## The SPA SEO Challenge

      Traditional SPAs face several SEO issues:
      - Content not visible to crawlers
      - Slow initial page load
      - Missing meta tags
      - Poor social media sharing

      ## Solutions

      ### Server-Side Rendering (SSR)
      - Next.js for React
      - Nuxt for Vue
      - Angular Universal

      ### Static Site Generation
      - Pre-render at build time
      - Perfect for content sites
      - Excellent performance

      ### Hybrid Approach
      - SSG for static content
      - SSR for dynamic pages
      - Client-side for interactions

      ## Implementation Tips

      1. Use semantic HTML
      2. Implement structured data
      3. Optimize Core Web Vitals
      4. Create XML sitemaps
      5. Use canonical URLs
    `,
    date: '2023-11-25',
    readTime: '9 min',
    tags: ['SEO', 'SPA', 'React', 'Performance'],
    featured: false
  }
]