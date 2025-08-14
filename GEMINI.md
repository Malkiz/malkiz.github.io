# Gemini Code Assistant Context

This document provides context for the Gemini code assistant to understand the project structure, technologies used, and development conventions.

## Project Overview

This project is a personal developer blog built with Jekyll, a static site generator written in Ruby. The blog is hosted on GitHub Pages and documents the author's journey building open-source tools, exploring new technologies, and learning in public.

The main content is located in the `docs` directory, which is the root for the Jekyll build. The blog posts are in the `docs/_posts` directory.

## Building and Running

The project uses Ruby and Bundler for dependency management.

-   **Install dependencies:** `bundle install`
-   **Serve the blog locally:** `./serve.sh`
-   **View the blog:** `http://localhost:4000`

The `serve.sh` script changes into the `docs` directory and runs `bundle exec jekyll serve --future` to build and serve the site.

## Development Conventions

-   Blog posts are written in Markdown and follow the Jekyll naming convention `YYYY-MM-DD-post-title.md`.
-   The blog uses the `minima` theme.
-   The site configuration is managed in `docs/_config.yml`.
-   The `Gemfile` specifies the Ruby version and gem dependencies.
