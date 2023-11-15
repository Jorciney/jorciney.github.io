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

### Running the application

```bash
nx serve my-new-app-name
```

