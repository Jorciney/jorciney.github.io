---
title: How to use Nx to create a Standalone Angular Application
date: 2023-11-15 20:41:27 +0200
categories: [nx,angular]
tags: [nx,angular,frontend]
---
# Nx in a standalone Angular application

Since the release of version [14.6.0](https://github.com/nrwl/nx/releases/tag/14.6.0), Nx has been able to generate Angular standalone applications.<br/>
But what does that mean?<br/>
To understand that, lets first understand Nx a little bit better.

## A little bit about NX

[Nx](https://nx.dev/) has always been a big player when it comes to monorepos. 
It has been used wildly around the world by many companies to create/manage their monorepos. 

What does Nx bring to the table?
<br/>
Here is small list of the most important features:
* Nx Generators and custom schematics
* [Nx Cloud](https://nx.app/) & Nx Cloud Workflows
* Nx Cache local and remote
* Has a powerful task scheduler
* Nx graph _(which helps you avoid/visualize circular dependencies)_
* Nx Community _(which has a strong presence, with over 3.900.000 downloads)_
* It makes our lives a lot easier when enforcing module boundaries
* Easy integration with new tools _(such as Cypress, Jest, Playwright, Storybook, Tailwinds...)_
* Easy to update dependencies using the automated code migrations


In this article, we will see how to use Nx to create a standalone Angular application.


## Diving into the code

### Generating the new Angular standalone application
```bash
npx create-nx-workspace@latest my-new-app-name --preset=angular-standalone
``` 
You will then be prompted with the following questions:
![2023-11-15_nx-create-app-questions.png](../../assets/posts/2023-11-15_nx-create-app-questions.png)

### Running the application
Now that our application has been generated, we can run it using the following command:
```bash
cd my-new-app-name
nx serve my-new-app-name
```
### Running other configurations
```bash
nx e2e e2e # will run our cypress tests
nx test # will run our unit tests
nx lint # will run linting
```

### Folder structure
``` 
my-new-app-name
├── README.md
├── e2e
│   ├── cypress.config.ts
│   ├── project.json
│   ├── src
│   │   ├── e2e
│   │   │   └── app.cy.ts
│   │   ├── fixtures
│   │   │   └── example.json
│   │   └── support
│   │       ├── app.po.ts
│   │       ├── commands.ts
│   │       └── e2e.ts
│   └── tsconfig.json
├── jest.config.ts
├── jest.preset.js
├── nx.json
├── package-lock.json
├── package.json
├── project.json
├── src
│   ├── app
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   └── nx-welcome.component.ts
│   ├── assets
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
│   ├── styles.scss
│   └── test-setup.ts
├── tsconfig.app.json
├── tsconfig.editor.json
├── tsconfig.json
└── tsconfig.spec.json
```
