# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based personal blog using the Chirpy theme, hosted on GitHub Pages. The site is built around sharing technical articles and showcases software engineering content.

## Development Commands

### Local Development
- **Start development server**: `bundle exec jekyll serve` or `./start-app.sh`
- **Install dependencies**: `bundle install`
- **Build site**: `bundle exec jekyll build`
- **Test HTML**: `bundle exec htmlproofer ./_site` (requires test gems)

### Key Jekyll Commands
- **Development with drafts**: `bundle exec jekyll serve --drafts`
- **Development with live reload**: `bundle exec jekyll serve --livereload`
- **Production build**: `JEKYLL_ENV=production bundle exec jekyll build`

## Architecture

### Site Structure
- **`_posts/`**: Blog posts in Markdown format with YAML front matter
- **`_tabs/`**: Static pages (About, Archives, Categories, Tags)
- **`_layouts/`**: HTML templates for different content types
- **`_includes/`**: Reusable HTML components and partials
- **`_data/`**: YAML data files for contact info and sharing configuration
- **`_plugins/`**: Ruby plugins (includes git-based last modified date hook)
- **`assets/`**: Static assets including images and custom libraries
- **`_config.yml`**: Main Jekyll configuration

### Theme System
Built on Jekyll Chirpy theme with customizations:
- Comments system uses Giscus (GitHub Discussions)
- Progressive Web App (PWA) enabled
- Responsive design with dark/light mode toggle
- SEO optimized with jekyll-seo-tag

### Content Management
- Posts use YAML front matter with standard Jekyll conventions
- Last modified dates automatically tracked via git commits
- Categorization and tagging system for content organization
- Archive and search functionality built-in

### Deployment
- Hosted on GitHub Pages
- Custom domain: jorciney.dev
- Automatic deployment on push to master branch
- Site builds to `_site/` directory

## File Naming Conventions
- Blog posts: `YYYY-MM-DD-title-with-hyphens.md` in `_posts/`
- Images: Store in `assets/posts/` with descriptive names
- Plugin development: WordPress plugins documented in `wp-plugins/`

## Git Integration
The `posts-lastmod-hook.rb` plugin automatically sets `last_modified_at` based on git commit history for posts that have been modified multiple times.