import { BlogPost } from '@/lib/types'

export const blogPosts: BlogPost[] = [
  {
    slug: 'appointment-booking-beauty-salons',
    title: 'What I Learned Building Appointment Booking for Beauty Salons',
    excerpt: 'Booking looks like a solved problem until you build it for a real salon. Notes on double bookings, no-shows, staff calendars and the messy scheduling rules nobody tells you about upfront.',
    content: `
Booking an appointment looks like a solved problem. Pick a service, pick a time, done. That was roughly my mental model before I started building a booking platform for salons — and almost every assumption in it turned out to be wrong.

What follows is what actually makes salon scheduling hard, from the perspective of someone who had to write the code.

## The problem isn't the calendar. It's the phone.

Talk to a salon owner and they rarely complain about their calendar. They complain about interruptions.

A client messages on Instagram asking if there's anything free on Thursday. Someone calls mid-treatment. A WhatsApp message arrives at 22:00. Each one costs a few minutes and a bit of attention, and none of it is the work they trained to do. The hairdresser is holding scissors and a phone at the same time.

That reframes the goal. You're not building a nicer calendar for the owner — the paper one works fine. You're removing the back-and-forth that surrounds it. The real feature is that the client can answer "what's free on Thursday?" without involving a human at all.

It also means the booking page is the product, not the admin panel. The admin panel is what the owner tolerates so the booking page can exist.

## Availability is a computation, not a lookup

Here's the naive model: staff have working hours, appointments occupy slots, free slots are what's left.

Every one of those turns out to be more subtle.

**Services have different durations.** A cut is 30 minutes, colour is 2 hours. Available slots depend on which service the client picked, so you can't precompute a single grid of free times — you compute availability per service.

**Staff are not interchangeable.** Not everyone does every treatment. A client booking balayage can only be offered slots from staff qualified for it. Availability is a function of (service, staff, day), and "any available staff member" is its own case that has to union the others.

**Gaps between appointments are wasted money.** If you only offer slots on the hour, a 30-minute cut at 09:00 followed by nothing until 11:00 leaves a dead hour. Slot granularity is a real business decision, not a UI detail.

**The day has structure beyond opening hours.** Lunch breaks, a staff member who works Tuesday and Thursday only, holidays, a chair being out of service, someone leaving early on Friday.

None of this is intellectually hard. It's just that "is this slot free?" is never a database lookup — it's a calculation with a surprising number of inputs, and it runs on every page load of the booking page.

## Timezones will bite you, and not where you expect

The obvious timezone bugs are easy: store UTC, render local.

The one that got me was subtler. Code that asks "what time is it now?" to decide which slots are still bookable has to ask that question *in the salon's timezone*, not in the server's, and not in the visitor's. A client browsing from another country at 23:00 their time should still see tomorrow's slots correctly relative to the salon.

Get this wrong and the bug is nearly invisible: availability is correct all day and quietly wrong around midnight, or only for users in certain regions. It won't show up in your tests unless you deliberately write one for it.

Resolve "now" in the location's timezone. Every time.

## No-shows are the actual business problem

Empty chairs are what genuinely costs a salon money. A no-show at 14:00 on a Saturday is revenue that cannot be recovered — the slot is gone.

Software can't eliminate no-shows, but it moves the number:

- **Confirmation immediately after booking**, so the appointment exists somewhere other than the client's memory.
- **A reminder before the appointment**, which is the single highest-leverage feature. Most no-shows aren't people deciding not to come; they're people who forgot.
- **Easy self-service cancellation.** This feels counterintuitive — why make it easy to cancel? Because a cancellation 24 hours out is a slot you can resell. A silent no-show is not. You want to convert no-shows into early cancellations.
- **Deposits or prepayment for high-value treatments.** Blunt, effective, and worth making configurable per service rather than global — a salon will happily take a deposit for a €150 colour and never for a €20 fringe trim.

The lesson: features that look like "communication" are really revenue protection.

## Multi-tenancy shapes everything

Every salon believes their scheduling rules are normal. Collectively they are not.

Some run one chair; some run four locations. Some do house calls where travel time between clients has to be blocked out. Some offer online consultations. Some want clients to pick a specific stylist; others deliberately don't, to balance workload.

Two things helped:

**Model the tenant boundary early.** Retrofitting multi-tenancy into a single-salon schema is genuinely painful. Every query needs a tenant scope, and missing one is a data leak between businesses — the worst class of bug in this domain.

**Make rules configurable, not conditional.** The temptation is a flag per special case. That path ends in unmaintainable branching. Better to find the general model — appointments have a duration, a location kind, an optional travel buffer, an optional deposit — and let each salon configure it.

## Self-service setup is a feature

Salon owners are not going to file a support ticket to change a price. If updating a service, adjusting opening hours or adding a staff member requires you, you've built a consultancy, not a product.

The corollary is that onboarding must reach value fast. Nobody evaluates booking software by reading the settings page — they evaluate it by seeing their own booking page live with their own treatments on it. Get them to that moment with the smallest possible number of required fields, and let the rest be filled in later.

## Small things that mattered more than expected

- **Mobile is not a secondary surface.** Clients book from a phone, in bed, at night. So do the owners — many discover the product from a phone ad and never open a laptop.
- **Language matters commercially.** Confirmations and reminders in the client's own language aren't a nicety in multilingual markets; they're the difference between a message that gets read and one that doesn't.
- **Show only genuinely available slots.** Offering a time that then fails on submit is worse than showing fewer options.
- **Appointment history is the beginning of a CRM.** Once you know who came, for what, and when, rebooking prompts and segmentation follow naturally.

## What I'd tell myself at the start

Booking is a deceptively deep domain. The calendar UI is a weekend. The scheduling engine underneath — durations, qualified staff, breaks, buffers, timezones, tenant-specific rules — is where the actual work lives, and it's the part that determines whether owners trust the system enough to stop answering DMs.

Build the availability calculation properly first. Everything else is a view over it.

---

## The product

This isn't theoretical — it's the domain I work in day to day. Everything above came out of building [CleverBooking](https://clever-booking.com), a booking platform for salons, barbers and beauty businesses.

It gives a business its own booking page where clients book 24/7, a shared calendar across staff, per-staff working hours and services, automatic confirmations and reminders, optional deposits and online payments via Stripe, support for in-store, mobile and online appointments, and reporting on revenue and no-shows. Plans start at €19/month and begin with a 14-day free trial.

If you run a salon and recognise the Instagram-DM problem from the top of this post, have a look: [clever-booking.com](https://clever-booking.com).
    `,
    date: '2026-08-18',
    readTime: '9 min',
    tags: ['Product', 'SaaS', 'Booking Systems', 'Scheduling', 'Multi-Tenancy'],
    featured: true
  },
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